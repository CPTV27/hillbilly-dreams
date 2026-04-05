'use client';

/**
 * DSD map browse (#51) — MapLibre GL (Mapbox GL–compatible API), Carto basemap, no API key.
 */

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

type MapPoint = {
  id: number;
  name: string;
  slug: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
};

const BASE_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
const DEFAULT_CENTER: [number, number] = [-91.39, 31.56];

export default function DirectoryMapClient() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let cancelled = false;
    const markers: maplibregl.Marker[] = [];

    (async () => {
      try {
        const res = await fetch('/api/directory/map-points');
        const data = (await res.json()) as { businesses?: MapPoint[] };
        const businesses = Array.isArray(data.businesses) ? data.businesses : [];
        if (cancelled) return;

        const accent =
          getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c45b28';

        const map = new maplibregl.Map({
          container: el,
          style: BASE_STYLE,
          center: DEFAULT_CENTER,
          zoom: businesses.length ? 9 : 11,
          attributionControl: {},
        });
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
        mapRef.current = map;

        map.on('load', () => {
          if (cancelled) return;
          for (const b of businesses) {
            const m = new maplibregl.Marker({ color: accent }).setLngLat([b.lng, b.lat]).addTo(map);
            const a = document.createElement('a');
            a.href = `/directory/${encodeURIComponent(b.slug)}`;
            a.textContent = b.name;
            a.style.cssText =
              'font-family:var(--font-body);font-size:14px;font-weight:700;color:var(--text);text-decoration:none;display:block;margin-bottom:4px;';
            const sub = document.createElement('div');
            sub.textContent = `${b.city}, ${b.state}`;
            sub.style.cssText =
              'font-family:var(--font-body);font-size:12px;color:var(--text-muted);margin-bottom:8px;';
            const link = document.createElement('a');
            link.href = `/directory/${encodeURIComponent(b.slug)}`;
            link.textContent = 'View listing →';
            link.style.cssText =
              'font-family:var(--font-body);font-size:12px;color:var(--accent);font-weight:600;';
            const body = document.createElement('div');
            body.style.padding = '8px 10px';
            body.appendChild(a);
            body.appendChild(sub);
            body.appendChild(link);
            m.setPopup(new maplibregl.Popup({ offset: 16 }).setDOMContent(body));
            markers.push(m);
          }

          if (businesses.length > 0) {
            const bounds = new maplibregl.LngLatBounds(
              [businesses[0].lng, businesses[0].lat],
              [businesses[0].lng, businesses[0].lat]
            );
            for (const b of businesses) bounds.extend([b.lng, b.lat]);
            map.fitBounds(bounds, { padding: 48, maxZoom: 12 });
          }
          setLoading(false);
        });

        map.on('error', (e) => {
          setError(e.error?.message || 'Map failed to load');
          setLoading(false);
        });
      } catch {
        if (!cancelled) {
          setError('Could not load directory locations.');
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      markers.forEach((m) => m.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 2.5rem' }}>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          margin: '0 0 1rem',
        }}
      >
        {loading ? 'Loading map…' : `${error ? error + ' — ' : ''}Tap a pin for the business name and listing link.`}
      </p>
      <div
        ref={wrapRef}
        style={{
          width: '100%',
          height: 'min(70vh, 560px)',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          background: 'var(--surface)',
        }}
        role="region"
        aria-label="Deep South Directory map"
      />
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          color: 'var(--text-disabled)',
          margin: '0.75rem 0 0',
        }}
      >
        © OpenStreetMap contributors © CARTO
      </p>
    </div>
  );
}
