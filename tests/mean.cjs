const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const els=new Map(),storage=new Map(),events={};let blocked=false;
function el(id){if(!els.has(id))els.set(id,{classList:{toggle(){}},setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}},querySelector(){return{focus(){}}}});return els.get(id)}
const c={document:{getElementById:el},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},addEventListener:(k,f)=>events[k]=f,OrionI18n:{t:a=>a,apply(){}}};c.window=c;vm.createContext(c);
for(const f of ['dist/shared/progress.js','dist/games/orion-mean/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const run=s=>vm.runInContext(s,c);


let transfers=0;for(let v=0;v<6;v++)for(let st=0;st<3;st++){
 run(`variant=${v};stage=${st};resetPanel()`);const initial=Array.from(run('bowls')),total=initial.reduce((a,b)=>a+b,0),target=total/initial.length;
 assert(Number.isInteger(target));assert.equal(run('matches()'),false);
 for(let a=0;a<initial.length;a++)for(let b=0;b<initial.length;b++){
 run('resetPanel()');run(`choose(${a});choose(${b})`);const after=Array.from(run('bowls'));assert.equal(after.reduce((a,b)=>a+b,0),total);assert(after.every(x=>x>=0));
 if(a!==b&&initial[a]>0){assert.equal(after[a],initial[a]-1);assert.equal(after[b],initial[b]+1);}else assert.deepEqual(after,initial);transfers++;
 }
 run('resetPanel()');let guard=100;while(!run('matches()')&&guard--){const values=Array.from(run('bowls'));const from=values.findIndex(x=>x>target),to=values.findIndex(x=>x<target);assert(from>=0&&to>=0);run(`choose(${from});choose(${to})`);}
 assert(guard>0);el('check').onclick();assert.equal(run('solved'),true);const final=run('JSON.stringify(bowls)');run('choose(0);choose(1)');assert.equal(run('JSON.stringify(bowls)'),final);
 run('solved=false;bowls[0]++');assert.equal(run('matches()'),false);run('bowls=bowls.map(()=>1)');assert.equal(run('matches()'),false,'equal counts must also conserve pearls');
}
run('stage=0;variant=0;resetPanel()');const before=run('JSON.stringify(bowls)');for(const n of [-1,99,NaN,1.5])run(`choose(${n})`);assert.equal(run('JSON.stringify(bowls)'),before);run('choose(0);choose(0)');assert.equal(run('selected'),null);
assert.equal(el('clues').hidden,true);el('hint').onclick();el('hint').onclick();assert.equal(run('hintDepth'),2);el('close').onclick();assert.equal(el('clues').hidden,true);
run('OrionProgress.reset();stage=0;variant=0;resetPanel()');
for(let st=0;st<3;st++){el('check').onclick();assert.equal(run('solved'),false);let target=run('challenge().reduce((a,b)=>a+b,0)/bowls.length');while(!run('matches()')){let b=Array.from(run('bowls'));run(`choose(${b.findIndex(x=>x>target)});choose(${b.findIndex(x=>x<target)})`);}el('check').onclick();if(st<2){assert.equal(run("OrionProgress.has('pearlheart')"),false);el('next').onclick();}}
assert.equal(run("OrionProgress.has('pearlheart')"),true);el('check').onclick();assert.equal(run("OrionProgress.read().sigils.filter(x=>x==='pearlheart').length"),1);
blocked=true;el('retrySave').onclick();assert.equal(run('saveFailed'),true);blocked=false;el('retrySave').onclick();assert.equal(run('saveFailed'),false);
const v=run('variant');el('replay').onclick();assert.notEqual(run('variant'),v);assert.equal(run("OrionProgress.has('pearlheart')"),true);
console.log(`PASS ${transfers} transfer pairs, conservation and nonnegativity, 18 solvable trays, empty bowls, guards, hints, all-stage rewards, replay and save recovery.`);
