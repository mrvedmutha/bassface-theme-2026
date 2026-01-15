# Header Sidebar (Menu Draw) - Overview

**Status:** Planning
**Figma Node:** [1:2833](https://www.figma.com/design/c6czjWMBl0vC6L3SIxO6oI?node-id=1-2833), [1:3251](https://www.figma.com/design/c6czjWMBl0vC6L3SIxO6oI?node-id=1-3251), [13:1653](https://www.figma.com/design/c6czjWMBl0vC6L3SIxO6oI?node-id=13-1653)

## Objective

To build a premium, responsive "Menu Draw" (Sidebar) that serves as the primary navigation hub for the bassface theme. It must provide a high-end user experience with "wow" factor animations while remaining functional across all device sizes (Desktop to Mobile).

### ⚠️ Pre-Requisites for Developers

Before writing a single line of code for this component, you **MUST**:

1.  **Read the Figma Notes**: Thoroughly examine the verified notes below.
2.  **Visual Analysis**: Open the Figma links and take screenshots/observe the specific spacing, typography, and hierarchy.
3.  **Understand the responsiveness**: The sidebar is NOT just for mobile; it is a persistent element that adapts its layout for Desktop (1440px), Tablet (1024px), and Mobile (700px/412px).

---

## Figma Interpretation & User Notes

### 1. Unified Sidebar Strategy

- **Context**: "The sidebar exists on all the devices... The only thing that will differ is the responsiveness."
- **Desktop (1440px)**: The sidebar takes over the full screen (contained). The background is fluid. The 'X' (Close) icon remains sticky/absolute at the top right.
- **Mobile (412px)**: Full width/height. Close icon becomes a block element (20x20px).

### 2. Content Structure

- **Top**: Utility links (Contact Us, About Us).
- **Middle**:
  - **Left Column**: Product Categories (Regular T-Shirt, Oversized, etc.).
  - **Right Column (Desktop)**: Featured Collections (Hardwell, Afrojack, etc.) displayed as rows with images.
  - **Grid**: A 3x3 featured grid below the collection rows.
  - **Blog**: A highlighted blog post section.
- **Bottom**: Contact Details (Phone, Email) at the bottom right.

### 3. Typography Rules

- **Desktop**: Use **Gruppo** for display text (Headings, Collections).
- **Mobile/Tablet**: Use **Work Sans** for EVERYTHING. Do not use Gruppo on small screens to ensure readability.

### 4. Animation Vision (Critical)

- **Open Animation**:
  - **Drawer**: Slides in from **Left to Right** (Door effect).
  - **Content**: **Staggered Reveal** from **Top to Bottom**. Each element (links, cards) should fade/slide in individually, not all at once.
- **Close Animation**:
  - **Drawer**: Slides out from **Bottom to Top** (Vanishing up). It does NOT slide back to the left.
- **Icon Animation**:
  - **Interaction**: Hover (Mouse Enter/Leave).
  - **Effect**: The "X" (Cross) morphs into a "-" (Minus). The two lines merge into one. On mouse leave, they split back to an "X".

---

## Next Steps

Proceed to `02-DESIGN-TOKENS.md` to understand the specific styling values derived from these notes.
