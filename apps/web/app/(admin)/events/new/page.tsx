// apps/web/app/(admin)/events/new/page.tsx

import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'New Event' };

export default function NewEventPage() {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">New Event</h1>
          <p className="admin-page-sub">Schedule a Blues Room session or live event</p>
        </div>
        <a href="/events" className="admin-btn admin-btn--ghost">← Back</a>
      </div>
      <div className="admin-card">
        <form>
          <div className="admin-form-group">
            <label className="admin-label admin-label--required">Event Name</label>
            <input type="text" name="name" className="admin-input" placeholder="e.g. Blues Room Live — Delta Night" required />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Date</label>
              <input type="date" name="date" className="admin-input" required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Time</label>
              <input type="text" name="time" className="admin-input" placeholder="e.g. 8:00 PM CT" />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Artist / Performer</label>
              <input type="text" name="artist" className="admin-input" placeholder="Artist name" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Price</label>
              <input type="text" name="price" className="admin-input" placeholder="e.g. $25 or Free" />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea name="description" className="admin-textarea" rows={4} placeholder="Event description" />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Capacity</label>
              <input type="number" name="capacity" className="admin-input" placeholder="40" min="1" defaultValue={40} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Status</label>
              <select name="status" className="admin-select" required>
                <option value="upcoming">Upcoming</option>
                <option value="sold-out">Sold Out</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="admin-form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
              <input type="checkbox" name="stream" value="true"
                style={{ width: 16, height: 16, accentColor: 'var(--accent)' }} />
              <span className="admin-label" style={{ margin: 0 }}>Livestream this event</span>
            </label>
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary">Create Event</button>
            <a href="/events" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
