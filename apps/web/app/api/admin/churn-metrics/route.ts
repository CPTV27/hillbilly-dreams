export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

function isoWeekKey(d: Date): string {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = t.getUTCFullYear();
  const w = Math.ceil(((+t - +new Date(Date.UTC(y, 0, 1))) / 86400000 + 1) / 7);
  return `${y}-W${String(w).padStart(2, '0')}`;
}

/** Consecutive ISO weeks with ≥1 published post (client social accounts). */
function postingStreakWeeks(
  posts: { publishedAt: Date | null }[],
  maxWeeksLookback = 52
): number {
  const weeks = new Set<string>();
  for (const p of posts) {
    if (!p.publishedAt) continue;
    weeks.add(isoWeekKey(new Date(p.publishedAt)));
  }
  if (weeks.size === 0) return 0;
  const now = new Date();
  let streak = 0;
  for (let i = 0; i < maxWeeksLookback; i++) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i * 7);
    const k = isoWeekKey(d);
    if (weeks.has(k)) streak += 1;
    else break;
  }
  return streak;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const clients = await prisma.client.findMany({
    select: { id: true, name: true, slug: true, status: true, tier: true, onboardedAt: true },
  });

  const accountsByClient = await prisma.socialAccount.findMany({
    where: { clientId: { not: null } },
    select: { id: true, clientId: true },
  });
  const accountIdsByClient = new Map<number, number[]>();
  for (const a of accountsByClient) {
    if (a.clientId == null) continue;
    const list = accountIdsByClient.get(a.clientId) ?? [];
    list.push(a.id);
    accountIdsByClient.set(a.clientId, list);
  }

  const rows = [];

  for (const c of clients) {
    const lastResponse = await prisma.review.findFirst({
      where: { clientId: c.id, respondedAt: { not: null } },
      orderBy: { respondedAt: 'desc' },
      select: { respondedAt: true },
    });
    const daysSinceResponse = lastResponse?.respondedAt
      ? Math.floor((Date.now() - new Date(lastResponse.respondedAt).getTime()) / 86400000)
      : null;

    const accIds = accountIdsByClient.get(c.id) ?? [];
    const posts =
      accIds.length > 0
        ? await prisma.socialPost.findMany({
            where: { accountId: { in: accIds }, status: 'published' },
            select: { publishedAt: true },
          })
        : [];

    const streakWeeks = postingStreakWeeks(posts);

    const pendingReviews = await prisma.review.count({
      where: { clientId: c.id, responseStatus: 'pending' },
    });

    const googleAgg = await prisma.review.aggregate({
      where: { clientId: c.id, platform: 'google' },
      _avg: { rating: true },
      _count: true,
    });
    const googleAvg = googleAgg._avg.rating;

    const flags: string[] = [];
    if (c.status === 'paused' || c.status === 'onboarding') flags.push('non-active status');
    if (pendingReviews >= 3) flags.push('review backlog');
    if (daysSinceResponse != null && daysSinceResponse > 21) flags.push('no review reply in 21+ days');
    if (streakWeeks === 0 && c.status === 'active') flags.push('no published social this streak window');
    if (googleAvg != null && googleAgg._count > 0 && googleAvg < 4) flags.push('Google avg below 4.0');

    const riskScore = flags.length;

    rows.push({
      clientId: c.id,
      name: c.name,
      slug: c.slug,
      status: c.status,
      tier: c.tier,
      lastLoginAt: null as string | null,
      lastLoginTracked: false,
      daysSinceReviewResponse: daysSinceResponse,
      socialPostingStreakWeeks: streakWeeks,
      piDeviceStatus: null as string | null,
      piHeartbeatTracked: false,
      pendingReviews,
      googleAvgRating: googleAvg,
      googleReviewCount: googleAgg._count,
      riskScore,
      flags,
    });
  }

  rows.sort((a, b) => b.riskScore - a.riskScore);

  return NextResponse.json({ clients: rows });
}
