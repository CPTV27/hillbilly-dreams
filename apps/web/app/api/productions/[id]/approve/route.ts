export const dynamic = 'force-dynamic';
// POST /api/productions/[id]/approve — set approval status + notes

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id } = await params;
    const jobId = parseInt(id, 10);
    const body = await req.json();
    const { approvalStatus, approvalNotes } = body;

    if (!approvalStatus || !['approved', 'revision', 'pending'].includes(approvalStatus)) {
      return NextResponse.json(
        { error: 'approvalStatus must be approved, revision, or pending' },
        { status: 400 }
      );
    }

    const data: Record<string, unknown> = { approvalStatus, approvalNotes };

    // If approved and currently in review, advance to published
    if (approvalStatus === 'approved') {
      const job = await prisma.productionJob.findUnique({ where: { id: jobId } });
      if (job?.stage === 'review') {
        data.stage = 'published';
      }
    }

    // If revision requested, move back to video stage
    if (approvalStatus === 'revision') {
      data.stage = 'video';
    }

    const job = await prisma.productionJob.update({
      where: { id: jobId },
      data,
      include: { campaign: true, artifacts: { orderBy: { createdAt: 'desc' } } },
    });

    return NextResponse.json({ job });
  } catch (err: any) {
    console.error('[productions/approve] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
