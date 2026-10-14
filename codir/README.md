# CODIR | Apresentação do Portal IFMG

Apresentação para o Colégio de Dirigentes (CODIR) do IFMG, em português brasileiro. Inclui o diagnóstico do portal, os critérios de pesquisa, a proposta de arquitetura da informação, o Guia do Portal, o trabalho com as áreas e a validação em curso.

A apresentação é feita em HTML, CSS e JavaScript, sem React, Next.js ou processo de compilação. Tem **17 slides**.

Arquivos:
- `index.html`: conteúdo, organização dos slides e descrição das capturas.
- `styles.css`: apresentação, gráficos, matrizes e versões para telas menores.
- `script.js`: navegação, tela cheia (`F`), links para slides (`#slide-N`) e ampliação das imagens.
- `assets/`: capturas de tela locais.

## Slides 10 a 14: Guia do Portal

A seção foi refeita em 14 de outubro de 2026 a partir de quatro capturas adicionadas ao repositório:

| Slide | Tema | Imagem em `assets` |
| --- | --- | --- |
| 10 | Apresentação do guia, busca, fundamentos e perfis | `Screenshot 2026-10-14 at 15.56.26.png` |
| 11 | Tarefas por função, com exemplo do perfil editor | `Screenshot 2026-10-14 at 15.57.12.png` |
| 12 | Mapa da estrutura do portal, em construção | `Screenshot 2026-10-14 at 15.56.38.png` |
| 13 | Busca por intenção: situação atual e evolução proposta | Exemplo conceitual, sem captura de uma busca semântica funcionando |
| 14 | Instruções do guia para usar IA, criar páginas e sugerir blocos do Wagtail | `Screenshot 2026-10-14 at 15.56.59.png` |

As imagens podem ser ampliadas por clique. As duas capturas anteriores do Guia do Portal também permanecem na pasta `assets/` como arquivos de referência.

Fonte do conteúdo: [repositório Guia do Portal IFMG](https://github.com/leorruas/guiaportalifmg). A orientação por função e as tarefas documentadas são recursos do guia atual. O mapa mostra somente páginas e relações já mapeadas e informa que está em construção.

**Estado das funcionalidades:** a busca disponível hoje usa correspondência textual e ranqueamento por relevância, considerando títulos, aliases e tolerância limitada a erros de digitação. A interpretação **semântica** da intenção foi apresentada como evolução planejada. O guia já disponibiliza instruções e exemplos de prompts para usar assistentes externos na revisão de conteúdo, preparação de imagens e sugestão de blocos documentados no Wagtail. Isso não comprova que exista um gerador automático de páginas integrado ao Wagtail. A decisão editorial, as permissões e a publicação continuam com as equipes.

## Acesso

Se o GitHub Pages estiver publicado a partir da raiz da branch `main`, abra `https://leorruas.github.io/pesquisa/codir/`. Os arquivos do CSS e JavaScript e as imagens locais são carregados por caminhos relativos.

## Recursos externos e limites da apresentação

Quatro capturas de outros slides continuam hospedadas publicamente no portfólio: o portal institucional atual, a proposta de portal, o Guia do Estudante e o piloto de Ouro Branco. Para a apresentação funcionar inteiramente sem depender do portfólio, essas capturas precisam ser copiadas para `codir/assets/` e os respectivos caminhos no HTML atualizados. As fontes DM Sans e Roboto Mono são carregadas do Google Fonts, com alternativas locais.

Os dados, períodos e limites das evidências foram mantidos da versão anterior. A apresentação ainda precisa de confirmação do estado atual dos testes de usabilidade no Campus Ouro Branco antes da reunião.
