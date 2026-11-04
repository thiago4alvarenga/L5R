# Atributos da Família — varredura e proposta decimal

Análise para decidir antes de mexer no `index.html`. Os números saem das simulações em `sim/` (`atributos.js`, `base_idade.js`, `teste_familia.js`, `estacoes.js`), que usam os clãs e os eventos reais do app.

---

## 1. O que a varredura encontrou

### Onde cada atributo pesa hoje

| Atributo (Anel) | Funciona como | Usado em |
|---|---|---|
| Domínio (Terra) | pool | terrenos e fortificações, Shoin (fundação), curva de Fortunas em pico e queda |
| Riqueza (Água) | pool | conversões, Encantamentos Protegidos |
| Influência (Ar) | pool | custo dos personagens, Salão (fundação e alunos) |
| Autoridade (Fogo) | pool | tropas, Dojo Bushi (fundação e alunos), curva de Fortunas |
| Vazio | trilha (não gasta) | curva de Fortunas, Dojo (alunos), Equilíbrio Espiritual, Augúrio dos Kami, Honra dos personagens (soma) e Sacrifícios (-5 cada) |

O valor de cada atributo é: base + clã + eventos + conquistas + personagens + conversões + tropas (+ Honra no Vazio). Nos quatro pools, o total é histórico, e o que se gasta é a parte disponível.

### Os atributos já vivem entre 0 e 100

Na criação (7d10 + clã + eventos, 50 mil famílias):

| | p5 | mediana | p95 | máximo | acima de 100 |
|---|---|---|---|---|---|
| Domínio | 31 | 55 | 82 | 121 | 0,35% |
| Riqueza | 28 | 46 | 65 | 97 | 0% |
| Influência | 29 | 47 | 65 | 94 | 0% |
| Autoridade | 28 | 48 | 68 | 99 | 0% |
| Vazio | 29 | 48 | 68 | 104 | 0% |

Pela dezena, quase toda família nasce com **Nível 3 a 6** em cada Anel, a mesma faixa dos Anéis de um personagem. O Domínio fica um Nível acima dos outros porque os eventos dão, em média, +1,7 de Domínio cada (contra +0,1 a +1,1 nos outros).

### As curvas já são tabelas por Nível

`CURVA_X`, que alimenta Fortunas e o Augúrio, muda de valor a cada 10 pontos. Na prática, já é "uma linha por Nível". As exceções são `DOMINIO_X` (degraus de 25 em 25), `DOJO_X` e `EQUILIBRIO_X` (degraus irregulares, calibrados na mão). Tudo isso dá para reescrever como tabela por Nível sem mudar o comportamento.

### O dado de criação apaga a idade da família

Os 7d10 têm desvio de quase 8 pontos por atributo, mais ou menos o mesmo que clã e eventos juntos. Resultado: hoje uma família Recente nasce com mediana 46 e uma Anciã com 49. A idade só muda quantos eventos a família tem, e o dado cobre essa diferença.

### As estações já favorecem quem é rico

Com a regra atual (d10 + Favor das Fortunas), em 3 anos de jogo os 20% de famílias mais fortes ganham, em média, +36 pontos somando os cinco atributos, e os 20% mais fracos ganham +11. É o Favor: família forte tem Favor alto e sobe mais.

---

## 2. Proposta: atributo decimal

- **Valor de 0 a 100.** O que passa de 100 ou desce abaixo de 0 se perde.
- **Nível = a dezena** (0 a 10). Um valor 47 é **Nível 4**, com 7 de 10 rumo ao 5. É o Anel da família.
- **Nos pools**, o Nível vem do **total**. O disponível continua sendo o que se gasta: gastar Autoridade com tropa não derruba o Anel de Fogo da família, só ocupa a capacidade.
- **Na ficha**, cada atributo mostra o valor, o Nível (com os pontos do Anel), a barrinha até o próximo Nível e, nos pools, o disponível.

---

## 3. Criação: base fixa por idade, em vez de dado

A família começa com uma **base igual nos cinco atributos, definida pela idade**. Em cima dela entram o clã e os eventos, que o grupo **escolhe**, com o sorteio continuando como opção.

| Idade | Eventos | Base | Mediana resultante (Domínio / demais) |
|---|---|---|---|
| Recente | 2 | 33 | 43 / 39–41 (Nível 3–4) |
| Jovem | 4 | 36 | 50 / 44–45 (Nível 4) |
| Estabelecida | 6 | 38 | 55 / 46–48 (Nível 4) |
| Antiga | 8 | 41 | 61 / 49–53 (Nível 4–5) |
| Anciã | 10 | 43 | 67 / 52–57 (Nível 5) |

- A Estabelecida fica com a mediana de hoje (48). Assim, o que já foi calibrado contra essa distribuição continua valendo: custo das tropas, Dojo, Equilíbrio e Vazio dos clãs.
- **Opcional:** **10 pontos para distribuir**, no máximo +5 num atributo, para o grupo dar a cara da família além do que o clã e os eventos dizem.
- **A ajustar:** o Domínio fica alto nas famílias antigas porque os eventos puxam Domínio. Ou a base dele começa 5 abaixo, ou os eventos de Domínio encolhem.

Sem o dado, duas famílias do mesmo clã e com os mesmos eventos nascem iguais. A diferença entre elas vem só da história que o grupo escolheu (e dos pontos, se entrarem).

