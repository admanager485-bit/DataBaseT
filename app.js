/**
 * TT Racket Studio - Equipment Physics & Compatibility Engine
 */

const BRANDS = [
  'andro', 'butterfly', 'dhs', 'donic', 'friendship', 
  'loki', 'nittaku', 'palio', 'sanwei', 'stiga', 
  'tibhar', 'victas', 'xiom', 'yasaka', 'yinhe'
];

const PRO_PROFILES = [
  { name: "Ma Long", brand: "DHS", style: "Power Loop & All-Around Dominance" },
  { name: "Fan Zhendong", brand: "Butterfly", style: "Aggressive Counter-Drive" },
  { name: "Truls Möregårdh", brand: "Stiga", style: "Creative Variation & Block" },
  { name: "Felix Lebrun", brand: "Tibhar", style: "Penhold Ultra-Fast Attack" },
  { name: "Hugo Calderano", brand: "Xiom", style: "Maximum Power From Both Wings" },
  { name: "Timo Boll", brand: "Butterfly", style: "Heavy Spin & Precision Placement" },
  { name: "Qiu Dang", brand: "Andro", style: "Penhold Control & Placement" },
  { name: "Quadri Aruna", brand: "Gewo", style: "Brutal Forehand Loop Power" },
  { name: "Lin Yun-Ju", brand: "Butterfly", style: "Flick Precision & Placement" }
];

let catalog = {
  blades: [],
  rubbers: []
};

let isCompareActive = false;

// Dynamic Cut Rubber Weight Table (Grams per cut sheet)
function getRubberWeight(rubber) {
  if (!rubber) return 45;
  if (rubber.cutWeight && rubber.cutWeight > 0) return rubber.cutWeight;
  if (rubber.weight && rubber.weight > 0 && rubber.weight < 70) return rubber.weight;
  
  const brand = (rubber.brand || '').toLowerCase();
  switch (brand) {
    case 'dhs': return 52;
    case 'tibhar': return 49;
    case 'andro': 
    case 'xiom': return 48;
    case 'butterfly':
    case 'nittaku':
    case 'yasaka': return 47;
    case 'stiga':
    case 'sanwei':
    case 'friendship': return 46;
    case 'yinhe':
    case 'loki': return 45;
    case 'donic':
    case 'victas': return 44;
    default: return 45;
  }
}

function parseHardnessShoreC(rubber) {
  if (!rubber) return 45;
  let deg = 45;

  if (rubber.spongeHardness) {
    deg = parseFloat(rubber.spongeHardness);
  } else if (rubber.hardness) {
    const matched = rubber.hardness.toString().match(/\d+/);
    if (matched) deg = parseInt(matched[0], 10);
  } else if (rubber.version) {
    const matched = rubber.version.toString().match(/\d+/);
    if (matched && parseInt(matched[0], 10) <= 60) deg = parseInt(matched[0], 10);
  }

  // Normalize Chinese DHS scale
  if (rubber.brand && rubber.brand.toUpperCase() === 'DHS' && deg <= 41) {
    deg += 10;
  }

  return Math.min(60, Math.max(30, deg));
}

function calculateHighImpactSpeed(blade, fh, bh) {
  const bladeSpeed = blade.speed || 85;
  const fhSpeed = fh.speed || 80;
  const bhSpeed = bh.speed || 80;

  const stiffnessMult = blade.stiffness === 'stiff' ? 1.1 : (blade.stiffness === 'flexible' ? 0.9 : 1.0);
  const compositionMult = blade.composition === 'outer_carbon' ? 1.1 : 1.0;

  const rawSpeed = ((bladeSpeed * 0.5) + (fhSpeed * 0.25) + (bhSpeed * 0.25)) * stiffnessMult * compositionMult;
  return Math.min(100, Math.round(rawSpeed));
}

function calculateLowImpactSpeed(blade, fh, bh) {
  const bladeControl = blade.control || 80;
  const fhHardness = parseHardnessShoreC(fh);
  const bhHardness = parseHardnessShoreC(bh);

  const rawTouch = 100 - ((bladeControl * 0.5) + ((fhHardness + bhHardness) / 2) * 0.5);
  return Math.max(30, Math.min(95, Math.round(rawTouch)));
}

