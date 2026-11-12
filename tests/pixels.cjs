const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const elements = new Map();
function element(id) {
  if (!elements.has(id)) elements.set(id, {classList:{toggle(){}},setAttribute(){},focus(){},parentElement:{classList:{toggle(){}}}});
  return elements.get(id);
}
const storage = new Map();
const c = {document:{getElementById:element}, localStorage:{
  getItem:key=>storage.get(key), setItem:(key,value)=>storage.set(key,value)
}, addEventListener(){}, OrionI18n:{t:a=>a,apply(){}}};
c.window=c;
vm.createContext(c);
for(const file of ['dist/shared/progress.js','dist/games/orion-pixels/game.js'])
  vm.runInContext(fs.readFileSync(file,'utf8'),c);
const run = source => vm.runInContext(source,c);
const banks = JSON.parse(run('JSON.stringify(patterns)'));
assert.equal(new Set(banks.flat()).size,18);
for(let v=0;v<6;v++) {
  run('variant='+v);
  for(let stage=0;stage<3;stage++){
    run('stage='+stage+';resetPanel()');
    const goal=banks[v][stage];
    assert.match(goal,/^[01]{9}$/);
    if(stage===1) assert.equal(run('bits').filter((b,i)=>b!==goal[i]).length,2);
    for(let mask=0;mask<512;mask++){
      const input=mask.toString(2).padStart(9,'0');
      run('bits='+JSON.stringify(input.split('')));
      assert.equal(c.firstDifference()===-1,input===goal);
    }
  }
}
run('variant=0;stage=0;resetPanel()');
assert(element('clues').hidden);
element('hint').onclick();
assert(!element('clues').hidden);
element('check').onclick();
assert(!run('solved'));
for(let stage=0;stage<3;stage++){
 const goal=banks[0][stage];
 for(let i=0;i<9;i++) if(run('bits')[i]!==goal[i]) c.flip(i);
 element('check').onclick();
 assert(run('solved'));
 assert.equal(c.OrionProgress.has('pixelweave'),stage===2);
 if(stage<2) element('next').onclick();
}
element('check').onclick();
assert.equal(c.OrionProgress.read().sigils.length,1);
c.OrionProgress.reset();c.syncProgress();
assert(!c.OrionProgress.has('pixelweave'));
assert.notEqual(run('variant'),0);
assert.equal(run('stage'),0);
console.log('PASS pixels: 9,216 board states, repair seeds, toggle/check/advance paths, reward and reset.');
