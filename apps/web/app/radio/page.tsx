// apps/web/app/radio/page.tsx
// Big Muddy Radio — full-bleed library hero + live stream + show links

import type { Metadata } from 'next';
import { fetchPhotoIndex } from '@/lib/photo-index';
import { RadioStreamPlayer } from './RadioStreamPlayer';

export const metadata: Metadata = {
  title: 'Listen Live',
  description:
    'Stream Big Muddy Radio live. Song info, listener count, and daily schedule from Natchez, Mississippi.',
};

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
          What's On
        </h2>
        <div
          style={{
            borderRadius: 10,
            border: '1px solid color-mix(in srgb, var(--text) 10%, transparent)',
            background: 'color-mix(in srgb, var(--surface) 50%, transparent)',
            padding: '1rem 1rem 1.15rem',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6 }}>
            Blues Room sessions every Friday. Open mic. Guest DJs. The corridor&apos;s best, live
            from Natchez.
          </p>
          <a
            href="/radio/shows"
            style={{
              display: 'inline-block',
              marginTop: '0.9rem',
              fontSize: '0.76rem',
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
              color: 'var(--accent)',
              borderBottom: '1px solid color-mix(in srgb, var(--accent) 55%, transparent)',
              paddingBottom: '0.15rem',
            }}
          >
            Shows & Sessions
          </a>
        </div>
      </section>
    </div>
  );
}
