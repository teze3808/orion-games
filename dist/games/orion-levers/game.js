'use strict';
const $=id=>document.getElementById(id),t=OrionI18n.t;
const stages=[
 {mass:2,distance:3,right:2,title:['The first latch','第一道門閂'],mission:['The left load is fixed. Move your matching load along the right side. Predict, test, and find a balance.','左邊負載已固定。把相同的負載沿右邊移動。先預測，再測試，找出平衡的位置。']},
 {mass:4,distance:2,right:2,title:['The lighter counterweight','較輕的配重'],mission:['Your right load now has fewer blocks than the left. Can changing its position still keep the beam level?','右邊的砝碼現在比左邊少。改變位置，仍能讓橫桿保持水平嗎？']},
 {mass:3,distance:4,right:1,title:['The engineer’s two keys','工程師的兩把鑰匙'],mission:['Choose both the number of blocks and their position. Find TWO different balanced designs to open the vault.','選擇砝碼數量和位置。找出兩種不同的平衡設計，就能打開密庫。']}
];
let stage=0,mass=2,distance=1,prediction='',result=null,feedback='',history=[],solutions=[],solved=false,saveFailed=false;
let beamDrag=null;
let observedTarget=OrionProgress.read().hashTarget;
function outcome(m=mass,d=distance){const left=stages[stage].mass*stages[stage].distance,right=m*d;return left===right?'balanced':left>right?'left':'right';}
function outcomeText(value){return value==='balanced'?t('Stays level','保持水平'):value==='left'?t('Left drops','左邊下降'):t('Right drops','右邊下降');}
function hintTexts(){const c=stages[stage];return [t('Try keeping the same number of blocks and moving them. Watch which side starts to drop.','試保持砝碼數量不變，只移動位置。觀察哪邊開始下降。'),t('Both the number of blocks and the distance from the pivot matter. Compare blocks × distance on each side.','砝碼數量和與支點的距離都重要。比較兩邊的「數量 × 距離」。'),stage===2?t('The left side is 3 × 4 = 12. Try 2 blocks at distance 6, then 4 blocks at distance 3. Predict “Stays level”.','左邊是 3 × 4 = 12。試把 2 個砝碼放在距離 6，再把 4 個放在距離 3。預測「保持水平」。'):t(`Try ${c.right} blocks at distance ${c.mass*c.distance/c.right}. Predict “Stays level”, then release.`,`試把 ${c.right} 個砝碼放在距離 ${c.mass*c.distance/c.right}。預測「保持水平」，再放開。`)];}
let hintDepth=0;
function blocks(x,n){return Array.from({length:n},(_,i)=>`<rect x="${x-15}" y="${99-i*20}" width="30" height="18" rx="3" fill="url(#brass)" stroke="#f7dc9f"/>`).join('');}
function render(){const c=stages[stage];document.title=t('The Counterweight Vault · Orion’s Expedition','配重密庫 · Orion 的探險');$('stageLabel').textContent=t(`SEAL ${stage+1} OF 3 · ENGINEERING`,`第 ${stage+1} 道封印，共 3 道 · 工程`);$('stageTitle').textContent=t(...c.title);$('mission').textContent=t(...c.mission);$('fixedLoad').textContent=t(`Left side: ${c.mass} identical blocks, ${c.distance} spaces from the pivot.`,`左邊：${c.mass} 個相同砝碼，距離支點 ${c.distance} 格。`);$('mass').value=String(mass);$('mass').disabled=stage<2;$('distance').value=String(distance);$('controls').hidden=solved;
 document.querySelectorAll('[data-prediction]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.prediction===prediction)));
 $('ticks').innerHTML=Array.from({length:13},(_,i)=>{const n=i-6,x=320+n*43;return n?`<path d="M${x} 114v14" stroke="#f4d896"/><text x="${x}" y="151" text-anchor="middle">${Math.abs(n)}</text>`:'';}).join('');$('leftLoad').innerHTML=blocks(320-c.distance*43,c.mass);$('rightLoad').innerHTML=blocks(320+distance*43,mass);$('beam').setAttribute('transform',`rotate(${result==='left'?-9:result==='right'?9:0} 320 121)`);$('pivotLabel').textContent=t('Pivot','支點');$('diagram').setAttribute('aria-label',t(`Lever: left ${c.mass} blocks at distance ${c.distance}; right ${mass} blocks at distance ${distance}.`,`槓桿：左邊 ${c.mass} 個砝碼，距離 ${c.distance}；右邊 ${mass} 個，距離 ${distance}。`));$('reading').textContent=result?outcomeText(result):t('Beam held level, ready for your test','橫桿暫時固定水平，等你測試');
 const texts={choose:t('Choose a prediction before releasing the beam.','先選擇你的預測，再放開橫桿。'),invalid:t('Choose a valid number of blocks and distance.','請選擇有效的砝碼數量及距離。'),wrong:t('Your prediction differed from the result. The log keeps the evidence. Adjust or predict again—there is no penalty.','結果與預測不同。紀錄留下了證據。調整或重新預測，再試一次，不會扣分。'),observe:t('Good prediction! This design tilts. Try another position to find a balance.','預測正確！這個設計會傾斜。試試另一位置，找出平衡。'),balanced:t('The beam stays level. The bronze seal releases!','橫桿保持水平，青銅封印解開了！'),another:t('One balanced design found. Change the blocks and position to find a different one.','找到一種平衡設計了。改變砝碼和位置，找出另一種。'),duplicate:t('You already recorded this design. Find a different balanced combination.','這個設計已經記錄過了。找出另一種平衡組合。'),complete:t('Two different designs, the same balance. The vault is yours to explore!','兩種不同設計，同樣達到平衡。密庫等你探索！')};$('feedback').textContent=texts[feedback]||'';
 $('next').hidden=!solved||stage===2;$('reward').hidden=!(solved&&stage===2);$('notes').hidden=!(solved&&stage===2);$('scene').classList.toggle('complete',solved&&stage===2);$('seals').textContent=Array.from({length:3},(_,i)=>i<stage||(i===stage&&solved)?'◆':'◇').join(' ');$('sceneStatus').textContent=solved&&stage===2?t('The engineer’s secret is revealed.','工程師的秘密揭開了。'):t('Balance the mechanism. Unseal the story.','平衡機關，解開故事。');$('solutions').textContent=stage===2&&solutions.length?t('Recorded designs: ','已記錄設計：')+solutions.map(k=>{const [m,d]=k.split(':');return t(`${m} blocks at ${d}`,`${m} 個砝碼，距離 ${d}`);}).join(' · '):'';
 $('log').innerHTML=history.length?history.map(h=>`<li>${t(`${h.mass} blocks at distance ${h.distance}`,`${h.mass} 個砝碼，距離 ${h.distance}`)} — ${t('predicted','預測')} ${outcomeText(h.prediction)}; ${t('observed','觀察')} ${outcomeText(h.result)}.</li>`).join(''):`<li>${t('Your tests will appear here.','你的測試會顯示在這裡。')}</li>`;
 $('hints').hidden=!hintDepth;$('hints').innerHTML=hintTexts().slice(0,hintDepth).map(h=>`<li>${h}</li>`).join('');$('hint').disabled=hintDepth===3;$('hint').setAttribute('aria-expanded',String(hintDepth>0));$('hint').setAttribute('aria-label',t('Reveal the next clue','顯示下一個提示'));$('retrySave').hidden=!saveFailed;$('saveStatus').textContent=saveFailed?t('Sigil earned, but this browser could not save it. You can retry saving.','你獲得了符印，但瀏覽器無法儲存。可以再次嘗試儲存。'):OrionProgress.has('ingenuity')?t('Ingenuity Sigil saved in your collection.','巧思符印已存入你的收藏。'):'';
 $('distanceValue').textContent=t(`Position ${distance}`,`位置 ${distance}`);
 $('massValue').textContent=t(`${mass} blocks`,`${mass} 個砝碼`);
 $('massHelp').textContent=stage<2?t('Locked for this seal. Move the weight to explore. You can change the block count at the final seal.','這道封印的數量已固定。移動砝碼來探索；最後一道封印可以改變數量。'):t('Tap + / − or drag the slider. Find two different balanced designs.','點 +／− 或拖動滑桿，找出兩種不同的平衡設計。');
 $('lessMass').disabled=solved||stage<2||mass<=1;$('moreMass').disabled=solved||stage<2||mass>=4;
 $('mass').disabled=solved||stage<2;$('distance').disabled=solved;
 $('dragHandle').setAttribute('x',String(320+distance*43-28));
 $('dragHandle').setAttribute('visibility',solved?'hidden':'visible');
 $('distance').setAttribute('aria-valuetext',t(`Position ${distance} from the pivot`,`距離支點 ${distance} 格`));
 $('mass').setAttribute('aria-valuetext',t(`${mass} identical blocks`,`${mass} 個相同砝碼`));

}
function changeSetting(){if(solved)return;mass=Number($('mass').value);distance=Number($('distance').value);prediction='';result=null;feedback='';render();}
function testBeam(){if(solved)return;if(!Number.isInteger(mass)||mass<1||mass>4||!Number.isInteger(distance)||distance<1||distance>6||(stage<2&&mass!==stages[stage].right)){feedback='invalid';render();return;}if(!['left','right','balanced'].includes(prediction)){feedback='choose';render();return;}result=outcome();history.unshift({mass,distance,prediction,result});history=history.slice(0,8);if(prediction!==result)feedback='wrong';else if(result!=='balanced')feedback='observe';else{const key=`${mass}:${distance}`;if(solutions.includes(key))feedback='duplicate';else{solutions.push(key);if(stage<2||solutions.length===2){solved=true;feedback=stage===2?'complete':'balanced';if(stage===2)saveFailed=!OrionProgress.earn('ingenuity');}else feedback='another';}}render();if(solved&&stage<2)$('next').focus();}
function resetStage(){beamDrag=null;mass=stages[stage].right;distance=1;prediction='';result=null;feedback='';history=[];solutions=[];solved=false;saveFailed=false;hintDepth=0;$('notes').open=false;render();}
function resetMission(){stage=0;resetStage();}
$('mass').addEventListener('input',changeSetting);$('distance').addEventListener('input',changeSetting);
$('mass').addEventListener('change',changeSetting);$('distance').addEventListener('change',changeSetting);
$('lessMass').onclick=()=>adjustMass(-1);$('moreMass').onclick=()=>adjustMass(1);
document.querySelectorAll('[data-prediction]').forEach(b=>b.addEventListener('click',()=>{prediction=b.dataset.prediction;feedback='';render();}));$('test').onclick=testBeam;$('next').onclick=()=>{if(!solved||stage===2)return;stage++;resetStage();$('distance').focus();};$('replay').onclick=()=>{resetMission();$('distance').focus();};$('retrySave').onclick=()=>{saveFailed=!OrionProgress.earn('ingenuity');render();};$('hint').onclick=()=>{hintDepth=Math.min(3,hintDepth+1);render();};
function syncProgress(){const target=OrionProgress.read().hashTarget,reset=target!==observedTarget&&!OrionProgress.has('ingenuity');observedTarget=target;if(reset||(solved&&stage===2&&!OrionProgress.has('ingenuity')&&!saveFailed))resetMission();else render();}

function adjustMass(delta){
 if(solved||stage<2)return;
 $('mass').value=String(Math.max(1,Math.min(4,mass+delta)));changeSetting();
}
function distanceFromX(x,left,width){return Math.max(1,Math.min(6,Math.round(((x-left)*640/width-320)/43)));}
function moveWeight(e){
 const rect=$('diagram').getBoundingClientRect();
 const next=distanceFromX(e.clientX,rect.left,rect.width);
 if(next!==distance||result!==null){$('distance').value=String(next);changeSetting();}
}
$('diagram').addEventListener('pointerdown',e=>{
 if(solved||e.button!==0)return;
 const rect=$('diagram').getBoundingClientRect();
 if(e.clientX<rect.left+rect.width/2)return;
 beamDrag={id:e.pointerId,distance,prediction,result,feedback};
 $('diagram').setPointerCapture(e.pointerId);moveWeight(e);
});
$('diagram').addEventListener('pointermove',e=>{if(beamDrag&&beamDrag.id===e.pointerId)moveWeight(e);});
$('diagram').addEventListener('pointerup',e=>{if(beamDrag&&beamDrag.id===e.pointerId){moveWeight(e);beamDrag=null;}});
function cancelBeamDrag(){if(!beamDrag)return;({distance,prediction,result,feedback}=beamDrag);beamDrag=null;render();}
$('diagram').addEventListener('pointercancel',cancelBeamDrag);
$('diagram').addEventListener('lostpointercapture',cancelBeamDrag);
window.addEventListener('keydown',e=>{if(e.key==='Escape')cancelBeamDrag();});

window.addEventListener('orion-language',render);window.addEventListener('storage',e=>{if(e.key==='orion-expedition-progress-v1'||e.key===null)syncProgress();});window.addEventListener('pageshow',syncProgress);OrionI18n.apply();
