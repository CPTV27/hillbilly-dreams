'use client';

import { useEffect, useState } from 'react';

interface RevenuePayload {
  mrrUsd: number;
  subscriberCount: number;
  totalClients: number;
  byTier: Record<string, number>;
  churnRatePercent: number;
  arpuUsd: number;
  series: Array<{ key: string; mrrCents: number; newClients: number }>;
}

export default function AdminRevenuePage() {
  const [data, setData] = useState<RevenuePayload | null>(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetch('/api/admin/revenue-metrics')
      .then((r) => r.json())
      .then((j) => {
        if (j.error && !('mrrUsd' in j)) setErr(j.error);
        else setData(j as RevenuePayload);
      })
      .catch(() => setErr('Failed to load'));
  }, []);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Revenue</h1>
          <p className="admin-page-sub">MRR, tiers, and client mix from the Client model</p>
        </div>
      </div>

      {err ? (
        <div className="admin-error-banner">{err}</div>
      ) : !data ? (
        <div style={{ padding: 'var(--space-8)', color: 'var(--text-muted)' }}>Loading…</div>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 'var(--space-3)',
              marginBottom: 'var(--space-6)',
            }}
          >
            {[
              { label: 'MRR (est.)', value: `$${data.mrrUsd.toFixed(2)}` },
              { label: 'Paying subscribers', value: String(data.subscriberCount) },
              { label: 'Total clients', value: String(data.totalClients) },
              { label: 'Churn (all-time / total)', value: `${data.churnRatePercent}%` },
              { label: 'ARPU (paying)', value: `$${data.arpuUsd.toFixed(2)}` },
            ].map((s) => (
              <div key={s.label} className="admin-card" style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--accent)' }}>{s.value}</div>
                <div
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-disabled)',
                    marginTop: 'var(--space-1)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--tracking-widest)',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <h2
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--text-disabled)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-widest)',
              marginBottom: 'var(--space-3)',
            }}
          >
            Subscribers by tier
          </h2>
          <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
            {Object.keys(data.byTier).length === 0 ? (
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>No clients yet.</p>
            ) : (
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text)' }}>
                {Object.entries(data.byTier)
                  .sort((a, b) => b[1] - a[1])
                  .map(([tier, n]) => (
                    <li key={tier} style={{ marginBottom: 'var(--space-1)' }}>
                      <strong>{tier}</strong>: {n}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <h2
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--text-disabled)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-widest)',
              marginBottom: 'var(--space-3)',
            }}
          >
            Six-month snapshot
          </h2>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
            New clients per month; MRR line uses current run-rate until Stripe history is wired.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: 'var(--text-sm)', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '8px', color: 'var(--text-disabled)' }}>Month</th>
                  <th style={{ textAlign: 'right', padding: '8px', color: 'var(--text-disabled)' }}>MRR (est.)</th>
                  <th style={{ textAlign: 'right', padding: '8px', color: 'var(--text-disabled)' }}>New clients</th>
                </tr>
              </thead>
              <tbody>
                {data.series.map((row) => (
                  <tr key={row.key} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '8px', color: 'var(--text)' }}>{row.key}</td>
                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--success)' }}>
                      ${(row.mrrCents / 100).toFixed(2)}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>{row.newClients}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
