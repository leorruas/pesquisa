# Relatório de testes de usabilidade — Campus Ouro Branco

**Período das sessões:** 20 de agosto a 8 de setembro de 2026
**Protótipo testado:** `https://portal.ifmg.edu.br/campi/ourobranco/`
**Atualização:** 08/09/2026
**Situação:** rodada consolidada para handoff e reteste; as correções propostas ainda precisam de execução e validação.

## Resposta curta

O teste sustenta a direção de organizar o campus por necessidades de uso: estudantes reconheceram **Vida acadêmica** como o lugar natural para sua rotina, e parte dos servidores localizou tarefas de trabalho em **Vida funcional**. A sessão `S-OB-03` acrescenta um limite: documentos acadêmicos também atendem ao trabalho, e a separação global/local confundiu a procura. Informações recorrentes precisam de rótulos explícitos e caminhos cruzados, inclusive a partir de Cursos.

A prioridade imediata é desagregar e nomear explicitamente os acessos para **Calendário acadêmico**, **Horários de aula** e **Monitoria**. Em cinco tentativas de estudantes, calendário foi concluído por 3 e monitoria por 2; ambos concentraram dificuldade alta. Secretaria e assistência estudantil, em contraste, foram geralmente encontradas. Para servidores, o acesso ao suporte de TI não teve resultado uniforme: `S-OB-01` chegou ao SUAP sem dificuldade relevante, enquanto `S-OB-02` não associou troca de senha a “abrir chamado no SUAP”. `S-OB-03` também precisou de dicas para encontrar o chamado e esperava suporte no campus. O ajuste deve ser testado como acesso orientado à ação, com contexto local claro.

## Escopo e base de evidências

Foram analisadas cinco sessões com estudantes (`E-01` a `E-05`) e três sessões com servidores (`S-OB-01` a `S-OB-03`). A tentativa anterior de `S-OB-03`, interrompida por acesso, não conta como sessão adicional. O teste ocorreu em 08/09/2026 e inclui exploração guiada antes das tarefas. As sessões usaram tarefas moderadas, pensamento em voz alta e escala de dificuldade de 1 (muito fácil) a 7 (muito difícil), mas nem todas as tarefas, tempos e escalas foram aplicados ou registrados.

As conclusões foram cruzadas com:

- o plano de teste e a seleção de tarefas baseada em GA4;
- o resumo e o log contínuo já existentes;
- as notas individuais e, quando disponível, a transcrição preservada;

Os números abaixo são contagens de sessões em que a tarefa foi efetivamente aplicada; células não aplicadas não são fracassos. Não há base para uma taxa única de sucesso do teste inteiro.

### Alcance desta rodada

A rodada é formativa: cinco estudantes e três servidores permitem registrar fricções e priorizar uma iteração local. Essas observações não estimam a proporção de toda a comunidade que teria dificuldade. Cursos/modalidades, tarefas aplicadas, mediação e versão do protótipo variaram; não se deve calcular uma taxa geral nem reunir públicos diferentes num mesmo denominador. O encerramento da coleta prevista não equivale à validação das correções.

## O que a evidência sustenta

