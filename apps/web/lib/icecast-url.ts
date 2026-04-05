/**
 * Resolve Icecast base URL (no trailing slash) from public stream URL env.
 * Used by /api/radio/now-playing to fetch status-json.xsl server-side.
 */

const DEFAULT_STREAM = 'http://192.168.4.37:8010/stream';

export function getIcecastStreamUrl(): string {
  return process.env.NEXT_PUBLIC_ICECAST_URL || process.env.NEXT_PUBLIC_STREAM_URL || DEFAULT_STREAM;
}

export function getIcecastBaseUrl(): string {
  const stream = getIcecastStreamUrl();
  try {
    const u = new URL(stream);
    let path = u.pathname.replace(/\/stream\/?$/i, '');
    if (!path || path === '/') path = '';
    return `${u.origin}${path}`.replace(/\/$/, '') || u.origin;
  } catch {
    return 'http://192.168.4.37:8010';
  }
}

export function getIcecastStatusJsonUrl(): string {
  return `${getIcecastBaseUrl()}/status-json.xsl`;
}
