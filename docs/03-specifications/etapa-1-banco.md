# Etapa 1 — Banco de dados

## Objetivo
Criar a estrutura do banco a partir da especificação em [[banco-de-dados]] e ligar o servidor a ela.

## Por que esta etapa existe
Todas as outras etapas guardam e leem dados daqui. O banco é simples de propósito: as regras ficam no backend ([[backend]]).

## O que será construído
As tabelas, restrições e índices descritos em [[banco-de-dados]], os dados de teste e a conexão do servidor com o banco.

## Requisitos atendidos
Base para todos; prepara RNF-01, RNF-02, RNF-03, RNF-04 e RNF-07.

## Tarefas

### Banco de dados

- [ ] **T1.1** Escrever a migração inicial em `backend/supabase/migrations/`, a partir de [[banco-de-dados]]: tipos, tabelas, restrições, índices e segurança por linha ativada sem políticas. Aplicá-la no Supabase de desenvolvimento  
  Responsável: a definir
- [ ] **T1.2** Criar dados de teste em `backend/supabase/seed.sql`: 2 categorias, 3 famílias, 8 variantes, uma árvore de 6 locais  
  Responsável: a definir
- [ ] **T1.4** Testar no Supabase cada linha da tabela "O que o banco precisa recusar"  
  Responsável: a definir

### Backend

- [ ] **T1.3** Escrever os tipos TypeScript das tabelas, a partir do contrato de [[banco-de-dados]]  
  Responsável: a definir
- [ ] **T1.5** Validar o banco entregue: conferir nomes e tipos contra o contrato e repetir os testes do que o banco recusa  
  Responsável: a definir
- [ ] **T1.6** Conexão do servidor com o banco e conferência de sessão e perfil em `lib/servidor/`  
  Responsável: a definir

## Pronto quando (Definition of Done)

- [ ] A migração aplica sem erro em um projeto vazio
- [ ] Cada linha de "O que o banco precisa recusar" em [[banco-de-dados]] foi conferida
- [ ] Tabelas e colunas têm os nomes do contrato em [[banco-de-dados]]
- [ ] O seed pode ser reaplicado para voltar ao estado inicial
- [ ] Uma função do backend lê uma tabela pelo servidor, e o navegador, com a chave pública, não lê nenhuma
- [ ] Lint e verificação de tipos sem erros
- [ ] Documentação atualizada no mesmo pull request

## Ligações
[[roteiro]] · [[PRD]] · [[domain-model]] · [[banco-de-dados]] · [[backend]]
