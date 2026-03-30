// apps/web/app/api/life/tools/route.ts
// GET  /api/life/tools — browse tool library (query: city, category, sandbox)
// POST /api/life/tools — list a tool (requires auth)

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const city = searchParams.get('city');
  const category = searchParams.get('category');
  const sandbox = searchParams.get('sandbox') === 'true';

  const where: Record<string, unknown> = { sandbox };
  if (city) where.city = city;
  if (category) where.category = category;

  try {
    const tools = await (prisma as any).toolLibraryItem.findMany({
      where,
      orderBy: [{ available: 'desc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json({ data: tools });
  } catch (err) {
    console.error('[GET /api/life/tools]', err);
    return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const email = (session?.user as any)?.email as string | undefined;
  if (!email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const profile = await (prisma as any).communityProfile.findFirst({ where: { email } });
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.name) return NextResponse.json({ error: 'name is required' }, { status: 400 });

  try {
    const tool = await (prisma as any).toolLibraryItem.create({
      data: {
        ownerId: profile.id,
        name: body.name as string,
        description: (body.description as string) ?? null,
        category: (body.category as string) ?? null,
        available: (body.available as boolean) ?? true,
        city: (body.city as string) ?? profile.city ?? null,
        state: (body.state as string) ?? profile.state ?? null,
        sandbox: profile.sandbox ?? false,
      },
    });
    return NextResponse.json({ data: tool }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/life/tools]', err);
    return NextResponse.json({ error: 'Failed to list tool' }, { status: 500 });
  }
}
