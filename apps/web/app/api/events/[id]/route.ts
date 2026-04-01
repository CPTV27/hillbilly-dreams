export const dynamic = 'force-dynamic';
// apps/web/app/api/events/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(event);
  } catch (error) {
    console.error('[API /events/[id] GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    const body = await request.json();
    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.date !== undefined && { date: new Date(body.date) }),
        ...(body.time !== undefined && { time: body.time }),
        ...(body.artist !== undefined && { artist: body.artist }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.price !== undefined && { price: body.price }),
        ...(body.capacity !== undefined && { capacity: body.capacity }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.stream !== undefined && { stream: body.stream }),
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    console.error('[API /events/[id] PUT]', error);
    if ((error as { code?: string }).code === 'P2025') return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API /events/[id] DELETE]', error);
    if ((error as { code?: string }).code === 'P2025') return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
