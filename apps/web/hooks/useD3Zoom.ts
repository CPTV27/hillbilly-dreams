import { useEffect, useState } from 'react';
import * as d3 from 'd3';

export function useD3Zoom(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 0.4 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const zoom = d3.zoom<HTMLCanvasElement, unknown>()
      .scaleExtent([0.2, 5])
      .on('zoom', (event) => {
        const t = event.transform;
        setTransform({ x: t.x, y: t.y, k: t.k });
      });

    const sel = d3.select(canvas);

    sel
      .call(zoom)
      .call(
        zoom.transform,
        d3.zoomIdentity
          .translate(window.innerWidth / 2, window.innerHeight / 2)
          .scale(0.4)
      );

    // Prevent Safari bounce
    canvas.style.touchAction = 'none';
    canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

    return () => {
      sel.on('.zoom', null);
    };
  }, [canvasRef]);

  return { transform };
}
