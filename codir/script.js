(() => {
  "use strict";
  const slides = Array.from(document.querySelectorAll("#deck .slide"));
  const prev = document.getElementById("previous");
  const next = document.getElementById("next");
  const counter = document.getElementById("slide-counter");
  const progress = document.getElementById("progress");
  const root = document.getElementById("presentation");
  if (!slides.length || !prev || !next || !counter) return;

  const readHash = () => {
    const match = window.location.hash.match(/^#(?:slide-)?(\d+)$/i);
    return match ? Math.max(0, Math.min(slides.length - 1, Number(match[1]) - 1)) : 0;
  };
  const fullscreenButton = document.getElementById("fullscreen-toggle");
  const fullscreenLabel = fullscreenButton?.querySelector(".fullscreen-label");
  const fullscreenIcon = fullscreenButton?.querySelector(".fullscreen-icon");
  const supportsFullscreen = Boolean(
    fullscreenButton && (root.requestFullscreen || root.webkitRequestFullscreen)
      && (document.exitFullscreen || document.webkitExitFullscreen)
  );


  let fitFrame = 0;

  function updateFullscreenScale() {
    if (!root.classList.contains("is-fullscreen")) return;
    const activeSlide = slides[current];
    const content = activeSlide?.querySelector(".slide-inner");
    if (!content) return;
    // O grafo ocupa a tela inteira e ajusta o próprio viewport.
    if (activeSlide.classList.contains("graph-intro-slide")) {
      root.style.setProperty("--deck-zoom", "1");
      return;
    }

    const width = root.clientWidth || window.innerWidth;
    const height = root.clientHeight || window.innerHeight;

    // No celular, o layout responsivo e a rolagem continuam naturais.
    if (width <= 700) {
      root.style.setProperty("--deck-zoom", "1");
      return;
    }

    // Reservar espaço para o cabeçalho, as setas e a barra inferior.
    // Medimos a dimensão real do slide, e não uma altura fixa estimada.
    const availableWidth = Math.max(300, width - Math.max(60, width * 0.06));
    const availableHeight = Math.max(250, height - Math.max(130, height * 0.17));

    function fits(scale) {
      root.style.setProperty("--deck-zoom", scale.toFixed(4));
      const rect = content.getBoundingClientRect();
      return rect.width <= availableWidth + 1 && rect.height <= availableHeight + 1;
    }

    // O tamanho é específico de cada slide. Em telas com pouco espaço,
    // uma escala mínima evita texto ilegível e a rolagem fica disponível.
    let lower = 0.76;
    let upper = 1.8;
    if (!fits(lower)) return;

    // Busca pelo maior fator que cabe tanto em largura quanto em altura.
    for (let attempt = 0; attempt < 10; attempt++) {
      const middle = (lower + upper) / 2;
      if (fits(middle)) lower = middle;
      else upper = middle;
    }
    root.style.setProperty("--deck-zoom", (lower * 0.99).toFixed(4));
  }

  function scheduleFullscreenFit() {
    if (!root.classList.contains("is-fullscreen")) return;
    cancelAnimationFrame(fitFrame);
    fitFrame = requestAnimationFrame(updateFullscreenScale);
  }

  function syncFullscreenButton() {
    if (!fullscreenButton) return;
    const active = (document.fullscreenElement || document.webkitFullscreenElement) === root;
    root.classList.toggle("is-fullscreen", active);
    if (active) scheduleFullscreenFit();
    else root.style.removeProperty("--deck-zoom");
    const label = active ? "Sair da tela cheia" : "Ativar tela cheia";
    fullscreenButton.setAttribute("aria-pressed", String(active));
    fullscreenButton.setAttribute("aria-label", label);
    fullscreenButton.title = label;
    if (fullscreenLabel) fullscreenLabel.textContent = active ? "Sair da tela cheia" : "Tela cheia";
    if (fullscreenIcon) fullscreenIcon.textContent = active ? "⤢" : "⛶";
  }

  async function toggleFullscreen() {
    if (!supportsFullscreen) return;
    const active = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
    try {
      if (active) {
        const exit = document.exitFullscreen || document.webkitExitFullscreen;
        await exit.call(document);
      } else {
        const enter = root.requestFullscreen || root.webkitRequestFullscreen;
        await enter.call(root);
      }
    } catch (error) {
      console.warn("Não foi possível alterar o modo de tela cheia:", error);
    }
    syncFullscreenButton();
  }

  if (fullscreenButton) {
    fullscreenButton.hidden = !supportsFullscreen;
    if (supportsFullscreen) {
      fullscreenButton.addEventListener("click", toggleFullscreen);
      document.addEventListener("fullscreenchange", syncFullscreenButton);
      document.addEventListener("webkitfullscreenchange", syncFullscreenButton);
      window.addEventListener("resize", scheduleFullscreenFit);
      window.visualViewport?.addEventListener("resize", scheduleFullscreenFit);
      syncFullscreenButton();
    }
  }

  // Capturas ampliáveis: as imagens pertencem ao próprio repositório da apresentação.
  const zoomDialog = document.getElementById("guide-lightbox");
  const zoomImage = document.getElementById("guide-lightbox-image");
  const zoomClose = document.getElementById("guide-lightbox-close");
  root.querySelectorAll("[data-zoom-src]").forEach(button => {
    button.addEventListener("click", () => {
      if (!zoomDialog || !zoomImage) return;
      zoomImage.src = button.dataset.zoomSrc;
      zoomImage.alt = button.dataset.zoomAlt || "Imagem ampliada do Guia do Portal";
      if (typeof zoomDialog.showModal === "function") zoomDialog.showModal();
    });
  });
  zoomClose?.addEventListener("click", () => zoomDialog?.close());
  zoomDialog?.addEventListener("click", event => {
    if (event.target === zoomDialog) zoomDialog.close();
  });

  let current = readHash();

  function showSlide(index, updateURL = true) {
    if (!Number.isFinite(index)) return;
    const destination = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, slideIndex) => {
      const isCurrent = destination === slideIndex;
      slide.hidden = !isCurrent;
      slide.classList.toggle("is-active", isCurrent);
      slide.setAttribute("aria-hidden", String(!isCurrent));
      if (isCurrent) slide.scrollTop = 0;
    });
    current = destination;
    const dark = slides[current].classList.contains("dark");
    root.classList.toggle("has-dark", dark);
    counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    progress.style.width = `${((current + 1) / slides.length) * 100}%`;
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    const title = slides[current].dataset.title || "Apresentação";
    document.title = `${title} | Portal IFMG · Colégio de Dirigentes`;
    scheduleFullscreenFit();
    // Cytoscape precisa recalcular seu viewport ao reexibir o iframe.
    if (slides[current].classList.contains("graph-intro-slide")) {
      window.setTimeout(() => document.getElementById("reitoria-graph")?.contentWindow
        ?.postMessage({ type: "codir-graph-resize" }, window.location.origin), 100);
    }
    if (updateURL) {
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}#slide-${current + 1}`);
    }
  }

  const goPrevious = () => showSlide(current - 1);
  const goNext = () => showSlide(current + 1);
  // Setas e tecla F também funcionam quando o foco está dentro do mapa.
  window.addEventListener("message", event => {
    const frame = document.getElementById("reitoria-graph");
    if (event.origin !== window.location.origin || !frame || event.source !== frame.contentWindow) return;
    if (event.data?.type === "codir-graph-navigate") {
      if (event.data.direction === 1) goNext();
      else if (event.data.direction === -1) goPrevious();
    } else if (event.data?.type === "codir-graph-fullscreen" && supportsFullscreen) {
      toggleFullscreen();
    }
  });
  prev.addEventListener("click", goPrevious);
  next.addEventListener("click", goNext);

  document.addEventListener("keydown", event => {
    if (zoomDialog?.open) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    if (target instanceof HTMLElement &&
        ((["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
          || (["BUTTON", "A"].includes(target.tagName) && [" ", "Enter"].includes(event.key))) || target.isContentEditable)) return;
    if (event.key.toLowerCase() === "f" && supportsFullscreen) {
      event.preventDefault();
      toggleFullscreen();
    } else if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      goPrevious();
    } else if (event.key === "Home") {
      event.preventDefault();
      showSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      showSlide(slides.length - 1);
    }
  });

  window.addEventListener("hashchange", () => {
    const index = readHash();
    if (index !== current) showSlide(index, false);
  });

  let touchStartX = null;
  let touchStartY = null;
  root.addEventListener("touchstart", event => {
    if (event.touches.length !== 1) return;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }, {passive:true});
  root.addEventListener("touchend", event => {
    if (touchStartX == null || touchStartY == null || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
    touchStartX = touchStartY = null;
    if (Math.abs(dx) < 65 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
    dx < 0 ? goNext() : goPrevious();
  }, {passive:true});

  // Fontes e imagens podem modificar a altura depois da primeira pintura.
  // Reajustar sem depender do slide seguinte ou de um resize manual.
  document.fonts?.ready.then(scheduleFullscreenFit);
  root.querySelectorAll(".slide img").forEach(img => {
    if (!img.complete) img.addEventListener("load", scheduleFullscreenFit, { once: true });
  });

  showSlide(current, false);
})();