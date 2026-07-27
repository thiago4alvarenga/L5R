Mons de clã — como criar e onde colocar
========================================

O app já procura, para cada clã, um arquivo com este caminho exato:
  img/mons/<id-do-clã>.png

Se o arquivo não existir, o app simplesmente não mostra nada ali (não quebra).
Assim você pode ir criando aos poucos, um clã de cada vez.

IDs esperados (mesmo nome usado no app, sem acento e minúsculo):
  caranguejo.png   garca.png       dragao.png      leao.png
  fenix.png        escorpiao.png   unicornio.png   louva.png   (Louva-a-Deus / Mantis)
  texugo.png       gato.png        centopeia.png   libelula.png
  falcao.png       raposa.png      lebre.png       pardal.png
  tartaruga.png    vespa.png       imperial.png

Especificação recomendada para cada imagem:
  - Formato: PNG com fundo transparente
  - Tamanho: quadrado, 200x200px (o app exibe em 36x36, mas parte de um
    arquivo maior fica nítido em telas de alta resolução e permite reuso
    futuro em outros lugares do app)
  - Conteúdo: o mon (brasão) do clã, centralizado, sem texto
  - Estilo: preferir traço/silhueta em tinta única (sumi-e / carimbo),
    combinando com a paleta washi do app (tons de tinta --ink #2c2620
    sobre transparência, ou dourado --accent #96742f para um efeito
    de selo)

Depois de criar, é só salvar o PNG com o nome certo dentro desta pasta
(img/mons/) e recarregar a página — não precisa mexer em nenhum código.