function calculateNetThrowAngle(blade, fh, bh) {
  const bladeDwell = blade.stiffness === 'flexible' ? 0.8 : (blade.stiffness === 'stiff' ? -0.5 : 0);
  const fhThrow = fh.throwAngle === 'high' ? 4 : (fh.throwAngle === 'low' ? 2 : 3);
  const bhThrow = bh.throwAngle === 'high' ? 4 : (bh.throwAngle === 'low' ? 2 : 3);

  const rawThrow = 3.0 + bladeDwell + ((fhThrow + bhThrow - 6) * 0.4);
  return parseFloat(Math.max(1.0, Math.min(5.0, rawThrow)).toFixed(1));
}

function evaluateSetupSynergy(blade, fh, bh, bladeWeight, fhCutWeight, bhCutWeight) {
  const warnings = [];
  const totalCutRubberWeight = fhCutWeight + bhCutWeight;
  const isStiff = blade.stiffness === 'stiff';
  const isOuterCarbon = blade.composition === 'outer_carbon';

  const fhHard = parseHardnessShoreC(fh) >= 48;
  const bhHard = parseHardnessShoreC(bh) >= 48;
  const fhTacky = fh.topsheetType === 'tacky' || (fh.name || '').toLowerCase().includes('hurricane');
  const bhTacky = bh.topsheetType === 'tacky' || (bh.name || '').toLowerCase().includes('hurricane');

  if (isOuterCarbon && isStiff && ((fhHard && fhTacky) || (bhHard && bhTacky))) {
    warnings.push({
      type: 'mechanics',
      title: 'Power Mechanics Required',
      message: 'Outer-carbon blade paired with hard tacky sponge requires full body engagement and fast arm acceleration.'
    });
  }

  if (totalCutRubberWeight > 95 && bladeWeight < 85) {
    warnings.push({
      type: 'balance',
      title: 'Head-Heavy Alert',
      message: 'Cut rubbers exceed 95g total on a light blade (<85g). Wrist strain risk during fast rallies.'
    });
  }

  const fhLowThrow = fh.throwAngle === 'low';
  const bhLowThrow = bh.throwAngle === 'low';
  if (isStiff && (fhLowThrow || bhLowThrow)) {
    warnings.push({
      type: 'trajectory',
      title: 'Trajectory Clash Warning',
      message: 'Flat arc with short dwell time. High risk of balls netting on passive loops against heavy backspin.'
    });
  }

  return warnings;
}

async function init() {
  await loadAllJSONFiles();

  if (catalog.blades.length === 0 && catalog.rubbers.length === 0) {
    console.warn("No JSON loaded. Ensure server environment.");
    return;
  }

  populateDropdowns('r1');
  populateDropdowns('r2');

  bindEvents('r1');
  bindEvents('r2');

  document.getElementById('compareBtn').addEventListener('click', toggleCompareMode);
  document.getElementById('feelBtn').addEventListener('click', () => document.getElementById('feelModal').classList.remove('hidden'));
  document.getElementById('closeFeelModal').addEventListener('click', () => document.getElementById('feelModal').classList.add('hidden'));

  document.querySelectorAll('.feel-card').forEach(card => {
    card.addEventListener('click', (e) => {
      applyFeelPreset(e.currentTarget.getAttribute('data-feel'));
    });
  });

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
    `<option value="${idx}">[${b.brand}] ${b.name} (${b.composition || 'Wood'}) — $${b.price || 0}</option>`
  ).join('');

  const rubberOptions = catalog.rubbers.map((r, idx) => {
    const hardness = r.hardness || `${r.spongeHardness || 45}°`;
    return `<option value="${idx}">[${r.brand}] ${r.name} (${r.topsheetType || 'tensor'}, ${hardness}) — $${r.price || 0}</option>`;
  }).join('');

  fhSel.innerHTML = rubberOptions;
  bhSel.innerHTML = rubberOptions;

  if (prefix === 'r2' && catalog.rubbers.length > 1) {
    fhSel.selectedIndex = 1;
  }

  updateHandleOptions(prefix);
}

function updateHandleOptions(prefix) {
  const bladeIdx = document.getElementById(`${prefix}-blade`).value;
  const handleSel = document.getElementById(`${prefix}-handle`);
  const blade = catalog.blades[bladeIdx] || {};

  const handles = (blade.handles && blade.handles.length > 0) 
    ? blade.handles 
    : ["FL (Concave)", "ST (Straight)", "AN (Anatomic)", "CS (Penhold)"];
    
  handleSel.innerHTML = handles.map(h => `<option value="${h}">${h}</option>`).join('');
}

