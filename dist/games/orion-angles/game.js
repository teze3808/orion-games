 'use strict';
const byId=id=>document.getElementById(id),t=OrionI18n.t;
const pairs=[[30,60],[45,75],[70,65],[40,55],[80,35],[50,70]];
let variant=OrionProgress.variant('angles'),savedVariant=variant,savedTarget=OrionProgress.read().hashTarget;
let stage=0,angle=5,hintDepth=0,solved=false,cluesOpen=false,saveFailed=false,checked=false;
function challenge(){const [a,b]=pairs[(variant+stage)%6];return {a,b,c:180-a-b};}
function geometry(){const {a,b}=challenge(),rad=Math.PI/180,x=Math.sin(b*rad)*Math.cos(a*rad)/Math.sin((a+b)*rad),y=Math.sin(b*rad)*Math.sin(a*rad)/Math.sin((a+b)*rad);const scale=Math.min(240,130/y);return [[40,165],[40+scale,165],[40+x*scale,165-y*scale]];}
function resetPanel(){angle=5;hintDepth=0;solved=cluesOpen=saveFailed=checked=false;render();}
function setAngle(n){if(solved||!Number.isInteger(n)||n<5||n>170||n%5)return;angle=n;checked=false;render();}
function render(){const q=challenge(),pts=geometry(),complete=solved&&stage===2;window.OrionDiscovery?.update(complete);document.title=t('The Star-Sail Loft · Orion','星帆閣 · Orion');
byId('progress').textContent=t('Sails restored','已修復船帆')+' · '+(stage+Number(solved))+' / 3';byId('progress').parentElement.classList.toggle('complete',complete);byId('stageTitle').textContent=t('Sail ','船帆 ')+(stage+1);
byId('diagram').innerHTML='<svg viewBox="0 0 320 200" role="img" aria-label="'+t('Flat triangle: A is ','平面三角形：A 是 ')+q.a+t(' degrees, B is ',' 度，B 是 ')+q.b+t(' degrees, C is unknown.',' 度，C 未知。')+'"><polygon points="'+pts.map(p=>p.join(',')).join(' ')+'" fill="#d6c69a" stroke="#edc66f" stroke-width="3"/>'+pts.map((p,i)=>'<text x="'+p[0]+'" y="'+(p[1]+(i===2?-12:24))+'" text-anchor="middle">'+['A '+q.a+'°','B '+q.b+'°','C '+(solved?q.c+'°':'?')][i]+'</text>').join('')+'</svg>';
byId('known').textContent='A = '+q.a+'° · B = '+q.b+'°';
byId('angle').value=angle;byId('angle').disabled=solved;byId('angle').setAttribute('aria-valuetext',angle+t(' degrees',' 度'));byId('angleValue').textContent=angle+'°';byId('less').disabled=solved||angle===5;byId('more').disabled=solved||angle===170;
byId('less').setAttribute('aria-label',t('Decrease angle by 5 degrees','角度減少 5 度'));byId('more').setAttribute('aria-label',t('Increase angle by 5 degrees','角度增加 5 度'));
const rad=angle*Math.PI/180,x=100+75*Math.cos(rad),y=95-75*Math.sin(rad);byId('gauge').innerHTML='<svg viewBox="0 0 200 110" aria-hidden="true"><path d="M100 95 L175 95 A75 75 0 0 0 '+x+' '+y+' Z" fill="#549d9b55"/><path d="M175 95 H100 L'+x+' '+y+'" fill="none" stroke="#f2d295" stroke-width="4"/><circle cx="100" cy="95" r="4" fill="#fff"/></svg>';
byId('feedback').textContent=solved?t('The corner fits. The sail is restored!','角度吻合，船帆修復了！'):checked?(angle<q.c?t('Your proposed corner is too small. Open the gauge further.','你提出的角度太小，把量角器再張開一點。'):t('Your proposed corner is too large. Close the gauge a little.','你提出的角度太大，把量角器收小一點。')):'';
const clues=[t('Look at the three inside corners, not the angles outside the sail.','看看船帆裏面的三個角，不是外面的角。'),t('The three interior angles of a flat triangle add to 180°.','平面三角形的三個內角總和是 180°。'),'180° − '+q.a+'° − '+q.b+'° = '+q.c+'°'];
byId('hints').innerHTML=clues.slice(0,hintDepth).map(x=>'<li>'+x+'</li>').join('');byId('clues').hidden=!cluesOpen;byId('hint').setAttribute('aria-expanded',String(cluesOpen));byId('hint').setAttribute('aria-label',t('Reveal the next clue','顯示下一個提示'));byId('hint').hidden=byId('check').hidden=solved;byId('next').hidden=!solved||complete;byId('reward').hidden=!complete;byId('retrySave').hidden=!saveFailed;byId('saved').textContent=saveFailed?t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。'):t('Starcorner Sigil saved.','已儲存星角符印。');}
byId('angle').oninput=e=>setAngle(Number(e.target.value));byId('less').onclick=()=>setAngle(angle-5);byId('more').onclick=()=>setAngle(angle+5);
byId('check').onclick=()=>{if(solved)return;checked=true;solved=angle===challenge().c;if(solved)cluesOpen=false;if(solved&&stage===2)saveFailed=!OrionProgress.earn('starcorner');render();if(solved&&stage<2)byId('next').focus();};
byId('next').onclick=()=>{if(!solved||stage>=2)return;stage++;resetPanel();byId('angle').focus();};
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('starcorner');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('angles',variant);
  savedVariant = OrionProgress.variant('angles');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('angles');
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
