'use client';

// apps/web/app/gallery/page.tsx
// BuyCurious Art — gallery storefront landing page
// Two visual modes: Gallery (clean white museum) and Funky (aristo-boho maximalism)

import { useState, useEffect } from 'react';
import { DEMO_ARTWORKS, DEMO_ARTISTS, formatPrice } from './demo-data';

// Artwork images — mix of Chase's photography and generated art pieces
const ARTWORK_IMAGES: Record<string, string> = {
  w0a: '/images/gallery/abstract-expressionist.webp',        // Andrea — Blues Room commission
  w0b: '/images/gallery/ta-c1-483-of-633.webp',              // Andrea — aristo-boho parlor (Chase photo)
  w1: '/images/gallery/river-oil-painting.webp',              // Delphine — river oil painting
  w2: '/images/gallery/blues-musician-bw.webp',               // Marcus — B&W blues musician
  w3: '/images/gallery/mixed-media-collage.webp',             // Odessa — mixed media salvage
  w4: '/images/gallery/fp2020dec-139-denoiseai-denoise.webp', // Delphine — blue cloudscape (Chase fine art)
  w5: '/images/gallery/ceramic-vessel.webp',                  // Ray — wood-fired stoneware
  w6: '/images/gallery/toddaexports-2.webp',                  // Marcus — B&W EQ at window (Chase photo)
  w7: '/images/gallery/textile-quilt.webp',                    // June — improvisational quilt
  w8: '/images/gallery/_1231776-edit-enhanced-sr.webp',       // Odessa — wild color energy (Chase photo)
};

// Fallback background colors per artwork
const ARTWORK_COLORS: Record<string, string> = {
  w0a: '#2a1a14',
  w0b: '#3d2b22',
  w1: '#3d2b1a',
  w2: '#1a1a1a',
  w3: '#4a3728',
  w4: '#2a1f14',
  w5: '#5a4a3a',
  w6: '#0d0d0d',
  w7: '#4a5c6a',
  w8: '#1a0f24',
};

// Funky mode: vibrant accent colors for cycling effects
const FUNKY_COLORS = ['#ff3366', '#00d4ff', '#aaff00', '#ff8c00'];

const MEDIUM_CARDS = [
  { label: 'Painting', emoji: '🎨', color: '#3d2b1a', href: '/gallery?medium=painting' },
  { label: 'Photography', emoji: '📷', color: '#1a1f2e', href: '/gallery?medium=photography' },
  { label: 'Sculpture', emoji: '🏺', color: '#2e2018', href: '/gallery?medium=sculpture' },
  { label: 'Mixed Media', emoji: '🖼', color: '#1a2018', href: '/gallery?medium=mixed-media' },
  { label: 'Textile', emoji: '🧵', color: '#1e2a2e', href: '/gallery?medium=textile' },
  { label: 'Ceramics', emoji: '🫙', color: '#2a1e14', href: '/gallery?medium=ceramics' },
];

// Slight rotations for funky medium cards (deterministic, not random)
const FUNKY_ROTATIONS = [-1.5, 1.2, -2, 0.8, 1.8, -1.2];

const featuredArtworks = DEMO_ARTWORKS.filter((w) => w.featured);
const featuredArtists = DEMO_ARTISTS.filter((a) => a.featured);

