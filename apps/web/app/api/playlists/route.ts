// apps/web/app/api/playlists/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

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
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json({ error: 'Missing required field: name' }, { status: 400 });
    }

    const playlist = await prisma.playlist.create({
      data: {
        name: body.name,
        description: body.description || null,
        trackCount: body.trackCount || 0,
        spotifyUrl: body.spotifyUrl || null,
        coverImage: body.coverImage || null,
        status: body.status || 'active',
      },
    });

    return NextResponse.json(playlist, { status: 201 });
  } catch (error) {
    console.error('[API /playlists POST]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
