export const dynamic = 'force-dynamic';
// apps/web/app/api/artists/route.ts
// Artist catalog API — list and create/upsert artists
// GET: public (filterable by genre, city, status)
// POST: admin or CRON_SECRET (for Mac Mini ingestion pipeline)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';
import { requireCronOrAdmin } from '@/lib/cron-or-admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const city = searchParams.get('city');
    const status = searchParams.get('status');
    const source = searchParams.get('source');
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    const where: Record<string, unknown> = {};
    if (genre) where.genre = genre;
    if (city) where.city = city;
    if (status) where.status = status;
    if (source) where.source = source;

    const artists = await prisma.artist.findMany({
      where,
      include: {
        _count: { select: { tracks: true, tourStops: true, showcases: true } },
      },
      orderBy: { name: 'asc' },
      take: Math.min(limit, 500),
    });

    return NextResponse.json({ data: artists, count: artists.length });
  } catch (error) {
    console.error('[GET /api/artists]', error);
    return NextResponse.json({ error: 'Failed to list artists' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Allow both admin session and cron bearer (Mac Mini ingestion uses bearer)
  const denied = await requireCronOrAdmin(request);
  if (denied) return denied;

  try {
    const body = await request.json();
    const { name, genre, city, state, bio, photoUrl, socialLinks, source, status, contactName, contactEmail, contactPhone, spotifyId } = body;

    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Idempotent upsert by slug — Mac Mini can POST the same artist multiple times safely
    const artist = await prisma.artist.upsert({
      where: { slug },
      update: {
        ...(genre && { genre }),
        ...(bio && { bio }),
        ...(photoUrl && { photoUrl }),
        ...(socialLinks && { socialLinks }),
        ...(contactName && { contactName }),
        ...(contactEmail && { contactEmail }),
        ...(contactPhone && { contactPhone }),
        ...(spotifyId && { spotifyId }),
        ...(status && { status }),
      },
      create: {
        name,
        slug,
        genre: genre || null,
        city: city || 'Natchez',
        state: state || 'MS',
        bio: bio || null,
        photoUrl: photoUrl || null,
        socialLinks: socialLinks || null,
        source: source || 'submitted',
        status: status || 'discovered',
        contactName: contactName || null,
        contactEmail: contactEmail || null,
        contactPhone: contactPhone || null,
        spotifyId: spotifyId || null,
      },
      include: {
        _count: { select: { tracks: true } },
      },
    });

    return NextResponse.json({ artist }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/artists]', error);
    return NextResponse.json({ error: 'Failed to create artist' }, { status: 500 });
  }
}
