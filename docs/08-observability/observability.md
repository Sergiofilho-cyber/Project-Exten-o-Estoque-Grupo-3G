# Observabilidade

Como saber o que aconteceu no sistema e o que deu errado.

## Auditoria do estoque

Já está pronta no modelo: a tabela `movimentacoes` é o registro de auditoria. Cada linha diz o que mudou, quanto, de onde, para onde, quem fez e quando, e nenhuma função do sistema a altera ou apaga. Perguntas como "por que este saldo está assim?" são respondidas pelo histórico da variante.

## Erros

| Onde | Como é registrado |
|---|---|
| Regras de negócio no backend | A função devolve `{ ok: false, erro }` com uma mensagem em português ("Saldo insuficiente…"), que a tela mostra ao usuário |
| Falhas técnicas no servidor | `console.error` com o contexto; aparece nos registros do servidor. A tela recebe uma mensagem genérica |
| Telas | Mensagem ao usuário; nunca falhar em silêncio |

Regra: uma operação só mostra "sucesso" depois de o banco confirmar. Erro de permissão ou de regra nunca pode parecer sucesso.

## O que acompanhar

| Indicador | Como obter |
|---|---|
| Itens críticos | Consulta de estoque por variante ([[backend#Consultas calculadas]]) |
| Ajustes de inventário por período | Movimentações do tipo `ajuste` |
| Documentos pendentes há muito tempo | `documentos_saida` com status `pendente` e data antiga |

Muitos ajustes no mesmo local indicam problema de processo ali, não de sistema.

## Fora desta versão

Ferramenta externa de monitoramento de erros e painel de métricas. Avaliar quando o sistema estiver em uso diário.
