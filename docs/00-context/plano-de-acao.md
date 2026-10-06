# Plano de ação

Texto da seção **2. Projeto e Plano de Ação** do Portfólio Institucional (modelo da Central de Extensão Curricular da UNIFAMETRO). O diagnóstico (seção 1 do portfólio) já foi escrito pela equipe a partir da visita técnica; este plano parte dele.

> **Rascunho.** Itens marcados com ⏳ dependem de confirmação: datas já realizadas, nomes por frente e as ações em campo propostas, que precisam ser combinadas com a empresa.

| Item | Descrição |
|---|---|
| Curso | Análise e Desenvolvimento de Sistemas |
| Disciplina | Projeto de Extensão Prática Profissional e Gestão |
| Título | Sistema de Catalogação e Endereçamento de Estoque para Empresa do Setor de Iluminação |
| Supervisora | Rosana Marques |
| Parceiro | Grupo 3G |
| Equipe | Joel Caleb Coelho dos Santos, Lucas Amaro Oliveira, Antonio Sergio Freitas Rodrigues Filho, Lucas Soares Saraiva, Eduardo Martins da Silva do Carmo, Felipe Cauã Pereira Ladislau Costa, Antonio Geovane Porto Camelo |

## 2.1 Apresentação do projeto

O projeto propõe o desenvolvimento, em conjunto com o Grupo 3G, de um sistema web de catalogação e endereçamento de estoque. A proposta responde a uma demanda apresentada pela própria empresa: o sistema comercial em uso registra saldos, mas não representa as variações dos produtos nem informa onde cada item está guardado, e essa informação hoje existe apenas na memória dos funcionários mais antigos.

A intervenção se organiza em dois eixos. O primeiro é o **cadastro**, capaz de distinguir famílias de produtos e suas variantes (potência, temperatura de cor, tensão), cada uma com saldo próprio. O segundo é o **endereçamento**, que associa cada item a uma posição identificada de galpão, setor e módulo. Sobre essa base, o sistema registra toda entrada, saída, transferência e ajuste com responsável e data, permite a consulta pelo celular dentro dos galpões e apoia a contagem física periódica.

A integração entre saberes se dá na própria construção. O conhecimento sobre o funcionamento do estoque, as categorias de produto e a forma de organizar os galpões pertence aos trabalhadores da empresa; à equipe discente cabe a mediação técnica que transforma esse conhecimento em estrutura de dados, telas e regras. Por isso as definições centrais do sistema (atributos de cada categoria, níveis e códigos de endereçamento, perfis de acesso) são validadas com a equipe da empresa antes de serem construídas, e o sistema é testado por quem vai usá-lo.

## 2.2 Justificativa

A visita técnica e a reunião com a gerência de compras e suprimentos confirmaram três problemas: divergência entre saldo registrado e físico, cadastro incapaz de representar variantes e ausência de endereçamento. Seus efeitos atingem vendas, montagem, separação de pedidos e, sobretudo, as compras de importação, decididas com horizonte de cerca de quatro meses sobre saldos pouco confiáveis.

Do ponto de vista da organização, o ganho central é converter em informação registrada um conhecimento hoje tácito (NONAKA; TAKEUCHI, 1997), ampliando a autonomia de colaboradores novos e menos experientes. Do ponto de vista logístico, a acuracidade do estoque e o endereçamento são condições para reduzir erros de separação e equilibrar nível de serviço e capital imobilizado (BALLOU, 2006); e a qualidade da decisão gerencial depende da qualidade dos dados disponíveis (LAUDON; LAUDON, 2014).

Do ponto de vista acadêmico, o projeto exige da equipe competências que exercícios fechados não desenvolvem: traduzir um problema de negócio em requisitos, modelar dados a partir de uma realidade física observada, construir uma interface adequada a usuários com diferentes níveis de familiaridade tecnológica e trabalhar em equipe com divisão de responsabilidades, revisão mútua e documentação. Em coerência com a concepção dialógica de extensão (FREIRE, 1983) e com a Resolução CNE/CES nº 7/2018, a intervenção é feita com a comunidade de trabalho da empresa, e não sobre ela.

Registre-se o limite do projeto: o sistema fornece a estrutura que torna possível corrigir e manter os saldos, mas a correção em si depende de contagem física e de disciplina de processo, que são atribuições da empresa.

## 2.3 Objetivos

### 2.3.1 Geral
Desenvolver, em conjunto com o Grupo 3G, um sistema web de catalogação e endereçamento de estoque, utilizável pelo celular nos galpões, que registre o que a empresa possui, em que quantidade e em que posição física, com histórico permanente de toda movimentação.

