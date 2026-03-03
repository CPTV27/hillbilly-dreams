// apps/web/app/(admin)/contacts/[id]/edit/page.tsx
// Edit contact form

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Edit Contact' };

const CATEGORIES = ['artist', 'vendor', 'media', 'partner', 'guest', 'team'];

export default async function EditContactPage({ params }: { params: { id: string } }) {
  // TODO: const contact = await prisma.contact.findUnique({ where: { id: parseInt(params.id) } });
  // if (!contact) notFound();

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Contact</h1>
          <p className="admin-page-sub">Contact ID: {params.id}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <a href="/contacts" className="admin-btn admin-btn--ghost">← Back</a>
          <button className="admin-btn admin-btn--danger">Delete</button>
        </div>
      </div>

      <div className="admin-card">
        <form>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Name</label>
              <input
                type="text"
                name="name"
                className="admin-input"
                placeholder="Full name"
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Category</label>
              <select name="category" className="admin-select">
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Role / Title</label>
              <input
                type="text"
                name="role"
                className="admin-input"
                placeholder="e.g. Artist Manager"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Organization</label>
              <input
                type="text"
                name="organization"
                className="admin-input"
                placeholder="Band, label, company"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Email</label>
              <input
                type="email"
                name="email"
                className="admin-input"
                placeholder="contact@example.com"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="admin-input"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Notes</label>
            <textarea
              name="notes"
              className="admin-textarea"
              rows={6}
              placeholder="Internal notes — context, history, how we know them, last conversation..."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Last Contact Date</label>
            <input type="date" name="lastContact" className="admin-input" />
            <span
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-disabled)',
                marginTop: 'var(--space-1)',
                display: 'block',
              }}
            >
              The date you last reached out or heard from this contact.
            </span>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary">Save Changes</button>
            <a href="/contacts" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
