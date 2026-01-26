/**
 * T-Shirt Rotation Mobile Section
 * - Play-once animation on scroll into view
 * - T-shirt drops down and rests
 * - CTA reveals during animation
 * - Infinite breathing loop after rest
 */

(function () {
  "use strict";

  // Wait for GSAP to be available
  function initWhenReady() {
    if (typeof gsap === "undefined") {
      console.warn("GSAP not loaded. Retrying...");
      setTimeout(initWhenReady, 100);
      return;
    }
    initTShirtRotationMobile();
  }

  function initTShirtRotationMobile() {
    const sections = document.querySelectorAll(".tshirt-rotation-mobile");

    sections.forEach((section) => {
      const sectionId = section.dataset.sectionId;
      const data = window.tshirtRotationMobileData?.[sectionId];

      if (!data || !data.lastFrameUrl) {
        console.error(
          "T-Shirt rotation mobile data not found for section:",
          sectionId,
        );
        return;
      }
      new TShirtRotationMobileController(section, data.lastFrameUrl);
    });
  }

  class TShirtRotationMobileController {
    constructor(section, lastFrameUrl) {
      this.section = section;
      this.lastFrameUrl = lastFrameUrl;

      // DOM elements
      this.canvas = section.querySelector("[data-canvas-mobile]");
      this.ctx = this.canvas.getContext("2d");
      this.cta = section.querySelector("[data-cta-mobile]");
      this.ctaHeading = section.querySelector(
        ".tshirt-rotation-mobile__cta-heading",
      );
      this.ctaParagraph = section.querySelector(
        ".tshirt-rotation-mobile__cta-paragraph",
      );
      this.ctaButton = section.querySelector("[data-cta-button-mobile]");

      // State
      this.image = null;
      this.animationPlayed = false;

      // Initialize
      this.init();
    }

    async init() {
      // Load the last frame image
      await this.loadLastFrame();

      // Setup scroll trigger for play-once animation
      this.setupScrollTrigger();

      // Setup button ripple effect
      this.setupButtonRipple();
    }

    /**
     * Load the last frame image
     */
    async loadLastFrame() {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          this.image = img;
          this.drawFrame();
          resolve();
        };

        img.onerror = () => {
          console.error("Failed to load t-shirt image:", this.lastFrameUrl);
          reject();
        };
        img.src = this.lastFrameUrl;
      });
    }

    /**
     * Draw image to canvas
     */
    drawFrame() {
      if (!this.image) return;

      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw image centered
      this.ctx.drawImage(
        this.image,
        0,
        0,
        this.canvas.width,
        this.canvas.height,
      );
    }

    /**
     * Setup scroll trigger for play-once animation using IntersectionObserver
     */
    setupScrollTrigger() {
      // Set initial states
      gsap.set(this.canvas, {
        opacity: 0,
        y: -300,
      });

      gsap.set([this.ctaHeading, this.ctaParagraph, this.ctaButton], {
        opacity: 0,
        y: -20,
      });

      // Use IntersectionObserver for better reliability
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.animationPlayed) {
              console.log("Mobile T-Shirt section in view, playing animation");
              this.playAnimation();
              observer.unobserve(this.section);
            }
          });
        },
        {
          threshold: 0.2, // Trigger when 20% of section is visible
        },
      );

      observer.observe(this.section);
    }

    /**
     * Play the drop-and-rest animation once
     */
    playAnimation() {
      if (this.animationPlayed) {
        console.log("Animation already played, skipping");
        return;
      }
      this.animationPlayed = true;
      console.log("Starting mobile animation sequence");

      const tl = gsap.timeline({
        onComplete: () => {
          console.log("Animation complete, starting breathing");
          // Enable pointer events after animation
          this.cta.classList.add("is-active");
          // Start breathing animation
          this.startBreathingAnimation();
        },
      });

      // 1. T-shirt drops down and fades in (0-1s)
      tl.to(
        this.canvas,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        0,
      );

      // 2. CTA Heading reveals (0.4-1s)
      tl.to(
        this.ctaHeading,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.4,
      );

      // 3. CTA Paragraph reveals (0.7-1.3s)
      tl.to(
        this.ctaParagraph,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.7,
      );

      // 4. CTA Button reveals (1.0-1.6s)
      tl.to(
        this.ctaButton,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        1.0,
      );
    }

    /**
     * Start infinite subtle breathing animation
     */
    startBreathingAnimation() {
      gsap.to(this.canvas, {
        y: -15,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    /**
     * Setup button ripple effect
     */
    setupButtonRipple() {
      if (!this.ctaButton) return;

      const button = this.ctaButton;
      const fill = button.querySelector(".tshirt-rotation-mobile__button-fill");

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
        button.classList.add("tshirt-rotation-mobile__button--hover");
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
        button.classList.remove("tshirt-rotation-mobile__button--hover");
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
