(() => {
  "use strict";
  const network = document.getElementById("network");
  const status = document.getElementById("status");
  const loader = document.getElementById("loading");
  const raw = window.graphData;
  if (!raw || !Array.isArray(raw.nodes) || !window.cytoscape) {
    loader.textContent = "Não foi possível carregar a visualização. Consulte o repositório sitedoifmggrafo.";
    return;
  }

  const root = "https://www.ifmg.edu.br/portal";
  const palette = {
    controle:"#e8c679", servidores:"#9caef8", estudantes:"#b9e6c9",
    ingressantes:"#f2ac85", hibrido:"#c5ade9", institucional:"#79cdb0"
  };
  const normalize = value => {
    try {
      const url = new URL(String(value));
      if (url.hostname !== "www.ifmg.edu.br" || !url.pathname.startsWith("/portal")) return null;
      return "https://www.ifmg.edu.br" + url.pathname.replace(/\/$/, "");
    } catch { return null; }
  };
  const hash = str => {
    let n = 0;
    for (let i = 0; i < str.length; i++) n = (n * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(n);
  };
  const branchOf = id => (id.slice(root.length).split("/").filter(Boolean)[0] || "reitoria");
  const nodeMap = new Map();
  raw.nodes.forEach(item => {
    const d = item.data || {};
    const id = normalize(d.id || d.url);
    if (!id || nodeMap.has(id)) return;
    const depth = Math.min(4,Math.max(0,Number(d.depth) || 0));
    const category = String(d.clusterId || "institucional").toLowerCase();
    nodeMap.set(id, {
      data: {
        id, title: String(d.title || d.label || id),
        depth, branch: branchOf(id), category,
        color: palette[category] || "#b7e5ce",
        short: String(d.title || d.label || "").slice(0,32)
      }
    });
  });
  const groups = new Map();
  for (const node of nodeMap.values()) {
    if (node.data.depth === 0) continue;
    const key = node.data.branch;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(node);
  }
  const keys = [...groups.keys()].sort((a,b) => a.localeCompare(b,"pt-BR"));
  const weighted = keys.map(key => Math.sqrt(groups.get(key).length)+1);
  const weightTotal = weighted.reduce((a,b)=>a+b,0);
  let theta = -Math.PI / 2;
  const positions = new Map([[root,{x:0,y:0}]]);
  keys.forEach((key,i) => {
    const span = (weighted[i] / weightTotal) * Math.PI * 2;
    const group = groups.get(key);
    const byDepth = new Map();
    group.forEach(node=>{
      const d=node.data.depth;
      if(!byDepth.has(d))byDepth.set(d,[]);
      byDepth.get(d).push(node);
    });
    for (const [depth, list] of byDepth) {
      list.sort((a,b)=>a.data.id.localeCompare(b.data.id));
      list.forEach((node,j) => {
        const base = [0,240,490,790,1075][depth] || 1075;
        const spread = depth===1 ? 0.5 : 0.94;
        const angle = theta + span * ((1-spread)/2+spread*((j+.5)/list.length));
        const radius = base + (depth===1 ? 0 : (hash(node.data.id)%111)-55);
        positions.set(node.data.id,{x:Math.cos(angle)*radius,y:Math.sin(angle)*radius});
      });
    }
    theta += span;
  });

  const nodes = [...nodeMap.values()].map(node=>({
    ...node, position:positions.get(node.data.id) || {x:0,y:0},
    classes: node.data.depth===0 ? "root" : node.data.depth===1 ? "main" : ""
  }));
  const seenEdges = new Set();
  const edges = [];
  raw.edges.forEach(item => {
    const d=item.data || {};
    const source=normalize(d.source),target=normalize(d.target);
    if(!source||!target||source===target||!nodeMap.has(source)||!nodeMap.has(target))return;
    const key=source+"=>"+target;
    if(seenEdges.has(key))return;
    seenEdges.add(key);
    edges.push({data:{id:key,source,target}});
  });
  document.getElementById("total-nodes").textContent=String(nodes.length);
  document.getElementById("total-edges").textContent=String(edges.length);

  const cy = cytoscape({
    container:network,
    elements:{nodes,edges},
    layout:{name:"preset",fit:true,padding:45},
    wheelSensitivity:0.18,
    minZoom:0.18,
    maxZoom:2.8,
    style:[
      {selector:"node",style:{
        width:node=>node.data("depth")===0?30:node.data("depth")===1?22:node.data("depth")===2?12:7,
        height:node=>node.data("depth")===0?30:node.data("depth")===1?22:node.data("depth")===2?12:7,
        "background-color":"data(color)","border-width":0,
        opacity:.91,"label":"","overlay-opacity":0
      }},
      {selector:"edge",style:{
        width:1.3,"line-color":"#9fc3a2",opacity:.23,"curve-style":"straight"
      }},
      {selector:".root",style:{
        "background-color":"#fafaf8","border-width":4,"border-color":"#8be2b6",
        label:"REITORIA","color":"#fff","font-family":"Arial, sans-serif",
        "font-size":28,"font-weight":700,"text-valign":"top","text-margin-y":-14,
        "text-background-color":"#13281d","text-background-opacity":.9,
        "text-background-padding":4,"min-zoomed-font-size":7
      }},
      {selector:".main",style:{
        label:"data(short)","font-size":18,"font-weight":600,"color":"#e5f1e7",
        "text-valign":"bottom","text-margin-y":7,"text-wrap":"ellipsis",
        "text-max-width":"180px","text-background-color":"#111a14",
        "text-background-opacity":.88,"text-background-padding":3,
        "min-zoomed-font-size":8
      }},
      {selector:".chosen",style:{
        "border-width":4,"border-color":"#fff","z-index":100,
        "background-color":"#a6f2cc"
      }},
      {selector:".dimmed",style:{opacity:.08}},
      {selector:".hidden",style:{display:"none"}}
    ]
  });

  const defaultInfo='<strong>Arraste e amplie para explorar</strong>Cada ponto representa uma página mapeada. As linhas mostram vínculos entre páginas, não caminhos reais de visitantes.';
  const statusText = (node) => {
    const d=node.data();
    const label=String(d.title).replace(/[&<>"]/g, ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
    const url=encodeURI(d.id);
    status.innerHTML="<strong>"+label+"</strong>Nível "+d.depth+" da estrutura · <a href=\""+url+"\" target=\"_blank\" rel=\"noopener noreferrer\">Abrir página mapeada ↗</a>";
  };
  cy.on("tap","node",e=>{
    cy.nodes().removeClass("chosen");
    const n=e.target;
    n.addClass("chosen");
    statusText(n);
    cy.animate({center:{eles:n},zoom:Math.max(cy.zoom(),.7)},{duration:420});
  });
  cy.on("tap",e=>{
    if(e.target!==cy)return;
    cy.nodes().removeClass("chosen");
    status.innerHTML=defaultInfo;
  });
  let detailed=true;
  function show(full) {
    detailed=full;
    cy.elements().removeClass("hidden");
    if(!full) {
      cy.nodes().forEach(node=>node.toggleClass("hidden",node.data("depth")>1));
      cy.edges().forEach(edge=>edge.toggleClass("hidden",edge.source().hasClass("hidden")||edge.target().hasClass("hidden")));
    }
    document.getElementById("show-all").setAttribute("aria-pressed",String(full));
    document.getElementById("show-main").setAttribute("aria-pressed",String(!full));
    centerView();
  }
  function centerView() {
    cy.resize();
    const visible=cy.elements().filter(e=>!e.hasClass("hidden"));
    cy.animate({fit:{eles:visible,padding:65}},{duration:430});
  }
  document.getElementById("show-all").addEventListener("click",()=>show(true));
  document.getElementById("show-main").addEventListener("click",()=>show(false));
  document.getElementById("recenter").addEventListener("click",centerView);
  document.getElementById("zoom-in").addEventListener("click",()=>cy.animate({zoom:{level:Math.min(2.8,cy.zoom()*1.45),position:{x:network.clientWidth/2,y:network.clientHeight/2}}},{duration:240}));
  document.getElementById("zoom-out").addEventListener("click",()=>cy.animate({zoom:{level:Math.max(.18,cy.zoom()/1.45),position:{x:network.clientWidth/2,y:network.clientHeight/2}}},{duration:240}));
  window.addEventListener("resize",()=>{cy.resize();centerView()});
  window.addEventListener("message",event=>{
    if(event.origin!==location.origin)return;
    if(event.data?.type==="codir-graph-resize")setTimeout(centerView,80);
  });
  window.addEventListener("keydown",event=>{
    if(event.target instanceof HTMLElement && ["INPUT","TEXTAREA"].includes(event.target.tagName))return;
    if(event.key==="ArrowRight"||event.key==="ArrowLeft"){
      event.preventDefault();
      window.parent.postMessage({type:"codir-graph-navigate",direction:event.key==="ArrowRight"?1:-1},location.origin);
    } else if(event.key.toLowerCase()==="f"){
      event.preventDefault();
      window.parent.postMessage({type:"codir-graph-fullscreen"},location.origin);
    } else if(event.key==="Escape"){
      window.parent.postMessage({type:"codir-graph-collapse"},location.origin);
    }
  });
  loader.hidden=true;
  requestAnimationFrame(()=>{cy.resize();cy.fit(undefined,65)});
})();