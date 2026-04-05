// lib/plex-client.ts
// Plex Media Server client for Mac mini at 192.168.4.37:32400
// Used by Studio C Phase 3 for playlist management and library browsing.
// NOTE: Plex is LAN-only. This works from local dev or if a Cloudflare Tunnel
// is configured to expose the Plex server. It will NOT work from Vercel Edge.

const PLEX_HOST = process.env.PLEX_HOST || 'http://192.168.4.37:32400';
const PLEX_TOKEN = process.env.PLEX_TOKEN || '';

interface PlexMediaItem {
  ratingKey: string;
  title: string;
  type: string;
  duration?: number;
  thumb?: string;
  addedAt?: number;
  year?: number;
  artist?: string;
  album?: string;
}

interface PlexLibrary {
  key: string;
  title: string;
  type: string;
  agent: string;
}

interface PlexPlaylist {
  ratingKey: string;
  title: string;
  type: string;
  leafCount?: number;
  duration?: number;
}

async function plexFetch(path: string): Promise<any> {
  if (!PLEX_TOKEN) {
    throw new Error('PLEX_TOKEN not configured');
  }
  const url = `${PLEX_HOST}${path}`;
  const sep = path.includes('?') ? '&' : '?';
  const res = await fetch(`${url}${sep}X-Plex-Token=${PLEX_TOKEN}`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    throw new Error(`Plex ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export async function getLibraries(): Promise<PlexLibrary[]> {
  const data = await plexFetch('/library/sections');
  const dirs = data?.MediaContainer?.Directory || [];
  return dirs.map((d: any) => ({
    key: d.key,
    title: d.title,
    type: d.type,
    agent: d.agent,
  }));
}

export async function getLibraryItems(sectionKey: string): Promise<PlexMediaItem[]> {
  const data = await plexFetch(`/library/sections/${sectionKey}/all`);
  const items = data?.MediaContainer?.Metadata || [];
  return items.map((m: any) => ({
    ratingKey: m.ratingKey,
    title: m.title,
    type: m.type,
    duration: m.duration,
    thumb: m.thumb,
    addedAt: m.addedAt,
    year: m.year,
    artist: m.grandparentTitle || m.parentTitle,
    album: m.parentTitle,
  }));
}

export async function getPlaylists(): Promise<PlexPlaylist[]> {
  const data = await plexFetch('/playlists');
  const items = data?.MediaContainer?.Metadata || [];
  return items.map((p: any) => ({
    ratingKey: p.ratingKey,
    title: p.title,
    type: p.playlistType || p.type,
    leafCount: p.leafCount,
    duration: p.duration,
  }));
}

export async function getPlaylistItems(ratingKey: string): Promise<PlexMediaItem[]> {
  const data = await plexFetch(`/playlists/${ratingKey}/items`);
  const items = data?.MediaContainer?.Metadata || [];
  return items.map((m: any) => ({
    ratingKey: m.ratingKey,
    title: m.title,
    type: m.type,
    duration: m.duration,
    thumb: m.thumb,
    addedAt: m.addedAt,
    year: m.year,
    artist: m.grandparentTitle || m.parentTitle,
    album: m.parentTitle,
  }));
}

export async function getServerStatus(): Promise<{ online: boolean; name?: string; version?: string }> {
  try {
    const data = await plexFetch('/');
    return {
      online: true,
      name: data?.MediaContainer?.friendlyName,
      version: data?.MediaContainer?.version,
    };
  } catch {
    return { online: false };
  }
}
