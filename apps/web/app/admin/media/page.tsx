'use client';
import { useState, useEffect } from 'react';

interface MediaAsset {
  url: string;
  filename: string;
  folder: string;
  tags: string[];
  source: string;
  description?: string;
}

export default function MediaGallery() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<MediaAsset | null>(null);

  useEffect(() => {
    fetch('/api/agent/context?domain=media&limit=100')
      .then(r => r.json())
      .then(data => {
        const parsed = (data.results || []).map((r: any) => {
          try { return JSON.parse(r.content); } catch { return null; }
        }).filter(Boolean);
        setAssets(parsed);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  const filteredAssets = assets.filter(a => {
    const matchSearch = !search || a.filename?.toLowerCase().includes(search.toLowerCase()) ||
      a.tags?.some((t: string) => t.toLowerCase().includes(search.toLowerCase())) ||
      a.description?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || a.folder === filter;
    return matchSearch && matchFilter;
  });

  const folders = [...new Set(assets.map(a => a.folder).filter(Boolean))].sort();

  const S: Record<string, React.CSSProperties> = {
    page: { minHeight: '100vh', background: '#0f0f0f', color: '#e8e4de', fontFamily: "'Inter', system-ui", padding: '1.5rem' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2a2725', paddingBottom: '1rem', marginBottom: '1.5rem' },
    title: { fontSize: '1.5rem', fontWeight: 800, color: '#c8943e', margin: 0 },
    input: { padding: '0.625rem 1rem', background: '#231f1c', border: '1px solid #333', borderRadius: '8px', color: '#e8e4de', fontSize: '0.875rem', outline: 'none', width: '300px' },
    filters: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap' as const, marginBottom: '1rem' },
    filterBtn: { padding: '0.3rem 0.8rem', borderRadius: '999px', border: '1px solid #333', background: 'transparent', color: '#8a8074', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 },
    filterActive: { background: '#c8943e', color: '#0f0f0f', border: '1px solid #c8943e' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' },
    card: { position: 'relative' as const, borderRadius: '10px', overflow: 'hidden', border: '1px solid #2a2725', cursor: 'pointer', transition: 'border-color 0.2s' },
    img: { width: '100%', height: '180px', objectFit: 'cover' as const, display: 'block' },
    info: { padding: '0.5rem 0.75rem', background: '#1a1816' },
    filename: { fontSize: '0.7rem', color: '#8a8074', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const },
    badge: { display: 'inline-block', padding: '0.15rem 0.4rem', borderRadius: '999px', fontSize: '0.55rem', fontWeight: 700, background: '#2a2725', color: '#c8943e', marginRight: '0.3rem' },
    modal: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' },
    modalInner: { background: '#1a1816', borderRadius: '14px', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflow: 'auto', border: '1px solid #2a2725' },
    modalImg: { width: '100%', maxHeight: '400px', objectFit: 'contain' as const, background: '#0f0f0f' },
    modalInfo: { padding: '1.25rem' },
    stat: { fontSize: '0.75rem', color: '#8a8074', marginBottom: '0.25rem' },
  };

  if (loading) return <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#c8943e' }}>Loading {assets.length > 0 ? assets.length : ''} assets...</span></div>;

  return (
    <div style={S.page}>
      <header style={S.header}>
        <div>
          <h1 style={S.title}>Media Vault</h1>
          <span style={{ fontSize: '0.75rem', color: '#8a8074' }}>{filteredAssets.length} of {assets.length} assets</span>
        </div>
        <input style={S.input} placeholder="Search by name, tag, or description..." value={search} onChange={e => setSearch(e.target.value)} />
      </header>

      <div style={S.filters}>
        <button style={{ ...S.filterBtn, ...(filter === 'all' ? S.filterActive : {}) }} onClick={() => setFilter('all')}>All</button>
        {folders.map(f => (
          <button key={f} style={{ ...S.filterBtn, ...(filter === f ? S.filterActive : {}) }} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <div style={S.grid}>
        {filteredAssets.map((asset, i) => (
          <div key={i} style={S.card} onClick={() => setSelected(asset)}>
            <img src={asset.url} alt={asset.filename} style={S.img} loading="lazy" />
            <div style={S.info}>
              <p style={S.filename}>{asset.filename}</p>
              <div style={{ marginTop: '0.3rem' }}>
                {asset.tags?.slice(0, 3).map((t, j) => <span key={j} style={S.badge}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={S.modal} onClick={() => setSelected(null)}>
          <div style={S.modalInner} onClick={e => e.stopPropagation()}>
            <img src={selected.url} alt={selected.filename} style={S.modalImg} />
            <div style={S.modalInfo}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 0.75rem', color: '#e8e4de' }}>{selected.filename}</h2>
              {selected.description && <p style={{ fontSize: '0.875rem', color: '#b8b0a4', marginBottom: '0.75rem' }}>{selected.description}</p>}
              <p style={S.stat}>Folder: {selected.folder}</p>
              <p style={S.stat}>Source: {selected.source}</p>
              <p style={S.stat}>URL: <span style={{ color: '#c8943e', wordBreak: 'break-all' as const }}>{selected.url}</span></p>
              <div style={{ marginTop: '0.75rem' }}>
                {selected.tags?.map((t, j) => <span key={j} style={{ ...S.badge, fontSize: '0.65rem', marginBottom: '0.3rem' }}>{t}</span>)}
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { navigator.clipboard.writeText(selected.url); alert('URL copied!'); }} style={{ padding: '0.5rem 1rem', background: '#c8943e', color: '#0f0f0f', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Copy URL</button>
                <button onClick={() => setSelected(null)} style={{ padding: '0.5rem 1rem', background: 'transparent', color: '#8a8074', border: '1px solid #333', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