function bindEvents(prefix) {
  const bladeSel = document.getElementById(`${prefix}-blade`);
  const fhSel = document.getElementById(`${prefix}-fh`);
  const bhSel = document.getElementById(`${prefix}-bh`);

  if (bladeSel) {
    bladeSel.addEventListener('change', () => {
      updateHandleOptions(prefix);
      updateSummary(prefix);
    });
  }
  if (fhSel) fhSel.addEventListener('change', () => updateSummary(prefix));
  if (bhSel) bhSel.addEventListener('change', () => updateSummary(prefix));
}

function updateSummary(prefix) {
  const bladeIdx = document.getElementById(`${prefix}-blade`).value;
  const fhIdx = document.getElementById(`${prefix}-fh`).value;
  const bhIdx = document.getElementById(`${prefix}-bh`).value;

  const blade = catalog.blades[bladeIdx] || { price: 0, weight: 85, speed: 85, control: 80 };
  const fh = catalog.rubbers[fhIdx] || { price: 0, speed: 80, control: 80, spin: 80 };
  const bh = catalog.rubbers[bhIdx] || { price: 0, speed: 80, control: 80, spin: 80 };

  const bladeWeight = blade.weight || 85;
  const fhCutWeight = getRubberWeight(fh);
  const bhCutWeight = getRubberWeight(bh);
  const totalWeight = bladeWeight + fhCutWeight + bhCutWeight;

  const totalPrice = (blade.price || 0) + (fh.price || 0) + (bh.price || 0);
  const highImpactSpeed = calculateHighImpactSpeed(blade, fh, bh);
  const lowImpactSpeed = calculateLowImpactSpeed(blade, fh, bh);
  const controlRating = Math.round(((blade.control || 80) * 0.4) + ((fh.control || 80) * 0.3) + ((bh.control || 80) * 0.3));
  const spinRating = Math.round(((fh.spin || 80) + (bh.spin || 80)) / 2);
  const netThrow = calculateNetThrowAngle(blade, fh, bh);

  document.getElementById(`${prefix}-price`).textContent = `$${totalPrice}`;
  document.getElementById(`${prefix}-weight`).textContent = `${totalWeight}g (±5g)`;
  document.getElementById(`${prefix}-speed-high`).textContent = `${highImpactSpeed} / 100`;
  document.getElementById(`${prefix}-speed-low`).textContent = `${lowImpactSpeed} / 100`;
  document.getElementById(`${prefix}-control`).textContent = `${controlRating} / 100`;
  document.getElementById(`${prefix}-spin`).textContent = `${spinRating} / 100`;
  document.getElementById(`${prefix}-throw`).textContent = `${netThrow} / 5.0`;
  document.getElementById(`${prefix}-hardness`).textContent = `${fh.hardness || parseHardnessShoreC(fh) + '°'} / ${bh.hardness || parseHardnessShoreC(bh) + '°'}`;

  // Update Strain
  const warnings = evaluateSetupSynergy(blade, fh, bh, bladeWeight, fhCutWeight, bhCutWeight);
  const strainEl = document.getElementById(`${prefix}-strain`);
  if (totalWeight > 192) {
    strainEl.textContent = 'High';
    strainEl.className = 'badge strain-high';
  } else if (totalWeight > 180) {
    strainEl.textContent = 'Moderate';
    strainEl.className = 'badge strain-med';
  } else {
    strainEl.textContent = 'Low';
    strainEl.className = 'badge strain-low';
  }

  // Update Tech Level
  const techEl = document.getElementById(`${prefix}-tech-badge`);
  if (highImpactSpeed >= 90) {
    techEl.textContent = 'Advanced / Pro';
  } else if (highImpactSpeed >= 80) {
    techEl.textContent = 'Intermediate';
  } else {
    techEl.textContent = 'All-Round';
  }

  // Update Arc
  document.getElementById(`${prefix}-arc-profile`).textContent = netThrow >= 3.8 ? 'High Arc' : (netThrow <= 2.2 ? 'Flat Arc' : 'Medium Arc');

  // Render Pros
  const matchedPros = PRO_PROFILES.filter(p => p.brand.toLowerCase() === (blade.brand || '').toLowerCase()).slice(0, 2);
  const prosContainer = document.getElementById(`${prefix}-pros`);
  if (matchedPros.length > 0) {
    prosContainer.innerHTML = matchedPros.map(p => `<span class="pro-tag">${p.name} (${p.style})</span>`).join('');
  } else {
    prosContainer.innerHTML = `<span class="pro-tag">${blade.brand} Custom Pro Setup</span>`;
  }

  // Warnings Render
  const warnBox = document.getElementById(`${prefix}-warnings`);
  if (warnings.length > 0) {
    warnBox.innerHTML = warnings.map(w => `<div class="alert-box alert-${w.type}"><strong>${w.title}:</strong> ${w.message}</div>`).join('');
    warnBox.classList.remove('hidden');
  } else {
    warnBox.innerHTML = '';
    warnBox.classList.add('hidden');
  }

  if (isCompareActive) updateComparisonSummary();
}

