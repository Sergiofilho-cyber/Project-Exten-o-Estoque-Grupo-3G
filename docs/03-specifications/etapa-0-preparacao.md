# Etapa 0 — Preparação

## Objetivo
Deixar todo mundo com o projeto rodando no próprio computador, no mesmo repositório e no mesmo banco de desenvolvimento.

## Por que esta etapa existe
Sem uma base comum, cada pessoa trabalha em uma versão diferente e o trabalho não se junta.

## O que será construído
Nenhuma tela nova. O resultado é o ambiente funcionando.

## Requisitos atendidos
Nenhum requisito do [[PRD]] diretamente; atende [[PRD#Requisitos não funcionais|RNF-07]].

## Tarefas

### Backend

- [x] **T0.1** Criar o repositório no GitHub com um commit inicial limpo, sem nenhuma chave ou senha no código ou no histórico  
  Responsável: a definir
- [ ] **T0.2** Criar o projeto Supabase de desenvolvimento e dar acesso a ele à frente de banco de dados  
  Responsável: a definir
- [x] **T0.3** Escrever `.env.example` com os nomes das variáveis, sem valores (em `frontend/.env.example`)  
  Responsável: a definir
- [ ] **T0.5** Proteger a branch `main`: alterações só entram por pull request  
  Responsável: a definir

### Todas as frentes

- [ ] **T0.4** Cada integrante segue o guia de ambiente (`05-guides/01-setup-ambiente.md`) e roda o projeto  
  Responsável: a definir

## Pronto quando (Definition of Done)

- [ ] Todos os integrantes abrem a tela de login no próprio computador
- [ ] `npm run lint` e `npx tsc --noEmit` passam sem erros
- [ ] Uma busca por chaves no repositório não encontra nenhuma
- [ ] Lint e verificação de tipos sem erros
- [ ] Documentação atualizada no mesmo pull request

## Ligações
[[roteiro]] · [[PRD]] · [[domain-model]] · [[banco-de-dados]]
