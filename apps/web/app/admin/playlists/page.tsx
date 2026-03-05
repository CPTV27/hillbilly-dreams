'use client';

// apps/web/app/(admin)/playlists/page.tsx
// Playlist management — fetches from /api/playlists, supports status filter, delete

import { useState, useMemo, useEffect, useCallback } from 'react';

const STATUS_FILTERS = ['all', 'active', 'archived'];

interface Playlist {
  id: number;
  name: string;
  description: string | null;
  trackCount: number;
  spotifyUrl: string | null;
  coverImage: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

function SkeletonRow() {
  return (
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton--text" style={{ width: '70%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '80%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '30%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '40%' }} /></td>
      <td><div className="skeleton skeleton--badge" /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '40%' }} /></td>
    </tr>
  );
}

export default function PlaylistsAdminPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchPlaylists = useCallback(async () => {
    try {
      const res = await fetch('/api/playlists');
      const json = await res.json();
      setPlaylists(json.data ?? []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch playlists:', err);
      setError('Failed to load playlists.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPlaylists(); }, [fetchPlaylists]);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/playlists/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setPlaylists((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete playlist.');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = useMemo(() => {
    return playlists.filter((p) => statusFilter === 'all' || p.status === statusFilter);
  }, [playlists, statusFilter]);

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Playlists</h1>
          <p className="admin-page-sub">
            {loading ? '…' : `${playlists.length} playlists total · ${filtered.length} shown`}
          </p>
        </div>
        <a href="/playlists/new" className="admin-btn admin-btn--primary">+ New Playlist</a>
      </div>

      {error && (
        <div className="admin-error-banner">
          {error}
          <button onClick={fetchPlaylists} className="admin-btn admin-btn--ghost" style={{ marginLeft: 'var(--space-3)' }}>Retry</button>
        </div>
      )}

      <div className="admin-filter-bar">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`admin-filter-btn ${statusFilter === s ? 'admin-filter-btn--active' : ''}`}
          >
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="admin-table-wrap playlists-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th><th>Description</th><th>Tracks</th><th>Spotify</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>{Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}</>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6}>
                <div className="admin-empty">
                  <div className="admin-empty__icon">◈</div>
                  <p className="admin-empty__text">No playlists match your filters.</p>
                </div>
              </td></tr>
            ) : (
              filtered.map((playlist) => (
                <tr key={playlist.id} className={actionLoading === playlist.id ? 'row-loading' : ''}>
                  <td>
                    <div className="playlists-name-cell">
                      {playlist.coverImage && (
                        <img src={playlist.coverImage} alt="" className="playlists-cover-thumb" />
                      )}
                      <a href={`/playlists/${playlist.id}/edit`} className="playlists-name-link">{playlist.name}</a>
                    </div>
                  </td>
                  <td><span className="playlists-desc">{playlist.description ?? '—'}</span></td>
                  <td><span className="playlists-meta">{playlist.trackCount}</span></td>
                  <td>
                    {playlist.spotifyUrl ? (
                      <a href={playlist.spotifyUrl} target="_blank" rel="noopener noreferrer" className="playlists-spotify">Spotify ↗</a>
                    ) : '—'}
                  </td>
                  <td>
                    <span className={`admin-badge admin-badge--${playlist.status}`}>{playlist.status}</span>
                  </td>
                  <td>
                    <div className="playlists-actions">
                      <a href={`/playlists/${playlist.id}/edit`} className="admin-btn admin-btn--ghost playlists-action-btn">Edit</a>
                      <button
                        onClick={() => handleDelete(playlist.id, playlist.name)}
                        className="admin-btn admin-btn--danger playlists-action-btn"
                        disabled={actionLoading === playlist.id}
                      >
                        {actionLoading === playlist.id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="playlists-mobile-list">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="playlist-mobile-card">
              <div className="skeleton skeleton--badge" style={{ marginBottom: 'var(--space-3)' }} />
              <div className="skeleton skeleton--text" style={{ width: '80%', marginBottom: 'var(--space-2)' }} />
              <div className="skeleton skeleton--text" style={{ width: '50%' }} />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty__icon">◈</div>
            <p className="admin-empty__text">No playlists match your filters.</p>
          </div>
        ) : (
          filtered.map((playlist) => (
            <div key={playlist.id} className={`playlist-mobile-card ${actionLoading === playlist.id ? 'row-loading' : ''}`}>
              <div className="playlist-mobile-card__top">
                <span className={`admin-badge admin-badge--${playlist.status}`}>{playlist.status}</span>
                <span className="playlists-meta">{playlist.trackCount} tracks</span>
              </div>
              <a href={`/playlists/${playlist.id}/edit`} className="playlists-name-link playlist-mobile-card__name">{playlist.name}</a>
              {playlist.description && <p className="playlists-desc">{playlist.description}</p>}
              <div className="playlists-actions" style={{ marginTop: 'var(--space-3)' }}>
                <a href={`/playlists/${playlist.id}/edit`} className="admin-btn admin-btn--ghost playlists-action-btn">Edit</a>
                {playlist.spotifyUrl && (
                  <a href={playlist.spotifyUrl} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn--ghost playlists-action-btn">Spotify ↗</a>
                )}
                <button
                  onClick={() => handleDelete(playlist.id, playlist.name)}
                  className="admin-btn admin-btn--danger playlists-action-btn"
                  disabled={actionLoading === playlist.id}
                >
                  {actionLoading === playlist.id ? '…' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .playlists-table-wrap { display: none; }
        @media (min-width: 768px) {
          .playlists-table-wrap { display: block; }
          .playlists-mobile-list { display: none; }
        }
        .playlists-name-cell {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .playlists-cover-thumb {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          object-fit: cover;
          flex-shrink: 0;
        }
        .playlists-name-link {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .playlists-name-link:hover { color: var(--accent-hover); text-decoration: underline; }
        .playlists-desc {
          font-size: var(--text-sm);
          color: var(--text-muted);
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .playlists-meta { font-size: var(--text-sm); color: var(--text-muted); }
        .playlists-spotify {
          font-size: var(--text-xs);
          font-weight: 600;
          color: #1DB954;
          text-decoration: none;
        }
        .playlists-spotify:hover { text-decoration: underline; }
        .playlists-actions { display: flex; gap: var(--space-2); }
        .playlists-action-btn {
          font-size: var(--text-xs);
          padding: var(--space-1) var(--space-3);
        }
        .playlists-mobile-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .playlist-mobile-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-4);
        }
        .playlist-mobile-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-2);
        }
        .playlist-mobile-card__name {
          display: block;
          font-size: var(--text-md);
          margin-bottom: var(--space-2);
        }
      `}</style>
    </>
  );
}
