export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireCronOrAdmin } from '@/lib/cron-or-admin';
import { callAI } from '@/lib/ai-models';
import { createTask } from '@/lib/asana-client';
import { cloudLog } from '@/lib/cloud-logger';

const ASANA_PROJECT_GID = process.env.ASANA_CEO_PROJECT_GID || '1213753731475702';

export async function GET(request: NextRequest) {
  return POST(request);
}

export async function POST(request: NextRequest) {
  const start = Date.now();
  const denied = await requireCronOrAdmin(request);
  if (denied) return denied;

  try {
    const totalClients = await prisma.client.count();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newThisWeek = await prisma.client.count({ where: { createdAt: { gte: weekAgo } } });
    const reviewsPending = await prisma.review.count({ where: { responseStatus: 'pending' } });
    const socialScheduled = await prisma.socialPost.count({
      where: {
        OR: [{ status: 'ready' }, { status: 'draft' }],
        scheduledAt: { not: null, gte: new Date() },
      },
    });

    const googleByClient = await prisma.review.groupBy({
      by: ['clientId'],
      where: { platform: 'google' },
      _avg: { rating: true },
      _count: true,
    });
    const lowGoogle = googleByClient.filter((g) => {
      const avg = g._avg.rating != null ? Number(g._avg.rating) : null;
      return avg != null && g._count > 0 && avg < 4;
    });

    const statsLines = [
      `Total clients: ${totalClients}`,
      `New clients this week: ${newThisWeek}`,
      `Reviews pending response: ${reviewsPending}`,
      `Social posts scheduled (future): ${socialScheduled}`,
      `Clients with Google avg rating under 4.0 (min 1 review): ${lowGoogle.length}`,
      `Pi devices offline: not tracked yet`,
    ].join('\n');

    let summary = '';
    try {
      const ai = await callAI({
        role: 'generation',
        system:
          'You are a concise COO. Output exactly three short sentences, plain text, no bullets. Use the stats provided.',
        messages: [{ role: 'user', content: `Morning brief — facts:\n${statsLines}` }],
        maxTokens: 200,
        temperature: 0.4,
      });
      summary = ai.text.trim();
    } catch (e) {
      cloudLog.error('/api/cron/ai-ceo-brief', 'callAI failed', e);
      summary = `Clients: ${totalClients}. New this week: ${newThisWeek}. Pending reviews: ${reviewsPending}.`;
    }

    const notes = [`AI CEO Brief — ${new Date().toISOString().slice(0, 10)}`, '', summary, '', '— Raw stats —', statsLines].join(
      '\n'
    );

    let asanaGid: string | null = null;
    try {
      asanaGid = await createTask(ASANA_PROJECT_GID, `CEO Brief — ${new Date().toLocaleDateString('en-US')}`, notes);
    } catch (e) {
      cloudLog.error('/api/cron/ai-ceo-brief', 'Asana createTask failed', e);
    }

    cloudLog.info('/api/cron/ai-ceo-brief', 'ok', { durationMs: Date.now() - start });

    return NextResponse.json({
      ok: true,
      summary,
      stats: {
        totalClients,
        newThisWeek,
        reviewsPending,
        socialScheduled,
        lowGoogleClientCount: lowGoogle.length,
      },
      asanaGid,
    });
  } catch (e) {
    cloudLog.error('/api/cron/ai-ceo-brief', 'fatal', e, { durationMs: Date.now() - start });
    return NextResponse.json({ error: 'Brief failed' }, { status: 500 });
  }
}
