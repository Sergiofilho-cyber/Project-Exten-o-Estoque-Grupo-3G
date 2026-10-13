# Migrações do banco

Esta pasta guarda a estrutura do banco, em arquivos SQL aplicados na ordem dos nomes. Quem cuida dela é a frente de banco de dados.

- **O que construir**: a especificação está em [`docs/04-architecture/banco-de-dados.md`](../../../docs/04-architecture/banco-de-dados.md). São tabelas, ligações, valores únicos, limites simples e índices.
- **O que não construir**: funções, gatilhos, visões e regras por perfil. As regras do sistema ficam no backend ([`docs/04-architecture/backend.md`](../../../docs/04-architecture/backend.md)).
- **Acesso**: ative a segurança por linha (RLS) em todas as tabelas e não crie nenhuma política.
- **Nome do arquivo**: data e hora seguidas de uma descrição curta, por exemplo `20261015093000_schema_inicial.sql`.
- **Nunca edite uma migração que já foi aplicada.** Uma mudança é sempre um arquivo novo.
- **Critério de aceite**: a tabela "O que o banco precisa recusar" da especificação. Cada linha precisa ser testada no Supabase de desenvolvimento.
- Ao mudar o banco, atualize a especificação no mesmo pull request.
