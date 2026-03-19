// apps/web/app/api/sync/route.ts
// Sync Marketplace API — browse and create sync licensing opportunities

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const mood = searchParams.get('mood');
    const status = searchParams.get('status') || 'open';


    const where: Record<string, unknown> = { status };
    if (genre) where.genre = genre;
    if (mood) where.mood = mood;

    const opportunities = await prisma.syncOpportunity.findMany({
      where,
      include: {
        _count: { select: { submissions: true } },
      },
      orderBy: { deadline: 'asc' },
    });

    return NextResponse.json({ data: opportunities, count: opportunities.length });
  } catch (error) {
    console.error('Sync list error:', error);
    return NextResponse.json({ error: 'Failed to list sync opportunities' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, projectType, genre, mood, budgetAmount, budgetType, deadline, contactEmail } = body;

    if (!title || !projectType) {
      return NextResponse.json({ error: 'title and projectType are required' }, { status: 400 });
    }


    const opportunity = await prisma.syncOpportunity.create({
      data: {
        title,
        description,
        projectType,
        genre,
        mood,
        budgetAmount: budgetAmount ? parseInt(budgetAmount, 10) : null,
        budgetType,
        deadline: deadline ? new Date(deadline) : null,
        contactEmail,
        status: 'open',
      },
    });

    return NextResponse.json({ opportunity }, { status: 201 });
  } catch (error) {
    console.error('Sync create error:', error);
    return NextResponse.json({ error: 'Failed to create sync opportunity' }, { status: 500 });
  }
}
