/**
 * Table Tennis Dynamic Physics & Equipment Synergy Engine
 * Replaces static RPG-like ratings with non-linear material mechanics.
 */

const BRANDS = [
  'andro', 'butterfly', 'dhs', 'donic', 'friendship', 
  'loki', 'nittaku', 'palio', 'sanwei', 'stiga', 
  'tibhar', 'victas', 'xiom', 'yasaka', 'yinhe'
];

// Physical Constant Mappings
const STIFFNESS_FACTORS = {
  flexible: 0.85,
  medium: 1.0,
  stiff: 1.25
};

const COMPOSITION_POWER_MULTIPLIERS = {
  pure_wood: 0.90,
  inner_carbon: 1.05,
  outer_carbon: 1.20
};

const DEFAULT_RUBBER_DENSITY = {
  tacky: 0.42,        // Dense Chinese sponges (e.g., DHS Globe/Hurricane)
  tensor: 0.35,       // Medium ESN/Japanese Tensors (e.g., Butterfly/TIBHAR)
  frictionless: 0.28  // Anti-spin / Light defensive rubbers
};

let catalog = {
  blades: [],
  rubbers: []
};

let isCompareActive = false;

// ------------------------------------------------------------------
// 1. DYNAMIC PHYSICS & BALANCE CALCULATORS
// ------------------------------------------------------------------

/**
 * Calculates blade head area in cm² from width & length (mm).
 * Standard teardrop shape approximation: Area ≈ (π * L * W) / 400
 */
function calculateHeadArea(lengthMm = 157, widthMm = 150) {
  return ((Math.PI * lengthMm * widthMm) / 400);
}

/**
 * Calculates estimated cut rubber weight using sponge density and geometry.
 * Formula: Cut Weight = Sponge Density * Thickness (mm) * Head Area (cm²) * 0.78
 */
function calculateCutRubberWeight(rubber, headAreaCm2 = 184.9) {
  if (!rubber) return 45;
  if (rubber.cutWeight && rubber.cutWeight > 0) return rubber.cutWeight;

  const thickness = parseFloat(rubber.thickness) || 2.1;
  const topsheet = rubber.topsheetType || 'tensor';
  const density = rubber.spongeDensity || DEFAULT_RUBBER_DENSITY[topsheet] || 0.35;

  return Math.round(density * thickness * headAreaCm2 * 0.78);
}

/**
 * High-Impact Speed (Power Loops/Counter-Drives):
 * Effective Speed (High) = Blade Stiffness Factor * (1 + (Sponge Hardness Shore C / 100))
 */
function calculateHighImpactSpeed(blade, fh, bh) {
  const stiffnessKey = (blade.stiffness || 'medium').toLowerCase();
  const stiffnessFactor = STIFFNESS_FACTORS[stiffnessKey] || 1.0;
  const compositionMult = COMPOSITION_POWER_MULTIPLIERS[blade.composition] || 1.0;

  const fhHardness = parseHardnessShoreC(fh);
  const bhHardness = parseHardnessShoreC(bh);
  const avgHardness = (fhHardness + bhHardness) / 2;

  const basePower = stiffnessFactor * (1 + (avgHardness / 100));
  return Math.min(100, Math.round(basePower * 42 * compositionMult));
}

/**
 * Low-Impact Speed (Short Game / Touch Pushes):
 * Softer sponges and flexible blades absorb impact, giving lower initial speed.
 */
function calculateLowImpactSpeed(blade, fh, bh) {
  const stiffnessKey = (blade.stiffness || 'medium').toLowerCase();
  const stiffnessFactor = STIFFNESS_FACTORS[stiffnessKey] || 1.0;
  
  const fhHardness = parseHardnessShoreC(fh);
  const bhHardness = parseHardnessShoreC(bh);
  const avgHardness = (fhHardness + bhHardness) / 2;

  // Linear low-energy trampoline effect
  const touchResponse = (stiffnessFactor * 0.4) + (avgHardness * 0.3);
  return Math.min(100, Math.round(touchResponse));
}

