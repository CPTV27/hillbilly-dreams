'use client';

// apps/web/app/account/subscriptions/page.tsx
// Customer-facing self-serve subscription management. Unlike /admin/subscriptions
// (admin view of everyone), this page lists only THE LOGGED-IN CUSTOMER'S subs.
//
// For v1 we look up by email via a magic-link-style confirmation (email in → receive
// link with short-lived token → land here with the data pre-loaded). Until the
// magic link flow lands, the page accepts email + Stripe customer ID from query params
// OR falls back to the Stripe Customer Portal which handles its own auth.

import { useState, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Subscription {
  id: string;
  status: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  trialEndsAt: string | null;
  stripeCustomerId: string | null;
  plan: {
    name: string;
    priceCents: number;
    currency: string;
    interval: string;
    intervalCount: number;
  };
}

function formatPrice(cents: number, currency: string): string {
  const amount = (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
  return currency === 'usd' ? `$${amount}` : `${amount} ${currency.toUpperCase()}`;
}
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
const STATUS_COLORS: Record<string, string> = {
  active: '#7fa86a',
  trialing: '#c8a676',
  past_due: '#d99850',
  canceled: '#6b6254',
  unpaid: '#c44',
  incomplete: '#888',
};

function SubscriptionsInner() {
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get('email') ?? '';

  const [email, setEmail] = useState(queryEmail);
  const [looked, setLooked] = useState(false);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [pageContent, setPageContent] = useState<{
    heroEyebrow?: string;
    heroHeadline?: string;
    heroSub?: string;
    footerNote?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [portalInFlight, setPortalInFlight] = useState(false);

  useEffect(() => {
    fetch('/api/page-content?slug=account/subscriptions')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setPageContent(j?.data ?? null))
      .catch(() => {});
  }, []);

  const lookup = useCallback(async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Public self-serve lookup endpoint — returns only the subs matching this email.
      const res = await fetch(
        `/api/account/subscriptions/lookup?email=${encodeURIComponent(email)}`
      );
      if (!res.ok) throw new Error(`Lookup failed: ${res.status}`);
      const json = await res.json();
      setSubs(json.data ?? []);
      setLooked(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Lookup failed');
    } finally {
      setLoading(false);
    }
  }, [email]);

  async function openPortal(stripeCustomerId: string) {
    setPortalInFlight(true);
    setError(null);
    try {
      const res = await fetch('/api/commerce/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stripeCustomerId,
          returnPath: '/account/subscriptions',
        }),
      });
      if (!res.ok) throw new Error(`Portal creation failed: ${res.status}`);
      const json = await res.json();
      if (json.data?.url) {
        window.location.href = json.data.url;
      } else {
        throw new Error('Stripe did not return a portal URL');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Portal failed');
      setPortalInFlight(false);
    }
  }

  return (
    <div style={{ padding: '40px 24px', maxWidth: '760px', margin: '0 auto' }}>
      <header style={{ marginBottom: '32px' }}>
        {pageContent?.heroEyebrow && (
          <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 6px' }}>
            {pageContent.heroEyebrow}
          </p>
        )}
        <h1 style={{ fontSize: '28px', margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
          {pageContent?.heroHeadline ?? 'Your subscriptions'}
        </h1>
        <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '14px' }}>
          {pageContent?.heroSub ?? 'Manage billing, update your payment method, or cancel anytime.'}
        </p>
      </header>

      {!looked && (
        <div
          style={{
            padding: '28px 24px',
            background: 'var(--surface, #191715)',
            border: '1px solid var(--border, #2a2723)',
            borderRadius: '8px',
            marginBottom: '24px',
          }}
        >
          <p style={{ margin: '0 0 12px', color: 'var(--text, #d8cfbe)', fontSize: '14px' }}>
            Enter the email you used when you subscribed.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && lookup()}
              style={{
                flex: 1,
                padding: '10px 12px',
                background: 'var(--bg, #14110f)',
                border: '1px solid var(--border, #2a2723)',
                color: 'var(--text, #d8cfbe)',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
            <button
              onClick={lookup}
              disabled={loading}
              style={{
                padding: '10px 20px',
                background: '#7fa86a',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {loading ? 'Looking up…' : 'Continue'}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div
          style={{
            padding: '12px 16px',
            background: '#3a1a1a',
            border: '1px solid #c44',
            borderRadius: '4px',
            color: '#fcc',
            marginBottom: '16px',
            fontSize: '13px',
          }}
        >
          {error}
        </div>
      )}

      {looked && subs.length === 0 && (
        <div
          style={{
            padding: '48px 24px',
            background: 'var(--surface, #191715)',
            border: '1px dashed var(--border, #2a2723)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--text-muted, #a89e8d)', margin: 0 }}>
            No active subscriptions for that email.
          </p>
          <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '13px', margin: '6px 0 0' }}>
            Maybe try a different email, or{' '}
            <a href="mailto:billing@bigmuddyinn.com" style={{ color: 'var(--accent, #c8a676)' }}>
              email us
            </a>
            .
          </p>
        </div>
      )}

      {subs.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {subs.map((sub) => (
            <div
              key={sub.id}
              style={{
                padding: '20px 24px',
                background: 'var(--surface, #191715)',
                border: '1px solid var(--border, #2a2723)',
                borderLeft: `3px solid ${STATUS_COLORS[sub.status] ?? '#888'}`,
                borderRadius: '6px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', margin: 0 }}>
                  {sub.plan.name}
                </h3>
                <span
                  style={{
                    padding: '3px 10px',
                    background: 'rgba(0,0,0,0.2)',
                    color: STATUS_COLORS[sub.status] ?? '#888',
                    border: `1px solid ${STATUS_COLORS[sub.status] ?? '#888'}`,
                    borderRadius: '3px',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {sub.status.replace('_', ' ')}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '13px', margin: '0 0 6px' }}>
                {formatPrice(sub.plan.priceCents, sub.plan.currency)} /{' '}
                {sub.plan.interval === 'one_time'
                  ? 'one-time'
                  : sub.plan.intervalCount === 1
                    ? sub.plan.interval
                    : `${sub.plan.intervalCount} ${sub.plan.interval}s`}
                {' · '}
                {sub.cancelAtPeriodEnd
                  ? `Ends ${formatDate(sub.currentPeriodEnd)}`
                  : `Renews ${formatDate(sub.currentPeriodEnd)}`}
              </p>
              {sub.trialEndsAt && (
                <p style={{ color: '#7fa86a', fontSize: '12px', margin: '0 0 10px' }}>
                  Trial ends {formatDate(sub.trialEndsAt)}
                </p>
              )}
              {sub.stripeCustomerId && (
                <button
                  onClick={() => openPortal(sub.stripeCustomerId!)}
                  disabled={portalInFlight}
                  style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    color: 'var(--accent, #c8a676)',
                    border: '1px solid var(--accent, #c8a676)',
                    borderRadius: '4px',
                    cursor: portalInFlight ? 'not-allowed' : 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  {portalInFlight ? 'Opening…' : 'Manage billing → Stripe'}
                </button>
              )}
            </div>
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
        <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px', margin: 0 }}>
          Questions?{' '}
          <a href="mailto:billing@bigmuddyinn.com" style={{ color: 'var(--accent, #c8a676)' }}>
            billing@bigmuddyinn.com
          </a>
        </p>
      </footer>
    </div>
  );
}

export default function AccountSubscriptionsPage() {
  return (
    <Suspense fallback={<p style={{ textAlign: 'center', padding: '60px' }}>Loading…</p>}>
      <SubscriptionsInner />
    </Suspense>
  );
}