| Tarefa | Resultado observável | Leitura |
| --- | --- | --- |
| Calendário acadêmico | 3 de 5 estudantes concluíram; dificuldade média 4,2/7. | O destino geral é previsível, mas o calendário não se destaca dentro de `Horários e calendários`; três pessoas o confundiram com horário de aula ou não perceberam a chamada. |
| Monitoria | 2 de 5 estudantes concluíram; dificuldade média 4,2/7. | É o ponto mais repetido de desencontro estudantil. O mesmo agrupamento é lido como grade/horário, não como lugar para buscar apoio em disciplina. |
| Secretaria acadêmica | 4 de 4 concluíram as tarefas aplicadas. | O caminho em Vida acadêmica funciona depois de acessado, mas duas pessoas começaram por `Campus` ou `Cursos`; vale oferecer entradas cruzadas, sem duplicar o serviço. |
| Assistência estudantil | 2 de 3 concluíram; dificuldade média 3,0/7. | Há encontrabilidade para parte da amostra, porém uma estudante atribuiu a vida cotidiana do aluno a `Vida funcional`. O rótulo e a descrição dessa área ainda precisam evitar essa leitura. |
| Biblioteca/renovação | 2 de 2 concluíram; dificuldade média 2,0/7. | O caminho para biblioteca foi entendido, mas `Catálogo` não comunica sozinho a renovação. A sessão `E-01` fez outra tarefa no lugar desta e não entra nessa conta. |
| Estágio | 1,5 ponto de 3 possíveis; dificuldade média 5,0/7. | A informação está associada a documentos de curso, mas a expectativa alterna entre curso, coordenação, processos seletivos e área própria. A rolagem longa piora a descoberta. |
| Suporte de TI para servidores | `S-OB-01`: 1; `S-OB-02`: 0; `S-OB-03`: 0,5, com dicas. Dificuldades: 3/7, 4/7 e não registrada, respectivamente. | Um registro de conclusão, um de não conclusão e um parcial. Não converter a pontuação ponderada em número de pessoas com sucesso espontâneo. Criar acessos claros no campus e nas áreas de públicos. |
| Gestão de Pessoas | `S-OB-01` e `S-OB-02`: conclusão registrada nas tarefas aplicadas; `S-OB-03`: encontrou orientação de atestado sem dica. | Cenários diferentes, sem comprovação de execução nos sistemas externos. Preservar o caminho e validar conteúdo e destino. |
| Norma ou portaria | `S-OB-02`: conclusão registrada, dificuldade 3/7; começou em Campus. | A ficha de `S-OB-01` menciona normas na exploração, sem pontuação independente dessa tarefa. Não sustenta a contagem anterior de 2/2 para normas. |
| PPC em `S-OB-03` | Não concluído sem intervenção; dificuldade 7/7. | Esperava o documento em Cursos. Vida Acadêmica foi associada ao estudante e os menus global/local geraram dúvida. |
| Calendário em `S-OB-03` | Parcial/com ajuda; dificuldade 5,5/7. | Reforça título e destaque próprios. O resultado permanece separado das cinco sessões estudantis. |

## Padrões que merecem decisão de design

### 1. O agrupamento “Horários e calendário acadêmico” esconde duas tarefas diferentes — e uma terceira foi anexada a ele

Calendário, horário de aula e monitoria são necessidades distintas. O cartão atual foi interpretado como acesso à grade/horários; por isso o calendário passou despercebido e monitoria não foi procurada ali. Não é apenas um problema de “dar mais destaque”: é uma falha de sinalização da informação antes do clique.

**Decisão proposta:** manter uma fonte de verdade única, mas apresentar três entradas reconhecíveis na área de Vida acadêmica: **Calendário acadêmico**, **Horários de aula** e **Monitoria / apoio em disciplinas**. Se a implementação continuar em uma página, cada entrada deve levar diretamente à seção correspondente e ter título, descrição curta e link próprio.

### 2. A arquitetura por tarefa funciona, mas precisa de pontes para o vocabulário que as pessoas usam

Estudantes esperam Vida acadêmica para a rotina, mas procuram “secretaria”, “documentos do curso”, “coordenação” e “estágio” pelos substantivos que já conhecem. Isso explica as entradas iniciais em `Campus` e `Cursos`, mesmo quando a conclusão ocorreu em Vida acadêmica. A pessoa não deve precisar conhecer a estrutura interna para agir.

**Decisão proposta:** acrescentar links contextuais e termos alternativos nas páginas de Campus e Cursos — por exemplo, “Precisa de documentos, declaração ou atendimento? Acesse Secretaria acadêmica”; “Estágio: documentos e orientações”. Eles devem apontar para a página canônica, não replicar conteúdo.

### 3. Suporte de TI é uma tarefa, não o nome de um sistema

Os três registros diferem: `S-OB-01` chegou ao SUAP; `S-OB-02` não associou suporte/troca de senha ao chamado; `S-OB-03` encontrou o caminho com dicas e questionou o contexto local do atendimento. A própria base GA4 já apontava duas rotas históricas de TI com nomes diferentes, reforçando o risco de dispersão.

**Decisão proposta:** colocar links redundantes e orientados por tarefa em Vida funcional e nos caminhos estudantis: **Suporte de TI**, **Abrir chamado** e **Trocar senha**, com explicação do que acontece ao abrir o SUAP. A página ou bloco deve também indicar qual demanda não é atendida por esse canal.

