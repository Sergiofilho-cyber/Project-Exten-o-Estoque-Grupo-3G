# Escopo

## O que entra nesta versão

| Módulo | Entrega |
|---|---|
| Acesso | Login, perfis e liberação de novos usuários |
| Catálogo | Categorias, famílias, variantes, atributos e imagens |
| Locais | Árvore de endereços com código único |
| Movimentações | Entrada, saída, transferência e ajuste, com histórico permanente |
| Consulta | "Onde está este produto?" e "O que há neste local?", no celular e no computador |
| Estoque mínimo | Limite por categoria com exceção por variante, e lista de itens críticos |
| Inventário | Contagem por local com geração de ajustes |
| Documentos de saída | Recebimento de pedidos externos e baixa por QR code |
| Importação | Carga inicial do catálogo por planilha (CSV) |

## O que fica de fora

| Item | Motivo |
|---|---|
| Visualização 3D ou mapa de ocupação | Depende de dados que só existirão depois do uso. Fica para uma fase futura |
| Composição de produto (kit de componentes) | Aumenta muito o modelo. A empresa hoje conta só o produto final |
| Rastreio de lote ou contêiner | Não é necessidade atual |
| Várias empresas no mesmo banco | Cada instalação atende uma empresa |
| Uso sem internet | Há Wi-Fi nos galpões |
| Preço de venda, faturamento e nota fiscal | São do sistema comercial, não do estoque |
| Acabamento visual | Nesta fase a interface é funcional, feita para testar |

## Fases futuras

1. **Etiquetas**: impressão de etiquetas com QR code para locais e caixas.
2. **Composição**: produto final formado por um grupo de componentes, com baixa automática dos componentes na montagem.
3. **Ocupação**: mapa dos locais colorido pelo percentual ocupado, usando o campo de capacidade que já existe em [[glossario#Local|local]].
4. **Visualização 3D** dos galpões, construída sobre o mapa de ocupação.
5. **Várias empresas** em uma única instalação.

## Decisões pendentes

- Publicação em container na VPS: ver [[decisions#Publicação em container na VPS]].

Novas pendências devem ser registradas em [[decisions]] com as opções e uma recomendação.
