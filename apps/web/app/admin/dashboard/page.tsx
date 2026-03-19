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

const PLATFORM_STATUS = [
  // OTAs
  { name: 'Google Business Profile', platform: 'google', status: 'active', action: 'Add business hours, upload 20+ photos', priority: 'high' },
  { name: 'TripAdvisor', platform: 'tripadvisor', status: 'active', action: 'Need reviews — add QR codes to rooms', priority: 'medium' },
  { name: 'Airbnb', platform: 'airbnb', status: 'partial', action: '3 of 6 suites listed — add British Invasion I, II, B.B. King', priority: 'high' },
  { name: 'Booking.com', platform: 'booking', status: 'pending', action: 'Signed up — verify listing is live', priority: 'high' },
  { name: 'Expedia', platform: 'expedia', status: 'pending', action: 'Signed up — verify listing is live', priority: 'high' },
  { name: 'VRBO', platform: 'vrbo', status: 'pending', action: 'Signed up — verify listing is live', priority: 'high' },
  { name: 'Yelp', platform: 'yelp', status: 'active', action: 'Respond to reviews', priority: 'low' },
  // Social
  { name: 'Facebook', platform: 'facebook', status: 'active', action: 'Post weekly', priority: 'low' },
  { name: 'Instagram', platform: 'instagram', status: 'active', action: 'Post 3x/week', priority: 'medium' },
  { name: 'TikTok', platform: 'tiktok', status: 'missing', action: 'Create account — Blues Room clips', priority: 'medium' },
  { name: 'YouTube', platform: 'youtube', status: 'missing', action: 'Create channel — live sessions, room tours', priority: 'medium' },
  // Directories
  { name: 'Visit Natchez', platform: 'visitnatchez', status: 'active', action: 'Listed — keep updated', priority: 'low' },
  { name: 'Hotels Above Par', platform: 'hotelsabovepar', status: 'active', action: 'Review published — no action needed', priority: 'low' },
] as const;

type PlatformStatus = (typeof PLATFORM_STATUS)[number]['status'];
type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

