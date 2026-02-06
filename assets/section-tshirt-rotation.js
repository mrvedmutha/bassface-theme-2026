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

    setupScrollTrigger() {
      const self = this;

      // Main scroll animation
      ScrollTrigger.create({
        trigger: this.pinnedContainer,
        start: "top top",
        end: () => `+=${this.spacer.offsetHeight}`,
        pin: this.pinnedContainer,
        pinSpacing: false,
        scrub: 0.5, // Smooth scrub
        onUpdate: (scrollTrigger) => {
          const progress = scrollTrigger.progress;

          // 0-83%: Rotate through all frames
          if (progress < 0.83) {
            // Map 0-0.83 progress to 0-100% of frames
            const frameProgress = progress / 0.83;
            const targetFrame = Math.floor(
              frameProgress * (self.totalFrames - 1),
            );
            self.drawFrame(targetFrame);

            // Reset canvas position during rotation
            gsap.set(self.canvas, { y: 0 });

            // Hide CTA
            self.cta.classList.remove("is-visible");
          }
          // 83-94%: Settle T-shirt smoothly (11% of scroll = ~20vh)
          else if (progress < 0.94) {
            // Keep last frame
            self.drawFrame(self.totalFrames - 1);

            // Settle animation: 83-94% = 0% to 40% down
            const settleProgress = (progress - 0.83) / 0.11; // 0 to 1
            const yOffset = settleProgress * 40; // 0% to 40%
            gsap.set(self.canvas, { y: `${yOffset}%` });

            // Hide CTA during settle
            self.cta.classList.remove("is-visible");
          }
          // 94-100%: CTA reveal + buffer (T-shirt stays at rest)
          else {
            // Keep last frame at rest position
            self.drawFrame(self.totalFrames - 1);
            gsap.set(self.canvas, { y: "40%" });

            // Reveal CTA
            self.cta.classList.add("is-visible");
          }
        },
      });
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
