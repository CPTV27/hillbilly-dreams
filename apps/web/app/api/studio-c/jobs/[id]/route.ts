export const dynamic = 'force-dynamic';

// PATCH /api/studio-c/jobs/:id — Update a Studio C request (status, assignment, notes)
// When status moves to `accepted` and no jobId yet, creates a ProductionJob under the Studio C intake campaign.

import { NextRequest, NextResponse } from 'next/server';
import type { Prisma } from '@bigmuddy/database';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { apiLog } from '@/lib/api-logger';

type Params = { params: Promise<{ id: string }> };

const VALID_STATUSES = ['submitted', 'accepted', 'scheduled', 'shooting', 'editing', 'review', 'delivered', 'archived'];

function serialize(req: {
  id: string;
  clientBrand: string;
  clientId: number | null;
  requestType: string;
  brief: string;
  location: string | null;
  preferredDate: Date | null;
  budget: string | null;
  status: string;
  assignedTo: string | null;
  jobId: number | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    ...req,
    preferredDate: req.preferredDate?.toISOString() ?? null,
    createdAt: req.createdAt.toISOString(),
    updatedAt: req.updatedAt.toISOString(),
  };
}

export async function PATCH(request: NextRequest, ctx: Params) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await ctx.params;

  try {
    const existing = await prisma.studioCRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const body = await request.json();
    const data: Prisma.StudioCRequestUpdateInput = {};

    if (body.status) {
      if (!VALID_STATUSES.includes(body.status)) {
        return NextResponse.json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` }, { status: 400 });
      }
      data.status = body.status;
    }

    if (body.assignedTo !== undefined) data.assignedTo = body.assignedTo;
    if (body.notes !== undefined) data.notes = body.notes;
    if (body.location !== undefined) data.location = body.location;
    if (body.preferredDate !== undefined) {
      data.preferredDate = body.preferredDate ? new Date(body.preferredDate) : null;
    }
    if (body.jobId !== undefined) data.jobId = body.jobId;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const becomingAccepted =
      body.status === 'accepted' && existing.status !== 'accepted' && existing.jobId == null;

    if (becomingAccepted) {
      const updated = await prisma.$transaction(async (tx) => {
        const campaign = await tx.productionCampaign.upsert({
          where: { slug: 'studio-c-intake' },
          create: {
            name: 'Studio C — Client intake',
            slug: 'studio-c-intake',
            conceptNumber: 7,
            tagline: 'Human-reviewed video jobs from brand requests',
            status: 'active',
          },
          update: {},
        });

        const jobSlug = `studio-c-${existing.id}`;
        const job = await tx.productionJob.create({
          data: {
            campaignId: campaign.id,
            title: `[Studio C] ${existing.requestType} (${existing.clientBrand})`.slice(0, 120),
            slug: jobSlug,
            format: '10:00',
            stage: 'script',
            ttsScript: existing.brief.slice(0, 8000),
          },
        });

        return tx.studioCRequest.update({
          where: { id },
          data: {
            ...data,
            jobId: job.id,
          },
        });
      });

      return NextResponse.json({ data: serialize(updated) });
    }

    const updated = await prisma.studioCRequest.update({
      where: { id },
      data,
    });

    return NextResponse.json({ data: serialize(updated) });
  } catch (err) {
    apiLog.error('PATCH /api/studio-c/jobs/:id', 'update_failed', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
