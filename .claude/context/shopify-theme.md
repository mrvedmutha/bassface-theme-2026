# Shopify Theme Development Context

## Project: Bassface Theme 2026

This is a Shopify theme built from Figma designs, following a design-to-development workflow.

## Theme Structure

### Directories
- **assets/**: CSS, JavaScript, fonts, and static assets
- **blocks/**: Reusable content blocks (group.liquid, text.liquid)
- **config/**: Theme settings and configuration
- **layout/**: Theme layout templates (theme.liquid, password.liquid)
- **locales/**: Translation files
- **sections/**: Main sections (header, footer, product, collection, etc.)
- **snippets/**: Reusable template components
- **templates/**: Page templates

### Key Files
- `snippets/css-variables.liquid`: CSS custom properties and design tokens
- `config/settings_schema.json`: Theme customization settings
- `config/settings_data.json`: Current theme settings values

## Development Workflow

### Phase 1: Design Discovery
1. Receive Figma file/node reference
2. Analyze Figma design using MCP
3. Extract design tokens (colors, typography, spacing, components)
4. Document observations about:
   - Component hierarchy
   - Design patterns
   - Responsive behavior
   - Interactions and states
   - Content structure
5. Identify reusable components vs. page-specific elements

### Phase 2: Development
1. Create/update CSS variables in `snippets/css-variables.liquid`
2. Build sections in `sections/` directory
3. Create reusable snippets in `snippets/`
4. Implement responsive design
5. Add Shopify schema for customization
6. Test locally with Shopify CLI

## Liquid Template Best Practices

### Section Schema
```liquid
{% schema %}
{
  "name": "Section Name",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Default heading"
    }
  ],
  "blocks": [...],
  "presets": [...]
}
{% endschema %}
```

### Responsive Images
Use the `image.liquid` snippet for responsive image rendering.

### CSS Variables
Always reference design tokens from `snippets/css-variables.liquid` for consistency.

## Design System Conventions

### Naming
- Section files: kebab-case (e.g., `featured-collection.liquid`)
- CSS classes: BEM methodology preferred
- Schema IDs: snake_case

### Component Hierarchy
1. Layout templates define page structure
2. Sections contain major page components
3. Blocks enable flexible content
4. Snippets provide reusable UI elements

## Performance Considerations
- Lazy load images
- Minimize Liquid logic in templates
- Use CSS custom properties for theming
- Optimize asset delivery
