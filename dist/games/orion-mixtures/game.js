'use strict';
const $=id=>document.getElementById(id),t=OrionI18n.t;
const stages=[{title:['The iron key','鐵之鑰'],goal:['Recover iron alone on the magnet tray.','在磁鐵托盤上單獨收集鐵。'],mix:['iron','sand']},{title:['The clear channel','清澈水道'],goal:['Keep liquid water in the sample jar, with sand collected separately in the filter.','讓液態水留在樣本瓶，沙則分開收集在濾紙上。'],mix:['sand','water']},{title:['The crystal seal','晶石封印'],goal:['Recover sand in the filter and solid salt alone in the sample jar. The salt starts dissolved in water.','把沙收集在濾紙上，讓固體鹽單獨留在樣本瓶。最初，鹽已溶解在水中。'],mix:['sand','salt','water']}];
const names={iron:['Iron','鐵'],sand:['Quartz sand','石英沙'],water:['Water','水'],salt:['Salt','鹽']};
const messages={inspect:['Sample inspected. Choose a tool and observe the result.','觀察完成。選擇工具，看看結果。'],first:['Inspect your sample before using a tool.','使用工具前，先觀察樣本。'],magnet:['Iron moved to the magnet tray. The other material stayed behind.','鐵移到磁鐵托盤，其他材料留在原處。'],none:['Nothing moved. Compare the materials with your earlier observations.','沒有材料移動。把這些材料與之前的觀察比較。'],filter:['Sand stayed in the filter. The liquid passed through into the sample jar.','沙留在濾紙上，液體通過濾紙，流回樣本瓶。'],dissolved:['Sand stayed in the filter. Water AND dissolved salt passed through together.','沙留在濾紙上。水和已溶解的鹽一起通過濾紙。'],dry:['There is no liquid to pour. Nothing changed — try another tool, or start with a new sample.','沒有液體可以倒入濾紙。材料沒有改變；試試另一工具，或換新樣本。'],evaporate:['Water entered the air as vapour. All other materials stayed in the vessel.','水變成水蒸氣進入空氣。其他材料都留在容器裡。'],wrong:['Not separated as requested yet. Compare each container with your mission. You can take a fresh sample and try another order.','還未按任務要求分離。比較各容器和任務目標。可以換新樣本，試試另一個次序。'],solved:['Recovered! A bronze seal opens.','成功分離！一道青銅封印開啟了。'],complete:['Three samples, three discoveries. The crystal cabinet opens!','三份樣本，三次發現。晶石寶櫃打開了！'],fresh:['A fresh sample is ready. Your observations remain in the log.','新樣本準備好了。之前的觀察仍留在紀錄裡。']};
let stage=0,working=[],magnet=[],filter=[],vapor=[],inspected=false,solved=false,saveFailed=false,hintDepth=0,feedback='',history=[];
let selectedTool=null, pointerDrag=null, suppressClick=false;
let observedTarget=OrionProgress.read().hashTarget;
function materialList(a){return a.length?a.map(m=>m==='salt'&&a.includes('water')?t('Dissolved salt','已溶解的鹽'):t(...names[m])).join(' · '):t('Empty','空');}
function hints(){return [[t('Inspect each material. Which one responds to a magnet?','觀察每種材料。哪一種會被磁鐵吸引？'),t('Iron is magnetic; quartz sand is not.','鐵會被磁鐵吸引，石英沙不會。'),t('Inspect, then use the magnet. Present your materials.','先觀察，再使用磁鐵，然後展示材料。')],[t('You need to keep the water as a liquid.','你需要保留液態水。'),t('Sand does not dissolve in water. A paper filter can catch it.','沙不溶於水，濾紙能截留它。'),t('Inspect, then filter. Present your materials.','先觀察，再過濾，然後展示材料。')],[t('The salt travels with the water until the water evaporates.','在水蒸發前，鹽會跟著水一起移動。'),t('Separate the sand while the water is still liquid. Then recover the salt.','趁水仍是液體時，先分離沙，再收集鹽。'),t('Inspect → filter → evaporate → present. If you evaporated first, take a fresh sample.','觀察 → 過濾 → 蒸發 → 展示。如果先蒸發了，請換一份新樣本。')]][stage];}
function render(){document.title=t('The Crystal Alchemist’s Workshop · Orion','晶石煉金工坊 · Orion');$('stageLabel').textContent=t(`SEAL ${stage+1} OF 3 · CHEMISTRY`,`第 ${stage+1} 道封印，共 3 道 · 化學`);$('stageTitle').textContent=t(...stages[stage].title);$('mission').textContent=t(...stages[stage].goal);$('sample').textContent=inspected?t('Original sample: ','原始樣本：')+materialList(stages[stage].mix):t('The sample awaits your inspection.','樣本等你觀察。');$('controls').hidden=solved;$('feedback').textContent=feedback?t(...messages[feedback]):'';$('next').hidden=!solved||stage===2;$('reward').hidden=!(solved&&stage===2);$('notes').hidden=!(solved&&stage===2);$('scene').classList.toggle('complete',solved&&stage===2);$('seals').textContent=stages.map((_,i)=>i<stage||(i===stage&&solved)?'◆':'◇').join(' ');$('sceneStatus').textContent=solved&&stage===2?t('The crystal answers your discoveries.','晶石回應了你的發現。'):t('Three samples. One forgotten secret.','三份樣本，一個被遺忘的秘密。');$('hints').hidden=!hintDepth;$('hints').innerHTML=hints().slice(0,hintDepth).map(s=>`<li>${s}</li>`).join('');$('hint').disabled=hintDepth===3;$('hint').setAttribute('aria-label',t('Reveal the next clue','顯示下一個提示'));$('hint').setAttribute('aria-expanded',String(hintDepth>0));$('log').innerHTML=history.map(k=>`<li>${t(...messages[k])}</li>`).join('')||`<li>${t('Your observations will appear here.','你的觀察會顯示在這裡。')}</li>`;$('retrySave').hidden=!saveFailed;$('saveStatus').textContent=saveFailed?t('Sigil earned, but saving failed. Please retry saving.','已獲得符印，但儲存失敗。請再次嘗試儲存。'):OrionProgress.has('crystal')?t('Crystal Sigil saved in your collection.','晶石符印已存入你的收藏。'):'';renderWorkbench();}