/**
 * Parses or normalizes rubber hardness to Shore C (°).
 * Converts Chinese Shore A degrees (e.g. 37-41 DHS) into European Shore C (~47-51).
 */
function parseHardnessShoreC(rubber) {
  if (!rubber) return 45;
  let deg = 45;

  if (rubber.spongeHardness) {
    deg = parseFloat(rubber.spongeHardness);
  } else if (rubber.hardness) {
    const matched = rubber.hardness.toString().match(/\d+/);
    if (matched) deg = parseInt(matched[0], 10);
  }

  // Chinese DHS conversion to Shore C scale
  if (rubber.brand && rubber.brand.toUpperCase() === 'DHS' && deg <= 41) {
    deg += 10;
  }

  return Math.min(60, Math.max(30, deg));
}

/**
 * Net Throw Angle (1 - 5 Scale)
 */
function calculateNetThrowAngle(blade, fh, bh) {
  const bladeDwell = blade.stiffness === 'flexible' ? 1.5 : (blade.stiffness === 'stiff' ? -1.0 : 0);
  
  const getRubberThrow = (r) => {
    if (!r) return 3;
    if (r.throwAngle === 'high') return 4.5;
    if (r.throwAngle === 'low') return 1.5;
    return 3.0;
  };

  const fhThrow = getRubberThrow(fh);
  const bhThrow = getRubberThrow(bh);
  const rawThrow = 2.5 + bladeDwell + ((fhThrow + bhThrow) / 4);

  return Math.max(1.0, Math.min(5.0, parseFloat(rawThrow.toFixed(1))));
}

// ------------------------------------------------------------------
// 2. SYNERGY, WARNING & STRAIN DETECTOR ENGINE
// ------------------------------------------------------------------

function evaluateSetupSynergy(blade, fh, bh, bladeWeight, fhCutWeight, bhCutWeight) {
  const warnings = [];
  const totalCutRubberWeight = fhCutWeight + bhCutWeight;
  const isStiff = blade.stiffness === 'stiff';
  const isOuterCarbon = blade.composition === 'outer_carbon';

  const fhHard = parseHardnessShoreC(fh) >= 48;
  const bhHard = parseHardnessShoreC(bh) >= 48;
  const fhTacky = fh.topsheetType === 'tacky';
  const bhTacky = bh.topsheetType === 'tacky';

  // Warning 1: Stiff Outer-Carbon + Hard Tacky Sponge without power mechanics
  if (isOuterCarbon && isStiff && ((fhHard && fhTacky) || (bhHard && bhTacky))) {
    warnings.push({
      type: 'mechanics',
      title: 'Power Mechanics Required',
      message: 'Pairing a stiff outer-carbon blade with a high-hardness tacky sponge requires full body engagement and fast arm acceleration to compress the sponge.'
    });
  }

  // Warning 2: Balance Engine (Head-Heavy Alert)
  if (totalCutRubberWeight > 95 && bladeWeight < 85) {
    warnings.push({
      type: 'balance',
      title: 'Head-Heavy Alert',
      message: 'Cut rubbers exceed 95g total on a light blade (<85g). High risk of wrist strain and sluggish recovery time during fast rallies.'
    });
  }

  // Warning 3: Dynamic Trajectory Clash (Low Dwell + Low Throw)
  const fhLowThrow = fh.throwAngle === 'low';
  const bhLowThrow = bh.throwAngle === 'low';
  if (isStiff && (fhLowThrow || bhLowThrow)) {
    warnings.push({
      type: 'trajectory',
      title: 'Trajectory Clash Warning',
      message: 'High Risk: Flat arc with short dwell time. High risk of balls netting on passive loops against heavy backspin.'
    });
  }

  return warnings;
}

function calculatePhysicalStrainIndex(totalWeight, warnings) {
  const hasHeadHeavy = warnings.some(w => w.type === 'balance');
  if (totalWeight > 195 || (totalWeight > 185 && hasHeadHeavy)) {
    return { level: 'High', class: 'strain-high' };
  }
  if (totalWeight > 178 || hasHeadHeavy) {
    return { level: 'Moderate', class: 'strain-med' };
  }
  return { level: 'Low', class: 'strain-low' };
}

