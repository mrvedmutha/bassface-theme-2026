# Sync Design Tokens from Figma

## Description
Extracts design tokens from Figma (colors, typography, spacing, etc.) and synchronizes them with the Shopify theme's CSS variables file, ensuring design system consistency.

## Usage
```
/sync-tokens
```

## Instructions

You are synchronizing design tokens from Figma to the Shopify theme. Follow this process:

### 1. Extract Tokens from Figma

Use Figma MCP to extract all design tokens:

**Colors:**
- All color styles defined in Figma
- Color names and hex values
- Organize by category (brand, neutral, semantic)

**Typography:**
- Font families used
- Font sizes for headings and body
- Font weights
- Line heights
- Letter spacing (if defined)

**Spacing:**
- Spacing values from auto-layout
- Padding values
- Gap values
- Identify spacing scale pattern

**Effects:**
- Border radius values
- Shadow definitions
- Border styles and widths

**Grid System:**
- Column count
- Gutter width
- Margin values
- Container widths

### 2. Organize Tokens

Group tokens into categories:

```javascript
{
  colors: {
    brand: { primary: '#...', secondary: '#...', ... },
    neutral: { text: '#...', background: '#...', ... },
    semantic: { success: '#...', error: '#...', ... }
  },
  typography: {
    fontFamily: { heading: '...', body: '...' },
    fontSize: { h1: '...', h2: '...', base: '...' },
    fontWeight: { normal: 400, bold: 700, ... },
    lineHeight: { tight: 1.2, normal: 1.5, ... }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    // ... full scale
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    // ...
  },
  shadows: {
    sm: '...',
    md: '...',
    // ...
  }
}
```

### 3. Read Current CSS Variables

Read `snippets/css-variables.liquid` to understand:
- Current token structure
- Existing values
- What needs to be updated
- What needs to be added

### 4. Generate Updated CSS Variables

Create a complete CSS variables file with:

