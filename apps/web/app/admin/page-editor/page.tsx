'use client';

import { useState, useCallback, useEffect } from 'react';

interface PhotoResult {
  slug: string;
  thumb: string;
  grid: string;
  hero: string;
  labels: string[];
  objects: string[];
  tags: string[];
  score: number;
}

interface PageImage {
  id: string;
  section: string;
  currentSrc: string;
  page: string;
}

// Registry of editable images on each page
const PAGE_IMAGES: Record<string, PageImage[]> = {
  'entertainment': [
    { id: 'ent-hero', section: 'Hero', currentSrc: '/images/corridor/natchez-bluff-river-view.webp', page: 'entertainment' },
    { id: 'ent-touring', section: 'Touring', currentSrc: '/images/corridor/street-musician-guitar.webp', page: 'entertainment' },
    { id: 'ent-houseband', section: 'House Band', currentSrc: '/images/corridor/guitarist-chandelier-venue.webp', page: 'entertainment' },
    { id: 'ent-records', section: 'Records', currentSrc: '/images/studio-c/utopiademo-day-2.webp', page: 'entertainment' },
    { id: 'ent-radio', section: 'Radio', currentSrc: '/images/corridor/natchez-night-lounge.webp', page: 'entertainment' },
    { id: 'ent-magazine', section: 'Magazine', currentSrc: '/images/processed/big-muddy/natchez-brick-street-live-oaks.webp', page: 'entertainment' },
    { id: 'ent-arrie', section: 'Arrie Aslin', currentSrc: '/images/processed/arrie-aslin-inn-portrait.webp', page: 'entertainment' },
    { id: 'ent-closing', section: 'Closing', currentSrc: '/images/dsd/mississippi-sunset.webp', page: 'entertainment' },
  ],
  'entertainment/raya': [
    { id: 'rea-hero', section: 'Hero', currentSrc: '/images/corridor/natchez-bluff-river-view.webp', page: 'entertainment/raya' },
    { id: 'rea-town', section: 'The Town', currentSrc: '/images/corridor/victorian-mansion-natchez.webp', page: 'entertainment/raya' },
    { id: 'rea-touring', section: 'Touring', currentSrc: '/images/corridor/street-musician-guitar.webp', page: 'entertainment/raya' },
    { id: 'rea-records', section: 'Records', currentSrc: '/images/studio-c/utopiademo-day-2.webp', page: 'entertainment/raya' },
    { id: 'rea-radio', section: 'Radio', currentSrc: '/images/corridor/natchez-night-lounge.webp', page: 'entertainment/raya' },
    { id: 'rea-magazine', section: 'Magazine', currentSrc: '/images/corridor/historic-home-natchez.webp', page: 'entertainment/raya' },
    { id: 'rea-studio', section: 'Studio', currentSrc: '/images/studio-c/utopiademo-day-30.webp', page: 'entertainment/raya' },
    { id: 'rea-houseband', section: 'House Band', currentSrc: '/images/corridor/drummer-pearl-kit.webp', page: 'entertainment/raya' },
    { id: 'rea-space', section: 'The Space', currentSrc: '/images/processed/bearsville/theater-show-01.webp', page: 'entertainment/raya' },
    { id: 'rea-closing', section: 'Closing', currentSrc: '/images/dsd/mississippi-sunset.webp', page: 'entertainment/raya' },
  ],
};

