# Etapa 2 — Acesso

## Objetivo
Login, perfis e liberação de usuários.

## Por que esta etapa existe
Nada no sistema deve ser visível sem login, e cada perfil enxerga só o que lhe cabe.

## O que será construído
Tela de login, tela de "aguardando liberação", tela de administração de usuários, menu que muda conforme o perfil.

## Requisitos atendidos
RF-01, RF-02, RF-03, RNF-04.

## Tarefas

### Backend

- [ ] **T2.4** Proteção de rotas: sem sessão, volta para o login  
  Responsável: a definir
- [ ] **T2.6** Funções de sessão em `lib/sessao.ts`: entrar, cadastrar, sair e perfil atual  
  Responsável: a definir
- [ ] **T2.7** Funções de usuários em `lib/usuarios.ts`: listar perfis e alterar o cargo  
  Responsável: a definir

### Front-end

- [ ] **T2.1** Tela de login e cadastro com e-mail e senha  
  Responsável: a definir
- [ ] **T2.2** Tela "aguardando liberação" para o perfil pendente  
  Responsável: a definir
- [ ] **T2.3** Tela de usuários para o admin alterar perfis  
  Responsável: a definir
- [ ] **T2.5** Menu e navegação no celular conforme o perfil  
  Responsável: a definir

A base de T2.4 e T2.6 já está no repositório (`proxy.ts`, `lib/sessao.ts` e telas provisórias em `app/login` e `app/pendente`). Falta testar com o banco da Etapa 1.

## Pronto quando (Definition of Done)

- [ ] Usuário novo entra como pendente e não vê nenhum dado
- [ ] Admin altera um perfil e a mudança vale no próximo acesso
- [ ] Cada perfil foi testado contra a tabela de [[security-model]]
- [ ] Lint e verificação de tipos sem erros
- [ ] Documentação atualizada no mesmo pull request

## Ligações
[[roteiro]] · [[PRD]] · [[domain-model]] · [[banco-de-dados]]