function goalChecks(){
 return stage===0?[{ok:exactly(magnet,['iron']),en:'Iron alone on the magnet tray',zh:'磁鐵托盤：只有鐵'},{ok:exactly(working,['sand']),en:'Sand left in the jar',zh:'樣本瓶：留下沙'}]:stage===1?[{ok:exactly(filter,['sand']),en:'Sand on the filter paper',zh:'濾紙：收集沙'},{ok:exactly(working,['water']),en:'Liquid water alone in the jar',zh:'樣本瓶：只有液態水'}]:[{ok:exactly(filter,['sand']),en:'Sand on the filter paper',zh:'濾紙：收集沙'},{ok:exactly(working,['salt']),en:'Dry salt alone in the jar',zh:'樣本瓶：只有乾鹽'}];
}
function jarDrawing(a,covered=false,air=false){
 const water=a.includes('water'),sand=a.includes('sand'),iron=a.includes('iron'),salt=a.includes('salt')&&!water;
 let shapes='';
 if(covered) shapes='<rect x="27" y="42" width="146" height="100" rx="12" fill="#647978"/><text x="100" y="109" text-anchor="middle" fill="#f1ddac" font-size="46">?</text>';
 else if(air) shapes=a.length?'<path d="M65 128c-25-30 25-30 0-60m35 60c-25-30 25-30 0-60m35 60c-25-30 25-30 0-60" stroke="#c3ebed" stroke-width="6" fill="none"/>':'';
 else{
 if(water)shapes+='<path d="M28 78Q60 68 100 78T172 78V142H28Z" fill="#64bfd3" opacity=".65"/>';
 if(sand)shapes+='<path d="M28 125Q70 108 110 121T172 120V143H28Z" fill="#ceb17b"/>';
 if(iron)shapes+=Array.from({length:9},(_,i)=>`<path d="M${40+i*13} ${122+(i%3)*5}l8-6" stroke="#b9c3d4" stroke-width="5"/>`).join('');
 if(salt)shapes+=Array.from({length:8},(_,i)=>`<rect x="${43+i*14}" y="${126-(i%3)*5}" width="9" height="9" transform="rotate(15 ${43+i*14} 130)" fill="#edf5eb"/>`).join('');
 }
 return `<svg viewBox="0 0 200 165" aria-hidden="true">${air?'':'<path d="M24 22v114q0 12 12 12h128q12 0 12-12V22" fill="#b6e9e908" stroke="#a6cfcd" stroke-width="3"/><path d="M22 22h156" stroke="#d2e4da" stroke-width="4"/>'}${shapes}</svg>`;
}
function renderWorkbench(){
 const checks=goalChecks(),ready=inspected&&checks.every(g=>g.ok);
 $('goals').innerHTML=checks.map((g,i)=>`<p class="goal ${inspected&&g.ok?'done':''}"><span aria-hidden="true">${inspected&&g.ok?'✓':'○'}</span> ${jarDrawing(stage===0?(i===0?['iron']:['sand']):stage===1?(i===0?['sand']:['water']):(i===0?['sand']:['salt']))}${t(g.en,g.zh)} <small>${inspected&&g.ok?t('Collected','已收集'):t('Not yet','未完成')}</small></p>`).join('');
 $('stepGuide').textContent=solved?t('Seal unlocked! Continue your adventure below.','封印解開了！在下方繼續探險。'):!inspected?t('Start here: uncover the sample to see what is inside.','從這裡開始：打開樣本，看看裡面有甚麼。'):ready?t('You have everything! Tap “Unlock this seal”.','全部收集好了！點「解開這道封印」。'):selectedTool?t('Now drop it on the jar — or tap the jar.','現在拖到瓶子上放開，或點一下瓶子。'):t('Drag a tool onto the jar. See what happens!','把工具拖到瓶子上，看看會怎樣！');
 $('inspect').hidden=inspected||solved;
 $('sample').textContent=inspected?t('You started with: ','最初的材料：')+materialList(stages[stage].mix):t('A covered jar is waiting for you.','一瓶蓋著的樣本在等你。');
 $('vessels').innerHTML=`<button type="button" id="dropJar" class="main-jar" aria-label="${t('Sample jar: drop or apply selected tool','樣本瓶：放下或使用已選工具')}" ${!inspected||solved?'disabled':''}><h3>${t('Your sample jar','你的樣本瓶')}</h3>${jarDrawing(working,!inspected)}<p>${inspected?materialList(working):t('Tap “Uncover the sample” above','點上方「打開樣本」')}</p>${inspected&&working.includes('salt')&&working.includes('water')?`<small>${t('Salt is dissolved in the water; you cannot see separate salt grains.','鹽已溶解在水裡，看不見獨立鹽粒。')}</small>`:''}<span class="drop-cue">${selectedTool?t('↓ Use here','↓ 用在這裡'):t('↓ Drop tool here','↓ 把工具放在這裡')}</span></button><div class="collection-trays">${[[t('Magnet tray','磁鐵托盤'),magnet],[t('Filter paper','濾紙'),filter],[t('Into the air','進入空氣'),vapor]].map(([label,a],i)=>`<section class="tray ${a.length?'filled':''}"><h3>${label}</h3>${jarDrawing(a,false,i===2)}<p>${a.length?(i===2?t('Water vapour','水蒸氣'):materialList(a)):t('Nothing collected yet','還未收集到材料')}</p></section>`).join('')}</div>`;
 $('controls').hidden=!inspected||solved;
 $('finishControls').hidden=!inspected||solved;
 $('check').textContent=ready?t('3 · Unlock this seal ✦','3 · 解開這道封印 ✦'):t('3 · Check my collection','3 · 檢查我的收集');
 $('check').classList.toggle('ready',ready);
 $('dropJar').onclick=applySelected;
 $('dropJar').classList.toggle('target-ready',!!selectedTool);
 for(const tool of ['magnet','filter','evaporate'])$(tool).setAttribute('aria-pressed',String(selectedTool===tool));

}

