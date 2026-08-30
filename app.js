const BRANDS = [
  'andro', 'butterfly', 'dhs', 'donic', 'friendship', 
  'loki', 'nittaku', 'palio', 'sanwei', 'stiga', 
  'tibhar', 'victas', 'xiom', 'yasaka', 'yinhe'
];

// Reference pro setup profiles for matching
const PRO_PROFILES = [
  { name: "Ma Long", brand: "DHS", bladeKeyword: "Long 5", fhKeyword: "Hurricane", style: "Power Loop & Control" },
  { name: "Fan Zhendong", brand: "Butterfly", bladeKeyword: "Viscaria", fhKeyword: "Dignics", style: "Aggressive Counter-Drive" },
  { name: "Lin Gaoyuan", brand: "Butterfly", bladeKeyword: "ALC", fhKeyword: "Dignics", style: "Fast Close-Table Backhand" },
  { name: "Wang Chuqin", brand: "DHS", bladeKeyword: "968", fhKeyword: "Hurricane", style: "Left-Handed Aggressive Offense" },
  { name: "Truls Möregårdh", brand: "Stiga", bladeKeyword: "Cybershape", fhKeyword: "Dignics", style: "Creative Variation & Block" },
  { name: "Felix Lebrun", brand: "Tibhar", bladeKeyword: "ALC", fhKeyword: "Hybrid", style: "Penhold Fast Offense" },
  { name: "Tomokazu Harimoto", brand: "Butterfly", bladeKeyword: "Harimoto", fhKeyword: "Dignics", style: "Close-Table Power Counter" }
];

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