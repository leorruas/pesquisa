# Relatório de teste de usabilidade: perfil servidor

Este relatório consolida os resultados das sessões de teste de usabilidade aplicadas ao perfil servidor do IFMG. O objetivo foi avaliar a taxonomia, o fluxo de navegação e a encontrabilidade de informações administrativas, sistemas institucionais, suporte técnico e páginas setoriais no protótipo do novo portal.

As sessões foram conduzidas de acordo com as diretrizes do [[02 - Pesquisa (UXR)/testes-de-usabilidade/01-servidores/00-plano-de-teste|Plano de Teste de Servidores]] e do [[02 - Pesquisa (UXR)/testes-de-usabilidade/01-servidores/01-roteiro|Roteiro de Moderação de Servidores]].

---

## I. Metodologia e amostra

*   **Objetivo:** Avaliar se servidores conseguem localizar informações e rotinas administrativas essenciais no protótipo, especialmente remoção/carreira, benefícios, páginas setoriais e acesso a sistemas/suporte.
*   **Período:** 21 de maio de 2026 a 03 de junho de 2026.
*   **Método:** Teste de usabilidade moderado com técnica de *think aloud*, tarefas guiadas e perguntas de encerramento.
*   **Amostra consolidada:** 8 sessões:
    *   Servidor 01
    *   Servidor 02 (com transcrição de áudio)
    *   Servidor 03 (com transcrição de áudio)
    *   Servidor 04 (com transcrição de áudio)
    *   Servidor 05 (com transcrição de áudio)
    *   Servidor 06 (com transcrição de áudio)
    *   Servidor 07 (com transcrição de áudio)
    *   Servidor 08 (com transcrição de áudio)
*   **Não comparecimentos:** 4 pessoas agendadas não compareceram às sessões.
*   **Nota de escopo:** Uma sessão registrada no controle de campo não foi incluída na consolidação deste relatório. Duas notas agendadas ainda estavam sem dados consolidados no momento desta atualização.
*   **Métricas:** Taxa de conclusão de tarefa (1.0 = sucesso, 0.5 = sucesso com ajuda ou caminho indireto, 0.0 = falha/abandono) e escala de dificuldade normalizada para 1 = muito fácil e 7 = muito difícil.

**Nota metodológica sobre dificuldade:** Em parte das sessões, a pergunta foi registrada como "nota de dificuldade" (1 = fácil, 7 = difícil), e em outras como SEQ padrão (1 = difícil, 7 = fácil). Para deixar a leitura do relatório mais intuitiva, todos os valores foram normalizados como **dificuldade percebida**: 1 = muito fácil e 7 = muito difícil. Quando a escala não foi coletada ou a tarefa foi pulada, o campo foi marcado como N/A.

---

## II. Visão geral de desempenho

| Participante | T1 Remoção | T2 Wellhub | T3 Setorial | T4 Sistemas/Suporte |
| :--- | :---: | :---: | :---: | :---: |
| Servidor 01 | 1.0 (Dif.: N/A) | 1.0 (Dif.: N/A) | 1.0 (Dif.: N/A) | 0.5 (Dif.: N/A) |
| Servidor 02 | 1.0 (Dif.: 5) | 1.0 (Dif.: 3) | 0.0 (Dif.: 7) | 0.0 (Dif.: 7) |
| Servidor 03 | 0.0 (Dif.: 7) | 1.0 (Dif.: 1) | 1.0 (Dif.: 1) | 0.0 (Dif.: 7) |
| Servidor 04 | 1.0 (Dif.: 3) | 1.0 (Dif.: 2) | 0.5 (Dif.: N/A) | 0.0 (Dif.: 7) |
| Servidor 05 | 1.0 (Dif.: 1) | 1.0 (Dif.: 1) | 1.0 (Dif.: 2) | 0.0 (Dif.: 7) |
| Servidor 06 | 1.0 (Dif.: 3) | 1.0 (Dif.: 1) | N/A | 0.0 (Dif.: 6) |
| Servidor 07 | 1.0 (Dif.: 2) | 1.0 (Dif.: 1) | 1.0 (Dif.: 4) | 0.0 (Dif.: 7) |
| Servidor 08 | 1.0 (Dif.: 4) | 1.0 (Dif.: 2) | 1.0 (Dif.: 3) | 0.0 (Dif.: 7) |
| **Resultado consolidado** | **87,5%** (Dif.: **3,6**) | **100,0%** (Dif.: **1,6**) | **78,6%** (Dif.: **3,4**) | **6,3%** (Dif.: **6,9**) |

**Leitura geral:** A tarefa de benefícios validou o "Guia do Servidor" como catálogo funcional depois que o usuário compreende seu papel. Em contraste, a abertura de chamados/suporte de TI apresentou falha sistemática de encontrabilidade. A tarefa de remoção teve alta conclusão, mas com hesitação e uso de busca. A tarefa setorial variou conforme o setor de origem e revelou tensão entre modelo por perfis/tarefas e modelo institucional por setores.

