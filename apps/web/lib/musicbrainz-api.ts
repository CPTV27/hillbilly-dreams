// apps/web/lib/musicbrainz-api.ts
// MusicBrainz API client for artist enrichment.
// No auth required — rate limited to 1 req/sec with User-Agent header.

const USER_AGENT = 'BigMuddyRecords/1.0 (music@bigmuddyrecords.com)';
const BASE_URL = 'https://musicbrainz.org/ws/2';

interface MusicBrainzArtist {
  id: string; // MBID
  name: string;
  'sort-name': string;
  country?: string;
  'life-span'?: {
    begin?: string;
    end?: string;
    ended: boolean;
  };
  tags?: { name: string; count: number }[];
  'type'?: string; // "Person" | "Group"
}

interface MusicBrainzSearchResult {
  artists: MusicBrainzArtist[];
  count: number;
}

// Simple rate limiter — 1 request per second
let lastRequest = 0;
async function rateLimited(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastRequest;
  if (elapsed < 1100) {
    await new Promise((r) => setTimeout(r, 1100 - elapsed));
  }
  lastRequest = Date.now();
}

/**
 * Search for an artist by name on MusicBrainz.
 */
export async function searchArtist(name: string): Promise<MusicBrainzArtist | null> {
  await rateLimited();

  const res = await fetch(
    `${BASE_URL}/artist/?query=artist:${encodeURIComponent(name)}&fmt=json&limit=5`,
    { headers: { 'User-Agent': USER_AGENT } },
  );

  if (!res.ok) {
    console.error(`[MusicBrainz] search error: ${res.status}`);
    return null;
  }

  const data: MusicBrainzSearchResult = await res.json();

  if (data.artists.length === 0) return null;

  // Return exact name match if found, otherwise first result
  const exact = data.artists.find((a) => a.name.toLowerCase() === name.toLowerCase());
  return exact || data.artists[0];
}

/**
 * Get artist details by MusicBrainz ID.
 */
export async function getArtist(mbid: string): Promise<MusicBrainzArtist | null> {
  await rateLimited();

  const res = await fetch(`${BASE_URL}/artist/${mbid}?fmt=json&inc=tags`, {
    headers: { 'User-Agent': USER_AGENT },
  });

  if (!res.ok) {
    console.error(`[MusicBrainz] getArtist error: ${res.status}`);
    return null;
  }

  return res.json();
}

/**
 * Enrich a database Artist with MusicBrainz data.
 * Returns the MBID, or null if not found.
 */
export async function enrichArtistFromMusicBrainz(artistName: string): Promise<{
  musicbrainzId: string;
} | null> {
  const artist = await searchArtist(artistName);
  if (!artist) return null;

  return { musicbrainzId: artist.id };
}
