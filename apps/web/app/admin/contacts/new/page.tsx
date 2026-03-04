// apps/web/app/(admin)/contacts/new/page.tsx

import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'New Contact' };

const CATEGORIES = ['artist', 'vendor', 'media', 'partner', 'guest', 'team'];

export default function NewContactPage() {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">New Contact</h1>
          <p className="admin-page-sub">Add a contact to the CRM</p>
        </div>
        <a href="/contacts" className="admin-btn admin-btn--ghost">← Back</a>
      </div>
      <div className="admin-card">
        <form>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Name</label>
              <input type="text" name="name" className="admin-input" placeholder="Full name" required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Category</label>
              <select name="category" className="admin-select">
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
            <textarea name="notes" className="admin-textarea" rows={5}
              placeholder="Internal notes — context, history, how we know them..." />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Last Contact Date</label>
            <input type="date" name="lastContact" className="admin-input" />
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary">Add Contact</button>
            <a href="/contacts" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
