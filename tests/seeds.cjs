const fs = require('fs'), vm = require('vm'), assert = require('node:assert/strict');
function setup(language = 'en', blocked = false, saved) {
  const elements = {}, events = {}, data = {'orion-expedition-language': language};
  if (saved) data['orion-expedition-progress-v1'] = saved;
  const element = () => ({value:'', textContent:'', innerHTML:'', hidden:false, disabled:false, open:false, attrs:{}, listeners:{}, setAttribute(k,v){this.attrs[k]=v;}, addEventListener(k,f){this.listeners[k]=f;}, focus(){}, classList:{toggle(){}}});
  const c = {navigator:{language}, Event:class{constructor(type){this.type=type;}}, localStorage:{getItem:k=>data[k]??null,setItem(k,v){if(blocked)throw Error('blocked');data[k]=v;}}, document:{documentElement:{},getElementById:id=>elements[id]??=element(),querySelectorAll:()=>[]},addEventListener:(k,f)=>(events[k]??=[]).push(f),dispatchEvent:e=>(events[e.type]??[]).forEach(f=>f(e))};
  c.window=c;vm.createContext(c);
  for(const f of ['dist/shared/i18n.js','dist/shared/progress.js','dist/games/orion-seeds/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
  const run=s=>vm.runInContext(s,c);
  return {c,e:elements,data,run};
}
function complete(h){const {c,e,run}=h;c.setWater(run('stages[0].goalWater'));c.choose(run('stages[0].goalWater')===1?'B':'A');c.trial();e.next.onclick();if(run('light')!==run('stages[1].goalLight'))c.toggleLight();c.choose(run('stages[1].goalLight')?'B':'A');c.trial();e.next.onclick();c.setWater(1);if(run('light')===run('stages[2].aLight'))c.toggleLight();c.choose('same');c.trial();}
for(const language of ['en','zh-Hant']){
 const h=setup(language),{c,e,run}=h;
 assert(e.hints.hidden);assert(e.notes.hidden);assert(e.reward.hidden);assert.equal(e.progressBar.value,0);
 c.trial();assert.equal(run('feedback'),'predict');assert.equal(run('result'),null);
 c.choose('same');c.trial();assert.equal(run('feedback'),'adjust');assert.equal(run('result.b'),'waiting');
 c.setWater(2);c.choose('B');c.trial();assert.equal(run('result.b'),'waiting');assert(!run('solved'));
 c.setWater(1);c.choose('A');c.trial();assert.equal(run('feedback'),'prediction');assert(!run('solved'));
 e.hint.onclick();c.OrionI18n.set(language==='en'?'zh-Hant':'en');assert.equal(run('water'),1);assert.equal(run('hintDepth'),1);assert.equal(run('prediction'),'A');assert.equal(run('result.b'),'sprout');
 c.toggleLight();assert.equal(run('light'),false);c.setWater(-1);c.setWater(3);c.setWater(0.5);assert.equal(run('water'),1);
 c.choose('B');c.trial();assert(run('solved'));assert.equal(e.progressBar.value,1);assert(!c.OrionProgress.has('verdant'));
 c.setWater(0);assert.equal(run('water'),1);e.next.onclick();assert.equal(run('stage'),1);assert(e.hints.hidden);assert.equal(run('water'),1);
 c.setWater(2);assert.equal(run('water'),1);c.choose('same');c.trial();assert.equal(run('result.b'),'pale');assert.equal(run('feedback'),'adjust');
 c.toggleLight();c.choose('B');c.trial();assert.equal(run('result.b'),'green');assert.equal(e.progressBar.value,2);e.next.onclick();assert.equal(run('stage'),2);
 c.setWater(1);c.toggleLight();c.choose('same');c.trial();assert.equal(run('feedback'),'fair');assert(!run('solved'));assert(!c.OrionProgress.has('verdant'));
 c.toggleLight();c.choose('B');c.trial();assert.equal(run('feedback'),'prediction');c.choose('same');c.OrionProgress.earn('future');c.trial();assert.equal(e.progressBar.value,3);assert(c.OrionProgress.has('verdant'));assert(c.OrionProgress.has('future'));assert(!e.reward.hidden);assert(!e.notes.hidden);
 c.trial();assert.equal(c.OrionProgress.read().sigils.length,2);assert(setup(language,false,h.data['orion-expedition-progress-v1']).c.OrionProgress.has('verdant'));
 e.replay.onclick();assert(e.hints.hidden);assert(c.OrionProgress.has('verdant'));complete(h);assert(c.OrionProgress.reset());c.dispatchEvent({type:'storage',key:'orion-expedition-progress-v1'});assert.equal(run('stage'),0);assert.equal(e.progressBar.value,0);assert(e.reward.hidden);complete(h);assert(c.OrionProgress.has('verdant'));
}
const matrix=setup();for(const type of ['seed','seedling'])for(const water of [0,1,2])for(const light of [false,true]){const value=matrix.c.outcome(type,water,light);assert.equal(value,water!==1?'waiting':type==='seed'?'sprout':light?'green':'pale');}
const bad=setup();bad.run('water=99');bad.c.choose('B');bad.c.trial();assert.equal(bad.run('feedback'),'invalid');assert(!bad.c.OrionProgress.has('verdant'));
const blocked=setup('en',true);complete(blocked);assert.match(blocked.e.saveStatus.textContent,/could not save/);assert(!blocked.e.retrySave.hidden);blocked.c.localStorage.setItem=(k,v)=>blocked.data[k]=v;blocked.e.retrySave.onclick();assert(blocked.e.retrySave.hidden);assert.match(blocked.e.saveStatus.textContent,/saved/);
const corrupt=setup('zh-Hant',false,'oops');complete(corrupt);assert(corrupt.c.OrionProgress.has('verdant'));
const other=setup();other.c.setWater(2);other.c.OrionProgress.earn('echo');other.c.dispatchEvent({type:'storage',key:'orion-expedition-progress-v1'});assert.equal(other.run('water'),2);other.c.OrionProgress.reset();other.c.dispatchEvent({type:'pageshow'});assert.equal(other.run('water'),other.run('stages[0].startWater'));
console.log('PASS seeds: moisture/light outcomes, prediction gates, fair comparison, locked factors, invalid controls, bilingual trial state and hints, three-seal progress, idempotent rewards, replay/reload/reset, unrelated awards, corrupt/blocked storage and save retry.');
