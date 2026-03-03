// apps/web/app/api/events/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

    const events = await prisma.event.findMany({
      where: { ...(status && { status }) },
      orderBy: { date: 'asc' },
      take: limit,
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('[API /events GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.date) {
      return NextResponse.json({ error: 'Missing required fields: name, date' }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        name: body.name,
        date: new Date(body.date),
        time: body.time || null,
        artist: body.artist || null,
        description: body.description || null,
        price: body.price || null,
        capacity: body.capacity || 50,
        status: body.status || 'upcoming',
        stream: body.stream || false,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('[API /events POST]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
