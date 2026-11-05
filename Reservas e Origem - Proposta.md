# Disponível, temporários, acontecimentos e samurais da origem

Aprovado pelo Thiago em novembro de 2026 e implementado no `index.html`, com a segunda rodada de ajustes dele (pools nunca mexem no atributo, investimento com prazo, aba Estações). Os números saíram de `sim/reservas_sim.js`, e o catálogo está em `sim/acontecimentos.js` e na constante `ACONTECIMENTOS`.

---

## 1. Atributo, disponível e temporários

**Nomes (ajuste de 2026-11-04):** o que antes se chamava Reserva agora são os **temporários**: ganhos e perdas com prazo que entram na conta do disponível. Na faixa dos Anéis, "livre" virou **disponível**. A conta inteira de cada disponível (atributo, o que está em uso, efeitos de pessoas e trocas, cada temporário com prazo) aparece ao clicar no atributo, em Identidade → Atributos.

**Sem pontos livres na criação:** a família nasce da idade, do clã, da origem e dos eventos. Quem quer crescer usa a Riqueza e os investimentos. Nas fichas que já existiam, o que estava distribuído foi para o ajuste, e o total não mudou. Numa família nova, o Nível médio dos cinco Anéis caiu uns 0,2.

**Atributo (o Anel da família).** É o que a família é: idade, pontos, clã, origem, eventos históricos, Conquistas e investimentos. Dá o Nível, que vale nas rolagens e nos derivados (Dojo, Equilíbrio, Augúrio, Fortunas), e a capacidade permanente de sustentar terras, tropas, personagens e escolas. Só muda por Conquista do Mestre, por investimento ou por algum custo permanente de acontecimento.

Quando o atributo cai (um custo permanente, um ajuste do Mestre), o disponível cai junto, no mesmo valor. Nada some sozinho: se o que a família sustenta passa do novo disponível, ela entra em sobrecarga.

**O pool nunca mexe no atributo.** Nos quatro pools (Domínio, Riqueza, Influência, Autoridade), tudo o que gasta ou ganha no dia a dia mexe só no disponível:

- terras, tropas, personagens, escolas e encantamentos ocupam o disponível;
- a manutenção das tropas (patrulha, mobilizada, ferida…) também;
- o efeito do papel dos personagens (o Bushi soma Domínio, o Cortesão Autoridade) soma no disponível;
- a conversão de recursos tira do disponível de um e põe no de outro;
- a Honra queimada em progresso desonroso dá disponível num pool.

No Vazio, que não tem pool, esses efeitos continuam no atributo.

**Temporários.** São o que a família tem à mão, em lotes com valor, motivo e prazo ("Colheita extraordinária, Riqueza +8 até o fim do Outono do ano 2"). Soma no disponível do pool, mas **não muda o Nível**. Um lote pode ser negativo (uma dívida, a desconfiança dos vizinhos) e aí tira do disponível. Quando um lote vence e algo dependia dele, a família cai em sobrecarga, com a regra de sempre.

O prazo conta em estações: o lote vale nas próximas *d* estações (o resto da estação em que nasceu vem de brinde). "Até gastar" não vence; some quando é gasto.

No **Vazio**, que não é gasto, o lote vale Raises: a graça dos kami. Positiva, dá Raise grátis no sucesso do Teste da Família e do teste da estação, e soma no Equilíbrio. Negativa (um presságio), soma +5 de TN por ponto e tira do Equilíbrio. Fica entre −3 e +3.

Gastar recursos no Teste da Família tira do disponível: primeiro dos ganhos temporários, do que vence antes. O que faltar vira um lote negativo de um ano: o disponível fica comprometido e volta depois. Nunca sai do atributo.

## 2. Acontecimentos da estação

**O jogo não é automático** (ajuste do Thiago, 2026-11-04). O acontecimento abre um gancho de aventura e fica **em aberto** até a história se resolver. Nada é aplicado sozinho.

