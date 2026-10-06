# Guia de contribuição

Regras para sete pessoas trabalharem no mesmo código sem se atrapalhar.

## Fluxo de trabalho

1. Atualize sua cópia: `git checkout main` e `git pull`.
2. Crie uma branch para a tarefa: `git checkout -b etapa3/t3-2-tela-familias`.
3. Faça o trabalho em commits pequenos, com mensagem que diga o que mudou.
4. Antes de enviar, rode `npm run lint` e `npx tsc --noEmit` dentro de `frontend/`.
5. Envie a branch e abra um pull request para a `main`.
6. Outra pessoa da equipe revisa. Só depois de aprovado o pull request é aceito.

Ninguém envia direto para a `main`.

## Nome das branches

`etapaN/codigo-da-tarefa-descricao-curta`, por exemplo `etapa5/t5-1-tela-entrada`.

## O que todo pull request precisa ter

- A tarefa que ele resolve (por exemplo, T3.2 de [[etapa-3-catalogo]]).
- **Uma explicação escrita do que foi feito e por quê**, em linguagem que alguém de fora da tarefa entenda.
- A documentação atualizada, se a mudança alterar regra, tela, tabela ou decisão.
- Como testar.

## Uso de IA

O uso de assistentes de IA é incentivado para acelerar o trabalho. Três cuidados:

1. Entregue à IA o contexto: os arquivos desta pasta `docs/` existem para isso. Comece por [[project-overview]], [[domain-model]] e [[banco-de-dados]].
2. Você é responsável pelo que envia. Leia e entenda o código antes de abrir o pull request.
3. Nunca cole chaves, senhas ou o conteúdo de `.env.local` em uma conversa com IA.

Ambiente recomendado: IDE Antigravity, gratuita para universitários. Qualquer editor serve.

## Regras do código

- Use os nomes do [[glossario]]. Se o glossário diz "variante", não escreva "produto" nem "item".
- Estoque só se altera pelas funções do banco. Nenhuma tela soma ou subtrai saldo. Ver [[decisions#ADR-03 Regras de estoque dentro do banco|ADR-03]].
- Mudança no banco é sempre um arquivo novo de migração. Ver [[banco-de-dados#Como alterar o banco]].
- Nenhum segredo no repositório. Ver [[security-model#Segredos]].

## Dúvidas

Se uma regra de negócio não estiver escrita, não invente. Registre a dúvida em [[escopo#Decisões pendentes]] e pergunte ao responsável pelo projeto.
