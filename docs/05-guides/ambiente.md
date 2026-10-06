# Montando o ambiente

## O que instalar

- Node.js 20 ou mais recente
- Git
- Um editor de código
- Obsidian, para ler esta documentação (opcional)

## Passo a passo

1. Clone o repositório: `git clone <endereço do repositório>`.
2. Entre na pasta do aplicativo e instale as dependências: `cd frontend` e `npm install`.
3. Ainda em `frontend/`, copie `.env.example` para `.env.local` e preencha com os valores do Supabase de desenvolvimento. Peça os valores ao responsável pelo projeto, por mensagem privada.
4. Rode o projeto: `npm run dev`.
5. Abra `http://localhost:3000`.

Todos os comandos `npm` e `npx` do projeto rodam dentro de `frontend/`.

## Variáveis de ambiente

| Variável | O que é |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Endereço do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço. Só no servidor, nunca no navegador |
| `NEXT_PUBLIC_AUTH_COOKIE_DOMAIN` | Opcional. Só para compartilhar a sessão entre subdomínios; vazio, o cookie vale só para o endereço atual |

## Montando um banco do zero

1. Crie um projeto novo no Supabase.
2. No editor SQL, execute os arquivos de `backend/supabase/migrations/` na ordem dos nomes.
3. Execute `backend/supabase/seed.sql` para ter dados de teste.
4. Cadastre-se pelo aplicativo e, no painel do Supabase, altere seu cargo para `admin` na tabela `perfis`. Esse é o único ajuste manual, feito uma vez por ambiente.

O mesmo procedimento monta o ambiente de produção no servidor da empresa, sem o passo 3.

## Problemas comuns

| Sintoma | Causa provável |
|---|---|
| Tela em branco após o login | Perfil ainda `pendente` |
| "permission denied" ao movimentar | Seu perfil não é gerente de estoque nem admin |
| Listas vazias | Seed não aplicado, ou perfil sem permissão de leitura |
