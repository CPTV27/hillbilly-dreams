import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PoweredByFooter } from '@/components/PoweredByFooter';

export const metadata: Metadata = {
  title: 'How the corridor works — Measurably Better',
  description:
    'Shows, hospitality, magazine, radio, and the Deep South Directory — one loop that keeps visitors and dollars close to home.',
};

const IMG =
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp';

export default function CorridorConnectionPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <section style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem', maxWidth: 820, margin: '0 auto' }}>
        <p
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            margin: '0 0 1rem',
          }}
        >
          The corridor
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            margin: '0 0 1.25rem',
            letterSpacing: '-0.03em',
          }}
        >
          How the corridor works
        </h1>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'color-mix(in srgb, var(--text) 82%, transparent)', margin: '0 0 2rem' }}>
          Media, hospitality, and the directory aren&apos;t separate products. They&apos;re one loop:
          a show fills a room, the room feeds a story, the story sends a traveler to a listing, and the
          listing sends another night of music.
        </p>

        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/10',
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: '2rem',
            border: '1px solid color-mix(in srgb, var(--text) 12%, transparent)',
          }}
        >
          <Image src={IMG} alt="Live music in a Mississippi listening room" fill sizes="(max-width:900px) 100vw, 820px" style={{ objectFit: 'cover' }} />
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: '0 0 0.75rem' }}>
          A night on the river
        </h2>
        <p style={{ lineHeight: 1.8, color: 'color-mix(in srgb, var(--text) 85%, transparent)', margin: '0 0 1.25rem' }}>
          A band plays at Biscuits &amp; Blues. We write about it in the magazine. The radio airs the
          set. The directory lists the venue so travelers know where to land. The inn gets the late
          reservation. Same week, same town — not five vendors, one circle.
        </p>

        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderRadius: 10,
            background: 'color-mix(in srgb, var(--accent) 8%, transparent)',
            border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
            marginBottom: '2rem',
            lineHeight: 1.75,
            fontSize: '0.98rem',
          }}
        >
          <strong style={{ color: 'var(--accent)' }}>The loop:</strong> Shows → Magazine → Radio →
          Directory → Businesses → Shows. Break any link and the night still happens — but the town
          keeps less of the ticket.
        </div>

        <p style={{ lineHeight: 1.75, margin: '0 0 1.5rem' }}>
          This is how we run it in Natchez. The same rhythm scales to other towns when they want the
          whole loop, not a single billboard.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link
            href="https://deepsouthdirectory.com"
            style={{
              color: 'var(--accent)',
              fontWeight: 600,
            }}
          >
            Deep South Directory
          </Link>
          <span style={{ color: 'var(--text-muted)' }}>·</span>
          <Link href="https://bigmuddytouring.com/magazine" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            Magazine
          </Link>
          <span style={{ color: 'var(--text-muted)' }}>·</span>
          <Link href="https://bigmuddytouring.com/radio" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            Radio
          </Link>
          <span style={{ color: 'var(--text-muted)' }}>·</span>
          <Link href="https://bigmuddytouring.com/touring" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            Touring
          </Link>
        </div>
      </section>

      <PoweredByFooter />
    </main>
  );
}
