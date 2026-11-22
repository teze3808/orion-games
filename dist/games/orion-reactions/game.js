 'use strict';
const byId=id=>document.getElementById(id),t=OrionI18n.t;
const molecules={H2:{H:2},O2:{O:2},H2O:{H:2,O:1},Cl2:{Cl:2},HCl:{H:1,Cl:1},N2:{N:2},NH3:{N:1,H:3},CO:{C:1,O:1},CO2:{C:1,O:2},H2O2:{H:2,O:2}};
const names={H:['Hydrogen','氫'],O:['Oxygen','氧'],Cl:['Chlorine','氯'],N:['Nitrogen','氮'],C:['Carbon','碳']};
const reactions=[{terms:['H2','O2','H2O'],split:2,answer:[2,1,2]},{terms:['H2','Cl2','HCl'],split:2,answer:[1,1,2]},{terms:['N2','H2','NH3'],split:2,answer:[1,3,2]},{terms:['CO','O2','CO2'],split:2,answer:[2,1,2]},{terms:['H2O','H2','O2'],split:1,answer:[2,2,1]},{terms:['H2O2','H2O','O2'],split:1,answer:[2,2,1]}];
let variant=OrionProgress.variant('reactions'),savedVariant=variant,savedTarget=OrionProgress.read().hashTarget;
let stage=0,counts=[1,1,1],hintDepth=0,solved=false,cluesOpen=false,saveFailed=false,checked=false;
function puzzle(){return reactions[(variant+stage)%6];}
function totals(){const q=puzzle(),out=[{},{}];q.terms.forEach((m,i)=>Object.entries(molecules[m]).forEach(([a,n])=>{const side=i<q.split?0:1;out[side][a]=(out[side][a]||0)+n*counts[i];}));return out;}
function balanced(){const [a,b]=totals();return [...new Set([...Object.keys(a),...Object.keys(b)])].every(e=>a[e]===b[e]);}
function gcd(a,b){return b?gcd(b,a%b):a;}
function correct(){return counts.every(n=>Number.isInteger(n)&&n>=1&&n<=6)&&balanced()&&counts.reduce(gcd)===1;}
function resetPanel(){counts=[1,1,1];hintDepth=0;solved=cluesOpen=saveFailed=checked=false;render();}
function change(i,delta){if(solved||!Number.isInteger(i)||i<0||i>2||![-1,1].includes(delta))return;counts[i]=Math.max(1,Math.min(6,counts[i]+delta));checked=false;render();}
function formula(s){return s.replace(/(\d+)/g,'<sub>$1</sub>');}
function render(){const q=puzzle(),complete=solved&&stage===2,[a,b]=totals();window.OrionDiscovery?.update(complete);
document.title=t('The Atomkeeper’s Forge · Orion','原子守護者的工坊 · Orion');
byId('progress').textContent=t('Tablets restored','已修復石板')+' · '+(stage+Number(solved))+' / 3';byId('progress').parentElement.classList.toggle('complete',complete);byId('stageTitle').textContent=t('Tablet ','石板 ')+(stage+1);
byId('board').innerHTML=q.terms.map((m,i)=>{const side=i<q.split?t('Before','反應前'):t('After','反應後');const beads=Object.entries(molecules[m]).flatMap(([e,n])=>Array(n).fill('<i class="atom '+e+'">'+e+'</i>')).join('');return '<div class="term" data-formula="'+m+'" data-side="'+(i<q.split?0:1)+'"><div class="term-title"><small>'+side+'</small><b>'+formula(m)+'</b><span class="molecule" aria-hidden="true">'+beads+'</span></div><div class="counter"><button data-index="'+i+'" data-delta="-1" aria-label="'+t('Remove one ','減少一個 ')+m+' · '+side+'" '+(solved||counts[i]===1?'disabled':'')+'>−</button><output aria-label="'+t('Number of molecules','分子數目')+'">'+counts[i]+'</output><button data-index="'+i+'" data-delta="1" aria-label="'+t('Add one ','增加一個 ')+m+' · '+side+'" '+(solved||counts[i]===6?'disabled':'')+'>+</button></div></div>';}).join('');
byId('equation').innerHTML=q.terms.map((m,i)=>(i?(i===q.split?' → ':' + '):'')+counts[i]+' '+formula(m)).join('');
byId('ledger').innerHTML='<thead><tr><th>'+t('Atom','原子')+'</th><th>'+t('Before','反應前')+'</th><th>'+t('After','反應後')+'</th></tr></thead><tbody>'+Object.keys(a).map(e=>'<tr class="'+(a[e]===b[e]?'matched':'')+'"><th scope="row">'+e+' · '+t(...names[e])+'</th><td>'+a[e]+'</td><td>'+b[e]+(a[e]===b[e]?' ✓':' ≠')+'</td></tr>').join('')+'</tbody>';
byId('feedback').textContent=solved?t('Every atom is accounted for. The tablet shines!','每種原子都數目相等，石板亮起來了！'):checked?(balanced()?t('Balanced! Now reduce all counts to the smallest whole-number ratio.','已配平！現在把數目縮減至最簡整數比。'):t('The atom counts differ. Adjust whole molecules and compare again.','原子數目不同。調整整個分子的數量，再比較一次。')):'';
const clues=[t('The small diagram shows the atoms in ONE molecule. Your counter tells how many copies you have.','小圖顯示一個分子內的原子；計數器表示有多少個這樣的分子。'),t('Match each kind of atom before and after. Change molecule counts, never the small numbers in the formulas.','讓每種原子在反應前後數目相同。改變分子數量，不要改化學式中的小數字。'),t('Try molecule counts in this order: ','試試依次把分子數量設為：')+q.answer.join(' · ')];
byId('hints').innerHTML=clues.slice(0,hintDepth).map(x=>'<li>'+x+'</li>').join('');byId('clues').hidden=!cluesOpen;byId('hint').setAttribute('aria-expanded',String(cluesOpen));byId('hint').setAttribute('aria-label',t('Reveal the next clue','顯示下一個提示'));byId('hint').hidden=byId('check').hidden=solved;byId('clear').disabled=solved;byId('next').hidden=!solved||complete;byId('reward').hidden=!complete;byId('retrySave').hidden=!saveFailed;byId('saved').textContent=saveFailed?t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。'):t('Conservation Sigil saved.','已儲存守恆符印。');}
byId('board').onclick=e=>{const b=e.target.closest('button[data-index]');if(!b)return;const i=Number(b.dataset.index),delta=Number(b.dataset.delta);change(i,delta);const same=byId('board').querySelector('[data-index="'+i+'"][data-delta="'+delta+'"]');(same.disabled?byId('board').querySelector('[data-index="'+i+'"][data-delta="'+(-delta)+'"]'):same).focus();};
byId('clear').onclick=()=>{if(solved)return;counts=[1,1,1];checked=false;render();};
byId('check').onclick=()=>{if(solved)return;checked=true;solved=correct();if(solved)cluesOpen=false;if(solved&&stage===2)saveFailed=!OrionProgress.earn('conservation');render();if(solved&&stage<2)byId('next').focus();};
byId('next').onclick=()=>{if(!solved||stage>=2)return;stage++;resetPanel();byId('board').querySelector('[data-delta="1"]').focus();};
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('conservation');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('reactions',variant);
  savedVariant = OrionProgress.variant('reactions');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('reactions');
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
