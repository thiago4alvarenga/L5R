# Família — reequilíbrio de eventos, clãs e idade

Proposta para aprovar antes de mexer no `index.html`. Os números saem de `sim/cria_v2.js` e `sim/proposta_eventos.js`, com os clãs e eventos reais do app.

---

## 1. Pool abaixo do que já está em jogo (sobrecarga)

Nada é descontado sozinho. A tropa que custa 30 continua existindo se a Autoridade cair para 25.

- O disponível pode ficar negativo. A ficha mostra em vermelho: **sobrecarga de 5**.
- Em sobrecarga, aquele pool não compra nada novo.
- No teste de manutenção da estação, o TN sobe +5 a cada 10 de sobrecarga (ou fração). Manter mais do que a casa aguenta custa.
- Se a família falhar no teste estando em sobrecarga, precisa liberar algo daquele pool até sair dela: desmobilizar uma tropa, abrir mão de uma terra, dispensar um personagem. O grupo escolhe o quê.

Assim a perda de poder tem consequência, mas é narrativa e passa pela mesa, sem a ficha apagar coisas.

---

## 2. Eventos

### Regras

- **Favorável:** um atributo principal +9/+10, um secundário +2/+3, um custo −4/−6. Líquido +4 a +7 (média +5,6). Um evento muda um Nível inteiro do Anel principal, e isso é o "impactante". O custo diz o que a família largou para chegar lá.
- **Adverso:** o principal cai −8/−10, a família tira uma lição +6 e um secundário +2. Líquido −2. Dói bastante, mas escolher um adverso não é só prejuízo.
- **Ambíguo** (Rivalidade Juramentada, Usurpação de Terras): ganha muito num lugar e paga mais em outro. Líquido −2.
- **Terra concedida:** o evento dá Domínio igual ao custo cheio do bem: terreno, características e fortificações, do jeito que a ficha soma. A terra chega paga, ocupa esse Domínio, e o resto do evento vale o mesmo que qualquer outro. (Na primeira versão desta proposta eu tinha esquecido as fortificações: o Kyuden da Fortaleza Cedida custa 34, não 7; o Castelo Amaldiçoado, 20; a Figura Espiritual, 24; o Templo, 16.)
- Os principais ficam espalhados pelos cinco Anéis: Influência 8 eventos, Autoridade 7, Riqueza 7, Vazio 7, Domínio 3 (mais as 9 terras).

### Escolha

Com os eventos escolhidos, o grupo pegaria só favoráveis. Regra proposta: **a cada 3 eventos, 1 é adverso ou ambíguo** (Jovem 1, Estabelecida 2, Antiga 2, Anciã 3). Com ela, escolher rende quase o mesmo que sortear:

| Eventos | Só favoráveis | Com a regra | Sorteio |
|---|---|---|---|
| 2 | +11 | +11 | +6 |
| 4 | +22 | +15 | +13 |
| 6 | +34 | +18 | +19 |
| 8 | +45 | +30 | +25 |
| 10 | +56 | +33 | +32 |

(Soma líquida dos cinco atributos, sem contar o Domínio que paga as terras.)

### Tabela (ordenada pelo líquido)

"Livre" é o líquido sem o Domínio que paga a terra. "Terra" é o Domínio a mais que o evento dá, igual ao custo cheio do bem (terreno, características e fortificações). A coluna "Hoje" mostra os modificadores de antes.

