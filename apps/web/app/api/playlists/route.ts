export const dynamic = 'force-dynamic';
// apps/web/app/api/playlists/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { formatZodError, playlistCreateSchema } from '@/lib/user-post-validation';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

    const playlists = await prisma.playlist.findMany({
      where: { ...(status && { status }) },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json(playlists, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch (error) {
    console.error('[API /playlists GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const parsed = playlistCreateSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: formatZodError(parsed.error) }, { status: 400 });
    }
    const body = parsed.data;

    const playlist = await prisma.playlist.create({
      data: {
        name: body.name,
        description: body.description ?? null,
        trackCount: body.trackCount,
        spotifyUrl: body.spotifyUrl ?? null,
        coverImage: body.coverImage ?? null,
        status: body.status,
      },
    });

    return NextResponse.json(playlist, { status: 201 });
  } catch (error) {
    console.error('[API /playlists POST]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
