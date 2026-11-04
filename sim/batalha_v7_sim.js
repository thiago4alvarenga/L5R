/* Simulador do modelo v7 da Batalha em Massa (revisão 3).
   Uso: node batalha_v7_sim.js [N] [params.json]
   Tudo que é número de design vive em P, para a calibração poder trocar sem mexer na lógica. */
'use strict';

// ---------- dados ----------
let seed = 12345; // mulberry32
function rnd() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
function d10() { let t = 0, r; do { r = 1 + Math.floor(rnd() * 10); t += r; } while (r === 10); return t; }
// XkY com a regra dos 10 dados (Core Book): rolados acima de 10 viram guardados 2:1; o que passar de 10k10 vira +2 cada
function roll(x, k, bonus = 0) {
  x = Math.max(0, x); k = Math.max(0, Math.min(k, x));
  if (x === 0) return bonus;
  if (x > 10) { const extra = x - 10; x = 10; k += Math.floor(extra / 2); }
  if (k > 10) { bonus += 2 * (k - 10); k = 10; }
  const rs = []; for (let i = 0; i < x; i++) rs.push(d10());
  rs.sort((a, b) => b - a);
  let s = bonus; for (let i = 0; i < k; i++) s += rs[i];
  return s;
}

// ---------- parâmetros de design ----------
const P0 = {
  tipos: {
    camponesa: { terra: 2, agua: 2, ar: 1, fogo: 1, vazio: 1, treino: 0, armadura: 'nenhuma' },
    ashigaru:  { terra: 2, agua: 2, ar: 2, fogo: 2, vazio: 2, treino: 1, armadura: 'leve' },
    arqueiros: { terra: 2, agua: 2, ar: 3, fogo: 1, vazio: 2, treino: 1, armadura: 'leve', arcos: true },
    samurai:   { terra: 3, agua: 2, ar: 2, fogo: 3, vazio: 3, treino: 2, armadura: 'pesada' },
    cavalaria: { terra: 2, agua: 4, ar: 2, fogo: 3, vazio: 2, treino: 2, armadura: 'leve', montada: true },
  },
  tamanhos: {
    pequena: { terra: -1, fogo: 0, agua: 1, vazio: 0 },
    media:   { terra: 0, fogo: 0, agua: 0, vazio: 0 },
    grande:  { terra: 1, fogo: 1, agua: -1, vazio: 0 },
    massiva: { terra: 2, fogo: 1, agua: -1, vazio: -1 },
  },
  armadura: { nenhuma: 0, leve: 5, pesada: 10 },
  pesadaAgua: -1,
  ataqueTotal: [2, 1, -10],    // Core Book: +2k1 e -10 no TN
  cargaBonus: [1, 1], montadaBonus: [1, 1],
  tnBase: 5, tnPorAr: 5, tnPorTreino: 0,
  atkMassa: { pequena: 0, media: 0, grande: 0, massiva: 0 }, // dados rolados a mais no ataque, pelo volume
  tamFogo: true,               // tamanho mexe no Anel de Fogo (como na rev. 3) ou não
  clanModo: 'anel',            // 'anel' = +1 no Anel; 'k0' = +1k0 nas rolagens daquele Anel
  liderModo: 'anel',           // 'anel' = +1 Vazio; 'k0' = +1k0 em moral
  liderAtk: 0,                 // dados rolados a mais no ataque com Taisa de Battle 3+
  moralSempre: false,          // testa moral sempre que toma golpe (não só ao mudar de nível)
  yariBonus: [1, 1], lancasBonus: [1, 1],
  clanGolpes: 1,               // golpes extras por nível do Caranguejo
  golpesPorNivelMult: 1,      // golpes por nível = Terra × isto
  golpeMargem: 5,             // +1 golpe a cada X acima do TN
  moralTN: 15, moralPorNivel: 5,
  desercaoMargem: 5, fugaFalha: 10,
  // personagem contra tropa, por tamanho
  pc: {
    pequena: { danoPorGolpe: 10, ataques: 1, danoFogo: 0, danoK: 2, pen: [0, 0], atk: [0, 0] },
    media:   { danoPorGolpe: 15, ataques: 2, danoFogo: 0, danoK: 2, pen: [1, 0], atk: [0, 0] },
    grande:  { danoPorGolpe: 20, ataques: 3, danoFogo: 1, danoK: 2, pen: [1, 1], atk: [0, 0] },
    massiva: { danoPorGolpe: 30, ataques: 4, danoFogo: 2, danoK: 3, pen: [2, 1], atk: [0, 0] },
  },
};

