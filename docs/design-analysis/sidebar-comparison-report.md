# Sidebar/Menu Typography Comparison Report
## Minas Designs vs. Bassface Theme

**Generated:** 2026-03-26
**Analysis:** Side-by-side typography comparison

---

## EXECUTIVE SUMMARY

After inspecting both sidebars, there are **significant font differences** that need to be addressed:

| Issue | Minas | Bassface | Action Needed |
|-------|-------|----------|---------------|
| **Top menu font** | Aeonik Pro 16px | Work Sans 13px | Change to Aeonik Pro |
| **Menu font size** | 16px | 13px | Increase to 16px |
| **Menu letter-spacing** | normal (0) | 0.65px | Remove letter-spacing |
| **Menu text-transform** | none | UPPERCASE | Remove uppercase |
| **Section headings** | 16px Aeonik Pro | 32px Gruppo | Reduce size, change font |
| **Section letter-spacing** | normal | 1.6px | Remove letter-spacing |
| **Category links** | Aeonik Pro 16px | Work Sans 14px | Change font, increase size |

---

## DETAILED COMPARISON

### 1. Top Menu Items (Home, Gift Card, Store Locator, Contact)

| Property | Minas Designs | Bassface Theme |
|----------|---------------|----------------|
| Font Family | **Aeonik Pro** | Work Sans |
| Font Size | **16px** | 13px |
| Font Weight | 400 | 400 |
| Line Height | normal | normal |
| Letter-Spacing | **normal (0)** | 0.65px |
| Text Transform | **none** | UPPERCASE |

**Changes Required:**
```css
/* Current (Bassface) */
font-family: "Work Sans", sans-serif;
font-size: 13px;
letter-spacing: 0.65px;
text-transform: uppercase;

/* Should be (Minas-style) */
font-family: "Aeonik Pro", sans-serif;
font-size: 16px;
letter-spacing: normal;
text-transform: none;
```

---

### 2. Section Headings (Product Categories, Collections)

| Property | Minas Designs | Bassface Theme |
|----------|---------------|----------------|
| Font Family | **Aeonik Pro** | Gruppo |
| Font Size | **16px** | 32px |
| Font Weight | 400 | 400 |
| Letter-Spacing | **normal (0)** | 1.6px |
| Text Transform | **none** | UPPERCASE |

**Key Finding:** Minas uses the **same font and size** as regular menu items - they don't make section headers larger or different. They use **Aeonik Pro 16px** throughout.

**Changes Required:**
```css
/* Current (Bassface) */
font-family: "Gruppo", sans-serif;
font-size: 32px;
letter-spacing: 1.6px;
text-transform: uppercase;

/* Should be (Minas-style) */
font-family: "Aeonik Pro", sans-serif;
font-size: 16px;
letter-spacing: normal;
text-transform: none;
```

---

### 3. Category/Collection Links

| Property | Minas Designs | Bassface Theme |
|----------|---------------|----------------|
| Font Family | **Aeonik Pro** | Work Sans |
| Font Size | **16px** | 14px |
| Font Weight | 400 | 300 |
| Letter-Spacing | normal | normal |
| Text Transform | none | none |

**Changes Required:**
```css
/* Current (Bassface) */
font-family: "Work Sans", sans-serif;
font-size: 14px;
font-weight: 300;

/* Should be (Minas-style) */
font-family: "Aeonik Pro", sans-serif;
font-size: 16px;
font-weight: 400;
```

---

### 4. Featured/Bottom Section Titles

| Property | Minas Designs | Bassface Theme |
|----------|---------------|----------------|
| Font Family | **GT America LG Extended** | Gruppo |
| Font Size | **15px** | 12px |
| Font Weight | 400 | 400 |
| Letter-Spacing | normal | 1.2px |
| Text Transform | **uppercase** | uppercase |

**Changes Required:**
```css
/* Current (Bassface) */
font-family: "Gruppo", sans-serif;
font-size: 12px;
letter-spacing: 1.2px;

/* Should be (Minas-style) */
font-family: "GT America LG Extended", sans-serif;
font-size: 15px;
letter-spacing: normal;
```

