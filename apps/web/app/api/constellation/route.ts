import { NextRequest, NextResponse } from 'next/server';
import { queryConstellationStats, queryConstellationSubgraph } from '@/lib/constellation/querySubgraph';

/**
 * GET /api/constellation
 * Query: entityType, entityId (required for graph), depth (0–4, default 2)
 * Without entity params: returns node/edge counts (health / empty-state).
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const entityType = searchParams.get('entityType');
  const entityId = searchParams.get('entityId');
  const depth = Math.min(4, Math.max(0, parseInt(searchParams.get('depth') || '2', 10) || 2));

  if (!entityType || !entityId) {
    try {
      const { nodeCount, edgeCount } = await queryConstellationStats();
      return NextResponse.json({
        ok: true,
        meta: { nodeCount, edgeCount },
        message:
          nodeCount === 0
            ? 'Constellation is empty — run seed-constellation and refresh views.'
            : 'Pass entityType and entityId to load a subgraph.',
      });
    } catch (e) {
      console.error('[constellation] meta query failed', e);
      return NextResponse.json({ ok: false, error: 'Database unavailable' }, { status: 503 });
    }
  }

  try {
    const result = await queryConstellationSubgraph(entityType, entityId, depth);
    if (!result.ok) {
      if (result.notFound) {
        return NextResponse.json(
          { ok: false, error: result.error, entityType, entityId },
          { status: 404 }
        );
      }
      return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
    }
    return NextResponse.json({
      ok: true,
      root: result.root,
      depth: result.depth,
      nodes: result.nodes,
      edges: result.edges,
    });
  } catch (e) {
    console.error('[constellation] subgraph failed', e);
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 });
  }
}
