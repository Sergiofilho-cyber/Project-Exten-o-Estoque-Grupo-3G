# Etapa 6 — Consulta

## Objetivo
Responder rápido, no celular, "onde está?" e "o que há aqui?".

## Por que esta etapa existe
É o que a maior parte das pessoas vai usar todo dia, e o que tira o conhecimento da memória dos mais antigos.

## O que será construído
Tela inicial com busca, tela do produto com os locais e quantidades, tela do local com seu conteúdo, lista de itens críticos.

## Requisitos atendidos
RF-17, RF-18, RF-19, RNF-05, RNF-06.

## Tarefas

### Backend

- [ ] **T6.6** Funções de consulta em `lib/consulta.ts`: busca de variantes, saldo total e por local de uma variante, conteúdo de um local, itens críticos e totais do painel  
  Responsável: a definir

### Front-end

- [ ] **T6.1** Busca na tela inicial  
  Responsável: a definir
- [ ] **T6.2** Tela do produto: saldo total e saldo por local, com o caminho de cada local  
  Responsável: a definir
- [ ] **T6.3** Tela do local: o que há nele  
  Responsável: a definir
- [ ] **T6.4** Lista de itens críticos, a partir da visão `estoque_por_variante`  
  Responsável: a definir
- [ ] **T6.5** Painel inicial com totais  
  Responsável: a definir

## Pronto quando (Definition of Done)

- [ ] Do login até achar o local de um produto em no máximo três toques no celular
- [ ] A busca responde em até 1 segundo com a carga de teste
- [ ] A soma dos saldos por local é igual ao saldo total exibido
- [ ] Lint e verificação de tipos sem erros
- [ ] Documentação atualizada no mesmo pull request

## Ligações
[[roteiro]] · [[PRD]] · [[domain-model]] · [[banco-de-dados]]