---

## III. Achados principais por gravidade

### Achado crítico: suporte de TI e abertura de chamados não estão encontráveis

*   **Fato observado:** A T4 teve apenas 6,3% de sucesso consolidado. Somente uma participante concluiu de forma indireta; os demais não localizaram um caminho claro para abrir chamado ou acessar suporte de TI.
*   **Evidências:** Participantes buscaram em "Serviços", "Institucional > Tecnologia da Informação", "Servidores" e atalhos da página inicial antes de abandonar ou depender de explicação do moderador. O padrão apareceu em Servidor 02 em `[32:59]`, Servidor 03 em `[21:44]`, Servidor 04 em `[26:20]`, Servidor 06 em `[55:25]` e Servidor 08 em `[21:07]`.
*   **Verbatims:**
    > *"Abrir chamado? Eu iria em Serviços [...] confesso que nessa eu tomei pau. Não sei onde procurar."* — Servidor 02 em `[32:59]`.
    > *"Serviços. Eu viria aqui em serviços. Chamar para a TI na minha lógica mental isso é um serviço."* — Servidor 06 em `[55:25]`.
*   **Análise:** O protótipo presume que o servidor associa abertura de chamado ao SUAP e que encontrará esse acesso dentro do catálogo do servidor. O modelo mental observado classifica suporte de TI como serviço institucional direto, não como subfluxo oculto dentro de sistema.
*   **Variáveis associadas:** [[05 - Conceitos & Variáveis/variaveis/encontrabilidade|encontrabilidade]], [[05 - Conceitos & Variáveis/conceitos/intranet-v-portal|intranet-v-portal]], [[05 - Conceitos & Variáveis/conceitos/carga-cognitiva|carga cognitiva]].
*   **Recomendação:** Criar rota explícita e redundante para "Abertura de Chamados / Suporte de TI", com presença em "Serviços", na área de "Servidores" e na página institucional de Tecnologia da Informação. O link pode apontar para o SUAP, mas o rótulo de navegação deve nomear a tarefa final, não apenas o sistema.

### Achado médio: editais de remoção são encontrados, mas com custo de navegação

*   **Fato observado:** A T1 teve 87,5% de sucesso, mas a conclusão frequentemente exigiu tentativa, varredura de menus ou busca textual.
*   **Evidências:** Servidor 03 procurou em "Processo Seletivo" e falhou. Servidor 04 passou por "Servidores", "Serviços" e "Acesso à Informação" antes de usar a busca por "remoção". Servidor 06 tentou "Normas e Manuais" antes de chegar ao Guia do Servidor. Servidor 08 iniciou em "Servidores", não encontrou no menu aberto e precisou entrar no "Guia do Servidor" para localizar remoção e redistribuição em `[16:51]` a `[17:47]`.
*   **Verbatim:**
    > *"Teria que ter um processo seletivo dentro de servidores ou movimentação de pessoal... agora onde está aqui eu não tenho ideia."* — Servidor 03 em `[18:13]`.
*   **Análise:** O rótulo "Processo Seletivo" compete semanticamente com editais internos de carreira. Ao mesmo tempo, "Guia do Servidor" funciona como destino, mas ainda exige aprendizado inicial.
*   **Variáveis associadas:** [[05 - Conceitos & Variáveis/variaveis/encontrabilidade|encontrabilidade]], [[05 - Conceitos & Variáveis/variaveis/taxonomia-urls|taxonomia de URLs]], [[05 - Conceitos & Variáveis/conceitos/linguagem-simples|linguagem simples]].
*   **Recomendação:** Expor "Remoção, Redistribuição e Carreira" como item visível na navegação de segundo nível de "Servidores", sem depender exclusivamente do Guia do Servidor ou da busca.

### Achado médio: páginas setoriais exigem hibridismo entre setores e tarefas

*   **Fato observado:** A T3 teve 78,6% de sucesso, mas revelou divergência entre o modelo institucional por setores e o modelo proposto por perfis/tarefas. O problema foi mais evidente em setores híbridos, como inovação, pesquisa, tecnologia, comunicação e áreas que atendem tanto público externo quanto servidores.
*   **Evidências:** A busca pelo NIT/AGCT falhou porque a participante esperava o conteúdo em "Institucional > Pesquisa e Inovação", enquanto o protótipo alocava parte da jornada em "Serviços". Em outro caso, a busca por legislação de processo seletivo partiu do modelo antigo de "Ensino" como grande área.
*   **Verbatim:**
    > *"Depois que você me explicou, eu mudei o meu olhar, mas de início meu pensamento é bem endógeno."* — Servidor 02 em `[31:39]`.
