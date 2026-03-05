'use client';

// apps/web/app/(admin)/dashboard/page.tsx
// HQ Dashboard — live KPI tiles from /api/metrics + recent articles & events

import { useState, useEffect } from 'react';

interface MetricData {
  key: string;
  value: number;
  target: number | null;
  label: string | null;
  unit: string | null;
  source: string | null;
}

interface ArticleSummary {
  id: number;
  title: string;
  slug: string;
  status: string;
  publishedAt: string | null;
  city: string | null;
}

interface EventSummary {
  id: number;
  name: string;
  date: string;
  time: string | null;
  artist: string | null;
  status: string;
}

const KPI_CONFIG = [
  {
    key: 'newsletter_subscribers',
    fallbackLabel: 'Newsletter Subscribers',
    fallbackTarget: 2500,
    fallbackUnit: 'subscribers',
    fallbackSource: 'Beehiiv',
    icon: '◻',
    color: 'var(--accent)',
  },
  {
    key: 'inn_occupancy_rate',
    fallbackLabel: 'Inn Occupancy Rate',
    fallbackTarget: 80,
    fallbackUnit: '%',
    fallbackSource: 'CloudBeds',
    icon: '◻',
    color: 'var(--slate)',
  },
  {
    key: 'spotify_followers',
    fallbackLabel: 'Spotify Followers',
    fallbackTarget: 5000,
    fallbackUnit: 'followers',
    fallbackSource: 'Spotify',
    icon: '◈',
    color: '#1DB954',
  },
  {
    key: 'articles_published',
    fallbackLabel: 'Articles Published (MTD)',
    fallbackTarget: 8,
    fallbackUnit: 'articles',
    fallbackSource: 'Database',
    icon: '◻',
    color: 'var(--accent)',
  },
  {
    key: 'upcoming_events',
    fallbackLabel: 'Upcoming Events',
    fallbackTarget: null,
    fallbackUnit: 'events',
    fallbackSource: 'Database',
    icon: '◷',
    color: 'var(--warning)',
  },
  {
    key: 'google_review_rating',
    fallbackLabel: 'Google Rating',
    fallbackTarget: 4.8,
    fallbackUnit: '/ 5.0',
    fallbackSource: 'Google Business',
    icon: '◈',
    color: 'var(--success)',
  },
];

const QUICK_ACTIONS = [
  { label: 'New Article', href: '/articles/new', icon: '+' },
  { label: 'New Playlist', href: '/playlists/new', icon: '+' },
  { label: 'New Event', href: '/events/new', icon: '+' },
  { label: 'New Newsletter', href: '/newsletter/new', icon: '+' },
];

