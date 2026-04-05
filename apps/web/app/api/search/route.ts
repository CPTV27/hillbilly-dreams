export const dynamic = 'force-dynamic';
// apps/web/app/api/search/route.ts
// GET /api/search?q=live+blues+near+the+river&type=directory_business&limit=5
// Semantic vector search across all embedded content.

import { NextRequest, NextResponse } from 'next/server';
import { publicDataCorsHeaders } from '@/lib/public-data-cors';
import { searchSimilar, searchBusinesses } from '@/lib/vector-search';

export async function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 204, headers: publicDataCorsHeaders(request) });
}

export async function GET(request: NextRequest) {
  const cors = publicDataCorsHeaders(request);
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const entityType = searchParams.get('type') || undefined;
    const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 50);

    if (!query || query.trim().length < 3) {
      return NextResponse.json(
        { error: 'Query parameter "q" must be at least 3 characters' },
        { status: 400, headers: cors }
      );
    }

    // If searching businesses specifically, return enriched results
    if (entityType === 'directory_business') {
      const results = await searchBusinesses(query, limit);
      return NextResponse.json(
        {
          query,
          type: 'directory_business',
          results,
          count: results.length,
          model: 'text-embedding-005',
        },
        { headers: cors }
      );
    }

    // Generic vector search across all entity types
    const results = await searchSimilar(query, { entityType, limit });
    return NextResponse.json(
      {
        query,
        type: entityType || 'all',
        results: results.map((r) => ({
          entityType: r.entityType,
          entityId: r.entityId,
          score: Math.round((1 - r.distance) * 100) / 100,
          snippet: r.content.slice(0, 200) + (r.content.length > 200 ? '...' : ''),
        })),
        count: results.length,
        model: 'text-embedding-005',
      },
      { headers: cors }
    );
  } catch (error) {
    console.error('[API Error] GET /api/search', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500, headers: cors });
  }
}