*   **Análise:** A arquitetura por perfis reduz dependência do organograma, mas servidores que mantêm, atualizam ou respondem por páginas institucionais ainda precisam localizar setores pelo modelo organizacional. O protótipo precisa acomodar a transição de modelo mental.
*   **Variáveis associadas:** [[05 - Conceitos & Variáveis/conceitos/intranet-v-portal|intranet-v-portal]], [[05 - Conceitos & Variáveis/variaveis/autoridade-institucional|autoridade institucional]], [[05 - Conceitos & Variáveis/variaveis/encontrabilidade|encontrabilidade]].
*   **Recomendação:** Manter páginas institucionais de setores e pró-reitorias como pontos estáveis de governança e incluir nelas links visuais para serviços, tarefas e páginas de perfil relacionadas. Exemplo: página institucional de Pesquisa e Inovação com atalhos para Hubs de Inovação, Propriedade Intelectual e serviços ao pesquisador.

### Achado médio: os rótulos "Serviços" e "Guia do Servidor" estão sobrecarregados

*   **Fato observado:** O rótulo "Serviços" foi interpretado de formas diferentes: para parte dos participantes, indicava sistemas, suporte de TI e serviços internos; para outros, indicava serviços prestados à comunidade externa. O "Guia do Servidor" funcionou melhor depois que o participante aprendeu que ele era um catálogo, mas não comunicou esse papel de imediato em tarefas críticas.
*   **Evidências:** Servidor 02 primeiro associou "Serviços" a "serviços para mim, servidor", depois reconsiderou como serviços externos em `[17:08]`; na T4, voltou a procurar abertura de chamados em "Serviços" em `[32:59]`. Servidor 03 esperava "sistemas institucionais, DTI" em "Serviços" em `[08:55]`, mas, ao ver o conteúdo, entendeu também como serviços de inovação e comunidade em `[15:48]`. Servidor 04 declarou que "Serviços" deveria ter SEI/SUAP em `[18:00]` e procurou abertura de chamado ali em `[26:20]`. Servidor 08 associou "Serviços" à carta de serviços/comunidade em `[12:51]` a `[13:25]`, mas também buscou comunicação, manuais e suporte por essa aba em `[20:15]` e `[21:07]`.
*   **Verbatims:**
    > *"Serviços, em um primeiro momento, me lembra mais serviços para mim, servidor. Mas aí, pensando melhor, imagino uma coisa de serviços que o instituto oferece para o público externo."* — Servidor 02 em `[17:08]`.
    > *"Serviços acho que o link para o SEI, SUAP e algum outro mais específico."* — Servidor 04 em `[18:00]`.
    > *"O Guia do Servidor então é como se fosse os serviços que o servidor poderia requerer de alguma forma, que ele tem acesso."* — Servidor 03 em `[19:16]`.
*   **Análise:** "Serviços" é um rótulo semanticamente amplo e compete com "Servidores" quando a tarefa é operacional. Já "Guia do Servidor" tem leitura inicial de orientação/normativa ou onboarding, não necessariamente de catálogo de ações. Isso aumenta o custo de descoberta para suporte, sistemas e carreira, mesmo quando o destino final existe.
*   **Variáveis associadas:** [[05 - Conceitos & Variáveis/variaveis/encontrabilidade|encontrabilidade]], [[05 - Conceitos & Variáveis/conceitos/linguagem-simples|linguagem simples]], [[05 - Conceitos & Variáveis/conceitos/carga-cognitiva|carga cognitiva]].
*   **Recomendação:** Testar rótulos mais específicos ou subtítulos descritivos. Para "Serviços", explicitar se a aba é voltada a serviços públicos/comunidade externa. Para "Guia do Servidor", considerar uma composição como "Guia do Servidor: sistemas, benefícios e carreira" ou reforçar a página de entrada com categorias visíveis.

### Achado leve: o Guia do Servidor funciona, mas depende de aprendizado inicial

*   **Fato observado:** A T2 teve 100,0% de sucesso e dificuldade média de 1,6/7. Após aprenderem o papel do "Guia do Servidor", os participantes passaram a usá-lo como catálogo de benefícios e rotinas.
*   **Evidências:** Servidor 04 em `[24:00]`, Servidor 06 em `[54:59]` e Servidor 08 em `[18:30]` encontraram Wellhub com facilidade depois de compreenderem a lógica do guia.
*   **Análise:** O guia é uma solução promissora como agregador funcional, mas seu rótulo ainda pode ser amplo demais para tarefas críticas. Ele não deve ser o único caminho para ações de alta urgência ou alta frequência, como suporte, sistemas e carreira.
*   **Variáveis associadas:** [[05 - Conceitos & Variáveis/variaveis/hub-de-descoberta|hub de descoberta]], [[05 - Conceitos & Variáveis/variaveis/fidelidade-uso|fidelidade de uso]], [[05 - Conceitos & Variáveis/conceitos/carga-cognitiva|carga cognitiva]].
*   **Recomendação:** Preservar o Guia do Servidor como catálogo, mas reforçar sua página de entrada com categorias claras, busca interna ou índice alfabético, e atalhos redundantes para tarefas críticas.

