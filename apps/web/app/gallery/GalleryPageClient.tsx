'use client';

// apps/web/app/gallery/GalleryPageClient.tsx
// Chase Pierson Photography — Venture Gallery (client: filters + print catalog)

import { formatPhotoCityLabel, type PhotoIndexEntry } from '@/lib/photo-index';
import { GALLERY_PRINTS, CATEGORIES } from './gallery-data';
import GalleryGrid from './GalleryGrid';

interface Props {
  libraryPhotos: PhotoIndexEntry[];
}

export default function GalleryPageClient({ libraryPhotos }: Props) {
  const grid = libraryPhotos.slice(0, 12);
  const featured = GALLERY_PRINTS.filter((p) => p.featured);

  return (
    <>
      <style>{`
        .featured-card img { transition: transform 0.6s ease; }
        .featured-card:hover img { transform: scale(1.03); }
      `}</style>

      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden',
          padding: 'clamp(0.75rem, 2vw, 1.25rem)',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
            gap: '6px',
            maxWidth: '1600px',
            margin: '0 auto',
            minHeight: 'calc(100vh - clamp(1.5rem, 4vw, 2.5rem))',
          }}
        >
          {grid.map((p) => (
            <article
              key={p.hash}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px',
                backgroundColor: 'var(--surface, #f5f5f0)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '4/3', width: '100%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- GCS grid URLs */}
                <img
                  src={p.urls.grid}
                  alt={p.caption || p.shoot || 'Library photograph'}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
              <div style={{ padding: '0.65rem 0.5rem 0.75rem', flex: 1 }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    lineHeight: 1.45,
                    color: 'var(--text)',
                    margin: '0 0 0.2rem',
                  }}
                >
                  {p.caption || p.shoot.replace(/-/g, ' ')}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted, #999)',
                    margin: 0,
                    letterSpacing: '0.04em',
                  }}
                >
                  {formatPhotoCityLabel(p.city)}
                  {p.credit ? ` · ${p.credit}` : ''}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(2rem, 6vh, 4rem)',
            left: 0,
            right: 0,
            textAlign: 'center',
            color: '#fff',
            pointerEvents: 'none',
            textShadow: '0 2px 24px rgba(0,0,0,0.65)',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 300,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Chase Pierson
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginTop: '0.75rem',
              opacity: 0.9,
            }}
          >
            Photography
          </p>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '36px',
              background: 'rgba(255,255,255,0.45)',
            }}
          />
        </div>
      </section>

      <section
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '5rem 2rem',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            lineHeight: 1.8,
            color: 'var(--text-muted, #666)',
          }}
        >
          Landscapes, architecture, and infrared from the Hudson Valley to the Deep South. Aerial
          panoramas shot from drones at dawn. Night exposures under Catskill stars. False-color
          experiments that turn forests into paintings.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--text-muted, #999)',
            marginTop: '1.5rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Archival pigment prints on cotton rag paper
        </p>
      </section>

      <section
        style={{
          padding: '0 2rem 4rem',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '3rem',
            color: 'var(--text)',
          }}
        >
          Featured
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: '2rem',
          }}
        >
          {featured.map((print) => (
            <a
              key={print.id}
              className="featured-card"
              href={`mailto:chase@hillbillydreamsinc.com?subject=Inquiry: ${print.title}&body=I'm interested in "${print.title}" — please send me availability and sizing options.`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
              }}
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
              </div>
              <div style={{ padding: '1rem 0' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
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
                    fontSize: '0.8rem',
                    color: 'var(--text-muted, #999)',
                    margin: '0.25rem 0 0',
                    letterSpacing: '0.05em',
                  }}
                >
                  {print.priceRange} &middot; {print.edition}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: '4rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto',
          borderTop: '1px solid var(--border, #e5e5e0)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'var(--text)',
          }}
        >
          All Work
        </h2>
        <GalleryGrid prints={GALLERY_PRINTS} categories={CATEGORIES} />
      </section>

      <section
        id="prints"
        style={{
          padding: '5rem 2rem',
          maxWidth: '680px',
          margin: '0 auto',
          textAlign: 'center',
          borderTop: '1px solid var(--border, #e5e5e0)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            color: 'var(--text)',
          }}
        >
          Prints
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          {['8x10', '16x20', '24x36', '40x60'].map((size) => (
            <div
              key={size}
              style={{
                padding: '1rem',
                border: '1px solid var(--border, #e5e5e0)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  color: 'var(--text)',
                }}
              >
                {size}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted, #999)',
                  marginTop: '0.25rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                inches
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            color: 'var(--text-muted, #666)',
            marginBottom: '2rem',
          }}
        >
          All prints are produced on archival cotton rag paper using pigment inks rated for 100+
          years. Prints ship flat, unframed, with a certificate of authenticity. Custom sizes
          available on request.
        </p>
        <a
          href="mailto:chase@hillbillydreamsinc.com?subject=Print Inquiry&body=I'd like to inquire about purchasing a print. Please send me your current availability."
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '1rem 3rem',
            border: '1px solid var(--text)',
            color: 'var(--text)',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
        >
          Inquire
        </a>
      </section>

      <section
        id="tracy-alderson-gallery"
        style={{
          borderTop: '1px solid var(--border, #e5e5e0)',
          backgroundColor: '#1a1a1a',
          color: '#f5f0eb',
          marginTop: '2rem',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #2d1b2e 0%, #1a1a2e 50%, #1a2420 100%)',
            padding: '5rem 2rem 4rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#c4956a',
              marginBottom: '1.5rem',
            }}
          >
            Venture Gallery
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 300,
              letterSpacing: '0.1em',
              margin: 0,
              color: '#f5f0eb',
            }}
          >
            Tracy Alderson Gallery
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(245, 240, 235, 0.5)',
              marginTop: '1rem',
            }}
          >
            Guest Artists &middot; Original Work &middot; Curated Collection
          </p>
        </div>

        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '4rem 2rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
              lineHeight: 1.9,
              color: 'rgba(245, 240, 235, 0.75)',
            }}
          >
            Original art from the artists, musicians, and makers who call the Deep South home.
            Paintings, mixed media, ceramics, textiles, and sculpture — collected the way
            you&apos;d find it in the rooms of the Big Muddy Inn. Layered, personal, and meant to
            live with.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              fontStyle: 'italic',
              color: '#c4956a',
              marginTop: '2rem',
            }}
          >
            Interior style with an original spin.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'rgba(245, 240, 235, 0.4)',
              marginTop: '0.5rem',
              letterSpacing: '0.05em',
            }}
          >
            Design direction by Andrea Brooks Interiors
          </p>
        </div>

        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 2rem 4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {[
            { medium: 'Painting', note: 'Oil, acrylic, watercolor' },
            { medium: 'Mixed Media', note: 'Collage, assemblage, found objects' },
            { medium: 'Ceramics', note: 'Functional and sculptural' },
            { medium: 'Textile', note: 'Quilts, fiber, woven work' },
            { medium: 'Sculpture', note: 'Wood, metal, clay' },
            { medium: 'Photography', note: 'Regional documentary' },
          ].map((item) => (
            <div key={item.medium}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 400,
                  color: '#f5f0eb',
                  marginBottom: '0.25rem',
                }}
              >
                {item.medium}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  color: 'rgba(245, 240, 235, 0.4)',
                  letterSpacing: '0.05em',
                }}
              >
                {item.note}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(245, 240, 235, 0.1)',
            padding: '4rem 2rem',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#f5f0eb',
              marginBottom: '1rem',
            }}
          >
            For Artists
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              color: 'rgba(245, 240, 235, 0.6)',
              maxWidth: '500px',
              margin: '0 auto 2rem',
            }}
          >
            We carry original work on consignment with artist-first terms. 70&ndash;80% to the
            maker, always. If you create work that belongs on someone&apos;s wall, we&apos;d like
            to see it.
          </p>
          <a
            href="mailto:tracyaldersonallen@gmail.com?subject=Gallery Submission&body=Hi Tracy, I'd like to submit my work for consideration at the Venture Gallery. Here's a link to my portfolio:"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '1rem 3rem',
              border: '1px solid #c4956a',
              color: '#c4956a',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Submit Your Work
          </a>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(245, 240, 235, 0.1)',
            padding: '3rem 2rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(245, 240, 235, 0.4)',
              marginBottom: '0.75rem',
            }}
          >
            Visit the Gallery
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              color: '#f5f0eb',
              lineHeight: 1.6,
            }}
          >
            The Big Muddy Inn<br />
            411 N Commerce St<br />
            Natchez, Mississippi
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'rgba(245, 240, 235, 0.4)',
              marginTop: '1rem',
              letterSpacing: '0.05em',
            }}
          >
            Open daily to guests and visitors
          </p>
        </div>
      </section>
    </>
  );
}
