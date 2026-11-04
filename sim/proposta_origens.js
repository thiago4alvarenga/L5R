/* Proposta: eventos de origem, eventos novos e mais idades (2026-11).
   d = Domínio, r = Riqueza, i = Influência, a = Autoridade, v = Vazio; terra = Domínio que paga o bem concedido.
   tema: guerra, corte, espirito, terra, comercio. */
module.exports = {
  // 16 origens: toda família tem exatamente uma, sempre o primeiro evento. Líquido +5/+6, como um favorável,
  // para a escolha da origem dar a cara da família sem desequilibrar.
  origens: {
    // as 8 que já existiam e são origem
    fundacao_decreto:      { tema: 'corte',    m: { i: 10, v: 2, a: -6 } },
    recompensa_militar:    { tema: 'guerra',   m: { a: 10, v: 2, d: -6 } },
    ramo_elevado:          { tema: 'corte',    m: { i: 8, v: 3, a: -6, terra: 13 } },
    fundacao_religiosa:    { tema: 'espirito', m: { v: 10, a: -5 } },
    funcao_administrativa: { tema: 'comercio', m: { r: 9, a: 2, v: -5 } },
    adocao_familia:        { tema: 'corte',    m: { i: 9, a: 2, v: -5 } },
    ascensao_heroi:        { tema: 'guerra',   m: { a: 9, v: 3, i: -6 } },
    usurpacao_terras:      { tema: 'terra',    m: { d: 10, a: 3, v: -8 } },   // era ambíguo (−2); como origem, fica +5
    // novas
    mercadores_nome:       { tema: 'comercio', m: { r: 10, i: 2, v: -6 } },
    ronin_elevados:        { tema: 'guerra',   m: { a: 9, d: 2, i: -6 } },
    casa_caida:            { tema: 'espirito', m: { v: 9, i: 2, r: -6 } },
    linhagem_primeiros:    { tema: 'espirito', m: { v: 8, i: 4, a: -6 }, idadeMin: 'antiga' },
    exilados_cla:          { tema: 'comercio', m: { r: 8, a: 3, i: -6 } },
    guardioes_fronteira:   { tema: 'guerra',   m: { a: 8, v: 2, i: -5, terra: 16 } },
    escolhidos_kami:       { tema: 'espirito', m: { v: 9, i: 3, d: -6 } },
    uniao_duas_casas:      { tema: 'corte',    m: { i: 8, r: 3, v: -6 } },
  },
  // eventos novos (os de sempre continuam, menos os 8 que viraram origem)
  novos: {
    // favoráveis (+5/+6)
    rota_comercial_cedida: { tipo: 'favoravel', tema: 'comercio', m: { r: 9, i: 2, v: -6, terra: 13 } },
    dojo_renomado:         { tipo: 'favoravel', tema: 'guerra',   m: { a: 9, v: 2, r: -6 } },
    arquivo_pergaminhos:   { tipo: 'favoravel', tema: 'espirito', m: { v: 8, i: 3, a: -6 } },
    vila_pesqueira:        { tipo: 'favoravel', tema: 'terra',    m: { r: 9, a: 2, i: -6, terra: 14 } },
    corte_inverno:         { tipo: 'favoravel', tema: 'corte',    m: { i: 10, v: 2, r: -6 } },
    defesa_gloriosa:       { tipo: 'favoravel', tema: 'guerra',   m: { a: 9, v: 3, r: -6 } },
    // adversos (−2: o principal cai 10, a lição dá +6, um secundário +2)
    epidemia:              { tipo: 'adverso', tema: 'terra',    m: { d: -10, v: 6, i: 2 } },
    herdeiro_desonrado:    { tipo: 'adverso', tema: 'corte',    m: { v: -10, i: 6, a: 2 } },
    desfalque_tesouro:     { tipo: 'adverso', tema: 'comercio', m: { r: -10, i: 6, a: 2 } },
    traicao_vassalo:       { tipo: 'adverso', tema: 'guerra',   m: { a: -10, i: 6, v: 2 } },
    bandidos_piratas:      { tipo: 'adverso', tema: 'terra',    m: { r: -10, d: 6, a: 2 } },
    incursao_macula:       { tipo: 'adverso', tema: 'espirito', m: { a: -10, v: 6, d: 2 } },
    maldicao_linhagem:     { tipo: 'adverso', tema: 'espirito', m: { v: -10, d: 6, i: 2 } },
    ofensa_corte:          { tipo: 'adverso', tema: 'corte',    m: { i: -10, v: 6, r: 2 } },
    grande_incendio:       { tipo: 'adverso', tema: 'terra',    m: { r: -10, i: 6, v: 2 } },
    divida_senhor:         { tipo: 'adverso', tema: 'comercio', m: { i: -10, r: 6, a: 2 } },
    // ambíguos (−2: ganho grande, custo maior)
    pacto_ronin:           { tipo: 'ambiguo', tema: 'guerra',   m: { a: 8, v: -6, i: -4 } },
    casamento_abaixo:      { tipo: 'ambiguo', tema: 'corte',    m: { r: 8, i: -6, v: -4 } },
    contrabando_gaijin:    { tipo: 'ambiguo', tema: 'comercio', m: { r: 10, v: -8, i: -4 } },
    duelo_morte:           { tipo: 'ambiguo', tema: 'guerra',   m: { v: 8, i: -6, a: -4 } },
    chantagem:             { tipo: 'ambiguo', tema: 'corte',    m: { i: 8, v: -6, r: -4 } },
  },
  // temas dos 36 eventos que ficam
  temas: {
    terras_conflito: 'guerra', alianca_casamento: 'corte', vitoria_torneio: 'guerra', refem_prestigio: 'corte',
    rivalidade_juramentada: 'corte', acordo_comercial: 'comercio', artesao_renomado: 'comercio', escola_artistica: 'corte',
    construcao_fortaleza: 'guerra', desastre_natural: 'terra', fome_prolongada: 'terra', era_prosperidade: 'comercio',
    magistrado_renome: 'corte', corrupcao_escandalo: 'corte', gloria_batalha: 'guerra', derrota_marcante: 'guerra',
    contato_terras_sombrias: 'espirito', bencao_kami: 'espirito', templo_importante: 'espirito', intervencao_senhor: 'corte',
    guerra_prolongada: 'guerra', segredo_guardado: 'corte', reforma_interna: 'comercio', revolta_camponesa: 'terra',
    migracao_massa: 'terra', recurso_valioso: 'comercio', isolamento_deliberado: 'corte', tradicao_marcial: 'guerra',
    decadencia_administrativa: 'comercio', figura_espiritual: 'espirito', perda_territorio: 'terra',
    reconstrucao_pos_guerra: 'terra', heranca_castelo_amaldicoado: 'terra', ruinas_ancestrais_descobertas: 'espirito',
    porto_herdado_afogados: 'comercio', fortaleza_cedida_cla: 'guerra',
  },
  // 7 idades; eventos contam a origem. Adversos mínimos: 1 a cada 3 eventos depois da origem.
  idades: {
    nascente:     { n: 1 },
    recente:      { n: 2 },
    jovem:        { n: 4 },
    estabelecida: { n: 6 },
    antiga:       { n: 8 },
    'anciã':      { n: 10 },
    milenar:      { n: 12 },
  },
};
