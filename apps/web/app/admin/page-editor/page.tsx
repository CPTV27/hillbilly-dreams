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
  score: number;
}

const PAGES = [
  { id: 'entertainment', label: 'Entertainment', path: '/entertainment' },
  { id: 'entertainment-raya', label: 'Rea Ecosystem', path: '/entertainment/raya' },
  { id: 'touring', label: 'Touring', path: '/touring' },
  { id: 'house-band', label: 'House Band', path: '/entertainment/house-band' },
];

export default function PageEditorPage() {
  const [selectedPage, setSelectedPage] = useState(PAGES[0]);
  const [editMode, setEditMode] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PhotoResult[]>([]);
  const [searchTotal, setSearchTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [replacements, setReplacements] = useState<Record<string, string>>({});

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setSearchResults([]); setSearchTotal(0); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/photos/search?q=${encodeURIComponent(q)}&limit=60`);
      const data = await res.json();
      setSearchResults(data.results);
      setSearchTotal(data.total);
    } catch { setSearchResults([]); }
    setLoading(false);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setTimeout(() => search(val), 300);
  };

  const selectPhoto = (url: string) => {
    if (!pickerTarget) return;
    setReplacements(prev => ({ ...prev, [pickerTarget]: url }));
    setPickerOpen(false);
    setPickerTarget(null);
    setSearchQuery('');
    setSearchResults([]);

    // Send message to iframe to replace the image
    const iframe = document.getElementById('page-preview') as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'replace-image',
        oldSrc: pickerTarget,
        newSrc: url,
      }, '*');
    }
  };

  const saveAll = async () => {
    if (Object.keys(replacements).length === 0) return;
    try {
      const res = await fetch('/api/page-editor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ overrides: replacements }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Saved. Refresh to see changes.`);
        setReplacements({});
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (e: any) {
      alert(`Failed: ${e.message}`);
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#0a0a08',
      color: '#e8e0d4',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      overflow: 'hidden',
    }}>

      {/* TOP BAR */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        borderBottom: '1px solid rgba(200,148,62,0.15)',
        background: '#111',
        gap: '12px',
        flexWrap: 'wrap',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '8px' }}>Page Editor</span>
          {PAGES.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPage(p)}
              style={{
                padding: '4px 12px',
                fontSize: '0.65rem',
                fontWeight: 600,
                background: selectedPage.id === p.id ? '#c8943e' : 'transparent',
                border: '1px solid rgba(200,148,62,0.2)',
                borderRadius: '2px',
                color: selectedPage.id === p.id ? '#0a0a08' : '#9b9488',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => setEditMode(!editMode)}
            style={{
              padding: '4px 16px',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: editMode ? '#c8943e' : 'transparent',
              border: '1px solid #c8943e',
              borderRadius: '2px',
              color: editMode ? '#0a0a08' : '#c8943e',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {editMode ? 'Editing — Click Images to Replace' : 'Edit Images'}
          </button>

          {Object.keys(replacements).length > 0 && (
            <button
              onClick={saveAll}
              style={{
                padding: '4px 16px',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: '#4a9e4a',
                border: 'none',
                borderRadius: '2px',
                color: '#0a0a08',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Save {Object.keys(replacements).length} Change{Object.keys(replacements).length > 1 ? 's' : ''}
            </button>
          )}
        </div>
      </div>

      {/* MAIN AREA — iframe + optional picker panel */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* PAGE PREVIEW */}
        <div style={{ flex: pickerOpen ? '1 1 55%' : '1 1 100%', position: 'relative', overflow: 'hidden', transition: 'flex 0.2s' }}>
          <iframe
            id="page-preview"
            src={selectedPage.path}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: '#0a0a08',
            }}
            onLoad={() => {
              const iframe = document.getElementById('page-preview') as HTMLIFrameElement;
              if (!iframe?.contentDocument) return;

              // Inject click handlers on all images when in edit mode
              const injectEditMode = () => {
                const doc = iframe.contentDocument;
                if (!doc) return;
                const images = doc.querySelectorAll('img');
                images.forEach((img: HTMLImageElement) => {
                  img.style.cursor = editMode ? 'pointer' : '';
                  img.onclick = editMode ? (e: MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const src = img.getAttribute('src') || '';
                    setPickerTarget(src);
                    setPickerOpen(true);
                    // Suggest search based on section context
                    const section = img.closest('section');
                    const heading = section?.querySelector('h1, h2, p');
                    if (heading?.textContent) {
                      const hint = heading.textContent.slice(0, 30).toLowerCase();
                      setSearchQuery(hint);
                      search(hint);
                    }
                  } : null;
                  // Visual indicator
                  if (editMode) {
                    img.style.outline = '3px dashed rgba(200,148,62,0.4)';
                    img.style.outlineOffset = '-3px';
                  } else {
                    img.style.outline = '';
                    img.style.outlineOffset = '';
                  }
                });
              };

              injectEditMode();
              // Re-inject when editMode changes
              (window as any).__injectEditMode = injectEditMode;
            }}
          />
          {editMode && (
            <div style={{
              position: 'absolute',
              top: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(200,148,62,0.9)',
              color: '#0a0a08',
              padding: '4px 16px',
              borderRadius: '2px',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              pointerEvents: 'none',
              zIndex: 10,
            }}>
              Click any image to replace it
            </div>
          )}
        </div>

        {/* PHOTO PICKER PANEL */}
        {pickerOpen && (
          <div style={{
            flex: '0 0 45%',
            display: 'flex',
            flexDirection: 'column',
            borderLeft: '1px solid rgba(200,148,62,0.15)',
            background: '#0d0d0b',
            overflow: 'hidden',
          }}>
            {/* Current image being replaced */}
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid rgba(200,148,62,0.1)',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}>
              <div style={{ flex: '0 0 120px' }}>
                <p style={{ fontSize: '0.55rem', color: '#c8943e', margin: '0 0 4px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Replacing</p>
                <img
                  src={pickerTarget || ''}
                  alt=""
                  style={{ width: '120px', height: '68px', objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(200,148,62,0.2)' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.6rem', color: '#6b635a', margin: 0, fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {pickerTarget}
                </p>
              </div>
              <button
                onClick={() => { setPickerOpen(false); setPickerTarget(null); }}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.65rem',
                  background: 'transparent',
                  border: '1px solid rgba(200,148,62,0.15)',
                  borderRadius: '2px',
                  color: '#9b9488',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Cancel
              </button>
            </div>

            {/* Search */}
            <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(200,148,62,0.1)' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search 16,936 photos..."
                autoFocus
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  fontSize: '0.9rem',
                  background: '#141410',
                  border: '1px solid rgba(200,148,62,0.2)',
                  borderRadius: '4px',
                  color: '#e8e0d4',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <p style={{ fontSize: '0.65rem', color: '#6b635a', margin: 0 }}>
                  {loading ? 'Searching...' : searchTotal > 0 ? `${searchTotal} results` : ''}
                </p>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {['river', 'sunset', 'stage', 'guitar', 'architecture', 'night', 'drums', 'horn', 'portrait', 'street'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => { setSearchQuery(tag); search(tag); }}
                      style={{
                        padding: '2px 8px',
                        fontSize: '0.55rem',
                        background: 'transparent',
                        border: '1px solid rgba(200,148,62,0.1)',
                        borderRadius: '2px',
                        color: '#6b635a',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
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
              flex: 1,
              overflow: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '3px',
              padding: '3px',
            }}>
              {searchResults.map(photo => (
                <div
                  key={photo.slug}
                  onClick={() => selectPhoto(photo.hero || photo.grid)}
                  style={{
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
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
                      transition: 'transform 0.15s, outline 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.transform = 'scale(1.05)';
                      (e.target as HTMLElement).style.outline = '2px solid #c8943e';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.transform = 'scale(1)';
                      (e.target as HTMLElement).style.outline = 'none';
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '14px 4px 3px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                  }}>
                    <p style={{
                      fontSize: '0.45rem',
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
    </div>
  );
}
