'use strict';
const byId=id=>document.getElementById(id),t=OrionI18n.t;
let variant=OrionProgress.variant('pendulum'),savedVariant=variant,savedTarget=OrionProgress.read().hashTarget;
let stage=0,lengthIndex=1,hintDepth=0,solved=false,cluesOpen=false,saveFailed=false,checked=false;
let running=false,measured=null,history=[],timer=null,runToken=0;
function targetIndex(){return 1+(variant+stage*2+1)%6;}
function period(index){return 2*Math.PI*Math.sqrt((index/4)/9.81);}
function seconds(index){return period(index).toFixed(1);}
function cancel(){clearTimeout(timer);timer=null;runToken++;running=false;}
function resetPanel(){cancel();lengthIndex=1;measured=null;history=[];hintDepth=0;solved=cluesOpen=saveFailed=checked=false;render();}
function measure(){if(running||solved)return;running=true;measured=null;checked=false;const index=lengthIndex,token=++runToken;render();timer=setTimeout(()=>{if(token!==runToken)return;running=false;timer=null;measured=index;history.push(index);history=history.slice(-4);render();},period(index)*1000);}
function render(){
 const complete=solved&&stage===2;window.OrionDiscovery?.update(complete);
 document.title=t('The Lantern Clock Chamber · Orion','擺燈鐘室 · Orion');
 byId('progress').textContent=t('Clocks restored','已修復時鐘')+' · '+(stage+Number(solved))+' / 3';
 byId('progress').parentElement.classList.toggle('complete',complete);
 byId('stageTitle').textContent=t('Clock ','時鐘 ')+(stage+1);
 byId('instruction').textContent=t('Change the length, then release the lantern. Compare its full-swing time with the inscription.','改變擺長，再放開擺燈。比較完整來回時間與銘文。');
 byId('length').value=lengthIndex;byId('length').disabled=solved||running;
 byId('lengthValue').textContent=(lengthIndex/4).toFixed(2)+' m';
 byId('length').setAttribute('aria-valuetext',t(lengthIndex/4+' metres',lengthIndex/4+' 米'));
 byId('arm').style.height=(lengthIndex*20)+'px';byId('arm').style.setProperty('--period',period(lengthIndex)+'s');byId('arm').classList.toggle('swing',running);
 byId('measure').disabled=running||solved;byId('stop').hidden=!running;byId('check').disabled=running;
 byId('goal').textContent=t('Full swing: ','完整來回：')+seconds(targetIndex())+t(' seconds',' 秒');
 byId('reading').textContent=running?t('Measuring one full swing…','正在量度一次完整來回……'):measured===null?t('Release to reveal a reading.','放手量度後顯示讀數。'):t('Measured: ','量度結果：')+seconds(measured)+t(' seconds',' 秒');
 byId('log').innerHTML=history.map(i=>'<li>'+(i/4).toFixed(2)+' m → '+seconds(i)+t(' s',' 秒')+'</li>').join('');
 byId('feedback').textContent=solved?t('The rhythm matches. This clock glows!','節奏吻合，時鐘亮起來了！'):checked?(measured!==lengthIndex?t('Measure this length before setting the clock.','先量度這個擺長，再設定時鐘。'):lengthIndex<targetIndex()?t('The swing returns too soon. Try a longer pendulum.','擺燈太快回到起點，試試加長擺長。'):t('The swing takes too long. Try a shorter pendulum.','擺燈回到起點太慢，試試縮短擺長。')):'';
 const clues=[t('Measure two different lengths. Which one takes longer to return?','量度兩個不同擺長，哪個較久才回到起點？'),t('At the same gravity, a longer pendulum has a longer full-swing time.','重力相同時，擺越長，完整來回時間越長。'),t('Try ','試試 ')+(targetIndex()/4).toFixed(2)+t(' m, then measure it.',' 米，再量度一次。')];
  byId('hints').innerHTML = clues.slice(0,hintDepth).map(clue=>'<li>'+clue+'</li>').join('');
  byId('hint').setAttribute('aria-expanded', String(cluesOpen));
  byId('hint').setAttribute('aria-label', t('Reveal the next clue','顯示下一個提示'));
  byId('clues').hidden = !cluesOpen;
  byId('hint').hidden = byId('check').hidden = solved;
  byId('next').hidden = !solved || complete;
  byId('reward').hidden = !complete;
  byId('retrySave').hidden = !saveFailed;
  byId('saved').textContent = saveFailed ? t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。') : t('Timekeeper Sigil saved.','已儲存守時符印。');
}



byId('length').oninput=e=>{const n=Number(e.target.value);if(solved||running||!Number.isInteger(n)||n<1||n>6)return;lengthIndex=n;measured=null;checked=false;render();};
byId('measure').onclick=measure;
byId('stop').onclick=()=>{cancel();measured=null;render();byId('measure').focus();};
byId('check').onclick=()=>{if(solved||running)return;checked=true;solved=measured===lengthIndex&&lengthIndex===targetIndex();if(solved)cluesOpen=false;if(solved&&stage===2)saveFailed=!OrionProgress.earn('timekeeper');render();if(solved&&stage<2)byId('next').focus();};
byId('next').onclick=()=>{if(!solved||stage>=2)return;stage++;resetPanel();byId('length').focus();};
window.addEventListener('pagehide',()=>{cancel();measured=null;});
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('timekeeper');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('pendulum',variant);
  savedVariant = OrionProgress.variant('pendulum');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('pendulum');
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
