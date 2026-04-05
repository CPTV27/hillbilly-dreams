'use client';

import { useState, useEffect } from 'react';

interface GuildMember {
  userId: string;
  name: string | null;
  email: string | null;
  image: string | null;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  loreCount: number;
  lastActivity: string;
  entries: Array<{ id: string; change: number; reason: string; createdAt: string }>;
}

const REASON_LABELS: Record<string, string> = {
  signing_bonus: 'Signing Bonus',
  daily_burn: 'Daily Burn',
  lore_submit: 'Lore Submission',
  admin_adjust: 'Admin Adjustment',
  purchase_bypass: 'Purchase',
  barter: 'Barter',
  contest_entry: 'Contest Entry',
  photo_contribution: 'Photo Contribution',
  content_contribution: 'Content',
};

export default function GuildPage() {
  const [members, setMembers] = useState<GuildMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [adjustUserId, setAdjustUserId] = useState<string | null>(null);
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustReason, setAdjustReason] = useState('admin_adjust');
  const [submitting, setSubmitting] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch('/api/admin/guild')
      .then(r => r.json())
      .then(d => setMembers(d.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const submitAdjust = async () => {
    if (!adjustUserId || !adjustAmount || submitting) return;
    setSubmitting(true);
    try {
      await fetch('/api/admin/guild', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: adjustUserId, change: parseInt(adjustAmount, 10), reason: adjustReason }),
      });
      setAdjustUserId(null);
      setAdjustAmount('');
      load();
    } catch (err) {
      console.error('Adjust failed:', err);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Creative Guild</h1>
          <p className="admin-page-sub">Contributor profiles, credit balances, and lore submissions</p>
        </div>
        <button type="button" onClick={load} className="admin-btn admin-btn--ghost" style={{ minHeight: 44 }}>Refresh</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
        {[
          { label: 'Members', value: members.length },
          { label: 'Total Credits', value: members.reduce((s, m) => s + m.balance, 0) },
          { label: 'Lore Submissions', value: members.reduce((s, m) => s + m.loreCount, 0) },
        ].map(s => (
          <div key={s.label} className="admin-card" style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--accent)' }}>{s.value}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)' }}>Loading guild...</div>
      ) : members.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">{'*'}</div>
          <p className="admin-empty__text">No guild members yet. Credits get created when users contribute content, photos, or lore.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {members.map(m => (
            <div key={m.userId} className="admin-card" style={{ borderLeft: m.balance > 0 ? '3px solid var(--success)' : '3px solid var(--border)' }}>
              {/* Header */}
              <div className="guild-member-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', minWidth: 0 }}>
                  {m.image && (
                    <img src={m.image} alt="" style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0 }} />
                  )}
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)' }}>{m.name || 'Unknown'}</span>
                    {m.email && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginLeft: 'var(--space-2)', display: 'block', wordBreak: 'break-all' }}>{m.email}</span>}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: m.balance > 0 ? 'var(--success)' : 'var(--text-muted)' }}>{m.balance}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>credits</div>
                </div>
              </div>

              {/* Quick stats */}
              <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                <span>Earned: {m.totalEarned}</span>
                <span>Spent: {m.totalSpent}</span>
                <span>Lore: {m.loreCount}</span>
                <span>Last: {new Date(m.lastActivity).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setAdjustUserId(adjustUserId === m.userId ? null : m.userId)}
                  className="admin-btn admin-btn--ghost"
                  style={{ fontSize: 'var(--text-sm)', padding: '10px 14px', minHeight: 44 }}
                >
                  {adjustUserId === m.userId ? 'Cancel' : 'Adjust Credits'}
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedId(expandedId === m.userId ? null : m.userId)}
                  className="admin-btn admin-btn--ghost"
                  style={{ fontSize: 'var(--text-sm)', padding: '10px 14px', minHeight: 44 }}
                >
                  {expandedId === m.userId ? 'Hide History' : 'History'}
                </button>
              </div>

              {/* Adjust form */}
              {adjustUserId === m.userId && (
                <div className="guild-adjust-row" style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)', alignItems: 'stretch', flexWrap: 'wrap' }}>
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="+100 or -50"
                    value={adjustAmount}
                    onChange={e => setAdjustAmount(e.target.value)}
                    className="admin-input"
                    style={{ flex: '1 1 120px', minWidth: 100, minHeight: 44, padding: '10px 12px', fontSize: '16px' }}
                  />
                  <select
                    value={adjustReason}
                    onChange={e => setAdjustReason(e.target.value)}
                    className="admin-select"
                    style={{ flex: '1 1 180px', minHeight: 44, padding: '10px 32px 10px 12px', fontSize: '16px' }}
                  >
                    {Object.entries(REASON_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                  <button
                    type="button"
                    onClick={submitAdjust}
                    disabled={submitting || !adjustAmount}
                    className="admin-btn admin-btn--primary"
                    style={{ fontSize: 'var(--text-sm)', padding: '10px 18px', minHeight: 44 }}
                  >
                    Apply
                  </button>
                </div>
              )}

              {/* History */}
              {expandedId === m.userId && m.entries.length > 0 && (
                <div className="guild-history" style={{ marginTop: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-2)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {m.entries.map(e => (
                    <div
                      key={e.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        padding: 'var(--space-3)',
                        borderRadius: '8px',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--surface-raised, rgba(255,255,255,0.02))',
                        fontSize: 'var(--text-sm)',
                        minHeight: 44,
                      }}
                    >
                      <span style={{ color: 'var(--text-muted)' }}>{REASON_LABELS[e.reason] || e.reason}</span>
                      <span style={{ fontWeight: 600, color: e.change > 0 ? 'var(--success)' : 'var(--error)', flexShrink: 0 }}>
                        {e.change > 0 ? '+' : ''}{e.change}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 480px) {
          .guild-adjust-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .guild-adjust-row .admin-input,
          .guild-adjust-row .admin-select,
          .guild-adjust-row .admin-btn {
            width: 100%;
            flex: none !important;
          }
        }
      `}</style>
    </div>
  );
}
