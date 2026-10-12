# Instruções para assistentes de IA

Antes de alterar qualquer arquivo, leia `docs/README.md` e siga a ordem de leitura indicada lá. A pasta `docs/` é a fonte da verdade: se o código disser outra coisa, o código está errado.

## Estrutura

- `frontend/`: aplicativo Next.js 16 + React 19 + TypeScript estrito + Tailwind 4 + Supabase. Comandos `npm`/`npx` rodam aqui.
- `backend/supabase/migrations/`: estrutura do banco. As migrações são escritas pela frente de banco de dados a partir da especificação em `docs/04-architecture/banco-de-dados.md`.
- `docs/`: documentação (fonte da verdade). `05-guides/`: guias práticos da equipe, que seguem `docs/`.

## Regras permanentes

- Use os nomes de `docs/00-context/glossario.md` em tabelas, variáveis e telas. Código de negócio em português.
- Estoque só é alterado pelas funções do banco: `registrar_movimentacao`, `confirmar_saida_documento`, `abrir_inventario`, `concluir_inventario`. Nenhuma tela ou rota soma ou subtrai saldo.
- O autor de uma ação vem da sessão, nunca de um campo enviado pela tela.
- A referência de um item é sempre o código da variante, nunca o nome (ADR-07).
- Mudança no banco é um arquivo novo em `backend/supabase/migrations/`. Não edite uma migração que já foi aplicada.
- Não invente funcionalidade. Se uma regra não estiver em `docs/`, pare e pergunte.
- Toda tela precisa funcionar em celular (360 px). Telas e acabamento visual são da frente de front-end; a divisão por frente está em `docs/04-architecture/decisions.md` (ADR-13).
- Trabalhe uma etapa por vez, na ordem de `docs/03-specifications/roteiro.md`. Ao terminar uma tarefa, marque a caixa no arquivo da etapa e atualize a documentação afetada.
- Antes de dizer que terminou, rode `npm run lint` e `npx tsc --noEmit` dentro de `frontend/` e mostre o resultado.
- Nenhuma chave ou senha em arquivo do repositório. Segredos ficam em `frontend/.env.local`.
- Não rode comandos que alterem um banco remoto nem faça `git push` sem o responsável pedir.
