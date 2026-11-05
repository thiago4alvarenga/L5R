# Revisão dos números (novembro de 2026)

**Aprovado pelo Thiago em 2026-11-05 ("concordo com tudo") e implementado**, inclusive a troca opcional do Bushi e do Cortesão. Ajuste feito na implementação: as faixas do Favor ficaram um pouco mais altas que as da proposta, porque sem a Fortuna negativa das tropas as Fortunas subiram (veja a seção 3). As medições usam 300 famílias sorteadas por idade, com um elenco típico: os personagens da origem com Honra 5 e duas tropas de Ashigaru Médias mobilizadas.

---

## 1. Atributos e eventos

Depois da terra doada, os números estão onde deveriam. Uma Estabelecida tem o maior atributo em torno de 63 (p90 75), e quase nenhuma família chega a 100 na criação. Os clãs somam 40 cada, e os eventos favoráveis e as origens valem cerca de +5 líquido. **Não mexo aqui.**

O que ainda empurra os atributos são duas coisas fora dos eventos: a Honra dos personagens e as tropas.

## 2. Vazio

**O problema.** O Vazio é o único Anel que ainda cresce por fora do investimento. Com o elenco típico, ele sobe de 48 para 66 numa Estabelecida, quase dois Níveis, e vira o maior Anel da família:

- **+10 a +15 da Honra:** a soma da Honra dos personagens entra inteira no Vazio, então quatro personagens com Honra 5 somam +20;
- **+8 das tropas:** cada tropa mobilizada soma Vazio, vezes o tipo (duas Ashigaru, +8);
- **na outra ponta,** tropa derrotada tira até −20 (Cavalaria).

E o Vazio pouco faz na mesa. Ele dá Equilíbrio e Augúrio, que são narrativos, a curva das Fortunas e os alunos do Shoin.

**Proposta**

- **Honra da casa:** o Vazio recebe (média da Honra dos personagens vivos − 5) × 2. Uma casa Garça, com média de Honra 6,5, ganha +3; uma Escorpião, com média 2, perde −6. É a fama da casa, com limite, e não a soma de todo mundo.
- **Tropas fora do Vazio,** a não ser na vergonha: tropa Refém −2 e Derrotada −3, valor fixo, sem o multiplicador. Patrulha, Mobilizada e Ferida não mexem no Vazio.
- **Pontos de Vazio da família:** a cada estação, a família tem tantos Pontos de Vazio quanto o Nível do Vazio. Cada ponto vale +1k1 num Teste da Família ou na tendência de um acontecimento, como o Ponto de Vazio de um personagem. Isso dá ao Vazio um uso que se sente na mesa, e ele continua não sendo um pool gastável.

## 3. Fortuna e Favor

**O problema.** As Fortunas ficam perto de zero (p10 −8, p50 +1, p90 +8). O Favor é 0 em 56% a 83% das famílias e quase nunca chega a +2. As curvas ainda são as da escala antiga, e tropa mobilizada tira Fortuna (duas Ashigaru, −8), o que joga muita família para −1. Além disso, o Favor só vale no Teste da Família.

**Proposta**

- **Novas faixas do Favor:** abaixo de −3 dá −1; de −3 a +4, 0; de +5 a +9, +1; de +10 a +14, +2; 15 ou mais, +3. Medido depois da mudança, numa Estabelecida: −1 em 13%, 0 em 35%, +1 em 33%, +2 em 18%, +3 em 2%. Na Recente, 0 em 58% e +1 em 36%.
- **O Favor vale também na tendência dos acontecimentos** (Raises grátis, ou TN maior se for negativo).
- **Tropa só tira Fortuna** quando está Ferida, Refém ou Derrotada. Mobilizada e em Patrulha não tiram, porque já pagam em Autoridade e Domínio.

## 4. Riqueza: comprar temporários

**O problema.** A Riqueza quase não tem uso. Numa Estabelecida recém-criada ela sobra em torno de 50 de disponível. A conversão de hoje é uma troca permanente (2 de Riqueza por 1 de outro pool, enquanto a linha existir), o que mistura capacidade fixa com compra.

**Proposta: "Comprar com Riqueza".** A família gasta Riqueza e recebe um temporário em outro pool:

- **2 de Riqueza por 1 temporário**, que vale por 1 ano;
- **o custo sai do disponível de Riqueza:** primeiro dos temporários de Riqueza, e o que faltar fica comprometido pelo mesmo ano;
- **mercenários** (Autoridade), **presentes e favores na corte** (Influência), **mão de obra e obras** (Domínio);
- **as conversões entre os outros pools somem.** As que já existirem viram temporários de 1 ano, no mesmo valor.

O atributo continua só com investimento. A Riqueza também segue pagando o investimento de qualquer Anel, pelo dobro.

## 5. Investimento: mais simples de ler

