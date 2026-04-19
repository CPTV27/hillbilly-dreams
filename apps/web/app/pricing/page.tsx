'use client';

// apps/web/app/pricing/page.tsx
// Public pricing page. Works from any brand hostname — reads tenantId + brand
// from the URL query or hostname (middleware sets an x-mbt-tenant header).
//
// Lists active Plans via /api/commerce/plans, renders cards, subscribe button
// POSTs to /api/commerce/subscriptions/checkout and redirects to Stripe.

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

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
  features: string[];
  platformFeePercent: string | null;
}

function formatPrice(cents: number, currency: string): string {
  const amount = (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
  return currency === 'usd' ? `$${amount}` : `${amount} ${currency.toUpperCase()}`;
}
function formatInterval(interval: string, count: number): string {
  if (interval === 'one_time') return 'one-time';
  if (count === 1) return `/ ${interval}`;
  return `/ ${count} ${interval}s`;
}

function PricingInner() {
  const searchParams = useSearchParams();
  const tenantId = searchParams.get('tenantId') ?? undefined;
  const brand = searchParams.get('brand') ?? undefined;

  const [plans, setPlans] = useState<Plan[]>([]);
  const [pageContent, setPageContent] = useState<{
    heroEyebrow?: string;
    heroHeadline?: string;
    heroSub?: string;
    footerNote?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [checkoutInFlight, setCheckoutInFlight] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch plans + page content in parallel
      const params = new URLSearchParams();
      if (tenantId) params.set('tenantId', tenantId);
      if (brand) params.set('brand', brand);
      const pcParams = new URLSearchParams({ slug: 'pricing' });
      if (brand) pcParams.set('brand', brand);
      const [plansRes, contentRes] = await Promise.all([
        fetch(`/api/commerce/plans?${params}`),
        fetch(`/api/page-content?${pcParams}`).catch(() => null),
      ]);
      if (!plansRes.ok) throw new Error(`Failed: ${plansRes.status}`);
      const json = await plansRes.json();
      setPlans(json.data ?? []);
      if (contentRes?.ok) {
        const contentJson = await contentRes.json();
        setPageContent(contentJson.data ?? null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fetch failed');
    } finally {
      setLoading(false);
    }
  }, [tenantId, brand]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  async function subscribe(planId: string) {
    if (!email.trim() || !email.includes('@')) {
      setError('Enter your email above first.');
      return;
    }
    setCheckoutInFlight(planId);
    setError(null);
    try {
      const res = await fetch('/api/commerce/subscriptions/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          customerEmail: email,
          successPath: '/checkout/success',
          cancelPath: '/checkout/cancelled',
        }),
      });
      if (!res.ok) throw new Error(`Checkout creation failed: ${res.status}`);
      const json = await res.json();
      if (json.data?.url) {
        window.location.href = json.data.url;
      } else {
        throw new Error('Stripe did not return a checkout URL');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed');
      setCheckoutInFlight(null);
    }
  }

  return (
    <div style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <header style={{ marginBottom: '32px', textAlign: 'center' }}>
        {pageContent?.heroEyebrow && (
          <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 8px' }}>
            {pageContent.heroEyebrow}
          </p>
        )}
        <h1 style={{ fontSize: '36px', margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
          {pageContent?.heroHeadline ?? 'Pricing'}
        </h1>
        {(pageContent?.heroSub || brand) && (
          <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '15px', textTransform: pageContent?.heroSub ? 'none' : 'capitalize' }}>
            {pageContent?.heroSub ?? `${brand?.replace('-', ' ')} · month-to-month · cancel anytime`}
          </p>
        )}
      </header>

      <div style={{ maxWidth: '400px', margin: '0 auto 32px', textAlign: 'center' }}>
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'var(--bg, #14110f)',
            border: '1px solid var(--border, #2a2723)',
            color: 'var(--text, #d8cfbe)',
            borderRadius: '6px',
            fontSize: '15px',
            textAlign: 'center',
          }}
        />
      </div>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            background: '#3a1a1a',
            border: '1px solid #c44',
            borderRadius: '6px',
            color: '#fcc',
            margin: '0 auto 16px',
            maxWidth: '600px',
            fontSize: '13px',
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-muted, #888)', padding: '60px', textAlign: 'center' }}>
          Loading plans…
        </p>
      ) : plans.length === 0 ? (
        <div
          style={{
            padding: '80px 24px',
            background: 'var(--surface, #191715)',
            border: '1px dashed var(--border, #2a2723)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--text-muted, #888)', margin: 0 }}>
            No plans available right now.
          </p>
          <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '13px', margin: '6px 0 0' }}>
            Check back soon or reach out to the team directly.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
            gap: '16px',
          }}
        >
          {plans.map((p) => (
            <PlanCard
              key={p.id}
              plan={p}
              onSubscribe={() => subscribe(p.id)}
              submitting={checkoutInFlight === p.id}
              disabled={checkoutInFlight !== null && checkoutInFlight !== p.id}
            />
          ))}
        </div>
      )}

      <footer
        style={{
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-subtle, #221f1c)',
          textAlign: 'center',
        }}
      >
        <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px', margin: 0, whiteSpace: 'pre-line' }}>
          {pageContent?.footerNote ?? (
            <>
              Secure payments by Stripe · Cancel anytime from your account · Questions?{' '}
              <a href="mailto:billing@bigmuddyinn.com" style={{ color: 'var(--accent, #c8a676)' }}>
                billing@
              </a>
            </>
          )}
        </p>
      </footer>
    </div>
  );
}

function PlanCard({
  plan,
  onSubscribe,
  submitting,
  disabled,
}: {
  plan: Plan;
  onSubscribe: () => void;
  submitting: boolean;
  disabled: boolean;
}) {
  return (
    <div
      style={{
        background: 'var(--surface, #191715)',
        border: '1px solid var(--border, #2a2723)',
        borderRadius: '8px',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div>
        <h3 style={{ fontSize: '20px', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
          {plan.name}
        </h3>
        <p style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
          {plan.description}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '36px' }}>
          {formatPrice(plan.priceCents, plan.currency)}
        </span>
        <span style={{ color: 'var(--text-muted, #6b6254)', fontSize: '13px' }}>
          {formatInterval(plan.interval, plan.intervalCount)}
        </span>
      </div>

      {plan.trialDays > 0 && (
        <p
          style={{
            color: '#7fa86a',
            fontSize: '12px',
            margin: 0,
            padding: '4px 8px',
            background: 'rgba(127, 168, 106, 0.12)',
            borderRadius: '4px',
            display: 'inline-block',
            alignSelf: 'flex-start',
          }}
        >
          {plan.trialDays}-day free trial
        </p>
      )}

      {plan.features && plan.features.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
          {plan.features.map((f, i) => (
            <li
              key={i}
              style={{
                color: 'var(--text, #d8cfbe)',
                fontSize: '13px',
                padding: '4px 0',
                lineHeight: 1.5,
                display: 'flex',
                gap: '8px',
              }}
            >
              <span style={{ color: '#7fa86a', flexShrink: 0 }}>✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onSubscribe}
        disabled={submitting || disabled}
        style={{
          padding: '12px 20px',
          background: submitting ? 'var(--text-muted, #6b6254)' : '#7fa86a',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: submitting || disabled ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: 600,
          opacity: disabled ? 0.5 : 1,
          transition: 'background 0.15s',
        }}
      >
        {submitting ? 'Redirecting to Stripe…' : 'Subscribe'}
      </button>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<p style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted, #888)' }}>Loading…</p>}>
      <PricingInner />
    </Suspense>
  );
}
