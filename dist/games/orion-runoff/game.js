 'use strict';
const byId=id=>document.getElementById(id),t=OrionI18n.t;
const bases=[[9,7,8,8,6,5,2,1,3],[9,8,7,6,2,6,5,4,3],[12,10,2,11,8,6,1,7,4]];
const maps=bases.flatMap(a=>[a,[0,3,6,1,4,7,2,5,8].map(i=>a[i])]);
let variant=OrionProgress.variant('runoff'),savedVariant=variant,savedTarget=OrionProgress.read().hashTarget;
let stage=0,route=[0],hintDepth=0,solved=false,cluesOpen=false,saveFailed=false,notice='';
function heights(){return maps[(variant+stage)%6];}
function legal(a,b){return Number.isInteger(b)&&b>=0&&b<9&&Math.abs(a%3-b%3)+Math.abs(Math.floor(a/3)-Math.floor(b/3))===1&&heights()[b]<heights()[a];}
function onward(a){if(a===8)return [8];for(let b=0;b<9;b++)if(legal(a,b)){const p=onward(b);if(p)return [a,...p];}return null;}
function resetPanel(){route=[0];hintDepth=0;solved=cluesOpen=saveFailed=false;notice='';render();}
function move(b){if(solved)return;const a=route.at(-1);if(!legal(a,b)){notice='invalid';render();return;}route.push(b);solved=b===8;notice=solved?'':onward(b)?'flow':'pool';if(solved)cluesOpen=false;if(solved&&stage===2)saveFailed=!OrionProgress.earn('flowtrail');render();if(solved&&stage<2)byId('next').focus();}
function render(){
const complete=solved&&stage===2,current=route.at(-1),h=heights();window.OrionDiscovery?.update(complete);
document.title=t('The Rainpath Valley · Orion','雨徑山谷 · Orion');
byId('progress').textContent=t('Reservoirs reached','已到達水庫')+' · '+(stage+Number(solved))+' / 3';byId('progress').parentElement.classList.toggle('complete',complete);
byId('stageTitle').textContent=t('Valley map ','山谷地圖 ')+(stage+1);
byId('board').innerHTML=h.map((v,i)=>'<button data-index="'+i+'" data-height="'+v+'" class="'+(current===i?'current ':route.includes(i)?'trail ':'')+'" aria-label="'+t('Row ','第 ')+(Math.floor(i/3)+1)+t(', column ',' 行，第 ')+(i%3+1)+t(', height ',' 列，高度 ')+v+t(' metres',' 米')+(i===current?t(', water here','，水滴在此'):'')+(i===8?t(', reservoir','，水庫'):'')+'" '+(solved?'disabled':'')+'><span aria-hidden="true">'+(i===current?'💧':i===8?'⚑':i===0?'◉':route.includes(i)?'·':'')+'</span><b>'+v+' m</b></button>').join('');
byId('trail').textContent=t('Your route: ','你的路徑：')+route.map(i=>h[i]).join(' → ')+' m';
byId('feedback').textContent=solved?t('The water reached the reservoir!','水滴到達水庫了！'):notice==='invalid'?t('Try a lower tile sharing an edge with the water. No diagonal jumps.','試試與水滴共用一邊的較低格子，不能斜走。'):notice==='pool'?t('This branch cannot reach the reservoir. Undo a step and try another route.','這條分支無法到達水庫。退回一步，試試別的路徑。'):notice==='flow'?t('The water moves downhill. Where next?','水往低處流。下一步去哪裏？'):'';
const p=onward(current);const clues=[t('Compare the height of the water’s tile with its neighbours.','比較水滴所在格與相鄰格的高度。'),t('A low hollow can be a dead end in this model. Look ahead before choosing a branch.','在這個模型裏，低窪處可能是盡頭。選擇分支前，先看看前面的路。'),p&&p.length>1?t('Try row ','試試第 ')+(Math.floor(p[1]/3)+1)+t(', column ',' 行，第 ')+(p[1]%3+1)+t('.',' 列。'):t('Undo a step to try a different branch.','退回一步，試試另一條分支。')];
byId('hints').innerHTML=clues.slice(0,hintDepth).map(x=>'<li>'+x+'</li>').join('');byId('clues').hidden=!cluesOpen;byId('hint').setAttribute('aria-expanded',String(cluesOpen));byId('hint').setAttribute('aria-label',t('Reveal the next clue','顯示下一個提示'));byId('hint').hidden=solved;byId('undo').disabled=byId('clear').disabled=solved||route.length===1;byId('next').hidden=!solved||complete;byId('reward').hidden=!complete;byId('retrySave').hidden=!saveFailed;byId('saved').textContent=saveFailed?t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。'):t('Flowtrail Sigil saved.','已儲存水徑符印。');}
byId('board').onclick=e=>{const b=e.target.closest('button[data-index]');if(!b)return;const i=Number(b.dataset.index);move(i);if(!solved)byId('board').querySelectorAll('button')[i]?.focus();};
byId('undo').onclick=()=>{if(solved||route.length<2)return;route.pop();notice='';render();};
byId('clear').onclick=()=>{if(solved)return;route=[0];notice='';render();};
byId('next').onclick=()=>{if(!solved||stage>=2)return;stage++;resetPanel();byId('board').querySelector('button').focus();};
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('flowtrail');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('runoff',variant);
  savedVariant = OrionProgress.variant('runoff');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('runoff');
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
