import { NextRequest, NextResponse } from 'next/server';
import { PublicQueries } from '@bigmuddy/database/lib/public-queries';

/**
 * GET /api/public/knowledge
 *
 * Public endpoint for AI assistant queries. Returns ONLY public data —
 * never billing, client info, or internal operations.
 *
 * Query params:
 *   topic — filter by topic (e.g., "restaurants", "music", "lodging")
 *   city — filter by city (e.g., "natchez", "clarksdale")
 *   category — filter directory by category
 *   type — what to search: "all" | "articles" | "listings" | "events" | "knowledge"
 *   limit — max results per type (default 10)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get('topic') || undefined;
  const city = searchParams.get('city') || undefined;
  const category = searchParams.get('category') || undefined;
  const type = searchParams.get('type') || 'all';
  const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 50);

  try {
    const results: Record<string, unknown> = {};

    if (type === 'all' || type === 'listings') {
      results.listings = await PublicQueries.directoryListings({ city, category, limit });
    }

    if (type === 'all' || type === 'articles') {
      results.articles = await PublicQueries.articles({ city, category, limit });
    }

    if (type === 'all' || type === 'events') {
      results.events = await PublicQueries.events({ limit });
    }

    if (type === 'all' || type === 'knowledge') {
      results.knowledge = await PublicQueries.agentContext({ topic, limit });
    }

    return NextResponse.json({
      success: true,
      data: results,
      _notice: 'This endpoint returns public data only. No client, billing, or internal data is included.',
    });
  } catch (err) {
    console.error('[public/knowledge] Error:', err);
    return NextResponse.json({ error: 'Failed to fetch public knowledge' }, { status: 500 });
  }
}
