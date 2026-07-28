# Batalha em Massa — Redesign v2 (+ adendo v3)

Documento de design pra discussão antes de mexer no `index.html`. Cobre os três eixos que o Thiago pediu pra priorizar: integrar as tropas da família nos rolls, dar escolhas táticas reais no turno, e fazer o resultado da batalha pesar de verdade no reino. Oportunidades Heroicas continuam sorteadas pela tabela por enquanto — vira escolha ativa numa próxima passada.

**A v2 (§1-11) já está implementada e commitada.** O adendo v3 (§12 em diante) cobre a rodada seguinte de pedidos, depois de jogar com a v2: tropas inimigas de verdade, um tabuleiro visual pras raias de engajamento (inspirado em Shogi), rolagem opcional na mesa em vez do app, e Postura de Combate migrando de "por personagem" pra "por tropa", testada por Batalha contra a Moral da batalha. Ainda é só proposta — não implementado.

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

## 12. Tropas Inimigas

Hoje o "inimigo" só existe como dois números soltos (`generalInimigoBonus` e o campo texto `inimigo`). Novo array em `S.batalhaAtual.tropasInimigas` — diferente de `S.tropas` (que é o exército permanente da família, cadastrado na aba Família), as tropas inimigas são ad-hoc, criadas pelo Mestre só pra aquela batalha e descartadas ao encerrar.

```
{id, nome, tipo: "camponesa"|"ashigaru"|"samurai", estado: "mobilizado"|"ferido"|"derrotado", raia: 0-3, postura: "ataque"|...}
```

Reaproveita `TROPA_TIPOS` pra força/disciplina base e `TROPA_ESTADO`/`POSTURAS_BATALHA` como já existem — só que sem os efeitos de `TROPA_ESTADO` nos atributos da família (isso só faz sentido pro próprio lado). O Mestre adiciona quantas unidades inimigas quiser antes de rodar o primeiro turno, dá um nome livre pra cada uma (ex.: "Ashigaru da vanguarda Escorpião").

## 13. Tabuleiro (raias de engajamento, estilo Shogi)

Substituição visual da escolha de engajamento por dropdown: um tabuleiro simples de 4 fileiras (Reservas → Fortemente Engajado), com um lado pra cada exército, onde cada token (tropa da família, tropa inimiga, personagem participante) aparece na fileira que representa seu nível de engajamento atual. Clicar num token avança ele uma fileira (cicla de volta pra Reservas depois de Fortemente Engajado) — sem drag-and-drop, sem grade de colunas/flancos, só a profundidade que já existe hoje (`engajamentoIdx`/nova `raia`) ficando visual em vez de um `<select>`. Não muda nenhuma matemática — é o mesmo número, só mais fácil de ler de relance quem está onde.

## 14. Modo de Rolagem: App ou Mesa

Novo campo `S.batalhaAtual.modoRolagem`, escolhido uma vez ao iniciar a batalha: `"app"` (comportamento atual — o app rola os dados) ou `"mesa"` (o grupo rola fisicamente e o Mestre só registra o resultado).

No modo Mesa, o botão "Rodar Tabela de Batalha" some; no lugar, cada participante (personagem ou tropa) ganha campos de input — dano e Glória — e um seletor Nenhum/Duelo/Oportunidade Heroica, com um botão "confirmar turno" que aplica exatamente os mesmos efeitos que o roll automático aplicaria (soma em `danoAtual`/`gloriaRank`, dispara a referência de Oportunidade Heroica se marcado, entra no log). O Contest de Generais pode continuar sendo rolado no app mesmo em modo Mesa (é rápido e não atrapalha o ritmo de mesa) ou também ser inserido manualmente — deixar os dois botões visíveis e o Mestre escolhe na hora.

## 15. Moral da Batalha

