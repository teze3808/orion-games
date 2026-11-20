'use strict';
const byId=id=>document.getElementById(id),t=OrionI18n.t;
const banks=[[[1,2],[1,4],[2,4],[3,4],[4,3],[5,2]],[[1,1],[2,2],[4,4],[3,2],[5,4],[6,4]],[[7,1],[7,3],[7,5],[3,5],[5,3],[6,3]]];
const weights=[8,4,2,1];
let variant=OrionProgress.variant('carry'),savedVariant=variant,savedTarget=OrionProgress.read().hashTarget;
let stage=0,sum=[],carries=[],hintDepth=0,solved=false,cluesOpen=false,saveFailed=false,checked=false;
function puzzle(){return banks[stage][variant];}
function bits(n){return n.toString(2).padStart(4,'0').split('').map(Number);}
function solution(){const [a,b]=puzzle().map(bits),result=Array(4),incoming=[0,0,0,0];for(let i=3;i>=0;i--){const count=a[i]+b[i]+incoming[i];result[i]=count%2;if(i>0)incoming[i-1]=Math.floor(count/2);}return {sum:result,carries:incoming.slice(0,3)};}
function correct(){const q=solution();return sum.every((v,i)=>v===q.sum[i])&&carries.every((v,i)=>v===q.carries[i]);}
function resetPanel(){sum=Array(4).fill(null);carries=Array(3).fill(null);hintDepth=0;solved=cluesOpen=saveFailed=checked=false;render();}
function cycle(kind,index){if(solved||!['sum','carries'].includes(kind))return;const row=kind==='sum'?sum:carries;if(!Number.isInteger(index)||index<0||index>=row.length)return;row[index]=row[index]===null?0:1-row[index];checked=false;render();}
function row(label,values,kind,extra=''){return '<div class="bitrow '+extra+'"><span class="rowlabel">'+label+'</span>'+values.map((v,i)=>kind&&!(kind==='carries'&&i===3)?'<button data-kind="'+kind+'" data-index="'+i+'" class="'+(v===1?'lit':'')+'" aria-label="'+label+', '+t('column value ','欄值 ')+weights[i]+': '+(v===null?t('empty','未填'):v)+'" '+(solved?'disabled':'')+'>'+(v===null?'?':v)+'</button>':'<span class="'+(v===1?'lit':'')+'">'+v+'</span>').join('')+'</div>';}
function render(){
 const complete=solved&&stage===2;window.OrionDiscovery?.update(complete);const [a,b]=puzzle();
 document.title=t('The Carry Lantern Vault · Orion','進位燈寶庫 · Orion');
 byId('progress').textContent=t('Locks restored','已修復石鎖')+' · '+(stage+Number(solved))+' / 3';byId('progress').parentElement.classList.toggle('complete',complete);
 byId('stageTitle').textContent=t('Lock ','石鎖 ')+(stage+1);
 byId('instruction').textContent=t('Add the lantern rows. Fill the incoming carries above and the sum below.','把兩行燈相加，上方填收到的進位，下方填總和。');
 byId('board').innerHTML=row(t('Value','欄值'),weights,null,'weights')+row(t('Carry in','收到進位'),[...carries,0],'carries','carries')+row('A',bits(a))+row('+ B',bits(b))+row(t('Sum','總和'),sum,'sum','total');
 byId('clear').hidden=solved;
 byId('feedback').textContent=solved?t('The addition and carries fit! ','總和與進位都正確！ ')+a+' + '+b+' = '+(a+b):checked?t('Check each column from the right. Every answer and incoming carry needs a 0 or 1.','由右邊逐欄檢查，每格答案與收到的進位都要填 0 或 1。'):'';
 const q=solution();let i=3;while(i>0&&sum[i]===q.sum[i]&&carries[i-1]===q.carries[i-1])i--;
 const incoming=i===3?0:q.carries[i];const count=bits(a)[i]+bits(b)[i]+incoming;
 const clues=[t('0 + 0 gives 0. 0 + 1 gives 1. Begin with the rightmost column, which receives no carry.','0 + 0 得 0，0 + 1 得 1。由最右欄開始，這一欄沒有收到進位。'),t('Two ones make binary 10: write 0 and carry 1 left. Three ones make 11: write 1 and carry 1 left.','兩個 1 合成二進位 10：寫 0，向左進 1。三個 1 合成 11：寫 1，向左進 1。'),t('Column value ','欄值 ')+weights[i]+': '+bits(a)[i]+' + '+bits(b)[i]+' + '+incoming+' = '+count+t(' in ordinary counting. Write ','（一般計數）。寫 ')+q.sum[i]+(i>0?t('; carry ','；向左進 ')+q.carries[i-1]:'')];
  byId('hints').innerHTML = clues.slice(0,hintDepth).map(clue=>'<li>'+clue+'</li>').join('');
  byId('hint').setAttribute('aria-expanded', String(cluesOpen));
  byId('hint').setAttribute('aria-label', t('Reveal the next clue','顯示下一個提示'));
  byId('clues').hidden = !cluesOpen;
  byId('hint').hidden = byId('check').hidden = solved;
  byId('next').hidden = !solved || complete;
  byId('reward').hidden = !complete;
  byId('retrySave').hidden = !saveFailed;
  byId('saved').textContent = saveFailed ? t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。') : t('Carrylight Sigil saved.','已儲存進光符印。');
}



byId('board').onclick=e=>{const b=e.target.closest('button[data-kind]');if(!b)return;const kind=b.dataset.kind,index=Number(b.dataset.index);cycle(kind,index);byId('board').querySelector('button[data-kind="'+kind+'"][data-index="'+index+'"]')?.focus();};
byId('clear').onclick=()=>{if(solved)return;sum.fill(null);carries.fill(null);checked=false;render();};
byId('check').onclick=()=>{if(solved)return;checked=true;solved=correct();if(solved)cluesOpen=false;if(solved&&stage===2)saveFailed=!OrionProgress.earn('carrylight');render();if(solved&&stage<2)byId('next').focus();};
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('carrylight');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('carry',variant);
  savedVariant = OrionProgress.variant('carry');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('carry');
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
