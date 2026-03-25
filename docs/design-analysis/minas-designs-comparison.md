# Minas Designs - Design System Analysis & Comparison Report

**Generated:** 2026-03-26
**Inspiration Site:** https://minas-designs.com/
**Your Theme:** Bassface Theme 2026

---

## EXECUTIVE SUMMARY

This report breaks down the design system of Minas Designs and compares it with your current Bassface theme implementation. The goal is to help you achieve a similar refined, luxury aesthetic.

### Key Findings:
1. **Font Families**: Minas uses **3 premium fonts** vs. your 2 fonts
2. **Typography Scale**: Minas uses **smaller, tighter fonts** with generous letter-spacing
3. **Sizing Philosophy**: Minas fonts are generally **smaller** than yours
4. **Color Palette**: Minas uses a warm off-white background (#EFEFEF)

---

## TYPOGRAPHY COMPARISON

### Font Families Used

| Purpose | Minas Designs | Your Theme |
|---------|---------------|------------|
| **Display/Headings** | GT America LG Extended (Thin 100) | Gruppo |
| **Body/UI** | Aeonik Pro (Regular 400) | Work Sans |
| **Accent/Elegant** | Blacker Pro Text Book (Light 300) | — |

### Typography Scale Comparison

#### Your Current Font Sizes:
```
Logo/Display:      24px (Gruppo)
Navigation:        12px (Gruppo)
Headings:          64px (Gruppo)
Subheadings:       24px (Work Sans)
Body:              16px (Work Sans)
Small/Captions:    10-12px (Work Sans)
```

#### Minas Font Sizes (from inspection):
```
Navigation Labels: 10-11px (GT America)
Cart/Account:      11px (Aeonik Pro)
Buttons:           11-14px (varies)
Small Text:        10-13px (GT America)
Body:              14-15px (Aeonik Pro)
Headings:          40-60px (GT America Thin)
Large Display:     60px (GT America Thin)
```

### The Key Difference: **Your fonts are 20-40% larger**

---

## DETAILED TYPOGRAPHY BREAKDOWN (Minas)

### GT America LG Extended (Display/Headings)
- **Weight:** 100 (Thin) - very light and elegant
- **Sizes Used:** 10px, 11px, 13px, 18px, 25px, 40px, 60px
- **Line Heights:** Tightly coupled (15px for 10-11px, 45px for 40px, 60px for 60px)
- **Letter Spacing:**
  - 10px: normal
  - 13px: 0.65px (generous)
  - 18px: normal
  - 25px: 1.25px (very generous)
  - 60px: 1.8px (very generous)
- **Usage:** Navigation, labels, large headlines

### Aeonik Pro (Body/UI)
- **Weight:** 400 (Regular)
- **Sizes Used:** 11px, 14px, 15px, 18px
- **Line Heights:**
  - 11px: 18px
  - 14px: 17px
  - 15px: 22px
  - 18px: 25px
- **Letter Spacing:**
  - 14px: 0.42px
  - 15px: 0.45px
- **Usage:** Cart count, body text, buttons

### Blacker Pro Text Book (Elegant Accent)
- **Weight:** 300 (Book/Light)
- **Sizes Used:** 14px, 15px
- **Line Heights:** 20px, 23px
- **Usage:** User names, elegant text details

---

## COLOR PALETTE

### Minas Colors
```
Background:    #EFEFEF (warm off-white, NOT pure white)
Text:          #000000 (pure black)
Links:         #000000
Red Accent:    (observed in UI elements)
```

### Your Theme
```
Background:    (check your setting)
Text:          #000000
Orange Accent: #ff6b35
```

---

## SPACING SYSTEM (Minas)

### Margin/Padding Classes Observed:
```
mb-5:   5px
mb-10:  10px
mb-15:  15px
mb-20:  20px
mb-30:  30px
mb-40:  40px
mt-5:   5px
mt-10:  10px
mt-20:  20px
mt-30:  30px
mt-40:  40px
mt-50:  50px
mt-60:  60px
```

**Pattern:** 5px base unit, incrementing by 5-10px

---

## RECOMMENDATIONS FOR YOUR THEME

### 1. Font Changes (Priority: HIGH)

Since you've already downloaded the fonts, here's how to implement them:

#### Option A: Match Minas Exactly
```css
/* Replace your current fonts with Minas' fonts */
--font-display: "GT America LG Extended", sans-serif;
--font-body: "Aeonik Pro", sans-serif;
--font-accent: "Blacker Pro Text Book", serif;
```

#### Option B: Keep Your Fonts, Adjust Sizing
If you want to keep **Gruppo** and **Work Sans**, adjust sizes:

```css
/* REDUCED FONT SIZES to match Minas proportions */
:root {
  /* Navigation - was 12px */
  --font-size-nav: 10px;

  /* Small/captions - was 10-12px */
  --font-size-xs: 9px;
  --font-size-sm: 10px;

  /* Body - was 16px */
  --font-size-body: 14px;

  /* Subheadings - was 24px */
  --font-size-subheading: 18px;

  /* Large headings - was 64px */
  --font-size-display: 50px;
}
```

### 2. Letter-Spacing Adjustments

Minas uses **generous letter-spacing** for larger text:

```css
/* Add to your typography */
.text-display {
  letter-spacing: 0.05em;  /* For large headings */
}

.text-heading {
  letter-spacing: 0.03em;  /* For medium headings */
}

.text-label {
  letter-spacing: 0.1em;   /* For navigation, buttons */
}
```

### 3. Line Height Adjustments

Minas uses **tighter line heights**:

```css
/* Current vs Recommended */
/* Current: line-height: 1.5 (too loose) */
/* Recommended: */
body {
  line-height: 1.4;  /* Tighter for body */
}

h1, h2, h3 {
  line-height: 1.1;  /* Much tighter for headings */
}
```

### 4. Background Color

Consider adding warmth:

```css
:root {
  --bg-color: #EFEFEF;  /* Warm off-white like Minas */
}
```

---

## SPECIFIC FILE RECOMMENDATIONS

### assets/section-header.css

**Changes needed:**
```css
/* Line 74-76: Reduce nav text size */
.section-header__search-text,
.section-header__account-text {
  font-size: 10px;  /* was 12px */
  letter-spacing: 0.15em;  /* add more spacing */
}

/* Line 110: Reduce logo size */
.section-header__logo-text {
  font-size: 18px;  /* was 24px */
}
```

### assets/component-button.css

**Changes needed:**
```css
/* Line 128-130: Reduce button text */
.btn--xs .btn__text {
  font-size: 10px;  /* was 12px */
}

.btn--sm .btn__text {
  font-size: 11px;  /* was 12px */
}

.btn--md .btn__text {
  font-size: 14px;  /* was 16px */
}

.btn--lg .btn__text {
  font-size: 20px;  /* was 24px */
}
```

---

## IMPLEMENTATION CHECKLIST

- [ ] **Add Minas fonts** to theme if using them
  - Upload GT America LG Extended
  - Upload Aeonik Pro
  - Upload Blacker Pro Text Book
  - Update CSS variables

- [ ] **OR reduce font sizes** across all files
  - Navigation: 12px → 10px
  - Body: 16px → 14px
  - Headings: reduce by ~20%

- [ ] **Add letter-spacing** to labels and navigation
  - Small text: 0.1em
  - Medium text: 0.05em
  - Large text: 0.03em

- [ ] **Tighten line heights**
  - Body: 1.5 → 1.4
  - Headings: 1.2-1.3 → 1.1

- [ ] **Consider background color change**
  - Try #EFEFEF for warmth

---

## FONT FILE REFERENCES (Minas)

If you want to use their exact fonts, here are the URLs they use:

```
Aeonik Pro Regular:
/wp-content/themes/minas-shop/public/dist/fonts/Aeonik%20Pro%20Regular/AeonikPro-Regular.woff2

Aeonik Pro Medium:
/wp-content/themes/minas-shop/public/dist/fonts/Aeonik%20Pro%20Medium/AeonikPro-Medium.woff2

Blacker Pro Text Book:
/wp-content/themes/minas-shop/public/dist/fonts/Blacker%20Pro%20Text%20Book/Blacker-Pro-Text-Book.woff2

GT America LG Extended Regular:
/wp-content/themes/minas-shop/public/dist/fonts/GT%20America/GT-America-LG-Extended-Regular.woff2

GT America LG Extended Thin:
/wp-content/themes/minas-shop/public/dist/fonts/GT%20America/GT-America-LG-Extended-Thin.woff2
```

---

## NEXT STEPS

Would you like me to:

1. **Create a CSS patch file** with all the font size adjustments?
2. **Help you implement the Minas fonts** in your theme?
3. **Generate a typography component** that matches their style?
4. **Create a design token system** based on their spacing?

Let me know which direction you'd like to go!
