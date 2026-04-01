export const dynamic = 'force-dynamic';
// apps/web/app/api/life/profile/route.ts
// GET  /api/life/profile — return current user's CommunityProfile
// POST /api/life/profile — create profile from session
// PUT  /api/life/profile — update profile fields

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';

async function getSessionEmail() {
  const session = await auth();
  return (session?.user as any)?.email as string | undefined;
}

export async function GET() {
  const email = await getSessionEmail();
  if (!email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  try {
    const profile = await (prisma as any).communityProfile.findFirst({ where: { email } });
    if (!profile) return NextResponse.json({ data: null }, { status: 404 });
    return NextResponse.json({ data: profile });
  } catch (err) {
    console.error('[GET /api/life/profile]', err);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const email = await getSessionEmail();
  if (!email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    // body is optional on create
  }

  try {
    const existing = await (prisma as any).communityProfile.findFirst({ where: { email } });
    if (existing) return NextResponse.json({ error: 'Profile already exists' }, { status: 409 });

    const profile = await (prisma as any).communityProfile.create({
      data: {
        email,
        displayName: (body.displayName as string) ?? email.split('@')[0],
        bio: (body.bio as string) ?? null,
        city: (body.city as string) ?? null,
        state: (body.state as string) ?? null,
        lat: (body.lat as number) ?? null,
        lng: (body.lng as number) ?? null,
        tier: (body.tier as string) ?? 'free',
        skills: (body.skills as string[]) ?? [],
        sandbox: (body.sandbox as boolean) ?? false,
      },
    });
    return NextResponse.json({ data: profile }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/life/profile]', err);
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const email = await getSessionEmail();
  if (!email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const profile = await (prisma as any).communityProfile.findFirst({ where: { email } });
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  const allowed = ['displayName', 'bio', 'city', 'state', 'lat', 'lng', 'skills'];
  const data: Record<string, unknown> = {};
  for (const field of allowed) {
    if (field in body) data[field] = body[field];
  }

  try {
    const updated = await (prisma as any).communityProfile.update({
      where: { id: profile.id },
      data,
    });
    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error('[PUT /api/life/profile]', err);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
