/**
 * TT Racket Studio Engine - Core Application Logic
 */

const BRANDS = [
  'andro', 'butterfly', 'dhs', 'donic', 'friendship', 
  'loki', 'nittaku', 'palio', 'sanwei', 'stiga', 
  'tibhar', 'victas', 'xiom', 'yasaka', 'yinhe'
];

// Expanded 50 player profiles
const PRO_PROFILES = [
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

  { name: "Han Ying", brand: "Victas", bladeCategory: "defensive", rubberCategory: "pips", targetSpeed: 68, targetControl: 97, style: "Classical Chopper & Counter" },
  { name: "Ruwen Filus", brand: "Butterfly", bladeCategory: "defensive", rubberCategory: "pips", targetSpeed: 70, targetControl: 96, style: "Modern Defense & Chop-Attack" },
  { name: "Yang Wang", brand: "Victas", bladeCategory: "defensive", rubberCategory: "pips", targetSpeed: 71, targetControl: 95, style: "Defensive Chopper & Forehand Smash" },
  { name: "Ni Xialian", brand: "Victas", bladeCategory: "allwood", rubberCategory: "pips", targetSpeed: 82, targetControl: 93, style: "Penhold Short Pips Block & Push" }
];

// Advanced categorization helper with separate FH & BH detection
function detectCategories(blade, fh, bh) {
  const bladeText = `${blade.brand || ''} ${blade.name || ''} ${blade.type || ''} ${blade.material || ''} ${blade.composition || ''}`.toLowerCase();
  const fhText = `${fh.brand || ''} ${fh.name || ''} ${fh.version || ''} ${fh.spongeType || ''} ${fh.topsheetType || ''}`.toLowerCase();
  const bhText = `${bh.brand || ''} ${bh.name || ''} ${bh.version || ''} ${bh.spongeType || ''} ${bh.topsheetType || ''}`.toLowerCase();

  // 1. Blade Structure Classification
  let bladeCat = "outer"; 
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
    return "tensor"; 
  };

  const fhCat = classifyRubber(fhText);
  const bhCat = classifyRubber(bhText);

  let rubberCat = fhCat;
  if (fhCat === "pips" || bhCat === "pips") rubberCat = "pips";
  else if (fhCat === "tacky" || bhCat === "tacky") rubberCat = "tacky";

  return { bladeCat, fhCat, bhCat, rubberCat };
}

function findSimilarPros(blade, fh, bh) {
  const { bladeCat, fhCat, bhCat, rubberCat } = detectCategories(blade, fh, bh);

  const calculatedSpeed = Math.round(((blade.speed || 80) * 0.5) + ((fh.speed || 80) * 0.25) + ((bh.speed || 80) * 0.25));
  const calculatedControl = Math.round(((blade.control || 80) * 0.4) + ((fh.control || 80) * 0.3) + ((bh.control || 80) * 0.3));

  const scoredPros = PRO_PROFILES.map(pro => {
    let score = 0;

    const proBrand = pro.brand.toLowerCase();
    const bladeBrand = (blade.brand || '').toLowerCase();
    const fhBrand = (fh.brand || '').toLowerCase();
    const bhBrand = (bh.brand || '').toLowerCase();

    if (bladeBrand === proBrand) score += 12;
    if (fhBrand === proBrand || bhBrand === proBrand) score += 8;

    if (bladeCat === pro.bladeCategory) score += 25;

    if (fhCat === pro.rubberCategory) score += 15;
    if (rubberCat === pro.rubberCategory || bhCat === pro.rubberCategory) score += 15;

    const speedDiff = Math.abs(calculatedSpeed - pro.targetSpeed);
    const controlDiff = Math.abs(calculatedControl - pro.targetControl);
    const totalDiff = speedDiff + controlDiff;
    score += Math.max(0, 25 - totalDiff);

    return { ...pro, score };
  });

  scoredPros.sort((a, b) => b.score - a.score);

  return scoredPros.slice(0, 2);
}

