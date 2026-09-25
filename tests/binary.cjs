const fs = require('fs'), vm = require('vm'), assert = require('node:assert/strict');
function setup(language = 'en', blocked = false, saved) {
  const elements = {}, events = {}, data = {'orion-expedition-language': language};
  if (saved) data['orion-expedition-progress-v1'] = saved;
  const element = () => ({value:'', textContent:'', innerHTML:'', hidden:false, disabled:false, open:false, attrs:{}, listeners:{}, setAttribute(k,v){this.attrs[k]=v;}, addEventListener(k,f){this.listeners[k]=f;}, focus(){}, classList:{toggle(){}}});
  const c = {navigator:{language}, Event:class{constructor(type){this.type=type;}}, localStorage:{getItem:k=>data[k]??null,setItem(k,v){if(blocked)throw Error('blocked');data[k]=v;}}, document:{documentElement:{},getElementById:id=>elements[id]??=element(),querySelectorAll:()=>[]},addEventListener:(k,f)=>(events[k]??=[]).push(f),dispatchEvent:e=>(events[e.type]??[]).forEach(f=>f(e))};
  c.window=c;vm.createContext(c);
  for(const f of ['dist/shared/i18n.js','dist/shared/progress.js','dist/games/orion-binary/game.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
  const run=s=>vm.runInContext(s,c);
  return {c,e:elements,data,run,send(pattern){for(let i=0;i<4;i++)if(run(`bits[${i}]`)!==Number(pattern[i]))c.toggleLamp(i);c.submitSignal();}};
}
function decodeStage(h){h.send(h.run('stages[0].target').toString(2).padStart(4,'0'));h.e.next.onclick();h.send(h.run('stages[1].target').toString(2).padStart(4,'0'));h.e.next.onclick();}
function complete(h){decodeStage(h);h.e.answer.value=String(h.run('stages[2].target'));h.c.submitSignal();}
for(const language of ['en','zh-Hant']) {
  const h=setup(language),{c,e,run}=h;
  assert(e.hints.hidden);assert(e.notes.hidden);assert(e.reward.hidden);
  c.submitSignal();assert.equal(run('feedback'),'wrong');assert.equal(run('lastValue'),0);
  c.toggleLamp(0);assert.equal(run('valueOf(bits)'),8);c.toggleLamp(0);assert.equal(run('valueOf(bits)'),0);
  c.toggleLamp(-1);c.toggleLamp(4);assert.equal(run('bits.join("")'),'0000');
  e.hint.onclick();c.OrionI18n.set(language==='en'?'zh-Hant':'en');assert.equal(run('hintDepth'),1);assert(!e.hints.hidden);
  c.OrionProgress.earn('future');h.send('0101');assert(run('solved'));c.toggleLamp(0);assert.equal(run('bits.join("")'),'0101');
  e.next.onclick();assert(e.hints.hidden);h.send('1111');assert.equal(run('lastValue'),15);assert.equal(run('feedback'),'wrong');
  h.send('1010');e.next.onclick();assert.equal(run('bits.join("")'),'1101');c.toggleLamp(0);assert.equal(run('bits.join("")'),'1101');
  for(const raw of ['','-1','16','1.3','1e1','<b>','１３']){e.answer.value=raw;c.submitSignal();assert.equal(run('feedback'),'invalid');assert(!run('solved'));}
  e.answer.value='12';c.submitSignal();assert.equal(run('feedback'),'wrong');
  c.OrionI18n.set(language);assert.equal(e.answer.value,'12');
  e.answer.value='13';c.submitSignal();assert(!e.reward.hidden);assert(!e.notes.hidden);assert(c.OrionProgress.has('starlight'));assert(c.OrionProgress.has('future'));
  c.submitSignal();assert.equal(c.OrionProgress.read().sigils.length,2);
  assert(setup(language,false,h.data['orion-expedition-progress-v1']).c.OrionProgress.has('starlight'));
  e.replay.onclick();assert(e.hints.hidden);assert(c.OrionProgress.has('starlight'));
  complete(h);c.OrionProgress.reset();c.dispatchEvent({type:'storage',key:'orion-expedition-progress-v1'});assert.equal(run('stage'),0);assert(e.reward.hidden);assert(!c.OrionProgress.has('starlight'));
  complete(h);assert(c.OrionProgress.has('starlight'));
}
// Independent enumeration proves each four-bit pattern has the expected place value and a unique output.
const h=setup(), values=[];
for(let n=0;n<16;n++){const pattern=n.toString(2).padStart(4,'0');const v=h.run(`valueOf([${pattern.split('').join(',')}])`);assert.equal(v,n);values.push(v);}
assert.equal(new Set(values).size,16);
const b=setup('en',true);complete(b);assert.match(b.e.saveStatus.textContent,/could not save/);assert(!b.e.retrySave.hidden);b.c.localStorage.setItem=(k,v)=>b.data[k]=v;b.e.retrySave.onclick();assert(b.e.retrySave.hidden);assert.match(b.e.saveStatus.textContent,/saved/);
const corrupt=setup('en',false,'not json');complete(corrupt);assert(corrupt.c.OrionProgress.has('starlight'));
const other=setup();other.c.toggleLamp(2);other.c.OrionProgress.earn('echo');other.c.dispatchEvent({type:'storage',key:'orion-expedition-progress-v1'});assert.equal(other.run('bits.join("")'),'0010');other.c.OrionProgress.reset();other.c.dispatchEvent({type:'pageshow'});assert.equal(other.run('bits.join("")'),'0000');
console.log('PASS binary: all 16 patterns, three stages, wrong/invalid answers, fixed received signal, bilingual state and hints, idempotent rewards, reload/replay/reset, other-tab rewards, corrupted/blocked storage and save retry.');
