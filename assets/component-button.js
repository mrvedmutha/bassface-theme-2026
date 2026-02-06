/**
 * Button Component - Ripple Effect
 *
 * Global Alpine.js mixin for button ripple hover effect.
 * Uses GSAP for smooth cursor-following ripple animation.
 *
 * Usage in Liquid/Alpine:
 * @mouseenter="$buttonRipple.enter($event, $el)"
 * @mouseleave="$buttonRipple.leave($el)"
 */

document.addEventListener("alpine:init", () => {
  // Global ripple mixin available to all Alpine components
  Alpine.magic("buttonRipple", () => ({
    /**
     * Handle mouse enter - create ripple expanding from cursor
     * @param {MouseEvent} event - Mouse event
     * @param {HTMLElement} button - Button element
     */
    enter(event, button) {
      // Skip on touch devices
      if ("ontouchstart" in window) return;

      // Ensure GSAP is available
      if (typeof gsap === "undefined") return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Get the fill element
      const fill = button.querySelector(".btn__fill");
      if (!fill) return;

      // Calculate distance to furthest corner for full coverage
      const maxDistance = Math.sqrt(
        Math.pow(Math.max(x, rect.width - x), 2) +
          Math.pow(Math.max(y, rect.height - y), 2),
      );

      // Set origin at cursor position
      gsap.set(fill, {
        left: x,
        top: y,
        width: 0,
        height: 0,
        opacity: 1,
      });

      // Animate ripple expansion
      gsap.to(fill, {
        width: maxDistance * 2,
        height: maxDistance * 2,
        left: x - maxDistance,
        top: y - maxDistance,
        duration: 0.6,
        ease: "power2.out",
      });

      // Add hover class for text color change
      button.classList.add("btn--hover");
    },

    /**
     * Handle mouse leave - fade out ripple
     * @param {HTMLElement} button - Button element
     */
    leave(button) {
      // Skip on touch devices
      if ("ontouchstart" in window) return;

      // Ensure GSAP is available
      if (typeof gsap === "undefined") return;

      const fill = button.querySelector(".btn__fill");
      if (!fill) return;

      // Fade out fill
      gsap.to(fill, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Reset fill size after animation
          gsap.set(fill, { width: 0, height: 0 });
        },
      });

      // Remove hover class
      button.classList.remove("btn--hover");
    },
  }));
});

/**
 * Fallback for non-Alpine contexts
 * Provides standalone functions that can be called directly
 */
window.buttonRippleEffect = {
  enter(event, button) {
    if ("ontouchstart" in window) return;
    if (typeof gsap === "undefined") return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const fill = button.querySelector(".btn__fill");
    if (!fill) return;

    const maxDistance = Math.sqrt(
      Math.pow(Math.max(x, rect.width - x), 2) +
        Math.pow(Math.max(y, rect.height - y), 2),
    );

    gsap.set(fill, {
      left: x,
      top: y,
      width: 0,
      height: 0,
      opacity: 1,
    });

    gsap.to(fill, {
      width: maxDistance * 2,
      height: maxDistance * 2,
      left: x - maxDistance,
      top: y - maxDistance,
      duration: 0.6,
      ease: "power2.out",
    });

    button.classList.add("btn--hover");
  },

  leave(button) {
    if ("ontouchstart" in window) return;
    if (typeof gsap === "undefined") return;

    const fill = button.querySelector(".btn__fill");
    if (!fill) return;

    gsap.to(fill, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(fill, { width: 0, height: 0 });
      },
    });

    button.classList.remove("btn--hover");
  },
};
