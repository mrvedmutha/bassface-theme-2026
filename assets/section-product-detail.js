(function () {
  "use strict";

  const SELECTORS = {
    section: ".product-detail",
    dot: ".gallery__dot",
    slide: ".gallery__slide",
    expand: ".gallery__expand",
    sizeButton: ".size__button",
    sizeDropdown: ".size__dropdown",
    quantityBtn: ".quantity__btn",
    quantityInput: ".quantity__input",
    tab: ".tabs__btn",
    panel: ".panels__item",
  };

  function init() {
    const sections = document.querySelectorAll(SELECTORS.section);
    if (!sections.length) return;
    sections.forEach(setupSection);
  }

  function setupSection(section) {
    try {
      setupGallery(section);
      setupSizeSelector(section);
      setupQuantity(section);
      setupTabs(section);
    } catch (error) {
      console.error("[Product Detail] Error:", error); // TODO: Remove before production
    }
  }

  function setupGallery(section) {
    const dots = section.querySelectorAll(SELECTORS.dot);
    const slides = section.querySelectorAll(SELECTORS.slide);

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.dataset.index);
        dots.forEach((d) => d.classList.remove("active"));
        slides.forEach((s) => s.classList.remove("active"));
        dot.classList.add("active");
        slides[index].classList.add("active");
      });
    });
  }

  function setupSizeSelector(section) {
    const buttons = section.querySelectorAll(SELECTORS.sizeButton);

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
      });
    });
  }

  function setupQuantity(section) {
    const buttons = section.querySelectorAll(SELECTORS.quantityBtn);
    const input = section.querySelector(SELECTORS.quantityInput);

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        const value = parseInt(input.value) || 1;
        if (action === "minus" && value > 1) {
          input.value = value - 1;
        } else if (action === "plus") {
          input.value = value + 1;
        }
      });
    });
  }

  function setupTabs(section) {
    const tabs = section.querySelectorAll(SELECTORS.tab);
    const panels = section.querySelectorAll(SELECTORS.panel);

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        tabs.forEach((t) => t.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        section.querySelector(`[data-panel="${target}"]`).classList.add("active");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
