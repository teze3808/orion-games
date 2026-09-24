'use strict';
const $=id=>document.getElementById(id),t=OrionI18n.t;
const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const chapters=[
 {plain:'EAST',shift:3,title:['The first seal','第一道封印'],task:['Read the first letter. Turn the wheel and enter the direction it reveals, using A–Z.','解讀第一封信。轉動字母輪，用 A–Z 輸入信中藏著的方向。'],context:['A compass is etched into the envelope: NORTH · 北 / EAST · 東 / SOUTH · 南 / WEST · 西.','信封上刻著指南針：NORTH · 北 / EAST · 東 / SOUTH · 南 / WEST · 西。']},
 {plain:'MOON',shift:7,title:['The garden seal','花園封印'],task:['The route leads to a garden of four symbols. This letter uses a different wheel setting. Enter its hidden symbol in A–Z.','路線通往有四個標記的花園。這封信用了不同的轉輪設定。用 A–Z 輸入藏著的標記。'],context:['The stone signs read: SUN · 太陽 / MOON · 月亮 / STAR · 星星 / RAIN · 雨.','石牌上寫著：SUN · 太陽 / MOON · 月亮 / STAR · 星星 / RAIN · 雨。']},
 {plain:'FOX',shift:5,title:['A reply for the keeper','給守望者的回信'],task:['The silver fox asks you to send FOX using setting 5. Turn the wheel, then enter the three secret letters for your reply.','銀色狐狸請你用設定 5 寄出 FOX。轉動字母輪，再輸入回信的三個秘密字母。'],context:['FOX means 狐狸. This time you are writing a secret message, not reading one.','FOX 的意思是狐狸。這次要寫出密信，而不是解讀它。']}
];
let wheelDrag=null;
let chapter=0,offset=0,hintDepth=0,solved=false,messageState='',saveFailed=false;
function shift(text,n){return text.replace(/[A-Z]/g,c=>letters[(letters.indexOf(c)+n+26)%26]);}
function hints(){const c=chapters[chapter];return chapter===2?[
 t('Use the outer letter as the letter you want to send. The inner letter is its secret partner.','外圈是你想寄出的字母，內圈是它的秘密搭檔。'),
 t('At setting 5, A becomes F. Count forward five places for every letter; after Z comes A.','設定 5 時，A 變成 F。每個字母向前數五格，Z 之後回到 A。'),
 t('FOX becomes KTC. Set the wheel to 5 and follow F → K, O → T, X → C.','FOX 會變成 KTC。把轉輪設為 5，再找出 F → K、O → T、X → C。')]:[
 t('Outer letters are ordinary; inner letters are their secret partners. Find a setting that makes a word.','外圈是普通字母，內圈是它的秘密搭檔。試找出能讀成單字的設定。'),
 t('Read backward from each secret letter to its outer partner. The wheel wraps from Z to A.','從每個秘密字母往回找外圈的搭檔。字母輪從 Z 繞回 A。'),
 t(`Try setting ${c.shift}. ${shift(c.plain,c.shift)} reads ${c.plain}.`,`試試設定 ${c.shift}。${shift(c.plain,c.shift)} 可以讀成 ${c.plain}。`)];}
