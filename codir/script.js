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
    const title = slides[current].dataset.title || "Presentation";
    document.title = `${title} | IFMG presentation`;
    if (updateURL) {
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}#slide-${current + 1}`);
    }
  }

  const goPrevious = () => showSlide(current - 1);
  const goNext = () => showSlide(current + 1);
  prev.addEventListener("click", goPrevious);
  next.addEventListener("click", goNext);

  document.addEventListener("keydown", event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    if (target instanceof HTMLElement &&
        (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable)) return;
    if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
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