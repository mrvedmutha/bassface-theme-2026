// =====================================================
// HEADER ANIMATIONS - Alpine.js Component
// =====================================================
// Handles:
// - Sticky header on scroll (300px threshold)
// - GSAP animations for header slide-down
// - Hamburger menu hover animations
// - Text underline hover animations (Search, Login/Signup)
// - Lenis smooth scrolling integration

document.addEventListener("alpine:init", () => {
  Alpine.data("headerAnimation", (isTransparentPage = false) => ({
    sticky: !isTransparentPage, // Start solid on non-transparent pages
    isTransparentPage: isTransparentPage, // Store page type
    menuOpen: false,
    searchOpen: false,
    lastScroll: 0,
    isAnimating: false, // Prevent re-trigger during animation

    init() {
      // Initialize Lenis for smooth scrolling
      if (typeof Lenis !== "undefined") {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Store globally for debugging
        window.lenis = lenis;
        console.log("✅ Lenis initialized - Smooth scrolling active");
      } else {
        console.warn("⚠️ Lenis not loaded");
      }

      // Only enable scroll detection on transparent pages
      if (this.isTransparentPage) {
        window.addEventListener("scroll", () => this.handleScroll());
        console.log("✅ Transparent page - Scroll detection enabled");
      } else {
        console.log("✅ Solid page - Header always solid");
      }
    },

    handleScroll() {
      const scrollY = window.scrollY;
      const threshold = 300;

      // Detect when crossing the threshold
      if (scrollY > threshold && !this.sticky && !this.isAnimating) {
        console.log("🔽 TRIGGER: Becoming sticky at scrollY:", scrollY);
        // Activate sticky with GSAP slide-down animation
        this.isAnimating = true;
        this.animateHeaderIn();
        this.sticky = true;
      } else if (scrollY <= threshold && this.sticky && !this.isAnimating) {
        console.log("🔼 TRIGGER: Becoming transparent at scrollY:", scrollY);
        // Deactivate sticky with slide-up animation
        // State will switch in onComplete
        this.isAnimating = true;
        this.animateHeaderOut();
      }

      this.lastScroll = scrollY;
    },

    animateHeaderIn() {
      if (typeof gsap === "undefined") {
        console.warn("⚠️ GSAP not loaded");
        return;
      }

      const header = this.$el;

      console.log("▶️ START: Slide DOWN animation");

      // Kill any existing animations
      gsap.killTweensOf(header);

      // Slide down from top - slower, smoother
      gsap.fromTo(
        header,
        {
          y: -100,
        },
        {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            console.log("✅ COMPLETE: Slide DOWN animation");
            this.isAnimating = false; // Allow next animation
          },
        }
      );
    },

    animateHeaderOut() {
      if (typeof gsap === "undefined") return;

      const header = this.$el;

      console.log("▶️ START: Transition to transparent");

      // Kill any existing animations
      gsap.killTweensOf(header);

      // Instant transition - no slide animation
      this.sticky = false;
      gsap.set(header, { y: 0, clearProps: "transform" });

      console.log("✅ COMPLETE: Instant transition");
      this.isAnimating = false; // Allow next animation
    },

    // ==========================================
    // HOVER ANIMATIONS - Door Effect (Left → Right)
    // ==========================================

    // Hamburger menu animation (2 lines with stagger)
    // Both Enter and Exit: Same animation (Left to Right, 0% → 100%)
    animateHamburgerEnter(element) {
      if (typeof gsap === "undefined") return;

      const lines = element.querySelectorAll("svg line, svg path");
      if (!lines.length) return;

      // Animate from 0 to 100% left to right
      gsap.fromTo(
        lines,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
        }
      );
    },

    animateHamburgerExit(element) {
      // No animation on mouse exit
      return;
    },

    // Text underline animation (Search, Login/Signup)
    animateTextEnter(element) {
      if (typeof gsap === "undefined") return;

      const underline = element.querySelector(".section-header__underline");
      if (!underline) return;

      // Underline enters from left
      gsap.fromTo(
        underline,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.35, ease: "power2.out" }
      );
    },

    animateTextExit(element) {
      if (typeof gsap === "undefined") return;

      const underline = element.querySelector(".section-header__underline");
      if (!underline) return;

      // Underline exits to right
      gsap.to(underline, {
        scaleX: 0,
        transformOrigin: "right", // Exit from right
        duration: 0.35,
        ease: "power2.in",
      });
    },

    // ==========================================
    // ICON FADE ANIMATIONS - Outline ↔ Filled
    // ==========================================

    // Icon fade animation (User icon, T-shirt icon)
    // Entry: Fade from outline to filled
    // Exit: Fade from filled to outline
    animateIconFillEnter(element) {
      if (typeof gsap === "undefined") return;

      // Find the VISIBLE icon-stack (not display: none)
      const iconStacks = element.querySelectorAll(".icon-stack");
      let visibleStack = null;

      iconStacks.forEach((stack) => {
        const computedStyle = window.getComputedStyle(stack);
        if (computedStyle.display !== "none") {
          visibleStack = stack;
        }
      });

      if (!visibleStack) return;

      // Query for outline/filled ONLY within the visible stack
      const outline = visibleStack.querySelector(".icon-outline");
      const filled = visibleStack.querySelector(".icon-filled");

      if (!outline || !filled) return;

      // Fade out outline, fade in filled
      gsap.to(outline, { opacity: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(filled, { opacity: 1, duration: 0.3, ease: "power2.out" });
    },

    animateIconFillExit(element) {
      if (typeof gsap === "undefined") return;

      // Find the VISIBLE icon-stack (not display: none)
      const iconStacks = element.querySelectorAll(".icon-stack");
      let visibleStack = null;

      iconStacks.forEach((stack) => {
        const computedStyle = window.getComputedStyle(stack);
        if (computedStyle.display !== "none") {
          visibleStack = stack;
        }
      });

      if (!visibleStack) return;

      // Query for outline/filled ONLY within the visible stack
      const outline = visibleStack.querySelector(".icon-outline");
      const filled = visibleStack.querySelector(".icon-filled");

      if (!outline || !filled) return;

      // Fade in outline, fade out filled
      gsap.to(outline, { opacity: 1, duration: 0.3, ease: "power2.in" });
      gsap.to(filled, { opacity: 0, duration: 0.3, ease: "power2.in" });
    },
  }));
});
