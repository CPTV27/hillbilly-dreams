// apps/web/app/gallery/artists/[slug]/page.tsx
// BuyCurious Art — Individual Artist Profile Page
// Server component.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DEMO_ARTISTS, DEMO_ARTWORKS, formatPrice } from '../../demo-data';

interface Props {
  params: { slug: string };
}

// ── Utility ──────────────────────────────────────────────────

function getArtist(slug: string) {
  return DEMO_ARTISTS.find((a) => a.slug === slug) ?? null;
}

function getArtistWorks(artistId: string) {
  return DEMO_ARTWORKS.filter((w) => w.artistId === artistId);
}

// ── generateMetadata ─────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artist = getArtist(params.slug);
  if (!artist) return { title: 'Artist Not Found | BuyCurious Art' };

  return {
    title: `${artist.name} | BuyCurious Art`,
    description: `${artist.name} — ${artist.medium} artist from ${artist.city}, ${artist.state}. ${artist.bio.slice(0, 150)}...`,
    openGraph: {
      title: `${artist.name} | BuyCurious Art`,
      description: `${artist.medium} from ${artist.city}, ${artist.state}.`,
      type: 'profile',
    },
  };
}

// ── generateStaticParams ─────────────────────────────────────

export function generateStaticParams() {
  return DEMO_ARTISTS.map((a) => ({ slug: a.slug }));
}

// ── Artwork color map ─────────────────────────────────────────

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

// ── Page ─────────────────────────────────────────────────────

export default function ArtistProfilePage({ params }: Props) {
  const artist = getArtist(params.slug);
  if (!artist) notFound();

  const works = getArtistWorks(artist.id);
  const availableWorks = works.filter((w) => w.available);

  const initials = artist.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <>
      {/* ── Artist Header ── */}
      <header
        style={{
          background: 'var(--bg)',
          padding: 'clamp(5rem, 10vw, 8rem) 0 0 0',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="section-container" style={{ paddingTop: 0, paddingBottom: 'var(--space-16)' }}>
          <a
            href="/gallery/artists"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              letterSpacing: 'var(--tracking-wide)',
              display: 'inline-block',
              marginBottom: 'var(--space-8)',
            }}
          >
            ← All Artists
          </a>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: 'var(--space-12)',
              alignItems: 'start',
            }}
          >
            {/* Profile image / avatar */}
            <div
              style={{
                width: '200px',
                height: '200px',
                background: 'var(--surface)',
                border: '2px solid var(--border-strong)',
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
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 700,
                  color: 'var(--accent)',
                }}
              >
                {initials}
              </span>
            </div>

            {/* Bio block */}
            <div>
              {artist.featured && (
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    letterSpacing: 'var(--tracking-wider)',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    background: 'var(--accent-muted)',
                    padding: 'var(--space-1) var(--space-3)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  Featured Artist
                </span>
              )}

              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-5xl)',
                  fontWeight: 700,
                  lineHeight: 'var(--leading-tight)',
                  color: 'var(--text)',
                  margin: '0 0 var(--space-3) 0',
                }}
              >
                {artist.name}
              </h1>

              <div
                style={{
                  display: 'flex',
                  gap: 'var(--space-4)',
                  alignItems: 'center',
                  marginBottom: 'var(--space-6)',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--text-muted)' }}>
                  {artist.city}, {artist.state}
                </span>
                <span style={{ color: 'var(--border-strong)' }}>·</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--accent)', fontWeight: 500 }}>
                  {artist.medium}
                </span>
                <span style={{ color: 'var(--border-strong)' }}>·</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--text-muted)' }}>
                  {availableWorks.length} works available
                </span>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-lg)',
                  lineHeight: 'var(--leading-loose)',
                  color: 'var(--text-muted)',
                  maxWidth: '600px',
                  margin: '0 0 var(--space-8) 0',
                }}
              >
                {artist.bio}
              </p>

              {/* Social links */}
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                {artist.instagram && (
                  <a
                    href={`https://instagram.com/${artist.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                    style={{ fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-5)' }}
                  >
                    Instagram ↗
                  </a>
                )}
                {artist.website && (
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                    style={{ fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-5)' }}
                  >
                    Website ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Artworks Grid ── */}
      <section
        style={{
          background: 'var(--bg)',
          padding: 'var(--space-16) 0 var(--space-20) 0',
        }}
        aria-label={`Artworks by ${artist.name}`}
      >
        <div className="section-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 600,
              color: 'var(--text)',
              marginBottom: 'var(--space-10)',
            }}
          >
            {availableWorks.length > 0 ? 'Available Works' : 'Works'}
          </h2>

          {works.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: 'var(--text-lg)' }}>
              No works listed yet. Check back soon.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '4px',
              }}
              role="list"
            >
              {works.map((work) => (
                <article
                  key={work.id}
                  role="listitem"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    aspectRatio: '4/5',
                    background: ARTWORK_COLORS[work.id] ?? '#231f1c',
                    opacity: work.available ? 1 : 0.6,
                  }}
                >
                  <a
                    href={`/gallery/work/${work.slug}`}
                    style={{ display: 'block', height: '100%', textDecoration: 'none' }}
                    aria-label={`${work.title} — ${formatPrice(work.salePrice ?? work.price)}${!work.available ? ' — Sold' : ''}`}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(10,8,6,0.95) 0%, transparent 55%)',
                        zIndex: 1,
                      }}
                    />

                    {!work.available && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 'var(--space-4)',
                          right: 'var(--space-4)',
                          background: 'rgba(10,8,6,0.8)',
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 700,
                          letterSpacing: 'var(--tracking-wider)',
                          textTransform: 'uppercase',
                          padding: 'var(--space-1) var(--space-3)',
                          zIndex: 3,
                        }}
                      >
                        Sold
                      </div>
                    )}

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
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-xl)',
                          fontWeight: 600,
                          color: 'var(--text)',
                          margin: '0 0 var(--space-2) 0',
                        }}
                      >
                        {work.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-muted)',
                          margin: '0 0 var(--space-3) 0',
                        }}
                      >
                        {work.medium} · {work.year} · {work.edition}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-xl)',
                          fontWeight: 600,
                          color: work.available ? 'var(--accent)' : 'var(--text-muted)',
                          margin: 0,
                        }}
                      >
                        {work.available ? formatPrice(work.salePrice ?? work.price) : 'Sold'}
                      </p>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
