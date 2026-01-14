---
trigger: model_decision
description: How to write shopify liquid code
---

# Liquid Development Standards

**Direct Liquid development - build once, no prototype conversion.**

---

## File Creation

### Section File
```
sections/[name].liquid
```

**Examples:** `header.liquid`, `hero.liquid`, `product-grid.liquid`

**CSS file:** `assets/section-[name].css` - separate stylesheet

**See:** [08-NAMING-CONVENTIONS.md](./08-NAMING-CONVENTIONS.md)

---

## Section Structure

### Basic Section with Vanilla CSS
```liquid
{{ 'section-name.css' | asset_url | stylesheet_tag }}

<div class="section-name">
  <h1 class="section-name__heading">{{ section.settings.heading }}</h1>
  <p class="section-name__description">{{ section.settings.description }}</p>
</div>

{% schema %}
{
  "name": "Section Name",
  "settings": [
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
  ],
  "presets": [
    {
      "name": "Section Name"
    }
  ]
}
{% endschema %}
```

**CSS file:** `assets/section-name.css`
```css
.section-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-lg);
  padding: var(--spacing-xl);
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.section-name__heading {
  font-size: var(--heading-h1-size);
  font-weight: var(--font-weight-bold);
}

.section-name__description {
  font-size: var(--body-size);
  color: var(--color-text-secondary);
}

@media (max-width: 700px) {
  .section-name {
    padding: var(--spacing-md);
  }
}
```

### Section with Custom Styles
```liquid
{{ 'section-hero.css' | asset_url | stylesheet_tag }}

<div class="hero">
  <div class="hero__content">
    <!-- Content -->
  </div>
</div>

{% schema %}
{
  "name": "Hero Section",
  "settings": [...]
}
{% endschema %}
```

**CSS file:** `assets/section-hero.css`
```css
.hero {
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
}
```

### Section with Alpine.js Interactivity
```liquid
{{ 'section-navigation.css' | asset_url | stylesheet_tag }}

<div x-data="{ open: false }" class="navigation">
  <button @click="open = !open" class="navigation__toggle">
    Toggle Menu
  </button>

  <nav x-show="open" x-transition class="navigation__menu">
    <!-- Navigation items -->
  </nav>
</div>

{% schema %}
{
  "name": "Navigation",
  "settings": [...]
}
{% endschema %}
```

---

## Empty Div Elements - Critical Rule

**Shopify hides completely empty div elements in the theme editor.**

### ❌ INCORRECT (Will not render):
```liquid
<div class="border-line"></div>
<div class="spacer"></div>
<div class="divider"></div>
```

### ✅ CORRECT (Will render):
```liquid
<div class="border-line">&nbsp;</div>
<div class="spacer">&nbsp;</div>
<div class="divider">&nbsp;</div>
```

**Rule:** Always include `&nbsp;` (non-breaking space) inside empty divs used for:
- Borders/lines
- Spacers
- Dividers
- Decorative elements
- Any purely CSS-styled element with no content

### Example Use Cases:
```liquid
<!-- Horizontal border line -->
<div class="section-header__border-top">&nbsp;</div>

<!-- Vertical divider -->
<div class="section-content__divider">&nbsp;</div>

<!-- Decorative spacer -->
<div class="section-hero__spacer">&nbsp;</div>

<!-- Background overlay -->
<div class="section-hero__overlay">&nbsp;</div>
```

---

## Schema Settings - Common Types

### Image Picker
```json
{
  "type": "image_picker",
  "id": "image",
  "label": "Image"
}
```

