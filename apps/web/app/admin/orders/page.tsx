'use client';

// apps/web/app/admin/orders/page.tsx
// MBT Commerce — Order management. List + status filter + manual fulfillment.

import { useState, useEffect, useCallback } from 'react';

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  priceCents: number;
  totalCents: number;
  product: {
    id: string;
    name: string;
    brand: string;
  };
}

interface Order {
  id: string;
  tenantId: string;
  customerEmail: string;
  customerName: string | null;
  status: string;
  subtotalCents: number;
  taxCents: number;
  shippingCents: number;
  totalCents: number;
  currency: string;
  fulfilledAt: string | null;
  shippedAt: string | null;
  trackingNumber: string | null;
  notes: string | null;
  createdAt: string;
  items: OrderItem[];
}

const STATUS_OPTIONS = ['all', 'pending', 'paid', 'fulfilled', 'shipped', 'refunded', 'cancelled'];

const STATUS_COLORS: Record<string, string> = {
  pending: '#888',
  paid: '#c8a676',
  fulfilled: '#7fa86a',
  shipped: '#7fa86a',
  refunded: '#d99850',
  cancelled: '#6b6254',
};

function formatPrice(cents: number, currency: string): string {
  const amount = (cents / 100).toFixed(2);
  return currency === 'usd' ? `$${amount}` : `${amount} ${currency.toUpperCase()}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tenantFilter, setTenantFilter] = useState<string>('all');

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (tenantFilter !== 'all') params.set('tenantId', tenantFilter);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      const res = await fetch(`/api/commerce/orders?${params}`);
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const json = await res.json();
      setOrders(json.data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fetch failed');
    } finally {
      setLoading(false);
    }
  }, [tenantFilter, statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
          Orders
        </h1>
        <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '14px' }}>
          One-time purchases. Subscription billing → /admin/subscriptions.
        </p>
      </header>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <select value={tenantFilter} onChange={(e) => setTenantFilter(e.target.value)} style={{ padding: '8px 12px', background: 'var(--surface, #191715)', border: '1px solid var(--border, #2a2723)', color: 'var(--text, #d8cfbe)', borderRadius: '4px', fontSize: '13px' }}>
          <option value="all">All tenants</option>
          <option value="big-muddy">Big Muddy</option>
          <option value="tuthill">Tuthill</option>
          <option value="studio-c">Studio C</option>
          <option value="dctv">DCTV</option>
          <option value="bearsville">Bearsville</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', background: 'var(--surface, #191715)', border: '1px solid var(--border, #2a2723)', color: 'var(--text, #d8cfbe)', borderRadius: '4px', fontSize: '13px' }}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {error && <div style={{ padding: '12px 16px', background: '#3a1a1a', border: '1px solid #c44', borderRadius: '4px', color: '#fcc', marginBottom: '12px', fontSize: '13px' }}>{error}</div>}

      {loading ? (
        <p style={{ color: 'var(--text-muted, #888)', padding: '40px', textAlign: 'center' }}>Loading…</p>
      ) : orders.length === 0 ? (
        <div style={{ padding: '60px 20px', background: 'var(--surface, #191715)', border: '1px dashed var(--border, #2a2723)', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted, #888)', margin: 0 }}>No orders match these filters.</p>
        </div>
      ) : (
        <table style={{ width: '100%', background: 'var(--surface, #191715)', border: '1px solid var(--border, #2a2723)', borderRadius: '8px', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #2a2723)' }}>
              {['Order', 'Customer', 'Items', 'Total', 'Status', 'Date'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} style={{ borderBottom: '1px solid var(--border-subtle, #221f1c)' }}>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: 'var(--text-muted, #a89e8d)' }}>
                  {o.id.slice(0, 8)}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ color: 'var(--text, #d8cfbe)' }}>{o.customerName || o.customerEmail}</div>
                  {o.customerName && (
                    <div style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px' }}>{o.customerEmail}</div>
                  )}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted, #a89e8d)' }}>
                  {o.items.length} item{o.items.length !== 1 ? 's' : ''}
                  <div style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px' }}>
                    {o.items.map((i) => `${i.quantity}× ${i.product.name}`).join(', ')}
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'var(--font-display)' }}>
                  {formatPrice(o.totalCents, o.currency)}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ padding: '3px 8px', background: 'rgba(0,0,0,0.2)', color: STATUS_COLORS[o.status] ?? '#888', border: `1px solid ${STATUS_COLORS[o.status] ?? '#888'}`, borderRadius: '3px', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                    {o.status}
                  </span>
                  {o.trackingNumber && (
                    <div style={{ color: 'var(--text-muted, #6b6254)', fontSize: '11px', marginTop: '4px' }}>
                      {o.trackingNumber}
                    </div>
                  )}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted, #a89e8d)' }}>
                  {formatDate(o.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
