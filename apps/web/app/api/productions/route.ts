export const dynamic = 'force-dynamic';
// GET /api/productions — list all production jobs (filterable by campaign, stage)
// POST /api/productions — create a new production job

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const campaignId = searchParams.get('campaignId');
    const stage = searchParams.get('stage');

    const where: Record<string, unknown> = {};
    if (campaignId) where.campaignId = parseInt(campaignId, 10);
    if (stage) where.stage = stage;

    const jobs = await prisma.productionJob.findMany({
      where,
      include: {
        campaign: { select: { id: true, name: true, slug: true } },
        _count: { select: { artifacts: true } },
      },
      orderBy: [{ campaign: { conceptNumber: 'asc' } }, { createdAt: 'asc' }],
    });

    return NextResponse.json({ jobs });
  } catch (err: any) {
    console.error('[productions] GET error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      campaignId,
      title,
      format,
      veoPrompt,
      ttsScript,
      musicDirection,
      textOverlays,
      cta,
      voicePreset = 'chase',
      voiceSpeed = 1.0,
      voicePitch = 0,
      veoQuality = 'draft',
      videoDuration = 5,
    } = body;

    if (!campaignId || !title || !format) {
      return NextResponse.json(
        { error: 'campaignId, title, and format are required' },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const job = await prisma.productionJob.create({
      data: {
        campaignId: parseInt(campaignId, 10),
        title,
        slug,
        format,
        veoPrompt,
        ttsScript,
        musicDirection,
        textOverlays,
        cta,
        voicePreset,
        voiceSpeed: parseFloat(voiceSpeed),
        voicePitch: parseFloat(voicePitch),
        veoQuality,
        videoDuration: parseInt(videoDuration, 10),
      },
      include: { campaign: true },
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (err: any) {
    console.error('[productions] POST error:', err);
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'A job with that title already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
