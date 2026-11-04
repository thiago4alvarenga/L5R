/* Refinamento local (hill climbing) a partir de um ponto. node refina.js fase iteracoes entrada.json saida.json */
'use strict';
const S = require('./batalha_v7_sim.js');
const fs = require('fs');
const clone = o => JSON.parse(JSON.stringify(o));
const pick = a => a[Math.floor(Math.random() * a.length)];
const [fase = 'tropa', ITER = '300', IN = 'final.json', OUT = 'refinado_tropa.json'] = process.argv.slice(2);

const METAS_TROPA = {
  'samurai x ashigaru (média)': { A: [80, 92], turnos: [2.5, 6], fugaPct: [20, 60] },
  'ashigaru x camponesa (média)': { A: [78, 90], fugaPct: [30, 75] },
  'samurai x camponesa (média)': { A: [93, 100] },
  'ashigaru x ashigaru (média)': { turnos: [3, 6], fugaPct: [25, 60] },
  'ashigaru grande x ashigaru média': { A: [72, 88] },
  'ashigaru grande x samurai média': { A: [40, 55] },
  'camponesa massiva x samurai média': { A: [25, 45] },
  'samurai leão x samurai': { A: [57, 66] },
  'samurai caranguejo x samurai': { A: [57, 66] },
  'ashigaru c/ líder Battle 3 x ashigaru': { A: [56, 68] },
  'ataque total x ataque (ashigaru)': { A: [42, 58] },
  'cavalaria carga x ashigaru': { A: [78, 92] },
  'cavalaria carga x ashigaru prontidão+yari': { A: [38, 55] },
  'cavalaria x samurai (sem carga)': { A: [18, 40] },
};
const METAS_PC = {
  'PC R2 x ashigaru pequena': [40, 65], 'PC R2 x ashigaru media': [5, 20], 'PC R2 x ashigaru grande': [0, 5], 'PC R2 x ashigaru massiva': [0, 2],
  'PC R4 x ashigaru pequena': [85, 98], 'PC R4 x ashigaru media': [35, 60], 'PC R4 x ashigaru grande': [5, 20], 'PC R4 x ashigaru massiva': [0, 5],
  'PC R2 x samurai media': [0, 10], 'PC R4 x samurai media': [15, 35],
};
const fora = (v, [a, b]) => v < a ? a - v : v > b ? v - b : 0;
function nota(res) {
  let s = 0;
  if (fase === 'tropa' || fase === 'legivel') for (const [k, m] of Object.entries(METAS_TROPA)) for (const [c, r] of Object.entries(m))
    s += (fora(res.R[k][c], r) * (c === 'turnos' ? 8 : 1)) ** 2;
  if (fase === 'pc') for (const [k, r] of Object.entries(METAS_PC)) s += fora(res.pcs[k].vitoriaPC, r) ** 2;
  return s;
}

