# Batalha em Massa — Modelo v7 (revisão 4, calibrada)

Documento de design para discutir antes de mexer no `index.html`. Substitui o Quadro de Batalha da v6.

A ideia central: **cada tropa é uma unidade com ficha própria, como um personagem**, e **tudo passa pelos Cinco Anéis**: os atributos da tropa são Anéis, as posturas são as cinco da 4ª edição (cada uma ligada a um Anel, como no livro), cada manobra e cada tática pertencem a um Anel e são roladas com ele, e a tropa tem Pontos de Vazio como um personagem. A batalha acontece numa grid na mesa, qualquer uma. O site não tem tabuleiro: guarda as fichas, mostra a condição e os modificadores e tem os botões úteis na hora da guerra.

Os números desta revisão **já passaram por simulação** (seção 15). O simulador está em `sim/` e pode ser rodado de novo sempre que uma regra mudar.

**Mudou na calibração (revisão 4):**
- Fichas padrão novas.
- O ataque ganha **dados de volume** pelo tamanho.
- Armadura leve +3 e pesada +5.
- O clã e a Liderança dão +1k0 em vez de +1 no Anel.
- Na tropa, o Ataque Total vale +1k1 e -5 no TN.
- Carga, Montada e Lanças Firmes passam a dar +1k0.
- A moral é testada a cada golpe recebido, e o TN sobe +3 por nível de dano.
- Tabela nova de personagem contra tropa.
- Massiva custa ×4.

**Decidido até aqui:**
- Sem tabuleiro no site.
- Raise automático nos ataques da tropa.
- Personagem contra tropa bem mais punitivo, piorando com o tamanho.
- Arqueiros e Cavalaria entram como tipos.
- Custos revistos.
- Cerrar Fileiras para juntar tropas feridas.
- Moral que vira deserção antes da fuga.
- Especialidade e manobra de cada clã, inclusive os menores.

**Mudou nesta revisão:**
- O Rikugunshōkan não comanda as unidades. Cada jogador comanda a sua; o comandante influencia pela Tática, pelo Discurso, pela Mudança de Tática (só quando o campo dá motivo) e pela Presença no campo.
- Saem as Ordens.
- Prontidão vira manobra.
- As posturas são só as cinco dos personagens, adaptadas.
- A unidade ganha Pontos de Vazio.
- A ordem do turno passa a ser por Iniciativa, como num combate de personagens.

---

## 1. A ficha da unidade

Uma unidade tem:

- **Os Cinco Anéis**, de 1 a 6 (sem Traços: a unidade só tem o nível do Anel).
- **Treinamento**, de 0 a 5, que funciona como a perícia da unidade e entra em toda rolagem dela.
- **Pontos de Vazio**, iguais ao Vazio da unidade (seção 2).
- **Iniciativa**.
- **Tamanho** e **Homens** (quantos soldados ainda estão de pé).
- **Armadura** e **Equipamento**.
- **Clã de treinamento**.
- **Taisa**: o líder, que normalmente é o personagem de um jogador.
- **Duas trilhas**: Dano e Moral (seção 8).

### O que cada Anel faz na unidade

| Anel | Na unidade | Rolagem |
|---|---|---|
| **Fogo** | Ímpeto: ataque corpo a corpo | (Fogo + Treino + Volume) k Fogo |
| **Ar** | Defesa, tiro e reação: TN, Disparo, Iniciativa | TN = 5 + Ar×5 + Armadura; Disparo e Iniciativa (Ar + Treino) k Ar |
| **Terra** | Aguentar: golpes por nível de dano | Golpes por nível = Terra |
| **Água** | Movimento: casas por turno na grid | Move = Água |
| **Vazio** | Moral, disciplina e Pontos de Vazio | (Vazio + Treino) k Vazio |

### Fichas padrão

| Tipo | Terra | Água | Ar | Fogo | Vazio | Treino | Armadura | Observação |
|---|---|---|---|---|---|---|---|---|
| Camponesa | 2 | 1 | 2 | 2 | 1 | 1 | nenhuma | — |
| Ashigaru | 2 | 2 | 2 | 2 | 2 | 1 | leve | — |
| Arqueiros | 2 | 2 | 3 | 1 | 2 | 1 | leve | Arcos |
| Samurai | 2 | 2 | 2 | 3 | 2 | 1 | pesada | — |
| Cavalaria | 2 | 4 | 2 | 3 | 2 | 1 | leve | Montada |

O Samurai se separa do Ashigaru pelo Fogo e pela armadura pesada; com isso ele vence uma tropa de Ashigaru do mesmo tamanho 89% das vezes. Uma alternativa mais "disciplinada" (Fogo 2, Vazio 3, Treino 2) aparece na seção 15.

- **Arcos:** permite Disparar, alcance 3 + Ar casas.
- **Montada:** +1k0 na Carga (além do +1k0 da própria Carga); não entra em floresta densa, pântano nem fortificação; não pode usar Ataque Total, como no livro ("Full Attack may not be used while mounted"); sofre o bônus de Nagae Yari e de Prontidão contra cavalaria.

### Tamanho e Homens

