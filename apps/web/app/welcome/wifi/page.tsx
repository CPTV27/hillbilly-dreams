'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface EventData {
  id: number;
  name: string;
  date: string;
  time?: string;
  artist?: string;
  price?: string;
}

const LOCATION_CONFIG: Record<string, { name: string; tagline: string; heroImage: string }> = {
  'big-muddy-inn': {
    name: 'The Big Muddy Inn',
    tagline: 'Natchez, Mississippi',
    heroImage: '/images/region/inn-hallway-gathering.webp',
  },
  'utopia-studios': {
    name: 'Utopia Studios',
    tagline: 'Natchez, Mississippi',
    heroImage: '/images/region/night-patio-string-lights.webp',
  },
};

const DEFAULT_LOCATION = 'big-muddy-inn';

export default function WifiPortalPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100dvh', background: '#0f0f0d' }} />}>
      <WifiPortalInner />
    </Suspense>
  );
}

function WifiPortalInner() {
  const searchParams = useSearchParams();
  const locationKey = searchParams.get('location') || DEFAULT_LOCATION;
  const config = LOCATION_CONFIG[locationKey] || LOCATION_CONFIG[DEFAULT_LOCATION];

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [tonightShow, setTonightShow] = useState<EventData | null>(null);

  useEffect(() => {
    fetch('/api/events?status=upcoming&limit=1')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        const events = Array.isArray(data) ? data : data?.data ?? [];
        if (events.length > 0) setTonightShow(events[0]);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          brand: 'inn',
          source: 'wifi-portal',
          location: locationKey,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <main style={{
        minHeight: '100dvh',
        background: 'var(--bg, #0f0f0d)',
        color: 'var(--fg, #f5f0eb)',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
      }}>
        {/* Hero */}
        <section style={{
          position: 'relative',
          minHeight: submitted ? '40vh' : '55vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '2rem 1.5rem',
          transition: 'min-height 0.4s ease',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(180deg, rgba(15,15,13,0.2) 0%, rgba(15,15,13,0.85) 100%), url(${config.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }} aria-hidden="true" />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 480, margin: '0 auto', width: '100%' }}>
            <p style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--accent, #c8943e)',
              marginBottom: '0.5rem',
              fontWeight: 600,
            }}>
              {config.tagline}
            </p>
            <h1 style={{
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              margin: '0 0 0.75rem',
              fontFamily: 'var(--font-display, Georgia, serif)',
            }}>
              Welcome to<br />{config.name}
            </h1>
            {!submitted && (
              <p style={{
                fontSize: '1rem',
                opacity: 0.7,
                lineHeight: 1.5,
                margin: 0,
              }}>
                Enter your email to connect to WiFi and get the inside scoop on
                live shows, local favorites, and what to do in Natchez.
              </p>
            )}
          </div>
        </section>

        {/* Email Form or Post-Submit Content */}
        <section style={{
          padding: '2rem 1.5rem',
          maxWidth: 480,
          margin: '0 auto',
          width: '100%',
        }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                style={{
                  padding: '1rem 1.25rem',
                  fontSize: '1rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: 'var(--fg, #f5f0eb)',
                  outline: 'none',
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                style={{
                  padding: '1rem 1.25rem',
                  fontSize: '1rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: 'var(--fg, #f5f0eb)',
                  outline: 'none',
                }}
              />
              {error && (
                <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: 0 }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '1.1rem',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  background: 'var(--accent, #c8943e)',
                  color: '#0a0a0a',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: submitting ? 'wait' : 'pointer',
                  opacity: submitting ? 0.6 : 1,
                  letterSpacing: '0.03em',
                  minHeight: '56px',
                }}
              >
                {submitting ? 'Connecting...' : 'Connect to WiFi'}
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: 'rgba(200, 148, 62, 0.08)',
                border: '1px solid rgba(200, 148, 62, 0.2)',
                borderRadius: '12px',
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--accent, #c8943e)',
                  margin: '0 0 0.25rem',
                }}>
                  You&apos;re connected.
                </p>
                <p style={{ fontSize: '0.9rem', opacity: 0.6, margin: 0 }}>
                  Enjoy your stay.
                </p>
              </div>

              {/* Tonight's Show */}
              {tonightShow && (
                <div style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                }}>
                  <p style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--accent, #c8943e)',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                  }}>
                    Tonight at the Blues Room
                  </p>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    margin: '0 0 0.5rem',
                    fontFamily: 'var(--font-display, Georgia, serif)',
                  }}>
                    {tonightShow.name}
                  </h3>
                  {tonightShow.artist && (
                    <p style={{ fontSize: '0.95rem', opacity: 0.8, margin: '0 0 0.25rem' }}>
                      {tonightShow.artist}
                    </p>
                  )}
                  <p style={{ fontSize: '0.85rem', opacity: 0.5, margin: 0 }}>
                    {tonightShow.time || 'Doors at 7 PM'} {tonightShow.price && `\u00B7 ${tonightShow.price}`}
                  </p>
                </div>
              )}

              {/* Radio Stream */}
              <a
                href="https://bigmuddyradio.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <span style={{ fontSize: '1.5rem' }} aria-hidden="true">&#9835;</span>
                <div>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.15rem' }}>
                    Big Muddy Radio
                  </p>
                  <p style={{ fontSize: '0.8rem', opacity: 0.5, margin: 0 }}>
                    Live stream &mdash; Deep South music
                  </p>
                </div>
              </a>

              {/* Quick Links */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
              }}>
                {[
                  { label: 'Local Dining', href: 'https://deepsouthdirectory.com?category=food' },
                  { label: 'Things to Do', href: 'https://deepsouthdirectory.com?category=tours' },
                  { label: 'Magazine', href: 'https://bigmuddymagazine.com' },
                  { label: 'Events', href: '/touring/inn' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      color: 'var(--fg, #f5f0eb)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      minHeight: '52px',
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer style={{
          padding: '2rem 1.5rem',
          textAlign: 'center',
          marginTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <p style={{
            fontSize: '0.7rem',
            opacity: 0.3,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: 0,
          }}>
            Powered by Deep South Directory
          </p>
        </footer>
      </main>
    </>
  );
}