Novo número persistente em `S.batalhaAtual.moral` (começa em 10, a metade da escala 0-20). A cada Contest de Generais, a Moral se desloca pela diferença do contest daquele turno: `moral = clamp(moral + round(dif/2), 0, 20)`. Diferente do `status` (Vencendo/Impasse/Perdendo, que é só o turno atual), a Moral **acumula** — uma família que vem ganhando contest após contest sobe a Moral turno a turno; uma que vem perdendo desce, e é mais difícil de recuperar rápido. É a "dificuldade da batalha" que o Thiago pediu, derivada do que já existe (o `dif` do Contest) em vez de um número novo desconectado do resto do sistema.

## 16. Postura por Tropa (não mais por personagem), testada por Batalha contra a Moral

Muda de eixo: Postura de Combate deixa de ser escolha do personagem (`participante.posturaId`) e passa a ser propriedade de cada **tropa** — tanto as da família (`S.batalhaAtual.posturasTropa`, um mapa `{tropaId: posturaId}`, já que `S.tropas` é o cadastro permanente e não deve guardar estado de uma batalha específica) quanto as inimigas (`postura` direto no objeto, já que essas só existem dentro da batalha).

Cada tropa pode ter um `comandanteId` (um personagem participante designado pra comandá-la). Só quem comanda uma tropa pode tentar mudar a Postura dela num turno, e a mudança exige um teste: **d10 + Água + Batalha do comandante contra TN = Moral da Batalha atual** (§15). Sucesso muda a Postura da tropa pro que o jogador quis; falha mantém a Postura do turno anterior, sem penalidade extra — simples de arbitrar rápido, mas com risco real embutido (numa batalha que está indo mal, a Moral sobe e fica mais difícil impor uma nova ordem às tropas, o que é exatamente a tensão que o Thiago não quer perder).

Tropa sem `comandanteId` fica travada na Postura "Ataque" (a neutra) — ninguém dando ordem específica pra ela.

**Personagens participantes continuam com Ordem de Batalha e engajamento próprios (§5.1)** — o que muda é que eles não escolhem mais Postura individual; se um personagem está vinculado a uma tropa (`participante.tropaId`), a Postura *daquela tropa* entra no cálculo do roll dele (mesmos modificadores de `totalDelta`/`ferimentoDelta` de antes, só que a origem agora é a tropa, não uma escolha pessoal). Personagem sem tropa vinculada rola sem modificador de Postura (equivalente a "Ataque"). Isso é o que simplifica a ficha de cada jogador (uma escolha a menos por turno) sem tirar o personagem do centro da cena — ele continua arriscando o couro dele mesmo, só que a manobra tática agora é decidida no nível do comando, que é onde devia estar.

## 17. Oportunidades Heroicas continuam sorteadas — e só acontecem com personagens

Confirmando o que já existia: só quem rola contra a `BATALHA_TABELA` (ou seja, personagens participantes) pode puxar `esp:"heroica"` e cair numa Oportunidade Heroica. Confrontos que envolvem só tropa contra tropa (sem nenhum personagem vinculado) resolvem numa checagem de baixas mais simples (igual à de §6, sem tabela de 6 colunas) — não geram Oportunidade Heroica, porque isso é uma coisa que acontece com gente, não com números de tropa. Mantém o que faz a Batalha em Massa ser sobre os personagens, mesmo com a tropa maior entrando na conta.

## 18. Fora do escopo desta passada

- Oportunidades Heroicas como escolha ativa do jogador (hoje sorteadas pela tabela) — próxima iteração.
- Regras específicas de batalha naval.
- Tabuleiro com eixo de flanco (só profundidade por enquanto, ver §13).
- Calibração fina dos limiares de força/disciplina, das Dificuldades de Cerco, da Moral inicial/clamp, e das magnitudes pós-batalha/retirada.

## 19. Plano

1. Revisar este documento (§12-17 são a parte nova, ainda não implementada) — ajustar antes de codar.
2. Implementar no `index.html`, testado no harness Node de sempre (extrair `<script>`, `node --check`, mock de DOM/localStorage).
3. Perguntar antes de commitar; commit sem push — Thiago sobe manualmente.
