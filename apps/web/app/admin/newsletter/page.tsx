// apps/web/app/(admin)/newsletter/page.tsx

import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Newsletter' };

export default async function NewsletterAdminPage() {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Newsletter</h1>
          <p className="admin-page-sub">Big Muddy Dispatch issues — draft, schedule, send</p>
        </div>
        <a href="/newsletter/new" className="admin-btn admin-btn--primary">+ New Issue</a>
      </div>
      <div className="admin-filter-bar">
        {['All', 'Draft', 'Scheduled', 'Sent'].map((f) => (
          <button key={f} className={`admin-filter-btn ${f === 'All' ? 'admin-filter-btn--active' : ''}`}>{f}</button>
        ))}
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th><th>Subject</th><th>Story</th><th>Status</th><th>Send Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={6}><div className="admin-empty"><p className="admin-empty__text">No issues yet. <a href="/newsletter/new" style={{ color: 'var(--accent)' }}>Draft the first dispatch.</a></p></div></td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
