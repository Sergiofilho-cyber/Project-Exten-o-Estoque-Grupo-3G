# Etapa 1 — Banco de dados

## Objetivo
Criar toda a estrutura do banco a partir do arquivo de migração.

## Por que esta etapa existe
Todas as outras etapas guardam e leem dados daqui. As regras de estoque moram no banco.

## O que será construído
As tabelas, funções e regras de acesso descritas em [[banco-de-dados]].

## Requisitos atendidos
Base para todos; atende diretamente RNF-01, RNF-02, RNF-03 e RNF-04.

## Tarefas

- [ ] **T1.1** Aplicar `backend/supabase/migrations/20261005000000_schema_inicial.sql` no Supabase de desenvolvimento  
  Responsável: a definir
- [ ] **T1.2** Criar dados de teste em `backend/supabase/seed.sql`: 2 categorias, 3 famílias, 8 variantes, uma árvore de 6 locais  
  Responsável: a definir
- [ ] **T1.3** Gerar os tipos TypeScript do banco para o aplicativo  
  Responsável: a definir
- [ ] **T1.4** Repetir no Supabase os testes da tabela "Proteções garantidas pelo banco"  
  Responsável: a definir

## Pronto quando (Definition of Done)

- [ ] A migração aplica sem erro em um projeto vazio
- [ ] Cada linha da tabela de proteções em [[banco-de-dados]] foi conferida
- [ ] O seed pode ser reaplicado para voltar ao estado inicial
- [ ] Lint e verificação de tipos sem erros
- [ ] Documentação atualizada no mesmo pull request

## Ligações
[[roteiro]] · [[PRD]] · [[domain-model]] · [[banco-de-dados]]
