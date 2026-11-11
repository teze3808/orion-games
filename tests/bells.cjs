const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const elements = new Map();
function element(id) {
  if (!elements.has(id)) elements.set(id, {setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}}});
  return elements.get(id);
}
const storage = new Map();
const c = {document:{getElementById:element}, localStorage:{
  getItem:key=>storage.get(key), setItem:(key,value)=>storage.set(key,value)
}, addEventListener(){}, OrionI18n:{t:a=>a,apply(){}}};
c.window=c;
vm.createContext(c);
for(const file of ['dist/shared/progress.js','dist/games/orion-bells/game.js'])
  vm.runInContext(fs.readFileSync(file,'utf8'),c);
const run = source => vm.runInContext(source,c);
const banks = JSON.parse(run('JSON.stringify(journeys)'));
assert.equal(new Set(banks.map(JSON.stringify)).size,6);
for(const journey of banks) for(const [a,b] of journey) {
  const strikes = p=>Array.from({length:Math.floor(60/p)},(_,i)=>(i+1)*p);
  const both = strikes(a).filter(x=>strikes(b).includes(x));
  assert(both.length);
  for(let minute=0;minute<=60;minute++) {
    const expected = minute===0?'start':minute===both[0]?'success':both.includes(minute)?'late':'apart';
    assert.equal(c.judge(minute,a,b),expected);
  }
}
run('render()');
assert(element('clues').hidden);
element('hint').onclick();
assert(!element('clues').hidden);
for(const [stage,time] of [6,12,12].entries()){
  c.setMinute(time*2); element('check').onclick();
  assert.equal(run('message'),'late');
  assert(!c.OrionProgress.has('unison'));
  c.setMinute(time); element('check').onclick();
  if(stage<2) element('next').onclick();
}
assert(c.OrionProgress.has('unison'));
element('check').onclick();
assert.equal(c.OrionProgress.read().sigils.length,1);
c.OrionProgress.reset(); c.syncProgress();
assert(!c.OrionProgress.has('unison'));
assert.equal(run('stage'),0);
assert.notEqual(run('variant'),0);
console.log('PASS bells: 1,098 clock settings, first/later chimes, clues, three-lock reward, reset and fresh journey.');
