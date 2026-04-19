'use client';

// apps/web/app/admin/broadcast/page.tsx
// MBT Broadcast admin — upcoming broadcasts + recent clips + schedule form.

import { useState, useEffect, useCallback } from 'react';

interface LiveBroadcast {
  id: string;
  brand: string;
  title: string;
  description: string;
  scheduledStart: string;
  scheduledEnd: string;
  actualStart: string | null;
  actualEnd: string | null;
  platform: string;
  status: string;
  hostUserIds: string[];
}

const STATUS_COLORS: Record<string, string> = {
  scheduled: '#c8a676',
  live: '#c44',
  ended: '#7fa86a',
  aborted: '#6b6254',
};

function fmtDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function BroadcastAdminPage() {
  const [broadcasts, setBroadcasts] = useState<LiveBroadcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [brandFilter, setBrandFilter] = useState<string>('all');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (brandFilter !== 'all') params.set('brand', brandFilter);
      const res = await fetch(`/api/broadcast/schedule?${params}`);
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const json = await res.json();
      setBroadcasts(json.data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Load failed');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, brandFilter]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
          Broadcast
        </h1>
        <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '14px' }}>
          Live broadcasts (TikTok Live + future linear). Mac mini agent executes
          scene changes + clip extraction.
        </p>
      </header>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            background: 'var(--surface, #191715)',
            border: '1px solid var(--border, #2a2723)',
            color: 'var(--text, #d8cfbe)',
            borderRadius: '4px',
            fontSize: '13px',
          }}
        >
          <option value="all">All brands</option>
          <option value="radio">Radio</option>
          <option value="magazine">Magazine</option>
          <option value="inn">Inn</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            background: 'var(--surface, #191715)',
            border: '1px solid var(--border, #2a2723)',
            color: 'var(--text, #d8cfbe)',
            borderRadius: '4px',
            fontSize: '13px',
          }}
        >
          <option value="all">All statuses</option>
          <option value="scheduled">Scheduled</option>
          <option value="live">Live</option>
          <option value="ended">Ended</option>
          <option value="aborted">Aborted</option>
        </select>
      </div>

      {error && (
        <div style={{ padding: '12px 16px', background: '#3a1a1a', border: '1px solid #c44', borderRadius: '4px', color: '#fcc', marginBottom: '12px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-muted, #888)', padding: '40px', textAlign: 'center' }}>Loading…</p>
      ) : broadcasts.length === 0 ? (
        <div style={{ padding: '60px 20px', background: 'var(--surface, #191715)', border: '1px dashed var(--border, #2a2723)', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted, #888)', margin: 0 }}>No broadcasts matching these filters.</p>
          <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px', marginTop: '6px' }}>
            POST /api/broadcast/schedule to create one.
          </p>
        </div>
      ) : (
        <table style={{ width: '100%', background: 'var(--surface, #191715)', border: '1px solid var(--border, #2a2723)', borderRadius: '8px', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #2a2723)' }}>
              {['Title', 'Brand', 'Start', 'Status', 'Platform'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 16px', color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {broadcasts.map((b) => (
              <tr key={b.id} style={{ borderBottom: '1px solid var(--border-subtle, #221f1c)' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ color: 'var(--text, #d8cfbe)' }}>{b.title}</div>
                  {b.description && (
                    <div style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px', marginTop: '2px', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {b.description}
                    </div>
                  )}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted, #a89e8d)' }}>{b.brand}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted, #a89e8d)' }}>{fmtDateTime(b.scheduledStart)}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ padding: '3px 8px', background: 'rgba(0,0,0,0.2)', color: STATUS_COLORS[b.status] ?? '#888', border: `1px solid ${STATUS_COLORS[b.status] ?? '#888'}`, borderRadius: '3px', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                    {b.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted, #6b6254)', fontSize: '12px' }}>{b.platform}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