### 4. Conteúdo de curso e serviços acadêmicos não devem disputar a mesma função

A página de curso apoia a descoberta da formação e precisa oferecer passagem visível para documentação e atendimento. A tensão observada em estágio e documentos também aparece em `S-OB-03`: a expectativa de encontrar PPC em Cursos permaneceu mesmo após a exploração de Vida Acadêmica. Separar funções de conteúdo não deve eliminar o acesso a documentos a partir do curso.

**Decisão proposta:** usar a página do curso como vitrine e contexto, com links para a camada operacional de Vida acadêmica. Antes de publicar, mapear quais solicitações são feitas no SUAP, por formulário local ou por secretaria, para que cada link leve ao processo responsável.

## Achados complementares, ainda não suficientemente validados

- **Contatos de docentes e coordenações:** pedidos explícitos de `E-02` e `E-03`; ainda não houve tarefa estruturada que avalie o modelo de diretório, dados exibidos ou manutenção.
- **Conselho Acadêmico:** `E-02` e `E-03` consideraram o nome pouco claro ou pouco visível. Não foi tarefa testada; tratar como hipótese para teste, não como prioridade comprovada.
- **Editais, processos seletivos, todos os tipos de cursos, projetos e relatório de gestão:** surgiram na sessão exploratória `S-OB-01`. São insumos importantes de conteúdo e arquitetura, mas não foram comparados entre participantes.
- **Busca e conteúdo antigo:** `S-OB-02` relatou maior esforço para encontrar informação antiga e `E-05` citou problemas na busca do portal atual. Não houve cenário controlado de busca nem avaliação do mecanismo do novo protótipo.
- **Destaques da home:** foram avaliados positivamente como atalho por `S-OB-02`, mas a utilidade não foi testada contra tarefas nem contra regras editoriais. Não devem substituir caminhos permanentes de navegação.

## Limites que mudam a interpretação

1. **A rodada é formativa, não uma medição populacional.** As cinco sessões com estudantes são adequadas para revelar fricções recorrentes e orientar iteração, mas não para estimar uma taxa de sucesso de todos os estudantes. Além disso, ao menos duas sessões estudantis foram com pessoas de Sistemas de Informação e há curso/modalidade não completamente registrado. A rodada de servidores tem três registros com cenários e graus de mediação diferentes.
2. **A cobertura de tarefas é desigual.** Horário de aula não foi aplicado isoladamente; biblioteca não foi aplicada em todas as sessões; estágio, documentos, auxílio e contato de professores têm poucas observações. Uma conclusão registrada após mediação não é evidência de encontrabilidade espontânea.
3. **Não há registro uniforme de tempo por tarefa nem UMUX-Lite preenchido.** Não é possível comparar eficiência, calcular satisfação ou declarar melhora quantitativa do protótipo.
4. **O teste não representa plenamente uso em celular.** O plano priorizava celular na rede do campus, mas `E-01` usou computador em modo responsivo; as notas não registram de modo uniforme dispositivo, rede e versão do protótipo. As observações sobre mobile são qualitativas.
5. **O protótipo estava em evolução.** `E-01` menciona ação ainda inexistente para assistência estudantil. Resultados devem ser associados à versão efetivamente vista em cada sessão, que não foi registrada de forma padronizada.

## Próxima rodada recomendada

Antes de ampliar páginas ou menus, iterar somente os acessos de maior risco e reaplicar um teste curto, sem mediação, com ao menos 5 estudantes de cursos/modalidades distintos e 3 servidores de funções diferentes. Registrar dispositivo, versão do protótipo, conclusão espontânea, tempo e dificuldade.

Tarefas prioritárias para o reteste:

1. Encontrar **Calendário acadêmico**, **Horários de aula** e **Monitoria** como cenários independentes.
2. Encontrar **Suporte de TI / trocar senha** a partir de Vida funcional e de um caminho estudantil.
3. Encontrar **Estágio** e **Secretaria acadêmica** começando tanto em Cursos quanto em Vida acadêmica, para verificar os links cruzados.
4. Encontrar **renovação de livro** com rótulo de ação, não apenas `Catálogo`.
5. Adicionar cenários de **contato de docente/coordenação**, **acessibilidade** e **busca por conteúdo antigo** antes de priorizar suas soluções.

