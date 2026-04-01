export const dynamic = 'force-dynamic';
// apps/web/app/api/life/contribute/route.ts
// GET  /api/life/contribute — list current user's contributed listings
// POST /api/life/contribute — submit a new business listing for review

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';

export async function GET() {
  const session = await auth();
  const email = (session?.user as any)?.email as string | undefined;
  if (!email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const profile = await (prisma as any).communityProfile.findFirst({ where: { email } });
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  try {
    const listings = await (prisma as any).contributedListing.findMany({
      where: { contributorId: profile.id },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ data: listings });
  } catch (err) {
    console.error('[GET /api/life/contribute]', err);
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
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

  if (!body.businessName) return NextResponse.json({ error: 'businessName is required' }, { status: 400 });
  if (!body.category) return NextResponse.json({ error: 'category is required' }, { status: 400 });
  if (!body.city) return NextResponse.json({ error: 'city is required' }, { status: 400 });

  try {
    const listing = await (prisma as any).contributedListing.create({
      data: {
        contributorId: profile.id,
        businessName: body.businessName as string,
        category: body.category as string,
        city: body.city as string,
        state: (body.state as string) ?? 'MS',
        address: (body.address as string) ?? null,
        phone: (body.phone as string) ?? null,
        website: (body.website as string) ?? null,
        description: (body.description as string) ?? null,
        status: 'pending',
        sandbox: profile.sandbox ?? false,
      },
    });

    // Award contributor credit
    await (prisma as any).contributorCredit.create({
      data: {
        profileId: profile.id,
        amount: 1,
        reason: 'listing_submitted',
        sourceId: listing.id,
        sandbox: profile.sandbox ?? false,
      },
    });

    return NextResponse.json({ data: listing }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/life/contribute]', err);
    return NextResponse.json({ error: 'Failed to submit listing' }, { status: 500 });
  }
}
