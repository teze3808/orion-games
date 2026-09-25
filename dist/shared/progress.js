'use strict';
window.OrionProgress=(()=>{
const counts={cipher:10,binary:10,levers:5,mixtures:3,seeds:2};
function variants(d){return Object.fromEntries(Object.entries(counts).map(([id,n])=>[id,Number.isInteger(d?.[id])&&d[id]>=0&&d[id]<n?d[id]:0]));}
function different(old,n){return (old+1+Math.floor(Math.random()*(n-1)))%n;}
const key='orion-expedition-progress-v1';let memory={version:1,sigils:[],hashTarget:0,variants:variants()};
function read(){try{const d=JSON.parse(localStorage.getItem(key));if(d&&d.version===1&&Array.isArray(d.sigils))memory={version:1,sigils:[...new Set(d.sigils.filter(s=>typeof s==='string'))],variants:variants(d.variants),hashTarget:Number.isInteger(d.hashTarget)&&d.hashTarget>=0&&d.hashTarget<=9?d.hashTarget:0};}catch{}return memory;}
function save(d){try{localStorage.setItem(key,JSON.stringify(d));memory=d;return true;}catch{return false;}}
return{read,variant:id=>variants(read().variants)[id]??0,nextVariant(id,previous){if(!Object.hasOwn(counts,id))return 0;const d=read(),old=Number.isInteger(previous)&&previous>=0&&previous<counts[id]?previous:variants(d.variants)[id],next=different(old,counts[id]);save({...d,variants:{...variants(d.variants),[id]:next}});return next;},reset(){const old=read();return save({version:1,sigils:[],hashTarget:different(old.hashTarget,10),variants:Object.fromEntries(Object.entries(counts).map(([id,n])=>[id,different(variants(old.variants)[id],n)]))});},setHashTarget(target){if(!Number.isInteger(target)||target<0||target>9)return false;const d={...read(),hashTarget:target};const saved=save(d);if(!saved)memory=d;return saved;},has:id=>read().sigils.includes(id),earn(id){const d=read();if(!d.sigils.includes(id))d.sigils.push(id);return save(d);}};
})();
