---
trigger: model_decision
description: How to extract designs from figma
---

# Design Extraction from Figma

**Use Figma MCP to extract design specifications before development.**

---

## Process

### Step 1: Receive Figma File

Get from client:
- Figma file URL or direct access
- Specific frame/page to extract
- Any design system documentation

---

### Step 2: Extract with Figma MCP

**What to extract:**
1. **Design context:**
   - Layout structure
   - Spacing/padding values
   - Color palette
   - Typography (font families, sizes, weights)
   - Component hierarchy

2. **Screenshots:**
   - Desktop view (1440px)
   - Tablet view (1024px)
   - Mobile view (700px)
   - Small mobile view (412px)
   - Hover states
   - Active states
   - Any animations/transitions

3. **Design tokens:**
   - Colors (hex codes)
   - Font families and weights
   - Spacing scale
   - Border radius values
   - Shadow values
   - Transition durations

---

### Step 3: Save Documentation

**Folder structure:**
```
docs/sections/[section-name]/
└── design-analysis.md (optional - only if complex)
```

**When to create documentation:**
- Complex sections requiring detailed notes
- Unique design patterns not covered by standards
- If unsure, ask user first

**Screenshots:** Generally not needed - Figma MCP provides access

---

### Step 4: Document Design Tokens (If Needed)

**File:** `docs/sections/[section-name]/design-analysis.md`

**Template:**
```markdown
# [Section Name] - Design Analysis

## Colors
- Primary: #000000 (Black)
- Secondary: #FFFFFF (White)
- Accent: #FE7F2D (Orange)

## Typography
- Font Display: Gruppo (desktop 768px+)
- Font Body: Work Sans
- Heading Size: 48px / 3rem
- Body Size: 16px / 1rem
- Line Height: 1.5

## Spacing
- Section Padding: 80px (desktop), 40px (mobile)
- Element Margin: 24px
- Grid Gap: 16px

## Layout
- Max Width: 1440px
- Container Padding: 40px (desktop), 20px (mobile)
- Grid: 4 cols (desktop), 3 cols (tablet), 2 cols (mobile), 1 col (small)

## Breakpoints Used
- Desktop: 1440px (base)
- Tablet: 1024px
- Mobile: 700px
- Small Mobile: 412px

## Components
- Button Height: 48px
- Input Height: 56px
- Border Radius: 4px

## Transitions
- Base: 300ms
- Fast: 150ms
- Slow: 500ms
```

---

## Design Analysis

### Questions to Answer

Before starting development, analyze:

1. **Responsiveness:**
   - How does layout change on mobile?
   - Are there tablet-specific designs?
   - Any elements that hide/show on different screens?

2. **Interactions:**
   - Hover effects?
   - Click animations?
   - Transitions?
   - Scroll effects?

3. **Dynamic Content:**
   - Will this use Shopify products/collections?
   - How many items shown?
   - Is content repeating (blocks)?

4. **Assets Needed:**
   - Custom fonts?
   - Images/videos?
   - Icons?
   - SVG graphics?

---

## Common Design Patterns

### Hero Sections
- Background image/video
- Text overlay
- CTA buttons
- Full viewport height or fixed height?

### Product Cards
- Image aspect ratio
- Title/price layout
- Badge positioning
- Hover effects

### Navigation
- Sticky header?
- Mega menu?
- Mobile hamburger menu?
- Search bar?

### Forms
- Input styles
- Button styles
- Validation states
- Error messages

---

## Design Red Flags

**Watch out for:**
- ❌ Designs wider than 1440px (ask user how to handle)
- ❌ Custom fonts not provided (project uses Gruppo + Work Sans)
- ❌ Images/videos not available
- ❌ Unclear hover/active states
- ❌ Missing mobile designs (700px and 412px)
- ❌ Complex animations (may need GSAP)
- ❌ Unrealistic content amounts (text overflow issues)

**Ask user for clarification on any red flags.**

---

## Output Checklist

Before moving to asset collection:

- [ ] Figma design analyzed via Figma MCP
- [ ] Design tokens understood (or documented if complex)
- [ ] Layout structure understood
- [ ] Interactions identified (Alpine.js or GSAP)
- [ ] Dynamic content requirements clear
- [ ] Asset requirements list created
- [ ] Design red flags addressed
- [ ] All breakpoints designed (1440px, 1024px, 700px, 412px)