**Critério proposto para pactuação:** nas tarefas com cinco estudantes, buscar ao menos quatro conclusões sem ajuda e dificuldade individual até 3/7 nesses casos. Para os três servidores, exigir conclusão sem ajuda nas tarefas críticas aplicadas aos três e investigar cada falha antes de ampliar. Esses são critérios operacionais propostos, não resultados obtidos nem garantia populacional. Cenários não aplicados ficam fora da conta. Acrescentar busca de PPC a partir de Cursos e interpretação dos menus global/local.

## Pendências derivadas de S-OB-03: evidências e hipóteses

**Leitura:** “observado” designa comportamento descrito no teste; “relato” é experiência ou avaliação verbal sem auditoria independente; “hipótese” é explicação/solução a testar. As marcações remetem às duas fontes integrais de `S-OB-03`. As prioridades abaixo são propostas para o handoff, sem declaração de implementação.

| ID / contexto | Evidência | Hipótese ou proposta | Próxima ação e verificação |
| --- | --- | --- | --- |
| OB-01 / site atual entre campi | Relato de PPC difícil de localizar em outro campus e mais fácil quando a organização se parece com Ouro Branco (fonte 1, 04:51–05:28). | Estrutura consistente por oferta pode reduzir reaprendizado. | Inventariar páginas e documentos por campus; testar a mesma busca em contextos diferentes. Não concluir que o documento não existe. |
| OB-02 / site atual | Relata horário de atendimento desatualizado, apesar de pedido de alteração (fonte 2, 39:27–40:07). | Fluxo com edição delimitada e revisão pode reduzir atraso. | Área proprietária confirma dado vigente e atualiza; Comunicação e DTI pactuam permissão, revisão e substituição do responsável. Medir tempo de atualização em caso real. |
| OB-03 / site atual | Relata pedidos frequentes de e-mails docentes; informações importantes ficam no fim da página do curso (33:06–34:34). | Sumário visível e diretório que inclua quem leciona no curso podem ajudar. | Conferir cobertura, contatos e fonte; testar localização com estudantes. A frequência é relato, sem contagem de atendimentos. |
| OB-04 / protótipo, prioritário | PPC não localizado; expectativa de Cursos e dificuldade com menus global/local (18:14–22:34). | Links de documentos por curso e distinção de contexto podem ajudar. | Definir entrada e fonte canônica; testar PPC a partir do campus e de Cursos sem explicação prévia. |
| OB-05 / protótipo, prioritário | Calendário exigiu indicação do botão; horários confundidos com calendário (23:15–26:09). | Títulos separados e acesso direto melhoram reconhecimento. | Separar acessos de calendário, horários e monitoria; testar cada cenário e o destino das âncoras. |
| OB-06 / protótipo, prioritário | Suporte encontrado com dicas; expectativa de encontrá-lo em Ouro Branco (26:15–29:33). | Acesso local explícito evita depender do reconhecimento do SUAP. | Inserir rota de suporte no campus e em Vida Funcional, após confirmar canal; testar abertura do caminho. |
| OB-07 / necessidades de trabalho | Pede calendário, horários, documentação e secretaria também no caminho do servidor (09:41–10:35; 31:36–34:48; 36:51–37:21; 41:03–42:04). | Papéis sobrepostos exigem acessos cruzados. | Mapear tarefas de estudante e servidor; testar rotas redundantes sem duplicar documentos. |
| OB-08 / projetos | Relata procura de estudantes por projetos/vagas e sugere filtros por ensino, pesquisa e extensão (11:39–14:45). | Diretório de projetos com oportunidades e ligação aos editais pode atender à demanda. | Levantar projetos ativos, responsáveis, vagas e prazos; testar descoberta de uma oportunidade. Não prometer integração SUAP antes de validação técnica. |
| OB-09 / conteúdo de curso | Pede PPC, planos de ensino, matriz, regulamentos, extensão e campos específicos do curso (32:27–34:48). | Modelo comum com campos locais pode preservar completude e manutenção. | Coordenações validam inventário e fonte; definir o que é comum, local e opcional e como será revisado. |
| OB-10 / Vida Funcional | Pergunta se visitas técnicas são visitas já realizadas e propõe priorizar sistemas/Gestão de Pessoas (35:19–36:48). | Rótulo “Solicitar visita técnica” e ordem por recorrência podem esclarecer. | Confirmar fluxo com a área responsável; testar rótulo e ordem. A sugestão individual não é ranking de Analytics. |
| OB-11 / comparação atual e novo | Prefere o atual por familiaridade, valoriza notícias e percebe o novo como estático; prevê reclamações (37:23–39:27). | Orientação de transição e destaque editorial podem facilitar adaptação. | Testar leitura da home com conteúdo representativo. Carrossel/rolagem é sugestão, sem evidência de vantagem. Previsão de reclamação não é rejeição observada de outros usuários. |
| OB-12 / conteúdo e sustentação | Valoriza visual limpo, texto direto e manutenção contínua; encontra orientação de atestado sem dica (29:38–31:30; 42:48–44:19). | Linguagem direta e revisão regular podem preservar utilidade. | Manter orientação, validar com área proprietária e definir revisão. Confirmar eficácia do serviço externo em teste próprio. |

