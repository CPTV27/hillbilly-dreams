export const dynamic = 'force-dynamic';
// apps/web/app/api/embeddings/index/route.ts
// POST /api/embeddings/index
// Index entities into the vector search system.
// Admin only.

import { NextRequest, NextResponse } from 'next/server';
import { embedDirectoryBusiness, embedArticle, reindexAll } from '@/lib/embedding-pipeline';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Full reindex
    if (body.reindexAll) {
      const result = await reindexAll();
      return NextResponse.json({
        success: true,
        indexed: { businesses: result.businesses, articles: result.articles },
        errors: result.errors,
      });
    }

    // Single entity index
    const { entityType, entityId } = body;
    if (!entityType || !entityId) {
      return NextResponse.json(
        { error: 'Either { reindexAll: true } or { entityType, entityId } is required' },
        { status: 400 }
      );
    }

    if (entityType === 'directory_business') {
      await embedDirectoryBusiness(parseInt(entityId, 10));
    } else if (entityType === 'article') {
      await embedArticle(parseInt(entityId, 10));
    } else {
      return NextResponse.json({ error: `Unknown entityType: ${entityType}` }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      indexed: { entityType, entityId },
    });
  } catch (error) {
    console.error('[API Error] POST /api/embeddings/index', error);
    return NextResponse.json({ error: 'Indexing failed' }, { status: 500 });
  }
}
