# Typography Guide: Grupo & Work Sans

**Last Updated:** 2026-01-14
**Project:** Bassface Theme 2026

---

## Overview

This guide explains how to use our two-font system effectively across the Shopify theme. Understanding these principles will help you make consistent design decisions about when to use each font.

### Our Font System

- **Grupo** - Display font (decorative, accent)
- **Work Sans** - Primary font (functional, versatile)

---

## Core Concept: Font Roles

Think of your fonts as having **roles** in your design system:

### Grupo = "Accent/Decoration"
- **Purpose**: Visual interest, brand personality, attention-grabbing
- **Limitation**: Only one weight (400), so it can't be bold or italic
- **Best for**: Short, impactful text that doesn't need emphasis variations
- **Think of it as**: A decorative element, like an accent color

### Work Sans = "Workhorse"
- **Purpose**: Readability, flexibility, functionality
- **Strength**: Multiple weights (300, 400, 500, 600, 700), so you can create hierarchy
- **Best for**: Everything that needs to be read comfortably
- **Think of it as**: Your reliable, versatile tool

---

## Mental Model: The "Responsive Font Swap"

### Mobile-First Thinking

**Golden Rule:**
> **"On mobile, EVERYTHING is Work Sans. On desktop, SOME things become Grupo."**

**Why?**
- Mobile screens are small → Need maximum readability → Work Sans is clearer
- Desktop screens are larger → More space for visual personality → Grupo can shine

### The Breakpoint Concept

Think of **768px** as your "personality threshold":

- **Below 768px (mobile/tablet)**: Function over form → Work Sans for everything
- **Above 768px (desktop)**: Form meets function → Grupo for decorative accents

**Why 768px?**
- Standard tablet breakpoint
- Enough screen real estate for Grupo to look good
- Small enough that mobile devices don't get Grupo

---

## Decision Framework

When designing any text element, ask yourself these questions:

```
1. Is this text SHORT (1-4 words)?
   └─ NO → Work Sans everywhere
   └─ YES → Continue...

2. Is this text FUNCTIONAL (needs to be read) or DECORATIVE (creates visual interest)?
   └─ Functional → Work Sans everywhere
   └─ Decorative → Continue...

3. Does this text need EMPHASIS (bold, semibold, italic)?
   └─ YES → Work Sans everywhere (Grupo can't do this)
   └─ NO → Continue...

4. Is there enough SPACE around it on desktop?
   └─ NO → Work Sans everywhere
   └─ YES → Use Grupo on desktop, Work Sans on mobile
```

---

## Typography Structure Layers

Think of your CSS variables as **three layers**:

### Layer 1: Font Definitions (The ingredients)
```
Display font = Grupo
Body font = Work Sans
Heading font = Work Sans (because headings need weight variations)
```

### Layer 2: Typography Scale (The measurements)
```
Font sizes: xs, sm, base, lg, xl, 2xl, 3xl... (like t-shirt sizes)
Font weights: 400, 500, 600, 700
Line heights: tight (1.2), normal (1.5), relaxed (1.75)
Letter spacing: tight, normal, wide
```

### Layer 3: Semantic Tokens (The purposes)
```
Heading sizes: h1, h2, h3, h4, h5, h6
Display sizes: display-sm, display-md, display-lg (for Grupo on desktop)
```

---

## Practical Application

### Design Thinking Process

When designing a component, walk through each text element using this process:

#### Example: Header Component

**1. Logo Text**
- Question: "Is this short? Decorative? Needs boldness?"
- Answer: Short, decorative, might need boldness
- **Decision: Work Sans Bold** (everywhere) - because you might want bold variation

**2. "Search" Label Next to Icon**
- Question: "Short? Decorative? Needs emphasis?"
- Answer: Short (1 word), decorative label, no emphasis needed
- **Decision: Work Sans on mobile, Grupo on desktop** ✓

**3. Navigation Tab Headings** ("Shop", "About", "Contact")
- Question: "Short? Decorative? Prominent?"
- Answer: Short (1 word each), decorative, creates visual interest
- **Decision: Work Sans on mobile, Grupo on desktop** ✓

**4. Dropdown Menu Items** ("Mens Clothing", "Accessories", etc.)
- Question: "Short? But many items in a list?"
- Answer: Short individually, but many together - needs readability
- **Decision: Work Sans everywhere** (consistency in lists is better)

**5. Promo Banner Text** ("Free Shipping on Orders Over $50")
- Question: "Longer text? Needs to be scanned quickly?"
- Answer: Multiple words, functional information
- **Decision: Work Sans everywhere**

---

## Rules of Thumb

### Always Use Grupo on Desktop:

- ✓ Single-word navigation labels
- ✓ Category tags
- ✓ Icon labels (like "Search")
- ✓ Tab/accordion headings
- ✓ Badge text
- ✓ Section eyebrows ("New Arrivals", "Featured")

### Always Use Work Sans (both mobile & desktop):

- ✓ Paragraphs
- ✓ Product descriptions
- ✓ H1-H6 headings (need weight variations)
- ✓ Form fields and labels
- ✓ Buttons with >2 words
- ✓ Footer text
- ✓ Breadcrumbs
- ✓ Anything that needs bold/italic

