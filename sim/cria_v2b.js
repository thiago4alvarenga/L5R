/* Distribuição da criação: base por idade + clã + eventos (sorteados, sem repetir). node cria_v2.js */
'use strict';
const {CLAS,EVENTOS}=require('./dados_app.js');const P=require('./proposta_eventos.js');
const A=['dominio','riqueza','influencia','autoridade','vazio'];const M={d:'dominio',r:'riqueza',i:'influencia',a:'autoridade',v:'vazio'};
const novo=e=>{const p=P[e.id],o={};A.forEach(k=>o[k]=0);for(const[s,v]of Object.entries(p)){if(s!=="terra")o[M[s]]+=v;}return o;};
const EV={velho:EVENTOS.map(e=>Object.fromEntries(A.map(k=>[k,e.mods[k]||0]))),novo:EVENTOS.map(novo)};
const IDADE={recente:2,jovem:4,estabelecida:6,antiga:8,'anciã':10};
const BASE=JSON.parse(process.env.BASE||'null')||{ // d r i a v
 recente:[30,34,33,37,30], jovem:[33,35,35,37,33], estabelecida:[36,36,37,37,36], antiga:[40,37,39,36,40], 'anciã':[44,38,41,35,44]};
let s=7;const R=()=>{s^=s<<13;s^=s>>>17;s^=s<<5;return ((s>>>0)/4294967296);};
const q=(xs,p)=>xs[Math.floor(xs.length*p)];
const meio=EV.novo.reduce((o,e)=>{A.forEach(k=>o[k]+=e[k]/EV.novo.length);return o;},{dominio:0,riqueza:0,influencia:0,autoridade:0,vazio:0});
console.log('média por evento (novo):',Object.fromEntries(A.map(k=>[k,+meio[k].toFixed(2)])));
for(const modo of ['velho','novo']){const out={};const tot={};
 for(const[id,n]of Object.entries(IDADE)){const v=[];
  for(let i=0;i<30000;i++){const c=CLAS[Math.floor(R()*CLAS.length)];const t={};A.forEach((k,j)=>t[k]=(modo==='velho'?0:BASE[id][j])+(c.mods[k]||0));
   if(modo==='velho'){A.forEach(k=>{for(let d=0;d<7;d++)t[k]+=1+Math.floor(R()*10);});}
   const ev=[...EV[modo]];for(let j=0;j<n;j++){const x=Math.floor(R()*ev.length);A.forEach(k=>t[k]+=ev[x][k]);ev.splice(x,1);}
   v.push(t);}
  const row={};A.forEach(k=>{const xs=v.map(t=>Math.max(0,Math.min(100,t[k]))).sort((a,b)=>a-b);row[k]=`${q(xs,.1)}/${q(xs,.5)}/${q(xs,.9)}`;});
  const ts=v.map(t=>A.reduce((a,k)=>a+t[k],0)).sort((a,b)=>a-b);row.total=`${q(ts,.1)}/${q(ts,.5)}/${q(ts,.9)}`;out[id]=row;}
 console.log(`\n${modo.toUpperCase()} (p10/mediana/p90)`);console.table(out);}
