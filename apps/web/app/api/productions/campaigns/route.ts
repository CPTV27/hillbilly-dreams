export const dynamic = 'force-dynamic';
// GET /api/productions/campaigns — list all campaigns
// POST /api/productions/campaigns — create a campaign

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const campaigns = await prisma.productionCampaign.findMany({
      orderBy: { conceptNumber: 'asc' },
      include: {
        _count: { select: { jobs: true } },
      },
    });

    return NextResponse.json({ campaigns });
  } catch (err: any) {
    console.error('[campaigns] GET error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, conceptNumber, tagline } = body;

    if (!name || conceptNumber === undefined) {
      return NextResponse.json(
        { error: 'name and conceptNumber are required' },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const campaign = await prisma.productionCampaign.create({
      data: { name, slug, conceptNumber: parseInt(conceptNumber, 10), tagline },
    });

    return NextResponse.json({ campaign }, { status: 201 });
  } catch (err: any) {
    console.error('[campaigns] POST error:', err);
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'Campaign already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
