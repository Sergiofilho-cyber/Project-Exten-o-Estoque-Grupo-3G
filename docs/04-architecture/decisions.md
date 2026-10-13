# Decisões de arquitetura (ADRs)

Cada decisão registra o contexto, o que foi escolhido e o que isso custa. Decisões não são apagadas: se uma mudar, registra-se uma nova que substitui a anterior.

## ADR-01 Supabase como banco, login e armazenamento
- **Contexto**: a equipe é pequena, com experiências diferentes, e o prazo é curto.
- **Decisão**: usar Supabase (PostgreSQL, autenticação e armazenamento de imagens).
- **Ganho**: login e banco prontos; regras de acesso no próprio banco.
- **Custo**: dependência de um fornecedor. Atenuado porque a estrutura é PostgreSQL comum, portável.

## ADR-02 Catálogo em dois níveis com atributos configuráveis
- **Contexto**: o mesmo modelo de produto existe em várias potências, cores e tensões, e cada linha de produto tem características próprias.
- **Decisão**: [[glossario#Família|família]] e [[glossario#Variante|variante]]; os atributos são definidos na categoria e guardados na variante em formato flexível.
- **Ganho**: o saldo é sempre de um item real; categorias novas não exigem mudança no banco.
- **Custo**: o banco não valida o conteúdo dos atributos; a validação fica na tela. Filtrar por atributo exige índice próprio quando o catálogo crescer.

## ADR-03 Regras de estoque dentro do banco
- **Contexto**: se a tela ler o saldo, calcular e gravar em passos separados, duas pessoas ao mesmo tempo podem sobrescrever uma à outra, e uma falha no meio deixa a operação pela metade.
- **Decisão**: toda alteração de estoque passa por funções do banco, em transação, com trava na linha de saldo.
- **Ganho**: as regras valem para qualquer tela ou integração; não existe operação pela metade.
- **Custo**: parte da lógica fica em SQL, que menos gente da equipe domina. Atenuado com a documentação em [[banco-de-dados]].

## ADR-04 Saldo derivado do histórico
- **Contexto**: um saldo digitável não explica como chegou àquele valor.
- **Decisão**: o histórico de [[glossario#Movimentação|movimentações]] é permanente; a tabela `saldos` só é escrita pelas funções. O saldo pode ser recalculado a partir do histórico a qualquer momento.
- **Ganho**: rastreabilidade completa e consulta rápida.
- **Custo**: correções exigem uma nova movimentação, nunca edição.

## ADR-05 Locais em árvore livre
- **Contexto**: o estoque será organizado aos poucos, e outras empresas usam outra nomenclatura.
- **Decisão**: cada [[glossario#Local|local]] aponta para o local que o contém e tem um tipo de texto livre. Qualquer nível pode guardar mercadoria.
- **Ganho**: serve a qualquer organização física; permite começar simples e detalhar depois.
- **Custo**: relatórios "por galpão" precisam percorrer a árvore.

## ADR-06 Estoque contado em caixas
- **Contexto**: a mercadoria é armazenada e movimentada em caixas.
- **Decisão**: a quantidade é um número inteiro de caixas.
- **Custo**: venda de unidade avulsa não é representada. Se virar necessidade, registrar a unidade na variante em uma nova decisão.

## ADR-07 Documento de saída como módulo genérico
- **Contexto**: os pedidos de retirada nascem em outro sistema da empresa.
- **Decisão**: o estoque recebe documentos com protocolo e itens, sem depender de como o sistema emissor funciona. A baixa é confirmada por QR code.
- **Ganho**: qualquer sistema emissor pode ser conectado.
- **Custo**: o emissor precisa enviar o código da variante exatamente como está no catálogo.

## ADR-08 Baixa sempre pelo gerente de estoque
- **Contexto**: era preciso definir quem confirma a saída de mercadoria.
- **Decisão**: toda saída, avulsa ou por documento, é confirmada pelo perfil Gerente de Estoque. O Estoquista só consulta.
- **Ganho**: um único responsável por tudo que sai.
- **Custo**: o gerente de estoque vira ponto único da operação. As permissões estão concentradas em uma função do banco (`pode_operar`), então mudar a regra depois é uma alteração pequena.

## ADR-09 Uma empresa por instalação
- **Contexto**: o sistema deve servir a outras empresas, mas isolar várias empresas no mesmo banco afeta todas as tabelas e regras.
- **Decisão**: cada instalação atende uma empresa. A adaptação a outra empresa vem de dados configuráveis, não de separação por empresa.
- **Custo**: atender várias empresas juntas exigirá uma migração futura. Registrado em [[escopo#Fases futuras]].

## ADR-10 Estrutura do banco versionada em migrações
- **Contexto**: o sistema será desenvolvido em um ambiente e depois montado no servidor da empresa.
- **Decisão**: toda a estrutura fica em arquivos SQL em `backend/supabase/migrations/`, aplicados em ordem.
- **Ganho**: qualquer ambiente é reproduzível; toda mudança passa por revisão.
- **Custo**: ninguém altera o banco pelo painel.

## ADR-11 Sem modo offline
- **Contexto**: há Wi-Fi nos galpões.
- **Decisão**: o sistema exige conexão.
- **Custo**: sem rede, não há consulta nem baixa.

## ADR-12 Repositório dividido em frontend e backend
- **Contexto**: a equipe entende melhor o projeto quando cada parte tem sua pasta, mas o Next.js junta telas e rotas de servidor no mesmo projeto, e as regras de estoque moram no banco ([[#ADR-03 Regras de estoque dentro do banco|ADR-03]]).
- **Decisão**: `frontend/` guarda o aplicativo Next.js inteiro; `backend/supabase/` guarda migrações, dados de teste e funções SQL. Não existe servidor de API separado.
- **Ganho**: cada pessoa sabe onde mexer, sem mudar a arquitetura.
- **Custo**: `frontend/` também contém as poucas rotas de servidor (por exemplo, a de recebimento de documentos, T8.1). Os comandos `npm` rodam dentro de `frontend/`.

## ADR-13 Divisão do trabalho por frente
- **Contexto**: a equipe tem 7 integrantes divididos em três frentes, cada uma com um líder mais experiente na área: backend (2), banco de dados (3) e front-end (2). O banco está especificado em [[banco-de-dados]]; o SQL é escrito pela frente de banco de dados. Complementa o [[#ADR-12 Repositório dividido em frontend e backend|ADR-12]].
- **Decisão**:

| Frente | Integrantes | Cuida de |
|---|---|---|
| Backend | Antonio Geovane Porto Camelo (líder) e Joel Caleb Coelho dos Santos | Parte de servidor em `frontend/`: `lib/` (funções de acesso aos dados, ver [[#ADR-14 Telas acessam os dados pelas funções de lib\|ADR-14]]), `proxy.ts` (sessão e proteção de rotas) e `app/api/` (rotas de servidor). Escreve a especificação do banco para a frente de banco, testa o banco entregue e estrutura os testes de implementação e de uso inicial |
| Banco de dados | Lucas Amaro Oliveira (líder), Lucas Soares Saraiva e Felipe Cauã Pereira Ladislau Costa | `backend/supabase/`: escreve as migrações e constrói o banco no Supabase a partir da especificação em [[banco-de-dados]], cria dados de teste, gera os tipos e escreve as migrações seguintes |
| Front-end | Eduardo Martins da Silva do Carmo (líder) e Antonio Sergio Freitas Rodrigues Filho | Telas e componentes em `frontend/app/` e `frontend/components/`, incluindo as telas funcionais, a identidade visual e a tipografia |

- **Ordem das fases**: (1) o backend estrutura a base do aplicativo e especifica o banco; (2) a frente de banco constrói o banco; (3) o backend testa o banco e estrutura os testes de implementação e de uso inicial; (4) o front-end constrói as telas e aplica o design. O plano de ação entregue à faculdade descreve as mesmas fases.
- **Ganho**: cada frente sabe onde mexer e quem revisa cada parte.
- **Custo**: as frentes dependem umas das outras (o banco precisa estar pronto antes da integração).

## ADR-14 Telas acessam os dados pelas funções de lib
- **Contexto**: com uma frente de backend e outra de front-end no mesmo aplicativo Next.js, era preciso definir onde termina o trabalho de uma e começa o da outra. Se cada tela escrevesse a própria consulta ao Supabase, as regras ficariam espalhadas e as duas frentes mexeriam nos mesmos arquivos.
- **Decisão**: só os arquivos de `frontend/lib/` falam com o Supabase. Há um arquivo por assunto (`sessao.ts`, `catalogo.ts`, `locais.ts`...), escrito pela frente de backend. As telas chamam essas funções e nunca importam o cliente do Supabase. Toda função devolve `{ ok: true, dados }` ou `{ ok: false, erro }`, com a mensagem de erro em português, pronta para a tela mostrar.
- **Ganho**: fronteira clara entre as frentes; nomes de tabelas e colunas ficam em um lugar só; a mensagem de erro do banco chega à tela sempre do mesmo jeito.
- **Custo**: o front-end depende de o backend entregar as funções antes. Atenuado com o backend trabalhando uma etapa à frente ([[roteiro#Trabalho por frente]]).

## Pendentes

### Publicação em container na VPS
- **Contexto**: o aplicativo será publicado como container em uma VPS. A configuração antiga de publicação (PM2) foi removida na [[etapa-0-preparacao|Etapa 0]] por não estar documentada.
- **Opções**: definir na reta final do projeto, ou preparar o container antes, assim que o ambiente de produção estiver definido.
- **Recomendação**: registrar a decisão como novo ADR antes da primeira publicação.
