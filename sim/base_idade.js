const {CLAS,EVENTOS}=require('./dados_app.js');
const IDADE={recente:2,jovem:4,estabelecida:6,antiga:8,'anciã':10};
const ATTR=['dominio','riqueza','influencia','autoridade','vazio'];
// média de um evento por atributo e soma líquida
const med={};ATTR.forEach(k=>med[k]=+(EVENTOS.reduce((s,e)=>s+(e.mods[k]||0),0)/EVENTOS.length).toFixed(2));
const liq=EVENTOS.map(e=>ATTR.reduce((s,k)=>s+(e.mods[k]||0),0));
console.log('média de um evento por atributo',med,' | soma líquida de um evento: média',(liq.reduce((a,b)=>a+b,0)/liq.length).toFixed(1),'min',Math.min(...liq),'max',Math.max(...liq));
const clan={};ATTR.forEach(k=>clan[k]=+(CLAS.filter(c=>c.tier!=='imperial').reduce((s,c)=>s+(c.mods[k]||0),0)/(CLAS.length-1)).toFixed(1));
console.log('média do clã por atributo (sem a Imperial)',clan);
// só clã + eventos (sem base): desvio por idade
let s=3;const R=()=>{s=(s*16807)%2147483647;return s/2147483647;};
const out={};
for(const [id,n] of Object.entries(IDADE)){const v=[];for(let i=0;i<20000;i++){const c=CLAS[Math.floor(R()*CLAS.length)];let a=c.mods.autoridade||0;const ev=[...EVENTOS];const tot={};ATTR.forEach(k=>tot[k]=c.mods[k]||0);for(let j=0;j<n;j++){const x=Math.floor(R()*ev.length);ATTR.forEach(k=>tot[k]+=ev[x].mods[k]||0);ev.splice(x,1);}v.push(tot);}
 const row={};ATTR.forEach(k=>{const xs=v.map(t=>t[k]).sort((a,b)=>a-b);row[k]=`${xs[Math.floor(xs.length*.1)]} / ${xs[Math.floor(xs.length*.5)]} / ${xs[Math.floor(xs.length*.9)]}`;});out[id]=row;}
console.log('clã + eventos, sem base (p10 / mediana / p90)');console.table(out);
// 7d10 sozinho
console.log('7d10 sozinho: média 38,5, desvio',Math.sqrt(7*8.25).toFixed(1),'(p10 ~31, p90 ~46)');
