// apps/web/app/api/photo-library/route.ts
// GET /api/photo-library — returns the master photo library index
//
// Reads gs://bmt-media-bigmuddy/approved/index.json (produced by
// scripts/sync-approved.ts) and serves it to the Sanity Studio custom
// asset picker. Public endpoint — the Studio embed is already reachable
// to authenticated Sanity users, and the underlying GCS objects are
// public via the bmt-media-bigmuddy bucket's IAM.

import { NextResponse } from 'next/server';
import { GCS_BASE_URL } from '@/lib/gcs';
import { apiLog } from '@/lib/api-logger';
import type { PhotoIndexEntry } from '@/lib/photo-index';

export const dynamic = 'force-dynamic';

// Next.js 14 App Router route handlers support fetch-level caching.
// Revalidate every 60s so newly-synced photos appear in the picker within
// a minute of `scripts/sync-approved.ts` finishing.
const REVALIDATE_SECONDS = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const regionFilter = searchParams.get('region');

  const url = `${GCS_BASE_URL}/approved/index.json`;

  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) {
      // Index doesn't exist yet — return an empty catalog so the picker
      // can render an empty state instead of erroring.
      if (res.status === 404) {
        apiLog.info('photo-library', 'index.json not found — returning empty catalog');
        return NextResponse.json({
          version: 1,
          generated: new Date().toISOString(),
          photos: [],
        });
      }
      apiLog.warn('photo-library', 'upstream fetch failed', { status: res.status, url });
      return NextResponse.json(
        { error: `Failed to fetch index.json: ${res.status}` },
        { status: 502 }
      );
    }
    const json = await res.json();
    if (regionFilter && Array.isArray(json?.photos)) {
      json.photos = (json.photos as PhotoIndexEntry[]).filter((p) => p.region === regionFilter);
    }
    apiLog.info('photo-library', 'served index', { photoCount: json?.photos?.length ?? 0 });
    return NextResponse.json(json, {
      headers: {
        // CDN hint — lets Vercel's edge cache hold it too
        'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS * 5}`,
      },
    });
  } catch (e) {
    apiLog.error('photo-library', 'internal error', e);
    return NextResponse.json(
      { error: `Internal error: ${(e as Error).message}` },
      { status: 500 }
    );
  }
}
