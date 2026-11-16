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
for(const file of ['dist/shared/progress.js','dist/games/orion-dna/game.js'])
  vm.runInContext(fs.readFileSync(file,'utf8'),c);
const run = source => vm.runInContext(source,c);
for(let v=0;v<6;v++)for(let stage=0;stage<3;stage++){
 run('variant='+v+';stage='+stage+';resetPanel()');
 const original=run('strand()');
 const pairs={A:'T',T:'A',C:'G',G:'C'};
 const answer=[...original].map(x=>pairs[x]);
 for(let mask=0;mask<4**original.length;mask++){
  let n=mask;
  c.candidate=answer.map(()=>{const a='ATCG'[n%4];n=Math.floor(n/4);return a;});
  run('partners=candidate');
  assert.equal(run('correct()'),c.candidate.every((base,i)=>base===answer[i]));
 }
 run('resetPanel();cycle(-1);cycle(99)');
 assert.equal(run('partners.join("")'),'');
}
console.log('PASS 8064 complete partner strands and invalid tile indices.');
