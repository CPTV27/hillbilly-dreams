'use client';

// apps/web/app/(admin)/contacts/new/page.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { value: 'artist', label: 'Artist / Musician' },
  { value: 'vendor', label: 'Vendor' },
  { value: 'media', label: 'Media / Press' },
  { value: 'partner', label: 'Partner' },
  { value: 'guest', label: 'Guest' },
  { value: 'team', label: 'Team Member' },
];

export default function NewContactPage() {
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
      category: fd.get('category') || null,
      role: fd.get('role') || null,
      organization: fd.get('organization') || null,
      email: fd.get('email') || null,
      phone: fd.get('phone') || null,
      notes: fd.get('notes') || null,
      lastContact: fd.get('lastContact') ? new Date(fd.get('lastContact') as string).toISOString() : null,
    };
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create contact');
      }
      router.push('/admin/contacts');
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
          <h1 className="admin-page-title">New Contact</h1>
          <p className="admin-page-sub">Add a contact to the CRM</p>
        </div>
        <a href="/admin/contacts" className="admin-btn admin-btn--ghost">← Back</a>
      </div>
      {error && <div className="admin-error-banner">{error}</div>}
      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Name</label>
              <input type="text" name="name" className="admin-input" placeholder="Full name" required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Type of Contact</label>
              <select name="category" className="admin-select">
                <option value="">Select type</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Role / Title</label>
              <input type="text" name="role" className="admin-input" placeholder="e.g. Artist Manager" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Organization</label>
              <input type="text" name="organization" className="admin-input" placeholder="Band, label, company" />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Email</label>
              <input type="email" name="email" className="admin-input" placeholder="contact@example.com" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Phone</label>
              <input type="tel" name="phone" className="admin-input" placeholder="+1 (555) 000-0000" />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Notes</label>
            <textarea name="notes" className="admin-textarea" rows={5} placeholder="Internal notes — context, history, how we know them..." />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Last Contact Date</label>
            <input type="date" name="lastContact" className="admin-input" />
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
              {saving ? 'Saving…' : 'Add Contact'}
            </button>
            <a href="/admin/contacts" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
