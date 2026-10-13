# 06 — Pegando tarefas

As tarefas estão nos arquivos de etapa em [`docs/03-specifications/`](../docs/03-specifications/roteiro.md). O [roteiro](../docs/03-specifications/roteiro.md) mostra a ordem das etapas e em qual situação cada uma está (**A fazer**, **Em execução**, **Concluída**).

## Como pegar uma tarefa

1. Abra o roteiro e veja qual etapa está **Em execução**
2. No arquivo da etapa, procure o bloco da sua frente (Banco de dados, Backend ou Front-end) e escolha uma tarefa sem responsável (por exemplo, **T3.2**)
3. Coloque seu nome em "Responsável" e envie essa mudança
4. Crie a branch com a etapa e o código da tarefa (ver [02 — Fluxo de Git](02-fluxo-git.md))
5. Quando a PR for aceita, marque a caixa da tarefa

Não pegue mais de 2 tarefas ao mesmo tempo. Termine uma antes de começar outra.

## Definição de pronto

Uma tarefa só está pronta quando:

- [ ] Roda sem erro na máquina de quem fez
- [ ] `npm run lint` e `npx tsc --noEmit` passam sem erros
- [ ] PR aberta com o template preenchido
- [ ] Documentação atualizada no mesmo PR
- [ ] Aprovada no review e com merge feito
- [ ] Caixa marcada no arquivo da etapa

A etapa inteira só é concluída quando todos os itens de "Pronto quando" do arquivo da etapa estiverem marcados.

## Bugs e ideias

Achou um bug ou teve uma ideia? Crie uma issue no GitHub com:
- Título claro (`Busca por código não encontra variante desativada`)
- O que acontece e o que deveria acontecer

Se a ideia for uma regra de negócio que não está escrita em `docs/`, **não implemente**: registre a dúvida em [decisões pendentes](../docs/00-context/escopo.md) e pergunte ao responsável pelo projeto.
