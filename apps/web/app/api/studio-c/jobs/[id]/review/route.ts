export const dynamic = 'force-dynamic';

// GET /api/studio-c/jobs/:id/review — Public client review data (no auth, link-based access)
// POST /api/studio-c/jobs/:id/review — Submit client feedback

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, ctx: Params) {
  const { id } = await ctx.params;

  try {
    const job = await prisma.studioCRequest.findUnique({ where: { id } });
    if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Fetch artifacts if linked to a ProductionJob
    let artifacts: Array<{ id: number; type: string; gcsUrl: string; mimeType: string; createdAt: string }> = [];
    if (job.jobId) {
      const raw = await prisma.productionArtifact.findMany({
        where: { jobId: job.jobId },
        orderBy: { createdAt: 'desc' },
      });
      artifacts = raw.map(a => ({
        id: a.id,
        type: a.type,
        gcsUrl: a.gcsUrl,
        mimeType: a.mimeType,
        createdAt: a.createdAt.toISOString(),
      }));
    }

    return NextResponse.json({
      data: {
        id: job.id,
        clientBrand: job.clientBrand,
        requestType: job.requestType,
        brief: job.brief,
        location: job.location,
        status: job.status,
        assignedTo: job.assignedTo,
        notes: job.notes,
        createdAt: job.createdAt.toISOString(),
        artifacts,
      },
    });
  } catch (err) {
    console.error('[GET /api/studio-c/jobs/:id/review]', err);
    return NextResponse.json({ error: 'Failed to load review data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, ctx: Params) {
  const { id } = await ctx.params;

  try {
    const body = await request.json();
    const { approved, feedback } = body as { approved: boolean; feedback: string | null };

    const job = await prisma.studioCRequest.findUnique({ where: { id } });
    if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const note = `[Client ${approved ? 'APPROVED' : 'REQUESTED CHANGES'} — ${new Date().toISOString()}]${feedback ? `\n${feedback}` : ''}`;
    const updatedNotes = job.notes ? `${job.notes}\n\n${note}` : note;

    await prisma.studioCRequest.update({
      where: { id },
      data: {
        notes: updatedNotes,
        status: approved ? 'delivered' : 'editing',
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/studio-c/jobs/:id/review]', err);
    return NextResponse.json({ error: 'Feedback submission failed' }, { status: 500 });
  }
}
