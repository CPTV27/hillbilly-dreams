'use client';

// apps/web/app/(admin)/events/page.tsx
// Event management — fetches from /api/events, supports status filter, delete

import { useState, useMemo, useEffect, useCallback } from 'react';

const STATUS_FILTERS = ['all', 'upcoming', 'sold-out', 'completed', 'cancelled'];

interface Event {
  id: number;
  name: string;
  date: string;
  time: string | null;
  artist: string | null;
  description: string | null;
  price: string | null;
  capacity: number | null;
  status: string;
  stream: boolean;
  createdAt: string;
  updatedAt: string;
}

function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function SkeletonRow() {
  return (
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton--text" style={{ width: '70%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '50%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '55%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '40%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '35%' }} /></td>
      <td><div className="skeleton skeleton--badge" /></td>
      <td><div className="skeleton skeleton--badge" /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '40%' }} /></td>
    </tr>
  );
}

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch('/api/events');
      const json = await res.json();
      setEvents(json.data ?? []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Failed to load events.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete event.');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = useMemo(() => {
    let result = events.filter((e) => {
      return statusFilter === 'all' || e.status === statusFilter;
    });
    // Sort by date ascending for events
    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return result;
  }, [events, statusFilter]);

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Events</h1>
          <p className="admin-page-sub">
            {loading ? '…' : `${events.length} events total · ${filtered.length} shown`}
          </p>
        </div>
        <a href="/events/new" className="admin-btn admin-btn--primary">+ New Event</a>
      </div>

      {error && (
        <div className="admin-error-banner">
          {error}
          <button onClick={fetchEvents} className="admin-btn admin-btn--ghost" style={{ marginLeft: 'var(--space-3)' }}>Retry</button>
        </div>
      )}

      <div className="admin-filter-bar">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`admin-filter-btn ${statusFilter === s ? 'admin-filter-btn--active' : ''}`}
          >
            {s === 'all' ? 'All' : s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="admin-table-wrap events-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th><th>Artist</th><th>Date</th><th>Time</th><th>Price</th><th>Stream</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>{Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}</>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={8}>
                <div className="admin-empty">
                  <div className="admin-empty__icon">◷</div>
                  <p className="admin-empty__text">No events match your filters.</p>
                </div>
              </td></tr>
            ) : (
              filtered.map((event) => (
                <tr key={event.id} className={actionLoading === event.id ? 'row-loading' : ''}>
                  <td>
                    <a href={`/events/${event.id}/edit`} className="events-name-link">{event.name}</a>
                  </td>
                  <td><span className="events-meta">{event.artist ?? '—'}</span></td>
                  <td><span className="events-date">{formatDate(event.date)}</span></td>
                  <td><span className="events-meta">{event.time ?? '—'}</span></td>
                  <td><span className="events-meta">{event.price ?? '—'}</span></td>
                  <td>
                    {event.stream ? (
                      <span className="events-stream-badge">● Live</span>
                    ) : (
                      <span className="events-meta">—</span>
                    )}
                  </td>
                  <td>
                    <span className={`admin-badge admin-badge--${event.status}`}>{event.status.split('-').join(' ')}</span>
                  </td>
                  <td>
                    <div className="events-actions">
                      <a href={`/events/${event.id}/edit`} className="admin-btn admin-btn--ghost events-action-btn">Edit</a>
                      <button
                        onClick={() => handleDelete(event.id, event.name)}
                        className="admin-btn admin-btn--danger events-action-btn"
                        disabled={actionLoading === event.id}
                      >
                        {actionLoading === event.id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="events-mobile-list">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="event-mobile-card">
              <div className="skeleton skeleton--badge" style={{ marginBottom: 'var(--space-3)' }} />
              <div className="skeleton skeleton--text" style={{ width: '80%', marginBottom: 'var(--space-2)' }} />
              <div className="skeleton skeleton--text" style={{ width: '50%' }} />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty__icon">◷</div>
            <p className="admin-empty__text">No events match your filters.</p>
          </div>
        ) : (
          filtered.map((event) => (
            <div key={event.id} className={`event-mobile-card ${actionLoading === event.id ? 'row-loading' : ''}`}>
              <div className="event-mobile-card__top">
                <span className={`admin-badge admin-badge--${event.status}`}>{event.status.split('-').join(' ')}</span>
                <span className="events-date">{formatDate(event.date)}</span>
              </div>
              <a href={`/events/${event.id}/edit`} className="events-name-link event-mobile-card__name">{event.name}</a>
              <div className="event-mobile-card__meta">
                {event.artist && <span className="events-meta">{event.artist}</span>}
                {event.time && <span className="events-meta">{event.time}</span>}
                {event.price && <span className="events-meta">{event.price}</span>}
                {event.stream && <span className="events-stream-badge">● Live</span>}
              </div>
              <div className="events-actions" style={{ marginTop: 'var(--space-3)' }}>
                <a href={`/events/${event.id}/edit`} className="admin-btn admin-btn--ghost events-action-btn">Edit</a>
                <button
                  onClick={() => handleDelete(event.id, event.name)}
                  className="admin-btn admin-btn--danger events-action-btn"
                  disabled={actionLoading === event.id}
                >
                  {actionLoading === event.id ? '…' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .events-table-wrap { display: none; }
        @media (min-width: 768px) {
          .events-table-wrap { display: block; }
          .events-mobile-list { display: none; }
        }
        .events-name-link {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .events-name-link:hover { color: var(--accent-hover); text-decoration: underline; }
        .events-meta { font-size: var(--text-sm); color: var(--text-muted); }
        .events-date {
          font-size: var(--text-xs);
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .events-stream-badge {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--error, #ef4444);
          letter-spacing: var(--tracking-wide);
        }
        .events-actions { display: flex; gap: var(--space-2); }
        .events-action-btn {
          font-size: var(--text-xs);
          padding: var(--space-1) var(--space-3);
        }
        .events-mobile-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .event-mobile-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-4);
        }
        .event-mobile-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-2);
        }
        .event-mobile-card__name {
          display: block;
          font-size: var(--text-md);
          margin-bottom: var(--space-2);
        }
        .event-mobile-card__meta {
          display: flex;
          gap: var(--space-3);
          flex-wrap: wrap;
          align-items: center;
        }
        .event-mobile-card__meta > * { font-size: var(--text-xs); }
      `}</style>
    </>
  );
}