// 15 Brand Flagships - Broadened keywords to prevent exact-match failures
const BRAND_FLAGSHIPS = [
  {
    brand: 'andro', name: 'Andro',
    bladeDisplay: 'Gauzy BL5 AR', fhDisplay: 'Rasanter R48 (48°)', bhDisplay: 'Hexer Grip (45°)',
    bladeKeywords: ['gauzy', 'bl5'], fhKeywords: ['rasanter', 'r48'], bhKeywords: ['hexer grip']
  },
  {
    brand: 'butterfly', name: 'Butterfly',
    bladeDisplay: 'Viscaria', fhDisplay: 'Dignics 09C (44°)', bhDisplay: 'Dignics 05 (40°)',
    bladeKeywords: ['viscaria'], fhKeywords: ['dignics 09c'], bhKeywords: ['dignics 05']
  },
  {
    brand: 'dhs', name: 'DHS',
    bladeDisplay: 'Hurricane Long 5', 
    fhDisplay: 'Hurricane 3 Neo National (Blue)', 
    bhDisplay: 'Hurricane 3 Neo National (Orange)',
    bladeKeywords: ['long 5'], // Broadened from 'hurricane long 5'
    fhKeywords: ['hurricane', 'national', 'blue'], 
    bhKeywords: ['hurricane', 'national', 'orange']
  },
  {
    brand: 'donic', name: 'Donic',
    bladeDisplay: 'Ovtcharov Carbospeed', fhDisplay: 'Bluestorm Z1 (47.5°)', bhDisplay: 'Bluegrip C2 (50°)',
    bladeKeywords: ['ovtcharov', 'carbospeed'], fhKeywords: ['bluestorm z1'], bhKeywords: ['bluegrip c2']
  },
  {
    brand: 'friendship', name: 'Friendship 729',
    bladeDisplay: '729 Dragon Max', fhDisplay: 'Battle II (39°)', bhDisplay: 'Focus III (42°)',
    bladeKeywords: ['dragon max'], fhKeywords: ['battle ii'], bhKeywords: ['focus iii']
  },
  {
    brand: 'loki', name: 'Loki',
    bladeDisplay: 'Arthur China', fhDisplay: 'RXTON 3 (39°)', bhDisplay: 'RXTON 1 (38°)',
    bladeKeywords: ['arthur'], fhKeywords: ['rxton 3'], bhKeywords: ['rxton 1']
  },
  {
    brand: 'nittaku', name: 'Nittaku',
    bladeDisplay: 'Acoustic Carbon', fhDisplay: 'Fastarc G-1 (47.5°)', bhDisplay: 'Fastarc C-1 (45°)',
    bladeKeywords: ['acoustic carbon'], fhKeywords: ['fastarc g-1'], bhKeywords: ['fastarc c-1']
  },
  {
    brand: 'palio', name: 'Palio',
    bladeDisplay: 'Energy 02', fhDisplay: 'AK47 Blue (38°)', bhDisplay: 'AK47 Red (45°)',
    bladeKeywords: ['energy 02'], fhKeywords: ['ak47', 'blue'], bhKeywords: ['ak47', 'red']
  },
  {
    brand: 'sanwei', name: 'Sanwei',
    bladeDisplay: 'F3 Pro Carbon', fhDisplay: 'Target Pro (39°)', bhDisplay: 'Gear Hyper (38°)',
    bladeKeywords: ['f3 pro'], fhKeywords: ['target pro'], bhKeywords: ['gear hyper']
  },
  {
    brand: 'stiga', name: 'Stiga',
    bladeDisplay: 'Clipper CR', fhDisplay: 'Mantra M (47.5°)', bhDisplay: 'Mantra S (42.5°)',
    bladeKeywords: ['clipper'], // Broadened from 'clipper cr'
    fhKeywords: ['mantra m'], bhKeywords: ['mantra s']
  },
  {
    brand: 'tibhar', name: 'Tibhar',
    bladeDisplay: 'Samsonov Force Pro', fhDisplay: 'Evolution MX-P (47.5°)', bhDisplay: 'Evolution EL-P (45°)',
    bladeKeywords: ['samsonov force'], fhKeywords: ['mx-p'], bhKeywords: ['el-p'] // Broadened rubber matches
  },
  {
    brand: 'victas', name: 'Victas',
    bladeDisplay: 'Koki Niwa Wood', fhDisplay: 'V>15 Extra (47.5°)', bhDisplay: 'V>11 Extra (47.5°)',
    bladeKeywords: ['koki niwa'], fhKeywords: ['v>15', 'extra'], bhKeywords: ['v>11', 'extra']
  },
  {
    brand: 'xiom', name: 'Xiom',
    bladeDisplay: '36.5 ALX', fhDisplay: 'Omega VII Pro (47.5°)', bhDisplay: 'Vega Pro (47.5°)',
    bladeKeywords: ['36.5'], fhKeywords: ['omega vii pro'], bhKeywords: ['vega pro']
  },
  {
    brand: 'yasaka', name: 'Yasaka',
    bladeDisplay: 'Ma Lin Extra Offensive', fhDisplay: 'Rakza 7 (47.5°)', bhDisplay: 'Rakza Z (50°)',
    bladeKeywords: ['ma lin', 'extra'], // Fixed spelling and split to guarantee a match
    fhKeywords: ['rakza 7'], bhKeywords: ['rakza z']
  },
  {
    brand: 'yinhe', name: 'Yinhe',
    bladeDisplay: 'T11+ Carbon', fhDisplay: 'Moon Speed (39°)', bhDisplay: 'Big Dipper (38°)',
    bladeKeywords: ['t11'], fhKeywords: ['moon speed'], bhKeywords: ['big dipper']
  }
];

