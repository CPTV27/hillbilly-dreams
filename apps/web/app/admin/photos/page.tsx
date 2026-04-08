'use client';

import { useState, useCallback } from 'react';

interface PhotoResult {
  slug: string;
  thumb: string;
  grid: string;
  hero: string;
  labels: string[];
  objects: string[];
  tags: string[];
  mood: string[];
  brand: string;
  location: { city: string; state: string };
  score: number;
}

export default function PhotoSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PhotoResult[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<PhotoResult | null>(null);
  const [rejected, setRejected] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('photo-rejected');
        return saved ? new Set(JSON.parse(saved)) : new Set();
      } catch { return new Set(); }
    }
    return new Set();
  });
  const [approved, setApproved] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('photo-approved');
        return saved ? new Set(JSON.parse(saved)) : new Set();
      } catch { return new Set(); }
    }
    return new Set();
  });
  const [showRejected, setShowRejected] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'approved' | 'rejected'>('all');
  const [hideJunk, setHideJunk] = useState(true);

  const reject = (slug: string) => {
    const next = new Set(rejected);
    next.add(slug);
    setRejected(next);
    localStorage.setItem('photo-rejected', JSON.stringify(Array.from(next)));
    // Remove from approved if it was there
    const nextApproved = new Set(approved);
    nextApproved.delete(slug);
    setApproved(nextApproved);
    localStorage.setItem('photo-approved', JSON.stringify(Array.from(nextApproved)));
    setSelected(null);
  };

  const approve = (slug: string) => {
    const next = new Set(approved);
    next.add(slug);
    setApproved(next);
    localStorage.setItem('photo-approved', JSON.stringify(Array.from(next)));
    // Remove from rejected if it was there
    const nextRejected = new Set(rejected);
    nextRejected.delete(slug);
    setRejected(nextRejected);
    localStorage.setItem('photo-rejected', JSON.stringify(Array.from(nextRejected)));
    setSelected(null);
  };

  const unreject = (slug: string) => {
    const next = new Set(rejected);
    next.delete(slug);
    setRejected(next);
    localStorage.setItem('photo-rejected', JSON.stringify(Array.from(next)));
    setSelected(null);
  };

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/photos/search?q=${encodeURIComponent(q)}&limit=80&hideJunk=${hideJunk}`);
      const data = await res.json();
      setResults(data.results);
      setTotal(data.total);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    const timeout = setTimeout(() => search(val), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a08',
      color: '#e8e0d4',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
    }}>
      {/* Search bar */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#0a0a08',
        borderBottom: '1px solid rgba(200,148,62,0.1)',
        padding: '20px clamp(16px, 4vw, 40px)',
      }}>
        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder="Search 16,936 photos — try 'horn players', 'sunset', 'console', 'river'..."
          autoFocus
          style={{
            width: '100%',
            padding: '16px 20px',
            fontSize: '1.1rem',
            background: '#141410',
            border: '1px solid rgba(200,148,62,0.2)',
            borderRadius: '4px',
            color: '#e8e0d4',
            outline: 'none',
            fontFamily: 'var(--font-body, system-ui, sans-serif)',
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px',
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: '#6b635a', margin: 0 }}>
              {loading ? 'Searching...' : total > 0 ? `${total} results` : query ? 'No results' : ''}
              {approved.size > 0 && <span style={{ color: '#4a9e4a' }}> · {approved.size} approved</span>}
              {rejected.size > 0 && <span style={{ color: '#9e4a4a' }}> · {rejected.size} rejected</span>}
            </p>
            <button
              onClick={() => setFilterMode(filterMode === 'all' ? 'approved' : filterMode === 'approved' ? 'rejected' : 'all')}
              style={{
                padding: '3px 10px',
                fontSize: '0.6rem',
                background: filterMode === 'approved' ? 'rgba(74,158,74,0.15)' : filterMode === 'rejected' ? 'rgba(158,74,74,0.15)' : 'transparent',
                border: '1px solid rgba(200,148,62,0.15)',
                borderRadius: '2px',
                color: filterMode === 'approved' ? '#4a9e4a' : filterMode === 'rejected' ? '#9e4a4a' : '#9b9488',
                cursor: 'pointer',
                fontFamily: 'var(--font-body, system-ui, sans-serif)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {filterMode === 'all' ? 'Show All' : filterMode === 'approved' ? 'Approved Only' : 'Rejected Only'}
            </button>
            <button
              onClick={() => { setHideJunk(!hideJunk); search(query); }}
              style={{
                padding: '3px 10px',
                fontSize: '0.6rem',
                background: hideJunk ? 'rgba(158,74,74,0.15)' : 'transparent',
                border: '1px solid rgba(200,148,62,0.15)',
                borderRadius: '2px',
                color: hideJunk ? '#c8943e' : '#6b635a',
                cursor: 'pointer',
                fontFamily: 'var(--font-body, system-ui, sans-serif)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {hideJunk ? 'Junk Hidden' : 'Show All'}
            </button>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['horn players', 'trumpet', 'saxophone', 'guitar', 'drums', 'piano', 'violin',
              'stage', 'concert', 'river', 'sunset', 'night', 'street',
              'balcony iron', 'mansion', 'architecture', 'church',
              'food', 'bar', 'console', 'studio',
              'portrait', 'crowd', 'bridge', 'tree'].map(tag => (
              <button
                key={tag}
                onClick={() => { setQuery(tag); search(tag); }}
                style={{
                  padding: '4px 10px',
                  fontSize: '0.65rem',
                  background: 'transparent',
                  border: '1px solid rgba(200,148,62,0.15)',
                  borderRadius: '2px',
                  color: '#9b9488',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body, system-ui, sans-serif)',
                  letterSpacing: '0.05em',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '4px',
        padding: '4px',
      }}>
        {results.filter(photo => {
          if (filterMode === 'approved') return approved.has(photo.slug);
          if (filterMode === 'rejected') return rejected.has(photo.slug);
          return !rejected.has(photo.slug); // default hides rejected
        }).map((photo) => (
          <div
            key={photo.slug}
            onClick={() => setSelected(photo)}
            style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
          >
            <img
              src={photo.grid || photo.thumb}
              alt={photo.labels.slice(0, 3).join(', ')}
              loading="lazy"
              style={{
                width: '100%',
                aspectRatio: '4/3',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'scale(1.03)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
            />
            {approved.has(photo.slug) && (
              <div style={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#4a9e4a',
              }} />
            )}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '24px 8px 6px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
            }}>
              <p style={{
                fontSize: '0.55rem',
                color: '#c8943e',
                margin: 0,
                letterSpacing: '0.05em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {photo.labels.slice(0, 3).join(' · ')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            cursor: 'pointer',
          }}
        >
          <img
            src={selected.hero || selected.grid}
            alt=""
            style={{
              maxWidth: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
              borderRadius: '2px',
            }}
          />
          <div style={{
            marginTop: '20px',
            textAlign: 'center',
            maxWidth: '600px',
          }}>
            <p style={{ fontSize: '0.85rem', color: '#e8e0d4', margin: '0 0 8px' }}>
              {selected.labels.join(' · ')}
            </p>
            {selected.objects.length > 0 && (
              <p style={{ fontSize: '0.75rem', color: '#9b9488', margin: '0 0 8px' }}>
                Objects: {selected.objects.join(', ')}
              </p>
            )}
            <p style={{ fontSize: '0.65rem', color: '#6b635a', margin: '0 0 4px' }}>
              {selected.slug} · {selected.brand} · {selected.location?.city || 'Unknown'}
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'center' }}>
              <button
                onClick={(e) => { e.stopPropagation(); approve(selected.slug); }}
                style={{
                  padding: '10px 32px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: approved.has(selected.slug) ? '#4a9e4a' : 'transparent',
                  border: '1px solid #4a9e4a',
                  color: approved.has(selected.slug) ? '#0a0a08' : '#4a9e4a',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-body, system-ui, sans-serif)',
                }}
              >
                Approve
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); rejected.has(selected.slug) ? unreject(selected.slug) : reject(selected.slug); }}
                style={{
                  padding: '10px 32px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: rejected.has(selected.slug) ? '#9e4a4a' : 'transparent',
                  border: '1px solid #9e4a4a',
                  color: rejected.has(selected.slug) ? '#0a0a08' : '#9e4a4a',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-body, system-ui, sans-serif)',
                }}
              >
                {rejected.has(selected.slug) ? 'Undo Reject' : 'Reject'}
              </button>
            </div>
            <p style={{
              fontSize: '0.55rem',
              color: '#3a3630',
              margin: '12px 0 0',
              fontFamily: 'monospace',
              wordBreak: 'break-all',
            }}>
              {selected.slug}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
