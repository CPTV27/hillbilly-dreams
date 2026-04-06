'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ConstellationCanvas } from './ConstellationCanvas';
import type { ConstellationApiResponse, ConstellationEdgeDTO, ConstellationNodeDTO } from './types';
import { ENTITY_REGISTRY } from './registry';

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--constellation-bg, var(--color-surface-900, #0f172a))',
    color: 'var(--constellation-fg, var(--color-text-primary, #e2e8f0))',
    fontFamily: 'var(--font-body, system-ui, sans-serif)',
    padding: 'clamp(1rem, 3vw, 2rem)',
  } as React.CSSProperties,
  header: {
    maxWidth: 960,
    marginBottom: '1.5rem',
  } as React.CSSProperties,
  title: {
    fontFamily: 'var(--font-display, var(--font-body, system-ui))',
    fontSize: 'clamp(1.35rem, 3vw, 1.75rem)',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    margin: '0 0 0.5rem',
  } as React.CSSProperties,
  lead: {
    margin: 0,
    opacity: 0.85,
    fontSize: '0.95rem',
    lineHeight: 1.5,
    maxWidth: 640,
  } as React.CSSProperties,
  panel: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.75rem',
    alignItems: 'flex-end',
    marginBottom: '1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
  },
  label: {
    fontSize: '0.7rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    opacity: 0.65,
  },
  input: {
    background: 'rgba(15,23,42,0.6)',
    border: '1px solid rgba(148,163,184,0.25)',
    borderRadius: 6,
    color: 'inherit',
    padding: '0.45rem 0.6rem',
    fontSize: '0.9rem',
    minWidth: 120,
  },
  select: {
    background: 'rgba(15,23,42,0.6)',
    border: '1px solid rgba(148,163,184,0.25)',
    borderRadius: 6,
    color: 'inherit',
    padding: '0.45rem 0.6rem',
    fontSize: '0.9rem',
  },
  button: {
    background: 'rgba(56,189,248,0.15)',
    border: '1px solid rgba(56,189,248,0.45)',
    color: 'var(--constellation-accent, #7dd3fc)',
    borderRadius: 6,
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  canvasWrap: {
    width: '100%',
    maxWidth: 1100,
    borderRadius: 12,
    border: '1px solid rgba(148,163,184,0.2)',
    overflow: 'hidden' as const,
    background: 'rgba(2,6,23,0.5)',
  },
  legend: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.75rem 1.25rem',
    marginTop: '1rem',
    fontSize: '0.8rem',
    opacity: 0.9,
  },
  legendItem: { display: 'flex', alignItems: 'center', gap: 8 },
  dot: (c: string): React.CSSProperties => ({
    width: 10,
    height: 10,
    borderRadius: 999,
    background: c,
    flexShrink: 0,
  }),
  err: {
    padding: '0.75rem 1rem',
    borderRadius: 8,
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.35)',
    color: '#fecaca',
    fontSize: '0.9rem',
    maxWidth: 640,
  },
};

export function ConstellationExplorer() {
  const [entityType, setEntityType] = useState('venue');
  const [entityId, setEntityId] = useState('1');
  const [depth, setDepth] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metaMsg, setMetaMsg] = useState<string | null>(null);
  const [nodes, setNodes] = useState<ConstellationNodeDTO[]>([]);
  const [edges, setEdges] = useState<ConstellationEdgeDTO[]>([]);
  const [root, setRoot] = useState<{ entityType: string; entityId: string; label: string } | null>(null);
  const [box, setBox] = useState({ w: 640, h: 420 });

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setMetaMsg(null);
    try {
      const u = new URL('/api/constellation', window.location.origin);
      u.searchParams.set('entityType', entityType);
      u.searchParams.set('entityId', entityId);
      u.searchParams.set('depth', String(depth));
      const res = await fetch(u.toString());
      const data = (await res.json()) as ConstellationApiResponse;
      if (!data.ok) {
        setError('error' in data ? data.error : 'Request failed');
        setNodes([]);
        setEdges([]);
        setRoot(null);
        return;
      }
      if (data.nodes && data.edges && data.root) {
        setNodes(data.nodes);
        setEdges(data.edges);
        setRoot(data.root);
      }
    } catch {
      setError('Failed to load constellation');
      setNodes([]);
      setEdges([]);
      setRoot(null);
    } finally {
      setLoading(false);
    }
  }, [entityType, entityId, depth]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/api/constellation');
        const data = (await res.json()) as ConstellationApiResponse;
        if (!alive) return;
        if (data.ok && 'message' in data && data.message) setMetaMsg(data.message);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const el = typeof document !== 'undefined' ? document.getElementById('constellation-canvas-host') : null;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr && cr.width > 0) {
        const h = Math.max(320, Math.min(560, cr.width * 0.55));
        setBox({ w: Math.floor(cr.width), h: Math.floor(h) });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const legend = useMemo(
    () =>
      Object.entries(ENTITY_REGISTRY).map(([k, v]) => (
        <div key={k} style={styles.legendItem}>
          <span style={styles.dot(v.hue)} />
          <span>{v.label}</span>
        </div>
      )),
    []
  );

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Postgres constellation</h1>
        <p style={styles.lead}>
          Derived graph from touring venues, routes, corridor cities, and Deep South Directory listings. One query
          path — no separate graph database. Depth limits how far neighbors expand from the root node.
        </p>
      </header>

      {metaMsg ? <p style={{ ...styles.lead, marginBottom: '1rem', opacity: 0.75 }}>{metaMsg}</p> : null}
      {error ? <div style={styles.err}>{error}</div> : null}

      <div style={styles.panel}>
        <div style={styles.field}>
          <span style={styles.label}>Entity type</span>
          <select
            style={styles.select}
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            aria-label="Entity type"
          >
            {Object.keys(ENTITY_REGISTRY).map((k) => (
              <option key={k} value={k}>
                {ENTITY_REGISTRY[k].label}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.field}>
          <span style={styles.label}>Entity id</span>
          <input
            style={styles.input}
            value={entityId}
            onChange={(e) => setEntityId(e.target.value)}
            inputMode="numeric"
            aria-label="Entity id"
          />
        </div>
        <div style={styles.field}>
          <span style={styles.label}>Depth</span>
          <input
            style={styles.input}
            type="number"
            min={0}
            max={4}
            value={depth}
            onChange={(e) => setDepth(Math.min(4, Math.max(0, parseInt(e.target.value, 10) || 0)))}
            aria-label="Traversal depth"
          />
        </div>
        <button type="button" style={styles.button} onClick={() => void load()} disabled={loading}>
          {loading ? 'Loading…' : 'Load subgraph'}
        </button>
      </div>

      <div id="constellation-canvas-host" style={styles.canvasWrap}>
        {root ? (
          <ConstellationCanvas
            nodes={nodes}
            edges={edges}
            rootType={root.entityType}
            rootId={root.entityId}
            width={box.w}
            height={box.h}
          />
        ) : (
          <div style={{ padding: '2rem', opacity: 0.7, fontSize: '0.9rem' }}>
            Set entity type and id, then load — or confirm the database has constellation rows (seed + view refresh).
          </div>
        )}
      </div>

      <div style={styles.legend}>{legend}</div>

      <p style={{ ...styles.lead, marginTop: '2rem', fontSize: '0.8rem', opacity: 0.6 }}>
        We build local. The value stays local. We grow from within.
      </p>
    </div>
  );
}
