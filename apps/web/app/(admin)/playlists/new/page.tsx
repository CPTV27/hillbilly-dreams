// apps/web/app/(admin)/playlists/new/page.tsx

import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'New Playlist' };

export default function NewPlaylistPage() {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">New Playlist</h1>
          <p className="admin-page-sub">Add a radio playlist</p>
        </div>
        <a href="/playlists" className="admin-btn admin-btn--ghost">← Back</a>
      </div>
      <div className="admin-card">
        <form>
          <div className="admin-form-group">
            <label className="admin-label admin-label--required">Name</label>
            <input type="text" name="name" className="admin-input" placeholder="Playlist name" required />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea name="description" className="admin-textarea" rows={3} placeholder="What defines this playlist?" />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Track Count</label>
              <input type="number" name="trackCount" className="admin-input" placeholder="0" min="0" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Status</label>
              <select name="status" className="admin-select">
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Spotify URL</label>
            <input type="url" name="spotifyUrl" className="admin-input" placeholder="https://open.spotify.com/playlist/..." />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Cover Image URL</label>
            <input type="url" name="coverImage" className="admin-input" placeholder="https://cdn.bigmuddytouring.com/..." />
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary">Create Playlist</button>
            <a href="/playlists" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
