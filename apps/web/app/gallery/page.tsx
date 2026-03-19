'use client';

// apps/web/app/gallery/page.tsx
// BuyCurious Art — gallery storefront landing page
// Dark, gallery-forward, Southern Gothic.

import { DEMO_ARTWORKS, DEMO_ARTISTS, formatPrice } from './demo-data';

// Placeholder art image colors per artwork (used as background when no real image)
const ARTWORK_COLORS: Record<string, string> = {
  w1: '#3d2b1a',
  w2: '#1a1a1a',
  w3: '#4a3728',
  w4: '#2a1f14',
  w5: '#5a4a3a',
  w6: '#0d0d0d',
  w7: '#4a5c6a',
  w8: '#1a0f24',
};

const MEDIUM_CARDS = [
  { label: 'Painting', emoji: '🎨', color: '#3d2b1a', href: '/gallery?medium=painting' },
  { label: 'Photography', emoji: '📷', color: '#1a1f2e', href: '/gallery?medium=photography' },
  { label: 'Sculpture', emoji: '🏺', color: '#2e2018', href: '/gallery?medium=sculpture' },
  { label: 'Mixed Media', emoji: '🖼', color: '#1a2018', href: '/gallery?medium=mixed-media' },
  { label: 'Textile', emoji: '🧵', color: '#1e2a2e', href: '/gallery?medium=textile' },
  { label: 'Ceramics', emoji: '🫙', color: '#2a1e14', href: '/gallery?medium=ceramics' },
];

const featuredArtworks = DEMO_ARTWORKS.filter((w) => w.featured);
const featuredArtists = DEMO_ARTISTS.filter((a) => a.featured);

