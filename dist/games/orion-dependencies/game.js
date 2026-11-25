 'use strict';
const byId=id=>document.getElementById(id),t=OrionI18n.t;
const runes=[['Sun','日','☀'],['Moon','月','☾'],['Leaf','葉','❧'],['Wave','浪','≈'],['Star','星','✦']];
const permutations=[[0,1,2,3,4],[1,3,0,4,2],[2,0,4,1,3],[3,4,1,2,0],[4,2,3,0,1],[2,4,0,3,1]];
const graphs=[[[0,1],[1,2],[2,3]],[[0,1],[0,2],[1,3],[2,3]],[[0,2],[1,2],[2,3],[2,4]]];
let variant=OrionProgress.variant('dependencies'),savedVariant=variant,savedTarget=OrionProgress.read().hashTarget;
let stage=0,order=[],selected=-1,hintDepth=0,solved=false,cluesOpen=false,saveFailed=false,checked=false;
function puzzle(){const nodes=permutations[variant].slice(0,stage===2?5:4);return {nodes,edges:graphs[stage].map(([a,b])=>[nodes[a],nodes[b]])};}
function name(i){return t(runes[i][0],runes[i][1]);}
function violation(){return puzzle().edges.find(([a,b])=>order.indexOf(a)>order.indexOf(b));}
function correct(){const q=puzzle();return order.length===q.nodes.length&&new Set(order).size===order.length&&order.every(n=>q.nodes.includes(n))&&!violation();}
function resetPanel(){order=[...puzzle().nodes].reverse();selected=-1;hintDepth=0;solved=cluesOpen=saveFailed=checked=false;render();}
function pick(i){if(solved||!Number.isInteger(i)||i<0||i>=order.length)return;if(selected===i)selected=-1;else if(selected<0)selected=i;else{[order[selected],order[i]]=[order[i],order[selected]];selected=-1;}checked=false;render();}
function render(){const q=puzzle(),complete=solved&&stage===2,bad=violation();window.OrionDiscovery?.update(complete);document.title=t('The Clockwork Assembly Dock · Orion','機巧裝配碼頭 · Orion');byId('progress').textContent=t('Plans restored','已修復計劃')+' · '+(stage+Number(solved))+' / 3';byId('progress').parentElement.classList.toggle('complete',complete);byId('stageTitle').textContent=t('Plan ','計劃 ')+(stage+1);
byId('order').innerHTML=order.map((n,i)=>'<button data-index="'+i+'" data-rune="'+n+'" aria-pressed="'+(selected===i)+'" aria-label="'+t('Position ','位置 ')+(i+1)+' · '+name(n)+'" '+(solved?'disabled':'')+'><small>'+(i+1)+'</small><b aria-hidden="true">'+runes[n][2]+'</b><span>'+name(n)+'</span></button>').join('');
byId('rules').innerHTML=q.edges.map(([a,b])=>'<li data-from="'+a+'" data-to="'+b+'"><span>'+runes[a][2]+' '+name(a)+'</span><b aria-hidden="true"> → </b><span class="sr-only">'+t(' must come before ',' 必須先於 ')+'</span><span>'+runes[b][2]+' '+name(b)+'</span></li>').join('');
byId('selection').textContent=selected<0?t('Tap two tiles to swap them. Read the order from left to right.','點兩塊符文交換位置，由左至右讀取次序。'):t('Now choose the tile to swap with ','現在選擇要與「')+name(order[selected])+t('. Tap it again to cancel.','」交換的符文。再點同一塊可取消。');
byId('feedback').textContent=solved?t('Every prerequisite comes first. This plan works!','每項先決步驟都在前面，計劃可行！'):checked&&bad?name(bad[0])+t(' must come before ',' 必須先於 ')+name(bad[1])+t('. Try swapping two tiles.','。試試交換兩塊符文。'):'';
const clues=[t('An arrow A → B means A must appear earlier than B. They do not need to be next to each other.','箭頭 A → B 表示 A 必須比 B 早，不必緊接在一起。'),t('Start with a rune that has no unfinished prerequisites. Unconnected tasks may allow different orders.','先選沒有未完成先決步驟的符文。沒有先後限制的步驟可能容許不同次序。'),t('One valid order is: ','其中一個可行次序是：')+q.nodes.map(name).join(' → ')];byId('hints').innerHTML=clues.slice(0,hintDepth).map(x=>'<li>'+x+'</li>').join('');byId('clues').hidden=!cluesOpen;byId('hint').setAttribute('aria-expanded',String(cluesOpen));byId('hint').setAttribute('aria-label',t('Reveal the next clue','顯示下一個提示'));byId('hint').hidden=byId('check').hidden=solved;byId('retry').disabled=solved;byId('next').hidden=!solved||complete;byId('reward').hidden=!complete;byId('retrySave').hidden=!saveFailed;byId('saved').textContent=saveFailed?t('You earned the sigil. Try saving again.','已獲得符印，請再試儲存。'):t('Sequencecraft Sigil saved.','已儲存序巧符印。');}
byId('order').onclick=e=>{const b=e.target.closest('button[data-index]');if(!b)return;const i=Number(b.dataset.index);pick(i);byId('order').querySelectorAll('button')[i]?.focus();};byId('retry').onclick=()=>{if(!solved)resetPanel();};
byId('check').onclick=()=>{if(solved)return;checked=true;solved=correct();if(solved){cluesOpen=false;selected=-1;}if(solved&&stage===2)saveFailed=!OrionProgress.earn('sequencecraft');render();if(solved&&stage<2)byId('next').focus();};
byId('next').onclick=()=>{if(!solved||stage>=2)return;stage++;resetPanel();byId('order').querySelector('button').focus();};
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
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('sequencecraft');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('dependencies',variant);
  savedVariant = OrionProgress.variant('dependencies');
  stage = 0;
  resetPanel();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('dependencies');
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
