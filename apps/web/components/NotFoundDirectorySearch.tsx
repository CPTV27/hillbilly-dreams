'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';

type Hit = { id: number; name: string; slug: string; city: string; state: string };

export function NotFoundDirectorySearch() {
  const [q, setQ] = useState('');
  const [hits, setHits] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);

  const runSearch = useCallback(async () => {
    const term = q.trim();
    if (term.length < 2) {
      setHits([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/directory/search?q=${encodeURIComponent(term)}`);
      const json = await res.json();
      setHits(Array.isArray(json.data) ? json.data : []);
    } catch {
      setHits([]);
    } finally {
      setLoading(false);
    }
  }, [q]);

  return (
    <div style={{ width: '100%', maxWidth: 420, margin: '0 auto 1.5rem' }}>
      <p
        style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          margin: '0 0 0.75rem',
        }}
      >
        Looking for a local business?
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          id="nf-dir-q"
          type="search"
          aria-label="Search the directory"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && runSearch()}
          placeholder="Search name or town…"
          style={{
            flex: '1 1 200px',
            minHeight: 44,
            padding: '0.65rem 0.85rem',
            borderRadius: 8,
            border: '1px solid color-mix(in srgb, var(--text) 25%, transparent)',
            background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
            color: 'var(--text)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
          }}
        />
        <button
          type="button"
          onClick={runSearch}
          disabled={loading}
          style={{
            minHeight: 44,
            padding: '0.65rem 1.25rem',
            borderRadius: 8,
            border: 'none',
            background: 'var(--accent)',
            color: 'var(--bg)',
            fontWeight: 700,
            fontFamily: 'var(--font-body)',
            cursor: loading ? 'wait' : 'pointer',
          }}
        >
          {loading ? '…' : 'Search'}
        </button>
      </div>
      {hits.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            padding: '0.75rem 0 0',
            margin: 0,
            textAlign: 'left',
          }}
        >
          {hits.slice(0, 8).map((h) => (
            <li key={h.id} style={{ marginBottom: '0.5rem' }}>
              <Link
                href={`/directory/${h.slug}`}
                style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}
              >
                {h.name}
              </Link>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.35rem' }}>
                {h.city}, {h.state}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