// cada mutação: [descrição, função que altera P]
const tams = ['pequena', 'media', 'grande', 'massiva'];
const anel = ['terra', 'agua', 'ar', 'fogo', 'vazio'];
const MUT_TROPA = [
  P => P.armadura.leve = pick([1, 2, 3, 5]),
  P => P.armadura.pesada = pick([2, 3, 4, 5, 6, 8]),
  P => P.tnPorAr = pick([2, 3, 4, 5]),
  P => P.tnBase = pick([0, 5, 10]),
  P => P.tnPorTreino = pick([0, 1, 2]),
  P => P.atkMassa[pick(tams)] = pick([0, 1, 2, 3, 4]),
  P => P.tamanhos.grande.terra = pick([0, 1]),
  P => P.tamanhos.massiva.terra = pick([1, 2]),
  P => P.tamanhos.grande.fogo = pick([0, 1]),
  P => P.tamanhos.massiva.fogo = pick([0, 1, 2]),
  P => P.tamanhos.pequena.terra = pick([-1, 0]),
  P => P.golpesPorNivelMult = pick([1, 1.5, 2]),
  P => P.golpeMargem = pick([5, 7, 10]),
  P => P.moralTN = pick([10, 12, 15]),
  P => P.moralPorNivel = pick([3, 5]),
  P => P.desercaoMargem = pick([3, 5]),
  P => P.fugaFalha = pick([5, 10]),
  P => P.liderModo = pick(['anel', 'k0']),
  P => P.liderAtk = pick([0, 1, 2]),
  P => P.clanModo = pick(['anel', 'k0']),
  P => P.clanGolpes = pick([0, 1]),
  P => P.yariBonus = pick([[1, 1], [1, 0], [0, 0]]),
  P => P.lancasBonus = pick([[1, 1], [1, 0], [2, 1]]),
  P => P.moralSempre = pick([true, false]),
  P => P.tipos.samurai[pick(anel)] = pick([2, 3]),
  P => P.tipos.samurai.treino = pick([1, 2, 3]),
  P => P.tipos.camponesa[pick(anel)] = pick([1, 2]),
  P => P.tipos.camponesa.treino = pick([0, 1]),
  P => P.tipos.cavalaria[pick(['terra', 'fogo', 'vazio'])] = pick([2, 3]),
];
const MUT_PC = [];
for (const t of tams) {
  MUT_PC.push(P => P.pc[t].danoPorGolpe = pick([5, 8, 10, 12, 15, 20, 25, 30, 40, 50]));
  MUT_PC.push(P => P.pc[t].ataques = pick([1, 2, 3, 4, 5, 6, 8]));
  MUT_PC.push(P => P.pc[t].atk = [pick([0, 1, 2, 3, 4, 5, 6]), pick([0, 1, 2])]);
  MUT_PC.push(P => P.pc[t].danoFogo = pick([0, 1, 2, 3, 4]));
  MUT_PC.push(P => P.pc[t].danoK = pick([2, 3, 4]));
  MUT_PC.push(P => P.pc[t].pen = [pick([0, 1, 2, 3]), pick([0, 1, 2])]);
}
const massa = P => { const m = P._m; P.atkMassa = { pequena: m - 1, media: m, grande: m + 1, massiva: m + 2 }; };
const MUT_LEGIVEL = [
  P => P.armadura.leve = pick([3, 5]),
  P => P.armadura.pesada = pick([5, 8, 10]),
  P => { P._m = pick([1, 2, 3]); massa(P); },
  P => P.tamanhos.grande.terra = pick([0, 1]),
  P => P.tamanhos.massiva.terra = pick([1, 2]),
  P => P.tamanhos.grande.fogo = pick([0, 1]),
  P => P.tamanhos.massiva.fogo = pick([0, 1]),
  P => P.golpesPorNivelMult = pick([1, 1.5, 2]),
  P => P.golpeMargem = pick([5, 10]),
  P => P.moralTN = pick([10, 15]),
  P => P.moralPorNivel = pick([3, 5]),
  P => P.desercaoMargem = pick([5]),
  P => P.fugaFalha = pick([5, 10]),
  P => P.liderModo = pick(['anel', 'k0']),
  P => P.liderAtk = pick([0, 1]),
  P => P.clanModo = pick(['anel', 'k0']),
  P => P.clanGolpes = pick([0, 1]),
  P => P.yariBonus = pick([[1, 1], [1, 0]]),
  P => P.lancasBonus = pick([[1, 1], [1, 0]]),
  P => P.cargaBonus = pick([[1, 1], [1, 0]]),
  P => P.montadaBonus = pick([[1, 1], [1, 0], [0, 0]]),
  P => P.ataqueTotal = pick([[2, 1, -10], [2, 1, -5], [1, 1, -5]]),
  P => P.moralSempre = pick([true, false]),
  P => P.tipos.samurai[pick(anel)] = pick([2, 3]),
  P => P.tipos.samurai.treino = pick([1, 2, 3]),
  P => P.tipos.camponesa[pick(anel)] = pick([1, 2]),
  P => P.tipos.camponesa.treino = pick([0, 1]),
  P => P.tipos.cavalaria[pick(['terra', 'fogo', 'vazio'])] = pick([2, 3]),
];
const MUT = fase === 'tropa' ? MUT_TROPA : fase === 'legivel' ? MUT_LEGIVEL : MUT_PC;

const N = +(process.env.N || 700);
const avalia = P => { S.setSeed(4242); return nota(S.bateria(P, N)); }; // mesmos dados para comparar configurações
let P = Object.assign(clone(S.P0), JSON.parse(fs.readFileSync(IN)));
let best = avalia(P);
console.log('inicial', best.toFixed(0));
for (let i = 0; i < +ITER; i++) {
  const Q = clone(P);
  pick(MUT)(Q); if (Math.random() < .4) pick(MUT)(Q);
  const n = avalia(Q);
  if (n <= best) { if (n < best) console.log(i, n.toFixed(0)); best = n; P = Q; }
  if (best === 0) break;
}
fs.writeFileSync(OUT, JSON.stringify(P, null, 1));
S.setSeed(99); const r = S.bateria(P, 4000);
console.log('final (N=4000) nota', nota(r).toFixed(0));
console.table(fase === 'pc' ? r.pcs : r.R);
