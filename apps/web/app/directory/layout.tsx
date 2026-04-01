// apps/web/app/directory/layout.tsx
// Deep South Directory — branded shell for deepsouthdirectory.com
// Light theme (cream bg, storefront brick accent) — theme-dsd tokens

import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Deep South Directory — Local Business Marketing',
    template: '%s | Deep South Directory',
  },
  description:
    'The regional business network for the Mississippi Corridor. Find locals. Get found. Keep your money in the region.',
  metadataBase: new URL('https://deepsouthdirectory.com'),
};

export const viewport: Viewport = {
  themeColor: '#C45B28',
};

export default function DirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-dsd" style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      {/* Minimal header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <a href="/directory" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
          }}>
            Deep South Directory
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Mississippi Corridor
          </span>
        </a>
        <a href="/directory/onboard" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--bg)',
          background: 'var(--accent)',
          padding: '0.5rem 1rem',
          borderRadius: 6,
          textDecoration: 'none',
          letterSpacing: '0.04em',
        }}>
          Get Listed
        </a>
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        background: 'var(--surface)',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          margin: '0 0 0.4rem',
        }}>
          Part of the Big Muddy ecosystem &middot;{' '}
          <a href="https://hillbillydreamsinc.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            Hillbilly Dreams Inc
          </a>
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          margin: 0,
          opacity: 0.7,
        }}>
          listings@hillbillydreamsinc.com
        </p>
      </footer>
    </div>
  );
}
