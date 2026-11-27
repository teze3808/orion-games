 'use strict';
const byId=id=>document.getElementById(id),t=OrionI18n.t;
let variant=OrionProgress.variant('mean'),savedVariant=variant,savedTarget=OrionProgress.read().hashTarget;
let stage=0,bowls=[],selected=null,hintDepth=0,solved=false,cluesOpen=false,saveFailed=false,checked=false;
function challenge(){const n=3+(variant+stage)%6;return (stage===0?[-2,0,2]:stage===1?[-3,-1,1,3]:[-2,-2,0,0,4]).map(x=>x+n);}
function resetPanel(){bowls=challenge();selected=null;hintDepth=0;solved=cluesOpen=saveFailed=checked=false;render();}
function choose(i){if(solved||!Number.isInteger(i)||i<0||i>=bowls.length)return;if(selected===null){if(bowls[i]>0)selected=i;}else if(selected===i)selected=null;else{bowls[selected]--;bowls[i]++;selected=null;}checked=false;render();byId('bowls').querySelector('[data-bowl="'+i+'"]').focus();}
function matches(){return bowls.length===challenge().length&&bowls.every(n=>Number.isInteger(n)&&n>=0&&n===bowls[0])&&bowls.reduce((a,b)=>a+b,0)===challenge().reduce((a,b)=>a+b,0);}
function render(){const q=challenge(),total=q.reduce((a,b)=>a+b,0),complete=solved&&stage===2;window.OrionDiscovery?.update(complete);document.title=t('The Pearlkeeper’s Treasury · Orion','珍珠守護者的寶庫 · Orion');
byId('progress').textContent=t('Trays restored','已修復托盤')+' · '+(stage+Number(solved))+' / 3';byId('progress').parentElement.classList.toggle('complete',complete);byId('stageTitle').textContent=t('Tray ','托盤 ')+(stage+1);
byId('record').textContent=t('Original counts: ','原本數量：')+q.join(' · ');
byId('totals').textContent=t('Total pearls: ','珍珠總數：')+total+t(' · Bowls: ',' · 碗數：')+q.length;
byId('bowls').innerHTML=bowls.map((n,i)=>'<button data-bowl="'+i+'" aria-pressed="'+(selected===i)+'" aria-label="'+t('Bowl ','碗 ')+(i+1)+': '+n+t(' pearls',' 顆珍珠')+'" '+(solved?'disabled':'')+'><b>'+t('Bowl ','碗 ')+(i+1)+'</b><span class="pearls" aria-hidden="true">'+'●'.repeat(n)+'</span><strong>'+n+'</strong></button>').join('');
byId('selection').textContent=selected===null?t('Choose a bowl to take one pearl from, then choose its destination.','先選一隻碗取出一顆珍珠，再選要放入的碗。'):t('Taking one pearl from bowl ','從碗 ')+(selected+1)+t('. Choose another bowl, or tap this bowl again to cancel.',' 取一顆珍珠。選另一隻碗，或再選這隻碗取消。');
byId('reset').disabled=solved;
byId('feedback').textContent=solved?t('Every bowl has the same share. The pearl seal shines!','每隻碗都分到相同數量，珍珠封印亮起來了！'):checked?t('Some bowls still have different counts. Keep moving pearls.','有些碗的數量仍不同，繼續移動珍珠吧。'):'';
const clues=[t('Move pearls from a fuller bowl into a less full bowl. No pearl is added or lost.','把較多珍珠的碗裏的珍珠移到較少的碗，珍珠不增加也不減少。'),t('The equal share is the arithmetic mean: add all the counts, then divide by the number of bowls.','均分後的數量就是算術平均數：把全部數量相加，再除以碗數。'),total+' ÷ '+q.length+' = '+total/q.length+t(' pearls in every bowl.',' 顆珍珠，放在每隻碗裏。')];
byId('hints').innerHTML=clues.slice(0,hintDepth).map(x=>'<li>'+x+'</li>').join('');byId('clues').hidden=!cluesOpen;byId('hint').setAttribute('aria-expanded',String(cluesOpen));byId('hint').setAttribute('aria-label',t('Reveal the next clue','顯示下一個提示'));byId('hint').hidden=byId('check').hidden=solved;byId('next').hidden=!solved||complete;byId('reward').hidden=!complete;byId('retrySave').hidden=!saveFailed;byId('saved').textContent=saveFailed?t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。'):t('Pearlheart Sigil saved.','已儲存珠心符印。');}
byId('bowls').onclick=e=>{const b=e.target.closest('[data-bowl]');if(b)choose(Number(b.dataset.bowl));};byId('reset').onclick=()=>{if(!solved)resetPanel();};
byId('check').onclick=()=>{if(solved)return;checked=true;solved=matches();if(solved){cluesOpen=false;selected=null;}if(solved&&stage===2)saveFailed=!OrionProgress.earn('pearlheart');render();if(solved&&stage<2)byId('next').focus();};
byId('next').onclick=()=>{if(!solved||stage>=2)return;stage++;resetPanel();byId('bowls').querySelector('button').focus();};
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('pearlheart');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('mean',variant);
  savedVariant = OrionProgress.variant('mean');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('mean');
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