**Structure:**
```liquid
{% comment %}
  CSS Variables / Design Tokens

  This file contains all design system tokens extracted from Figma.
  Last synced: [DATE]
  Figma file: [FILE NAME/URL]
{% endcomment %}

{%- style -%}
  :root {
    /* ===================================
       COLORS
       =================================== */

    /* Brand Colors */
    --color-primary: #1A73E8;
    --color-primary-dark: #1557B0;
    --color-primary-light: #4A90E2;
    --color-secondary: #34A853;
    --color-accent: #FBBC04;

    /* Neutral Colors */
    --color-black: #000000;
    --color-white: #FFFFFF;
    --color-gray-50: #F9FAFB;
    --color-gray-100: #F3F4F6;
    --color-gray-200: #E5E7EB;
    --color-gray-300: #D1D5DB;
    --color-gray-400: #9CA3AF;
    --color-gray-500: #6B7280;
    --color-gray-600: #4B5563;
    --color-gray-700: #374151;
    --color-gray-800: #1F2937;
    --color-gray-900: #111827;

    /* Text Colors */
    --color-text: var(--color-gray-900);
    --color-text-secondary: var(--color-gray-700);
    --color-text-muted: var(--color-gray-500);

    /* Background Colors */
    --color-background: var(--color-white);
    --color-background-secondary: var(--color-gray-50);
    --color-background-tertiary: var(--color-gray-100);

    /* Border Colors */
    --color-border: var(--color-gray-200);
    --color-border-dark: var(--color-gray-300);

    /* Semantic Colors */
    --color-success: #10B981;
    --color-success-light: #D1FAE5;
    --color-warning: #F59E0B;
    --color-warning-light: #FEF3C7;
    --color-error: #EF4444;
    --color-error-light: #FEE2E2;
    --color-info: #3B82F6;
    --color-info-light: #DBEAFE;

    /* ===================================
       TYPOGRAPHY
       =================================== */

    /* Font Families */
    --font-heading: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

    /* Font Sizes */
    --font-size-xs: 0.75rem;    /* 12px */
    --font-size-sm: 0.875rem;   /* 14px */
    --font-size-base: 1rem;     /* 16px */
    --font-size-lg: 1.125rem;   /* 18px */
    --font-size-xl: 1.25rem;    /* 20px */
    --font-size-2xl: 1.5rem;    /* 24px */
    --font-size-3xl: 1.875rem;  /* 30px */
    --font-size-4xl: 2.25rem;   /* 36px */
    --font-size-5xl: 3rem;      /* 48px */

    /* Heading Sizes */
    --font-size-h1: var(--font-size-5xl);
    --font-size-h2: var(--font-size-4xl);
    --font-size-h3: var(--font-size-3xl);
    --font-size-h4: var(--font-size-2xl);
    --font-size-h5: var(--font-size-xl);
    --font-size-h6: var(--font-size-lg);

    /* Font Weights */
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;

    /* Line Heights */
    --line-height-tight: 1.2;
    --line-height-snug: 1.375;
    --line-height-normal: 1.5;
    --line-height-relaxed: 1.75;
    --line-height-loose: 2;

    /* Letter Spacing */
    --letter-spacing-tight: -0.025em;
    --letter-spacing-normal: 0;
    --letter-spacing-wide: 0.025em;

    /* ===================================
       SPACING
       =================================== */

    --spacing-0: 0;
    --spacing-xs: 0.25rem;   /* 4px */
    --spacing-sm: 0.5rem;    /* 8px */
    --spacing-md: 1rem;      /* 16px */
    --spacing-lg: 1.5rem;    /* 24px */
    --spacing-xl: 2rem;      /* 32px */
    --spacing-2xl: 3rem;     /* 48px */
    --spacing-3xl: 4rem;     /* 64px */
    --spacing-4xl: 5rem;     /* 80px */
    --spacing-5xl: 6rem;     /* 96px */

    /* Section Spacing */
    --spacing-section-vertical: var(--spacing-4xl);
    --spacing-section-horizontal: var(--spacing-md);

    /* ===================================
       LAYOUT
       =================================== */

    /* Container Widths */
    --page-width: 1440px;
    --page-width-narrow: 1200px;
    --page-width-wide: 1600px;
    --container-padding: 20px;

    /* Breakpoints (for reference in media queries) */
    --breakpoint-mobile: 480px;
    --breakpoint-tablet: 768px;
    --breakpoint-desktop: 1024px;
    --breakpoint-wide: 1440px;

    /* ===================================
       BORDERS & RADIUS
       =================================== */

    /* Border Widths */
    --border-width-thin: 1px;
    --border-width-medium: 2px;
    --border-width-thick: 4px;

    /* Border Radius */
    --border-radius-none: 0;
    --border-radius-sm: 0.25rem;   /* 4px */
    --border-radius-md: 0.5rem;    /* 8px */
    --border-radius-lg: 0.75rem;   /* 12px */
    --border-radius-xl: 1rem;      /* 16px */
    --border-radius-2xl: 1.5rem;   /* 24px */
    --border-radius-full: 9999px;

    /* ===================================
       SHADOWS
       =================================== */

    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

    /* ===================================
       Z-INDEX SCALE
       =================================== */

    --z-index-dropdown: 1000;
    --z-index-sticky: 1020;
    --z-index-fixed: 1030;
    --z-index-modal-backdrop: 1040;
    --z-index-modal: 1050;
    --z-index-popover: 1060;
    --z-index-tooltip: 1070;

    /* ===================================
       TRANSITIONS
       =================================== */

    --transition-fast: 150ms;
    --transition-base: 250ms;
    --transition-slow: 350ms;
    --transition-timing: cubic-bezier(0.4, 0, 0.2, 1);

    /* ===================================
       ACCESSIBILITY
       =================================== */

    --touch-target-min: 44px;
    --focus-outline-width: 2px;
    --focus-outline-offset: 2px;
    --focus-outline-color: var(--color-primary);
  }

  /* ===================================
     RESPONSIVE ADJUSTMENTS
     =================================== */

  @media (max-width: 768px) {
    :root {
      /* Adjust spacing for mobile */
      --spacing-section-vertical: var(--spacing-3xl);
      --spacing-section-horizontal: var(--spacing-sm);

      /* Adjust typography for mobile */
      --font-size-h1: var(--font-size-4xl);
      --font-size-h2: var(--font-size-3xl);
      --font-size-h3: var(--font-size-2xl);
    }
  }
{%- endstyle -%}
```

