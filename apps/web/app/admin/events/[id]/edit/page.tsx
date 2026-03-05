'use client';

// apps/web/app/(admin)/events/[id]/edit/page.tsx

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

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
}

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((r) => { if (r.status === 404) { setNotFound(true); return null; } return r.json(); })
      .then((data) => { if (data) setEvent(data); })
      .catch(() => setError('Failed to load event.'))
      .finally(() => setLoading(false));
  }, [id]);

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
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to save');
      router.push('/events');
    } catch { setError('Failed to save event.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this event? This cannot be undone.')) return;
    try {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
      router.push('/events');
    } catch { alert('Failed to delete.'); }
  };

  if (loading) return (
    <div className="admin-page-header"><div><h1 className="admin-page-title">Loading…</h1></div></div>
  );
  if (notFound) return (
    <div className="admin-page-header">
      <div><h1 className="admin-page-title">Event Not Found</h1><p className="admin-page-sub">This event may have been deleted.</p></div>
      <a href="/events" className="admin-btn admin-btn--ghost">← Back</a>
    </div>
  );

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Event</h1>
          <p className="admin-page-sub">{event?.name}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <a href="/events" className="admin-btn admin-btn--ghost">← Back</a>
          <button onClick={handleDelete} className="admin-btn admin-btn--danger">Delete</button>
        </div>
      </div>
      {error && <div className="admin-error-banner">{error}</div>}
      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label admin-label--required">Event Name</label>
            <input type="text" name="name" className="admin-input" defaultValue={event?.name ?? ''} required />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Date</label>
              <input type="date" name="date" className="admin-input" defaultValue={event?.date ? new Date(event.date).toISOString().split('T')[0] : ''} required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Time</label>
              <input type="text" name="time" className="admin-input" defaultValue={event?.time ?? ''} placeholder="e.g. 8:00 PM CT" />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Artist / Performer</label>
              <input type="text" name="artist" className="admin-input" defaultValue={event?.artist ?? ''} placeholder="Artist name" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Price</label>
              <input type="text" name="price" className="admin-input" defaultValue={event?.price ?? ''} placeholder="e.g. $25 or Free" />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea name="description" className="admin-textarea" rows={4} defaultValue={event?.description ?? ''} placeholder="Event description" />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Capacity</label>
              <input type="number" name="capacity" className="admin-input" defaultValue={event?.capacity ?? 40} min="1" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Status</label>
              <select name="status" className="admin-select" defaultValue={event?.status ?? 'upcoming'} required>
                <option value="upcoming">Upcoming</option>
                <option value="sold-out">Sold Out</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="admin-form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
              <input type="checkbox" name="stream" value="true" defaultChecked={event?.stream ?? false} style={{ width: 16, height: 16, accentColor: 'var(--accent)' }} />
              <span className="admin-label" style={{ margin: 0 }}>Livestream this event</span>
            </label>
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            <a href="/events" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
