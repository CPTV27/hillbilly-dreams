/**
 * OpenBroadcaster Studio (Mac Mini) — thin REST wrapper.
 * Base URL: http://192.168.4.37:8080 (override with OPENBROADCASTER_URL).
 * Auth varies by install; set OPENBROADCASTER_TOKEN if your OBS API uses Bearer.
 *
 * Branded video library on disk (reference for ops): ~/PlexMedia/BigMuddy/videos/
 */

const DEFAULT_BASE = process.env.OPENBROADCASTER_URL || 'http://192.168.4.37:8080';

function base(): string {
  return DEFAULT_BASE.replace(/\/$/, '');
}

async function obsFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(init.headers as Record<string, string>),
  };
  const token = process.env.OPENBROADCASTER_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${base()}${path.startsWith('/') ? path : `/${path}`}`, {
    ...init,
    headers,
  });
}

/** List media library items (path depends on OBS REST version — adjust after probing /api/docs). */
export async function listMediaItems(): Promise<unknown> {
  const res = await obsFetch('/api/media');
  if (!res.ok) throw new Error(`OBS list media ${res.status}: ${await res.text()}`);
  return res.json();
}

/** Register remote media from a public URL (e.g. GCS). */
export async function addMediaFromUrl(url: string, title: string): Promise<unknown> {
  const res = await obsFetch('/api/media', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, title }),
  });
  if (!res.ok) throw new Error(`OBS add media ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function createPlaylist(name: string, mediaIds: string[]): Promise<unknown> {
  const res = await obsFetch('/api/playlists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, items: mediaIds }),
  });
  if (!res.ok) throw new Error(`OBS playlist ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function schedulePlayout(playlistId: string, startAtIso: string): Promise<unknown> {
  const res = await obsFetch('/api/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playlistId, startAt: startAtIso }),
  });
  if (!res.ok) throw new Error(`OBS schedule ${res.status}: ${await res.text()}`);
  return res.json();
}
