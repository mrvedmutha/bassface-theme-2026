---
trigger: model_decision
description: how to name and follow folder structure of this project
---

# Naming Conventions

**Consistent file naming for Bassface Theme 2026 using Tailwind + Alpine.js**

---

## Liquid Files

### Sections
```
sections/[name].liquid
```

**Examples:**
- `header.liquid`
- `hero.liquid`
- `product-grid.liquid`

### Snippets
```
snippets/[name].liquid
```

**Examples:**
- `product-card.liquid`
- `testimonial.liquid`
- `newsletter.liquid`
- `css-variables.liquid`

### Blocks
```
blocks/[name].liquid
```

**Examples:**
- `feature.liquid`
- `text.liquid`
- `image-text.liquid`

---

## CSS & JavaScript

### NO Separate CSS/JS Files

**Use Tailwind utilities + Alpine.js directly in Liquid**

### Exception: Shared Utilities (Rare)
```
assets/utils.js      # Only if complex shared logic needed
```

---

## Documentation Files

### Format
```
docs/[category]/[name]/[file].md
```

**Examples:**
- `docs/sections/hero/design-analysis.md`
- `docs/sections/product-grid/implementation-notes.md`
- `docs/components/cart/specifications.md`

**Guidelines:**
- Ask human before creating documentation
- Only create for complex sections/components
- Don't create for every section

---

## BEM-like Class Names (For Custom Components)

**Primary:** Use Tailwind utilities (80%)
**Secondary:** BEM-like classes for complex custom components (20%)

### Format
```css
.component-name                      /* Block */
.component-name__element             /* Element */
.component-name--modifier            /* Modifier */
.component-name__element--modifier   /* Element + Modifier */
```

**Examples:**
```css
/* NO "custom-" prefix */
.header
.header__logo
.header__nav
.header--sticky
.header__nav-item--active

.product-card
.product-card__image
.product-card__title
.product-card--featured
```

---

## Alpine.js Naming

### Component Data (x-data)
```javascript
// camelCase for properties
x-data="{
  isOpen: false,
  cartCount: 0,
  selectedVariant: null
}"
```

### Functions in Alpine
```javascript
// camelCase, verb-first
x-data="{
  toggleMenu() { },
  addToCart() { },
  updateQuantity() { }
}"
```

### Extracted Alpine Components
```javascript
// camelCase for component name
Alpine.data('productCard', () => ({ ... }));
Alpine.data('mobileMenu', () => ({ ... }));
```

---

## Schema IDs (Liquid)

### Format
```
snake_case
```

**Examples:**
```json
{
  "id": "background_image",
  "id": "heading_text",
  "id": "show_arrows",
  "id": "products_to_show",
  "id": "cta_button_text"
}
```

---

## Git Branches (if using)

### Format
```
[type]/[description]
```

**Examples:**
- `feature/header-section`
- `fix/mobile-menu-overflow`
- `refactor/tailwind-utilities`
- `docs/add-design-notes`

---

## Git Commit Messages

### Format
```
[Type] Description
```

**Types:**
- `[Feature]` - New section/snippet/functionality
- `[Fix]` - Bug fixes
- `[Style]` - CSS/design changes (Tailwind updates)
- `[Refactor]` - Code restructuring
- `[Docs]` - Documentation updates
- `[Setup]` - Project setup/config

**Examples:**
- `[Feature] Add header section with Alpine.js mobile menu`
- `[Fix] Resolve mobile menu overflow issue`
- `[Style] Update product card with Tailwind utilities`
- `[Refactor] Convert vanilla JS to Alpine.js`
- `[Docs] Add hero section design analysis`

---

## Quick Reference

| Type | Pattern | Example |
|------|---------|---------|
| Section (Liquid) | `[name].liquid` | `header.liquid` |
| Snippet (Liquid) | `[name].liquid` | `product-card.liquid` |
| Block (Liquid) | `[name].liquid` | `feature.liquid` |
| Documentation | `docs/[category]/[name]/` | `docs/sections/hero/` |
| BEM Block | `.[name]` | `.header` |
| BEM Element | `.[block]__[element]` | `.header__logo` |
| BEM Modifier | `.[block]--[modifier]` | `.header--sticky` |
| Alpine Data | `camelCase` | `isOpen` |
| Alpine Function | `verbCamelCase` | `toggleMenu` |
| Schema ID | `snake_case` | `background_image` |
| Git Commit | `[Type] Description` | `[Feature] Add header` |

---

## File Structure Summary

```
bassface-theme-2026/
├── sections/
│   ├── header.liquid
│   ├── hero.liquid
│   └── product-grid.liquid
├── snippets/
│   ├── product-card.liquid
│   ├── css-variables.liquid
│   └── testimonial.liquid
├── blocks/
│   ├── text.liquid
│   └── group.liquid
├── assets/
│   ├── tailwind-output.css
│   ├── critical.css
│   └── (direct uploads if needed)
├── docs/ (optional documentation)
│   └── sections/
│       └── hero/
│           └── design-analysis.md
└── layout/
    └── theme.liquid
```

---

## Naming Guidelines

### DO ✓
- Use kebab-case for file names (`product-grid.liquid`)
- Use BEM-like for custom component classes (`.product-card__image`)
- Use camelCase for Alpine.js properties (`isOpen`)
- Use snake_case for schema IDs (`background_image`)
- Keep names descriptive and clear

### DON'T ✗
- Don't use "custom-" prefix anywhere
- Don't create separate CSS/JS files (use Tailwind + Alpine)
- Don't create documentation for every section
- Don't mix naming conventions
- Don't use abbreviated names (`prod` instead of `product`)