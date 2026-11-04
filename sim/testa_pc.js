const S=require('./batalha_v7_sim.js');const fs=require('fs');
const base=Object.assign(JSON.parse(JSON.stringify(S.P0)),JSON.parse(fs.readFileSync('final.json')));
const tams=['pequena','media','grande','massiva'];
const toPc=v=>{const pc={};tams.forEach((t,i)=>pc[t]={danoPorGolpe:v.dpg[i],ataques:v.at[i],atk:[v.ar[i],v.ak[i]],danoFogo:v.df[i],danoK:v.dk[i],pen:[v.pr[i],v.pk[i]]});return pc;};
const V=JSON.parse(process.argv[2]);
for(const [nome,v] of Object.entries(V)){const P=JSON.parse(JSON.stringify(base));P.pc=toPc(v);S.setSeed(5);const out=[];
 for(const rank of [2,4]){for(const t of tams){let w=0,tt=0;const N=3000;for(let i=0;i<N;i++){const x=S.pcVsTropa(P,rank,()=>S.ficha(P,'ashigaru',t));w+=x.win;tt+=x.turno;}out.push(`R${rank} ${t} ${Math.round(100*w/N)}% (${(tt/N).toFixed(1)}t)`);}
  let w=0;for(let i=0;i<3000;i++)w+=S.pcVsTropa(P,rank,()=>S.ficha(P,'samurai','media')).win;out.push(`R${rank} samuraiMédia ${Math.round(w/30)}%`);}
 console.log('== '+nome+'\n  '+out.join('\n  '));}
