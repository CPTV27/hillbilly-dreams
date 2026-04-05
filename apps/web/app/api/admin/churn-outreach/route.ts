export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';
import { createTask } from '@/lib/asana-client';

const ASANA_PROJECT_GID = process.env.ASANA_CEO_PROJECT_GID || '1213753731475702';

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: { clientId?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const clientId = body.clientId;
  if (typeof clientId !== 'number' || clientId < 1) {
    return NextResponse.json({ error: 'clientId required' }, { status: 400 });
  }

  const client = await prisma.client.findUnique({
    where: { id: clientId },
    select: { name: true, slug: true, status: true, tier: true },
  });
  if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

  const notes = [
    `Churn-risk outreach — Deep South Directory`,
    `Client: ${client.name} (${client.slug})`,
    `Tier: ${client.tier}, status: ${client.status}`,
    `Created from HQ churn alerts.`,
  ].join('\n');

  try {
    const gid = await createTask(ASANA_PROJECT_GID, `Outreach: ${client.name}`, notes);
    return NextResponse.json({ ok: true, asanaGid: gid });
  } catch (e) {
    console.error('[churn-outreach]', e);
    return NextResponse.json({ error: 'Asana task failed — check ASANA_PAT' }, { status: 502 });
  }
}
