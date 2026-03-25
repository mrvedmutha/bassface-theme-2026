/**
 * Product Detail Section
 * Handles: Gallery, Size Toggle, Quantity, Dynamic Pricing, Modals
 */

(function () {
  "use strict";

  const SELECTORS = {
    section: ".product-detail",
    // Gallery
    dot: ".gallery__dot",
    slide: ".gallery__slide",
    expand: ".gallery__expand",
    // Size Toggle
    toggleTrigger: "[data-size-toggle]",
    toggleValue: "[data-selected-size]",
    buttonsWrapper: "[data-size-buttons-wrapper]",
    sizeButton: ".size__button",
    sizeSection: "[data-size-section]",
    // Panels
    panelTrigger: "[data-panel-trigger]",
    panel: "[data-panel]",
    panelClose: "[data-panel-close]",
    // Quantity
    quantityBtn: ".quantity__btn",
    quantityInput: "[data-quantity-input]",
    // Pricing
    cartPrice: "[data-cart-price]",
    addToCart: "[data-add-to-cart]",
    // Modals
    modalTrigger: "[data-modal]",
    modal: ".modal",
    modalClose: "[data-modal-close]",
  };

  const CLASSES = {
    active: "active",
    selected: "selected",
    soldOut: "sold-out",
    collapsed: "collapsed",
  };

  function init() {
    const sections = document.querySelectorAll(SELECTORS.section);
    if (!sections.length) return;
    sections.forEach(setupSection);
    setupModals();
    setupPanels();
  }

  function setupSection(section) {
    try {
      setupGallery(section);
      setupSizeToggle(section);
      setupQuantity(section);
      setupPricing(section);
    } catch (error) {
      console.error("[Product Detail] Error:", error);
    }
  }

  // ========================================
  // GALLERY
  // ========================================
  function setupGallery(section) {
    const dots = section.querySelectorAll(SELECTORS.dot);
    const slides = section.querySelectorAll(SELECTORS.slide);
    const expandBtn = section.querySelector(SELECTORS.expand);

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.dataset.index);
        setActiveSlide(dots, slides, index);
      });
    });

    if (expandBtn) {
      expandBtn.addEventListener("click", () => {
        const activeSlide = section.querySelector(`${SELECTORS.slide}.active img`);
        if (activeSlide) {
          // TODO: Implement lightbox/modal for image expansion
          console.log("[Gallery] Expand image:", activeSlide.src);
        }
      });
    }
  }

  function setActiveSlide(dots, slides, index) {
    dots.forEach((d) => d.classList.remove(CLASSES.active));
    slides.forEach((s) => s.classList.remove(CLASSES.active));
    dots[index]?.classList.add(CLASSES.active);
    slides[index]?.classList.add(CLASSES.active);
  }

  // ========================================
  // SIZE TOGGLE (Accordion Style)
  // ========================================
  function setupSizeToggle(section) {
    const trigger = section.querySelector(SELECTORS.toggleTrigger);
    const buttonsWrapper = section.querySelector(SELECTORS.buttonsWrapper);
    const sizeButtons = section.querySelectorAll(SELECTORS.sizeButton);
    const toggleValue = section.querySelector(SELECTORS.toggleValue);

    if (!trigger || !buttonsWrapper) return;

    // Toggle buttons visibility on trigger click
    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        // Collapse
        trigger.setAttribute("aria-expanded", "false");
        buttonsWrapper.classList.add(CLASSES.collapsed);
      } else {
        // Expand
        trigger.setAttribute("aria-expanded", "true");
        buttonsWrapper.classList.remove(CLASSES.collapsed);
      }
    });

    // Size button click
    sizeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.disabled) return;
        selectVariant(section, button.dataset.variantId, button.textContent.trim());
      });
    });
  }

  function selectVariant(section, variantId, variantTitle) {
    const sizeButtons = section.querySelectorAll(SELECTORS.sizeButton);
    const toggleValue = section.querySelector(SELECTORS.toggleValue);

    // Update size buttons active state
    sizeButtons.forEach((btn) => {
      btn.classList.toggle(CLASSES.active, btn.dataset.variantId === variantId);
    });

    // Update toggle display value
    if (toggleValue) {
      toggleValue.textContent = variantTitle;
    }

    // Update pricing
    const selectedButton = section.querySelector(`${SELECTORS.sizeButton}.${CLASSES.active}`);
    if (selectedButton) {
      updatePrice(section, selectedButton.dataset.variantPrice);
    }
  }

  // ========================================
  // QUANTITY
  // ========================================
  function setupQuantity(section) {
    const buttons = section.querySelectorAll(SELECTORS.quantityBtn);
    const input = section.querySelector(SELECTORS.quantityInput);

    if (!input) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        let value = parseInt(input.value) || 1;

        if (action === "minus" && value > 1) {
          input.value = value - 1;
        } else if (action === "plus") {
          input.value = value + 1;
        }

        // Trigger price update
        updatePrice(section);
      });
    });

    // Handle manual input
    input.addEventListener("change", () => {
      let value = parseInt(input.value) || 1;
      if (value < 1) value = 1;
      input.value = value;
      updatePrice(section);
    });
  }

  // ========================================
  // PRICING
  // ========================================
  function setupPricing(section) {
    // Initial price calculation
    updatePrice(section);
  }

  function updatePrice(section, variantPrice) {
    const cartPriceEl = section.querySelector(SELECTORS.cartPrice);
    const quantityInput = section.querySelector(SELECTORS.quantityInput);

    if (!cartPriceEl) return;

    // Get variant price (in cents) - either passed or from selected variant
    let priceInCents = variantPrice;

    if (!priceInCents) {
      const selectedButton = section.querySelector(`${SELECTORS.sizeButton}.${CLASSES.active}`);
      priceInCents = selectedButton?.dataset.variantPrice;
    }

    if (!priceInCents) return;

    // Get quantity
    const quantity = parseInt(quantityInput?.value) || 1;

    // Calculate total price (price is in cents, multiply by quantity)
    const totalPriceInCents = parseInt(priceInCents) * quantity;

    // Format price
    const formattedPrice = formatMoney(totalPriceInCents);

    // Update display
    cartPriceEl.textContent = formattedPrice;
  }

  function formatMoney(cents) {
    // Shopify money format - adjust based on your store's currency format
    const amount = (cents / 100).toFixed(2);
    return `₹${amount}`;
  }

  // ========================================
  // MODALS
  // ========================================
  function setupModals() {
    const triggers = document.querySelectorAll(SELECTORS.modalTrigger);

    // Open modal on trigger click
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const modalId = trigger.dataset.modal;
        const modal = document.getElementById(`modal-${modalId}`);
        if (modal) {
          openModal(modal);
        }
      });
    });

    // Close modal on close button or overlay click
    document.addEventListener("click", (e) => {
      const closeBtn = e.target.closest(SELECTORS.modalClose);
      if (closeBtn) {
        const modal = closeBtn.closest(SELECTORS.modal);
        if (modal) {
          closeModal(modal);
        }
      }
    });

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const openModalEl = document.querySelector(`${SELECTORS.modal}:not([hidden])`);
        if (openModalEl) {
          closeModal(openModalEl);
        }
      }
    });
  }

  function openModal(modal) {
    modal.hidden = false;
    document.body.style.overflow = "hidden";

    // Focus trap setup
    const firstFocusable = modal.querySelector(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }
  }

  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  // ========================================
  // PANELS (Description/Shipping)
  // ========================================
  function setupPanels() {
    const triggers = document.querySelectorAll(SELECTORS.panelTrigger);

    // Open panel on footer link click
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const panelId = trigger.dataset.panelTrigger;
        showPanel(panelId);
      });
    });

    // Close panel on X button click
    document.addEventListener("click", (e) => {
      const closeBtn = e.target.closest(SELECTORS.panelClose);
      if (closeBtn) {
        const panel = closeBtn.closest(SELECTORS.panel);
        if (panel) {
          hidePanel(panel);
        }
      }
    });
  }

  function showPanel(panelId) {
    const section = document.querySelector(SELECTORS.section);
    if (!section) return;

    // Hide all panels first (close any open panel)
    const allPanels = section.querySelectorAll(SELECTORS.panel);
    allPanels.forEach((panel) => panel.classList.remove("active"));

    // Show requested panel with slight delay for animation
    const targetPanel = section.querySelector(`[data-panel="${panelId}"]`);
    if (targetPanel) {
      // Small delay to allow the previous panel to start closing
      setTimeout(() => {
        targetPanel.classList.add("active");
      }, 50);
    }
  }

  function hidePanel(panel) {
    // Remove active class to trigger slide-up animation
    panel.classList.remove("active");
  }

  // ========================================
  // INITIALIZATION
  // ========================================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
