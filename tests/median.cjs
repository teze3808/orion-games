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
for(const file of ['dist/shared/progress.js','dist/games/orion-median/game.js'])
  vm.runInContext(fs.readFileSync(file,'utf8'),c);
const run = source => vm.runInContext(source,c);
function permutations(ids) {
  if(!ids.length) return [[]];
  return ids.flatMap(id=>permutations(ids.filter(other=>other!==id)).map(rest=>[id,...rest]));
}
for(let v=0;v<6;v++) for(let s=0;s<3;s++){
  run('variant='+v+';stage='+s+';resetPanel()');
  const values=Array.from(run('readings()'));
  const expected=[...values].sort((a,b)=>a-b);
  assert.equal(run('isCorrect()'),false);
  for(const permutation of permutations(values.map((_,i)=>i))){
    c.input=permutation;
    run('order=input');
    for(let i=0;i<values.length;i++){
      const inOrder=permutation.every((id,pos)=>values[id]===expected[pos]);
      assert.equal(run('selected='+i+';isCorrect()'),inOrder&&i===(values.length-1)/2);
    }
  }
}
console.log('PASS all permutations and stamp positions for 18 records, including equal readings.');
