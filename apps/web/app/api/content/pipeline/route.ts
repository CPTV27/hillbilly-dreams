export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

const STAGES = ['script', 'voiceover', 'video', 'review', 'published'] as const;

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const [jobs, campaigns] = await Promise.all([
    prisma.productionJob.findMany({
      include: { campaign: { select: { id: true, name: true, slug: true, status: true } } },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.productionCampaign.findMany({
      where: { status: 'active' },
      select: { id: true, name: true, slug: true, status: true },
    }),
  ]);

  const byStage: Record<string, number> = {};
  for (const s of STAGES) byStage[s] = 0;
  for (const j of jobs) {
    const st = j.stage || 'script';
    byStage[st] = (byStage[st] ?? 0) + 1;
  }

  const jobRows = jobs.map((j) => ({
    id: j.id,
    title: j.title,
    slug: j.slug,
    stage: j.stage,
    approvalStatus: j.approvalStatus,
    campaign: j.campaign,
    adminUrl: `/admin/productions/${j.id}`,
  }));

  return NextResponse.json({
    stages: STAGES.map((s) => ({ stage: s, count: byStage[s] ?? 0 })),
    activeCampaigns: campaigns,
    jobs: jobRows,
  });
}