Usage:
```liquid
{% if section.settings.image %}
  <img src="{{ section.settings.image | image_url: width: 1920 }}" alt="{{ section.settings.image.alt }}">
{% else %}
  {{ 'hero' | placeholder_svg_tag: 'placeholder-svg' }}
{% endif %}
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

Usage:
```liquid
{% if section.settings.video %}
  {{ section.settings.video | video_tag: autoplay: true, loop: true, muted: true }}
{% endif %}
```

### Text & Richtext
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

Usage:
```liquid
<h2>{{ section.settings.heading }}</h2>
<div>{{ section.settings.description }}</div>
```

### Color
```json
{
  "type": "color",
  "id": "background_color",
  "label": "Background Color",
  "default": "#ffffff"
}
```

Usage:
```liquid
<div style="background-color: {{ section.settings.background_color }}">
```

### Range
```json
{
  "type": "range",
  "id": "padding",
  "label": "Padding",
  "min": 0,
  "max": 100,
  "step": 10,
  "unit": "px",
  "default": 40
}
```

Usage:
```liquid
<div style="padding: {{ section.settings.padding }}px">
```

### Select
```json
{
  "type": "select",
  "id": "layout",
  "label": "Layout",
  "options": [
    { "value": "left", "label": "Left" },
    { "value": "center", "label": "Center" },
    { "value": "right", "label": "Right" }
  ],
  "default": "center"
}
```

Usage:
```liquid
<div class="section-[name]--{{ section.settings.layout }}">
```

### Checkbox
```json
{
  "type": "checkbox",
  "id": "show_arrows",
  "label": "Show Navigation Arrows",
  "default": true
}
```

Usage:
```liquid
{% if section.settings.show_arrows %}
  <button class="arrow-prev">←</button>
  <button class="arrow-next">→</button>
{% endif %}
```

---

## Blocks (Repeatable Content)
```liquid
{% schema %}
{
  "name": "Product Grid",
  "blocks": [
    {
      "type": "product",
      "name": "Product",
      "settings": [
        {
          "type": "product",
          "id": "product",
          "label": "Product"
        }
      ]
    }
  ]
}
{% endschema %}

{% for block in section.blocks %}
  {% case block.type %}
    {% when 'product' %}
      {% assign product = block.settings.product %}
      <div class="product-card">
        <img src="{{ product.featured_image | image_url: width: 600 }}" alt="{{ product.title }}">
        <h3>{{ product.title }}</h3>
        <p>{{ product.price | money }}</p>
      </div>
  {% endcase %}
{% endfor %}
```

---

## Shopify Objects - Common Usage

### Product
```liquid
{{ product.title }}
{{ product.price | money }}
{{ product.featured_image | image_url: width: 600 }}
{{ product.description }}
{{ product.url }}
```

### Collection
```liquid
{{ collection.title }}
{{ collection.image | image_url: width: 1200 }}

{% for product in collection.products limit: 8 %}
  {{ product.title }}
{% endfor %}
```

### Cart
```liquid
{{ cart.item_count }}
{{ cart.total_price | money }}

{% for item in cart.items %}
  {{ item.product.title }}
  {{ item.quantity }}
  {{ item.line_price | money }}
{% endfor %}
```

---

## Asset Handling in Liquid

### Images from Section Settings
```liquid
{% if section.settings.image %}
  <img
    src="{{ section.settings.image | image_url: width: 1920 }}"
    srcset="{{ section.settings.image | image_url: width: 600 }} 600w,
            {{ section.settings.image | image_url: width: 1200 }} 1200w,
            {{ section.settings.image | image_url: width: 1920 }} 1920w"
    sizes="100vw"
    alt="{{ section.settings.image.alt | escape }}"
    loading="lazy"
  >
{% else %}
  {{ 'hero' | placeholder_svg_tag: 'placeholder-svg' }}
{% endif %}
```

### Inline SVG
```liquid
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M..." stroke="currentColor"/>
</svg>
```

### Background Images
```liquid
<div style="background-image: url('{{ section.settings.bg_image | image_url: width: 1920 }}');">
```

### Fonts (Google Fonts)
Add to `layout/theme.liquid` `<head>`:
```liquid
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gruppo&family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## BEM Class Naming

**Use BEM naming convention for all classes**

```liquid
<div class="section-hero">
  <div class="section-hero__content">
    <h1 class="section-hero__title">{{ section.settings.title }}</h1>
  </div>
</div>
```

**CSS file:** `assets/section-hero.css`
```css
.section-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-lg);
  padding: var(--spacing-xl);
}

.section-hero__content {
  max-width: var(--page-width);
}

.section-hero__title {
  font-family: var(--font-heading);
  font-size: var(--heading-h1-size);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}
```

**BEM pattern:**
- `.component-name` (Block)
- `.component-name__element` (Element)
- `.component-name--modifier` (Modifier)

**Examples:**
- `.header`, `.header__logo`, `.header--sticky`
- `.product-card`, `.product-card__image`, `.product-card--featured`

**See:** [05-CSS-STANDARDS.md](./05-CSS-STANDARDS.md) for complete styling guide

---

## Liquid Best Practices

