'use client';

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

function timeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatRelativeDate(date: string | null): string {
  if (!date) return '';
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((d.getTime() - now.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff < 7) return d.toLocaleDateString('en-US', { weekday: 'long' });
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const TOOLS = [
  { label: 'Content Studio', href: '/admin/studio', icon: 'edit', desc: 'Generate posts, articles, radio spots' },
  { label: 'Media Vault', href: '/admin/media', icon: 'image', desc: 'Browse and manage all photos' },
  { label: 'Shot List', href: '/admin/snap', icon: 'camera', desc: 'GPS-guided photo locations' },
  { label: 'Lookbook', href: '/admin/lookbook', icon: 'palette', desc: 'Review illustration styles' },
  { label: 'Clients', href: '/admin/clients', icon: 'users', desc: 'DSD subscribers and leads' },
  { label: 'Calendar', href: '/admin/calendar', icon: 'calendar', desc: 'Shows and events' },
];

const ICON_MAP: Record<string, string> = {
  edit: 'M',
  image: 'I',
  camera: 'C',
  palette: 'P',
  users: 'U',
  calendar: 'E',
};

// ── User Persona Config ──
// Each team member gets their own tools, stats, and greeting
interface UserPersona {
  name: string;
  role: string;
  greeting: string;
  tools: typeof TOOLS;
  statsKeys: string[];
}

const PERSONAS: Record<string, UserPersona> = {
  // Chase — sees everything
  'me@chasepierson.tv': {
    name: 'Chase',
    role: 'CEO / CTO',
    greeting: 'Command center is live.',
    tools: TOOLS,
    statsKeys: ['inn_occupancy_rate', 'newsletter_subscribers', 'google_review_rating', 'upcoming_shows'],
  },
  // JP — shows, radio, entertainment
  'jp@bigmuddyentertainment.com': {
    name: 'JP',
    role: 'Head of Shows & Programming',
    greeting: 'Your stage is set.',
    tools: [
      { label: 'Content Studio', href: '/admin/studio', icon: 'edit', desc: 'Generate promos for your shows' },
      { label: 'Radio Shows', href: '/radio/shows', icon: 'calendar', desc: 'Your programming grid' },
      { label: 'Broadcast Control', href: '/admin/radio', icon: 'camera', desc: 'Schedule, playlist, now playing' },
      { label: 'Creative Hub', href: '/admin/creative', icon: 'palette', desc: 'Generate images, video, audio' },
      { label: 'Calendar', href: '/admin/calendar', icon: 'calendar', desc: 'Shows and events' },
      { label: 'Your Page', href: '/jp', icon: 'users', desc: 'Your public welcome page' },
    ],
    statsKeys: ['upcoming_shows', 'radio_listeners', 'google_review_rating'],
  },
  'jphoustonlives@gmail.com': {
    name: 'JP',
    role: 'Head of Shows & Programming',
    greeting: 'Your stage is set.',
    tools: [
      { label: 'Content Studio', href: '/admin/studio', icon: 'edit', desc: 'Generate promos for your shows' },
      { label: 'Radio Shows', href: '/radio/shows', icon: 'calendar', desc: 'Your programming grid' },
      { label: 'Broadcast Control', href: '/admin/radio', icon: 'camera', desc: 'Schedule, playlist, now playing' },
      { label: 'Creative Hub', href: '/admin/creative', icon: 'palette', desc: 'Generate images, video, audio' },
      { label: 'Calendar', href: '/admin/calendar', icon: 'calendar', desc: 'Shows and events' },
      { label: 'Your Page', href: '/jp', icon: 'users', desc: 'Your public welcome page' },
    ],
    statsKeys: ['upcoming_shows', 'radio_listeners', 'google_review_rating'],
  },
  // Tracy — finance, operations, lifestyle brand
  'tracyaldersonallen@gmail.com': {
    name: 'Tracy',
    role: 'CFO / Lifestyle Brand CEO',
    greeting: 'The numbers are ready.',
    tools: [
      { label: 'Financial Dashboard', href: '/tracy', icon: 'users', desc: 'Revenue, expenses, entities' },
      { label: 'Pricing', href: '/admin/pricing', icon: 'users', desc: 'Room rates, dynamic pricing, strategy' },
      { label: 'Clients', href: '/admin/clients', icon: 'users', desc: 'DSD subscribers and leads' },
      { label: 'Calendar', href: '/admin/calendar', icon: 'calendar', desc: 'Shows and events' },
      { label: 'Content Studio', href: '/admin/studio', icon: 'edit', desc: 'Generate marketing content' },
      { label: 'Media Vault', href: '/admin/media', icon: 'image', desc: 'Browse all photos and assets' },
    ],
    statsKeys: ['newsletter_subscribers', 'inn_occupancy_rate', 'google_review_rating'],
  },
  // Amy — inn, bar, guest experience
  'amyaldersonallen@gmail.com': {
    name: 'Amy',
    role: 'COO — Inn & Bar',
    greeting: 'The Inn is yours.',
    tools: [
      { label: 'Calendar', href: '/admin/calendar', icon: 'calendar', desc: 'Shows and events coming up' },
      { label: 'Clients', href: '/admin/clients', icon: 'users', desc: 'Guest info and bookings' },
      { label: 'Content Studio', href: '/admin/studio', icon: 'edit', desc: 'Quick social posts and promos' },
      { label: 'Media Vault', href: '/admin/media', icon: 'image', desc: 'Photos for the Inn' },
    ],
    statsKeys: ['inn_occupancy_rate', 'google_review_rating', 'upcoming_shows'],
  },
  // ── Tuthill Design (Woodstock, NY) ──
  'info@tuthilldesign.com': {
    name: 'Elijah',
    role: 'Founder — Tuthill Design',
    greeting: 'Your studio is ready.',
    tools: [
      { label: 'Content Studio', href: '/admin/studio', icon: 'edit', desc: 'Generate posts, articles, copy' },
      { label: 'Creative Hub', href: '/admin/creative', icon: 'palette', desc: 'Generate images, video, audio' },
      { label: 'Clients', href: '/admin/clients', icon: 'users', desc: 'Your client list' },
      { label: 'Social', href: '/admin/social', icon: 'camera', desc: 'Schedule and publish posts' },
      { label: 'Media Vault', href: '/admin/media', icon: 'image', desc: 'Photos and assets' },
      { label: 'Calendar', href: '/admin/calendar', icon: 'calendar', desc: 'Projects and deadlines' },
    ],
    statsKeys: [],
  },
  // ── Studio C Video (Woodstock, NY) ──
  'elijah@studioc.video': {
    name: 'Elijah',
    role: 'Co-Founder — Studio C',
    greeting: 'Cameras are rolling.',
    tools: [
      { label: 'Productions', href: '/admin/productions', icon: 'camera', desc: 'Video production pipeline' },
      { label: 'Content Studio', href: '/admin/studio', icon: 'edit', desc: 'Generate scripts, promos, copy' },
      { label: 'Creative Hub', href: '/admin/creative', icon: 'palette', desc: 'Generate images, video, audio' },
      { label: 'Social', href: '/admin/social', icon: 'camera', desc: 'Schedule and publish posts' },
      { label: 'Media Vault', href: '/admin/media', icon: 'image', desc: 'Footage and assets' },
      { label: 'Calendar', href: '/admin/calendar', icon: 'calendar', desc: 'Shoots and deadlines' },
    ],
    statsKeys: [],
  },
  'miles@studioc.video': {
    name: 'Miles',
    role: 'Co-Founder — Studio C',
    greeting: 'The studio is yours.',
    tools: [
      { label: 'Productions', href: '/admin/productions', icon: 'camera', desc: 'Video production pipeline' },
      { label: 'Content Studio', href: '/admin/studio', icon: 'edit', desc: 'Generate scripts, promos, copy' },
      { label: 'Creative Hub', href: '/admin/creative', icon: 'palette', desc: 'Generate images, video, audio' },
      { label: 'Clients', href: '/admin/clients', icon: 'users', desc: 'Your client list' },
      { label: 'Media Vault', href: '/admin/media', icon: 'image', desc: 'Footage and assets' },
      { label: 'Calendar', href: '/admin/calendar', icon: 'calendar', desc: 'Shoots and deadlines' },
    ],
    statsKeys: [],
  },
};

function getPersona(email: string | null): UserPersona {
  if (email && PERSONAS[email.toLowerCase()]) {
    return PERSONAS[email.toLowerCase()];
  }
  // Default for unknown users
  const name = email ? email.split('@')[0].split('.')[0] : 'there';
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    name: capitalized,
    role: 'Team Member',
    greeting: 'Welcome to Mission Control.',
    tools: TOOLS,
    statsKeys: ['upcoming_shows', 'newsletter_subscribers', 'google_review_rating'],
  };
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Record<string, MetricData>>({});
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [metricsRes, articlesRes, eventsRes, sessionRes] = await Promise.all([
          fetch('/api/metrics').then((r) => r.json()).catch(() => ({})),
          fetch('/api/articles?take=5').then((r) => r.json()).catch(() => ({ data: [] })),
          fetch('/api/events?status=upcoming&take=5').then((r) => r.json()).catch(() => ({ data: [] })),
          fetch('/api/auth/session').then((r) => r.json()).catch(() => ({})),
        ]);
        setMetrics(metricsRes ?? {});
        setArticles(articlesRes?.data ?? []);
        setEvents(eventsRes?.data ?? []);
        if (sessionRes?.user?.email) {
          setUserEmail(sessionRes.user.email);
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const persona = getPersona(userEmail);
  const nextEvent = events[0];
  const occupancy = metrics['inn_occupancy_rate'];
  const subscribers = metrics['newsletter_subscribers'];
  const rating = metrics['google_review_rating'];

  return (
    <>
      <div className="mc">
        {/* ── Hero Greeting ── */}
        <section className="mc-hero">
          <div className="mc-hero__greeting">
            <h1 className="mc-hero__title">{timeGreeting()}, {persona.name}</h1>
            <p className="mc-hero__sub">
              {persona.role} &middot; {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <p className="mc-hero__tagline">{persona.greeting}</p>
          </div>
        </section>

        {/* ── Spotlight — What's happening right now ── */}
        <section className="mc-spotlight">
          {nextEvent ? (
            <div className="mc-spotlight__card mc-spotlight__card--event">
              <div className="mc-spotlight__badge">Next Show</div>
              <h2 className="mc-spotlight__title">{nextEvent.name}</h2>
              <p className="mc-spotlight__detail">
                {nextEvent.artist && <span className="mc-spotlight__artist">{nextEvent.artist}</span>}
                <span className="mc-spotlight__date">{formatRelativeDate(nextEvent.date)}{nextEvent.time && ` at ${nextEvent.time}`}</span>
              </p>
              <div className="mc-spotlight__actions">
                <a href="/admin/studio" className="mc-btn mc-btn--primary">Create Promo</a>
                <a href="/admin/calendar" className="mc-btn mc-btn--ghost">View Calendar</a>
              </div>
            </div>
          ) : (
            <div className="mc-spotlight__card">
              <div className="mc-spotlight__badge">No Shows Scheduled</div>
              <h2 className="mc-spotlight__title">Book your next act</h2>
              <p className="mc-spotlight__detail">
                <span className="mc-spotlight__date">The stage is empty. Time to fill it.</span>
              </p>
              <div className="mc-spotlight__actions">
                <a href="/admin/calendar" className="mc-btn mc-btn--primary">Schedule a Show</a>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="mc-stats">
            {!loading && !occupancy && !subscribers && !rating && events.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '1rem', opacity: 0.6, fontSize: '0.85rem' }}>
                No metrics yet. Data populates as you use the platform.
              </div>
            ) : (
              <>
                <div className="mc-stat">
                  <span className="mc-stat__value">{loading ? '—' : (occupancy?.value ?? '—')}<span className="mc-stat__unit">%</span></span>
                  <span className="mc-stat__label">Occupancy</span>
                </div>
                <div className="mc-stat">
                  <span className="mc-stat__value">{loading ? '—' : (subscribers?.value?.toLocaleString() ?? '—')}</span>
                  <span className="mc-stat__label">Subscribers</span>
                </div>
                <div className="mc-stat">
                  <span className="mc-stat__value">{loading ? '—' : (rating?.value ?? '—')}<span className="mc-stat__unit">/5</span></span>
                  <span className="mc-stat__label">Google Rating</span>
                </div>
                <div className="mc-stat">
                  <span className="mc-stat__value">{events.length}</span>
                  <span className="mc-stat__label">Upcoming Shows</span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── Tools Grid ── */}
        <section className="mc-tools">
          <h2 className="mc-section-label">Your Tools</h2>
          <div className="mc-tools__grid">
            {persona.tools.map((tool) => (
              <a key={tool.href} href={tool.href} className="mc-tool">
                <div className="mc-tool__icon">{ICON_MAP[tool.icon]}</div>
                <div className="mc-tool__text">
                  <span className="mc-tool__name">{tool.label}</span>
                  <span className="mc-tool__desc">{tool.desc}</span>
                </div>
                <span className="mc-tool__arrow">&rarr;</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Feed — Recent Activity ── */}
        <section className="mc-feed">
          <div className="mc-feed__columns">
            {/* Upcoming Shows */}
            <div className="mc-feed__col">
              <h2 className="mc-section-label">Upcoming Shows</h2>
              {events.length === 0 && !loading ? (
                <div className="mc-empty">No shows scheduled. <a href="/admin/calendar">Add one.</a></div>
              ) : (
                <div className="mc-list">
                  {events.map((event) => (
                    <div key={event.id} className="mc-list__item">
                      <div className="mc-list__dot" />
                      <div className="mc-list__content">
                        <span className="mc-list__title">{event.name}</span>
                        <span className="mc-list__meta">
                          {formatRelativeDate(event.date)}
                          {event.artist && ` \u00b7 ${event.artist}`}
                        </span>
                      </div>
                      <a href="/admin/studio" className="mc-list__action">Promote</a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Content */}
            <div className="mc-feed__col">
              <h2 className="mc-section-label">Recent Content</h2>
              {articles.length === 0 && !loading ? (
                <div className="mc-empty">No articles yet. <a href="/admin/studio">Create one.</a></div>
              ) : (
                <div className="mc-list">
                  {articles.map((article) => (
                    <a key={article.id} href={`/admin/articles/${article.id}/edit`} className="mc-list__item mc-list__item--link">
                      <div className={`mc-list__dot mc-list__dot--${article.status}`} />
                      <div className="mc-list__content">
                        <span className="mc-list__title">{article.title}</span>
                        <span className="mc-list__meta">
                          {article.status}
                          {article.city && ` \u00b7 ${article.city.replace(/-/g, ' ')}`}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .mc {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 var(--space-4);
          position: relative;
        }
        .mc::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url(https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/09-blueprint/dashboard-wireframe.webp);
          background-size: cover;
          background-position: center;
          opacity: 0.04;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Hero ── */
        .mc-hero {
          padding: var(--space-8) 0 var(--space-2);
        }
        .mc-hero__title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          color: var(--text);
          margin: 0;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #fff 0%, #a8a098 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .mc-hero__sub {
          font-size: var(--text-sm);
          color: var(--text-disabled);
          margin: var(--space-1) 0 0;
        }
        .mc-hero__tagline {
          font-size: var(--text-base, 1rem);
          color: var(--accent, #c8943e);
          margin: var(--space-2, 0.5rem) 0 0;
          font-weight: 500;
        }

        /* ── Spotlight ── */
        .mc-spotlight {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
          margin: var(--space-6) 0;
        }
        @media (max-width: 768px) {
          .mc-spotlight { grid-template-columns: 1fr; }
        }
        .mc-spotlight__card {
          background: linear-gradient(135deg, #1e1b18 0%, #2a2520 100%);
          border: 1px solid #3a352f;
          border-radius: 16px;
          padding: var(--space-8);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .mc-spotlight__card--event {
          background: linear-gradient(135deg, #1a1510 0%, #2d2218 60%, #3a2810 100%);
          border-color: #4a3828;
        }
        .mc-spotlight__badge {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #c8943e;
          padding: 4px 10px;
          background: rgba(200, 148, 62, 0.12);
          border-radius: 999px;
          width: fit-content;
        }
        .mc-spotlight__title {
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-weight: 800;
          color: #f5f0ea;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .mc-spotlight__detail {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin: 0;
        }
        .mc-spotlight__artist {
          font-size: var(--text-md);
          color: #c8943e;
          font-weight: 600;
        }
        .mc-spotlight__date {
          font-size: var(--text-sm);
          color: #8a8074;
        }
        .mc-spotlight__actions {
          display: flex;
          gap: var(--space-3);
          margin-top: var(--space-2);
        }

        /* Stats */
        .mc-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3);
        }
        .mc-stat {
          background: linear-gradient(135deg, #1e1b18 0%, #252220 100%);
          border: 1px solid #2a2520;
          border-radius: 12px;
          padding: var(--space-5);
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .mc-stat:hover {
          border-color: #3a352f;
          transform: translateY(-1px);
        }
        .mc-stat__value {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800;
          color: #f5f0ea;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .mc-stat__unit {
          font-size: 0.5em;
          color: #6a6560;
          font-weight: 500;
          margin-left: 2px;
        }
        .mc-stat__label {
          font-size: 0.7rem;
          font-weight: 600;
          color: #6a6560;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* ── Section Labels ── */
        .mc-section-label {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #6a6560;
          margin: 0 0 var(--space-4);
        }

        /* ── Tools Grid ── */
        .mc-tools {
          margin: var(--space-8) 0;
        }
        .mc-tools__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-3);
        }
        .mc-tool {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4) var(--space-5);
          background: #1a1816;
          border: 1px solid #2a2520;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }
        .mc-tool:hover {
          background: #222018;
          border-color: #c8943e40;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(200, 148, 62, 0.08);
        }
        .mc-tool__icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #c8943e20, #c8943e10);
          border: 1px solid #c8943e30;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 800;
          color: #c8943e;
          flex-shrink: 0;
        }
        .mc-tool__text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
          min-width: 0;
        }
        .mc-tool__name {
          font-size: var(--text-sm);
          font-weight: 700;
          color: #e8e0d4;
        }
        .mc-tool__desc {
          font-size: 0.75rem;
          color: #6a6560;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mc-tool__arrow {
          color: #3a352f;
          font-size: 1.1rem;
          transition: color 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .mc-tool:hover .mc-tool__arrow {
          color: #c8943e;
          transform: translateX(3px);
        }

        /* ── Buttons ── */
        .mc-btn {
          display: inline-flex;
          align-items: center;
          padding: 10px 20px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
        }
        .mc-btn--primary {
          background: linear-gradient(135deg, #c8943e, #b07e30);
          color: #0f0f0d;
          box-shadow: 0 2px 12px rgba(200, 148, 62, 0.25);
        }
        .mc-btn--primary:hover {
          box-shadow: 0 4px 20px rgba(200, 148, 62, 0.4);
          transform: translateY(-1px);
        }
        .mc-btn--ghost {
          background: transparent;
          color: #8a8074;
          border: 1px solid #3a352f;
        }
        .mc-btn--ghost:hover {
          border-color: #c8943e60;
          color: #c8943e;
        }

        /* ── Feed ── */
        .mc-feed {
          margin: var(--space-8) 0 var(--space-12);
        }
        .mc-feed__columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-6);
        }
        @media (max-width: 768px) {
          .mc-feed__columns { grid-template-columns: 1fr; }
        }

        /* ── List ── */
        .mc-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mc-list__item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          border-radius: 10px;
          transition: background 0.15s;
          text-decoration: none;
        }
        .mc-list__item:hover {
          background: #1a181640;
        }
        .mc-list__item--link {
          cursor: pointer;
        }
        .mc-list__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #c8943e;
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(200, 148, 62, 0.3);
        }
        .mc-list__dot--published { background: #22c55e; box-shadow: 0 0 8px rgba(34, 197, 94, 0.3); }
        .mc-list__dot--draft { background: #6a6560; box-shadow: none; }
        .mc-list__content {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
          min-width: 0;
        }
        .mc-list__title {
          font-size: var(--text-sm);
          font-weight: 600;
          color: #e8e0d4;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mc-list__meta {
          font-size: 0.7rem;
          color: #5a5550;
          text-transform: capitalize;
        }
        .mc-list__action {
          font-size: 0.7rem;
          font-weight: 700;
          color: #c8943e;
          text-decoration: none;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(200, 148, 62, 0.08);
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .mc-list__action:hover {
          background: rgba(200, 148, 62, 0.18);
        }

        /* ── Empty States ── */
        .mc-empty {
          font-size: var(--text-sm);
          color: #5a5550;
          padding: var(--space-6);
          text-align: center;
          background: #1a181620;
          border-radius: 10px;
          border: 1px dashed #2a2520;
        }
        .mc-empty a {
          color: #c8943e;
          text-decoration: none;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
