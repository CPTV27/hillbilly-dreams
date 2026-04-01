export const dynamic = 'force-dynamic';
// apps/web/app/api/tracks/[id]/splits/route.ts
// Splits Ledger API — manage contributor splits per track

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const trackId = parseInt(id, 10);


    const splits = await prisma.split.findMany({
      where: { trackId },
      include: { artist: { select: { name: true, slug: true } } },
      orderBy: { sharePercent: 'desc' },
    });

    const totalPercent = splits.reduce((sum, s) => sum + s.sharePercent, 0);

    return NextResponse.json({
      splits,
      totalPercent,
      isValid: Math.abs(totalPercent - 100) < 0.01,
    });
  } catch (error) {
    console.error('Splits list error:', error);
    return NextResponse.json({ error: 'Failed to list splits' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const trackId = parseInt(id, 10);
    const body = await request.json();
    const { name, email, role, sharePercent, artistId, paypalEmail } = body;

    if (!name || !role || sharePercent === undefined) {
      return NextResponse.json({ error: 'name, role, and sharePercent are required' }, { status: 400 });
    }


    // Check total won't exceed 100%
    const existing = await prisma.split.findMany({ where: { trackId } });
    const currentTotal = existing.reduce((sum, s) => sum + s.sharePercent, 0);
    if (currentTotal + sharePercent > 100.001) {
      return NextResponse.json({
        error: `Adding ${sharePercent}% would exceed 100%. Current total: ${currentTotal}%`,
      }, { status: 400 });
    }

    const split = await prisma.split.create({
      data: {
        trackId,
        name,
        email: email || null,
        role,
        sharePercent: parseFloat(sharePercent),
        artistId: artistId ? parseInt(artistId, 10) : null,
        paypalEmail: paypalEmail || null,
        status: 'pending',
      },
    });

    return NextResponse.json({ split }, { status: 201 });
  } catch (error) {
    console.error('Split create error:', error);
    return NextResponse.json({ error: 'Failed to create split' }, { status: 500 });
  }
}
