---
trigger: model_decision
description: workflow of building this project
---

# Complete Development Workflow

**Direct Liquid Development - No Prototype Phase**

---

## Phase 0: Design Extraction & Asset Collection

### Step 1: Extract Figma Design

1. Receive Figma file/URL from client
2. Use Figma MCP to extract:
   - Design context (layout, spacing, colors, typography)
   - Variable definitions (design tokens)
   - Screenshots for visual reference
3. Save documentation to `docs/sections/[section-name]/` (create folder if needed)
4. Document design specifications in markdown

**Output:**
- Figma screenshots saved (if needed)
- Design tokens documented
- Understanding of layout and requirements

---

### Step 2: Identify & Request Assets

**See:** [03-ASSET-MANAGEMENT.md](./03-ASSET-MANAGEMENT.md) for details

1. Analyze Figma design for ALL required assets
2. Create asset checklist using template
3. Send checklist to user
4. **WAIT for all assets**
5. **DO NOT PROCEED** without assets

**Output:**
- Asset checklist sent to user
- All assets received and verified

---

### Step 3: Verify & Organize Assets

1. Verify all assets provided
2. Check quality (format, dimensions, optimization)
3. Upload directly to:
   - Theme assets: `assets/` folder (for direct uploads - rare)
   - Section settings: Use image_picker/video_url (preferred - 95% of cases)
4. Confirm ready to build

**Output:**
- Assets verified
- Upload strategy confirmed
- Ready for development

---

## Phase 1: Direct Liquid Development

### Step 1: Create Section File

```bash
# Create Liquid file
sections/[name].liquid
```

**Create CSS file:** `assets/section-[name].css` for section styles

---

### Step 2: Build Liquid Section

1. **Create section schema** with settings:
   - Image pickers for images
   - Video URL for videos
   - Text/richtext for content
   - Color settings
   - Blocks (if needed)

2. **Write Liquid markup:**
   - Use BEM class naming convention
   - Add Alpine.js directives for interactivity
   - Reference section settings
   - Use Shopify filters for assets
   - Keep logic minimal

3. **Styling approach:**
   ```liquid
   <!-- BEM class names -->
   <div class="section-hero">
     <h1 class="section-hero__title">{{ section.settings.title }}</h1>
   </div>
   ```
   
   **CSS file:** `assets/css/section-hero.css`
   ```css
   .section-hero {
     display: flex;
     align-items: center;
     gap: var(--gap-lg);
     padding: var(--spacing-xl);
     background: var(--color-primary);
     color: var(--color-text-inverse);
   }
   
   .section-hero__title {
     font-size: var(--heading-h1-size);
     font-weight: var(--font-weight-bold);
   }
   ```

4. **Interactivity approach:**
   ```liquid
   <!-- Alpine.js for interactions -->
   <div x-data="{ open: false }">
     <button @click="open = !open">Toggle</button>
     <div x-show="open" x-transition>Content</div>
   </div>
   ```

5. **Asset handling:**
   - Images: `{{ section.settings.image | image_url }}`
   - Videos: `{{ section.settings.video_url | video_tag }}`
   - Inline SVG: Copy directly into Liquid
   - Fonts: Google Fonts (Gruppo + Work Sans)

**See:** [04-LIQUID-DEVELOPMENT.md](./04-LIQUID-DEVELOPMENT.md) for detailed standards

---

### Step 3: Style with Vanilla CSS

1. **Create CSS file:** `assets/css/[section-name].css`
   - Use BEM naming convention
   - Use CSS variables from design system
   - Desktop-first responsive approach

2. **CSS structure:**
   ```css
   /* Desktop styles (1440px) - Base */
   .section-name {
     padding: var(--spacing-xl);
     background: var(--color-bg-primary);
   }
   
   /* Tablet (1024px) */
   @media (max-width: 1024px) {
     .section-name {
       padding: var(--spacing-lg);
     }
   }
   
   /* Mobile (700px) */
   @media (max-width: 700px) {
     .section-name {
       padding: var(--spacing-md);
     }
   }
   ```

3. **Desktop-first breakpoints:**
   - Base: 1440px
   - Tablet: `@media (max-width: 1024px)`
   - Mobile: `@media (max-width: 700px)`
   - Small: `@media (max-width: 412px)`

4. **Never touch core theme files**

5. **Link CSS in section:**
   ```liquid
   {{ 'section-[name].css' | asset_url | stylesheet_tag }}
   ```

**See:** [05-CSS-STANDARDS.md](./05-CSS-STANDARDS.md) for details

---

### Step 4: Add Interactivity with Alpine.js

1. **Use Alpine.js directives** in Liquid markup
   - State: `x-data="{ open: false }"`
   - Events: `@click="open = !open"`
   - Visibility: `x-show="open"`
   - Transitions: `x-transition`

