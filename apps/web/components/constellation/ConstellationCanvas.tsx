'use client';

import { useEffect, useRef } from 'react';
import type { ConstellationEdgeDTO, ConstellationNodeDTO } from './types';
import { entityStyle } from './registry';

type Props = {
  nodes: ConstellationNodeDTO[];
  edges: ConstellationEdgeDTO[];
  rootType: string;
  rootId: string;
  width: number;
  height: number;
};

function nk(t: string, id: string) {
  return `${t}:${id}`;
}

function layout(
  nodes: ConstellationNodeDTO[],
  rootType: string,
  rootId: string,
  w: number,
  h: number
): Map<string, { x: number; y: number }> {
  const cx = w / 2;
  const cy = h / 2;
  const m = new Map<string, { x: number; y: number }>();
  const rk = nk(rootType, rootId);
  m.set(rk, { x: cx, y: cy });
  const rest = nodes.filter((n) => nk(n.entityType, n.entityId) !== rk);
  const R = Math.min(w, h) * 0.34;
  rest.forEach((n, i) => {
    const angle = (2 * Math.PI * i) / Math.max(rest.length, 1);
    m.set(nk(n.entityType, n.entityId), {
      x: cx + Math.cos(angle) * R,
      y: cy + Math.sin(angle) * R,
    });
  });
  return m;
}

export function ConstellationCanvas({ nodes, edges, rootType, rootId, width, height }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || width < 16 || height < 16) return;
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const pos = layout(nodes, rootType, rootId, width, height);
    const lineColor =
      typeof getComputedStyle !== 'undefined'
        ? getComputedStyle(document.documentElement).getPropertyValue('--constellation-edge').trim() ||
          'rgba(148,163,184,0.35)'
        : 'rgba(148,163,184,0.35)';

    ctx.lineWidth = 1;
    for (const e of edges) {
      const a = pos.get(nk(e.fromType, e.fromId));
      const b = pos.get(nk(e.toType, e.toId));
      if (!a || !b) continue;
      ctx.strokeStyle = lineColor;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    const r = 6;
    for (const n of nodes) {
      const p = pos.get(nk(n.entityType, n.entityId));
      if (!p) continue;
      const { color } = entityStyle(n.entityType);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle =
        typeof getComputedStyle !== 'undefined'
          ? getComputedStyle(document.documentElement).getPropertyValue('--constellation-label').trim() ||
            '#e2e8f0'
          : '#e2e8f0';
      ctx.font = '11px var(--font-body, system-ui, sans-serif)';
      const text = n.label.length > 28 ? `${n.label.slice(0, 26)}…` : n.label;
      ctx.fillText(text, p.x + r + 4, p.y + 3);
    }
  }, [nodes, edges, rootType, rootId, width, height]);

  return <canvas ref={ref} aria-label="Constellation graph" role="img" />;
}
