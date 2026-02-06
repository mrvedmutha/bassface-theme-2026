/**
 * ==========================================
 * RICH TEXT REVEAL SECTION - ANIMATIONS (v2.0 - Optimized)
 * ==========================================
 *
 * Scroll-triggered text reveal animations:
 * 1. Heading: Variable blur reveal (some chars more blur, some less)
 * 2. Body: Line-by-line blur fade reveal
 *
 * Performance Optimizations:
 * - Lower blur values (2-6px)
 * - Opacity + transform for GPU acceleration
 * - Line-level animation instead of character-level for body
 * - Efficient ScrollTrigger usage
 *
 * Dependencies: GSAP, ScrollTrigger
 */

(function () {
  "use strict";

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /**
   * Variable Blur Reveal Animation for Heading
   * Characters reveal with varying blur levels for organic feel
   */
  class HeadingBlurReveal {
    constructor(element, options = {}) {
      this.element = element;
      this.text = element.textContent.trim();
      this.chars = [];
      this.options = {
        staggerMin: options.staggerMin || 0.008,
        staggerMax: options.staggerMax || 0.018,
        triggerStart: options.triggerStart || "top 80%",
        onComplete: options.onComplete || null,
      };
      this.scrollTrigger = null;

      this.init();
    }

    init() {
      // Clear original text
      this.element.innerHTML = "";

      // Split text into words and characters
      const words = this.text.split(" ");
      const blurLevels = ["light", "medium", "heavy"];

      words.forEach((word, wordIndex) => {
        const wordWrapper = document.createElement("span");
        wordWrapper.className = "word-wrapper";

        // Split word into characters
        word.split("").forEach((char) => {
          const charWrapper = document.createElement("span");
          charWrapper.className = "char-wrapper";
          charWrapper.textContent = char;

          // Assign random blur level for organic feel
          const randomBlur =
            blurLevels[Math.floor(Math.random() * blurLevels.length)];
          charWrapper.setAttribute("data-blur", randomBlur);

          wordWrapper.appendChild(charWrapper);
          this.chars.push(charWrapper);
        });

        this.element.appendChild(wordWrapper);

        // Add space after word (except last)
        if (wordIndex < words.length - 1) {
          const space = document.createTextNode(" ");
          this.element.appendChild(space);
        }
      });

      this.createAnimation();
    }

    createAnimation() {
      // Create randomized reveal order using Fisher-Yates shuffle
      const totalChars = this.chars.length;
      const indices = Array.from({ length: totalChars }, (_, i) => i);

      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      // Create ScrollTrigger - plays only once
      this.scrollTrigger = ScrollTrigger.create({
        trigger: this.element,
        start: this.options.triggerStart,
        once: true,
        onEnter: () => this.revealChars(indices),
      });
    }

    revealChars(indices) {
      // Reveal characters in random order with variable stagger
      indices.forEach((charIndex, index) => {
        const delay =
          index *
          (this.options.staggerMin +
            Math.random() *
              (this.options.staggerMax - this.options.staggerMin));

        setTimeout(() => {
          this.chars[charIndex].classList.add("revealed");

          // Call onComplete when last char is revealed
          if (index === indices.length - 1 && this.options.onComplete) {
            setTimeout(() => {
              this.options.onComplete();
            }, 150); // Short delay before body starts
          }
        }, delay * 1000);
      });
    }

    destroy() {
      if (this.scrollTrigger) {
        this.scrollTrigger.kill();
      }
    }
  }

  /**
   * Line-by-Line Blur Fade Animation for Body
   * Lines reveal sequentially with blur fade effect
   * Note: This class waits for heading animation to complete before revealing
   */
  class BodyLineReveal {
    constructor(container, options = {}) {
      this.container = container;
      this.lines = container.querySelectorAll(".rich-text-reveal__line");
      this.options = {
        stagger: options.stagger || 0.12, // 120ms between lines - fast
      };
      this.isReady = false;

      this.init();
    }

    init() {
      if (this.lines.length === 0) return;
      this.isReady = true;
    }

    revealLines() {
      if (!this.isReady) return;

      this.lines.forEach((line, index) => {
        setTimeout(
          () => {
            line.classList.add("revealed");
          },
          index * this.options.stagger * 1000,
        );
      });
    }

    // Public method to trigger animation (called by heading's onComplete)
    play() {
      this.revealLines();
    }

    destroy() {
      // Nothing to destroy - no ScrollTrigger for body
    }
  }

  /**
   * Initialize Rich Text Reveal Section
   */
  function initRichTextReveal(section) {
    const heading = section.querySelector("[data-heading]");
    const body = section.querySelector("[data-body]");
    const animationEnabled = section.dataset.animationEnabled === "true";

    // Skip if animation disabled or reduced motion preferred
    if (!animationEnabled || prefersReducedMotion) {
      section.classList.add("rich-text-reveal--no-animation");
      return;
    }

    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("Rich Text Reveal: GSAP or ScrollTrigger not loaded");
      section.classList.add("rich-text-reveal--no-animation");
      return;
    }

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    let headingAnimation = null;
    let bodyAnimation = null;

    // Initialize heading blur reveal - FAST timing
    if (heading) {
      headingAnimation = new HeadingBlurReveal(heading, {
        staggerMin: 0.006,
        staggerMax: 0.015,
        triggerStart: "top 75%",
        onComplete: () => {
          // Start body animation after heading completes
          if (bodyAnimation) {
            bodyAnimation.play();
          }
        },
      });
    }

    // Initialize body line reveal (waits for heading to complete)
    if (body) {
      bodyAnimation = new BodyLineReveal(body, {
        stagger: 0.12, // 120ms between lines - fast
      });

      // If no heading exists, trigger body immediately on scroll
      if (!heading) {
        // Animation will trigger via ScrollTrigger
      }
    }

    // Store instances for cleanup
    section._richTextReveal = {
      headingAnimation,
      bodyAnimation,
    };
  }

  /**
   * Destroy Rich Text Reveal Section
   */
  function destroyRichTextReveal(section) {
    if (section._richTextReveal) {
      if (section._richTextReveal.headingAnimation) {
        section._richTextReveal.headingAnimation.destroy();
      }
      if (section._richTextReveal.bodyAnimation) {
        section._richTextReveal.bodyAnimation.destroy();
      }
      delete section._richTextReveal;
    }
  }

  /**
   * Initialize all sections on page
   */
  function initAllSections() {
    const sections = document.querySelectorAll(".rich-text-reveal");
    sections.forEach(initRichTextReveal);
  }

  // Wait for GSAP to be available
  function initWhenReady() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      setTimeout(initWhenReady, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    initAllSections();
  }

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWhenReady);
  } else {
    initWhenReady();
  }

  // Shopify Theme Editor support
  if (typeof Shopify !== "undefined" && Shopify.designMode) {
    document.addEventListener("shopify:section:load", (event) => {
      const section = event.target.querySelector(".rich-text-reveal");
      if (section) {
        initRichTextReveal(section);
        if (typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.refresh();
        }
      }
    });

    document.addEventListener("shopify:section:unload", (event) => {
      const section = event.target.querySelector(".rich-text-reveal");
      if (section) {
        destroyRichTextReveal(section);
      }
    });
  }
})();
