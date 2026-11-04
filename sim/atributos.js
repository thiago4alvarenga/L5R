const {CLAS,EVENTOS}=require('./dados_app.js');
const IDADE={recente:2,jovem:4,estabelecida:6,antiga:8,'anciã':10};
const ATTR=['dominio','riqueza','influencia','autoridade','vazio'];
const d10=()=>1+Math.floor(Math.random()*10);
function familia(idade){const a={};ATTR.forEach(k=>{let s=0;for(let i=0;i<7;i++)s+=d10();a[k]=s;});const c=CLAS[Math.floor(Math.random()*CLAS.length)];
 ATTR.forEach(k=>a[k]+=c.mods[k]||0);const ev=[...EVENTOS];for(let i=0;i<IDADE[idade];i++){const j=Math.floor(Math.random()*ev.length);ATTR.forEach(k=>a[k]+=ev[j].mods[k]||0);ev.splice(j,1);}return a;}
const N=50000,res={},rank={};
for(const k of ATTR){res[k]=[];rank[k]=Array(12).fill(0);}
for(let i=0;i<N;i++){const id=Object.keys(IDADE)[i%5];const f=familia(id);for(const k of ATTR){res[k].push(f[k]);rank[k][Math.max(0,Math.min(11,Math.floor(f[k]/10)+ (f[k]<0?0:0)))]++;}}
const tab={};for(const k of ATTR){const xs=res[k].sort((a,b)=>a-b);const p=q=>xs[Math.floor(xs.length*q)];tab[k]={min:xs[0],p5:p(.05),p25:p(.25),mediana:p(.5),p75:p(.75),p95:p(.95),max:xs.at(-1),'<0':(100*xs.filter(x=>x<0).length/N).toFixed(2)+'%','>100':(100*xs.filter(x=>x>100).length/N).toFixed(2)+'%'};}
console.log('Atributos na criação (7d10 + clã + eventos), 50 mil famílias');console.table(tab);
const rt={};for(const k of ATTR){rt[k]={};rank[k].forEach((c,i)=>{if(i<=10)rt[k]['N'+i]=Math.round(100*c/N)+'%';});}
console.log('Nível (dezena) na criação');console.table(rt);
// variação por eventos e clã
const clan={};for(const k of ATTR){const v=CLAS.map(c=>c.mods[k]||0);clan[k]=`${Math.min(...v)} a ${Math.max(...v)}`;}
const ev={};for(const k of ATTR){const v=EVENTOS.map(e=>e.mods[k]||0);ev[k]=`${Math.min(...v)} a ${Math.max(...v)}`;}
console.log('Faixa dos mods de clã',clan);console.log('Faixa dos mods de um evento',ev);
