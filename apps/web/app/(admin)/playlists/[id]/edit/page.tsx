// apps/web/app/(admin)/playlists/[id]/edit/page.tsx
// Edit playlist form

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Edit Playlist' };

export default async function EditPlaylistPage({ params }: { params: { id: string } }) {
  // TODO: const playlist = await prisma.playlist.findUnique({ where: { id: parseInt(params.id) } });
  // if (!playlist) notFound();

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Playlist</h1>
          <p className="admin-page-sub">Playlist ID: {params.id}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <a href="/playlists" className="admin-btn admin-btn--ghost">← Back</a>
          <button className="admin-btn admin-btn--danger">Delete</button>
        </div>
      </div>

      <div className="admin-card">
        <form>
          <div className="admin-form-group">
            <label className="admin-label admin-label--required">Name</label>
            <input
              type="text"
              name="name"
              className="admin-input"
              placeholder="Playlist name"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea
              name="description"
              className="admin-textarea"
              rows={3}
              placeholder="What defines this playlist?"
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Track Count</label>
              <input
                type="number"
                name="trackCount"
                className="admin-input"
                placeholder="0"
                min="0"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Status</label>
              <select name="status" className="admin-select" required>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Spotify URL</label>
            <input
              type="url"
              name="spotifyUrl"
              className="admin-input"
              placeholder="https://open.spotify.com/playlist/..."
            />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginTop: 'var(--space-1)', display: 'block' }}>
              Full Spotify playlist URL or spotify:playlist: URI
            </span>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              className="admin-input"
              placeholder="https://cdn.bigmuddytouring.com/..."
            />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginTop: 'var(--space-1)', display: 'block' }}>
              Cloudflare R2 URL. Leave blank to use Spotify cover art.
            </span>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary">Save Changes</button>
            <a href="/playlists" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
