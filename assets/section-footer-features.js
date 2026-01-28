/**
 * Footer Features Section
 * - Desktop: Scroll-triggered push-down animation (footer moves down)
 * - Tablet/Mobile: Static flat layout
 * - Drop shadow fade during animation
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
    initFooterFeatures();
  }

  function initFooterFeatures() {
    // Only run on desktop (>1024px)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      const featuresSection = document.querySelector(".footer-features");
      const footerSection = document.querySelector(".footer");

      if (!featuresSection || !footerSection) {
        return;
      }

      const setupAnimation = () => {
        // Get actual features section height dynamically
        const featuresHeight = featuresSection.offsetHeight;

        // Set initial state - footer starts overlapped
        gsap.set(footerSection, { marginTop: -featuresHeight });

        ScrollTrigger.create({
          trigger: footerSection,
          start: "top bottom", // When footer enters viewport
          end: "top top", // When footer reaches top of viewport
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // Start animation at 10% scroll progress
            if (progress >= 0.1) {
              const animationProgress = (progress - 0.1) / 0.9; // Normalize from 0.1-1 to 0-1

              // Push down the footer section by reducing negative margin
              // Start: -260px (hidden behind features)
              // End: 0px (revealed, flat layout)
              const marginTop =
                -featuresHeight + featuresHeight * animationProgress;
              gsap.set(footerSection, { marginTop: marginTop });

              // Fade out drop shadow on features
              const shadowOpacity = 1 - animationProgress;
              const innerElement = featuresSection.querySelector(
                ".footer-features__inner",
              );

              if (shadowOpacity > 0) {
                featuresSection.classList.add("is-floating");
                if (innerElement) {
                  innerElement.style.boxShadow = `0px 12px 50px 15px rgba(255, 255, 255, ${0.4 * shadowOpacity})`;
                }
              } else {
                featuresSection.classList.remove("is-floating");
                if (innerElement) {
                  innerElement.style.boxShadow = "none";
                }
              }
            } else {
              // Before 10% scroll - maintain overlapped state
              gsap.set(footerSection, { marginTop: -featuresHeight });
              featuresSection.classList.add("is-floating");
              const innerElement = featuresSection.querySelector(
                ".footer-features__inner",
              );
              if (innerElement) {
                innerElement.style.boxShadow =
                  "0px 12px 50px 15px rgba(255, 255, 255, 0.4)";
              }
            }
          },
        });
      };

      // Initialize on load
      setupAnimation();

      // Refresh on window resize
      let resizeTimeout;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 250);
      });

      // Cleanup on section unload (Shopify theme editor)
      if (typeof Shopify !== "undefined" && Shopify.designMode) {
        document.addEventListener("shopify:section:unload", (event) => {
          if (event.target.querySelector(".footer-features")) {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
          }
        });
      }
    });

    // Mobile/Tablet: No animation (1024px and below)
    mm.add("(max-width: 1024px)", () => {
      const featuresSection = document.querySelector(".footer-features");
      const footerSection = document.querySelector(".footer");
      const innerElement = featuresSection?.querySelector(
        ".footer-features__inner",
      );

      // Kill all existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === footerSection ||
          trigger.trigger === featuresSection
        ) {
          trigger.kill();
        }
      });

      if (featuresSection) {
        // Ensure no transforms or shadows
        gsap.set(featuresSection, { clearProps: "all" });
        featuresSection.classList.remove("is-floating");
      }

      if (innerElement) {
        innerElement.style.boxShadow = "none";
      }

      if (footerSection) {
        gsap.set(footerSection, { clearProps: "all" });
        footerSection.style.marginTop = "0";
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWhenReady);
  } else {
    initWhenReady();
  }
})();
