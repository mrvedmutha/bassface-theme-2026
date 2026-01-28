/**
 * Footer Section
 * - Back to top button functionality
 * - Integrates with Lenis if available
 */

(function () {
  "use strict";

  function initFooter() {
    const footer = document.querySelector(".footer");
    if (!footer) return;

    // Back to top button functionality
    const backToTopButton = footer.querySelector(".footer__top-button");
    if (!backToTopButton) return;

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

    // Optional: Show/hide back to top button based on scroll position
    let lastScrollTop = 0;
    const showThreshold = 300; // Show button after scrolling 300px

    function handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > showThreshold) {
        backToTopButton.classList.add("is-visible");
      } else {
        backToTopButton.classList.remove("is-visible");
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
