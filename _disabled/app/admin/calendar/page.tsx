'use client';

// apps/web/app/(admin)/calendar/page.tsx
// Calendar view — real grid with month navigation + event indicators

import { useState, useEffect, useCallback } from 'react';

interface CalEvent {
  id: number;
  name: string;
  date: string;
  time: string | null;
  artist: string | null;
  status: string;
}

function getMonthData(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  return { firstDay, daysInMonth, prevDays };
}

function formatMonthYear(year: number, month: number): string {
  return new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatEventDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/events');
      const json = await res.json();
      setEvents(json.data ?? []);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const goToPrev = () => {
    if (month === 0) { setYear(year - 1); setMonth(11); }
    else setMonth(month - 1);
  };

  const goToNext = () => {
    if (month === 11) { setYear(year + 1); setMonth(0); }
    else setMonth(month + 1);
  };

  const goToToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };

  const { firstDay, daysInMonth, prevDays } = getMonthData(year, month);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  // Map events to day numbers for current month
  const eventsByDay: Record<number, CalEvent[]> = {};
  events.forEach((ev) => {
    const d = new Date(ev.date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push(ev);
    }
  });

  // Events this month for sidebar
  const monthEvents = events
    .filter((ev) => {
      const d = new Date(ev.date);
      return d.getFullYear() === year && d.getMonth() === month;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Calendar</h1>
          <p className="admin-page-sub">{formatMonthYear(year, month)} — Events and deadlines</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button onClick={goToToday} className="admin-btn admin-btn--ghost">Today</button>
          <a href="/events/new" className="admin-btn admin-btn--primary">+ New Event</a>
        </div>
      </div>

      <div className="cal-grid-section">
        <div className="cal-header">
          <button onClick={goToPrev} className="cal-nav-btn">←</button>
          <h2 className="cal-month">{formatMonthYear(year, month)}</h2>
          <button onClick={goToNext} className="cal-nav-btn">→</button>
        </div>

        <div className="cal-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="cal-day-header">{d}</div>
          ))}
          {Array.from({ length: totalCells }).map((_, i) => {
            const dayNum = i - firstDay + 1;
            const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
            const displayNum = isCurrentMonth
              ? dayNum
              : dayNum < 1
              ? prevDays + dayNum
              : dayNum - daysInMonth;
            const dayEvents = isCurrentMonth ? (eventsByDay[dayNum] || []) : [];

            return (
              <div
                key={i}
                className={`cal-day ${isCurrentMonth ? '' : 'cal-day--outside'} ${isCurrentMonth && isToday(dayNum) ? 'cal-day--today' : ''}`}
              >
                <span className="cal-day__num">{displayNum}</span>
                {dayEvents.slice(0, 2).map((ev) => (
                  <a key={ev.id} href={`/events/${ev.id}/edit`} className="cal-event-dot" title={ev.name}>
                    {ev.name.length > 14 ? ev.name.slice(0, 14) + '…' : ev.name}
                  </a>
                ))}
                {dayEvents.length > 2 && (
                  <span className="cal-event-more">+{dayEvents.length - 2} more</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>
          Events This Month
        </h3>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton skeleton--text" style={{ width: `${60 + i * 10}%`, height: 16 }} />
            ))}
          </div>
        ) : monthEvents.length === 0 ? (
          <div className="admin-empty" style={{ padding: 'var(--space-8) var(--space-4)' }}>
            <p className="admin-empty__text">
              No events this month. <a href="/events/new" style={{ color: 'var(--accent)' }}>Schedule one.</a>
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {monthEvents.map((ev) => (
              <a key={ev.id} href={`/events/${ev.id}/edit`} className="cal-month-event">
                <span className="cal-month-event__date">{formatEventDate(ev.date)}</span>
                <span className="cal-month-event__name">{ev.name}</span>
                {ev.artist && <span className="cal-month-event__artist">{ev.artist}</span>}
                <span className={`admin-badge admin-badge--${ev.status}`}>{ev.status}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .cal-grid-section {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .cal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4) var(--space-5);
          border-bottom: 1px solid var(--border);
        }
        .cal-month {
          font-size: var(--text-md);
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }
        .cal-nav-btn {
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          cursor: pointer;
          padding: var(--space-1) var(--space-3);
          font-size: var(--text-sm);
          transition: all var(--duration-fast) var(--ease-default);
        }
        .cal-nav-btn:hover { color: var(--text); border-color: var(--border-strong); }
        .cal-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }
        .cal-day-header {
          padding: var(--space-2) var(--space-3);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }
        .cal-day {
          min-height: 80px;
          padding: var(--space-2) var(--space-2);
          border-right: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cal-day:nth-child(7n+7) { border-right: none; }
        .cal-day--outside {
          opacity: 0.3;
        }
        .cal-day--today .cal-day__num {
          background: var(--accent);
          color: var(--bg);
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cal-day__num {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          margin-bottom: 2px;
        }
        .cal-event-dot {
          font-size: 10px;
          color: var(--accent);
          background: var(--accent-muted);
          border-radius: 3px;
          padding: 1px 4px;
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          transition: background var(--duration-fast) var(--ease-default);
        }
        .cal-event-dot:hover { background: var(--accent); color: var(--bg); }
        .cal-event-more {
          font-size: 10px;
          color: var(--text-disabled);
        }
        .cal-month-event {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: background var(--duration-fast) var(--ease-default);
        }
        .cal-month-event:hover { background: var(--bg); }
        .cal-month-event__date {
          font-size: var(--text-xs);
          font-family: var(--font-mono);
          color: var(--text-disabled);
          min-width: 60px;
          flex-shrink: 0;
        }
        .cal-month-event__name {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text);
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cal-month-event__artist {
          font-size: var(--text-xs);
          color: var(--text-muted);
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
}
