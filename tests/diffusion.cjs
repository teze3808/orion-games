const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const els=new Map(),storage=new Map(),events={};let blocked=false;
function el(id){if(!els.has(id))els.set(id,{classList:{toggle(){}},setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}},querySelector(){return{focus(){}}}});return els.get(id)}
const c={document:{getElementById:el},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},addEventListener:(k,f)=>events[k]=f,OrionI18n:{t:a=>a,apply(){}}};c.window=c;vm.createContext(c);
for(const f of ['dist/shared/progress.js','dist/games/orion-diffusion/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const run=s=>vm.runInContext(s,c);

for(let v=0;v<6;v++){const kinds=new Set();for(let st=0;st<3;st++){
 run(`variant=${v};stage=${st};resetPanel()`);const [l,r]=run('sample()'),[a,b]=run('transfers()'),[x,y]=run('result()');assert.equal(x+y,l+r);assert.equal(x-y,(l-r)/2);assert(a>0&&b>0);assert.equal(x,l-a+b);assert.equal(y,r-b+a);const expected=a>b?'right':a<b?'left':'equal';kinds.add(expected);
 for(const c of ['right','left','equal',''])for(const obs of [false,true]){run(`solved=false;choice='${c}';observed=${obs}`);el('check').onclick();assert.equal(run('solved'),obs&&c===expected);}
}assert.equal(kinds.size,3);}
run('stage=0;variant=0;resetPanel();select("invalid")');assert.equal(run('choice'),'');el('observe').onclick();assert.equal(run('observed'),true);el('observe').onclick();assert.equal(run('observed'),true);el('retry').onclick();assert.equal(run('observed'),false);
assert.equal(el('clues').hidden,true);el('hint').onclick();el('hint').onclick();assert.equal(run('hintDepth'),2);el('close').onclick();assert.equal(el('clues').hidden,true);
run('OrionProgress.reset();stage=0;variant=0;resetPanel()');
for(let st=0;st<3;st++){run('select(answer())');el('check').onclick();assert.equal(run('solved'),false);el('observe').onclick();el('check').onclick();if(st<2){assert.equal(run("OrionProgress.has('exchange')"),false);el('next').onclick();}}
assert.equal(run("OrionProgress.has('exchange')"),true);el('check').onclick();assert.equal(run("OrionProgress.read().sigils.filter(x=>x==='exchange').length"),1);
blocked=true;el('retrySave').onclick();assert.equal(run('saveFailed'),true);blocked=false;el('retrySave').onclick();assert.equal(run('saveFailed'),false);
const before=run('variant');el('replay').onclick();assert.notEqual(run('variant'),before);assert.equal(run("OrionProgress.has('exchange')"),true);
console.log('PASS 144 evidence/classification combinations, conservation, gradient halving, nonzero equilibrium exchange, trial reset, hints, rewards, replay and save recovery.');
