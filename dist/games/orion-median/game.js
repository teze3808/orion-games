'use strict';
const byId = id => document.getElementById(id);
const t = OrionI18n.t;
let variant = OrionProgress.variant('median'), savedVariant = variant;
let savedTarget = OrionProgress.read().hashTarget;
let stage = 0, order = [], selected = -1, hintDepth = 0;
let solved = false, cluesOpen = false, saveFailed = false, checked = false;

function readings() {
  const low = 8 + variant * 3;
  const offsets = [[7,0,3],[4,11,0,7,2],[2,21,2,0,6]][stage];
  return offsets.map(offset => low + offset);
}
function resetPanel() {
  order = [];
  selected = -1;
  hintDepth = 0;
  solved = cluesOpen = saveFailed = checked = false;
  render();
}
function sorted() {
  const values = readings();
  return order.every((id,i) => i===0 || values[order[i-1]]<=values[id]);
}
function isCorrect() {
  return order.length===readings().length && sorted() && selected===Math.floor(order.length/2);
}
function render() {
  const complete = solved && stage === 2, values = readings();
  window.OrionDiscovery?.update(complete);
  document.title = t('The Tidekeeper’s Archive · Orion','潮汐守護者的檔案館 · Orion');
  byId('progress').textContent = t('Records sealed','已蓋印紀錄')+' · '+(stage+Number(solved))+' / 3';
  byId('progress').parentElement.classList.toggle('complete',complete);
  byId('stageTitle').textContent = [t('The harbour steps','海港石階'),t('The lantern quay','燈籠碼頭'),t('The storm ledger','風暴日誌')][stage];
  byId('instruction').textContent = t('Tap the water levels from lowest to highest. Then tap the middle tile on the shelf and stamp it.','由低至高點選水位，再點選架上正中間的一塊，為它蓋印。');
  byId('cards').innerHTML = values.map((n,i)=>'<button data-id="'+i+'" style="--water:'+Math.round(n/52*100)+'%" '+(solved||order.includes(i)?'disabled':'')+'>'+n+t(' cm',' 厘米')+'</button>').join('');
  byId('shelf').innerHTML = order.map((id,i)=>'<button data-pos="'+i+'" aria-pressed="'+(selected===i)+'" '+(solved?'disabled':'')+'>'+values[id]+t(' cm',' 厘米')+'</button>').join('');
  byId('undo').disabled = solved || !order.length;
  byId('feedback').textContent = solved ? t('The middle reading fits the watermark!','中間的讀數與水印吻合！') : !checked ? '' : order.length<values.length ? t('Put every reading on the shelf first.','先把全部讀數放上架。') : !sorted() ? t('A smaller reading follows a larger one. Take tiles back and try again.','有較小的讀數排在較大的後面。收回幾塊，再試一次。') : t('Choose the tile with the same number of tiles on either side.','找出左右兩旁各有相同數量磚塊的那一塊。');
  const clues = [t('Start with the smallest number. Keep both tiles if a number repeats.','先找最小的數字。數字重複時，兩塊都要保留。'),t('Imagine covering one tile at each end until only one is left.','想像每次遮住左右兩端各一塊，直到只剩一塊。'),t('In this ordered row, tap tile ','排好後，由左起點選第 ')+(Math.floor(values.length/2)+1)+t(' from the left.',' 塊。')];
  byId('hints').innerHTML = clues.slice(0,hintDepth).map(clue=>'<li>'+clue+'</li>').join('');
  byId('hint').setAttribute('aria-expanded', String(cluesOpen));
  byId('hint').setAttribute('aria-label', t('Reveal the next clue','顯示下一個提示'));
  byId('clues').hidden = !cluesOpen;
  byId('hint').hidden = byId('check').hidden = solved;
  byId('next').hidden = !solved || complete;
  byId('reward').hidden = !complete;
  byId('retrySave').hidden = !saveFailed;
  byId('saved').textContent = saveFailed ? t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。') : t('Stillwater Sigil saved.','已儲存靜水符印。');
}


byId('cards').onclick = event => {
  const tile = event.target.closest('button[data-id]');
  if(!tile || solved) return;
  const id = Number(tile.dataset.id);
  if(order.includes(id)) return;
  order.push(id);
  selected=-1; checked=false; render();
  (byId('cards').querySelector('button:enabled') || byId('shelf').querySelector('button')).focus();
};
byId('shelf').onclick = event => {
  const tile = event.target.closest('button[data-pos]');
  if(!tile || solved) return;
  selected=Number(tile.dataset.pos); checked=false; render();
  byId('shelf').children[selected].focus();
};
byId('undo').onclick = () => {
  if(solved || !order.length) return;
  const id=order.pop(); selected=-1; checked=false; render();
  byId('cards').children[id].focus();
};
byId('check').onclick = () => {
  if (solved) return;
  checked = true;
  solved = isCorrect();
  if (solved) cluesOpen = false;
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('stillwater');
  render();
  if (solved && stage < 2) byId('next').focus();
};
byId('next').onclick = () => {
  if (!solved || stage >= 2) return;
  stage++;
  resetPanel();
  byId('cards').querySelector('button').focus();
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('stillwater');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('median',variant);
  savedVariant = OrionProgress.variant('median');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('median');
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
