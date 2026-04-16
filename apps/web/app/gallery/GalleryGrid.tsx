'use client';

// apps/web/app/gallery/GalleryGrid.tsx
// Client island for category filtering — minimal JS footprint

import { useState } from 'react';
import type { GalleryPrint } from './gallery-data';

interface Props {
  prints: GalleryPrint[];
  categories: readonly { id: string; label: string }[];
}

export default function GalleryGrid({ prints, categories }: Props) {
  const [active, setActive] = useState('all');

  const filtered =
    active === 'all' ? prints : prints.filter((p) => p.category === active);

  return (
    <>
      {/* Category tabs */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '3rem',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '0.5rem 1.25rem',
              border: '1px solid',
              borderColor:
                active === cat.id
                  ? 'var(--text)'
                  : 'var(--border, #e5e5e0)',
              backgroundColor:
                active === cat.id ? 'var(--text)' : 'transparent',
              color:
                active === cat.id ? 'var(--bg)' : 'var(--text-muted, #999)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Photo grid */}
      <div
        style={{
          columnCount: 3,
          columnGap: '1.5rem',
        }}
      >
        <style>{`
          @media (max-width: 900px) {
            .gallery-masonry { column-count: 2 !important; }
          }
          @media (max-width: 560px) {
            .gallery-masonry { column-count: 1 !important; }
          }
          .gallery-print-card {
            break-inside: avoid;
            margin-bottom: 1.5rem;
            display: block;
            text-decoration: none;
            color: inherit;
          }
          .gallery-print-card img {
            transition: transform 0.6s ease;
          }
          .gallery-print-card:hover img {
            transform: scale(1.02);
          }
          .gallery-print-card:hover .gallery-print-overlay {
            opacity: 1 !important;
          }
        `}</style>
        <div className="gallery-masonry" style={{ columnCount: 3, columnGap: '1.5rem' }}>
          {filtered.map((print) => (
            <a
              key={print.id}
              className="gallery-print-card"
              href={`mailto:studio@studiocvideo.com?subject=Inquiry: ${encodeURIComponent(print.title)}&body=${encodeURIComponent(`I'm interested in "${print.title}" — please send me availability and sizing options.`)}`}
            >
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: 'var(--surface, #f5f5f0)',
                }}
              >
                <img
                  src={print.src}
                  alt={print.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
                {/* Hover overlay */}
                <div
                  className="gallery-print-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      padding: '0.5rem 1.5rem',
                      border: '1px solid rgba(255,255,255,0.6)',
                    }}
                  >
                    Inquire
                  </span>
                </div>
              </div>
              <div style={{ padding: '0.75rem 0' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    margin: 0,
                    color: 'var(--text)',
                  }}
                >
                  {print.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted, #999)',
                    margin: '0.2rem 0 0',
                    letterSpacing: '0.05em',
                  }}
                >
                  {print.priceRange}
                  {print.edition !== 'Open edition' && (
                    <> &middot; {print.edition}</>
                  )}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Count */}
      <p
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'var(--text-muted, #999)',
          marginTop: '2rem',
          letterSpacing: '0.1em',
        }}
      >
        {filtered.length} print{filtered.length !== 1 ? 's' : ''}
      </p>
    </>
  );
}
