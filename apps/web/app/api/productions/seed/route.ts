export const dynamic = 'force-dynamic';
// POST /api/productions/seed — seed the 6 campaign concepts from AG_PROMO_VIDEO_CAMPAIGN.md

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const CAMPAIGNS = [
  {
    name: 'Fits In Your Hand',
    slug: 'fits-in-your-hand',
    conceptNumber: 1,
    tagline: 'An entire media ecosystem in a box that fits in your hand',
  },
  {
    name: 'Twenty Dollars',
    slug: 'twenty-dollars',
    conceptNumber: 2,
    tagline: 'An AI that knows your business and your town',
  },
  {
    name: 'The Corridor',
    slug: 'the-corridor',
    conceptNumber: 3,
    tagline: 'The same architecture. Any town. Any corridor.',
  },
  {
    name: 'Built on Google',
    slug: 'built-on-google',
    conceptNumber: 4,
    tagline: 'Enterprise-grade AI. Main Street price.',
  },
  {
    name: 'Freedom',
    slug: 'freedom',
    conceptNumber: 5,
    tagline: 'You plug it in. It becomes you. You go live your life.',
  },
  {
    name: 'The Full Story',
    slug: 'the-full-story',
    conceptNumber: 6,
    tagline: 'Now Deploying to Your Town',
  },
];

export async function POST() {
  try {
    const results = [];

    for (const campaign of CAMPAIGNS) {
      const existing = await prisma.productionCampaign.findUnique({
        where: { slug: campaign.slug },
      });

      if (existing) {
        results.push({ ...campaign, status: 'already exists', id: existing.id });
        continue;
      }

      const created = await prisma.productionCampaign.create({ data: campaign });
      results.push({ ...campaign, status: 'created', id: created.id });
    }

    return NextResponse.json({
      success: true,
      campaigns: results,
    });
  } catch (err: any) {
    console.error('[productions/seed] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