| Tamanho | Homens | Terra | Fogo | Água | Vazio | Volume |
|---|---|---|---|---|---|---|
| Pequena | 26 a 50 | -1 | 0 | +1 | 0 | +0 |
| Média | 51 a 200 | 0 | 0 | 0 | 0 | +1 |
| Grande | 201 a 600 | 0 | +1 | -1 | 0 | +2 |
| Massiva | 601 a 1.500 | +2 | +1 | -1 | -1 | +3 |

**Volume** são dados rolados a mais no ataque corpo a corpo: muita gente empurrando a lança ao mesmo tempo. Nenhum Anel desce abaixo de 1. A unidade é recrutada com o máximo da faixa. Os **Homens** caem junto com a trilha de dano: cada golpe tira a mesma fração do total. Eles servem para Cerrar Fileiras e para a ficha da família depois da batalha.

### Armadura e equipamento

| Item | Efeito |
|---|---|
| Armadura leve | +3 no TN |
| Armadura pesada | +5 no TN, -1 Água |
| Armaduras Aprimoradas (já existe) | +5 no TN além da armadura |
| Nagae Yari (já existe) | +1k1 para atacar unidade Montada ou que fez Carga neste turno |
| Tetsubishi (já existe) | inimigo que entra na casa à frente perde 1 de Água naquele turno |
| Suprimentos Médicos (já existe) | depois da batalha, a unidade recupera um nível de dano |
| Trem de Bagagem (já existe) | +1k0 em moral nas batalhas com mais de 5 turnos; ignora o desgaste de marcha |
| Arcos (novo) | permite Disparar |

### Taisa e Liderança

O **Taisa** é quem lidera a unidade: o personagem de um jogador ou um **Gunsō** (sargento sem nome: Battle 1, todos os Anéis 2, sem Pontos de Vazio próprios). O Taisa escolhe a postura e a ação da unidade e rola as manobras dela.

**Liderança:** com Battle 3 ou 4, a unidade ganha +1k0 no ataque e +1k0 em moral. Com 5 ou mais, +1k0 no ataque e +2k0 em moral. (Na simulação, +1 Vazio inteiro pesava demais.)

**Se o Taisa cai** (morto, inconsciente, capturado ou longe resolvendo uma Oportunidade Heroica): a unidade perde a Liderança, faz teste de moral e passa ao Gunsō.

---

## 2. Pontos de Vazio da unidade

Adaptados da regra dos personagens (Core Book, p. 80). A unidade começa a batalha com **Pontos de Vazio iguais ao seu Vazio** e gasta **no máximo um por turno**, decidido pelo Taisa, para:

- **+1k1 numa rolagem da unidade** (ataque, Disparo, moral, Iniciativa), declarado antes de rolar;
- **ignorar 1 golpe** de um ataque, logo depois de o dano ser anunciado;
- **+10 no TN** até a próxima ativação, declarado no começo da ativação;
- **+10 na Iniciativa** até o fim da batalha.

**Manobras de clã** custam 1 Ponto de Vazio, como as Técnicas de escola. Esse gasto não conta no limite de um por turno.

O Taisa usa os **Pontos de Vazio dele mesmo** nas rolagens de Battle que ele faz.

Os Pontos de Vazio da unidade só voltam pelo Discurso, pela Presença do Comandante (seção 3) ou depois da batalha.

---

## 3. O Rikugunshōkan

O **Rikugunshōkan** comanda o exército inteiro, mas **não dá ordens às unidades**: quem decide o que cada tropa faz é o Taisa dela, ou seja, o jogador. O comandante pesa na batalha de quatro jeitos.

### Discurso (antes da batalha)

Uma vez, antes do primeiro turno: **Perform: Oratória / Consciência** contra TN 15.
- **Sucesso:** toda unidade do exército ganha +1k0 no primeiro teste de moral.
- **Cada Raise:** uma unidade à escolha do comandante ganha +1 Ponto de Vazio. Com 3 Raises, em vez disso, todas ganham +1.
- **Falha por 10 ou mais:** o discurso soou falso, e toda unidade tem -1k0 no primeiro teste de moral.

Outra pessoa pode fazer o discurso no lugar dele (um Taisa, um sacerdote, o daimyō). Mesmo assim, é um discurso só por exército.

### Tática (antes da batalha)

O comandante declara uma Tática para o exército inteiro e rola **(Anel da Tática + Battle) k Anel da Tática** contra o TN. Cada Raise libera o efeito extra.

- **Gunshi** (opcional): se o exército tem um estrategista, ele rola antes, com o mesmo Anel, contra TN 15. Se passar, o comandante ganha +1k1, e cada Raise do Gunshi soma +1k0.
- **Falha:** o exército luta sem tática.
- **Se os dois lados declaram tática:** cada um rola a sua; quem tirar o total maior soma +5 na Iniciativa de todas as suas unidades no primeiro turno.

