export const dynamic = 'force-dynamic';

// GET /api/studio-c/programming — List TV channel programming (DisplayChannel + scheduled content)
// POST /api/studio-c/programming — Add content to a channel rotation

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(_request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const channels = await prisma.displayChannel.findMany({
      orderBy: { slug: 'asc' },
    });

    return NextResponse.json({ data: channels });
  } catch (err) {
    console.error('[GET /api/studio-c/programming]', err);
    return NextResponse.json({ data: [] });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { slug, name, youtubeVideoId, youtubeChannelId, venueKey, config } = body;

    if (!slug || !name) {
      return NextResponse.json({ error: 'slug and name required' }, { status: 400 });
    }

    const channel = await prisma.displayChannel.upsert({
      where: { slug },
      create: {
        slug,
        name,
        youtubeVideoId: youtubeVideoId || null,
        youtubeChannelId: youtubeChannelId || null,
        venueKey: venueKey || null,
        config: config || {},
      },
      update: {
        name,
        youtubeVideoId: youtubeVideoId !== undefined ? youtubeVideoId : undefined,
        youtubeChannelId: youtubeChannelId !== undefined ? youtubeChannelId : undefined,
        venueKey: venueKey !== undefined ? venueKey : undefined,
        config: config !== undefined ? config : undefined,
      },
    });

    return NextResponse.json({ data: channel });
  } catch (err) {
    console.error('[POST /api/studio-c/programming]', err);
    return NextResponse.json({ error: 'Failed to update programming' }, { status: 500 });
  }
}
