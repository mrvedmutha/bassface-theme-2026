# Review Implementation Against Figma

## Description
Reviews implemented Shopify components against Figma designs to ensure pixel-perfect accuracy, responsive behavior, and adherence to design specifications.

## Usage
```
/review-implementation [component-name]
```

## Instructions

You are reviewing a Shopify component implementation against its Figma design. Follow this systematic review process:

### 1. Preparation
- Read the implemented component file(s)
- Review the original Figma design specification
- Identify what was supposed to be built
- Understand the design requirements

### 2. Visual Accuracy Review

**Layout & Structure:**
- [ ] HTML structure matches Figma frame hierarchy
- [ ] Spacing matches design specifications exactly
- [ ] Alignment is correct
- [ ] Grid/flexbox layout matches Figma auto-layout
- [ ] Container widths and max-widths are correct
- [ ] Padding and margins are accurate

**Typography:**
- [ ] Font families match design
- [ ] Font sizes are correct
- [ ] Font weights are accurate
- [ ] Line heights match specifications
- [ ] Letter spacing is correct (if specified)
- [ ] Text alignment matches design
- [ ] Heading hierarchy is proper

**Colors:**
- [ ] Text colors match Figma
- [ ] Background colors are correct
- [ ] Border colors are accurate
- [ ] All design tokens are used (no hardcoded values)
- [ ] Opacity values match

**Visual Details:**
- [ ] Border radius matches design
- [ ] Shadows are correctly implemented
- [ ] Border widths and styles are correct
- [ ] Background images/gradients are accurate
- [ ] Icons match design
- [ ] Image aspect ratios are correct

### 3. Responsive Design Review

**Breakpoints:**
- [ ] Mobile layout matches Figma mobile design
- [ ] Tablet breakpoint implemented (if designed)
- [ ] Desktop layout is correct
- [ ] Transitions between breakpoints are smooth

**Responsive Behavior:**
- [ ] Text reflows properly
- [ ] Images scale correctly
- [ ] Spacing adjusts appropriately
- [ ] Navigation adapts (hamburger menu, etc.)
- [ ] Grid columns adjust at breakpoints
- [ ] Touch targets are adequate on mobile (min 44x44px)

**Content Flexibility:**
- [ ] Handles long text gracefully
- [ ] Handles short/empty content
- [ ] Images work at different aspect ratios
- [ ] Layout doesn't break with varying content lengths

### 4. Interactive Elements Review

**States:**
- [ ] Default state matches design
- [ ] Hover states implemented
- [ ] Focus states for accessibility
- [ ] Active/pressed states
- [ ] Disabled states (if applicable)
- [ ] Loading states (if applicable)

**Functionality:**
- [ ] Links go to correct destinations
- [ ] Buttons perform intended actions
- [ ] Forms validate properly
- [ ] Interactive elements are clickable/tappable
- [ ] Animations match design (if any)

### 5. Shopify Integration Review

**Liquid Implementation:**
- [ ] Uses Shopify objects correctly (product, collection, etc.)
- [ ] Liquid syntax is clean and efficient
- [ ] Conditional logic works properly
- [ ] Filters are used appropriately
- [ ] No excessive Liquid logic in templates

**Schema:**
- [ ] All customizable elements have schema settings
- [ ] Setting types are appropriate
- [ ] Default values make sense
- [ ] Labels and descriptions are clear
- [ ] Settings are well-organized
- [ ] Blocks enable content flexibility

**Performance:**
- [ ] Images are optimized (uses image filters)
- [ ] No redundant CSS or JavaScript
- [ ] Inline styles are scoped to section
- [ ] Lazy loading implemented where beneficial

### 6. Code Quality Review

**HTML:**
- [ ] Semantic HTML5 elements used
- [ ] Proper nesting and structure
- [ ] No unnecessary divs
- [ ] Clean, readable markup

**CSS:**
- [ ] Uses CSS variables for design tokens
- [ ] No hardcoded values
- [ ] Class naming is consistent
- [ ] Styles are scoped to component
- [ ] No !important overrides (unless necessary)
- [ ] Mobile-first media queries

**Accessibility:**
- [ ] Proper heading hierarchy (h1-h6)
- [ ] Alt text for images
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG standards
- [ ] Form labels are properly associated

**Comments & Documentation:**
- [ ] Component purpose is documented
- [ ] Figma reference is noted
- [ ] Complex logic is explained
- [ ] Usage instructions for snippets

