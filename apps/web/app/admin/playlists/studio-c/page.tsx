'use client';

// apps/web/app/(admin)/playlists/studio-c/page.tsx
// Studio C Plex background music playlist management (Melody Vault)

import { useState, useEffect, useCallback } from 'react';

export default function StudioCPlaylistManager() {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchPlaylists = useCallback(async () => {
    try {
      const res = await fetch('/api/playlists');
      const json = await res.json();
      // Filter convention: playlists prefixed with [Studio C] or similar
      const data = Array.isArray(json) ? json : (json.data ?? []);
      const studioCPlaylists = data.filter((p: any) => p.name.includes('Studio C') || p.name.includes('Plex'));
      setPlaylists(studioCPlaylists);
    } catch (err) {
      setError('Failed to load Melody Vault Plex playlists.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPlaylists(); }, [fetchPlaylists]);

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Plex BGM Playlists</h1>
          <p className="admin-page-sub">Compile and stage background audio rotations directly into the local Studio C network via Melody Vault.</p>
        </div>
        <button className="admin-btn admin-btn--primary">Create BGM Rotation</button>
      </div>

      {error && <div className="admin-error-banner">{error}</div>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Rotation Name</th>
              <th>Track Count</th>
              <th>Plex Status</th>
              <th>Last Synced</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5}>Loading Melody Vault data...</td></tr>
            ) : playlists.length === 0 ? (
              <tr><td colSpan={5}>
                <div className="admin-empty">
                  <div className="admin-empty__icon">◈</div>
                  <p className="admin-empty__text">No Plex music rotations found.</p>
                </div>
              </td></tr>
            ) : (
              playlists.map((pl) => (
                <tr key={pl.id}>
                  <td><strong>{pl.name}</strong></td>
                  <td>{pl.trackCount}</td>
                  <td><span className="admin-badge admin-badge--active">Synced</span></td>
                  <td>{new Date(pl.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="admin-btn admin-btn--ghost">Edit Tracks</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
