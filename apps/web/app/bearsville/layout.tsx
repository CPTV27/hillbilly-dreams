// apps/web/app/bearsville/layout.tsx
// Bearsville Creative — branded shell for bearsvillecreative.com
// Dark warm base, antique gold accent — theme-bearsville tokens

import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Bearsville Creative — Hudson Valley / Catskills',
    template: '%s | Bearsville Creative',
  },
  description:
    'The Northeast media imprint documenting music, land, and independent culture in the Hudson Valley — and connecting it south through the Big Muddy corridor.',
  metadataBase: new URL('https://bearsvillecreative.com'),
};

export const viewport: Viewport = {
  themeColor: '#8B6914',
};

export default function BearsvilleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-bearsville" style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      {/* Minimal header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <a href="/bearsville" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
          }}>
            Bearsville Creative
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Hudson Valley &middot; Catskills
          </span>
        </a>
        <a href="mailto:hello@bearsvillecreative.com?subject=Inquiry" style={{
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
          Get in Touch
        </a>
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem 1.5rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          margin: '0 0 0.4rem',
        }}>
          Bearsville Creative LLC &middot; Woodstock, NY
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          margin: 0,
          opacity: 0.7,
        }}>
          Part of the{' '}
          <a href="https://bigmuddytouring.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            Big Muddy region
          </a>
          {' '}&middot;{' '}
          <a href="https://hillbillydreamsinc.com" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            Hillbilly Dreams Inc
          </a>
        </p>
      </footer>
    </div>
  );
}