// ---------- ficha ----------
function ficha(P, tipo, tam = 'media', opt = {}) {
  const t = P.tipos[tipo], z = P.tamanhos[tam];
  const u = {
    nome: opt.nome || tipo + '/' + tam, tipo, tam,
    terra: t.terra + z.terra, agua: t.agua + z.agua, ar: t.ar, fogo: t.fogo + (P.tamFogo ? z.fogo : 0), vazio: t.vazio + z.vazio,
    treino: t.treino, armadura: opt.armadura || t.armadura, montada: !!t.montada, arcos: !!t.arcos,
    clan: opt.clan || null, lider: opt.lider || null, prontidao: !!opt.prontidao, yari: !!opt.yari,
    postura: opt.postura || 'ataque',
  };
  u.bFogo = 0; u.bVazio = 0;
  if (u.clan === 'leao') { if (P.clanModo === 'anel') u.fogo++; else u.bFogo++; }
  if (u.clan === 'caranguejo') { if (P.clanModo === 'anel') u.terra++; }
  if (u.lider) { const lv = u.lider.battle >= 5 ? 2 : u.lider.battle >= 3 ? 1 : 0; if (P.liderModo === 'anel') u.vazio += lv; else u.bVazio += lv; }
  u.massa = (P.atkMassa[tam] || 0) + (u.lider && u.lider.battle >= 3 ? P.liderAtk : 0);
  if (u.armadura === 'pesada') u.agua += P.pesadaAgua;
  for (const k of ['terra', 'agua', 'ar', 'fogo', 'vazio']) u[k] = Math.max(1, u[k]);
  u.tn = P.tnBase + u.ar * P.tnPorAr + P.armadura[u.armadura] + u.treino * P.tnPorTreino;
  u.golpesNivel = Math.max(1, Math.round(u.terra * P.golpesPorNivelMult)) + (u.clan === 'caranguejo' ? P.clanGolpes : 0);
  u.cap = u.golpesNivel * 3;
  u.golpes = 0; u.moral = 0; u.vp = u.vazio; u.desertores = 0;
  return u;
}
const nivelDano = u => Math.min(3, Math.floor(u.golpes / u.golpesNivel)); // 0 intacta,1 castigada,2 quebrada,3 destruida
function penal(u) { // [rolados, guardados] a tirar
  let r = 0, k = 0; const n = nivelDano(u);
  if (n === 1) r += 1; if (n === 2) { r += 1; k += 1; }
  if (u.moral === 1) r += 1; if (u.moral === 2) { r += 1; k += 1; }
  return [r, k];
}

// ---------- ações ----------
function ataque(P, a, d, extra = { r: 0, k: 0 }, usarVP = true) {
  const [pr, pk] = penal(a);
  let x = a.fogo + a.treino + a.massa + a.bFogo - pr + extra.r, k = a.fogo - pk + extra.k;
  if (a.postura === 'ataqueTotal') { x += P.ataqueTotal[0]; k += P.ataqueTotal[1]; }
  if (usarVP && a.vp > 1) { a.vp--; x++; k++; }
  let tn = d.tn + (d.postura === 'ataqueTotal' ? P.ataqueTotal[2] : 0) + (d.moral === 3 ? -10 : 0) + (d._tnExtra || 0);
  const tot = roll(x, k);
  if (tot < tn) return 0;
  return 1 + Math.floor((tot - tn) / P.golpeMargem);
}
function aplicaGolpes(u, g) {
  if (g > 0 && u.vp > 0 && u._vpDefesa) { u.vp--; g--; }
  const antes = nivelDano(u); u.golpes += g; return nivelDano(u) !== antes;
}
function testeMoral(P, u) {
  const [pr, pk] = penal(u);
  let x = u.vazio + u.treino + u.bVazio - pr, k = u.vazio - pk;
  if (u.clan === 'leao') x += 1;
  if (u.postura === 'defesaTotal') x += 0; // (sem bônus de moral nas posturas do livro)
  if (u.vp > 0) { u.vp--; x++; k++; }
  const tn = P.moralTN + P.moralPorNivel * nivelDano(u);
  const tot = roll(x, k);
  if (tot >= tn) { if (u.moral === 3) u.moral = 2; return; }
  const falha = tn - tot;
  if (u.clan === 'leao' && !u._leaoUsado && u.moral === 0) { u._leaoUsado = true; u.moral = 1; return; }
  if (u.moral < 2) { u.moral++; return; }
  if (u.moral === 2) {
    const g = 1 + Math.floor(falha / P.desercaoMargem);
    const antes = nivelDano(u); u.golpes += g; u.desertores += g;
    if (falha >= P.fugaFalha || (antes < 2 && nivelDano(u) >= 2)) u.moral = 3;
  }
}
const fora = u => nivelDano(u) >= 3 || u.moral === 3;

