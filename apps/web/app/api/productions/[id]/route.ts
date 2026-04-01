export const dynamic = 'force-dynamic';
// GET /api/productions/[id] — get job detail with artifacts
// PATCH /api/productions/[id] — update job fields (stage, script, settings)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = await prisma.productionJob.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        campaign: true,
        artifacts: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (err: any) {
    console.error('[productions/id] GET error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Only allow updating specific fields
    const allowed = [
      'stage', 'title', 'veoPrompt', 'ttsScript', 'musicDirection',
      'textOverlays', 'cta', 'voicePreset', 'voiceSpeed', 'voicePitch',
      'veoQuality', 'videoDuration', 'approvalStatus', 'approvalNotes',
    ];

    const data: Record<string, unknown> = {};
    for (const key of allowed) {
      if (body[key] !== undefined) data[key] = body[key];
    }

    if (data.voiceSpeed) data.voiceSpeed = parseFloat(data.voiceSpeed as string);
    if (data.voicePitch) data.voicePitch = parseFloat(data.voicePitch as string);
    if (data.videoDuration) data.videoDuration = parseInt(data.videoDuration as string, 10);

    const job = await prisma.productionJob.update({
      where: { id: parseInt(id, 10) },
      data,
      include: { campaign: true, artifacts: { orderBy: { createdAt: 'desc' } } },
    });

    return NextResponse.json({ job });
  } catch (err: any) {
    console.error('[productions/id] PATCH error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