const HANDLE_OPTIONS = [
  { val: 'FL', label: 'FL (Flared / Concave)' },
  { val: 'ST', label: 'ST (Straight)' },
  { val: 'CS', label: 'CS (Chinese Penhold)' }
];

let catalog = { blades: [], rubbers: [] };
let isCompareActive = false;

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function parseHardnessShoreC(rubber) {
  if (!rubber) return 42.5;
  let deg = 42.5;
  if (rubber.spongeHardness) {
    deg = parseFloat(rubber.spongeHardness);
  } else if (rubber.hardness) {
    const matched = rubber.hardness.toString().match(/\d+(\.\d+)?/);
    if (matched) deg = parseFloat(matched[0]);
  }
  return Math.min(60, Math.max(30, deg));
}

function parseThrowScore(throwAngle) {
  if (!throwAngle) return 3.0;
  const val = throwAngle.toString().toLowerCase().trim();
  switch (val) {
    case 'very-high': return 4.5;
    case 'high': return 4.0;
    case 'medium-high': return 3.5;
    case 'medium': return 3.0;
    case 'medium-low': return 2.5;
    case 'low': return 2.0;
    case 'very-low': return 1.5;
    default: return 3.0;
  }
}

function calculateSideThrowAngle(blade, rubber) {
  if (!rubber) return 3.0;
  const bladeDwell = blade?.stiffness === 'flexible' ? 0.5 : (blade?.stiffness === 'stiff' ? -0.4 : 0);
  const baseRubberThrow = parseThrowScore(rubber.throwAngle);
  const finalThrow = baseRubberThrow + bladeDwell;
  return parseFloat(Math.max(1.0, Math.min(5.0, finalThrow)).toFixed(1));
}

function calculateNetThrowAngle(blade, fh, bh) {
  const fhArc = calculateSideThrowAngle(blade, fh);
  const bhArc = calculateSideThrowAngle(blade, bh);
  return parseFloat(((fhArc + bhArc) / 2).toFixed(1));
}

function calculateCutRubberWeight(rubber) {
  if (!rubber) return 44;
  const hardness = parseHardnessShoreC(rubber);
  const topsheet = rubber.topsheetType || 'tensor';
  const baseWeight = topsheet === 'tacky' ? 26 : (topsheet.includes('pips') ? 18 : 22);
  return Math.round(baseWeight + (hardness * 0.22) + 9.5);
}

