const BRANDS = [
  'andro', 'butterfly', 'dhs', 'donic', 'friendship', 
  'loki', 'nittaku', 'palio', 'sanwei', 'stiga', 
  'tibhar', 'victas', 'xiom', 'yasaka', 'yinhe'
];

const PRO_PROFILES = [
  // --- TOP MEN'S PROS ---
  { name: "Ma Long", brand: "DHS", bladeCategory: "inner", rubberCategory: "tacky", targetSpeed: 95, targetControl: 86, style: "Power Loop & All-Around Dominance" },
  { name: "Fan Zhendong", brand: "Butterfly", bladeCategory: "outer", rubberCategory: "hybrid", targetSpeed: 96, targetControl: 84, style: "Aggressive Counter-Drive" },
  { name: "Wang Chuqin", brand: "DHS", bladeCategory: "inner", rubberCategory: "tacky", targetSpeed: 96, targetControl: 85, style: "Left-Handed Explosive Attack" },
  { name: "Lin Shidong", brand: "DHS", bladeCategory: "inner", rubberCategory: "tacky", targetSpeed: 95, targetControl: 85, style: "Modern Fast Close-Table Attack" },
  { name: "Liang Jingkun", brand: "DHS", bladeCategory: "inner", rubberCategory: "tacky", targetSpeed: 94, targetControl: 85, style: "Heavy Power Drive & Counter-Loop" },
  { name: "Truls Möregårdh", brand: "Stiga", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 93, targetControl: 87, style: "Creative Variation & Block" },
  { name: "Felix Lebrun", brand: "Tibhar", bladeCategory: "outer", rubberCategory: "hybrid", targetSpeed: 95, targetControl: 84, style: "Penhold Ultra-Fast Attack" },
  { name: "Alexis Lebrun", brand: "Tibhar", bladeCategory: "outer", rubberCategory: "hybrid", targetSpeed: 96, targetControl: 80, style: "High-Risk Power Looper" },
  { name: "Hugo Calderano", brand: "Xiom", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 97, targetControl: 79, style: "Maximum Power From Both Wings" },
  { name: "Tomokazu Harimoto", brand: "Butterfly", bladeCategory: "inner", rubberCategory: "tensor", targetSpeed: 93, targetControl: 88, style: "Close-Table Power Counter" },
  { name: "Lin Yun-Ju", brand: "Butterfly", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 92, targetControl: 89, style: "Flick Precision & Placement" },
  { name: "Dimitrij Ovtcharov", brand: "Butterfly", bladeCategory: "inner", rubberCategory: "tensor", targetSpeed: 93, targetControl: 86, style: "Heavy Serve & Backhand Power" },
  { name: "Qiu Dang", brand: "Andro", bladeCategory: "inner", rubberCategory: "tensor", targetSpeed: 91, targetControl: 88, style: "Penhold Control & Placement" },
  { name: "Patrick Franziska", brand: "Butterfly", bladeCategory: "inner", rubberCategory: "tensor", targetSpeed: 92, targetControl: 87, style: "Powerful Backhand Counter" },
  { name: "Timo Boll", brand: "Butterfly", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 91, targetControl: 90, style: "Heavy Spin & Precision Placement" },
  { name: "Quadri Aruna", brand: "Gewo", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 98, targetControl: 75, style: "Brutal Forehand Loop Power" },
  { name: "Jang Woojin", brand: "Victas", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 95, targetControl: 82, style: "Footwork & Forehand Power" },
  { name: "An Jaehyun", brand: "Victas", bladeCategory: "inner", rubberCategory: "tensor", targetSpeed: 91, targetControl: 88, style: "Dynamic Mid-Distance Looper" },
  { name: "Cho Daeseong", brand: "Butterfly", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 92, targetControl: 86, style: "Left-Handed Quick Attack" },
  { name: "Darko Jorgic", brand: "Tibhar", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 94, targetControl: 84, style: "Devastating Backhand Loop" },
  { name: "Kristian Karlsson", brand: "Stiga", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 92, targetControl: 87, style: "Left-Handed Power Looper" },
  { name: "Anton Källberg", brand: "Stiga", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 93, targetControl: 86, style: "High-Speed Counter-Drive" },
  { name: "Marcos Freitas", brand: "Butterfly", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 90, targetControl: 89, style: "Left-Handed Control Looper" },
  { name: "Omar Assar", brand: "Butterfly", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 92, targetControl: 87, style: "Tall Mid-Distance Rally Specialist" },
  { name: "Liam Pitchford", brand: "Victas", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 94, targetControl: 83, style: "Ultra-Fast Backhand Punch" },
  { name: "Simon Gauzy", brand: "Andro", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 90, targetControl: 91, style: "Touch & Unconventional Placement" },
  { name: "Wong Chun Ting", brand: "DHS", bladeCategory: "inner", rubberCategory: "tacky", targetSpeed: 92, targetControl: 87, style: "Penhold Reverse Backhand Attack" },
  { name: "Chuang Chih-Yuan", brand: "Butterfly", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 91, targetControl: 88, style: "Fast Close-Table Counter-Attack" },
  { name: "Kao Cheng-Jui", brand: "Tibhar", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 92, targetControl: 86, style: "Fast Attack & Rapid Footwork" },
  { name: "Sharath Kamal", brand: "Butterfly", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 91, targetControl: 86, style: "Power Forehand & Long Reach" },
  { name: "Xu Xin", brand: "DHS", bladeCategory: "inner", rubberCategory: "tacky", targetSpeed: 94, targetControl: 89, style: "Penhold Cloud-Walker & Sky Loop" },

  // --- TOP WOMEN'S PROS ---
  { name: "Sun Yingsha", brand: "Stiga", bladeCategory: "outer", rubberCategory: "tacky", targetSpeed: 96, targetControl: 85, style: "Fast Power Offense" },
  { name: "Chen Meng", brand: "Butterfly", bladeCategory: "inner", rubberCategory: "tacky", targetSpeed: 94, targetControl: 88, style: "Solid Counter-Loop Drive" },
  { name: "Wang Manyu", brand: "DHS", bladeCategory: "inner", rubberCategory: "tacky", targetSpeed: 95, targetControl: 86, style: "Relentless Two-Winged Loop" },
  { name: "Wang Yidi", brand: "DHS", bladeCategory: "inner", rubberCategory: "tacky", targetSpeed: 93, targetControl: 86, style: "Aggressive Power Drive" },
  { name: "Kuai Man", brand: "DHS", bladeCategory: "inner", rubberCategory: "tacky", targetSpeed: 92, targetControl: 87, style: "Left-Handed Placement & Attack" },
  { name: "Hina Hayata", brand: "Nittaku", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 94, targetControl: 86, style: "Left-Handed High-Spin Loop" },
  { name: "Miwa Harimoto", brand: "Butterfly", bladeCategory: "inner", rubberCategory: "tensor", targetSpeed: 92, targetControl: 88, style: "Fast Two-Winged Counter-Drive" },
  { name: "Mima Ito", brand: "Nittaku", bladeCategory: "outer", rubberCategory: "pips", targetSpeed: 92, targetControl: 85, style: "Fast Close-Table Pips Attack" },
  { name: "Miu Hirano", brand: "Stiga", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 93, targetControl: 87, style: "Lightning Fast Close-Table Drive" },
  { name: "Shin Yubin", brand: "Butterfly", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 92, targetControl: 88, style: "Consistent Close-Table Attack" },
  { name: "Jeon Jihee", brand: "Butterfly", bladeCategory: "inner", rubberCategory: "tacky", targetSpeed: 91, targetControl: 88, style: "Left-Handed Controlled Loop" },
  { name: "Bernadette Szőcs", brand: "Tibhar", bladeCategory: "allwood", rubberCategory: "tensor", targetSpeed: 88, targetControl: 92, style: "Controlled Block & Precision" },
  { name: "Elizabeta Samara", brand: "Tibhar", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 89, targetControl: 90, style: "Left-Handed Consistent Looper" },
  { name: "Sofia Polcanova", brand: "Nittaku", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 89, targetControl: 90, style: "Left-Handed Tall Precision Block" },
  { name: "Nina Mittelham", brand: "Victas", bladeCategory: "outer", rubberCategory: "tensor", targetSpeed: 90, targetControl: 89, style: "Solid Two-Winged Counter" },

  // --- DEFENSIVE & SPECIALTY STYLES ---
  { name: "Han Ying", brand: "Victas", bladeCategory: "defensive", rubberCategory: "pips", targetSpeed: 68, targetControl: 97, style: "Classical Chopper & Counter" },
  { name: "Ruwen Filus", brand: "Butterfly", bladeCategory: "defensive", rubberCategory: "pips", targetSpeed: 70, targetControl: 96, style: "Modern Defense & Chop-Attack" },
  { name: "Yang Wang", brand: "Victas", bladeCategory: "defensive", rubberCategory: "pips", targetSpeed: 71, targetControl: 95, style: "Defensive Chopper & Forehand Smash" },
  { name: "Ni Xialian", brand: "Victas", bladeCategory: "allwood", rubberCategory: "pips", targetSpeed: 82, targetControl: 93, style: "Penhold Short Pips Block & Push" }
];