function calculateTechniqueBadge(effectiveSpeedHigh, blade, fh, bh) {
  const isHardTacky = (fh.topsheetType === 'tacky' && parseHardnessShoreC(fh) >= 48) ||
                      (bh.topsheetType === 'tacky' && parseHardnessShoreC(bh) >= 48);

  if (effectiveSpeedHigh >= 88 || (blade.composition === 'outer_carbon' && isHardTacky)) {
    return { label: 'Advanced / Pro', desc: 'Requires full stroke mechanics' };
  }
  if (effectiveSpeedHigh >= 70) {
    return { label: 'Intermediate', desc: 'Developing power consistency' };
  }
  return { label: 'All-Round / Control', desc: 'Forgiving for entry-level technique' };
}

// ------------------------------------------------------------------
// 3. UI RENDERING & SUMMARY UPDATES
// ------------------------------------------------------------------

function updateSummary(prefix) {
  const bladeIdx = document.getElementById(`${prefix}-blade`).value;
  const fhIdx = document.getElementById(`${prefix}-fh`).value;
  const bhIdx = document.getElementById(`${prefix}-bh`).value;

  const blade = catalog.blades[bladeIdx] || { 
    price: 0, weight: 85, stiffness: 'medium', composition: 'pure_wood',
    headLength: 157, headWidth: 150 
  };
  const fh = catalog.rubbers[fhIdx] || { price: 0, spongeHardness: 45, topsheetType: 'tensor', throwAngle: 'medium' };
  const bh = catalog.rubbers[bhIdx] || { price: 0, spongeHardness: 45, topsheetType: 'tensor', throwAngle: 'medium' };

  // Calculate Geometry & Weight
  const headArea = calculateHeadArea(blade.headLength, blade.headWidth);
  const bladeWeight = blade.weight || 85;
  const weightTolerance = blade.weightTolerance || 5; // ±5g factory variance
  const fhCutWeight = calculateCutRubberWeight(fh, headArea);
  const bhCutWeight = calculateCutRubberWeight(bh, headArea);
  const totalWeight = bladeWeight + fhCutWeight + bhCutWeight;

  // Non-Linear Dynamic Speed Responses
  const highImpactSpeed = calculateHighImpactSpeed(blade, fh, bh);
  const lowImpactSpeed = calculateLowImpactSpeed(blade, fh, bh);
  const netThrowAngle = calculateNetThrowAngle(blade, fh, bh);

  // Warnings & Technical Metrics
  const warnings = evaluateSetupSynergy(blade, fh, bh, bladeWeight, fhCutWeight, bhCutWeight);
  const strainIndex = calculatePhysicalStrainIndex(totalWeight, warnings);
  const techBadge = calculateTechniqueBadge(highImpactSpeed, blade, fh, bh);
  const totalPrice = (blade.price || 0) + (fh.price || 0) + (bh.price || 0);

  // DOM Updates
  document.getElementById(`${prefix}-price`).textContent = `$${totalPrice}`;
  document.getElementById(`${prefix}-weight`).textContent = `${totalWeight}g (±${weightTolerance}g)`;
  document.getElementById(`${prefix}-speed-high`).textContent = `${highImpactSpeed} / 100`;
  document.getElementById(`${prefix}-speed-low`).textContent = `${lowImpactSpeed} / 100`;
  document.getElementById(`${prefix}-throw`).textContent = `${netThrowAngle} / 5.0`;
  
  // Render Badges & Arc Profile Visualizer
  const strainEl = document.getElementById(`${prefix}-strain`);
  if (strainEl) {
    strainEl.textContent = strainIndex.level;
    strainEl.className = `badge ${strainIndex.class}`;
  }

  const badgeEl = document.getElementById(`${prefix}-tech-badge`);
  if (badgeEl) {
    badgeEl.textContent = techBadge.label;
    badgeEl.title = techBadge.desc;
  }

  const arcEl = document.getElementById(`${prefix}-arc-profile`);
  if (arcEl) {
    arcEl.textContent = netThrowAngle >= 3.8 ? 'High Arc Trajectory' : (netThrowAngle <= 2.2 ? 'Flat Linear Arc' : 'Medium Arc');
  }

  // Render Warning Alerts Box
  const warningContainer = document.getElementById(`${prefix}-warnings`);
  if (warningContainer) {
    if (warnings.length > 0) {
      warningContainer.innerHTML = warnings.map(w => 
        `<div class="alert-box alert-${w.type}"><strong>${w.title}:</strong> ${w.message}</div>`
      ).join('');
      warningContainer.classList.remove('hidden');
    } else {
      warningContainer.innerHTML = '';
      warningContainer.classList.add('hidden');
    }
  }

  if (isCompareActive) {
    updateComparisonSummary();
  }
}

