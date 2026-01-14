# Tech Stack - Bassface Theme 2026

This document outlines the frontend frameworks and libraries used in this Shopify theme project.

## Framework Stack

### 1. AlpineJS (v3.15.3)
**Purpose**: Lightweight JavaScript framework for interactivity

**CDN**: `https://cdn.jsdelivr.net/npm/alpinejs@3.15.3/dist/cdn.min.js`

**Use Cases**:
- Interactive UI components (dropdowns, modals, tabs)
- Cart interactions and AJAX updates
- Form validation and dynamic forms
- Toggle states (mobile menu, accordions)
- Product variant selection
- Quantity selectors

**Best Practices**:
- Use `x-data` to define component state
- Keep logic declarative with `x-show`, `x-if`, `x-bind`
- Use `x-cloak` to prevent flash of unstyled content
- Leverage `Alpine.store()` for global state (cart count, etc.)
- Use `$dispatch` for component communication

**Common Patterns**:

```liquid
{%- comment -%} Mobile Menu Toggle {%- endcomment -%}
<div x-data="{ open: false }">
  <button @click="open = !open">Menu</button>
  <nav x-show="open" x-transition>
    <!-- Menu items -->
  </nav>
</div>

{%- comment -%} Product Variant Selector {%- endcomment -%}
<div x-data="{ selectedVariant: {{ product.selected_or_first_available_variant | json }} }">
  <select x-model="selectedVariant">
    {% for variant in product.variants %}
      <option value="{{ variant.id }}">{{ variant.title }}</option>
    {% endfor %}
  </select>
</div>
```

---

### 2. GSAP (v3.14.2)
**Purpose**: Professional-grade animation library

**CDN**: `https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js`

**Use Cases**:
- Hero section animations
- Scroll-triggered animations (with ScrollTrigger)
- Product image reveals
- Text animations and staggered effects
- Parallax effects
- Page transitions

**Available Plugins** (via CDN):
- ScrollTrigger: `gsap@3.14.2/dist/ScrollTrigger.min.js`
- ScrollToPlugin: `gsap@3.14.2/dist/ScrollToPlugin.min.js`

**Best Practices**:
- Register plugins before use: `gsap.registerPlugin(ScrollTrigger)`
- Use `gsap.matchMedia()` for responsive animations
- Clean up animations on theme editor reload
- Use `willChange` CSS property for animated elements
- Prefer `transform` and `opacity` for better performance
- Use `gsap.utils` for advanced functionality

**Common Patterns**:

```javascript
// Hero section fade-in
gsap.from('.hero__content', {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power3.out'
});

// Scroll-triggered animation
gsap.registerPlugin(ScrollTrigger);
gsap.from('.feature', {
  scrollTrigger: {
    trigger: '.feature',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse'
  },
  opacity: 0,
  y: 100,
  stagger: 0.2
});

// Staggered product card animation
gsap.from('.product-card', {
  opacity: 0,
  y: 30,
  stagger: 0.1,
  duration: 0.6,
  ease: 'power2.out'
});
```

---

### 3. Lenis (v1.3.17)
**Purpose**: Smooth scroll library for buttery-smooth scrolling experience

**CDN**:
- JS: `https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js`
- CSS: `https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.css`

**Use Cases**:
- Smooth scrolling across entire site
- Integration with GSAP ScrollTrigger
- Custom scroll behavior
- Parallax effects foundation

**Best Practices**:
- Initialize once globally in theme
- Integrate with GSAP for scroll animations
- Add `data-lenis-prevent` to elements that need default scroll
- Handle cleanup on theme editor reload
- Consider performance on mobile devices

**Initialization Pattern**:

```javascript
// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  smooth: true,
  smoothTouch: false, // Disable on touch devices for better performance
  touchMultiplier: 2,
});

// Request animation frame
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integration with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Anchor link smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      lenis.scrollTo(target);
    }
  });
});
```

---

### 4. TailwindCSS
**Purpose**: Utility-first CSS framework

**Status**: To be configured separately by developer

**Use Cases**:
- Rapid UI development
- Responsive design utilities
- Consistent spacing and sizing
- Custom design system integration

**Integration Notes**:
- Will be configured with custom build process
- Should be purged for production to minimize bundle size
- Custom theme configuration in `tailwind.config.js`
- Integration with Shopify theme CSS architecture

---

## Framework Integration Patterns

### AlpineJS + GSAP

Combining state management with animations:

```liquid
<div
  x-data="{ isVisible: false }"
  x-init="gsap.from($el, { opacity: 0, y: 50 })"
  x-show="isVisible"
  x-transition
>
  Animated content
</div>
```

### GSAP + Lenis + ScrollTrigger

Professional scroll-based animations:

```javascript
gsap.registerPlugin(ScrollTrigger);

// Sync Lenis with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// Scroll animation
gsap.to('.parallax-element', {
  scrollTrigger: {
    trigger: '.parallax-element',
    scrub: true, // Smooth scrubbing effect
    start: 'top bottom',
    end: 'bottom top'
  },
  y: -100
});
```

### AlpineJS + Shopify Ajax API

Dynamic cart interactions:

```javascript
Alpine.store('cart', {
  count: {{ cart.item_count }},

  async addItem(variantId, quantity = 1) {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity })
    });

    const data = await response.json();
    this.count += quantity;

    // Trigger animation
    gsap.from('.cart-icon', {
      scale: 1.2,
      duration: 0.3,
      ease: 'back.out'
    });
  }
});
```

---

## Performance Considerations

### Loading Strategy
- All frameworks loaded via CDN before `</body>`
- AlpineJS loads last (initializes after DOM ready)
- GSAP and Lenis load before AlpineJS for integration
- Consider async/defer for non-critical animations

### Optimization Tips
1. **AlpineJS**: Keep `x-data` scoped to component level, avoid global state unless necessary
2. **GSAP**: Use `will-change` sparingly, clean up ScrollTriggers on destroy
3. **Lenis**: Disable smooth touch scrolling on mobile for better performance
4. **TailwindCSS**: Purge unused utilities in production build

### Theme Editor Compatibility

```javascript
// Clean up on theme editor section reload
if (Shopify.designMode) {
  document.addEventListener('shopify:section:load', () => {
    // Reinitialize Alpine components
    Alpine.start();

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();

    // Reset Lenis
    lenis.resize();
  });

  document.addEventListener('shopify:section:unload', () => {
    // Clean up ScrollTrigger instances
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
}
```

---

## File Organization

### JavaScript Files

```
assets/
├── alpine-components.js      # Alpine.js component definitions
├── gsap-animations.js        # GSAP animation timelines
├── lenis-init.js            # Lenis initialization and config
└── theme.js                 # Main theme initialization
```

### Recommended Load Order

```liquid
{%- comment -%} In theme.liquid before </body> {%- endcomment -%}

<!-- Framework Libraries -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js"></script>

<!-- GSAP Plugins (if needed) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js"></script>

<!-- Theme Scripts -->
<script src="{{ 'lenis-init.js' | asset_url }}" defer></script>
<script src="{{ 'gsap-animations.js' | asset_url }}" defer></script>
<script src="{{ 'alpine-components.js' | asset_url }}" defer></script>

<!-- AlpineJS (last) -->
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.15.3/dist/cdn.min.js" defer></script>

<!-- Main theme init -->
<script src="{{ 'theme.js' | asset_url }}" defer></script>
```

---

## Accessibility Considerations

### AlpineJS
- Always provide keyboard navigation alternatives
- Use proper ARIA attributes with `x-bind:aria-*`
- Ensure focus management in modals and dropdowns
- Respect `prefers-reduced-motion`

### GSAP Animations
```javascript
// Respect user motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  gsap.from('.animated-element', { opacity: 0, y: 50 });
} else {
  // No animation, just show
  gsap.set('.animated-element', { opacity: 1 });
}
```

### Lenis
```javascript
// Disable smooth scroll for users who prefer reduced motion
const lenis = new Lenis({
  smooth: !window.matchMedia('(prefers-reduced-motion: reduce)').matches
});
```

---

## Common Gotchas & Solutions

### 1. Alpine x-cloak Flash
**Problem**: Content flashes before Alpine initializes

**Solution**:
```css
[x-cloak] { display: none !important; }
```

### 2. GSAP ScrollTrigger Not Updating
**Problem**: Animations don't trigger after dynamic content load

**Solution**:
```javascript
ScrollTrigger.refresh();
```

### 3. Lenis Conflicting with Modals
**Problem**: Background scrolls when modal is open

**Solution**:
```javascript
// Stop Lenis
lenis.stop();

// Resume Lenis
lenis.start();
```

### 4. AlpineJS + Shopify Sections
**Problem**: Alpine components not working after section reload

**Solution**:
```javascript
document.addEventListener('shopify:section:load', () => {
  Alpine.initTree(document.querySelector(`#shopify-section-${event.detail.sectionId}`));
});
```

---

## Version Information

| Framework | Version | CDN | Docs |
|-----------|---------|-----|------|
| AlpineJS | 3.15.3 | jsDelivr | [alpinejs.dev](https://alpinejs.dev) |
| GSAP | 3.14.2 | jsDelivr | [gsap.com/docs](https://gsap.com/docs) |
| Lenis | 1.3.17 | jsDelivr | [lenis.studiofreight.com](https://lenis.studiofreight.com) |
| TailwindCSS | TBD | TBD | [tailwindcss.com](https://tailwindcss.com) |

---

## Quick Reference

### When to Use Each Framework

- **Need interactivity?** → AlpineJS
- **Need animations?** → GSAP
- **Need smooth scroll?** → Lenis
- **Need utility classes?** → TailwindCSS

### Framework Decision Tree

```
User interaction (clicks, toggles, forms)
  → Use AlpineJS

Visual animations (fades, slides, reveals)
  → Use GSAP

Scroll-based animations
  → Use GSAP + ScrollTrigger + Lenis

Page-wide smooth scrolling
  → Use Lenis

Styling and layout
  → Use TailwindCSS utilities
```

---

**Last Updated**: 2026-01-14
**Project**: Bassface Theme 2026
