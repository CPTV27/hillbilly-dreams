// apps/web/app/touring/page.tsx
// Big Muddy Touring — The Hottest Room on the River

import type { Metadata } from 'next';
import { fetchPhotoIndex, formatPhotoCityLabel } from '@/lib/photo-index';
import { TouringHeroSlideshow } from './TouringHeroSlideshow';

export const metadata: Metadata = {
  title: 'Big Muddy Touring — We bring the party.',
  description: 'Booking, transport, promotion, the whole show. 13 cities from Memphis to New Orleans. We book your shows, drive you there, put you on the radio, and write about you in the magazine.',
};

const HERO_FALLBACK =
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp';

const CORRIDOR_CITIES = [
  'Memphis', 'Clarksdale', 'Oxford', 'Tupelo', 'Holly Springs',
  'Greenwood', 'Indianola', 'Greenville', 'Jackson', 'Vicksburg',
  'Natchez', 'Baton Rouge', 'New Orleans',
];

export default async function TouringPage() {
  const library = await fetchPhotoIndex();
  const heroPhotos = library.slice(0, 12);
  const slideUrls = library.slice(0, 6).map((p) => p.urls.grid);
  const slideshowUrls =
    slideUrls.length >= 2
      ? slideUrls
      : slideUrls.length === 1
        ? [slideUrls[0], HERO_FALLBACK]
        : [HERO_FALLBACK, HERO_FALLBACK];

  return (
    <main style={{ background: '#0f0f0d', color: '#e8e0d4', minHeight: '100vh' }}>

      {/* ── HERO (6-image slideshow, 8s / 1s crossfade, pause on hover) ── */}
      <section style={{ position: 'relative' }}>
        <TouringHeroSlideshow slides={slideshowUrls.slice(0, 6)}>
          <div style={{ padding: '0 clamp(24px, 5vw, 80px)' }}>
            <h1 style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#e8e0d4',
              margin: '0 0 16px',
              maxWidth: '800px',
            }}>
              We bring<br />the party.
            </h1>
            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '1rem',
              lineHeight: 1.65,
              color: '#9b9488',
              margin: '0 0 12px',
              maxWidth: '520px',
            }}>
              We book your shows, drive you there, put you on the radio, write about you in the
              magazine, release your record, and sell it in the store.
            </p>
            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#c8943e',
              margin: 0,
            }}>
              Memphis to New Orleans &middot; 13 cities &middot; 735 venues
            </p>
          </div>
        </TouringHeroSlideshow>
      </section>

      {/* ── LIBRARY GRID (latest 12 from /api/photo-library) ── */}
      {heroPhotos.length > 0 ? (
        <section
          style={{
            padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 64px)',
            borderTop: '1px solid rgba(200,148,62,0.12)',
          }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#c8943e',
              margin: '0 0 20px',
              textAlign: 'center',
            }}
          >
            From the library
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))',
              gap: '6px',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            {heroPhotos.map((p) => (
              <article
                key={p.hash}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: '1px solid rgba(200,148,62,0.12)',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '4/3', width: '100%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- GCS */}
                  <img
                    src={p.urls.grid}
                    alt={p.caption || p.shoot}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <div style={{ padding: '0.5rem 0.55rem 0.65rem' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-body, sans-serif)',
                      fontSize: '0.68rem',
                      lineHeight: 1.4,
                      color: '#d4cec4',
                      margin: '0 0 0.15rem',
                    }}
                  >
                    {p.caption || p.shoot.replace(/-/g, ' ')}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body, sans-serif)',
                      fontSize: '0.62rem',
                      color: '#7a7268',
                      margin: 0,
                    }}
                  >
                    {formatPhotoCityLabel(p.city)}
                    {p.credit ? ` · ${p.credit}` : ''}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── THE BLUES ROOM ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '70vh',
        gap: 0,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(40px, 6vw, 100px)',
        }}>
          <p style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: '0 0 20px',
          }}>
            The Blues Room
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 24px',
          }}>
            Fifty seats.<br />No barrier.<br />No mercy.
          </h2>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: '#9b9488',
            maxWidth: '400px',
            margin: 0,
          }}>
            The stage is four feet from the front row. You hear the pick hit the string.
            You see the sweat. This is not a concert &mdash; it&rsquo;s a conversation
            between the band and the room.
          </p>
        </div>
        <div style={{ position: 'relative', minHeight: '400px' }}>
          <img
            src="https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-harmonica.webp"
            alt="The Blues Room"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </section>

      {/* ── THE CIRCUIT ── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
        textAlign: 'center',
        borderTop: '1px solid rgba(200,148,62,0.15)',
      }}>
        <p style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#c8943e',
          margin: '0 0 16px',
        }}>
          The Circuit
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          margin: '0 0 12px',
        }}>
          We don&rsquo;t just play Natchez.
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#6b635a',
          margin: '0 0 48px',
        }}>
          We play the corridor.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px 20px',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          {CORRIDOR_CITIES.map((city) => (
            <span
              key={city}
              style={{
                fontFamily: 'var(--font-display, Georgia, serif)',
                fontSize: city === 'Natchez' ? '1.3rem' : '1rem',
                fontWeight: city === 'Natchez' ? 800 : 400,
                color: city === 'Natchez' ? '#c8943e' : '#4a4440',
                letterSpacing: '-0.01em',
                transition: 'color 0.2s',
              }}
            >
              {city}
            </span>
          ))}
        </div>

        <p style={{
          fontSize: '0.8rem',
          color: '#4a4440',
          margin: '32px 0 0',
        }}>
          13 cities &middot; 735 venues &middot; Memphis to New Orleans
        </p>
      </section>

      {/* ── PLAY WITH US ── */}
      <section style={{
        padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)',
        textAlign: 'center',
        borderTop: '1px solid rgba(200,148,62,0.15)',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          margin: '0 0 20px',
        }}>
          Got a band?<br />Got a sound?
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#9b9488',
          margin: '0 0 40px',
          lineHeight: 1.6,
        }}>
          We want to hear it.
        </p>
        <a
          href="mailto:booking@bigmuddytouring.com?subject=Booking Inquiry"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#c8943e',
            border: '1px solid #c8943e',
            padding: '16px 48px',
            textDecoration: 'none',
            borderRadius: '2px',
          }}
        >
          Get in Touch
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: '40px clamp(24px, 5vw, 80px)',
        textAlign: 'center',
        borderTop: '1px solid rgba(200,148,62,0.08)',
      }}>
        <p style={{
          fontFamily: 'var(--font-body, sans-serif)',
          fontSize: '0.65rem',
          color: '#3a3630',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          Big Muddy Touring &middot; Natchez, Mississippi
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          section:nth-of-type(2) { grid-template-columns: 1fr !important; }
          section:nth-of-type(2) > div:last-child { min-height: 300px !important; }
        }
      `}} />
    </main>
  );
}
