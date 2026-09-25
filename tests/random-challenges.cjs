// Avoid a V8 JIT crash in the bundled Node runtime when exercising many vm contexts.
if(!process.execArgv.includes('--jitless')){const r=require('node:child_process').spawnSync(process.execPath,['--jitless',__filename],{stdio:'inherit'});process.exit(r.status??1);}
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
function harness(game){const text=fs.readFileSync(`tests/${game}.cjs`,'utf8');const stop=game==='levers'?'function finalStage':'function '+(game==='binary'?'decodeStage':'complete');return new Function('require',text.slice(0,text.indexOf(stop))+';return setup;')(require);}
const counts={cipher:10,binary:10,levers:5,mixtures:3,seeds:2},sigils={cipher:'moonlight',binary:'starlight',levers:'ingenuity',mixtures:'crystal',seeds:'verdant'};
function signature(h,game){return h.run(`JSON.stringify(${game==='cipher'?'chapters':'stages'})`);}
function solve(h,game){const {c,e,run}=h;for(let i=0;i<3;i++){
 if(game==='cipher'){const q=run('chapters[chapter]');for(let n=0;n<q.shift;n++)e.right.onclick();const expected=i===2?[...q.plain].map(x=>String.fromCharCode(65+(x.charCodeAt(0)-65+q.shift)%26)).join(''):q.plain;c.submitAnswer(expected);}
 if(game==='binary'){const q=run('stages[stage]');if(i<2)h.send(q.target.toString(2).padStart(4,'0'));else{e.answer.value=String(q.target);c.submitSignal();}}
 if(game==='levers'){const q=run('stages[stage]'),found=[];for(let m=1;m<=4;m++)for(let d=1;d<=6;d++)if(m*d===q.mass*q.distance&&(i===2||m===q.right))found.push([m,d]);assert(found.length>=(i===2?2:1));for(const [m,d]of found.slice(0,i===2?2:1))h.choose(m,d);}
 if(game==='mixtures'){const q=run('stages[stage]');e.inspect.onclick();if(q.mix.includes('iron'))c.useTool('magnet');if(i>0&&q.mix.includes('sand'))c.useTool('filter');if(i===2)c.useTool('evaporate');c.check();}
 if(game==='seeds'){const q=run('stages[stage]');if(i===0){c.setWater(q.goalWater);c.choose(q.goalWater===1?'B':'A');}else if(i===1){if(run('light')!==q.goalLight)c.toggleLight();c.choose(q.goalLight?'B':'A');}else{c.setWater(1);if(run('light')===q.aLight)c.toggleLight();c.choose('same');}c.trial();}
 assert(run('solved'),`${game} stage ${i} unsolvable`);e.hint.onclick();assert(!e.hints.hidden);if(i<2)e.next.onclick();
 }assert(c.OrionProgress.has(sigils[game]));}
for(const [game,count]of Object.entries(counts)){
 const setup=harness(game),seen=new Set();
 for(let v=0;v<count;v++)for(const lang of ['en','zh-Hant']){
  const saved=JSON.stringify({version:1,sigils:['future'],hashTarget:0,variants:{[game]:v}}),h=setup(lang,false,saved),before=signature(h,game);seen.add(before);
  assert(h.e.hints.hidden);solve(h,game);assert(h.c.OrionProgress.has('future'));const persisted=h.data['orion-expedition-progress-v1'];assert.equal(signature(setup(lang,false,persisted),game),before);
  h.e.replay.onclick();assert.notEqual(signature(h,game),before);assert(h.c.OrionProgress.has(sigils[game]));assert(h.e.hints.hidden);solve(h,game);
  const replay=signature(h,game);h.c.OrionI18n.set(lang==='en'?'zh-Hant':'en');assert.equal(signature(h,game),replay);
  h.c.OrionProgress.reset();h.c.dispatchEvent({type:'pageshow'});assert.notEqual(signature(h,game),replay);assert(h.e.hints.hidden);assert(!h.c.OrionProgress.has(sigils[game]));solve(h,game);
 }
 assert.equal(seen.size,count,game+' variants must be distinct');
 const h=setup('en',true);let prev=signature(h,game);for(let i=0;i<10;i++){h.e.replay.onclick();const current=signature(h,game);assert.notEqual(current,prev);prev=current;}
 console.log(`PASS ${game}: all ${count} variants solved in both languages, distinct replay/reset, persistence, hidden hints and blocked-storage replay.`);
}
const h=harness('binary')();h.c.OrionProgress.earn('future');for(let i=0;i<100;i++){const before=JSON.parse(JSON.stringify(h.c.OrionProgress.read()));assert(h.c.OrionProgress.reset());const after=h.c.OrionProgress.read();assert.notEqual(before.hashTarget,after.hashTarget);for(const id of Object.keys(counts))assert.notEqual(before.variants[id],after.variants[id]);assert.equal(after.sigils.length,0);}
const saved=JSON.stringify(h.c.OrionProgress.read());h.c.localStorage.setItem=()=>{throw Error('blocked')};assert(!h.c.OrionProgress.reset());assert.equal(JSON.stringify(h.c.OrionProgress.read()),saved);
console.log('PASS: 100 atomic non-repeating resets across every mission; failed reset preserves all challenge data.');