| Anel | Tática | TN | Efeito | Raise |
|---|---|---|---|---|
| Terra | Defesa em Profundidade | 15 | Unidades em Defesa ou Defesa Total: +1k0 em moral. | +1k0 a mais |
| Terra | Muralha de Ferro | 15 | A manobra Prontidão tem TN -5 para todas as unidades. | também Formar Muralha |
| Água | Martelo e Bigorna | 20 | Flanquear tem TN -5 e +1k0 no ataque. | +1k1 em vez de +1k0 |
| Água | Atrito | 15 | A partir do 3º turno, as unidades inimigas têm +5 no TN dos testes de moral. | a partir do 2º turno |
| Fogo | Cunha | 20 | Toda Carga ganha +1k0. | +1k1 em vez de +1k0 |
| Fogo | Golpe na Cabeça | 25 | Unidades que atacam o posto de comando inimigo ganham +1k1; o comandante inimigo tem -1k0 no Contest de Comando. | -1k1 |
| Ar | Emboscada | 25 | Exige terreno que esconda. As unidades escondidas só aparecem quando agem e não podem ser atacadas antes. | uma unidade a mais escondida |
| Ar | Falsa Fraqueza | 20 | A manobra Fingir Retirada ganha +1k1 e o inimigo que a seguir tem -10 no TN em vez de -5. | +1k1 a mais |
| Vazio | Um Só Coração | 20 | Toda unidade começa com +1 Ponto de Vazio. | +2 em vez de +1 |

### Mudança de Tática (só quando o campo dá motivo)

O comandante não pode trocar de tática quando quer. Só pode tentar depois de um **gatilho**:

- uma unidade de qualquer lado é Destruída ou entra Em Fuga;
- o comandante inimigo cai ou troca de tática;
- chegam reforços, de qualquer lado;
- o campo muda: anoitece, começa a chover, há um incêndio, uma ponte cai;
- uma Oportunidade Heroica de comando do próprio lado dá certo.

Depois de um gatilho, ele pode tentar **uma vez**: rola a nova tática com **TN +10**.
- **Sucesso:** a tática nova substitui a antiga.
- **Falha:** a antiga se perde também, e o exército fica sem tática até o próximo gatilho.

### Presença do Comandante (a cada turno)

- **Contest de Comando:** no começo de cada turno, os dois comandantes fazem um Contest de Battle / Percepção. Quem vence soma **+5 na Iniciativa** de todas as suas unidades neste turno.
- **Inspirar:** uma vez por turno, o comandante rola Battle / Consciência contra TN 15 para mandar um mensageiro, um sinal ou ir pessoalmente até uma unidade que ele vê. Se passar, a unidade ganha **1 Ponto de Vazio**, e o Taisa dela decide como usar.

**Se o Rikugunshōkan cai:** todas as unidades do exército testam moral, a Tática deixa de valer e não há Contest nem Inspirar até alguém assumir. Assumir o comando custa a ação de um Taisa e conta como gatilho para Mudança de Tática.

**Onde ele fica:** no **posto de comando**, uma casa da grid atrás das linhas. Ele pode liderar uma unidade e ser Taisa também, mas aí corre os riscos dela.

---

## 4. Estrutura do turno

**Antes do primeiro turno:** Discurso e Tática. Cada unidade rola **Iniciativa** uma vez, (Ar + Treino) k Ar, como os personagens rolam num combate.

**A cada turno:**
1. **Comando:** Contest de Comando e Inspirar.
2. **Ativações:** em ordem de Iniciativa, da maior para a menor. Na sua ativação, a unidade:
   - assume ou mantém sua **Postura** (seção 5);
   - pode **mover até Água casas**;
   - faz **uma ação**: **Atacar** (corpo a corpo, contra unidade adjacente), **Disparar** (só com Arcos) ou **Manobra** (seção 6).

   Sair do contato com um inimigo sem uma manobra de retirada dá a ele um ataque grátis.
3. **Moral:** testam moral as unidades que mudaram de nível de dano, perderam o Taisa ou estão Debandando.
4. **Glória:** personagens em unidades em contato podem **Buscar Glória** (seção 9).

---

## 5. Posturas

São as cinco posturas dos personagens (Core Book, p. 86), cada uma com o seu Anel, adaptadas para a tropa. A unidade assume a postura no começo da própria ativação, como um personagem.

| Postura | Anel | Na tropa |
|---|---|---|
| **Ataque** | Água | Fluida e versátil: sem restrição nenhuma. |
| **Ataque Total** | Fogo | +1k1 no ataque e -5 no TN (o livro dá +2k1 e -10 a personagens; a tropa tem TN bem menor, e -10 a deixava indefesa). Só pode atacar; se mover, só para se aproximar do inimigo, com +1 casa. Não serve para Disparar. Unidade Montada não pode usar. |
| **Defesa** | Ar | Soma Ar + Treino ao TN. Não ataca, mas pode mover e fazer manobras. |
| **Defesa Total** | Terra | Rola (Ar + Treino) k Ar e soma metade do total (arredondando para cima) ao TN até a próxima ativação. Não faz mais nada. |
| **Centro** | Vazio | Não faz nada. Na próxima ativação, ganha +1k1 mais o Vazio numa rolagem à escolha e +10 na Iniciativa daquele turno. |

---

## 6. Manobras

Uma manobra é a ação da unidade naquela ativação. Cada manobra pertence a um **Anel**: o Taisa rola **(o Anel dele + Battle) k o Anel dele** contra o TN. Um Taisa com Fogo alto é bom em Cargas; um com Terra alta segura a linha. Se passar, a manobra acontece. Se falhar, a unidade perde a ação.

### Manobras gerais

