---
trigger: model_decision
description: how to test code - manual-first approach
---

# Testing Strategy

**Manual testing is primary. Automated testing is backup only.**

---

## Primary Testing Approach: Manual

All sections MUST be tested manually in the Shopify dev environment.

### Step 1: Compile & Start Dev Server

```bash
# Compile Tailwind CSS
npm run tw

# Start Shopify dev server
shopify theme dev

# Opens at http://localhost:9292
```

---

### Step 2: Manual Testing Checklist

**Test in browser (Chrome recommended):**

#### Layout & Visual
- [ ] Layout matches Figma design
- [ ] All text content displays correctly
- [ ] Images load and display properly
- [ ] Spacing and alignment correct
- [ ] Colors match design system
- [ ] Typography matches (Gruppo + Work Sans)

#### Responsive Design (All Breakpoints)
- [ ] **Desktop (1440px):** Base design looks perfect
- [ ] **Tablet (1024px):** Layout adjusts correctly
- [ ] **Mobile (700px):** Mobile layout works
- [ ] **Small Mobile (412px):** Fine-tuned for small screens
- [ ] No horizontal scrolling on any breakpoint
- [ ] Text remains readable on all sizes

#### Interactivity (If Applicable)
- [ ] Buttons clickable and responsive
- [ ] Hover states work correctly
- [ ] Alpine.js interactions function (toggles, modals, etc.)
- [ ] Forms submit correctly
- [ ] Animations smooth (GSAP if used)
- [ ] No JavaScript errors in console

#### Theme Editor
- [ ] Section appears in theme customizer
- [ ] All settings visible and editable
- [ ] Changes reflect immediately in preview
- [ ] Image uploads work (if using image_picker)
- [ ] Text changes update live
- [ ] Section can be added/removed without errors

#### Performance & Quality
- [ ] Page loads quickly
- [ ] No console errors
- [ ] No broken images
- [ ] Tailwind styles compiled (`npm run tw`)
- [ ] Empty divs render (contain `&nbsp;`)

#### Browser Compatibility
- [ ] Test on Chrome
- [ ] Test on Firefox (optional but recommended)
- [ ] Test on Safari (optional but recommended)

---

## If Manual Testing Fails: Debugging Phase

### Frontend/Layout Issues

**When things don't look right visually:**

1. **AI provides debug markup:**
   ```liquid
   <!-- DEBUG: Show structure -->
   <div class="border-2 border-red-500">
     <p>Container width: Check if this is full width</p>
     <p>Padding: Check spacing here</p>
   </div>
   ```

2. **Human inspects in browser DevTools:**
   - Right-click → Inspect Element
   - Check computed styles
   - Check element dimensions
   - Check for CSS conflicts

3. **Human provides feedback:**
   - "The padding is 10px but should be 20px"
   - "The container is only 800px wide instead of 1440px"
   - "The text color is #333 instead of #000"

4. **AI adjusts code** based on feedback

---

### JavaScript/Interaction Issues

**When Alpine.js or interactions don't work:**

1. **AI adds console.log statements:**
   ```liquid
   <div x-data="{
     open: false,
     toggle() {
       // TODO: Debug - Check if this function is called
       console.log('Toggle called, current state:', this.open);
       this.open = !this.open;
       // TODO: Debug - Check new state
       console.log('New state:', this.open);
     }
   }">
   ```

2. **AI tells human which logs to check:**
   - "Open browser console (F12)"
   - "Click the toggle button"
   - "Check if you see 'Toggle called' in console"
   - "Tell me what the state values are"

3. **Human provides console output:**
   - "I see 'Toggle called, current state: false'"
   - "But the state isn't changing to true"
   - "I get an error: Cannot read property 'open' of undefined"

4. **AI fixes based on console output**

---

## If Debugging Fails: Automated Testing (RARE)

**Only use when:**
- Manual testing repeatedly fails
- Debugging with console.log fails
- Human explicitly says "test it" or "run automated tests"
- Complex visual regression needed

### Playwright via MCP (Backup Only)

**When human says "test it":**

