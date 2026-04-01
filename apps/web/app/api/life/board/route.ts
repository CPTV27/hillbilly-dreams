export const dynamic = 'force-dynamic';
// apps/web/app/api/life/board/route.ts
// GET  /api/life/board — list open TaskPosts for a city (query: city, sandbox)
// POST /api/life/board — create new TaskPost (requires auth + life tier)

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const city = searchParams.get('city') ?? 'Natchez';
  const sandbox = searchParams.get('sandbox') === 'true';

  try {
    const tasks = await (prisma as any).taskPost.findMany({
      where: {
        city,
        status: 'open',
        sandbox,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ data: tasks });
  } catch (err) {
    console.error('[GET /api/life/board]', err);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const email = (session?.user as any)?.email as string | undefined;
  if (!email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const profile = await (prisma as any).communityProfile.findFirst({ where: { email } });
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  if (!['life', 'pro', 'admin'].includes(profile.tier)) {
    return NextResponse.json({ error: 'Life tier required' }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.title) return NextResponse.json({ error: 'title is required' }, { status: 400 });
  if (!body.description) return NextResponse.json({ error: 'description is required' }, { status: 400 });

  try {
    const task = await (prisma as any).taskPost.create({
      data: {
        authorId: profile.id,
        title: body.title as string,
        description: body.description as string,
        skillsNeeded: (body.skillsNeeded as string[]) ?? [],
        status: 'open',
        valueType: (body.valueType as string) ?? 'barter',
        valueNote: (body.valueNote as string) ?? null,
        city: (body.city as string) ?? profile.city ?? 'Natchez',
        state: (body.state as string) ?? profile.state ?? 'MS',
        sandbox: profile.sandbox ?? false,
      },
    });
    return NextResponse.json({ data: task }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/life/board]', err);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
