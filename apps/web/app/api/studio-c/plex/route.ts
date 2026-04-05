export const dynamic = 'force-dynamic';

// GET /api/studio-c/plex — Plex server status, libraries, playlists
// GET /api/studio-c/plex?section=1 — Items in a library section
// GET /api/studio-c/plex?playlist=123 — Items in a playlist
// Requires PLEX_TOKEN in env. Server is LAN-only (192.168.4.37:32400).

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import {
  getServerStatus,
  getLibraries,
  getLibraryItems,
  getPlaylists,
  getPlaylistItems,
} from '@/lib/plex-client';

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const url = new URL(request.url);
  const section = url.searchParams.get('section');
  const playlist = url.searchParams.get('playlist');

  try {
    if (section) {
      const items = await getLibraryItems(section);
      return NextResponse.json({ data: items });
    }

    if (playlist) {
      const items = await getPlaylistItems(playlist);
      return NextResponse.json({ data: items });
    }

    // Default: return server status + libraries + playlists
    const [status, libraries, playlists] = await Promise.all([
      getServerStatus(),
      getLibraries().catch(() => []),
      getPlaylists().catch(() => []),
    ]);

    return NextResponse.json({ status, libraries, playlists });
  } catch (err: any) {
    console.error('[GET /api/studio-c/plex]', err);
    return NextResponse.json(
      { error: err.message || 'Plex connection failed' },
      { status: 502 },
    );
  }
}