// Advanced categorization helper with separate FH & BH detection
function detectCategories(blade, fh, bh) {
  const bladeText = `${blade.brand || ''} ${blade.name || ''} ${blade.type || ''} ${blade.material || ''}`.toLowerCase();
  const fhText = `${fh.brand || ''} ${fh.name || ''} ${fh.version || ''} ${fh.spongeType || ''}`.toLowerCase();
  const bhText = `${bh.brand || ''} ${bh.name || ''} ${bh.version || ''} ${bh.spongeType || ''}`.toLowerCase();

  // 1. Blade Structure Classification
  let bladeCat = "outer"; // Default to Outer Carbon
  if (bladeText.includes("inner") || bladeText.includes("layer")) {
    bladeCat = "inner";
  } else if (bladeText.includes("allwood") || bladeText.includes("wood") || bladeText.includes("5-ply") || bladeText.includes("7-ply") || bladeText.includes("primorac") || bladeText.includes("korbel")) {
    bladeCat = "allwood";
  } else if (bladeText.includes("def") || bladeText.includes("defensive") || bladeText.includes("chopper")) {
    bladeCat = "defensive";
  }

  // 2. Individual Rubber Classification Helper
  const classifyRubber = (text) => {
    if (text.includes("pips") || text.includes("short") || text.includes("long") || text.includes("feint") || text.includes("curl") || text.includes("spectol") || text.includes("moristo")) {
      return "pips";
    }
    if (text.includes("sticky") || text.includes("tacky") || text.includes("chinese") || text.includes("hurricane") || text.includes("h3") || text.includes("skyline") || text.includes("triple")) {
      return "tacky";
    }
    if (text.includes("hybrid") || text.includes("dignics 09c") || text.includes("k3") || text.includes("rakza z") || text.includes("hybrid k")) {
      return "hybrid";
    }
    return "tensor"; // Default smooth European/Japanese tensor
  };

  const fhCat = classifyRubber(fhText);
  const bhCat = classifyRubber(bhText);

  // Overall primary rubber profile for player matching
  let rubberCat = fhCat;
  if (fhCat === "pips" || bhCat === "pips") rubberCat = "pips";
  else if (fhCat === "tacky" || bhCat === "tacky") rubberCat = "tacky";

  return { bladeCat, fhCat, bhCat, rubberCat };
}

