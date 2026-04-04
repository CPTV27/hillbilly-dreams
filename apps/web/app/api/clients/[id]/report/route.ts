export const dynamic = 'force-dynamic';
// apps/web/app/api/clients/[id]/report/route.ts
// GET /api/clients/:id/report — list reports
// POST /api/clients/:id/report — generate a monthly report

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { callAI } from '@/lib/ai-models';
import { requireCronOrAdmin } from '@/lib/cron-or-admin';

type Params = { params: { id: string } };

const MONTH_NAMES = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export async function GET(_request: NextRequest, { params }: Params) {
  const clientId = parseInt(params.id, 10);
  if (isNaN(clientId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const reports = await (prisma as any).report.findMany({
      where: { clientId },
      orderBy: [{ year: 'desc' as const }, { month: 'desc' as const }],
    });
    return NextResponse.json({ data: reports });
  } catch (err) {
    console.error('[GET /api/clients/:id/report]', err);
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  const denied = await requireCronOrAdmin(request);
  if (denied) return denied;

  const clientId = parseInt(params.id, 10);
  if (isNaN(clientId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const now = new Date();
  const month = (body.month as number) ?? now.getMonth(); // Default to last month (0-indexed, so getMonth() = last month's 1-indexed)
  const year = (body.year as number) ?? (month <= 0 ? now.getFullYear() - 1 : now.getFullYear());
  const adjustedMonth = month <= 0 ? 12 : month;

  try {

    const client = await (prisma as any).client.findUnique({ where: { id: clientId } });
    if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

    // Gather metrics for the month
    const startDate = new Date(year, adjustedMonth - 1, 1);
    const endDate = new Date(year, adjustedMonth, 0, 23, 59, 59);

    // Count posts published this month
    let postsPublished = 0;
    try {
      const accounts = await (prisma as any).socialAccount.findMany({
        where: { clientId },
        select: { id: true },
      });
      const accountIds = accounts.map((a: { id: number }) => a.id);
      if (accountIds.length > 0) {
        postsPublished = await (prisma as any).socialPost.count({
          where: {
            accountId: { in: accountIds },
            status: 'published',
            publishedAt: { gte: startDate, lte: endDate },
          },
        });
      }
    } catch { /* accounts may not have clientId yet */ }

    // Count reviews this month
    let reviewCount = 0;
    let avgRating = 0;
    try {
      const reviews = await (prisma as any).review.findMany({
        where: {
          clientId,
          postedAt: { gte: startDate, lte: endDate },
        },
        select: { rating: true },
      });
      reviewCount = reviews.length;
      if (reviewCount > 0) {
        avgRating = reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviewCount;
      }
    } catch { /* reviews table may not exist */ }

    // Count reviews responded to
    let reviewsResponded = 0;
    try {
      reviewsResponded = await (prisma as any).review.count({
        where: {
          clientId,
          respondedAt: { gte: startDate, lte: endDate },
        },
      });
    } catch { /* ok */ }

    const data = {
      period: `${MONTH_NAMES[adjustedMonth]} ${year}`,
      postsPublished,
      reviewCount,
      avgRating: Math.round(avgRating * 10) / 10,
      reviewsResponded,
      tier: client.tier,
    };

    // Generate AI summary
    let summary: string | null = null;
    try {
      const result = await callAI({
        role: 'generation',
        system: 'You are writing a brief monthly performance summary for a local business client. Be encouraging but honest. 2-3 short paragraphs. Mention specific numbers. Suggest 1-2 actionable next steps.',
        messages: [{
          role: 'user',
          content: `Write a monthly report summary for ${client.name} (${client.businessType} in ${client.city}) for ${MONTH_NAMES[adjustedMonth]} ${year}:
- Posts published: ${postsPublished}
- New reviews: ${reviewCount}
- Average review rating: ${avgRating || 'N/A'}
- Reviews responded to: ${reviewsResponded}
- Tier: ${client.tier}`,
        }],
        maxTokens: 512,
      });
      summary = result.text;
    } catch { /* summary is nice-to-have */ }

    const report = await (prisma as any).report.upsert({
      where: {
        clientId_month_year: { clientId, month: adjustedMonth, year },
      },
      create: { clientId, month: adjustedMonth, year, data, summary },
      update: { data, summary },
    });

    return NextResponse.json({ data: report });
  } catch (err) {
    console.error('[POST /api/clients/:id/report]', err);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