function updateComparisonSummary() {
  const getData = (prefix) => {
    const blade = catalog.blades[document.getElementById(`${prefix}-blade`).value] || {};
    const fh = catalog.rubbers[document.getElementById(`${prefix}-fh`).value] || {};
    const bh = catalog.rubbers[document.getElementById(`${prefix}-bh`).value] || {};

    return {
      price: (blade.price || 0) + (fh.price || 0) + (bh.price || 0),
      weight: (blade.weight || 85) + getRubberWeight(fh) + getRubberWeight(bh),
      power: calculateHighImpactSpeed(blade, fh, bh)
    };
  };

  const r1 = getData('r1');
  const r2 = getData('r2');

  const container = document.getElementById('comparisonMetricsGrid');
  container.innerHTML = `
    <div class="comp-card">
      <div class="comp-label">Cheaper Setup</div>
      <div class="comp-winner">${r1.price === r2.price ? 'Same Cost' : (r1.price < r2.price ? 'Racket #1' : 'Racket #2')}</div>
      <div class="comp-diff">Diff: $${Math.abs(r1.price - r2.price)}</div>
    </div>
    <div class="comp-card">
      <div class="comp-label">Lighter Setup</div>
      <div class="comp-winner">${r1.weight === r2.weight ? 'Same Weight' : (r1.weight < r2.weight ? 'Racket #1' : 'Racket #2')}</div>
      <div class="comp-diff">Diff: ${Math.abs(r1.weight - r2.weight)}g</div>
    </div>
    <div class="comp-card">
      <div class="comp-label">Higher Loop Power</div>
      <div class="comp-winner">${r1.power === r2.power ? 'Equal Power' : (r1.power > r2.power ? 'Racket #1' : 'Racket #2')}</div>
      <div class="comp-diff">Diff: ${Math.abs(r1.power - r2.power)} pts</div>
    </div>
  `;
}

function applyFeelPreset(feelType) {
  if (catalog.blades.length === 0) return;
  
  let bIdx = 0, fhIdx = 0;
  if (feelType === 'cheapest') {
    bIdx = 0; fhIdx = 0;
  } else if (feelType === 'expensive' || feelType === 'max-speed') {
    bIdx = catalog.blades.length - 1;
    fhIdx = catalog.rubbers.length - 1;
  }

  document.getElementById('r1-blade').value = bIdx;
  document.getElementById('r1-fh').value = fhIdx;
  document.getElementById('r1-bh').value = fhIdx;

  updateHandleOptions('r1');
  updateSummary('r1');
  document.getElementById('feelModal').classList.add('hidden');
}

function toggleCompareMode() {
  isCompareActive = !isCompareActive;
  const grid = document.getElementById('racketGrid');
  const card2 = document.getElementById('card-r2');
  const compBox = document.getElementById('comparisonSummaryBox');
  const btn = document.getElementById('compareBtn');

  if (isCompareActive) {
    grid.className = 'compare-mode';
    card2.classList.remove('hidden');
    compBox.classList.remove('hidden');
    btn.textContent = '✕ Close Comparison';
    updateComparisonSummary();
  } else {
    grid.className = 'single-mode';
    card2.classList.add('hidden');
    compBox.classList.add('hidden');
    btn.textContent = '+ Compare Second Racket';
  }
}

document.addEventListener('DOMContentLoaded', init);