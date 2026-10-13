# Glossário

Cada termo tem um único significado no projeto. Use sempre estas palavras nas conversas, nas telas e no código.

## Categoria
Um tipo de produto, como "Refletor" ou "Cordão natalino". A categoria define quais características seus produtos têm e qual é o estoque mínimo padrão deles.

## Família
Um modelo de produto, sem considerar as variações. Exemplo: "Refletor Slim". Uma família pertence a uma categoria e agrupa uma ou mais variantes.

## Variante
O item que existe fisicamente no estoque e que pode ser contado. Exemplo: "Refletor Slim 100 W, 5000 K, bivolt". Cada variante tem um código único. **Todo saldo e toda movimentação são de uma variante, nunca de uma família.**

## Atributo
Uma característica de uma variante, como potência, temperatura de cor ou comprimento. A lista de atributos é definida na categoria; os valores são preenchidos na variante.

## Local
Um lugar físico onde se guarda mercadoria. Locais ficam uns dentro dos outros: um galpão contém setores, um setor contém módulos. Cada empresa decide quantos níveis usar e como chamá-los.

## Tipo de local
O nome do nível: "Galpão", "Setor", "Módulo", "Prateleira". É um texto livre.

## Código do local
O endereço curto e único de um local, usado em etiquetas e buscas. Exemplo: `G1-A-03` para o módulo 03 do setor A do galpão 1.

## Movimentação
O registro de que uma quantidade de uma variante entrou, saiu ou mudou de lugar. Existem quatro tipos:

| Tipo | Significado | Origem | Destino |
|---|---|---|---|
| Entrada | Mercadoria chegou ao estoque | não tem | obrigatório |
| Saída | Mercadoria deixou o estoque | obrigatória | não tem |
| Transferência | Mercadoria mudou de local | obrigatória | obrigatório |
| Ajuste | Correção após contagem | um dos dois | um dos dois |

Uma movimentação registrada nunca é alterada nem apagada. Um erro é corrigido com uma nova movimentação.

## Saldo
A quantidade de uma variante em um local. O saldo total da variante é a soma dos saldos em todos os locais. O saldo é sempre resultado das movimentações: ninguém o digita.

## Estoque mínimo (limiar)
A quantidade abaixo da qual a variante é considerada crítica. A variante herda o valor da categoria, mas pode ter um valor próprio.

## Inventário
A contagem física de um local. O sistema registra o que dizia ter, a pessoa informa o que contou, e cada diferença vira um ajuste.

## Documento de saída
Um pedido de retirada de mercadoria emitido por outro sistema da empresa, como um orçamento aprovado. Tem um protocolo, uma lista de itens e um QR code.

## Protocolo
O identificador único de um documento de saída. É o que o QR code carrega.

## Baixa
A confirmação de que os itens de um documento de saída deixaram o estoque. Um documento só pode ser baixado uma vez.

## Perfil (cargo)
O nível de acesso de um usuário. Ver [[security-model]].
