// apps/web/app/api/cron/podcast-sync/route.ts
// POST (or GET from Vercel Cron) — sync pending PodcastEpisode rows
// to Buzzsprout. Runs hourly. CRON_SECRET-gated.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { podcast, buzzsprout } from '@bigmuddy/broadcast';

async function handler(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const pending = await podcast.pendingBuzzsproutSync();
  const results: Array<{ episodeId: string; success: boolean; error?: string }> = [];

  for (const ep of pending) {
    // Need the show to get the buzzsprout podcast ID
    const show = (ep as typeof ep & { show: { buzzsproutId: string | null; title: string } })
      .show;
    if (!show?.buzzsproutId) {
      results.push({
        episodeId: ep.id,
        success: false,
        error: `Show has no buzzsproutId: ${show?.title ?? 'unknown'}`,
      });
      continue;
    }
    try {
      const { buzzsproutEpisodeId } = await buzzsprout.createEpisode(
        show.buzzsproutId,
        {
          title: ep.title,
          description: ep.description,
          audioUrl: ep.audioUrl,
          episodeNumber: ep.episodeNumber,
          seasonNumber: ep.seasonNumber ?? undefined,
          publishedAt: ep.publishedAt ?? undefined,
        }
      );
      await podcast.setEpisodeBuzzsproutId(ep.id, buzzsproutEpisodeId);
      results.push({ episodeId: ep.id, success: true });
    } catch (e) {
      results.push({
        episodeId: ep.id,
        success: false,
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }

  return NextResponse.json({
    data: {
      pending: pending.length,
      synced: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
      results,
    },
  });
}

export { handler as POST, handler as GET };
