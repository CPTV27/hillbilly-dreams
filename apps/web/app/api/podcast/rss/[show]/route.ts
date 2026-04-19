// apps/web/app/api/podcast/rss/[show]/route.ts
// GET — canonical podcast RSS feed. Apple-compatible iTunes namespace.
// Used both by apps that pull RSS directly and by Buzzsprout for
// distribution to Spotify/Apple/YouTube Music/Amazon.

export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { podcast, rss } from '@bigmuddy/broadcast';

export async function GET(
  _request: Request,
  { params }: { params: { show: string } }
) {
  const show = await podcast.getShowBySlug(params.show);
  if (!show) {
    return NextResponse.json({ error: 'Show not found' }, { status: 404 });
  }

  const episodes = await podcast.listEpisodes(show.id, { publishedOnly: true });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://bigmuddyradio.com';
  const xml = rss.buildRssXml({ show, episodes, baseUrl });

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      // Cache briefly — podcast apps refetch every few minutes anyway.
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}
