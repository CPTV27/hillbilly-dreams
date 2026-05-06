import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Arrie Aslin — singer based in Natchez, Mississippi, artist-in-residence at the Blues Room at Big Muddy Inn.',
};

const GALLERY = [
  'ta-c2-148-of-959.webp',
  'ta-c2-228-of-955.webp',
  'ta-c2-303-of-951.webp',
  'ta-c2-460-of-928.webp',
  'ta-c2-510-of-920.webp',
  'ta-c2-562-of-912.webp',
];

export default function AboutPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '5rem 2rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          margin: '0 0 2rem',
        }}
      >
        About
      </h1>

      <div style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '4rem' }}>
        <p style={{ marginBottom: '1.5rem' }}>
          Arrie Aslin is a singer based in Natchez, Mississippi, working at the seam between
          Southern soul, blues, and the Americana songwriter tradition. Her band — upright bass,
          Wurlitzer, brushed drums, restrained guitar — backs original material about staying put,
          alongside reworked standards drawn from the corridor running Memphis to Clarksdale to
          New Orleans.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          She holds the artist-in-residence chair at the Blues Room at Big Muddy Inn, plays a
          weekly hour on Big Muddy Radio, and tours the regional Snowbird Circuit each winter. Her
          records ship on Big Muddy Records.
        </p>
        <p>
          The work is hospitality-shaped: songs you can hear from the bar without having to lean
          in, sung in a room that smells like cornbread and bourbon.
        </p>
      </div>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {GALLERY.map((file) => (
          <div
            key={file}
            style={{
              position: 'relative',
              aspectRatio: '3 / 4',
              overflow: 'hidden',
              background: 'var(--bg-alt)',
            }}
          >
            <Image
              src={`/images/arrie-aslin/${file}`}
              alt="Arrie Aslin performing"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
