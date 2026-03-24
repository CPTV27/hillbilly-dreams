// apps/web/app/api/content/schedule/route.ts
// POST /api/content/schedule — convert an approved calendar into scheduled social posts
// Body: { calendarId: number }

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Optimal posting times by platform (hour in CT, 24h)
const OPTIMAL_TIMES: Record<string, number[]> = {
  instagram: [9, 12, 17],
  facebook: [9, 13, 16],
  twitter: [8, 12, 17, 20],
  tiktok: [7, 10, 19],
  linkedin: [8, 10, 12],
  bluesky: [9, 14, 18],
  google: [10, 14],
};

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const calendarId = body.calendarId as number;
  if (!calendarId) {
    return NextResponse.json({ error: 'calendarId is required.' }, { status: 400 });
  }

  try {

    const calendar = await (prisma as any).contentCalendar.findUnique({
      where: { id: calendarId },
      include: { client: true },
    });

    if (!calendar) return NextResponse.json({ error: 'Calendar not found' }, { status: 404 });
    if (calendar.status !== 'approved') {
      return NextResponse.json({ error: 'Calendar must be approved before scheduling.' }, { status: 400 });
    }

    const posts = Array.isArray(calendar.posts) ? calendar.posts : [];
    // Soft FK: fetch accounts separately (Client → SocialAccount relation removed, cross-sovereign)
    const accounts = calendar.client
      ? await (prisma as any).socialAccount.findMany({ where: { clientId: calendar.client.id } })
      : [];
    const created: unknown[] = [];

    for (const post of posts as Array<{ day: number; platform: string; content: string; hashtags?: string[] }>) {
      // Find the matching account for this platform
      const account = accounts.find((a: { platform: string }) =>
        a.platform.toLowerCase() === post.platform?.toLowerCase()
      );
      if (!account) continue; // Skip if no account for this platform

      // Calculate schedule time
      const times = OPTIMAL_TIMES[post.platform?.toLowerCase()] || [12];
      const timeIndex = (post.day || 1) % times.length;
      const hour = times[timeIndex];
      const scheduledAt = new Date(calendar.year, calendar.month - 1, post.day || 1, hour, 0, 0);

      // Don't schedule in the past
      if (scheduledAt < new Date()) continue;

      const hashtags = post.hashtags || [];
      const content = hashtags.length > 0
        ? `${post.content}\n\n${hashtags.map((h: string) => h.startsWith('#') ? h : `#${h}`).join(' ')}`
        : post.content;

      const socialPost = await (prisma as any).socialPost.create({
        data: {
          accountId: account.id,
          content,
          mediaUrls: [],
          status: 'ready',
          scheduledAt,
          sourceType: 'calendar',
          sourceId: String(calendarId),
          tags: hashtags,
        },
      });

      created.push(socialPost);
    }

    // Mark calendar as active
    await (prisma as any).contentCalendar.update({
      where: { id: calendarId },
      data: { status: 'active' },
    });

    return NextResponse.json({
      data: { scheduled: created.length, total: posts.length },
      message: `Scheduled ${created.length} of ${posts.length} posts.`,
    });
  } catch (err) {
    console.error('[POST /api/content/schedule]', err);
    return NextResponse.json({ error: 'Failed to schedule content' }, { status: 500 });
  }
}
