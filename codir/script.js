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

  function syncFullscreenButton() {
    if (!fullscreenButton) return;
    const active = (document.fullscreenElement || document.webkitFullscreenElement) === root;
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
    if (updateURL) {
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}#slide-${current + 1}`);
    }
  }

  const goPrevious = () => showSlide(current - 1);
  const goNext = () => showSlide(current + 1);
  prev.addEventListener("click", goPrevious);
  next.addEventListener("click", goNext);

  document.addEventListener("keydown", event => {
    if (zoomDialog?.open) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    if (target instanceof HTMLElement &&
        (["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(target.tagName) || target.isContentEditable)) return;
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

  showSlide(current, false);
})();