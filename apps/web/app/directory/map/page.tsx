import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const DirectoryMapClient = dynamic(() => import('./DirectoryMapClient'), { ssr: false });

export const metadata: Metadata = {
  title: 'Map',
  description: 'Browse Deep South Directory listings on a map — Natchez and the Mississippi region.',
};

export default function DirectoryMapPage() {
  return (
    <>
      <div
        style={{
          padding: '1.25rem 1.5rem 0',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <Link
          href="/directory"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--accent)',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '0.75rem',
          }}
        >
          ← List view
        </Link>
        <h1
          style={{
            fontFamily: 'var(--font-display), var(--font-body), serif',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text)',
            margin: '0 0 0.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          Directory map
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            lineHeight: 1.55,
            color: 'var(--text-muted)',
            margin: '0 0 1.25rem',
            maxWidth: '36rem',
          }}
        >
          Active listings with coordinates appear as pins. Open a pin to go to the business page.
        </p>
      </div>
      <DirectoryMapClient />
    </>
  );
}
