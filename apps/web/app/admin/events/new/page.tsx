'use client';

// apps/web/app/(admin)/events/new/page.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewEventPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const body: Record<string, unknown> = {
      name: fd.get('name'),
      date: fd.get('date') ? new Date(fd.get('date') as string).toISOString() : null,
      time: fd.get('time') || null,
      artist: fd.get('artist') || null,
      price: fd.get('price') || null,
      description: fd.get('description') || null,
      capacity: fd.get('capacity') ? parseInt(fd.get('capacity') as string, 10) : null,
      status: fd.get('status') || 'upcoming',
      stream: fd.get('stream') === 'true',
    };
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create event');
      }
      router.push('/admin/events');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">New Event</h1>
          <p className="admin-page-sub">Schedule a Blues Room session or live event</p>
        </div>
        <a href="/admin/events" className="admin-btn admin-btn--ghost">← Back</a>
      </div>
      {error && <div className="admin-error-banner">{error}</div>}
      <div className="admin-card">
        <form onSubmit={handleSubmit}>
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
              <input type="text" name="artist" className="admin-input" placeholder="e.g. Arrie Aslin & Rise Up" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Price</label>
              <input type="text" name="price" className="admin-input" placeholder="e.g. $15, Free, or Donations" />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea name="description" className="admin-textarea" rows={4} placeholder="What's the show? e.g. 'Open mic night at the Blues Room. Drop in, plug in, play. All levels welcome.'" />
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
              <input type="checkbox" name="stream" value="true" style={{ width: 16, height: 16, accentColor: 'var(--accent)' }} />
              <span className="admin-label" style={{ margin: 0 }}>Livestream this event</span>
            </label>
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
              {saving ? 'Creating…' : 'Create Event'}
            </button>
            <a href="/admin/events" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
