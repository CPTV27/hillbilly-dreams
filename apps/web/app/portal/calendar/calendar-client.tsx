'use client';

// apps/web/app/portal/calendar/calendar-client.tsx
// Content calendar view — read-only for clients
//
// Usage: /portal/calendar?client=1

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface CalendarPost {
  day: number;
  platform: string;
  content: string;
  type: string;
  category: string;
  hashtags?: string[];
}

interface Calendar {
  id: number;
  month: number;
  year: number;
  posts: CalendarPost[];
  status: string;
}

const MONTH_NAMES = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

export default function PortalCalendarClient() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('client');
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [selected, setSelected] = useState<Calendar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;
    fetch(`${baseUrl}/api/clients/${clientId}/calendar`)
      .then(r => r.json())
      .then(d => {
        const cals: Calendar[] = d.data || [];
        setCalendars(cals);
        if (cals.length > 0) setSelected(cals[0]);
      })
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) {
    return (
      <p style={{ textAlign: 'center', color: 'var(--text-muted, #8a8074)', padding: '64px 0' }}
        role="status" aria-live="polite">
        Loading calendar...
      </p>
    );
  }

  if (calendars.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-muted, #8a8074)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text, #2a2520)', marginBottom: '12px' }}>
          Content Calendar
        </h1>
        <p>Your Big Muddy team is working on your first content plan.</p>
      </div>
    );
  }

  const posts = Array.isArray(selected?.posts) ? selected!.posts : [];
  const grouped = posts.reduce<Record<number, CalendarPost[]>>((acc, post) => {
    const day = post.day || 1;
    if (!acc[day]) acc[day] = [];
    acc[day].push(post);
    return acc;
  }, {});

  return (
    <>
      <div className="portal-cal-header">
        <h1 className="portal-cal-title">Content Calendar</h1>
        <label htmlFor="cal-month-select" className="portal-cal-label">Month</label>
        <select
          id="cal-month-select"
          value={selected?.id ?? ''}
          onChange={e => setSelected(calendars.find(c => c.id === Number(e.target.value)) || null)}
          className="portal-cal-select"
          aria-label="Select calendar month"
        >
          {calendars.map(c => (
            <option key={c.id} value={c.id}>
              {MONTH_NAMES[c.month]} {c.year}
            </option>
          ))}
        </select>
      </div>

      <div className="portal-cal-meta">
        <span className="portal-tier-badge">{selected?.status}</span>
        <span className="portal-cal-count">{posts.length} posts planned</span>
      </div>

      <div className="portal-calendar-grid" role="list" aria-label="Content calendar days">
        {Object.entries(grouped)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([day, dayPosts]) => (
            <div key={day} className="portal-calendar-day" role="listitem">
              <div className="portal-calendar-day__header">
                <time dateTime={`${selected?.year}-${String(selected?.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`}>
                  Day {day}
                </time>
              </div>
              {dayPosts.map((post, i) => (
                <article key={i} className="portal-calendar-post">
                  <div className="portal-calendar-post__meta">
                    <span className="portal-platform-badge">{post.platform}</span>
                    <span className="portal-type-badge">{post.type}</span>
                  </div>
                  <p className="portal-calendar-post__content">{post.content}</p>
                  {post.hashtags && post.hashtags.length > 0 && (
                    <p className="portal-calendar-post__tags">
                      {post.hashtags.map(h => h.startsWith('#') ? h : `#${h}`).join(' ')}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ))}
      </div>

      <style>{`
        .portal-cal-header {
          display: flex;
          align-items: center;
          gap: var(--space-3, 12px);
          margin-bottom: var(--space-6, 24px);
          flex-wrap: wrap;
        }
        .portal-cal-title {
          flex: 1;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text, #2a2520);
          margin: 0;
          letter-spacing: -0.01em;
        }
        .portal-cal-label {
          font-size: var(--text-xs, 12px);
          font-weight: 600;
          color: var(--text-muted, #8a8074);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .portal-cal-select {
          padding: 8px 12px;
          border: 1px solid var(--border, #e5e2dc);
          border-radius: var(--radius-sm, 4px);
          background: var(--surface, #fff);
          color: var(--text, #2a2520);
          font-size: var(--text-sm, 14px);
          font-family: var(--font-body, system-ui, sans-serif);
          cursor: pointer;
          transition: border-color 0.15s ease;
          outline: none;
        }
        .portal-cal-select:focus {
          border-color: var(--accent, #c8553d);
        }
        .portal-cal-meta {
          display: flex;
          align-items: center;
          gap: var(--space-3, 12px);
          margin-bottom: var(--space-6, 24px);
        }
        .portal-cal-count {
          font-size: var(--text-sm, 14px);
          color: var(--text-muted, #8a8074);
        }
        .portal-tier-badge {
          display: inline-block;
          padding: 2px 8px;
          background: var(--accent-muted, rgba(200, 85, 61, 0.12));
          color: var(--accent, #c8553d);
          font-size: var(--text-xs, 12px);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: var(--radius-sm, 4px);
        }
        .portal-calendar-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-4, 16px);
        }
        .portal-calendar-day {
          background: var(--surface, #fff);
          border: 1px solid var(--border, #e5e2dc);
          border-radius: var(--radius-md, 8px);
          overflow: hidden;
        }
        .portal-calendar-day__header {
          padding: var(--space-3, 12px) var(--space-4, 16px);
          background: var(--bg, #faf9f6);
          font-size: var(--text-sm, 14px);
          font-weight: 700;
          color: var(--text, #2a2520);
          border-bottom: 1px solid var(--border, #e5e2dc);
        }
        .portal-calendar-post {
          padding: var(--space-4, 16px);
          border-bottom: 1px solid var(--border-subtle, #f0ede8);
        }
        .portal-calendar-post:last-child {
          border-bottom: none;
        }
        .portal-calendar-post__meta {
          display: flex;
          gap: var(--space-2, 8px);
          margin-bottom: var(--space-2, 8px);
          flex-wrap: wrap;
        }
        .portal-platform-badge,
        .portal-type-badge {
          display: inline-block;
          padding: 2px 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 3px;
        }
        .portal-platform-badge {
          background: var(--accent-muted, rgba(200, 85, 61, 0.12));
          color: var(--accent, #c8553d);
        }
        .portal-type-badge {
          background: var(--surface-2, #f0ede8);
          color: var(--text-muted, #8a8074);
        }
        .portal-calendar-post__content {
          font-size: var(--text-sm, 14px);
          color: var(--text, #2a2520);
          line-height: 1.6;
          margin: 0 0 var(--space-2, 8px);
          white-space: pre-wrap;
        }
        .portal-calendar-post__tags {
          font-size: var(--text-xs, 12px);
          color: var(--accent, #c8553d);
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </>
  );
}
