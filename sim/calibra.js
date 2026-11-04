/* Busca de parâmetros contra as metas de design. node calibra.js fase N_configs */
'use strict';
const S = require('./batalha_v7_sim.js');
const clone = o => JSON.parse(JSON.stringify(o));
const pick = a => a[Math.floor(Math.random() * a.length)];

// metas: [min, max] em % de vitória de A (ou turnos médios)
const METAS_TROPA = {
  'samurai x ashigaru (média)': { A: [78, 88], turnos: [2.5, 6], fugaPct: [20, 60] },
  'ashigaru x camponesa (média)': { A: [75, 88], fugaPct: [30, 75] },
  'samurai x camponesa (média)': { A: [93, 100] },
  'ashigaru x ashigaru (média)': { turnos: [3, 6], fugaPct: [25, 60] },
  'ashigaru grande x ashigaru média': { A: [70, 82] },
  'ashigaru grande x samurai média': { A: [40, 55] },
  'camponesa massiva x samurai média': { A: [25, 45] },
  'samurai leão x samurai': { A: [57, 66] },
  'samurai caranguejo x samurai': { A: [57, 66] },
  'ashigaru c/ líder Battle 3 x ashigaru': { A: [56, 65] },
  'ataque total x ataque (ashigaru)': { A: [48, 58] },
  'cavalaria carga x ashigaru': { A: [78, 92] },
  'cavalaria carga x ashigaru prontidão+yari': { A: [38, 55] },
  'cavalaria x samurai (sem carga)': { A: [18, 35] },
};
const METAS_PC = {
  'PC R2 x ashigaru pequena': [40, 65], 'PC R2 x ashigaru media': [5, 20], 'PC R2 x ashigaru grande': [0, 5], 'PC R2 x ashigaru massiva': [0, 2],
  'PC R4 x ashigaru pequena': [85, 98], 'PC R4 x ashigaru media': [35, 60], 'PC R4 x ashigaru grande': [5, 20], 'PC R4 x ashigaru massiva': [0, 5],
  'PC R2 x samurai media': [0, 10], 'PC R4 x samurai media': [15, 35],
};
const fora = (v, [a, b]) => v < a ? a - v : v > b ? v - b : 0;
function nota(res, fase) {
  let s = 0;
  if (fase !== 'pc') for (const [k, m] of Object.entries(METAS_TROPA)) for (const [c, r] of Object.entries(m)) {
    const peso = c === 'turnos' ? 8 : 1; s += (fora(res.R[k][c], r) * peso) ** 2;
  }
  if (fase !== 'tropa') for (const [k, r] of Object.entries(METAS_PC)) s += fora(res.pcs[k].vitoriaPC, r) ** 2;
  return s;
}

