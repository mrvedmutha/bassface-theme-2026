# Spotify Playlist Preview Fetcher

Fetches track names, artists, and 30-second preview URLs from a Spotify playlist.

## Setup

### 1. Get Spotify API Credentials

1. Go to https://developer.spotify.com/dashboard
2. Log in with your Spotify account
3. Click **"Create app"**
4. Fill in:
   - **App name**: "Playlist Preview Fetcher"
   - **App description**: "Fetch playlist previews"
   - **Redirect URI**: `http://localhost:3000`
   - **APIs used**: Check "Web API"
5. Click **"Save"**
6. Copy your **Client ID** and **Client Secret**

### 2. Configure Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```
   SPOTIFY_CLIENT_ID=your_actual_client_id
   SPOTIFY_CLIENT_SECRET=your_actual_client_secret
   SPOTIFY_PLAYLIST_URL=https://open.spotify.com/playlist/YOUR_PLAYLIST_ID
   ```

### 3. Install Dependencies

```bash
npm install
```

## Usage

Run the script to fetch playlist data:

```bash
node fetch-playlist.js
```

This will:
- Fetch all tracks from your playlist
- Extract track names, artists, and preview URLs
- Save to `tracks.json`
- Show a sample of the tracks

## Output

The script generates `tracks.json` with this format:

```json
[
  {
    "name": "Track Name",
    "artist": "Artist Name",
    "preview_url": "https://p.scdn.co/mp3-preview/..."
  }
]
```

## Notes

- Only tracks with available preview URLs are included
- Preview URLs are 30-second MP3 clips
- No rate limiting concerns for reasonable playlist sizes
- Re-run the script whenever you want to update the playlist

## Integration

Copy the contents of `tracks.json` and provide it to Claude for integration into the video hero section.