| Evento | Hoje (Dom/Riq/Inf/Aut/Vaz) | Proposta, sem a terra (Dom/Riq/Inf/Aut/Vaz) | Livre | Terra (Domínio extra) |
|---|---|---|---|---|
| Fundação por Decreto Imperial | · / · / +4 / · / +4 | · / · / +10 / −6 / +2 | +6 |  |
| Recompensa por Serviço Militar | · / · / · / +4 / +4 | −6 / · / · / +10 / +2 | +6 |  |
| Aliança de Casamento Estratégico | · / +2 / +4 / · / +2 | · / +2 / +9 / · / −5 | +6 |  |
| Ascensão de Herói Local | +2 / · / · / +4 / +2 | · / · / −6 / +9 / +3 | +6 |  |
| Criação para Função Administrativa | · / +2 / +2 / +4 / · | · / +9 / · / +2 / −5 | +6 |  |
| Adoção da Família | · / · / +2 / +4 / +2 | · / · / +9 / +2 / −5 | +6 |  |
| Vitória em Torneio | · / · / +2 / · / +4 | · / · / +2 / −5 / +9 | +6 |  |
| Refém de Prestígio | · / −2 / +2 / · / +2 | · / · / +9 / −5 / +2 | +6 |  |
| Acordo Comercial Duradouro | +6 / +4 / +2 / · / −1 | · / +10 / +2 / · / −6 | +6 | +10 |
| Ascensão de um Artesão Renomado | +2 / +4 / · / · / +2 | · / +9 / +3 / −6 / · | +6 |  |
| Escola Artística ou Estilo Famoso | · / +2 / +4 / · / +2 | · / · / +10 / −6 / +2 | +6 |  |
| Era de Prosperidade | +4 / +6 / · / −2 / · | +2 / +10 / · / −6 / · | +6 |  |
| Glória em Batalha | · / · / · / +4 / +2 | −6 / · / · / +3 / +9 | +6 |  |
| Bênção dos Kami | · / · / · / · / +4 | · / · / −4 / · / +10 | +6 |  |
| Segredo Guardado | · / +2 / +4 / +2 / +4 | · / · / +10 / · / −4 | +6 |  |
| Reforma Interna Bem-Sucedida | +2 / · / +2 / +4 / +2 | · / +9 / −5 / +2 / · | +6 |  |
| Tradição Marcial Distinta | +2 / · / · / +4 / +2 | · / · / −6 / +8 / +4 | +6 |  |
| Ascensão de Figura Espiritual | +10 / −2 / +4 / +2 / +10 | · / −6 / +2 / · / +10 | +6 | +24 |
| Descoberta de Ruínas Ancestrais | +3 / −1 / · / · / +4 | · / −5 / +2 / · / +9 | +6 | +3 |
| Terras Concedidas após Conflito | +6 / +4 / · / −4 / +1 | · / +3 / −6 / +8 / · | +5 | +7 |
| Ramo Elevado de Grande Família | +5 / · / +4 / −2 / +4 | · / · / +8 / −6 / +3 | +5 | +13 |
| Fundação Religiosa ou Profética | · / · / · / +2 / +6 | · / · / · / −5 / +10 | +5 |  |
| Construção de Fortaleza | +8 / −4 / +2 / +4 / · | · / −5 / · / +10 / · | +5 | +16 |
| Magistrado de Renome | · / · / +4 / +4 / +4 | · / · / +9 / −6 / +2 | +5 |  |
| Templo ou Santuário Importante | +6 / · / · / −1 / +4 | · / −5 / · / · / +10 | +5 | +16 |
| Migração em Massa para as Terras | +2 / +2 / · / −4 / · | +9 / +2 / · / −6 / · | +5 |  |
| Herança de um Castelo Amaldiçoado | +9 / · / · / −1 / · | · / · / +2 / +9 / −6 | +5 | +20 |
| Porto Herdado de Aliados Afogados | +6 / +5 / · / · / · | · / +9 / · / · / −4 | +5 | +10 |
| Fortaleza Cedida pelo Clã | +14 / −6 / · / +6 / +4 | · / · / −5 / +8 / +2 | +5 | +34 |
| Descoberta de Recurso Valioso | +11 / +6 / +2 / −2 / · | · / +10 / · / −4 / −2 | +4 | +21 |
| Usurpação ou Apropriação de Terras | +4 / · / −4 / · / −4 | +10 / · / −4 / · / −8 | −2 |  |
| Rivalidade Juramentada | · / · / · / · / −2 | · / · / −6 / +8 / −4 | −2 |  |
| Desastre Natural | −6 / −4 / · / · / +2 | −10 / · / · / +2 / +6 | −2 |  |
| Fome Prolongada | −4 / · / −2 / −2 / · | · / −10 / · / +2 / +6 | −2 |  |
| Corrupção ou Escândalo | · / · / −4 / · / −8 | · / +2 / +6 / · / −10 | −2 |  |
| Derrota Marcante | · / · / · / −4 / −2 | · / · / +2 / −10 / +6 | −2 |  |
| Contato com as Terras Sombrias | · / · / · / +2 / −6 | +2 / · / · / +6 / −10 | −2 |  |
| Intervenção de um Grande Senhor | · / · / −2 / · / −2 | · / · / −10 / +6 / +2 | −2 |  |
| Guerra Prolongada | −6 / −2 / −2 / −2 / · | · / −10 / · / +6 / +2 | −2 |  |
| Revolta Camponesa | −4 / −2 / · / −2 / −2 | −10 / · / +2 / +6 / · | −2 |  |
| Isolamento Deliberado | · / −4 / −4 / +2 / · | +2 / · / −10 / · / +6 | −2 |  |
| Decadência Administrativa | −2 / −4 / −2 / −4 / −2 | · / +2 / +6 / −10 / · | −2 |  |
| Perda de Território | −8 / −2 / · / −4 / −2 | −10 / · / · / +6 / +2 | −2 |  |
| Reconstrução Pós-Guerra | +2 / · / · / −2 / +2 | −8 / · / · / +4 / +2 | −2 |  |

---

## 3. Clãs

Os clãs estão equilibrados dentro de cada nível: os maiores somam +40, os menores +25. Sobram duas coisas:

