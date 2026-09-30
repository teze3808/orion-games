const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('dist/shared/discovery.js','utf8');
for(const kind of ['hash','cipher','binary','levers','mixtures','seeds','mist','circuits','logic','water','sort'])for(const lang of ['en','zh-Hant'])for(const reduced of [true,false]){
 const ids={},events={},tasks=[],timers=new Map();let next=0,language=lang,reopen,opens=0;
 function element(){return{hidden:false,open:false,textContent:'',listeners:{},children:[],setAttribute(){},append(n){this.children.push(n)},replaceChildren(n){this.children=[n];this.textContent=n.textContent},addEventListener(k,f){this.listeners[k]=f},focus(){this.focused=true},showModal(){this.open=true;opens++},close(){this.open=false;this.listeners.close?.()}};}
 const body=element(),result=element();body.dataset={mission:kind};result.append=n=>reopen=n;
 const c={document:{body,createElement:element,getElementById:id=>ids[id]??=element(),querySelector:()=>result},OrionI18n:{get lang(){return language},t:(en,zh)=>language==='en'?en:zh,set(v){language=v;events['orion-language']?.()}},matchMedia:()=>({matches:reduced,addEventListener(){}}),addEventListener:(k,f)=>events[k]=f,queueMicrotask:f=>tasks.push(f),setTimeout:f=>{timers.set(++next,f);return next},clearTimeout:id=>timers.delete(id)};c.window=c;vm.createContext(c);vm.runInContext(source,c);
 const dialog=body.children[0],update=c.OrionDiscovery.update,flush=()=>{while(tasks.length)tasks.shift()()};
 assert(reopen.hidden&&!dialog.open);update(false);flush();assert.equal(opens,0);
 update(true);flush();assert(dialog.open&&!reopen.hidden);assert.equal(opens,1);assert.equal(timers.size,reduced?0:1);
 ids.discoveryNext.onclick();assert.match(ids.discoveryStep.textContent,/2/);assert.equal(timers.size,0);
 const before=ids.discoveryCaption.textContent;ids.discoveryLanguage.onclick();assert.notEqual(ids.discoveryCaption.textContent,before);assert.match(ids.discoveryStep.textContent,/2/);assert.equal(opens,1);
 ids.discoveryDone.onclick();assert(!dialog.open&&reopen.focused);update(true);flush();assert.equal(opens,1,'re-renders must not reopen');
 reopen.onclick();assert.equal(opens,2);let prevented=false;dialog.listeners.cancel({preventDefault(){prevented=true}});assert(prevented&&!dialog.open);
 update(false);assert(reopen.hidden);update(true);update(false);flush();assert(!dialog.open,'queued completion must not survive reset');
 update(true);flush();assert(dialog.open);update(false);assert(!dialog.open&&timers.size===0);
 // Playback completes once, can pause, and has manual controls in reduced motion.
 update(true);flush();if(reduced)ids.discoveryPlay.onclick();for(let i=0;i<2;i++){const [id,f]=[...timers][0];timers.delete(id);f();}assert.equal(timers.size,0);assert(ids.discoveryNext.disabled);assert.match(ids.discoveryStep.textContent,/3/);
 const html=fs.readFileSync(`dist/games/orion-${kind}/index.html`,'utf8');assert(html.includes('shared/discovery.css'));assert(html.includes(`data-mission="${kind}"`));assert(html.indexOf('shared/discovery.js')<html.indexOf('src="game.js'));assert(fs.readFileSync(`dist/games/orion-${kind}/game.js`,'utf8').includes('OrionDiscovery?.update('));
}
console.log('PASS discoveries: all 11 lessons × 2 languages × motion preferences; hidden before success, once per session, reopen, Escape, language preservation, bounded playback and reset cancellation.');
