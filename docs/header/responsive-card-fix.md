# Header Sidebar Responsive Card Fix

## Issue

The exclusive collection card in the header sidebar was disappearing after 1440px, leaving blank space on the right side of the sidebar between 1250px-1440px. The left content was not utilizing the full width when the card was hidden.

## Solution Implemented

### Changes Made to `assets/snippet-header-sidebar.css`

#### 1. Updated Exclusive Card Visibility (Lines 676-689)

**Before:** Card visible only at ≥1440px
**After:** Card visible at ≥1250px

```css
/* Hide on all devices except ≥1250px */
@media screen and (max-width: 1249px) {
  .sidebar-drawer__exclusive-card {
    display: none;
  }
}

/* Show only on ≥1250px */
@media screen and (min-width: 1250px) {
  .sidebar-drawer__exclusive-card {
    display: block;
  }
}
```

#### 2. Updated Grid Layout for Columns Wrapper (Lines 145-168)

Added specific media query for 1024px-1249px range to make left column full-width:

```css
/* 700px+: Two-column layout - Left content + Right card */
@media screen and (min-width: 700px) {
  .sidebar-drawer__columns-wrapper {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 60px;
  }
}

/* 1024px to 1249px: Single column (full width left, no card) */
@media screen and (min-width: 1024px) and (max-width: 1249px) {
  .sidebar-drawer__columns-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

/* 1250px+: Two-column structure with card visible */
@media screen and (min-width: 1250px) {
  .sidebar-drawer__columns-wrapper {
    grid-template-columns: 1fr 340px;
    gap: 60px;
  }
}
```

#### 3. Hide Right Column in Tablet Range (Lines 569-575)

Added media query to completely hide the right column between 1024px-1249px:

```css
/* 1024px-1249px: Hide right column completely (left takes full width) */
@media screen and (min-width: 1024px) and (max-width: 1249px) {
  .sidebar-drawer__right-column {
    display: none;
  }
}
```

## New Responsive Breakpoint Structure

### Mobile: <700px

- Two-level drawer navigation
- Text-only featured collections
- Work Sans font only
- No images or card

### Medium: 700px-1023px

- Two columns with images
- Work Sans headings
- NO exclusive card

### Tablet: 1024px-1249px

- **Single column full-width layout**
- Gruppo headings
- NO exclusive card
- Left content takes full width

### Desktop: ≥1250px

- Two columns layout
- Gruppo headings
- **Exclusive card visible**
- Left content + Right card (340px)

## Benefits

1. **Card visible longer:** The exclusive collection card now remains visible until 1250px instead of 1440px
2. **No blank space:** Between 1024px-1249px, the left column takes full width, eliminating blank space
3. **Better content organization:** Content is properly organized at all breakpoints
4. **Improved user experience:** Users see the card on more screen sizes, and content is well-utilized when card is hidden

## Files Modified

- [`assets/snippet-header-sidebar.css`](../../assets/snippet-header-sidebar.css)
