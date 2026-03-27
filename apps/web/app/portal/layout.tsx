// apps/web/app/portal/layout.tsx
// Client portal layout — clean, simple, read-only dashboard for media clients

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Client Portal — Big Muddy Entertainment',
    template: '%s — Big Muddy Entertainment Portal',
  },
  description: 'Your Big Muddy Entertainment client dashboard',
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="portal-shell">
      <header className="portal-header">
        <div className="portal-header__inner">
          <a href="/portal" className="portal-logo">
            <span className="portal-logo__name">Big Muddy</span>
            <span className="portal-logo__sub">MEDIA</span>
          </a>
          <nav className="portal-nav" aria-label="Portal navigation">
            <a href="/portal" className="portal-nav-link">Dashboard</a>
            <a href="/portal/calendar" className="portal-nav-link">Calendar</a>
            <a href="/portal/reviews" className="portal-nav-link">Reviews</a>
            <a href="/portal/reports" className="portal-nav-link">Reports</a>
          </nav>
        </div>
      </header>
      <main className="portal-main" id="main-content">
        {children}
      </main>
      <footer className="portal-footer">
        <p>Big Muddy Entertainment &mdash; Media services for the Mississippi corridor</p>
      </footer>
      <style>{`
        .portal-shell {
          min-height: 100vh;
          background: var(--bg, #faf9f6);
          font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
          display: flex;
          flex-direction: column;
        }
        .portal-header {
          background: var(--surface, #fff);
          border-bottom: 1px solid var(--border, #e5e2dc);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .portal-header__inner {
          max-width: 960px;
          margin: 0 auto;
          padding: var(--space-4, 16px) var(--space-6, 24px);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .portal-logo {
          display: flex;
          align-items: baseline;
          gap: var(--space-2, 8px);
          text-decoration: none;
          color: var(--text, #2a2520);
        }
        .portal-logo__name {
          font-size: var(--text-lg, 18px);
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .portal-logo__sub {
          font-size: var(--text-xs, 12px);
          font-weight: 600;
          color: var(--accent, #c8553d);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .portal-nav {
          display: flex;
          gap: var(--space-1, 4px);
        }
        .portal-nav-link {
          padding: var(--space-2, 8px) var(--space-3, 12px);
          font-size: var(--text-sm, 14px);
          font-weight: 500;
          color: var(--text-muted, #8a8074);
          text-decoration: none;
          border-radius: var(--radius-sm, 4px);
          transition: all 0.15s ease;
        }
        .portal-nav-link:hover {
          background: var(--surface-2, #f0ede8);
          color: var(--text, #2a2520);
        }
        .portal-main {
          flex: 1;
          max-width: 960px;
          width: 100%;
          margin: 0 auto;
          padding: var(--space-8, 32px) var(--space-6, 24px);
        }
        .portal-footer {
          border-top: 1px solid var(--border, #e5e2dc);
          text-align: center;
          padding: var(--space-6, 24px);
          color: var(--text-disabled, #b8b0a4);
          font-size: var(--text-xs, 12px);
        }
        .portal-footer p { margin: 0; }
        @media (max-width: 640px) {
          .portal-header__inner {
            flex-direction: column;
            gap: var(--space-3, 12px);
            align-items: flex-start;
          }
          .portal-nav {
            overflow-x: auto;
            width: 100%;
            padding-bottom: 2px;
          }
          .portal-main {
            padding: var(--space-6, 24px) var(--space-4, 16px);
          }
        }
      `}</style>
    </div>
  );
}
