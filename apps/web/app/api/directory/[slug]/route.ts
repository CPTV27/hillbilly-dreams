// apps/web/app/api/directory/[slug]/route.ts
// GET /api/directory/[slug] — public profile for a single directory client
//
// Returns public-safe fields only. Strips internal notes, billing, contact info,
// stripe IDs, and voice profiles. Only returns active clients.
//
// Usage: fetch('/api/directory/blues-city-cafe')

import { NextRequest, NextResponse } from 'next/server';

interface RawClient {
  id: number;
  name: string;
  slug: string;
  tier: string;
  businessType: string;
  city: string;
  state: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  description: string | null;
  logoUrl: string | null;
  heroImageUrl: string | null;
  gbpUrl: string | null;
  platforms: string[];
  status: string;
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
    address: client.address,
    phone: client.phone,
    website: client.website,
    description: client.description,
    logoUrl: client.logoUrl,
    heroImageUrl: client.heroImageUrl,
    gbpUrl: client.gbpUrl,
    platforms: client.platforms ?? [],
  };
}

type Params = { params: { slug: string } };

export async function GET(_request: NextRequest, { params }: Params) {
  const { slug } = params;

  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Invalid slug.' }, { status: 400 });
  }

  try {
    const { default: prisma } = await import('@bigmuddy/database');

    const client = await (prisma as any).client.findFirst({
      where: { slug, status: 'active' },
    });

    if (!client) {
      return NextResponse.json({ data: null, _note: 'Client not found or not active.' }, { status: 404 });
    }

    return NextResponse.json({ data: sanitize(client as RawClient) });
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
      return NextResponse.json({ data: null, _source: 'no-db' });
    }
    console.error(`[GET /api/directory/${slug}]`, e);
    return NextResponse.json({ error: 'Failed to load directory client.' }, { status: 500 });
  }
}