### 7. Testing Checklist

**Browser Testing:**
- Test in Chrome, Firefox, Safari
- Check for any layout issues
- Verify interactive elements work

**Device Testing:**
- Mobile (320px and up)
- Tablet (768px)
- Desktop (1024px, 1440px)

**Content Testing:**
- Long headings
- Short/missing content
- Multiple blocks (if applicable)
- Different image sizes

### 8. Generate Review Report

Provide a structured review with:

#### Summary
- Overall assessment (Pass/Needs Revision)
- Compliance percentage
- Major issues found

#### Detailed Findings

**Visual Accuracy:**
- List any discrepancies with Figma design
- Note incorrect spacing, colors, typography
- Flag missing design elements

**Responsive Issues:**
- Breakpoint problems
- Layout breaks at certain widths
- Content overflow issues

**Accessibility Concerns:**
- Missing alt text
- Poor color contrast
- Keyboard navigation issues
- Missing ARIA labels

**Code Quality Issues:**
- Hardcoded values
- Poor structure
- Missing schema settings
- Performance concerns

#### Recommendations
- Specific fixes needed
- Suggested improvements
- Best practice reminders

#### Approved Elements
- What's working well
- Correct implementations

## Example Review Report

```markdown
# Implementation Review: Hero Section

## Summary
**Status**: Needs Revision
**Compliance**: 85%
**Critical Issues**: 2
**Minor Issues**: 4

## Detailed Findings

### Visual Accuracy ✓
- [x] Layout structure matches Figma
- [x] Typography is correct
- [x] Colors use CSS variables
- [ ] **ISSUE**: Heading spacing is 32px, should be 40px (Figma spec)
- [ ] **ISSUE**: Button border-radius is 4px, should be 8px

### Responsive Design ⚠️
- [x] Mobile layout correct
- [x] Desktop layout correct
- [ ] **ISSUE**: At 768px, grid switches to 1 column but should be 2 columns
- [x] Touch targets adequate

### Interactive Elements ✓
- [x] Hover states implemented
- [x] Focus states visible
- [x] All buttons functional

### Shopify Integration ✓
- [x] Schema settings comprehensive
- [x] Uses section.settings correctly
- [x] Blocks work properly
- [ ] **MINOR**: Could add image focal point setting

### Accessibility ✓
- [x] Semantic HTML
- [x] Alt text present
- [x] Keyboard navigable
- [ ] **MINOR**: Could add aria-label to CTA for context

### Code Quality ⚠️
- [x] Clean HTML structure
- [ ] **ISSUE**: Background color is hardcoded (#ffffff), should use var(--color-background)
- [x] CSS is scoped properly
- [x] Good comments

## Recommendations

### Critical Fixes
1. Update heading margin-bottom from 32px to 40px (line 23)
2. Change button border-radius from 4px to 8px (line 45)
3. Fix tablet breakpoint grid-template-columns to 2 columns (line 67)
4. Replace hardcoded #ffffff with var(--color-background) (line 15)

### Improvements
1. Add image focal point setting to schema
2. Add aria-label to CTA button for better screen reader context

### Code Updates Needed

**In section-hero.liquid (line 15):**
```liquid
background-color: #ffffff; /* WRONG */
background-color: var(--color-background); /* CORRECT */
```

**In section-hero.liquid (line 23):**
```liquid
margin-bottom: var(--spacing-lg); /* Currently 32px, needs to be 40px */
```

## Approved Elements
- Overall structure is excellent
- Liquid logic is clean and efficient
- Schema is comprehensive
- Mobile layout is pixel-perfect
- Accessibility is strong

## Next Steps
1. Make the 4 critical fixes listed above
2. Re-test at 768px breakpoint
3. Consider adding suggested improvements
```

## Review Standards

**Pass Criteria:**
- 95%+ visual accuracy to Figma
- All responsive breakpoints work correctly
- No accessibility violations
- Clean, maintainable code
- Proper Shopify integration

**Needs Revision:**
- Visual discrepancies exist
- Responsive issues present
- Accessibility concerns
- Code quality problems
- Missing schema settings

## Notes
- Be specific with line numbers and code references
- Provide exact values for corrections
- Explain why something is wrong
- Suggest concrete solutions
- Balance critique with recognition of good work
- Prioritize critical vs. minor issues
