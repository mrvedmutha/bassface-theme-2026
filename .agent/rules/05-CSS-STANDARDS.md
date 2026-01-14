---
trigger: model_decision
description: How to write css
---

# CSS Standards

**Vanilla CSS with BEM naming, desktop-first responsive design (1440px base), separate CSS files in assets/css/, leverage design system CSS variables.**

---

## File Organization

### CSS File Structure

All CSS files live directly in the `assets/` folder with clear naming:

```
assets/
├── section-header.css        # For sections/header.liquid
├── section-hero.css          # For sections/hero.liquid
├── section-product-grid.css  # For sections/product-grid.liquid
├── snippet-product-card.css  # For snippets/product-card.liquid
└── snippet-button.css        # For snippets/button.liquid
```

### Naming Convention

- **Sections:** `assets/section-[section-name].css`
- **Snippets:** `assets/snippet-[snippet-name].css`

**Examples:**
- `sections/header.liquid` → `assets/section-header.css`
- `sections/hero.liquid` → `assets/section-hero.css`
- `snippets/product-card.liquid` → `assets/snippet-product-card.css`

### Section-Specific CSS

Each section gets its own CSS file:

```
sections/header.liquid → assets/section-header.css
sections/hero.liquid → assets/section-hero.css
sections/product-grid.liquid → assets/section-product-grid.css
```

### Linking CSS in Liquid

```liquid
<!-- In your section file -->
{{ 'section-header.css' | asset_url | stylesheet_tag }}

<div class="section-header">
  <h1 class="section-header__title">{{ section.settings.title }}</h1>
</div>
```

### Design System Tokens

**MANDATORY: Use CSS variables from `snippets/css-variables.liquid` for all design tokens.**

All design tokens are centrally defined:

```css
/* Typography */
var(--font-display)
var(--font-heading)
var(--font-body)
var(--heading-h1-size)
var(--heading-h2-size)
var(--body-size)

/* Colors */
var(--color-primary)
var(--color-secondary)
var(--color-accent)
var(--color-text-primary)
var(--color-background-primary)
var(--color-border-primary)

/* Spacing */
var(--gap-xs), var(--gap-sm), var(--gap-md), var(--gap-lg), var(--gap-xl)
var(--spacing-xl), var(--spacing-lg), var(--spacing-md)

/* Layout */
var(--page-width)
var(--page-margin)
var(--header-height)
```

**⚠️ CRITICAL: Never add new CSS variables without asking the user first.**

---

## BEM Naming Convention

### BEM Structure

```css
/* Block */
.component-name { }

/* Element (double underscore) */
.component-name__element { }

/* Modifier (double dash) */
.component-name--modifier { }
.component-name__element--modifier { }
```

### BEM Examples

```css
/* Hero Section */
.section-hero { }
.section-hero__content { }
.section-hero__title { }
.section-hero__description { }
.section-hero--fullscreen { }

/* Product Card */
.product-card { }
.product-card__image { }
.product-card__info { }
.product-card__title { }
.product-card__price { }
.product-card--featured { }

/* Button Component */
.btn { }
.btn--primary { }
.btn--secondary { }
.btn--large { }
```

### BEM in Liquid

```liquid
<div class="section-hero section-hero--fullscreen">
  <div class="section-hero__content">
    <h1 class="section-hero__title">{{ section.settings.title }}</h1>
    <p class="section-hero__description">{{ section.settings.description }}</p>
    <a href="{{ section.settings.cta_link }}" class="btn btn--primary">
      {{ section.settings.cta_text }}
    </a>
  </div>
</div>
```

---

## Breakpoints & Responsive Design

### Desktop-First Approach (1440px Base)

**Write core styles for 1440px Desktop, then scale down with `max-width` media queries.**

### Standard Breakpoints

- **Desktop (1440px):** Base styles - start here
- **Tablet (1024px):** `@media (max-width: 1024px)`
- **Mobile (700px):** `@media (max-width: 700px)`
- **Small Mobile (412px):** `@media (max-width: 412px)`

**⚠️ Screens beyond 1440px:** Ask the user what should happen for larger screens.

### Desktop-First CSS Structure

```css
/* 1. Desktop (1440px) - Base Styles */
.section-hero {
  padding: var(--spacing-xl);
  font-size: 48px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap-lg);
}

/* 2. Tablet (1024px) - Adjust layout */
@media (max-width: 1024px) {
  .section-hero {
    padding: var(--spacing-lg);
    font-size: 40px;
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 3. Mobile (700px) - Mobile layout */
@media (max-width: 700px) {
  .section-hero {
    padding: var(--spacing-md);
    font-size: 32px;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 4. Small Mobile (412px) - Fine-tune */
@media (max-width: 412px) {
  .section-hero {
    padding: var(--spacing-sm);
    font-size: 28px;
    grid-template-columns: 1fr;
  }
}
```