1. **Abre.** Quando o Mestre avança a estação, a estação que começa traz um acontecimento sorteado do catálogo dela (6 por estação, 24 no total). O Mestre também pode abrir um do catálogo a qualquer hora. Pode haver mais de um aberto ao mesmo tempo, e um que não se resolveu atravessa a estação.
2. **Tendência.** Se o Mestre quiser, rola o Teste da Família com o Anel ligado ao acontecimento: Nível k Nível contra **5 × Nível + 5** (+5 a cada 10 de sobrecarga). O resultado mostra para onde a situação vai, mas não aplica nada.
3. **A aventura.** O que os jogadores fazem sobe ou desce o resultado, um passo por vez: cada sucesso que mexe na situação sobe, cada fracasso desce. Uma anotação curta guarda o que aconteceu.
4. **Desfecho.** O Mestre fecha quando a história terminar. Ele aplica o resultado do teste com as ações dos jogadores, escolhe outro desfecho direto, ou descarta o acontecimento, se ele não aconteceu ou se os jogadores evitaram tudo.

O desfecho vai de Desastre a 4 Raises, e cada efeito escala por ele:

| Desfecho | Efeito bom | Efeito ruim |
|---|---|---|
| Desastre (falhou por 10 ou mais) | nada | 1,5 × |
| Falhou | metade | cheio |
| Passou | cheio | ¾ |
| Cada Raise | +¼, até o dobro | −¼; com 3, anulado |

Um acontecimento pode ter os dois lados, e cada lado escala pela sua regra: no Empréstimo, quem negocia bem leva mais dinheiro e paga menos juros. Se o desfecho for de falha e a família estiver em sobrecarga no Anel ligado, ela precisa liberar algo daquele pool. O lote nasce quando o Mestre aplica: vale no resto da estação e nas próximas *d*.

O TN de 5 × Nível + 5 foi medido sem as ações dos jogadores: uma casa de Nível 4 a 6 passa mais ou menos metade das vezes. Contra 5 × Nível + 10, passava um quarto, e os acontecimentos bons quase sempre saíam pela metade.

Tudo isso fica na aba **Estações**: os acontecimentos em aberto, os resolvidos, os temporários, os investimentos e as ferramentas do Mestre (abrir um acontecimento fora do sorteio, criar um lote livre). Na Família, a faixa dos Anéis mostra o disponível (a conta aparece ao passar o mouse), o aviso lembra os acontecimentos em aberto, e o nome da estação abre a aba.

| Estação | Acontecimento | Anel | Efeito cheio |
|---|---|---|---|
| Primavera | Migração esporádica | Domínio | Domínio +8, 2 anos |
| | Leva de camponeses | Domínio | Autoridade +6, 2 estações; Domínio −2, 1 ano |
| | Cheias de primavera | Domínio | Domínio −6 e Riqueza −3, 1 ano |
| | Boa negociação | Riqueza | Riqueza +12, até gastar |
| | Empréstimo de um mercador | Riqueza | Riqueza +15 até gastar; Riqueza −8, 2 anos |
| | Praga nas mudas | Riqueza | Riqueza −8, 1 ano |
| Verão | Alistamento obrigatório | Autoridade | Autoridade +10, 1 ano; Vazio −2 permanente |
| | Mercenários contratados | Autoridade | Autoridade +8, 2 estações; Riqueza −6, 1 ano |
| | Saque de guerra | Autoridade | Riqueza +10 até gastar; Vazio −1 permanente |
| | Bandidos nas estradas | Autoridade | Autoridade −6 e Riqueza −3, 1 ano |
| | Deserção na guarnição | Autoridade | Autoridade −8, 1 ano |
| | Vitória num torneio de verão | Autoridade | Autoridade +6 e Influência +4, 1 ano |
| Outono | Colheita extraordinária | Riqueza | Riqueza +8, 1 ano |
| | Tributo de um vassalo | Influência | Influência +6, 1 ano |
| | Refugiados acolhidos | Domínio | Domínio +6 e Riqueza −3, 1 ano |
| | Feira de outono | Riqueza | Riqueza +6 e Influência +2, 1 ano |
| | Geada precoce | Riqueza | Riqueza −8, 1 ano |
| | Incêndio nos celeiros | Domínio | Domínio −4 e Riqueza −4, 1 ano |
| Inverno | Favor de um daimyō | Influência | Influência +10, 1 ano |
| | Dote de casamento | Influência | Riqueza +8, até gastar |
| | Intriga na corte de inverno | Influência | Influência −8, 1 ano |
| | Graça dos kami | Vazio | +1 Raise, 1 ano |
| | Presságio sombrio | Vazio | −1 Raise, 1 ano |
| | Inverno rigoroso | Domínio | Domínio −4 e Autoridade −4, 1 ano |

