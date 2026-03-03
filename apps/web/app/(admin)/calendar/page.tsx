// apps/web/app/(admin)/calendar/page.tsx
// Calendar view — upcoming events and deadlines

import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Calendar' };

export default async function CalendarPage() {
  const now = new Date();
  const monthName = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Calendar</h1>
          <p className="admin-page-sub">{monthName} — Upcoming events and publish deadlines</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <a href="/events/new" className="admin-btn admin-btn--primary">+ New Event</a>
        </div>
      </div>

      <div className="cal-grid-section">
        <div className="cal-header">
          <button className="cal-nav-btn">←</button>
          <h2 className="cal-month">{monthName}</h2>
          <button className="cal-nav-btn">→</button>
        </div>

        <div className="cal-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="cal-day-header">{d}</div>
          ))}
          {/* Calendar day cells — placeholder grid */}
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className={`cal-day ${i === 14 ? 'cal-day--today' : ''}`}>
              <span className="cal-day__num">{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>
          Upcoming This Month
        </h3>
        <div className="admin-empty">
          <p className="admin-empty__text">
            No upcoming events. <a href="/events/new" style={{ color: 'var(--accent)' }}>Schedule one.</a>
          </p>
        </div>
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
          padding: var(--space-2) var(--space-3);
          border-right: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }
        .cal-day:nth-child(7n) { border-right: none; }
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
        }
      `}</style>
    </>
  );
}