---

## CSS Best Practices

### 1. Use CSS Variables

**✓ GOOD - CSS variables from design system**
```css
.section-hero {
  padding: var(--spacing-lg);
  background: var(--color-bg-primary);
  font-family: var(--font-heading);
  color: var(--color-text-primary);
}
```

**✗ BAD - Hardcoded values**
```css
.section-hero {
  padding: 40px;
  background: #000000;
  font-family: 'Work Sans', sans-serif;
  color: #333;
}
```

### 2. Keep Specificity Low

**✓ GOOD - Single class selector**
```css
.section-hero { }
.section-hero__title { }
```

**✗ BAD - High specificity**
```css
div.shopify-section section.hero div.hero__content h1.hero__title { }
```

### 3. Avoid !important

Only use `!important` when absolutely necessary (e.g., overriding inline styles or third-party CSS).

```css
/* ✓ GOOD - Proper specificity */
.section-hero {
  background: var(--color-primary);
}

/* ✗ BAD - Using !important */
.section-hero {
  background: var(--color-primary) !important;
}
```

### 4. Organize CSS Logically

```css
/* Layout */
.section-hero {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-lg);
  padding: var(--spacing-xl);
}

/* Typography */
.section-hero__title {
  font-family: var(--font-display);
  font-size: var(--heading-h1-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

/* Colors */
.section-hero {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
}

/* States */
.section-hero:hover {
  transform: scale(1.02);
  transition: var(--transition-base);
}

/* Responsive */
@media (max-width: 1024px) {
  .section-hero {
    grid-template-columns: 1fr;
    padding: var(--spacing-lg);
  }
}
```

### 5. Comment Complex Styles

```css
/* Hero section layout - 2 columns on desktop, stacked on mobile */
.section-hero {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

/* Apply gradient overlay with multiply blend mode */
.section-hero__overlay {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  mix-blend-mode: multiply;
}
```

---

## Common Patterns

### Container/Wrapper

```css
.section-container {
  max-width: var(--page-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--page-margin);
  padding-right: var(--page-margin);
}

@media (max-width: 700px) {
  .section-container {
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);
  }
}
```

### Grid Layout

```css
/* 4-column grid, responsive */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap-lg);
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 700px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--gap-md);
  }
}

@media (max-width: 412px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
```

### Flexbox Layout

```css
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--gap-md);
  padding: var(--spacing-lg);
}

@media (max-width: 700px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-sm);
  }
}
```

### Button Styles

```css
.btn {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-lg);
  font-family: var(--font-body);
  font-size: var(--body-size);
  font-weight: var(--font-weight-semibold);
  text-align: center;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: var(--transition-base);
  cursor: pointer;
  border: none;
}

.btn--primary {
  background: var(--color-accent);
  color: var(--color-text-inverse);
}

.btn--primary:hover {
  background: var(--color-accent-dark);
  transform: translateY(-2px);
}

.btn--secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
}

@media (max-width: 700px) {
  .btn {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: var(--body-sm-size);
  }
}
```

### Responsive Images

```css
.product-card__image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: var(--radius-md);
}

/* Image with aspect ratio */
.product-card__image-wrapper {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: var(--radius-md);
}

.product-card__image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### Card Component

```css
.product-card {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  transition: var(--transition-base);
}

