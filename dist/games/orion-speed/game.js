 'use strict';
const byId=id=>document.getElementById(id),t=OrionI18n.t;
let variant=OrionProgress.variant('speed'),savedVariant=variant,savedTarget=OrionProgress.read().hashTarget;
let stage=0,speed=1,hintDepth=0,solved=false,cluesOpen=false,saveFailed=false,checked=false;
function challenge(){const n=3+(variant+stage)%6;const legs=stage===0?[[n*10,10]]:stage===1?[[(n-2)*10,10],[(n+1)*20,20]]:[[n*20,10],[0,10]];return {legs,distance:legs.reduce((s,l)=>s+l[0],0),time:legs.reduce((s,l)=>s+l[1],0)};}
function resetPanel(){speed=1;hintDepth=0;solved=cluesOpen=saveFailed=checked=false;render();}
function setSpeed(n){if(solved||!Number.isInteger(n)||n<1||n>30)return;speed=n;checked=false;render();}
function matches(){const q=challenge();return speed*q.time===q.distance;}
function render(){const q=challenge(),complete=solved&&stage===2;window.OrionDiscovery?.update(complete);document.title=t('The Starwind Courier · Orion','星風信使 · Orion');
byId('progress').textContent=t('Records restored','已修復紀錄')+' · '+(stage+Number(solved))+' / 3';byId('progress').parentElement.classList.toggle('complete',complete);byId('stageTitle').textContent=t('Flight record ','航程紀錄 ')+(stage+1);
byId('log').innerHTML=q.legs.map((l,i)=>'<div class="entry"><b>'+t('Part ','第 ')+(i+1)+t('',' 段')+(l[0]===0?t(' · Waiting at the tower',' · 在塔樓停留'):'')+'</b><span>'+l[0]+' m · '+l[1]+' s</span></div>').join('');
byId('totals').textContent=t('Whole journey: ','全程：')+q.distance+' m · '+q.time+' s';
byId('speed').value=speed;byId('speed').disabled=solved;byId('speed').setAttribute('aria-valuetext',speed+t(' metres per second',' 米每秒'));byId('speedValue').textContent=speed+' m/s';byId('less').disabled=solved||speed===1;byId('more').disabled=solved||speed===30;byId('reset').disabled=solved;
byId('less').setAttribute('aria-label',t('Decrease speed by 1 metre per second','速率減少 1 米每秒'));byId('more').setAttribute('aria-label',t('Increase speed by 1 metre per second','速率增加 1 米每秒'));
const travel=speed*q.time,max=Math.max(q.distance,travel);byId('comparison').innerHTML='<div>'+t('Recorded distance','紀錄路程')+'<b>'+q.distance+' m</b><div class="track"><span style="width:'+100*q.distance/max+'%"></span></div></div><div>'+t('Your steady-speed model','你的等速模型')+'<b>'+travel+' m</b><div class="track proposal"><span style="width:'+100*travel/max+'%"></span></div></div>';
byId('preview').textContent=t('At this steady speed for ','以這個固定速率行進 ')+q.time+t(' s, the model covers ',' 秒，模型走了 ')+travel+' m.';
byId('feedback').textContent=solved?t('The whole journey matches. The flight record is restored!','全程吻合，航程紀錄修復了！'):checked?(travel<q.distance?t('The model falls short. Try a greater speed.','模型走得不夠遠，試試更大的速率。'):t('The model goes too far. Try a smaller speed.','模型走得太遠，試試更小的速率。')):'';
const clues=[t('Match the whole recorded distance in the whole recorded time, including waiting.','在紀錄的全程時間內走完全部路程，包括停留時間。'),t('Average speed = total distance ÷ total elapsed time. Do not just average the speeds of unequal-time parts.','平均速率 = 總路程 ÷ 總時間。各段時間不同時，不可直接把各段速率取平均。'),q.distance+' ÷ '+q.time+' = '+q.distance/q.time+' m/s'];
byId('hints').innerHTML=clues.slice(0,hintDepth).map(x=>'<li>'+x+'</li>').join('');byId('clues').hidden=!cluesOpen;byId('hint').setAttribute('aria-expanded',String(cluesOpen));byId('hint').setAttribute('aria-label',t('Reveal the next clue','顯示下一個提示'));byId('hint').hidden=byId('check').hidden=solved;byId('next').hidden=!solved||complete;byId('reward').hidden=!complete;byId('retrySave').hidden=!saveFailed;byId('saved').textContent=saveFailed?t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。'):t('Starwind Sigil saved.','已儲存星風符印。');}
byId('speed').oninput=e=>setSpeed(Number(e.target.value));byId('less').onclick=()=>setSpeed(speed-1);byId('more').onclick=()=>setSpeed(speed+1);byId('reset').onclick=()=>{if(!solved)resetPanel();};
byId('check').onclick=()=>{if(solved)return;checked=true;solved=matches();if(solved)cluesOpen=false;if(solved&&stage===2)saveFailed=!OrionProgress.earn('starwind');render();if(solved&&stage<2)byId('next').focus();};
byId('next').onclick=()=>{if(!solved||stage>=2)return;stage++;resetPanel();byId('speed').focus();};
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('starwind');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('speed',variant);
  savedVariant = OrionProgress.variant('speed');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('speed');
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
