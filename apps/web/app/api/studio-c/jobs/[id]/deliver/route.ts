export const dynamic = 'force-dynamic';

// POST /api/studio-c/jobs/:id/deliver — Mark job as delivered, upload artifact to GCS
// Creates ProductionArtifact records and updates StudioCRequest status

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { uploadToGCS } from '@/lib/gcs';

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, ctx: Params) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await ctx.params;

  try {
    const job = await prisma.studioCRequest.findUnique({ where: { id } });
    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const artifactType = (formData.get('type') as string) || 'video';
    const notes = formData.get('notes') as string | null;

    const artifacts = [];

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split('.').pop() || 'mp4';
      const path = `studio-c/${job.clientBrand}/${id}/${Date.now()}.${ext}`;
      const gcsUrl = await uploadToGCS(buffer, path, file.type);

      // Create ProductionArtifact if job has a linked ProductionJob
      if (job.jobId) {
        const artifact = await prisma.productionArtifact.create({
          data: {
            jobId: job.jobId,
            stage: 'published',
            type: artifactType,
            gcsUrl,
            mimeType: file.type,
            fileSize: buffer.length,
          },
        });
        artifacts.push(artifact);
      }
    }

    // Update status to delivered
    const updated = await prisma.studioCRequest.update({
      where: { id },
      data: {
        status: 'delivered',
        notes: notes ? (job.notes ? `${job.notes}\n\n---\nDelivery: ${notes}` : `Delivery: ${notes}`) : job.notes,
      },
    });

    return NextResponse.json({
      data: {
        ...updated,
        preferredDate: updated.preferredDate?.toISOString() ?? null,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
      artifacts,
    });
  } catch (err) {
    console.error('[POST /api/studio-c/jobs/:id/deliver]', err);
    return NextResponse.json({ error: 'Delivery failed' }, { status: 500 });
  }
}
