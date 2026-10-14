# CODIR | Apresentação do Portal IFMG

Conversão da apresentação original de `portfolio/src/app/(presentation)/ge-vernova/page.tsx` para HTML, CSS e JavaScript, sem React, Next.js, Tailwind ou etapa de build.

Arquivos:
- `index.html`: conteúdo dos 13 slides e marcação semântica.
- `styles.css`: layout, tipografia, gráficos, matrizes e estilos responsivos.
- `script.js`: navegação por setas, espaço, Page Up/Down, Home/End, botões, gestos horizontais no celular e URL `#slide-N`.
- `assets/`: imagens do Portal Guide que puderam ser incorporadas ao repositório.

A versão mantém o conteúdo **em inglês** e as referências **GE Vernova assessment** da apresentação original. O diretório `codir` é apenas o novo endereço; ainda não foi feita adaptação editorial para o CODIR.

## Como abrir

Acesse `/codir/` no site do repositório (se a publicação GitHub Pages estiver apontando para a raiz da branch `main`) ou abra `index.html` diretamente no navegador. CSS, script e imagens locais usam caminhos relativos, para funcionar tanto localmente quanto no GitHub Pages.

## Dependências de imagens externas

Cinco capturas da apresentação original são maiores do que o tamanho de arquivo binário que foi possível transferir pela integração de GitHub. Elas permanecem referenciadas pela publicação pública do portfólio:

- `https://leoruas.com/ge-vernova/old-ifmg-portal.png`
- `https://leoruas.com/ge-vernova/new-ifmg-portal.png`
- `https://leoruas.com/ge-vernova/student-guide.png`
- `https://leoruas.com/ge-vernova/ouro-branco-pilot.png`
- `https://leoruas.com/ge-vernova/portal-guide-procedure.png`

Essas capturas dependem da disponibilidade do site de origem. Para ter uma cópia inteiramente independente, copie as cinco PNGs originais para `codir/assets/` e substitua seus atributos `src` por `./assets/<nome>.png`. As outras duas capturas (`portal-guide-roles.png` e `portal-guide-tasks.png`) estão incluídas localmente.

A fonte DM Sans e a fonte Roboto Mono são solicitadas do Google Fonts; há alternativas tipográficas locais se a rede estiver indisponível.

## Fonte e responsabilidade pelos dados

Textos, indicadores e ressalvas sobre evidências foram transcritos da apresentação do repositório `portfolio`, sem revisão factual adicional nesta migração. No slide 12, o estado de validação continua refletindo o material original.

