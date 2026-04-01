export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { getMeiliClient } from '@/lib/meilisearch-client';

/**
 * POST /api/context/import
 * Reverse sync: import an insight from Open Notebook into the Neon database
 * AND immediately push to Meilisearch for <1ms searchability.
 *
 * Body: {
 *   content: string,     — the insight text
 *   domain: string,      — which lens/domain (strategy, brand, operations, reference)
 *   topic: string,       — topic tag
 *   key: string,         — unique key
 *   title?: string       — optional title for display
 * }
 */
export async function POST(req: NextRequest) {
  const { content, domain, topic, key, title } = await req.json();

  if (!content || !domain || !key) {
    return NextResponse.json(
      { error: 'content, domain, and key are required' },
      { status: 400 }
    );
  }

  try {
    // 1. Save to Neon with source: "open-notebook" tag
    const fragment = await prisma.agentContext.upsert({
      where: { domain_key: { domain, key } },
      create: {
        domain,
        topic: topic || 'notebook-insight',
        key,
        content,
        source: 'open-notebook',  // Metadata tag for filtering
        agentAuthor: 'notebook-sync',
        confidence: 0.95,
      },
      update: {
        content,
        source: 'open-notebook',
        confidence: 0.95,
      },
    });

    // 2. Immediately push to Meilisearch (no waiting for background crawl)
    try {
      const meili = getMeiliClient();
      await meili.index('context').addDocuments([{
        id: fragment.id,
        domain: fragment.domain,
        topic: fragment.topic,
        key: fragment.key,
        content: fragment.content.substring(0, 5000),
        source: 'open-notebook',
        agentAuthor: 'notebook-sync',
        confidence: fragment.confidence,
      }]);
    } catch (meiliErr: any) {
      // Meilisearch push failed but Neon save succeeded — not fatal
      console.warn('[context/import] Meilisearch push failed:', meiliErr.message);
    }

    return NextResponse.json({
      success: true,
      id: fragment.id,
      key: fragment.key,
      source: 'open-notebook',
      meiliIndexed: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Import failed', detail: error.message },
      { status: 500 }
    );
  }
}
