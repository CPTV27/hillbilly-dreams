// apps/web/app/api/life/skills/route.ts
// GET  /api/life/skills — search skill listings (query: q, category, city, sandbox)
// POST /api/life/skills — add a skill listing (requires auth)

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get('q');
  const category = searchParams.get('category');
  const city = searchParams.get('city');
  const sandbox = searchParams.get('sandbox') === 'true';

  try {
    // Build skill listing filter
    const where: Record<string, unknown> = { sandbox };
    if (category) where.category = category;
    if (q) {
      where.OR = [
        { skill: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    const listings = await (prisma as any).skillListing.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Filter by profile city if requested — soft FK join
    if (city && listings.length > 0) {
      const profileIds = Array.from(new Set(listings.map((l: any) => l.profileId))) as string[];
      const profiles = await (prisma as any).communityProfile.findMany({
        where: { id: { in: profileIds }, city },
        select: { id: true, displayName: true, city: true, state: true },
      });
      const profileMap = new Map(profiles.map((p: any) => [p.id, p]));
      const filtered = listings
        .filter((l: any) => profileMap.has(l.profileId))
        .map((l: any) => ({ ...l, profile: profileMap.get(l.profileId) }));
      return NextResponse.json({ data: filtered });
    }

    // Attach minimal profile info without city filter
    const profileIds = Array.from(new Set(listings.map((l: any) => l.profileId))) as string[];
    const profiles = await (prisma as any).communityProfile.findMany({
      where: { id: { in: profileIds } },
      select: { id: true, displayName: true, city: true, state: true },
    });
    const profileMap = new Map(profiles.map((p: any) => [p.id, p]));
    const result = listings.map((l: any) => ({ ...l, profile: profileMap.get(l.profileId) ?? null }));

    return NextResponse.json({ data: result });
  } catch (err) {
    console.error('[GET /api/life/skills]', err);
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
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

  if (!body.skill) return NextResponse.json({ error: 'skill is required' }, { status: 400 });

  try {
    const listing = await (prisma as any).skillListing.create({
      data: {
        profileId: profile.id,
        skill: body.skill as string,
        description: (body.description as string) ?? null,
        category: (body.category as string) ?? null,
        availability: (body.availability as string) ?? null,
        rateNote: (body.rateNote as string) ?? null,
        sandbox: profile.sandbox ?? false,
      },
    });
    return NextResponse.json({ data: listing }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/life/skills]', err);
    return NextResponse.json({ error: 'Failed to create skill listing' }, { status: 500 });
  }
}