export default function PageEditorPage() {
  const [selectedPage, setSelectedPage] = useState<string>('entertainment');
  const [editingImage, setEditingImage] = useState<PageImage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PhotoResult[]>([]);
  const [searchTotal, setSearchTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem('page-image-overrides') || '{}');
      } catch { return {}; }
    }
    return {};
  });

  const images = PAGE_IMAGES[selectedPage] || [];

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setSearchResults([]); setSearchTotal(0); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/photos/search?q=${encodeURIComponent(q)}&limit=40`);
      const data = await res.json();
      setSearchResults(data.results);
      setSearchTotal(data.total);
    } catch { setSearchResults([]); }
    setLoading(false);
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    const t = setTimeout(() => search(val), 300);
    return () => clearTimeout(t);
  }, [search]);

  const selectPhoto = (imageId: string, photoUrl: string) => {
    const next = { ...overrides, [imageId]: photoUrl };
    setOverrides(next);
    localStorage.setItem('page-image-overrides', JSON.stringify(next));
    setEditingImage(null);
    setSearchQuery('');
    setSearchResults([]);
  };

  const resetImage = (imageId: string) => {
    const next = { ...overrides };
    delete next[imageId];
    setOverrides(next);
    localStorage.setItem('page-image-overrides', JSON.stringify(next));
  };

  const [saving, setSaving] = useState(false);

  const saveChanges = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/page-editor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ overrides }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Saved ${data.changes.length} image changes to source files. Refresh the page to see them.`);
        // Clear overrides since they're now in the source
        setOverrides({});
        localStorage.removeItem('page-image-overrides');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (e: any) {
      alert(`Failed to save: ${e.message}`);
    }
    setSaving(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a08',
      color: '#e8e0d4',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px clamp(16px, 4vw, 40px)',
        borderBottom: '1px solid rgba(200,148,62,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: '1.3rem',
          fontWeight: 700,
          margin: 0,
        }}>
          Page Image Editor
        </h1>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {Object.keys(PAGE_IMAGES).map(page => (
            <button
              key={page}
              onClick={() => setSelectedPage(page)}
              style={{
                padding: '6px 14px',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: selectedPage === page ? '#c8943e' : 'transparent',
                border: '1px solid rgba(200,148,62,0.2)',
                borderRadius: '2px',
                color: selectedPage === page ? '#0a0a08' : '#9b9488',
                cursor: 'pointer',
                fontFamily: 'var(--font-body, system-ui, sans-serif)',
              }}
            >
              {page}
            </button>
          ))}
          {Object.keys(overrides).length > 0 && (
            <button
              onClick={saveChanges}
              disabled={saving}
              style={{
                padding: '6px 14px',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: saving ? '#6b635a' : '#4a9e4a',
                border: 'none',
                borderRadius: '2px',
                color: '#0a0a08',
                cursor: saving ? 'wait' : 'pointer',
                fontFamily: 'var(--font-body, system-ui, sans-serif)',
              }}
            >
              {saving ? 'Saving...' : `Save Changes (${Object.keys(overrides).length})`}
            </button>
          )}
        </div>
      </div>

      {/* Image Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px',
        padding: '20px clamp(16px, 4vw, 40px)',
      }}>
        {images.map(img => {
          const currentUrl = overrides[img.id] || img.currentSrc;
          const isOverridden = !!overrides[img.id];
          return (
            <div key={img.id} style={{
              border: `1px solid ${isOverridden ? 'rgba(74,158,74,0.4)' : 'rgba(200,148,62,0.1)'}`,
              borderRadius: '4px',
              overflow: 'hidden',
              background: '#111',
            }}>
              <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                <img
                  src={currentUrl}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {isOverridden && (
                  <div style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: '#4a9e4a',
                    color: '#0a0a08',
                    fontSize: '0.55rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '2px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    Changed
                  </div>
                )}
              </div>
              <div style={{ padding: '12px' }}>
                <p style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#c8943e',
                  margin: '0 0 4px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {img.section}
                </p>
                <p style={{
                  fontSize: '0.6rem',
                  color: '#6b635a',
                  margin: '0 0 10px',
                  fontFamily: 'monospace',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {currentUrl}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => { setEditingImage(img); setSearchQuery(''); setSearchResults([]); }}
                    style={{
                      padding: '6px 16px',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      background: 'transparent',
                      border: '1px solid #c8943e',
                      borderRadius: '2px',
                      color: '#c8943e',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body, system-ui, sans-serif)',
                    }}
                  >
                    Replace
                  </button>
                  {isOverridden && (
                    <button
                      onClick={() => resetImage(img.id)}
                      style={{
                        padding: '6px 16px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        background: 'transparent',
                        border: '1px solid #9e4a4a',
                        borderRadius: '2px',
                        color: '#9e4a4a',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body, system-ui, sans-serif)',
                      }}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Photo Picker Modal */}
      {editingImage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(0,0,0,0.95)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Picker header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(200,148,62,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div>
              <p style={{ fontSize: '0.65rem', color: '#c8943e', margin: '0 0 4px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Replacing: {editingImage.section}
              </p>
              <p style={{ fontSize: '0.7rem', color: '#6b635a', margin: 0 }}>
                {editingImage.page}
              </p>
            </div>
            <button
              onClick={() => setEditingImage(null)}
              style={{
                padding: '8px 20px',
                fontSize: '0.7rem',
                fontWeight: 700,
                background: 'transparent',
                border: '1px solid rgba(200,148,62,0.2)',
                borderRadius: '2px',
                color: '#9b9488',
                cursor: 'pointer',
                fontFamily: 'var(--font-body, system-ui, sans-serif)',
              }}
            >
              Cancel
            </button>
          </div>

          {/* Search */}
          <div style={{ padding: '12px 20px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search photos — try 'river sunset', 'horn players', 'architecture'..."
              autoFocus
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '1rem',
                background: '#141410',
                border: '1px solid rgba(200,148,62,0.2)',
                borderRadius: '4px',
                color: '#e8e0d4',
                outline: 'none',
                fontFamily: 'var(--font-body, system-ui, sans-serif)',
              }}
            />
            <p style={{ fontSize: '0.7rem', color: '#6b635a', margin: '6px 0 0' }}>
              {loading ? 'Searching...' : searchTotal > 0 ? `${searchTotal} results — click to select` : ''}
            </p>
          </div>

          {/* Results */}
          <div style={{
            flex: 1,
            overflow: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '4px',
            padding: '0 20px 20px',
          }}>
            {searchResults.map(photo => (
              <div
                key={photo.slug}
                onClick={() => selectPhoto(editingImage.id, photo.hero || photo.grid)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '2px',
                }}
              >
                <img
                  src={photo.grid || photo.thumb}
                  alt=""
                  loading="lazy"
                  style={{
                    width: '100%',
                    aspectRatio: '16/10',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.15s',
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px 6px 4px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                }}>
                  <p style={{
                    fontSize: '0.5rem',
                    color: '#c8943e',
                    margin: 0,
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
        </div>
      )}
    </div>
  );
}
