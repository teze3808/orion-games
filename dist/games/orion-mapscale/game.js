'use strict';
const byId = id => document.getElementById(id);
const t = OrionI18n.t;
let variant = OrionProgress.variant('mapscale'), savedVariant = variant;
let savedTarget = OrionProgress.read().hashTarget;
let stage = 0, distance = 0, hintDepth = 0;
let solved = false, cluesOpen = false, saveFailed = false, checked = false;

function route() {
  const first = 2 + (variant + stage) % 6;
  const second = stage === 2 ? 1 + variant % 3 : 0;
  const unit = 1 + (variant + stage) % 3;
  return {first, second, unit, total:(first + second) * unit};
}
function resetPanel() {
  distance = hintDepth = 0;
  solved = cluesOpen = saveFailed = checked = false;
  render();
}
function render() {
  const r = route();
  const complete = solved && stage === 2;
  window.OrionDiscovery?.update(complete);
  document.title = t('The Mountain Map Room · Orion','山徑藏圖室 · Orion');
  byId('progress').textContent = t('Charts restored','已修復地圖')+' · '+(stage+Number(solved))+' / 3';
  byId('progress').parentElement.classList.toggle('complete',complete);
  byId('stageTitle').textContent = [t('The lookout','瞭望台'),t('The lake crossing','湖畔渡口'),t('Via the camp','途經營地')][stage];
  byId('instruction').textContent = r.second ? t('Count both legs, from the gate through camp to the flag. How far is the whole route?','從大門途經營地到旗幟，數齊兩段路上的小格。全程有多遠？') : t('Follow the strip from the gate to the flag. Use the scale below to find the distance.','沿着大門至旗幟的路線數小格，再用下方比例尺找出距離。');
  const blocks = count => '<span class="leg">'+'<i class="segment"></i>'.repeat(count)+'</span>';
  byId('trail').innerHTML = '♜ '+blocks(r.first)+(r.second?' ⛺ '+blocks(r.second):'')+' ⚑';
  byId('trail').setAttribute('aria-label',t('Route lengths in map blocks: ','地圖路段格數：')+[r.first,r.second].filter(Boolean).join(' + '));
  byId('scale').innerHTML = '<i class="key segment" aria-hidden="true"></i> '+t('One block represents ','每一格代表 ')+r.unit+t(' km',' 公里');
  byId('distance').value = distance;
  byId('distance').disabled = solved;
  byId('reading').textContent = distance+t(' km',' 公里');
  byId('distance').setAttribute('aria-valuetext',byId('reading').textContent);
  byId('feedback').textContent = solved ? t('The distance seal fits!','里程吻合，封印打開了！') : checked ? (distance<r.total?t('Too short. Trace every block.','距離太短了，再數一次所有小格。'):t('Too far. Check this chart’s scale.','距離太長了，再看看這幅圖的比例尺。')) : '';
  const clues = [t('Count the spaces between the ends. Each coloured block is one space.','數兩端之間的小格。每個色塊就是一格。'),t('Add the scale distance once for every block.','每數一格，就加上比例尺所示的距離。'),(r.first+r.second)+' × '+r.unit+' = '+r.total+t(' km',' 公里')];
  byId('hints').innerHTML = clues.slice(0,hintDepth).map(clue=>'<li>'+clue+'</li>').join('');
  byId('hint').setAttribute('aria-expanded', String(cluesOpen));
  byId('hint').setAttribute('aria-label', t('Reveal the next clue','顯示下一個提示'));
  byId('clues').hidden = !cluesOpen;
  byId('hint').hidden = byId('check').hidden = solved;
  byId('next').hidden = !solved || complete;
  byId('reward').hidden = !complete;
  byId('retrySave').hidden = !saveFailed;
  byId('saved').textContent = saveFailed ? t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。') : t('Trailmark Sigil saved.','已儲存路標符印。');
}

byId('distance').oninput = event => {
  const value = Number(event.target.value);
  if(solved || !Number.isInteger(value) || value < 0 || value > 30) return;
  distance=value;
  checked=false;
  render();
};
byId('check').onclick = () => {
  if (solved) return;
  checked = true;
  solved = distance === route().total;
  if (solved) cluesOpen = false;
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('trailmark');
  render();
  if (solved && stage < 2) byId('next').focus();
};
byId('next').onclick = () => {
  if (!solved || stage >= 2) return;
  stage++;
  resetPanel();
  byId('distance').focus();
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('trailmark');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('mapscale',variant);
  savedVariant = OrionProgress.variant('mapscale');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('mapscale');
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
