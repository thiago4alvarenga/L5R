# Batalha em Massa — Redesign v2

Documento de design pra discussão antes de mexer no `index.html`. Cobre os três eixos que o Thiago pediu pra priorizar: integrar as tropas da família nos rolls, dar escolhas táticas reais no turno, e fazer o resultado da batalha pesar de verdade no reino. Oportunidades Heroicas continuam sorteadas pela tabela por enquanto — vira escolha ativa numa próxima passada.

## 1. O que existe hoje

A aba Batalha em Massa segue o RAW da 4ª edição (lasthaiku.wikidot.com/battle) à risca: cada Turno de Batalha tem um Contest de Generais (d10+bônus de cada lado → família Vencendo/Impasse/Perdendo, o que desloca a coluna da tabela) e depois cada personagem participante rola d10+Água+Perícia Batalha, cai numa faixa da `BATALHA_TABELA` e sofre dados de ferimento + ganha Glória conforme o nível efetivo (Reservas → Fortemente Engajado, ajustado pelo status do exército).

Dois problemas: `TROPA_TIPOS`/`TROPA_ESPEC`/`TROPA_EQUIP` (o exército que o jogador monta e equipa na aba Tropa) não têm nenhum efeito nos números da batalha — é decoração. E a única decisão do jogador a cada turno é escolher o nível de engajamento uma vez; depois disso é só rolar dados.

## 2. Ideia central

As tropas comprometidas numa batalha específica passam a alimentar dois números que já existem no sistema — o bônus do General no Contest e o "nível efetivo" que desloca a coluna da tabela — em vez de criar uma sub-mecânica paralela. E cada personagem, a cada turno, escolhe uma **Ordem de Batalha** além do nível de engajamento: isso é o que dá a sensação de decisão tática, turno a turno, não só "estou Engajado ou Fortemente Engajado".

Baixas de tropa passam a acontecer (unidade vira Ferida ou Derrotada), o que **já** mexe nos atributos da família — `tropaMod()`/`fortunaTropa()` somam os modificadores de `TROPA_ESTADO` no total. Ou seja, perder tropa numa batalha já rebaixa Domínio/Autoridade/Vazio da família automaticamente, sem precisar inventar um sistema de consequência novo — só precisamos gerar essas baixas.

## 3. Comprometer tropas na batalha

Novo campo em `S.batalhaAtual`: `tropasComprometidas` (array de ids de `S.tropas`). Um toggle na UI (igual ao `toggleParticipante` que já existe pros personagens) marca quais unidades de tropa estão nessa batalha específica — a família pode ter tropa de guarnição em outro lugar, só a comprometida conta.

```js
function toggleTropaBatalha(tropaId){
  const list = S.batalhaAtual.tropasComprometidas;
  const i = list.indexOf(tropaId);
  if(i>=0) list.splice(i,1); else list.push(tropaId);
}
```

## 4. Perfil do exército comprometido

Reaproveita `tropaLinhaCalc(t)` (já calcula força/disciplina/custo por unidade) pras unidades marcadas.

**Força média** (`forcaMediaExercito`): média de `forca` das unidades comprometidas.
- < 40 → **forçaShift +1** (exército fraco não segura a pressão, personagens ficam mais expostos)
- 40–49 → forçaShift 0
- ≥ 50 → **forçaShift −1** (massa de tropa absorve parte do combate)

**Disciplina média** (`disciplinaMediaExercito`): média de `disciplina` das unidades comprometidas.
- < 25 → **modGeneral −1**
- 25–34 → modGeneral 0
- ≥ 35 → **modGeneral +1**

Sem tropa comprometida, os dois modificadores ficam 0 — batalhas antigas (ou "personagens sozinhos numa escaramuça") continuam rodando exatamente como hoje, RAW puro. Isso é o ponto de compatibilidade: nada quebra pra quem não usa a integração.

**Equipamento** (efeito direto, sem precisar de outra tabela):
- Maioria das unidades comprometidas com `suprimentos` (Suprimentos Médicos) → −1 dado de ferimento por personagem por turno (mínimo 0).
- Maioria com `bagagem` (Trem de Bagagem) → −1 no resultado do teste de baixa de tropa (ver §6), sustento reduz o desgaste.

## 5. Nível efetivo revisado

Fórmula atual: `nivelEfetivo = clamp(engajamentoIdx + statusShift, 0, 5)`.

