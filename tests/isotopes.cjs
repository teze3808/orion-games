const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const els=new Map(),storage=new Map(),events={};let blocked=false;
function el(id){if(!els.has(id))els.set(id,{classList:{toggle(){}},setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}},querySelector(){return{focus(){}}}});return els.get(id)}
const c={document:{getElementById:el},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},addEventListener:(k,f)=>events[k]=f,OrionI18n:{t:a=>a,apply(){}}};c.window=c;vm.createContext(c);
for(const f of ['dist/shared/progress.js','dist/games/orion-isotopes/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const run=s=>vm.runInContext(s,c);


const elements={6:'C',7:'N',8:'O',9:'F'};let attempts=0;const journeys=new Set();
for(let v=0;v<6;v++){const journey=[];for(let st=0;st<3;st++){
 run(`variant=${v};stage=${st};resetPanel()`);const q=run('challenge()');journey.push(q);let winners=0;
 for(let i=0;i<q.options.length;i++){run('solved=false;selected=null');const a=q.options[i];const correct=elements[a.p]===elements[q.reference.p]&&(a.p+a.n)!==(q.reference.p+q.reference.n);run(`choose(${i})`);el('check').onclick();assert.equal(run('solved'),correct);winners+=Number(correct);attempts++;}
 assert.equal(winners,1);assert(q.options.some(a=>a.p===q.reference.p&&a.n===q.reference.n));if(st>0)assert(q.options.some(a=>a.p!==q.reference.p&&a.p+a.n===q.reference.p+q.reference.n));
}journeys.add(JSON.stringify(journey));}assert.equal(journeys.size,6);
run('variant=0;stage=0;resetPanel()');el('check').onclick();assert.equal(run('solved'),false);for(const bad of [-1,99,NaN,0.5])run(`choose(${bad})`);assert.equal(run('selected'),null);run('choose(0);choose(0)');assert.equal(run('selected'),null);run('choose(0)');el('reset').onclick();assert.equal(run('selected'),null);
assert.equal(el('clues').hidden,true);el('hint').onclick();el('hint').onclick();assert.equal(run('hintDepth'),2);el('close').onclick();assert.equal(el('clues').hidden,true);
run('OrionProgress.reset();variant=0;stage=0;resetPanel()');
for(let st=0;st<3;st++){const q=run('challenge()'),i=q.options.findIndex(a=>a.p===q.reference.p&&a.n!==q.reference.n);run(`choose(${i})`);el('check').onclick();assert.equal(run('solved'),true);if(st<2){assert.equal(run("OrionProgress.has('kinship')"),false);el('next').onclick();}}
assert.equal(run("OrionProgress.has('kinship')"),true);el('check').onclick();assert.equal(run("OrionProgress.read().sigils.filter(x=>x==='kinship').length"),1);
blocked=true;el('retrySave').onclick();assert.equal(run('saveFailed'),true);blocked=false;el('retrySave').onclick();assert.equal(run('saveFailed'),false);
const before=run('variant');el('replay').onclick();assert.notEqual(run('variant'),before);assert.equal(run("OrionProgress.has('kinship')"),true);
console.log(`PASS ${attempts} atom pairs, independent element/mass-number oracle, identical-isotope and isobar distractors, six journeys, guards, hints, rewards, replay and save recovery.`);
