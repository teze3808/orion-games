const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const els=new Map(),storage=new Map(),events={};let blocked=false;
function el(id){if(!els.has(id))els.set(id,{classList:{toggle(){}},setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}},querySelector(){return{focus(){}}}});return els.get(id)}
const c={document:{getElementById:el},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},addEventListener:(k,f)=>events[k]=f,OrionI18n:{t:a=>a,apply(){}}};c.window=c;vm.createContext(c);
for(const f of ['dist/shared/progress.js','dist/games/orion-speed/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const run=s=>vm.runInContext(s,c);


let attempts=0;const signatures=new Set();
for(let v=0;v<6;v++){let signature=[];for(let st=0;st<3;st++){
 run(`variant=${v};stage=${st};resetPanel()`);const q=run('challenge()');signature.push(q.legs);
 // Independent per-second odometer: accumulate each segment's own speed.
 let distance=0,seconds=0;for(const [d,t] of q.legs)for(let i=0;i<t;i++){distance+=d/t;seconds++;}
 const expected=distance/seconds;assert.equal(q.distance,distance);assert.equal(q.time,seconds);assert(Number.isInteger(expected));
 if(st===1){const naive=q.legs.reduce((s,[d,t])=>s+d/t,0)/2;assert.notEqual(expected,naive);}
 if(st===2){assert.equal(q.legs[1][0],0);assert(expected<q.legs[0][0]/q.legs[0][1]);}
 for(let n=1;n<=30;n++){run('solved=false');run(`setSpeed(${n})`);el('check').onclick();assert.equal(run('solved'),n===expected);attempts++;}
}signatures.add(JSON.stringify(signature));}assert.equal(signatures.size,6);
run('stage=0;variant=0;resetPanel()');for(const bad of [-1,0,1.5,31,NaN])run(`setSpeed(${bad})`);assert.equal(run('speed'),1);el('more').onclick();assert.equal(run('speed'),2);el('less').onclick();assert.equal(run('speed'),1);
assert.equal(el('clues').hidden,true);el('hint').onclick();el('hint').onclick();assert.equal(run('hintDepth'),2);el('close').onclick();assert.equal(el('clues').hidden,true);run('setSpeed(8)');el('reset').onclick();assert.equal(run('speed'),1);
run('OrionProgress.reset();stage=0;variant=0;resetPanel()');
for(let st=0;st<3;st++){el('check').onclick();assert.equal(run('solved'),false);run('setSpeed(challenge().distance/challenge().time)');el('check').onclick();if(st<2){assert.equal(run("OrionProgress.has('starwind')"),false);el('next').onclick();}}
assert.equal(run("OrionProgress.has('starwind')"),true);el('check').onclick();assert.equal(run("OrionProgress.read().sigils.filter(x=>x==='starwind').length"),1);
blocked=true;el('retrySave').onclick();assert.equal(run('saveFailed'),true);blocked=false;el('retrySave').onclick();assert.equal(run('saveFailed'),false);
const before=run('variant');el('replay').onclick();assert.notEqual(run('variant'),before);assert.equal(run("OrionProgress.has('starwind')"),true);
console.log(`PASS ${attempts} speed attempts, per-second odometer oracle, unequal durations and stops, six journeys, controls, hints, three-stage rewards, replay and save recovery.`);
