# Visão geral do projeto

## O que é

Um sistema web de **catalogação e endereçamento de estoque**. Ele responde duas perguntas que hoje dependem da memória das pessoas:

- **O que temos e quanto?** Cada produto é cadastrado com suas variações (potência, cor, tensão), e cada variação tem seu próprio saldo.
- **Onde está?** Cada item é associado a um endereço físico dentro do estoque.

O primeiro uso é em uma empresa de iluminação com mais de três mil itens distribuídos em cerca de oito galpões. O sistema, porém, é construído para servir a qualquer empresa que precise organizar um estoque a partir do zero: os tipos de local, as categorias e as características dos produtos são configuráveis.

## O problema que resolve

| Problema observado | Como o sistema trata |
|---|---|
| Variações diferentes de um produto registradas sob o mesmo código, o que torna o saldo inútil | Cadastro em dois níveis: [[glossario#Família\|família]] e [[glossario#Variante\|variante]]. O saldo é sempre da variante |
| Nenhum registro de onde cada produto está | [[glossario#Local\|Locais]] organizados em árvore, com um código de endereço para cada um |
| Saldo do sistema diferente do saldo físico | Saldo calculado a partir do histórico de [[glossario#Movimentação\|movimentações]], e [[glossario#Inventário\|inventário]] para corrigir diferenças |
| Conhecimento concentrado nos funcionários mais antigos | Consulta aberta: qualquer pessoa autorizada encontra o produto pelo celular |

O sistema não corrige o estoque sozinho. A correção depende de contagem física e de disciplina de processo, que são da empresa. O que o sistema entrega é a estrutura que torna essa correção possível e duradoura.

## Fluxo principal de uso

1. O gerente de estoque cadastra as **categorias**, as **famílias** e as **variantes** dos produtos.
2. O gerente de estoque cadastra os **locais**: primeiro os galpões, depois os setores dentro deles, e assim por diante.
3. A mercadoria chega e é registrada como **entrada** em um local.
4. Qualquer pessoa autorizada **consulta** onde está um produto, ou o que há em um local.
5. A mercadoria muda de lugar por **transferência**, e sai por **saída**.
6. Um pedido emitido por outro sistema chega como **documento de saída**. O documento traz um QR code; o gerente de estoque escaneia, indica de onde cada item será retirado e confirma.
7. Periodicamente um local é contado em um **inventário**, e as diferenças viram ajustes registrados.

## Quem usa

| Perfil | O que faz |
|---|---|
| Gerente de Estoque | Cadastra produtos e locais, movimenta estoque, confirma saídas e faz inventário |
| Estoquista | Consulta produtos, saldos e locais no dia a dia |
| Gerente | Consulta produtos, saldos e histórico |
| Administrador | Libera o acesso de novos usuários e define o perfil de cada um |

Detalhes em [[security-model]].

## Onde continuar

- Termos: [[glossario]]
- Limites do projeto: [[escopo]]
- Requisitos: [[PRD]]
- Etapas de construção: [[roteiro]]