Nova fórmula, somando força do exército e a Ordem de Batalha escolhida (§5.1):

```
nivelEfetivo = clamp(engajamentoIdx + statusShift + forcaShift + ordemNivelDelta, 0, 5)
```

### 5.1 Ordens de Batalha

Cada personagem participante escolhe uma ordem a cada turno (novo campo `ordemId` no objeto `participante`, default `"manter"` — mesma postura seguro que o comportamento atual). Substitui a escolha única e estática de engajamento por uma decisão que se repete e importa a cada turno.

| Ordem | Efeito | Trade-off |
|---|---|---|
| **Avançar** | nivelDelta +1, +1 Glória se algo especial sair na coluna | Mais perigo, mais recompensa |
| **Manter Posição** | nivelDelta 0, −1 dado de ferimento (mín. 0) | Postura defensiva, ganho pequeno e seguro |
| **Flanquear** | Só funciona se `status === "vencendo"`: +2 no bônus do General no *próximo* turno. Se a família não estiver vencendo, a manobra falha e vira nivelDelta +1 sem bônus nenhum | Alto risco quando mais precisa, grátis quando já está indo bem |
| **Focar no General Inimigo** | nivelDelta +2, força o resultado `especial` da coluna pra `"duelo"` se ele não for `"heroica"`, +2 Glória | Caça o duelo de propósito, mas é a ordem mais exposta |
| **Recuar pras Reservas** | nivelDelta −2 (não gera Glória neste turno), −1 no bônus do General no próximo turno | Seguro pro personagem, custa o momento da batalha |

Isso dá cinco leituras táticas diferentes por turno — arriscar pelo general, segurar a linha, tentar a manobra condicional, caçar o duelo, ou proteger o personagem à custa do avanço geral — em vez de uma escolha estática de engajamento.

### 5.2 Postura de Combate (as Stances da 4ª edição, aplicadas à Batalha em Massa)