### 5. Update CSS Variables File

Write the updated CSS variables to `snippets/css-variables.liquid`:
- Preserve any custom additions
- Update extracted values
- Add new tokens
- Remove deprecated tokens (with confirmation)
- Add timestamp and Figma reference

### 6. Update Design System Documentation

Update `.claude/context/design-system.md`:
- Add new token categories
- Update token values
- Document any changes
- Add usage notes for new tokens

### 7. Generate Sync Report

Provide a detailed report:

```markdown
# Design Token Sync Report

## Summary
- **Date**: [YYYY-MM-DD]
- **Figma File**: [Name/URL]
- **Tokens Added**: X
- **Tokens Updated**: Y
- **Tokens Removed**: Z

## Changes

### New Tokens
- `--color-accent`: #FBBC04
- `--spacing-5xl`: 96px
- ...

### Updated Tokens
- `--color-primary`: #1A73E8 (was #0066CC)
- `--font-size-h1`: 3rem (was 2.5rem)
- ...

### Removed Tokens
- `--old-token-name`: No longer in Figma
- ...

## Token Categories

### Colors
- Brand: 5 colors
- Neutral: 11 grays
- Semantic: 4 colors
- Total: 20 color tokens

### Typography
- Font families: 2
- Font sizes: 9 base + 6 heading
- Font weights: 6
- Line heights: 5
- Total: 28 typography tokens

### Spacing
- Scale: 10 values
- Section: 2 values
- Total: 12 spacing tokens

### Layout
- Widths: 4
- Breakpoints: 4
- Total: 8 layout tokens

### Borders
- Widths: 3
- Radius: 7
- Total: 10 border tokens

### Shadows
- 5 shadow values

### Z-Index
- 7 layer values

### Transitions
- 4 timing values

## Next Steps

1. Test components with new tokens
2. Update any hardcoded values to use new tokens
3. Review responsive adjustments
4. Test across breakpoints

## Components to Review
- [List any components that might be affected by changes]

## Notes
- [Any special notes about the sync]
- [Breaking changes or deprecations]
```

### 8. Validation

After syncing:
- Ensure valid CSS syntax
- Check for duplicate definitions
- Verify token references work
- Test in browser

## Best Practices

### Token Naming
- Semantic over descriptive: `--color-primary` not `--color-blue`
- Consistent prefixes by category
- Use kebab-case
- Clear hierarchy: `--color-gray-500`

### Organization
- Group by category with comments
- Order from light to dark for colors
- Order from small to large for scales
- Keep related tokens together

### Documentation
- Comment token sources
- Note calculation logic
- Document responsive overrides
- Explain semantic mappings

### Preservation
- Keep custom tokens not in Figma
- Preserve theme-specific overrides
- Maintain backwards compatibility when possible
- Document breaking changes

## Edge Cases

### Conflicting Values
If Figma and current file have different values:
- Prefer Figma value (design is source of truth)
- Document the change
- Flag for user review if significant

### Missing Categories
If Figma is missing expected tokens:
- Keep existing tokens
- Note in report
- Ask user for clarification

### Custom Additions
If CSS file has tokens not in Figma:
- Preserve them
- Add comment indicating custom token
- Document in design-system.md

## Example Usage

After sync, components use tokens like:

```liquid
{%- style -%}
  .hero {
    background-color: var(--color-background);
    padding: var(--spacing-section-vertical) var(--spacing-section-horizontal);
  }

  .hero__title {
    font-family: var(--font-heading);
    font-size: var(--font-size-h1);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin-bottom: var(--spacing-lg);
  }
{%- endstyle -%}
```

## Notes
- Always backup before syncing
- Review changes before committing
- Test components after sync
- Update documentation
- Communicate changes to team
