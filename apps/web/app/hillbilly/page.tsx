// apps/web/app/hillbilly/page.tsx
// Hillbilly Dreams Inc. — corporate home

import type { Metadata } from 'next';
import Image from 'next/image';
import { PoweredByFooter } from '@/components/PoweredByFooter';

export const metadata: Metadata = {
  title: 'Hillbilly Dreams Inc.',
  description:
    'A media company anchored in Natchez, Mississippi — shows, magazine, radio, and a directory that helps Main Street get found.',
};

const HERO_IMG =
  'https://storage.googleapis.com/bmt-media-bigmuddy/touring/touring-inn-dusk.webp';
const SECOND_IMG =
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/inn-foyer.webp';

const LINKS = [
  { label: 'Big Muddy Touring', href: 'https://bigmuddytouring.com/touring' },
  { label: 'Magazine', href: 'https://bigmuddytouring.com/magazine' },
  { label: 'Radio', href: 'https://bigmuddytouring.com/radio' },
  { label: 'Deep South Directory', href: 'https://deepsouthdirectory.com' },
];

export default function HillbillyDreamsPage() {
  return (
    <main
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        minHeight: '100vh',
        fontFamily: 'var(--font-body)',
      }}
    >
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(40px, 8vw, 100px)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src={HERO_IMG}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 55%' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, color-mix(in srgb, var(--bg) 95%, transparent) 0%, color-mix(in srgb, var(--bg) 45%, transparent) 50%, transparent 100%)',
            }}
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              margin: '0 0 1rem',
            }}
          >
            Natchez, Mississippi
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              margin: '0 0 1.25rem',
            }}
          >
            Hillbilly Dreams
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              lineHeight: 1.65,
              color: 'color-mix(in srgb, var(--text) 88%, transparent)',
              maxWidth: 560,
              margin: 0,
            }}
          >
            We&apos;re a media company anchored in Natchez. We run shows, publish a magazine, operate
            a radio station, and help Main Street businesses get found — the old-fashioned way, with
            stories and presence, not buzzwords.
          </p>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          padding: 'clamp(48px, 8vw, 100px) clamp(24px, 5vw, 80px)',
          borderTop: '1px solid color-mix(in srgb, var(--accent) 18%, transparent)',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: 8, overflow: 'hidden' }}>
          <Image src={SECOND_IMG} alt="Interior of the inn, warm light" fill sizes="(max-width:768px) 100vw, 400px" style={{ objectFit: 'cover' }} />
        </div>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: '0 0 1rem', lineHeight: 1.15 }}>
            Rooted in the river towns
          </h2>
          <p style={{ lineHeight: 1.75, color: 'color-mix(in srgb, var(--text) 78%, transparent)', margin: '0 0 1.25rem' }}>
            The work happens in listening rooms, print shops, and on porches — not in slide decks. We
            keep crews small, partners close, and the story honest.
          </p>
          <p style={{ lineHeight: 1.75, color: 'color-mix(in srgb, var(--text) 78%, transparent)', margin: 0 }}>
            We also tend a northeast outpost in Woodstock, New York — same ethic, different river.
          </p>
        </div>
      </section>

      <section
        style={{
          padding: 'clamp(40px, 7vw, 90px) clamp(24px, 5vw, 80px)',
          borderTop: '1px solid color-mix(in srgb, var(--accent) 12%, transparent)',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', margin: '0 0 1.5rem' }}>
          Big Muddy properties
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.25rem' }}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                color: 'var(--accent)',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                borderBottom: '1px solid color-mix(in srgb, var(--accent) 45%, transparent)',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: 'clamp(40px, 7vw, 90px) clamp(24px, 5vw, 80px)',
          borderTop: '1px solid color-mix(in srgb, var(--accent) 12%, transparent)',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', margin: '0 0 1.5rem' }}>
          People
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', margin: '0 0 0.35rem' }}>Chase Pierson</h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>
              Founder
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'color-mix(in srgb, var(--text) 72%, transparent)', margin: 0 }}>
              Photography, radio, and the through-line for the brands.
            </p>
          </div>
          <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', margin: '0 0 0.35rem' }}>Tracy Alderson-Allen</h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>
              Finance &amp; inn — equity partner
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'color-mix(in srgb, var(--text) 72%, transparent)', margin: 0 }}>
              Keeps the books and the guest experience straight.
            </p>
          </div>
          <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', margin: '0 0 0.35rem' }}>Amy Allen</h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>
              Inn &amp; bar — equity partner
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'color-mix(in srgb, var(--text) 72%, transparent)', margin: 0 }}>
              Runs the room and knows every regular by name.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: 'clamp(56px, 10vw, 120px) clamp(24px, 5vw, 80px)',
          textAlign: 'center',
          borderTop: '1px solid color-mix(in srgb, var(--accent) 12%, transparent)',
        }}
      >
        <p style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)', lineHeight: 1.55, fontFamily: 'var(--font-display)', margin: 0 }}>
          We build local. The value stays local. We grow from within.
        </p>
      </section>

      <PoweredByFooter />
    </main>
  );
}
