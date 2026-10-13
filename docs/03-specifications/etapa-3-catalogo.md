# Etapa 3 — Catálogo

## Objetivo
Cadastro de categorias, famílias e variantes.

## Por que esta etapa existe
É a raiz do problema: sem separar as variantes, nenhum saldo fecha.

## O que será construído
Telas de categorias (com editor de atributos), famílias e variantes; busca por código e nome; envio de imagem.

## Requisitos atendidos
RF-04 a RF-08, RNF-08.

## Tarefas

### Backend

- [ ] **T3.7** Funções do catálogo em `lib/catalogo.ts`: listar, criar e editar categorias, famílias e variantes; desativar e reativar variante; busca por código ou nome com paginação  
  Responsável: a definir
- [ ] **T3.8** Armazenamento de imagens no Supabase e função de envio em `lib/imagens.ts`  
  Responsável: a definir

### Front-end

- [ ] **T3.1** Tela de categorias, com a lista de atributos e o estoque mínimo padrão  
  Responsável: a definir
- [ ] **T3.2** Tela de famílias  
  Responsável: a definir
- [ ] **T3.3** Tela de variantes: o formulário mostra os atributos da categoria  
  Responsável: a definir
- [ ] **T3.4** Envio de imagem para o armazenamento do Supabase  
  Responsável: a definir
- [ ] **T3.5** Busca por código ou nome, com paginação  
  Responsável: a definir
- [ ] **T3.6** Desativar e reativar variante  
  Responsável: a definir

## Pronto quando (Definition of Done)

- [ ] Criar uma categoria nova com atributos próprios sem alterar código
- [ ] Código de variante repetido é recusado com mensagem clara
- [ ] Estoquista vê o catálogo mas não vê botões de edição
- [ ] A busca funciona em tela de celular
- [ ] Lint e verificação de tipos sem erros
- [ ] Documentação atualizada no mesmo pull request

## Ligações
[[roteiro]] · [[PRD]] · [[domain-model]] · [[banco-de-dados]]