const OPS_CHECKLIST = [
  // Critical — This Week
  { id: 'ann-bar', task: 'Remove outdated announcement bar from Squarespace (says "closed July-Aug 2025")', category: 'Website', priority: 'critical' as TaskPriority, done: false },
  { id: 'airbnb-3', task: 'List remaining 3 suites on Airbnb (British Invasion I & II, B.B. King)', category: 'OTA', priority: 'critical' as TaskPriority, done: false },
  { id: 'booking-verify', task: 'Verify Booking.com listing is live and indexed', category: 'OTA', priority: 'critical' as TaskPriority, done: false },
  { id: 'expedia-verify', task: 'Verify Expedia listing is live and indexed', category: 'OTA', priority: 'critical' as TaskPriority, done: false },
  { id: 'vrbo-verify', task: 'Verify VRBO listing is live and indexed', category: 'OTA', priority: 'critical' as TaskPriority, done: false },
  // High — This Month
  { id: 'alt-text', task: 'Add alt text to all images on Squarespace site', category: 'SEO', priority: 'high' as TaskPriority, done: false },
  { id: 'biz-hours', task: 'Add business hours to Google Business Profile and Squarespace schema', category: 'SEO', priority: 'high' as TaskPriority, done: false },
  { id: 'gbp-photos', task: 'Upload 20+ professional photos to Google Business Profile', category: 'SEO', priority: 'high' as TaskPriority, done: false },
  { id: 'room-pages', task: 'Create individual room pages on Squarespace (one per suite)', category: 'SEO', priority: 'high' as TaskPriority, done: false },
  { id: 'blog-launch', task: 'Launch Big Muddy Journal blog with first 3 posts', category: 'Content', priority: 'high' as TaskPriority, done: false },
  { id: 'tiktok-create', task: 'Create TikTok account for Blues Room performance clips', category: 'Social', priority: 'high' as TaskPriority, done: false },
  { id: 'youtube-create', task: 'Create YouTube channel for live sessions and room tours', category: 'Social', priority: 'high' as TaskPriority, done: false },
  { id: 'liquor-license', task: 'Finalize liquor license for Blues Room bar', category: 'Operations', priority: 'high' as TaskPriority, done: false },
  // Medium — Next 30 Days
  { id: 'ta-reviews', task: 'Set up TripAdvisor review cards for guest rooms', category: 'OTA', priority: 'medium' as TaskPriority, done: false },
  { id: 'schema-rooms', task: 'Add HotelRoom structured data to Squarespace', category: 'SEO', priority: 'medium' as TaskPriority, done: false },
  { id: 'ota-cross-link', task: 'Add OTA profile links to Squarespace "Book With Us" section', category: 'Website', priority: 'medium' as TaskPriority, done: false },
  { id: 'gbp-posts', task: 'Start weekly Google Business Profile posts', category: 'SEO', priority: 'medium' as TaskPriority, done: false },
  { id: 'pinterest', task: 'Create Pinterest account for travel/design audience', category: 'Social', priority: 'medium' as TaskPriority, done: false },
  { id: 'email-collect', task: 'Set up email capture on Squarespace with Beehiiv integration', category: 'Marketing', priority: 'medium' as TaskPriority, done: false },
  // Done
  { id: 'tripadvisor', task: 'Create TripAdvisor listing', category: 'OTA', priority: 'high' as TaskPriority, done: true },
  { id: 'airbnb-initial', task: 'List first 3 suites on Airbnb', category: 'OTA', priority: 'high' as TaskPriority, done: true },
  { id: 'yelp', task: 'Create and claim Yelp listing', category: 'OTA', priority: 'high' as TaskPriority, done: true },
  { id: 'visitnatchez', task: 'Get listed on Visit Natchez directory', category: 'OTA', priority: 'medium' as TaskPriority, done: true },
  { id: 'facebook', task: 'Create Facebook page', category: 'Social', priority: 'high' as TaskPriority, done: true },
  { id: 'instagram', task: 'Create Instagram account', category: 'Social', priority: 'high' as TaskPriority, done: true },
  { id: 'gbp-claim', task: 'Claim Google Business Profile', category: 'SEO', priority: 'critical' as TaskPriority, done: true },
  { id: 'booking-signup', task: 'Sign up for Booking.com', category: 'OTA', priority: 'high' as TaskPriority, done: true },
  { id: 'expedia-signup', task: 'Sign up for Expedia', category: 'OTA', priority: 'high' as TaskPriority, done: true },
  { id: 'vrbo-signup', task: 'Sign up for VRBO', category: 'OTA', priority: 'high' as TaskPriority, done: true },
];

const PRIORITY_META: Record<TaskPriority, { label: string; headerClass: string }> = {
  critical: { label: 'Critical — This Week', headerClass: 'checklist-group__header--critical' },
  high:     { label: 'High — This Month',    headerClass: 'checklist-group__header--high'     },
  medium:   { label: 'Medium — Next 30 Days', headerClass: 'checklist-group__header--medium'  },
  low:      { label: 'Low',                  headerClass: 'checklist-group__header--low'      },
};

const STATUS_BADGE_CLASS: Record<PlatformStatus, string> = {
  active:  'platform-badge--active',
  partial: 'platform-badge--partial',
  pending: 'platform-badge--pending',
  missing: 'platform-badge--missing',
};

