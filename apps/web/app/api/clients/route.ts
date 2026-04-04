export const dynamic = 'force-dynamic';
// apps/web/app/api/clients/route.ts
// GET /api/clients — list clients (filterable by tier, status, city)
// POST /api/clients — create a new client

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  // Auth check — client data is private
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const tier = searchParams.get('tier');
  const status = searchParams.get('status');
  const city = searchParams.get('city');

  try {

    const where: Record<string, unknown> = {};
    if (tier) where.tier = tier;
    if (status) where.status = status;
    if (city) where.city = city;

    const clients = await (prisma as any).client.findMany({
      where,
      include: {
        _count: { select: { reviews: true, reports: true } },
      },
      orderBy: { createdAt: 'desc' as const },
    });

    return NextResponse.json({ data: clients });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : String(dbError);
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot find module') || message.includes('Cannot read properties of undefined') ||
      message.includes('does not exist') || message.includes('P1001')
    ) {
      return NextResponse.json({ data: [], _source: 'no-db', _note: 'Database not connected or migration pending.' });
    }
    console.error('[GET /api/clients]', dbError);
    return NextResponse.json({ error: 'Failed to list clients' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body.name || typeof body.name !== 'string') {
    return NextResponse.json({ error: 'name is required.' }, { status: 400 });
  }
  if (!body.businessType || typeof body.businessType !== 'string') {
    return NextResponse.json({ error: 'businessType is required.' }, { status: 400 });
  }
  if (!body.city || typeof body.city !== 'string') {
    return NextResponse.json({ error: 'city is required.' }, { status: 400 });
  }

  // Auto-generate slug from name
  const slug = (body.slug as string) || (body.name as string)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  try {

    const client = await (prisma as any).client.create({
      data: {
        name: body.name as string,
        slug,
        tier: (body.tier as string) ?? 'front-porch',
        businessType: body.businessType as string,
        city: body.city as string,
        state: (body.state as string) ?? 'MS',
        address: (body.address as string) ?? null,
        phone: (body.phone as string) ?? null,
        email: (body.email as string) ?? null,
        website: (body.website as string) ?? null,
        description: (body.description as string) ?? null,
        platforms: (body.platforms as string[]) ?? [],
        gbpPlaceId: (body.gbpPlaceId as string) ?? null,
        gbpUrl: (body.gbpUrl as string) ?? null,
        contactName: (body.contactName as string) ?? null,
        contactEmail: (body.contactEmail as string) ?? null,
        contactPhone: (body.contactPhone as string) ?? null,
        notes: (body.notes as string) ?? null,
        status: (body.status as string) ?? 'onboarding',
      },
    });

    return NextResponse.json({ data: client }, { status: 201 });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : 'Unknown error';
    if (message.includes('Unique constraint')) {
      return NextResponse.json({ error: 'Client with this slug already exists.' }, { status: 409 });
    }
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot read properties of undefined') || message.includes('does not exist')
    ) {
      return NextResponse.json({ error: 'Database not available or migration pending.' }, { status: 503 });
    }
    console.error('[POST /api/clients]', dbError);
    return NextResponse.json({ error: 'Failed to create client.' }, { status: 500 });
  }
}
