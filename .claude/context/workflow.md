# Figma-to-Shopify Development Workflow

## Overview
This document outlines the workflow for building Shopify theme components from Figma designs.

## Workflow Phases

### Phase 1: Design Analysis & Discovery

**Inputs:**
- Figma file URL or node ID
- User context and notes
- Screenshots (if provided)
- Design specifications

**Process:**
1. Connect to Figma file via MCP
2. Read and analyze Figma nodes:
   - Component structure
   - Frame hierarchy
   - Auto-layout properties
   - Design tokens (colors, typography, spacing)
   - Component variants and states
3. Extract design system elements:
   - Color palette
   - Typography scale
   - Spacing system
   - Border radius values
   - Shadow styles
   - Grid/layout system
4. Document observations:
   - Component breakdown
   - Responsive behavior indicators
   - Interactive elements
   - Content structure
   - Reusability patterns

**Outputs:**
- Design system documentation
- Component inventory
- Technical observations
- Implementation recommendations
- Questions/clarifications for user

### Phase 2: Development

**Inputs:**
- Approved design analysis
- Design system tokens
- Component specifications

**Process:**
1. **Setup Design Tokens**
   - Update `snippets/css-variables.liquid` with colors, fonts, spacing
   - Create utility classes if needed

2. **Build Components**
   - Create Shopify sections for major components
   - Create snippets for reusable elements
   - Implement Liquid schema for customization
   - Add blocks for flexible content

3. **Responsive Implementation**
   - Mobile-first approach
   - Use CSS Grid/Flexbox matching Figma auto-layout
   - Implement breakpoints based on design

4. **Integration**
   - Connect to Shopify data objects (product, collection, etc.)
   - Add language strings to locales
   - Test with real/dummy data

5. **Quality Assurance**
   - Visual comparison with Figma
   - Responsive testing
   - Accessibility audit
   - Performance check

**Outputs:**
- Liquid template files
- Updated CSS variables
- Schema definitions
- Locale strings
- Implementation notes

## Communication Protocol

### When Analyzing Figma Designs
Provide:
- **Structure Overview**: Component hierarchy and organization
- **Design Tokens**: Colors, typography, spacing extracted
- **Layout Analysis**: Grid system, alignment, spacing patterns
- **Component Breakdown**: List of sections, snippets needed
- **Observations**: Notable patterns, interactions, design decisions
- **Recommendations**: Suggested implementation approach
- **Questions**: Any ambiguities or clarifications needed

### During Development
- Show progress on component implementation
- Highlight any deviations from design (with rationale)
- Request feedback on technical decisions
- Flag blockers or challenges

## Best Practices

### Figma Analysis
- Look for component instances vs. unique designs
- Identify design system patterns
- Note responsive behavior clues (constraints, auto-layout)
- Check for component variants (hover, active states)
- Document content structure for dynamic data

### Shopify Implementation
- Match design tokens exactly
- Use semantic HTML
- Keep Liquid logic minimal and readable
- Make components customizable via schema
- Support merchant content flexibility
- Ensure accessibility (ARIA labels, keyboard navigation)
- Optimize for performance

## Tools & Resources

### Figma MCP Capabilities
- Read file structure
- Extract component properties
- Get style definitions
- Access design tokens
- Read text content and hierarchy

### Shopify Development
- Shopify CLI for local development
- Theme Check for linting
- Liquid syntax for templating
- Schema for merchant customization