const PRIORITY_BADGE_CLASS: Record<string, string> = {
  high:   'priority-badge--high',
  medium: 'priority-badge--medium',
  low:    'priority-badge--low',
};

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
  const [doneOpen, setDoneOpen] = useState(false);

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

      {/* ── Platform & OTA Status ── */}
      <div className="dashboard-full-section" style={{ marginTop: 'var(--space-6)' }}>
        <div className="dashboard-section__header">
          <div>
            <h2 className="dashboard-section__title">Platform & OTA Status</h2>
            <p className="dashboard-section__sub">Big Muddy Inn — Distribution Channels</p>
          </div>
        </div>
        <div className="platform-table-wrap">
          <table className="platform-table">
            <thead>
              <tr>
                <th className="platform-table__th">Platform</th>
                <th className="platform-table__th">Status</th>
                <th className="platform-table__th">Action Needed</th>
                <th className="platform-table__th">Priority</th>
              </tr>
            </thead>
            <tbody>
              {PLATFORM_STATUS.map((p) => (
                <tr key={p.platform} className="platform-table__row">
                  <td className="platform-table__td platform-table__name">{p.name}</td>
                  <td className="platform-table__td">
                    <span className={`platform-badge ${STATUS_BADGE_CLASS[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="platform-table__td platform-table__action">{p.action}</td>
                  <td className="platform-table__td">
                    <span className={`priority-badge ${PRIORITY_BADGE_CLASS[p.priority] ?? ''}`}>
                      {p.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Operations Checklist ── */}
      {(() => {
        const open = OPS_CHECKLIST.filter((t) => !t.done);
        const done = OPS_CHECKLIST.filter((t) => t.done);
        const total = OPS_CHECKLIST.length;
        const completedCount = done.length;
        const pct = Math.round((completedCount / total) * 100);
        const priorities: TaskPriority[] = ['critical', 'high', 'medium'];

        return (
          <div className="dashboard-full-section" style={{ marginTop: 'var(--space-6)' }}>
            <div className="dashboard-section__header">
              <div>
                <h2 className="dashboard-section__title">Operations Checklist</h2>
                <p className="dashboard-section__sub">Launch & Growth Tasks</p>
              </div>
            </div>

            {/* Progress summary */}
            <div className="checklist-progress">
              <div className="checklist-progress__label">
                <span className="checklist-progress__count">{completedCount} of {total} tasks complete</span>
                <span className="checklist-progress__pct">{pct}%</span>
              </div>
              <div className="checklist-progress__track">
                <div className="checklist-progress__fill" style={{ width: `${pct}%` }} />
              </div>
            </div>

            {/* Open tasks grouped by priority */}
            {priorities.map((p) => {
              const group = open.filter((t) => t.priority === p);
              if (group.length === 0) return null;
              const meta = PRIORITY_META[p];
              return (
                <div key={p} className="checklist-group">
                  <div className={`checklist-group__header ${meta.headerClass}`}>
                    {meta.label}
                    <span className="checklist-group__count">{group.length}</span>
                  </div>
                  {group.map((task) => (
                    <div key={task.id} className="checklist-item">
                      <span className="checklist-item__checkbox" aria-hidden="true" />
                      <span className="checklist-item__text">{task.task}</span>
                      <span className="checklist-item__category">{task.category}</span>
                    </div>
                  ))}
                </div>
              );
            })}

            {/* Done section — collapsible */}
            <div className="checklist-group">
              <button
                className="checklist-done-toggle"
                onClick={() => setDoneOpen((v) => !v)}
                aria-expanded={doneOpen}
              >
                <span>Done ({done.length})</span>
                <span className="checklist-done-toggle__arrow">{doneOpen ? '▲' : '▼'}</span>
              </button>
              {doneOpen && done.map((task) => (
                <div key={task.id} className="checklist-item checklist-item--done">
                  <span className="checklist-item__checkbox checklist-item__checkbox--checked" aria-hidden="true">✓</span>
                  <span className="checklist-item__text">{task.task}</span>
                  <span className="checklist-item__category">{task.category}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

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

        /* ── Full-width panel ── */
        .dashboard-full-section {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-5);
        }
        .dashboard-section__sub {
          font-size: var(--text-xs);
          color: var(--text-disabled);
          margin: 2px 0 0;
        }

        /* ── Platform table ── */
        .platform-table-wrap {
          overflow-x: auto;
          margin-top: var(--space-4);
        }
        .platform-table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--text-sm);
        }
        .platform-table__th {
          text-align: left;
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide);
          padding: var(--space-2) var(--space-3);
          border-bottom: 1px solid var(--border);
        }
        .platform-table__row:hover {
          background: var(--bg);
        }
        .platform-table__td {
          padding: var(--space-3);
          border-bottom: 1px solid var(--border);
          vertical-align: middle;
        }
        .platform-table__name {
          font-weight: 600;
          color: var(--text);
          white-space: nowrap;
        }
        .platform-table__action {
          color: var(--text-muted);
          font-size: var(--text-xs);
        }

        /* Status badges */
        .platform-badge {
          display: inline-block;
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: var(--tracking-wide);
          padding: 2px 8px;
          border-radius: 999px;
          text-transform: uppercase;
        }
        .platform-badge--active  { background: #14532d22; color: #22c55e; }
        .platform-badge--partial { background: #71350022; color: #eab308; }
        .platform-badge--pending { background: #7c2d1222; color: #f97316; }
        .platform-badge--missing { background: #7f1d1d22; color: #ef4444; }

        /* Priority badges (table column) */
        .priority-badge {
          display: inline-block;
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: var(--tracking-wide);
          padding: 2px 8px;
          border-radius: 999px;
          text-transform: uppercase;
        }
        .priority-badge--high   { background: #7f1d1d22; color: #ef4444; }
        .priority-badge--medium { background: #71350022; color: #eab308; }
        .priority-badge--low    { background: #14532d22; color: #22c55e; }

        /* ── Checklist ── */
        .checklist-progress {
          margin-top: var(--space-4);
          margin-bottom: var(--space-5);
        }
        .checklist-progress__label {
          display: flex;
          justify-content: space-between;
          font-size: var(--text-xs);
          color: var(--text-muted);
          margin-bottom: var(--space-2);
        }
        .checklist-progress__count { font-weight: 600; }
        .checklist-progress__pct   { color: var(--text-disabled); }
        .checklist-progress__track {
          height: 6px;
          background: var(--border);
          border-radius: 3px;
          overflow: hidden;
        }
        .checklist-progress__fill {
          height: 100%;
          background: var(--success, #22c55e);
          border-radius: 3px;
          transition: width 0.6s ease;
        }

        .checklist-group {
          margin-top: var(--space-4);
        }
        .checklist-group__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-sm);
          margin-bottom: var(--space-2);
        }
        .checklist-group__header--critical { background: #7f1d1d22; color: #ef4444; }
        .checklist-group__header--high     { background: #7c2d1222; color: #f97316; }
        .checklist-group__header--medium   { background: #71350022; color: #eab308; }
        .checklist-group__header--low      { background: #14532d22; color: #22c55e; }
        .checklist-group__count {
          background: rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 1px 7px;
          font-size: var(--text-xs);
        }

        .checklist-item {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          padding: var(--space-3);
          border-radius: var(--radius-sm);
          transition: background var(--duration-fast) var(--ease-default);
        }
        .checklist-item:hover { background: var(--bg); }
        .checklist-item--done { opacity: 0.5; }
        .checklist-item__checkbox {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          border: 1.5px solid var(--border);
          border-radius: 3px;
          margin-top: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: var(--success, #22c55e);
        }
        .checklist-item__checkbox--checked {
          background: var(--success, #22c55e);
          border-color: var(--success, #22c55e);
          color: #fff;
        }
        .checklist-item__text {
          font-size: var(--text-sm);
          color: var(--text);
          flex: 1;
          line-height: 1.4;
        }
        .checklist-item__category {
          flex-shrink: 0;
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-disabled);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 1px 6px;
          white-space: nowrap;
        }

        .checklist-done-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: var(--space-2) var(--space-3);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          transition: background var(--duration-fast) var(--ease-default);
        }
        .checklist-done-toggle:hover { background: var(--border); }
        .checklist-done-toggle__arrow { font-size: 9px; }
      `}</style>
    </>
  );
}
