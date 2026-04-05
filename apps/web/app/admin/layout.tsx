// apps/web/app/(admin)/layout.tsx
// Admin layout — DM Sans only, sidebar nav, dark ops command center
// Protected by Google OAuth via NextAuth — only whitelisted emails can access.

import type { Metadata } from 'next';
import { auth, signOut } from '@/lib/auth';
import DeltaDawnFloat from './components/DeltaDawnFloat';
import { ReviewModeShell } from './components/ReviewModeShell';


export const metadata: Metadata = {
  title: {
    default: 'Big Muddy HQ',
    template: '%s — HQ',
  },
  description: 'Big Muddy Operations Center',
};

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: '◈' },
      { label: 'Launch', href: '/launch', icon: '◉' },
      { label: 'Calendar', href: '/calendar', icon: '◷' },
      { label: 'Upload', href: '/upload', icon: '↑' },
    ],
  },
  {
    label: 'Create',
    items: [
      { label: 'Creative Hub', href: '/creative', icon: '✦' },
      { label: 'Studio OS', href: '/studio', icon: '⌘' },
      { label: 'Utopia Session', href: '/studio-mode', icon: '◇' },
      { label: 'Omnipush', href: '/studio-omnipush', icon: '◻' },
      { label: 'Lookbook', href: '/lookbook', icon: '◎' },
      { label: 'Media Vault', href: '/media', icon: '◈' },
      { label: 'Productions', href: '/productions', icon: '▶' },
    ],
  },
  {
    label: 'Broadcast',
    items: [
      { label: 'Radio Control', href: '/radio', icon: '🎙' },
      { label: 'Shows', href: 'https://bigmuddytouring.com/radio/shows', icon: '◻', external: true },
      { label: 'Web Player', href: 'https://bigmuddytouring.com/radio/player', icon: '▶', external: true },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Articles', href: '/articles', icon: '◻' },
      { label: 'Playlists', href: '/playlists', icon: '◈' },
      { label: 'Events', href: '/events', icon: '◷' },
      { label: 'Newsletter', href: '/newsletter', icon: '◻' },
      { label: 'Social', href: '/social', icon: '◈' },
      { label: 'Publications', href: '/publications', icon: '◻' },
      { label: 'Resources', href: '/resources', icon: '◆' },
      { label: 'Press mocks', href: '/press', icon: '◌' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'HQ', href: '/hq', icon: '◇' },
      { label: 'Report Card', href: '/report-card', icon: '★' },
      { label: 'Revenue', href: '/revenue', icon: '$' },
      { label: 'Churn alerts', href: '/churn-alerts', icon: '⚠' },
      { label: 'Delta Dawn', href: 'https://bigmuddytouring.com/ops/chat', icon: '⚡', external: true },
      { label: 'Ops Dashboard', href: '/ops', icon: '◻' },
      { label: 'Reviews', href: '/reviews', icon: '⭐' },
    ],
  },
  {
    label: 'Store',
    items: [
      { label: 'Sovereign Pi', href: '/store/sovereign-pi', icon: '◆', sitePath: true },
      { label: 'Spatial', href: '/store/spatial', icon: '◇', sitePath: true },
      { label: 'Display Module', href: '/store/sovereign-pi/display-module', icon: '▣', sitePath: true },
    ],
  },
  {
    label: 'CRM',
    items: [
      { label: 'Contacts', href: '/contacts', icon: '◻' },
      { label: 'Clients', href: '/clients', icon: '◈' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { label: 'Agents', href: '/agents', icon: '⚙' },
      { label: 'Glass kiosk', href: '/kiosk', icon: '◇' },
      { label: 'Contests', href: '/contests', icon: '◆' },
      { label: 'Design contest', href: '/contest', icon: '◎' },
      { label: 'Roadmap', href: '/roadmap', icon: '◇' },
      { label: 'Ecosystem', href: '/ecosystem', icon: '◉' },
      { label: 'Bridge Clients', href: '/bridge', icon: '◈' },
      { label: 'Business (GMB+Shop)', href: '/business', icon: '◆' },
      { label: 'Finance', href: '/finance', icon: '$' },
    ],
  },
  {
    label: 'Sites',
    items: [
      { label: 'Touring ↗', href: 'https://bigmuddytouring.com', icon: '◻', external: true },
      { label: 'Magazine ↗', href: 'https://bigmuddymagazine.com', icon: '◻', external: true },
      { label: 'Radio ↗', href: 'https://bigmuddyradio.com', icon: '◻', external: true },
    ],
  },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // If not authenticated, render children without the admin shell (login page).
  // Middleware already blocks unauthenticated access to all other /admin/* routes.
  if (!session?.user) {
    return <>{children}</>;
  }

  return (
    <div className="admin-shell theme-admin">
      {/* Sidebar */}
      <aside className="admin-sidebar" role="navigation" aria-label="Admin navigation">
        <div className="admin-sidebar__header">
          <a href="/dashboard" className="admin-sidebar__logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M14 6 L22 10.5 L22 17.5 L14 22 L6 17.5 L6 10.5 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="14" cy="14" r="2.5" fill="currentColor" />
            </svg>
            <div className="admin-sidebar__logo-text">
              <span className="admin-sidebar__logo-name">Big Muddy</span>
              <span className="admin-sidebar__logo-sub">HQ</span>
            </div>
          </a>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="admin-nav-section">
              <span className="admin-nav-section__label">{section.label}</span>
              <ul role="list">
                {section.items.map((item) => {
                  const nav = item as { external?: boolean; sitePath?: boolean };
                  const href = nav.external
                    ? item.href
                    : nav.sitePath
                      ? item.href
                      : `/admin${item.href}`;
                  return (
                  <li key={`${section.label}-${item.label}`}>
                    <a
                      href={href}
                      className="admin-nav-link"
                      target={nav.external ? '_blank' : undefined}
                      rel={nav.external ? 'noopener noreferrer' : undefined}
                    >
                      <span className="admin-nav-link__icon" aria-hidden="true">{item.icon}</span>
                      {item.label}
                    </a>
                  </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <span className="admin-sidebar__email">{session.user?.email || 'Guest'}</span>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/admin/login' });
              }}
            >
              <button type="submit" className="admin-sidebar__signout">
                Sign out
              </button>
            </form>
          </div>
          <div className="admin-sidebar__env">
            <span className="admin-sidebar__env-dot" />
            <span>Production</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        <main className="admin-content">
          <ReviewModeShell>{children}</ReviewModeShell>
        </main>
      </div>

      {/* Delta Dawn — always present floating assistant */}
      <DeltaDawnFloat />

      <style>{`
        /* ── Admin Shell ── */
        .admin-shell {
          display: grid;
          grid-template-columns: 240px 1fr;
          min-height: 100vh;
          background: var(--bg);
          font-family: var(--font-body);
        }
        @media (max-width: 768px) {
          .admin-shell {
            grid-template-columns: 1fr;
          }
          .admin-sidebar {
            display: none;
          }
        }

        /* ── Sidebar ── */
        .admin-sidebar {
          background: var(--surface);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          z-index: var(--z-nav);
        }
        .admin-sidebar__header {
          padding: var(--space-6);
          border-bottom: 1px solid var(--border);
        }
        .admin-sidebar__logo {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          text-decoration: none;
          color: var(--text);
        }
        .admin-sidebar__logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .admin-sidebar__logo-name {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
        }
        .admin-sidebar__logo-sub {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-top: 1px;
        }
        .admin-sidebar__nav {
          flex: 1;
          padding: var(--space-4) 0;
          overflow-y: auto;
        }
        .admin-nav-section {
          padding: var(--space-4) var(--space-4) var(--space-2);
        }
        .admin-nav-section__label {
          display: block;
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          padding: 0 var(--space-2);
          margin-bottom: var(--space-2);
        }
        .admin-nav-section ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .admin-nav-link {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-2) var(--space-3);
          min-height: 44px;
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          border-radius: var(--radius-sm);
          transition: all var(--duration-fast) var(--ease-default);
        }
        .admin-nav-link:hover {
          background: var(--surface-2);
          color: var(--text);
        }
        .admin-nav-link__icon {
          width: 16px;
          text-align: center;
          font-size: 10px;
          color: var(--text-disabled);
          flex-shrink: 0;
        }
        .admin-sidebar__footer {
          padding: var(--space-4) var(--space-6);
          border-top: 1px solid var(--border);
        }
        .admin-sidebar__user {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-2);
          margin-bottom: var(--space-3);
        }
        .admin-sidebar__email {
          font-size: 11px;
          color: var(--text-disabled);
          letter-spacing: 0.01em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
        }
        .admin-sidebar__signout {
          background: none;
          border: 1px solid var(--border);
          color: var(--text-muted);
          padding: 3px 8px;
          min-height: 44px;
          font-size: 11px;
          font-family: var(--font-body);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-default);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .admin-sidebar__signout:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .admin-sidebar__env {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--text-disabled);
        }
        .admin-sidebar__env-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
          flex-shrink: 0;
        }

        /* ── Main Content ── */
        .admin-main {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .admin-content {
          flex: 1;
          padding: var(--space-8);
          max-width: 1200px;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        @media (max-width: 480px) {
          .admin-content {
            padding: var(--space-4);
            overflow-x: hidden;
          }
        }

        /* ── Shared Admin Styles ── */
        .admin-page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
        }
        .admin-page-title {
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          margin: 0;
          letter-spacing: -0.01em;
        }
        .admin-page-sub {
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin: var(--space-1) 0 0;
        }
        .admin-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          min-height: 44px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          border-radius: var(--radius-sm);
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: all var(--duration-fast) var(--ease-default);
        }
        .admin-btn--primary {
          background: var(--accent);
          color: var(--bg);
        }
        .admin-btn--primary:hover { background: var(--accent-hover); }
        .admin-btn--ghost {
          background: var(--surface-2);
          color: var(--text-muted);
          border: 1px solid var(--border);
        }
        .admin-btn--ghost:hover { color: var(--text); border-color: var(--border-strong); }
        .admin-btn--danger {
          background: var(--error-muted);
          color: var(--error);
          border: 1px solid transparent;
        }
        .admin-btn--danger:hover { border-color: var(--error); }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--text-sm);
        }
        .admin-table th {
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          padding: var(--space-3) var(--space-4);
          text-align: left;
          border-bottom: 1px solid var(--border);
        }
        .admin-table td {
          padding: var(--space-3) var(--space-4);
          border-bottom: 1px solid var(--border-subtle);
          color: var(--text);
          vertical-align: middle;
        }
        .admin-table tr:hover td {
          background: var(--surface);
        }
        .admin-badge {
          display: inline-flex;
          align-items: center;
          padding: 2px var(--space-2);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          border-radius: var(--radius-sm);
        }
        .admin-badge--draft {
          background: var(--surface-3);
          color: var(--text-muted);
        }
        .admin-badge--review {
          background: var(--warning-muted);
          color: var(--warning);
        }
        .admin-badge--published {
          background: var(--success-muted);
          color: var(--success);
        }
        .admin-badge--active {
          background: var(--success-muted);
          color: var(--success);
        }
        .admin-badge--archived {
          background: var(--surface-3);
          color: var(--text-disabled);
        }
        .admin-badge--upcoming {
          background: var(--accent-muted);
          color: var(--accent);
        }
        .admin-badge--sent {
          background: var(--slate-muted);
          color: var(--slate);
        }
        .admin-badge--scheduled {
          background: var(--warning-muted);
          color: var(--warning);
        }
        .admin-badge--sold-out {
          background: var(--error-muted, rgba(239, 68, 68, 0.12));
          color: var(--error, #ef4444);
        }
        .admin-badge--cancelled {
          background: var(--surface-3);
          color: var(--text-disabled);
          text-decoration: line-through;
        }
        .admin-badge--completed {
          background: var(--slate-muted);
          color: var(--slate);
        }
        .admin-badge--artist {
          background: var(--accent-muted);
          color: var(--accent);
        }
        .admin-badge--vendor {
          background: var(--warning-muted);
          color: var(--warning);
        }
        .admin-badge--media {
          background: var(--slate-muted);
          color: var(--slate);
        }
        .admin-badge--partner {
          background: var(--success-muted);
          color: var(--success);
        }
        .admin-badge--guest {
          background: var(--accent-muted);
          color: var(--accent);
        }
        .admin-badge--team {
          background: var(--success-muted);
          color: var(--success);
        }
        .admin-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-6);
        }
        .admin-form-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          margin-bottom: var(--space-5);
        }
        .admin-label {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-muted);
        }
        .admin-label--required::after {
          content: ' *';
          color: var(--error);
        }
        .admin-input,
        .admin-select,
        .admin-textarea {
          padding: var(--space-3) var(--space-4);
          min-height: 44px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          transition: border-color var(--duration-fast) var(--ease-default);
          outline: none;
          width: 100%;
        }
        .admin-input:focus,
        .admin-select:focus,
        .admin-textarea:focus {
          border-color: var(--accent);
        }
        .admin-input::placeholder,
        .admin-textarea::placeholder {
          color: var(--text-disabled);
        }
        .admin-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: var(--leading-normal);
        }
        .admin-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a8074' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
        }
        .admin-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-5);
        }
        @media (max-width: 768px) {
          .admin-form-row { grid-template-columns: 1fr; }
        }
        .admin-form-actions {
          display: flex;
          gap: var(--space-3);
          padding-top: var(--space-6);
          border-top: 1px solid var(--border-subtle);
          margin-top: var(--space-8);
        }
        .admin-empty {
          text-align: center;
          padding: var(--space-16) var(--space-6);
          color: var(--text-disabled);
        }
        .admin-empty__icon {
          font-size: 40px;
          margin-bottom: var(--space-4);
          opacity: 0.3;
        }
        .admin-empty__text {
          font-size: var(--text-sm);
          color: var(--text-disabled);
        }
        .admin-filter-bar {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-5);
          flex-wrap: wrap;
        }
        .admin-filter-btn {
          padding: var(--space-2) var(--space-4);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: var(--tracking-wide);
          color: var(--text-muted);
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-default);
          text-transform: uppercase;
        }
        .admin-filter-btn:hover { border-color: var(--accent); color: var(--accent); }
        .admin-filter-btn--active {
          background: var(--accent-muted);
          border-color: var(--accent);
          color: var(--accent);
        }
        .admin-table-wrap {
          overflow-x: auto;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        .admin-error-banner {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid var(--error, #ef4444);
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-4);
          margin-bottom: var(--space-4);
          color: var(--error, #ef4444);
          font-size: var(--text-sm);
          display: flex;
          align-items: center;
        }
        .skeleton {
          background: var(--surface);
          border-radius: var(--radius-sm);
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .skeleton--text { height: 14px; }
        .skeleton--badge { height: 22px; width: 70px; }
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .skeleton-row td {
          padding: var(--space-3) var(--space-4);
        }
        .row-loading {
          opacity: 0.5;
          pointer-events: none;
        }
        .status-toggle-btn {
          background: none;
          border: none;
          padding: 0;
          min-height: 44px;
          min-width: 44px;
          cursor: pointer;
          transition: opacity var(--duration-fast) var(--ease-default);
        }
        .status-toggle-btn:hover { opacity: 0.7; }
        .status-toggle-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
