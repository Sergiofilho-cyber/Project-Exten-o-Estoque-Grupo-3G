# Estoque 3G — Catalogação e Endereçamento de Estoque

Sistema web que responde duas perguntas: **o que temos e quanto?** e **onde está?**. Projeto de Extensão da UNIFAMETRO para o Grupo 3G.

## Estrutura do repositório

| Pasta | O que tem | Quem mexe |
|---|---|---|
| [`docs/`](docs/README.md) | A documentação do projeto. **É a fonte da verdade**: se o código disser outra coisa, o código está errado | Todos |
| [`05-guides/`](05-guides/Inicio.md) | Guias práticos da equipe: setup, Git, uso de IA, como pegar tarefas | Todos |
| `frontend/app/`, `frontend/components/` | As telas e os componentes do aplicativo Next.js | Frente de front-end |
| `frontend/lib/`, `frontend/proxy.ts`, `frontend/app/api/` | O backend: todas as regras e operações do sistema, rodando no servidor | Frente de backend |
| `backend/supabase/` | O banco: migrações e dados de teste | Frente de banco de dados |

### Onde ficam as regras

As regras do sistema (somar e subtrair saldo, impedir saída maior que o saldo, impedir baixa repetida, conferir permissões) ficam no **backend**, em funções que rodam no servidor do aplicativo Next.js. As telas só chamam essas funções e nunca falam com o banco. O **banco** é simples de propósito: guarda os dados e recusa valores inválidos.

O código do backend fica dentro de `frontend/` porque faz parte do mesmo aplicativo Next.js; a pasta `backend/` guarda só o banco. Detalhes em [`docs/04-architecture/backend.md`](docs/04-architecture/backend.md) e em [`docs/04-architecture/decisions.md`](docs/04-architecture/decisions.md) (ADR-12 a ADR-15).

## Por onde começar

1. Leia [`05-guides/Inicio.md`](05-guides/Inicio.md) para saber como a equipe trabalha.
2. Monte o ambiente com [`05-guides/01-setup-ambiente.md`](05-guides/01-setup-ambiente.md).
3. Leia [`docs/README.md`](docs/README.md) na ordem indicada lá.
4. Veja em qual etapa estamos e a fila da sua frente em [`docs/03-specifications/roteiro.md`](docs/03-specifications/roteiro.md).

## Comandos (dentro de `frontend/`)

```bash
npm install       # instala as dependências
npm run dev       # roda em http://localhost:3000
npm run lint      # confere o código
npx tsc --noEmit  # confere os tipos
```
