const S=require('./batalha_v7_sim.js');const {CLAS,EVENTOS}=require('./dados_app.js');
const CX=[-101,-91,-81,-71,-61,-51,-41,-31,-21,-11,-1,0,1,11,21,31,41,51,61,71,81,91,101,111,121,131,141,151,161,171,181,191,201];
const VY=[-65,-60,-55,-50,-45,-40,-35,-30,-25,-20,-15,-10,-5,-3,-2,1,3,5,7,10,15,20,30,35,40,45,50,55,60,65,70,75,80];
const AY=[-75,-70,-65,-60,-55,-50,-45,-40,-35,-30,-25,-20,-10,-5,-2,-1,0,1,2,5,10,15,20,25,30,35,40,45,50,55,60,65,70];
const DX=[-252,-228,-202,-178,-152,-128,-102,-78,-52,-28,-2,0,2,28,52,78,102,128,152,178,202,228,252,278,302,328,352,378,402,428,452,478,502];
const DY=[-65,-60,-55,-50,-45,-40,-35,-30,-25,-20,-15,-10,-5,0,1,3,1,0,-5,-10,-15,-20,-25,-30,-35,-40,-45,-50,-55,-60,-65,-70,-75];
const FX=[-99999,-5,5,12,20],FY=[-1,0,1,2,3];
const cl=(xs,ys,x)=>{let i=-1;for(let j=0;j<xs.length;j++){if(xs[j]<=x)i=j;else break;}return i>=0?ys[i]:ys[0];};
const favor=a=>cl(FX,FY,cl(CX,AY,a.autoridade)+cl(DX,DY,a.dominio)+cl(CX,VY,a.vazio));
const ATTR=['dominio','riqueza','influencia','autoridade','vazio'];
const FOCO=[['dominio','riqueza'],['autoridade'],['riqueza','dominio'],['vazio']];
let s=7;const R=()=>{s=(s*16807)%2147483647;return s/2147483647;};const d10=()=>1+Math.floor(R()*10);
const BASE_IDADE={2:33,4:36,6:38,8:41,10:43};
let MODO='dado';
function familia(){const a={};const n=[2,4,6,8,10][Math.floor(R()*5)];ATTR.forEach(k=>{let t=0;if(MODO==='dado'){for(let i=0;i<7;i++)t+=d10();}else t=BASE_IDADE[n];a[k]=t;});const c=CLAS[Math.floor(R()*CLAS.length)];ATTR.forEach(k=>a[k]+=c.mods[k]||0);
 const ev=[...EVENTOS];for(let i=0;i<n;i++){const j=Math.floor(R()*ev.length);ATTR.forEach(k=>a[k]+=ev[j].mods[k]||0);ev.splice(j,1);}return a;}
function estacaoAtual(a,e){const r=d10()+favor(a);const m=r<=3?-1:r<=6?0:r<=10?1:2;if(m)FOCO[e].forEach(k=>a[k]+=m*(3+Math.floor(R()*4)));}
function estacaoTeste(tn,usaFavor){return (a,e)=>{FOCO[e].forEach(k=>{const n=Math.max(0,Math.min(10,Math.floor(a[k]/10)));const f=usaFavor?favor(a):0;const x=S.roll(Math.max(0,n+f),Math.max(0,Math.min(n,n+f)));
 const m=x<tn-10?-1:x<tn?0:x<tn+10?1:2;a[k]+=m*(3+Math.floor(R()*4));});};}
function estacaoTesteRelativa(a,e){FOCO[e].forEach(k=>{const n=Math.max(0,Math.min(10,Math.floor(a[k]/10)));const tn=5*n+10;const x=S.roll(n,n);const m=x<tn-10?-1:x<tn?0:x<tn+10?1:2;a[k]+=m*(3+Math.floor(R()*4));});}
function roda(nome,regra,anos=3){S.setSeed(99);s=7;const N=20000,ini=[],fim=[];let corr=0;
 for(let i=0;i<N;i++){const a=familia();ini.push(a.autoridade+a.dominio+a.riqueza+a.influencia+a.vazio);for(let t=0;t<anos*4;t++){regra(a,t%4);ATTR.forEach(k=>a[k]=Math.max(0,Math.min(100,a[k])));}fim.push(a.autoridade+a.dominio+a.riqueza+a.influencia+a.vazio);}
 const q=(xs,p)=>[...xs].sort((x,y)=>x-y)[Math.floor(xs.length*p)];const m=xs=>xs.reduce((x,y)=>x+y,0)/xs.length;
 const mi=m(ini),mf=m(fim);let cov=0,vi=0,vf=0;for(let i=0;i<N;i++){cov+=(ini[i]-mi)*(fim[i]-mf);vi+=(ini[i]-mi)**2;vf+=(fim[i]-mf)**2;}
 const ganho=fim.map((f,i)=>f-ini[i]);const ricos=[],pobres=[];const q8=q(ini,.8),q2=q(ini,.2);ini.forEach((v,i)=>{if(v>=q8)ricos.push(ganho[i]);if(v<=q2)pobres.push(ganho[i]);});
 return{regra:nome,'soma média ini':Math.round(mi),'soma média fim':Math.round(mf),'desvio ini':Math.round(Math.sqrt(vi/N)),'desvio fim':Math.round(Math.sqrt(vf/N)),'ganho 20% mais ricas':+m(ricos).toFixed(1),'ganho 20% mais pobres':+m(pobres).toFixed(1)};}
for(const modo of ['dado','base']){MODO=modo;
console.log('\nCriação: '+(modo==='dado'?'7d10 + clã + eventos (atual)':'base fixa por idade + clã + eventos')+' — soma dos 5 atributos, 12 estações, 20 mil famílias');
console.table([roda('atual: d10 + Favor',estacaoAtual),roda('teste Nível k Nível, TN 25',estacaoTeste(25,false)),roda('teste (Nível+Favor) k Nível, TN 25',estacaoTeste(25,true)),roda('teste Nível k Nível, TN 30',estacaoTeste(30,false)),roda('teste com TN = 5×Nível + 10',estacaoTesteRelativa)]);}
