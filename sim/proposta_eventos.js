/* Proposta de reequilíbrio dos 44 eventos históricos.
   Regras:
   - Favorável: um atributo principal +9/+10, um secundário +2/+3 e um custo -4/-6. Líquido +4 a +7.
   - Adverso: principal -8/-10, uma "lição" +6 e um secundário +2. Líquido -2. Impacta, mas não é só perda.
   - Quem concede terra também dá Domínio igual ao custo TOTAL do bem (terreno + características + fortificações, como terrenoLinhaCalc soma), no campo `terra`: a terra vem paga.
   - Principais distribuídos: Influência 8, Autoridade 7, Riqueza 7, Vazio 7, Domínio 3 (+ as 9 terras).
   d = Domínio, r = Riqueza, i = Influência, a = Autoridade, v = Vazio */
module.exports = {
  // ---------- favoráveis ----------
  fundacao_decreto:            { i: 10, v: 2, a: -6 },
  recompensa_militar:          { a: 10, v: 2, d: -6 },
  figura_espiritual:           { v: 10, i: 2, r: -6, terra: 24 },
  fortaleza_cedida_cla:        { a: 8, v: 2, i: -5, terra: 34 },
  recurso_valioso:             { r: 10, a: -4, v: -2, terra: 21 },
  magistrado_renome:           { i: 9, v: 2, a: -6 },
  segredo_guardado:            { i: 10, v: -4 },
  ramo_elevado:                { i: 8, v: 3, a: -6, terra: 13 },
  acordo_comercial:            { r: 10, i: 2, v: -6, terra: 10 },
  porto_herdado_afogados:      { r: 9, v: -4, terra: 10 },
  construcao_fortaleza:        { a: 10, r: -5, terra: 16 },
  reforma_interna:             { r: 9, a: 2, i: -5 },
  templo_importante:           { v: 10, r: -5, terra: 16 },
  alianca_casamento:           { i: 9, r: 2, v: -5 },
  ascensao_heroi:              { a: 9, v: 3, i: -6 },
  fundacao_religiosa:          { v: 10, a: -5 },
  funcao_administrativa:       { r: 9, a: 2, v: -5 },
  adocao_familia:              { i: 9, a: 2, v: -5 },
  artesao_renomado:            { r: 9, i: 3, a: -6 },
  escola_artistica:            { i: 10, v: 2, a: -6 },
  era_prosperidade:            { r: 10, d: 2, a: -6 },
  tradicao_marcial:            { a: 8, v: 4, i: -6 },
  heranca_castelo_amaldicoado: { a: 9, i: 2, v: -6, terra: 20 },
  terras_conflito:             { a: 8, r: 3, i: -6, terra: 7 },
  vitoria_torneio:             { v: 9, i: 2, a: -5 },
  gloria_batalha:              { v: 9, a: 3, d: -6 },
  ruinas_ancestrais_descobertas: { v: 9, i: 2, r: -5, terra: 3 },
  bencao_kami:                 { v: 10, i: -4 },
  refem_prestigio:             { i: 9, v: 2, a: -5 },
  migracao_massa:              { d: 9, r: 2, a: -6 },
  // ---------- ambíguos (ganham num lugar, pagam caro em outro) ----------
  rivalidade_juramentada:      { a: 8, i: -6, v: -4 },
  usurpacao_terras:            { d: 10, v: -8, i: -4 },
  // ---------- adversos ----------
  reconstrucao_pos_guerra:     { d: -8, a: 4, v: 2 },
  contato_terras_sombrias:     { v: -10, a: 6, d: 2 },
  intervencao_senhor:          { i: -10, a: 6, v: 2 },
  derrota_marcante:            { a: -10, v: 6, i: 2 },
  isolamento_deliberado:       { i: -10, v: 6, d: 2 },
  desastre_natural:            { d: -10, v: 6, a: 2 },
  fome_prolongada:             { r: -10, v: 6, a: 2 },
  revolta_camponesa:           { d: -10, a: 6, i: 2 },
  corrupcao_escandalo:         { v: -10, i: 6, r: 2 },
  guerra_prolongada:           { r: -10, a: 6, v: 2 },
  decadencia_administrativa:   { a: -10, i: 6, r: 2 },
  perda_territorio:            { d: -10, a: 6, v: 2 },
};
