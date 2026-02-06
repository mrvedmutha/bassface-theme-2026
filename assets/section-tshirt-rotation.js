/**
 * ==========================================
 * T-SHIRT ROTATION SECTION (v2.0 - Optimized)
 * ==========================================
 *
 * Simplified scroll-based animation:
 * - 0-100%: T-shirt rotates through all frames
 * - 98-100%: T-shirt settles to bottom (40% visible)
 * - 100%: CTA content reveals
 * - +5vh: Extra scroll buffer for reading
 *
 * Performance Optimizations:
 * - Progressive image loading (critical frames first)
 * - requestAnimationFrame for smooth canvas updates
 * - No heavy blur filters
 * - Simple DOM structure
 */

(function () {
  "use strict";

  // Wait for GSAP to be available
  function initWhenReady() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      setTimeout(initWhenReady, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    initAllSections();
  }

  function initAllSections() {
    const sections = document.querySelectorAll(".tshirt-rotation");
    sections.forEach((section) => {
      const sectionId = section.dataset.sectionId;
      const data = window.tshirtRotationData?.[sectionId];

      if (!data || !data.imageUrls) {
        console.error(
          "T-Shirt rotation data not found for section:",
          sectionId,
        );
        return;
      }

      new TShirtRotationController(section, data);
    });
  }

  class TShirtRotationController {
    constructor(section, data) {
      this.section = section;
      this.imageUrls = data.imageUrls;
      this.totalFrames = data.totalFrames;

      // DOM Elements
      this.canvas = section.querySelector("[data-canvas]");
      this.ctx = this.canvas.getContext("2d");
      this.pinnedContainer = section.querySelector("[data-pinned-container]");
      this.cta = section.querySelector("[data-cta]");
      this.spacer = section.querySelector("[data-spacer]");

      // State
      this.images = [];
      this.loadedCount = 0;
      this.currentFrame = 0;
      this.isInitialized = false;

      // Calculate scroll height: frames + settle space (20vh) + buffer (10vh)
      this.scrollHeight = this.totalFrames + 30; // in vh units

      this.init();
    }

    async init() {
      // Set spacer height
      this.spacer.style.height = `${this.scrollHeight}vh`;

      // Load critical frames first (first 20)
      await this.loadCriticalFrames();

      // Draw first frame
      this.drawFrame(0);

      // Setup scroll animation
      this.setupScrollTrigger();

      // Load remaining frames in background
      this.loadRemainingFrames();

      this.isInitialized = true;
    }

    async loadCriticalFrames() {
      const criticalCount = Math.min(20, this.totalFrames);
      const promises = [];

      for (let i = 0; i < criticalCount; i++) {
        promises.push(this.loadImage(i));
      }

      await Promise.all(promises);
    }

    async loadRemainingFrames() {
      const criticalCount = Math.min(20, this.totalFrames);

      for (let i = criticalCount; i < this.totalFrames; i++) {
        await this.loadImage(i);

        // Yield to main thread every 10 frames
        if (i % 10 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
      }
    }

    loadImage(index) {
      return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          this.images[index] = img;
          this.loadedCount++;
          resolve();
        };

        img.onerror = () => {
          // Continue even if image fails
          resolve();
        };

        img.src = this.imageUrls[index];
      });
    }

    drawFrame(frameIndex) {
      const frame = Math.floor(
        Math.max(0, Math.min(frameIndex, this.totalFrames - 1)),
      );

      if (!this.images[frame]) return;

      this.currentFrame = frame;

      // Clear and draw
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(
        this.images[frame],
        0,
        0,
        this.canvas.width,
        this.canvas.height,
      );
    }

    /**
     * Detect browser environment once
     * Returns { isSafari, isChrome, isMobile }
     */
    detectEnvironment() {
      const ua = navigator.userAgent;
      const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
      const isChrome = /Chrome/.test(ua) && /Google Inc/.test(navigator.vendor);
      const isMobile = window.innerWidth <= 700;
      return { isSafari, isChrome, isMobile };
    }

    /**
     * Get responsive animation config based on viewport width.
     * Desktop keeps original values; mobile uses gentler settle.
     */
    getAnimConfig() {
      const w = window.innerWidth;
      if (w <= 700) {
        return {
          rotationEnd: 0.85,
          settleEnd: 0.95,
          settlePercent: 30, // less aggressive on mobile
        };
      }
      // Desktop / tablet — original behaviour
      return {
        rotationEnd: 0.83,
        settleEnd: 0.94,
        settlePercent: 40,
      };
    }

    /**
     * Move the canvas vertically WITHOUT touching the CSS transform.
     * We animate `top` from 50% (centred) to 50% + offset.
     * The CSS `transform: translate(-50%,-50%)` stays untouched,
     * so horizontal centering is never broken on any browser.
     */
    setCanvasOffset(percent) {
      // percent 0 = centred (top:50%), percent 40 = top:70%
      this.canvas.style.top = `${50 + percent}%`;
    }

    setupScrollTrigger() {
      const self = this;
      const env = this.detectEnvironment();

      // Main scroll animation
      ScrollTrigger.create({
        trigger: this.pinnedContainer,
        start: "top top",
        end: () => `+=${this.spacer.offsetHeight}`,
        pin: this.pinnedContainer,
        pinSpacing: false,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (st) => {
          const progress = st.progress;
          const cfg = self.getAnimConfig();

          // Phase 1 — Rotate through all frames
          if (progress < cfg.rotationEnd) {
            const frameProgress = progress / cfg.rotationEnd;
            const targetFrame = Math.floor(
              frameProgress * (self.totalFrames - 1),
            );
            self.drawFrame(targetFrame);

            // Keep canvas centred
            self.setCanvasOffset(0);

            // Hide CTA
            self.cta.classList.remove("is-visible");
          }
          // Phase 2 — Settle T-shirt downward
          else if (progress < cfg.settleEnd) {
            self.drawFrame(self.totalFrames - 1);

            const settleProgress =
              (progress - cfg.rotationEnd) / (cfg.settleEnd - cfg.rotationEnd);
            const offset = settleProgress * cfg.settlePercent;
            self.setCanvasOffset(offset);

            self.cta.classList.remove("is-visible");
          }
          // Phase 3 — CTA reveal, T-shirt at rest
          else {
            self.drawFrame(self.totalFrames - 1);
            self.setCanvasOffset(cfg.settlePercent);

            self.cta.classList.add("is-visible");
          }
        },
      });

      // Refresh on resize / orientation change
      let resizeTimer;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 300);
      };
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onResize);
    }
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
      const section = event.target.querySelector(".tshirt-rotation");
      if (section) {
        const sectionId = section.dataset.sectionId;
        const data = window.tshirtRotationData?.[sectionId];
        if (data) {
          new TShirtRotationController(section, data);
        }
        ScrollTrigger.refresh();
      }
    });
  }
})();
