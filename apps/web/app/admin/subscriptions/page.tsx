'use client';

// apps/web/app/admin/subscriptions/page.tsx
// MBT Commerce — Subscription management.
// Lists active subscriptions across all tenants. Filter by tenant/status/email.
// Cancel-at-period-end (default) and Cancel-immediately (admin override).

import { useState, useEffect, useMemo, useCallback } from 'react';

type Status =
  | 'incomplete'
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid';

interface PlanLite {
  id: string;
  name: string;
  brand: string;
  priceCents: number;
  currency: string;
  interval: string;
  intervalCount: number;
}

interface Subscription {
  id: string;
  tenantId: string;
  customerEmail: string;
  customerName: string | null;
  status: Status;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  trialEndsAt: string | null;
  stripeSubscriptionId: string | null;
  stripeCustomerId: string | null;
  createdAt: string;
  updatedAt: string;
  plan: PlanLite;
}

const TENANT_OPTIONS = [
  { value: 'all', label: 'All tenants' },
  { value: 'big-muddy', label: 'Big Muddy' },
  { value: 'tuthill', label: 'Tuthill Design' },
  { value: 'studio-c', label: 'Studio C' },
  { value: 'dctv', label: 'DCTV' },
  { value: 'bearsville', label: 'Bearsville' },
];

const STATUS_OPTIONS: Array<{ value: 'all' | Status; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'trialing', label: 'Trialing' },
  { value: 'past_due', label: 'Past due' },
  { value: 'canceled', label: 'Canceled' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'incomplete', label: 'Incomplete' },
];

const STATUS_COLORS: Record<Status, string> = {
  active: '#7fa86a',
  trialing: '#c8a676',
  past_due: '#d99850',
  canceled: '#6b6254',
  unpaid: '#c44',
  incomplete: '#888',
};

function formatPrice(cents: number, currency: string): string {
  const amount = (cents / 100).toFixed(2);
  return currency === 'usd' ? `$${amount}` : `${amount} ${currency.toUpperCase()}`;
}

