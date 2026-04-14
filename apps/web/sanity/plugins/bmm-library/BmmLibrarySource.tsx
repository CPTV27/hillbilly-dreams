// apps/web/sanity/plugins/bmm-library/BmmLibrarySource.tsx
// Custom Sanity asset source component for the Big Muddy Photo Library.
//
// This is rendered inside Sanity Studio when an editor clicks the
// "Big Muddy Photo Library" button on any image field. It fetches the
// master index from /api/photo-library (which proxies GCS index.json)
// and shows a filterable grid. Picking a photo passes a URL back to
// Sanity, which re-hosts it on cdn.sanity.io with the metadata we
// provide in assetDocumentProps.

/* eslint-disable react/no-unknown-property */

import { useEffect, useMemo, useState } from 'react';
import type { AssetSourceComponentProps, AssetFromSource } from 'sanity';

// ─── Types matching scripts/sync-approved.ts ─────────────────────────────────

interface LibraryPhoto {
  hash: string;
  region: string;
  city: string;
  shoot: string;
  category: string | null;
  subjects: string[];
  caption: string | null;
  credit: string | null;
  capturedAt: string | null;
  gps: { lat: number; lng: number } | null;
  camera: string | null;
  lens: string | null;
  originalFilename: string;
  urls: { orig: string; grid: string; thumb: string };
  widths: { orig: number; grid: number; thumb: number };
}

interface LibraryIndex {
  version: 1;
  generated: string;
  photos: LibraryPhoto[];
}

// ─── Styling (inline, theme-token aware) ─────────────────────────────────────

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.7)',
  zIndex: 10000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
};

const modalStyle: React.CSSProperties = {
  background: 'var(--card-bg-color, #1a1a1a)',
  color: 'var(--card-fg-color, #e6e6e6)',
  width: '100%',
  maxWidth: '1200px',
  maxHeight: '90vh',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
};

const headerStyle: React.CSSProperties = {
  padding: '16px 20px',
  borderBottom: '1px solid var(--card-border-color, #2a2a2a)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  flexShrink: 0,
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '16px',
  fontWeight: 600,
  letterSpacing: '0.2px',
};

const closeBtnStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'inherit',
  fontSize: '20px',
  cursor: 'pointer',
  padding: '4px 10px',
  borderRadius: '4px',
};

const filtersStyle: React.CSSProperties = {
  padding: '12px 20px',
  borderBottom: '1px solid var(--card-border-color, #2a2a2a)',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',
  flexShrink: 0,
};

const chipStyle = (active: boolean): React.CSSProperties => ({
  padding: '6px 12px',
  borderRadius: '999px',
  border: `1px solid ${active ? 'var(--accent, #f97316)' : 'var(--card-border-color, #333)'}`,
  background: active ? 'var(--accent, #f97316)' : 'transparent',
  color: active ? '#fff' : 'inherit',
  fontSize: '13px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
});

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  opacity: 0.6,
  marginRight: '4px',
};

const gridStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  padding: '20px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: '12px',
  alignContent: 'start',
};

const cardStyle = (selected: boolean): React.CSSProperties => ({
  position: 'relative',
  borderRadius: '6px',
  overflow: 'hidden',
  aspectRatio: '1 / 1',
  background: '#0a0a0a',
  border: `2px solid ${selected ? 'var(--accent, #f97316)' : 'transparent'}`,
  cursor: 'pointer',
  transition: 'transform 0.1s ease, border-color 0.1s ease',
});

const captionStyle: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  padding: '8px 10px',
  fontSize: '11px',
  lineHeight: 1.3,
  color: '#fff',
  background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  pointerEvents: 'none',
};

const footerStyle: React.CSSProperties = {
  padding: '12px 20px',
  borderTop: '1px solid var(--card-border-color, #2a2a2a)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  flexShrink: 0,
};

const insertBtnStyle = (disabled: boolean): React.CSSProperties => ({
  padding: '8px 16px',
  borderRadius: '4px',
  border: 'none',
  background: disabled ? 'var(--card-border-color, #333)' : 'var(--accent, #f97316)',
  color: disabled ? 'var(--card-fg-color-muted, #777)' : '#fff',
  fontSize: '14px',
  fontWeight: 600,
  cursor: disabled ? 'not-allowed' : 'pointer',
});

const emptyStateStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '60px 20px',
  textAlign: 'center',
  gap: '8px',
  opacity: 0.7,
};

// ─── Component ───────────────────────────────────────────────────────────────

type Filter = { region: string | null; city: string | null; category: string | null };

