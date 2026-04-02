'use client';

// apps/web/app/gallery/page.tsx
// Chase Pierson Photography — Venture Gallery
// Clean, white, museum-feel. The art speaks.

import { GALLERY_PRINTS, CATEGORIES } from './gallery-data';
import GalleryGrid from './GalleryGrid';

export default function GalleryPage() {
  const featured = GALLERY_PRINTS.filter((p) => p.featured);
  const heroImage = GALLERY_PRINTS[0]; // Glass House, Blue Hour

  return (
    <>
      {/* Featured card hover styles */}
      <style>{`
        .featured-card img { transition: transform 0.6s ease; }
        .featured-card:hover img { transform: scale(1.03); }
      `}</style>

      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <img
          src={heroImage.src}
          alt={heroImage.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '12vh',
            left: 0,
            right: 0,
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
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
              fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginTop: '0.75rem',
              opacity: 0.85,
            }}
          >
            Photography
          </p>
        </div>
        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
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
              height: '40px',
              background: 'rgba(255,255,255,0.5)',
            }}
          />
        </div>
      </section>

      {/* ── Artist Statement ── */}
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
          Landscapes, architecture, and infrared from the Hudson Valley to the
          Mississippi corridor. Aerial panoramas shot from drones at dawn.
          Night exposures under Catskill stars. False-color experiments that
          turn forests into paintings.
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

      {/* ── Featured Prints ── */}
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

      {/* ── Full Gallery with Category Filter ── */}
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

      {/* ── Print Information ── */}
      <section
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
          All prints are produced on archival cotton rag paper using pigment
          inks rated for 100+ years. Prints ship flat, unframed, with a
          certificate of authenticity. Custom sizes available on request.
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

      {/* ── Tracy Alderson Gallery ── */}
      <section
        style={{
          padding: '5rem 2rem',
          maxWidth: '800px',
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
            marginBottom: '1rem',
            color: 'var(--text)',
          }}
        >
          Guest Artists
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-muted, #999)',
            marginBottom: '2rem',
          }}
        >
          Curated by Tracy Alderson
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'var(--text-muted, #666)',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          The Venture Gallery guest program opens Summer 2026, featuring
          artists and makers from the Mississippi corridor and Hudson Valley.
        </p>
      </section>
    </>
  );
}
