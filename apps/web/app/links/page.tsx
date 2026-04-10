// apps/web/app/links/page.tsx
// bigmuddytouring.com/links — the HDI link tree.
// Single source of truth lives in apps/web/lib/hdi-links.ts
// To keep this page current, update that file. This page rebuilds automatically.

import type { Metadata } from 'next';
import { getVisibleLinkTree } from '@/lib/hdi-links';

export const metadata: Metadata = {
  title: 'Hillbilly Dreams — All Links',
  description:
    'Every link in the Big Muddy + Measurably Better Things ecosystem. Live radio, shows, magazine, records, directory, the book, the Inn, and everything in between.',
  openGraph: {
    title: 'Hillbilly Dreams — All Links',
    description: 'Every link in the Big Muddy ecosystem — radio, shows, magazine, records, directory, the book, the Inn.',
    url: 'https://bigmuddytouring.com/links',
    siteName: 'Hillbilly Dreams',
  },
  robots: { index: true, follow: true },
};

// Accent colors by section tone
const ACCENT_COLORS = {
  live: '#ff3b30',
  gold: '#c8943e',
  cream: '#e8e0d4',
} as const;

export default function LinksPage() {
  const sections = getVisibleLinkTree();

  return (
    <main
      style={{
        background: '#0a0a08',
        color: '#e8e0d4',
        minHeight: '100vh',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
        padding: '0 0 80px',
      }}
    >
      {/* HEADER */}
      <header
        style={{
          padding: 'clamp(48px, 10vw, 120px) clamp(24px, 5vw, 60px) clamp(32px, 6vw, 60px)',
          maxWidth: '760px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c8943e',
            margin: '0 0 20px',
          }}
        >
          Hillbilly Dreams Inc
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}
        >
          Everything,
          <br />
          one tap away.
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.6,
            color: '#9b9488',
            margin: 0,
          }}
        >
          Radio, shows, magazine, records, directory, the book, the Inn, and the platform that runs it all.
        </p>
      </header>

      {/* SECTIONS */}
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 40px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(40px, 6vw, 56px)',
        }}
      >
        {sections.map((section) => {
          const accentColor = ACCENT_COLORS[section.accent ?? 'cream'];
          const isLive = section.accent === 'live';

          return (
            <section key={section.id}>
              {/* Section header */}
              <div style={{ marginBottom: '20px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '4px',
                  }}
                >
                  {isLive && (
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'inline-block',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#ff3b30',
                        animation: 'hdi-live-pulse 2s infinite',
                      }}
                    />
                  )}
                  <h2
                    style={{
                      fontFamily: 'var(--font-display, Georgia, serif)',
                      fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      margin: 0,
                      color: isLive ? '#ff3b30' : '#e8e0d4',
                    }}
                  >
                    {section.title}
                  </h2>
                </div>
                {section.subtitle && (
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: '#6b635a',
                      margin: '0 0 0 ' + (isLive ? '20px' : '0'),
                      letterSpacing: '0.02em',
                    }}
                  >
                    {section.subtitle}
                  </p>
                )}
              </div>

              {/* Links */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {section.links.map((link) => {
                  const external = link.url.startsWith('http');
                  const targetProps = external
                    ? {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      }
                    : {};

                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      {...targetProps}
                      style={{
                        display: 'block',
                        padding: '18px 22px',
                        background: link.highlight
                          ? 'rgba(200, 148, 62, 0.08)'
                          : 'rgba(232, 224, 212, 0.03)',
                        border: link.highlight
                          ? `1.5px solid ${accentColor}`
                          : '1px solid rgba(232, 224, 212, 0.1)',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: '#e8e0d4',
                        transition: 'transform 150ms ease, background 150ms ease, border-color 150ms ease',
                        WebkitTapHighlightColor: 'rgba(200,148,62,0.2)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontFamily: 'var(--font-display, Georgia, serif)',
                              fontSize: 'clamp(1.05rem, 2.2vw, 1.2rem)',
                              fontWeight: 700,
                              color: link.highlight ? accentColor : '#e8e0d4',
                              lineHeight: 1.2,
                              marginBottom: link.note ? '4px' : 0,
                            }}
                          >
                            {link.label}
                            {link.localOnly && (
                              <span
                                style={{
                                  display: 'inline-block',
                                  marginLeft: '10px',
                                  padding: '2px 8px',
                                  fontSize: '0.55rem',
                                  fontWeight: 700,
                                  letterSpacing: '0.1em',
                                  textTransform: 'uppercase',
                                  color: '#9b9488',
                                  background: 'rgba(232, 224, 212, 0.08)',
                                  borderRadius: '4px',
                                  verticalAlign: 'middle',
                                  fontFamily: 'var(--font-body, system-ui, sans-serif)',
                                }}
                              >
                                LAN Only
                              </span>
                            )}
                          </div>
                          {link.note && (
                            <div
                              style={{
                                fontSize: '0.8rem',
                                color: '#6b635a',
                                lineHeight: 1.4,
                              }}
                            >
                              {link.note}
                            </div>
                          )}
                        </div>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={link.highlight ? accentColor : '#6b635a'}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ flexShrink: 0 }}
                          aria-hidden="true"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Footer */}
        <footer
          style={{
            marginTop: 'clamp(40px, 8vw, 80px)',
            padding: '40px 0 0',
            borderTop: '1px solid rgba(200, 148, 62, 0.1)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#4a4440',
              margin: '0 0 8px',
            }}
          >
            Natchez, Mississippi
          </p>
          <p
            style={{
              fontSize: '0.85rem',
              color: '#6b635a',
              margin: 0,
            }}
          >
            Built by <a href="https://outsidereconomics.com/about" style={{ color: '#c8943e', textDecoration: 'none' }}>Chase Pierson</a>.
            Updated {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes hdi-live-pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.8); }
          70% { box-shadow: 0 0 0 10px rgba(255, 59, 48, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 59, 48, 0); }
        }

        a:hover {
          transform: translateY(-1px);
        }

        @media (hover: none) {
          a:hover {
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}
