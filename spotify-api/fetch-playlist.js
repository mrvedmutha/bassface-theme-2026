/**
 * Spotify Playlist Preview Fetcher
 * Fetches track names, artists, and 30-second preview URLs from a Spotify playlist
 */

import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';

dotenv.config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PLAYLIST_URL = process.env.SPOTIFY_PLAYLIST_URL;

// Extract playlist ID from URL
function getPlaylistId(url) {
  const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

// Get Spotify access token
async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

// Fetch playlist tracks
async function fetchPlaylistTracks(playlistId, accessToken) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track(name,artists,preview_url))`,
    {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }
  );

  const data = await response.json();
  return data.items;
}

// Main function
async function main() {
  console.log('🎵 Spotify Playlist Preview Fetcher\n');

  // Validate environment variables
  if (!CLIENT_ID || !CLIENT_SECRET || !PLAYLIST_URL) {
    console.error('❌ Error: Missing environment variables!');
    console.error('Please create a .env file with:');
    console.error('  - SPOTIFY_CLIENT_ID');
    console.error('  - SPOTIFY_CLIENT_SECRET');
    console.error('  - SPOTIFY_PLAYLIST_URL\n');
    process.exit(1);
  }

  const playlistId = getPlaylistId(PLAYLIST_URL);
  if (!playlistId) {
    console.error('❌ Error: Invalid playlist URL!');
    console.error('Expected format: https://open.spotify.com/playlist/PLAYLIST_ID\n');
    process.exit(1);
  }

  console.log(`📋 Playlist ID: ${playlistId}`);
  console.log('🔑 Getting access token...');

  try {
    const accessToken = await getAccessToken();
    console.log('✅ Access token obtained');

    console.log('📥 Fetching playlist tracks...');
    const items = await fetchPlaylistTracks(playlistId, accessToken);

    console.log(`📊 Total tracks in playlist: ${items.length}`);

    // Extract track data
    const allTracks = items.map(item => item.track);
    const tracksWithPreview = allTracks.filter(track => track && track.preview_url);
    const tracksWithoutPreview = allTracks.filter(track => track && !track.preview_url);

    console.log(`✅ Tracks with preview URLs: ${tracksWithPreview.length}`);
    console.log(`❌ Tracks without preview URLs: ${tracksWithoutPreview.length}`);

    if (tracksWithoutPreview.length > 0) {
      console.log('\n⚠️  Sample tracks without previews:');
      tracksWithoutPreview.slice(0, 3).forEach((track, i) => {
        console.log(`  ${i + 1}. ${track.name} - ${track.artists.map(a => a.name).join(', ')}`);
      });
    }

    const tracks = tracksWithPreview.map(track => ({
      name: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      preview_url: track.preview_url
    }));

    console.log(`\n✅ Using ${tracks.length} tracks with preview URLs\n`);

    // Save to JSON file
    fs.writeFileSync('tracks.json', JSON.stringify(tracks, null, 2));
    console.log('💾 Saved to tracks.json\n');

    // Display sample
    console.log('📝 Sample tracks:');
    tracks.slice(0, 3).forEach((track, i) => {
      console.log(`  ${i + 1}. ${track.name} - ${track.artist}`);
    });

    console.log('\n✨ Done! Copy the contents of tracks.json to use in your theme.\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
