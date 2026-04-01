export const dynamic = 'force-dynamic';
// apps/web/app/api/directory/route.ts
// GET /api/directory — public directory API, no auth required
// Returns only active clients with public-safe fields.
// Separate from /api/clients (admin-only, includes internal notes/contacts).
//
// Query params:
//   ?city=natchez
//   ?type=restaurant  (maps to businessType)
//   ?slug=some-slug   (single client lookup by slug)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface RawClient {
  id: number;
  name: string;
  slug: string;
  tier: string;
  businessType: string;
  city: string;
  state: string;
  description: string | null;
  logoUrl: string | null;
  heroImageUrl: string | null;
  website: string | null;
  gbpUrl: string | null;
  platforms: string[];
  [key: string]: unknown;
}

function sanitize(client: RawClient) {
  return {
    id: client.id,
    name: client.name,
    slug: client.slug,
    tier: client.tier,
    businessType: client.businessType,
    city: client.city,
    state: client.state,
    description: client.description,
    logoUrl: client.logoUrl,
    heroImageUrl: client.heroImageUrl,
    website: client.website,
    gbpUrl: client.gbpUrl,
    platforms: client.platforms ?? [],
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const type = searchParams.get('type');
  const slug = searchParams.get('slug');

  try {

    // Single lookup by slug
    if (slug) {
      const client = await (prisma as any).client.findFirst({
        where: { slug, status: 'active' },
      });
      if (!client) {
        return NextResponse.json({ data: null }, { status: 404 });
      }
      return NextResponse.json({ data: sanitize(client) });
    }

    const where: Record<string, unknown> = { status: 'active' };
    if (city) where.city = city;
    if (type) where.businessType = type;

    const clients = await (prisma as any).client.findMany({
      where,
      orderBy: [{ tier: 'asc' as const }, { name: 'asc' as const }],
    });

    return NextResponse.json({ data: (clients as RawClient[]).map(sanitize) });
  } catch (e) {
    const msg = String(e);
    if (
      msg.includes('Cannot read properties of undefined') ||
      msg.includes('datasource') ||
      msg.includes('DATABASE_URL') ||
      msg.includes('Cannot find module') ||
      msg.includes('P1001') ||
      msg.includes('does not exist')
    ) {
      return NextResponse.json({ data: [], _source: 'no-db' });
    }
    console.error('[GET /api/directory]', e);
    return NextResponse.json({ error: 'Failed to load directory.' }, { status: 500 });
  }
}
