'use strict';
const byId = id => document.getElementById(id);
const t = OrionI18n.t;
const complements = {A:'T',T:'A',C:'G',G:'C'};
const sequences = ['ATCGG','GCTAA','TCGAT','CGATC','AGCTG','TACGC'];
let variant = OrionProgress.variant('dna'), savedVariant = variant;
let savedTarget = OrionProgress.read().hashTarget;
let stage = 0, partners = [], hintDepth = 0;
let solved = false, cluesOpen = false, saveFailed = false, checked = false;

function strand() { return sequences[(variant+stage)%6].slice(0,stage+3); }
function correct() { return [...strand()].every((base,i)=>partners[i]===complements[base]); }
function resetPanel() {
  partners = Array(strand().length).fill('');
  hintDepth = 0;
  solved = cluesOpen = saveFailed = checked = false;
  render();
}
function cycle(index) {
  if(solved || !Number.isInteger(index) || index<0 || index>=partners.length) return;
  const options=['','A','T','C','G'];
  partners[index]=options[(options.indexOf(partners[index])+1)%options.length];
  checked=false;render();
}
function render() {
  const complete = solved && stage === 2;
  window.OrionDiscovery?.update(complete);
  document.title = t('The Helix Library · Orion','螺旋藏書館 · Orion');
  byId('progress').textContent = t('Models restored','已修復模型')+' · '+(stage+Number(solved))+' / 3';
  byId('progress').parentElement.classList.toggle('complete',complete);
  byId('stageTitle').textContent = t('Model ','模型 ')+(stage+1);
  byId('instruction').textContent = t('Look at the original letters on the left. Choose a partner for each on the right, using the keeper’s example.','看看左邊原有的字母，再參照守護者的例子，為右邊每一格選擇伙伴。');
  byId('strand').innerHTML = [...strand()].map((base,i)=>'<div class="pair"><span class="base-'+base+'">'+base+'</span><b aria-hidden="true">↔</b><button class="base-'+partners[i]+'" data-index="'+i+'" aria-label="'+t('Partner for row ','第 ')+(i+1)+t(' beside '+base+' · ',' 行 '+base+' 旁的伙伴 · ')+(partners[i]||t('empty','未填'))+'" '+(solved?'disabled':'')+'>'+(partners[i]||'?')+'</button></div>').join('');
  byId('feedback').textContent = solved ? t('Every pair fits. The model shines!','每對都吻合，模型亮起來了！') : checked ? t('Some partners do not fit yet. Compare one row at a time.','有些伙伴還未配對成功，逐行比較再試試。') : '';
  const mismatch=[...strand()].findIndex((base,i)=>partners[i]!==complements[base]);
  const clues = [t('Look across each row, not down the column.','看每一行左右兩邊，不是上下相鄰的字母。'),t('A pairs with T in either direction. C pairs with G in either direction.','A 與 T 互相配對；C 與 G 也互相配對。'),mismatch<0?t('The partners fit. Check the model.','配對吻合，可以檢查模型。'):t('Row ','第 ')+(mismatch+1)+t(' needs ',' 行需要 ')+complements[strand()[mismatch]]];
  byId('hints').innerHTML = clues.slice(0,hintDepth).map(clue=>'<li>'+clue+'</li>').join('');
  byId('hint').setAttribute('aria-expanded', String(cluesOpen));
  byId('hint').setAttribute('aria-label', t('Reveal the next clue','顯示下一個提示'));
  byId('clues').hidden = !cluesOpen;
  byId('hint').hidden = byId('check').hidden = solved;
  byId('next').hidden = !solved || complete;
  byId('reward').hidden = !complete;
  byId('retrySave').hidden = !saveFailed;
  byId('saved').textContent = saveFailed ? t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。') : t('Blueprint Sigil saved.','已儲存藍圖符印。');
}


byId('strand').onclick = event => {
  const tile=event.target.closest('button[data-index]');
  if(!tile)return;
  const index=Number(tile.dataset.index);
  cycle(index);
  byId('strand').querySelectorAll('button')[index]?.focus();
};
byId('check').onclick = () => {
  if (solved) return;
  checked = true;
  solved = correct();
  if (solved) cluesOpen = false;
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('blueprint');
  render();
  if (solved && stage < 2) byId('next').focus();
};
byId('next').onclick = () => {
  if (!solved || stage >= 2) return;
  stage++;
  resetPanel();
  byId('strand').querySelector('button').focus();
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('blueprint');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('dna',variant);
  savedVariant = OrionProgress.variant('dna');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('dna');
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
