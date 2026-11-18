const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements=new Map(),storage=new Map(),events={};let blocked=false;
function element(id){if(!elements.has(id))elements.set(id,{classList:{toggle(){}},setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}},querySelectorAll(){return[]},querySelector(){return{focus(){}}}});return elements.get(id)}
const c={document:{getElementById:element},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},addEventListener:(k,f)=>events[k]=f,OrionI18n:{t:a=>a,apply(){}}};c.window=c;vm.createContext(c);
for(const f of ['dist/shared/progress.js','dist/games/orion-rotation/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const run=s=>vm.runInContext(s,c),maps=[[6,3,0,7,4,1,8,5,2],[8,7,6,5,4,3,2,1,0],[2,5,8,1,4,7,0,3,6]];
for(let v=0;v<6;v++)for(let stage=0;stage<3;stage++){
 run(`variant=${v};stage=${stage};resetPanel()`);const original=run('pattern()');
 const expected=maps[stage].map(i=>original[i]);assert.deepEqual(Array.from(run('answer()')),expected);assert.equal(expected.filter(Boolean).length,original.filter(Boolean).length);assert.equal(expected[4],original[4]);
 for(let mask=0;mask<512;mask++){c.candidate=Array.from({length:9},(_,i)=>Boolean(mask&(1<<i)));run('tiles=candidate');assert.equal(run('correct()'),c.candidate.every((v,i)=>v===expected[i]));}
 assert.deepEqual(Array.from(run('rotate(pattern(),4)')),Array.from(original));
}
run('variant=0;stage=0;resetPanel();toggle(-1);toggle(9)');assert.equal(run('tiles.some(Boolean)'),false);
assert.equal(element('clues').hidden,true);element('hint').onclick();element('hint').onclick();assert.equal(run('hintDepth'),2);element('close').onclick();assert.equal(element('clues').hidden,true);
run("OrionProgress.reset();variant=0;stage=0;resetPanel()");
for(let s=0;s<3;s++){element('check').onclick();assert.equal(run('solved'),false);run('tiles=answer()');element('check').onclick();if(s<2){assert.equal(run("OrionProgress.has('turnstone')"),false);element('next').onclick();}}
assert.equal(run("OrionProgress.has('turnstone')"),true);element('check').onclick();assert.equal(run("OrionProgress.read().sigils.filter(x=>x==='turnstone').length"),1);
blocked=true;element('retrySave').onclick();assert.equal(run('saveFailed'),true);blocked=false;element('retrySave').onclick();assert.equal(run('saveFailed'),false);
const before=run('variant');element('replay').onclick();assert.notEqual(run('variant'),before);assert.equal(run("OrionProgress.has('turnstone')"),true);assert.equal(element('clues').hidden,true);
console.log('PASS 9216 tile arrangements, rotation geometry, centre and count invariants, hidden hints, retries, rewards, replay and save recovery.');
