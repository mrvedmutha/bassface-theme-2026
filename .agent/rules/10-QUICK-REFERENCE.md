---
trigger: model_decision
description: 1-page cheat sheet for daily development
---

# Quick Reference - Cheat Sheet

**Essential commands and patterns for Bassface Theme 2026**

---

## Essential Commands

```bash
# Start dev server
shopify theme dev
# → Opens at http://localhost:9292

# Git workflow
git add sections/[name].liquid assets/section-[name].css
git commit -m "[Feature] Add [name] section"
git push origin main

# Deploy
shopify theme push --unpublished  # Test first
shopify theme push                # Live (after approval)
```

---

## File Structure

```
sections/[name].liquid              # Section file
assets/section-[name].css           # CSS file for section
snippets/[name].liquid              # Snippet file
assets/snippet-[name].css           # CSS file for snippet (if needed)
docs/sections/[name]/               # Documentation (optional, ask first)
```

**Examples:** `header.liquid`, `hero.liquid`, `product-grid.liquid`

---

## Styling: Vanilla CSS + BEM

### CSS File

```css
/* assets/section-hero.css */

/* Desktop (1440px) - Base */
.section-hero {
  display: flex;
  align-items: center;
  gap: var(--gap-lg);
  padding: var(--spacing-xl);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
}

.section-hero__title {
  font-size: var(--heading-h1-size);
  font-weight: var(--font-weight-bold);
}

/* Tablet (1024px) */
@media (max-width: 1024px) {
  .section-hero {
    padding: var(--spacing-lg);
  }
}

/* Mobile (700px) */
@media (max-width: 700px) {
  .section-hero {
    padding: var(--spacing-md);
    flex-direction: column;
  }
}
```

### Liquid File

```liquid
{{ 'section-hero.css' | asset_url | stylesheet_tag }}

<div class="section-hero">
  <h1 class="section-hero__title">{{ section.settings.title }}</h1>
  <p class="section-hero__description">{{ section.settings.description }}</p>
</div>
```

---

## Interactivity: Alpine.js

### Basic Toggle
```liquid
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open" x-transition>Content</div>
</div>
```

### With Fetch API
```liquid
<div x-data="{
  loading: false,
  async addToCart(variantId) {
    this.loading = true;
    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      });
      return await res.json();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.loading = false;
    }
  }
}">
  <button @click="addToCart({{ product.selected_or_first_available_variant.id }})" :disabled="loading">
    <span x-show="!loading">Add to Cart</span>
    <span x-show="loading">Adding...</span>
  </button>
</div>
```

---

## Breakpoints (Desktop-First)

```css
/* Base: 1440px */
.section-hero {
  padding: var(--spacing-xl);
  font-size: 48px;
}

/* Tablet: 1024px */
@media (max-width: 1024px) {
  .section-hero {
    padding: var(--spacing-lg);
    font-size: 40px;
  }
}

/* Mobile: 700px */
@media (max-width: 700px) {
  .section-hero {
    padding: var(--spacing-md);
    font-size: 32px;
  }
}

/* Small: 412px */
@media (max-width: 412px) {
  .section-hero {
    padding: var(--spacing-sm);
    font-size: 28px;
  }
}
```

**Breakpoint values:**
- Base: `1440px`
- Tablet: `@media (max-width: 1024px)`
- Mobile: `@media (max-width: 700px)`
- Small: `@media (max-width: 412px)`

---

## Common Schema Settings

### Image Picker
```json
{
  "type": "image_picker",
  "id": "image",
  "label": "Image"
}
```
```liquid
{% if section.settings.image %}
  <img src="{{ section.settings.image | image_url: width: 1920 }}" alt="{{ section.settings.image.alt }}">
{% else %}
  {{ 'hero' | placeholder_svg_tag }}
{% endif %}
```

### Text/Richtext
```json
{
  "type": "text",
  "id": "heading",
  "label": "Heading",
  "default": "Default Heading"
},
{
  "type": "richtext",
  "id": "description",
  "label": "Description"
}
```

