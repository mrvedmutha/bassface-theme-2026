# Analyze Figma Design

## Description
Analyzes Figma designs and provides comprehensive observations about structure, design system, components, and implementation recommendations for Shopify theme development.

## Usage
```
/analyze-figma [figma-url-or-node-id]
```

## Instructions

You are analyzing a Figma design for Shopify theme implementation. Follow this process:

### 1. Connect and Read Figma File
- Use Figma MCP to access the provided file/node
- Read the complete structure and hierarchy
- Examine all frames, components, and layers

### 2. Extract Design System
Identify and document:
- **Colors**: All color values used (hex/RGB)
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Padding, margins, gaps (from auto-layout)
- **Border Radius**: Rounded corner values
- **Shadows**: Shadow styles and values
- **Effects**: Any other visual effects

### 3. Analyze Component Structure
For each major component:
- Name and purpose
- Frame/layer hierarchy
- Auto-layout configuration (direction, spacing, padding)
- Constraints and responsive behavior
- Component variants (if any)
- States (default, hover, active, etc.)
- Content structure (static vs. dynamic)

### 4. Layout Analysis
Document:
- Grid system (columns, gutters, margins)
- Breakpoint indicators
- Alignment patterns
- Spacing patterns and consistency
- Container widths and max-widths

### 5. Interactive Elements
Identify:
- Buttons and CTAs
- Forms and inputs
- Navigation elements
- Accordions/tabs/toggles
- Hover/focus states
- Animations or transitions noted

### 6. Content Structure
Map out:
- Heading hierarchy (h1-h6)
- Text content blocks
- Image placements and aspect ratios
- Icon usage
- Dynamic content areas (for Shopify data)

### 7. Provide Observations
Write a comprehensive report including:

#### Design System Summary
List all extracted tokens organized by category

#### Component Inventory
Table of components to build:
| Component | Type | Complexity | Notes |
|-----------|------|------------|-------|
| Header | Section | Medium | Sticky nav, logo, menu |
| ... | ... | ... | ... |

#### Implementation Recommendations
- Which components should be Sections vs. Snippets
- Reusable patterns to extract
- Schema settings to add
- Responsive strategy
- Technical considerations

#### Questions & Clarifications
- Any ambiguities in the design
- Missing states or breakpoints
- Assumptions being made
- Clarifications needed from user

### 8. Output Format
Provide your analysis in clear markdown format with:
- Headings for each section
- Code blocks for extracted CSS variables
- Tables for component inventory
- Bullet points for observations
- Callouts for important notes

## Example Output Structure

```markdown
# Figma Design Analysis

## Design System Tokens

### Colors
- Primary: #1A73E8
- Secondary: #34A853
- ...

### Typography
- Heading Font: Inter
- Body Font: Inter
- H1: 48px/1.2, Bold
- ...

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- ...

## Component Breakdown

### Hero Section
- **Type**: Section
- **Structure**: Container > Heading + Text + CTA Button
- **Layout**: Centered, max-width 1200px
- **Responsive**: Stacks vertically on mobile
- **Notes**: Background image with overlay

[Continue for all components...]

## Implementation Plan

1. Update CSS variables in snippets/css-variables.liquid
2. Create sections: hero, features, testimonials
3. Create snippets: button, card, icon
4. ...

## Questions
1. Should the header be sticky on scroll?
2. What's the mobile breakpoint?
...
```

## Notes
- Be thorough and systematic
- Extract exact values when possible
- Note patterns and consistency
- Flag any design system inconsistencies
- Think about merchant flexibility
- Consider Shopify's section/block architecture
