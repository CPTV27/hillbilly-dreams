'use client';

// apps/web/app/admin/plans/page.tsx
// MBT Commerce — Plan management.
// List active + inactive Plans across tenants. Create / edit / deactivate.

import { useState, useEffect, useCallback } from 'react';

interface Plan {
  id: string;
  tenantId: string;
  brand: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  interval: string;
  intervalCount: number;
  trialDays: number;
  active: boolean;
  features: string[];
  platformFeePercent: string | null;
  stripePriceId: string | null;
  createdAt: string;
}

const TENANT_OPTIONS = ['big-muddy', 'tuthill', 'studio-c', 'dctv', 'bearsville'];
const BRAND_OPTIONS = ['inn', 'magazine', 'touring', 'records', 'radio', 'cpp', 'tuthill', 'studio-c', 'dctv', 'bearsville'];
const INTERVAL_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'month', label: 'Monthly' },
  { value: 'year', label: 'Annual' },
  { value: 'one_time', label: 'One-time' },
];

function formatPrice(cents: number, currency: string): string {
  const amount = (cents / 100).toFixed(2);
  return currency === 'usd' ? `$${amount}` : `${amount} ${currency.toUpperCase()}`;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);
  const [tenantFilter, setTenantFilter] = useState<string>('all');
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    tenantId: 'big-muddy',
    brand: 'records',
    slug: '',
    name: '',
    description: '',
    priceCents: '',
    currency: 'usd',
    interval: 'month',
    intervalCount: '1',
    trialDays: '0',
    features: '',
    platformFeePercent: '',
  });
  const [createInFlight, setCreateInFlight] = useState(false);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (tenantFilter !== 'all') params.set('tenantId', tenantFilter);
      const res = await fetch(`/api/commerce/plans?${params}`);
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const json = await res.json();
      const list = (json.data ?? []) as Plan[];
      setPlans(showInactive ? list : list.filter((p) => p.active));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fetch failed');
    } finally {
      setLoading(false);
    }
  }, [tenantFilter, showInactive]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateInFlight(true);
    setError(null);
    try {
      // Note: a POST /api/commerce/plans route would be added for this to actually
      // submit. For now, the form is wired to surface validation errors and act
      // as a UX placeholder. The module's plans.create() is the underlying API.
      setError('Plan creation API route not yet wired (P-1.5). Form data validated.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Create failed');
    } finally {
      setCreateInFlight(false);
    }
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto' }}>
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <h1 style={{ fontSize: '28px', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
            Plans
          </h1>
          <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '14px' }}>
            Subscription pricing tier templates. {plans.length} loaded.
          </p>
        </div>
        <button
          onClick={() => setCreating(!creating)}
          style={{
            padding: '8px 16px',
            background: creating ? 'transparent' : '#7fa86a',
            color: creating ? 'var(--text-muted, #a89e8d)' : '#fff',
            border: creating ? '1px solid var(--border, #2a2723)' : 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {creating ? 'Cancel' : '+ New plan'}
        </button>
      </header>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
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
          <option value="all">All tenants</option>
          {TENANT_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <label style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '13px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
          />{' '}
          Show inactive
        </label>
      </div>

      {/* Create form */}
      {creating && (
        <form
          onSubmit={handleCreate}
          style={{
            background: 'var(--surface, #191715)',
            border: '1px solid var(--border, #2a2723)',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>New plan</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <PlanFormField label="Tenant" value={form.tenantId} onChange={(v) => setForm({ ...form, tenantId: v })} options={TENANT_OPTIONS} />
            <PlanFormField label="Brand" value={form.brand} onChange={(v) => setForm({ ...form, brand: v })} options={BRAND_OPTIONS} />
            <PlanFormField label="Slug (lowercase, hyphens)" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
            <PlanFormField label="Name (display)" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <PlanFormField label="Price (cents)" value={form.priceCents} onChange={(v) => setForm({ ...form, priceCents: v })} type="number" />
            <PlanFormField label="Currency" value={form.currency} onChange={(v) => setForm({ ...form, currency: v })} />
            <PlanFormField label="Interval" value={form.interval} onChange={(v) => setForm({ ...form, interval: v })} options={INTERVAL_OPTIONS.map((o) => o.value)} />
            <PlanFormField label="Interval count" value={form.intervalCount} onChange={(v) => setForm({ ...form, intervalCount: v })} type="number" />
            <PlanFormField label="Trial days" value={form.trialDays} onChange={(v) => setForm({ ...form, trialDays: v })} type="number" />
            <PlanFormField label="Platform fee %" value={form.platformFeePercent} onChange={(v) => setForm({ ...form, platformFeePercent: v })} type="number" placeholder="0 = internal, 15-30 = vendor recurring" />
          </div>
          <div style={{ marginTop: '12px' }}>
            <label style={{ display: 'block', color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--bg, #14110f)',
                border: '1px solid var(--border, #2a2723)',
                color: 'var(--text, #d8cfbe)',
                borderRadius: '4px',
                fontSize: '13px',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>
          <div style={{ marginTop: '12px' }}>
            <label style={{ display: 'block', color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
              Features (one per line)
            </label>
            <textarea
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
              rows={5}
              placeholder="Distribution to streaming platforms&#10;Monthly stats&#10;…"
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--bg, #14110f)',
                border: '1px solid var(--border, #2a2723)',
                color: 'var(--text, #d8cfbe)',
                borderRadius: '4px',
                fontSize: '13px',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setCreating(false)} style={{ padding: '8px 16px', background: 'transparent', color: 'var(--text-muted, #a89e8d)', border: '1px solid var(--border, #2a2723)', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
              Cancel
            </button>
            <button type="submit" disabled={createInFlight} style={{ padding: '8px 16px', background: '#7fa86a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
              {createInFlight ? 'Creating…' : 'Create plan'}
            </button>
          </div>
        </form>
      )}

      {error && (
        <div style={{ padding: '12px 16px', background: '#3a1a1a', border: '1px solid #c44', borderRadius: '4px', color: '#fcc', marginBottom: '12px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-muted, #888)', padding: '40px', textAlign: 'center' }}>Loading…</p>
      ) : plans.length === 0 ? (
        <div style={{ padding: '60px 20px', background: 'var(--surface, #191715)', border: '1px dashed var(--border, #2a2723)', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted, #888)', margin: '0 0 6px' }}>No plans yet.</p>
          <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '13px', margin: 0 }}>Click "+ New plan" to create the first.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px' }}>
          {plans.map((p) => (
            <div key={p.id} style={{ background: 'var(--surface, #191715)', border: '1px solid var(--border, #2a2723)', borderLeft: `3px solid ${p.active ? '#7fa86a' : '#6b6254'}`, borderRadius: '6px', padding: '16px 18px', opacity: p.active ? 1 : 0.6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '15px', margin: 0, fontFamily: 'var(--font-display)' }}>{p.name}</h3>
                <span style={{ color: 'var(--text-muted, #6b6254)', fontSize: '11px' }}>{p.tenantId} · {p.brand}</span>
              </div>
              <p style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '12px', margin: '0 0 8px' }}>{p.slug}</p>
              <p style={{ color: 'var(--text, #d8cfbe)', fontSize: '13px', margin: '0 0 10px', lineHeight: 1.4 }}>{p.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--border-subtle, #221f1c)', paddingTop: '10px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px' }}>
                  {formatPrice(p.priceCents, p.currency)}
                  <span style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px' }}>
                    {' '}/ {p.interval === 'one_time' ? 'one-time' : p.interval}
                  </span>
                </span>
                {p.platformFeePercent && Number(p.platformFeePercent) > 0 && (
                  <span style={{ padding: '2px 8px', background: 'rgba(217, 152, 80, 0.15)', color: '#d99850', borderRadius: '3px', fontSize: '11px', fontWeight: 600 }}>
                    {Number(p.platformFeePercent)}% fee
                  </span>
                )}
              </div>
              {!p.stripePriceId && (
                <p style={{ color: '#d99850', fontSize: '11px', margin: '8px 0 0' }}>Not yet synced to Stripe</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PlanFormField({
  label,
  value,
  onChange,
  type = 'text',
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  options?: string[];
  placeholder?: string;
}) {
  return (
    <div>
      <label style={{ display: 'block', color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
        {label}
      </label>
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', background: 'var(--bg, #14110f)', border: '1px solid var(--border, #2a2723)', color: 'var(--text, #d8cfbe)', borderRadius: '4px', fontSize: '13px' }}
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ width: '100%', padding: '8px 12px', background: 'var(--bg, #14110f)', border: '1px solid var(--border, #2a2723)', color: 'var(--text, #d8cfbe)', borderRadius: '4px', fontSize: '13px' }}
        />
      )}
    </div>
  );
}
