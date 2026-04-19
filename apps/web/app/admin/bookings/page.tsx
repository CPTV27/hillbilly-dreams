'use client';

// apps/web/app/admin/bookings/page.tsx
// MBT Booking — Quote requests + bookings + tickets in tabs.

import { useState, useEffect, useCallback } from 'react';

type Tab = 'quotes' | 'bookings' | 'resources';

interface Quote {
  id: string;
  tenantId: string;
  brand: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string | null;
  eventType: string;
  proposedDate: string | null;
  guestCount: number | null;
  description: string;
  status: string;
  quoteCents: number | null;
  createdAt: string;
}

interface Booking {
  id: string;
  tenantId: string;
  customerEmail: string;
  customerName: string | null;
  status: string;
  quantity: number;
  totalCents: number;
  currentPeriodEnd?: string;
  confirmedAt: string | null;
  createdAt: string;
  resource: { name: string; type: string; startsAt: string | null };
}

interface Resource {
  id: string;
  tenantId: string;
  brand: string;
  type: string;
  name: string;
  startsAt: string | null;
  totalCapacity: number;
  reservedCount: number;
  priceCents: number;
  active: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  submitted: '#888',
  reviewing: '#c8a676',
  quoted: '#d99850',
  deposit_pending: '#d99850',
  confirmed: '#7fa86a',
  declined: '#c44',
  abandoned: '#6b6254',
  held: '#c8a676',
  checked_in: '#7fa86a',
  no_show: '#c44',
  cancelled: '#6b6254',
};

function fmtPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
function fmtDate(iso: string | null): string {
  return iso
    ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '—';
}

export default function BookingsPage() {
  const [tab, setTab] = useState<Tab>('quotes');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (tab === 'quotes') {
        const r = await fetch('/api/booking/quotes');
        if (!r.ok) throw new Error(`Failed: ${r.status}`);
        const j = await r.json();
        setQuotes(j.data ?? []);
      } else if (tab === 'resources') {
        const r = await fetch('/api/booking/resources');
        if (!r.ok) throw new Error(`Failed: ${r.status}`);
        const j = await r.json();
        setResources(j.data ?? []);
      } else {
        // Bookings list endpoint not yet exposed publicly — placeholder
        setBookings([]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fetch failed');
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
          Bookings
        </h1>
        <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '14px' }}>
          Quotes, ticket inventory, confirmed bookings.
        </p>
      </header>

      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', borderBottom: '1px solid var(--border, #2a2723)' }}>
        {(['quotes', 'bookings', 'resources'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '10px 18px',
              background: 'transparent',
              color: tab === t ? 'var(--text, #e8d5a8)' : 'var(--text-muted, #6b6254)',
              border: 'none',
              borderBottom: tab === t ? '2px solid #c8a676' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: tab === t ? 600 : 400,
              textTransform: 'capitalize',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ padding: '12px 16px', background: '#3a1a1a', border: '1px solid #c44', borderRadius: '4px', color: '#fcc', marginBottom: '12px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-muted, #888)', padding: '40px', textAlign: 'center' }}>Loading…</p>
      ) : tab === 'quotes' ? (
        <QuotesTable quotes={quotes} />
      ) : tab === 'resources' ? (
        <ResourcesTable resources={resources} />
      ) : (
        <p style={{ color: 'var(--text-muted, #888)', padding: '40px', textAlign: 'center' }}>
          Bookings list coming after the show-calendar build.
        </p>
      )}
    </div>
  );
}

function QuotesTable({ quotes }: { quotes: Quote[] }) {
  if (quotes.length === 0) {
    return (
      <div style={{ padding: '60px 20px', background: 'var(--surface, #191715)', border: '1px dashed var(--border, #2a2723)', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted, #888)', margin: 0 }}>No quote requests yet.</p>
      </div>
    );
  }
  return (
    <table style={{ width: '100%', background: 'var(--surface, #191715)', border: '1px solid var(--border, #2a2723)', borderRadius: '8px', borderCollapse: 'collapse', fontSize: '13px' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid var(--border, #2a2723)' }}>
          {['Customer', 'Event', 'Date', 'Guests', 'Status', 'Quote', 'Submitted'].map((h) => (
            <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {quotes.map((q) => (
          <tr key={q.id} style={{ borderBottom: '1px solid var(--border-subtle, #221f1c)' }}>
            <td style={{ padding: '12px 16px' }}>
              <div style={{ color: 'var(--text, #d8cfbe)' }}>{q.customerName}</div>
              <div style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px' }}>{q.customerEmail}</div>
            </td>
            <td style={{ padding: '12px 16px', color: 'var(--text, #d8cfbe)', textTransform: 'capitalize' }}>{q.eventType}</td>
            <td style={{ padding: '12px 16px', color: 'var(--text-muted, #a89e8d)' }}>{fmtDate(q.proposedDate)}</td>
            <td style={{ padding: '12px 16px', color: 'var(--text-muted, #a89e8d)' }}>{q.guestCount ?? '—'}</td>
            <td style={{ padding: '12px 16px' }}>
              <span style={{ padding: '3px 8px', background: 'rgba(0,0,0,0.2)', color: STATUS_COLORS[q.status] ?? '#888', border: `1px solid ${STATUS_COLORS[q.status] ?? '#888'}`, borderRadius: '3px', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
                {q.status.replace('_', ' ')}
              </span>
            </td>
            <td style={{ padding: '12px 16px', fontFamily: 'var(--font-display)' }}>
              {q.quoteCents ? fmtPrice(q.quoteCents) : '—'}
            </td>
            <td style={{ padding: '12px 16px', color: 'var(--text-muted, #a89e8d)' }}>{fmtDate(q.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ResourcesTable({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) {
    return (
      <div style={{ padding: '60px 20px', background: 'var(--surface, #191715)', border: '1px dashed var(--border, #2a2723)', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted, #888)', margin: 0 }}>No bookable resources yet.</p>
      </div>
    );
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
      {resources.map((r) => {
        const remaining = r.totalCapacity - r.reservedCount;
        const pct = (r.reservedCount / r.totalCapacity) * 100;
        return (
          <div key={r.id} style={{ background: 'var(--surface, #191715)', border: '1px solid var(--border, #2a2723)', borderLeft: `3px solid ${r.active ? '#7fa86a' : '#6b6254'}`, borderRadius: '6px', padding: '14px 16px', opacity: r.active ? 1 : 0.6 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', margin: '0 0 4px' }}>{r.name}</h3>
            <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '11px', margin: '0 0 10px' }}>
              {r.type.replace('_', ' ')} · {r.brand} · {fmtDate(r.startsAt)}
            </p>
            <div style={{ height: '4px', background: 'var(--bg, #14110f)', borderRadius: '2px', overflow: 'hidden', marginBottom: '6px' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: pct >= 90 ? '#c44' : '#c8a676' }} />
            </div>
            <p style={{ color: 'var(--text, #d8cfbe)', fontSize: '12px', margin: 0 }}>
              {remaining} left / {r.totalCapacity} cap · {fmtPrice(r.priceCents)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
