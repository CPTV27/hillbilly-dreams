export const dynamic = 'force-dynamic';

// PATCH /api/studio-c/jobs/:id — Update a Studio C request (status, assignment, notes)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';

type Params = { params: { id: string } };

const VALID_STATUSES = ['submitted', 'accepted', 'scheduled', 'shooting', 'editing', 'review', 'delivered', 'archived'];

export async function PATCH(request: NextRequest, { params }: Params) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = params;

  try {
    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (body.status) {
      if (!VALID_STATUSES.includes(body.status)) {
        return NextResponse.json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` }, { status: 400 });
      }
      updates.status = body.status;
    }

    if (body.assignedTo !== undefined) updates.assignedTo = body.assignedTo;
    if (body.notes !== undefined) updates.notes = body.notes;
    if (body.location !== undefined) updates.location = body.location;
    if (body.preferredDate !== undefined) updates.preferredDate = body.preferredDate ? new Date(body.preferredDate) : null;
    if (body.jobId !== undefined) updates.jobId = body.jobId;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const updated = await prisma.studioCRequest.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json({
      data: {
        ...updated,
        preferredDate: updated.preferredDate?.toISOString() || null,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
    });
  } catch (err) {
    console.error('[PATCH /api/studio-c/jobs/:id]', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
