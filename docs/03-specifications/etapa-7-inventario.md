# Etapa 7 — Inventário

## Objetivo
Contar um local e corrigir as diferenças com registro.

## Por que esta etapa existe
É a ferramenta que a empresa usa para colocar o saldo do sistema de acordo com o físico.

## O que será construído
Tela para abrir inventário, tela de contagem e tela de conclusão com o resumo das diferenças.

## Requisitos atendidos
RF-20, RF-21, RF-22.

## Tarefas

### Backend

- [ ] **T7.6** Funções de inventário em `lib/inventarios.ts`: abrir (`abrirInventario`), listar itens, gravar a quantidade contada, incluir item, resumo das diferenças, concluir (`concluirInventario`) e cancelar (`cancelarInventario`)  
  Responsável: a definir

### Front-end

- [ ] **T7.1** Abrir inventário de um local (função `abrirInventario`)  
  Responsável: a definir
- [ ] **T7.2** Tela de contagem, pensada para celular  
  Responsável: a definir
- [ ] **T7.3** Incluir item encontrado que não estava na lista  
  Responsável: a definir
- [ ] **T7.4** Resumo das diferenças antes de concluir  
  Responsável: a definir
- [ ] **T7.5** Concluir (função `concluirInventario`) e cancelar  
  Responsável: a definir

## Pronto quando (Definition of Done)

- [ ] Contagem diferente do sistema gera ajuste visível no histórico
- [ ] Item não contado não é alterado
- [ ] Não é possível abrir dois inventários do mesmo local
- [ ] Lint e verificação de tipos sem erros
- [ ] Documentação atualizada no mesmo pull request

## Ligações
[[roteiro]] · [[PRD]] · [[domain-model]] · [[banco-de-dados]]
