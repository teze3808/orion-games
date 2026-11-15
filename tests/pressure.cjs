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
for(const file of ['dist/shared/progress.js','dist/games/orion-pressure/game.js'])
  vm.runInContext(fs.readFileSync(file,'utf8'),c);
const run = source => vm.runInContext(source,c);
for(let v=0;v<6;v++)for(let stage=0;stage<3;stage++){
 run('variant='+v+';stage='+stage+';resetPanel()');
 const force=Number(element('load').textContent.match(/\d+/)[0]);
 const target=Number(element('goal').textContent.match(/\d+/)[0]);
 for(let area=1;area<=8;area++){
  run('resetPanel()');
  element('area').oninput({target:{value:String(area)}});
  assert.equal(element('reading').textContent,'Pressure: '+(force/area).toFixed(1)+' Pa');
  element('check').onclick();
  assert.equal(run('solved'),force===target*area);
 }
}
console.log('PASS all 144 pressure settings against displayed force and area.');
