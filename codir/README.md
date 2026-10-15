# CODIR | Apresentação do Portal IFMG

Apresentação para o Colégio de Dirigentes (CODIR) do IFMG, em português brasileiro. Inclui o diagnóstico do portal, os critérios de pesquisa, a proposta de arquitetura da informação, o Guia do Portal, o trabalho com as áreas e os resultados formativos dos testes de Ouro Branco.

A apresentação é feita em HTML, CSS e JavaScript, sem React, Next.js ou processo de compilação. Tem **22 slides**.

Arquivos:
- `index.html`: conteúdo, organização dos slides e descrição das capturas.
- `styles.css`: apresentação, gráficos, matrizes e versões para telas menores.
- `script.js`: navegação, tela cheia (`F`) com escala adaptada à resolução do monitor, links para slides (`#slide-N`) e ampliação das imagens.
- `assets/`: capturas de tela locais.
- `grafo/`: visualização interativa do mapeamento da Reitoria, com uma cópia versionada de `data.js` de [`sitedoifmggrafo`](https://github.com/leorruas/sitedoifmggrafo).
- `grafo-guia/`: módulo do mapa do Guia do Portal, com as mesmas páginas, relações e cálculo da distância da Home usados em [`guiaportalifmg`](https://github.com/leorruas/guiaportalifmg).

## Slide 2: mapa de páginas e conexões da Reitoria

A abertura, logo depois da capa, mostra um mapa interativo das páginas do portal da Reitoria com dados provenientes do repositório [sitedoifmggrafo](https://github.com/leorruas/sitedoifmggrafo). O conjunto original contém 465 registros de nós e 639 conexões, antes de normalizar URLs duplicadas e filtrar referências externas ao escopo `/portal`.

O grafo é carregado a partir de `codir/grafo/index.html`, `graph.js` e de uma cópia local de `data.js`. Permite visualizar toda a estrutura, destacar apenas o primeiro nível, aproximar, recuar, recentrar e selecionar nós para ver o nome da página e seu endereço. O carregamento do Cytoscape ainda depende da CDN usada no projeto original. O slide oferece link para a fonte.

**Limite metodológico:** as linhas mostram vínculos documentados entre páginas, não os caminhos reais percorridos pelos usuários. A densidade do grafo serve de abertura visual para discutir organização e acesso, sem estabelecer por si só que uma tarefa seria difícil. As métricas de uso e os testes de usabilidade aparecem nos slides seguintes.

## Slide 4: percurso metodológico

Logo depois do problema do portal, o slide apresenta uma sequência de quatro frentes de pesquisa e projeto:

1. **Benchmarking institucional:** comparação com outras instituições, incluindo o relato do IFRN sobre arquitetura, tipos de página, Wagtail e governança.
2. **Funções e tarefas do portal:** análise dos serviços e dos objetivos de quem acessa o site (ingresso, vida acadêmica, documentos, sistemas e atendimento), traduzidos em tarefas e necessidades dos públicos.
3. **Google Analytics 4:** análise de visualizações, buscas e caminhos de páginas para identificar demandas candidatas a destaque e teste. O GA4 não identifica a pessoa que acessou cada caminho, nem confirma a conclusão das tarefas. A importância legal ou institucional dos serviços também integra a priorização.
4. **Testes de usabilidade e iteração:** aplicação de tarefas com estudantes e servidores no protótipo de Ouro Branco para ajustar nomes e caminhos antes de considerar replicação e validação em outros campi.

A metodologia conecta pesquisa, definição da arquitetura, validação e expansão gradual. **Não significa que a proposta já esteja implantada nos demais campi.** As evidências e os resultados são detalhados nos slides posteriores.

## Slides 12 a 16: Guia do Portal

A seção foi refeita em 14 de outubro de 2026 a partir de quatro capturas adicionadas ao repositório:

| Slide | Tema | Imagem em `assets` |
| --- | --- | --- |
| 12 | Apresentação do guia, busca, fundamentos e perfis | `Screenshot 2026-10-14 at 15.56.26.png` |
| 13 | Tarefas por função, com exemplo do perfil editor | `Screenshot 2026-10-14 at 15.57.12.png` |
| 14 | Mapa da estrutura do portal, em construção | `Screenshot 2026-10-14 at 15.56.38.png` |
| 15 | Busca por intenção: situação atual e evolução proposta | Exemplo com os nomes reais das páginas de edição e moderação, sem simular um ranking real |
| 16 | Instruções do guia para usar IA, criar páginas e sugerir blocos do Wagtail | `Screenshot 2026-10-14 at 15.56.59.png` |

O **slide 21 (penúltimo)** incorpora a visualização interativa acionada por **“Mostrar distância da Home”** no Guia do Portal, lado a lado com um segundo enquadramento do grafo da Reitoria (já apresentado no slide 2). Foram reutilizados o dataset `data/portal-graph.js` e o módulo de visualização `portal-graph.js` de `leorruas/guiaportalifmg`, com o modo de distância aberto por padrão e estilos isolados na pasta `codir/grafo-guia/`. O grafo mapeia **82 páginas** e **101 relações**; o cálculo de menor distância registrada a partir da Home inclui 5 páginas a 1 clique, 49 a 2 e 27 a 3, além da própria Home. O mapa permanece **em construção**, portanto isso não estabelece que todo o portal esteja a três cliques nem demonstra que as tarefas foram concluídas pelos usuários. O Cytoscape, tal como no guia original, é carregado via CDN.

As imagens podem ser ampliadas por clique. As duas capturas anteriores do Guia do Portal também permanecem na pasta `assets/` como arquivos de referência.

Fonte do conteúdo: [repositório Guia do Portal IFMG](https://github.com/leorruas/guiaportalifmg). A orientação por função e as tarefas documentadas são recursos do guia atual. O mapa mostra somente páginas e relações já mapeadas e informa que está em construção.

**Estado das funcionalidades:** a busca disponível hoje usa correspondência textual e ranqueamento por relevância, considerando títulos, aliases e tolerância limitada a erros de digitação. A próxima etapa é aprimorar a localização de tarefas com títulos, sinônimos, termos de uso comum e ajustes de relevância. **Não há compromisso de implementar busca semântica ou uma LLM no navegador.** O slide 15 mostra uma consulta ilustrativa e utiliza os títulos reais das páginas do guia, confirmados em seu conteúdo, sem representar a ordem de resultados de uma execução. O guia já disponibiliza instruções e exemplos de prompts para usar assistentes externos na revisão de conteúdo, preparação de imagens e sugestão de blocos documentados no Wagtail. Isso não comprova que exista um gerador automático de páginas integrado ao Wagtail. A decisão editorial, as permissões e a publicação continuam com as equipes.

## Slide 21: comparação dos dois grafos

No penúltimo slide (21), imediatamente antes da **Síntese (22)**, os grafos aparecem **lado a lado**. À esquerda, **Organização de setores** mostra o mapeamento do portal da Reitoria usando novamente `codir/grafo/`. À direita, **Organização por segmentação de usuários** apresenta a arquitetura proposta documentada no Guia do Portal (`codir/grafo-guia/`), aberta no modo **distância da Home**. Cada mapa tem botão **Ampliar / Reduzir**, e as setas de navegação funcionam também quando o foco está dentro das visualizações.

A versão compacta `?comparacao=1` foi ajustada para projetar os mapas sem painéis laterais; abrir o slide 2 ou os módulos individualmente continua usando os controles completos. A comparação mostra **dois recortes de pesquisa com coberturas diferentes**: o conjunto da Reitoria não pode ser comparado quantitativamente ao grafo do Guia, que ainda está em construção. Os anéis de até três cliques aplicam-se apenas às páginas já mapeadas na proposta. Os gráficos não representam caminhos realmente percorridos por pessoas.

## Slides 18 a 20: resultados dos testes de Ouro Branco

A apresentação agora inclui resultados reais, retirados do repositório [`novo-portal`](https://github.com/leorruas/novo-portal):

- **Slide 18:** cinco sessões com estudantes, realizadas de 20 a 31 de agosto de 2026. Calendário acadêmico: 3 conclusões em 5 tentativas; monitoria: 2 em 5; secretaria acadêmica: 4 em 4; biblioteca/renovação: 2 em 2. Os denominadores correspondem às tarefas efetivamente aplicadas, e não a todos os participantes em todos os cenários.
- **Slide 19:** achados de três sessões documentadas com servidores. O relatório da primeira consolidação contabiliza duas sessões; a nota e o resumo atualizados incluem a terceira, realizada em 8 de setembro. A dificuldade de localizar PPC nessa sessão (7/7) e a necessidade de ajuda para calendário e suporte de TI são exemplos qualitativos. Não agregamos os três participantes em uma taxa única.
- **Slide 20:** mudanças propostas: separar calendário, horários e monitoria; criar caminhos cruzados para documentos de cursos e estágio; explicitar a ação de suporte de TI; corrigir e testar novamente. São recomendações ainda sem confirmação de implementação e impacto.

Fontes: [relatório dos testes de Ouro Branco](https://github.com/leorruas/novo-portal/tree/main/02%20-%20Pesquisa%20%28UXR%29/testes-de-usabilidade/relatorios), [resumo e log](https://github.com/leorruas/novo-portal/tree/main/02%20-%20Pesquisa%20%28UXR%29/testes-de-usabilidade/ouro-branco) e ficha `S-OB-03.md` no subdiretório de notas de servidores. O relatório principal apresenta inicialmente cinco estudantes e dois servidores; o registro posterior acrescenta a terceira sessão, sem atualizar retrospectivamente as contagens quantitativas do relatório inicial.

Estes testes são **formativos** e ocorreram em um protótipo, não em uma versão de produção. Não sustentam estimativas populacionais, métricas gerais de eficiência ou afirmações de impacto do redesenho. Nem todas as tarefas foram aplicadas e registradas de forma uniforme.

## Tela cheia e projeção

Ao entrar em tela cheia pelo botão ou pela tecla `F`, o código mede **a dimensão real do slide atual** e procura a maior escala que cabe na largura e na altura úteis do monitor, com espaço reservado para o cabeçalho e os controles. Esse cálculo acontece novamente ao mudar de slide, redimensionar a janela ou terminar de carregar fontes e imagens.

A escala máxima é limitada a 1,8 para evitar ampliação excessiva. O modo permite reduzir o conteúdo até 0,76 quando necessário; se ainda não couber, o slide mantém rolagem vertical, sem ocultar partes do conteúdo. A versão para celular mantém o layout responsivo normal.

## Acesso

Se o GitHub Pages estiver publicado a partir da raiz da branch `main`, abra `https://leorruas.github.io/pesquisa/codir/`. Os arquivos do CSS e JavaScript e as imagens locais são carregados por caminhos relativos.

## Recursos externos e limites da apresentação

Quatro capturas de outros slides continuam hospedadas publicamente no portfólio: o portal institucional atual, a proposta de portal, o Guia do Estudante e o piloto de Ouro Branco. Para a apresentação funcionar inteiramente sem depender do portfólio, essas capturas precisam ser copiadas para `codir/assets/` e os respectivos caminhos no HTML atualizados. As fontes DM Sans e Roboto Mono são carregadas do Google Fonts, com alternativas locais.

Os dados, períodos e limites das evidências foram mantidos da versão anterior. Os testes de Ouro Branco já têm resultados documentados. Antes da reunião, ainda é necessário verificar o estado de implementação das recomendações e se houve nova rodada após 8 de setembro.