// ---------- tropa contra tropa ----------
function duelo(P, mkA, mkB, opts = {}) {
  const A = mkA(), B = mkB();
  const ini = u => roll(u.ar + u.treino, u.ar);
  const iA = ini(A), iB = ini(B);
  let turno = 0;
  while (turno < 30) {
    turno++;
    const ordem = (iA > iB || (iA === iB && rnd() < .5)) ? [[A, B], [B, A]] : [[B, A], [A, B]];
    const mudou = new Set();
    for (const [u, alvo] of ordem) {
      if (fora(u) || fora(alvo)) continue;
      let extra = { r: 0, k: 0 };
      // primeira ativação da cavalaria: Carga
      if (turno === 1 && u.montada && opts.carga) {
        const lb = u.lider ? u.lider.fogo + u.lider.battle : 3, lk = u.lider ? u.lider.fogo : 2;
        if (roll(lb, lk) >= 15) {
          extra = { r: P.cargaBonus[0] + P.montadaBonus[0], k: P.cargaBonus[1] + P.montadaBonus[1] };
          // Lanças Firmes do alvo em Prontidão
          if (alvo.prontidao) {
            const ex = { r: P.lancasBonus[0] + (alvo.yari ? P.yariBonus[0] : 0), k: P.lancasBonus[1] + (alvo.yari ? P.yariBonus[1] : 0) };
            const g = ataque(P, alvo, u, ex, false);
            if (aplicaGolpes(u, g)) mudou.add(u);
            if (g >= 2) extra = { r: P.montadaBonus[0], k: P.montadaBonus[1] };
            if (fora(u)) continue;
          }
        }
      } else if (alvo.montada && u.yari) extra = { r: P.yariBonus[0], k: P.yariBonus[1] };
      const g = ataque(P, u, alvo, extra);
      if (aplicaGolpes(alvo, g) || (P.moralSempre && g > 0)) mudou.add(alvo);
    }
    for (const u of [A, B]) if (!fora(u) && (mudou.has(u) || u.moral === 2)) testeMoral(P, u);
    if (fora(A) || fora(B)) break;
  }
  const venceA = !fora(A) && fora(B), venceB = !fora(B) && fora(A);
  return { turno, venceA, venceB, fuga: (venceA && B.moral === 3) || (venceB && A.moral === 3),
           desert: A.desertores + B.desertores };
}

// ---------- personagem contra tropa ----------
const WOUND_PEN = [0, 3, 5, 10, 15, 20, 40]; // Healthy..Down (8º = Out)
function pcMk(rank) {
  if (rank === 2) return { agi: 3, skill: 3, str: 3, refl: 3, earth: 3, void: 2, tnArm: 5, ataques: 1, dmgR: 3, dmgK: 2 };
  return { agi: 4, skill: 5, str: 4, refl: 4, earth: 4, void: 3, tnArm: 10, ataques: 2, dmgR: 3, dmgK: 2 };
}
function pcVsTropa(P, rank, mkU) {
  const pc = pcMk(rank), U = mkU(), esc = P.pc[U.tam];
  const ranks = [pc.earth * 5].concat(Array(7).fill(pc.earth * 2));
  const total = ranks.reduce((a, b) => a + b, 0);
  let dano = 0, vp = pc.void, turno = 0;
  const pcTN = 5 + pc.refl * 5 + pc.tnArm;
  const rankDe = d => { let s = 0; for (let i = 0; i < ranks.length; i++) { s += ranks[i]; if (d < s) return i; } return 8; };
  while (turno < 30) {
    turno++;
    // personagem ataca
    for (let a = 0; a < pc.ataques; a++) {
      const wpen = WOUND_PEN[Math.min(6, rankDe(dano))];
      let x = pc.agi + pc.skill - esc.pen[0], k = pc.agi - esc.pen[1];
      if (vp > 0) { vp--; x++; k++; }
      const tot = roll(x, k);
      if (tot >= U.tn + wpen) {
        const raises = 0; // personagem não declarou Raise na simulação
        const dmg = roll(pc.str + pc.dmgR + raises, pc.dmgK);
        const g = Math.floor(dmg / esc.danoPorGolpe);
        if (aplicaGolpes(U, g)) testeMoral(P, U);
        if (fora(U)) return { win: true, turno };
      }
    }
    // tropa ataca
    for (let a = 0; a < esc.ataques; a++) {
      const [pr, pk] = penal(U);
      const tot = roll(U.fogo + U.treino + U.massa + esc.atk[0] - pr, U.fogo + esc.atk[1] - pk);
      if (tot >= pcTN) {
        const rs = Math.floor((tot - pcTN) / 5);
        dano += roll(U.fogo + esc.danoFogo + rs, esc.danoK);
        if (dano >= total) return { win: false, turno };
      }
    }
    if (U.moral === 2) { testeMoral(P, U); if (fora(U)) return { win: true, turno }; }
  }
  return { win: false, turno, empate: true };
}

