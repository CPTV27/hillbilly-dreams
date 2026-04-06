import type { CSSProperties } from 'react';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: { default: 'DCTV — Hudson Valley Public Access', template: '%s | DCTV' },
  description:
    'Community television for the Hudson Valley. Coverage, workshops, and local stories — public access infrastructure for Woodstock and the Catskills.',
  metadataBase: new URL('https://dctvny.org'),
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#0c1220' }],
};

const shell: CSSProperties = {
  minHeight: '100dvh',
  background: 'var(--dctv-bg, #0c1220)',
  color: 'var(--dctv-fg, #e2e8f0)',
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
};

export default function DctvLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-dctv" style={shell}>
      <a
        href="#main"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
        }}
      >
        Skip to content
      </a>
      <header
        style={{
          borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
          padding: '1rem clamp(1rem, 4vw, 2rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <a
          href="/dctv"
          style={{
            fontFamily: 'var(--font-display, var(--font-body))',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--dctv-accent, #38bdf8)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          DCTV
        </a>
        <nav style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <a href="/dctv#about" style={{ color: 'var(--dctv-muted, #94a3b8)', fontSize: '0.9rem', textDecoration: 'none' }}>
            About
          </a>
          <a href="/dctv#contact" style={{ color: 'var(--dctv-muted, #94a3b8)', fontSize: '0.9rem', textDecoration: 'none' }}>
            Contact
          </a>
        </nav>
      </header>
      {children}
    </div>
  );
}
