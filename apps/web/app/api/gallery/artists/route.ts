export const dynamic = 'force-dynamic';
// apps/web/app/api/gallery/artists/route.ts
// BuyCurious Art — Artists API (Prisma-backed)
// GET /api/gallery/artists
// Query params: medium, featured, status, limit

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;

  const medium = searchParams.get('medium') ?? null;
  const featuredParam = searchParams.get('featured');
  const status = searchParams.get('status') ?? 'active';
  const limitParam = searchParams.get('limit');

  const featured = featuredParam === 'true' ? true : featuredParam === 'false' ? false : undefined;
  const limit = limitParam ? Math.min(parseInt(limitParam, 10), 100) : 50;

  try {
    const where: Record<string, unknown> = { status };

    if (featured !== undefined) where.featured = featured;
    if (medium) where.medium = { contains: medium, mode: 'insensitive' };

    const artists = await prisma.artistProfile.findMany({
      where,
      take: limit,
      orderBy: [{ featured: 'desc' }, { name: 'asc' }],
      include: {
        _count: {
          select: { artworks: true },
        },
      },
    });

    const data = artists.map((a) => ({
      ...a,
      workCount: a._count.artworks,
      _count: undefined,
    }));

    return NextResponse.json(
      {
        data,
        meta: {
          total: data.length,
          filters: { medium, featured, status },
          source: 'prisma',
        },
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('Artists API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artists' },
      { status: 500 }
    );
  }
}
