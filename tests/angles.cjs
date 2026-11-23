const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const els=new Map(),storage=new Map(),events={};let blocked=false;
function el(id){if(!els.has(id))els.set(id,{classList:{toggle(){}},setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}},querySelector(){return{focus(){}}}});return els.get(id)}
const c={document:{getElementById:el},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},addEventListener:(k,f)=>events[k]=f,OrionI18n:{t:a=>a,apply(){}}};c.window=c;vm.createContext(c);
for(const f of ['dist/shared/progress.js','dist/games/orion-angles/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const run=s=>vm.runInContext(s,c);

function degrees(p,a,b){const u=a.map((v,i)=>v-p[i]),v=b.map((x,i)=>x-p[i]);return Math.acos(u.reduce((s,x,i)=>s+x*v[i],0)/Math.hypot(...u)/Math.hypot(...v))*180/Math.PI;}
for(let v=0;v<6;v++)for(let st=0;st<3;st++){
 run(`variant=${v};stage=${st};resetPanel()`);const q=run('challenge()'),p=run('geometry()');
 assert(Math.abs(degrees(p[0],p[1],p[2])-q.a)<1e-8);assert(Math.abs(degrees(p[1],p[0],p[2])-q.b)<1e-8);const target=Math.round(degrees(p[2],p[0],p[1]));
 for(let n=5;n<=170;n+=5){run('solved=false');run(`setAngle(${n})`);el('check').onclick();assert.equal(run('solved'),n===target);}
}
run('stage=0;variant=0;resetPanel()');for(const bad of [-5,0,7,175,NaN])run(`setAngle(${bad})`);assert.equal(run('angle'),5);el('more').onclick();assert.equal(run('angle'),10);el('less').onclick();assert.equal(run('angle'),5);
assert.equal(el('clues').hidden,true);el('hint').onclick();el('hint').onclick();assert.equal(run('hintDepth'),2);el('close').onclick();assert.equal(el('clues').hidden,true);
run('OrionProgress.reset();stage=0;variant=0;resetPanel()');
for(let st=0;st<3;st++){el('check').onclick();assert.equal(run('solved'),false);run('setAngle(challenge().c)');el('check').onclick();if(st<2){assert.equal(run("OrionProgress.has('starcorner')"),false);el('next').onclick();}}
assert.equal(run("OrionProgress.has('starcorner')"),true);el('check').onclick();assert.equal(run("OrionProgress.read().sigils.filter(x=>x==='starcorner').length"),1);
blocked=true;el('retrySave').onclick();assert.equal(run('saveFailed'),true);blocked=false;el('retrySave').onclick();assert.equal(run('saveFailed'),false);
const before=run('variant');el('replay').onclick();assert.notEqual(run('variant'),before);assert.equal(run("OrionProgress.has('starcorner')"),true);
console.log('PASS 612 angle attempts, independent vector geometry, controls and bounds, hidden hints, three-stage rewards, replay and save recovery.');