2. **For complex components:**
   ```liquid
   <script>
   Alpine.data('componentName', () => ({
     // Component logic
   }));
   </script>
   ```

3. **Handle errors gracefully** with try/catch

4. **Use console.log for debugging** (with TODO comments)

**See:** [06-JAVASCRIPT-STANDARDS.md](./06-JAVASCRIPT-STANDARDS.md) for details

---

### Step 5: Test Locally with Shopify CLI

```bash
# Start dev server
shopify theme dev

# Open in browser
# http://localhost:9292

# Test:
# - Desktop (1440px)
# - Tablet (1024px)
# - Mobile (700px)
# - Small Mobile (412px)
# - All interactions
# - Section settings in theme editor
# - CSS file loads correctly
```

**Verify:**
- CSS file linked in section
- Layout matches Figma
- All interactions work
- Responsive on all breakpoints
- No console errors
- Section settings work in theme customizer

---

## Phase 2: Testing & Debugging

**Primary approach: Manual testing**

### Manual Testing Checklist

- [ ] Test on Chrome, Firefox, Safari
- [ ] Test all breakpoints (1440px, 1024px, 700px, 412px)
- [ ] Test all interactions (clicks, hovers, toggles)
- [ ] Test in theme editor (add/remove/configure section)
- [ ] No console errors
- [ ] No layout breaking
- [ ] Core theme unaffected
- [ ] CSS file loads correctly

---

### If Manual Testing Fails:

**Frontend/Layout Issues:**
1. AI writes debug HTML/markup showing structure
2. Human inspects in browser DevTools
3. Human provides feedback to AI
4. AI adjusts code

**JavaScript Issues:**
1. AI adds console.log statements with TODO comments
2. AI tells human which console logs to check
3. Human provides console output to AI
4. AI fixes based on output

**If Above Debugging Fails:**
- Human says "test it" → AI uses MCP testing tools
- **Playwright testing is BACKUP ONLY** for rare/complex cases

**See:** [07-TESTING.md](./07-TESTING.md) for automated testing details

---

## Phase 3: Code Review & Quality Check

### Code Quality

- [ ] BEM naming convention used
- [ ] Alpine.js used for interactivity
- [ ] CSS in separate file (assets/section-[name].css)
- [ ] File naming conventions followed
- [ ] No core theme files modified
- [ ] CSS variables used (no hardcoded values)
- [ ] No console.log without TODO comments (or removed)
- [ ] Comments added for complex logic
- [ ] Code is DRY (Don't Repeat Yourself)
- [ ] CSS file linked in section

### Performance

- [ ] Images optimized
- [ ] CSS file minified (if needed)
- [ ] Alpine.js loaded from CDN
- [ ] No unused code

---

## Phase 4: Deployment

### Step 1: Final Manual Test

```bash
# Test in dev server
shopify theme dev

# Manual verification checklist complete
```

---

### Step 2: Git Commit

```bash
# Add section file and CSS
git add sections/[name].liquid
git add assets/section-[name].css

# Add documentation if created
git add docs/sections/[name]/

# Add any direct asset uploads (if used)
git add assets/

# Commit with clear message
git commit -m "[Feature] Add [name] section with vanilla CSS + Alpine.js"
```

**See:** [09-GIT-WORKFLOW.md](./09-GIT-WORKFLOW.md) for commit standards

---

### Step 3: Push to Unpublished Theme

```bash
# Push to Shopify
shopify theme push --unpublished
```

**Test on unpublished theme before going live.**

---

### Step 4: Final Manual Testing

- [ ] Test on actual Shopify theme
- [ ] Test with real products/collections/data
- [ ] Test in theme editor
- [ ] Test all breakpoints
- [ ] Get client approval (if needed)

---

### Step 5: Push to Live

```bash
# Only after approval and all tests pass
shopify theme push --theme [live-theme-id]
```

---

## Summary Checklist

Before marking section as complete:

**Phase 0:**
- [ ] Figma design extracted
- [ ] All assets collected and strategy confirmed

**Phase 1:**
- [ ] Liquid file created: `sections/[name].liquid`
- [ ] CSS file created: `assets/section-[name].css`
- [ ] BEM naming convention used
- [ ] Alpine.js used for interactivity
- [ ] CSS file linked in section
- [ ] Local testing done with `shopify theme dev`
- [ ] Section works in theme editor

**Phase 2:**
- [ ] Manual testing checklist complete
- [ ] All breakpoints tested (1440px, 1024px, 700px, 412px)
- [ ] No console errors
- [ ] Matches Figma design

**Phase 3:**
- [ ] Code quality verified
- [ ] CSS variables used (no hardcoded values)
- [ ] Performance checked

**Phase 4:**
- [ ] Git commit complete
- [ ] Pushed to unpublished theme
- [ ] Final testing done
- [ ] Live deployment (when approved)
