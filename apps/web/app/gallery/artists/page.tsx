// apps/web/app/gallery/artists/page.tsx
// Venture Gallery — Artist Directory
// Server component with client filter pills.

import type { Metadata } from 'next';
import ArtistDirectory from './ArtistDirectory';

export const metadata: Metadata = {
  title: 'Artists | Venture Gallery',
  description:
    'Browse the artists behind Venture Gallery — painters, photographers, sculptors, and makers from Natchez, Clarksdale, New Orleans, Memphis, and the full Deep South.',
};

export default function ArtistsPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <header
        style={{
          background: 'var(--bg)',
          padding: 'clamp(4rem, 8vw, 7rem) 0 var(--space-12) 0',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="section-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 'var(--space-3)',
            }}
          >
            Venture Gallery
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-5xl)',
              fontWeight: 700,
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--text)',
              margin: '0 0 var(--space-4) 0',
            }}
          >
            The Artists
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--leading-normal)',
              color: 'var(--text-muted)',
              maxWidth: '540px',
              margin: 0,
            }}
          >
            Painters, photographers, sculptors, and makers. All of them from the Deep South. None of them easy to ignore.
          </p>
        </div>
      </header>

      {/* ── Directory (client component for filtering) ── */}
      <ArtistDirectory />
    </>
  );
}
