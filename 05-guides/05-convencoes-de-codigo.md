# 05 — Convenções de código

As regras oficiais estão em [`docs/00-context/tech-stack.md`](../docs/00-context/tech-stack.md) e [`docs/05-guides/contribuicao.md`](../docs/05-guides/contribuicao.md). Este guia resume.

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
| `frontend/app/` | Telas (uma pasta por rota) e rotas de servidor (`app/api/`) |
| `frontend/components/` | Componentes reaproveitados por mais de uma tela |
| `frontend/lib/` | Acesso ao Supabase e funções utilitárias |
| `backend/supabase/migrations/` | Mudanças no banco, um arquivo novo por mudança |

## Regras que não podem ser quebradas

- TypeScript em tudo. Arquivos `.js` não são aceitos.
- Uma tela não passa de cerca de 300 linhas. Acima disso, divida em componentes.
- **Nenhuma tela ou rota soma ou subtrai saldo.** Estoque só muda pelas funções do banco (`registrar_movimentacao`, `confirmar_saida_documento`, `abrir_inventario`, `concluir_inventario`).
- **Quem fez a ação vem da sessão**, nunca de um campo enviado pela tela.
- Nenhuma chave ou senha no código.

## O que o linter resolve sozinho

O projeto usa **ESLint** (configuração em `frontend/eslint.config.mjs`). Antes de abrir uma PR, dentro de `frontend/`:

```bash
npm run lint
npx tsc --noEmit
```

Os dois precisam passar sem erros.
