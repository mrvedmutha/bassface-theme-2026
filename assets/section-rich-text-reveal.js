/**
 * ==========================================
 * RICH TEXT REVEAL SECTION - ANIMATIONS
 * ==========================================
 *
 * Scroll-triggered text reveal animations:
 * 1. Heading: Random character blur reveal
 * 2. Body: Typing effect with cursor
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
   * Random Blur Reveal Animation for Heading
   * Characters reveal in random order with blur-to-clear effect
   */
  class BlurRevealAnimation {
    constructor(element, options = {}) {
      this.element = element;
      this.text = element.textContent.trim();
      this.chars = [];
      this.options = {
        stagger: options.stagger || 0.015,
        triggerStart: options.triggerStart || "top 80%",
        reset: options.reset !== undefined ? options.reset : true,
        onComplete: options.onComplete || null,
      };
      this.timeline = null;
      this.scrollTrigger = null;

      this.init();
    }

    init() {
      // Clear original text
      this.element.innerHTML = "";

      // Split text into words and characters
      const words = this.text.split(" ");

      words.forEach((word, wordIndex) => {
        const wordWrapper = document.createElement("span");
        wordWrapper.className = "word-wrapper";

        // Split word into characters
        word.split("").forEach((char) => {
          const charWrapper = document.createElement("span");
          charWrapper.className = "char-wrapper";

          const charInner = document.createElement("span");
          charInner.className = "char-inner";
          charInner.textContent = char;

          charWrapper.appendChild(charInner);
          wordWrapper.appendChild(charWrapper);

          this.chars.push(charInner);
        });

        this.element.appendChild(wordWrapper);

        // Add space after word (except last)
        if (wordIndex < words.length - 1) {
          const space = document.createElement("span");
          space.className = "space";
          space.innerHTML = "&nbsp;";
          this.element.appendChild(space);
        }
      });

      this.createAnimation();
    }

    createAnimation() {
      // Create randomized indices using Fisher-Yates shuffle
      const totalChars = this.chars.length;
      const indices = Array.from({ length: totalChars }, (_, i) => i);

      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      // Create GSAP timeline
      this.timeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (this.options.onComplete) {
            this.options.onComplete();
          }
        },
      });

      // Animate characters in random order
      indices.forEach((charIndex, index) => {
        this.timeline.call(
          () => {
            this.chars[charIndex].classList.add("revealed");
          },
          [],
          index * this.options.stagger,
        );
      });

      // Create ScrollTrigger - plays only once
      this.scrollTrigger = ScrollTrigger.create({
        trigger: this.element,
        start: this.options.triggerStart,
        once: true,
        onEnter: () => this.timeline.play(),
      });
    }

    resetAnimation() {
      this.chars.forEach((char) => char.classList.remove("revealed"));
    }

    destroy() {
      if (this.scrollTrigger) {
        this.scrollTrigger.kill();
      }
      if (this.timeline) {
        this.timeline.kill();
      }
    }
  }

  /**
   * Typing Animation for Body Text
   * Characters appear sequentially with cursor following each character
   */
  class TypingAnimation {
    constructor(element, options = {}) {
      this.element = element;
      this.text = element.textContent.trim();
      this.charElements = [];
      this.cursor = null;
      this.options = {
        speed: options.speed || 0.02,
        reset: options.reset !== undefined ? options.reset : true,
      };
      this.timeline = null;
      this.isPlaying = false;

      this.init();
    }

    init() {
      // Clear original text
      this.element.innerHTML = "";

      // Create cursor element
      this.cursor = document.createElement("span");
      this.cursor.className = "rich-text-reveal__cursor";
      this.cursor.setAttribute("aria-hidden", "true");

      // Split text into words (keep words together)
      const words = this.text.split(" ");

      words.forEach((word, wordIndex) => {
        // Create word wrapper to keep word together
        const wordWrapper = document.createElement("span");
        wordWrapper.className = "word-wrapper";
        wordWrapper.style.display = "inline-block";
        wordWrapper.style.whiteSpace = "nowrap";

        // Split word into characters
        word.split("").forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.className = "char-inner";
          charSpan.textContent = char;
          wordWrapper.appendChild(charSpan);
          this.charElements.push({ el: charSpan, parent: wordWrapper });
        });

        this.element.appendChild(wordWrapper);

        // Add space after word (except last)
        if (wordIndex < words.length - 1) {
          const space = document.createElement("span");
          space.className = "space-char";
          space.innerHTML = "&nbsp;";
          this.element.appendChild(space);
          this.charElements.push({
            el: space,
            parent: this.element,
            isSpace: true,
          });
        }
      });

      this.createAnimation();
    }

    createAnimation() {
      this.timeline = gsap.timeline({
        paused: true,
        onStart: () => {
          this.isPlaying = true;
          this.cursor.classList.add("active");
          this.cursor.classList.remove("hidden");
          // Insert cursor at the beginning
          if (this.charElements.length > 0) {
            const firstChar = this.charElements[0];
            firstChar.parent.insertBefore(this.cursor, firstChar.el);
          }
        },
        onComplete: () => {
          this.isPlaying = false;
          // Hide and remove cursor after typing completes
          this.cursor.classList.add("hidden");
          this.cursor.classList.remove("active");
          if (this.cursor.parentNode) {
            this.cursor.parentNode.removeChild(this.cursor);
          }
        },
      });

      // Animate characters sequentially with cursor following
      this.charElements.forEach((charObj, index) => {
        this.timeline.call(
          () => {
            // Reveal the character
            charObj.el.classList.add("revealed");
            // Move cursor after this character
            if (index < this.charElements.length - 1) {
              const nextChar = this.charElements[index + 1];
              nextChar.parent.insertBefore(this.cursor, nextChar.el);
            } else {
              // Last character - put cursor at the end
              charObj.parent.appendChild(this.cursor);
            }
          },
          [],
          index * this.options.speed,
        );
      });
    }

    play() {
      if (!this.isPlaying) {
        this.timeline.restart();
      }
    }

    resetAnimation() {
      this.charElements.forEach((charObj) =>
        charObj.el.classList.remove("revealed"),
      );
      this.cursor.classList.remove("active");
      this.cursor.classList.add("hidden");
      if (this.cursor.parentNode) {
        this.cursor.parentNode.removeChild(this.cursor);
      }
    }

    destroy() {
      if (this.timeline) {
        this.timeline.kill();
      }
      if (this.cursor && this.cursor.parentNode) {
        this.cursor.parentNode.removeChild(this.cursor);
      }
    }
  }

  /**
   * Initialize Rich Text Reveal Section
   */
  function initRichTextReveal(section) {
    const heading = section.querySelector(".rich-text-reveal__heading");
    const body = section.querySelector(".rich-text-reveal__body");
    const cursor = section.querySelector(".rich-text-reveal__cursor");
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

    let blurReveal = null;
    let typingAnimation = null;

    // Initialize heading blur reveal - plays only once
    if (heading) {
      blurReveal = new BlurRevealAnimation(heading, {
        stagger: 0.015,
        triggerStart: "top 75%",
        onComplete: () => {
          // Start body typing animation after heading completes
          if (typingAnimation) {
            typingAnimation.play();
          }
        },
      });
    }

    // Initialize body typing animation - plays only once
    if (body) {
      typingAnimation = new TypingAnimation(body, {
        speed: 0.015,
      });
    }

    // Store instances for cleanup
    section._richTextReveal = {
      blurReveal,
      typingAnimation,
    };
  }

  /**
   * Destroy Rich Text Reveal Section
   */
  function destroyRichTextReveal(section) {
    if (section._richTextReveal) {
      if (section._richTextReveal.blurReveal) {
        section._richTextReveal.blurReveal.destroy();
      }
      if (section._richTextReveal.typingAnimation) {
        section._richTextReveal.typingAnimation.destroy();
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

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllSections);
  } else {
    initAllSections();
  }

  // Shopify Theme Editor support
  if (typeof Shopify !== "undefined" && Shopify.designMode) {
    document.addEventListener("shopify:section:load", (event) => {
      const section = event.target.querySelector(".rich-text-reveal");
      if (section) {
        initRichTextReveal(section);
        ScrollTrigger.refresh();
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
