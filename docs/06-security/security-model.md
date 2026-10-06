# Modelo de segurança

## Perfis

| Perfil | Código no banco | Quem é |
|---|---|---|
| Pendente | `pendente` | Acabou de se cadastrar; ainda não foi liberado |
| Estoquista | `estoquista` | Trabalha no galpão e consulta |
| Gerente | `gerente` | Acompanha os números |
| Gerente de Estoque | `gerente_estoque` | Responsável pela operação |
| Administrador | `admin` | Cuida dos acessos |

## O que cada perfil pode fazer

| Ação | Pendente | Estoquista | Gerente | Gerente de Estoque | Admin |
|---|---|---|---|---|---|
| Consultar catálogo, locais, saldos e histórico | não | sim | sim | sim | sim |
| Cadastrar e editar catálogo e locais | não | não | não | sim | sim |
| Registrar entrada, saída e transferência | não | não | não | sim | sim |
| Confirmar baixa de documento | não | não | não | sim | sim |
| Abrir e concluir inventário | não | não | não | sim | sim |
| Alterar o perfil de usuários | não | não | não | não | sim |

## Onde a regra é aplicada

A permissão é verificada em **dois lugares**:

1. **Na tela**: botões e páginas que o perfil não pode usar não aparecem. Isso é conforto, não segurança.
2. **No banco**: cada tabela tem políticas de acesso por linha (RLS), e cada função de estoque confere o perfil antes de agir. Esta é a proteção de verdade: vale mesmo que alguém contorne a tela.

As permissões estão concentradas em três funções do banco. Mudar quem pode o quê é alterar uma delas:

| Função | Verdadeira para |
|---|---|
| `pode_consultar()` | estoquista, gerente, gerente de estoque, admin |
| `pode_operar()` | gerente de estoque, admin |
| `e_admin()` | admin |

## Autenticação

- Login por e-mail e senha, feito pelo Supabase.
- A sessão fica em cookie e é validada no servidor a cada requisição.
- Todo cadastro novo recebe perfil `pendente` automaticamente.
- O autor de uma movimentação é sempre o usuário da sessão. Nenhuma tela envia "quem fez".

## Segredos

| Chave | Onde pode ficar | Observação |
|---|---|---|
| URL do projeto e chave pública | `.env.local` e navegador | Seguras por causa das políticas do banco |
| Chave de serviço | Somente `.env.local` do servidor | Ignora todas as políticas. Nunca vai para o navegador nem para o repositório |

Regras:
- `.env.local` está no `.gitignore` e nunca é enviado ao repositório.
- Nenhum arquivo do repositório contém chave escrita no código, nem em scripts de teste.
- Se uma chave vazar, ela é trocada no painel do Supabase na mesma hora.

## Dados pessoais (LGPD)

O sistema guarda poucos dados pessoais: nome e e-mail dos usuários, e o nome do cliente e do solicitante nos documentos de saída. Esses dados são usados só para identificar quem fez o quê e para quem a mercadoria saiu. Não há dado sensível.

## Como testar

Para cada perfil, entrar no sistema e conferir a tabela de permissões acima. O teste precisa incluir a tentativa pelo banco, não só pela tela: por exemplo, chamar `registrar_movimentacao` logado como estoquista deve devolver erro de permissão.