function say(k){feedback=k;history.unshift(k);history=history.slice(0,12);render();}
function useTool(tool){if(solved)return;if(!inspected){say('first');return;}if(tool==='magnet'){if(working.includes('iron')){magnet.push('iron');working=working.filter(m=>m!=='iron');say('magnet');}else say('none');}else if(tool==='filter'){if(!working.includes('water'))say('dry');else if(working.includes('sand')){filter.push('sand');working=working.filter(m=>m!=='sand');say(working.includes('salt')?'dissolved':'filter');}else say('none');}else if(tool==='evaporate'){if(working.includes('water')){vapor.push('water');working=working.filter(m=>m!=='water');say('evaporate');}else say('none');}}
function exactly(a,b){return a.length===b.length&&b.every(m=>a.includes(m));}
function check(){if(solved)return;const ok=inspected&&(stage===0?exactly(magnet,['iron'])&&exactly(working,['sand']):stage===1?exactly(filter,['sand'])&&exactly(working,['water']):exactly(filter,['sand'])&&exactly(working,['salt'])&&exactly(vapor,['water']));if(!ok){say('wrong');return;}solved=true;if(stage===2)saveFailed=!OrionProgress.earn('crystal');say(stage===2?'complete':'solved');if(stage<2)$('next').focus();}
function fresh(){selectedTool=null;working=[...stages[stage].mix];magnet=[];filter=[];vapor=[];inspected=false;solved=false;feedback='';render();}
function resetStage(){hintDepth=0;history=[];saveFailed=false;$('notes').open=false;fresh();}
function resetMission(){stage=0;resetStage();}
$('inspect').onclick=()=>{inspected=true;say('inspect');};for(const tool of ['magnet','filter','evaporate'])$(tool).onclick=()=>{if(suppressClick){suppressClick=false;return;}selectTool(tool);};$('check').onclick=check;$('fresh').onclick=()=>{fresh();say('fresh');};$('next').onclick=()=>{if(!solved||stage===2)return;stage++;resetStage();$('inspect').focus();};$('hint').onclick=()=>{hintDepth=Math.min(3,hintDepth+1);render();};$('replay').onclick=()=>{resetMission();$('inspect').focus();};$('retrySave').onclick=()=>{saveFailed=!OrionProgress.earn('crystal');render();};
function syncProgress(){const target=OrionProgress.read().hashTarget,reset=target!==observedTarget&&!OrionProgress.has('crystal');observedTarget=target;if(reset||(solved&&stage===2&&!OrionProgress.has('crystal')&&!saveFailed))resetMission();else render();}

