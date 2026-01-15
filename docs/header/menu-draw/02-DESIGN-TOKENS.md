# Header Sidebar - Design Tokens

**Context**: Extracted from Figma Nodes 1:2833, 1:3251, 10:1372, 12:1116, 13:1653.

## Colors

- **Background**: `#F2F2F2` (Light Gray) - _To be confirmed with core theme variables_.
- **Text Primary**: `#000000` (Black).
- **Text Hover**: `#FF4400` (Orange/Brand Color) - _Inferred standard hover state_.
- **Border/Lines**: `#E5E5E5` (Light Gray dividers between featured rows).

## Typography

### Desktop (1440px+)

- **Headings / Display**:
  - **Font Family**: `Gruppo`
  - **Weight**: Regular/Thin
  - **Case**: UPPERCASE
  - **Usage**: "PRODUCT CATEGORIES", "COLLECTIONS", "HARDWELL" (Featured Row Titles).
- **Body / Links**:
  - **Font Family**: `Work Sans`
  - **Weight**: Light / Regular
  - **Usage**: Menu items, Utility links, Contact text.

### Mobile / Tablet (<1024px)

- **All Text**:
  - **Font Family**: `Work Sans`
  - **Usage**: Replaces Gruppo completely for better legibility on smaller screens.

## Layout & Spacing (Responsive)

### Desktop (1440px Base)

- **Container**: Full screen containment.
- **Grid**: 2-Column or Flex layout (Menu Left, Features Right).
- **Featured Rows**: Distinct horizontal separators (1px solid). Image radius approx `5px`.
- **Close Icon**: Absolute Position (`top: 20px`, `right: 20px` - approx).

### Mobile (412px Base)

- **Container**: 100% Width, 100% Height.
- **Scroll**: Vertical overflow allowed.
- **Close Icon**: Block element (`20px` x `20px`), relative flow.

## Animation Tokens (GSAP)

- **Drawer Entry**:
  - `x`: `-100%` -> `0%`
  - `duration`: `0.8s` (approx, needs smooth feel)
  - `ease`: `power3.out`
- **Drawer Exit**:
  - `y`: `0%` -> `-100%` (Slides Up)
  - `duration`: `0.6s`
  - `ease`: `power2.in`
- **Stagger**:
  - `amount`: `0.1s` between items.
  - `from`: "start" (Top to bottom).
- **Icon Morph**:
  - `rotation`: `0` -> `180` (optional)
  - `path`: Morph SVG path data from Cross to Line.
