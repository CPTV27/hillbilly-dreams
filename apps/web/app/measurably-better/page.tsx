import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PoweredByFooter } from '@/components/PoweredByFooter';

export const metadata: Metadata = {
  title: 'Measurably Better — Your guide to the Deep South',
  description:
    'A warm, local-first companion for travelers and neighbors — restaurants, music, lodging, and the stories behind them. From free to $99/mo.',
};

const HERO =
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/mississippi-river.webp';

export default function MeasurablyBetterHomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <section
        style={{
          position: 'relative',
          minHeight: '78vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(2rem, 6vw, 4rem)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src={HERO}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, color-mix(in srgb, var(--bg) 92%, transparent) 0%, color-mix(in srgb, var(--bg) 35%, transparent) 45%, transparent 100%)',
            }}
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640 }}>
          <p
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              margin: '0 0 1rem',
            }}
          >
            Measurably Better
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              margin: '0 0 1rem',
              letterSpacing: '-0.03em',
            }}
          >
            Your personal guide to the Deep South
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              lineHeight: 1.65,
              color: 'color-mix(in srgb, var(--text) 88%, transparent)',
              maxWidth: 520,
              margin: '0 0 1.75rem',
            }}
          >
            Meet Delta Dawn — your personal guide to the Deep South. Ask where to eat, what&apos;s
            playing, and what&apos;s worth the drive. Plain answers, neighborly tone — the kind of
            help you&apos;d get at a front porch, not a call center.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <Link
              href="/dawn"
              style={{
                display: 'inline-block',
                padding: '0.85rem 1.75rem',
                background: 'var(--accent)',
                color: 'var(--bg)',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
                borderRadius: 8,
              }}
            >
              Try Delta Dawn
            </Link>
            <Link
              href="/technology"
              style={{
                display: 'inline-block',
                padding: '0.85rem 1.75rem',
                border: '1px solid color-mix(in srgb, var(--text) 35%, transparent)',
                color: 'var(--text)',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                borderRadius: 8,
              }}
            >
              How the corridor fits together
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(2.5rem, 6vw, 4rem) 1.5rem', maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', margin: '0 0 1rem' }}>
          Simple plans
        </h2>
        <p style={{ color: 'color-mix(in srgb, var(--text) 75%, transparent)', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
          Start free. Add more help when you want it — up to $99/mo for the fullest experience. Pick
          what matches how often you&apos;re on the road or hosting guests.
        </p>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: '0.75rem',
            fontSize: '0.95rem',
            lineHeight: 1.55,
          }}
        >
          <li style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1rem' }}>
            <strong>$0</strong> — ask questions and save what you learn.
          </li>
          <li style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1rem' }}>
            <strong>$25–$50/mo</strong> — more context and follow-up for regular travelers.
          </li>
          <li style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1rem' }}>
            <strong>$99/mo</strong> — the fullest concierge rhythm if you live on the corridor.
          </li>
        </ul>
      </section>

      <PoweredByFooter />
    </main>
  );
}