A regra fica a mesma (Nível × 3, Nível estações, um por Anel), mas com uma frase só e uma prévia antes de confirmar:

> **Investir em Domínio +1:** custa 21. Saem 5 dos ganhos temporários (gastos) e 16 ficam presos no disponível por 7 estações. Pronto no Inverno do ano 2.

O botão mostra essa conta, e o medidor mostra "3 de 7 estações".

## 6. Personagens

**Erro encontrado:** um personagem Morto continua custando Influência e dando o efeito do papel (um Bushi Veterano morto ainda soma +5 de Domínio). Correção:

| Estado | Custo em Influência | Efeito do papel e Fortuna do título |
|---|---|---|
| Vivo, Ferido | sim | sim |
| Refém, Ausente | sim (a casa ainda sustenta) | não (ele não está lá) |
| Morto | não | não |

**Feito:** o Bushi soma Autoridade (1, 3, 5) e o Cortesão soma Influência (1, 2, 3). Antes, o Bushi somava Domínio e o Cortesão soma Autoridade. Isso funciona, mas não é óbvio. Uma alternativa mais intuitiva seria o Bushi somar Autoridade (comanda as tropas) e o Cortesão somar Influência, cortando o efeito pela metade para o Cortesão não se pagar sozinho.

## 7. Tropas

Hoje o custo de manter vem multiplicado por tipo e tamanho, nos estados:

| Estado | Autoridade | Domínio | Vazio | Fortuna |
|---|---|---|---|---|
| Patrulha | −1 | 0 | +1 | −1 |
| Mobilizada | −2 | −2 | +2 | −2 |
| Refém | −2 | −2 | −3 | −2 |
| Ferida | −2 | −2 | −2 | −3 |
| Derrotada | 0 | −2 | −5 | 0 |

**Proposta:** Autoridade e Domínio continuam multiplicados (é o custo de manter os homens). Vazio e Fortuna passam a ser fixos por tropa, e só nos estados ruins:

| Estado | Autoridade | Domínio | Vazio | Fortuna |
|---|---|---|---|---|
| Patrulha | −1 | 0 | 0 | 0 |
| Mobilizada | −2 | −2 | 0 | 0 |
| Refém | −2 | −2 | −2 | −1 |
| Ferida | −2 | −2 | 0 | −1 |
| Derrotada | 0 | −2 | −3 | −2 |

## 8. Dojo e escolas

**Erro encontrado:** existem dois "Dojo". A faixa do resumo mostra "Dojo: N alunos por estação" calculado pelo Vazio, mesmo sem escola fundada. As escolas de verdade calculam os alunos pelo Anel delas: Dojo pela Autoridade, Salão pela Influência, Shoin pelo Vazio.

**Proposta:** o resumo passa a mostrar os alunos das escolas fundadas, cada uma pelo seu Anel (Nível − 3, de 0 a 6). Sem escola, mostra "sem escola". Os custos de fundar (15, depois 37 e 75) e de subir de nível (12, 18, 25, 35) ficam como estão.

---

## Decisões

1. Vazio: Honra como média (−5 × 2), tropas fora do Vazio e Pontos de Vazio da família?
2. Fortuna: faixas novas, Favor também nos acontecimentos, tropa só tira Fortuna nos estados ruins?
3. Riqueza: "Comprar com Riqueza" (2 por 1, por 1 ano) no lugar das conversões?
4. Personagens: corrigir Morto, Refém e Ausente; e trocar o efeito do Bushi e do Cortesão?
5. Dojo: um só, pelas escolas fundadas?

---

# Segunda rodada (2026-11-05)

Pedidos do Thiago depois da primeira rodada, já implementados.

## Honra da casa

A Honra deixou de mexer no Vazio e virou um atributo derivado, a **Honra da casa**, na mesma escala da Honra dos personagens (0 a 10). Ela é a média da Honra dos personagens vivos com Honra marcada, mais o ajuste do Mestre (painel A Casa), menos a Honra queimada nos Sacrifícios (cada ponto sacrificado tira 1). Aparece na faixa dos Anéis e no resumo da casa. Não dá bônus automático: é reputação, e o Mestre usa em cortes, alianças e casamentos.

## Vazio: o Anel das rolagens

O atributo Vazio agora só vem de idade, clã, origem, eventos, Conquistas e investimento. O que mexia nele por fora foi para os **Pontos de Vazio da família** (por estação):

- o Nível do Vazio;
- shugenja e monges presentes: +1, +2 ou +3 cada (Jovem, Experiente, Veterano);
- cada vassala espiritual: +1;
- cada tropa Refém ou Derrotada: −1.

Cada ponto vale +1k1 num Teste da Família ou na tendência de um acontecimento.

## Riqueza: tesouro e renda

A Riqueza agora se gasta. Compras, recursos no Teste e investimentos pagos com Riqueza saem do tesouro e baixam o disponível. A **renda de cada estação** repõe o tesouro até ele voltar ao normal:

