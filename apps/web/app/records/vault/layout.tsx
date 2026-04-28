// apps/web/app/records/vault/layout.tsx
// ─────────────────────────────────────────────────────────────
// MELODY VAULT — Internal Layout
// ─────────────────────────────────────────────────────────────
// Internal control-panel surface for label staff and artists.
// Visually distinct from the public records site: denser, tool-like,
// professional. Uses the same CSS custom properties as the public
// shell so it inherits the brand theme.
//
// DEMO MODE: This layout does not currently enforce auth — the page
// is publicly reachable for tonight's walkthrough. Real next-auth
// gating goes in alongside the production label-staff role mapping.
// See TODO marker in this file.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Melody Vault — Big Muddy Records',
  description:
    'Internal control panels for the Big Muddy Records roster — strategy, marketing calendar, EPK, and capability roadmap.',
  robots: { index: false, follow: false },
};

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO(auth): wrap in next-auth session check + role gate (staff | artist).
  //   For tonight's demo we render the panel directly. Existing /admin layout
  //   pattern (see app/admin) is the reference once we wire it up.
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg, #0a0a0a)',
        color: 'var(--fg, #f5f0eb)',
      }}
    >
      <div
        style={{
          background:
            'linear-gradient(180deg, rgba(200,148,62,0.08) 0%, rgba(200,148,62,0) 100%)',
          borderBottom: '1px solid var(--muted, #333)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'var(--accent, #c8943e)',
                fontWeight: 700,
              }}
            >
              Melody Vault
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                opacity: 0.5,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Internal · Big Muddy Records
            </span>
          </div>
          <nav style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            {[
              { label: 'Overview', href: '/records/vault' },
              { label: 'Roster', href: '/records/vault#roster' },
              { label: 'Calendar', href: '/records/vault#calendar' },
              { label: 'Capabilities', href: '/records/vault#capabilities' },
              { label: 'Onboarding', href: '/records/vault/onboarding' },
              { label: '← Public Site', href: '/records' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: 'var(--fg, #f5f0eb)',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  letterSpacing: '0.04em',
                  opacity: 0.85,
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 1.5rem 0.75rem',
            fontSize: '0.7rem',
            opacity: 0.45,
            letterSpacing: '0.06em',
          }}
        >
          Demo session · auth gate pending · no production data is shown
        </div>
      </div>
      {children}
    </div>
  );
}
