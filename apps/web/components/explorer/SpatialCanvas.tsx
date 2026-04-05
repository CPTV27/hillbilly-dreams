'use client';
import { useEffect, useRef } from 'react';
import { useExplorerStore } from '../../stores/explorer-store';
import { useD3Zoom } from '../../hooks/useD3Zoom';
import CanvasRenderer from './CanvasRenderer';
import { NODES, EDGES } from './nodes';

export default function SpatialCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setNodes, setEdges } = useExplorerStore();
  const { transform } = useD3Zoom(canvasRef);

  useEffect(() => {
    setNodes(NODES);
    setEdges(EDGES);
  }, [setNodes, setEdges]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const ctx = canvas.getContext('2d', { alpha: false })!;
    let raf: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0f0d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      CanvasRenderer(ctx, NODES, EDGES, transform, frame);
      ctx.restore();
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [transform]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100vw',
        height: '100vh',
        background: '#0f0f0d',
        touchAction: 'none',
      }}
    />
  );
}
