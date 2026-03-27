'use client';

// apps/web/app/(admin)/contacts/[id]/edit/page.tsx

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['artist', 'vendor', 'media', 'partner', 'guest', 'team'];

interface Contact {
  id: number;
  name: string;
  role: string | null;
  organization: string | null;
  email: string | null;
  phone: string | null;
  category: string | null;
  notes: string | null;
  lastContact: string | null;
}

export default function EditContactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/contacts/${id}`)
      .then((r) => { if (r.status === 404) { setNotFound(true); return null; } return r.json(); })
      .then((data) => { if (data) setContact(data); })
      .catch(() => setError('Failed to load contact.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const body: Record<string, unknown> = {
      name: fd.get('name'),
      category: fd.get('category') || null,
      role: fd.get('role') || null,
      organization: fd.get('organization') || null,
      email: fd.get('email') || null,
      phone: fd.get('phone') || null,
      notes: fd.get('notes') || null,
      lastContact: fd.get('lastContact') ? new Date(fd.get('lastContact') as string).toISOString() : null,
    };
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to save');
      router.push('/contacts');
    } catch { setError('Failed to save contact.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this contact? This cannot be undone.')) return;
    try {
      await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      router.push('/contacts');
    } catch { alert('Failed to delete.'); }
  };

  if (loading) return (
    <div className="admin-page-header"><div><h1 className="admin-page-title">Loading…</h1></div></div>
  );

  if (notFound) return (
    <div className="admin-page-header">
      <div>
        <h1 className="admin-page-title">Contact Not Found</h1>
        <p className="admin-page-sub">This contact may have been deleted.</p>
      </div>
      <a href="/contacts" className="admin-btn admin-btn--ghost">← Back</a>
    </div>
  );

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Contact</h1>
          <p className="admin-page-sub">{contact?.name}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <a href="/contacts" className="admin-btn admin-btn--ghost">← Back</a>
          <button onClick={handleDelete} className="admin-btn admin-btn--danger">Delete</button>
        </div>
      </div>
      {error && <div className="admin-error-banner">{error}</div>}
      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Name</label>
              <input type="text" name="name" className="admin-input" defaultValue={contact?.name ?? ''} required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Category</label>
              <select name="category" className="admin-select" defaultValue={contact?.category ?? ''}>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Role / Title</label>
              <input type="text" name="role" className="admin-input" defaultValue={contact?.role ?? ''} placeholder="e.g. Artist Manager" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Organization</label>
              <input type="text" name="organization" className="admin-input" defaultValue={contact?.organization ?? ''} placeholder="Band, label, company" />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Email</label>
              <input type="email" name="email" className="admin-input" defaultValue={contact?.email ?? ''} placeholder="contact@example.com" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Phone</label>
              <input type="tel" name="phone" className="admin-input" defaultValue={contact?.phone ?? ''} placeholder="+1 (555) 000-0000" />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Notes</label>
            <textarea name="notes" className="admin-textarea" rows={6} defaultValue={contact?.notes ?? ''} placeholder="Internal notes — context, history, how we know them..." />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Last Contact Date</label>
            <input type="date" name="lastContact" className="admin-input" defaultValue={contact?.lastContact ? new Date(contact.lastContact).toISOString().split('T')[0] : ''} />
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            <a href="/contacts" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