1. **AI uses MCP tools** to run Playwright tests
2. **Playwright performs:**
   - Visual regression testing
   - Interaction testing
   - Responsive testing
   - Screenshot comparison

3. **AI reports results** to human
4. **AI fixes issues** based on test failures

---

## Testing Infrastructure (If Needed)

**Only set up if using automated testing:**

### Playwright Setup

**Install:**
```bash
npm install -D @playwright/test
```

**Config:** `playwright.config.js`
```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:9292',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { viewport: { width: 1440, height: 900 } },
    },
  ],
});
```

**Test example:** `tests/section-name.spec.js`
```javascript
import { test, expect } from '@playwright/test';

test.describe('Section Name', () => {
  test('visual regression - desktop', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('.section-name')).toHaveScreenshot();
  });

  test('interaction - toggle works', async ({ page }) => {
    await page.goto('/');
    await page.click('.toggle-button');
    await expect(page.locator('.menu')).toBeVisible();
  });
});
```

**Run tests:**
```bash
npx playwright test
```

---

## Testing Workflow Summary

```
1. Manual Testing (Always)
   ↓
2. If issues found:
   ├─ Frontend issue → AI provides debug markup
   ├─ JS issue → AI adds console.log
   └─ Human provides feedback
   ↓
3. AI fixes code
   ↓
4. Repeat manual testing
   ↓
5. If still failing AND human says "test it":
   └─ Use Playwright via MCP (rare)
```

---

## Best Practices

### For AI:
- ✓ Always start with manual testing instructions
- ✓ Provide debug markup/console.log when asked
- ✓ Explain clearly what to check in DevTools/console
- ✓ Only use Playwright when human explicitly requests it
- ✗ Don't automatically write Playwright tests
- ✗ Don't suggest automated testing first

### For Human:
- ✓ Test thoroughly in browser first
- ✓ Open DevTools to inspect elements
- ✓ Check console for errors
- ✓ Provide specific feedback (not just "it doesn't work")
- ✓ Test all breakpoints
- ✗ Don't skip manual testing
- ✗ Don't expect automated tests by default

---

## Debugging Checklist

### Before Asking AI for Help:

- [ ] Ran `npm run tw` to compile Tailwind
- [ ] Cleared browser cache
- [ ] Checked browser console for errors
- [ ] Tested on correct URL (http://localhost:9292)
- [ ] Inspected element in DevTools
- [ ] Tried different browser

### When Reporting Issues to AI:

- Describe what you expected
- Describe what actually happened
- Include error messages (if any)
- Include console output (if JS issue)
- Include screenshot (if visual issue)
- Specify which breakpoint has the issue

---

## Common Issues & Solutions

### Tailwind Styles Not Showing
**Symptom:** Classes like `p-lg` or `text-h1` don't work

**Solution:**
```bash
# Compile Tailwind
npm run tw

# Refresh browser
```

### Alpine.js Not Working
**Symptom:** `x-data`, `x-show` directives don't work

**Check:**
1. Alpine.js loaded in `layout/theme.liquid`
2. Console for JavaScript errors
3. Syntax correct in `x-data`

**Debug:**
```liquid
<div x-data="{ test: true }">
  <p x-show="test">If you see this, Alpine works</p>
</div>
```

### Section Not Appearing in Theme Editor
**Symptom:** Can't find section in customizer

**Check:**
1. Schema has `presets` defined
2. Section file in `sections/` folder
3. Liquid syntax valid (no errors)
4. Shopify dev server running

### Images Not Loading
**Symptom:** Broken image icons

**Check:**
1. Image uploaded via section settings
2. Using `image_url` filter correctly
3. Placeholder SVG as fallback
4. Image path correct

---

## Final Testing Checklist

Before marking section complete:

- [ ] All manual testing checklist items passed
- [ ] No console errors
- [ ] Works on all breakpoints (1440px, 1024px, 700px, 412px)
- [ ] Matches Figma design
- [ ] Theme editor settings work
- [ ] Performance is good (fast load)
- [ ] Code is clean (no debug markup/console.log)
- [ ] Ready for deployment
