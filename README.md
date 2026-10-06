# Estoque 3G — Catalogação e Endereçamento de Estoque

Sistema web que responde duas perguntas: **o que temos e quanto?** e **onde está?**. Projeto de Extensão da UNIFAMETRO para o Grupo 3G.

## Estrutura do repositório

| Pasta | O que tem | Quem mexe |
|---|---|---|
| [`docs/`](docs/README.md) | A documentação do projeto. **É a fonte da verdade**: se o código disser outra coisa, o código está errado | Todos |
| [`05-guides/`](05-guides/Inicio.md) | Guias práticos da equipe: setup, Git, uso de IA, como pegar tarefas | Todos |
| `frontend/` | O aplicativo Next.js: telas, controle de sessão e as rotas de servidor | Quem faz telas |
| `backend/supabase/` | O banco: migrações, dados de teste e as funções SQL onde moram as regras de estoque | Quem mexe no banco |

### Por que o "back-end" é o banco

As regras de estoque (somar e subtrair saldo, impedir saída maior que o saldo, impedir baixa repetida, conferir permissões) ficam **dentro do banco**, em funções do Supabase. Assim elas valem para qualquer tela, mesmo que uma tela tenha um defeito. O Next.js junta telas e rotas de servidor no mesmo projeto, então não existe um servidor de API separado. Detalhes em [`docs/04-architecture/decisions.md`](docs/04-architecture/decisions.md) (ADR-03 e ADR-12).

## Por onde começar

1. Leia [`05-guides/Inicio.md`](05-guides/Inicio.md) para saber como a equipe trabalha.
2. Monte o ambiente com [`05-guides/01-setup-ambiente.md`](05-guides/01-setup-ambiente.md).
3. Leia [`docs/README.md`](docs/README.md) na ordem indicada lá.
4. Veja em qual etapa estamos em [`docs/03-specifications/roteiro.md`](docs/03-specifications/roteiro.md).

## Comandos (dentro de `frontend/`)

```bash
npm install       # instala as dependências
npm run dev       # roda em http://localhost:3000
npm run lint      # confere o código
npx tsc --noEmit  # confere os tipos
```
