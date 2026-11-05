const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
function setup(lang='en',saved,blocked=false,reduced=true){const e={},events={},data={'orion-expedition-language':lang},timers=new Map();let seq=0;if(saved)data['orion-expedition-progress-v1']=saved;const el=()=>({textContent:'',innerHTML:'',hidden:false,disabled:false,value:0,open:false,style:{},classList:{toggle(){}},setAttribute(){},addEventListener(){},focus(){},querySelector(){return {focus(){}}}});const c={navigator:{language:lang},Event:class{constructor(type){this.type=type}},document:{body:{},documentElement:{},getElementById:id=>e[id]??=el(),querySelectorAll:()=>[]},localStorage:{getItem:k=>data[k]??null,setItem(k,v){if(blocked)throw Error('blocked');data[k]=v}},addEventListener:(k,f)=>(events[k]??=[]).push(f),dispatchEvent:x=>(events[x.type]??[]).forEach(f=>f(x)),matchMedia:()=>({matches:reduced}),setTimeout:f=>{timers.set(++seq,f);return seq},clearTimeout:id=>timers.delete(id)};c.window=c;vm.createContext(c);for(const f of ['shared/i18n.js','shared/progress.js','games/orion-garden/game.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),c);return{c,e,data,timers,run:s=>vm.runInContext(s,c),flush(){while(timers.size){const [id,f]=timers.entries().next().value;timers.delete(id);f();}}};}

for(const lang of ['en','zh-Hant']) for(let v=0;v<6;v++) {
  const key='orion-expedition-progress-v1',h=setup(lang,JSON.stringify({version:1,sigils:['future'],variants:{garden:v}}));
  assert(h.e.hints.hidden);
  for(let stage=0;stage<3;stage++) {
    const half=h.c.challenge(),goal=h.c.target(),answers=[];
    for(let w=1;w<half;w++){
      h.c.resetTrial();h.c.setLength(w);
      const cells=(h.c.drawing().match(/fill="#34594a"/g)||[]).length;
      assert.equal(cells,w*(half-w));h.c.check();assert.equal(h.run('solved'),cells===goal);
      if(cells===goal)answers.push(w);
    }
    assert(answers.length>0);assert.equal(answers[0]+answers.at(-1),half);
    if(stage===2)assert.equal(goal,Math.max(...Array.from({length:half-1},(_,i)=>(i+1)*(half-i-1))));
    h.c.resetTrial();h.c.setLength(answers.at(-1));h.c.check();
    if(stage<2){assert(!h.c.OrionProgress.has('moonflower'));h.e.next.onclick();}
  }
  assert.deepEqual([...h.c.OrionProgress.read().sigils].sort(),['future','moonflower']);h.e.replay.onclick();
  const next=h.run('variant');assert.notEqual(next,v);assert.equal(setup(lang,h.data[key]).run('variant'),next);
  assert(h.c.OrionProgress.reset());h.c.syncProgress();assert.notEqual(h.run('variant'),next);assert(!h.c.OrionProgress.has('moonflower'));
}
console.log('PASS garden: every rectangle, rotated answers, maximum area, rewards, replay, persistence and reset in both languages.');
