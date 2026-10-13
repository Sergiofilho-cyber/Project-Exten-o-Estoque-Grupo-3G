# Instruções para assistentes de IA

Antes de alterar qualquer arquivo, leia `docs/README.md` e siga a ordem de leitura indicada lá. A pasta `docs/` é a fonte da verdade: se o código disser outra coisa, o código está errado.

## Estrutura

- `frontend/`: aplicativo Next.js 16 + React 19 + TypeScript estrito + Tailwind 4 + Supabase. Comandos `npm`/`npx` rodam aqui.
  - `frontend/lib/`: funções de acesso aos dados, da frente de backend. É o único lugar que fala com o Supabase.
  - `frontend/app/` e `frontend/components/`: telas e componentes, da frente de front-end.
- `backend/supabase/migrations/`: estrutura do banco, da frente de banco de dados. As migrações são escritas a partir da especificação em `docs/04-architecture/banco-de-dados.md`.
- `docs/`: documentação (fonte da verdade). `05-guides/`: guias práticos da equipe.

A divisão por frente está em `docs/04-architecture/decisions.md` (ADR-13 e ADR-14) e a fila de cada frente em `docs/03-specifications/roteiro.md`.

## Regras permanentes

- Use os nomes de `docs/00-context/glossario.md` em tabelas, variáveis e telas. Código de negócio em português.
- Estoque só é alterado pelas funções do banco: `registrar_movimentacao`, `confirmar_saida_documento`, `abrir_inventario`, `concluir_inventario`. Nenhuma tela ou rota soma ou subtrai saldo.
- Telas não consultam o Supabase direto: chamam as funções de `frontend/lib/`, que devolvem `{ ok, dados }` ou `{ ok, erro }` (`frontend/lib/resultado.ts`).
- Tabelas, colunas, funções e parâmetros do banco têm os nomes do contrato em `docs/04-architecture/banco-de-dados.md`.
- O autor de uma ação vem da sessão, nunca de um campo enviado pela tela.
- A referência de um item é sempre o código da variante, nunca o nome (ADR-07).
- Mudança no banco é um arquivo novo em `backend/supabase/migrations/`. Não edite uma migração que já foi aplicada.
- Não invente funcionalidade. Se uma regra não estiver em `docs/`, pare e pergunte.
- Toda tela precisa funcionar em celular (360 px). Telas e acabamento visual são da frente de front-end.
- Trabalhe uma etapa por vez, na ordem de `docs/03-specifications/roteiro.md`. Ao terminar uma tarefa, marque a caixa no arquivo da etapa e atualize a documentação afetada.
- Antes de dizer que terminou, rode `npm run lint` e `npx tsc --noEmit` dentro de `frontend/` e mostre o resultado.
- Nenhuma chave ou senha em arquivo do repositório. Segredos ficam em `frontend/.env.local`.
- Não rode comandos que alterem um banco remoto nem faça `git push` sem o responsável pedir.