.product-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.product-card__title {
  font-family: var(--font-heading);
  font-size: var(--heading-h4-size);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.product-card__description {
  font-family: var(--font-body);
  font-size: var(--body-sm-size);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.product-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-card__price {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}
```

---

## Typography

### Using Typography Variables

```css
/* Headings */
.section-hero__title {
  font-family: var(--font-display);
  font-size: var(--heading-h1-size);
  font-weight: var(--heading-h1-weight);
  line-height: var(--heading-h1-line-height);
  color: var(--color-text-primary);
}

.section-hero__subtitle {
  font-family: var(--font-heading);
  font-size: var(--heading-h2-size);
  font-weight: var(--heading-h2-weight);
  line-height: var(--heading-h2-line-height);
}

/* Body text */
.section-hero__description {
  font-family: var(--font-body);
  font-size: var(--body-size);
  font-weight: var(--body-weight);
  line-height: var(--body-line-height);
  color: var(--color-text-secondary);
}

/* Small text */
.product-card__meta {
  font-family: var(--font-body);
  font-size: var(--body-sm-size);
  font-weight: var(--body-sm-weight);
  line-height: var(--body-sm-line-height);
  color: var(--color-text-tertiary);
}
```

### Responsive Typography (Desktop-First)

```css
/* Display text - Desktop: Gruppo, Mobile: Work Sans */
.display-text {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: var(--letter-spacing-wide);
  font-size: var(--display-lg-size);
}

@media (max-width: 700px) {
  .display-text {
    font-family: var(--font-body);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-normal);
    font-size: var(--display-md-size);
  }
}
```

---

## Spacing

### Using Spacing Variables

```css
/* Padding */
.section-hero {
  padding: var(--spacing-xl);
}

@media (max-width: 1024px) {
  .section-hero {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 700px) {
  .section-hero {
    padding: var(--spacing-md);
  }
}

/* Margin */
.section-hero__title {
  margin-bottom: var(--gap-md);
}

/* Gap (for flex/grid) */
.product-grid {
  display: grid;
  gap: var(--gap-lg);
}

@media (max-width: 700px) {
  .product-grid {
    gap: var(--gap-md);
  }
}
```

---

## Colors

### Using Color Variables

```css
/* Background colors */
.section-hero {
  background: var(--color-bg-primary);
}

.product-card {
  background: var(--color-bg-secondary);
}

/* Text colors */
.section-hero__title {
  color: var(--color-text-primary);
}

.section-hero__description {
  color: var(--color-text-secondary);
}

/* Accent colors */
.btn--primary {
  background: var(--color-accent);
  color: var(--color-text-inverse);
}

/* Border colors */
.product-card {
  border: 1px solid var(--color-border-light);
}

/* Custom opacity */
.section-hero__overlay {
  background: rgba(0, 0, 0, 0.5);
}
```

---

## Transitions & Animations

### Using Transition Variables

```css
/* Standard transitions */
.btn {
  transition: var(--transition-base);
}

.product-card {
  transition: var(--transition-slow);
}

.icon {
  transition: var(--transition-fast);
}

/* Custom transitions */
.btn:hover {
  background: var(--color-accent-dark);
  transform: translateY(-2px);
}
```

### Custom Animations

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-hero {
  animation: fadeIn var(--transition-slow) ease-in-out;
}

.btn {
  transition: background var(--transition-base), transform var(--transition-fast);
}

.btn:hover {
  transform: translateY(-2px);
}
```

---

## Performance Best Practices

### 1. Minimize Reflows

```css
/* ✓ GOOD - Transform instead of top/left */
.section-hero:hover {
  transform: translateY(-2px);
}

/* ✗ BAD - Triggers reflow */
.section-hero:hover {
  top: -2px;
}
```

### 2. Use will-change Sparingly

```css
/* Only for elements with frequent animations */
.section-hero__image {
  will-change: transform;
}
```

### 3. Optimize Selectors

```css
/* ✓ GOOD - Efficient selector */
.product-card__title { }

/* ✗ BAD - Slow selector */
div > ul > li > a { }
```

---

## Core Theme Protection

### NEVER Modify Core Files

```
❌ assets/base.css (if it's from the theme)
❌ assets/theme.css
❌ snippets/card-product.liquid
❌ layout/theme.liquid (unless adding global assets)
```

### Override Core Classes with Namespacing

```css
/* ✓ GOOD - Namespaced override */
.section-header .page-width {
  max-width: 1440px;
}

/* ✗ BAD - Direct core class modification */
.page-width {
  max-width: 1440px;
}
```

---

## Checklist

Before considering CSS work complete:

- [ ] **BEM naming convention used** consistently
- [ ] **CSS in separate file** (assets/section-[name].css)
- [ ] **CSS file linked** in Liquid section
- [ ] **Design tokens used** - no hardcoded colors/spacing/fonts
- [ ] **Desktop-first approach** (1440px base, max-width media queries)
- [ ] **All breakpoints tested** (1440px, 1024px, 700px, 412px)
- [ ] **Screens beyond 1440px handled** (asked user for requirements)
- [ ] **Low specificity maintained** (avoid deep nesting)
- [ ] **No !important** (unless absolutely necessary)
- [ ] **Responsive images** (width: 100%, height: auto, object-fit)
- [ ] **Smooth transitions** (using transition variables)
- [ ] **Clean, readable code** (logical organization, comments)
- [ ] **No new CSS variables added** without user approval
- [ ] **Works in theme customizer** (tested)
