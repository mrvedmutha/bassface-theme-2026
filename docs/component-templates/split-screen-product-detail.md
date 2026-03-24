# Split-Screen Product Detail Pattern

## Layout Strategy

**Desktop/Tablet (1440px - 1024px):**
- Split-screen: Image gallery (left) | Divider | Product info (right)
- Vertical carousel dots
- Size buttons in horizontal row

**Mobile (700px and below):**
- Vertical stack: Image → Content
- Horizontal carousel dots
- Size dropdown replaces buttons
- Background treatment (#EFEFEF)
- Top border-radius (10px)

## Breakpoints

- 1440px: Base desktop
- 1024px: Tablet (content width adjustment)
- 700px: Mobile stack
- 412px: Compact mobile (image height adjustment)

## Key Responsive Changes

| Element | Desktop/Tablet | Mobile |
|---------|---------------|--------|
| Layout | Split-screen | Vertical stack |
| Carousel dots | Vertical | Horizontal |
| Size selector | Buttons | Dropdown |
| Zoom button | 40px | 32px |
| Background | None | #EFEFEF |
| Divider | Visible | Hidden |
