'use strict';
const byId=id=>document.getElementById(id),t=OrionI18n.t;
const patterns=['110100001','101010100','100110001','010001110','001100101','110001010'];
let variant=OrionProgress.variant('rotation'),savedVariant=variant,savedTarget=OrionProgress.read().hashTarget;
let stage=0,tiles=Array(9).fill(false),hintDepth=0,solved=false,cluesOpen=false,saveFailed=false,checked=false;
function pattern(){return [...patterns[(variant+stage)%6]].map(x=>x==='1');}
function rotate(input,turns){let out=[...input];for(let k=0;k<turns;k++){const next=Array(9);for(let row=0;row<3;row++)for(let col=0;col<3;col++)next[col*3+2-row]=out[row*3+col];out=next;}return out;}
function answer(){return rotate(pattern(),stage+1);}
function correct(){return tiles.every((v,i)=>v===answer()[i]);}
function resetPanel(){tiles=Array(9).fill(false);hintDepth=0;solved=cluesOpen=saveFailed=checked=false;render();}
function toggle(index){if(solved||!Number.isInteger(index)||index<0||index>8)return;tiles[index]=!tiles[index];checked=false;render();}
function cellLabel(i,gold){return t('Row ','第 ')+(Math.floor(i/3)+1)+t(', column ',' 行，第 ')+(i%3+1)+t(': ',' 列：')+(gold?t('gold','金色'):t('empty','空白'))+(i===4?t(', centre', '，中心'):'');}
function render(){
 const complete=solved&&stage===2;window.OrionDiscovery?.update(complete);
 document.title=t('The Turning Mosaic Hall · Orion','轉紋大廳 · Orion');
 byId('progress').textContent=t('Locks restored','已修復石鎖')+' · '+(stage+Number(solved))+' / 3';
 byId('progress').parentElement.classList.toggle('complete',complete);
 byId('stageTitle').textContent=t('Lock ','石鎖 ')+(stage+1);
 byId('instruction').textContent=t('Study the original. Place gold tiles where they will land after the turn.','觀察原圖，把金色方塊放在轉動後的位置。');
 const turns=[t('↻ Quarter-turn clockwise · 90°','↻ 順時針轉四分之一圈 · 90°'),t('↻ Half-turn · 180°','↻ 轉半圈 · 180°'),t('↺ Quarter-turn anticlockwise · 90°','↺ 逆時針轉四分之一圈 · 90°')];
 byId('turnLabel').textContent=turns[stage];
 byId('reference').innerHTML=pattern().map(v=>'<span aria-hidden="true" class="'+(v?'gold':'')+'">'+(v?'◆':'○')+'</span>').join('');
 byId('reference').setAttribute('aria-label',t('Original pattern: ','原圖：')+pattern().map((v,i)=>cellLabel(i,v)).join('; '));
 byId('tiles').innerHTML=tiles.map((v,i)=>'<button data-index="'+i+'" class="'+(v?'gold':'')+'" aria-pressed="'+v+'" aria-label="'+cellLabel(i,v)+'" '+(solved?'disabled':'')+'>'+(v?'◆':'○')+'</button>').join('');
 byId('feedback').textContent=solved?t('The whole pattern fits. The lock shines!','整幅圖案吻合，石鎖亮起來了！'):checked?t('Some tiles are still out of place. Follow one gold tile around the centre and try again.','有些方塊位置還不對。追蹤一塊金色方塊繞中心移動，再試一次。'):'';
 const mismatch=tiles.findIndex((v,i)=>v!==answer()[i]);
 const clues=[t('Clockwise follows a clock’s hands. Anticlockwise goes the other way. The centre stays still.','順時針跟着時鐘指針的方向，逆時針則相反。中心保持不動。'),stage===0?t('In a clockwise quarter-turn, the top-left corner moves to the top-right.','順時針轉四分之一圈，左上角移到右上角。'):stage===1?t('In a half-turn, the top-left corner moves to the bottom-right.','轉半圈，左上角移到右下角。'):t('In an anticlockwise quarter-turn, the top-left corner moves to the bottom-left.','逆時針轉四分之一圈，左上角移到左下角。'),mismatch<0?t('All tiles fit. Check the mosaic.','所有方塊吻合，可以檢查。'):t('Try this tile: ','試試這一格：')+cellLabel(mismatch,answer()[mismatch])];
  byId('hints').innerHTML = clues.slice(0,hintDepth).map(clue=>'<li>'+clue+'</li>').join('');
  byId('hint').setAttribute('aria-expanded', String(cluesOpen));
  byId('hint').setAttribute('aria-label', t('Reveal the next clue','顯示下一個提示'));
  byId('clues').hidden = !cluesOpen;
  byId('hint').hidden = byId('check').hidden = solved;
  byId('next').hidden = !solved || complete;
  byId('reward').hidden = !complete;
  byId('retrySave').hidden = !saveFailed;
  byId('saved').textContent = saveFailed ? t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。') : t('Turnstone Sigil saved.','已儲存轉石符印。');
}



byId('tiles').onclick=e=>{const tile=e.target.closest('button[data-index]');if(!tile)return;const index=Number(tile.dataset.index);toggle(index);byId('tiles').querySelectorAll('button')[index]?.focus();};
byId('check').onclick=()=>{if(solved)return;checked=true;solved=correct();if(solved)cluesOpen=false;if(solved&&stage===2)saveFailed=!OrionProgress.earn('turnstone');render();if(solved&&stage<2)byId('next').focus();};
byId('next').onclick=()=>{if(!solved||stage>=2)return;stage++;resetPanel();byId('tiles').querySelector('button').focus();};
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('turnstone');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('rotation',variant);
  savedVariant = OrionProgress.variant('rotation');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('rotation');
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