| Manobra | Anel | TN | Efeito | Raise |
|---|---|---|---|---|
| Carga | Fogo | 15 | Move até Água + 1 casas e ataca com +1k0. Não pode estando Quebrada. | +1 golpe se acertar |
| Flanquear | Água | 20 | Ataca pelo lado ou por trás: o alvo tem -5 no TN e perde o bônus da postura de Defesa. | o alvo testa moral na hora |
| Retirada Ordenada | Água | 15 | Sai do contato sem ataque grátis e move até Água casas. | +1 casa |
| Formar Muralha | Terra | 15 | +5 no TN contra Disparo e Carga até a próxima ativação. | +5 a mais |
| Manter a Linha | Terra | 20 | Ignora o próximo teste de moral. | ignora dois |
| **Cerrar Fileiras** | Terra | 20 | Junta duas unidades feridas numa nova (ver abaixo). Custa 1 Ponto de Vazio de cada uma. | +1 Vazio na unidade nova até o fim da batalha |
| Saraivada | Ar | 15 | Só com Arcos: dispara em duas unidades adjacentes entre si, com -1k1 em cada. | uma terceira unidade |
| Fingir Retirada | Ar | Contest contra o Taisa inimigo adjacente | Recua uma casa; se a unidade inimiga a seguir, ela fica com -5 no TN contra o próximo ataque desta unidade. | -10 em vez de -5 |
| **Prontidão** | Ar | 15 | A unidade não ataca agora: espera. Escolhe **uma reação** da lista abaixo, que dispara na ativação do inimigo, até a sua próxima ativação. | prepara uma segunda reação |
| Reagrupar | Vazio | 15 + 5 por nível de dano | Sobe um passo na trilha de moral. | sobe dois passos |

**Reações da Prontidão**

| Reação | Dispara quando | Efeito |
|---|---|---|
| Lanças Firmes | um inimigo faz Carga contra ela ou uma unidade Montada a ataca | Ela ataca primeiro, com +1k0 (+1k1 a mais com Nagae Yari); se causar 2+ golpes, a Carga perde o bônus. |
| Formar Quadrado | uma unidade Montada vai atacá-la | +10 no TN contra esse ataque; a cavalaria não pode Flanquear nem atravessar. |
| Escudos ao Alto | ela é alvo de Disparo ou Saraivada | +10 no TN contra esse disparo. |
| Cobrir a Retirada | uma unidade aliada adjacente sai do contato | O ataque grátis que o inimigo ganharia é feito contra esta unidade, com -1k1. |
| Cerrar o Flanco | um inimigo vai Flanqueá-la | O Flanquear vira um ataque comum. |
| Contra-Ataque | um inimigo adjacente a ataca e erra | Ela ataca de volta na hora. |

### Cerrar Fileiras: juntar tropas feridas

Duas unidades aliadas **adjacentes**, as duas **Castigada ou pior**, viram uma só. Rola o melhor Taisa entre os dois.

- **Homens:** a unidade nova soma os Homens das duas. O total define o **Tamanho** dela (dois Médias de 110 homens cada viram uma Grande de 220).
- **Dano:** a unidade nova começa no nível de dano que corresponde à fração de Homens em relação ao máximo do Tamanho. Uma Grande com 150 de 600 homens começa Quebrada; com 400, Castigada. Os golpes que sobram da conta ficam marcados.
- **Tipo e clã:** se forem do mesmo tipo, mantém. Se forem diferentes, usa a ficha do pior tipo e o Treinamento do melhor.
- **Melhorada:** a unidade vira **Veterana**: +1 Treinamento (máximo 5), moral Firme e Pontos de Vazio cheios. Cada unidade só vira Veterana uma vez.
- **Comando:** um dos Taisa fica com a unidade; o outro fica livre para assumir outra ou buscar glória.

Fora da batalha, na ficha da família, a mesma fusão pode ser feita sem rolagem, entre uma estação e outra.

### Clãs: Anel, especialidade e manobra

Cada clã de treinamento dá um **bônus no seu Anel**, uma **especialidade** fixa e uma **manobra própria**. A manobra é rolada pelo Taisa com o Anel indicado e custa 1 Ponto de Vazio da unidade.

Na simulação, +1 inteiro no Anel fazia a tropa de clã vencer 80% contra a mesma tropa sem clã. Por isso a coluna "+1" agora vale assim:
- **Fogo:** +1k0 no ataque corpo a corpo.
- **Ar:** +1k0 no Disparo, na Iniciativa e na Defesa Total.
- **Terra:** +1 golpe por nível de dano.
- **Água:** +1 de Move.
- **Vazio:** +1k0 em moral.

Com isso, a tropa de clã vence uns 64%. Leão e Caranguejo foram medidos; os outros Anéis seguem a mesma medida, mas ainda não foram simulados.

**Grandes Clãs**

