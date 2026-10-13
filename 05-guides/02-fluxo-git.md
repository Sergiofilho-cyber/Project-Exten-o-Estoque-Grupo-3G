# 02 — Fluxo de Git

Existe **um repositório central** no GitHub. Todo mundo contribui pra ele criando branches e pedindo pra juntar (merge) o trabalho na `main` através de Pull Requests.

## Por que não mexer direto na `main`?

A `main` é a versão "oficial" do sistema. Ela é protegida: o GitHub não deixa ninguém fazer push direto nela. Assim, um erro de uma pessoa não quebra o projeto de todo mundo.

## O ciclo completo

```bash
# 1. Vá pra main e pegue a versão mais recente
git checkout main
git pull

# 2. Crie sua branch a partir dela (use a etapa e o código da tarefa)
git checkout -b etapa3/t3-3-tela-variantes

# 3. Trabalhe normalmente e salve seu progresso em commits
git add .
git commit -m "feat: cria formulário de cadastro de variantes"

# 4. Antes de enviar, confira lint e tipos (na raiz)
npm run lint
npm run typecheck

# 5. Envie sua branch pro GitHub
git push -u origin etapa3/t3-3-tela-variantes
```

6. No GitHub, abra um **Pull Request** da sua branch para a `main`
7. Preencha o template da PR (ver [04 — Documentando mudanças](04-documentando-mudancas.md))
8. Aguarde o review. Se pedirem ajustes, é só fazer novos commits na mesma branch e dar push de novo
9. Aprovado → merge → apague a branch

## Nome de branch

`etapaN/codigo-da-tarefa-descricao-curta`, com a etapa e o código da tarefa que estão em [`docs/03-specifications/`](../docs/03-specifications/roteiro.md).

| Situação | Exemplo |
|----------|---------|
| Tarefa de uma etapa | `etapa3/t3-3-tela-variantes` |
| Correção ligada a uma tarefa | `etapa5/t5-5-mensagem-saldo-insuficiente` |
| Só documentação | `docs/glossario-modulo` |

## Mensagem de commit

Formato: `tipo: o que foi feito` (em português, verbo no presente).

✅ Bons:
```
feat: adiciona campo de temperatura de cor na variante
fix: corrige busca de produto por setor
docs: atualiza glossário com o termo "módulo"
```

❌ Ruins:
```
ajustes
alterações
agora vai
```

## Review

- Toda PR precisa de **pelo menos 1 aprovação** antes do merge
- De preferência, quem revisa é o responsável pela camada (front, back ou banco) que a PR mexe
- O review olha principalmente: está organizado? a explicação foi escrita? roda sem erro?

## Deu conflito, e agora?

Conflito acontece quando você e outra pessoa mexeram no mesmo trecho. É normal.

```bash
git checkout main
git pull
git checkout sua-branch
git merge main
```

O Git vai marcar os arquivos com conflito. Abra no Antigravity, que mostra as duas versões lado a lado, escolha o que fica, salve e:

```bash
git add .
git commit -m "fix: resolve conflito com a main"
git push
```

Se não souber qual versão manter, pergunte no grupo antes de escolher.