function selectTool(tool){
 if(!inspected||solved||!['magnet','filter','evaporate'].includes(tool))return;
 selectedTool=tool;render();
}
function applySelected(){
 if(!selectedTool||!inspected||solved)return;
 const tool=selectedTool;selectedTool=null;useTool(tool);
 const target=$('dropJar');
 if(target.animate&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  target.animate([{filter:'brightness(1.8)',transform:'scale(.97)'},{filter:'brightness(1)',transform:'scale(1)'}],{duration:650});
  const destination={magnet:0,filter:1,dissolved:1,evaporate:2}[feedback];
  if(destination!==undefined){
   const from=target.getBoundingClientRect(),to=document.querySelectorAll('.tray')[destination].getBoundingClientRect();
   const particle=document.createElement('div');particle.className='flying-material';particle.setAttribute('aria-hidden','true');
   particle.innerHTML=jarDrawing(destination===0?['iron']:destination===1?['sand']:['water'],false,destination===2);
   particle.style.left=(from.left+from.width/2-24)+'px';particle.style.top=(from.top+from.height/2-24)+'px';document.body.appendChild(particle);
   particle.animate([{transform:'translate(0,0) scale(1.4)',opacity:1},{transform:`translate(${to.left+to.width/2-from.left-from.width/2}px,${to.top+to.height/2-from.top-from.height/2}px) scale(.8)`,opacity:.2}],{duration:900,easing:'ease-in-out'}).onfinish=()=>particle.remove();
  }
 }
}
function finishDrag(event,cancel=false){
 if(!pointerDrag||pointerDrag.id!==event.pointerId)return;
 const drag=pointerDrag;pointerDrag=null;$('dragGhost').hidden=true;
 if(!drag.moved)return;
 suppressClick=true;setTimeout(()=>{suppressClick=false;},0);
 const rect=$('dropJar').getBoundingClientRect();
 const inside=!cancel&&event.clientX>=rect.left&&event.clientX<=rect.right&&event.clientY>=rect.top&&event.clientY<=rect.bottom;
 if(inside){applySelected();}else{selectedTool=null;render();}
}
for(const tool of ['magnet','filter','evaporate']){
 const button=$(tool);
 button.addEventListener('pointerdown',e=>{
  if(!inspected||solved||e.button!==0)return;
  suppressClick=false;pointerDrag={id:e.pointerId,tool,x:e.clientX,y:e.clientY,moved:false};
  button.setPointerCapture(e.pointerId);
 });
 button.addEventListener('pointermove',e=>{
  if(!pointerDrag||pointerDrag.id!==e.pointerId)return;
  if(!pointerDrag.moved&&Math.hypot(e.clientX-pointerDrag.x,e.clientY-pointerDrag.y)<8)return;
  if(!pointerDrag.moved){pointerDrag.moved=true;selectTool(tool);}
  const ghost=$('dragGhost');ghost.className='tool-picture '+tool;ghost.hidden=false;ghost.style.left=e.clientX+'px';ghost.style.top=e.clientY+'px';
 });
 button.addEventListener('pointerup',e=>finishDrag(e));
 button.addEventListener('pointercancel',e=>finishDrag(e,true));
 button.addEventListener('lostpointercapture',e=>{if(pointerDrag)finishDrag(e,true);});
}
window.addEventListener('keydown',e=>{if(e.key==='Escape'){pointerDrag=null;selectedTool=null;$('dragGhost').hidden=true;render();}});

window.addEventListener('orion-language',render);window.addEventListener('storage',e=>{if(e.key==='orion-expedition-progress-v1'||e.key===null)syncProgress();});window.addEventListener('pageshow',syncProgress);resetMission();OrionI18n.apply();
