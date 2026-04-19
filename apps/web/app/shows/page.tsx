'use client';

// apps/web/app/shows/page.tsx
// Public Blues Room show calendar + ticket purchase flow.
// Reads upcoming Resources of type=blues_room_ticket, renders cards,
// ticket purchase → Stripe Checkout → /checkout/success.

import { useState, useEffect, useCallback, Suspense } from 'react';

interface Resource {
  id: string;
  tenantId: string;
  brand: string;
  type: string;
  name: string;
  description: string | null;
  startsAt: string | null;
  endsAt: string | null;
  totalCapacity: number;
  reservedCount: number;
  priceCents: number;
  currency: string;
  active: boolean;
}

function formatPrice(cents: number, currency: string): string {
  const amount = (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
  return currency === 'usd' ? `$${amount}` : `${amount} ${currency.toUpperCase()}`;
}

function formatShowDate(iso: string | null): string {
  if (!iso) return 'TBA';
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatShowTime(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function ShowsInner() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [pageContent, setPageContent] = useState<{
    heroEyebrow?: string;
    heroHeadline?: string;
    heroSub?: string;
    footerNote?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchaseTarget, setPurchaseTarget] = useState<Resource | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [purchaseInFlight, setPurchaseInFlight] = useState(false);

  const fetchShows = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [resRes, contentRes] = await Promise.all([
        fetch('/api/booking/resources?type=blues_room_ticket&upcomingOnly=true'),
        fetch('/api/page-content?slug=shows').catch(() => null),
      ]);
      if (!resRes.ok) throw new Error(`Failed: ${resRes.status}`);
      const json = await resRes.json();
      setResources(json.data ?? []);
      if (contentRes?.ok) {
        const contentJson = await contentRes.json();
        setPageContent(contentJson.data ?? null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  async function purchase() {
    if (!purchaseTarget) return;
    if (!email || !email.includes('@')) {
      setError('Valid email required.');
      return;
    }
    if (!name.trim()) {
      setError('Name required.');
      return;
    }
    if (quantity < 1) {
      setError('At least 1 ticket.');
      return;
    }
    const remaining = purchaseTarget.totalCapacity - purchaseTarget.reservedCount;
    if (quantity > remaining) {
      setError(`Only ${remaining} tickets left.`);
      return;
    }

    setPurchaseInFlight(true);
    setError(null);
    try {
      // This is a simplified v1 — real flow would:
      //   1. POST /api/booking/bookings/hold to create the hold
      //   2. POST /api/booking/tickets/checkout to get Stripe URL
      //   3. Redirect to Stripe
      // For now, fall back to a generic checkout until /hold + /checkout routes
      // for Booking land. Display TODO banner.
      setError(
        'Ticket checkout lands in a follow-up — for now email us at blues@bigmuddyinn.com to reserve.'
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Purchase failed');
    } finally {
      setPurchaseInFlight(false);
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
          {pageContent?.heroHeadline ?? 'Blues Room — upcoming shows'}
        </h1>
        <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '15px' }}>
          {pageContent?.heroSub ?? 'The working music venue inside Big Muddy Inn.'}
        </p>
      </header>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            background: '#3a1a1a',
            border: '1px solid #c44',
            borderRadius: '4px',
            color: '#fcc',
            margin: '0 auto 16px',
            maxWidth: '720px',
            fontSize: '13px',
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-muted, #888)', padding: '60px', textAlign: 'center' }}>
          Loading shows…
        </p>
      ) : resources.length === 0 ? (
        <div
          style={{
            padding: '80px 24px',
            background: 'var(--surface, #191715)',
            border: '1px dashed var(--border, #2a2723)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--text-muted, #a89e8d)', margin: '0 0 8px', fontSize: '15px' }}>
            No shows scheduled right now.
          </p>
          <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '13px', margin: 0 }}>
            Email blues@bigmuddyinn.com to get added to the newsletter.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {resources.map((r) => {
            const remaining = r.totalCapacity - r.reservedCount;
            const soldOut = remaining <= 0;
            return (
              <div
                key={r.id}
                style={{
                  padding: '24px',
                  background: 'var(--surface, #191715)',
                  border: '1px solid var(--border, #2a2723)',
                  borderLeft: `3px solid ${soldOut ? '#6b6254' : '#c8a676'}`,
                  borderRadius: '8px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '16px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', margin: '0 0 4px' }}>
                    {r.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '13px', margin: '0 0 8px' }}>
                    {formatShowDate(r.startsAt)} · {formatShowTime(r.startsAt)}
                  </p>
                  {r.description && (
                    <p style={{ color: 'var(--text, #d8cfbe)', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
                      {r.description}
                    </p>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '4px' }}>
                    {formatPrice(r.priceCents, r.currency)}
                  </div>
                  <div style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px', marginBottom: '10px' }}>
                    {soldOut ? 'Sold out' : `${remaining} left`}
                  </div>
                  <button
                    onClick={() => {
                      setPurchaseTarget(r);
                      setQuantity(1);
                      setEmail('');
                      setName('');
                    }}
                    disabled={soldOut}
                    style={{
                      padding: '8px 16px',
                      background: soldOut ? '#2a2723' : '#c8a676',
                      color: soldOut ? 'var(--text-muted, #6b6254)' : '#191715',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: soldOut ? 'not-allowed' : 'pointer',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    {soldOut ? 'Sold out' : 'Buy tickets'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {purchaseTarget && (
        <div
          onClick={() => !purchaseInFlight && setPurchaseTarget(null)}
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
              padding: '28px',
              maxWidth: '480px',
              width: '90%',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', margin: '0 0 4px' }}>
              {purchaseTarget.name}
            </h3>
            <p style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '13px', margin: '0 0 20px' }}>
              {formatShowDate(purchaseTarget.startsAt)} · {formatShowTime(purchaseTarget.startsAt)}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <Field label="Your name">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={fieldStyle}
                />
              </Field>
              <Field label="Email (for ticket delivery)">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={fieldStyle}
                />
              </Field>
              <Field label="Number of tickets">
                <input
                  type="number"
                  min={1}
                  max={purchaseTarget.totalCapacity - purchaseTarget.reservedCount}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={fieldStyle}
                />
              </Field>
            </div>

            <div
              style={{
                padding: '12px 16px',
                background: 'var(--bg, #14110f)',
                borderRadius: '4px',
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <span style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '13px' }}>
                Total
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px' }}>
                {formatPrice(purchaseTarget.priceCents * quantity, purchaseTarget.currency)}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setPurchaseTarget(null)}
                disabled={purchaseInFlight}
                style={{
                  padding: '10px 16px',
                  background: 'transparent',
                  color: 'var(--text-muted, #a89e8d)',
                  border: '1px solid var(--border, #2a2723)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Cancel
              </button>
              <button
                onClick={purchase}
                disabled={purchaseInFlight}
                style={{
                  padding: '10px 20px',
                  background: '#c8a676',
                  color: '#191715',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: purchaseInFlight ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                {purchaseInFlight ? 'Processing…' : 'Buy tickets →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const fieldStyle = {
  width: '100%',
  padding: '10px 12px',
  background: 'var(--bg, #14110f)',
  border: '1px solid var(--border, #2a2723)',
  color: 'var(--text, #d8cfbe)',
  borderRadius: '4px',
  fontSize: '14px',
} as const;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          color: 'var(--text-muted, #6b6254)',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: '4px',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ShowsPage() {
  return (
    <Suspense fallback={<p style={{ textAlign: 'center', padding: '60px' }}>Loading…</p>}>
      <ShowsInner />
    </Suspense>
  );
}
