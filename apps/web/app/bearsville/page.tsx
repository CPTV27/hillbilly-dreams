// apps/web/app/bearsville/page.tsx
// Bearsville Creative — bearsvillemediagroup.com (middleware → /bearsville)

import type { Metadata } from 'next';
import { fetchPhotoIndex, formatPhotoCityLabel } from '@/lib/photo-index';

export const metadata: Metadata = {
  title: 'Bearsville Creative — Hudson Valley media node',
  description:
    'Woodstock and Catskills corridor — studio, magazine, and regional story. Summer 2026 activation.',
};

function isBearsvilleCity(citySlug: string): boolean {
  const c = citySlug.toLowerCase();
  return c.includes('woodstock') || c.includes('catskill') || c.includes('studio-c');
}

export default async function BearsvillePage() {
  const regionPhotos = await fetchPhotoIndex({ region: 'bearsville' });
  const featured = regionPhotos.filter((p) => isBearsvilleCity(p.city));
  const display = featured.length > 0 ? featured : regionPhotos;
  const hero = display[0];

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg, #0c0c0b)',
        color: 'var(--text, #e8e4dc)',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
      }}
    >
      <section
        style={{
          position: 'relative',
          minHeight: 'min(92vh, 900px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(2rem, 6vw, 5rem)',
          overflow: 'hidden',
        }}
      >
        {hero ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.urls.grid}
              alt={hero.caption || 'Bearsville region photography'}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.55,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, var(--bg, #0c0c0b) 0%, transparent 55%, rgba(12,12,11,0.5) 100%)',
              }}
            />
          </>
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, #1a1a24 0%, #0c0c12 40%, #121a16 100%)',
            }}
          />
        )}

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px' }}>
          <p
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--accent, #5eead4)',
              margin: '0 0 1rem',
            }}
          >
            Hudson Valley · Catskills corridor
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(2.25rem, 6vw, 3.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              margin: '0 0 1rem',
            }}
          >
            Bearsville Creative
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              lineHeight: 1.65,
              color: 'var(--text-muted, rgba(232,228,220,0.72))',
              margin: '0 0 1.5rem',
              maxWidth: '540px',
            }}
          >
            Studio, magazine, and regional story — the northeast node of the same sovereign media
            stack that runs the Mississippi corridor. Woodstock and Catskills photography from the
            Big Muddy library when available.
          </p>
          {hero ? (
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted, #888)', margin: 0 }}>
              {hero.caption || formatPhotoCityLabel(hero.city)}
              {hero.credit ? ` · ${hero.credit}` : ''}
            </p>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #888)', margin: 0 }}>
              Regional hero photography will appear here as Bearsville shoots land in the library.
            </p>
          )}
        </div>
      </section>

      {display.length === 0 ? (
        <section
          style={{
            padding: 'clamp(2rem, 5vw, 4rem)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              maxWidth: 540,
              margin: '0 auto',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              borderRadius: 12,
              border: '1px dashed var(--accent, rgba(94,234,212,0.35))',
              background: 'var(--surface, rgba(255,255,255,0.02))',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display, Georgia, serif)',
                fontSize: '1.05rem',
                color: 'var(--accent, #5eead4)',
                margin: '0 0 0.5rem',
                letterSpacing: '0.04em',
              }}
            >
              Bearsville coverage coming summer 2026
            </p>
            <p
              style={{
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'var(--text-muted, rgba(232,228,220,0.65))',
                margin: 0,
              }}
            >
              Hudson Valley and Catskills photography lands in the library as the northeast node
              activates. Until then, this room is reserved.
            </p>
          </div>
        </section>
      ) : null}

      {display.length > 1 ? (
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: '1rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted, #999)',
              margin: '0 0 1.25rem',
            }}
          >
            {featured.length > 0 ? 'Woodstock & Catskills' : 'Bearsville library'}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))',
              gap: '10px',
            }}
          >
            {display.slice(1, 7).map((p) => (
              <figure key={p.hash} style={{ margin: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.urls.grid}
                  alt={p.caption || p.shoot}
                  loading="lazy"
                  style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    display: 'block',
                  }}
                />
                <figcaption
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted, #aaa)',
                    marginTop: '0.35rem',
                  }}
                >
                  {formatPhotoCityLabel(p.city)}
                  {p.credit ? ` · ${p.credit}` : ''}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <footer
        style={{
          padding: '2.5rem clamp(1.25rem, 4vw, 3rem)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: '0.72rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-muted, #666)',
          textAlign: 'center',
        }}
      >
        Bearsville Creative · Woodstock, New York
      </footer>
    </main>
  );
}
