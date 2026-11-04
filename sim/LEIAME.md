# Simulador da Batalha em Massa v7

Calibração do `Batalha em Massa - Modelo v7.md`. Precisa só de Node.

- `node batalha_v7_sim.js 4000 final.json` roda a bateria de lutas com os parâmetros finais (4000 lutas por linha).
- `node variantes.js final.json '{"nome":{"armadura.pesada":8}}'` testa uma mudança contra os parâmetros finais.
- `node testa_pc.js '{...}'` testa tabelas de personagem contra tropa.
- `node custos.js` mede a Autoridade das famílias do app e quanto cada tropa compromete. `dados_app.js` é extraído do `index.html` (CLAS e EVENTOS); gere de novo se esses dados mudarem.
- `calibra.js`, `refina.js`, `refina_pc.js` e `grade_pc.js` são as buscas usadas na calibração, com as metas no começo de cada arquivo.

Todo número de design fica em `P0` no simulador; `final.json` sobrescreve só o que foi calibrado.
