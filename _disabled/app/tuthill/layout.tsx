// apps/web/app/tuthill/layout.tsx
// Tuthill Design — design services tenant layout

import type { Metadata, Viewport } from 'next';
import { Footer } from '@bigmuddy/ui';

export const metadata: Metadata = {
  title: {
    default: 'Tuthill Design | Creative Services',
    template: '%s | Tuthill Design',
  },
  description:
    'Branding, web design, and creative direction. Part of the Big Muddy media ecosystem in Natchez, Mississippi.',
  metadataBase: new URL('https://tuthilldesign.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Tuthill Design',
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

export default function TuthillLayout({
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
          href="/tuthill"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 800,
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: 'var(--tracking-tight)',
          }}
        >
          Tuthill <span style={{ color: 'var(--accent)' }}>Design</span>
        </a>
        <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
          <a href="/tuthill#services" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textDecoration: 'none' }}>Services</a>
          <a href="/tuthill#work" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textDecoration: 'none' }}>Work</a>
          <a href="/tuthill#contact" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textDecoration: 'none' }}>Contact</a>
          <a href="mailto:design@tuthilldesign.com" className="btn btn--primary" style={{ fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-5)' }}>Start a Project</a>
        </div>
      </nav>
      <main style={{ paddingTop: '64px' }}>{children}</main>
      <Footer brand="touring" />
    </div>
  );
}