function calculateHighImpactSpeed(blade, fh, bh) {
  const stiffnessMult = blade.stiffness === 'stiff' ? 1.08 : (blade.stiffness === 'flexible' ? 0.92 : 1.0);
  const compositionMult = blade.composition === 'outer_carbon' ? 1.08 : 1.0;
  const rawSpeed = (((blade.speed || 80) * 0.5) + ((fh.speed || 80) * 0.25) + ((bh.speed || 80) * 0.25)) * stiffnessMult * compositionMult;
  return Math.min(100, Math.round(rawSpeed));
}

function calculateLowImpactSpeed(blade, fh, bh) {
  const rawTouch = 100 - (((blade.control || 80) * 0.4) + ((parseHardnessShoreC(fh) + parseHardnessShoreC(bh)) / 2) * 0.4);
  return Math.max(30, Math.min(95, Math.round(rawTouch)));
}

function evaluateSetupSynergy(blade, fh, bh, bladeWeight, fhCutWeight, bhCutWeight) {
  const warnings = [];
  const totalCutRubberWeight = fhCutWeight + bhCutWeight;
  const isStiff = blade.stiffness === 'stiff';
  const isOuterCarbon = blade.composition === 'outer_carbon';

  const fhHard = parseHardnessShoreC(fh) >= 48;
  const bhHard = parseHardnessShoreC(bh) >= 48;
  const fhTacky = fh.topsheetType === 'tacky';
  const bhTacky = bh.topsheetType === 'tacky';

  if (isOuterCarbon && isStiff && ((fhHard && fhTacky) || (bhHard && bhTacky))) {
    warnings.push({
      type: 'mechanics',
      title: 'Power Mechanics Required',
      message: 'Stiff outer-carbon blade paired with a hard tacky sponge requires fast arm acceleration to engage properly.'
    });
  }

  if (totalCutRubberWeight > 94 && bladeWeight < 83) {
    warnings.push({
      type: 'balance',
      title: 'Head-Heavy Alert',
      message: 'Cut rubbers exceed 94g on a light blade (<83g). High risk of wrist strain and sluggish recovery time.'
    });
  }

  return warnings;
}

async function init() {
  await loadAllJSONFiles();

  populateDropdowns('r1');
  populateDropdowns('r2');

  bindEvents('r1');
  bindEvents('r2');

  const compareBtn = document.getElementById('compareBtn');
  if (compareBtn) compareBtn.addEventListener('click', toggleCompareMode);
  
  const flagshipBtn = document.getElementById('flagshipBtn');
  if (flagshipBtn) flagshipBtn.addEventListener('click', openFlagshipModal);

  const closeFlagshipModal = document.getElementById('closeFlagshipModal');
  if (closeFlagshipModal) closeFlagshipModal.addEventListener('click', () => document.getElementById('flagshipModal').classList.add('hidden'));

  updateSummary('r1');
  updateSummary('r2');
}

async function loadAllJSONFiles() {
  try {
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
  } catch (err) {
    console.warn("Dataset loading error.");
  }
}

function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
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
    const hardness = r.spongeHardness || r.hardness || '42.5°';
    const spongeInfo = r.spongeColor ? `, ${r.spongeColor}` : '';
    return `<option value="${idx}">[${r.brand}] ${r.name} (${r.topsheetType || 'tensor'}${spongeInfo}, ${hardness}) — $${r.price || 0}</option>`;
  }).join('');

  fhSel.innerHTML = rubberOptions;
  bhSel.innerHTML = rubberOptions;

  populateHandles(prefix);
}

function populateHandles(prefix) {
  const handleSel = document.getElementById(`${prefix}-handle`);
  if (!handleSel) return;
  handleSel.innerHTML = HANDLE_OPTIONS.map(h => `<option value="${h.val}">${h.label}</option>`).join('');
}

