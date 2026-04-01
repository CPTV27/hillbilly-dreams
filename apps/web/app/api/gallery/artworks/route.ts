export const dynamic = 'force-dynamic';
// apps/web/app/api/gallery/artworks/route.ts
// BuyCurious Art — Artworks API (Prisma-backed)
// GET /api/gallery/artworks
// Query params: medium, artist (slug), category, featured, available, limit

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;

  const medium = searchParams.get('medium') ?? null;
  const artistSlug = searchParams.get('artist') ?? null;
  const category = searchParams.get('category') ?? null;
  const featuredParam = searchParams.get('featured');
  const availableParam = searchParams.get('available');
  const limitParam = searchParams.get('limit');

  const featured = featuredParam === 'true' ? true : featuredParam === 'false' ? false : undefined;
  const available = availableParam === 'false' ? false : true;
  const limit = limitParam ? Math.min(parseInt(limitParam, 10), 100) : 50;

  try {
    // Build Prisma where clause
    const where: Record<string, unknown> = {};

    if (available !== undefined) where.available = available;
    if (featured !== undefined) where.featured = featured;
    if (category) where.category = category;

    if (medium) {
      where.medium = { contains: medium, mode: 'insensitive' };
    }

    if (artistSlug) {
      const artist = await prisma.artistProfile.findFirst({
        where: { slug: artistSlug },
      });
      if (artist) {
        where.artistId = artist.id;
      } else {
        return NextResponse.json(
          { data: [], meta: { total: 0, filters: { medium, artist: artistSlug, category, featured, available }, source: 'prisma' } },
          { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
        );
      }
    }

    const artworks = await prisma.artwork.findMany({
      where,
      take: limit,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      include: {
        artist: {
          select: {
            name: true,
            slug: true,
            city: true,
            state: true,
            medium: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        data: artworks,
        meta: {
          total: artworks.length,
          filters: { medium, artist: artistSlug, category, featured, available },
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
    console.error('Gallery API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artworks' },
      { status: 500 }
    );
  }
}
