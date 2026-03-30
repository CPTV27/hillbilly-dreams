// apps/web/app/measurably-better/life/layout.tsx
// MBT Life — mobile-first layout with bottom navigation

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Measurably Better Life',
  description: 'Your community is the asset. Organization is the value multiplier. This app shows you how.',
  openGraph: {
    title: 'Measurably Better Life',
    description: 'Your community is the asset. Organization is the value multiplier.',
    url: 'https://measurablybetter.life',
    siteName: 'Measurably Better',
  },
};

const NAV_ITEMS = [
  { href: '/life', label: 'Home', icon: 'H' },
  { href: '/life/board', label: 'Board', icon: 'B' },
  { href: '/life/chat', label: 'Ask', icon: '?' },
  { href: '/life/directory', label: 'Local', icon: 'D' },
  { href: '/life/profile', label: 'You', icon: 'U' },
];

export default function LifeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="life-app">
        {/* Top bar */}
        <header className="life-header">
          <a href="/life" className="life-header__logo">
            <span className="life-header__name">measurably better</span>
            <span className="life-header__tag">life</span>
          </a>
        </header>

        {/* Page content */}
        <main className="life-main">
          {children}
        </main>

        {/* Bottom nav */}
        <nav className="life-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="life-nav__item">
              <span className="life-nav__icon">{item.icon}</span>
              <span className="life-nav__label">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <style>{`
        .life-app {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          min-height: 100dvh;
          background: var(--bg, #0f0f0d);
          color: var(--text, #e8e0d4);
        }

        /* ── Header ── */
        .life-header {
          position: sticky;
          top: 0;
          z-index: 50;
          padding: 12px 16px;
          background: rgba(15, 15, 13, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border, #2a2520);
        }
        .life-header__logo {
          display: flex;
          align-items: baseline;
          gap: 6px;
          text-decoration: none;
        }
        .life-header__name {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text, #e8e0d4);
          letter-spacing: -0.01em;
        }
        .life-header__tag {
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--accent, #c8943e);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* ── Main ── */
        .life-main {
          flex: 1;
          padding: 16px;
          padding-bottom: 80px;
          max-width: 600px;
          width: 100%;
          margin: 0 auto;
        }

        /* ── Bottom Nav ── */
        .life-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          display: flex;
          justify-content: space-around;
          background: rgba(15, 15, 13, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid var(--border, #2a2520);
          padding: 8px 0;
          padding-bottom: max(8px, env(safe-area-inset-bottom));
        }
        .life-nav__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          text-decoration: none;
          padding: 4px 12px;
          border-radius: 8px;
          transition: background 0.15s;
        }
        .life-nav__item:hover,
        .life-nav__item:active {
          background: rgba(200, 148, 62, 0.08);
        }
        .life-nav__icon {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-muted, #8a8074);
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: var(--surface, #1a1816);
        }
        .life-nav__label {
          font-size: 0.6rem;
          font-weight: 600;
          color: var(--text-muted, #8a8074);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        @media (min-width: 768px) {
          .life-main {
            max-width: 640px;
            padding: 24px;
            padding-bottom: 100px;
          }
        }
      `}</style>
    </>
  );
}
