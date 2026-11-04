const {CLAS,EVENTOS}=require('./dados_app.js');
const IDADE={recente:2,jovem:4,estabelecida:6,antiga:8,'anciã':10};
const d10=()=>1+Math.floor(Math.random()*10);
function familia(idade){let a=0;for(let i=0;i<7;i++)a+=d10();const c=CLAS[Math.floor(Math.random()*CLAS.length)];a+=c.mods.autoridade||0;
 const ev=[...EVENTOS];for(let i=0;i<IDADE[idade];i++){const j=Math.floor(Math.random()*ev.length);a+=ev[j].mods.autoridade||0;ev.splice(j,1);}return a;}
const pct=(arr,p)=>arr[Math.floor(arr.length*p)];
const all=[];const out={};
for(const id of Object.keys(IDADE)){const xs=[];for(let i=0;i<20000;i++)xs.push(familia(id));xs.sort((a,b)=>a-b);all.push(...xs);out[id]={p10:pct(xs,.1),p25:pct(xs,.25),mediana:pct(xs,.5),p75:pct(xs,.75),p90:pct(xs,.9)};}
all.sort((a,b)=>a-b);out.todas={p10:pct(all,.1),p25:pct(all,.25),mediana:pct(all,.5),p75:pct(all,.75),p90:pct(all,.9),p95:pct(all,.95)};
console.log('Autoridade total por idade da família');console.table(out);
// custo efetivo de manter uma unidade mobilizada = recrutamento + armadura + equipamento médio, mais o upkeep de Mobilizado (-2 × tipo × tamanho)
const REC={camponesa:5,ashigaru:8,arqueiros:10,samurai:15,cavalaria:20},ARM={camponesa:0,ashigaru:2,arqueiros:2,samurai:6,cavalaria:2},TIPOM={camponesa:1,ashigaru:2,arqueiros:2,samurai:3,cavalaria:4},TAM={pequena:.5,media:1,grande:2,massiva:4};
const tab={};for(const t of Object.keys(REC)){tab[t]={};for(const [z,m] of Object.entries(TAM)){const c=Math.round((REC[t]+ARM[t])*m+2*TIPOM[t]*m);tab[t][z]=c;}}
console.log('Autoridade comprometida por unidade mobilizada (custo + armadura + upkeep de Mobilizado)');console.table(tab);
const med=out.todas.mediana,p90=out.todas.p90;
const caben={};for(const t of Object.keys(REC)){caben[t]={};for(const z of Object.keys(TAM)){caben[t][z]=`${Math.floor(med/tab[t][z])} / ${Math.floor(p90/tab[t][z])}`;}}
console.log(`Quantas cabem (família mediana ${med} / família do topo 10% ${p90}), sem gastar com escola`);console.table(caben);
const fracMassiva=t=>Math.round(100*all.filter(a=>a>=tab[t].massiva).length/all.length);
console.log('% das famílias que conseguem manter UMA Massiva:',Object.fromEntries(Object.keys(REC).map(t=>[t,fracMassiva(t)+'%'])));
