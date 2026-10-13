# Etapa 4 — Locais

## Objetivo
Cadastro da árvore de endereços.

## Por que esta etapa existe
É o segundo eixo do projeto: saber onde as coisas podem ficar.

## O que será construído
Tela de locais em árvore, com criação de local dentro de outro, edição, mudança de lugar e desativação.

## Requisitos atendidos
RF-09, RF-10, RF-11.

## Tarefas

### Backend

- [ ] **T4.3** Sugestão automática de código a partir do local pai  
  Responsável: a definir
- [ ] **T4.6** Funções de locais em `lib/locais.ts`: listar a árvore com o caminho completo, criar, editar, mover (sem deixar um local dentro de um descendente) e desativar (só sem saldo)  
  Responsável: a definir

### Front-end

- [ ] **T4.1** Tela de locais em árvore, que abre e fecha os níveis  
  Responsável: a definir
- [ ] **T4.2** Formulário de local: nome, tipo, código e local que o contém  
  Responsável: a definir
- [ ] **T4.4** Mover local para dentro de outro  
  Responsável: a definir
- [ ] **T4.5** Desativar local, com a mensagem do backend quando há mercadoria  
  Responsável: a definir

## Pronto quando (Definition of Done)

- [ ] Montar a árvore Galpão > Setor > Módulo pela tela
- [ ] Código repetido é recusado
- [ ] O caminho completo aparece em toda tela que mostra um local
- [ ] Lint e verificação de tipos sem erros
- [ ] Documentação atualizada no mesmo pull request

## Ligações
[[roteiro]] · [[PRD]] · [[domain-model]] · [[banco-de-dados]]