## 3. Investir

+1 permanente no atributo custa **o Nível atual × 3** (mínimo 3), pago do **disponível** do próprio Anel, e **fica pronto depois de Nível estações** (mínimo 2). Os ganhos temporários pagam primeiro e se gastam de vez; o que faltar fica **preso no disponível até a obra ficar pronta**, e aí volta. Um investimento por Anel de cada vez. Cada um aparece na aba Estações com um medidor ("3 de 5 estações, pronto no Verão do ano 2"). Cancelar solta o que estava preso e devolve metade do que foi gasto dos temporários.

A **Riqueza é o coringa**: paga o investimento de qualquer Anel pelo dobro, e o dela mesma pelo preço normal. O Vazio não tem disponível, então só cresce via Riqueza (Nível × 6).

Simulação feita quando o investimento só saía dos temporários (a regra de agora, que também usa o disponível, deixa crescer mais rápido quem tem folga nos pools):

| Família | Soma permanente em 5 anos | em 10 anos |
|---|---|---|
| Nível 2 em tudo | +3 | +7 |
| Nível 4 | 0 | +2 |
| Nível 6 | −1 | 0 |

Os custos permanentes de Honra do Alistamento e do Saque comem quase tudo o que uma casa média investe. O atributo só cresce de verdade com Conquista do Mestre; os temporários são o que a família usa no dia a dia.

## 4. O que a origem dá

Oito origens nasceram de dinheiro, favor ou fama, coisas que passam. Nelas, **metade do Anel principal saiu do atributo e volta em dobro como temporário**: 2 anos, ou até gastar quando é dinheiro. Por exemplo, Mercadores que Compraram um Nome tinha Riqueza +10; agora tem +5 no atributo e +10 de Riqueza na reserva, até gastar.

Toda origem dá, **sem custo de Influência**, o daimyō ("Senhor menor, domínio limitado") e dois ou três samurais do tipo que combina com ela. Eles nascem "(a definir)" para o jogador fazer a ficha, e os efeitos do papel valem normalmente (o Bushi Jovem soma +1 de Domínio, o daimyō +1 de Fortuna). Se o Mestre subir o papel de um deles, paga só a diferença.

Trocar a origem tira os que ninguém mexeu. Os que já têm nome ou jogador ficam e passam a custar Influência.