### Context Matters:

- **One "Shop" button** = Could use Grupo on desktop
- **Ten menu items** saying "Mens Tops", "Mens Bottoms", etc. = Use Work Sans (avoid visual overload)

---

## Your Mental Checklist

Before using Grupo (desktop only), verify all of these:

1. ✓ Is it 1-4 words maximum?
2. ✓ Is it decorative/accent text?
3. ✓ Does it NOT need bold/italic?
4. ✓ Is there visual breathing room around it?
5. ✓ Is it NOT in a long list of similar items?

**If all YES** → Grupo on desktop, Work Sans on mobile

**If any NO** → Work Sans everywhere

---

## CSS Implementation Pattern

### Pattern 1: Mobile-First Base

```css
/* Step 1: Set default style (Work Sans) */
.search-label {
  font-family: var(--font-body); /* Work Sans */
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
}

/* Step 2: Add desktop media query */
/* Step 3: Switch to Grupo only on desktop */
@media (min-width: 768px) {
  .search-label {
    font-family: var(--font-display); /* Grupo */
    font-weight: 400; /* Only weight available */
    font-size: var(--font-size-lg);
    letter-spacing: var(--letter-spacing-wide);
  }
}
```

### Pattern 2: Utility Classes

Create reusable classes based on **intent**, not appearance:

```css
/* Utility for display text - responsive by default */
.display-text {
  font-family: var(--font-body); /* Work Sans on mobile */
  font-weight: var(--font-weight-semibold);
}

@media (min-width: 768px) {
  .display-text {
    font-family: var(--font-display); /* Grupo on desktop */
    font-weight: 400;
    letter-spacing: var(--letter-spacing-wide);
  }
}
```

---

## Visual Decision Tree

```
Is it mobile?
├─ YES → Use Work Sans (always)
└─ NO (Desktop)
    ├─ Is it a short, prominent label? (Search, Tab heading, Category)
    │   └─ YES → Use Grupo
    └─ Is it body text, heading, or needs weight variation?
        └─ YES → Use Work Sans
```

---

## Summary Table

| Element | Mobile | Desktop | Reasoning |
|---------|--------|---------|-----------|
| Search label | Work Sans | **Grupo** | Short, prominent UI element |
| Tab headings | Work Sans | **Grupo** | Navigation emphasis |
| Category names | Work Sans | **Grupo** | Visual hierarchy |
| Product titles | Work Sans | Work Sans | Needs weight variations |
| Body text | Work Sans | Work Sans | Readability |
| Headings (H1-H6) | Work Sans | Work Sans | Needs bold/semibold |
| Form labels | Work Sans | Work Sans | Consistency |
| Navigation links | Work Sans | Work Sans | Readability |
| Icon labels (1-2 words) | Work Sans | **Grupo** | Decorative accent |
| Promo banners | Work Sans | Work Sans | Functional information |
| Footer text | Work Sans | Work Sans | Small text needs clarity |

---

## Common Mistakes to Avoid

### ❌ Using Grupo for Long Text
```
Bad: "Shop our new collection of premium headphones with amazing sound quality"
Good: Just use Work Sans
```

### ❌ Using Grupo on Mobile
```
Bad: Mobile navigation with Grupo
Good: Mobile navigation with Work Sans
```

### ❌ Using Grupo When You Need Bold
```
Bad: Product title in Grupo (can't make it bold for emphasis)
Good: Product title in Work Sans Bold
```

### ❌ Overusing Grupo on Desktop
```
Bad: Every single menu item, label, and heading in Grupo
Good: Only key navigational labels in Grupo, rest in Work Sans
```

---

## Design Best Practices

### 1. Visual Balance
- Don't use Grupo for more than 20-30% of text on any screen
- Let Work Sans be the dominant font for readability

### 2. Hierarchy Through Mixing
- Use Grupo for labels/categories
- Use Work Sans for the actual content beneath
- Example: "NEW ARRIVALS" (Grupo) → Product names below (Work Sans)

### 3. Breathing Room
- Give Grupo text plenty of white space
- Don't crowd Grupo elements together

### 4. Testing
- Always preview on both mobile and desktop
- Check readability at actual device sizes
- Ensure the font swap happens smoothly at 768px

---

## Quick Reference

### "Should I use Grupo on desktop?"

**YES if:**
- Navigation tab names
- "Search" next to search icon
- Category badges/tags
- Section labels
- Single-word CTA buttons

**NO if:**
- Product descriptions
- Any paragraph text
- Form inputs/labels
- Lists with many items
- Text that needs bold/italic
- Footer content

---

## Related Documentation

- **Design System**: `.claude/context/design-system.md`
- **CSS Variables**: `snippets/css-variables.liquid`
- **Critical CSS**: `assets/critical.css`

---

## Questions to Ask Yourself

When in doubt about which font to use:

1. "Would this look overwhelming in Grupo on a phone?" → Work Sans
2. "Does this need to be bold or italic?" → Work Sans
3. "Is this more than 4 words?" → Work Sans
4. "Is this purely decorative/label text?" → Grupo (desktop only)
5. "Does this appear in a long list?" → Work Sans

---

**Remember:** Work Sans is your default. Grupo is your accent. When in doubt, use Work Sans.
