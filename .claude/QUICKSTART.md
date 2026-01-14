# Quick Start Guide - Figma to Shopify Workflow

## Initial Setup

### 1. Configure Figma MCP
You mentioned you'll configure the Figma MCP locally. Once configured, Claude will have access to:
- Read Figma file structure
- Extract design tokens
- Analyze components
- Get text content and styles

### 2. Verify Installation
All context files and skills are now set up in `.claude/` directory.

## Your Workflow

### Phase 1: Design Discovery

**Step 1: Start a new feature conversation**
```
Hey Claude, I need to build [feature name] from Figma.
Here's the Figma link: [URL or node ID]
```

**Step 2: Run Figma analysis**
```
/analyze-figma [figma-url-or-node-id]
```

**What Claude will do:**
- Connect to Figma via MCP
- Read all frames and components
- Extract design system tokens (colors, typography, spacing)
- Analyze component structure and hierarchy
- Document layout patterns
- Provide implementation recommendations
- List questions and clarifications

**Step 3: Review analysis and provide context**
- Review Claude's observations
- Answer any questions
- Provide additional context, screenshots, notes
- Clarify design decisions or edge cases

**Step 4: Sync design tokens (optional)**
```
/sync-tokens
```

**What this does:**
- Extracts all design tokens from Figma
- Updates `snippets/css-variables.liquid`
- Documents tokens in `.claude/context/design-system.md`
- Provides sync report

### Phase 2: Development

**Step 1: Build first component**
```
/build-component [component-name]
```

Example:
```
/build-component hero-section
```

**What Claude will do:**
- Determine if it should be a Section or Snippet
- Create the file with proper structure
- Implement HTML matching Figma hierarchy
- Add CSS using design tokens
- Create Shopify schema for customization
- Make it responsive
- Ensure accessibility

**Step 2: Review implementation**
```
/review-implementation [component-name]
```

**What Claude checks:**
- Visual accuracy against Figma
- Responsive behavior
- Accessibility compliance
- Code quality
- Shopify integration
- Provides detailed report with fixes needed

**Step 3: Iterate**
- Apply fixes based on review
- Re-review until approved
- Move to next component

## Typical Conversation Flow

```
YOU: Hey Claude, I need to build the homepage hero section.
     Here's the Figma: https://figma.com/file/xxx/Homepage?node-id=123

     /analyze-figma https://figma.com/file/xxx/Homepage?node-id=123

CLAUDE: [Analyzes Figma design]

        # Figma Design Analysis

        ## Design System Tokens
        ### Colors
        - Primary: #1A73E8
        - Background: #FFFFFF
        ...

        ## Component Breakdown
        ### Hero Section
        - Type: Section
        - Structure: Full-width background + Centered content
        - Elements: Heading, Subheading, CTA Button, Background Image
        ...

        ## Questions
        1. Should the hero be full viewport height or fixed height?
        2. Is the background image static or should merchants be able to change it?

YOU: 1. Full viewport height on desktop, auto on mobile
     2. Merchants should be able to change it via theme customizer

     Also, the CTA button should support two variants - primary and secondary

CLAUDE: Got it! Let me build this component.

        /build-component hero-section

        [Creates section with proper implementation]

        I've created `sections/hero-section.liquid` with:
        - Full viewport height on desktop (auto on mobile)
        - Customizable background image via schema
        - Two button variants in schema
        - Responsive design
        - Accessibility features

        Ready for review!

YOU: /review-implementation hero-section

CLAUDE: [Provides detailed review]

        # Implementation Review: Hero Section

        ## Summary
        Status: Needs Minor Revision
        Compliance: 95%

        ## Issues Found
        1. Heading spacing is 32px, should be 40px
        2. Button hover transition should be 250ms, currently 150ms

        ## Approved Elements
        - Layout structure perfect
        - Responsive behavior excellent
        - Schema comprehensive
        ...

YOU: Please fix those issues

CLAUDE: [Makes fixes]

        Fixed both issues:
        1. Updated heading margin-bottom to 40px
        2. Changed button transition to 250ms

        Ready for final review!

YOU: /review-implementation hero-section

CLAUDE: # Implementation Review: Hero Section

        ## Summary
        Status: ✓ APPROVED
        Compliance: 100%

        All issues resolved. Component is pixel-perfect and ready for use!
```

## Common Commands

```bash
# Analyze Figma design
/analyze-figma [url-or-node-id]

# Sync design tokens from Figma
/sync-tokens

# Build a component
/build-component [name]

# Review implementation
/review-implementation [name]
```

## Tips for Best Results

### When Providing Figma Links
- Provide direct links to specific frames/components when possible
- Include node IDs for precision
- Share entire file URL if building multiple components

### During Analysis Phase
- Review the analysis thoroughly
- Answer all questions Claude asks
- Provide screenshots for complex interactions
- Share any design system documentation
- Clarify mobile vs desktop behavior

### During Development Phase
- Build one component at a time
- Always review before moving to next component
- Test in Shopify theme preview
- Iterate based on review feedback

### Communication
- Be specific about requirements
- Mention edge cases upfront
- Share content examples
- Clarify merchant customization needs
- Indicate any Shopify-specific behavior needed

## File Locations

**Components built will be in:**
- `sections/` - Major page sections
- `snippets/` - Reusable UI components
- `blocks/` - Content blocks for sections

**Design system:**
- `snippets/css-variables.liquid` - All design tokens
- `.claude/context/design-system.md` - Token documentation

**Context files:**
- `.claude/context/shopify-theme.md` - Theme architecture
- `.claude/context/workflow.md` - This workflow
- `.claude/context/design-system.md` - Design tokens

## Next Steps

1. Configure your Figma MCP locally
2. Share your first Figma design with Claude
3. Run `/analyze-figma` to start the workflow
4. Build and iterate on components
5. Enjoy pixel-perfect Shopify theme development!

## Need Help?

- Read `.claude/README.md` for detailed documentation
- Check individual skill files in `.claude/skills/`
- Review context files in `.claude/context/`
- Ask Claude questions anytime during the process

---

Happy building!
