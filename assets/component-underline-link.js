/**
 * Underline Link Component - GSAP Animation
 *
 * Global Alpine.js mixin for underline hover effect.
 * Uses GSAP for smooth left-enter / right-exit animation.
 *
 * Usage in Liquid/Alpine:
 * @mouseenter="$underlineLink.enter($event, $el)"
 * @mouseleave="$underlineLink.leave($el)"
 */

document.addEventListener("alpine:init", () => {
  Alpine.magic("underlineLink", () => ({
    /**
     * Handle mouse enter - underline scales in from left
     * @param {MouseEvent} event - Mouse event
     * @param {HTMLElement} el - Link element
     */
    enter(event, el) {
      if (typeof gsap === "undefined") return;

      const line = el.querySelector(".underline-link__line");
      if (!line) return;

      // Check if this is a persistent variant
      const isPersistent = el.classList.contains("underline-link--persistent");

      if (isPersistent) {
        // For persistent: just ensure it's at full scale
        gsap.to(line, {
          scaleX: 1,
          transformOrigin: "left",
          duration: 0.35,
          ease: "power2.out",
        });
      } else {
        // For hover: animate from 0 to 1
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.35, ease: "power2.out" },
        );
      }
    },

    /**
     * Handle mouse leave - underline scales out to right
     * @param {HTMLElement} el - Link element
     */
    leave(el) {
      if (typeof gsap === "undefined") return;

      const line = el.querySelector(".underline-link__line");
      if (!line) return;

      // Check if this is a persistent variant
      const isPersistent = el.classList.contains("underline-link--persistent");

      if (isPersistent) {
        // For persistent: shrink to 0, then grow back to 1
        const timeline = gsap.timeline();
        timeline
          .to(line, {
            scaleX: 0,
            transformOrigin: "right",
            duration: 0.35,
            ease: "power2.in",
          })
          .to(line, {
            scaleX: 1,
            transformOrigin: "left",
            duration: 0.35,
            ease: "power2.out",
          });
      } else {
        // For hover: just shrink to 0
        gsap.to(line, {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.35,
          ease: "power2.in",
        });
      }
    },
  }));
});