function bindEvents(prefix) {
  const bladeSel = document.getElementById(`${prefix}-blade`);
  const fhSel = document.getElementById(`${prefix}-fh`);
  const bhSel = document.getElementById(`${prefix}-bh`);

  if (bladeSel) bladeSel.addEventListener('change', () => updateSummary(prefix));
  if (fhSel) fhSel.addEventListener('change', () => updateSummary(prefix));
  if (bhSel) bhSel.addEventListener('change', () => updateSummary(prefix));
}

function updateSummary(prefix) {
  const bladeIdx = parseInt(document.getElementById(`${prefix}-blade`)?.value, 10) || 0;
  const fhIdx = parseInt(document.getElementById(`${prefix}-fh`)?.value, 10) || 0;
  const bhIdx = parseInt(document.getElementById(`${prefix}-bh`)?.value, 10) || 0;

  const blade = catalog.blades[bladeIdx] || catalog.blades[0] || {};
  const fh = catalog.rubbers[fhIdx] || catalog.rubbers[0] || {};
  const bh = catalog.rubbers[bhIdx] || catalog.rubbers[0] || {};

  const bladeWeight = blade.weight || 84;
  const fhCutWeight = calculateCutRubberWeight(fh);
  const bhCutWeight = calculateCutRubberWeight(bh);
  const totalWeight = bladeWeight + fhCutWeight + bhCutWeight;

  const totalPrice = (blade.price || 0) + (fh.price || 0) + (bh.price || 0);
  const highImpactSpeed = calculateHighImpactSpeed(blade, fh, bh);
  const lowImpactSpeed = calculateLowImpactSpeed(blade, fh, bh);
  
  const overallSpeed = Math.round((highImpactSpeed + (blade.speed || 80)) / 2);
  const controlRating = Math.round(((blade.control || 80) * 0.5) + ((fh.control || 80) * 0.25) + ((bh.control || 80) * 0.25));
  const spinRating = Math.round(((fh.spin || 82) + (bh.spin || 82)) / 2);
  
  const fhArc = calculateSideThrowAngle(blade, fh);
  const bhArc = calculateSideThrowAngle(blade, bh);
  const netThrow = calculateNetThrowAngle(blade, fh, bh);

  const fhHardnessStr = fh.spongeHardness || fh.hardness || `${parseHardnessShoreC(fh)}°`;
  const bhHardnessStr = bh.spongeHardness || bh.hardness || `${parseHardnessShoreC(bh)}°`;

  safeSetText(`${prefix}-price`, `$${totalPrice}`);
  safeSetText(`${prefix}-weight`, `${totalWeight}g (±5g)`);
  safeSetText(`${prefix}-speed`, `${overallSpeed} / 100`);
  safeSetText(`${prefix}-control`, `${controlRating} / 100`);
  safeSetText(`${prefix}-spin`, `${spinRating} / 100`);
  safeSetText(`${prefix}-hardness`, `${fhHardnessStr} / ${bhHardnessStr}`);

  safeSetText(`${prefix}-speed-high`, `${highImpactSpeed} / 100`);
  safeSetText(`${prefix}-speed-low`, `${lowImpactSpeed} / 100`);
  
  safeSetText(`${prefix}-throw`, `${netThrow} / 5.0`);
  safeSetText(`${prefix}-fh-throw`, `${fhArc} / 5.0`);
  safeSetText(`${prefix}-bh-throw`, `${bhArc} / 5.0`);

  // Pro Match binding
  const proMatches = findSimilarPros(blade, fh, bh);
  const proContainer = document.getElementById(`${prefix}-pro-matches`);
  if (proContainer) {
    proContainer.innerHTML = proMatches.map(p => 
      `<div class="pro-match-badge"><strong>${p.name}</strong> <span>(${p.style})</span></div>`
    ).join('');
  } else {
    safeSetText(`${prefix}-pros`, proMatches.map(p => `${p.name} (${p.style})`).join(' | '));
  }

  const warnings = evaluateSetupSynergy(blade, fh, bh, bladeWeight, fhCutWeight, bhCutWeight);
  const warnBox = document.getElementById(`${prefix}-warnings`);
  if (warnBox) {
    if (warnings.length > 0) {
      warnBox.innerHTML = warnings.map(w => `<div class="alert-box alert-${w.type}"><strong>${w.title}:</strong> ${w.message}</div>`).join('');
      warnBox.classList.remove('hidden');
    } else {
      warnBox.innerHTML = '';
      warnBox.classList.add('hidden');
    }
  }
}

