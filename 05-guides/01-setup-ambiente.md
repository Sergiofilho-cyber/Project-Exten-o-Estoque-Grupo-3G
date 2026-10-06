# 01 — Setup do ambiente

Objetivo: sair do zero até o sistema rodando na sua máquina em uns 10 minutos.

> O passo a passo oficial, com a lista de variáveis e como montar um banco do zero, está em [`docs/05-guides/ambiente.md`](../docs/05-guides/ambiente.md). Este guia é o resumo prático.

## 1. Contas

- [ ] Criar conta no [GitHub](https://github.com) (use seu nome real ou algo reconhecível no perfil)
- [ ] Passar seu usuário do GitHub pro responsável pelo repositório
- [ ] Aceitar o convite do repositório (chega por e-mail)

## 2. Ferramentas

- [ ] **Git** — https://git-scm.com/downloads
- [ ] **Node.js 20 ou mais recente** — https://nodejs.org
- [ ] **Um editor de código.** Recomendado: **Antigravity**, IDE baseada no VS Code, com Gemini integrado e gratuita para universitários
- [ ] **Obsidian** (opcional), para ler a pasta `docs/` com os links navegáveis

> O Antigravity é a IDE **recomendada**, mas não é obrigatória. As regras de formatação ficam no próprio repositório (config do linter), então quem usar VS Code ou outra IDE segue o mesmo padrão.

Não é preciso instalar banco de dados: o projeto usa um Supabase de desenvolvimento, na nuvem, compartilhado pela equipe.

## 3. Configurar o Git (só na primeira vez)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email-do-github@exemplo.com"
```

Use o mesmo e-mail da conta do GitHub, senão seus commits não aparecem no seu perfil.

## 4. Clonar o projeto

```bash
git clone https://github.com/Tyonh/Project-Exten-o-Estoque-Grupo-3G.git
cd Project-Exten-o-Estoque-Grupo-3G
```

## 5. Instalar e configurar o aplicativo

O aplicativo fica em `frontend/`. Todos os comandos `npm` e `npx` rodam dentro dessa pasta.

```bash
cd frontend
npm install
cp .env.example .env.local
```

Preencha o `.env.local` com os valores que o responsável pelo projeto passar por mensagem privada. Nunca commite o `.env.local`.

## 6. Rodar

```bash
npm run dev
```

Abra `http://localhost:3000`.

## ✅ Checklist final

- [ ] A tela de login abriu no navegador
- [ ] `npm run lint` e `npx tsc --noEmit` rodam sem erros

Se algum item falhar, vá direto pro guia [07 — Quando travar](07-quando-travar.md).
