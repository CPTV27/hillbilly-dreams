/**
 * OpenBroadcaster Studio (Mac Mini) — thin REST wrapper.
 * Base URL: http://192.168.4.37:8080 (override with OPENBROADCASTER_URL).
 * Auth varies by install; set OPENBROADCASTER_TOKEN if your OBS API uses Bearer.
 *
 * Paths follow OpenBroadcaster 5.x route map (`/api/v2/...`):
 * @see https://docs.openbroadcaster.com/5.3/routes.html
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

/** List / search media library (GET media search). */
export async function listMediaItems(): Promise<unknown> {
  const res = await obsFetch('/api/v2/media/search?limit=100');
  if (!res.ok) throw new Error(`OBS media/search ${res.status}: ${await res.text()}`);
  return res.json();
}

/** Register or update media — body shape depends on OBS version; adjust with UI network tab if 4xx. */
export async function addMediaFromUrl(url: string, title: string): Promise<unknown> {
  const res = await obsFetch('/api/v2/media', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, title }),
  });
  if (!res.ok) throw new Error(`OBS media PUT ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function createPlaylist(name: string, mediaIds: string[]): Promise<unknown> {
  const res = await obsFetch('/api/v2/playlists', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, items: mediaIds }),
  });
  if (!res.ok) throw new Error(`OBS playlists ${res.status}: ${await res.text()}`);
  return res.json();
}

/** Schedule / timeslot — payload keys may need alignment with `timeslots` PUT in OBS docs. */
export async function schedulePlayout(playlistId: string, startAtIso: string): Promise<unknown> {
  const res = await obsFetch('/api/v2/timeslots', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playlistId, startAt: startAtIso }),
  });
  if (!res.ok) throw new Error(`OBS timeslots ${res.status}: ${await res.text()}`);
  return res.json();
}
