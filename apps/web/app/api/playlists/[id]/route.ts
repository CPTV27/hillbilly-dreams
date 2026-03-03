// apps/web/app/api/playlists/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    const playlist = await prisma.playlist.findUnique({ where: { id } });
    if (!playlist) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(playlist);
  } catch (error) {
    console.error('[API /playlists/[id] GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    const body = await request.json();
    const playlist = await prisma.playlist.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.trackCount !== undefined && { trackCount: body.trackCount }),
        ...(body.spotifyUrl !== undefined && { spotifyUrl: body.spotifyUrl }),
        ...(body.coverImage !== undefined && { coverImage: body.coverImage }),
        ...(body.status !== undefined && { status: body.status }),
      },
    });
    return NextResponse.json(playlist);
  } catch (error) {
    console.error('[API /playlists/[id] PUT]', error);
    if ((error as { code?: string }).code === 'P2025') return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    await prisma.playlist.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API /playlists/[id] DELETE]', error);
    if ((error as { code?: string }).code === 'P2025') return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
