// apps/web/app/(admin)/playlists/page.tsx

import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Playlists' };

export default async function PlaylistsAdminPage() {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Playlists</h1>
          <p className="admin-page-sub">Radio playlists — curate the corridor</p>
        </div>
        <a href="/playlists/new" className="admin-btn admin-btn--primary">+ New Playlist</a>
      </div>
      <div className="admin-filter-bar">
        {['All', 'Active', 'Archived'].map((f) => (
          <button key={f} className={`admin-filter-btn ${f === 'All' ? 'admin-filter-btn--active' : ''}`}>{f}</button>
        ))}
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th><th>Description</th><th>Tracks</th><th>Spotify</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={6}><div className="admin-empty"><p className="admin-empty__text">No playlists yet. <a href="/playlists/new" style={{ color: 'var(--accent)' }}>Create the first one.</a></p></div></td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
