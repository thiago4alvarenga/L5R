/* Simula anos de estações com acontecimentos, lotes e investimento. */
const CAT=require('./acontecimentos.js');
function d(){let s=0,r;do{r=1+Math.floor(Math.random()*10);s+=r;}while(r===10);return s;}
function roll(x,y){const a=[];for(let i=0;i<x;i++)a.push(d());a.sort((p,q)=>q-p);return a.slice(0,y).reduce((s,v)=>s+v,0);}
const TNK=+process.argv[2]||5, ANOS=+process.argv[3]||5, INV=process.argv[4]!=="sem";
/* 2026-11, 2ª versão: +1 custa Nível × 3, leva Nível estações (mínimo 2), um por Anel de cada vez. */
const MULT=+(process.env.MULT||3), TEMPO=process.env.TEMPO!=="0";
function multBom(m,r){return m<=-10?0:(m<0?0.5:Math.min(2,1+0.25*r));}
function multRuim(m,r){return m<=-10?1.5:(m<0?1:Math.max(0,0.75-0.25*r));}
const POOLS=["dominio","influencia","autoridade","riqueza"];
function fam(v0){
  const f={base:{},lotes:[],t:0,inv:0,obra:{}};["dominio","influencia","autoridade","riqueza","vazio"].forEach(k=>f.base[k]=v0);return f;}
const niv=(f,k)=>Math.min(10,Math.floor(f.base[k]/10));
const res=(f,k)=>f.lotes.filter(l=>l.a===k).reduce((s,l)=>s+l.v,0);
function consumir(f,k,q){for(const l of f.lotes.filter(l=>l.a===k&&l.v>0).sort((a,b)=>(a.vence??1e9)-(b.vence??1e9))){const u=Math.min(l.v,q);l.v-=u;q-=u;if(!q)break;}f.lotes=f.lotes.filter(l=>l.v!==0);return q;}
function estacao(f,stats){
  const est=f.t%4, op=CAT.filter(c=>c.est===est), c=op[Math.floor(Math.random()*op.length)];
  const n=niv(f,c.anel),graca=Math.max(0,res(f,"vazio"));
  const tn=TNK*n+5, m=roll(Math.max(1,n),Math.max(1,n))-tn, r=m>=0?Math.floor(m/5)+graca:0;
  f.t++; f.lotes=f.lotes.filter(l=>l.vence==null||l.vence>f.t);
  c.ef.forEach(e=>{const mult=e.v>0?multBom(m,r):multRuim(m,r);const v=Math.sign(e.v)*Math.round(Math.abs(e.v)*mult);
    stats.efeito+=(e.a==="vazio"&&!e.perm?0:v);
    if(!v)return; if(e.perm)f.base[e.a]+=v; else f.lotes.push({a:e.a,v,vence:e.d==null?null:f.t+e.d});});
  if(INV){ // conclui obras, depois começa novas: primeiro do próprio pool, depois via Riqueza
    for(const k in f.obra){if(f.t>=f.obra[k]){f.base[k]++;f.inv++;delete f.obra[k];}}
    const dur=k=>TEMPO?Math.max(2,niv(f,k)):0;
    let mudou=true; while(mudou){mudou=false;
      for(const k of POOLS){if(f.obra[k]!=null)continue;const custo=Math.max(1,niv(f,k))*MULT;if(res(f,k)>=custo){consumir(f,k,custo);if(dur(k))f.obra[k]=f.t+dur(k);else{f.base[k]++;f.inv++;}mudou=true;}}
      const kv="vazio",cv=Math.max(1,niv(f,kv))*MULT*2; if(f.obra[kv]==null&&res(f,"riqueza")>=cv+6){consumir(f,"riqueza",cv);if(dur(kv))f.obra[kv]=f.t+dur(kv);else{f.base[kv]++;f.inv++;}mudou=true;}
    }}
}
for(const v0 of [25,45,65]){
  const N=3000;let soma=0,inv=0,resMed=0,ef=0,neg=0,minS=1e9,maxS=-1e9;
  for(let i=0;i<N;i++){const f=fam(v0),st={efeito:0};for(let s=0;s<ANOS*4;s++)estacao(f,st);
    const tot=Object.values(f.base).reduce((a,b)=>a+b,0)-5*v0;soma+=tot;inv+=f.inv;ef+=st.efeito;
    resMed+=POOLS.reduce((s,k)=>s+res(f,k),0); if(tot<0)neg++;minS=Math.min(minS,tot);maxS=Math.max(maxS,tot);}
  console.log("atributos "+v0+" (N"+Math.floor(v0/10)+"), "+ANOS+" anos: soma permanente "+(soma/N).toFixed(1)+" ["+minS+","+maxS+"], investimentos "+(inv/N).toFixed(1)+
    ", efeito líquido dos lotes "+(ef/N).toFixed(1)+", reserva no fim "+(resMed/N).toFixed(1)+", famílias que perderam "+(neg/N*100).toFixed(0)+"%");
}
