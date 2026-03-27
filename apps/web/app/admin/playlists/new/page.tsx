'use client';

// apps/web/app/(admin)/playlists/new/page.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPlaylistPage() {
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
      description: fd.get('description') || null,
      trackCount: fd.get('trackCount') ? parseInt(fd.get('trackCount') as string, 10) : 0,
      status: fd.get('status') || 'active',
      spotifyUrl: fd.get('spotifyUrl') || null,
      coverImage: fd.get('coverImage') || null,
    };
    try {
      const res = await fetch('/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create playlist');
      }
      router.push('/playlists');
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
          <h1 className="admin-page-title">New Playlist</h1>
          <p className="admin-page-sub">Add a radio playlist</p>
        </div>
        <a href="/playlists" className="admin-btn admin-btn--ghost">← Back</a>
      </div>
      {error && <div className="admin-error-banner">{error}</div>}
      <div className="admin-card">
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
              {saving ? 'Creating…' : 'Create Playlist'}
            </button>
            <a href="/playlists" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