function render(){window.OrionLayout?.update(chapter, solved, 3);renderWheel();const c=chapters[chapter];document.title=t('The Moonlit Letter · Orion’s Expedition','月光下的密信 · Orion 的探險');$('chapter').textContent=t(`LETTER ${chapter+1} OF 3`,`第 ${chapter+1} 封信，共 3 封`);$('taskTitle').textContent=t(...c.title);$('instruction').textContent=t(...c.task);$('context').textContent=t(...c.context);$('letterLabel').textContent=chapter===2?t('MESSAGE TO SEND','要寄出的訊息'):t('THE KEEPER’S LETTER','守望者的密信');$('message').textContent=chapter===2?c.plain:shift(c.plain,c.shift);$('wheelValue').textContent=t(`Setting ${offset}`,`設定 ${offset}`);$('alphabet').innerHTML=[...letters].map(l=>`<span class="pair">${l}<b>${shift(l,offset)}</b></span>`).join('');$('alphabet').setAttribute('aria-label',t('Table: upper letters are ordinary; lower letters are secret.','表格：上方是普通字母，下方是秘密字母。'));$('preview').textContent=chapter===2?t(`Your secret reply: ${shift(c.plain,offset)}`,`你的秘密回信：${shift(c.plain,offset)}`):t(`The wheel reads: ${shift(shift(c.plain,c.shift),-offset)}`,`轉輪讀出：${shift(shift(c.plain,c.shift),-offset)}`);$('answerLabel').textContent=chapter===2?t('Your encoded reply (A–Z)','你的加密回信（A–Z）'):t('The hidden word (A–Z)','藏著的單字（A–Z）');$('hint').setAttribute('aria-label',t('Reveal the next clue','顯示下一個提示'));$('hint').setAttribute('aria-expanded',String(hintDepth>0));$('hints').hidden=hintDepth===0;$('hints').innerHTML=hints().slice(0,hintDepth).map(h=>`<li>${h}</li>`).join('');$('hint').disabled=hintDepth===3;$('next').hidden=!solved||chapter===2;$('controls').hidden=solved;$('treasure').hidden=!(solved&&chapter===2);$('notes').hidden=!(solved&&chapter===2);document.querySelector('.scene').classList.toggle('lit',solved&&chapter===2);$('sceneCaption').textContent=solved&&chapter===2?t('The archive remembers.','檔案館甦醒了。'):t('Three seals. One forgotten story.','三道封印，一段被遺忘的故事。');
 const statuses={invalid:t('Use letters A–Z only. Try again whenever you are ready.','請只輸入 A–Z 字母，準備好就再試一次。'),wrong:t('The seal stays quiet. Turn the wheel and compare the letters, then try again.','封印沒有反應。轉動字母輪，比較字母，再試一次。'),setting:t('That word fits! Now line up the wheel so it shows the same word, then test again.','這個單字合適！現在把轉輪調到顯示相同單字的設定，再試一次。'),success:t('The seal shines. You found the keeper’s next clue!','封印亮起來了。你找到守望者的下一個線索！')};$('status').textContent=statuses[messageState]||'';
 $('reward').textContent=saveFailed?t('You earned the Moonlight Sigil, but this browser could not save it. Enable storage and test the final reply again.','你獲得了月光符印，但瀏覽器無法儲存。請啟用儲存功能，再試一次最後的回信。'):OrionProgress.has('moonlight')?t('Moonlight Sigil saved in your collection.','月光符印已存入你的收藏。'):t('The collection was reset. Read the letters again to earn this sigil.','收藏已重設。再次解讀密信，就能重新獲得符印。');
 if(saveFailed){$('controls').hidden=false;}
}
function submitAnswer(value){if(solved&&!saveFailed)return;const answer=value.trim().toUpperCase();const c=chapters[chapter],expected=chapter===2?shift(c.plain,c.shift):c.plain;if(!/^[A-Z]+$/.test(answer)){messageState='invalid';}else if(answer!==expected){messageState='wrong';}else if(offset!==c.shift){messageState='setting';}else{solved=true;messageState='success';if(chapter===2)saveFailed=!OrionProgress.earn('moonlight');}render();if(solved&&chapter<2)$('next').focus();}
function resetMission(){wheelDrag=null;chapter=0;offset=0;hintDepth=0;solved=false;messageState='';saveFailed=false;$('answer').value='';$('notes').open=false;render();}
$('answerForm').addEventListener('submit',e=>{e.preventDefault();submitAnswer($('answer').value);});
$('left').onclick=()=>turnWheel(-1);$('right').onclick=()=>turnWheel(1);
$('hint').onclick=()=>{hintDepth=Math.min(3,hintDepth+1);render();};
$('next').onclick=()=>{if(!solved||chapter>=2)return;wheelDrag=null;chapter++;offset=0;hintDepth=0;solved=false;messageState='';$('answer').value='';render();$('answer').focus();};
$('replay').onclick=()=>{resetMission();$('answer').focus();};
let observedTarget=OrionProgress.read().hashTarget;
function syncProgress(){const target=OrionProgress.read().hashTarget;const collectionReset=target!==observedTarget&&!OrionProgress.has('moonlight');observedTarget=target;if(collectionReset||(solved&&chapter===2&&!OrionProgress.has('moonlight')&&!saveFailed))resetMission();else render();}

