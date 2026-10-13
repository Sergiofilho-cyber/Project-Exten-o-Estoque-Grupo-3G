# 04 — Documentando mudanças

**Regra:** toda atualização que vai pra `main` precisa ter uma explicação escrita, e a documentação em `docs/` é atualizada no mesmo Pull Request. A pasta `docs/` é a fonte da verdade do projeto: se o código e a documentação disserem coisas diferentes, um dos dois está errado.

Pode (e deve) usar IA pra rascunhar a explicação. Só dê uma lida antes de enviar pra conferir se bate com o que você fez.

## Template da Pull Request

Toda PR abre com este template preenchido (o GitHub carrega ele automaticamente a partir de `.github/pull_request_template.md`):

```markdown
## Tarefa
<!-- Código da tarefa, por exemplo T3.2 (docs/03-specifications/etapa-3-catalogo.md) -->

## O que mudou e por quê
<!-- Explique em linguagem que alguém de fora da tarefa entenda -->

## Como testar
<!-- Passos pra quem vai revisar ver funcionando -->

## Documentação atualizada
- [ ] Não precisou
- [ ] Caixa da tarefa marcada no arquivo da etapa
- [ ] Glossário (`docs/00-context/glossario.md`)
- [ ] Regras de negócio (`docs/02-domain/domain-model.md`)
- [ ] Banco de dados (`docs/04-architecture/banco-de-dados.md`)
- [ ] Decisões (`docs/04-architecture/decisions.md`)
- [ ] Guias (`05-guides/`)
```

**PR sem esse template preenchido não é aprovada.** "Ajustes" ou "alterações" não contam como explicação.

## Mexeu em X → atualiza Y

| Se você... | Atualize |
|------------|----------|
| Terminou uma tarefa | Marque a caixa no arquivo da etapa em `docs/03-specifications/` |
| Mudou tabela, coluna, função ou regra de acesso do banco | Crie uma **migração nova** em `backend/supabase/migrations/` (nunca edite uma já aplicada) e atualize `docs/04-architecture/banco-de-dados.md` e `docs/02-domain/domain-model.md` |
| Criou ou mudou um termo do negócio (variante, local, baixa...) | `docs/00-context/glossario.md` |
| Tomou uma decisão técnica relevante (biblioteca, padrão, estrutura) | Novo ADR em `docs/04-architecture/decisions.md` |
| Mudou algo em como a equipe trabalha ou roda o projeto | O guia correspondente em `05-guides/` |

## Como escrever um ADR

Todos os ADRs ficam em um único arquivo, `docs/04-architecture/decisions.md`, numerados em sequência. Uma decisão nunca é apagada: se mudar, registra-se uma nova que substitui a anterior.

```markdown
## ADR-15 Título curto da decisão
- **Contexto**: qual era o problema?
- **Decisão**: o que foi decidido
- **Ganho**: o que melhora
- **Custo**: o que fica mais difícil
```

O ADR registra o **porquê** das escolhas. Isso ajuda quem entra depois e vira material pronto pro relatório acadêmico.
