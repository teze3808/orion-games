 'use strict';
const byId=id=>document.getElementById(id),t=OrionI18n.t;
const orders=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
const labels={right:['Net movement to the right','淨移動向右'],left:['Net movement to the left','淨移動向左'],equal:['Equal movement both ways','兩方向移動相等']};
let variant=OrionProgress.variant('diffusion'),savedVariant=variant,savedTarget=OrionProgress.read().hashTarget;
let stage=0,observed=false,choice='',hintDepth=0,solved=false,cluesOpen=false,saveFailed=false,checked=false;
function sample(){const hi=20+4*(variant%3),lo=4+4*(variant%3);return [[hi,lo],[lo,hi],[(hi+lo)/2,(hi+lo)/2]][orders[variant][stage]];}
function transfers(){return sample().map(n=>n/4);}
function result(){const [a,b]=sample(),[ab,ba]=transfers();return [a-ab+ba,b-ba+ab];}
function answer(){const [a,b]=sample();return a>b?'right':a<b?'left':'equal';}
function resetPanel(){observed=false;choice='';hintDepth=0;solved=cluesOpen=saveFailed=checked=false;render();}
function observe(){if(solved||observed)return;observed=true;checked=false;render();}
function select(key){if(solved||!Object.hasOwn(labels,key))return;choice=key;checked=false;render();}
function render(){const complete=solved&&stage===2,before=sample(),values=observed?result():before,[ab,ba]=transfers();window.OrionDiscovery?.update(complete);document.title=t('The Mistglass Conservatory · Orion','霧晶溫室 · Orion');byId('progress').textContent=t('Records restored','已修復記錄')+' · '+(stage+Number(solved))+' / 3';byId('progress').parentElement.classList.toggle('complete',complete);byId('stageTitle').textContent=t('Chamber pair ','雙室 ')+(stage+1);
byId('chambers').innerHTML=values.map((n,i)=>'<div class="chamber"><b>'+t(i?'Right':'Left',i?'右室':'左室')+' · '+n+'</b><div class="particles" role="img" aria-label="'+n+t(' particles',' 個粒子')+'">'+'<i aria-hidden="true"></i>'.repeat(n)+'</div></div>').join('');byId('initial').textContent=t('Before: left ','起初：左 ')+before[0]+t(' · right ',' · 右 ')+before[1];byId('phase').textContent=observed?t('After one model step','一次模型步驟後'):t('Before the model step','模型步驟前');
byId('log').textContent=observed?t('Left → right: ','左 → 右：')+ab+' · '+t('Right → left: ','右 → 左：')+ba:t('Observe a step to reveal the crossing counts.','觀察一次步驟，查看兩方向的通過數目。');
byId('choices').innerHTML=Object.entries(labels).map(([key,label])=>'<button data-choice="'+key+'" aria-pressed="'+(choice===key)+'" '+(solved?'disabled':'')+'>'+t(...label)+'</button>').join('');byId('observe').disabled=solved||observed;byId('retry').disabled=solved;
byId('feedback').textContent=solved?t('Your record matches the crossings!','你的記錄與通過數目吻合！'):checked?(!observed?t('Observe the model step before checking your record.','先觀察模型步驟，再檢查記錄。'):t('Compare the two crossing counts. Which is larger, or are they equal?','比較兩方向的通過數目。哪邊較多，還是相等？')):'';
const clues=[t('Count crossings in BOTH directions, not just the particles left in a chamber.','數一數兩個方向的通過數目，不只是室內剩下的粒子。'),t('Net movement is the difference between the two crossing counts. Equal counts cancel, even though particles move.','淨移動是兩方向通過數目的差。數目相等時互相抵消，但粒子仍有移動。'),observed?t('The record is: ','記錄應是：')+t(...labels[answer()]):t('Press Observe a step first.','先按「觀察一步」。')];byId('hints').innerHTML=clues.slice(0,hintDepth).map(x=>'<li>'+x+'</li>').join('');byId('clues').hidden=!cluesOpen;byId('hint').setAttribute('aria-expanded',String(cluesOpen));byId('hint').setAttribute('aria-label',t('Reveal the next clue','顯示下一個提示'));byId('hint').hidden=byId('check').hidden=solved;byId('next').hidden=!solved||complete;byId('reward').hidden=!complete;byId('retrySave').hidden=!saveFailed;byId('saved').textContent=saveFailed?t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。'):t('Exchange Sigil saved.','已儲存交流符印。');}
byId('observe').onclick=observe;byId('retry').onclick=()=>{if(!solved)resetPanel();};byId('choices').onclick=e=>{const b=e.target.closest('button[data-choice]');if(!b)return;select(b.dataset.choice);byId('choices').querySelector('[data-choice="'+choice+'"]').focus();};
byId('check').onclick=()=>{if(solved)return;checked=true;solved=observed&&choice===answer();if(solved)cluesOpen=false;if(solved&&stage===2)saveFailed=!OrionProgress.earn('exchange');render();if(solved&&stage<2)byId('next').focus();};
byId('next').onclick=()=>{if(!solved||stage>=2)return;stage++;resetPanel();byId('observe').focus();};
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('exchange');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('diffusion',variant);
  savedVariant = OrionProgress.variant('diffusion');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('diffusion');
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
