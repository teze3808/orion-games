const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const els=new Map(),storage=new Map(),events={};let blocked=false;
function el(id){if(!els.has(id))els.set(id,{classList:{toggle(){}},setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}},querySelector(){return{focus(){}}}});return els.get(id)}
const c={document:{getElementById:el},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},addEventListener:(k,f)=>events[k]=f,OrionI18n:{t:a=>a,apply(){}}};c.window=c;vm.createContext(c);
for(const f of ['dist/shared/progress.js','dist/games/orion-dependencies/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const run=s=>vm.runInContext(s,c);

function perms(xs){return xs.length?xs.flatMap((x,i)=>perms(xs.filter((_,j)=>i!==j)).map(p=>[x,...p])):[[]];}
for(let v=0;v<6;v++)for(let st=0;st<3;st++){
 run(`variant=${v};stage=${st};resetPanel()`);const q=run('puzzle()');let wins=0;
 for(const p of perms(Array.from(q.nodes))){const done=new Set();let valid=true;for(const n of p){if(q.edges.some(([a,b])=>b===n&&!done.has(a)))valid=false;done.add(n);}run(`order=[${p}]`);assert.equal(run('correct()'),valid);wins+=Number(valid);}
 assert.equal(wins,[1,2,4][st]);run('order=[0,0,0,0]');assert.equal(run('correct()'),false);
}
run('stage=0;variant=0;resetPanel();pick(-1);pick(99)');assert.equal(run('selected'),-1);run('pick(0);pick(0)');assert.equal(run('selected'),-1);const original=run('order.join()');run('pick(0);pick(1)');assert.notEqual(run('order.join()'),original);el('retry').onclick();assert.equal(run('order.join()'),original);
assert.equal(el('clues').hidden,true);el('hint').onclick();el('hint').onclick();assert.equal(run('hintDepth'),2);el('close').onclick();assert.equal(el('clues').hidden,true);
run('OrionProgress.reset();stage=0;variant=0;resetPanel()');
for(let st=0;st<3;st++){el('check').onclick();assert.equal(run('solved'),false);run('order=[...puzzle().nodes]');el('check').onclick();if(st<2){assert.equal(run("OrionProgress.has('sequencecraft')"),false);el('next').onclick();}}
assert.equal(run("OrionProgress.has('sequencecraft')"),true);el('check').onclick();assert.equal(run("OrionProgress.read().sigils.filter(x=>x==='sequencecraft').length"),1);
blocked=true;el('retrySave').onclick();assert.equal(run('saveFailed'),true);blocked=false;el('retrySave').onclick();assert.equal(run('saveFailed'),false);
const before=run('variant');el('replay').onclick();assert.notEqual(run('variant'),before);assert.equal(run("OrionProgress.has('sequencecraft')"),true);
console.log('PASS all 1008 orderings with independent prerequisite execution, multiple valid solutions, guards, swap/cancel/reset, hints, rewards, replay and save recovery.');
