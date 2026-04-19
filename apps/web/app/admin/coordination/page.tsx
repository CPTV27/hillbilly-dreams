'use client';

// apps/web/app/admin/coordination/page.tsx
// MBT Coordination Layer — event bus dashboard. Recent BusEvents, pending
// deliveries, dead-letter list with replay button.

import { useState, useCallback } from 'react';

interface BusEvent {
  id: string;
  type: string;
  tenantId: string;
  source: string;
  publishedAt: string;
}
interface Delivery {
  id: string;
  eventId: string;
  status: string;
  attempt: number;
  lastError: string | null;
  completedAt: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#888',
  running: '#c8a676',
  succeeded: '#7fa86a',
  failed: '#d99850',
  dead: '#c44',
  blocked: '#6b6254',
};

export default function CoordinationPage() {
  const [events] = useState<BusEvent[]>([]);
  const [deliveries] = useState<Delivery[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [replaying, setReplaying] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const runWorker = useCallback(async () => {
    setRunning(true);
    setError(null);
    try {
      // Public worker endpoint requires CRON_SECRET — admins trigger a dry
      // run via a separate admin endpoint (TBD) or watch Vercel Cron logs.
      const res = await fetch('/api/events/worker', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_DEBUG_TOKEN ?? ''}`,
        },
      });
      if (!res.ok) throw new Error(`Worker ${res.status}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Worker run failed');
    } finally {
      setRunning(false);
    }
  }, []);

  async function replay(deliveryId: string) {
    setReplaying(deliveryId);
    try {
      const res = await fetch(`/api/events/dead-letter/${deliveryId}/replay`, { method: 'POST' });
      if (!res.ok) throw new Error(`Replay failed: ${res.status}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Replay failed');
    } finally {
      setReplaying(null);
    }
  }

  const dead = deliveries.filter((d) => d.status === 'dead');

  return (
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto' }}>
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <h1 style={{ fontSize: '28px', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
            Coordination — Event Bus
          </h1>
          <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '14px' }}>
            Cross-module event delivery. Vercel Cron runs the worker every 30s.
          </p>
        </div>
        <button
          onClick={runWorker}
          disabled={running}
          style={{ padding: '8px 16px', background: 'transparent', color: 'var(--text-muted, #a89e8d)', border: '1px solid var(--border, #2a2723)', borderRadius: '4px', cursor: running ? 'not-allowed' : 'pointer', fontSize: '12px' }}
        >
          {running ? 'Running…' : 'Run worker now'}
        </button>
      </header>

      {error && (
        <div style={{ padding: '12px 16px', background: '#3a1a1a', border: '1px solid #c44', borderRadius: '4px', color: '#fcc', marginBottom: '12px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <div style={{ padding: '40px 20px', background: 'var(--surface, #191715)', border: '1px dashed var(--border, #2a2723)', borderRadius: '8px', textAlign: 'center', marginBottom: '24px' }}>
        <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '14px' }}>
          No events recorded yet. Bus is wired; waiting for producers.
        </p>
        <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '12px', margin: '6px 0 0' }}>
          POST a test event to <code>/api/events/publish</code> to verify the dispatcher.
        </p>
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', margin: '24px 0 8px', color: dead.length > 0 ? '#c44' : 'inherit' }}>
        Dead-letter ({dead.length})
      </h3>
      {dead.length === 0 ? (
        <div style={{ padding: '20px', background: 'var(--surface, #191715)', border: '1px dashed var(--border, #2a2723)', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '13px' }}>No dead-letter rows.</p>
        </div>
      ) : (
        <table style={{ width: '100%', background: 'var(--surface, #191715)', border: '1px solid #c44', borderRadius: '8px', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #c44' }}>
              {['Delivery', 'Attempts', 'Error', 'Failed at', ''].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 16px', color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dead.map((d) => (
              <tr key={d.id} style={{ borderBottom: '1px solid var(--border-subtle, #221f1c)' }}>
                <td style={{ padding: '10px 16px', fontFamily: 'monospace' }}>{d.id.slice(0, 12)}</td>
                <td style={{ padding: '10px 16px', color: '#d99850' }}>{d.attempt}</td>
                <td style={{ padding: '10px 16px', color: 'var(--text-muted, #a89e8d)', fontSize: '12px', maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {d.lastError ?? '—'}
                </td>
                <td style={{ padding: '10px 16px', color: 'var(--text-muted, #6b6254)', fontSize: '12px' }}>
                  {d.completedAt ? new Date(d.completedAt).toLocaleString() : '—'}
                </td>
                <td style={{ padding: '10px 16px' }}>
                  <button
                    onClick={() => replay(d.id)}
                    disabled={replaying === d.id}
                    style={{ padding: '4px 10px', background: 'transparent', color: '#c8a676', border: '1px solid #c8a676', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    {replaying === d.id ? 'Replaying…' : 'Replay'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
