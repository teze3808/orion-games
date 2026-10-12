const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
function setup(lang='en',saved,blocked=false){const e={},events={},data={'orion-expedition-language':lang};if(saved)data['orion-expedition-progress-v1']=saved;const el=()=>({textContent:'',innerHTML:'',hidden:false,disabled:false,value:0,open:false,style:{},classList:{toggle(){}},setAttribute(){},addEventListener(){},focus(){}});const c={navigator:{language:lang},Event:class{constructor(type){this.type=type}},document:{body:{},documentElement:{},getElementById:id=>e[id]??=el(),querySelectorAll:()=>[]},localStorage:{getItem:k=>data[k]??null,setItem(k,v){if(blocked)throw Error('blocked');data[k]=v}},addEventListener:(k,f)=>(events[k]??=[]).push(f),dispatchEvent:x=>(events[x.type]??[]).forEach(f=>f(x))};c.window=c;vm.createContext(c);for(const f of ['shared/i18n.js','shared/progress.js','games/orion-solutions/game.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),c);return{c,e,data,run:s=>vm.runInContext(s,c)};}
function solve(h){
 while(h.run('water')<=h.run('total')/2)h.c.addWater();h.c.check();assert(h.run('solved'));h.e.next.onclick();
 while(h.run('total')<=h.run('water')*2)h.c.addCrystal();h.c.check();assert(h.run('solved'));assert(!h.c.OrionProgress.has('clarity'));h.e.next.onclick();
 const w=h.run('water');h.c.addWater();assert.equal(h.run('water'),w);h.c.check();assert(h.run('sawResidue'));while(h.run('water')<h.run('total')/2)h.c.addWater();h.c.check();assert(h.run('solved'));
}
for(const lang of ['en','zh-Hant'])for(let v=0;v<6;v++){
 const h=setup(lang,JSON.stringify({version:1,sigils:['future'],variants:{solutions:v}}));assert(h.e.hints.hidden&&h.e.reward.hidden);
 const total=h.run('total');h.c.addCrystal();assert.equal(h.run('total'),total);h.c.check();assert(!h.run('solved'));h.e.hint.onclick();h.c.OrionI18n.set(lang==='en'?'zh-Hant':'en');assert(!h.e.hints.hidden);assert.equal(h.run('total'),total);h.e.retry.onclick();assert(h.e.hints.hidden);solve(h);
 assert(h.c.OrionProgress.has('clarity')&&h.c.OrionProgress.has('future'));h.c.check();assert.equal(h.c.OrionProgress.read().sigils.length,2);assert(setup(lang,h.data['orion-expedition-progress-v1']).c.OrionProgress.has('clarity'));
 h.e.replay.onclick();assert.notEqual(h.run('variant'),v);assert(h.c.OrionProgress.has('clarity'));const old=h.run('variant');assert.equal(setup(lang,h.data['orion-expedition-progress-v1']).run('variant'),old);h.c.OrionProgress.reset();h.c.syncProgress();assert.notEqual(h.run('variant'),old);assert(!h.c.OrionProgress.has('clarity'));
}
const journeys=new Set();for(let v=0;v<6;v++){const h=setup();journeys.add([0,1,2].map(s=>h.c.initial(v,s).join('/')).join());}assert.equal(journeys.size,6);
let cases=0;const h=setup();for(let w=1;w<=6;w++)for(let n=1;n<=16;n++)for(let s=0;s<2;s++){
 h.run(`stage=${s};water=${w};total=${n};dissolved=0;solved=false`);h.c.check();const expected=n<=w*2?n:w*2;assert.equal(h.run('dissolved'),expected);assert.equal(h.run('total-dissolved'),n-expected);assert.equal(h.run('solved'),s===0?n<w*2:n>w*2);cases++;
}
h.run('stage=2');h.c.resetTrial();h.c.check();const d=h.run('dissolved');h.c.addWater();assert.equal(h.run('dissolved'),d);assert(!h.run('observed'));h.e.retry.onclick();assert(!h.run('sawResidue'));
const b=setup('en',null,true);solve(b);assert(b.run('saveFailed'));assert.match(b.e.saveStatus.textContent,/failed/);b.c.localStorage.setItem=(k,v)=>b.data[k]=v;b.e.retrySave.onclick();assert(!b.run('saveFailed'));assert(setup('en',b.data['orion-expedition-progress-v1']).c.OrionProgress.has('clarity'));assert.equal(setup('en','broken').run('variant'),0);
console.log(`PASS solutions: ${cases} saturation/conservation cases, six journeys, mandatory observations, both languages, replay/reset/persistence and failed-save recovery.`);
