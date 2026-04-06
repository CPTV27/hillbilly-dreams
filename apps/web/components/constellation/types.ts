export type ConstellationNodeDTO = {
  id: string;
  entityType: string;
  entityId: string;
  label: string;
  subtitle: string | null;
  metadata: unknown;
};

export type ConstellationEdgeDTO = {
  id: string;
  fromType: string;
  fromId: string;
  toType: string;
  toId: string;
  relation: string;
  weight: number;
};

export type ConstellationApiResponse =
  | {
      ok: true;
      root?: { entityType: string; entityId: string; label: string };
      depth?: number;
      nodes?: ConstellationNodeDTO[];
      edges?: ConstellationEdgeDTO[];
      meta?: { nodeCount: number; edgeCount: number };
      message?: string;
    }
  | { ok: false; error: string; entityType?: string; entityId?: string };
