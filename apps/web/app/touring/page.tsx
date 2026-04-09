// apps/web/app/touring/page.tsx
// Big Muddy Touring — The Hottest Room on the River

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Big Muddy Touring — The Hottest Room on the River',
  description: 'Live music in Natchez, Mississippi. 50 seats. No barrier. The Blues Room at 411 North Congress Street.',
};

const HOUSE_BAND_PHOTOS = [
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-harmonica.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/musician-performing.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-show.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/juke-joint-interior.webp',
];

const THEATER_PHOTOS = [
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/juke-joint-saturday.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/mississippi-river.webp',
];

const CORRIDOR_CITIES = [
  'Memphis', 'Clarksdale', 'Oxford', 'Tupelo', 'Holly Springs',
  'Greenwood', 'Indianola', 'Greenville', 'Jackson', 'Vicksburg',
  'Natchez', 'Baton Rouge', 'New Orleans',
];

export default function TouringPage() {
  return (
    <main style={{ background: '#0f0f0d', color: '#e8e0d4', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 0 80px',
        overflow: 'hidden',
      }}>
        <img
          src="https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.4,
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #0f0f0d 0%, transparent 50%, rgba(15,15,13,0.3) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 clamp(24px, 5vw, 80px)' }}>
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
            The Hottest Room<br />on the River
          </h1>
          <p style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: 0,
          }}>
            411 North Congress Street &middot; Natchez, Mississippi
          </p>
        </div>
      </section>

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

      {/* ── THE HOUSE BAND ── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 140px) clamp(24px, 5vw, 80px)',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#c8943e',
          margin: '0 0 16px',
        }}>
          The House Band
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          margin: '0 0 12px',
        }}>
          Every night is different. Same fire.
        </h2>
        <p style={{
          fontSize: '0.95rem',
          color: '#6b635a',
          margin: '0 auto 48px',
          maxWidth: '500px',
          lineHeight: 1.6,
        }}>
          A rotating cast. Blues, soul, country, rock &mdash; whatever walks through the door.
          No setlists. No safety nets.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '4px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {HOUSE_BAND_PHOTOS.map((src, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <img
                src={src}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.1) saturate(0.9)',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── LIVE SHOWS ── */}
      <section style={{
        padding: '0 clamp(24px, 5vw, 80px)',
        marginBottom: 'clamp(60px, 10vw, 140px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {THEATER_PHOTOS.map((src, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
              <img
                src={src}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.85) contrast(1.1)',
                }}
              />
            </div>
          ))}
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
          Big Muddy Touring &middot; Natchez, Mississippi &middot; A Hillbilly Dreams Production
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          section:nth-of-type(2) { grid-template-columns: 1fr !important; }
          section:nth-of-type(2) > div:last-child { min-height: 300px !important; }
          section:nth-of-type(3) div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
          section:nth-of-type(4) div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}} />
    </main>
  );
}
