/**
 * Featured Hero Product Showcase Component
 * Handles GSAP scroll animations and ripple button hover effect
 */

/**
 * Alpine.js Component
 */
function featuredHeroShowcase() {
  return {
    animationsInitialized: false,

    init() {
      // Wait for GSAP and ScrollTrigger to be available
      this.waitForGSAP();
    },

    /**
     * Wait for GSAP library to load
     */
    waitForGSAP() {
      const checkGSAP = setInterval(() => {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
          clearInterval(checkGSAP);
          this.initAnimations();
        }
      }, 100);

      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkGSAP);
      }, 5000);
    },

    /**
     * Initialize GSAP ScrollTrigger animations
     */
    initAnimations() {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        // Skip animations, just show everything
        gsap.set('.featured-hero__label, .featured-hero__heading, .featured-hero__cta-wrapper', {
          opacity: 1,
          y: 0
        });
        gsap.set('.featured-hero__products', { opacity: 1 });
        gsap.set('.product-card', { opacity: 1, y: 0 });
        return;
      }

      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Set initial states (hidden)
      gsap.set('.featured-hero__label, .featured-hero__heading, .featured-hero__cta-wrapper', {
        opacity: 0,
        y: 30
      });
      gsap.set('.featured-hero__products', { opacity: 0 });
      gsap.set('.product-card', { opacity: 0, y: -40 });

      // Animation 1: Hero Overlay Content (Stagger)
      // Different trigger points for mobile vs desktop
      const isMobile = window.innerWidth <= 700;
      const triggerStart = isMobile ? 'top 90%' : 'center center';

      ScrollTrigger.create({
        trigger: '.featured-hero__image-wrapper',
        start: triggerStart, // Mobile: top 90%, Desktop: center center
        once: true, // Play only once
        onEnter: () => {
          // Label text
          gsap.to('.featured-hero__label', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out'
          });

          // Heading (0.2s delay)
          gsap.to('.featured-hero__heading', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: 'power3.out'
          });

          // CTA Button (0.4s delay)
          gsap.to('.featured-hero__cta-wrapper', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            ease: 'power3.out'
          });
        }
      });

      // Animation 2: Product Grid Background & Cards
      // Reveal grid, then stagger cards
      ScrollTrigger.create({
        trigger: '.featured-hero__products',
        start: 'top 80%',
        once: true, // Play only once
        onEnter: () => {
          // Fade in grid background
          gsap.to('.featured-hero__products', {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          });

          // Stagger product cards (1, 2, 3, 4)
          gsap.to('.product-card', {
            opacity: 1,
            y: 0,
            stagger: 0.15, // 150ms between each card
            duration: 0.7,
            delay: 0.2, // Start after grid is visible
            ease: 'power2.out'
          });
        }
      });

      this.animationsInitialized = true;
    },

    /**
     * Handle button hover - create ripple fill effect
     * Only on desktop (1024px+) and non-touch devices
     */
    handleButtonHover(event, button) {
      // Check if desktop size
      if (window.innerWidth < 1024) return;

      // Check if touch device
      if ('ontouchstart' in window) return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Get the fill element
      const fill = button.querySelector('.featured-hero__button-fill');

      if (!fill) return;

      // Calculate the distance to the furthest corner for full coverage
      const maxDistance = Math.sqrt(
        Math.pow(Math.max(x, rect.width - x), 2) +
        Math.pow(Math.max(y, rect.height - y), 2)
      );

      // Set the origin point (cursor position)
      gsap.set(fill, {
        left: x,
        top: y,
        width: 0,
        height: 0,
        opacity: 1
      });

      // Animate the white ripple expansion from cursor position
      gsap.to(fill, {
        width: maxDistance * 2,
        height: maxDistance * 2,
        left: x - maxDistance,
        top: y - maxDistance,
        duration: 0.6,
        ease: 'power2.out'
      });

      // Add hover class to change text color from white to black
      button.classList.add('featured-hero__button--hover');
    },

    /**
     * Handle button leave - reverse the ripple fill
     */
    handleButtonLeave(button) {
      // Check if desktop size
      if (window.innerWidth < 1024) return;

      // Check if touch device
      if ('ontouchstart' in window) return;

      const fill = button.querySelector('.featured-hero__button-fill');

      if (!fill) return;

      // Fade out the white fill
      gsap.to(fill, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          // Reset fill size after animation
          gsap.set(fill, { width: 0, height: 0 });
        }
      });

      // Remove hover class (text returns to white)
      button.classList.remove('featured-hero__button--hover');
    }
  };
}

/**
 * Theme Editor Compatibility
 * Reinitialize animations when section is reloaded in theme customizer
 */
if (Shopify && Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    if (event.target.classList.contains('section-featured-hero-product-showcase')) {
      // Refresh ScrollTrigger after section reload
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }
  });

  document.addEventListener('shopify:section:unload', (event) => {
    if (event.target.classList.contains('section-featured-hero-product-showcase')) {
      // Kill all ScrollTrigger instances for this section
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger && trigger.vars.trigger.closest('.section-featured-hero-product-showcase')) {
            trigger.kill();
          }
        });
      }
    }
  });
}
