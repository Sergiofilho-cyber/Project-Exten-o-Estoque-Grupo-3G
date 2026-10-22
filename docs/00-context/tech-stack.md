# Tecnologias

## O que usamos e por quê

| Tecnologia | Papel | Por que foi escolhida |
|---|---|---|
| **Next.js 16** | Estrutura do aplicativo web | Telas e funções de servidor no mesmo projeto, sem precisar de um servidor de API separado |
| **React 19** | Construção das telas | Padrão de mercado; vem com o Next.js |
| **TypeScript** (modo estrito) | Linguagem | Aponta erros antes de o código rodar, o que ajuda quem está começando |
| **Tailwind CSS 4** | Estilo | Layout responsivo sem escrever arquivos de CSS |
| **Supabase** | Banco de dados, login e arquivos | Entrega PostgreSQL, autenticação e armazenamento de imagens prontos |
| **PostgreSQL** | Banco de dados | Relacional, com restrições que recusam valores inválidos |
| **supabase-js** | Acesso do servidor ao banco e ao login | Cliente oficial do Supabase. O backend o usa com a chave secreta |
| **lucide-react** | Ícones | Leve e consistente |

## Como as partes conversam

```
Navegador (celular ou computador)  -- telas
        |
        v
Servidor do Next.js  -- funções do backend: conferem o perfil e aplicam as regras
        |
        v
Supabase  -- login, banco PostgreSQL, imagens
```

- O login é feito pelo Supabase e a sessão fica em cookie.
- As telas chamam as funções de `backend/src/`, que rodam no servidor. O navegador nunca fala com o banco (ver [[decisions#ADR-14 Telas acessam os dados pelas funções de lib|ADR-14]]).
- O backend confere o perfil de quem chama e aplica todas as regras, gravando o saldo de forma condicional (ver [[backend]] e [[security-model]]). Nenhuma tela calcula saldo.
- O banco guarda os dados e recusa valores inválidos (ver [[banco-de-dados]]).

## Onde fica cada parte no repositório

| Pasta | Conteúdo |
|---|---|
| `frontend/app/`, `frontend/components/` | As telas e os componentes. Frente de front-end |
| `backend/src/`, `frontend/proxy.ts`, `frontend/app/api/` | As funções do backend, a sessão e as rotas para outros sistemas. Frente de backend |
| `backend/supabase/` | O banco: migrações e dados de teste. Frente de banco de dados |
| `docs/` | Esta documentação, a fonte da verdade |
| `05-guides/` | Guias práticos da equipe |

As regras do sistema ficam no backend, em funções que rodam no servidor do próprio aplicativo Next.js ([[decisions#ADR-15 Regras no backend e banco simples|ADR-15]]). O código do backend fica em `backend/src/` e o aplicativo em `frontend/` o importa como um pacote; `proxy.ts` e `app/api/` ficam em `frontend/` porque o Next.js só as reconhece ali. Ver [[decisions#ADR-12 Repositório dividido em frontend e backend|ADR-12]].

## Ambientes

| Ambiente | Para que serve |
|---|---|
| Desenvolvimento | Projeto Supabase próprio da equipe, com dados de teste |
| Produção | Servidor da empresa, montado a partir das mesmas migrações |

A estrutura do banco fica em `backend/supabase/migrations/`. Montar um ambiente novo é aplicar esses arquivos na ordem.

## Padrões de código obrigatórios

- TypeScript em tudo. Arquivos `.js` não são aceitos em código novo.
- `npm run lint` e `npm run typecheck` sem erros antes de abrir um pull request.
- Nomes de tabelas, colunas, funções e variáveis de negócio em português, iguais aos do [[glossario]].
- Uma tela não passa de cerca de 300 linhas. Acima disso, divida em componentes.
- Nenhuma chave ou senha no código. Segredos ficam em `frontend/.env.local`, que não vai para o repositório.

Regras de trabalho em equipe: guias em `05-guides/`, na raiz do repositório.