| Origem | Samurais | Além disso |
|---|---|---|
| Fundação por Decreto Imperial | 2 Cortesãos, 1 Bushi | Influência +10 temporário por 2 anos (atributo +5) |
| Recompensa por Serviço Militar | Bushi Experiente, Bushi | Autoridade +10 temporário por 2 anos (atributo +5) |
| Ramo Elevado de Grande Família | Cortesão, Bushi | Vila-Dote (já existia) |
| Fundação Religiosa ou Profética | Monge, Shugenja | |
| Criação para Função Administrativa | 2 Cortesãos | Aldeia de Yakuba-mura; Riqueza +10 temporário por 2 anos (atributo +4) |
| Adoção da Família | Bushi, Cortesão | Influência +10 temporário por 2 anos (atributo +4) |
| Ascensão de Herói Local | 2 Bushi | Autoridade +10 temporário por 2 anos (atributo +4) |
| Usurpação ou Apropriação de Terras | 2 Bushi | Campos de Ubai-no-Hara; Influência −6 por 2 anos |
| Mercadores que Compraram um Nome | Cortesão, Bushi | Riqueza +10 temporário até gastar (atributo +5) |
| Ronin Elevados | 3 Bushi | Autoridade +10 temporário por 2 anos (atributo +4) |
| Sobreviventes de uma Casa Caída | Monge, Bushi | Ruínas de Kuzure-no-Yashiki; Riqueza −6 por 2 anos |
| Linhagem dos Primeiros | Shugenja, Cortesão | |
| Exilados de Outro Clã | Cortesão, Bushi | Influência −6 por 2 anos |
| Guardiões da Fronteira | 2 Bushi | Torre do Passo Esquecido (já existia) |
| Escolhidos pelos Kami | 2 Shugenja | |
| União de Duas Casas | Cortesão, Bushi, Shugenja | Influência +8 temporário por 2 anos (atributo +4) |

As três adversas dão algo bom (terra ou samurais) e cobram um lote negativo. As terras são **doadas**: não mexem no atributo nem ocupam Domínio (ver seção 6).

## 5. Fichas que já existem

- O que as estações antigas somaram no atributo fica no ajuste, onde está.
- A ficha ganha a lista de lotes, vazia.
- Nas três origens que passaram a dar terra, a ficha antiga não recebe a terra, e a diferença no Domínio sai do ajuste: o total não muda.
- Os personagens dados pela origem só valem para origem escolhida daqui em diante.
- Nas oito origens que viraram metade lote, a ficha antiga não recebe o lote; a metade volta ao ajuste e o total não muda.
- Personagem, conversão, Honra queimada e manutenção de tropa passaram para o disponível. O disponível não muda, mas o total e o Nível dos pools podem cair, porque eles deixaram de contar no atributo.

Numa família nova, sorteada, o Nível médio ficou igual (4,0 na Nascente, 4,8 na Estabelecida) e o disponível nos quatro pools subiu uns 3, fora os personagens grátis.

---

## Retratos por tipo de samurai

Os prompts para gerar no Copilot estão em `Prompts de retratos.md`, com o nome de arquivo de cada um.

---

## 6. Terra doada e peso da origem (2026-11-04)

O Thiago sorteou uma família Antiga com Domínio 100: a Fortaleza Cedida pelo Clã somava +34 de Domínio só para pagar o Kyuden que ela dava. Corrigido assim:

- **A terra dada pela história é doada.** Os eventos e origens que concedem terra perderam o Domínio que pagava por ela (a Fortaleza Cedida ficou com Inf −5, Aut +8, Vaz +2), e a terra não ocupa Domínio. Se o Mestre acrescentar algo nela depois, só o acréscimo ocupa.
- **O Domínio da idade ficou quase plano** (33 na Nascente, 31 na Milenar), porque ele caía com a idade só para compensar a terra paga.
- **A origem pesa mais nas casas novas:** ×2 na Nascente, ×1,5 na Recente, ×1,25 na Jovem. Uma casa nova ainda é quase só a história da fundação, e os Anéis dela se separam mais.

| Idade | Domínio p50 / p90, antes | depois | Algum atributo ≥ 80, antes | depois | Algum = 100, antes | depois |
|---|---|---|---|---|---|---|
| Nascente | 43 / 57 | 38 / 53 | 0% | 0% | 0% | 0% |
| Estabelecida | 58 / 88 | 38 / 52 | 20% | 5% | 4% | 0% |
| Antiga | 59 / 90 | 37 / 52 | 27% | 8% | 5% | 0% |
| Milenar | 68 / 105 | 36 / 51 | 53% | 25% | 16% | 2% |

Nas fichas que já existiam: a terra de evento vira doada (o disponível fica igual; o total de Domínio cai o que a terra custava), e o peso da origem não muda nada nelas (a diferença vai para o ajuste).