function updateComparisonSummary() {
  const getData = (prefix) => {
    const blade = catalog.blades[document.getElementById(`${prefix}-blade`).value] || {};
    const fh = catalog.rubbers[document.getElementById(`${prefix}-fh`).value] || {};
    const bh = catalog.rubbers[document.getElementById(`${prefix}-bh`).value] || {};

    const headArea = calculateHeadArea(blade.headLength, blade.headWidth);
    const bladeWeight = blade.weight || 85;
    const fhCutWeight = calculateCutRubberWeight(fh, headArea);
    const bhCutWeight = calculateCutRubberWeight(bh, headArea);

    return {
      price: (blade.price || 0) + (fh.price || 0) + (bh.price || 0),
      weight: bladeWeight + fhCutWeight + bhCutWeight,
      highSpeed: calculateHighImpactSpeed(blade, fh, bh),
      lowSpeed: calculateLowImpactSpeed(blade, fh, bh),
      throwAngle: calculateNetThrowAngle(blade, fh, bh)
    };
  };

  const r1 = getData('r1');
  const r2 = getData('r2');

  const container = document.getElementById('comparisonMetricsGrid');
  if (!container) return;

  container.innerHTML = `
    <div class="comp-card">
      <div class="comp-label">Cheaper Setup</div>
      <div class="comp-winner">${r1.price === r2.price ? 'Equal' : (r1.price < r2.price ? 'Racket #1' : 'Racket #2')}</div>
      <div class="comp-diff">Diff: $${Math.abs(r1.price - r2.price)}</div>
    </div>
    <div class="comp-card">
      <div class="comp-label">Lighter Setup</div>
      <div class="comp-winner">${r1.weight === r2.weight ? 'Equal' : (r1.weight < r2.weight ? 'Racket #1' : 'Racket #2')}</div>
      <div class="comp-diff">Diff: ${Math.abs(r1.weight - r2.weight)}g</div>
    </div>
    <div class="comp-card">
      <div class="comp-label">High-Impact Power (Loops)</div>
      <div class="comp-winner">${r1.highSpeed === r2.highSpeed ? 'Equal' : (r1.highSpeed > r2.highSpeed ? 'Racket #1' : 'Racket #2')}</div>
      <div class="comp-diff">Diff: ${Math.abs(r1.highSpeed - r2.highSpeed)} pts</div>
    </div>
    <div class="comp-card">
      <div class="comp-label">Touch Play Control (Pushes)</div>
      <div class="comp-winner">${r1.lowSpeed === r2.lowSpeed ? 'Equal' : (r1.lowSpeed < r2.lowSpeed ? 'Racket #1 (Dampens More)' : 'Racket #2 (Dampens More)')}</div>
      <div class="comp-diff">Diff: ${Math.abs(r1.lowSpeed - r2.lowSpeed)} pts</div>
    </div>
  `;
}

// ------------------------------------------------------------------
// 4. DATA INITIALIZATION & DROPDOWN BINDING
// ------------------------------------------------------------------