function formatDate(date: string | null | undefined): string {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function formatCityLabel(city: string | null | undefined): string {
  if (!city) return '';
  return city
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Record<string, MetricData>>({});
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [metricsRes, articlesRes, eventsRes] = await Promise.all([
          fetch('/api/metrics').then((r) => r.json()).catch(() => ({})),
          fetch('/api/articles?take=5').then((r) => r.json()).catch(() => ({ data: [] })),
          fetch('/api/events?status=upcoming&take=5').then((r) => r.json()).catch(() => ({ data: [] })),
        ]);
        setMetrics(metricsRes ?? {});
        setArticles(articlesRes?.data ?? []);
        setEvents(eventsRes?.data ?? []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-sub">Big Muddy HQ — Operations Overview</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {QUICK_ACTIONS.map((action) => (
            <a key={action.href} href={action.href} className="admin-btn admin-btn--ghost">
              {action.icon} {action.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── KPI Tiles ── */}
      <div className="dashboard-kpi-grid">
        {KPI_CONFIG.map((tile) => {
          const metric = metrics[tile.key];
          const hasValue = metric && metric.value !== undefined && metric.value !== null;
          const displayValue = hasValue
            ? metric.value.toLocaleString()
            : '—';
          const label = metric?.label ?? tile.fallbackLabel;
          const target = metric?.target ?? tile.fallbackTarget;
          const unit = metric?.unit ?? tile.fallbackUnit;
          const source = metric?.source ?? tile.fallbackSource;

          return (
            <div key={tile.key} className={`kpi-tile ${loading ? 'kpi-tile--loading' : ''}`}>
              <div className="kpi-tile__header">
                <span className="kpi-tile__label">{label}</span>
                <span className="kpi-tile__source">{source}</span>
              </div>
              <div className="kpi-tile__value" style={{ color: hasValue ? tile.color : 'var(--text-disabled)' }}>
                {loading ? (
                  <div className="skeleton skeleton--value" />
                ) : (
                  <>
                    {displayValue}
                    {unit && hasValue && (
                      <span className="kpi-tile__unit">{unit}</span>
                    )}
                  </>
                )}
              </div>
              {target && (
                <div className="kpi-tile__target">
                  Target: {target.toLocaleString()} {unit}
                </div>
              )}
              {!loading && !hasValue && (
                <div className="kpi-tile__empty-note">
                  Connect {source} to populate
                </div>
              )}
              {!loading && hasValue && target && (
                <div className="kpi-tile__progress">
                  <div
                    className="kpi-tile__progress-bar"
                    style={{
                      width: `${Math.min(100, (metric.value / target) * 100)}%`,
                      background: tile.color,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Content Overview ── */}
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <div className="dashboard-section__header">
            <h2 className="dashboard-section__title">Recent Articles</h2>
            <a href="/articles" className="dashboard-section__link">View all →</a>
          </div>
          {loading ? (
            <div className="dashboard-list">
              {[1, 2, 3].map((i) => (
                <div key={i} className="dashboard-list-item">
                  <div className="skeleton skeleton--text" style={{ width: '70%' }} />
                  <div className="skeleton skeleton--text" style={{ width: '30%', marginTop: '4px' }} />
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty__icon">◻</div>
              <p className="admin-empty__text">
                No articles yet. <a href="/articles/new" style={{ color: 'var(--accent)' }}>Create the first one.</a>
              </p>
            </div>
          ) : (
            <div className="dashboard-list">
              {articles.map((article) => (
                <a key={article.id} href={`/articles/edit/${article.slug}`} className="dashboard-list-item dashboard-list-item--link">
                  <div className="dashboard-list-item__main">
                    <span className="dashboard-list-item__title">{article.title}</span>
                    <span className="dashboard-list-item__meta">
                      {formatCityLabel(article.city)}
                      {article.city && ' · '}
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <span className={`admin-badge admin-badge--${article.status}`}>{article.status}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <div className="dashboard-section__header">
            <h2 className="dashboard-section__title">Upcoming Events</h2>
            <a href="/events" className="dashboard-section__link">View all →</a>
          </div>
          {loading ? (
            <div className="dashboard-list">
              {[1, 2, 3].map((i) => (
                <div key={i} className="dashboard-list-item">
                  <div className="skeleton skeleton--text" style={{ width: '70%' }} />
                  <div className="skeleton skeleton--text" style={{ width: '30%', marginTop: '4px' }} />
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty__icon">◷</div>
              <p className="admin-empty__text">
                No upcoming events. <a href="/events/new" style={{ color: 'var(--accent)' }}>Schedule one.</a>
              </p>
            </div>
          ) : (
            <div className="dashboard-list">
              {events.map((event) => (
                <div key={event.id} className="dashboard-list-item">
                  <div className="dashboard-list-item__main">
                    <span className="dashboard-list-item__title">{event.name}</span>
                    <span className="dashboard-list-item__meta">
                      {formatDate(event.date)}
                      {event.time && ` · ${event.time}`}
                      {event.artist && ` · ${event.artist}`}
                    </span>
                  </div>
                  <span className={`admin-badge admin-badge--${event.status}`}>{event.status}</span>
                </div>
              ))}
            </div>
          )}
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
        .kpi-tile__progress {
          height: 3px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
          margin-top: var(--space-1);
        }
        .kpi-tile__progress-bar {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease;
        }

        /* Skeleton */
        .skeleton {
          background: var(--surface);
          border-radius: var(--radius-sm);
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .skeleton--text { height: 14px; }
        .skeleton--value { height: 40px; width: 80px; }
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        /* Sections */
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

        /* List items */
        .dashboard-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        .dashboard-list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-3);
          padding: var(--space-3);
          border-radius: var(--radius-sm);
          transition: background var(--duration-fast) var(--ease-default);
        }
        .dashboard-list-item--link {
          text-decoration: none;
          cursor: pointer;
        }
        .dashboard-list-item--link:hover {
          background: var(--bg);
        }
        .dashboard-list-item__main {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .dashboard-list-item__title {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dashboard-list-item__meta {
          font-size: var(--text-xs);
          color: var(--text-disabled);
        }
      `}</style>
    </>
  );
}
