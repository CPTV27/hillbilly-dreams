'use client';

// apps/web/app/admin/podcast/page.tsx
// MBT Podcast admin — shows + episodes + Buzzsprout sync status.

import { useState, useEffect, useCallback } from 'react';

interface PodcastShow {
  id: string;
  slug: string;
  title: string;
  brand: string;
  buzzsproutId: string | null;
  createdAt: string;
}

export default function PodcastAdminPage() {
  const [shows, setShows] = useState<PodcastShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // No admin list endpoint wired yet — placeholder. Real implementation
      // would hit /api/podcast/shows (to be added) with admin auth.
      setShows([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Load failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
          Podcast
        </h1>
        <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '14px' }}>
          Shows + episodes. Buzzsprout distributes to Spotify / Apple / YouTube
          Music / Amazon. RSS feed at <code>/api/podcast/rss/[slug]</code>.
        </p>
      </header>

      {error && (
        <div style={{ padding: '12px 16px', background: '#3a1a1a', border: '1px solid #c44', borderRadius: '4px', color: '#fcc', marginBottom: '12px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-muted, #888)', padding: '40px', textAlign: 'center' }}>Loading…</p>
      ) : shows.length === 0 ? (
        <div style={{ padding: '60px 20px', background: 'var(--surface, #191715)', border: '1px dashed var(--border, #2a2723)', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted, #a89e8d)', margin: '0 0 8px' }}>
            No podcast shows yet.
          </p>
          <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '13px', margin: 0 }}>
            Create via <code>podcast.createShow()</code> in the @bigmuddy/broadcast module, or{' '}
            <a href="/admin/create/episode-description" style={{ color: 'var(--accent, #c8a676)' }}>
              draft an episode description
            </a>{' '}
            first.
          </p>
        </div>
      ) : (
        <table style={{ width: '100%', background: 'var(--surface, #191715)', border: '1px solid var(--border, #2a2723)', borderRadius: '8px', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #2a2723)' }}>
              {['Show', 'Brand', 'Buzzsprout', 'RSS'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 16px', color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shows.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--border-subtle, #221f1c)' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ color: 'var(--text, #d8cfbe)' }}>{s.title}</div>
                  <div style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px' }}>{s.slug}</div>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted, #a89e8d)' }}>{s.brand}</td>
                <td style={{ padding: '12px 16px' }}>
                  {s.buzzsproutId ? (
                    <span style={{ color: '#7fa86a', fontSize: '12px' }}>
                      ✓ synced ({s.buzzsproutId.slice(0, 8)})
                    </span>
                  ) : (
                    <span style={{ color: '#d99850', fontSize: '12px' }}>not synced</span>
                  )}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <a
                    href={`/api/podcast/rss/${s.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent, #c8a676)', fontSize: '12px' }}
                  >
                    RSS feed →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: '40px', padding: '20px', background: 'var(--surface, #191715)', border: '1px solid var(--border, #2a2723)', borderRadius: '8px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', margin: '0 0 8px' }}>
          Cron sync status
        </h3>
        <p style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '13px', margin: '0 0 8px' }}>
          Hourly: <code>/api/cron/podcast-sync</code> pushes newly-published
          episodes to Buzzsprout. Requires <code>BUZZSPROUT_TOKEN</code> env var
          + per-show <code>buzzsproutId</code> set.
        </p>
        <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px', margin: 0 }}>
          Verify: Vercel dashboard → Cron → last-run status.
        </p>
      </div>
    </div>
  );
}
