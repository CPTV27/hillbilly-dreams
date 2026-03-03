// apps/web/app/(admin)/events/[id]/edit/page.tsx
// Edit event form

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Edit Event' };

export default async function EditEventPage({ params }: { params: { id: string } }) {
  // TODO: const event = await prisma.event.findUnique({ where: { id: parseInt(params.id) } });
  // if (!event) notFound();

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Event</h1>
          <p className="admin-page-sub">Event ID: {params.id}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <a href="/events" className="admin-btn admin-btn--ghost">← Back</a>
          <button className="admin-btn admin-btn--danger">Delete</button>
        </div>
      </div>

      <div className="admin-card">
        <form>
          <div className="admin-form-group">
            <label className="admin-label admin-label--required">Event Name</label>
            <input
              type="text"
              name="name"
              className="admin-input"
              placeholder="e.g. Blues Room Live — Delta Night"
              required
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Date</label>
              <input type="date" name="date" className="admin-input" required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Time</label>
              <input
                type="text"
                name="time"
                className="admin-input"
                placeholder="e.g. 8:00 PM CT"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Artist / Performer</label>
              <input
                type="text"
                name="artist"
                className="admin-input"
                placeholder="Artist name"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Price</label>
              <input
                type="text"
                name="price"
                className="admin-input"
                placeholder="e.g. $25 or Free"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea
              name="description"
              className="admin-textarea"
              rows={4}
              placeholder="Event description"
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Capacity</label>
              <input
                type="number"
                name="capacity"
                className="admin-input"
                placeholder="40"
                min="1"
                defaultValue={40}
              />
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
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                name="stream"
                value="true"
                style={{ width: 16, height: 16, accentColor: 'var(--accent)' }}
              />
              <span className="admin-label" style={{ margin: 0 }}>
                Livestream this event
              </span>
            </label>
            <span
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-disabled)',
                marginTop: 'var(--space-1)',
                marginLeft: 'calc(16px + var(--space-3))',
                display: 'block',
              }}
            >
              Shows stream badge on Radio and Touring pages. Restream integration in Phase 3.
            </span>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary">Save Changes</button>
            <a href="/events" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
