# Header Sidebar - Implementation Overview

**Focus**: Technical Architecture, Snippet Strategy, and Logic.

## Architecture

My approach relies on **Snippets** for modularity. Since the sidebar is complex and responsive, we will strictly avoid large monolithic Liquid files.

### 1. File Structure

- `snippets/header-sidebar.liquid`: The main controller file. Contains the outer drawer markup, Alpine.js state initialization, and structural layout grids.
- `snippets/sidebar-menu-list.liquid`: Renders the standardized navigation lists (Main Menu, Utility Menu). Accepts a `linklist` handle as a parameter.
- `snippets/sidebar-feature-row.liquid`: Renders the "Featured Collection" rows (Image + Title).
- `snippets/sidebar-feature-grid.liquid`: Renders the 3x3 Product/Collection grid.
- `assets/section-header-sidebar.css`: Dedicated BEM stylesheet.

### 2. Integration

- The `header-sidebar` snippet will be included in `sections/header.liquid` (or `layout/theme.liquid` if global scope is needed).
- **Data Source**: We will use the **Header Section Settings** to populate data:
  - `section.settings.menu`: For main navigation.
  - `section.settings.utility_menu`: For secondary links.
  - `section.blocks`: For Featured Collections (using a Block type `sidebar_collection`).

### 3. CSS Strategy (BEM + Responsive)

We write standard CSS in `assets/section-header-sidebar.css`.

```css
/* block */
.sidebar-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-100%); /* Initial State */
  z-index: 900;
}

/* responsive modifier example */
@media screen and (min-width: 1440px) {
  .sidebar-drawer__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

### 4. JavaScript Logic (Alpine + GSAP)

We use Alpine.js for the "Source of Truth" (is the drawer open?) and GSAP for the heavy visual lifting.

**Alpine Store:**

```javascript
// In global theme.js or header.js
document.addEventListener("alpine:init", () => {
  Alpine.store("sidebar", {
    open: false,
    toggle() {
      this.open = !this.open;
      if (this.open) animateOpen();
      else animateClose();
    },
  });
});
```

**GSAP Functions:**

- `animateOpen()`: Selects `.sidebar-drawer` and tweens `x: 0`. Then selects `.sidebar-drawer__item` and tweens `autoAlpha: 1, y: 0` with `stagger: 0.1`.
- `animateClose()`: Selects `.sidebar-drawer` and tweens `y: -100%`. OnComplete: Resets `x: -100%` and `y: 0` instantly for the next open.

### 5. Development Checklist

1.  Setup `header-sidebar` snippet structure.
2.  Define CSS Grid for Desktop vs Flex Column for Mobile.
3.  Implement basic Alpine Toggle.
4.  Implement GSAP "Door" Open Animation.
5.  Implement GSAP "Vertical" Close Animation.
6.  Populate Content using Snippets.
7.  Verify Typography (Gruppo vs Work Sans).
