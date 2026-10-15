(() => {
    const CYTOSCAPE_URL = "https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.26.0/cytoscape.min.js";
    let cytoscapePromise = null;
    let instanciaAtiva = null;

    function normalizar(texto = "") {
        return String(texto)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("pt-BR");
    }

    function escaparHtml(valor = "") {
        return String(valor)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function ramoDaUrl(url) {
        try {
            const caminho = new URL(url).pathname.split("/").filter(Boolean);
            return caminho[0] || "home";
        } catch {
            return "portal";
        }
    }

    function hash(texto) {
        return Array.from(String(texto)).reduce((total, caractere) => {
            return ((total << 5) - total + caractere.charCodeAt(0)) | 0;
        }, 0);
    }

    function corDoRamo(ramo, raiz) {
        if (ramo === "home") return raiz;
        const paleta = ["#2f6f3c", "#3b8048", "#489156", "#57a265", "#68b475", "#7cc586"];
        return paleta[Math.abs(hash(ramo)) % paleta.length];
    }

    function carregarCytoscape() {
        if (window.cytoscape) return Promise.resolve(window.cytoscape);
        if (cytoscapePromise) return cytoscapePromise;

        cytoscapePromise = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = CYTOSCAPE_URL;
            script.async = true;
            script.dataset.guiaCytoscape = "true";
            script.onload = () => window.cytoscape
                ? resolve(window.cytoscape)
                : reject(new Error("Cytoscape carregou sem expor a API esperada."));
            script.onerror = () => reject(new Error("Não foi possível carregar a biblioteca do grafo."));
            document.head.appendChild(script);
        });

        return cytoscapePromise;
    }

    function montarInterface(root, data) {
        root.innerHTML = `
            <div class="portal-graph-toolbar">
                <label class="portal-graph-search">
                    <span>buscar página</span>
                    <input type="search" placeholder="ex.: estudantes" autocomplete="off">
                </label>
                <button type="button" class="portal-graph-depth-toggle" aria-pressed="false">mostrar distância da Home</button>
                <button type="button" class="portal-graph-fullscreen" aria-pressed="false">tela cheia</button>
                <button type="button" class="portal-graph-recenter">recentralizar</button>
                <span class="portal-graph-stats">${data.nodes.length} páginas · ${data.edges.length} relações</span>
            </div>
            <div class="portal-graph-stage">
                <div class="portal-graph-visual">
                    <svg class="portal-depth-rings" aria-hidden="true"></svg>
                    <div class="portal-graph-canvas" aria-label="Grafo da estrutura do Portal IFMG"></div>
                </div>
                <aside class="portal-graph-details" aria-live="polite"></aside>
            </div>
        `;

        return {
            input: root.querySelector(".portal-graph-search input"),
            depthToggle: root.querySelector(".portal-graph-depth-toggle"),
            fullscreen: root.querySelector(".portal-graph-fullscreen"),
            recenter: root.querySelector(".portal-graph-recenter"),
            visual: root.querySelector(".portal-graph-visual"),
            rings: root.querySelector(".portal-depth-rings"),
            canvas: root.querySelector(".portal-graph-canvas"),
            details: root.querySelector(".portal-graph-details")
        };
    }

    function mostrarDetalhes(painel, nodeData) {
        if (!painel || !nodeData) return;
        const descricao = nodeData.description
            ? `<p>${escaparHtml(nodeData.description)}</p>`
            : "<p>Página mapeada na estrutura do Portal.</p>";

        painel.innerHTML = `
            <span class="portal-graph-details-kicker">${escaparHtml(ramoDaUrl(nodeData.url))}</span>
            <h3>${escaparHtml(nodeData.title)}</h3>
            ${descricao}
            <code>${escaparHtml(nodeData.url)}</code>
            <a href="${escaparHtml(nodeData.url)}" target="_blank" rel="noopener noreferrer">abrir página no Portal ↗</a>
        `;
    }

    function filhosEstruturais(data) {
        const filhos = new Map();

        data.edges
            .filter(edge => edge.type === "estrutura")
            .forEach(edge => {
                if (!filhos.has(edge.source)) filhos.set(edge.source, []);
                filhos.get(edge.source).push(edge.target);
            });

        return filhos;
    }

    function angulosNoSetor(quantidade, centro, largura) {
        if (quantidade <= 0) return [];
        if (quantidade === 1) return [centro];

        const inicio = centro - (largura / 2);
        const passo = largura / (quantidade - 1);

        return Array.from({ length: quantidade }, (_, indice) => inicio + (passo * indice));
    }

    function aplicarLayoutFan(hubId, filhosDoHub, posicoes, angulos) {
        const hub = posicoes.get(hubId);
        if (!hub || !filhosDoHub.length) return;

        const direcaoExterna = Math.atan2(hub.y, hub.x);
        const raioLocal = filhosDoHub.length <= 5 ? 300 : 340;
        const largura = Math.min(1.65, 0.34 * Math.max(filhosDoHub.length - 1, 1));
        const direcoes = angulosNoSetor(filhosDoHub.length, direcaoExterna, largura);

        filhosDoHub.forEach((id, indice) => {
            const angulo = direcoes[indice];
            const posicao = {
                x: hub.x + (Math.cos(angulo) * raioLocal),
                y: hub.y + (Math.sin(angulo) * raioLocal)
            };

            posicoes.set(id, posicao);
            angulos.set(id, Math.atan2(posicao.y, posicao.x));
        });
    }

    function aplicarLayoutStack(hubId, filhosDoHub, posicoes, angulos) {
        const hub = posicoes.get(hubId);
        if (!hub || !filhosDoHub.length) return;

        const direcaoExterna = Math.atan2(hub.y, hub.x);
        const ux = Math.cos(direcaoExterna);
        const uy = Math.sin(direcaoExterna);
        const vx = -uy;
        const vy = ux;
        const colunas = filhosDoHub.length === 1 ? 1 : 2;
        const espacamentoColuna = 210;
        const espacamentoLinha = 128;
        const avancarInicial = 190;

        filhosDoHub.forEach((id, indice) => {
            const linha = Math.floor(indice / colunas);
            const coluna = indice % colunas;
            const deslocamentoLateral = colunas === 1
                ? 0
                : (coluna === 0 ? -(espacamentoColuna / 2) : (espacamentoColuna / 2));
            const avancar = avancarInicial + (linha * espacamentoLinha);

            const posicao = {
                x: hub.x + (ux * avancar) + (vx * deslocamentoLateral),
                y: hub.y + (uy * avancar) + (vy * deslocamentoLateral)
            };

            posicoes.set(id, posicao);
            angulos.set(id, Math.atan2(posicao.y, posicao.x));
        });
    }

    function aplicarLayoutsEspeciais(data, filhos, posicoes, angulos) {
        data.nodes.forEach(node => {
            if (!node.hubLayout) return;

            const filhosDoHub = filhos.get(node.id) || [];
            if (!filhosDoHub.length) return;

            if (node.hubLayout === "fan") {
                aplicarLayoutFan(node.id, filhosDoHub, posicoes, angulos);
                return;
            }

            if (node.hubLayout === "stack") {
                aplicarLayoutStack(node.id, filhosDoHub, posicoes, angulos);
            }
        });
    }

    function calcularLayoutSetorial(data) {
        const raiz = "https://portal.ifmg.edu.br/";
        const filhos = filhosEstruturais(data);
        const posicoes = new Map([[raiz, { x: 0, y: 0 }]]);
        const profundidades = new Map([[raiz, 0]]);
        const angulos = new Map([[raiz, -Math.PI / 2]]);
        const ramoPorId = new Map([[raiz, raiz]]);
        const filhosDaRaiz = filhos.get(raiz) || [];

        if (!filhosDaRaiz.length) {
            return { posicoes, profundidades, ramoPorId };
        }

        const passoSetor = (Math.PI * 2) / filhosDaRaiz.length;
        const larguraUtilSetor = passoSetor * 0.78;
        const raioPrimeiroNivel = 285;
        const raiosSegundoNivel = [515, 690];
        const raioTerceiroNivel = 875;
        const incrementoProfundidade = 175;

        filhosDaRaiz.forEach((ramoId, indiceRamo) => {
            const centroSetor = (-Math.PI / 2) + (passoSetor * indiceRamo);
            const posicaoRamo = {
                x: Math.cos(centroSetor) * raioPrimeiroNivel,
                y: Math.sin(centroSetor) * raioPrimeiroNivel
            };

            posicoes.set(ramoId, posicaoRamo);
            profundidades.set(ramoId, 1);
            angulos.set(ramoId, centroSetor);
            ramoPorId.set(ramoId, ramoId);

            const filhosDiretos = filhos.get(ramoId) || [];
            const quantidadePrimeiroAnel = filhosDiretos.length <= 8
                ? filhosDiretos.length
                : Math.ceil(filhosDiretos.length / 2);
            const grupos = filhosDiretos.length <= 8
                ? [filhosDiretos]
                : [
                    filhosDiretos.slice(0, quantidadePrimeiroAnel),
                    filhosDiretos.slice(quantidadePrimeiroAnel)
                ];

            grupos.forEach((grupo, indiceAnel) => {
                const raio = raiosSegundoNivel[indiceAnel] || (raiosSegundoNivel[1] + ((indiceAnel - 1) * 160));
                const larguraAnel = indiceAnel === 0
                    ? larguraUtilSetor * 0.9
                    : larguraUtilSetor;
                const angulosDoGrupo = angulosNoSetor(grupo.length, centroSetor, larguraAnel);

                grupo.forEach((id, indice) => {
                    const angulo = angulosDoGrupo[indice];
                    posicoes.set(id, {
                        x: Math.cos(angulo) * raio,
                        y: Math.sin(angulo) * raio
                    });
                    profundidades.set(id, 2);
                    angulos.set(id, angulo);
                    ramoPorId.set(id, ramoId);
                });
            });

            const fila = filhosDiretos.map(id => ({
                id,
                profundidade: 2,
                larguraLocal: Math.max(0.09, larguraUtilSetor / Math.max(filhosDiretos.length, 5))
            }));

            while (fila.length) {
                const atual = fila.shift();
                const filhosDoAtual = filhos.get(atual.id) || [];
                if (!filhosDoAtual.length) continue;

                const anguloPai = angulos.get(atual.id) ?? centroSetor;
                const proximaProfundidade = atual.profundidade + 1;
                const raio = raioTerceiroNivel + ((proximaProfundidade - 3) * incrementoProfundidade);
                const larguraPermitida = Math.min(
                    atual.larguraLocal * 1.7,
                    larguraUtilSetor / 3
                );
                const angulosDosFilhos = angulosNoSetor(
                    filhosDoAtual.length,
                    anguloPai,
                    larguraPermitida
                );

                filhosDoAtual.forEach((id, indice) => {
                    const angulo = angulosDosFilhos[indice];
                    posicoes.set(id, {
                        x: Math.cos(angulo) * raio,
                        y: Math.sin(angulo) * raio
                    });
                    profundidades.set(id, proximaProfundidade);
                    angulos.set(id, angulo);
                    ramoPorId.set(id, ramoId);
                    fila.push({
                        id,
                        profundidade: proximaProfundidade,
                        larguraLocal: Math.max(0.07, larguraPermitida / Math.max(filhosDoAtual.length, 2))
                    });
                });
            }
        });

        const semPaiEstrutural = data.nodes
            .map(node => node.id)
            .filter(id => !posicoes.has(id));

        if (semPaiEstrutural.length) {
            const raioExterno = raioTerceiroNivel + 220;
            angulosNoSetor(semPaiEstrutural.length, Math.PI / 2, Math.PI * 1.6)
                .forEach((angulo, indice) => {
                    const id = semPaiEstrutural[indice];
                    posicoes.set(id, {
                        x: Math.cos(angulo) * raioExterno,
                        y: Math.sin(angulo) * raioExterno
                    });
                    profundidades.set(id, 2);
                    angulos.set(id, angulo);
                    ramoPorId.set(id, "compartilhado");
                });
        }

        aplicarLayoutsEspeciais(data, filhos, posicoes, angulos);

        return { posicoes, profundidades, ramoPorId };
    }

    function calcularDistanciasDaHome(data) {
        const raiz = "https://portal.ifmg.edu.br/";
        const idsValidos = new Set(data.nodes.map(node => node.id));
        const saidas = new Map();

        data.edges.forEach(edge => {
            if (!idsValidos.has(edge.source) || !idsValidos.has(edge.target)) return;
            if (!saidas.has(edge.source)) saidas.set(edge.source, []);
            saidas.get(edge.source).push(edge.target);
        });

        const distancias = new Map([[raiz, 0]]);
        const fila = [raiz];

        while (fila.length) {
            const atual = fila.shift();
            const distanciaAtual = distancias.get(atual) || 0;

            (saidas.get(atual) || []).forEach(destino => {
                const proxima = distanciaAtual + 1;
                if (distancias.has(destino) && distancias.get(destino) <= proxima) return;
                distancias.set(destino, proxima);
                fila.push(destino);
            });
        }

        return distancias;
    }

    function calcularRamosEstruturais(data) {
        const raiz = "https://portal.ifmg.edu.br/";
        const filhos = filhosEstruturais(data);
        const ramos = new Map([[raiz, raiz]]);
        const filhosDaRaiz = filhos.get(raiz) || [];

        filhosDaRaiz.forEach(ramoId => {
            ramos.set(ramoId, ramoId);
            const fila = [ramoId];

            while (fila.length) {
                const atual = fila.shift();
                (filhos.get(atual) || []).forEach(filho => {
                    if (ramos.has(filho)) return;
                    ramos.set(filho, ramoId);
                    fila.push(filho);
                });
            }
        });

        return { ramos, filhosDaRaiz };
    }

    function calcularLayoutPorDistancia(data) {
        const raiz = "https://portal.ifmg.edu.br/";
        const distancias = calcularDistanciasDaHome(data);
        const { ramos, filhosDaRaiz } = calcularRamosEstruturais(data);
        const posicoes = new Map([[raiz, { x: 0, y: 0 }]]);
        const passoRaio = 300;
        const passoSetor = filhosDaRaiz.length
            ? (Math.PI * 2) / filhosDaRaiz.length
            : Math.PI * 2;
        const larguraSetor = passoSetor * 0.86;
        const grupos = new Map();

        data.nodes.forEach(node => {
            if (node.id === raiz) return;
            const distancia = distancias.get(node.id);
            if (!Number.isFinite(distancia)) return;

            const ramo = ramos.get(node.id) || "compartilhado";
            const chave = `${ramo}::${distancia}`;
            if (!grupos.has(chave)) grupos.set(chave, []);
            grupos.get(chave).push(node.id);
        });

        filhosDaRaiz.forEach((ramoId, indiceRamo) => {
            const centroSetor = (-Math.PI / 2) + (passoSetor * indiceRamo);

            [...grupos.entries()]
                .filter(([chave]) => chave.startsWith(`${ramoId}::`))
                .forEach(([chave, ids]) => {
                    const distancia = Number(chave.split("::")[1]);
                    const raio = distancia * passoRaio;
                    const largura = distancia === 1 ? 0 : larguraSetor;
                    const direcoes = angulosNoSetor(ids.length, centroSetor, largura);

                    ids.forEach((id, indice) => {
                        const angulo = direcoes[indice] ?? centroSetor;
                        posicoes.set(id, {
                            x: Math.cos(angulo) * raio,
                            y: Math.sin(angulo) * raio
                        });
                    });
                });
        });

        const compartilhados = [...grupos.entries()]
            .filter(([chave]) => chave.startsWith("compartilhado::"));

        compartilhados.forEach(([chave, ids]) => {
            const distancia = Number(chave.split("::")[1]);
            const raio = distancia * passoRaio;
            const direcoes = angulosNoSetor(ids.length, Math.PI / 2, Math.PI * 1.7);

            ids.forEach((id, indice) => {
                const angulo = direcoes[indice] ?? Math.PI / 2;
                posicoes.set(id, {
                    x: Math.cos(angulo) * raio,
                    y: Math.sin(angulo) * raio
                });
            });
        });

        const naoAlcancados = data.nodes
            .map(node => node.id)
            .filter(id => !posicoes.has(id));

        const profundidadeMaxima = Math.max(0, ...distancias.values());

        naoAlcancados.forEach((id, indice) => {
            const raio = (profundidadeMaxima + 1) * passoRaio;
            const angulo = (Math.PI * 2 * indice) / Math.max(naoAlcancados.length, 1);
            posicoes.set(id, {
                x: Math.cos(angulo) * raio,
                y: Math.sin(angulo) * raio
            });
        });

        return {
            posicoes,
            distancias,
            profundidadeMaxima,
            passoRaio,
            ramos
        };
    }

    async function renderizar(root) {
        const data = window.PortalGraphData;
        if (!data?.nodes?.length) {
            root.innerHTML = '<p class="portal-graph-error">Ainda não há páginas mapeadas para exibir.</p>';
            return;
        }

        const ui = montarInterface(root, data);

        try {
            const cytoscape = await carregarCytoscape();
            if (!document.body.contains(root)) return;
            if (instanciaAtiva) instanciaAtiva.destroy();

            const estiloRaiz = getComputedStyle(document.documentElement);
            const accent = estiloRaiz.getPropertyValue("--accent-blue").trim() || "#74b77b";
            const text = estiloRaiz.getPropertyValue("--text").trim() || "#f1f0eb";
            const muted = estiloRaiz.getPropertyValue("--muted").trim() || "#a4a39e";
            const bg = estiloRaiz.getPropertyValue("--bg").trim() || "#101010";

            const layoutSetorial = calcularLayoutSetorial(data);
            const layoutDistancia = calcularLayoutPorDistancia(data);
            const nodeDataById = new Map(data.nodes.map(node => [node.id, node]));
            const elements = [
                ...data.nodes.map(node => {
                    const profundidade = layoutSetorial.profundidades.get(node.id) ?? 2;
                    const classes = [
                        profundidade <= 1 ? "portal-graph-major" : "",
                        node.hubLayout ? "portal-graph-hub" : ""
                    ].filter(Boolean).join(" ");

                    return {
                        data: {
                            ...node,
                            branch: ramoDaUrl(node.url),
                            graphDepth: profundidade,
                            clickDistance: layoutDistancia.distancias.get(node.id) ?? null
                        },
                        classes,
                        position: layoutSetorial.posicoes.get(node.id) || { x: 0, y: 0 }
                    };
                }),
                ...data.edges.map((edge, index) => {
                    const origem = nodeDataById.get(edge.source);
                    const classes = origem?.hubLayout && edge.type !== "estrutura"
                        ? "portal-graph-hub-secondary"
                        : "";

                    return {
                        data: {
                            id: `portal-edge-${index + 1}`,
                            ...edge
                        },
                        classes
                    };
                })
            ];

            const cy = cytoscape({
                container: ui.canvas,
                elements,
                minZoom: 0.28,
                maxZoom: 2.2,
                wheelSensitivity: 0.18,
                layout: {
                    name: "preset",
                    fit: false
                },
                style: [
                    {
                        selector: "node",
                        style: {
                            "background-color": node => corDoRamo(node.data("branch"), accent),
                            "border-width": 1.5,
                            "border-color": bg,
                            "width": 38,
                            "height": 38,
                            "label": "data(title)",
                            "color": text,
                            "font-family": "Archivo, sans-serif",
                            "font-size": 11,
                            "font-weight": 500,
                            "text-wrap": "wrap",
                            "text-max-width": 120,
                            "text-valign": "bottom",
                            "text-margin-y": 8,
                            "text-background-color": bg,
                            "text-background-opacity": 0.88,
                            "text-background-padding": 3,
                            "min-zoomed-font-size": 8
                        }
                    },
                    {
                        selector: ".portal-graph-major",
                        style: {
                            "min-zoomed-font-size": 0,
                            "font-size": 12,
                            "font-weight": 650,
                            "width": 44,
                            "height": 44
                        }
                    },
                    {
                        selector: ".portal-graph-hub",
                        style: {
                            "width": 48,
                            "height": 48,
                            "border-width": 3,
                            "border-color": accent,
                            "font-weight": 700,
                            "min-zoomed-font-size": 0
                        }
                    },
                    {
                        selector: 'node[id = "https://portal.ifmg.edu.br/"]',
                        style: {
                            "width": 54,
                            "height": 54,
                            "border-width": 3,
                            "border-color": accent,
                            "font-size": 12,
                            "font-weight": 700
                        }
                    },
                    {
                        selector: "edge",
                        style: {
                            "width": 1.4,
                            "line-color": muted,
                            "opacity": 0.28,
                            "curve-style": "bezier",
                            "target-arrow-shape": "none"
                        }
                    },
                    {
                        selector: 'edge[type = "redireciona"]',
                        style: {
                            "line-style": "dashed",
                            "line-color": accent,
                            "opacity": 0.14,
                            "target-arrow-shape": "triangle",
                            "target-arrow-color": accent,
                            "arrow-scale": 0.65,
                            "curve-style": "unbundled-bezier",
                            "control-point-distances": 70,
                            "control-point-weights": 0.5
                        }
                    },
                    {
                        selector: ".portal-graph-redirect-focus",
                        style: {
                            "opacity": 0.9,
                            "width": 2.2,
                            "arrow-scale": 0.85
                        }
                    },
                    {
                        selector: ".portal-graph-hub-secondary",
                        style: {
                            "opacity": 0.025,
                            "line-style": "dotted",
                            "line-color": accent,
                            "target-arrow-shape": "triangle",
                            "target-arrow-color": accent,
                            "arrow-scale": 0.55,
                            "curve-style": "unbundled-bezier",
                            "control-point-distances": 54,
                            "control-point-weights": 0.5
                        }
                    },
                    {
                        selector: ".portal-graph-secondary-focus",
                        style: {
                            "opacity": 0.88,
                            "width": 2,
                            "arrow-scale": 0.8
                        }
                    },
                    {
                        selector: ".portal-graph-dimmed",
                        style: { "opacity": 0.12 }
                    },
                    {
                        selector: ".portal-graph-match",
                        style: {
                            "border-width": 4,
                            "border-color": accent,
                            "z-index": 10
                        }
                    }
                ]
            });

            instanciaAtiva = cy;

            const rootNode = cy.getElementById("https://portal.ifmg.edu.br/");
            let modoDistancia = false;

            function limparAneis() {
                ui.rings.innerHTML = "";
                ui.rings.hidden = true;
                root.classList.remove("portal-graph-depth-mode");
            }

            function atualizarAneis() {
                if (!modoDistancia || !rootNode.length) {
                    limparAneis();
                    return;
                }

                const largura = ui.visual.clientWidth;
                const altura = ui.visual.clientHeight;
                if (!largura || !altura) return;

                const centro = rootNode.renderedPosition();
                const zoom = cy.zoom();
                const passoRenderizado = layoutDistancia.passoRaio * zoom;
                const profundidadeMaxima = layoutDistancia.profundidadeMaxima;

                ui.rings.hidden = false;
                ui.rings.setAttribute("viewBox", `0 0 ${largura} ${altura}`);
                ui.rings.setAttribute("width", String(largura));
                ui.rings.setAttribute("height", String(altura));

                const bandas = [];
                for (let profundidade = profundidadeMaxima; profundidade >= 1; profundidade -= 1) {
                    const raio = profundidade * passoRenderizado;
                    const larguraBanda = passoRenderizado * 0.94;
                    const intensidade = Math.min(5 + (profundidade * 3), 20);

                    bandas.push(`
                        <circle
                            class="portal-depth-band"
                            cx="${centro.x.toFixed(2)}"
                            cy="${centro.y.toFixed(2)}"
                            r="${raio.toFixed(2)}"
                            stroke-width="${larguraBanda.toFixed(2)}"
                            style="stroke: color-mix(in srgb, var(--accent-blue) ${intensidade}%, transparent);"
                        />
                    `);
                }

                const limites = [];
                for (let profundidade = 1; profundidade <= profundidadeMaxima; profundidade += 1) {
                    const raio = profundidade * passoRenderizado;
                    const anguloLegenda = -1.12;
                    const xLegenda = centro.x + (Math.cos(anguloLegenda) * raio) + 8;
                    const yLegenda = centro.y + (Math.sin(anguloLegenda) * raio) - 7;
                    const rotulo = profundidade === 1
                        ? "1 clique da Home"
                        : `${profundidade} cliques da Home`;

                    limites.push(`
                        <circle
                            class="portal-depth-boundary"
                            cx="${centro.x.toFixed(2)}"
                            cy="${centro.y.toFixed(2)}"
                            r="${raio.toFixed(2)}"
                        />
                        <text
                            class="portal-depth-label"
                            x="${xLegenda.toFixed(2)}"
                            y="${yLegenda.toFixed(2)}"
                        >${rotulo}</text>
                    `);
                }

                ui.rings.innerHTML = bandas.join("") + limites.join("");
            }

            function aplicarLayoutEstrutural() {
                modoDistancia = false;
                ui.depthToggle.setAttribute("aria-pressed", "false");
                ui.depthToggle.textContent = "mostrar distância da Home";
                limparAneis();

                const proximoLayout = calcularLayoutSetorial(data);
                cy.nodes().positions(node => proximoLayout.posicoes.get(node.id()) || node.position());
                cy.fit(cy.elements(), 72);
            }

            function aplicarLayoutDistancia() {
                modoDistancia = true;
                root.classList.add("portal-graph-depth-mode");
                ui.depthToggle.setAttribute("aria-pressed", "true");
                ui.depthToggle.textContent = "voltar à estrutura";

                cy.nodes().positions(node => layoutDistancia.posicoes.get(node.id()) || node.position());
                cy.fit(cy.nodes(), 72);
                window.requestAnimationFrame(atualizarAneis);
            }

            function reenquadrarModoAtual() {
                if (modoDistancia) {
                    cy.fit(cy.nodes(), 72);
                    window.requestAnimationFrame(atualizarAneis);
                    return;
                }
                cy.fit(cy.elements(), 72);
            }

            function atualizarControleTelaCheia() {
                const ativo = document.fullscreenElement === root;
                ui.fullscreen.setAttribute("aria-pressed", String(ativo));
                ui.fullscreen.textContent = ativo ? "sair da tela cheia" : "tela cheia";
            }

            function reajustarAposTelaCheia() {
                window.requestAnimationFrame(() => {
                    cy.resize();
                    reenquadrarModoAtual();
                    if (modoDistancia) atualizarAneis();
                });
            }

            async function alternarTelaCheia() {
                try {
                    if (document.fullscreenElement === root) {
                        await document.exitFullscreen();
                        return;
                    }

                    if (document.fullscreenElement) return;
                    await root.requestFullscreen();
                } catch (error) {
                    console.warn("Não foi possível alternar a tela cheia do mapa:", error);
                }
            }

            const suportaTelaCheia = Boolean(document.fullscreenEnabled && root.requestFullscreen);
            if (!suportaTelaCheia) {
                ui.fullscreen.hidden = true;
            } else {
                ui.fullscreen.addEventListener("click", alternarTelaCheia);
                document.addEventListener("fullscreenchange", () => {
                    atualizarControleTelaCheia();
                    reajustarAposTelaCheia();
                });
                atualizarControleTelaCheia();
            }

            // Apresentação CODIR: iniciar no modo de distância da Home (0 a 3 cliques).
            aplicarLayoutDistancia();
            window.setTimeout(() => {
                cy.resize();
                aplicarLayoutDistancia();
            }, 80);

            // Ajustar ao tamanho efetivo do iframe quando o slide ficar visível.
            function syncCodirViewport() {
                window.requestAnimationFrame(() => {
                    cy.resize();
                    reenquadrarModoAtual();
                });
            }
            window.addEventListener("resize", syncCodirViewport);
            window.addEventListener("message", (event) => {
                if (event.origin !== window.location.origin) return;
                if (event.data?.type === "codir-guide-graph-resize") syncCodirViewport();
            });

            cy.on("pan zoom", () => {
                if (modoDistancia) atualizarAneis();
            });

            ui.depthToggle.addEventListener("click", () => {
                cy.elements().removeClass("portal-graph-dimmed portal-graph-match portal-graph-redirect-focus portal-graph-secondary-focus");
                ui.input.value = "";

                if (modoDistancia) {
                    aplicarLayoutEstrutural();
                } else {
                    aplicarLayoutDistancia();
                }
            });

            if (rootNode.length) {
                mostrarDetalhes(ui.details, rootNode.data());
                rootNode.select();
            }

            cy.on("tap", "node", event => {
                const node = event.target;
                mostrarDetalhes(ui.details, node.data());

                cy.edges('[type = "redireciona"]').removeClass("portal-graph-redirect-focus");
                cy.edges(".portal-graph-hub-secondary").removeClass("portal-graph-secondary-focus");

                node.connectedEdges('[type = "redireciona"]').addClass("portal-graph-redirect-focus");
                node.connectedEdges(".portal-graph-hub-secondary").addClass("portal-graph-secondary-focus");
            });

            ui.recenter.addEventListener("click", () => {
                cy.elements().removeClass("portal-graph-dimmed portal-graph-match portal-graph-redirect-focus portal-graph-secondary-focus");
                ui.input.value = "";

                if (modoDistancia) {
                    aplicarLayoutDistancia();
                } else {
                    aplicarLayoutEstrutural();
                }
            });

            ui.input.addEventListener("input", () => {
                const consulta = normalizar(ui.input.value.trim());
                cy.elements().removeClass("portal-graph-dimmed portal-graph-match");

                if (!consulta) {
                    reenquadrarModoAtual();
                    return;
                }

                const matches = cy.nodes().filter(node => {
                    return normalizar(`${node.data("title")} ${node.data("url")}`).includes(consulta);
                });

                if (!matches.length) {
                    cy.nodes().addClass("portal-graph-dimmed");
                    return;
                }

                cy.nodes().not(matches).addClass("portal-graph-dimmed");
                matches.addClass("portal-graph-match");
                cy.fit(matches, 100);

                const primeiro = matches[0];
                if (primeiro) mostrarDetalhes(ui.details, primeiro.data());
            });
        } catch (error) {
            console.error("Erro ao renderizar o mapa do Portal:", error);
            root.innerHTML = `
                <p class="portal-graph-error">
                    Não foi possível carregar o mapa interativo agora. O restante do guia continua disponível normalmente.
                </p>
            `;
        }
    }

    function renderizarSePresente(container = document) {
        const root = container.querySelector?.("[data-portal-graph]");
        if (!root || root.dataset.graphRendered === "true") return;
        root.dataset.graphRendered = "true";
        renderizar(root);
    }

    window.GuiaGrafoPortal = Object.freeze({
        renderizarSePresente
    });
})();
