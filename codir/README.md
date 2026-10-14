# CODIR | Apresentação do Portal IFMG

Apresentação para o Colégio de Dirigentes (CODIR) do IFMG, em português brasileiro. O conteúdo apresenta diagnóstico do portal institucional, critérios de pesquisa, proposta de arquitetura da informação, o Guia do Portal, governança de conteúdo e validação em curso.

A versão usa HTML, CSS e JavaScript, sem React, Next.js ou etapa de compilação. Contém **16 slides**.

Arquivos:
- `index.html`: conteúdo e marcação semântica.
- `styles.css`: layout, gráficos, matrizes e adaptação a telas menores.
- `script.js`: navegação por teclado e botões, tela cheia (atalho F), gestos no celular, link direto `#slide-N` e ampliação das imagens do guia.
- `assets/`: imagens locais.

## Acesso

Se o GitHub Pages estiver publicado na raiz da branch `main`, abra `https://leorruas.github.io/pesquisa/codir/`. Também é possível abrir `index.html` diretamente em um navegador.

## Atualização do Guia do Portal (slides 10 a 13)

A apresentação agora detalha: **(10)** entrada por função, **(11)** biblioteca de tarefas, **(12)** evolução da busca para interpretação semântica da intenção e **(13)** apoio da IA à criação de páginas e à escolha de blocos do Wagtail.

Fonte de referência: [repositório do Guia do Portal IFMG](https://github.com/leorruas/guiaportalifmg). Os procedimentos existentes mostram organização por perfis, tarefas e passos, assim como prompts para revisão de conteúdo e escolha de blocos disponíveis no Wagtail.

**Situação das funcionalidades:** a busca atual do guia utiliza ranqueamento por termos, título e aliases, com tolerância limitada a erros de escrita. A **busca semântica** foi apresentada como evolução planejada, não como recurso já implementado. O uso de **IA para sugerir estrutura e blocos** está documentado como fluxo de apoio: a apresentação ilustra esse processo, sem alegar integração automática ao Wagtail. Decisões de conteúdo, permissões e publicação continuam com as pessoas responsáveis.

Os exemplos visuais nos slides de busca e IA são identificados como **ilustrativos**. As capturas dos slides 10 e 11 usam os arquivos reais `portal-guide-roles.png` e `portal-guide-tasks.png` disponíveis na pasta `codir/assets`. As duas imagens podem ser ampliadas por clique.

## Imagens externas

Quatro imagens de outros slides ainda dependem do portfólio público:
- Portal institucional atual.
- Proposta de portal.
- Guia do Estudante.
- Implementação em Ouro Branco.

Para ter uma cópia independente, as quatro capturas utilizadas nos outros slides devem ser copiadas para `codir/assets/` e seus caminhos atualizados no HTML. A fonte DM Sans e a fonte Roboto Mono são carregadas do Google Fonts, com alternativas locais.

## Cuidados com evidências

O conteúdo preserva indicadores, períodos de coleta e limites das evidências descritos na apresentação anterior. A adaptação para o CODIR não constitui revalidação dos dados. Antes da reunião, confirme se o andamento dos testes no Campus Ouro Branco continua atual.

