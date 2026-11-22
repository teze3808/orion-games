const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const els=new Map(),storage=new Map(),events={};let blocked=false;
function el(id){if(!els.has(id))els.set(id,{classList:{toggle(){}},setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}},querySelector(){return{focus(){}}}});return els.get(id)}
const c={document:{getElementById:el},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},addEventListener:(k,f)=>events[k]=f,OrionI18n:{t:a=>a,apply(){}}};c.window=c;vm.createContext(c);
for(const f of ['dist/shared/progress.js','dist/games/orion-reactions/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const run=s=>vm.runInContext(s,c);

const answers=[[2,1,2],[1,1,2],[1,3,2],[2,1,2],[2,2,1],[2,2,1]];
function atomCount(formula){return [...formula.matchAll(/([A-Z][a-z]?)(\d*)/g)].reduce((o,m)=>(o[m[1]]=Number(m[2]||1),o),{});}
for(let v=0;v<6;v++)for(let st=0;st<3;st++){
 run(`variant=${v};stage=${st};resetPanel()`);const q=run('puzzle()');
 for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)for(let c=1;c<=6;c++){
 const cs=[a,b,c],tot=[{},{}];q.terms.forEach((f,i)=>{for(const [e,n]of Object.entries(atomCount(f))){const side=i<q.split?0:1;tot[side][e]=(tot[side][e]||0)+n*cs[i];}});
 run(`counts=[${cs}];`);assert.deepEqual(JSON.parse(JSON.stringify(run('totals()'))),tot);assert.equal(run('correct()'),cs.every((n,i)=>n===answers[(v+st)%6][i]));
 }
 run('counts=[0,0,0]');assert.equal(run('correct()'),false);
}
run('stage=0;variant=0;resetPanel();change(-1,1);change(3,1);change(0,2)');assert.equal(run('counts.join()'),'1,1,1');run('change(0,1)');assert.equal(run('counts[0]'),2);el('clear').onclick();assert.equal(run('counts[0]'),1);
assert.equal(el('clues').hidden,true);el('hint').onclick();el('hint').onclick();assert.equal(run('hintDepth'),2);el('close').onclick();assert.equal(el('clues').hidden,true);
run('OrionProgress.reset();stage=0;variant=0;resetPanel()');
for(let st=0;st<3;st++){
 run(`counts=[${answers[st].map(n=>2*n)}]`);el('check').onclick();assert.equal(run('solved'),false);assert.match(el('feedback').textContent,/smallest whole/);
 run(`counts=[${answers[st]}]`);el('check').onclick();if(st<2){assert.equal(run("OrionProgress.has('conservation')"),false);el('next').onclick();}}
assert.equal(run("OrionProgress.has('conservation')"),true);el('check').onclick();assert.equal(run("OrionProgress.read().sigils.filter(x=>x==='conservation').length"),1);
blocked=true;el('retrySave').onclick();assert.equal(run('saveFailed'),true);blocked=false;el('retrySave').onclick();assert.equal(run('saveFailed'),false);
const before=run('variant');el('replay').onclick();assert.notEqual(run('variant'),before);assert.equal(run("OrionProgress.has('conservation')"),true);
console.log('PASS 3888 coefficient combinations, independent formula-based atom counts, minimal ratios, multiples, guards, hints, three-stage reward, replay and save recovery.');
