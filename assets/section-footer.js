/**
 * Footer Section
 * - Back to top button functionality
 * - Accordion functionality for mobile with GSAP animations
 * - Integrates with Lenis if available
 */

(function () {
  "use strict";

  // GSAP animation settings
  const ACCORDION_DURATION = 0.4;
  const ACCORDION_EASE = "power2.inOut";

  function initFooter() {
    const footer = document.querySelector(".footer");
    if (!footer) return;

    // Initialize accordion functionality
    initAccordion(footer);

    // Back to top button functionality
    const backToTopButton = footer.querySelector(".footer__top-button");
    if (backToTopButton) {
      backToTopButton.addEventListener("click", () => {
        // Check if Lenis is available for smooth scrolling
        if (typeof window.lenis !== "undefined" && window.lenis) {
          window.lenis.scrollTo(0, {
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          // Fallback to native smooth scroll
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      });
    }

    // Optional: Show/hide back to top button based on scroll position
    let lastScrollTop = 0;
    const showThreshold = 300;

    function handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > showThreshold) {
        if (backToTopButton) backToTopButton.classList.add("is-visible");
      } else {
        if (backToTopButton) backToTopButton.classList.remove("is-visible");
      }

      lastScrollTop = scrollTop;
    }

    // Throttle scroll event for performance
    let scrollTimeout;
    window.addEventListener("scroll", () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }

      scrollTimeout = window.requestAnimationFrame(() => {
        handleScroll();
      });
    });

    // Initial check
    handleScroll();
  }

  /**
   * Initialize accordion functionality for mobile with GSAP animations
   * Only active on mobile screens (max-width: 412px)
   */
  function initAccordion(footer) {
    const accordions = footer.querySelectorAll(".footer__accordion");

    // Check if GSAP is available
    const hasGSAP = typeof gsap !== "undefined";

    // Add class to body for CSS fallback when GSAP is not available
    if (!hasGSAP) {
      document.body.classList.add("no-gsap");
    }

    // Function to check if we're on mobile
    const isMobile = () => window.innerWidth <= 412;

    // Function to initialize or cleanup accordion based on screen size
    function handleResize() {
      accordions.forEach((accordion) => {
        const content = accordion.querySelector(".footer__accordion-content");
        if (!content) return;

        if (isMobile()) {
          // Mobile: Set up accordion
          if (hasGSAP) {
            // Only set initial state if not already set
            if (!accordion._accordionInitialized) {
              gsap.set(content, {
                height: 0,
                overflow: "hidden",
                opacity: 0,
              });
              accordion._accordionInitialized = true;
            }
          }
        } else {
          // Desktop/Tablet: Reset to default visible state
          if (hasGSAP) {
            gsap.set(content, {
              height: "auto",
              overflow: "visible",
              opacity: 1,
            });
          } else {
            content.style.height = "";
            content.style.overflow = "";
            content.style.opacity = "";
          }
          accordion.classList.remove("is-open");
          accordion._accordionInitialized = false;
        }
      });
    }

    // Initial setup
    handleResize();

    // Handle window resize with debounce
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    });

    accordions.forEach((accordion) => {
      const trigger = accordion.querySelector(".footer__accordion-header");
      const content = accordion.querySelector(".footer__accordion-content");
      const icon = accordion.querySelector(".footer__accordion-icon");

      if (!trigger || !content) return;

      // Store animation state to prevent rapid clicking issues
      accordion._isAnimating = false;

      trigger.addEventListener("click", () => {
        // Only allow accordion interaction on mobile
        if (!isMobile()) return;

        // Prevent interaction during animation
        if (accordion._isAnimating) return;

        const isOpen = accordion.classList.contains("is-open");

        if (hasGSAP) {
          // Close all other accordions with GSAP
          accordions.forEach((acc) => {
            if (acc !== accordion && acc.classList.contains("is-open")) {
              closeAccordionGSAP(acc);
            }
          });

          // Toggle current accordion with GSAP
          if (isOpen) {
            closeAccordionGSAP(accordion);
          } else {
            openAccordionGSAP(accordion);
          }
        } else {
          // Fallback: CSS-based toggle (no GSAP)
          accordions.forEach((acc) => {
            if (acc !== accordion) {
              acc.classList.remove("is-open");
              const accTrigger = acc.querySelector(".footer__accordion-header");
              if (accTrigger) {
                accTrigger.setAttribute("aria-expanded", "false");
              }
            }
          });

          if (!isOpen) {
            accordion.classList.add("is-open");
            trigger.setAttribute("aria-expanded", "true");
          } else {
            accordion.classList.remove("is-open");
            trigger.setAttribute("aria-expanded", "false");
          }
        }
      });
    });
  }

  /**
   * Open accordion with GSAP animation
   */
  function openAccordionGSAP(accordion) {
    const content = accordion.querySelector(".footer__accordion-content");
    const icon = accordion.querySelector(".footer__accordion-icon");
    const trigger = accordion.querySelector(".footer__accordion-header");

    if (!content) return;

    accordion._isAnimating = true;
    accordion.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");

    // Create timeline for coordinated animations
    const tl = gsap.timeline({
      onComplete: () => {
        accordion._isAnimating = false;
      },
    });

    // Animate content height from 0 to auto
    tl.to(content, {
      height: "auto",
      duration: ACCORDION_DURATION,
      ease: ACCORDION_EASE,
    });

    // Animate opacity slightly delayed for smoother feel
    tl.to(
      content,
      {
        opacity: 1,
        duration: ACCORDION_DURATION * 0.6,
        ease: "power1.out",
      },
      "<0.1",
    );

    // Animate icon rotation
    if (icon) {
      tl.to(
        icon,
        {
          rotation: 90,
          duration: ACCORDION_DURATION,
          ease: ACCORDION_EASE,
        },
        0,
      );
    }
  }

  /**
   * Close accordion with GSAP animation
   */
  function closeAccordionGSAP(accordion) {
    const content = accordion.querySelector(".footer__accordion-content");
    const icon = accordion.querySelector(".footer__accordion-icon");
    const trigger = accordion.querySelector(".footer__accordion-header");

    if (!content) return;

    accordion._isAnimating = true;

    // Create timeline for coordinated animations
    const tl = gsap.timeline({
      onComplete: () => {
        accordion.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        accordion._isAnimating = false;
      },
    });

    // Animate opacity first
    tl.to(content, {
      opacity: 0,
      duration: ACCORDION_DURATION * 0.4,
      ease: "power1.in",
    });

    // Animate height to 0
    tl.to(
      content,
      {
        height: 0,
        duration: ACCORDION_DURATION,
        ease: ACCORDION_EASE,
      },
      "<0.1",
    );

    // Animate icon rotation back
    if (icon) {
      tl.to(
        icon,
        {
          rotation: 0,
          duration: ACCORDION_DURATION,
          ease: ACCORDION_EASE,
        },
        0,
      );
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFooter);
  } else {
    initFooter();
  }

  // Reinitialize on Shopify section load (theme editor)
  if (typeof Shopify !== "undefined" && Shopify.designMode) {
    document.addEventListener("shopify:section:load", (event) => {
      if (event.target.querySelector(".footer")) {
        initFooter();
      }
    });
  }
})();
