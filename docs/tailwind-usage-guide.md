# Tailwind CSS Usage Guide - Bassface Theme 2026

**Last Updated:** 2026-01-14

This guide shows how to use Tailwind CSS with our design system CSS variables.

---

## Overview

Your Tailwind CSS setup is fully integrated with the Bassface design system. All CSS variables from `css-variables.liquid` are mapped to Tailwind utilities.

### How It Works

1. **CSS Variables** (`snippets/css-variables.liquid`) - Source of truth for all design tokens
2. **Tailwind Config** (`tailwind-input.css`) - Maps variables to Tailwind utilities
3. **Generated Output** (`assets/tailwind-output.css`) - Compiled Tailwind classes
4. **Auto-rebuild** - `npm run tw` watches for changes and rebuilds automatically

---

## Color Utilities

### Brand Colors

```html
<!-- Primary: Black -->
<div class="bg-primary text-primary border-primary">

<!-- Secondary: White -->
<div class="bg-secondary text-secondary border-secondary">

<!-- Accent: Orange -->
<div class="bg-accent text-accent border-accent">
```

### Background Colors

```html
<div class="bg-bg-primary">       <!-- White background -->
<div class="bg-bg-secondary">     <!-- Light gray #EFEFEF -->
<div class="bg-bg-tertiary">      <!-- Black background -->
```

### Text Colors

```html
<p class="text-text-primary">     <!-- Black text -->
<p class="text-text-secondary">   <!-- Gray #787878 -->
<p class="text-text-tertiary">    <!-- Light gray with opacity -->
<p class="text-text-inverse">     <!-- White text -->
<p class="text-text-accent">      <!-- Orange text -->
```

### Border Colors

```html
<div class="border border-border-primary">     <!-- Black border -->
<div class="border border-border-secondary">   <!-- Light border -->
<div class="border border-border-accent">      <!-- Orange border -->
```

---

## Spacing Utilities

### Numbered Scale (4px - 62px)

```html
<!-- Using numbered spacing -->
<div class="p-1">   <!-- 4px padding -->
<div class="m-2">   <!-- 5px margin -->
<div class="gap-5"> <!-- 16px gap -->
<div class="p-10">  <!-- 40px padding -->
<div class="m-14">  <!-- 62px margin -->
```

### Semantic Spacing

```html
<!-- Using semantic names (more readable) -->
<div class="gap-micro">  <!-- 4px -->
<div class="gap-tiny">   <!-- 5px -->
<div class="gap-xs">     <!-- 8px -->
<div class="gap-sm">     <!-- 10px -->
<div class="gap-md">     <!-- 16px -->
<div class="gap-lg">     <!-- 30px -->
<div class="gap-xl">     <!-- 40px -->
```

**Recommendation:** Use semantic spacing for better code readability.

---

## Typography

### Font Families

```html
<!-- Display font (Gruppo on desktop, Work Sans on mobile) -->
<h2 class="font-display">Heading</h2>

<!-- Body font (Work Sans always) -->
<p class="font-body">Body text</p>

<!-- Heading font (Work Sans always) -->
<h3 class="font-heading">Heading</h3>
```

### Font Sizes

```html
<p class="text-2xs">  <!-- 10px -->
<p class="text-xs">   <!-- 12px -->
<p class="text-sm">   <!-- 14px -->
<p class="text-base"> <!-- 16px - Default -->
<p class="text-lg">   <!-- 18px -->
<p class="text-xl">   <!-- 20px -->
<p class="text-2xl">  <!-- 24px -->
<p class="text-3xl">  <!-- 32px -->
```

### Font Weights

```html
<p class="font-light">      <!-- 300 -->
<p class="font-normal">     <!-- 400 -->
<p class="font-medium">     <!-- 500 -->
<p class="font-semibold">   <!-- 600 -->
<p class="font-bold">       <!-- 700 -->
```

**Note:** Gruppo only supports weight 400. Use Work Sans for variable weights.

### Line Heights

```html
<p class="leading-tight">    <!-- 1.2 -->
<p class="leading-normal">   <!-- 1.5 -->
<p class="leading-relaxed">  <!-- 1.75 -->
```

### Letter Spacing

```html
<p class="tracking-tight">   <!-- -0.02em -->
<p class="tracking-normal">  <!-- 0 -->
<p class="tracking-wide">    <!-- 0.05em -->
```

---

## Custom Typography Classes

### Heading Utilities

Pre-configured heading styles with proper sizing, weight, and line-height:

```html
<h1 class="h1">Main Heading</h1>      <!-- 32px/48px, bold, tight -->
<h2 class="h2">Section Heading</h2>   <!-- 24px, semibold, tight -->
<h3 class="h3">Subsection</h3>        <!-- 20px, semibold, normal -->
<h4 class="h4">Small Heading</h4>     <!-- 18px, medium, normal -->
```

