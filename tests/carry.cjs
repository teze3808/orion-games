const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const els=new Map(),storage=new Map(),events={};let blocked=false;
function el(id){if(!els.has(id))els.set(id,{classList:{toggle(){}},setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}},querySelector(){return{focus(){}}}});return els.get(id)}
const c={document:{getElementById:el},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},addEventListener:(k,f)=>events[k]=f,OrionI18n:{t:a=>a,apply(){}}};c.window=c;vm.createContext(c);
for(const f of ['dist/shared/progress.js','dist/games/orion-carry/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const run=s=>vm.runInContext(s,c);
for(let v=0;v<6;v++)for(let stage=0;stage<3;stage++){
 run(`variant=${v};stage=${stage};resetPanel()`);const [a,b]=run('puzzle()');
 const expectedSum=(a+b).toString(2).padStart(4,'0').split('').map(Number);
 const expectedCarry=[8,4,2].map(w=>Math.floor(((a%w)+(b%w))/w));
 assert.deepEqual(Array.from(run('solution().sum')),expectedSum);assert.deepEqual(Array.from(run('solution().carries')),expectedCarry);
 assert(stage===0?expectedCarry.reduce((a,b)=>a+b)===0:stage===1?expectedCarry.reduce((a,b)=>a+b)===1:expectedCarry.reduce((a,b)=>a+b)>=2);
 for(let mask=0;mask<2187;mask++){let n=mask;c.entry=Array.from({length:7},()=>{const v=[null,0,1][n%3];n=Math.floor(n/3);return v});run('sum=entry.slice(0,4);carries=entry.slice(4)');assert.equal(run('correct()'),c.entry.every((v,i)=>v===[...expectedSum,...expectedCarry][i]));}
}
run('variant=0;stage=0;resetPanel();cycle("sum",-1);cycle("carries",3);cycle("bad",0)');assert.equal(run('sum.every(v=>v===null)&&carries.every(v=>v===null)'),true);
run('cycle("sum",0)');assert.equal(run('sum[0]'),0);run('cycle("sum",0)');assert.equal(run('sum[0]'),1);el('clear').onclick();assert.equal(run('sum[0]'),null);
assert.equal(el('clues').hidden,true);el('hint').onclick();el('hint').onclick();assert.equal(run('hintDepth'),2);el('close').onclick();assert.equal(el('clues').hidden,true);
run("OrionProgress.reset();stage=0;resetPanel()");
for(let s=0;s<3;s++){el('check').onclick();assert.equal(run('solved'),false);run('sum=solution().sum;carries=solution().carries');el('check').onclick();if(s<2){assert.equal(run("OrionProgress.has('carrylight')"),false);el('next').onclick();}}
assert.equal(run("OrionProgress.has('carrylight')"),true);el('check').onclick();assert.equal(run("OrionProgress.read().sigils.filter(x=>x==='carrylight').length"),1);
blocked=true;el('retrySave').onclick();assert.equal(run('saveFailed'),true);blocked=false;el('retrySave').onclick();assert.equal(run('saveFailed'),false);
const before=run('variant');el('replay').onclick();assert.notEqual(run('variant'),before);assert.equal(run("OrionProgress.has('carrylight')"),true);
console.log('PASS 39366 complete/incomplete boards, independent integer-sum and carry oracle, progression, cycling/clear/guards, hints, all-stage rewards, replay and save recovery.');
