const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const els=new Map(),storage=new Map(),events={},tasks=new Map();let seq=0,blocked=false;
function el(id){if(!els.has(id))els.set(id,{style:{setProperty(){}},classList:{toggle(){}},setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}}});return els.get(id)}
const c={document:{getElementById:el},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},addEventListener:(k,f)=>events[k]=f,OrionI18n:{t:a=>a,apply(){}},setTimeout:(f,ms)=>{tasks.set(++seq,{f,ms});return seq},clearTimeout:id=>tasks.delete(id)};c.window=c;vm.createContext(c);
for(const f of ['dist/shared/progress.js','dist/games/orion-pendulum/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const run=s=>vm.runInContext(s,c);function finish(){const batch=[...tasks.values()];tasks.clear();batch.forEach(x=>x.f())}
const known=['1.0','1.4','1.7','2.0','2.2','2.5'];
for(let i=1;i<=6;i++)assert.equal(run(`seconds(${i})`),known[i-1]);
assert(Math.abs(run('period(4)/period(1)')-2)<1e-12);
for(let v=0;v<6;v++)for(let stage=0;stage<3;stage++)for(let i=1;i<=6;i++){
 run(`variant=${v};stage=${stage};resetPanel();lengthIndex=${i}`);
 el('check').onclick();assert.equal(run('solved'),false);
 el('measure').onclick();assert.equal(run('running'),true);assert.equal(tasks.size,1);el('measure').onclick();assert.equal(tasks.size,1);
 el('length').oninput({target:{value:7-i}});assert.equal(run('lengthIndex'),i);
 finish();assert.equal(run('measured'),i);el('check').onclick();assert.equal(run('solved'),known[i-1]===known[(v+stage*2+1)%6]);
}
run('stage=0;resetPanel()');for(const value of [0,7,1.5,NaN])el('length').oninput({target:{value}});assert.equal(run('lengthIndex'),1);
el('measure').onclick();const stale=[...tasks.values()][0].f;el('stop').onclick();stale();assert.equal(run('measured'),null);assert.equal(run('running'),false);
el('measure').onclick();events.pagehide();finish();assert.equal(run('measured'),null);
el('measure').onclick();run('resetPanel()');finish();assert.equal(run('measured'),null);
assert.equal(el('clues').hidden,true);el('hint').onclick();el('hint').onclick();assert.equal(run('hintDepth'),2);el('close').onclick();assert.equal(el('clues').hidden,true);
run("OrionProgress.reset();variant=0;stage=0;resetPanel()");
for(let s=0;s<3;s++){run('lengthIndex=targetIndex()');el('measure').onclick();finish();el('check').onclick();if(s<2){assert.equal(run("OrionProgress.has('timekeeper')"),false);el('next').onclick();}}
assert.equal(run("OrionProgress.has('timekeeper')"),true);el('check').onclick();assert.equal(run("OrionProgress.read().sigils.filter(x=>x==='timekeeper').length"),1);
blocked=true;el('retrySave').onclick();assert.equal(run('saveFailed'),true);blocked=false;el('retrySave').onclick();assert.equal(run('saveFailed'),false);
const before=run('variant');el('replay').onclick();assert.notEqual(run('variant'),before);assert.equal(run("OrionProgress.has('timekeeper')"),true);
console.log('PASS 108 measured trials, known periods, square-root scaling, evidence requirement, invalid input, cancellation/stale callbacks, hints, rewards, replay and save recovery.');
