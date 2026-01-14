# Design System & Tokens

## Overview
This document tracks the design system tokens extracted from Figma and implemented in the Shopify theme.

## CSS Variables Location
All design tokens are defined in: `snippets/css-variables.liquid`

## Design Token Categories

### Colors

#### Brand Colors
```css
--color-primary:
--color-primary-dark:
--color-primary-light:
--color-secondary:
--color-accent:
```

#### Neutral Colors
```css
--color-text:
--color-text-secondary:
--color-text-muted:
--color-background:
--color-background-secondary:
--color-border:
```

#### Semantic Colors
```css
--color-success:
--color-warning:
--color-error:
--color-info:
```

### Typography

#### Font Families
```css
--font-heading:
--font-body:
--font-mono: (if needed)
```

#### Font Sizes
```css
--font-size-xs:
--font-size-sm:
--font-size-base:
--font-size-lg:
--font-size-xl:
--font-size-2xl:
--font-size-3xl:

/* Semantic Heading Sizes */
--font-size-h1:
--font-size-h2:
--font-size-h3:
--font-size-h4:
--font-size-h5:
--font-size-h6:
```

#### Font Weights
```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

#### Line Heights
```css
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
--line-height-loose: 2;
```

### Spacing

#### Spacing Scale
```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
--spacing-4xl: 80px;
--spacing-5xl: 96px;
```

#### Section Spacing
```css
--spacing-section-vertical: 80px;
--spacing-section-horizontal: 20px;
```

### Layout

#### Container Widths
```css
--page-width: 1440px;
--page-width-narrow: 1200px;
--page-width-wide: 1600px;
--container-padding: 20px;
```

#### Breakpoints
```css
--breakpoint-mobile: 480px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1440px;
```

### Border & Radius

#### Border Widths
```css
--border-width-thin: 1px;
--border-width-medium: 2px;
--border-width-thick: 4px;
```

#### Border Radius
```css
--border-radius-none: 0;
--border-radius-sm: 4px;
--border-radius-md: 8px;
--border-radius-lg: 12px;
--border-radius-xl: 16px;
--border-radius-2xl: 24px;
--border-radius-full: 9999px;
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

### Z-Index Scale
```css
--z-index-dropdown: 1000;
--z-index-sticky: 1020;
--z-index-fixed: 1030;
--z-index-modal-backdrop: 1040;
--z-index-modal: 1050;
--z-index-popover: 1060;
--z-index-tooltip: 1070;
```

### Transitions
```css
--transition-fast: 150ms;
--transition-base: 250ms;
--transition-slow: 350ms;
--transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
```

## Usage Guidelines

### Referencing Tokens
Always use CSS variables, never hardcode values:

```liquid
{%- style -%}
  .my-component {
    /* CORRECT */
    color: var(--color-text);
    padding: var(--spacing-md);
    font-size: var(--font-size-h2);

    /* WRONG */
    color: #333333;
    padding: 16px;
    font-size: 32px;
  }
{%- endstyle -%}
```

### Responsive Typography
Use clamp() for fluid typography where appropriate:

```css
--font-size-h1: clamp(2rem, 5vw, 3rem);
```

### Theme Customization
Some tokens can be overridable via theme settings:

```liquid
--color-primary: {{ settings.color_primary | default: '#000000' }};
```

## Design System Maintenance

### When Adding New Tokens
1. Extract value from Figma
2. Add to `snippets/css-variables.liquid`
3. Document in this file
4. Use consistently across components

### Naming Conventions
- Use kebab-case
- Be semantic (--color-primary not --color-blue)
- Group by category
- Order from small to large for scales

### Token Organization
Group related tokens together in `css-variables.liquid`:

```liquid
{%- style -%}
  :root {
    /* Colors - Brand */
    --color-primary: #1A73E8;

    /* Colors - Neutral */
    --color-text: #333333;

    /* Typography - Sizes */
    --font-size-base: 16px;

    /* Spacing */
    --spacing-sm: 8px;
  }
{%- endstyle -%}
```

## Component-Specific Tokens

Some components may need specific tokens:

```css
/* Button */
--button-padding-x: var(--spacing-md);
--button-padding-y: var(--spacing-sm);
--button-font-size: var(--font-size-base);

/* Card */
--card-padding: var(--spacing-lg);
--card-border-radius: var(--border-radius-lg);
--card-shadow: var(--shadow-md);
```

## Accessibility Tokens

### Minimum Touch Targets
```css
--touch-target-min: 44px;
```

### Focus Indicators
```css
--focus-outline-width: 2px;
--focus-outline-offset: 2px;
--focus-outline-color: var(--color-primary);
```

## Notes
- Update this file when new tokens are added from Figma
- Keep tokens synchronized with Figma design
- Review tokens periodically for consistency
- Remove unused tokens to keep system clean
