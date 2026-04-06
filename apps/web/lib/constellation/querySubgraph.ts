import { prisma } from '@bigmuddy/database';

function nk(t: string, id: string) {
  return `${t}:${id}`;
}

function otherEndpoint(
  e: { fromType: string; fromId: string; toType: string; toId: string },
  curType: string,
  curId: string
): [string, string] {
  if (e.fromType === curType && e.fromId === curId) return [e.toType, e.toId];
  return [e.fromType, e.fromId];
}

export type ConstellationSubgraphResult =
  | { ok: false; error: string; notFound?: boolean }
  | {
      ok: true;
      root: { entityType: string; entityId: string; label: string };
      depth: number;
      nodes: Array<{
        id: string;
        entityType: string;
        entityId: string;
        label: string;
        subtitle: string | null;
        metadata: unknown;
      }>;
      edges: Array<{
        id: string;
        fromType: string;
        fromId: string;
        toType: string;
        toId: string;
        relation: string;
        weight: number;
      }>;
    };

/**
 * Read-only BFS subgraph for constellation layer (same semantics as GET /api/constellation).
 */
export async function queryConstellationSubgraph(
  entityType: string,
  entityId: string,
  depthInput: number
): Promise<ConstellationSubgraphResult> {
  const depth = Math.min(4, Math.max(0, depthInput));

  const root = await prisma.constellationNode.findUnique({
    where: { entityType_entityId: { entityType, entityId } },
  });

  if (!root) {
    return { ok: false, error: 'Node not found', notFound: true };
  }

  const visited = new Set<string>([nk(entityType, entityId)]);
  const queue: Array<{ entityType: string; entityId: string; dist: number }> = [
    { entityType, entityId, dist: 0 },
  ];
  const edgesOut: Awaited<ReturnType<typeof prisma.constellationEdge.findMany>> = [];
  const edgeSeen = new Set<string>();

  while (queue.length > 0) {
    const cur = queue.shift()!;
    if (cur.dist >= depth) continue;

    const adj = await prisma.constellationEdge.findMany({
      where: {
        OR: [
          { fromType: cur.entityType, fromId: cur.entityId },
          { toType: cur.entityType, toId: cur.entityId },
        ],
      },
    });

    for (const e of adj) {
      if (edgeSeen.has(e.id)) continue;
      edgeSeen.add(e.id);
      edgesOut.push(e);

      const [ot, oid] = otherEndpoint(e, cur.entityType, cur.entityId);
      const k = nk(ot, oid);
      if (!visited.has(k)) {
        visited.add(k);
        queue.push({ entityType: ot, entityId: oid, dist: cur.dist + 1 });
      }
    }
  }

  const keys = Array.from(visited);
  const orClause = keys.map((k) => {
    const i = k.indexOf(':');
    const et = k.slice(0, i);
    const eid = k.slice(i + 1);
    return { AND: [{ entityType: et }, { entityId: eid }] };
  });

  const nodes =
    orClause.length > 0
      ? await prisma.constellationNode.findMany({
          where: { OR: orClause },
        })
      : [];

  return {
    ok: true,
    root: { entityType: root.entityType, entityId: root.entityId, label: root.label },
    depth,
    nodes: nodes.map((n) => ({
      id: n.id,
      entityType: n.entityType,
      entityId: n.entityId,
      label: n.label,
      subtitle: n.subtitle,
      metadata: n.metadata,
    })),
    edges: edgesOut.map((e) => ({
      id: e.id,
      fromType: e.fromType,
      fromId: e.fromId,
      toType: e.toType,
      toId: e.toId,
      relation: e.relation,
      weight: e.weight,
    })),
  };
}

export async function queryConstellationStats(): Promise<{
  nodeCount: number;
  edgeCount: number;
}> {
  const [nodeCount, edgeCount] = await Promise.all([
    prisma.constellationNode.count(),
    prisma.constellationEdge.count(),
  ]);
  return { nodeCount, edgeCount };
}