### Video URL
```json
{
  "type": "video_url",
  "id": "video",
  "label": "Video URL",
  "accept": ["youtube", "vimeo"]
}
```

---

## BEM Naming Convention

```css
.section-hero                    /* Block */
.section-hero__content           /* Element */
.section-hero__title             /* Element */
.section-hero--fullscreen        /* Modifier */
```

**Examples:**
```css
.product-card
.product-card__image
.product-card__title
.product-card__price
.product-card--featured
```

---

## Testing Workflow

1. **Manual Test** (always):
   - `shopify theme dev` → Test at http://localhost:9292
   - Test all breakpoints (1440, 1024, 700, 412)
   - Check theme editor
   - Verify CSS file loads

2. **If Issues** → Debug:
   - Frontend: AI provides debug markup
   - JS: AI adds `console.log` with TODO comments
   - Human provides feedback

3. **If Debugging Fails** → Only then:
   - Human says "test it" → AI uses Playwright via MCP

---

## Design Tokens (Available)

### Typography
```css
var(--font-display)
var(--font-heading)
var(--font-body)
var(--heading-h1-size)
var(--heading-h2-size)
var(--body-size)
var(--body-sm-size)
```

### Spacing
```css
var(--gap-xs), var(--gap-sm), var(--gap-md), var(--gap-lg), var(--gap-xl)
var(--spacing-xl), var(--spacing-lg), var(--spacing-md), var(--spacing-sm)
```

### Colors
```css
var(--color-bg-primary)
var(--color-bg-secondary)
var(--color-text-primary)
var(--color-text-secondary)
var(--color-text-inverse)
var(--color-border-primary)
var(--color-accent)
```

---

## Common Liquid Filters

```liquid
{{ product.price | money }}                          # Format price
{{ image | image_url: width: 600 }}                 # Resize image
{{ text | escape }}                                  # Escape HTML
{{ text | truncate: 150 }}                          # Truncate text
{{ product.title | capitalize }}                     # Capitalize
{{ setting | default: "Default Value" }}             # Default value
```

---

## Empty Divs Rule

**CRITICAL:** Empty divs must contain `&nbsp;` to render in Shopify

```liquid
<!-- ✗ BAD - Won't render -->
<div class="border-line"></div>

<!-- ✓ GOOD - Will render -->
<div class="border-line">&nbsp;</div>
```

---

## Pre-Commit Checklist

- [ ] CSS file created in `assets/section-[name].css`
- [ ] CSS file linked in section
- [ ] BEM naming convention used
- [ ] Manual testing complete (all breakpoints)
- [ ] No console errors
- [ ] Matches Figma design
- [ ] Section works in theme editor
- [ ] CSS variables used (no hardcoded values)
- [ ] Console.log removed (or has TODO comments)

---

## Quick Shopify CLI Commands

```bash
shopify theme list              # List themes
shopify theme pull              # Pull theme
shopify theme push              # Push (prompts for theme)
shopify theme dev               # Dev server
shopify theme check             # Lint theme
```

---

## When Beyond 1440px

**Ask user:** "This design is wider than 1440px. How should I handle larger screens?"

Options:
- Center content with max-width
- Scale proportionally
- Different layout

**Never assume - always ask first.**

---

## Fonts

- **Gruppo** - Display font (desktop 768px+)
- **Work Sans** - Body font (all sizes)

Loaded via Google Fonts CDN in `layout/theme.liquid`

---

## DO ✓ / DON'T ✗

### DO ✓
- Use vanilla CSS in separate files (`assets/css/`)
- Use BEM naming convention
- Use Alpine.js for interactivity
- Use CSS variables from design system
- Ask before adding new CSS variables
- Test all breakpoints
- Manual test first
- Link CSS file in section

### DON'T ✗
- Use inline styles (except dynamic values)
- Use "custom-" prefix anywhere
- Touch core theme files
- Hardcode colors/spacing/fonts
- Skip manual testing
- Push to live without unpublished test
- Forget to link CSS file
