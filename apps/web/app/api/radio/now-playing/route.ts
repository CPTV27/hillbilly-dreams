export const dynamic = 'force-dynamic';

/**
 * GET /api/radio/now-playing — proxy Icecast status-json.xsl; safe JSON when offline.
 */

import { NextResponse } from 'next/server';
import { getIcecastStatusJsonUrl } from '@/lib/icecast-url';
import { apiLog } from '@/lib/api-logger';

export type NowPlayingPayload = {
  online: boolean;
  title: string | null;
  artist: string | null;
  listeners: number | null;
  serverName?: string | null;
  error?: string;
};

export async function GET() {
  const url = getIcecastStatusJsonUrl();

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json, text/xml, */*' },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = (await res.json()) as Record<string, unknown>;
    const icestats = (data.icestats ?? data) as Record<string, unknown>;
    let source = icestats.source as Record<string, unknown> | Record<string, unknown>[] | undefined;

    if (Array.isArray(source)) {
      source = source[0] as Record<string, unknown> | undefined;
    }

    if (!source || typeof source !== 'object') {
      const payload: NowPlayingPayload = {
        online: false,
        title: null,
        artist: null,
        listeners: null,
        serverName: typeof icestats.server_name === 'string' ? icestats.server_name : null,
      };
      return NextResponse.json(payload);
    }

    const title = typeof source.title === 'string' ? source.title : null;
    const artist = typeof source.artist === 'string' ? source.artist : null;
    const listenersRaw = source.listeners;
    const listeners =
      typeof listenersRaw === 'number'
        ? listenersRaw
        : typeof listenersRaw === 'string'
          ? parseInt(listenersRaw, 10)
          : null;

    const payload: NowPlayingPayload = {
      online: true,
      title,
      artist,
      listeners: Number.isFinite(listeners) ? listeners : null,
      serverName: typeof icestats.server_name === 'string' ? icestats.server_name : null,
    };
    return NextResponse.json(payload);
  } catch (e) {
    apiLog.warn('GET /api/radio/now-playing', 'icecast unreachable', {
      url,
      error: e instanceof Error ? e.message : String(e),
    });

    const payload: NowPlayingPayload = {
      online: false,
      title: null,
      artist: null,
      listeners: null,
      error: 'stream_status_unavailable',
    };
    return NextResponse.json(payload);
  }
}
