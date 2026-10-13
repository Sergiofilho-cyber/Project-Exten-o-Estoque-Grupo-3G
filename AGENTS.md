# Instruções para assistentes de IA

Antes de alterar qualquer arquivo, leia `docs/README.md` e siga a ordem de leitura indicada lá. A pasta `docs/` é a fonte da verdade: se o código disser outra coisa, o código está errado.

## Estrutura

- `frontend/`: aplicativo Next.js 16 + React 19 + TypeScript estrito + Tailwind 4 + Supabase. Comandos `npm`/`npx` rodam aqui.
  - `frontend/lib/`: o backend. Funções que rodam no servidor, uma por operação ou consulta. Frente de backend.
  - `frontend/lib/servidor/`: código interno do backend (conexão com o banco, conferência de perfil). Nenhuma tela importa nada daqui.
  - `frontend/app/` e `frontend/components/`: telas e componentes. Frente de front-end.
- `backend/supabase/`: o banco (migrações e dados de teste). Frente de banco de dados.
- `docs/`: documentação (fonte da verdade). `05-guides/`: guias práticos da equipe.

As regras ficam no backend e o banco é simples: `docs/04-architecture/backend.md`, `docs/04-architecture/banco-de-dados.md` e `docs/04-architecture/decisions.md` (ADR-13, ADR-14 e ADR-15). A fila de cada frente está em `docs/03-specifications/roteiro.md`.

## Regras permanentes

- Use os nomes de `docs/00-context/glossario.md` em tabelas, variáveis e telas. Código de negócio em português.
- Toda regra de negócio fica no backend. O banco não tem funções, gatilhos, visões nem regras por perfil: só tabelas, ligações, valores únicos e limites simples.
- Estoque só é alterado pelas operações do backend: `registrarMovimentacao`, `confirmarSaidaDocumento`, `abrirInventario`, `concluirInventario`. Cada uma roda em transação, com trava na linha de saldo. Nenhuma tela soma ou subtrai saldo.
- Telas não falam com o banco: chamam as funções de `frontend/lib/`, que devolvem `{ ok, dados }` ou `{ ok, erro }` (`frontend/lib/resultado.ts`).
- Toda função do backend confere a sessão e o perfil antes de agir. O autor de uma ação vem da sessão, nunca de um campo enviado pela tela.
- Tabelas e colunas do banco têm os nomes do contrato em `docs/04-architecture/banco-de-dados.md`.
- A referência de um item é sempre o código da variante, nunca o nome (ADR-07).
- Mudança no banco é um arquivo novo em `backend/supabase/migrations/`. Não edite uma migração que já foi aplicada.
- Não invente funcionalidade. Se uma regra não estiver em `docs/`, pare e pergunte.
- Toda tela precisa funcionar em celular (360 px). Telas e acabamento visual são da frente de front-end.
- Trabalhe uma etapa por vez, na ordem de `docs/03-specifications/roteiro.md`. Ao terminar uma tarefa, marque a caixa no arquivo da etapa e atualize a documentação afetada.
- Antes de dizer que terminou, rode `npm run lint` e `npx tsc --noEmit` dentro de `frontend/` e mostre o resultado.
- Nenhuma chave ou senha em arquivo do repositório. Segredos ficam em `frontend/.env.local`. `DATABASE_URL` só existe no servidor.
- Não rode comandos que alterem um banco remoto nem faça `git push` sem o responsável pedir.
