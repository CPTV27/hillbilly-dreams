// apps/web/app/api/tracks/route.ts
// Track catalog API — list and create tracks

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const artistId = searchParams.get('artistId');
    const genre = searchParams.get('genre');
    const mood = searchParams.get('mood');
    const status = searchParams.get('status');


    const where: Record<string, unknown> = {};
    if (artistId) where.artistId = parseInt(artistId, 10);
    if (genre) where.genre = genre;
    if (mood) where.mood = mood;
    if (status) where.status = status;

    const tracks = await prisma.track.findMany({
      where,
      include: {
        artist: { select: { name: true, slug: true } },
        splits: { select: { name: true, role: true, sharePercent: true } },
        _count: { select: { syncSubmissions: true, royalties: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: tracks, count: tracks.length });
  } catch (error) {
    console.error('Track list error:', error);
    return NextResponse.json({ error: 'Failed to list tracks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, artistId, albumTitle, duration, genre, mood, bpm, musicalKey, isrc, iswc, audioUrl, releaseDate } = body;

    if (!title || !artistId) {
      return NextResponse.json({ error: 'title and artistId are required' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');


    const track = await prisma.track.create({
      data: {
        title,
        slug: `${slug}-${Date.now().toString(36)}`, // unique slug
        artistId: parseInt(artistId, 10),
        albumTitle,
        duration: duration ? parseInt(duration, 10) : null,
        genre,
        mood,
        bpm: bpm ? parseInt(bpm, 10) : null,
        musicalKey,
        isrc,
        iswc,
        audioUrl,
        releaseDate: releaseDate ? new Date(releaseDate) : null,
        status: 'uploaded',
      },
      include: {
        artist: { select: { name: true, slug: true } },
      },
    });

    return NextResponse.json({ track }, { status: 201 });
  } catch (error) {
    console.error('Track create error:', error);
    return NextResponse.json({ error: 'Failed to create track' }, { status: 500 });
  }
}
