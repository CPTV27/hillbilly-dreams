import React from 'react';
import Link from 'next/link';
import { DEMO_ARTISTS } from '../demo-data';

export default function ArtistStorefrontLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { artistSlug: string };
}) {
  const artist = DEMO_ARTISTS.find((a) => a.slug === params.artistSlug);
  const displayName = artist?.name || params.artistSlug.replace(/-/g, ' ');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#faf9f6' }}>
      <header style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid #eaeaea',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            href="/gallery"
            style={{ fontSize: '0.75rem', color: '#999', textDecoration: 'none', fontWeight: 600 }}
          >
            &larr; Gallery
          </Link>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>
            {displayName}
          </h1>
        </div>
        {artist && (
          <span style={{ fontSize: '0.7rem', color: '#b8963e', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {artist.medium}
          </span>
        )}
      </header>

      <main style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
        {children}
      </main>

      <footer style={{
        padding: '2rem',
        borderTop: '1px solid #eaeaea',
        textAlign: 'center',
        fontSize: '0.75rem',
        color: '#999',
      }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} {displayName} &middot; Powered by{' '}
          <Link href="/gallery" style={{ color: '#b8963e', textDecoration: 'none' }}>BuyCurious Art</Link>
        </p>
      </footer>
    </div>
  );
}
