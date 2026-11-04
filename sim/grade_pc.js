const S=require('./batalha_v7_sim.js');const fs=require('fs');
const base=Object.assign(JSON.parse(JSON.stringify(S.P0)),JSON.parse(fs.readFileSync('final.json')));
const METAS={ 'R2 pequena':[40,65],'R2 media':[5,20],'R2 grande':[0,5],'R2 massiva':[0,2],'R4 pequena':[85,98],'R4 media':[35,60],'R4 grande':[5,20],'R4 massiva':[0,5],'R2 samurai':[0,10],'R4 samurai':[15,35]};
const tams=['pequena','media','grande','massiva'];
function mk(c){const pc={};tams.forEach((t,s)=>pc[t]={danoPorGolpe:c.d0+s*c.dS,ataques:c.a0+s*c.aS,atk:[c.r0+s*c.rS,c.kS?Math.floor(s*c.kS):0],danoFogo:s*c.fS,danoK:2+(c.dk?Math.floor(s/2):0),pen:c.pen==='A'?[s,Math.floor(s/2)]:c.pen==='B'?[s,0]:[Math.floor(s/2)*1+ (s>0?1:0),Math.floor(s/2)]});return pc;}
function aval(pcp,N){const P=JSON.parse(JSON.stringify(base));P.pc=pcp;const r={};S.setSeed(31);
 for(const rank of [2,4]){for(const t of tams){let w=0;for(let i=0;i<N;i++)w+=S.pcVsTropa(P,rank,()=>S.ficha(P,'ashigaru',t)).win;r[`R${rank} ${t}`]=Math.round(100*w/N);}
  let w=0;for(let i=0;i<N;i++)w+=S.pcVsTropa(P,rank,()=>S.ficha(P,'samurai','media')).win;r[`R${rank} samurai`]=Math.round(100*w/N);}
 let n=0;for(const[k,[a,b]] of Object.entries(METAS)){const v=r[k];n+=(v<a?a-v:v>b?v-b:0)**2;}return{n,r};}
const res=[];
for(const d0 of [10,15]) for(const dS of [5,10]) for(const a0 of [1,2]) for(const aS of [1,2]) for(const r0 of [0,1,2,3]) for(const rS of [1,2]) for(const kS of [0,0.5,1]) for(const fS of [0,1]) for(const pen of ['A','B','C']) for(const dk of [0,1]){
 const c={d0,dS,a0,aS,r0,rS,kS,fS,pen,dk};const {n}=aval(mk(c),250);res.push({c,n});}
res.sort((a,b)=>a.n-b.n);
const top=res.slice(0,15).map(x=>{const v=aval(mk(x.c),3000);return{c:x.c,n:v.n,r:v.r};}).sort((a,b)=>a.n-b.n);
for(const t of top.slice(0,5)){console.log(t.n.toFixed(0),JSON.stringify(t.c));console.log('  ',JSON.stringify(t.r));}
fs.writeFileSync('final_pc_grade.json',JSON.stringify({c:top[0].c,pc:mk(top[0].c)},null,1));