function findSimilarPros(blade, fh, bh) {
  const { bladeCat, fhCat, bhCat, rubberCat } = detectCategories(blade, fh, bh);

  // Calculate composite metrics
  const calculatedSpeed = Math.round(((blade.speed || 0) * 0.5) + ((fh.speed || 0) * 0.25) + ((bh.speed || 0) * 0.25));
  const calculatedControl = Math.round(((blade.control || 0) * 0.4) + ((fh.control || 0) * 0.3) + ((bh.control || 0) * 0.3));

  const scoredPros = PRO_PROFILES.map(pro => {
    let score = 0;

    // 1. Brand Synergy (12 pts for Blade match, 8 pts for Rubber match)
    const proBrand = pro.brand.toLowerCase();
    const bladeBrand = (blade.brand || '').toLowerCase();
    const fhBrand = (fh.brand || '').toLowerCase();
    const bhBrand = (bh.brand || '').toLowerCase();

    if (bladeBrand === proBrand) score += 12;
    if (fhBrand === proBrand || bhBrand === proBrand) score += 8;

    // 2. Blade Structure Match (+25 pts)
    if (bladeCat === pro.bladeCategory) score += 25;

    // 3. Independent FH / BH Rubber Matching (+30 pts total)
    if (fhCat === pro.rubberCategory) score += 15;
    if (rubberCat === pro.rubberCategory || bhCat === pro.rubberCategory) score += 15;

    // 4. Performance Stat Proximity (+25 pts max)
    const speedDiff = Math.abs(calculatedSpeed - pro.targetSpeed);
    const controlDiff = Math.abs(calculatedControl - pro.targetControl);
    const totalDiff = speedDiff + controlDiff;
    score += Math.max(0, 25 - totalDiff);

    return { ...pro, score };
  });

  // Sort descending by highest match score
  scoredPros.sort((a, b) => b.score - a.score);

  // Return top 2 unique pro matches with their playstyle
  return scoredPros.slice(0, 2).map(p => `${p.name} (${p.style})`);
}