export default function GalleryPage() {
  const [funkyMode, setFunkyMode] = useState(false);

  // Swap theme class on the layout's root div so nav + footer also inherit
  useEffect(() => {
    const root = document.getElementById('gallery-theme-root');
    if (root) {
      root.className = funkyMode ? 'theme-gallery-funky' : 'theme-gallery';
      root.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    }
  }, [funkyMode]);

  return (
    <>
      {/* ── Injected keyframes for funky animations ── */}
      <style>{`
        @keyframes gradient-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes border-spin {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes toggle-bounce {
          0%   { transform: scale(1); }
          40%  { transform: scale(0.93); }
          70%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .gallery-artwork-card:hover .gallery-artwork-overlay {
          opacity: 0.7 !important;
        }
        .gallery-artwork-card:hover {
          transform: translateY(-2px);
        }
        .funky-artwork-card:hover {
          transform: rotate(0deg) scale(1.02) !important;
        }
        .funky-medium-card:hover {
          transform: rotate(0deg) scale(1.04) translateY(-4px) !important;
        }
        .funky-artist-card:hover {
          transform: translateY(-6px) scale(1.01) !important;
          box-shadow: 0 20px 60px rgba(255,51,102,0.25) !important;
        }
        @media (max-width: 768px) {
          #gallery-hero {
            grid-template-columns: 1fr !important;
          }
          #gallery-hero-mosaic {
            height: 52vw !important;
          }
          #gallery-featured-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          #gallery-featured-grid > article {
            grid-column: auto !important;
            grid-row: auto !important;
            height: 280px !important;
          }
          /* Funky mode: single column, no rotation, reduced height on mobile */
          .funky-artwork-card {
            transform: rotate(0deg) !important;
          }
          .funky-medium-card {
            transform: rotate(0deg) !important;
          }
          .funky-artist-card {
            transform: rotate(0deg) !important;
          }
        }
      `}</style>

      {/* ── Hero ── */}
      <section
        id="gallery-hero"
        style={{
          minHeight: '92vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: 0,
          background: funkyMode
            ? 'linear-gradient(135deg, var(--bg) 0%, #1a1030 50%, #0a0618 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.82) 100%), url(https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/08-folk-art/marketplace.webp) center/cover no-repeat',
          transition: 'background 0.4s ease',
        }}
        aria-label="Gallery hero"
      >
        {/* Left: text */}
        <div
          style={{
            padding: 'clamp(3rem, 8vw, 7rem) clamp(2rem, 5vw, 5rem)',
            maxWidth: '580px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 'var(--space-6)',
            }}
          >
            {funkyMode ? '✦ Art Where People Actually Live ✦' : 'Art Where People Actually Live'}
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--text)',
              marginBottom: 'var(--space-8)',
            }}
          >
            Buy
            {funkyMode ? (
              <em
                style={{
                  fontStyle: 'italic',
                  background: `linear-gradient(90deg, ${FUNKY_COLORS.join(', ')})`,
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradient-shift 3s ease infinite',
                  display: 'inline',
                }}
              >
                Curious
              </em>
            ) : (
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Curious</em>
            )}
            <br />
            Art
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-4)',
              maxWidth: '440px',
            }}
          >
            {funkyMode
              ? 'No gatekeepers. No white walls. No pretension. Just taste-led curation from the Mississippi corridor — paintings, ceramics, textiles, and photography from the people who actually make things.'
              : 'Taste-led curation from the Mississippi corridor. Paintings, ceramics, textiles, and photography from the people who actually make things.'}
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: funkyMode ? FUNKY_COLORS[2] : 'var(--accent)',
              marginBottom: 'var(--space-10)',
              fontWeight: 600,
              letterSpacing: 'var(--tracking-wide)',
              maxWidth: '440px',
            }}
          >
            {funkyMode
              ? '🌶 Artist-first. 70–80% to the maker. Always.'
              : 'Artist-first. 70–80% to the maker. Always.'}
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <a
              href="/gallery/artists"
              className="btn btn--primary"
              style={{
                fontSize: 'var(--text-base)',
                ...(funkyMode && {
                  background: `linear-gradient(135deg, ${FUNKY_COLORS[0]}, ${FUNKY_COLORS[1]})`,
                  border: 'none',
                  color: '#fff',
                  fontWeight: 700,
                }),
              }}
            >
              {funkyMode ? '🎨 Browse Artists' : 'Browse Artists'}
            </a>
            <a
              href="/gallery/apply"
              className="btn btn--ghost"
              style={{
                fontSize: 'var(--text-base)',
                ...(funkyMode && {
                  borderColor: FUNKY_COLORS[2],
                  color: FUNKY_COLORS[2],
                }),
              }}
            >
              {funkyMode ? '✌️ Sell Your Work' : 'Sell Your Work'}
            </a>
          </div>
        </div>

        {/* Right: hero artwork mosaic */}
        <div
          id="gallery-hero-mosaic"
          style={{
            height: '92vh',
            display: 'grid',
            gridTemplateRows: '3fr 2fr',
            gridTemplateColumns: '3fr 2fr',
            gap: funkyMode ? '6px' : '3px',
            overflow: 'hidden',
            transition: 'gap 0.4s ease',
          }}
          aria-hidden="true"
        >
          {/* Large top-left — artist with paintings (Chase photo) */}
          <div
            style={{
              gridRow: '1 / 2',
              gridColumn: '1 / 2',
              background: '#3d2b1a',
              backgroundImage: 'url(/images/gallery/klshoot2-23-of-228.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              position: 'relative',
              ...(funkyMode && {
                outline: `3px solid ${FUNKY_COLORS[0]}`,
                outlineOffset: '-3px',
              }),
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 'var(--space-4)',
                left: 'var(--space-4)',
                background: funkyMode
                  ? `linear-gradient(135deg, rgba(255,51,102,0.85), rgba(0,0,0,0.85))`
                  : 'rgba(10,8,6,0.75)',
                backdropFilter: 'blur(4px)',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: funkyMode ? 'var(--radius-full)' : 'var(--radius-sm)',
                transition: 'all 0.4s ease',
              }}
            >
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', color: '#fff', margin: 0 }}>
                Bluff at Last Light
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                Delphine Mouton · {formatPrice(240000)}
              </p>
            </div>
          </div>

          {/* Top-right — mixed media collage */}
          <div
            style={{
              gridRow: '1 / 2',
              gridColumn: '2 / 3',
              background: '#4a3728',
              backgroundImage: 'url(/images/gallery/mixed-media-collage.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              ...(funkyMode && {
                outline: `3px solid ${FUNKY_COLORS[1]}`,
                outlineOffset: '-3px',
              }),
            }}
          />

          {/* Bottom-left — river oil painting */}
          <div
            style={{
              gridRow: '2 / 3',
              gridColumn: '1 / 2',
              background: '#3d2b1a',
              backgroundImage: 'url(/images/gallery/river-oil-painting.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              ...(funkyMode && {
                outline: `3px solid ${FUNKY_COLORS[2]}`,
                outlineOffset: '-3px',
              }),
            }}
          />

          {/* Bottom-right — abstract expressionist */}
          <div
            style={{
              gridRow: '2 / 3',
              gridColumn: '2 / 3',
              background: '#5a3020',
              backgroundImage: 'url(/images/gallery/abstract-expressionist.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              ...(funkyMode && {
                outline: `3px solid ${FUNKY_COLORS[3]}`,
                outlineOffset: '-3px',
              }),
            }}
          />
        </div>
      </section>

      {/* ── Gallery Mode: thin rule separator ── */}
      {!funkyMode && (
        <div
          style={{
            width: '64px',
            height: '1px',
            background: 'var(--border-strong)',
            margin: '0 auto',
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Featured Artworks ── */}
      <section
        style={{
          background: 'var(--bg)',
          padding: 'var(--space-20) 0',
          borderTop: '1px solid var(--border)',
        }}
        aria-labelledby="featured-heading"
      >
        <div className="section-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 'var(--space-12)',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {funkyMode ? '🖼 Selected Works' : 'Selected Works'}
              </p>
              <h2
                id="featured-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  margin: 0,
                }}
              >
                Featured Artworks
              </h2>
            </div>
            <a
              href="/gallery/artworks"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--accent)',
                textDecoration: 'none',
                letterSpacing: 'var(--tracking-wide)',
                ...(funkyMode && {
                  border: `1px solid ${FUNKY_COLORS[0]}`,
                  color: FUNKY_COLORS[0],
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)',
                }),
              }}
            >
              View All Works →
            </a>
          </div>

          {/* Gallery mode: clean masonry with info below the image */}
          {!funkyMode ? (
            <div
              id="gallery-featured-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '24px',
              }}
              role="list"
            >
              {featuredArtworks.map((artwork, i) => {
                const spans = [
                  { col: '1 / 6', height: '480px' },
                  { col: '6 / 10', height: '480px' },
                  { col: '10 / 13', height: '480px' },
                ];
                const span = spans[i] ?? spans[0];
                return (
                  <article
                    key={artwork.id}
                    className="gallery-artwork-card"
                    role="listitem"
                    style={{
                      gridColumn: span.col,
                      transition: 'transform 0.25s var(--ease-spring)',
                    }}
                  >
                    <a
                      href={`/gallery/work/${artwork.slug}`}
                      style={{ display: 'block', textDecoration: 'none' }}
                      aria-label={`${artwork.title} by ${artwork.artistName}, ${formatPrice(artwork.salePrice ?? artwork.price)}`}
                    >
                      {/* Image area */}
                      <div
                        style={{
                          height: span.height,
                          background: ARTWORK_COLORS[artwork.id] ?? '#e8e6e0',
                          backgroundImage: ARTWORK_IMAGES[artwork.id] ? `url(${ARTWORK_IMAGES[artwork.id]})` : undefined,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: 'var(--shadow-md)',
                        }}
                      >
                        <div
                          className="gallery-artwork-overlay"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0)',
                            transition: 'background 0.3s ease',
                          }}
                        />
                      </div>
                      {/* Info below image — clean gallery label style */}
                      <div
                        style={{
                          paddingTop: 'var(--space-4)',
                          paddingBottom: 'var(--space-2)',
                        }}
                      >
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 600,
                            letterSpacing: 'var(--tracking-widest)',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            margin: '0 0 var(--space-1) 0',
                          }}
                        >
                          {artwork.artistName}
                        </p>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-lg)',
                            fontWeight: 500,
                            fontStyle: 'italic',
                            color: 'var(--text)',
                            margin: '0 0 var(--space-2) 0',
                            lineHeight: 'var(--leading-snug)',
                          }}
                        >
                          {artwork.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-muted)',
                            margin: '0 0 var(--space-2) 0',
                          }}
                        >
                          {artwork.medium}
                          {artwork.edition && ` · ${artwork.edition}`}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-base)',
                            fontWeight: 600,
                            color: artwork.salePrice ? 'var(--accent)' : 'var(--text)',
                            margin: 0,
                          }}
                        >
                          {formatPrice(artwork.salePrice ?? artwork.price)}
                          {artwork.salePrice && (
                            <s
                              style={{
                                marginLeft: 'var(--space-3)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--text-disabled)',
                                fontWeight: 400,
                              }}
                            >
                              {formatPrice(artwork.price)}
                            </s>
                          )}
                        </p>
                      </div>
                    </a>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Funky mode: color-bordered cards with hover rotation */
            <div
              id="gallery-featured-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 'var(--space-6)',
              }}
              role="list"
            >
              {featuredArtworks.map((artwork, i) => {
                const borderColor = FUNKY_COLORS[i % FUNKY_COLORS.length];
                const rotation = (i % 2 === 0 ? 1 : -1) * (0.5 + (i % 3) * 0.4);
                return (
                  <article
                    key={artwork.id}
                    className="funky-artwork-card"
                    role="listitem"
                    style={{
                      border: `2px solid ${borderColor}`,
                      background: 'var(--surface)',
                      overflow: 'hidden',
                      transition: 'transform 0.3s var(--ease-spring), box-shadow 0.3s ease',
                      transform: `rotate(${rotation}deg)`,
                      boxShadow: `0 4px 20px ${borderColor}30`,
                    }}
                  >
                    <a
                      href={`/gallery/work/${artwork.slug}`}
                      style={{ display: 'block', textDecoration: 'none' }}
                      aria-label={`${artwork.title} by ${artwork.artistName}, ${formatPrice(artwork.salePrice ?? artwork.price)}`}
                    >
                      {/* Image area */}
                      <div
                        style={{
                          height: '280px',
                          background: ARTWORK_COLORS[artwork.id] ?? '#231f1c',
                          backgroundImage: ARTWORK_IMAGES[artwork.id] ? `url(${ARTWORK_IMAGES[artwork.id]})` : undefined,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(10,6,24,0.8) 0%, transparent 50%)',
                          }}
                        />
                        {/* Funky price badge */}
                        <div
                          style={{
                            position: 'absolute',
                            top: 'var(--space-3)',
                            right: 'var(--space-3)',
                            background: borderColor,
                            color: '#000',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 800,
                            padding: '0.2rem 0.6rem',
                            borderRadius: 'var(--radius-full)',
                            letterSpacing: 'var(--tracking-wide)',
                          }}
                        >
                          {formatPrice(artwork.salePrice ?? artwork.price)}
                        </div>
                      </div>
                      {/* Info */}
                      <div style={{ padding: 'var(--space-5)' }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 700,
                            letterSpacing: 'var(--tracking-widest)',
                            textTransform: 'uppercase',
                            color: borderColor,
                            margin: '0 0 var(--space-1) 0',
                          }}
                        >
                          {artwork.artistName}
                        </p>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-xl)',
                            fontWeight: 600,
                            color: 'var(--text)',
                            margin: '0 0 var(--space-2) 0',
                            lineHeight: 'var(--leading-snug)',
                          }}
                        >
                          {artwork.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-muted)',
                            margin: 0,
                          }}
                        >
                          {artwork.medium} · {artwork.edition}
                        </p>
                      </div>
                    </a>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Browse by Medium ── */}
      <section
        style={{
          background: funkyMode ? 'var(--surface)' : 'var(--surface-2)',
          padding: 'var(--space-20) 0',
          borderTop: '1px solid var(--border)',
        }}
        aria-labelledby="medium-heading"
      >
        <div className="section-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 'var(--space-2)',
              textAlign: 'center',
            }}
          >
            {funkyMode ? '🎭 Shop by Medium' : 'Shop by Medium'}
          </p>
          <h2
            id="medium-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-4xl)',
              fontWeight: 700,
              color: 'var(--text)',
              textAlign: 'center',
              marginBottom: 'var(--space-12)',
            }}
          >
            Browse by Medium
          </h2>

          {/* Gallery mode: clean horizontal list */}
          {!funkyMode ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 'var(--space-3)',
              }}
              role="list"
            >
              {MEDIUM_CARDS.map((m) => (
                <a
                  key={m.label}
                  href={m.href}
                  role="listitem"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-5) var(--space-6)',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--accent)';
                    el.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--border)';
                    el.style.boxShadow = 'none';
                  }}
                  aria-label={`Browse ${m.label}`}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 500,
                      color: 'var(--text)',
                      letterSpacing: 'var(--tracking-tight)',
                    }}
                  >
                    {m.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-disabled)',
                    }}
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          ) : (
            /* Funky mode: vibrant colorful cards with emoji, slight rotations */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 'var(--space-4)',
              }}
              role="list"
            >
              {MEDIUM_CARDS.map((m, i) => {
                const borderColor = FUNKY_COLORS[i % FUNKY_COLORS.length];
                const rotation = FUNKY_ROTATIONS[i] ?? 0;
                return (
                  <a
                    key={m.label}
                    href={m.href}
                    role="listitem"
                    className="funky-medium-card"
                    style={{
                      display: 'block',
                      background: `linear-gradient(135deg, ${m.color} 0%, rgba(26,16,48,0.95) 100%)`,
                      border: `2px solid ${borderColor}`,
                      aspectRatio: '4/3',
                      textDecoration: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 0.3s var(--ease-spring), box-shadow 0.3s ease',
                      transform: `rotate(${rotation}deg)`,
                      boxShadow: `0 4px 16px ${borderColor}30`,
                    }}
                    aria-label={`Browse ${m.label}`}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 'var(--space-5)',
                        left: 'var(--space-5)',
                        fontSize: '2rem',
                        lineHeight: 1,
                      }}
                    >
                      {m.emoji}
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 'var(--space-5)',
                        left: 'var(--space-5)',
                        right: 'var(--space-5)',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-xl)',
                          fontWeight: 700,
                          color: '#fff',
                          margin: 0,
                          letterSpacing: 'var(--tracking-tight)',
                          textShadow: `0 0 20px ${borderColor}`,
                        }}
                      >
                        {m.label}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-xs)',
                          color: borderColor,
                          margin: 'var(--space-1) 0 0 0',
                          letterSpacing: 'var(--tracking-wide)',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                        }}
                      >
                        Browse →
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Featured Artists ── */}
      <section
        style={{
          background: 'var(--bg)',
          padding: 'var(--space-20) 0',
          borderTop: '1px solid var(--border)',
        }}
        aria-labelledby="artists-heading"
      >
        <div className="section-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 'var(--space-12)',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {funkyMode ? '🧑‍🎨 The Makers' : 'The Makers'}
              </p>
              <h2
                id="artists-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  margin: 0,
                }}
              >
                Featured Artists
              </h2>
            </div>
            <a
              href="/gallery/artists"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--accent)',
                textDecoration: 'none',
                letterSpacing: 'var(--tracking-wide)',
                ...(funkyMode && {
                  border: `1px solid ${FUNKY_COLORS[1]}`,
                  color: FUNKY_COLORS[1],
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)',
                }),
              }}
            >
              All Artists →
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-5)',
            }}
            role="list"
          >
            {featuredArtists.map((artist, i) => {
              const initials = artist.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase();
              const funkyBorderColor = FUNKY_COLORS[i % FUNKY_COLORS.length];

              return (
                <article
                  key={artist.id}
                  className={funkyMode ? 'funky-artist-card' : ''}
                  role="listitem"
                  style={{
                    background: 'var(--surface)',
                    border: funkyMode ? `2px solid ${funkyBorderColor}` : '1px solid var(--border)',
                    padding: 'var(--space-8)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-5)',
                    transition: 'border-color 0.2s ease, transform 0.3s var(--ease-spring), box-shadow 0.3s ease',
                    ...(funkyMode && {
                      boxShadow: `0 4px 20px ${funkyBorderColor}20`,
                    }),
                  }}
                  onMouseEnter={(e) => {
                    if (!funkyMode) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!funkyMode) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                    {/* Avatar */}
                    {funkyMode ? (
                      /* Funky: animated gradient ring */
                      <div
                        style={{
                          width: '72px',
                          height: '72px',
                          borderRadius: '50%',
                          padding: '3px',
                          background: `linear-gradient(135deg, ${funkyBorderColor}, ${FUNKY_COLORS[(i + 2) % FUNKY_COLORS.length]})`,
                          flexShrink: 0,
                          animation: 'border-spin 3s linear infinite',
                          backgroundSize: '200% 200%',
                        }}
                        aria-hidden="true"
                      >
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            background: 'var(--surface-2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: 'var(--text-lg)',
                              fontWeight: 700,
                              color: funkyBorderColor,
                            }}
                          >
                            {initials}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Gallery: clean minimal circle */
                      <div
                        style={{
                          width: '64px',
                          height: '64px',
                          background: 'var(--surface-3)',
                          border: '1px solid var(--border-strong)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-lg)',
                            fontWeight: 600,
                            color: 'var(--accent)',
                          }}
                        >
                          {initials}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-xl)',
                          fontWeight: 600,
                          color: funkyMode ? funkyBorderColor : 'var(--text)',
                          margin: '0 0 var(--space-1) 0',
                        }}
                      >
                        {artist.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-muted)',
                          margin: 0,
                        }}
                      >
                        {artist.city}, {artist.state} · {artist.medium}
                      </p>
                    </div>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      lineHeight: 'var(--leading-normal)',
                      color: 'var(--text-muted)',
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {artist.bio}
                  </p>

                  <a
                    href={`/gallery/artists/${artist.slug}`}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      color: funkyMode ? funkyBorderColor : 'var(--accent)',
                      textDecoration: 'none',
                      letterSpacing: 'var(--tracking-wide)',
                      marginTop: 'auto',
                    }}
                  >
                    View Gallery ({artist.workCount} works) →
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── For Artists CTA ── */}
      <section
        style={{
          background: funkyMode ? 'var(--surface)' : 'var(--surface-2)',
          padding: 'var(--space-20) 0',
          borderTop: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
          ...(funkyMode && {
            backgroundImage: `
              radial-gradient(circle, ${FUNKY_COLORS[0]}18 1px, transparent 1px),
              radial-gradient(circle, ${FUNKY_COLORS[1]}12 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 70px 70px',
            backgroundPosition: '0 0, 20px 20px',
          }),
        }}
        aria-labelledby="artist-cta-heading"
      >
        <div
          className="section-container"
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            maxWidth: '720px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 'var(--space-4)',
            }}
          >
            {funkyMode ? '🎪 For Artists' : 'For Artists'}
          </p>
          <h2
            id="artist-cta-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-5xl)',
              fontWeight: 700,
              lineHeight: 'var(--leading-tight)',
              color: 'var(--text)',
              marginBottom: 'var(--space-6)',
              ...(funkyMode && {
                background: `linear-gradient(135deg, ${FUNKY_COLORS[0]}, ${FUNKY_COLORS[1]}, ${FUNKY_COLORS[2]})`,
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-shift 4s ease infinite',
              }),
            }}
          >
            Sell your work on BuyCurious.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--text-muted)',
              maxWidth: '540px',
              margin: '0 auto var(--space-10) auto',
            }}
          >
            We handle the platform, the payments, and the promotion. You handle the art. This is a curated marketplace — we work with artists who are serious about their work and serious about the South.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/gallery/apply"
              className="btn btn--primary"
              style={{
                fontSize: 'var(--text-base)',
                ...(funkyMode && {
                  background: `linear-gradient(135deg, ${FUNKY_COLORS[0]}, ${FUNKY_COLORS[3]})`,
                  border: 'none',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 'var(--text-md)',
                  letterSpacing: 'var(--tracking-wide)',
                }),
              }}
            >
              {funkyMode ? '🚀 Apply to Sell' : 'Apply to Sell'}
            </a>
            <a
              href="/gallery/artists"
              className="btn btn--ghost"
              style={{
                fontSize: 'var(--text-base)',
                ...(funkyMode && {
                  borderColor: FUNKY_COLORS[2],
                  color: FUNKY_COLORS[2],
                }),
              }}
            >
              {funkyMode ? '👀 Browse Artists' : 'Browse Artists'}
            </a>
          </div>
        </div>
      </section>

      {/* ── Mode Toggle (floating pill) ── */}
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 'var(--z-toast)' as never,
        }}
        aria-label={funkyMode ? 'Switch to clean gallery mode' : 'Switch to funky mode'}
      >
        <button
          onClick={() => setFunkyMode((prev) => !prev)}
          aria-pressed={funkyMode}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: funkyMode ? '0.75rem 1.5rem' : '0.6rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            border: funkyMode ? `2px solid ${FUNKY_COLORS[0]}` : '1px solid rgba(0,0,0,0.15)',
            background: funkyMode
              ? `linear-gradient(135deg, #1a1030, #0a0618)`
              : 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            boxShadow: funkyMode
              ? `0 4px 24px ${FUNKY_COLORS[0]}40, 0 0 0 1px ${FUNKY_COLORS[0]}30`
              : '0 2px 16px rgba(0,0,0,0.12)',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 700,
            color: funkyMode ? FUNKY_COLORS[0] : '#1a1a1a',
            letterSpacing: 'var(--tracking-wide)',
            transition: 'all 0.4s var(--ease-spring)',
            animation: 'toggle-bounce 0s',
            userSelect: 'none',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = 'scale(1)';
          }}
          onMouseDown={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = 'scale(0.95)';
          }}
          onMouseUp={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = 'scale(1.05)';
          }}
        >
          {funkyMode ? (
            <>
              <span style={{ fontSize: '1rem' }}>🎨</span>
              <span>Go Clean</span>
            </>
          ) : (
            <>
              <span style={{ fontSize: '1rem' }}>✨</span>
              <span>Go Funky</span>
            </>
          )}
          {/* Toggle track indicator */}
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: funkyMode
                ? `linear-gradient(135deg, ${FUNKY_COLORS[0]}, ${FUNKY_COLORS[1]})`
                : '#b8963e',
              transition: 'background 0.4s ease',
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
        </button>
      </div>
    </>
  );
}
