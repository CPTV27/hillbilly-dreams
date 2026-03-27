'use client';

// apps/web/app/(admin)/playlists/[id]/edit/page.tsx

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

interface Playlist {
  id: number;
  name: string;
  description: string | null;
  trackCount: number;
  spotifyUrl: string | null;
  coverImage: string | null;
  status: string;
}

export default function EditPlaylistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/playlists/${id}`)
      .then((r) => { if (r.status === 404) { setNotFound(true); return null; } return r.json(); })
      .then((data) => { if (data) setPlaylist(data); })
      .catch(() => setError('Failed to load playlist.'))
      .finally(() => setLoading(false));
  }, [id]);

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
      const res = await fetch(`/api/playlists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to save');
      router.push('/playlists');
    } catch { setError('Failed to save playlist.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this playlist? This cannot be undone.')) return;
    try {
      await fetch(`/api/playlists/${id}`, { method: 'DELETE' });
      router.push('/playlists');
    } catch { alert('Failed to delete.'); }
  };

  if (loading) return (
    <div className="admin-page-header"><div><h1 className="admin-page-title">Loading…</h1></div></div>
  );
  if (notFound) return (
    <div className="admin-page-header">
      <div><h1 className="admin-page-title">Playlist Not Found</h1><p className="admin-page-sub">This playlist may have been deleted.</p></div>
      <a href="/playlists" className="admin-btn admin-btn--ghost">← Back</a>
    </div>
  );

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Playlist</h1>
          <p className="admin-page-sub">{playlist?.name}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <a href="/playlists" className="admin-btn admin-btn--ghost">← Back</a>
          <button onClick={handleDelete} className="admin-btn admin-btn--danger">Delete</button>
        </div>
      </div>
      {error && <div className="admin-error-banner">{error}</div>}
      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label admin-label--required">Name</label>
            <input type="text" name="name" className="admin-input" defaultValue={playlist?.name ?? ''} required />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea name="description" className="admin-textarea" rows={3} defaultValue={playlist?.description ?? ''} placeholder="What defines this playlist?" />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Track Count</label>
              <input type="number" name="trackCount" className="admin-input" defaultValue={playlist?.trackCount ?? 0} min="0" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Status</label>
              <select name="status" className="admin-select" defaultValue={playlist?.status ?? 'active'} required>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Spotify URL</label>
            <input type="url" name="spotifyUrl" className="admin-input" defaultValue={playlist?.spotifyUrl ?? ''} placeholder="https://open.spotify.com/playlist/..." />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Cover Image URL</label>
            <input type="url" name="coverImage" className="admin-input" defaultValue={playlist?.coverImage ?? ''} placeholder="https://cdn.bigmuddytouring.com/..." />
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            <a href="/playlists" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
