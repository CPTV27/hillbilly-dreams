'use client';

import { useState, useEffect } from 'react';

/* eslint-disable @next/next/no-img-element */

interface Asset {
  url: string;
  filename: string;
  folder: string;
  tags: string[];
}

const TYPE_FILTERS = ['All', 'illustrations', 'radio', 'real', 'touring', 'heroes', 'magazine', 'mbt'];

export function BrowseTab() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/agent/context?domain=media&limit=200')
      .then(r => r.json())
      .then(data => {
        const items = (data.data || []).map((d: any) => {
          try {
            const parsed = JSON.parse(d.content);
            return { url: parsed.url, filename: parsed.filename || d.key, folder: parsed.folder || '', tags: parsed.tags || [] };
          } catch { return null; }
        }).filter(Boolean);
        setAssets(items);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = assets.filter(a => {
    if (typeFilter !== 'All' && !a.folder?.includes(typeFilter) && !a.url?.includes(typeFilter)) return false;
    if (search && !a.filename?.toLowerCase().includes(search.toLowerCase()) && !a.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  return (
    <div>
      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name or tag..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="ch-prompt"
          style={{ flex: 1, minWidth: 200, marginBottom: 0 }}
        />
        <div className="ch-pills" style={{ marginBottom: 0 }}>
          {TYPE_FILTERS.map(f => (
            <button key={f} className={`ch-pill ${typeFilter === f ? 'ch-pill--active' : ''}`} onClick={() => setTypeFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: '0.75rem', color: '#5a5550', marginBottom: '1rem' }}>
        {loading ? 'Loading assets...' : `${filtered.length} assets`}
      </p>

      {/* Asset Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
        {filtered.slice(0, 60).map((asset, i) => (
          <div key={`${asset.url}-${i}`} onClick={() => setLightbox(asset.url)} style={{
            background: '#1a1816', border: '1px solid #2a2520', borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
            transition: 'border-color 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#c8943e40')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2520')}
          >
            <img src={asset.url} alt={asset.filename} loading="lazy" style={{ width: '100%', height: 120, objectFit: 'cover' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div style={{ padding: '0.5rem' }}>
              <span style={{ fontSize: '0.65rem', color: '#6a6560', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {asset.filename}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 10000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <img src={lightbox} alt="Preview" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} />
        </div>
      )}
    </div>
  );
}