## Handoff da rodada

A coleta prevista de Ouro Branco está registrada. Ficam pendentes a implementação dos ajustes, a validação de conteúdo com as áreas e o reteste. Os registros de reuniões constituem uma frente de governança e operação separada dos resultados de usabilidade; sua consolidação está no relatório estratégico principal.

| Ordem | Entrega | Área a confirmar no handoff | Evidência de conclusão esperada |
| --- | --- | --- | --- |
| 1 | Calendário, horários, monitoria, PPC e suporte com entradas claras | Comunicação/UX, áreas proprietárias e DTI quando depender do componente | Versão identificada, links funcionais e conteúdo validado |
| 2 | Revisão de contatos, horários e documentos do curso (OB-01–03 e OB-09) | Coordenações/Ensino e Comunicação local | Fonte vigente, responsável e rotina de atualização registrados |
| 3 | Rotas por papéis, projetos e rótulos (OB-07–11) | Comunicação/UX e setores responsáveis | Hipóteses priorizadas e cenários de teste definidos |
| 4 | Teste técnico de navegação e âncoras antes do reteste | DTI com apoio local | Reprodução ou descarte documentado, correção quando cabível e verificação em celular/desktop |
| 5 | Reteste das tarefas críticas | Pesquisa/UX e campus | Resultado por tarefa, ajuda, dificuldade, dispositivo e versão |

Não há prazo de implantação ou aceite final comprovado nestas fontes. O handoff deve pactuar responsáveis nominais, capacidade e calendário. Os IDs OB permitem acompanhar cada pendência sem transformar uma sugestão em decisão aprovada.

## Fontes consultadas

- [[02 - Pesquisa (UXR)/testes-de-usabilidade/ouro-branco/estudantes/01-plano-de-teste|Plano de teste — estudantes]]
- [[02 - Pesquisa (UXR)/testes-de-usabilidade/ouro-branco/estudantes/notas/E-01|E-01]], [[02 - Pesquisa (UXR)/testes-de-usabilidade/ouro-branco/estudantes/notas/E-02|E-02]], [[02 - Pesquisa (UXR)/testes-de-usabilidade/ouro-branco/estudantes/notas/E-03|E-03]], [[02 - Pesquisa (UXR)/testes-de-usabilidade/ouro-branco/estudantes/notas/E-04|E-04]], [[02 - Pesquisa (UXR)/testes-de-usabilidade/ouro-branco/estudantes/notas/E-05|E-05]]
- [[02 - Pesquisa (UXR)/testes-de-usabilidade/ouro-branco/servidores/00-top-tasks-ga4|Top tasks — servidores]], [[02 - Pesquisa (UXR)/testes-de-usabilidade/ouro-branco/servidores/notas/S-OB-01|S-OB-01]] e [[02 - Pesquisa (UXR)/testes-de-usabilidade/ouro-branco/servidores/notas/S-OB-02|S-OB-02]] e [[02 - Pesquisa (UXR)/testes-de-usabilidade/ouro-branco/servidores/notas/S-OB-03|S-OB-03]]
- [[02 - Pesquisa (UXR)/testes-de-usabilidade/ouro-branco/01-resumo-dos-testes|Resumo anterior]] e [[02 - Pesquisa (UXR)/testes-de-usabilidade/ouro-branco/02-log-de-achados|Log de achados]]
