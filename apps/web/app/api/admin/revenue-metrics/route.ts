export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

/** Monthly price in cents by tier — align with billing route where possible */
const TIER_MRR_CENTS: Record<string, number> = {
  'front-porch': 2500,
  listing: 2500,
  assistant: 2500,
  route: 5000,
  works: 5000,
  'river-room': 9900,
  engine: 9900,
  'blues-room': 25000,
  free: 0,
};

function tierMrrCents(tier: string): number {
  return TIER_MRR_CENTS[tier] ?? 0;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const clients = await prisma.client.findMany({
      select: { id: true, tier: true, status: true, createdAt: true, name: true },
    });

    const paying = clients.filter(
      (c: { status: string; tier: string }) =>
        c.status === 'active' && tierMrrCents(c.tier) > 0
    );
    const mrrCents = paying.reduce(
      (s: number, c: { tier: string }) => s + tierMrrCents(c.tier),
      0
    );

    const byTier: Record<string, number> = {};
    for (const c of clients as { tier: string }[]) {
      byTier[c.tier] = (byTier[c.tier] || 0) + 1;
    }

    const churned = (clients as { status: string }[]).filter((c) => c.status === 'churned').length;
    const churnRate =
      clients.length > 0 ? Math.round((churned / Math.max(1, clients.length)) * 1000) / 10 : 0;

    const arpuCents =
      paying.length > 0 ? Math.round(mrrCents / paying.length) : 0;

    const now = new Date();
    const months: { key: string; mrrCents: number; newClients: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const newClients = (clients as { createdAt: Date }[]).filter(
        (c) => c.createdAt >= d && c.createdAt < next
      ).length;
      months.push({
        key,
        mrrCents,
        newClients,
      });
    }

    return NextResponse.json({
      mrrCents,
      mrrUsd: mrrCents / 100,
      subscriberCount: paying.length,
      totalClients: clients.length,
      byTier,
      churnRatePercent: churnRate,
      arpuCents,
      arpuUsd: arpuCents / 100,
      series: months,
    });
  } catch (e) {
    console.error('[admin/revenue-metrics]', e);
    return NextResponse.json(
      { error: 'Failed to load metrics', mrrCents: 0, subscriberCount: 0, byTier: {}, series: [] },
      { status: 200 }
    );
  }
}
