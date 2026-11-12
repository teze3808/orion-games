'use strict';
const byId = id => document.getElementById(id);
const t = OrionI18n.t;
// Each string is a complete three-row picture, in reading order.
const patterns = [
  ['010111010','100110111','101010101'],
  ['111010010','001011111','010101010'],
  ['100100111','110011001','111101111'],
  ['001001111','101111010','100010001'],
  ['111100111','011010110','101101111'],
  ['101111101','010110100','001010100']
];
let variant = OrionProgress.variant('pixels');
let savedVariant = variant;
let savedTarget = OrionProgress.read().hashTarget;
let stage = 0, bits = [], hintDepth = 0;
let solved = false, cluesOpen = false, saveFailed = false, checked = false;

function target() { return patterns[variant][stage]; }
function firstDifference() {
  return bits.findIndex((value, i) => value !== target()[i]);
}
function resetPanel() {
  bits = Array(9).fill('0');
  if (stage === 1) {
    bits = target().split('');
    for (const index of [variant, (variant + 4) % 9]) bits[index] = bits[index] === '1' ? '0' : '1';
  }
  solved = cluesOpen = saveFailed = checked = false;
  hintDepth = 0;
  render();
}
function tileLabel(i) {
  const row = Math.floor(i / 3) + 1, column = i % 3 + 1;
  return t('Row '+row+', column '+column, '第 '+row+' 行，第 '+column+' 格');
}
function flip(index) {
  if (solved || !Number.isInteger(index) || index < 0 || index >= 9) return;
  bits[index] = bits[index] === '1' ? '0' : '1';
  checked = false;
  render();
}
function render() {
  const complete = solved && stage === 2;
  window.OrionDiscovery?.update(complete);
  document.title = t('The Pixelwright’s Workshop · Orion','像素工坊 · Orion');
  byId('progress').textContent = t('Mosaics restored','已修復的拼畫')+' · '+(stage+Number(solved))+' / 3';
  byId('progress').parentElement.classList.toggle('complete', complete);
  byId('stageTitle').textContent = [t('Build the mosaic','砌出拼畫'),t('Repair the mosaic','修復拼畫'),t('Write the picture code','寫出圖像編碼')][stage];
  byId('instruction').textContent = [
    t('Read each row of the plan from left to right. Tap a blue tile to turn it gold. Tap again to turn it blue.','由左至右讀圖則的每一行。點藍磚變成金磚，再點一次變回藍磚。'),
    t('Two tiles were turned over. Compare each row with the plan and fix the two tiles.','有兩塊磚被翻轉了。逐行對照圖則，把這兩塊磚改回來。'),
    t('Read the original mosaic. Tap the digits to write its three rows of code.','細看原作，點選數字，寫出三行圖像編碼。')
  ][stage];
  byId('referenceTitle').textContent = stage === 2 ? t('Original mosaic','拼畫原作') : t('Maker’s plan','工匠的圖則');
  byId('board').classList.toggle('encoding',stage === 2);
  byId('reference').classList.toggle('picture',stage === 2);
  byId('reference').innerHTML = target().split('').map((value,i) =>
    '<span class="v'+value+'" aria-label="'+tileLabel(i)+' '+value+'">'+(stage === 2 ? (value === '1' ? '◆' : '·') : value)+'</span>').join('');
  bits.forEach((bit,i) => {
    const cell = byId('tile'+i);
    cell.textContent = stage === 2 ? bit : bit === '1' ? '◆' : '·';
    cell.setAttribute('aria-pressed', String(bit === '1'));
    cell.setAttribute('aria-label', tileLabel(i)+' · '+bit);
    cell.disabled = solved;
  });
  const missing = firstDifference();
  const where = missing < 0 ? '' : tileLabel(missing);
  byId('feedback').textContent = solved ? t('All nine squares match. The seal opens!','九格全部吻合，封印打開了！') : checked ? t('Look again at row '+(Math.floor(missing/3)+1)+'.','再看看第 '+(Math.floor(missing/3)+1)+' 行。') : '';
  const clues = [t('Start at the top left. Finish one row before moving down.','從左上角開始，完成一行才往下一行。'),t('A gold diamond is 1. A blue dot is 0. The position of each tile matters.','金色菱形是 1，藍色圓點是 0。每塊磚的位置都很重要。'), missing < 0 ? t('The two patterns match. Check your work.','兩個圖案吻合，可以檢查了。') : t('Flip this square: ','翻轉這一格：')+where];
  byId('hints').innerHTML = clues.slice(0,hintDepth).map(clue=>'<li>'+clue+'</li>').join('');
  byId('hint').setAttribute('aria-expanded', String(cluesOpen));
  byId('hint').setAttribute('aria-label', t('Reveal the next clue','顯示下一個提示'));
  byId('clues').hidden = !cluesOpen;
  byId('hint').hidden = byId('check').hidden = solved;
  byId('next').hidden = !solved || complete;
  byId('reward').hidden = !complete;
  byId('retrySave').hidden = !saveFailed;
  byId('saved').textContent = saveFailed ? t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。') : t('Pixelweave Sigil saved.','已儲存織像符印。');
}
for (let i=0; i<9; i++) byId('tile'+i).onclick = () => flip(i);
byId('check').onclick = () => {
  if (solved) return;
  checked = true;
  solved = firstDifference() < 0;
  if (solved) cluesOpen = false;
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('pixelweave');
  render();
  if (solved && stage < 2) byId('next').focus();
};
byId('next').onclick = () => {
  if (!solved || stage >= 2) return;
  stage++;
  resetPanel();
  byId('tile0').focus();
};
byId('hint').onclick = () => {
  cluesOpen = true;
  hintDepth = Math.min(3,hintDepth + 1);
  render();
};
function closeClues() {
  cluesOpen = false;
  render();
  byId('hint').focus();
}
byId('close').onclick = closeClues;
window.addEventListener('keydown', e => { if (cluesOpen && e.key === 'Escape') closeClues(); });
byId('retrySave').onclick = () => {
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('pixelweave');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('pixels',variant);
  savedVariant = OrionProgress.variant('pixels');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('pixels');
  if (savedVariant !== next || savedTarget !== current.hashTarget) {
    savedVariant = variant = next;
    savedTarget = current.hashTarget;
    stage = 0;
    resetPanel();
  } else render();
}
window.addEventListener('storage', e => {
  if (e.key === null || e.key === 'orion-expedition-progress-v1') syncProgress();
});
window.addEventListener('pageshow',syncProgress);
window.addEventListener('orion-language',render);
resetPanel();
OrionI18n.apply();