---

## 4. O Teste da Família

Uma rolagem de Anel, como na 4ª edição: **Nível k Nível**, explodindo no 10, contra um TN.

**Chance de passar** (20 mil rolagens por célula):

| Nível | TN 15 | TN 20 | TN 25 | TN 30 | TN 35 |
|---|---|---|---|---|---|
| 2 | 28% | 12% | 4% | 2% | 1% |
| 3 | 66% | 36% | 18% | 9% | 3% |
| 4 | 90% | 69% | 43% | 24% | 12% |
| 5 | 98% | 90% | 71% | 49% | 30% |
| 6 | 100% | 97% | 89% | 73% | 53% |
| 7 | 100% | 100% | 97% | 89% | 75% |

Proposta de TNs: **15 Fácil · 20 Comum · 25 Difícil · 30 Muito Difícil · 35 Heroico**.

**Apoios**, que o Mestre libera conforme a cena:
- **Recursos:** gastar 5 do disponível do pool dá +1k0, até o Nível do Anel. Por exemplo: a família gasta Riqueza para salvar a colheita.
- **Um personagem da família envolvido**, com a perícia certa em 3 ou mais: +1k0. Com 5 ou mais: +1k1.
- **Favor das Fortunas:** continua sendo o que é hoje, Raises grátis no teste.

**Exemplos de uso:**
- Terra para segurar o território numa incursão.
- Água para atravessar uma seca ou uma crise de arroz.
- Ar para conseguir audiência na corte do daimyō.
- Fogo para convocar uma leva de tropas às pressas.
- Vazio para resistir a uma mácula ou a um mau agouro.

---

## 5. O teste nas estações

Se o avanço de estação virar um Teste da Família do Anel que a estação favorece, a forma do TN decide se a campanha concentra ou não. Somando os cinco atributos, em 3 anos (12 estações, 20 mil famílias):

| Regra da estação | Média no começo → no fim | Ganho dos 20% mais fortes | Ganho dos 20% mais fracos |
|---|---|---|---|
| Atual (d10 + Favor) | 245 → 268 | +36 | +11 |
| Teste, TN fixo 25 | 246 → 308 | +82 | +30 |
| Teste com Favor, TN 25 | 246 → 324 | +103 | +34 |
| Teste, TN fixo 30 | 246 → 271 | +54 | -12 |
| **Teste de manutenção: TN = 5 × Nível + 10** | 246 → 249 | +11 | -4 |

(Com a criação por base fixa, os números são parecidos.)

- **TN fixo** deixa os atributos decidirem tudo e concentra: as famílias fortes disparam. Com TN 30, as fracas encolhem.
- **TN de manutenção** cresce com o próprio Nível: casa grande custa mais para manter. O teste passa a considerar o atributo, mas a campanha não disparar para os ricos. A família só cresce de verdade pelo que acontece em jogo (Conquistas, personagens, batalhas).

Recomendo o TN de manutenção. Na escala da estação:
- falhar por 10 ou mais é **presságio ruim** (o atributo cai);
- falhar é **estação comum**;
- passar é **bênção** (sobe 3 a 6);
- passar por 10 ou mais é **favor evidente** (sobe o dobro).

---

## 6. Sistemas derivados, reescritos por Nível

Ficam mais fáceis de ler e quase não mudam o resultado:

| Sistema | Hoje | Por Nível |
|---|---|---|
| Dojo, Salão (alunos por estação) | degraus 30/45/58/68/80/95 | Nível − 3 (mínimo 0, máximo 6) |
| Equilíbrio Espiritual | degraus 30/50/63/78/95 | Nível 0–2: −2 · 3–4: −1 · 5: 0 · 6–7: +1 · 8: +2 · 9–10: +3 |
| Augúrio dos Kami | já por dezena | igual, por Nível |
| Fortunas (curvas de Autoridade, Vazio e Domínio) | Autoridade e Vazio já por dezena; Domínio em degraus de 25 | uma tabela por Nível para cada um, com o mesmo pico e queda do Domínio |

Conferido degrau por degrau: o Dojo em Nível − 3 e o Equilíbrio pela tabela batem com os degraus de hoje em quase toda a faixa. A diferença máxima é de 1 aluno ou 1 Raise, na borda de um Nível. Na implementação, confiro de novo por simulação.

---

## 7. O que muda no resto

- **Custos** (tropas, terrenos, personagens, escolas) continuam em pontos. Gastar 10 é ocupar um Nível de capacidade.
- **Batalha em Massa v7:** a calibração dos custos usou a Autoridade de hoje (mediana 48). Com a Estabelecida mantendo 48, nada muda.
- **Migração das fichas salvas:** o valor de hoje vira o valor decimal; só se corta o que passar de 0 a 100.

---

## 8. Decisões

1. Nível pela dezena do total, com o disponível à parte nos pools: ok?
2. Criação por base fixa por idade, com eventos escolhidos? E com ou sem os 10 pontos para distribuir?
3. Domínio: base 5 abaixo, ou encolher os eventos de Domínio?
4. Teste da Família: Nível k Nível, com os TNs e os apoios propostos?
5. Estação: teste com TN de manutenção (5 × Nível + 10), ou manter o d10 de hoje?
