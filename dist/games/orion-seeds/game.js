'use strict';
const $=id=>document.getElementById(id),t=OrionI18n.t;
const stages=[
 {title:['The thirsty seeds','口渴的種子'],mission:['Wake the seed in B while A stays asleep. Change the moisture, predict the result, then run a trial.','讓 B 的種子萌發，A 的種子仍未萌發。調整濕度、預測結果，再開始試驗。'],type:'seed',aWater:0,aLight:false,startWater:0,startLight:false},
 {title:['The pale seedlings','蒼白的幼苗'],mission:['These beans have already sprouted. Help B grow green, sturdy leaves. Explore the lighting while moisture stays the same.','這些豆子已經發芽。幫助 B 長出健康的綠葉。保持相同濕度，探索光照的影響。'],type:'seedling',aWater:1,aLight:false,startWater:1,startLight:false},
 {title:['The keeper’s final question','守護者的最後一問'],mission:['Do bean seeds need light to start growing? Set up B so only the lighting differs from A. Predict which seeds will sprout, then compare.','豆種子開始萌發需要光嗎？設定 B，讓它只有光照與 A 不同。預測哪邊會萌發，再比較。'],type:'seed',aWater:1,aLight:true,startWater:0,startLight:false}
];
const originalMissions=stages.map(c=>[...c.mission]);
let questionVariant=0;
function configureQuestions(v=OrionProgress.variant('seeds')){questionVariant=v;
 stages.forEach((c,i)=>c.mission=[...originalMissions[i]]);
 stages[0].aWater=v?1:0;stages[0].startWater=v?1:0;stages[0].goalWater=v?0:1;
 stages[1].aLight=!!v;stages[1].startLight=!!v;stages[1].goalLight=!v;
 stages[2].aLight=!v;stages[2].startLight=!!v;
 if(v){stages[0].mission=['A is moist. Make B stay dry so only A sprouts. Predict the result and compare.','A 是濕潤的。讓 B 保持乾燥，只有 A 萌發。預測結果，再比較。'];stages[1].mission=['A has light. Use B to show how darkness changes seedling growth while keeping moisture equal. Predict the healthier seedling.','A 有光照。用 B 展示黑暗如何改變幼苗生長，保持相同濕度。預測哪邊較健康。'];}
}
let stage=0,water=0,light=false,prediction='',solved=false,hintDepth=0,feedback='ready',result=null,history=[],saveFailed=false;
let observedTarget=OrionProgress.read().hashTarget;
const moisture=()=>[t('Dry','乾燥'),t('Moist','濕潤'),t('Flooded','積水')];
function settings(w,l){return `${moisture()[w]} · ${l?t('Light','有光'):t('Dark','黑暗')}`;}
// Idealized viable bean model; warmth, air outside the soil, duration and species are held fixed.
function outcome(type,w,l){if(w!==1)return 'waiting';return type==='seed'?'sprout':l?'green':'pale';}
function compare(a,b){const rank={waiting:0,pale:1,sprout:2,green:2};return rank[a]===rank[b]?'same':rank[a]>rank[b]?'A':'B';}
function setWater(value){if(solved||stage===1||!Number.isInteger(value)||value<0||value>2)return;water=value;changed();}
function toggleLight(){if(solved||stage===0)return;light=!light;changed();}
function changed(){prediction='';result=null;feedback='ready';render();}
function choose(value){if(solved||!['A','B','same'].includes(value))return;prediction=value;feedback='ready';render();}
function hints(){const c=stages[stage];return [t('Compare the fixed conditions in A with the mission for B.','把 A 的固定條件與 B 的任務目標比較。'),t('Keep other conditions alike when testing one factor. A seed and a leafy seedling have different needs.','測試一項因素時，其餘條件保持相同。種子和長葉幼苗的需要不同。'),stage===0?t(`Set B to ${c.goalWater===1?'Moist':'Dry'}. Predict ${c.goalWater===1?'B':'A'}.`,`把 B 設為「${c.goalWater===1?'濕潤':'乾燥'}」，預測 ${c.goalWater===1?'B':'A'}。`):stage===1?t(`Make B ${c.goalLight?'lit':'dark'}. Predict ${c.goalLight?'B':'A'}.`,`讓 B ${c.goalLight?'有光':'黑暗'}，預測 ${c.goalLight?'B':'A'}。`):t(`Make B moist and ${c.aLight?'dark':'lit'}. Predict Same.`,`把 B 設為濕潤、${c.aLight?'黑暗':'有光'}，預測「相同」。`)];}
function evidence(r){
 if(r.water===0&&stage!==0)return t('B stayed dry. Without enough water, this trial cannot support the expected growth.','B 保持乾燥。水分不足，這次試驗無法支持預期的生長。');
 if(r.water===2)return t('B stayed flooded. Prolonged waterlogging reduces the oxygen available in the soil; more water is not always better.','B 一直積水。長期積水減少土壤中可用的氧氣；水不是越多越好。');
 if(stage===1)return t(`A: ${describe(r.a)}. B: ${describe(r.b)}. Both had the same moisture; light changed their growth.`,`A：${describe(r.a)}。B：${describe(r.b)}。兩邊濕度相同，光照改變了生長。`);
 return stage===2?t('Both bean seeds began growing using stored food. This does not mean seedlings stay healthy in darkness.','兩邊豆種子利用儲存養分開始生長。這不代表幼苗能一直在黑暗中健康生長。'):t(`A: ${describe(r.a)}. B: ${describe(r.b)}. Compare the moisture settings.`,`A：${describe(r.a)}。B：${describe(r.b)}。比較兩邊的濕度設定。`);

}
function trial(){
 if(solved)return;
 if(!Number.isInteger(water)||water<0||water>2||typeof light!=='boolean'||(stage===0&&light)||(stage===1&&water!==1)){feedback='invalid';render();return;}
 if(!['A','B','same'].includes(prediction)){feedback='predict';render();return;}
 const c=stages[stage],a=outcome(c.type,c.aWater,c.aLight),b=outcome(c.type,water,light),actual=compare(a,b);
 result={water,light,a,b,actual,prediction};history.unshift({...result});history=history.slice(0,6);
 const goal=stage===0?water===c.goalWater:stage===1?light===c.goalLight:water===c.aWater&&light!==c.aLight&&b==='sprout';
 if(!goal)feedback=stage===2&&water===1&&light===c.aLight?'fair':'adjust';
 else if(prediction!==actual)feedback='prediction';
 else{solved=true;feedback=stage===2?'complete':'solved';if(stage===2)saveFailed=!OrionProgress.earn('verdant');}
 render();if(solved&&stage<2)$('next').focus();
}
function picture(id,state,label){const el=$(id);el.classList.toggle('seed',state==='seed'||state==='waiting');el.classList.toggle('sprout',state==='sprout');el.classList.toggle('green',state==='green');el.classList.toggle('pale',state==='pale');el.setAttribute('aria-label',label);}
function describe(state){return {waiting:t('No successful growth in this trial','這次試驗未能成功生長'),sprout:t('Seed sprouted','種子萌發了'),green:t('Green, sturdy seedling','綠色、健壯的幼苗'),pale:t('Pale, stretched seedling','蒼白、細長的幼苗')}[state];}
function render(){
 const c=stages[stage],complete=solved&&stage===2;
 document.title=t('The Sleeping Seed Vault · Orion','沉睡種子寶庫 · Orion');
 $('progressCount').textContent=t(`Seals opened · ${stage+(solved?1:0)} / 3`,`已解開 ${stage+(solved?1:0)} / 3 道封印`);$('progressBar').value=stage+(solved?1:0);
 $('stageLabel').textContent=t(`TRIAL ${stage+1} OF 3 · BIOLOGY`,`第 ${stage+1} 次試驗，共 3 次 · 生物學`);$('stageTitle').textContent=t(...c.title);$('mission').textContent=t(...c.mission);
 $('settingsA').textContent=settings(c.aWater,c.aLight);$('settingsB').textContent=settings(water,light);
 const start=c.type==='seed'?'seed':'sprout',startLabel=c.type==='seed'?t('Bean seed before the trial','試驗前的豆種子'):t('Young bean seedling before the trial','試驗前的豆幼苗');picture('startA',start,`A: ${startLabel}`);picture('startB',start,`B: ${startLabel}`);
 $('water').value=String(water);$('waterValue').textContent=moisture()[water];$('water').disabled=solved||stage===1;$('lessWater').disabled=solved||stage===1||water===0;$('moreWater').disabled=solved||stage===1||water===2;
 $('waterLock').textContent=stage===1?t('Moisture is fixed for this light comparison.','為了比較光照，濕度已固定。'):t('Drag the slider or tap + / −.','拖動滑桿或點 +／−。');
 $('light').disabled=solved||stage===0;$('light').setAttribute('aria-pressed',String(light));$('light').textContent=stage===0?t('☾ B stays dark','☾ B 保持黑暗'):light?t('☀ B has light · tap to darken','☀ B 有光 · 點一下變暗'):t('☾ B is dark · tap for light','☾ B 黑暗 · 點一下照光');
 $('lightLock').textContent=stage===0?t('Both chambers stay dark for this moisture comparison.','為了比較水分，兩間培育箱都保持黑暗。'):t('Ventilation and warmth stay the same when the light changes.','改變光照時，通風和溫度保持相同。');
 $('predictionQuestion').textContent=stage===1?t('Which will grow greener, sturdier leaves?','哪邊會長出較健康的綠葉？'):t('Which will sprout more successfully?','哪邊會較成功地萌發？');
 for(const [id,value] of [['predictA','A'],['predictB','B'],['predictSame','same']]){$(id).setAttribute('aria-pressed',String(prediction===value));$(id).disabled=solved;}
 $('controls').hidden=solved;
 const messages={ready:t('Adjust B, make a prediction, then run a trial.','調整 B、作出預測，再開始試驗。'),predict:t('Choose A, B or Same before starting time.','先選 A、B 或「相同」，再開始試驗。'),invalid:t('Use the chamber controls to choose valid conditions.','請用培育箱控制項選擇有效條件。'),adjust:t('The trial left a clue. Compare the pictures and change B to meet your mission.','試驗留下線索。比較圖片，調整 B 以完成任務。'),fair:t('Both sprouted, but the lighting is identical. To test light fairly, keep moisture the same and use different lighting.','兩邊都萌發，但光照也相同。公平測試光照，需要相同濕度、不同光照。'),prediction:t('The conditions worked! Compare the evidence, revise your prediction and run the same trial again.','條件合適！比較證據、修正預測，再用相同條件試一次。'),solved:t('Evidence found! One leaf seal opens.','找到證據！一道葉形封印打開了。'),complete:t('Three discoveries! The seed vault awakens.','三次發現！種子寶庫甦醒了。')};
 $('feedback').textContent=messages[feedback];$('comparison').hidden=!result;
 if(result){$('trialCaption').textContent=t('After virtual growing time · fresh matched samples','虛擬生長時間後 · 狀態相同的新樣本');picture('resultA',result.a,`A: ${describe(result.a)}`);picture('resultB',result.b,`B: ${describe(result.b)}`);$('outcomeA').textContent=describe(result.a);$('outcomeB').textContent=describe(result.b);$('evidence').textContent=evidence(result);}
 $('next').hidden=!solved||stage===2;$('reward').hidden=!complete;$('notes').hidden=!complete;$('retrySave').hidden=!saveFailed;
 $('saveStatus').textContent=saveFailed?t('Sigil earned, but this browser could not save it. Please try saving again.','已獲得符印，但瀏覽器無法儲存。請再次嘗試儲存。'):OrionProgress.has('verdant')?t('Verdant Sigil saved in your collection.','青翠符印已存入你的收藏。'):'';
 $('hints').hidden=!hintDepth;$('hints').innerHTML=hints().slice(0,hintDepth).map(h=>`<li>${h}</li>`).join('');$('hint').disabled=hintDepth===3;$('hint').setAttribute('aria-label',t('Reveal the next clue','顯示下一個提示'));$('hint').setAttribute('aria-expanded',String(hintDepth>0));
 $('log').innerHTML=history.length?history.map(r=>`<li>B: ${settings(r.water,r.light)} → A: ${describe(r.a)}; B: ${describe(r.b)}. ${t('Prediction','預測')}: ${r.prediction==='same'?t('Same','相同'):r.prediction}</li>`).join(''):`<li>${t('Your growing trials will appear here.','生長試驗會記錄在這裡。')}</li>`;
 $('vaultArt').classList.toggle('awake',complete);$('sceneStatus').textContent=complete?t('The Verdant Sigil is yours.','青翠符印屬於你了。'):t('Three leaf seals protect the sleeping seeds.','三道葉形封印守護沉睡的種子。');
}
function resetStage(){water=stages[stage].startWater;light=stages[stage].startLight;prediction='';solved=false;hintDepth=0;feedback='ready';result=null;history=[];saveFailed=false;$('notes').open=false;render();}
function resetMission(){configureQuestions();stage=0;resetStage();}
$('water').addEventListener('input',()=>setWater(Number($('water').value)));$('lessWater').onclick=()=>setWater(water-1);$('moreWater').onclick=()=>setWater(water+1);$('light').onclick=toggleLight;
for(const [id,value] of [['predictA','A'],['predictB','B'],['predictSame','same']])$(id).onclick=()=>choose(value);
$('run').onclick=trial;$('next').onclick=()=>{if(!solved||stage===2)return;stage++;resetStage();(stage===1?$('light'):$('water')).focus();};$('hint').onclick=()=>{hintDepth=Math.min(3,hintDepth+1);render();};$('replay').onclick=()=>{const next=OrionProgress.nextVariant('seeds',questionVariant);resetMission();configureQuestions(next);observedVariant=OrionProgress.variant('seeds');resetStage();$('water').focus();};$('retrySave').onclick=()=>{saveFailed=!OrionProgress.earn('verdant');render();};
let observedVariant=OrionProgress.variant('seeds');
function syncProgress(){const v=OrionProgress.variant('seeds');if(v!==observedVariant){observedVariant=v;observedTarget=OrionProgress.read().hashTarget;resetMission();return;}const target=OrionProgress.read().hashTarget,reset=target!==observedTarget&&!OrionProgress.has('verdant');observedTarget=target;if(reset||(solved&&stage===2&&!OrionProgress.has('verdant')&&!saveFailed))resetMission();else render();}
window.addEventListener('orion-language',syncProgress);window.addEventListener('storage',e=>{if(e.key==='orion-expedition-progress-v1')syncProgress();});window.addEventListener('pageshow',syncProgress);configureQuestions();resetStage();OrionI18n.apply();
