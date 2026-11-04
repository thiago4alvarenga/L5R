const S=require('./batalha_v7_sim.js');
S.setSeed(321);const N=20000;
const TNs=[15,20,25,30,35,40];
function tab(rolados){const t={};for(let n=2;n<=8;n++){const row={};for(const tn of TNs){let ok=0;for(let i=0;i<N;i++){const [r,k]=rolados(n);if(S.roll(r,k)>=tn)ok++;}row['TN'+tn]=Math.round(100*ok/N)+'%';}t['Nível '+n]=row;}return t;}
console.log('A) Nível k Nível (rolagem de Anel da 4ª edição)');console.table(tab(n=>[n,n]));
console.log('B) (Nível + 2) k Nível  — p. ex. Favor das Fortunas +2 ou um apoio');console.table(tab(n=>[n+2,n]));
console.log('C) (Nível + 3) k 3  — guardados fixos, mais perto de uma perícia de personagem');console.table(tab(n=>[n+3,3]));
