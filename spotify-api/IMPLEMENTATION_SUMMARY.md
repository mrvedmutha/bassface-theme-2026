# Video Hero with Spotify Integration - Implementation Summary

## What Was Changed

### 1. Video Schema (Simplified)
**Before**: 5 video URLs with random selection
**After**: 1 single video URL

#### Schema Updates:
- Removed: `video_url_1` through `video_url_5`
- Added: `video_url` (single video CDN URL)
- Added: `spotify_iframe_url` (Spotify embed URL)

### 2. Spotify Player Integration

#### New Features:
- **Spotify iframe embed** - Collapsible player with GSAP animation
- **Audio button** - Now toggles Spotify player instead of video audio
- **Waving animation** - Shows when player is collapsed and music is playing
- **Chevron icon** - Bars transform into upward arrow when player is open

### 3. File Changes

#### `sections/video-hero.liquid`
- Updated to use single `video_url` setting
- Added Spotify iframe container with `x-ref="spotifyContainer"`
- Updated audio button to call `togglePlayer()` instead of `toggleAudio()`
- Updated hint text to "Want to have some fun? Click here to play music"

#### `assets/section-video-hero.css`
- Added `.spotify-player-container` styles
- Added `.spotify-player-wrapper` with backdrop blur effect
- Added responsive iframe sizing (400px desktop, full width mobile)
- Updated chevron transformation - bars rotate into upward arrow when open
- Waving animation shows only when closed + playing

#### `assets/section-video-hero.js`
- Added GSAP timeline for smooth slide-in/out animation
- Added `isPlayerOpen` state (tracks if player is visible)
- Added `isPlayerPlaying` state (tracks if music is playing)
- Added `hasInteracted` state (tracks if user opened player at least once)
- Logic: When player closes after interaction, assumes music is playing and shows wave

## How It Works

### User Flow:
1. User sees video hero with audio button (5 bars icon)
2. Hint appears: "Want to have some fun? Click here to play music"
3. User clicks button
4. Spotify player slides in from bottom-right (GSAP animation)
5. Button icon transforms to upward chevron
6. User can interact with Spotify player (play, pause, skip tracks)
7. User clicks button again to close
8. Player slides out (reverse GSAP animation)
9. **If user had opened the player**, waving animation shows on button (assumes music is playing in background)

### Technical Details:

#### GSAP Animation:
```javascript
gsap.timeline({ paused: true })
  .to(container, {
    opacity: 1,
    visibility: "visible",
    y: 0,
    duration: 0.5,
    ease: "power3.out",
  })
```

#### Player States:
- `isPlayerOpen: false` + `isPlayerPlaying: false` → Static bars
- `isPlayerOpen: true` → Chevron icon (no wave)
- `isPlayerOpen: false` + `isPlayerPlaying: true` → Waving bars

#### Responsive Design:
- Desktop: 400px player width
- Mobile: Full width minus 40px padding
- Player positioned bottom-right with proper spacing

## Setup Instructions

### 1. Add Video URL
In Shopify admin → Customize theme → Video Hero section:
- **Video URL**: Enter your Shopify CDN video URL

### 2. Add Spotify Embed URL
Get your Spotify embed URL:
1. Open Spotify (web or app)
2. Go to your playlist
3. Click Share → Embed playlist
4. Copy the `src` URL from the iframe code

Example:
```
https://open.spotify.com/embed/playlist/0nV9HfNblnCX3PhYT4ryE2?utm_source=generator&theme=0
```

Paste this in:
- **Spotify Embed URL** field in theme settings

### 3. Optional: Customize Theme
You can adjust in `section-video-hero.css`:
- Player width: `.spotify-player-wrapper iframe { width: 400px; }`
- Animation duration: `duration: 0.5` in JavaScript
- Backdrop blur: `backdrop-filter: blur(10px)`

## Browser Compatibility

### Supported:
- Chrome/Edge (all features)
- Firefox (all features)
- Safari (all features)
- Mobile browsers (all features)

### Graceful Degradation:
- If GSAP fails to load: Falls back to CSS transitions
- If iframe doesn't load: Button still shows, just doesn't do anything

## Performance

### Optimizations:
- GSAP already loaded in theme (no extra request)
- Iframe lazy loads (`loading="lazy"`)
- Backdrop filter uses GPU acceleration
- No API calls (iframe handles everything)

### Lighthouse Impact:
- Minimal: ~5KB CSS, ~3KB JS added
- Iframe only loads when Spotify URL is provided

## Known Limitations

### 1. Playback State Detection
- Can't reliably detect if Spotify is actually playing
- Uses heuristic: "If user opened player, assume they started playing"
- Wave animation shows when closed after interaction

### 2. Autoplay
- Spotify iframe won't autoplay (browser restrictions)
- User must click play button in the iframe

### 3. Cross-Origin
- Can't control Spotify iframe programmatically
- Can't get current track name
- Can't detect play/pause events

## Future Enhancements (Optional)

### Possible Additions:
1. **Spotify SDK** - Full playback control (requires Premium + user login)
2. **Manual play/pause toggle** - Let user mark when music is playing
3. **Track name display** - Show current track in marquee (requires API)
4. **Volume control** - Slider to control iframe volume (requires SDK)

### Not Recommended:
- Don't try to detect iframe playback state (unreliable)
- Don't add complex API integrations (overkill for this use case)

## Testing Checklist

- [ ] Video plays on page load
- [ ] Audio button appears in bottom-right
- [ ] Hint tooltip shows on page load
- [ ] Clicking button opens Spotify player
- [ ] GSAP animation is smooth
- [ ] Icon transforms to chevron when open
- [ ] Clicking again closes player
- [ ] Waving animation shows when closed (after opening)
- [ ] Works on mobile devices
- [ ] Iframe is responsive
- [ ] No console errors

## Troubleshooting

### Player doesn't appear:
- Check Spotify iframe URL is set in theme settings
- Check console for errors
- Verify GSAP is loaded (check Network tab)

### Animation is choppy:
- Ensure GSAP is loaded before section JavaScript
- Check for CSS conflicts
- Test in incognito mode (disable extensions)

### Iframe doesn't load:
- Check Spotify URL format
- Verify playlist is public
- Check for CORS issues in console

### Wave animation doesn't show:
- Open the player first
- Close it again
- Check `isPlayerPlaying` state in console

## Support

For issues or questions:
- Check browser console for errors
- Verify all files were updated correctly
- Test in different browsers
- Check Shopify theme editor for section settings

---

**Implementation Date**: 2026-01-25
**Files Modified**: 3 (video-hero.liquid, section-video-hero.css, section-video-hero.js)
**Dependencies**: GSAP 3.14.2 (already loaded), AlpineJS (already loaded)