// ---------- bateria ----------
function bateria(P, N) {
  const R = {};
  const pct = x => Math.round(100 * x / N);
  const vs = (nome, mkA, mkB, o) => {
    let a = 0, b = 0, t = 0, f = 0, ts = [];
    for (let i = 0; i < N; i++) { const r = duelo(P, mkA, mkB, o); a += r.venceA; b += r.venceB; t += r.turno; f += r.fuga; ts.push(r.turno); }
    ts.sort((x, y) => x - y);
    R[nome] = { A: pct(a), B: pct(b), turnos: +(t / N).toFixed(1), p90: ts[Math.floor(N * .9)], fugaPct: Math.round(100 * f / Math.max(1, a + b)) };
  };
  const F = (tipo, tam, o) => () => ficha(P, tipo, tam, o);
  vs('samurai x ashigaru (média)', F('samurai'), F('ashigaru'));
  vs('ashigaru x camponesa (média)', F('ashigaru'), F('camponesa'));
  vs('samurai x camponesa (média)', F('samurai'), F('camponesa'));
  vs('ashigaru x ashigaru (média)', F('ashigaru'), F('ashigaru'));
  vs('ashigaru grande x ashigaru média', F('ashigaru', 'grande'), F('ashigaru'));
  vs('ashigaru grande x samurai média', F('ashigaru', 'grande'), F('samurai'));
  vs('camponesa massiva x samurai média', F('camponesa', 'massiva'), F('samurai'));
  vs('samurai leão x samurai', F('samurai', 'media', { clan: 'leao' }), F('samurai'));
  vs('samurai caranguejo x samurai', F('samurai', 'media', { clan: 'caranguejo' }), F('samurai'));
  vs('ashigaru c/ líder Battle 3 x ashigaru', F('ashigaru', 'media', { lider: { battle: 3, fogo: 3 } }), F('ashigaru'));
  vs('ataque total x ataque (ashigaru)', F('ashigaru', 'media', { postura: 'ataqueTotal' }), F('ashigaru'));
  vs('cavalaria carga x ashigaru', F('cavalaria', 'media', { lider: { battle: 3, fogo: 3 } }), F('ashigaru'), { carga: true });
  vs('cavalaria carga x ashigaru prontidão+yari', F('cavalaria', 'media', { lider: { battle: 3, fogo: 3 } }), F('ashigaru', 'media', { prontidao: true, yari: true }), { carga: true });
  vs('cavalaria x samurai (sem carga)', F('cavalaria'), F('samurai'));
  vs('arqueiros x ashigaru (corpo a corpo)', F('arqueiros'), F('ashigaru'));
  const pcs = {};
  for (const rank of [2, 4]) for (const tam of ['pequena', 'media', 'grande', 'massiva']) {
    let w = 0, t = 0;
    for (let i = 0; i < N; i++) { const r = pcVsTropa(P, rank, F('ashigaru', tam)); w += r.win; t += r.turno; }
    pcs[`PC R${rank} x ashigaru ${tam}`] = { vitoriaPC: pct(w), turnos: +(t / N).toFixed(1) };
  }
  for (const rank of [2, 4]) {
    let w = 0, t = 0;
    for (let i = 0; i < N; i++) { const r = pcVsTropa(P, rank, F('samurai', 'media')); w += r.win; t += r.turno; }
    pcs[`PC R${rank} x samurai media`] = { vitoriaPC: pct(w), turnos: +(t / N).toFixed(1) };
  }
  return { R, pcs };
}

module.exports = { P0, roll, ficha, duelo, pcVsTropa, bateria, setSeed: s => { seed = s; } };
if (require.main === module) {
  const N = +(process.argv[2] || 4000);
  const P = process.argv[3] ? Object.assign(JSON.parse(JSON.stringify(P0)), JSON.parse(require('fs').readFileSync(process.argv[3]))) : P0;
  const { R, pcs } = bateria(P, N);
  console.table(R); console.table(pcs);
}
