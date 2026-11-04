/* Criação com origem obrigatória, eventos novos e 7 idades. node cria_v3.js */
'use strict';
const {CLAS:CLAS0,EVENTOS}=require('./dados_app.js');const P=require('./proposta_eventos.js');const O=require('./proposta_origens.js');
const A=['dominio','riqueza','influencia','autoridade','vazio'],M={d:'dominio',r:'riqueza',i:'influencia',a:'autoridade',v:'vazio'};
const CLAS=CLAS0.map(c=>c.id==='imperial'?{...c,mods:{dominio:0,riqueza:8,influencia:20,autoridade:2,vazio:10}}:c);
const conv=m=>{const o={};A.forEach(k=>o[k]=0);for(const[s,v]of Object.entries(m)){if(s==='terra')o.dominio+=v;else o[M[s]]+=v;}return o;};
const ORIG=Object.entries(O.origens).map(([id,e])=>({id,idadeMin:e.idadeMin,mods:conv(e.m)}));
const FICAM=EVENTOS.filter(e=>!O.origens[e.id]).map(e=>{const t=['rivalidade_juramentada'].includes(e.id)?'ambiguo':(Object.entries(P[e.id]).filter(([s])=>s!=='terra').reduce((a,[,x])=>a+x,0)<0?'adverso':'favoravel');return{id:e.id,tipo:t,mods:conv(P[e.id])};});
const NOVOS=Object.entries(O.novos).map(([id,e])=>({id,tipo:e.tipo,mods:conv(e.m)}));
const POOL=[...FICAM,...NOVOS];
const PADV=+(process.env.PADV||0.15);
const IDADES=['nascente','recente','jovem','estabelecida','antiga','anciã','milenar'];
const BASE=JSON.parse(process.env.BASE||'null')||{
 nascente:[32,36,31,38,31],recente:[32,36,32,38,32],jovem:[32,36,34,37,34],estabelecida:[32,37,37,37,37],
 antiga:[31,36,40,36,40],'anciã':[30,36,42,36,42],milenar:[29,36,44,35,44]};
let s=11;const R=()=>{s^=s<<13;s^=s>>>17;s^=s<<5;return (s>>>0)/4294967296;};
const pick=a=>a[Math.floor(R()*a.length)];const q=(xs,p)=>xs[Math.floor(xs.length*p)];
const cont={};POOL.forEach(e=>cont[e.tipo]=(cont[e.tipo]||0)+1);
console.log('origens',ORIG.length,'| eventos comuns',POOL.length,cont);
const out={};
IDADES.forEach((id,ix)=>{
  const n=O.idades[id].n,minAdv=Math.floor((n-1)/3),v=[];
  for(let it=0;it<30000;it++){
    const c=pick(CLAS),t={};A.forEach((k,j)=>t[k]=BASE[id][j]+(c.mods[k]||0));
    const origs=ORIG.filter(o=>!o.idadeMin||IDADES.indexOf(id)>=IDADES.indexOf(o.idadeMin));
    const o=pick(origs);A.forEach(k=>t[k]+=o.mods[k]);
    const ev=[...POOL];let adv=0;
    for(let j=0;j<n-1;j++){const extra=R()<PADV;let cand=adv<minAdv||extra?ev.filter(e=>e.tipo!=='favoravel'):ev.filter(e=>e.tipo==='favoravel');const e=pick(cand);if(e.tipo!=='favoravel')adv++;A.forEach(k=>t[k]+=e.mods[k]);ev.splice(ev.indexOf(e),1);}
    v.push(t);
  }
  const row={eventos:n+' ('+minAdv+' adv.)'};A.forEach(k=>{const xs=v.map(t=>Math.max(0,Math.min(100,t[k]))).sort((a,b)=>a-b);row[k]=`${q(xs,.1)}/${q(xs,.5)}/${q(xs,.9)}`;});
  const ts=v.map(t=>A.reduce((a,k)=>a+t[k],0)).sort((a,b)=>a-b);row.soma=`${q(ts,.1)}/${q(ts,.5)}/${q(ts,.9)}`;out[id]=row;
});
console.table(out);