---

### 5. Featured Section Descriptions

| Property | Minas Designs | Bassface Theme |
|----------|---------------|----------------|
| Font Family | **Blacker Pro Text Book** | Work Sans |
| Font Size | **14px** | 14px |
| Font Weight | **300 (Light)** | 400 |
| Line Height | 20px | 19.6px |
| Letter-Spacing | **0.42px** | normal |
| Text Transform | none | none |

**Changes Required:**
```css
/* Current (Bassface) */
font-family: "Work Sans", sans-serif;
font-size: 14px;
font-weight: 400;
letter-spacing: normal;

/* Should be (Minas-style) */
font-family: "Blacker Pro Text Book", serif;
font-size: 14px;
font-weight: 300;
letter-spacing: 0.42px;
```

---

### 6. Featured CTA Links ("Discover the Legacy")

| Property | Minas Designs | Bassface Theme |
|----------|---------------|----------------|
| Font Family | **Aeonik Pro** | (not checked) |
| Font Size | **16px** | (not checked) |
| Font Weight | 400 | (not checked) |
| Letter-Spacing | normal | (not checked) |
| Text Transform | none | none |

---

## SUMMARY OF CSS VARIABLES NEEDED

Based on Minas sidebar, we need these new/updated CSS variables:

```css
:root {
  /* Sidebar Menu - All levels use same font/size */
  --sidebar-menu-font: "Aeonik Pro", sans-serif;
  --sidebar-menu-size: 16px;
  --sidebar-menu-weight: 400;
  --sidebar-menu-spacing: normal;

  /* Featured/Bottom Labels */
  --sidebar-label-font: "GT America LG Extended", sans-serif;
  --sidebar-label-size: 15px;
  --sidebar-label-spacing: normal;
  --sidebar-label-transform: uppercase;

  /* Featured Descriptions */
  --sidebar-desc-font: "Blacker Pro Text Book", serif;
  --sidebar-desc-size: 14px;
  --sidebar-desc-weight: 300;
  --sidebar-desc-spacing: 0.42px;
}
```

---

## FILES TO UPDATE

### 1. `assets/snippet-header-sidebar.css`

**Changes needed:**
- Remove hard-coded font-family declarations
- Update font sizes to match Minas
- Remove letter-spacing
- Remove text-transform: uppercase from menu items
- Change section heading styles to match menu items

**Specific selectors to update:**
- `.menu-modal-top-en a` - Top menu items
- `.menu-modal-main h2` - Section headings
- `.menu-modal-main a` - Category links
- Bottom CTA section styles

### 2. `snippets/css-variables.liquid`

**Add new variables:**
```css
--sidebar-font: var(--font-body);
--sidebar-size: 16px;
--sidebar-weight: var(--font-weight-normal);
```

---

## IMPLEMENTATION CHECKLIST

- [ ] Update `snippet-header-sidebar.css` with Minas font styles
- [ ] Remove hard-coded letter-spacing values
- [ ] Remove text-transform: uppercase from menu items
- [ ] Update section heading sizes (32px → 16px)
- [ ] Change section heading font (Gruppo → Aeonik Pro)
- [ ] Update featured label font (Gruppo → GT America)
- [ ] Update description font (Work Sans → Blacker Pro)
- [ ] Test on localhost:9292

---

## KEY INSIGHTS

### What Minas Does Differently:

1. **Unified typography** - Menu items, section headers, and category links all use **the same font and size** (Aeonik Pro 16px)

2. **No uppercase** - Menu items are sentence case, not uppercase

3. **No extra letter-spacing** - Uses normal spacing throughout

4. **Smaller headings** - Section headers are the same size as regular items, not larger

5. **Elegant accent font** - Uses Blacker Pro Text Book (Light) for descriptions with slight letter-spacing (0.42px)

---

## NEXT STEPS

Would you like me to:
1. **Update the `snippet-header-sidebar.css` file** with all these changes?
2. **Add the new CSS variables** to `css-variables.liquid`?
3. **Create a patch file** with all changes at once?
