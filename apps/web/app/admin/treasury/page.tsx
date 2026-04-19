'use client';

// apps/web/app/admin/treasury/page.tsx
// MBT Treasury — Tier 3 engagements + bucket hours + per-entity P&L.
// Distinct from /admin/finance (which covers BMT billing client invoicing).

import { useState, useEffect, useCallback } from 'react';

interface MrrBreakdown {
  totalCents: number;
  perTenant: Array<{ tenantId: string; cents: number; activeCount: number }>;
  perBrand: Array<{ brand: string; cents: number; activeCount: number }>;
}
interface Churn {
  rate: number;
  cancelledCount: number;
  startActiveCount: number;
}
interface BucketSummary {
  totalHours: number;
  totalCents: number;
  perEntity: Array<{ entity: string; hours: number; cents: number }>;
}
interface Engagement {
  id: string;
  vendorTenantId: string;
  customerEmail: string;
  modules: string[];
  monthlyRevenueCents: number;
  platformFeePercent: string;
  status: string;
  startedAt: string;
}
interface PnL {
  entity: string;
  periodStart: string;
  periodEnd: string;
  revenue: Array<{ category: string; amountCents: number }>;
  costs: Array<{ category: string; amountCents: number }>;
  totalRevenueCents: number;
  totalCostsCents: number;
  netCents: number;
}

const ENTITIES = ['mbt', 'big-muddy-natchez', 'big-muddy-touring', 'tuthill-design'];

