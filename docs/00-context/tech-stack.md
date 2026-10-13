# Tecnologias

## O que usamos e por quê

| Tecnologia | Papel | Por que foi escolhida |
|---|---|---|
| **Next.js 16** | Estrutura do aplicativo web | Telas e rotas de servidor no mesmo projeto, sem precisar de um back-end separado |
| **React 19** | Construção das telas | Padrão de mercado; vem com o Next.js |
| **TypeScript** (modo estrito) | Linguagem | Aponta erros antes de o código rodar, o que ajuda quem está começando |
| **Tailwind CSS 4** | Estilo | Layout responsivo sem escrever arquivos de CSS |
| **Supabase** | Banco de dados, login e arquivos | Entrega PostgreSQL, autenticação e armazenamento de imagens prontos |
| **PostgreSQL** | Banco de dados | Relacional, com transações e regras de segurança por linha |
| **lucide-react** | Ícones | Leve e consistente |

## Como as partes conversam

```
Navegador (celular ou computador)
        |
        v
Aplicativo Next.js  -- telas e rotas de servidor
        |
        v
Supabase  -- login, banco PostgreSQL, imagens
```

- O login é feito pelo Supabase e a sessão fica em cookie.
- As telas chamam as funções de `frontend/lib/`, que leem e gravam no Supabase. O banco decide o que cada perfil pode ver (ver [[security-model]] e [[decisions#ADR-14 Telas acessam os dados pelas funções de lib|ADR-14]]).
- Toda alteração de estoque passa por funções dentro do banco (ver [[banco-de-dados]]). O aplicativo nunca calcula saldo.

## Onde fica cada parte no repositório

| Pasta | Conteúdo |
|---|---|
| `frontend/` | O aplicativo Next.js: telas, controle de sessão e as rotas de servidor que existirem |
| `backend/supabase/` | O banco: migrações, dados de teste e as funções SQL onde moram as regras de estoque |
| `docs/` | Esta documentação, a fonte da verdade |
| `05-guides/` | Guias práticos da equipe |

O "back-end" deste projeto é o banco. As regras de estoque ficam nas funções do Supabase (ver [[decisions#ADR-03 Regras de estoque dentro do banco|ADR-03]]), e o Next.js reúne telas e rotas de servidor no mesmo projeto, sem um servidor de API separado. Ver [[decisions#ADR-12 Repositório dividido em frontend e backend|ADR-12]].

## Ambientes

| Ambiente | Para que serve |
|---|---|
| Desenvolvimento | Projeto Supabase próprio da equipe, com dados de teste |
| Produção | Servidor da empresa, montado a partir das mesmas migrações |

A estrutura do banco fica em `backend/supabase/migrations/`. Montar um ambiente novo é aplicar esses arquivos na ordem.

## Padrões de código obrigatórios

- TypeScript em tudo. Arquivos `.js` não são aceitos em código novo.
- `npm run lint` e `npx tsc --noEmit` sem erros antes de abrir um pull request.
- Nomes de tabelas, colunas, funções e variáveis de negócio em português, iguais aos do [[glossario]].
- Uma tela não passa de cerca de 300 linhas. Acima disso, divida em componentes.
- Nenhuma chave ou senha no código. Segredos ficam em `frontend/.env.local`, que não vai para o repositório.

Regras de trabalho em equipe: guias em `05-guides/`, na raiz do repositório.
