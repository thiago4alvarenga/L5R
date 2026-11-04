const S=require('./batalha_v7_sim.js');const fs=require('fs');
const base=Object.assign(JSON.parse(JSON.stringify(S.P0)),JSON.parse(fs.readFileSync(process.argv[2])));
const V=JSON.parse(process.argv[3]);
const linhas=process.argv[4]?process.argv[4].split('|'):null;
for(const [nome,mod] of Object.entries(V)){
  const P=JSON.parse(JSON.stringify(base));
  for(const [path,val] of Object.entries(mod)){const ks=path.split('.');let o=P;ks.slice(0,-1).forEach(k=>o=o[k]);o[ks.at(-1)]=val;}
  S.setSeed(7);const r=S.bateria(P,3000);
  const out={};for(const [k,v] of Object.entries(r.R)) if(!linhas||linhas.some(l=>k.includes(l))) out[k]=v.A+'/'+v.B+' t'+v.turnos+' f'+v.fugaPct;
  console.log('== '+nome);console.log(JSON.stringify(out,null,0).replace(/","/g,'"\n "'));
}
