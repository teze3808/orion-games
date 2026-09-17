'use strict';
window.OrionProgress=(()=>{
const key='orion-expedition-progress-v1';let memory={version:1,sigils:[],hashTarget:0};
function read(){try{const d=JSON.parse(localStorage.getItem(key));if(d&&d.version===1&&Array.isArray(d.sigils))memory={version:1,sigils:[...new Set(d.sigils.filter(s=>typeof s==='string'))],hashTarget:Number.isInteger(d.hashTarget)&&d.hashTarget>=0&&d.hashTarget<=9?d.hashTarget:0};}catch{}return memory;}
function save(d){try{localStorage.setItem(key,JSON.stringify(d));memory=d;return true;}catch{return false;}}
return{read,reset(){const previous=read().hashTarget;return save({version:1,sigils:[],hashTarget:(previous+1+Math.floor(Math.random()*9))%10});},setHashTarget(target){if(!Number.isInteger(target)||target<0||target>9)return false;const d={...read(),hashTarget:target};const saved=save(d);if(!saved)memory=d;return saved;},has:id=>read().sigils.includes(id),earn(id){const d=read();if(!d.sigils.includes(id))d.sigils.push(id);return save(d);}};
})();
