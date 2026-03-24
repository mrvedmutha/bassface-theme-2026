# T-Shirt 3D Rotation Section - Implementation Guide

## Overview
Scroll-based 3D T-shirt rotation animation with artist names, gradient background, and CTA.

## Files Created

1. **sections/tshirt-rotation.liquid** - Main section template
2. **assets/section-tshirt-rotation.css** - Styling and animations
3. **assets/section-tshirt-rotation.js** - Canvas rendering and GSAP ScrollTrigger

## Features Implemented

### ✅ Gradient Background
- **Colors**: #FE7F2D → #030029 → #000000
- **Blur**: 120px
- **Animation Speed**: 20s
- **Opacity**: 0.4 (with layered variations)
- Fixed position, always visible behind content

### ✅ T-Shirt Animation
- **Images**: 151 WebP frames (1200x1200px)
- **Location**: `assets/t_shirt-animation-3d/images/`
- **Canvas-based rendering** for smooth playback
- **Progressive loading**: First 30 frames preload, rest load in background
- **Scroll-based scrubbing** via GSAP ScrollTrigger

### ✅ Artist Names
- **Names**: Hardwell, Afrojack, Dimitri Vegas & Like Mike, KSHMR, Martin Garrix
- **Font**: Work Sans Light (300 weight)
- **Color**: #FFFFFF
- **Animation**:
  - Left-side names appear **behind** T-shirt (z-index: 1)
  - Right-side names appear **above** T-shirt (z-index: 3)
  - Each name slides in from off-screen, pauses, then slides out
  - Names appear between 12.5% to 75% of scroll progress

### ✅ Final CTA State
- **T-shirt position**: Moves down 40% (crops bottom 40%)
- **Heading**: "WEAR TO RAVE" (Work Sans 600, 48px)
- **Paragraph**: 2-3 sentences about the collection (Work Sans 300, 16px)
- **Button**: "EXPLORE OUR COLLECTIONS"
  - White border (1px)
  - 2px border-radius
  - Ripple fill effect on hover (same as search overlay)
  - Links to `/collections/all`

### ✅ Scroll Distance
- **Total height**: 400vh (4x viewport height)
- **Pin duration**: Entire section is pinned while scrolling through

## How It Works

### 1. Progressive Image Loading
```javascript
// First 30 frames load immediately
loadCriticalFrames() → renders frame 0
// Remaining 121 frames load in background
loadRemainingFrames() → loads async
```

### 2. Scroll Timeline (0-100%)
- **0-80%**: T-shirt rotation (151 frames)
  - Progress 0% = frame 0
  - Progress 80% = frame 150
- **80-85%**: T-shirt moves to final position (40% crop)
- **85-100%**: CTA fades in, T-shirt stays in place

### 3. Artist Names Timeline
| Scroll Progress | Artist Name | Direction |
|-----------------|-------------|-----------|
| 12.5% - 22.5% | Hardwell | Left (behind) |
| 25% - 35% | Afrojack | Right (above) |
| 37.5% - 47.5% | Dimitri Vegas & Like Mike | Left (behind) |
| 50% - 60% | KSHMR | Right (above) |
| 62.5% - 72.5% | Martin Garrix | Left (behind) |

### 4. Button Ripple Effect
- On hover: White circle expands from mouse position
- Text color changes from white → black
- On leave: Circle fades out
- Touch devices: Simple active state (no ripple)

## Usage

### Add to Theme
1. Upload the three files (already done)
2. Go to Shopify Admin → Online Store → Themes → Customize
3. Add section: "T-Shirt Rotation"
4. Save and preview

### Requirements
- **GSAP**: Must be loaded before this section
  - Check `layout/theme.liquid` for GSAP script tags
  - ScrollTrigger plugin required
- **Work Sans font**: Should be loaded in theme
- **Images**: 151 WebP files in `assets/t_shirt-animation-3d/images/`

### Browser Compatibility
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile devices (iOS, Android)
- ⚠️ IE11 not supported (uses modern JS features)

## Customization

### Change Artist Names
Edit `sections/tshirt-rotation.liquid` lines 30-34:
```liquid
<div class="tshirt-rotation__artist-name tshirt-rotation__artist-name--left" data-artist="1">YOUR NAME</div>
```

### Change CTA Text
Edit `sections/tshirt-rotation.liquid` lines 40-50:
- Heading: Line 40
- Paragraph: Lines 41-44
- Button text: Line 51

### Change Scroll Distance
Edit `assets/section-tshirt-rotation.css` line 467:
```css
.tshirt-rotation__spacer {
  height: 500vh; /* Change from 400vh */
}
```

### Change Gradient Colors
Edit `assets/section-tshirt-rotation.css` lines 33-38:
```css
background: radial-gradient(
  ellipse at center,
  #YOUR_COLOR_1 0%,
  #YOUR_COLOR_2 25%,
  #YOUR_COLOR_3 50%,
  #000000 75%
);
```

### Change Final T-shirt Crop
Edit `assets/section-tshirt-rotation.js` line 225:
```javascript
y: '50%', // Change from '40%'
```

## Performance

### Image Loading
- **Total size**: ~15MB (151 images × ~100KB each)
- **Strategy**: Progressive loading (first 30 frames = ~3MB immediate)
- **Performance**: Smooth on 3G+ connections

### Optimization Tips
1. **Compress images further** if needed (use Squoosh or ImageOptim)
2. **Reduce frame count** to 75 frames (every other frame) for faster load
3. **Add loading indicator** while critical frames load

### Memory Usage
- Canvas: ~5MB (1200x1200px bitmap)
- Images: ~15MB cached in memory
- **Total**: ~20MB memory footprint

## Responsive Behavior

### Desktop (1024px+)
- Canvas: 1200x1200px
- Artist names: 120px font size
- Full spacing and padding

### Tablet (768px - 1024px)
- Canvas: 800x800px max
- Artist names: 80px font size
- Reduced padding

### Mobile (412px - 768px)
- Canvas: 600x600px max
- Artist names: 60px font size
- Compact CTA layout

### Mobile Small (< 412px)
- Canvas: 100vw
- Artist names: 40px font size
- Minimal padding

## Troubleshooting

### Images not loading
1. Check browser console for 404 errors
2. Verify images exist: `assets/t_shirt-animation-3d/images/img_0.webp`
3. Check Shopify asset CDN URLs are correct

### GSAP errors
1. Ensure GSAP is loaded in `layout/theme.liquid`
2. Check ScrollTrigger plugin is registered
3. Open console and type `gsap.version` to verify

### Animation not smooth
1. Check scroll performance (too many other ScrollTriggers?)
2. Verify images are fully loaded
3. Try reducing frame count or image size

### Button ripple not working
1. Check if touch device (ripple disabled on touch)
2. Verify GSAP is loaded
3. Check console for JavaScript errors

## Next Steps

### Optional Enhancements
1. **Add loading progress indicator** during image load
2. **Preload on section intersection** (load when section comes into view)
3. **Add schema settings** for customization without code
4. **Add different T-shirt variants** (change images based on user selection)
5. **Add sound effects** on artist name appearance

---

**Created**: 2026-01-25
**Status**: Ready for testing
**Dependencies**: GSAP, ScrollTrigger, Work Sans font
