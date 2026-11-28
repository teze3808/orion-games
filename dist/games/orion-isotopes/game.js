 'use strict';
const byId=id=>document.getElementById(id),t=OrionI18n.t;
let variant=OrionProgress.variant('isotopes'),savedVariant=variant,savedTarget=OrionProgress.read().hashTarget;
let stage=0,selected=null,hintDepth=0,solved=false,cluesOpen=false,saveFailed=false,checked=false;
function challenge(){const p=6+(variant+stage)%3,n=p+Math.floor(variant/3),reference={p,n};let options=[{p,n:n+1},{p,n},{p:p+1,n:n-1},{p:p+1,n}].slice(0,stage+2);const shift=(variant+stage)%options.length;options=options.slice(shift).concat(options.slice(0,shift));return {reference,options};}
function resetPanel(){selected=null;hintDepth=0;solved=cluesOpen=saveFailed=checked=false;render();}
function choose(i){if(solved||!Number.isInteger(i)||i<0||i>=challenge().options.length)return;selected=selected===i?null:i;checked=false;render();byId('samples').querySelector('[data-sample="'+i+'"]').focus();}
function matches(){const q=challenge(),s=q.options[selected];return !!s&&s.p===q.reference.p&&s.n!==q.reference.n;}
function inventory(a){return '<span>'+t('Protons','質子')+': <b>'+a.p+'</b></span><span>'+t('Neutrons','中子')+': <b>'+a.n+'</b></span><span>'+t('Mass number','質量數')+': <b>'+(a.p+a.n)+'</b></span>';}
function render(){const q=challenge(),complete=solved&&stage===2;window.OrionDiscovery?.update(complete);document.title=t('The Isotope Lantern Archive · Orion','同位素燈檔案館 · Orion');
byId('progress').textContent=t('Lanterns restored','已修復燈盞')+' · '+(stage+Number(solved))+' / 3';byId('progress').parentElement.classList.toggle('complete',complete);byId('stageTitle').textContent=t('Lantern ','燈盞 ')+(stage+1);
byId('reference').innerHTML=inventory(q.reference);
byId('samples').innerHTML=q.options.map((a,i)=>'<button data-sample="'+i+'" aria-pressed="'+(selected===i)+'" '+(solved?'disabled':'')+'><strong>'+t('Record ','紀錄 ')+String.fromCharCode(65+i)+'</strong>'+inventory(a)+'</button>').join('');
byId('selection').textContent=selected===null?t('Choose a record, then test the pair.','選擇一份紀錄，再測試配對。'):t('Selected record ','已選紀錄 ')+String.fromCharCode(65+selected);
byId('reset').disabled=solved;
const a=q.options[selected];byId('feedback').textContent=solved?t('Same element, different neutron count. The isotope lantern shines!','元素相同，中子數不同。同位素燈亮起來了！'):checked?(selected===null?t('Choose a record first.','請先選擇一份紀錄。'):a.p!==q.reference.p?t('The proton counts differ, so these are different elements. Try another record.','質子數不同，所以是不同元素。試試另一份紀錄。'):t('Both counts are unchanged: this is the same isotope. Find a different neutron count.','兩種數量都相同：這是同一種同位素。找找中子數不同的紀錄。')):'';
const clues=[t('Compare the two kinds of particles separately. A matching total alone is not enough.','分別比較兩種粒子的數量，單是總數相同並不足夠。'),t('The proton count identifies the element. Different isotopes of that element have different neutron counts.','質子數決定元素。同一元素的不同同位素，中子數不同。'),t('Keep ','保持 ')+q.reference.p+t(' protons and find ',' 個質子，找出 ')+(q.reference.n+1)+t(' neutrons.',' 個中子。')];
byId('hints').innerHTML=clues.slice(0,hintDepth).map(x=>'<li>'+x+'</li>').join('');byId('clues').hidden=!cluesOpen;byId('hint').setAttribute('aria-expanded',String(cluesOpen));byId('hint').setAttribute('aria-label',t('Reveal the next clue','顯示下一個提示'));byId('hint').hidden=byId('check').hidden=solved;byId('next').hidden=!solved||complete;byId('reward').hidden=!complete;byId('retrySave').hidden=!saveFailed;byId('saved').textContent=saveFailed?t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。'):t('Kinship Sigil saved.','已儲存同源符印。');}
byId('samples').onclick=e=>{const b=e.target.closest('[data-sample]');if(b)choose(Number(b.dataset.sample));};byId('reset').onclick=()=>{if(!solved)resetPanel();};
byId('check').onclick=()=>{if(solved)return;checked=true;solved=matches();if(solved)cluesOpen=false;if(solved&&stage===2)saveFailed=!OrionProgress.earn('kinship');render();if(solved&&stage<2)byId('next').focus();};
byId('next').onclick=()=>{if(!solved||stage>=2)return;stage++;resetPanel();byId('samples').querySelector('button').focus();};
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('kinship');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('isotopes',variant);
  savedVariant = OrionProgress.variant('isotopes');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('isotopes');
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
