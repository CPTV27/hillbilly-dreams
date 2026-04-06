// apps/web/app/studio/layout.tsx
// Studio C Video — production studio tenant layout

import type { Metadata, Viewport } from 'next';
import { Footer } from '@bigmuddy/ui';

export const metadata: Metadata = {
  title: {
    default: 'Studio C Video | Live Production & Streaming from Natchez',
    template: '%s | Studio C Video',
  },
  description:
    'Multi-camera live production, streaming, and video content from Studio C at The Big Muddy Inn in Natchez, Mississippi. ATEM switching, Hollyland wireless, and a Steinway grand.',
  metadataBase: new URL('https://studiocvideo.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Studio C Video',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0d' },
    { media: '(prefers-color-scheme: light)', color: '#0f0f0d' },
  ],
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-touring">
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(15, 15, 13, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          padding: 'var(--space-4) var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a
          href="/studioc"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 800,
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: 'var(--tracking-tight)',
          }}
        >
          Studio <span style={{ color: 'var(--accent)' }}>C</span>
        </a>
        <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
          <a href="/studioc#capabilities" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textDecoration: 'none' }}>Capabilities</a>
          <a href="/studioc#packages" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textDecoration: 'none' }}>Packages</a>
          <a href="/studioc/catalog" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textDecoration: 'none' }}>Catalog</a>
          <a href="/studioc/about" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textDecoration: 'none' }}>About</a>
          <a href="/studioc#gear" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textDecoration: 'none' }}>Gear</a>
          <a href="mailto:studio@thebigmuddyinn.com" className="btn btn--primary" style={{ fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-5)' }}>Book Studio</a>
        </div>
      </nav>
      <main style={{ paddingTop: '64px' }}>{children}</main>
      <Footer brand="touring" />
    </div>
  );
}