### Body Text Utilities

```html
<p class="body">Regular body text</p>      <!-- 16px, normal, relaxed -->
<p class="body-sm">Small body text</p>     <!-- 14px, normal, normal -->
```

### Display Text (Responsive Font Swap)

**Mobile:** Work Sans | **Desktop (768px+):** Gruppo

```html
<!-- Automatically swaps font on desktop -->
<h2 class="display-text display-sm">Label</h2>     <!-- 20px -->
<h2 class="display-text display-md">Heading</h2>   <!-- 24px -->
<h2 class="display-text display-lg">Hero</h2>      <!-- 32px -->
```

**When to use:**
- Navigation labels ("SEARCH", "SHOP", "CONTACT")
- Category badges
- Section eyebrows ("NEW ARRIVALS", "FEATURED")
- Product collection names

**When NOT to use:**
- Paragraphs or long text
- Anything needing bold/italic
- Lists with many items

---

## Border Radius

```html
<div class="rounded-sm">    <!-- 5px - Cards, images -->
<div class="rounded-md">    <!-- 10px - Modals -->
<div class="rounded-lg">    <!-- 16px - Large components -->
<div class="rounded-full">  <!-- Fully rounded circles -->
```

---

## Shadows

```html
<div class="shadow-sm">     <!-- Subtle shadow -->
<div class="shadow-base">   <!-- Base shadow -->
<div class="shadow-md">     <!-- Medium shadow -->
<div class="shadow-lg">     <!-- Large shadow -->
<div class="shadow-xl">     <!-- Extra large shadow -->
```

---

## Responsive Design

Use Tailwind's responsive prefixes with our breakpoints:

```html
<!-- Mobile first approach -->
<div class="text-sm md:text-lg lg:text-2xl">
  <!-- 14px on mobile, 18px on tablet, 24px on desktop -->
</div>

<!-- Font swap at 768px -->
<h2 class="font-body md:font-display">
  <!-- Work Sans on mobile, Gruppo on desktop -->
</h2>
```

### Breakpoints

- `sm:` - 640px+
- `md:` - 768px+ (font swap threshold)
- `lg:` - 1024px+
- `xl:` - 1440px+ (design width)
- `2xl:` - 1920px+

---

## Layout Utilities

### Container

```html
<!-- Respects max page width with margins -->
<div class="container-page">
  Content constrained to page width
</div>
```

### Header Height

```html
<!-- Responsive header height -->
<header class="h-header">
  <!-- 56px on mobile, 64px on desktop -->
</header>
```

---

## Transitions

```html
<button class="transition-fast">    <!-- 150ms -->
<div class="transition-base">       <!-- 250ms -->
<div class="transition-slow">       <!-- 400ms -->
```

---

## Practical Examples from Figma

### Example 1: Header (Desktop)

```html
<header class="h-header bg-transparent flex items-center justify-between px-10">
  <!-- Left: Menu + Search -->
  <div class="flex items-center gap-lg">
    <button class="text-text-inverse">
      <!-- Hamburger icon -->
    </button>
    <div class="flex items-center gap-6">
      <!-- Search icon -->
      <span class="display-text text-text-inverse">SEARCH</span>
    </div>
  </div>

  <!-- Center: Logo -->
  <div>
    <img src="logo.svg" alt="Bassface" class="h-13" />
  </div>

  <!-- Right: Login -->
  <div class="flex items-center gap-4">
    <span class="text-xs text-text-inverse font-display">LOGIN/SIGNUP</span>
  </div>
</header>
```

### Example 2: Product Card

```html
<div class="bg-bg-primary rounded-sm overflow-hidden">
  <!-- Image -->
  <div class="w-full h-20 bg-secondary rounded-sm">
    <img src="product.jpg" class="w-full h-full object-cover" />
  </div>

  <!-- Content -->
  <div class="p-4 flex flex-col gap-1">
    <p class="text-2xs text-text-secondary">Oversized T-Shirt</p>
    <p class="text-base text-text-primary font-normal">Deadmau5 T-Shirt</p>
  </div>
</div>
```

### Example 3: Category Button

```html
<button class="w-full flex items-center justify-between py-7 border-b border-border-secondary group hover:text-text-accent transition-base">
  <span class="text-sm text-text-primary font-normal">OVERSIZED T-SHIRT</span>
  <svg class="w-1.5 h-2.5 text-current">
    <!-- Arrow right icon -->
  </svg>
</button>
```

### Example 4: Search Bar Modal