| Clã | +1 | Especialidade | Manobra (Anel, TN) |
|---|---|---|---|
| Caranguejo | Terra | **Calejados:** o bônus de Terra já é +1 golpe por nível; a especialidade soma ignorar o primeiro golpe de cada Carga recebida. | **Muralha Kaiu** (Terra, 20): até a próxima ativação, não pode ser movida nem Flanqueada e tem +10 no TN contra Carga. |
| Garça | Ar | **Disciplina de corte:** troca de postura fora da própria ativação, uma vez por batalha. | **Desafio Kakita** (Vazio, 20): o Taisa desafia o líder inimigo adjacente a um duelo de iaijutsu. Se ele aceita, o perdedor sai da Liderança e a unidade dele testa moral com -1k1. Se recusa, a unidade inimiga desce um passo na moral. |
| Dragão | Vazio | **Mente quieta:** a postura Centro dá +2k2 mais o Vazio, em vez de +1k1 mais o Vazio. | **Dois Céus** (Fogo, 20): ataca duas unidades adjacentes, sem penalidade em nenhuma. |
| Leão | Fogo | **Coragem dos Akodo:** +1 dado rolado em moral; no primeiro teste falhado da batalha, fica Abalada em vez de descer mais. | **Fúria Matsu** (Fogo, 15): Carga que ignora o bônus da postura do alvo e causa +1 golpe; depois, -5 no TN até a próxima ativação. |
| Fênix | Vazio | **Bênção dos kami:** rerrola um teste da unidade, uma vez por batalha. | **Guarda Shiba** (Terra, 15): até a próxima ativação, os golpes que uma unidade aliada adjacente receberia vêm para esta. |
| Escorpião | Ar | **Emboscada:** no turno em que é revelada, quem ela ataca não pode mudar de postura. | **Bandeiras Falsas** (Ar, Contest contra o Rikugunshōkan inimigo): ele tem -1k1 no próximo Contest de Comando e não pode Inspirar no próximo turno; a unidade se reposiciona até Água casas sem tomar ataque grátis. |
| Unicórnio | Água | **Cavaleiros:** se começou o turno fora de contato, a Carga ganha +1 casa e +1k0. | **Tempestade Utaku** (Água, 20): Carga que atravessa a unidade alvo e termina do outro lado; o alvo testa moral. |
| Louva-a-Deus | Água | **Lâminas de aluguel:** pode receber o Treinamento de outro clã, pagando o instrutor estrangeiro, e mantém esta especialidade. | **Abordagem** (Água, 15): move para o contato ignorando água, muralha e terreno difícil, e ataca com +1k0 (+1k1 em batalha naval). |

**Clãs Menores e Família Imperial**

| Clã | +1 | Especialidade | Manobra (Anel, TN) |
|---|---|---|---|
| Texugo | Terra | **Filhos da montanha:** +1k0 em tudo em terreno montanhoso. | **Avalanche** (Terra, 20): Carga a partir de terreno mais alto, com +2k1 em vez de +1k1. |
| Gato | Água | **Passo leve:** ignora terreno difícil ao mover. | **Cair por Trás** (Água, 20): sai do contato e se reposiciona até Água casas sem ataque grátis, e Flanqueia no mesmo movimento. |
| Centopeia | Vazio | **Disciplina do Sol:** de dia, +1k0 em moral. | **Fúria do Sol** (Fogo, 20): até a próxima ativação, +1k1 nos ataques e a unidade ignora a penalidade de dano. |
| Libélula | Vazio | **Mediadores:** unidades inimigas Abaladas não podem atacá-la. | **Trégua no Campo** (Ar, Contest contra o Taisa inimigo): a unidade inimiga adjacente não ataca ninguém neste turno, e esta unidade também não. |
| Falcão | Ar | **Caçadores de espíritos:** +1k1 contra criaturas sobrenaturais e tropas da Mácula. | **Olhos Toritaka** (Ar, 15): revela as unidades escondidas a até Ar×2 casas e cancela a Emboscada sobre elas. |
| Raposa | Ar | **Filhos da floresta:** +5 no TN em floresta. | **Caminho dos Kitsune** (Água, 20): sai da grid e reaparece em qualquer casa de floresta a até 2× Água casas. |
| Lebre | Água | **Batedores:** +1 de Move. | **Fuga da Lebre** (Água, 15): Retirada Ordenada com o dobro de movimento; até a próxima ativação, não pode ser alvo de Disparo. |
| Pardal | Terra | **Teimosia:** quando Debandando, perde só 1 golpe por teste falhado. | **Resistir ao Inverno** (Terra, 15): sobe um passo na moral e não sofre deserção neste turno. |
| Tartaruga | Terra | **Casco:** +5 no TN contra Disparo. | **Recolher ao Casco** (Terra, 15): conta como Defesa Total, Formar Muralha e Manter a Linha ao mesmo tempo, até a próxima ativação. |
| Vespa | Ar | **Arqueiros natos:** +1k0 no Disparo e +2 de alcance. | **Ferrão** (Ar, 20): Disparo num único alvo, +2 golpes se acertar; se o Taisa do alvo é um personagem, ele recebe um ataque à parte. |
| Família Imperial | Vazio | **Mandato do Céu:** antes de atacar esta unidade pela primeira vez, uma tropa de Rokugan testa moral. | **Estandarte do Filho do Céu** (Vazio, 20): todas as unidades aliadas a até 3 casas ganham +1k0 em moral até o fim do próximo turno. |

Unidades ronin ou sem clã: +1 Treinamento (máximo 5), sem especialidade nem manobra.

---

## 7. Ataque

- **Corpo a corpo:** (Fogo + Treino + Volume) k Fogo contra o TN do alvo.
- **Disparo:** (Ar + Treino) k Ar contra o TN do alvo.
- Somam-se postura, manobra, clã, tática, Pontos de Vazio e as penalidades de dano e de moral.
- **Golpes:** um acerto causa 1 golpe, +1 para cada 5 pontos acima do TN (Raise automático).

---