let catalog = {
  blades: [],
  rubbers: []
};

let isCompareActive = false;

async function init() {
  await loadAllJSONFiles();

  if (catalog.blades.length === 0 && catalog.rubbers.length === 0) {
    alert("No JSON data loaded. Ensure you are running through a local web server.");
    return;
  }

  populateDropdowns('r1');
  populateDropdowns('r2');

  bindEvents('r1');
  bindEvents('r2');

  document.getElementById('compareBtn').addEventListener('click', toggleCompareMode);

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
  const nameCompare = (a.name || '').localeCompare(b.name || '');
  if (nameCompare !== 0) return nameCompare;
  return (a.version || '').localeCompare(b.version || '');
}

function formatRubberLabel(r) {
  const tags = [];
  if (r.version) tags.push(r.version);
  if (r.spongeColor) tags.push(`${r.spongeColor} Sponge`);
  else if (r.spongeType) tags.push(r.spongeType);
  if (r.hardness) tags.push(r.hardness);

  const metaString = tags.length > 0 ? ` (${tags.join(' - ')})` : '';
  return `[${r.brand}] ${r.name}${metaString} — $${r.price || 0}`;
}

function populateDropdowns(prefix) {
  const bladeSel = document.getElementById(`${prefix}-blade`);
  const fhSel = document.getElementById(`${prefix}-fh`);
  const bhSel = document.getElementById(`${prefix}-bh`);

  bladeSel.innerHTML = catalog.blades.map((b, idx) => 
    `<option value="${idx}">[${b.brand}] ${b.name} — ${b.type || 'Offensive'} ($${b.price || 0})</option>`
  ).join('');

  const rubberOptions = catalog.rubbers.map((r, idx) => 
    `<option value="${idx}">${formatRubberLabel(r)}</option>`
  ).join('');

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

  const handles = (blade.handles && blade.handles.length > 0) ? blade.handles : ["FL", "ST", "CS"];
  handleSel.innerHTML = handles.map(h => `<option value="${h}">${h}</option>`).join('');
}

