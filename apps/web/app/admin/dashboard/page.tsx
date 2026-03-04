// apps/web/app/(admin)/dashboard/page.tsx
// HQ Dashboard — KPI tiles and recent activity

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard' };

const KPI_TILES = [
  {
    key: 'newsletter_subscribers',
    label: 'Newsletter Subscribers',
    value: '—',
    target: 2500,
    unit: 'subscribers',
    source: 'Beehiiv',
    icon: '◻',
    trend: null,
    color: 'var(--accent)',
  },
  {
    key: 'inn_occupancy_rate',
    label: 'Inn Occupancy Rate',
    value: '—',
    target: 80,
    unit: '%',
    source: 'CloudBeds',
    icon: '◻',
    trend: null,
    color: 'var(--slate)',
  },
  {
    key: 'spotify_followers',
    label: 'Spotify Followers',
    value: '—',
    target: 5000,
    unit: 'followers',
    source: 'Spotify',
    icon: '◈',
    trend: null,
    color: '#1DB954',
  },
  {
    key: 'articles_published',
    label: 'Articles Published (MTD)',
    value: '—',
    target: 8,
    unit: 'articles',
    source: 'Database',
    icon: '◻',
    trend: null,
    color: 'var(--accent)',
  },
  {
    key: 'upcoming_events',
    label: 'Upcoming Events',
    value: '—',
    target: null,
    unit: 'events',
    source: 'Database',
    icon: '◷',
    trend: null,
    color: 'var(--warning)',
  },
  {
    key: 'google_review_rating',
    label: 'Google Rating',
    value: '—',
    target: 4.8,
    unit: '/ 5.0',
    source: 'Google Business',
    icon: '◈',
    trend: null,
    color: 'var(--success)',
  },
];

const QUICK_ACTIONS = [
  { label: 'New Article', href: '/articles/new', icon: '+' },
  { label: 'New Playlist', href: '/playlists/new', icon: '+' },
  { label: 'New Event', href: '/events/new', icon: '+' },
  { label: 'New Newsletter', href: '/newsletter/new', icon: '+' },
];

export default async function DashboardPage() {
  // TODO: Replace with real Prisma + metrics queries:
  // const metrics = await prisma.metric.findMany();
  // const articlesCount = await prisma.article.count({ where: { status: 'published', publishedAt: { gte: startOfMonth } } });
  // const upcomingEvents = await prisma.event.count({ where: { status: 'upcoming' } });

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-sub">Big Muddy HQ — Operations Overview</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          {QUICK_ACTIONS.map((action) => (
            <a key={action.href} href={action.href} className="admin-btn admin-btn--ghost">
              {action.icon} {action.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── KPI Tiles ── */}
      <div className="dashboard-kpi-grid">
        {KPI_TILES.map((tile) => (
          <div key={tile.key} className="kpi-tile">
            <div className="kpi-tile__header">
              <span className="kpi-tile__label">{tile.label}</span>
              <span className="kpi-tile__source">{tile.source}</span>
            </div>
            <div className="kpi-tile__value" style={{ color: tile.color }}>
              {tile.value}
              {tile.unit && tile.value !== '—' && (
                <span className="kpi-tile__unit">{tile.unit}</span>
              )}
            </div>
            {tile.target && (
              <div className="kpi-tile__target">
                Target: {tile.target.toLocaleString()} {tile.unit}
              </div>
            )}
            <div className="kpi-tile__empty-note">
              Connect {tile.source} to populate
            </div>
          </div>
        ))}
      </div>

      {/* ── Content Overview ── */}
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <div className="dashboard-section__header">
            <h2 className="dashboard-section__title">Recent Articles</h2>
            <a href="/articles" className="dashboard-section__link">View all →</a>
          </div>
          <div className="admin-empty">
            <div className="admin-empty__icon">◻</div>
            <p className="admin-empty__text">
              No articles yet. <a href="/articles/new" style={{ color: 'var(--accent)' }}>Create the first one.</a>
            </p>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="dashboard-section__header">
            <h2 className="dashboard-section__title">Upcoming Events</h2>
            <a href="/events" className="dashboard-section__link">View all →</a>
          </div>
          <div className="admin-empty">
            <div className="admin-empty__icon">◷</div>
            <p className="admin-empty__text">
              No upcoming events. <a href="/events/new" style={{ color: 'var(--accent)' }}>Schedule one.</a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: var(--space-4);
          margin-bottom: var(--space-10);
        }
        .kpi-tile {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-5);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .kpi-tile__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--space-2);
        }
        .kpi-tile__label {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide);
          line-height: 1.3;
        }
        .kpi-tile__source {
          font-size: var(--text-xs);
          color: var(--text-disabled);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .kpi-tile__value {
          font-size: var(--text-4xl);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-top: var(--space-2);
        }
        .kpi-tile__unit {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-muted);
          margin-left: var(--space-1);
        }
        .kpi-tile__target {
          font-size: var(--text-xs);
          color: var(--text-disabled);
        }
        .kpi-tile__empty-note {
          font-size: var(--text-xs);
          color: var(--text-disabled);
          font-style: italic;
        }
        .dashboard-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-6);
        }
        @media (max-width: 768px) {
          .dashboard-sections { grid-template-columns: 1fr; }
        }
        .dashboard-section {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-5);
        }
        .dashboard-section__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-5);
        }
        .dashboard-section__title {
          font-size: var(--text-md);
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }
        .dashboard-section__link {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
        }
      `}</style>
    </>
  );
}
