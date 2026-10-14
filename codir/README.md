# CODIR | Apresentação do Portal IFMG

Apresentação para o Colégio de Dirigentes (CODIR) do IFMG, em português brasileiro. Inclui o diagnóstico do portal, os critérios de pesquisa, a proposta de arquitetura da informação, o Guia do Portal, o trabalho com as áreas e os resultados formativos dos testes de Ouro Branco.

A apresentação é feita em HTML, CSS e JavaScript, sem React, Next.js ou processo de compilação. Tem **19 slides**.

Arquivos:
- `index.html`: conteúdo, organização dos slides e descrição das capturas.
- `styles.css`: apresentação, gráficos, matrizes e versões para telas menores.
- `script.js`: navegação, tela cheia (`F`) com escala adaptada à resolução do monitor, links para slides (`#slide-N`) e ampliação das imagens.
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

## Slides 16 a 18: resultados dos testes de Ouro Branco

A apresentação agora inclui resultados reais, retirados do repositório [`novo-portal`](https://github.com/leorruas/novo-portal):

- **Slide 16:** cinco sessões com estudantes, realizadas de 20 a 31 de agosto de 2026. Calendário acadêmico: 3 conclusões em 5 tentativas; monitoria: 2 em 5; secretaria acadêmica: 4 em 4; biblioteca/renovação: 2 em 2. Os denominadores correspondem às tarefas efetivamente aplicadas, e não a todos os participantes em todos os cenários.
- **Slide 17:** achados de três sessões documentadas com servidores. O relatório da primeira consolidação contabiliza duas sessões; a nota e o resumo atualizados incluem a terceira, realizada em 8 de setembro. A dificuldade de localizar PPC nessa sessão (7/7) e a necessidade de ajuda para calendário e suporte de TI são exemplos qualitativos. Não agregamos os três participantes em uma taxa única.
- **Slide 18:** mudanças propostas: separar calendário, horários e monitoria; criar caminhos cruzados para documentos de cursos e estágio; explicitar a ação de suporte de TI; corrigir e testar novamente. São recomendações ainda sem confirmação de implementação e impacto.

Fontes: [relatório dos testes de Ouro Branco](https://github.com/leorruas/novo-portal/tree/main/02%20-%20Pesquisa%20%28UXR%29/testes-de-usabilidade/relatorios), [resumo e log](https://github.com/leorruas/novo-portal/tree/main/02%20-%20Pesquisa%20%28UXR%29/testes-de-usabilidade/ouro-branco) e ficha `S-OB-03.md` no subdiretório de notas de servidores. O relatório principal apresenta inicialmente cinco estudantes e dois servidores; o registro posterior acrescenta a terceira sessão, sem atualizar retrospectivamente as contagens quantitativas do relatório inicial.

Estes testes são **formativos** e ocorreram em um protótipo, não em uma versão de produção. Não sustentam estimativas populacionais, métricas gerais de eficiência ou afirmações de impacto do redesenho. Nem todas as tarefas foram aplicadas e registradas de forma uniforme.

## Tela cheia e projeção

Ao entrar no modo de tela cheia pelo botão ou pela tecla `F`, o JavaScript calcula um fator de ampliação considerando a largura e a altura disponíveis. O CSS aplica esse fator à composição do slide como um todo: tipografia, imagens, gráficos e demais elementos. O fator é recalculado quando a janela ou o monitor muda de tamanho; ao sair do modo de tela cheia, a escala normal é restaurada.

A ampliação é limitada para reduzir cortes. Os slides com conteúdo mais extenso mantêm a rolagem vertical, em vez de encolher o texto para caber em uma única tela. Em telas pequenas, permanece o layout responsivo original.

## Acesso

Se o GitHub Pages estiver publicado a partir da raiz da branch `main`, abra `https://leorruas.github.io/pesquisa/codir/`. Os arquivos do CSS e JavaScript e as imagens locais são carregados por caminhos relativos.

## Recursos externos e limites da apresentação

Quatro capturas de outros slides continuam hospedadas publicamente no portfólio: o portal institucional atual, a proposta de portal, o Guia do Estudante e o piloto de Ouro Branco. Para a apresentação funcionar inteiramente sem depender do portfólio, essas capturas precisam ser copiadas para `codir/assets/` e os respectivos caminhos no HTML atualizados. As fontes DM Sans e Roboto Mono são carregadas do Google Fonts, com alternativas locais.

Os dados, períodos e limites das evidências foram mantidos da versão anterior. Os testes de Ouro Branco já têm resultados documentados. Antes da reunião, ainda é necessário verificar o estado de implementação das recomendações e se houve nova rodada após 8 de setembro.
