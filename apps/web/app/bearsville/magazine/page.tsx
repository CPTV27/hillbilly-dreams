export const dynamic = 'force-dynamic';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bearsville Magazine | Studio C',
  description: 'Inside Bearsville Studio C — sessions, spaces, and the creative life of Woodstock, NY.',
};

const studioPhotos = Array.from({ length: 8 }, (_, i) => `/images/studio-c/utopiademo-day-${i + 1}.webp`);
const sessionPhotos = Array.from({ length: 6 }, (_, i) => `/images/studio-c/utopiademo-day-${i + 12}.webp`);
const spacePhotos = Array.from({ length: 6 }, (_, i) => `/images/studio-c/utopiademo-day-${i + 30}.webp`);

export default function BearsvilleMagazinePage() {
  return (
    <main style={{
      backgroundColor: '#0f0f0d',
      color: '#e8e0d4',
      fontFamily: 'var(--font-body)',
      minHeight: '100vh',
      margin: 0,
    }}>
      {/* Hero — Full Bleed */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}>
        <img
          src="/images/studio-c/utopiademo-day-23.webp"
          alt="Inside Bearsville Studio C"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(15,15,13,0) 40%, rgba(15,15,13,0.85) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: 0,
          right: 0,
          textAlign: 'center',
          padding: '0 24px',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c8943e',
            marginBottom: '16px',
          }}>
            Bearsville Creative
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            margin: '0 0 20px 0',
            color: '#e8e0d4',
          }}>
            Studio C
          </h1>
          <p style={{
            fontSize: '1.1rem',
            fontWeight: 300,
            opacity: 0.7,
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Woodstock, New York
          </p>
        </div>
      </section>

      {/* Section Divider */}
      <div style={{
        width: '60px',
        height: '1px',
        backgroundColor: '#c8943e',
        margin: '80px auto',
      }} />

      {/* The Studio */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px 80px',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 300,
          textAlign: 'center',
          marginBottom: '12px',
          color: '#e8e0d4',
        }}>
          The Studio
        </h2>
        <p style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#c8943e',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '48px',
        }}>
          Where it happens
        </p>
        {/* Masonry-style grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '12px',
        }}>
          {studioPhotos.map((src, i) => (
            <div
              key={src}
              style={{
                gridRow: i === 0 || i === 5 ? 'span 2' : 'span 1',
                overflow: 'hidden',
                borderRadius: '2px',
              }}
            >
              <img
                src={src}
                alt={`Studio C interior ${i + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s ease',
                }}
                onMouseOver={(e: any) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseOut={(e: any) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Section Divider */}
      <div style={{
        width: '60px',
        height: '1px',
        backgroundColor: '#c8943e',
        margin: '0 auto 80px',
      }} />

      {/* Sessions */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px 80px',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 300,
          textAlign: 'center',
          marginBottom: '12px',
          color: '#e8e0d4',
        }}>
          Sessions
        </h2>
        <p style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#c8943e',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '48px',
        }}>
          The work
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}>
          {sessionPhotos.map((src, i) => (
            <div
              key={src}
              style={{
                gridColumn: i === 0 ? 'span 2' : 'span 1',
                gridRow: i === 0 ? 'span 2' : 'span 1',
                aspectRatio: i === 0 ? undefined : '4/3',
                overflow: 'hidden',
                borderRadius: '2px',
              }}
            >
              <img
                src={src}
                alt={`Recording session ${i + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s ease',
                }}
                onMouseOver={(e: any) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseOut={(e: any) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Section Divider */}
      <div style={{
        width: '60px',
        height: '1px',
        backgroundColor: '#c8943e',
        margin: '0 auto 80px',
      }} />

      {/* The Space */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px 80px',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 300,
          textAlign: 'center',
          marginBottom: '12px',
          color: '#e8e0d4',
        }}>
          The Space
        </h2>
        <p style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#c8943e',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '48px',
        }}>
          Bearsville &middot; Woodstock &middot; Hudson Valley
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}>
          {spacePhotos.map((src, i) => (
            <div
              key={src}
              style={{
                aspectRatio: i < 2 ? '16/9' : '4/3',
                overflow: 'hidden',
                borderRadius: '2px',
              }}
            >
              <img
                src={src}
                alt={`Bearsville space ${i + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s ease',
                }}
                onMouseOver={(e: any) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseOut={(e: any) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Book a Session CTA */}
      <section style={{
        padding: '100px 24px',
        textAlign: 'center',
        borderTop: '1px solid rgba(200,148,62,0.2)',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 300,
          marginBottom: '16px',
          color: '#e8e0d4',
        }}>
          Book a Session
        </h2>
        <p style={{
          fontSize: '1.05rem',
          fontWeight: 300,
          opacity: 0.65,
          maxWidth: '480px',
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Recording, mixing, live sessions, video production.
          <br />
          Woodstock&apos;s creative home.
        </p>
        <a
          href="/studioc/call-sheet"
          style={{
            display: 'inline-block',
            padding: '16px 48px',
            border: '1px solid #c8943e',
            color: '#c8943e',
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            borderRadius: '2px',
          }}
        >
          View Call Sheet
        </a>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 24px',
        textAlign: 'center',
        fontSize: '0.75rem',
        opacity: 0.4,
        borderTop: '1px solid rgba(200,148,62,0.1)',
      }}>
        Bearsville Creative &middot; Woodstock, NY &middot; Powered by Measurably Better Things
      </footer>
    </main>
  );
}
