// apps/web/app/records/layout.tsx
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: {
    default: 'Big Muddy Records — Music from the Mississippi Corridor',
    template: '%s | Big Muddy Records',
  },
  description:
    'Independent record label capturing the sound of the Mississippi music corridor — blues, soul, gospel, and the voices that carry the river.',
  metadataBase: new URL('https://bigmuddyrecords.net'),
  openGraph: {
    title: 'Big Muddy Records',
    description: 'Music from the Mississippi corridor. Memphis to New Orleans.',
    siteName: 'Big Muddy Records',
  },
};

export default function RecordsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="records">
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'var(--bg, #0a0a0a)',
          borderBottom: '1px solid var(--muted, #333)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a
            href="/records"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--fg, #f5f0eb)',
                letterSpacing: '-0.02em',
              }}
            >
              Big Muddy
            </span>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--accent, #c8943e)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Records
            </span>
          </a>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {[
              { label: 'Artists', href: '/records/artists' },
              { label: 'Releases', href: '/records/releases' },
              { label: 'Sessions', href: '/records/sessions' },
              { label: 'Radio', href: 'https://bigmuddyradio.com' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: 'var(--fg, #f5f0eb)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  letterSpacing: '0.04em',
                  opacity: 0.8,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
      {children}
      <footer
        style={{
          borderTop: '1px solid var(--muted, #333)',
          padding: '3rem 1.5rem',
          textAlign: 'center',
          color: 'var(--fg, #f5f0eb)',
          opacity: 0.5,
          fontSize: '0.8rem',
        }}
      >
        <p>&copy; {new Date().getFullYear()} Big Muddy Records. Natchez, Mississippi.</p>
        <p style={{ marginTop: '0.5rem' }}>
          A Big Muddy Records label. Also:{' '}
          <a href="https://bigmuddyradio.com" style={{ color: 'var(--accent, #c8943e)' }}>Radio</a>
          {' \u00B7 '}
          <a href="https://bigmuddymagazine.com" style={{ color: 'var(--accent, #c8943e)' }}>Magazine</a>
          {' \u00B7 '}
          <a href="https://buycuriousart.com" style={{ color: 'var(--accent, #c8943e)' }}>BuyCurious Art</a>
        </p>
      </footer>
    </ThemeProvider>
  );
}
