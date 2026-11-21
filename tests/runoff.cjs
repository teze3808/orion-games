const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const els=new Map(),storage=new Map(),events={};let blocked=false;
function el(id){if(!els.has(id))els.set(id,{classList:{toggle(){}},setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}},querySelector(){return{focus(){}}}});return els.get(id)}
const c={document:{getElementById:el},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},addEventListener:(k,f)=>events[k]=f,OrionI18n:{t:a=>a,apply(){}}};c.window=c;vm.createContext(c);
for(const f of ['dist/shared/progress.js','dist/games/orion-runoff/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const run=s=>vm.runInContext(s,c);

function path(h,start=0){const q=[[start]];while(q.length){const p=q.shift(),a=p.at(-1);if(a===8)return p;for(const b of [a-3,a+3,a-1,a+1])if(b>=0&&b<9&&(Math.floor(a/3)===Math.floor(b/3)||a%3===b%3)&&h[b]<h[a])q.push([...p,b]);}return null;}
for(let v=0;v<6;v++)for(let st=0;st<3;st++){
 run(`variant=${v};stage=${st};resetPanel()`);const h=Array.from(run('heights()'));assert(path(h));
 for(let a=0;a<9;a++)for(let b=-1;b<=9;b++){const expect=b>=0&&b<9&&((a%3===b%3&&Math.abs(a-b)===3)||(Math.floor(a/3)===Math.floor(b/3)&&Math.abs(a-b)===1))&&h[b]<h[a];assert.equal(run(`legal(${a},${b})`),expect);run(`route=[${a}];solved=false;move(${b})`);assert.equal(run('route.length'),expect?2:1);}
}
run('stage=0;variant=0;resetPanel();move(3);move(6);move(7)');assert.equal(run('notice'),'pool');el('undo').onclick();assert.equal(run('route.at(-1)'),6);el('clear').onclick();assert.equal(run('route.length'),1);
assert.equal(el('clues').hidden,true);el('hint').onclick();el('hint').onclick();assert.equal(run('hintDepth'),2);el('close').onclick();assert.equal(el('clues').hidden,true);
run('OrionProgress.reset();stage=0;resetPanel()');
for(let s=0;s<3;s++){for(const b of path(Array.from(run('heights()'))).slice(1))run(`move(${b})`);if(s<2){assert.equal(run("OrionProgress.has('flowtrail')"),false);el('next').onclick();}}
assert.equal(run("OrionProgress.has('flowtrail')"),true);run('move(0)');assert.equal(run("OrionProgress.read().sigils.filter(x=>x==='flowtrail').length"),1);
blocked=true;el('retrySave').onclick();assert.equal(run('saveFailed'),true);blocked=false;el('retrySave').onclick();assert.equal(run('saveFailed'),false);
const before=run('variant');el('replay').onclick();assert.notEqual(run('variant'),before);assert.equal(run("OrionProgress.has('flowtrail')"),true);
console.log('PASS exhaustive move validity on all maps, independent route search, dead ends, undo/reset, three-stage award, hints, replay and save recovery.');