## 8. Dano e moral

### Trilha de dano

Três níveis antes de sumir; cada nível aguenta **Terra golpes** (Terra ajustada pelo tamanho e pelo clã):

| Nível | Penalidade |
|---|---|
| Intacta | — |
| Castigada | -1k0 em tudo |
| Quebrada | -1k1 em tudo, -1 Água, não pode Carga nem Ataque Total |
| Destruída | sai da grid |

### Trilha de moral

A moral primeiro piora a ficha, depois come a tropa por dentro, e no fim leva todo mundo embora.

| Passo | Efeito |
|---|---|
| **Firme** | — |
| **Abalada** | -1k0 em tudo (soma com a penalidade de dano). |
| **Debandando** | -1k1 em tudo. Cada teste de moral falhado neste passo tira **1 golpe, +1 a cada 5 de falha**: soldados que fugiram, desertaram ou se mataram. |
| **Em Fuga** | Fuga completa: a unidade só se move para longe do inimigo, e quem a ataca tem +10. No fim de cada turno ela testa moral: se passar, volta a Debandando. Se sair da grid, sai da batalha. |

- **Quando:** sempre que a unidade toma golpes, perde o Taisa, ou no fim do turno se estiver Debandando.
- **Teste de moral:** (Vazio + Treino) k Vazio contra TN 15, +3 por nível de dano. Somam-se Liderança, clã, postura, tática e Pontos de Vazio.
- **Falhou:** desce um passo. Se já estava Debandando, sofre a deserção e só vai para Em Fuga se falhar por 10 ou mais, ou se a deserção a deixar Quebrada.
- **Desertores** contam à parte do dano. Depois da batalha, metade volta para a unidade, se ela ainda existir.

---

## 9. Personagem contra tropa

Encarar uma unidade sozinho é outra escala, e piora rápido com o tamanho.

| Tamanho da unidade | Dano do personagem por golpe | Ataques da unidade nele, por ativação | Bônus da unidade nesses ataques | Dano por acerto | Penalidade dele em contato |
|---|---|---|---|---|---|
| Pequena | 20 | 3 | +3k1 | (Fogo + 1) k2 | -1k0 |
| Média | 25 | 4 | +3k1 | (Fogo + 2) k2 | -1k1 |
| Grande | 35 | 5 | +4k1 | (Fogo + 3) k3 | -2k1 |
| Massiva | 50 | 6 | +5k1 | (Fogo + 4) k3 | -3k1 |

- **Ele ataca a unidade** com a rolagem normal contra o TN dela, e o dano rolado vira golpes pela tabela. Abaixo do mínimo, não arranha.
- **A unidade ataca o personagem** na ativação dela, se ele estiver em contato. Cada ataque é a rolagem de ataque da unidade, com o bônus da tabela, contra o TN de Armadura dele, e cada Raise de margem soma +1k0 ao dano.
- **Sair do contato** pede Atletismo / Agilidade contra TN 15, +5 por passo de tamanho acima de Pequena. Quem falha fica preso, e a unidade ganha um ataque extra nele.
- **Cercado:** contra mais de uma unidade, as penalidades de contato se somam.

Na simulação, um Rank 2 sozinho vence uma Pequena 18% das vezes e cai em menos de dois turnos contra uma Média. Um Rank 4 vence quase sempre a Pequena, 27% das vezes a Média, e não sobrevive a uma Grande. É de propósito. O caminho heroico é a Oportunidade Heroica.

---

## 10. Oportunidades Heroicas

As 24 da 4ª edição continuam.

- **Buscar Glória:** na fase de Glória, um personagem numa unidade em contato pode declarar que busca glória. O Mestre sorteia ou escolhe uma oportunidade no modo certo: **pessoal** se ele está lutando, **comando** se ele é o Taisa.
- **O preço:** enquanto resolve, ele está fora do comando. A unidade perde a Liderança no próximo turno, e o Gunsō rola as manobras.
- **O Mestre** pode oferecer uma a qualquer momento: quando uma unidade com personagem é Quebrada, quando o Rikugunshōkan inimigo fica exposto, quando o estandarte cai.

Conversão dos efeitos escritos para a Tabela de Batalha da 4ª edição:

| No texto original | Neste modelo |
|---|---|
| +5 / -5 no Battle Roll do general | +1k1 / -1k1 no próximo Contest de Comando ou numa Mudança de Tática |
| +3 / -3 no Battle Roll | +1k0 / -1k0 |
| "-5 no próximo turno do general inimigo" | o Rikugunshōkan inimigo tem -1k1 no próximo Contest e não pode Inspirar no próximo turno |
| Fortemente Engajado / Engajado | unidade em contato |
| Reservas / Desengajado | unidade fora de contato |
| Glória | igual, direto na ficha do personagem |

Uma Oportunidade Heroica de comando que dá certo também conta como gatilho para Mudança de Tática do próprio lado.

---

## 11. Fim da batalha e volta para a família

A batalha termina quando um lado não tem mais unidades fora de Em Fuga, quando o Rikugunshōkan dele cai e ninguém assume, ou quando ele ordena a retirada geral. O resultado continua gerando uma **Conquista**.

Cada unidade da família volta para a ficha com seus **Homens** atuais (mais metade dos desertores) e um estado:

| Fim da batalha | Estado na família (`TROPA_ESTADO`) |
|---|---|
| Intacta | continua Mobilizado |
| Castigada ou Quebrada | Ferido |
| Fugiu da grid | Ferido |
| Destruída | Derrotado |

Os Suprimentos Médicos recuperam um nível de dano antes da conversão. Os Pontos de Vazio voltam cheios.

---

## 12. Custos (para calibrar)

Os custos atuais são em Autoridade: Camponesa 5, Ashigaru 8, Samurai 15, especialização 5, equipamentos de 3 a 10, e manutenção pelo `TROPA_ESTADO` multiplicado pelo tipo (1, 2 ou 3). A proposta mantém essa base para o tamanho Médio e passa a escalar com o tamanho:

| Item | Proposta |
|---|---|
| Recrutar (Média) | Camponesa 10 · Ashigaru 16 · Arqueiros 20 · Samurai 30 · Cavalaria 40 (dobrado em 2026-11; antes 5/8/10/15/20) |
| Multiplicador de tamanho | Pequena ×0,5 · Média ×1 · Grande ×2 · Massiva ×4, no recrutamento, no equipamento e na manutenção |
| Multiplicador de tipo na manutenção | Camponesa 1 · Ashigaru 2 · Arqueiros 2 · Samurai 3 · Cavalaria 4 |
| Subir 1 de Treinamento | 2 × o nível novo × o multiplicador de tamanho; leva uma estação |
| Treinamento de outro clã | +50% no recrutamento (instrutores estrangeiros; exige aliança ou pagamento, a critério do Mestre) |
| Armadura | Leve 2 · Pesada 6, vezes o multiplicador de tamanho |
| Repor Homens | 1 de Autoridade a cada 10% do máximo da faixa, por estação |

As especializações antigas (Disciplinado, Fortalecido) saem: Treinamento e clã fazem o papel delas.

**Ajuste de 2026-11, depois da implementação:** o recrutamento dobrou e a Patrulha passou a custar -1 de Autoridade (vezes tipo e tamanho; antes dava +3, e a tropa em patrulha se pagava sozinha). Com a Autoridade da criação nova (mediana 53 na Estabelecida), uma unidade compromete, contando a manutenção de Mobilizado:

| Tipo | Pequena | Média | Grande | Massiva |
|---|---|---|---|---|
| Camponesa | 6 | 12 | 24 | 48 |
| Ashigaru | 11 | 22 | 44 | 88 |
| Arqueiros | 13 | 26 | 52 | 104 |
| Samurai | 21 | 42 | 84 | 168 |
| Cavalaria | 25 | 50 | 100 | 200 |

A família mediana mantém 2 Ashigaru Médias ou 1 Samurai Média; Massiva de Ashigaru, só depois de crescer em jogo. A tabela abaixo é a de antes do ajuste.

**Conferido contra as famílias do app** (7d10 + clã + eventos, 100 mil famílias): a Autoridade tem mediana 48, os 10% mais pobres ficam abaixo de 33 e os 10% mais ricos acima de 64. Contando recrutamento, armadura e a manutenção de Mobilizado, uma unidade compromete:

| Tipo | Pequena | Média | Grande | Massiva |
|---|---|---|---|---|
| Camponesa | 4 | 7 | 14 | 28 |
| Ashigaru | 7 | 14 | 28 | 56 |
| Arqueiros | 8 | 16 | 32 | 64 |
| Samurai | 14 | 27 | 54 | 108 |
| Cavalaria | 15 | 30 | 60 | 120 |

A família mediana mantém 3 Ashigaru Médias, ou 1 Samurai Média, sem contar o Dojo. Uma Massiva de Ashigaru cabe em 27% das famílias, uma de Arqueiros em 10%, e uma de Samurai ou Cavalaria em nenhuma. A leva Massiva de camponeses cabe em quase todas.

---

## 13. O que o site mostra

Sem tabuleiro. A aba vira o painel de guerra:

- **Lista de unidades** com a ficha calculada: Anéis ajustados, TN, ataque e Disparo (XkY), moral (XkY), Iniciativa, golpes por nível, Move, Homens e Pontos de Vazio.
- **De onde vem cada número:** ao passar o mouse, aparecem tipo, clã, tamanho, armadura, equipamento, Taisa, postura e tática.
- **Trilhas clicáveis:** dano (casinhas por nível), moral (quatro passos), desertores e Pontos de Vazio.
- **Seletor de postura** por unidade, com o efeito na hora.
- **Botões com a rolagem montada**, no rolador da v6 (explode no 10, guarda os maiores):
  - Atacar e Disparar;
  - Teste de moral;
  - Manobra (lista as gerais e a do clã, com Anel e TN, e rola a Battle do Taisa com o Anel certo);
  - Prontidão com a reação escolhida;
  - Iniciativa;
  - Gastar Ponto de Vazio.
- **Painel do Rikugunshōkan:** quem comanda, Discurso, Tática (com o Gunshi), Contest de Comando, Inspirar, os gatilhos de Mudança de Tática (para marcar quando acontecem) e a tentativa de mudança.
- **Unidades inimigas rápidas:** tipo, clã, tamanho e armadura bastam para o site montar a ficha.
- **Cerrar Fileiras:** escolher duas unidades e ver a unidade nova antes de confirmar.
- **Oportunidades Heroicas:** botão Buscar Glória, com sorteio pelo modo e texto convertido.
- **Log** do turno.
- **Encerrar batalha:** escolher o resultado e aplicar estados e Homens nas tropas da família.