function ringLetters(radius){return [...letters].map((letter,i)=>{
 const angle=i*360/26;
 return `<g transform="rotate(${angle} 220 220)"><path d="M220 ${220-radius-14}v-6" stroke="#adb4bb"/><text x="220" y="${220-radius+6}" text-anchor="middle">${letter}</text></g>`;
}).join('');}
function renderWheel(){
 $('outerLetters').innerHTML=ringLetters(188);$('innerLetters').innerHTML=ringLetters(142);
 $('innerRing').setAttribute('transform',`rotate(${-offset*360/26} 220 220)`);
 $('wheelCenterTitle').textContent=t('ROTATE INNER RING','旋轉內圈');
 $('wheelCenterValue').textContent=String(offset);
 $('wheelPair').textContent=`A → ${shift('A',offset)}`;
 $('cipherWheel').setAttribute('aria-label',t('Cipher wheel. Use left and right arrows to change the setting.','密碼轉輪。使用左右方向鍵改變設定。'));
 $('cipherWheel').setAttribute('aria-valuenow',String(offset));
 $('cipherWheel').setAttribute('aria-valuetext',t(`Setting ${offset}; ordinary A matches secret ${shift('A',offset)}`,`設定 ${offset}；普通字母 A 對應秘密字母 ${shift('A',offset)}`));
}
function turnWheel(delta){if(solved&&!saveFailed)return;offset=(offset+delta+26)%26;render();}
function pointerAngle(e){const r=$('cipherWheel').getBoundingClientRect();return Math.atan2(e.clientY-r.top-r.height/2,e.clientX-r.left-r.width/2)*180/Math.PI;}
function angleDifference(a,b){return ((a-b+540)%360)-180;}
$('cipherWheel').addEventListener('pointerdown',e=>{
 if((solved&&!saveFailed)||e.button!==0)return;
 const r=$('cipherWheel').getBoundingClientRect(),radius=Math.hypot(e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2)*440/r.width;
 if(radius>164||radius<108)return;
 wheelDrag={id:e.pointerId,start:offset,angle:pointerAngle(e),total:0};$('cipherWheel').setPointerCapture(e.pointerId);
});
$('cipherWheel').addEventListener('pointermove',e=>{
 if(!wheelDrag||wheelDrag.id!==e.pointerId)return;
 const angle=pointerAngle(e);wheelDrag.total+=angleDifference(angle,wheelDrag.angle);wheelDrag.angle=angle;
 offset=((wheelDrag.start-Math.round(wheelDrag.total/(360/26)))%26+26)%26;render();
});
$('cipherWheel').addEventListener('pointerup',e=>{if(wheelDrag&&wheelDrag.id===e.pointerId)wheelDrag=null;});
function cancelWheelDrag(){if(!wheelDrag)return;offset=wheelDrag.start;wheelDrag=null;render();}
$('cipherWheel').addEventListener('pointercancel',cancelWheelDrag);$('cipherWheel').addEventListener('lostpointercapture',cancelWheelDrag);
$('cipherWheel').addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();turnWheel(e.key==='ArrowRight'?1:-1);}else if(e.key==='Escape')cancelWheelDrag();});

window.addEventListener('orion-language',render);
window.addEventListener('storage',e=>{if(e.key==='orion-expedition-progress-v1'||e.key===null)syncProgress();});
window.addEventListener('pageshow',syncProgress);
OrionI18n.apply();
