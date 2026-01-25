/**
 * T-Shirt Rotation Section
 * - Progressive image loading
 * - Canvas-based frame rendering
 * - GSAP ScrollTrigger animations
 * - Artist name animations
 * - CTA and button interactions
 */

(function () {
  "use strict";

  // Wait for GSAP to be available
  function initWhenReady() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("GSAP or ScrollTrigger not loaded. Retrying...");
      setTimeout(initWhenReady, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    initTShirtRotation();
  }

  function initTShirtRotation() {
    const sections = document.querySelectorAll(".tshirt-rotation");

    sections.forEach((section) => {
      const sectionId = section.dataset.sectionId;
      const data = window.tshirtRotationData?.[sectionId];

      if (!data || !data.imageUrls) {
        console.error("T-Shirt rotation data not found");
        return;
      }

      new TShirtRotationController(section, data.imageUrls);
    });
  }

  class TShirtRotationController {
    constructor(section, imageUrls) {
      this.section = section;
      this.imageUrls = imageUrls;
      this.totalFrames = imageUrls.length;

      // DOM elements
      this.canvas = section.querySelector("[data-canvas]");
      this.ctx = this.canvas.getContext("2d");
      this.pinnedContainer = section.querySelector("[data-pinned-container]");
      this.artistNames = section.querySelectorAll("[data-artist]");
      this.cta = section.querySelector("[data-cta]");
      this.ctaHeading = section.querySelector(".tshirt-rotation__cta-heading");
      this.ctaParagraph = section.querySelector(
        ".tshirt-rotation__cta-paragraph",
      );
      this.ctaButton = section.querySelector("[data-cta-button]");
      this.spacer = section.querySelector("[data-spacer]");

      // State
      this.images = [];
      this.loadedImages = 0;
      this.currentFrame = 0;
      this.isLoading = true;
      this.criticalFramesLoaded = false;
      this.lastLoggedProgress = -1; // Track last logged progress percentage

      // Initialize
      this.init();
    }

    async init() {
      // Start loading critical frames first (first 30 frames)
      await this.loadCriticalFrames();

      // Setup animations once critical frames are loaded
      this.setupScrollTrigger();
      this.setupButtonRipple();

      // Load remaining frames in background
      this.loadRemainingFrames();
    }

    /**
     * Load first 30 frames for immediate playback
     */
    async loadCriticalFrames() {
      const criticalCount = Math.min(30, this.totalFrames);
      const promises = [];

      for (let i = 0; i < criticalCount; i++) {
        promises.push(this.loadImage(i));
      }

      await Promise.all(promises);
      this.criticalFramesLoaded = true;

      // Draw first frame
      this.drawFrame(0);
    }

    /**
     * Load remaining frames in background
     */
    async loadRemainingFrames() {
      const criticalCount = Math.min(30, this.totalFrames);

      for (let i = criticalCount; i < this.totalFrames; i++) {
        await this.loadImage(i);

        // Every 10 images loaded, allow other tasks to run
        if (i % 10 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
      }

      this.isLoading = false;
    }

    /**
     * Load a single image
     */
    loadImage(index) {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          this.images[index] = img;
          this.loadedImages++;
          resolve();
        };

        img.onerror = () => {
          // Resolve anyway to not block other images
          resolve();
        };

        img.src = this.imageUrls[index];
      });
    }

    /**
     * Draw specific frame to canvas
     */
    drawFrame(frameIndex) {
      const frame = Math.floor(frameIndex);

      // Only draw if frame is loaded
      if (!this.images[frame]) {
        return;
      }

      this.currentFrame = frame;

      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw image centered
      this.ctx.drawImage(
        this.images[frame],
        0,
        0,
        this.canvas.width,
        this.canvas.height,
      );
    }

    /**
     * Setup GSAP ScrollTrigger animations
     */
    setupScrollTrigger() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.pinnedContainer,
          start: "top top",
          end: () => `+=${this.spacer.offsetHeight}`,
          scrub: 1,
          pin: this.pinnedContainer,
          pinSpacing: false,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update frame based on scroll progress
            const progress = self.progress;
            const progressPercent = Math.round(progress * 100);

            // Log progress in 10% increments
            if (
              progressPercent % 10 === 0 &&
              progressPercent !== this.lastLoggedProgress
            ) {
              console.log(`Animation Progress: ${progressPercent}% completed`);
              this.lastLoggedProgress = progressPercent;
            }

            // Rotation continues from 0-70% (not frozen at 65%)
            // 70-100% = final state (T-shirt resting + CTA reveals + breathing)
            if (progress < 0.7) {
              const rotationProgress = progress / 0.7;
              const targetFrame = Math.floor(
                rotationProgress * (this.totalFrames - 1),
              );
              this.drawFrame(targetFrame);
            } else {
              // Keep last frame during final state
              this.drawFrame(this.totalFrames - 1);
            }
          },
        },
      });

      // T-shirt movement to final position
      // During scroll 60-70%, move T-shirt down to rest at 70vh (40% position)
      // This happens WHILE rotation continues (no frozen state)
      tl.to(
        this.canvas,
        {
          y: "40%", // Move down to 40% position (70vh on desktop)
          scale: 1, // Keep original size (no shrinking)
          duration: 0.1, // 10% of timeline = 60% to 70%
          ease: "power2.out",
        },
        0.6, // Start at 60%, end at 70%
      );

      // Artist names animation
      this.setupArtistNamesAnimation();

      // CTA animation (appears at 85% scroll)
      this.setupCTAAnimation();

      // T-shirt breathing animation (during final breathing space 91-100%)
      this.setupTShirtBreathingAnimation();
    }

    /**
     * Setup artist names scroll animation (Vertical Parallax)
     */
    setupArtistNamesAnimation() {
      this.artistNames.forEach((name, index) => {
        const isBehind = name.classList.contains(
          "tshirt-rotation__artist-name--back",
        );

        // Calculate vertical start positions based on index
        const startY = -200; // Start above viewport
        const endY = window.innerHeight + 200; // End below viewport

        // Artist reveals during rotation phase
        // Console logs show ~25% delay between set value and actual appearance
        // To appear at 10%, 25%, 40% actual scroll, set at -15%, 0%, 15%
        // Since negative won't work, shifting: appear at 15%, 30%, 45% actual
        const appearStart = -0.1 + index * 0.15; // Start at -10%, 5%, 20%
        const appearEnd = appearStart + 0.15; // Each lasts 15% of scroll

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: this.pinnedContainer,
            start: "top top",
            end: () => `+=${this.spacer.offsetHeight}`,
            scrub: 1,
          },
        });

        // Set initial position
        gsap.set(name, {
          y: startY,
          opacity: 0,
        });

        // Fade in
        tl.to(
          name,
          {
            opacity: 1,
            duration: 0.05,
            ease: "none",
            onStart: () => {
              const artistName = name.textContent.trim();
              console.log(
                `🎨 ${artistName} appearing at ${Math.round(appearStart * 100)}%`,
              );
            },
          },
          appearStart,
        );

        // Move through viewport with parallax
        tl.to(
          name,
          {
            y: endY,
            duration: appearEnd - appearStart,
            ease: "none",
          },
          appearStart,
        );

        // Fade out
        tl.to(
          name,
          {
            opacity: 0,
            duration: 0.05,
            ease: "none",
            onStart: () => {
              const artistName = name.textContent.trim();
              console.log(
                `👋 ${artistName} disappearing at ${Math.round((appearEnd - 0.05) * 100)}%`,
              );
            },
          },
          appearEnd - 0.05,
        );
      });
    }

    /**
     * Setup T-shirt breathing animation during final breathing space
     * Subtle elevation movement (88-100% scroll progress = 1232vh to 1400vh)
     */
    setupTShirtBreathingAnimation() {
      const breathingTl = gsap.timeline({
        scrollTrigger: {
          trigger: this.pinnedContainer,
          start: "top top",
          end: () => `+=${this.spacer.offsetHeight}`,
          scrub: 1,
        },
      });

      // From 88-100% (168vh of scrolling), add subtle breathing elevation
      // Very subtle movement - stays at bottom, doesn't escape viewport
      breathingTl
        .to(
          this.canvas,
          {
            y: "39%", // Elevate up slightly (40% to 39%)
            duration: 0.04,
            ease: "sine.inOut",
          },
          0.88,
        )
        .to(
          this.canvas,
          {
            y: "41%", // Drop down slightly (39% to 41%)
            duration: 0.04,
            ease: "sine.inOut",
          },
          0.92,
        )
        .to(
          this.canvas,
          {
            y: "39.5%", // Elevate up again (41% to 39.5%)
            duration: 0.04,
            ease: "sine.inOut",
          },
          0.96,
        )
        .to(
          this.canvas,
          {
            y: "40%", // Return to rest position (39.5% to 40%)
            duration: 0.03,
            ease: "sine.inOut",
          },
          0.98,
        );
    }

    /**
     * Setup CTA sequential reveal animation
     * Heading → Paragraph → Button (after T-shirt rests)
     */
    setupCTAAnimation() {
      // Set initial states (hidden, positioned above)
      gsap.set([this.ctaHeading, this.ctaParagraph, this.ctaButton], {
        opacity: 0,
        y: -50, // Start from above (top to bottom fade)
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.pinnedContainer,
          start: "top top",
          end: () => `+=${this.spacer.offsetHeight}`,
          scrub: 1,
          onUpdate: (self) => {
            // Enable pointer events when button is visible
            if (self.progress > 0.82) {
              this.cta.classList.add("is-active");
            } else {
              this.cta.classList.remove("is-active");
            }
          },
        },
      });

      // 1. Heading reveals first (70-76% of scroll) - 84vh of scrolling
      tl.fromTo(
        this.ctaHeading,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" },
        0.7,
      );

      // 2. Paragraph reveals second (76-82% of scroll) - 84vh of scrolling
      tl.fromTo(
        this.ctaParagraph,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" },
        0.76,
      );

      // 3. Button reveals last (82-88% of scroll) - 84vh of scrolling
      tl.fromTo(
        this.ctaButton,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" },
        0.82,
      );

      // 88-100% = BREATHING SPACE (168vh - everything visible + T-shirt breathing!)
      // This gives viewers time to read and absorb the CTA while T-shirt gently floats
    }

    /**
     * Setup button ripple effect (same as search overlay)
     */
    setupButtonRipple() {
      if (!this.ctaButton) return;

      const button = this.ctaButton;
      const fill = button.querySelector(".tshirt-rotation__button-fill");

      // Mouse enter - create ripple
      button.addEventListener("mouseenter", (event) => {
        // Only on non-touch devices
        if ("ontouchstart" in window) return;

        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Calculate the distance to the furthest corner
        const maxDistance = Math.sqrt(
          Math.pow(Math.max(x, rect.width - x), 2) +
            Math.pow(Math.max(y, rect.height - y), 2),
        );

        // Set the origin point
        gsap.set(fill, {
          left: x,
          top: y,
          width: 0,
          height: 0,
          opacity: 1,
        });

        // Animate the ripple expansion
        gsap.to(fill, {
          width: maxDistance * 2,
          height: maxDistance * 2,
          left: x - maxDistance,
          top: y - maxDistance,
          duration: 0.6,
          ease: "power2.out",
        });

        // Add hover class to change text color
        button.classList.add("tshirt-rotation__button--hover");
      });

      // Mouse leave - reverse the fill
      button.addEventListener("mouseleave", () => {
        // Only on non-touch devices
        if ("ontouchstart" in window) return;

        // Fade out the fill
        gsap.to(fill, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(fill, { width: 0, height: 0 });
          },
        });

        // Remove hover class
        button.classList.remove("tshirt-rotation__button--hover");
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWhenReady);
  } else {
    initWhenReady();
  }
})();