A Ordem de Batalha (§5.1) é a decisão de comando — o que o personagem tenta fazer nesse turno. A Postura é um eixo independente por cima disso: como ele luta, pessoalmente, dentro dessa ordem. É a mesma lógica das cinco Stances de combate pessoal da 4ª edição (Ataque / Ataque Total / Defesa / Defesa Total / Centro — fonte: [magicalsamurai.wikidot.com/stances](http://magicalsamurai.wikidot.com/stances)), só que reaproveitada na escala de Turno de Batalha em vez de Turno de combate individual. Dois eixos de escolha por turno (Ordem × Postura) em vez de um só é o que dá a sensação de tática de verdade, turno a turno.

Novo campo no `participante`: `posturaId` (default `"ataque"` — o comportamento de hoje, sem modificador).

| Postura | Na 4e (pessoal) | Efeito na Batalha em Massa |
|---|---|---|
| **Ataque** | postura padrão, qualquer ação | Sem modificador — igual ao comportamento atual |
| **Ataque Total** | +2k1 no ataque, Armadura TN −10 | +2 no total do roll de Batalha (d10+Água+Batalha+2), mas +1 dado de ferimento nesse turno — mais dano causado, mais exposto |
| **Defesa** | Armadura TN += Ar + Perícia Defesa, não ataca | −1 no total do roll, −1 dado de ferimento (mín. 0) — troca ofensiva por sobrevivência |
| **Defesa Total** | Ação Complexa, TN += metade de Defesa/Reflexos, só Ações Livres no turno | Não rola pra Glória nesse turno (mantém os ferimentos da coluna, mas Glória do resultado fica 0), −2 dados de ferimento (mín. 0) — abre mão do turno pra sobreviver de verdade |
| **Centro** | sem ação nesse turno, +10 Iniciativa e 1k1+Vazio no round seguinte | Não rola nesse turno, mas o total do turno *seguinte* ganha +Vazio do personagem — represa a energia pra um momento melhor |

Ataque Total não pode ser combinado com a Ordem "Recuar pras Reservas" (contradição temática — ou o personagem está pressionando com tudo, ou está saindo da briga).

## 6. Baixas de tropa

Ao final de cada Turno de Batalha (depois de resolver os personagens), cada unidade em `tropasComprometidas` faz um teste de resistência:

```
d10 + statusMod + disciplinaMod + equipMod
```

- `statusMod`: +2 se família Vencendo, 0 Impasse, −2 Perdendo
- `disciplinaMod`: +1 se disciplina da unidade ≥ 35, −1 se < 25
- `equipMod`: +1 se a unidade tem `armaduras` ou `disciplinado`; −1 se tem `bagagem` faltando quando a batalha já passou de 3 turnos (desgaste de suprimento — opcional, pode ficar de fora da v1 se complicar demais)

Resultado:
- **≤ 2** → unidade sofre baixas severas, `estado` vira `"derrotado"`
- **3–5** → unidade fica `"ferido"` (se já estava ferida, vira `"derrotado"`)
- **6+** → aguenta o turno, sem mudança

Como `TROPA_ESTADO.ferido` e `TROPA_ESTADO.derrotado` já carregam penalidades de Domínio/Autoridade/Vazio/Fortuna que entram em `totalAttr()`, isso é o gancho que faz a batalha doer de verdade no reino sem inventar mecânica nova — é só disparar a degradação de estado que o sistema de Tropa já sabe interpretar.

## 7. Bônus do General — cálculo sugerido

`generalProprioBonus` continua editável manualmente (o Mestre sempre pode ajustar por terreno, surpresa, moral etc.), mas ganha um botão "recalcular" que sugere:

```
sugestao = BattleSkill(general) + Água(general) + modGeneral(disciplina do exército)
```

Novo campo `S.batalhaAtual.generalId`: personagem escolhido como General pra esse cálculo (opcional — sem general escolhido, o campo continua 100% manual como hoje).

## 8. Consequências pós-batalha

Ao encerrar (`encerrarBatalha`), o Mestre define `resultado` (Vitória / Derrota / Empate — com sugestão automática contando quantos turnos do log ficaram "vencendo" vs. "perdendo"). Isso gera automaticamente uma entrada em Conquistas (reaproveitando a estrutura que já existe: `{titulo, itens:[{attr,delta}]}`), editável antes de confirmar:

| Resultado | Sugestão de itens |
|---|---|
| Vitória | Influência +2, Autoridade +1 |
| Derrota | Domínio −2, Autoridade −1 |
| Empate (pirro) | Autoridade +1, Vazio −1 |

**Essas magnitudes são chute de design, não calibração** — igual todo sistema novo do projeto, ajustar depois com playtest ou com o harness de simulação Node se o Thiago achar que os números estão fora da curva.

## 9. Fortificações e Cerco

A 5ª edição tem uma mecânica de objetivos estratégicos pra batalha em massa (`Intrigue and Mass Combat Objectives`, seção "Fortifications" + "Capture a Position") pensada exatamente pra invasão de fortalezas e castelos — o Thiago pediu pra trazer isso pro sistema, porque a família também tem território fortificado (Domínio) que pode ser alvo ou base de operação. A 5e usa "momentum" e "attrition", que não existem no nosso sistema baseado em d10+Água+Perícia — a tradução abaixo reaproveita os números que a Batalha em Massa já tem, igual fizemos com as Ordens.

### 9.1 A fortificação como parte da batalha

Novo campo em `S.batalhaAtual`: `fortificacao` — `null` ou um objeto `{tipo, ocupante, pontosCerco}`, onde `tipo` é uma das quatro faixas abaixo (direto da tabela da 5e, só renomeada) e `ocupante` é `"propria"` | `"inimiga"` | `null`.

| Tipo | Redução de ferimentos pra quem defende | Dificuldade de Cerco (pontos) |
|---|---|---|
| Terreno Defensivo (mata, elevação) | −1 dado de ferimento | 8 |
| Posto Avançado | −2 dados de ferimento | 14 |
| Forte | −3 dados de ferimento | 20 |
| Castelo | −4 dados de ferimento | 30 |

A redução de ferimentos entra no cálculo de `rolarBatalhaPersonagem` de quem está do lado que **ocupa** a fortificação (mínimo 0, depois de aplicar os outros modificadores de Postura). Só um lado ocupa por vez — igual na 5e ("only a single cohort can occupy a fortification").

As Dificuldades de Cerco (8/14/20/30) são uma escala nova, não uma tradução literal dos números da 5e (lá são 4/6/8/12, mas o "momentum" de lá acumula bem mais devagar que os totais de d10+Água+Batalha daqui) — **chute de design proporcional, calibrar com playtest**.

### 9.2 Nova Ordem de Batalha: Assaltar Fortificação

Só aparece como opção quando `fortificacao` existe e `ocupante !== "propria"`. Efeito: nivelDelta +2 (é a ordem mais exposta, equivalente a atacar direto uma posição preparada), e o **total do roll de Batalha** desse personagem nesse turno (d10+Água+Batalha+Postura, o número já calculado antes de olhar a tabela) soma em `S.batalhaAtual.fortificacao.pontosCerco`.

Quando `pontosCerco` atinge a Dificuldade de Cerco do tipo, a posição cai nesse turno: `ocupante` muda pro lado atacante, o personagem que completou o total decisivo ganha +3 Glória (o "golpe que tomou o castelo"), e o general inimigo sofre −3 no bônus do próximo Contest (o equivalente ao "panic" que a 5e aplica ao exército que perde a posição). Reaproveita o mesmo mecanismo de penalidade/bônus temporário no próximo Contest que as Ordens "Flanquear" e "Recuar" já usam (§5.1), não é mecânica nova.

### 9.3 Reforçar uma posição

Espelhando o "Reinforce action" da 5e: se a fortificação está vazia (`ocupante: null`, porque o outro lado recuou ou nunca chegou a ocupar), qualquer personagem em Ordem "Manter Posição" ou "Avançar" pode declarar que está ocupando — `ocupante` vira `"propria"` sem precisar de teste, é só chegar lá primeiro.

## 10. Retirada da Batalha

Diferente da Ordem "Recuar pras Reservas" (§5.1, tática, dura só aquele turno, o personagem continua na batalha), isso é o personagem **saindo de vez** — espelha a regra de "Retreating" da 5e, adaptada pra escala de Honra/Glória da 4e (a 5e usa economia de pontos bem maior, "10 honor / 10 glory", não dá pra portar o número direto).

Uma ação de retirada definitiva custa **−1 Honor Rank** (sai do combate por vontade própria); se alguém testemunhou a retirada, custa também **−1 Glória Rank**. Se quem se retira é o `generalId` da batalha, a família sofre o mesmo −3 no próximo Contest de Generais usado em §9.2 (o exército fica sem comando por um momento). Se a retirada foi uma ordem do daimyo/superior (não escolha do jogador), o custo muda: ao invés de perder Honra/Glória, o personagem **arrisca** 1 Honor Rank + 1 Glória Rank contra completar a tarefa alternativa que foi mandado fazer — só perde se falhar nela.

Magnitudes de novo marcadas como ponto de partida, não calibração.

## 11. Mudanças de estrutura de dados (resumo pra implementação)

```
S.batalhaAtual: {
  ...campos atuais,
  tropasComprometidas: [],      // novo — ids de S.tropas
  generalId: null,              // novo — personagemId opcional
  resultado: null,              // novo — null | "vitoria" | "derrota" | "empate", setado ao encerrar
  fortificacao: null,           // novo — null | {tipo, ocupante, pontosCerco}  (§9)
  participantes: [{
    personagemId, engajamentoIdx,
    ordemId: "manter",          // novo campo (§5.1)
    posturaId: "ataque"         // novo campo (§5.2)
  }]
}
```

Migração: saves antigos não têm esses campos — tratar como os padrões já usados no projeto (`if(!b.tropasComprometidas)b.tropasComprometidas=[]`, etc.) na leitura. Nenhuma tropa comprometida = todos os modificadores novos ficam 0 = comportamento idêntico ao atual. Sem `fortificacao`, a Ordem "Assaltar Fortificação" simplesmente não aparece como opção — batalhas de campo aberto não mudam em nada.

## 12. Fora do escopo desta passada

- Oportunidades Heroicas como escolha ativa do jogador (hoje sorteadas pela tabela) — próxima iteração.
- Regras específicas de batalha naval.
- Calibração fina dos limiares de força/disciplina, das Dificuldades de Cerco e das magnitudes pós-batalha/retirada.

## 13. Plano

1. Revisar este documento — ajustar limiares, magnitudes e as 5 Ordens antes de codar.
2. Implementar no `index.html`, testado no harness Node de sempre (extrair `<script>`, `node --check`, mock de DOM/localStorage).
3. Perguntar antes de commitar; commit sem push — Thiago sobe manualmente.
