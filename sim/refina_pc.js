const S=require('./batalha_v7_sim.js');const fs=require('fs');
const base=Object.assign(JSON.parse(JSON.stringify(S.P0)),JSON.parse(fs.readFileSync('final.json')));
const METAS={'R2 pequena':[15,40],'R2 media':[0,10],'R2 grande':[0,3],'R2 massiva':[0,1],'R4 pequena':[60,85],'R4 media':[15,35],'R4 grande':[0,10],'R4 massiva':[0,3],'R2 samurai':[0,5],'R4 samurai':[5,20]};
const tams=['pequena','media','grande','massiva'];const pick=a=>a[Math.floor(Math.random()*a.length)];
function aval(pcp,N,seed=31){const P=JSON.parse(JSON.stringify(base));P.pc=pcp;const r={};S.setSeed(seed);
 for(const rank of [2,4]){for(const t of tams){let w=0,tt=0;for(let i=0;i<N;i++){const x=S.pcVsTropa(P,rank,()=>S.ficha(P,'ashigaru',t));w+=x.win;tt+=x.turno;}r[`R${rank} ${t}`]=Math.round(100*w/N);r[`R${rank} ${t} turnos`]=+(tt/N).toFixed(1);}
  let w=0;for(let i=0;i<N;i++)w+=S.pcVsTropa(P,rank,()=>S.ficha(P,'samurai','media')).win;r[`R${rank} samurai`]=Math.round(100*w/N);}
 let n=0;for(const[k,[a,b]] of Object.entries(METAS)){const v=r[k];n+=(v<a?a-v:v>b?v-b:0)**2;}return{n,r};}
const campos={danoPorGolpe:[5,8,10,12,15,20,25,30,40,50],ataques:[1,2,3,4,5,6,8],atkR:[0,1,2,3,4,5,6],atkK:[0,1,2],danoFogo:[0,1,2,3,4],danoK:[2,3,4],penR:[0,1,2,3],penK:[0,1,2]};
function toPc(v){const pc={};tams.forEach((t,i)=>pc[t]={danoPorGolpe:v.danoPorGolpe[i],ataques:v.ataques[i],atk:[v.atkR[i],v.atkK[i]],danoFogo:v.danoFogo[i],danoK:v.danoK[i],pen:[v.penR[i],v.penK[i]]});return pc;}
let v={danoPorGolpe:[10,15,20,30],ataques:[1,2,3,4],atkR:[0,1,2,3],atkK:[0,0,1,1],danoFogo:[0,0,1,2],danoK:[2,2,2,3],penR:[0,1,1,2],penK:[0,0,1,1]};
let best=aval(toPc(v),500).n;console.log('inicial',best);
for(let it=0;it<+(process.argv[2]||800);it++){const w=JSON.parse(JSON.stringify(v));const n=1+(Math.random()<.4);
 for(let j=0;j<n;j++){const f=pick(Object.keys(campos));w[f][Math.floor(Math.random()*4)]=pick(campos[f]);w[f].sort((a,b)=>a-b);}
 const s=aval(toPc(w),500).n;if(s<=best){if(s<best)console.log(it,s);best=s;v=w;}if(best===0)break;}
const fin=aval(toPc(v),4000,77);console.log('final',fin.n);console.log(JSON.stringify(v));console.log(fin.r);
fs.writeFileSync('final_pc.json',JSON.stringify({v,pc:toPc(v)},null,1));