- **Família Imperial soma 0**, mais fraca que qualquer clã menor. Proposta: **Domínio 0, Riqueza +8, Influência +20, Autoridade +2, Vazio +10** (soma +40, igual a um clã maior). Pouca terra e pouca espada, muito nome e muito céu.
- **O Vazio dos clãs é baixo** (média +3, contra +5 a +7 nos outros). Não mexi: os eventos novos dão um pouco mais de Vazio para compensar, e a Honra dos personagens entra no Vazio depois.

---

## 4. Base por idade, sem dado

Base igual nos cinco atributos, como num personagem, que sobe com a idade, mais um perfil:

| Idade | Eventos | Base | Perfil | Dom / Riq / Inf / Aut / Vaz |
|---|---|---|---|---|
| Recente | 2 | 34 | ambição: Fogo e Água à frente | 32 / 36 / 32 / 38 / 32 |
| Jovem | 4 | 35 | idem, mais leve | 32 / 36 / 34 / 37 / 34 |
| Estabelecida | 6 | 37 | neutro | 32 / 37 / 37 / 37 / 37 |
| Antiga | 8 | 38 | tradição: Ar e Vazio à frente | 31 / 36 / 40 / 36 / 40 |
| Anciã | 10 | 39 | idem, mais forte | 30 / 36 / 42 / 36 / 42 |

Família nova cresceu pela espada e pelo comércio: tem Autoridade e Riqueza, falta nome e ancestrais. Família velha tem rede de alianças, ancestrais e kami do lado, e a ambição esfriou. O Domínio da base desconta com a idade porque a terra das famílias velhas chega pelos eventos, com o custo cheio.

Depois disso, **10 pontos para distribuir**, no máximo +5 num atributo. *(Removidos em 2026-11-04: a Riqueza e os investimentos fazem esse papel. As fichas antigas guardaram os pontos no ajuste.)*

---

## 5. Resultado na criação

Base + perfil + clã + eventos (30 mil famílias, eventos sorteados; com a regra de escolha dá quase igual). Sem os 10 pontos. Formato p10 / mediana / p90:

| Idade | Domínio | Riqueza | Influência | Autoridade | Vazio | Soma |
|---|---|---|---|---|---|---|
| Recente | 27/44/66 | 34/44/56 | 26/40/51 | 33/47/61 | 26/38/48 | 198/214/237 |
| Jovem | 29/51/78 | 33/46/61 | 28/43/58 | 31/48/64 | 27/42/56 | 206/230/260 |
| Estabelecida | 32/58/89 | 34/49/65 | 30/48/65 | 30/49/68 | 30/47/64 | 224/251/285 |
| Antiga | 34/64/98 | 33/50/67 | 33/53/72 | 29/50/71 | 34/53/71 | 237/269/305 |
| Anciã | 38/70/100 | 33/51/70 | 36/57/77 | 29/52/74 | 36/57/77 | 252/286/325 |

Antes, com o 7d10, a Estabelecida somava 208/246/282 e a Anciã 219/261/302.

- Os quatro Anéis fora a Terra ficam onde estavam (mediana 47 a 49 na Estabelecida). Custo das tropas, Dojo e Equilíbrio continuam valendo.
- O Domínio é o Anel que mais varia, e varia pela história: quem pegou um Kyuden ou uma mina tem Terra alta, toda ocupada pela terra. Quem não pegou terra fica com Domínio baixo e disponível.
- A idade agora pesa: da Recente à Anciã, a soma mediana vai de 214 a 286.
- A diferença dentro de uma idade vem do clã e da história que o grupo escolheu.

---

## 6. Implementação (feita no index.html, sem push)

- Valor 0–100, Nível pela dezena, barrinha até o próximo Nível, disponível nos pools.
- Criação: base da idade, 10 pontos com + e −, eventos com a regra de 1 adverso a cada 3. O 7d10 saiu; o sorteio da família inteira continua (clã, pontos e eventos).
- Teste da Família no painel de Atributos: Anel, TN, gasto de recursos, personagem de apoio e Favor.
- Estação: teste de manutenção (TN 5 × Nível + 10). O Inverno passou a testar Influência também (corte de inverno); antes nenhuma estação mexia no Ar.
- Sobrecarga: disponível negativo em vermelho, bloqueia terra, personagem e tropa nova, +5 de TN na manutenção, aviso de liberar se falhar.
- Dojo e Salão em Nível − 3; Equilíbrio por Nível; a curva de Domínio das Fortunas virou tabela por Nível, com pico em 5–6 e queda a partir do 9 (com o teto de 100, a queda antiga nunca aconteceria).
- Fichas antigas: o total de cada atributo continua igual. A diferença da conta nova fica no campo "Ajuste" (passe o mouse no atributo). Conferido em 40 fichas sorteadas pelo código antigo.


