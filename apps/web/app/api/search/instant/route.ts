import { NextRequest, NextResponse } from 'next/server';
import { searchContext, searchBusinesses } from '@/lib/meilisearch-client';

/**
 * GET /api/search/instant?q=wedding+revenue&domain=strategy&limit=10
 * 
 * Instant search powered by Meilisearch.
 * Returns results in <10ms vs ~200ms for the Postgres keyword search.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get('q') || '';
  const domain = searchParams.get('domain') || undefined;
  const index = searchParams.get('index') || 'context';
  const limit = parseInt(searchParams.get('limit') || '20');

  if (!q) {
    return NextResponse.json({ error: 'q parameter required' }, { status: 400 });
  }

  try {
    if (index === 'businesses') {
      const results = await searchBusinesses(q, {
        category: searchParams.get('category') || undefined,
        tier: searchParams.get('tier') || undefined,
        limit,
      });
      return NextResponse.json({
        query: q,
        hits: results.hits,
        count: results.estimatedTotalHits,
        processingTimeMs: results.processingTimeMs,
      });
    }

    const results = await searchContext(q, { domain, limit });
    return NextResponse.json({
      query: q,
      hits: results.hits,
      count: results.estimatedTotalHits,
      processingTimeMs: results.processingTimeMs,
    });
  } catch (error: any) {
    // Fallback to Postgres search if Meilisearch is unavailable
    return NextResponse.json(
      { error: 'Search unavailable', detail: error.message, fallback: 'Use /api/agent/context?q=' + q },
      { status: 503 }
    );
  }
}