function formatInterval(interval: string, count: number): string {
  if (interval === 'one_time') return 'one-time';
  if (count === 1) return `/ ${interval}`;
  return `/ ${count} ${interval}s`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tenantFilter, setTenantFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Status>('all');
  const [emailFilter, setEmailFilter] = useState<string>('');
  const [cancelTarget, setCancelTarget] = useState<Subscription | null>(null);
  const [cancelMode, setCancelMode] = useState<'period_end' | 'immediate'>(
    'period_end'
  );
  const [cancelInFlight, setCancelInFlight] = useState(false);

  const fetchSubs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (tenantFilter !== 'all') params.set('tenantId', tenantFilter);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (emailFilter) params.set('customerEmail', emailFilter);
      const res = await fetch(`/api/commerce/subscriptions?${params}`);
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const json = await res.json();
      setSubs(json.data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fetch failed');
    } finally {
      setLoading(false);
    }
  }, [tenantFilter, statusFilter, emailFilter]);

  useEffect(() => {
    fetchSubs();
  }, [fetchSubs]);

  const mrr = useMemo(() => {
    let totalCents = 0;
    for (const sub of subs) {
      if (sub.status !== 'active') continue;
      if (sub.plan.interval === 'month') {
        totalCents += sub.plan.priceCents / sub.plan.intervalCount;
      } else if (sub.plan.interval === 'year') {
        totalCents += sub.plan.priceCents / sub.plan.intervalCount / 12;
      }
    }
    return totalCents;
  }, [subs]);

  async function handleCancel() {
    if (!cancelTarget) return;
    setCancelInFlight(true);
    try {
      const res = await fetch(
        `/api/commerce/subscriptions/${cancelTarget.id}/cancel`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ immediate: cancelMode === 'immediate' }),
        }
      );
      if (!res.ok) throw new Error(`Cancel failed: ${res.status}`);
      setCancelTarget(null);
      await fetchSubs();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Cancel failed');
    } finally {
      setCancelInFlight(false);
    }
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
          Subscriptions
        </h1>
        <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '14px' }}>
          Recurring billing across every tenant brand. {subs.length} loaded.
        </p>
      </header>

      {/* MRR card */}
      <div
        style={{
          background: 'var(--surface, #191715)',
          border: '1px solid var(--border, #2a2723)',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '24px',
          display: 'flex',
          gap: '32px',
          alignItems: 'baseline',
        }}
      >
        <div>
          <p
            style={{
              color: 'var(--text-muted, #6b6254)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              margin: '0 0 6px',
            }}
          >
            MRR (Active subscriptions)
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              margin: 0,
            }}
          >
            {formatPrice(mrr, 'usd')}
          </p>
        </div>
        <div>
          <p
            style={{
              color: 'var(--text-muted, #6b6254)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              margin: '0 0 6px',
            }}
          >
            Active count
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', margin: 0 }}>
            {subs.filter((s) => s.status === 'active').length}
          </p>
        </div>
        <div>
          <p
            style={{
              color: 'var(--text-muted, #6b6254)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              margin: '0 0 6px',
            }}
          >
            Past due
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', margin: 0, color: '#d99850' }}>
            {subs.filter((s) => s.status === 'past_due').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <select
          value={tenantFilter}
          onChange={(e) => setTenantFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            background: 'var(--surface, #191715)',
            border: '1px solid var(--border, #2a2723)',
            color: 'var(--text, #d8cfbe)',
            borderRadius: '4px',
            fontSize: '13px',
          }}
        >
          {TENANT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | Status)}
          style={{
            padding: '8px 12px',
            background: 'var(--surface, #191715)',
            border: '1px solid var(--border, #2a2723)',
            color: 'var(--text, #d8cfbe)',
            borderRadius: '4px',
            fontSize: '13px',
          }}
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <input
          type="email"
          placeholder="Customer email…"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            background: 'var(--surface, #191715)',
            border: '1px solid var(--border, #2a2723)',
            color: 'var(--text, #d8cfbe)',
            borderRadius: '4px',
            fontSize: '13px',
            minWidth: '240px',
          }}
        />
      </div>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            background: '#3a1a1a',
            border: '1px solid #c44',
            borderRadius: '4px',
            color: '#fcc',
            marginBottom: '12px',
            fontSize: '13px',
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-muted, #888)', padding: '40px', textAlign: 'center' }}>
          Loading…
        </p>
      ) : subs.length === 0 ? (
        <div
          style={{
            padding: '60px 20px',
            background: 'var(--surface, #191715)',
            border: '1px dashed var(--border, #2a2723)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--text-muted, #888)', margin: '0 0 6px' }}>
            No subscriptions match these filters.
          </p>
          <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '13px', margin: 0 }}>
            Try widening the filters, or create a Plan and have someone subscribe.
          </p>
        </div>
      ) : (
        <table
          style={{
            width: '100%',
            background: 'var(--surface, #191715)',
            border: '1px solid var(--border, #2a2723)',
            borderRadius: '8px',
            borderCollapse: 'collapse',
            fontSize: '13px',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #2a2723)' }}>
              {['Customer', 'Plan', 'Status', 'Period end', 'MRR', 'Actions'].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: 'left',
                    padding: '12px 16px',
                    color: 'var(--text-muted, #6b6254)',
                    fontSize: '11px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subs.map((sub) => {
              const monthlyValue =
                sub.plan.interval === 'month'
                  ? sub.plan.priceCents / sub.plan.intervalCount
                  : sub.plan.interval === 'year'
                    ? sub.plan.priceCents / sub.plan.intervalCount / 12
                    : 0;
              return (
                <tr
                  key={sub.id}
                  style={{ borderBottom: '1px solid var(--border-subtle, #221f1c)' }}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ color: 'var(--text, #d8cfbe)' }}>
                      {sub.customerName || sub.customerEmail}
                    </div>
                    {sub.customerName && (
                      <div style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px' }}>
                        {sub.customerEmail}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ color: 'var(--text, #d8cfbe)' }}>{sub.plan.name}</div>
                    <div style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px' }}>
                      {formatPrice(sub.plan.priceCents, sub.plan.currency)}{' '}
                      {formatInterval(sub.plan.interval, sub.plan.intervalCount)}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        background: 'rgba(0,0,0,0.2)',
                        color: STATUS_COLORS[sub.status],
                        border: `1px solid ${STATUS_COLORS[sub.status]}`,
                        borderRadius: '3px',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      {sub.status.replace('_', ' ')}
                    </span>
                    {sub.cancelAtPeriodEnd && (
                      <div style={{ color: '#d99850', fontSize: '11px', marginTop: '4px' }}>
                        Cancels at period end
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted, #a89e8d)' }}>
                    {formatDate(sub.currentPeriodEnd)}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-display)' }}>
                    {sub.status === 'active' ? formatPrice(monthlyValue, 'usd') : '—'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {sub.status !== 'canceled' && !sub.cancelAtPeriodEnd && (
                      <button
                        onClick={() => {
                          setCancelTarget(sub);
                          setCancelMode('period_end');
                        }}
                        style={{
                          padding: '6px 12px',
                          background: 'transparent',
                          color: 'var(--text-muted, #a89e8d)',
                          border: '1px solid var(--border, #2a2723)',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Cancel modal */}
      {cancelTarget && (
        <div
          onClick={() => !cancelInFlight && setCancelTarget(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--surface, #191715)',
              border: '1px solid var(--border, #2a2723)',
              borderRadius: '8px',
              padding: '24px',
              maxWidth: '480px',
              width: '90%',
            }}
          >
            <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
              Cancel subscription
            </h3>
            <p style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '13px', margin: '0 0 16px' }}>
              {cancelTarget.customerName || cancelTarget.customerEmail} ·{' '}
              {cancelTarget.plan.name}
            </p>
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  padding: '12px',
                  border: `1px solid ${cancelMode === 'period_end' ? '#7fa86a' : '#2a2723'}`,
                  borderRadius: '4px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  checked={cancelMode === 'period_end'}
                  onChange={() => setCancelMode('period_end')}
                />{' '}
                <strong>Cancel at period end</strong>
                <div style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '12px', marginLeft: '20px' }}>
                  Customer keeps access until {formatDate(cancelTarget.currentPeriodEnd)}.
                  Stripe stops billing.
                </div>
              </label>
              <label
                style={{
                  display: 'block',
                  padding: '12px',
                  border: `1px solid ${cancelMode === 'immediate' ? '#c44' : '#2a2723'}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  checked={cancelMode === 'immediate'}
                  onChange={() => setCancelMode('immediate')}
                />{' '}
                <strong style={{ color: '#d99850' }}>Cancel immediately</strong>
                <div style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '12px', marginLeft: '20px' }}>
                  Access ends now. No refund issued automatically (handle in Stripe).
                  Admin override only.
                </div>
              </label>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setCancelTarget(null)}
                disabled={cancelInFlight}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  color: 'var(--text-muted, #a89e8d)',
                  border: '1px solid var(--border, #2a2723)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Keep subscription
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelInFlight}
                style={{
                  padding: '8px 16px',
                  background: cancelMode === 'immediate' ? '#c44' : '#7fa86a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                {cancelInFlight ? 'Canceling…' : 'Confirm cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