### Keep Logic Minimal
```liquid
<!-- ✓ GOOD -->
{% assign show_section = true %}
{% if section.settings.image == blank %}
  {% assign show_section = false %}
{% endif %}

{% if show_section %}
  <div>...</div>
{% endif %}

<!-- ✗ BAD - Too complex -->
{% if section.settings.image != blank and section.settings.title != blank and section.blocks.size > 0 %}
  <!-- nested logic -->
{% endif %}
```

### Use Filters Correctly
```liquid
<!-- Price -->
{{ product.price | money }}

<!-- Image URL -->
{{ image | image_url: width: 600 }}

<!-- Escape text -->
{{ product.title | escape }}

<!-- Truncate -->
{{ product.description | truncate: 150 }}

<!-- Capitalize -->
{{ product.title | capitalize }}
```

### Default Values
```liquid
{% assign heading = section.settings.heading | default: "Default Heading" %}
```

### Check for Blank
```liquid
{% if section.settings.image != blank %}
  <img src="{{ section.settings.image | image_url }}">
{% endif %}
```

---

## Core Theme Protection

### NEVER Modify Core Files
```
❌ sections/header.liquid
❌ snippets/card-product.liquid
❌ assets/base.css
❌ layout/theme.liquid (unless adding global assets like fonts)
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

## Performance Tips

### Lazy Load Images
```liquid
<img
  src="{{ image | image_url: width: 1920 }}"
  loading="lazy"
  alt="{{ image.alt }}"
>
```

### Defer JavaScript
```liquid
<script src="{{ 'section-[name].js' | asset_url }}" defer></script>
```

### Minimize Liquid Loops
```liquid
<!-- Limit products rendered -->
{% for product in collection.products limit: 8 %}
  ...
{% endfor %}
```

---

## Common Patterns

### Hero Section
```liquid
<div class="section-hero" style="background-image: url('{{ section.settings.bg_image | image_url: width: 1920 }}');">
  <div class="section-hero__overlay">&nbsp;</div>
  <div class="section-hero__content">
    <h1>{{ section.settings.heading }}</h1>
    <p>{{ section.settings.subheading }}</p>
    <a href="{{ section.settings.cta_link }}" class="btn">{{ section.settings.cta_text }}</a>
  </div>
  <div class="section-hero__border-bottom">&nbsp;</div>
</div>
```

### Product Grid
```liquid
<div class="section-products">
  {% for product in section.settings.collection.products limit: section.settings.products_to_show %}
    <div class="product-card">
      <img src="{{ product.featured_image | image_url: width: 600 }}" loading="lazy">
      <h3>{{ product.title }}</h3>
      <p>{{ product.price | money }}</p>
      <a href="{{ product.url }}">View Product</a>
    </div>
  {% endfor %}
</div>
```

### Testimonial Slider (with Blocks)
```liquid
<div class="section-testimonials">
  <div class="section-testimonials__divider">&nbsp;</div>
  {% for block in section.blocks %}
    <div class="testimonial-card">
      <p>"{{ block.settings.quote }}"</p>
      <p>— {{ block.settings.author }}</p>
    </div>
  {% endfor %}
</div>
```

---

## Testing in Theme Editor

After creating section:
1. Run `npm run tw` to compile Tailwind
2. Run `shopify theme dev`
3. Open theme editor: http://localhost:9292/admin/themes/current/editor
4. Add your section
5. Test all settings (upload images, change text, toggle checkboxes, test blocks)
6. Verify changes reflect immediately
7. Check responsive views (1440px, 1024px, 700px, 412px)
8. **Verify empty divs render with `&nbsp;`**
9. Test Alpine.js interactions
10. Save and preview

---

## Checklist Before Committing

- [ ] Section schema complete with all settings
- [ ] All assets use section settings (not hardcoded paths)
- [ ] CSS file created: `assets/section-[name].css`
- [ ] BEM naming convention used
- [ ] Alpine.js used for interactivity
- [ ] **Empty divs include `&nbsp;` inside**
- [ ] CSS file linked in section
- [ ] Tested in theme editor
- [ ] Works on all breakpoints (1440px, 1024px, 700px, 412px)
- [ ] No core theme files modified
- [ ] Images use Shopify placeholders when settings are empty
- [ ] CSS variables used (no hardcoded values)
- [ ] Code is clean and readable