### 2.3.2 Específicos
- Validar com a equipe da empresa as categorias de produto, seus atributos técnicos e os perfis de acesso ao sistema.
- Definir com a equipe de estoque os níveis de endereçamento dos galpões e o padrão de código de cada local.
- Construir o cadastro de produtos em dois níveis (família e variante), com atributos configuráveis por categoria e imagens.
- Construir o registro de entradas, saídas, transferências e ajustes, com responsável e data, sem permitir saldo negativo.
- Permitir a consulta "onde está este produto?" e "o que há neste local?" pelo celular.
- Apoiar o inventário de um local, transformando cada diferença encontrada em ajuste registrado.
- Permitir a baixa de pedidos emitidos por outro sistema da empresa por leitura de QR code.
- Carregar o catálogo real da empresa a partir de planilha e acompanhar o uso inicial pela equipe de estoque.

## 2.4 Público-alvo

O público sociocomunitário é a comunidade de trabalho do Grupo 3G, empresa cearense do setor de iluminação com mais de três mil itens distribuídos em cerca de oito galpões e duas marcas que compartilham o mesmo estoque:

- **Equipe de estoque e logística**: público direto. Registra movimentações, faz inventário, dá baixa em pedidos e consulta onde estão os produtos.
- **Gerência de compras e suprimentos**: passa a decidir reposição e importação sobre saldos rastreáveis e lista de itens críticos.
- **Equipe de montagem**: localiza componentes e produtos sem depender de colegas.
- **Equipe comercial**: consulta disponibilidade real antes de fechar vendas.
- **Colaboradores novos e menos experientes**: ganham autonomia ao acessar uma informação que hoje é individual.

Indiretamente, beneficiam-se os clientes da empresa, incluindo obras e serviços de iluminação pública, pela maior regularidade das entregas. A equipe discente, por sua vez, vivencia o ciclo completo de um projeto real de software.

## 2.5 Metodologia

### 2.5.1 Diagnóstico (participativo)

O diagnóstico foi construído na visita técnica à empresa, em reunião com o gerente de compras e suprimentos e em percurso pelas instalações de armazenagem (seção 1 do portfólio). A demanda partiu da própria empresa e foi confirmada pela observação direta dos galpões. A partir dele, a equipe registrou o escopo, os requisitos e as regras de negócio do sistema na documentação do projeto ([[project-overview]], [[escopo]], [[PRD]], [[domain-model]]), que será validada com a empresa na Ação 1.

### 2.5.2 Planejamento conjunto

**Com a empresa.** As decisões que dependem do conhecimento dos trabalhadores são tomadas em conjunto: quais categorias e atributos existem, como os galpões serão divididos e codificados, quem pode fazer o quê no sistema. O sistema é validado por quem vai usá-lo, no celular e no próprio galpão.

