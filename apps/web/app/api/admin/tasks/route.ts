export const dynamic = 'force-dynamic';

// GET /api/admin/tasks — List AgentTask + ProductionJob records for the Task Ledger
// PATCH /api/admin/tasks — Update status on a task or job

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'all'; // all | agent | production
  const status = searchParams.get('status') || 'all';

  try {
    const results: Array<{
      id: string;
      type: 'agent' | 'production';
      title: string;
      status: string;
      assignee: string;
      created: string;
      extra: Record<string, unknown>;
    }> = [];

    // AgentTask records
    if (type === 'all' || type === 'agent') {
      const where: Record<string, unknown> = {};
      if (status !== 'all') where.status = status;

      const tasks = await prisma.agentTask.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 100,
      });

      for (const t of tasks) {
        results.push({
          id: t.id,
          type: 'agent',
          title: `${t.missionType}: ${t.agent}`,
          status: t.status,
          assignee: t.agent,
          created: t.createdAt.toISOString(),
          extra: {
            missionType: t.missionType,
            startedAt: t.startedAt?.toISOString() || null,
            completedAt: t.completedAt?.toISOString() || null,
            error: t.error,
          },
        });
      }
    }

    // ProductionJob records
    if (type === 'all' || type === 'production') {
      const where: Record<string, unknown> = {};
      if (status !== 'all') where.stage = status;

      const jobs = await prisma.productionJob.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: { campaign: { select: { name: true } } },
      });

      for (const j of jobs) {
        results.push({
          id: String(j.id),
          type: 'production',
          title: j.title,
          status: j.stage,
          assignee: j.voicePreset,
          created: j.createdAt.toISOString(),
          extra: {
            campaign: j.campaign.name,
            format: j.format,
            approvalStatus: j.approvalStatus,
            slug: j.slug,
          },
        });
      }
    }

    // Sort combined by created date
    results.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

    return NextResponse.json({ data: results });
  } catch (err) {
    console.error('[GET /api/admin/tasks]', err);
    return NextResponse.json({ data: [] });
  }
}

export async function PATCH(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { id, type, status } = body as { id: string; type: 'agent' | 'production'; status: string };

    if (!id || !type || !status) {
      return NextResponse.json({ error: 'id, type, and status required' }, { status: 400 });
    }

    if (type === 'agent') {
      const data: Record<string, unknown> = { status };
      if (status === 'running') data.startedAt = new Date();
      if (status === 'completed' || status === 'failed') data.completedAt = new Date();

      await prisma.agentTask.update({ where: { id }, data });
    } else if (type === 'production') {
      await prisma.productionJob.update({
        where: { id: parseInt(id, 10) },
        data: { stage: status },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[PATCH /api/admin/tasks]', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
