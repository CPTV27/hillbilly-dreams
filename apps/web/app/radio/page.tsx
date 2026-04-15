// apps/web/app/radio/page.tsx
// Big Muddy Radio — full-bleed library hero + player + recently played (mock)

import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchPhotoIndex } from '@/lib/photo-index';
import { RadioStreamPlayer } from './RadioStreamPlayer';

export const metadata: Metadata = {
  title: 'Listen Live',
  description:
    'Stream Big Muddy Radio live. Song info, listener count, and daily schedule from Natchez, Mississippi.',
};

const MOCK_RECENT = [
  { title: 'Station ID — Big Muddy Radio', artist: '—', ago: 'Just now' },
  { title: 'Hard Luck & Love', artist: 'The Delta Hymn', ago: '18 min ago' },
  { title: 'River Road', artist: 'Miriam James', ago: '34 min ago' },
  { title: 'Saturday Night Communion', artist: 'Al Green (tribute set)', ago: '52 min ago' },
  { title: 'Bluff City Breakdown', artist: 'The Alley Saints', ago: '1 hr ago' },
] as const;

export default async function RadioListenPage() {
  const library = await fetchPhotoIndex();
  const hero = library[0]?.urls.grid;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg, #0f0f0d)',
        color: 'var(--text, #e8e0d4)',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
      }}
    >
      <section
        style={{
          position: 'relative',
          minHeight: 'min(48vh, 520px)',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(160deg, color-mix(in srgb, var(--accent) 12%, var(--bg)) 0%, var(--bg) 100%)',
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, var(--bg, #0f0f0d) 0%, transparent 50%, color-mix(in srgb, var(--bg) 55%, transparent) 100%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(2rem, 6vw, 4rem)' }}>
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              margin: '0 0 0.75rem',
            }}
          >
            Live stream · Natchez
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(2rem, 6vw, 3.25rem)',
              fontWeight: 800,
              margin: '0 0 0.5rem',
              lineHeight: 1.1,
            }}
          >
            Big Muddy Radio
          </h1>
          <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--text-muted)', maxWidth: 520 }}>
            The voice of the Mississippi region — blues, soul, gospel, and the stories in between.
          </p>
        </div>
      </section>

      <div style={{ padding: '0 clamp(1rem, 4vw, 2rem) 1.5rem', maxWidth: 640, margin: '0 auto' }}>
        <RadioStreamPlayer />
      </div>

      <section
        style={{
          padding: '0 clamp(1rem, 4vw, 2rem) clamp(2.5rem, 6vw, 4rem)',
          maxWidth: 560,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            margin: '0 0 1rem',
          }}
        >
          Recently played
        </h2>
        <div
          style={{
            borderRadius: 10,
            border: '1px solid color-mix(in srgb, var(--text) 10%, transparent)',
            background: 'color-mix(in srgb, var(--surface) 50%, transparent)',
            overflow: 'hidden',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {MOCK_RECENT.map((row) => (
              <li
                key={row.title}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.15rem',
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid color-mix(in srgb, var(--text) 8%, transparent)',
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)' }}>{row.title}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {row.artist} · <span style={{ opacity: 0.85 }}>{row.ago}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p style={{ margin: '1.25rem 0 0', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Recently played list is a placeholder for AzuraCast history when wired.{' '}
          <Link href="/magazine" style={{ color: 'var(--accent)' }}>
            Magazine
          </Link>
          {' · '}
          <Link href="/touring" style={{ color: 'var(--accent)' }}>
            Touring
          </Link>
        </p>
      </section>
    </div>
  );
}
