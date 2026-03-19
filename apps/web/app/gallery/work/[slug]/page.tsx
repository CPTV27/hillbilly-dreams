// apps/web/app/gallery/work/[slug]/page.tsx
// BuyCurious Art — Individual Artwork Detail Page
// The most important page. Art-forward, minimal chrome, design-system consistent.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DEMO_ARTWORKS, DEMO_ARTISTS, formatPrice, getArtworksByArtist } from '../../demo-data';

interface Props {
  params: Promise<{ slug: string }>;
}

// ── generateMetadata ──────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artwork = DEMO_ARTWORKS.find((w) => w.slug === slug);
  if (!artwork) return { title: 'Artwork Not Found | BuyCurious Art' };

  return {
    title: `${artwork.title} — ${artwork.artistName} | BuyCurious Art`,
    description: `${artwork.title} by ${artwork.artistName}. ${artwork.medium}, ${artwork.dimensions}. ${artwork.edition}. ${formatPrice(artwork.salePrice ?? artwork.price)}. ${artwork.description.slice(0, 120)}...`,
    openGraph: {
      title: `${artwork.title} by ${artwork.artistName}`,
      description: artwork.description.slice(0, 200),
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artwork.title} by ${artwork.artistName}`,
      description: `${artwork.medium} · ${formatPrice(artwork.salePrice ?? artwork.price)} · BuyCurious Art`,
    },
  };
}

// ── generateStaticParams ──────────────────────────────────────

export function generateStaticParams() {
  return DEMO_ARTWORKS.map((w) => ({ slug: w.slug }));
}

// ── Page ─────────────────────────────────────────────────────

export default async function ArtworkDetailPage({ params }: Props) {
  const { slug } = await params;
  const artwork = DEMO_ARTWORKS.find((w) => w.slug === slug);

  if (!artwork) notFound();

  const artist = DEMO_ARTISTS.find((a) => a.id === artwork.artistId);
  const moreWorks = getArtworksByArtist(artwork.artistId)
    .filter((w) => w.id !== artwork.id && w.available)
    .slice(0, 3);

  const artistInitials = artist?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() ?? '?';

  const contactEmail = 'gallery@bigmuddytouring.com';
  const inquirySubject = encodeURIComponent(`Inquiry: ${artwork.title} by ${artwork.artistName}`);
  const inquiryBody = encodeURIComponent(
    `Hi,\n\nI'm interested in "${artwork.title}" by ${artwork.artistName}.\n\nLink: https://buycuriousart.com/gallery/work/${artwork.slug}\n\nPlease let me know about availability and next steps.\n\nThank you.`
  );

  return (
    <>
      {/* ── Hero: Full-viewport split layout ── */}
      <section
        style={{
          background: 'var(--bg)',
          paddingTop: 'clamp(4rem, 8vw, 6rem)',
        }}
        aria-label={`${artwork.title} by ${artwork.artistName}`}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            minHeight: '88vh',
            maxWidth: '1600px',
            margin: '0 auto',
          }}
        >
          {/* Left: large art image */}
          <div
            style={{
              background: artwork.images[0] as string ?? '#231f1c',
              minHeight: '600px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Gradient art placeholder — replace with <Image> when real images exist */}
            <div
              style={{
                position: 'absolute',
                inset: '6%',
                background: `linear-gradient(145deg, ${artwork.images[1] ?? artwork.images[0]} 0%, ${artwork.images[0]} 55%, ${artwork.images[2] ?? artwork.images[0]} 100%)`,
                opacity: 0.75,
              }}
              role="img"
              aria-label={`${artwork.title} — artwork placeholder`}
            />

            {/* Sold watermark */}
            {!artwork.available && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-15deg)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                  fontWeight: 700,
                  color: 'rgba(240,235,224,0.1)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  pointerEvents: 'none',
                  zIndex: 2,
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                }}
                aria-hidden="true"
              >
                Sold
              </div>
            )}
          </div>

          {/* Right: info panel */}
          <div
            style={{
              background: 'var(--surface)',
              borderLeft: '1px solid var(--border)',
              padding: 'var(--space-12) var(--space-10)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-7)',
              overflowY: 'auto',
            }}
          >
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol
                style={{
                  display: 'flex',
                  gap: 'var(--space-2)',
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-muted)',
                  flexWrap: 'wrap',
                }}
              >
                <li>
                  <a href="/gallery" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    Gallery
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a
                    href={`/gallery/artists/${artwork.artistSlug}`}
                    style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                  >
                    {artwork.artistName}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" style={{ color: 'var(--text)' }}>
                  {artwork.title}
                </li>
              </ol>
            </nav>

            {/* Title & Artist */}
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 700,
                  lineHeight: 'var(--leading-tight)',
                  letterSpacing: 'var(--tracking-tight)',
                  color: 'var(--text)',
                  margin: '0 0 var(--space-3) 0',
                }}
              >
                {artwork.title}
              </h1>
              <a
                href={`/gallery/artists/${artwork.artistSlug}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 500,
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  letterSpacing: 'var(--tracking-wide)',
                }}
              >
                {artwork.artistName}
              </a>
              {artist && (
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-muted)',
                    marginLeft: 'var(--space-3)',
                  }}
                >
                  {artist.city}, {artist.state}
                </span>
              )}
            </div>

            {/* Metadata table */}
            <dl
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-4)',
                padding: 'var(--space-5)',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
              }}
            >
              {([
                ['Medium', artwork.medium],
                ['Year', String(artwork.year)],
                ['Dimensions', artwork.dimensions],
                ['Edition', artwork.edition],
                ['Category', artwork.category],
                ['Status', artwork.available ? 'Available' : 'Sold'],
              ] as [string, string][]).map(([label, value]) => (
                <div key={label}>
                  <dt
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      letterSpacing: 'var(--tracking-wider)',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {label}
                  </dt>
                  <dd
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color:
                        label === 'Status' && artwork.available
                          ? 'var(--success)'
                          : 'var(--text)',
                      margin: 0,
                      fontWeight: label === 'Status' ? 600 : 400,
                    }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Price & CTA */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-6)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-4xl)',
                    fontWeight: 700,
                    color: artwork.available ? 'var(--accent)' : 'var(--text-muted)',
                  }}
                >
                  {formatPrice(artwork.salePrice ?? artwork.price)}
                </span>
                {artwork.salePrice && (
                  <s
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xl)',
                      color: 'var(--text-muted)',
                      fontWeight: 400,
                    }}
                  >
                    {formatPrice(artwork.price)}
                  </s>
                )}
              </div>

              {artwork.available ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <a
                    href={`mailto:${contactEmail}?subject=${inquirySubject}&body=${inquiryBody}`}
                    className="btn btn--primary"
                    style={{ textAlign: 'center', fontSize: 'var(--text-base)' }}
                  >
                    Inquire to Purchase
                  </a>
                  <a
                    href={`mailto:${contactEmail}?subject=Question: ${encodeURIComponent(artwork.title)}`}
                    className="btn btn--ghost"
                    style={{ textAlign: 'center', fontSize: 'var(--text-sm)' }}
                  >
                    Ask a Question
                  </a>
                </div>
              ) : (
                <div
                  style={{
                    padding: 'var(--space-4)',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    textAlign: 'center',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-muted)',
                  }}
                >
                  This work has been sold.{' '}
                  <a
                    href={`/gallery/artists/${artwork.artistSlug}`}
                    style={{ color: 'var(--accent)', textDecoration: 'none' }}
                  >
                    View more by {artwork.artistName} →
                  </a>
                </div>
              )}
            </div>

            {/* Share */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-5)' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  letterSpacing: 'var(--tracking-wider)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Share
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${artwork.title}" by ${artwork.artistName} — ${formatPrice(artwork.salePrice ?? artwork.price)}`)}&url=${encodeURIComponent(`https://buycuriousart.com/gallery/work/${artwork.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                  style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-2) var(--space-4)' }}
                >
                  Share on X
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://buycuriousart.com/gallery/work/${artwork.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                  style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-2) var(--space-4)' }}
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Image thumbnails strip ── */}
      {artwork.images.length > 1 && (
        <div
          style={{
            background: 'var(--surface)',
            padding: 'var(--space-5) var(--space-6)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '4px',
            maxWidth: '1600px',
            margin: '0 auto',
          }}
          aria-label="Additional artwork views"
        >
          {(artwork.images as string[]).map((color, i) => (
            <button
              key={i}
              style={{
                width: '72px',
                height: '72px',
                background: color,
                border: i === 0 ? '2px solid var(--accent)' : '2px solid transparent',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              aria-label={`View ${i + 1} of ${artwork.images.length}`}
            />
          ))}
        </div>
      )}

      {/* ── Description ── */}
      <section
        style={{
          background: 'var(--bg)',
          padding: 'var(--space-16) 0',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div
          className="section-container"
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 'var(--space-16)',
            alignItems: 'start',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 600,
                color: 'var(--text)',
                marginBottom: 'var(--space-6)',
              }}
            >
              About this work
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                lineHeight: 'var(--leading-loose)',
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                margin: '0 0 var(--space-8) 0',
                maxWidth: '600px',
              }}
            >
              {artwork.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {artwork.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    letterSpacing: 'var(--tracking-wider)',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    padding: 'var(--space-1) var(--space-3)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar: quick specs repeat */}
          <aside
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: 'var(--space-6)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: 'var(--space-5)',
              }}
            >
              Work Details
            </h3>
            <dl style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {([
                ['Medium', artwork.medium],
                ['Dimensions', artwork.dimensions],
                ['Year', String(artwork.year)],
                ['Edition', artwork.edition],
              ] as [string, string][]).map(([label, value]) => (
                <div key={label} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-3)' }}>
                  <dt
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      letterSpacing: 'var(--tracking-wider)',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {label}
                  </dt>
                  <dd
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--text)',
                      margin: 0,
                    }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* ── Artist bio snippet ── */}
      {artist && (
        <section
          style={{
            background: 'var(--surface)',
            padding: 'var(--space-16) 0',
            borderTop: '1px solid var(--border)',
          }}
          aria-label="About the artist"
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
                marginBottom: 'var(--space-6)',
              }}
            >
              About the Artist
            </p>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-8)',
                alignItems: 'flex-start',
                maxWidth: '800px',
              }}
            >
              {/* Initials avatar */}
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  background: 'var(--surface-2)',
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
                    fontSize: 'var(--text-lg)',
                    fontWeight: 700,
                    color: 'var(--accent)',
                  }}
                >
                  {artistInitials}
                </span>
              </div>

              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 600,
                    color: 'var(--text)',
                    margin: '0 0 var(--space-2) 0',
                  }}
                >
                  {artist.name}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--accent)',
                    margin: '0 0 var(--space-4) 0',
                    fontWeight: 500,
                  }}
                >
                  {artist.city}, {artist.state} · {artist.medium}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    lineHeight: 'var(--leading-loose)',
                    color: 'var(--text-muted)',
                    margin: '0 0 var(--space-5) 0',
                  }}
                >
                  {artist.bio.slice(0, 280)}{artist.bio.length > 280 ? '...' : ''}
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
                  }}
                >
                  View Full Profile →
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── More from this artist ── */}
      {moreWorks.length > 0 && (
        <section
          style={{
            background: 'var(--bg)',
            padding: 'var(--space-16) 0 var(--space-20) 0',
            borderTop: '1px solid var(--border)',
          }}
          aria-labelledby="more-works-heading"
        >
          <div className="section-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-10)',
              }}
            >
              <h2
                id="more-works-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 600,
                  color: 'var(--text)',
                  margin: 0,
                }}
              >
                More by {artwork.artistName}
              </h2>
              <a
                href={`/gallery/artists/${artwork.artistSlug}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  letterSpacing: 'var(--tracking-wide)',
                }}
              >
                Full Gallery →
              </a>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '4px',
              }}
              role="list"
            >
              {moreWorks.map((w) => (
                <article
                  key={w.id}
                  role="listitem"
                  style={{
                    position: 'relative',
                    aspectRatio: '4/5',
                    background: w.images[0] as string ?? '#231f1c',
                    overflow: 'hidden',
                  }}
                >
                  <a
                    href={`/gallery/work/${w.slug}`}
                    style={{ display: 'block', height: '100%', textDecoration: 'none' }}
                    aria-label={`${w.title} — ${formatPrice(w.salePrice ?? w.price)}`}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(10,8,6,0.92) 0%, transparent 55%)',
                        zIndex: 1,
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: 'var(--space-5)',
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
                        {w.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-lg)',
                          fontWeight: 600,
                          color: 'var(--accent)',
                          margin: 0,
                        }}
                      >
                        {formatPrice(w.salePrice ?? w.price)}
                      </p>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