> renda = Nível da Riqueza + produção das terras (fortuna das características: aldeias, vilas, campos, portos, minas…) + 2 × Favor das Fortunas, vezes a estação: Primavera e Verão ×1, Outono ×2 (colheita), Inverno ×½.

Ganho de Riqueza "até gastar" (dote, saque, boa negociação, o ouro dos Mercadores) entra direto no tesouro e pode passar do normal. Comprar com Riqueza continua a 2 por 1, por um ano, e agora só gasta do tesouro, sem mexer nos temporários.

| Idade | Renda por estação p10 / p50 / p90 | Por ano (mediana) | Riqueza disponível (mediana) |
|---|---|---|---|
| Nascente | 3 / 5 / 6 | ~23 | 44 |
| Estabelecida | 3 / 7 / 13 | ~32 | 50 |
| Milenar | 3 / 9 / 16 | ~41 | 49 |

## Melhorar tropas

A tropa evolui por investimento, no cartão dela ("Melhorar"):

| Melhoria | Leva | Custo |
|---|---|---|
| Treino +1 (até 5) | 1 estação | a diferença no custo da tropa (2 × o Treino novo × tamanho) |
| Tamanho seguinte | 2 estações | a diferença no custo da tropa, que recebe os homens novos |
| +1 num Anel (até +1 por Anel, dois Anéis por tropa) | 2 estações | 30% do recrutamento do tipo × tamanho |

O custo novo já ocupa a Autoridade desde o começo; o efeito vale quando fica pronto. Uma melhoria por tropa de cada vez.

---

# Glória da casa (2026-11-05)

A fama do nome em Rokugan, de 0 a 10, na escala da Glória dos personagens. É separada da Honra: a Honra mede a conduta, a Glória mede o quanto o nome é conhecido.

**Começo.** Toda família samurai começa com pouca Glória: 1 na Nascente, 1,2 na Recente, 1,5 na Jovem, 1,8 na Estabelecida, 2 na Antiga, 2,2 na Anciã e 2,5 na Milenar. A origem e os eventos históricos somam ou tiram:

- **Origens que dão fama:** Ascensão de Herói Local e Linhagem dos Primeiros +1,5; Decreto Imperial, Recompensa Militar e Escolhidos pelos Kami +1; Ramo Elevado, Fundação Religiosa, Casa Caída, Guardiões da Fronteira e União de Duas Casas +0,5. Usurpação, Mercadores e Exilados −0,5.
- **Eventos:** Vitória em Torneio, Glória em Batalha e Defesa Gloriosa +1; Magistrado de Renome, Artesão, Escola Artística, Dojo Renomado, Corte de Inverno, Tradição Marcial, Figura Espiritual, Fortaleza Cedida, Refém de Prestígio, Terras após Conflito e Duelo de Morte +0,5; Corrupção ou Escândalo −1; Derrota Marcante, Herdeiro Desonrado, Ofensa na Corte e Isolamento −0,5; outros, ±0,3.

| Idade | Glória inicial p10 / p50 / p90 | 3 ou mais | 4 ou mais |
|---|---|---|---|
| Nascente | 0,5 / 1,5 / 2,0 | 0% | 0% |
| Recente | 0,7 / 1,7 / 2,7 | 4% | 0% |
| Jovem | 1,0 / 2,2 / 3,2 | 21% | 3% |
| Estabelecida | 1,8 / 2,8 / 4,0 | 47% | 11% |
| Antiga | 1,8 / 3,2 / 4,7 | 64% | 32% |
| Milenar | 2,8 / 4,4 / 5,9 | 87% | 66% |

**Em jogo.**
- Conquistas do Mestre ganham um campo de Glória (pode ser negativo).
- Batalhas: Vitória +0,3, Empate +0,1, Derrota −0,2.
- Acontecimentos: Torneio de verão +0,2, Favor de um daimyō +0,1, Saque +0,1, Intriga na corte −0,2, Deserção −0,1, escalados pelo desfecho.
- **Os samurai puxam a casa, devagar:** a cada estação, cada personagem vivo com Glória 2 ou mais acima da casa soma +0,1 (até +0,3 por estação).
- **Fama se apaga:** no começo de cada ano, −0,1 se a casa não ganhou Glória no ano anterior.
- O Mestre registra feitos à mão no painel A Casa, e marca a casa como **infame** quando a fama vem de feitos vergonhosos.

**Para que serve.**
- **Invocar o nome da casa:** uma vez por sessão, num teste social em que o nome pesa, Raises grátis iguais à Glória ÷ 3 (até 3). Na casa infame, pelo medo.
- Com Glória 5 ou mais, as escolas formam +1 aluno por estação.
- Conceder uma família vassala pede Glória 4 ou mais.
