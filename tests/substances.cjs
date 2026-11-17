const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements=new Map(),storage=new Map(),events={};
function element(id){if(!elements.has(id))elements.set(id,{classList:{toggle(){}},setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}},querySelectorAll(){return[]},querySelector(){return{focus(){}}}});return elements.get(id)}
const c={document:{getElementById:element},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},addEventListener:(k,f)=>events[k]=f,OrionI18n:{t:a=>a,apply(){}}};c.window=c;vm.createContext(c);
for(const f of ['dist/shared/progress.js','dist/games/orion-substances/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const run=s=>vm.runInContext(s,c);
for(let v=0;v<6;v++){
 const kinds=[];
 for(let stage=0;stage<3;stage++){
 run(`variant=${v};stage=${stage};resetPanel()`);
 const molecules=run('sample().molecules');
 const expected=new Set(molecules).size>1?'mixture':new Set(molecules[0]).size>1?'compound':'element';kinds.push(expected);
 for(const answer of ['', 'element','compound','mixture']){
 run('resetPanel();choice='+JSON.stringify(answer));element('check').onclick();assert.equal(run('solved'),answer===expected);
 }
 }
 assert.equal(new Set(kinds).size,3);
}
run('variant=0;stage=0;resetPanel()');assert.equal(element('clues').hidden,true);
element('hint').onclick();element('hint').onclick();assert.equal(run('hintDepth'),2);element('close').onclick();assert.equal(element('clues').hidden,true);
run("OrionProgress.reset();variant=0;stage=0;resetPanel()");
for(let s=0;s<3;s++){run("choice=sample().kind");element('check').onclick();if(s<2){assert.equal(run("OrionProgress.has('essence')"),false);element('next').onclick();}}
assert.equal(run("OrionProgress.has('essence')"),true);element('check').onclick();assert.equal(run("OrionProgress.read().sigils.filter(x=>x==='essence').length"),1);
c.localStorage.setItem=()=>{throw Error('blocked')};run('saveFailed=false');element('retrySave').onclick();assert.equal(run('saveFailed'),true);
console.log('PASS all 18 samples, every classification, hidden clues, three-stage reward, duplicate reward and save failure.');
