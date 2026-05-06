import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Arrie Aslin — Singer · Natchez · Big Muddy Records',
  description:
    "Arrie Aslin sings out of Natchez. Artist-in-residence at the Blues Room at Big Muddy Inn. Southern soul-blues from the Mississippi corridor.",
};

const HERO_IMAGE = '/images/processed/arrie-aslin-inn-portrait.webp';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'Arrie Aslin',
  url: 'https://arrieaslin.com',
  genre: 'Southern soul-blues',
  foundingLocation: { '@type': 'Place', name: 'Natchez, Mississippi' },
  recordLabel: { '@type': 'Organization', name: 'Big Muddy Records' },
};

export default function ArrieAslinHome() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      <section
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Arrie Aslin performing at the Big Muddy Inn, Natchez"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(26, 26, 62, 0.35) 0%, rgba(26, 26, 62, 0.85) 80%, rgba(10, 13, 18, 0.95) 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            padding: '4rem 2rem',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 9vw, 6rem)',
              lineHeight: 1.05,
              margin: '0 0 1rem',
              letterSpacing: '0.01em',
            }}
          >
            Arrie Aslin
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              margin: '0 0 2rem',
            }}
          >
            Singer · Natchez · Big Muddy Records
          </p>
          <p
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.7,
              maxWidth: '38rem',
              marginBottom: '2.5rem',
            }}
          >
            Southern soul-blues from the Mississippi corridor. Artist-in-residence at the Blues
            Room at the Big Muddy Inn. Three nights a week, plus a weekly hour on Big Muddy Radio.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/arrie-aslin/shows"
              style={{
                padding: '0.9rem 2rem',
                background: 'var(--accent)',
                color: 'var(--text)',
                borderRadius: 2,
                textDecoration: 'none',
                fontSize: '0.85rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              See the dates
            </Link>
            <Link
              href="/arrie-aslin/music"
              style={{
                padding: '0.9rem 2rem',
                border: '1px solid var(--text)',
                color: 'var(--text)',
                borderRadius: 2,
                textDecoration: 'none',
                fontSize: '0.85rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              Listen
            </Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 2rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            lineHeight: 1.4,
            color: 'var(--text)',
          }}
        >
          The South already taught the world how to sing about the river.
          My job is to keep singing about the people who still live on it.
        </p>
        <p
          style={{
            marginTop: '1.5rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontSize: '0.8rem',
          }}
        >
          — Arrie Aslin
        </p>
      </section>
    </main>
  );
}