function fmtMoney(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function fmtMonth(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

export default function TreasuryPage() {
  const [mrr, setMrr] = useState<MrrBreakdown | null>(null);
  const [churn, setChurn] = useState<Churn | null>(null);
  const [bucketMonth] = useState(fmtMonth(new Date()));
  const [bucket, setBucket] = useState<BucketSummary | null>(null);
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [pnlEntity, setPnlEntity] = useState<string>('mbt');
  const [pnl, setPnl] = useState<PnL | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [mrrRes, bucketRes, engagementsRes] = await Promise.all([
        fetch('/api/finance/mrr').then((r) => r.json()),
        fetch(`/api/finance/buckets/${bucketMonth}`).then((r) => r.json()),
        fetch('/api/finance/engagements?status=active').then((r) => r.json()),
      ]);
      setMrr(mrrRes.data?.mrr ?? null);
      setChurn(mrrRes.data?.churn ?? null);
      setBucket(bucketRes.data ?? null);
      setEngagements(engagementsRes.data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Refresh failed');
    }
  }, [bucketMonth]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const fetchPnl = useCallback(async () => {
    const periodStart = new Date();
    periodStart.setDate(1);
    periodStart.setHours(0, 0, 0, 0);
    const periodEnd = new Date();
    try {
      const res = await fetch(
        `/api/finance/pnl/${pnlEntity}?periodStart=${periodStart.toISOString()}&periodEnd=${periodEnd.toISOString()}`
      );
      const json = await res.json();
      setPnl(json.data ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'P&L fetch failed');
    }
  }, [pnlEntity]);

  useEffect(() => {
    fetchPnl();
  }, [fetchPnl]);

  return (
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
          Treasury
        </h1>
        <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '14px' }}>
          Tier 3 engagements · bucket hours · per-entity P&L · recurring revenue.
        </p>
      </header>

      {error && (
        <div style={{ padding: '12px 16px', background: '#3a1a1a', border: '1px solid #c44', borderRadius: '4px', color: '#fcc', marginBottom: '12px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <Card label="Active MRR" value={mrr ? fmtMoney(mrr.totalCents) : '—'} sub={mrr ? `${mrr.perTenant.reduce((s, t) => s + t.activeCount, 0)} active subs` : ''} />
        <Card label="30-day churn" value={churn ? `${(churn.rate * 100).toFixed(1)}%` : '—'} sub={churn ? `${churn.cancelledCount} canceled / ${churn.startActiveCount} at start` : ''} />
        <Card label={`Bucket hours · ${bucketMonth}`} value={bucket ? `${bucket.totalHours.toFixed(1)} hrs` : '—'} sub={bucket ? fmtMoney(bucket.totalCents) : ''} />
      </div>

      {mrr && mrr.perTenant.length > 0 && (
        <Section title="MRR by tenant">
          <Table
            headers={['Tenant', 'Active', 'MRR']}
            rows={mrr.perTenant.map((t) => [t.tenantId, String(t.activeCount), fmtMoney(t.cents)])}
            moneyCol={2}
          />
        </Section>
      )}

      {bucket && bucket.perEntity.length > 0 && (
        <Section title={`Bucket hours · ${bucketMonth} · per consuming entity`}>
          <Table
            headers={['Entity', 'Hours', 'Cost']}
            rows={bucket.perEntity.map((r) => [r.entity, r.hours.toFixed(1), fmtMoney(r.cents)])}
            moneyCol={2}
          />
        </Section>
      )}

      <Section title={`Active Tier 3 engagements (${engagements.length})`}>
        {engagements.length === 0 ? (
          <p style={{ color: 'var(--text-muted, #888)', fontSize: '13px' }}>None yet.</p>
        ) : (
          <Table
            headers={['Vendor', 'Customer', 'Monthly rev', 'Platform fee', 'Started']}
            rows={engagements.map((e) => [
              e.vendorTenantId,
              e.customerEmail,
              fmtMoney(e.monthlyRevenueCents),
              `${fmtMoney(Math.round((e.monthlyRevenueCents * Number(e.platformFeePercent)) / 100))} (${Number(e.platformFeePercent)}%)`,
              new Date(e.startedAt).toLocaleDateString(),
            ])}
            moneyCol={2}
          />
        )}
      </Section>

      <Section title="Per-entity P&L · month-to-date">
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {ENTITIES.map((e) => (
            <button
              key={e}
              onClick={() => setPnlEntity(e)}
              style={{
                padding: '6px 12px',
                background: pnlEntity === e ? '#2f2a23' : 'transparent',
                color: pnlEntity === e ? '#e8d5a8' : 'var(--text-muted, #a89e8d)',
                border: `1px solid ${pnlEntity === e ? '#c8a676' : '#2a2723'}`,
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {e}
            </button>
          ))}
        </div>
        {pnl ? (
          <div style={{ background: 'var(--surface, #191715)', border: '1px solid var(--border, #2a2723)', borderRadius: '8px', padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <LineList label="Revenue" lines={pnl.revenue} color="#7fa86a" total={pnl.totalRevenueCents} />
              <LineList label="Costs" lines={pnl.costs} color="#d99850" total={pnl.totalCostsCents} />
            </div>
            <div style={{ borderTop: '2px solid var(--border, #2a2723)', marginTop: '16px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: '15px' }}>Net</strong>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: pnl.netCents >= 0 ? '#7fa86a' : '#c44' }}>
                {fmtMoney(pnl.netCents)}
              </strong>
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted, #888)', fontSize: '13px' }}>No P&L data yet.</p>
        )}
      </Section>
    </div>
  );
}

function Card({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ background: 'var(--surface, #191715)', border: '1px solid var(--border, #2a2723)', borderRadius: '8px', padding: '20px 24px' }}>
      <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 6px' }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '28px', margin: '0 0 4px' }}>{value}</p>
      {sub && <p style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '12px', margin: 0 }}>{sub}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', margin: '0 0 8px' }}>{title}</h3>
      {children}
    </div>
  );
}

function Table({ headers, rows, moneyCol }: { headers: string[]; rows: string[][]; moneyCol?: number }) {
  return (
    <table style={{ width: '100%', background: 'var(--surface, #191715)', border: '1px solid var(--border, #2a2723)', borderRadius: '8px', borderCollapse: 'collapse', fontSize: '13px' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid var(--border, #2a2723)' }}>
          {headers.map((h) => (
            <th key={h} style={{ textAlign: 'left', padding: '10px 16px', color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle, #221f1c)' }}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: '10px 16px', color: j === 0 ? 'var(--text, #d8cfbe)' : 'var(--text-muted, #a89e8d)', fontFamily: j === moneyCol ? 'var(--font-display)' : 'inherit' }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function LineList({ label, lines, color, total }: { label: string; lines: Array<{ category: string; amountCents: number }>; color: string; total: number }) {
  return (
    <div>
      <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 8px' }}>{label}</p>
      {lines.length > 0 ? (
        lines.map((l) => (
          <div key={l.category} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '13px' }}>
            <span style={{ color: 'var(--text, #d8cfbe)' }}>{l.category}</span>
            <span style={{ color, fontFamily: 'var(--font-display)' }}>{fmtMoney(l.amountCents)}</span>
          </div>
        ))
      ) : (
        <p style={{ color: 'var(--text-muted, #888)', fontSize: '13px', fontStyle: 'italic' }}>None recorded.</p>
      )}
      <div style={{ borderTop: '1px solid var(--border, #2a2723)', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <strong>Total</strong>
        <strong style={{ fontFamily: 'var(--font-display)' }}>{fmtMoney(total)}</strong>
      </div>
    </div>
  );
}
