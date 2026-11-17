'use strict';
const byId=id=>document.getElementById(id), t=OrionI18n.t;
const labels={element:['Element','元素'],compound:['Compound','化合物'],mixture:['Mixture','混合物']};
const samples=[
 {kind:'element',molecules:['OO','OO','OO','OO']},
 {kind:'compound',molecules:['HOH','HOH','HOH','HOH']},
 {kind:'mixture',molecules:['OO','OCO','OO','OCO']},
 {kind:'element',molecules:['HH','HH','HH','HH']},
 {kind:'compound',molecules:['OCO','OCO','OCO','OCO']},
 {kind:'mixture',molecules:['HOH','OCO','HOH','OCO']}
];
let variant=OrionProgress.variant('substances'),savedVariant=variant,savedTarget=OrionProgress.read().hashTarget;
let stage=0,choice='',hintDepth=0,solved=false,cluesOpen=false,saveFailed=false,checked=false;
function sample(){return samples[(variant+stage)%6];}
function resetPanel(){choice='';hintDepth=0;solved=cluesOpen=saveFailed=checked=false;render();}
function render(){
 const complete=solved&&stage===2,s=sample();
 window.OrionDiscovery?.update(complete);
 document.title=t('The Molecule Cabinet · Orion','分子秘櫃 · Orion');
 byId('progress').textContent=t('Samples labelled','已標示樣本')+' · '+(stage+Number(solved))+' / 3';
 byId('progress').parentElement.classList.toggle('complete',complete);
 byId('stageTitle').textContent=t('Sample ','樣本 ')+(stage+1);
 byId('instruction').textContent=t('Look through the lens. Which molecules are alike? Which atoms are joined?','透過透鏡看看：哪些分子相同？哪些原子連在一起？');
 byId('particles').innerHTML=s.molecules.map(m=>'<div class="molecule" aria-hidden="true">'+[...m].map(a=>'<span class="atom atom-'+a+'">'+a+'</span>').join('<span class="bond"></span>')+'</div>').join('');
 byId('particles').setAttribute('aria-label',t('Particle model. Separate molecules: ','粒子模型。分開的分子：')+s.molecules.map(m=>[...m].join('–')).join(', '));
 byId('particles').classList.toggle('solved',solved);
 byId('choices').querySelectorAll('button').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.choice===choice));b.disabled=solved;});
 const evidence=s.kind==='element'?t('Only one kind of atom, even though atoms are paired: an element.','雖然原子兩個一組，整份樣本只有一種原子：這是元素。'):s.kind==='compound'?t('One substance, with different kinds of atoms joined in each molecule: a compound.','只有一種物質，每個分子都有不同種類的原子連在一起：這是化合物。'):t('Different substances share the sample. Their molecules remain separate: a mixture.','不同物質共處於樣本內，各自的分子仍然分開：這是混合物。');
 byId('feedback').textContent=solved?t('The label fits! ','標籤正確！ ')+evidence:checked?(choice?t('Look again at the whole sample, not just one atom. Try another label.','再看整份樣本，不要只看一個原子。換個標籤再試試。'):t('Choose a label first.','請先選擇標籤。')):'';
 const clues=[t('An element has only one kind of atom. A compound joins different kinds of atoms in one pure substance. A mixture contains more than one substance.','元素只有一種原子。化合物是不同種類原子結合成的純物質。混合物含有不止一種物質。'),evidence,t('Choose: ','選擇：')+t(...labels[s.kind])];
  byId('hints').innerHTML = clues.slice(0,hintDepth).map(clue=>'<li>'+clue+'</li>').join('');
  byId('hint').setAttribute('aria-expanded', String(cluesOpen));
  byId('hint').setAttribute('aria-label', t('Reveal the next clue','顯示下一個提示'));
  byId('clues').hidden = !cluesOpen;
  byId('hint').hidden = byId('check').hidden = solved;
  byId('next').hidden = !solved || complete;
  byId('reward').hidden = !complete;
  byId('retrySave').hidden = !saveFailed;
  byId('saved').textContent = saveFailed ? t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。') : t('Essence Sigil saved.','已儲存本質符印。');
}



byId('choices').onclick=e=>{const b=e.target.closest('button[data-choice]');if(!b||solved)return;choice=b.dataset.choice;checked=false;render();};
byId('check').onclick=()=>{if(solved)return;checked=true;solved=choice===sample().kind;if(solved)cluesOpen=false;if(solved&&stage===2)saveFailed=!OrionProgress.earn('essence');render();if(solved&&stage<2)byId('next').focus();};
byId('next').onclick=()=>{if(!solved||stage>=2)return;stage++;resetPanel();byId('choices').querySelector('button').focus();};
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('essence');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('substances',variant);
  savedVariant = OrionProgress.variant('substances');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('substances');
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