function bindEvents(prefix) {
  document.getElementById(`${prefix}-blade`).addEventListener('change', () => {
    updateHandleOptions(prefix);
    updateSummary(prefix);
  });

  document.getElementById(`${prefix}-fh`).addEventListener('change', () => updateSummary(prefix));
  document.getElementById(`${prefix}-bh`).addEventListener('change', () => updateSummary(prefix));
}

function findSimilarPros(blade, fh, bh) {
  const matches = [];
  const bladeText = `${blade.brand || ''} ${blade.name || ''} ${blade.type || ''}`.toLowerCase();
  const fhText = `${fh.brand || ''} ${fh.name || ''}`.toLowerCase();

  PRO_PROFILES.forEach(pro => {
    const bladeMatch = bladeText.includes(pro.bladeKeyword.toLowerCase()) || pro.brand.toLowerCase() === (blade.brand || '').toLowerCase();
    const fhMatch = fhText.includes(pro.fhKeyword.toLowerCase());

    if (bladeMatch || fhMatch) {
      matches.push(`${pro.name} (${pro.style})`);
    }
  });

  if (matches.length === 0) {
    if ((blade.speed || 0) > 90) matches.push("Modern Offensive Looper Style");
    else matches.push("Controlled Allround Tactician Style");
  }

  return matches.slice(0, 2); // Show top 2 matches
}

function updateSummary(prefix) {
  const bladeIdx = document.getElementById(`${prefix}-blade`).value;
  const fhIdx = document.getElementById(`${prefix}-fh`).value;
  const bhIdx = document.getElementById(`${prefix}-bh`).value;

  const blade = catalog.blades[bladeIdx] || { price: 0, weight: 0, speed: 0, control: 0 };
  const fh = catalog.rubbers[fhIdx] || { price: 0, weight: 0, speed: 0, control: 0, spin: 0, hardness: '-' };
  const bh = catalog.rubbers[bhIdx] || { price: 0, weight: 0, speed: 0, control: 0, spin: 0, hardness: '-' };

  const totalPrice = (blade.price || 0) + (fh.price || 0) + (bh.price || 0);
  const totalWeight = (blade.weight || 0) + (fh.weight || 0) + (bh.weight || 0);

  const calculatedSpeed = Math.round(((blade.speed || 0) * 0.5) + ((fh.speed || 0) * 0.25) + ((bh.speed || 0) * 0.25));
  const calculatedControl = Math.round(((blade.control || 0) * 0.4) + ((fh.control || 0) * 0.3) + ((bh.control || 0) * 0.3));
  const calculatedSpin = Math.round(((fh.spin || 0) + (bh.spin || 0)) / 2);

  document.getElementById(`${prefix}-price`).textContent = `$${totalPrice}`;
  document.getElementById(`${prefix}-weight`).textContent = `${totalWeight}g`;
  document.getElementById(`${prefix}-speed`).textContent = `${calculatedSpeed} / 100`;
  document.getElementById(`${prefix}-control`).textContent = `${calculatedControl} / 100`;
  document.getElementById(`${prefix}-spin`).textContent = `${calculatedSpin} / 100`;
  document.getElementById(`${prefix}-hardness`).textContent = `${fh.hardness || '-'} / ${bh.hardness || '-'}`;

  // Update Pro Matches
  const matchedPros = findSimilarPros(blade, fh, bh);
  document.getElementById(`${prefix}-pros`).innerHTML = matchedPros.map(p => `<span class="pro-tag">${p}</span>`).join('');

  if (isCompareActive) {
    updateComparisonSummary();
  }
}

