import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: { default: 'Arrie Aslin', template: '%s · Arrie Aslin' },
  description:
    'Arrie Aslin sings out of Natchez, Mississippi. Artist-in-residence at the Blues Room at Big Muddy Inn, signed to Big Muddy Records.',
  openGraph: {
    title: 'Arrie Aslin',
    description:
      'Singer · Natchez · Big Muddy Records. Artist-in-residence at the Blues Room at Big Muddy Inn.',
    siteName: 'Arrie Aslin',
    type: 'website',
  },
};

const NAV = [
  { href: '/arrie-aslin', label: 'Home' },
  { href: '/arrie-aslin/music', label: 'Music' },
  { href: '/arrie-aslin/shows', label: 'Shows' },
  { href: '/arrie-aslin/about', label: 'About' },
  { href: '/arrie-aslin/press', label: 'Press' },
  { href: '/arrie-aslin/contact', label: 'Contact' },
];

export default function ArrieAslinLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="theme-arrie-aslin"
      style={{
        // Per docs/brands/brand-guidelines/arrie-aslin-brand-guidelines-2026-04-21.md
        ['--bg' as string]: '#1A1A3E',
        ['--bg-alt' as string]: '#0A0D12',
        ['--text' as string]: '#F1F0EC',
        ['--text-muted' as string]: 'rgba(241, 240, 236, 0.72)',
        ['--accent' as string]: '#994878',
        ['--accent-warm' as string]: '#C8852A',
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
        minHeight: '100vh',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(241, 240, 236, 0.08)',
        }}
      >
        <Link
          href="/arrie-aslin"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          Arrie Aslin
        </Link>
        <nav style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap' }}>
          {NAV.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
      <footer
        style={{
          padding: '3rem 2rem 2rem',
          borderTop: '1px solid rgba(241, 240, 236, 0.08)',
          marginTop: '6rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div>Natchez · Memphis · Clarksdale · New Orleans</div>
        <div>
          Big Muddy Records · Booking:{' '}
          <a
            href="mailto:booking@arrieaslin.com"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            booking@arrieaslin.com
          </a>
        </div>
        <div style={{ opacity: 0.6, marginTop: '0.5rem' }}>
          Powered by Measurably Better Things
        </div>
      </footer>
    </div>
  );
}