```html
<div class="bg-bg-secondary rounded-md w-full max-w-[528px] overflow-hidden">
  <!-- Header -->
  <div class="flex items-center justify-between px-8 py-6 border-b border-border-primary">
    <div class="flex items-center gap-6">
      <!-- Search icon -->
      <span class="text-base text-text-tertiary font-light">SEARCH</span>
    </div>
    <button>
      <!-- Close icon -->
    </button>
  </div>

  <!-- Content -->
  <div class="p-10 md:p-13 flex flex-col gap-lg">
    <!-- Currently Trending -->
    <section>
      <h3 class="text-lg text-text-accent font-normal mb-md">CURRENTLY TRENDING</h3>
      <div class="flex flex-col gap-sm">
        <!-- Product cards -->
      </div>
    </section>

    <!-- Discover More -->
    <section>
      <h3 class="text-lg text-text-accent font-normal mb-md">DISCOVER MORE</h3>
      <!-- Category buttons -->
    </section>
  </div>
</div>
```

### Example 5: Menu Overlay (Desktop)

```html
<div class="fixed inset-0 bg-bg-secondary z-modal">
  <!-- Top Navigation -->
  <nav class="flex items-center gap-11 px-14 py-6">
    <span class="text-2xl text-text-accent font-display">HOMEPAGE</span>
    <span class="text-2xl text-text-primary font-display underline">ABOUT</span>
    <span class="text-2xl text-text-primary font-display">SHOP</span>
    <span class="text-2xl text-text-primary font-display">CONTACT</span>
  </nav>

  <!-- Content Grid -->
  <div class="grid grid-cols-3 gap-10 px-14 py-9">
    <!-- Product Categories Card -->
    <div class="flex flex-col gap-sm">
      <h2 class="text-3xl font-display">PRODUCT CATEGORIES</h2>
      <div class="grid grid-cols-2 gap-md">
        <div class="flex flex-col gap-3">
          <a href="#" class="text-base text-text-secondary underline">Regular T-Shirt</a>
          <a href="#" class="text-base text-text-accent">Oversized T-shirt</a>
          <!-- More links -->
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Best Practices

### 1. Mobile-First Approach

Always start with mobile styles, then add desktop overrides:

```html
<!-- Good -->
<div class="text-base md:text-lg lg:text-2xl">

<!-- Avoid -->
<div class="text-2xl md:text-base">
```

### 2. Use Semantic Spacing

Prefer semantic names over numbers:

```html
<!-- Good -->
<div class="gap-md p-lg">

<!-- Less clear -->
<div class="gap-5 p-9">
```

### 3. Color Consistency

Use design token colors, not arbitrary values:

```html
<!-- Good -->
<div class="bg-accent text-text-inverse">

<!-- Avoid -->
<div class="bg-[#FE7F2D] text-white">
```

### 4. Responsive Display Text

Use `.display-text` for decorative elements that swap fonts:

```html
<!-- Navigation labels, category badges -->
<span class="display-text display-md">SHOP</span>

<!-- NOT for paragraphs or long content -->
<p class="font-body text-base">This is body text...</p>
```

### 5. Combine with Custom Classes

Mix Tailwind with custom classes when needed:

```html
<h1 class="h1 text-text-accent">   <!-- Custom h1 style + accent color -->
<p class="body text-text-secondary"> <!-- Custom body style + gray text -->
```

---

## Common Patterns Quick Reference

### Card Component
```html
<div class="bg-bg-primary rounded-sm p-5 shadow-base">
```

### Button Primary
```html
<button class="bg-primary text-text-inverse px-10 py-7 rounded-sm transition-base hover:bg-accent">
```

### Button Secondary (Outlined)
```html
<button class="border border-border-primary text-text-primary px-10 py-7 rounded-sm transition-base hover:border-accent hover:text-accent">
```

### Section Container
```html
<section class="container-page py-12 md:py-14">
```

### Grid Layout (Desktop)
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md md:gap-lg">
```

### Flex Stack (Vertical)
```html
<div class="flex flex-col gap-sm md:gap-md">
```

### Flex Row (Horizontal)
```html
<div class="flex items-center gap-md">
```

---

## Debugging Tips

### 1. Check Variable Values

Open browser DevTools and inspect element to see computed CSS variable values:

```css
/* In DevTools Computed tab, look for: */
--color-accent: #FE7F2D
--gap-md: 1rem
```

### 2. Verify Tailwind Build

Make sure `npm run tw` is running and watching for changes.

### 3. Check Output File

Look at `assets/tailwind-output.css` to verify classes are generated.

### 4. Use Browser Extensions

- Tailwind CSS IntelliSense (VS Code extension)
- Tailwind DevTools (browser extension)

---

## Related Documentation

- **Typography Guide**: `docs/typography/font-usage-guide.md`
- **CSS Variables**: `snippets/css-variables.liquid`
- **Tailwind Config**: `tailwind-input.css`
- **Figma Designs**: See main README

---

## Quick Command Reference

```bash
# Build Tailwind (watch mode)
npm run tw

# Install dependencies
npm install

# Check package versions
npm list tailwindcss
```

---

**Remember:** CSS variables in `css-variables.liquid` are the source of truth. Tailwind utilities simply provide a convenient way to apply them.