function openFlagshipModal() {
  const container = document.getElementById('flagshipGrid');
  if (container) {
    container.innerHTML = BRAND_FLAGSHIPS.map((item) => `
      <div class="flagship-card">
        <div>
          <div class="brand-title">${item.name}</div>
          <div class="flagship-info">
            <div class="flagship-item">
              <span class="item-tag">Blade:</span>
              <span class="item-val">${item.bladeDisplay}</span>
            </div>
            <div class="flagship-item">
              <span class="item-tag">FH Rubber:</span>
              <span class="item-val">${item.fhDisplay}</span>
            </div>
            <div class="flagship-item">
              <span class="item-tag">BH Rubber:</span>
              <span class="item-val">${item.bhDisplay}</span>
            </div>
          </div>
        </div>
        <button class="btn-load" onclick="loadFlagshipToSetup('${item.brand}')">⚡ Load Setup</button>
      </div>
    `).join('');
  }
  document.getElementById('flagshipModal').classList.remove('hidden');
}

function findBestMatch(itemsList, brandKey, targetKeywords) {
  if (!itemsList || itemsList.length === 0) return 0;

  const brandItems = [];
  itemsList.forEach((item, originalIndex) => {
    const itemBrand = (item.brand || '').toLowerCase();
    if (itemBrand.includes(brandKey.toLowerCase())) {
      brandItems.push({ item, originalIndex });
    }
  });

  const searchPool = brandItems.length > 0 ? brandItems : itemsList.map((item, originalIndex) => ({ item, originalIndex }));

  let bestIndex = searchPool[0].originalIndex;
  let highestScore = -1;

  searchPool.forEach(({ item, originalIndex }) => {
    const itemName = (item.name || '').toLowerCase();
    let score = 0;

    targetKeywords.forEach((kw) => {
      const lowerKw = kw.toLowerCase();
      if (itemName.includes(lowerKw)) {
        score += 30;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestIndex = originalIndex;
    }
  });

  return bestIndex;
}

window.loadFlagshipToSetup = function(brandKey) {
  const flagship = BRAND_FLAGSHIPS.find(f => f.brand === brandKey);
  if (!flagship) return;

  const bladeIdx = findBestMatch(catalog.blades, brandKey, flagship.bladeKeywords);
  const fhIdx = findBestMatch(catalog.rubbers, brandKey, flagship.fhKeywords);
  const bhIdx = findBestMatch(catalog.rubbers, brandKey, flagship.bhKeywords);

  const bladeSel = document.getElementById('r1-blade');
  const fhSel = document.getElementById('r1-fh');
  const bhSel = document.getElementById('r1-bh');

  if (bladeSel) bladeSel.value = bladeIdx;
  if (fhSel) fhSel.value = fhIdx;
  if (bhSel) bhSel.value = bhIdx;

  updateSummary('r1');
  document.getElementById('flagshipModal').classList.add('hidden');
};

function toggleCompareMode() {
  isCompareActive = !isCompareActive;
  const card2 = document.getElementById('card-r2');
  const compBox = document.getElementById('comparisonSummaryBox');
  const btn = document.getElementById('compareBtn');

  if (isCompareActive) {
    if (card2) card2.classList.remove('hidden');
    if (compBox) compBox.classList.remove('hidden');
    if (btn) btn.textContent = '✕ Close Comparison';
  } else {
    if (card2) card2.classList.add('hidden');
    if (compBox) compBox.classList.add('hidden');
    if (btn) btn.textContent = '+ Compare Second Racket';
  }
}
  function updateComparisonSummary() {
  // Logic for side-by-side comparison can go here
  console.log("Comparison mode updated");
}

document.addEventListener('DOMContentLoaded', init);