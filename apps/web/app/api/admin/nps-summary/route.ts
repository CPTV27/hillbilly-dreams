export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const rows = await prisma.npsResponse.findMany({ select: { score: true } });
  const n = rows.length;
  if (n === 0) {
    return NextResponse.json({ count: 0, nps: null, promoters: 0, passives: 0, detractors: 0 });
  }

  let promoters = 0;
  let passives = 0;
  let detractors = 0;
  for (const r of rows) {
    if (r.score >= 9) promoters += 1;
    else if (r.score >= 7) passives += 1;
    else detractors += 1;
  }

  const nps = Math.round(((promoters - detractors) / n) * 100);
  const avg = rows.reduce((s, r) => s + r.score, 0) / n;

  return NextResponse.json({
    count: n,
    nps,
    avgScore: Math.round(avg * 10) / 10,
    promoters,
    passives,
    detractors,
  });
}