function updateComparisonSummary() {
  const getData = (prefix) => {
    const blade = catalog.blades[document.getElementById(`${prefix}-blade`).value] || {};
    const fh = catalog.rubbers[document.getElementById(`${prefix}-fh`).value] || {};
    const bh = catalog.rubbers[document.getElementById(`${prefix}-bh`).value] || {};

    return {
      price: (blade.price || 0) + (fh.price || 0) + (bh.price || 0),
      weight: (blade.weight || 0) + (fh.weight || 0) + (bh.weight || 0),
      speed: Math.round(((blade.speed || 0) * 0.5) + ((fh.speed || 0) * 0.25) + ((bh.speed || 0) * 0.25)),
      control: Math.round(((blade.control || 0) * 0.4) + ((fh.control || 0) * 0.3) + ((bh.control || 0) * 0.3)),
      spin: Math.round(((fh.spin || 0) + (bh.spin || 0)) / 2)
    };
  };

  const r1 = getData('r1');
  const r2 = getData('r2');

  const diff = (val1, val2, unit = '') => {
    const d = val1 - val2;
    if (d === 0) return { winner: "Identical", diffText: "Equal" };
    if (d > 0) return { winner: `Racket #1`, diffText: `+${d}${unit} higher` };
    return { winner: `Racket #2`, diffText: `+${Math.abs(d)}${unit} higher` };
  };

  const priceComp = diff(r1.price, r2.price, '$');
  const weightComp = diff(r1.weight, r2.weight, 'g');
  const speedComp = diff(r1.speed, r2.speed, ' pts');
  const controlComp = diff(r1.control, r2.control, ' pts');
  const spinComp = diff(r1.spin, r2.spin, ' pts');

  const container = document.getElementById('comparisonMetricsGrid');
  container.innerHTML = `
    <div class="comp-card">
      <div class="comp-label">Cheaper Setup</div>
      <div class="comp-winner">${priceComp.winner === 'Identical' ? 'Same Cost' : (r1.price < r2.price ? 'Racket #1' : 'Racket #2')}</div>
      <div class="comp-diff">Difference: $${Math.abs(r1.price - r2.price)}</div>
    </div>
    <div class="comp-card">
      <div class="comp-label">Lighter Setup</div>
      <div class="comp-winner">${weightComp.winner === 'Identical' ? 'Same Weight' : (r1.weight < r2.weight ? 'Racket #1' : 'Racket #2')}</div>
      <div class="comp-diff">Difference: ${Math.abs(r1.weight - r2.weight)}g</div>
    </div>
    <div class="comp-card">
      <div class="comp-label">Faster / Higher Power</div>
      <div class="comp-winner">${speedComp.winner}</div>
      <div class="comp-diff">${speedComp.diffText}</div>
    </div>
    <div class="comp-card">
      <div class="comp-label">Higher Control</div>
      <div class="comp-winner">${controlComp.winner}</div>
      <div class="comp-diff">${controlComp.diffText}</div>
    </div>
    <div class="comp-card">
      <div class="comp-label">Higher Spin Potential</div>
      <div class="comp-winner">${spinComp.winner}</div>
      <div class="comp-diff">${spinComp.diffText}</div>
    </div>
  `;
}

function toggleCompareMode() {
  isCompareActive = !isCompareActive;
  const grid = document.getElementById('racketGrid');
  const card2 = document.getElementById('card-r2');
  const compBox = document.getElementById('comparisonSummaryBox');
  const btn = document.getElementById('compareBtn');

  if (isCompareActive) {
    grid.classList.remove('single-mode');
    grid.classList.add('compare-mode');
    card2.classList.remove('hidden');
    compBox.classList.remove('hidden');
    btn.textContent = '✕ Close Comparison';
    updateComparisonSummary();
  } else {
    grid.classList.remove('compare-mode');
    grid.classList.add('single-mode');
    card2.classList.add('hidden');
    compBox.classList.add('hidden');
    btn.textContent = '+ Compare Second Racket';
  }
}

document.addEventListener('DOMContentLoaded', init);