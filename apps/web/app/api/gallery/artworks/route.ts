// apps/web/app/api/gallery/artworks/route.ts
// BuyCurious Art — Artworks API
// GET /api/gallery/artworks
// Optional query params: medium, artist (slug), category, featured (boolean), available (boolean)
//
// Currently returns demo data. Structured for direct Prisma swap:
//   1. Replace the demo filter block with a prisma.artwork.findMany({ where }) call
//   2. The response shape is identical to the Prisma Artwork model (minus Json quirks)

import { NextRequest, NextResponse } from 'next/server';
import { DEMO_ARTWORKS, DEMO_ARTISTS, type DemoArtwork } from '../../../gallery/demo-data';

// ── Types ─────────────────────────────────────────────────────

interface ArtworkWithArtist extends DemoArtwork {
  artist: {
    name: string;
    slug: string;
    city: string | undefined;
    state: string | undefined;
    medium: string | undefined;
  };
}

// ── Handler ───────────────────────────────────────────────────

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;

  const medium = searchParams.get('medium') ?? null;
  const artistSlug = searchParams.get('artist') ?? null;
  const category = searchParams.get('category') ?? null;
  const featuredParam = searchParams.get('featured');
  const availableParam = searchParams.get('available');
  const limitParam = searchParams.get('limit');

  const featured = featuredParam === 'true' ? true : featuredParam === 'false' ? false : null;
  const available = availableParam === 'false' ? false : true; // default to available only
  const limit = limitParam ? parseInt(limitParam, 10) : 50;

  // ── Filter demo data (swap for Prisma where clause) ──────────
  let results = DEMO_ARTWORKS as DemoArtwork[];

  if (available !== null) {
    results = results.filter((w) => w.available === available);
  }

  if (featured !== null) {
    results = results.filter((w) => w.featured === featured);
  }

  if (medium) {
    // Case-insensitive partial match on artwork medium string
    const mediumLower = medium.toLowerCase();
    results = results.filter((w) => w.medium?.toLowerCase().includes(mediumLower));
  }

  if (artistSlug) {
    const artist = DEMO_ARTISTS.find((a) => a.slug === artistSlug);
    if (artist) {
      results = results.filter((w) => w.artistId === artist.id);
    } else {
      results = [];
    }
  }

  if (category) {
    results = results.filter((w) => w.category === category);
  }

  results = results.slice(0, Math.min(limit, 100));

  // ── Hydrate artist data ──────────────────────────────────────
  const hydrated: ArtworkWithArtist[] = results.map((w) => {
    const artist = DEMO_ARTISTS.find((a) => a.id === w.artistId);
    return {
      ...w,
      artist: {
        name: artist?.name ?? w.artistName,
        slug: artist?.slug ?? w.artistSlug,
        city: artist?.city,
        state: artist?.state,
        medium: artist?.medium,
      },
    };
  });

  return NextResponse.json(
    {
      data: hydrated,
      meta: {
        total: hydrated.length,
        filters: { medium, artist: artistSlug, category, featured, available },
        source: 'demo', // Change to 'prisma' once DB is live
      },
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    }
  );
}
