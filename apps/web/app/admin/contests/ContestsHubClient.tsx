'use client';

import { useState } from 'react';

export type ContestRow = {
  id: string;
  title: string;
  description: string | null;
  entryFeeCredits: number;
  status: string;
  submissionType: string;
  startDate: string;
  endDate: string;
};

const C = {
  bg: '#0c1222',
  ink: '#f1f5f9',
  muted: '#94a3b8',
  accent: '#38bdf8',
  border: 'rgba(148, 163, 184, 0.25)',
  card: 'rgba(15, 23, 42, 0.9)',
};

export default function ContestsHubClient({ contests }: { contests: ContestRow[] }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function enter(contestId: string) {
    setBusyId(contestId);
    setMsg(null);
    try {
      const res = await fetch(`/api/sovereign/contests/${contestId}/enter`, { method: 'POST' });
      const data = (await res.json().catch(() => ({}))) as { error?: string; creditsBurned?: number };
      if (!res.ok) {
        setMsg(data.error ?? `Error ${res.status}`);
        return;
      }
      setMsg(`Entered. Credits burned: ${data.creditsBurned ?? 0}.`);
    } catch {
      setMsg('Network error');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        background: C.bg,
        color: C.ink,
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
      }}
    >
      <header style={{ marginBottom: '2rem' }}>
        <p
          style={{
            margin: '0 0 0.5rem 0',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: C.accent,
          }}
        >
          Sovereign contests
        </p>
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>Contest hub · barter entry</h1>
        <p style={{ margin: '0.75rem 0 0 0', color: C.muted, maxWidth: '42rem', lineHeight: 1.55 }}>
          Entering burns <code style={{ color: C.accent }}>User.credits</code> per contest fee, writes{' '}
          <code style={{ color: C.accent }}>CreditLedger</code>, and emits <code style={{ color: C.accent }}>sovereign_pulse</code>{' '}
          for kiosks and signage.
        </p>
      </header>

      {msg && (
        <div
          style={{
            marginBottom: '1rem',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            border: `1px solid ${C.border}`,
            background: C.card,
            color: C.ink,
          }}
        >
          {msg}
        </div>
      )}

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {contests.length === 0 ? (
          <li style={{ color: C.muted }}>
            No contests in the database. Seed a row in <code style={{ color: C.accent }}>Contest</code> with status{' '}
            <code style={{ color: C.accent }}>published</code>.
          </li>
        ) : (
          contests.map((c) => {
            const open = c.status === 'published' && new Date() >= new Date(c.startDate) && new Date() <= new Date(c.endDate);
            return (
              <li
                key={c.id}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '8px',
                  border: `1px solid ${C.border}`,
                  background: C.card,
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>{c.title}</div>
                    {c.description && (
                      <p style={{ margin: '0.5rem 0 0 0', color: C.muted, fontSize: '0.9rem', maxWidth: '48rem' }}>{c.description}</p>
                    )}
                    <div style={{ marginTop: '0.65rem', fontSize: '0.8rem', color: C.muted }}>
                      Fee <span style={{ color: C.accent }}>{c.entryFeeCredits}</span> credits · type {c.submissionType} ·{' '}
                      {c.status}
                      {!open && c.status === 'published' && ' · outside window'}
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={!open || busyId === c.id}
                    onClick={() => void enter(c.id)}
                    style={{
                      padding: '0.65rem 1.2rem',
                      borderRadius: '6px',
                      border: 'none',
                      background: open ? C.accent : '#334155',
                      color: open ? '#020617' : '#64748b',
                      fontWeight: 700,
                      cursor: open ? 'pointer' : 'not-allowed',
                      fontSize: '0.9rem',
                    }}
                  >
                    {busyId === c.id ? 'Entering…' : 'Enter (burn credits)'}
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
