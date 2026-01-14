---
trigger: model_decision
description: How to manage asset files when provided
---

# Asset Management

**Minimal asset tracking. Discuss asset strategy before starting development.**

---

## Asset Categories

### 1. Images
- Product images
- Background images
- Hero images
- Logos
- Icons (if not SVG inline)

### 2. Videos
- MP4 (H.264 codec)
- WebM (fallback)

### 3. Icons
- SVG files (preferred)
- Icon sprite sheets

---

## Asset Strategy Discussion

**Before starting development, have a conversation with the user about:**

1. **Asset Source:**
   - Will assets be uploaded via section settings (merchant-managed)?
   - Do any assets need to be uploaded to `/assets/` folder?
   - Can we use Shopify's default placeholders during development?

2. **Asset Availability:**
   - Are final assets ready now?
   - Will Shopify placeholders be used during development?
   - When will final assets be provided?

3. **Asset Types:**
   - Which sections need image pickers?
   - Are videos hosted externally (YouTube/Vimeo) or self-hosted?
   - Will icons be inline SVG or require uploads?

**DO NOT create an ASSETS-NEEDED.md file automatically.** Discuss with the user first.

---

## Asset Handling Approaches

### Approach 1: Section Settings (Preferred - 95% of cases)
**Use for:** Most images, videos, and dynamic content
```liquid
{% schema %}
{
  "settings": [
    {
      "type": "image_picker",
      "id": "hero_image",
      "label": "Hero Image"
    },
    {
      "type": "video_url",
      "id": "video",
      "label": "Video URL"
    }
  ]
}
{% endschema %}

{%- if section.settings.hero_image -%}
  <img src="{{ section.settings.hero_image | image_url: width: 1920 }}">
{%- else -%}
  {{ 'hero' | placeholder_svg_tag: 'placeholder-svg' }}
{%- endif -%}
```

**Benefits:**
- Merchants control assets via theme customizer
- No hardcoded paths
- Easy to update without code changes
- Shopify placeholders available during development

---

### Approach 2: Direct Upload to /assets (Rare - 5% of cases)
**Use for:**
- Icon sprite sheets (if not using inline SVG)
- Self-hosted videos that won't change
- Global assets that are part of the theme design itself

**Upload to:** `assets/icon-sprite.svg` or `assets/brand-logo.svg`

**Reference in code:**
```liquid
<img src="{{ 'icon-sprite.svg' | asset_url }}">
```

**Note:** Upload directly to theme's `/assets/` folder, not `prototype/assets/`

---

## Shopify Placeholder Images

**Use Shopify's built-in placeholders during development:**
```liquid
{%- if section.settings.image -%}
  <img src="{{ section.settings.image | image_url: width: 1920 }}">
{%- else -%}
  {{ 'product-1' | placeholder_svg_tag: 'placeholder-svg' }}
{%- endif -%}
```

### Available Placeholder Types
```liquid
{{ 'product-1' | placeholder_svg_tag }}      {# Product images (1-6) #}
{{ 'collection-1' | placeholder_svg_tag }}   {# Collection images (1-6) #}
{{ 'lifestyle-1' | placeholder_svg_tag }}    {# Lifestyle images (1-2) #}
{{ 'image' | placeholder_svg_tag }}          {# Generic image #}
{{ 'hero' | placeholder_svg_tag }}           {# Hero/banner image #}
```

**No need to store placeholder images in `/assets/` folder.**

---

## Typography & Fonts

**This project uses Google Fonts:**
- **Gruppo** - Primary/Display font
- **Work Sans** - Body/Secondary font

### Implementation
Add to `layout/theme.liquid` in `<head>`:
```liquid
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gruppo&family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### CSS Usage
```css
body {
  font-family: 'Work Sans', sans-serif;
}

h1, h2, h3 {
  font-family: 'Gruppo', sans-serif;
}
```

**No font files need to be uploaded to `/assets/` folder.**

---

## Asset Requirements

### Images
- Format: JPEG (photos), PNG (transparency), WebP (optimized)
- SVG for icons/logos
- Optimized/compressed
- Provide via section settings when possible
- **Development:** Use Shopify placeholder SVGs

### Videos
- Format: MP4 (primary), WebM (fallback)
- Max 5MB for web performance
- Compressed
- Prefer external hosting (YouTube/Vimeo) over self-hosted

### Icons
- Format: SVG (preferred)
- Inline SVG when possible
- Icon sprites only if many icons are needed

---

## Development Workflow

### Step 1: Asset Strategy Discussion
Ask the user:
```
"For this section, how should we handle assets?
1. Should images be uploaded via section settings (merchant-managed)?
2. Are there any assets that need to be in the /assets/ folder?
3. Should I use Shopify's placeholder images during development?"
```

### Step 2: Based on Response

**If merchant-managed (default - 95% of cases):**
- Create section settings with `image_picker`, `video_url`, etc.
- Use Shopify placeholder images during development
- No asset files needed in `/assets/` folder

**If direct upload needed (rare - 5% of cases):**
- Collect specific assets from user
- Upload directly to Shopify theme's `/assets/` folder (not `prototype/assets/`)
- Reference with `asset_url` filter

### Step 3: Start Development
- Use Liquid filters for asset URLs
- Never hardcode asset paths
- Use Shopify placeholders for development
- Document asset requirements in section schema labels

---

## File Upload Locations

### ❌ INCORRECT (Do not use):
```
Don't create separate asset folders outside of /assets/
```

### ✅ CORRECT (Direct to theme):
```
assets/icon-sprite.svg
assets/brand-logo.svg
assets/global-pattern.svg
```

**Upload directly to theme's `/assets/` folder.**

---

## Quick Reference

| Asset Type | Default Approach | Alternative | Development |
|------------|------------------|-------------|-------------|
| Hero Images | Section settings (`image_picker`) | Direct upload to `/assets/` | Shopify placeholder SVG |
| Product Images | Section settings | N/A | `'product-1' \| placeholder_svg_tag` |
| Videos | Section settings (`video_url`) | Self-hosted in `/assets/` | N/A |
| Icons | Inline SVG | Icon sprite in `/assets/` | Inline placeholder |
| Logos | Section settings (`image_picker`) | Brand logo in `/assets/` | `'image' \| placeholder_svg_tag` |
| Fonts | Google Fonts CDN | Custom fonts in `/assets/` | N/A |

---

## Important Notes

1. **Always prefer section settings over direct uploads** - gives merchants control (95% of cases)
2. **Discuss asset strategy before starting** - don't assume approach
3. **Use Google Fonts for this project** - Gruppo and Work Sans via CDN
4. **Use Shopify placeholders during development** - no need for placeholder files
5. **Don't create ASSETS-NEEDED.md automatically** - have a conversation first
6. **Direct uploads go to `/assets/` folder only** - not `prototype/assets/`
7. **Most sections should use image_picker** - let merchants control content