**Na equipe.** Os sete integrantes se dividem em três frentes, cada uma com responsabilidade e pasta próprias no repositório ([[decisions#ADR-13 Divisão do trabalho por frente|ADR-13]]):

| Frente | Integrantes | Responsabilidade |
|---|---|---|
| Coordenação e backend | ⏳ 3 integrantes | Base do aplicativo, especificação do banco para a equipe de banco, sessão e acesso aos dados, testes de integração e coordenação geral |
| Banco de dados | ⏳ 3 integrantes | Construção do banco no Supabase a partir da especificação: tabelas, funções, regras de acesso, dados de teste |
| Front-end | ⏳ 2 integrantes | Telas funcionais, identidade visual e tipografia, com foco no uso pelo celular |

O desenvolvimento segue fases encadeadas, cada uma com uma entrega testável:

| Fase | Frente | Entrega |
|---|---|---|
| 0 Preparação | Coordenação | Repositório, documentação e ambiente de cada integrante |
| 1 Base e especificação | Coordenação e backend | Aplicativo base e documento de especificação do banco |
| 2 Construção do banco | Banco de dados | Banco montado e testado no Supabase |
| 3 Validação e integração | Coordenação e backend | Aplicativo ligado ao banco, com testes por perfil de acesso |
| 4 Telas e design | Front-end, com apoio do backend | Telas de catálogo, locais, movimentações e consulta, com identidade visual |
| 5 Inventário, documentos e importação | Todas | Funções restantes e carga do catálogo real |

A identidade visual e o protótipo das telas (front-end) e o estudo do modelo de dados (banco) acontecem em paralelo às fases 1 a 3. O trabalho é registrado no GitHub: cada tarefa em uma branch, revisada por outro integrante antes de entrar no projeto ([[contribuicao]]). Cada integrante faz um check-in semanal no grupo (o que fez, o que vai fazer, onde travou). Tecnologias e justificativas em [[tech-stack]].

### 2.5.3 Ações planejadas

- **Ação 1: Validação participativa dos requisitos** ⏳
  Encontro com a gerência de compras e a equipe de estoque para apresentar o que foi entendido na visita e validar categorias de produto, atributos técnicos, perfis de acesso e o fluxo de saída de mercadoria.
  *Resultado esperado*: requisitos confirmados ou corrigidos pela empresa antes da construção.

- **Ação 2: Construção conjunta do endereçamento** ⏳
  Percurso pelos galpões com a equipe de estoque para definir os níveis de endereçamento (galpão, setor, módulo) e o padrão de código de cada local.
  *Resultado esperado*: árvore de locais e padrão de códigos definidos com quem trabalha no galpão, prontos para cadastro.

- **Ação 3: Desenvolvimento do sistema**
  Execução das fases 0 a 5 pelas três frentes da equipe, com entregas parciais testáveis.
  *Resultado esperado*: sistema funcional para cadastro, endereçamento, movimentação e consulta pelo celular.

- **Ação 4: Uso acompanhado e material orientativo** ⏳
  Sessão com a equipe de estoque para usar o sistema no galpão, pelo celular, com os produtos reais; entrega de um guia de uso curto.
  *Resultado esperado*: retorno dos usuários registrado e convertido em ajustes; colaboradores aptos a usar o sistema.

- **Ação 5: Apresentação dos resultados**
  Devolutiva à empresa e apresentação no Simpósio de Extensão.
  *Resultado esperado*: resultados comunicados à empresa e à comunidade acadêmica.

### Resultados esperados e como verificar

| Resultado | Como verificar |
|---|---|
| Saldo sempre explicado pelo histórico | Toda movimentação guarda quem fez e quando; o histórico não pode ser alterado |
| Consulta rápida no celular | Do login até achar o local de um produto em até três toques |
| Segurança por perfil | Cada perfil só lê e grava o que lhe cabe, testado diretamente no banco |
| Operações sem erro de saldo | Duas saídas simultâneas do mesmo item não deixam o saldo errado |
| Sistema adaptável | Uma categoria nova é criada pela tela, sem alterar o código |

Lista completa em [[PRD#Requisitos não funcionais]].

## 2.6 Cronograma de execução

Proposta a partir da data do simpósio. ⏳ Confirmar as datas já realizadas e as das ações em campo com a empresa.

| Ação / Atividade | Data prevista | Responsáveis |
|---|---|---|
| Reunião de supervisão inicial | ⏳ | Todos |
| Visita em campo / Territorialização | ⏳ (realizada) | Todos |
| Fase 0 e 1: preparação, base do aplicativo e especificação do banco | 06/10 a 11/10/2026 | Coordenação e backend |
| Ação 1: validação participativa dos requisitos | ⏳ semana de 06/10/2026 | Coordenação e representantes das frentes |
| Fase 2: construção do banco | 13/10 a 18/10/2026 | Banco de dados |
| Ação 2: construção conjunta do endereçamento | ⏳ semana de 13/10/2026 | Coordenação e front-end |
| Protótipo e identidade visual | 06/10 a 25/10/2026 | Front-end |
| Fase 3: validação e integração | 20/10 a 25/10/2026 | Coordenação e backend |
| Fase 4: telas e design | 27/10 a 08/11/2026 | Front-end, com apoio do backend |
| Ação 4: uso acompanhado e material orientativo | ⏳ semana de 03/11/2026 | Todos |
| Apresentação no Simpósio | 10 a 13/11/2026 | Todos |
| Fase 5: inventário, documentos de saída e importação | ⏳ após o simpósio | Todos |
| Devolutiva à empresa | ⏳ | Todos |

## Referências

BALLOU, Ronald H. *Gerenciamento da cadeia de suprimentos/logística empresarial*. 5. ed. Porto Alegre: Bookman, 2006.

BRASIL. Conselho Nacional de Educação. Câmara de Educação Superior. Resolução nº 7, de 18 de dezembro de 2018. Brasília, DF: MEC, 2018.

FREIRE, Paulo. *Extensão ou comunicação?* 8. ed. Rio de Janeiro: Paz e Terra, 1983.

LAUDON, Kenneth C.; LAUDON, Jane P. *Sistemas de informação gerenciais*. 11. ed. São Paulo: Pearson, 2014.

NONAKA, Ikujiro; TAKEUCHI, Hirotaka. *Criação de conhecimento na empresa*. Rio de Janeiro: Campus, 1997.

## Ligações
[[project-overview]] · [[escopo]] · [[PRD]] · [[roteiro]] · [[decisions]]