async function init() {
  await loadAllJSONFiles();

  if (catalog.blades.length === 0 && catalog.rubbers.length === 0) {
    console.warn("No JSON data found. Loading fallback specs.");
    return;
  }

  populateDropdowns('r1');
  populateDropdowns('r2');

  bindEvents('r1');
  bindEvents('r2');

  const compareBtn = document.getElementById('compareBtn');
  if (compareBtn) compareBtn.addEventListener('click', toggleCompareMode);

  updateSummary('r1');
  updateSummary('r2');
}

async function loadAllJSONFiles() {
  const bladePromises = BRANDS.map(brand => 
    fetch(`./${brand}_blades.json`)
      .then(res => res.ok ? res.json() : [])
      .then(items => items.map(item => ({ ...item, brand: item.brand || capitalize(brand) })))
      .catch(() => [])
  );

  const rubberPromises = BRANDS.map(brand => 
    fetch(`./${brand}_rubbers.json`)
      .then(res => res.ok ? res.json() : [])
      .then(items => items.map(item => ({ ...item, brand: item.brand || capitalize(brand) })))
      .catch(() => [])
  );

  const bladeResults = await Promise.all(bladePromises);
  const rubberResults = await Promise.all(rubberPromises);

  catalog.blades = bladeResults.flat().sort(sortByBrandAndName);
  catalog.rubbers = rubberResults.flat().sort(sortByBrandAndName);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sortByBrandAndName(a, b) {
  const brandCompare = (a.brand || '').localeCompare(b.brand || '');
  if (brandCompare !== 0) return brandCompare;
  return (a.name || '').localeCompare(b.name || '');
}

function populateDropdowns(prefix) {
  const bladeSel = document.getElementById(`${prefix}-blade`);
  const fhSel = document.getElementById(`${prefix}-fh`);
  const bhSel = document.getElementById(`${prefix}-bh`);

  if (!bladeSel || !fhSel || !bhSel) return;

  bladeSel.innerHTML = catalog.blades.map((b, idx) => 
    `<option value="${idx}">[${b.brand}] ${b.name} (${b.composition || 'Wood'}, ${b.stiffness || 'medium'}) — $${b.price || 0}</option>`
  ).join('');

  const rubberOptions = catalog.rubbers.map((r, idx) => {
    const hardnessStr = r.spongeHardness ? `${r.spongeHardness}°` : (r.hardness || '-');
    return `<option value="${idx}">[${r.brand}] ${r.name} (${r.topsheetType || 'tensor'}, ${hardnessStr}) — $${r.price || 0}</option>`;
  }).join('');

  fhSel.innerHTML = rubberOptions;
  bhSel.innerHTML = rubberOptions;

  if (prefix === 'r2' && catalog.rubbers.length > 1) {
    fhSel.selectedIndex = 1;
  }
}

function bindEvents(prefix) {
  const bladeSel = document.getElementById(`${prefix}-blade`);
  const fhSel = document.getElementById(`${prefix}-fh`);
  const bhSel = document.getElementById(`${prefix}-bh`);

  if (bladeSel) bladeSel.addEventListener('change', () => updateSummary(prefix));
  if (fhSel) fhSel.addEventListener('change', () => updateSummary(prefix));
  if (bhSel) bhSel.addEventListener('change', () => updateSummary(prefix));
}

function toggleCompareMode() {
  isCompareActive = !isCompareActive;
  const grid = document.getElementById('racketGrid');
  const card2 = document.getElementById('card-r2');
  const compBox = document.getElementById('comparisonSummaryBox');
  const btn = document.getElementById('compareBtn');

  if (isCompareActive) {
    if (grid) grid.className = 'compare-mode';
    if (card2) card2.classList.remove('hidden');
    if (compBox) compBox.classList.remove('hidden');
    if (btn) btn.textContent = '✕ Close Comparison';
    updateComparisonSummary();
  } else {
    if (grid) grid.className = 'single-mode';
    if (card2) card2.classList.add('hidden');
    if (compBox) compBox.classList.add('hidden');
    if (btn) btn.textContent = '+ Compare Second Racket';
  }
}

document.addEventListener('DOMContentLoaded', init);