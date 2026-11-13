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
for(const file of ['dist/shared/progress.js','dist/games/orion-mapscale/game.js'])
  vm.runInContext(fs.readFileSync(file,'utf8'),c);
const run = source => vm.runInContext(source,c);
for(let v=0;v<6;v++) {
  for(let s=0;s<3;s++) {
    run('variant='+v+';stage='+s+';resetPanel()');
    const marks=(element('trail').innerHTML.match(/class="segment"/g)||[]).length;
    const scale=Number(element('scale').innerHTML.match(/represents (\d+)/)[1]);
    const answer=marks*scale;
    assert(answer>0 && answer<=30);
    for(let km=0;km<=30;km++) {
      run('resetPanel()');
      element('distance').oninput({target:{value:String(km)}});
      element('check').onclick();
      assert.equal(run('solved'),km===answer);
    }
  }
}
console.log('PASS map scale: all 558 distances checked against displayed marks and scale.');
