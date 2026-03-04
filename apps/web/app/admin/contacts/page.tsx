// apps/web/app/(admin)/contacts/page.tsx

import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Contacts' };

const CATEGORIES = ['All', 'Artist', 'Vendor', 'Media', 'Partner', 'Guest', 'Team'];

export default async function ContactsAdminPage() {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Contacts</h1>
          <p className="admin-page-sub">CRM — artists, vendors, media, partners, guests, team</p>
        </div>
        <a href="/contacts/new" className="admin-btn admin-btn--primary">+ New Contact</a>
      </div>
      <div className="admin-filter-bar">
        {CATEGORIES.map((f) => (
          <button key={f} className={`admin-filter-btn ${f === 'All' ? 'admin-filter-btn--active' : ''}`}>{f}</button>
        ))}
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th><th>Role</th><th>Organization</th><th>Email</th><th>Category</th><th>Last Contact</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={7}><div className="admin-empty"><p className="admin-empty__text">No contacts yet. <a href="/contacts/new" style={{ color: 'var(--accent)' }}>Add the first one.</a></p></div></td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
