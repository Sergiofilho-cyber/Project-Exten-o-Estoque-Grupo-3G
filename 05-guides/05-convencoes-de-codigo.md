# 05 — Convenções de código

As tecnologias e o porquê de cada uma estão em [`docs/00-context/tech-stack.md`](../docs/00-context/tech-stack.md). Este guia traz as convenções do dia a dia.

## Idioma

Tudo que é do negócio fica em **português**, com as palavras do [glossário](../docs/00-context/glossario.md). Se o glossário diz "variante", não escreva "produto" nem "item".

| O quê | Idioma | Exemplo |
|-------|--------|---------|
| Tabelas e colunas do banco | Português | `variantes`, `estoque_minimo` |
| Variáveis e funções de negócio | Português | `saldoTotal`, `buscarVariantes()` |
| Textos da interface | Português | "Cadastrar variante" |
| Commits, PRs, issues e documentação | Português | `feat: adiciona filtro por galpão` |

Nomes técnicos que vêm de bibliotecas (`useState`, `router`, `supabase`) continuam como são.

## Nomes

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Variáveis e funções | camelCase | `saldoTotal`, `buscarVariantes()` |
| Componentes React | PascalCase | `CartaoVariante`, `ArvoreLocais` |
| Tabelas e colunas | snake_case | `documentos_saida`, `local_origem_id` |
| Constantes | UPPER_SNAKE_CASE | `TAMANHO_MAXIMO_IMAGEM` |

## Organização de pastas

| Pasta | O que vai lá |
|-------|--------------|
| `frontend/app/` | Telas (uma pasta por rota), da frente de front-end, e rotas de servidor (`app/api/`), da frente de backend |
| `frontend/components/` | Componentes reaproveitados por mais de uma tela. Frente de front-end |
| `backend/src/` | As funções do backend, um arquivo por assunto (`sessao.ts`, `catalogo.ts`...). Rodam no servidor e são o único caminho até o banco. As telas as importam como `@estoque/backend/<arquivo>`. Frente de backend |
| `backend/src/servidor/` | Código interno do backend: conexão com o banco e conferência de perfil. Nenhuma tela importa nada daqui |
| `backend/supabase/migrations/` | Mudanças no banco, um arquivo novo por mudança. Frente de banco de dados |

## Regras que não podem ser quebradas

- TypeScript em tudo. Arquivos `.js` não são aceitos.
- Uma tela não passa de cerca de 300 linhas. Acima disso, divida em componentes.
- **Nenhuma tela fala com o banco.** As telas chamam as funções de `backend/src/`, que rodam no servidor e devolvem `{ ok, dados }` ou `{ ok, erro }`. Se faltar uma função, peça à frente de backend.
- **Nenhuma tela soma ou subtrai saldo.** Estoque só muda pelas operações do backend (`registrarMovimentacao`, `confirmarSaidaDocumento`, `abrirInventario`, `concluirInventario`).
- **O banco não tem regra de negócio.** Nada de funções, gatilhos ou regras por perfil no SQL: isso é do backend (`docs/04-architecture/backend.md`).
- **Quem fez a ação vem da sessão**, nunca de um campo enviado pela tela.
- Nenhuma chave ou senha no código.

## O que o linter resolve sozinho

O projeto usa **ESLint** (configuração em `frontend/eslint.config.mjs`). Antes de abrir uma PR, na raiz do repositório:

```bash
npm run lint
npm run typecheck
```

Os dois precisam passar sem erros.