export function BmmLibrarySource(props: AssetSourceComponentProps) {
  const { onSelect, onClose } = props;

  const [index, setIndex] = useState<LibraryIndex | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>({ region: null, city: null, category: null });

  // Fetch the library index on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/photo-library', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as LibraryIndex;
        if (!cancelled) {
          setIndex(json);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError((e as Error).message);
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Derived filter options from the current index
  const { regions, cities, categories, filteredPhotos } = useMemo(() => {
    if (!index) {
      return {
        regions: [] as string[],
        cities: [] as string[],
        categories: [] as string[],
        filteredPhotos: [] as LibraryPhoto[],
      };
    }
    const regionSet = new Set<string>();
    const citySet = new Set<string>();
    const catSet = new Set<string>();
    for (const p of index.photos) {
      regionSet.add(p.region);
      if (!filter.region || p.region === filter.region) citySet.add(p.city);
      if (p.category) catSet.add(p.category);
    }
    const filtered = index.photos.filter((p) => {
      if (filter.region && p.region !== filter.region) return false;
      if (filter.city && p.city !== filter.city) return false;
      if (filter.category && p.category !== filter.category) return false;
      return true;
    });
    return {
      regions: Array.from(regionSet).sort(),
      cities: Array.from(citySet).sort(),
      categories: Array.from(catSet).sort(),
      filteredPhotos: filtered,
    };
  }, [index, filter]);

  const handlePhotoClick = (photo: LibraryPhoto) => {
    // Sanity v3.99 asset sources only support single-select, so pick immediately.
    const asset: AssetFromSource = {
      kind: 'url',
      value: photo.urls.orig,
      // Partial ImageAsset — Sanity fills the rest when it re-hosts the URL.
      // Cast because the ImageAsset type is strict and we're intentionally
      // providing a subset of fields that Studio accepts at runtime.
      assetDocumentProps: {
        originalFilename: photo.originalFilename,
        label: photo.city,
        title: photo.caption ?? photo.originalFilename,
        description: photo.subjects.length ? photo.subjects.join(', ') : undefined,
        creditLine: photo.credit ?? undefined,
        source: {
          id: photo.hash,
          name: 'bmm-library',
          url: photo.urls.orig,
        },
      } as unknown as AssetFromSource['assetDocumentProps'],
    };
    onSelect([asset]);
    onClose();
  };

  // Render
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Big Muddy Photo Library"
      >
        <header style={headerStyle}>
          <h2 style={titleStyle}>Big Muddy Photo Library</h2>
          <button type="button" style={closeBtnStyle} onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        {/* Filters */}
        {!loading && !error && index && index.photos.length > 0 && (
          <div style={filtersStyle}>
            <span style={labelStyle}>Region</span>
            <button
              type="button"
              style={chipStyle(filter.region === null)}
              onClick={() => setFilter({ region: null, city: null, category: filter.category })}
            >
              All
            </button>
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                style={chipStyle(filter.region === r)}
                onClick={() => setFilter({ region: r, city: null, category: filter.category })}
              >
                {r}
              </button>
            ))}
            {cities.length > 0 && (
              <>
                <span style={{ ...labelStyle, marginLeft: '12px' }}>City</span>
                <button
                  type="button"
                  style={chipStyle(filter.city === null)}
                  onClick={() => setFilter({ ...filter, city: null })}
                >
                  All
                </button>
                {cities.map((c) => (
                  <button
                    key={c}
                    type="button"
                    style={chipStyle(filter.city === c)}
                    onClick={() => setFilter({ ...filter, city: c })}
                  >
                    {c}
                  </button>
                ))}
              </>
            )}
            {categories.length > 0 && (
              <>
                <span style={{ ...labelStyle, marginLeft: '12px' }}>Category</span>
                <button
                  type="button"
                  style={chipStyle(filter.category === null)}
                  onClick={() => setFilter({ ...filter, category: null })}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    style={chipStyle(filter.category === c)}
                    onClick={() => setFilter({ ...filter, category: c })}
                  >
                    {c}
                  </button>
                ))}
              </>
            )}
          </div>
        )}

        {/* Grid / loading / empty / error */}
        {loading && (
          <div style={emptyStateStyle}>
            <span>Loading library…</span>
          </div>
        )}
        {error && (
          <div style={emptyStateStyle}>
            <strong>Could not load library</strong>
            <span style={{ fontSize: '13px' }}>{error}</span>
            <span style={{ fontSize: '12px' }}>
              Check that `/api/photo-library` is reachable and that a sync has run.
            </span>
          </div>
        )}
        {!loading && !error && index && index.photos.length === 0 && (
          <div style={emptyStateStyle}>
            <strong>Library is empty</strong>
            <span style={{ fontSize: '13px' }}>
              Run <code>pnpm tsx scripts/sync-approved.ts &lt;folder&gt;</code> to add photos.
            </span>
          </div>
        )}
        {!loading && !error && filteredPhotos.length > 0 && (
          <div style={gridStyle}>
            {filteredPhotos.map((p) => (
              <div
                key={p.hash}
                style={cardStyle(false)}
                onClick={() => handlePhotoClick(p)}
                role="button"
                tabIndex={0}
                aria-label={p.caption ?? p.originalFilename}
              >
                <img
                  src={p.urls.thumb}
                  alt={p.caption ?? p.originalFilename}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {p.caption && <div style={captionStyle}>{p.caption}</div>}
              </div>
            ))}
          </div>
        )}
        {!loading && !error && index && index.photos.length > 0 && filteredPhotos.length === 0 && (
          <div style={emptyStateStyle}>
            <span>No photos match the current filters.</span>
          </div>
        )}

        {/* Footer */}
        <footer style={footerStyle}>
          <span style={{ fontSize: '12px', opacity: 0.6 }}>
            {index
              ? `${filteredPhotos.length} of ${index.photos.length} photo${index.photos.length === 1 ? '' : 's'}`
              : ''}
          </span>
          <span style={{ fontSize: '12px', opacity: 0.6 }}>
            Click any photo to insert it.
          </span>
        </footer>
      </div>
    </div>
  );
}
