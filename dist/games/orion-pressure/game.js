'use strict';
const byId = id => document.getElementById(id);
const t = OrionI18n.t;
let variant = OrionProgress.variant('pressure'), savedVariant = variant;
let savedTarget = OrionProgress.read().hashTarget;
let stage = 0, area = 1, hintDepth = 0;
let solved = false, cluesOpen = false, saveFailed = false, checked = false;

function challenge() {
  const targetArea = 2 + (variant + stage * 2) % 7;
  const pressure = 10 + stage * 5 + variant * 2;
  return {area:targetArea, pressure, force:targetArea * pressure};
}
function resetPanel() {
  area = 1;
  hintDepth = 0;
  solved = cluesOpen = saveFailed = checked = false;
  render();
}
function render() {
  const q = challenge(), complete = solved && stage === 2;
  window.OrionDiscovery?.update(complete);
  document.title = t('The Sandstone Vault · Orion','砂岩密庫 · Orion');
  byId('progress').textContent = t('Seals opened','已開啟封印')+' · '+(stage+Number(solved))+' / 3';
  byId('progress').parentElement.classList.toggle('complete',complete);
  byId('stageTitle').textContent = t('Stone ','石塊 ')+(stage+1);
  byId('instruction').textContent = t('Drag the slider to spread the stone’s force across more or fewer square metres. Watch the pressure reading.','拖動滑桿，讓石塊的力分布在較多或較少平方米上。觀察壓強讀數。');
  byId('load').textContent = t('Downward force: ','向下的力：')+q.force+' N';
  byId('base').innerHTML = '<i></i>'.repeat(area);
  byId('base').setAttribute('aria-label',t('Base contact area ','底座接觸面積 ')+area+t(' square metres',' 平方米'));
  byId('area').value = area;
  byId('area').disabled = solved;
  byId('areaValue').textContent = area+' m²';
  byId('area').setAttribute('aria-valuetext',t(area+' square metres',area+' 平方米'));
  byId('reading').textContent = t('Pressure: ','壓強：')+(q.force/area).toFixed(1)+' Pa';
  byId('goal').textContent = t('Match exactly ','調至恰好 ')+q.pressure+' Pa';
  byId('feedback').textContent = solved ? t('The seal glows. The pressure matches!','封印亮起，壓強吻合！') : checked ? (area<q.area?t('Pressure is too high. Try a wider base.','壓強太高，試試較大的底座。'):t('Pressure is too low. Try a smaller base.','壓強太低，試試較小的底座。')) : '';
  const clues = [t('Keep watching the pressure as you increase the area.','增加面積時，留意壓強怎樣改變。'),t('The same force is shared over the base. Twice the area gives half the pressure.','同一股力分布在底座上。面積加倍，壓強減半。'),q.force+' N ÷ '+q.area+' m² = '+q.pressure+' Pa'];
  byId('hints').innerHTML = clues.slice(0,hintDepth).map(clue=>'<li>'+clue+'</li>').join('');
  byId('hint').setAttribute('aria-expanded', String(cluesOpen));
  byId('hint').setAttribute('aria-label', t('Reveal the next clue','顯示下一個提示'));
  byId('clues').hidden = !cluesOpen;
  byId('hint').hidden = byId('check').hidden = solved;
  byId('next').hidden = !solved || complete;
  byId('reward').hidden = !complete;
  byId('retrySave').hidden = !saveFailed;
  byId('saved').textContent = saveFailed ? t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。') : t('Footing Sigil saved.','已儲存穩基符印。');
}


byId('area').oninput = event => {
  const value = Number(event.target.value);
  if(solved || !Number.isInteger(value) || value < 1 || value > 8) return;
  area=value; checked=false; render();
};
byId('check').onclick = () => {
  if (solved) return;
  checked = true;
  solved = area === challenge().area;
  if (solved) cluesOpen = false;
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('footing');
  render();
  if (solved && stage < 2) byId('next').focus();
};
byId('next').onclick = () => {
  if (!solved || stage >= 2) return;
  stage++;
  resetPanel();
  byId('area').focus();
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('footing');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('pressure',variant);
  savedVariant = OrionProgress.variant('pressure');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('pressure');
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
