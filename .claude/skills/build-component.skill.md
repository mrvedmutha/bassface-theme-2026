# Build Component from Figma

## Description
Builds a Shopify theme component (section or snippet) based on Figma design specifications, ensuring pixel-perfect implementation with responsive design and merchant customization options.

## Usage
```
/build-component [component-name]
```

## Instructions

You are building a Shopify theme component from Figma design specifications. Follow this process:

### 1. Review Design Specifications
- Review the Figma analysis for this component
- Understand the component structure and requirements
- Check design tokens (colors, spacing, typography)
- Note responsive behavior and breakpoints
- Identify dynamic vs. static content

### 2. Determine Component Type

**Create as Section** if:
- Major page component (header, footer, hero)
- Needs to be added/removed by merchants
- Requires schema settings
- Contains blocks for flexible content

**Create as Snippet** if:
- Reusable UI element (button, card, icon)
- Called from multiple sections
- Purely presentational
- No merchant customization needed

### 3. Setup CSS Variables
Before building, ensure `snippets/css-variables.liquid` contains:
- All colors from design
- Typography scales
- Spacing values
- Border radius values
- Shadow definitions
- Breakpoint variables

Update if needed to match Figma tokens exactly.

### 4. Build the Component

#### For Sections:

**File Structure:**
```liquid
{% comment %}
  Section: [Component Name]
  Description: [What this section does]

  Figma Reference: [Node/Frame name]
{% endcomment %}

{%- style -%}
  /* Component-specific styles */
  .section-{{ section.id }} {
    /* Use CSS variables */
  }
{%- endstyle -%}

<div class="section-[name] section-{{ section.id }}">
  <!-- Semantic HTML matching Figma structure -->
</div>

{% schema %}
{
  "name": "Component Name",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Default heading"
    }
    // Add all customizable elements
  ],
  "blocks": [
    // Add if component supports flexible content
  ],
  "presets": [
    {
      "name": "Component Name"
    }
  ]
}
{% endschema %}
```

#### For Snippets:

**File Structure:**
```liquid
{% comment %}
  Snippet: [Snippet Name]

  Usage:
    {% render 'snippet-name', param: value %}

  Parameters:
    - param_name (type): Description
{% endcomment %}

{%- liquid
  # Process parameters
  assign param = param | default: 'default_value'
-%}

<!-- Semantic HTML -->
```

### 5. Implementation Checklist

**HTML Structure:**
- Use semantic HTML5 elements
- Match Figma hierarchy
- Add appropriate ARIA labels
- Include keyboard navigation support
- Use Shopify objects where applicable (product, collection, etc.)

**CSS Styling:**
- Use CSS variables for all design tokens
- Implement exact spacing from Figma
- Match typography precisely
- Use flexbox/grid matching Figma auto-layout
- Mobile-first responsive design
- Handle all component states (hover, focus, active)

**Liquid Logic:**
- Minimal logic in templates
- Use schema for customization
- Add conditional rendering where needed
- Support empty states gracefully
- Use Liquid filters appropriately

**Schema Design:**
- Make key elements customizable
- Use appropriate input types
- Provide sensible defaults
- Group related settings
- Add helpful labels and info text

**Responsive Design:**
- Mobile-first approach
- Use breakpoints from design system
- Test at common viewport sizes
- Ensure touch targets are adequate
- Handle long content gracefully

**Accessibility:**
- Proper heading hierarchy
- Alt text for images
- ARIA labels where needed
- Keyboard navigable
- Sufficient color contrast
- Focus indicators

### 6. Integration Points

**For Product/Collection Sections:**
- Use Shopify product/collection objects
- Handle variant selection (if product)
- Add to cart functionality
- Show price, availability
- Support metafields

**For Dynamic Sections:**
- Enable blocks for flexible content
- Support section settings
- Allow merchant customization
- Provide presets

### 7. Testing Considerations
After building, note:
- How to test locally
- Edge cases to check
- Content variations to test
- Responsive breakpoints to verify

### 8. Documentation
Include in response:
- What was built (section/snippet name)
- File location
- How to use it
- Schema settings available
- Any assumptions made
- Next steps or related components

## Example Section Template

```liquid
{% comment %}
  Section: Feature Grid
  Displays a grid of feature cards with icons, headings, and descriptions

  Figma: Components/Feature Grid
{% endcomment %}

{%- style -%}
  .feature-grid-{{ section.id }} {
    padding: var(--spacing-section-vertical) var(--spacing-section-horizontal);
    background-color: {{ section.settings.background_color }};
  }

  .feature-grid-{{ section.id }}__container {
    max-width: var(--page-width);
    margin: 0 auto;
  }

  .feature-grid-{{ section.id }}__heading {
    font-size: var(--font-size-h2);
    font-weight: var(--font-weight-bold);
    text-align: center;
    margin-bottom: var(--spacing-lg);
    color: {{ section.settings.heading_color }};
  }

  .feature-grid-{{ section.id }}__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-md);
  }

  @media (max-width: 768px) {
    .feature-grid-{{ section.id }}__grid {
      grid-template-columns: 1fr;
    }
  }
{%- endstyle -%}

<section class="feature-grid feature-grid-{{ section.id }}">
  <div class="feature-grid-{{ section.id }}__container">
    {%- if section.settings.heading != blank -%}
      <h2 class="feature-grid-{{ section.id }}__heading">
        {{ section.settings.heading }}
      </h2>
    {%- endif -%}

    <div class="feature-grid-{{ section.id }}__grid">
      {%- for block in section.blocks -%}
        <div class="feature-card" {{ block.shopify_attributes }}>
          {%- if block.settings.icon != blank -%}
            <div class="feature-card__icon">
              {{ block.settings.icon | image_url: width: 64 | image_tag }}
            </div>
          {%- endif -%}

          <h3 class="feature-card__title">{{ block.settings.title }}</h3>
          <p class="feature-card__description">{{ block.settings.description }}</p>
        </div>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Feature Grid",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Our Features"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "heading_color",
      "label": "Heading Color",
      "default": "#000000"
    }
  ],
  "blocks": [
    {
      "type": "feature",
      "name": "Feature",
      "settings": [
        {
          "type": "image_picker",
          "id": "icon",
          "label": "Icon"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Feature Title"
        },
        {
          "type": "textarea",
          "id": "description",
          "label": "Description",
          "default": "Feature description goes here"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Feature Grid",
      "blocks": [
        { "type": "feature" },
        { "type": "feature" },
        { "type": "feature" }
      ]
    }
  ]
}
{% endschema %}
```

## Best Practices
- Match Figma design exactly
- Use design system tokens consistently
- Write clean, maintainable code
- Add helpful comments
- Make components flexible but not over-engineered
- Consider merchant use cases
- Test with realistic content
- Ensure accessibility
- Optimize for performance

## Notes
- Always refer to the Figma analysis first
- Ask for clarification if design is ambiguous
- Document any deviations from design
- Suggest improvements if beneficial
- Consider future maintenance
