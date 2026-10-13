# Etapa 1 — Banco de dados

## Objetivo
Criar toda a estrutura do banco a partir da especificação em [[banco-de-dados]].

## Por que esta etapa existe
Todas as outras etapas guardam e leem dados daqui. As regras de estoque moram no banco.

## O que será construído
As tabelas, funções e regras de acesso descritas em [[banco-de-dados]].

## Requisitos atendidos
Base para todos; atende diretamente RNF-01, RNF-02, RNF-03 e RNF-04.

## Tarefas

### Banco de dados

- [ ] **T1.1** Escrever a migração inicial em `backend/supabase/migrations/`, a partir de [[banco-de-dados]], e aplicá-la no Supabase de desenvolvimento  
  Responsável: a definir
- [ ] **T1.2** Criar dados de teste em `backend/supabase/seed.sql`: 2 categorias, 3 famílias, 8 variantes, uma árvore de 6 locais  
  Responsável: a definir
- [ ] **T1.3** Gerar os tipos TypeScript do banco para o aplicativo  
  Responsável: a definir
- [ ] **T1.4** Repetir no Supabase os testes da tabela "Proteções garantidas pelo banco"  
  Responsável: a definir

### Backend

- [ ] **T1.5** Validar o banco entregue: conferir nomes e tipos contra o contrato de [[banco-de-dados]] e repetir os testes de proteção pelo aplicativo, com um usuário de cada perfil  
  Responsável: a definir

## Pronto quando (Definition of Done)

- [ ] A migração aplica sem erro em um projeto vazio
- [ ] Cada linha da tabela de proteções em [[banco-de-dados]] foi conferida
- [ ] Tabelas, colunas, funções e parâmetros têm os nomes do contrato em [[banco-de-dados]]
- [ ] O seed pode ser reaplicado para voltar ao estado inicial
- [ ] Lint e verificação de tipos sem erros
- [ ] Documentação atualizada no mesmo pull request

## Ligações
[[roteiro]] · [[PRD]] · [[domain-model]] · [[banco-de-dados]]