---

## IV. Recomendações priorizadas

### Ajustes imediatos

1.  **Criar atalho explícito para suporte de TI:** Inserir "Abertura de Chamados / Suporte de TI" em "Serviços", "Servidores" e "Institucional > Tecnologia da Informação".
2.  **Dar visibilidade a carreira e movimentação:** Incluir "Remoção, Redistribuição e Carreira" no menu de segundo nível de "Servidores".
3.  **Nomear tarefas antes de sistemas:** Usar rótulos orientados à ação ("Abrir chamado", "Acessar SEI", "Consultar SouGov") e não apenas nomes de sistemas.
4.  **Testar rótulos e descrições de navegação:** Validar se "Serviços" deve ser explicitado como serviços públicos/comunidade externa e se "Guia do Servidor" precisa de subtítulo funcional, como "sistemas, benefícios e carreira".
5.  **Reforçar o Guia do Servidor:** Transformar a página em catálogo escaneável com categorias, índice ou blocos por intenção: carreira, benefícios, sistemas, suporte, normas e posse.

### Ajustes estruturais

6.  **Adotar duplo acesso por setores e tarefas:** Preservar páginas institucionais de setores, mas inserir nelas links para serviços e rotas por perfil. Isso reduz atrito para servidores acostumados ao organograma sem abandonar a arquitetura orientada a públicos.
7.  **Definir regra editorial para editais antigos:** Separar editais ativos de arquivo histórico, reduzindo ruído em buscas internas e externas. A fala de Servidor 06 sobre o site como "grande repositório" reforça essa necessidade.
8.  **Separar home pública de área do servidor:** Evitar concentrar atalhos internos na home geral, já que páginas dedicadas ao JTBD de servidores representam **4,54%** do total anual observado.

### Oportunidades estratégicas vindas das entrevistas

9.  **Validar catálogo de cursos com indicadores de ingresso:** Como o site novo já prevê filtros de cursos, tratar essa funcionalidade como validação do JTBD de ingressantes: "entender quais cursos existem, em qual campus/modalidade é possível estudar e o que fazer para se inscrever, acompanhar resultado ou realizar matrícula" [[02 - Pesquisa (UXR)/perfis/02 • ingressantes|fonte]]. A justificativa principal vem dos dados de perfil: caminhos de processo seletivo somam **1.603.573** visualizações, caminhos de cursos **753.741**, matrícula **276.739**, e as páginas dedicadas ao JTBD de ingressantes somam **828.714** visualizações [[02 - Pesquisa (UXR)/perfis/02 • ingressantes|fonte]]. A entrevista com Servidor 04 reforça qualitativamente essa necessidade, mas a prioridade do item vem do acesso relacionado ao perfil/JTBD de ingresso, não da tarefa de servidor.
10. **Onboarding de servidores:** Estruturar uma página de "Acolhimento e Posse" com orientações iniciais, estágio probatório, avaliação de desempenho e links administrativos essenciais.
11. **Integração SUAP/Wagtail para agenda institucional:** Avaliar conectores para reduzir retrabalho editorial em eventos e agendas que já são cadastrados em sistemas institucionais.

---

## V. Conclusão técnica

Os testes indicam que o protótipo melhora a organização visual e oferece um caminho funcional para benefícios via Guia do Servidor. No entanto, tarefas críticas de suporte e sistemas ainda não estão suficientemente visíveis. O principal ajuste de arquitetura não é torná-lo redundante nos pontos em que o servidor opera com modelo mental setorial ou orientado a sistemas.

A prioridade de design deve ser reduzir a dependência de aprendizado prévio em tarefas críticas: abertura de chamados, acesso a sistemas, movimentação de carreira e páginas setoriais híbridas. O Guia do Servidor deve permanecer como catálogo central, mas complementado por rotas explícitas e rótulos orientados à tarefa.

**Próximos passos recomendados:**

1.  Ajustar o protótipo com os atalhos de suporte/TI e carreira.
2.  Revisar páginas institucionais de setores estratégicos para incluir links cruzados para serviços e tarefas.
3.  Revalidar as mudanças em testes curtos com 3 a 5 servidores antes da etapa com outros perfis.
4.  Monitorar, após implantação, uso do Guia do Servidor, buscas por "chamado", "DTI", "remoção", "redistribuição", "SEI" e "SUAP".
