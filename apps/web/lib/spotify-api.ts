// apps/web/lib/spotify-api.ts
// Spotify Web API client for artist enrichment.
// Uses Client Credentials flow (no user auth needed for public artist data).

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyArtist {
  id: string;
  name: string;
  popularity: number;
  followers: { total: number };
  genres: string[];
  images: { url: string; width: number; height: number }[];
  external_urls: { spotify: string };
}

interface SpotifySearchResult {
  artists: {
    items: SpotifyArtist[];
    total: number;
  };
}

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET are required');
  }

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    throw new Error(`Spotify token error: ${res.status}`);
  }

  const data: SpotifyTokenResponse = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000, // Refresh 60s early
  };

  return cachedToken.token;
}

/**
 * Search for an artist by name on Spotify.
 */
export async function searchArtist(name: string): Promise<SpotifyArtist | null> {
  const token = await getAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=5`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (!res.ok) {
    console.error(`[Spotify] search error: ${res.status}`);
    return null;
  }

  const data: SpotifySearchResult = await res.json();
  const artists = data.artists.items;

  if (artists.length === 0) return null;

  // Return exact name match if found, otherwise first result
  const exact = artists.find((a) => a.name.toLowerCase() === name.toLowerCase());
  return exact || artists[0];
}

/**
 * Get artist details by Spotify ID.
 */
export async function getArtist(spotifyId: string): Promise<SpotifyArtist | null> {
  const token = await getAccessToken();

  const res = await fetch(`https://api.spotify.com/v1/artists/${spotifyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.error(`[Spotify] getArtist error: ${res.status}`);
    return null;
  }

  return res.json();
}

/**
 * Enrich a database Artist with Spotify data.
 * Returns the fields to update, or null if not found.
 */
export async function enrichArtistFromSpotify(artistName: string): Promise<{
  spotifyId: string;
  spotifyPopularity: number;
  spotifyFollowers: number;
  spotifyGenres: string[];
} | null> {
  const artist = await searchArtist(artistName);
  if (!artist) return null;

  return {
    spotifyId: artist.id,
    spotifyPopularity: artist.popularity,
    spotifyFollowers: artist.followers.total,
    spotifyGenres: artist.genres,
  };
}