A aba Tropa da família continua sendo onde se recruta, treina, equipa e mantém. Os campos novos (tipo novo, clã de treinamento, tamanho, Homens, armadura, Treinamento, Veterana) entram ali.

---

## 14. Próximos passos

1. ~~Fechar esta revisão.~~
2. Simular o que ainda não foi medido (seção 15).
3. ~~Implementar no `index.html`, com migração das tropas e da batalha da v6.~~ Feito em 2026-11 (sem push). Ficaram de fora do automático: Repor Homens (o Mestre edita os Homens no cadastro), a especialidade de cada clã quando depende da posição na grid, e o Caranguejo ignorando o primeiro golpe da Carga (o Mestre desconta). Na manutenção, o multiplicador de tamanho entra na Autoridade e no Domínio, não no Vazio nem na Fortuna.
4. ~~Depois, revisar as outras partes da ficha (fora da guerra).~~ Feito: ver "Família - Reequilíbrio.md".

---

## 15. Resultado da simulação

Simulador em `sim/batalha_v7_sim.js`; parâmetros finais em `sim/final.json`. Cada linha abaixo são 6.000 lutas de uma unidade contra outra, as duas em contato desde o início e em postura de Ataque, até uma ser Destruída ou entrar Em Fuga. As metas foram definidas antes da busca; a calibração procurou os números que caíssem dentro delas.

| Luta | Vence A | Vence B | Turnos | Fim por fuga | Meta (A) |
|---|---|---|---|---|---|
| Samurai × Ashigaru (Médias) | 89% | 10% | 3,2 | 21% | 80–92% |
| Ashigaru × Camponesa | 87% | 12% | 3,8 | 49% | 78–90% |
| Samurai × Camponesa | 98% | 1% | 2,3 | 10% | 93%+ |
| Ashigaru × Ashigaru | 49% | 50% | 5,5 | 47% | 3–6 turnos |
| Ashigaru Grande × Ashigaru Média | 89% | 10% | 2,6 | 14% | 72–88% |
| Ashigaru Grande × Samurai Média | 52% | 46% | 2,6 | 17% | 40–55% |
| Camponesa Massiva × Samurai Média | 45% | 43% | 2,9 | 46% | 25–45% |
| Samurai Leão × Samurai | 64% | 35% | 2,8 | 19% | 57–66% |
| Samurai Caranguejo × Samurai | 64% | 33% | 3,4 | 38% | 57–66% |
| Ashigaru com Taisa Battle 3 × Ashigaru | 66% | 33% | 4,8 | 39% | 56–68% |
| Ataque Total × Ataque (Ashigaru) | 58% | 39% | 2,9 | 25% | 42–58% |
| Cavalaria em Carga × Ashigaru | 93% | 6% | 2,4 | 9% | 78–92% |
| Cavalaria em Carga × Ashigaru em Prontidão com Nagae Yari | 40% | 59% | 1,9 | 7% | 38–55% |
| Cavalaria × Samurai (sem Carga) | 39% | 58% | 2,8 | 21% | 18–40% |

Quando A e B não somam 100%, as duas tropas quebraram no mesmo turno.

| Personagem sozinho | Vitória | Turnos | Meta |
|---|---|---|---|
| Rank 2 × Ashigaru Pequena | 18% | 3,3 | 15–40% |
| Rank 2 × Ashigaru Média | 0% | 1,8 | 0–10% |
| Rank 2 × Grande / Massiva | 0% | 1,0 | ~0% |
| Rank 4 × Ashigaru Pequena | 99% | 2,8 | 60–85% |
| Rank 4 × Ashigaru Média | 27% | 6,7 | 15–35% |
| Rank 4 × Ashigaru Grande | 0% | 1,4 | 0–10% |
| Rank 4 × Samurai Média | 2% | 2,7 | 5–20% |

O Rank 2 é um bushi com Agilidade 3, Kenjutsu 3, katana e armadura leve. O Rank 4 tem Agilidade 4, Kenjutsu 5, dois ataques por turno e armadura pesada. Nenhum dos dois declara Raises, e os dois usam Pontos de Vazio no ataque. O Rank 4 contra a Pequena fica acima da meta, e contra Samurai, abaixo. A distância entre um Rank 2 e um Rank 4 na 4ª edição é grande, e qualquer tabela que ameace o Rank 4 esmaga o Rank 2.

**Alternativa para o Samurai** (Fogo 2, Vazio 3, Treino 2): fica mais disciplinado e menos furioso. Vence o Ashigaru 83% das vezes, mas perde 68% para um Ashigaru Grande e 57% para a Cavalaria.

**Ainda não simulado:**
- as posturas Defesa, Defesa Total e Centro;
- as manobras além de Carga e Prontidão, e as manobras de clã;
- as Táticas, o Discurso e a Presença do Comandante;
- os usos dos Pontos de Vazio além de +1k1;
- Cerrar Fileiras e o Disparo à distância;
- os clãs além de Leão e Caranguejo.

Esses dependem de decisões de posição na grid, e o duelo de unidade contra unidade não captura isso direito. Vale testar jogando, ou com um simulador de grid depois.
