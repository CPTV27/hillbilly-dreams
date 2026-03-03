// apps/web/app/(admin)/events/page.tsx

import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Events' };

export default async function EventsAdminPage() {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Events</h1>
          <p className="admin-page-sub">Blues Room sessions and live events</p>
        </div>
        <a href="/events/new" className="admin-btn admin-btn--primary">+ New Event</a>
      </div>
      <div className="admin-filter-bar">
        {['All', 'Upcoming', 'Sold Out', 'Completed', 'Cancelled'].map((f) => (
          <button key={f} className={`admin-filter-btn ${f === 'All' ? 'admin-filter-btn--active' : ''}`}>{f}</button>
        ))}
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th><th>Artist</th><th>Date</th><th>Time</th><th>Price</th><th>Stream</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={8}><div className="admin-empty"><p className="admin-empty__text">No events yet. <a href="/events/new" style={{ color: 'var(--accent)' }}>Schedule one.</a></p></div></td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