export default function GalleryPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: '92vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: 0,
          background: 'var(--bg)',
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
            Big Muddy presents
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
            Buy<em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Curious</em>
            <br />
            Art
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-10)',
              maxWidth: '440px',
            }}
          >
            Original art from the Mississippi corridor. Curated from the artists, musicians, and makers who call the Deep South home.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <a
              href="/gallery/artists"
              className="btn btn--primary"
              style={{ fontSize: 'var(--text-base)' }}
            >
              Browse Artists
            </a>
            <a
              href="/gallery/apply"
              className="btn btn--ghost"
              style={{ fontSize: 'var(--text-base)' }}
            >
              Sell Your Work
            </a>
          </div>
        </div>

        {/* Right: hero artwork mosaic */}
        <div
          style={{
            height: '92vh',
            display: 'grid',
            gridTemplateRows: '3fr 2fr',
            gridTemplateColumns: '3fr 2fr',
            gap: '3px',
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          {/* Large top-left */}
          <div
            style={{
              gridRow: '1 / 2',
              gridColumn: '1 / 2',
              background: ARTWORK_COLORS.w1,
              backgroundImage: 'url(/images/ai-corridor/ocean-springs-gallery.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 'var(--space-4)',
                left: 'var(--space-4)',
                background: 'rgba(10,8,6,0.75)',
                backdropFilter: 'blur(4px)',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', color: 'var(--text)', margin: 0 }}>
                Bluff at Last Light
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0 }}>
                Delphine Mouton · {formatPrice(240000)}
              </p>
            </div>
          </div>
          {/* Top-right */}
          <div style={{ gridRow: '1 / 2', gridColumn: '2 / 3', background: ARTWORK_COLORS.w2, backgroundImage: 'url(/images/corridor/craftsman-porch-columns.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          {/* Bottom-left */}
          <div style={{ gridRow: '2 / 3', gridColumn: '1 / 2', background: ARTWORK_COLORS.w3, backgroundImage: 'url(/images/corridor/natchez-bluff-river-view.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          {/* Bottom-right */}
          <div style={{ gridRow: '2 / 3', gridColumn: '2 / 3', background: ARTWORK_COLORS.w7, backgroundImage: 'url(/images/ai-corridor/river-sunset-bluffs.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>

        {/* Mobile: collapse to stacked */}
        <style>{`
          @media (max-width: 768px) {
            #gallery-hero {
              grid-template-columns: 1fr !important;
            }
            #gallery-hero-mosaic {
              height: 50vw !important;
              grid-template-rows: 1fr !important;
              grid-template-columns: 1fr 1fr 1fr !important;
            }
          }
        `}</style>
      </section>

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-12)' }}>
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
                Selected Works
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
              }}
            >
              View All Works →
            </a>
          </div>

          {/* Masonry-style grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gridTemplateRows: 'auto auto',
              gap: '4px',
            }}
            role="list"
          >
            {featuredArtworks.map((artwork, i) => {
              // Varied spans for masonry feel
              const spans = [
                { col: '1 / 6', row: '1 / 2', height: '520px' },
                { col: '6 / 10', row: '1 / 2', height: '520px' },
                { col: '10 / 13', row: '1 / 2', height: '520px' },
              ];
              const span = spans[i] ?? spans[0];
              return (
                <article
                  key={artwork.id}
                  role="listitem"
                  style={{
                    gridColumn: span.col,
                    gridRow: span.row,
                    height: span.height,
                    background: ARTWORK_COLORS[artwork.id] ?? '#231f1c',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <a
                    href={`/gallery/work/${artwork.slug}`}
                    style={{ display: 'block', height: '100%', textDecoration: 'none' }}
                    aria-label={`${artwork.title} by ${artwork.artistName}, ${formatPrice(artwork.salePrice ?? artwork.price)}`}
                  >
                    {/* Hover overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(10,8,6,0.9) 0%, transparent 50%)',
                        transition: 'opacity 0.3s ease',
                        zIndex: 1,
                      }}
                    />
                    {/* Info */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: 'var(--space-6)',
                        zIndex: 2,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          letterSpacing: 'var(--tracking-wider)',
                          textTransform: 'uppercase',
                          color: 'var(--accent)',
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
                          margin: '0 0 var(--space-3) 0',
                        }}
                      >
                        {artwork.medium} · {artwork.edition}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-xl)',
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
                              fontSize: 'var(--text-base)',
                              color: 'var(--text-muted)',
                              fontFamily: 'var(--font-body)',
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
        </div>
      </section>

      {/* ── Browse by Medium ── */}
      <section
        style={{
          background: 'var(--surface)',
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
            Shop by Medium
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
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
                  display: 'block',
                  background: m.color,
                  aspectRatio: '4/3',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
                aria-label={`Browse ${m.label}`}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
                  }}
                />
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
                      fontWeight: 600,
                      color: 'var(--text)',
                      margin: 0,
                      letterSpacing: 'var(--tracking-tight)',
                    }}
                  >
                    {m.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--accent)',
                      margin: 'var(--space-1) 0 0 0',
                      letterSpacing: 'var(--tracking-wide)',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    Browse →
                  </p>
                </div>
              </a>
            ))}
          </div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-12)' }}>
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
                The Makers
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
              }}
            >
              All Artists →
            </a>
          </div>

          {/* Horizontal scroll on mobile, 3-col grid on desktop */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-5)',
            }}
            role="list"
          >
            {featuredArtists.map((artist) => {
              const initials = artist.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase();
              return (
                <article
                  key={artist.id}
                  role="listitem"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    padding: 'var(--space-8)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-5)',
                    transition: 'border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  }}
                >
                  <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                    {/* Avatar */}
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
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-xl)',
                          fontWeight: 600,
                          color: 'var(--text)',
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
                      color: 'var(--accent)',
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
          background: 'var(--surface)',
          padding: 'var(--space-20) 0',
          borderTop: '1px solid var(--border)',
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
            For Artists
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
              marginBottom: 'var(--space-10)',
              maxWidth: '540px',
              margin: '0 auto var(--space-10) auto',
            }}
          >
            We handle the platform, the payments, and the promotion. You handle the art. This is a curated marketplace — we work with artists who are serious about their work and serious about the South.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/gallery/apply" className="btn btn--primary" style={{ fontSize: 'var(--text-base)' }}>
              Apply to Sell
            </a>
            <a href="/gallery/artists" className="btn btn--ghost" style={{ fontSize: 'var(--text-base)' }}>
              Browse Artists
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
