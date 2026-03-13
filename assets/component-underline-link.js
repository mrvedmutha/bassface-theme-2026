/**
 * Underline Link Component - GSAP Animation
 *
 * Global Alpine.js mixin for underline hover effect.
 * Uses GSAP for smooth left-enter / right-exit animation.
 * Disabled on touch devices.
 *
 * Usage in Liquid/Alpine:
 * @mouseenter="$underlineLink.enter($event, $el)"
 * @mouseleave="$underlineLink.leave($el)"
 */

document.addEventListener("alpine:init", () => {
  // Detect if device has touch capability
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  Alpine.magic("underlineLink", () => ({
    /**
     * Handle mouse enter - underline scales in from left
     * @param {MouseEvent} event - Mouse event
     * @param {HTMLElement} el - Link element
     */
    enter(event, el) {
      // Disable animation on touch devices
      if (isTouchDevice) return;
      if (typeof gsap === "undefined") return;

      const line = el.querySelector(".underline-link__line");
      if (!line) return;

      // Animate underline from left: scaleX 0 → 1
      gsap.fromTo(
        line,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.35, ease: "power2.out" },
      );
    },

    /**
     * Handle mouse leave - underline scales out to right
     * @param {HTMLElement} el - Link element
     */
    leave(el) {
      // Disable animation on touch devices
      if (isTouchDevice) return;
      if (typeof gsap === "undefined") return;

      const line = el.querySelector(".underline-link__line");
      if (!line) return;

      // Animate underline out to right: scaleX 1 → 0
      gsap.to(line, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 0.35,
        ease: "power2.in",
      });
    },
  }));
});