function sortearTropa() {
  const P = clone(S.P0);
  P.tnBase = pick([0, 5]); P.tnPorAr = pick([3, 4, 5]);
  P.armadura = { nenhuma: 0, leve: pick([2, 3, 5]), pesada: pick([4, 5, 6, 8, 10]) };
  P.tnPorTreino = pick([0, 1, 2]);
  const b = pick([0, 1, 2]), st = pick([0, 1, 2]);
  P.atkMassa = { pequena: b, media: b + st, grande: b + 2 * st, massiva: b + 3 * st };
  P.tamFogo = pick([true, false]);
  P.golpesPorNivelMult = pick([1, 1.5, 2]);
  P.golpeMargem = pick([5, 10]);
  P.moralTN = pick([10, 15]); P.moralPorNivel = pick([3, 5]);
  P.clanModo = pick(['anel', 'k0']); P.liderModo = pick(['anel', 'k0']);
  P.liderAtk = pick([0, 1]); P.moralSempre = pick([true, false]);
  P.yariBonus = pick([[1, 1], [1, 0]]); P.clanGolpes = pick([1, 2]);
  const sam = pick([[3, 2, 2, 3, 3], [2, 2, 2, 3, 3], [3, 2, 2, 3, 2], [2, 2, 2, 3, 2], [3, 2, 2, 2, 3]]);
  const cam = pick([[2, 2, 1, 1, 1], [2, 2, 1, 2, 1], [2, 2, 2, 1, 1], [2, 2, 1, 2, 2], [2, 2, 2, 2, 1]]);
  const k5 = ['terra', 'agua', 'ar', 'fogo', 'vazio'];
  k5.forEach((k, i) => { P.tipos.samurai[k] = sam[i]; P.tipos.camponesa[k] = cam[i]; });
  P.tipos.samurai.treino = pick([2, 3]); P.tipos.camponesa.treino = pick([0, 1]);
  P.tipos.cavalaria.fogo = pick([2, 3]); P.tipos.cavalaria.terra = pick([2, 3]);
  return P;
}
function sortearPC(base) {
  const P = clone(base);
  const tams = ['pequena', 'media', 'grande', 'massiva'];
  const dpg = pick([[10, 15, 20, 30], [10, 20, 30, 40], [8, 15, 25, 40], [10, 15, 25, 35]]);
  const ataques = pick([[1, 2, 3, 4], [1, 2, 4, 6], [2, 3, 4, 5], [1, 3, 5, 7]]);
  const atkR = pick([[0, 1, 2, 3], [1, 2, 3, 4], [0, 2, 4, 6], [2, 3, 4, 5], [1, 3, 5, 7]]);
  const atkK = pick([[0, 0, 1, 1], [0, 1, 1, 2], [0, 0, 0, 1], [1, 1, 2, 2]]);
  const dF = pick([[0, 0, 1, 2], [0, 1, 2, 3], [1, 2, 3, 4]]);
  const dK = pick([[2, 2, 2, 3], [2, 2, 3, 3], [2, 3, 3, 4]]);
  const pen = pick([[[0, 0], [1, 0], [1, 1], [2, 1]], [[0, 0], [1, 1], [2, 1], [3, 2]], [[1, 0], [1, 1], [2, 1], [3, 2]]]);
  tams.forEach((t, i) => P.pc[t] = { danoPorGolpe: dpg[i], ataques: ataques[i], danoFogo: dF[i], danoK: dK[i], pen: pen[i], atk: [atkR[i], atkK[i]] });
  return P;
}

const fase = process.argv[2] || 'tropa', NC = +(process.argv[3] || 800), N1 = 300, N2 = 3000;
let base = S.P0;
if (fase === 'pc') base = Object.assign(clone(S.P0), JSON.parse(require('fs').readFileSync('final.json')));
const cand = [];
for (let i = 0; i < NC; i++) {
  const P = fase === 'tropa' ? sortearTropa() : sortearPC(base);
  S.setSeed(1000 + i);
  cand.push({ P, n: nota(S.bateria(P, N1), fase) });
}
cand.sort((a, b) => a.n - b.n);
const top = cand.slice(0, 12).map(c => { S.setSeed(77); const r = S.bateria(c.P, N2); return { P: c.P, n: nota(r, fase), r }; });
top.sort((a, b) => a.n - b.n);
const best = top[0];
require('fs').writeFileSync(fase === 'tropa' ? 'final.json' : 'melhor_pc.json', JSON.stringify(best.P, null, 1));
console.log('nota', best.n.toFixed(1), 'top5:', top.slice(0, 5).map(t => t.n.toFixed(0)).join(' '));
const show = fase === 'tropa'
  ? { samurai: best.P.tipos.samurai, camponesa: best.P.tipos.camponesa, cavalaria: best.P.tipos.cavalaria, liderAtk: best.P.liderAtk, moralSempre: best.P.moralSempre, yariBonus: best.P.yariBonus, clanGolpes: best.P.clanGolpes, tnBase: best.P.tnBase, tnPorAr: best.P.tnPorAr, armadura: best.P.armadura, tnPorTreino: best.P.tnPorTreino, atkMassa: best.P.atkMassa, tamFogo: best.P.tamFogo, golpesPorNivelMult: best.P.golpesPorNivelMult, golpeMargem: best.P.golpeMargem, moralTN: best.P.moralTN, moralPorNivel: best.P.moralPorNivel, clanModo: best.P.clanModo, liderModo: best.P.liderModo }
  : best.P.pc;
console.log(JSON.stringify(show));
console.table(best.r.R); console.table(best.r.pcs);
