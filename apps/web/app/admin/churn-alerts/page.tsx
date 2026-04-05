'use client';

import { useCallback, useEffect, useState } from 'react';

interface ChurnRow {
  clientId: number;
  name: string;
  slug: string;
  status: string;
  tier: string;
  lastLoginAt: string | null;
  lastLoginTracked: boolean;
  daysSinceReviewResponse: number | null;
  socialPostingStreakWeeks: number;
  piDeviceStatus: string | null;
  piHeartbeatTracked: boolean;
  pendingReviews: number;
  googleAvgRating: number | null;
  googleReviewCount: number;
  riskScore: number;
  flags: string[];
}

export default function ChurnAlertsPage() {
  const [rows, setRows] = useState<ChurnRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<number | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/churn-metrics')
      .then((r) => r.json())
      .then((d) => setRows(d.clients || []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const queueAsana = async (clientId: number) => {
    setBusy(clientId);
    try {
      const r = await fetch('/api/admin/churn-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId }),
      });
      const j = await r.json();
      if (!r.ok) alert(j.error || 'Failed');
      else alert('Asana task created.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Churn alerts</h1>
          <p className="admin-page-sub">Client health heuristics — last login and Pi heartbeat are future fields</p>
        </div>
        <button type="button" onClick={load} className="admin-btn admin-btn--ghost">
          Refresh
        </button>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
      ) : (
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', maxWidth: '100%' }}>
          <table style={{ width: '100%', minWidth: 520, fontSize: 'var(--text-sm)', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: 'var(--text-disabled)' }}>Client</th>
                <th style={{ textAlign: 'left', padding: '8px', color: 'var(--text-disabled)' }}>Risk</th>
                <th style={{ textAlign: 'left', padding: '8px', color: 'var(--text-disabled)' }}>Flags</th>
                <th style={{ textAlign: 'right', padding: '8px', color: 'var(--text-disabled)' }}>Days since reply</th>
                <th style={{ textAlign: 'right', padding: '8px', color: 'var(--text-disabled)' }}>Social weeks</th>
                <th style={{ textAlign: 'right', padding: '8px', color: 'var(--text-disabled)' }}>Google avg</th>
                <th style={{ textAlign: 'left', padding: '8px', color: 'var(--text-disabled)' }} />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.clientId} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '8px' }}>
                    <div style={{ fontWeight: 600 }}>{row.name}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                      {row.tier} · {row.status}
                    </div>
                  </td>
                  <td style={{ padding: '8px' }}>{row.riskScore}</td>
                  <td style={{ padding: '8px', maxWidth: 280 }}>
                    {row.flags.length ? row.flags.join(' · ') : '—'}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>
                    {row.daysSinceReviewResponse ?? '—'}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>{row.socialPostingStreakWeeks}</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>
                    {row.googleReviewCount > 0 && row.googleAvgRating != null
                      ? row.googleAvgRating.toFixed(2)
                      : '—'}
                  </td>
                  <td style={{ padding: '8px' }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn--ghost"
                      disabled={busy === row.clientId}
                      onClick={() => queueAsana(row.clientId)}
                    >
                      {busy === row.clientId ? '…' : 'Asana outreach'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
