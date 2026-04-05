'use client';

import { useState, useEffect } from 'react';

interface AuditData {
  timestamp: string;
  overall: string;
  categories: {
    database: { grade: string; models: number; compositeIndexes: number; uniqueConstraints: number };
    security: { grade: string; totalRoutes: number; authedRoutes: number; unauthedRoutes: number; coverage: string };
    aiRouting: { grade: string; callAIRoutes: number; directVertexRoutes: number; totalAIRoutes: number };
    pricing: { grade: string; oldPricingRefs: number; currentPricingRefs: number };
    forceDynamic: { grade: string; compliant: number; total: number; coverage: string };
  };
}

const GRADE_COLORS: Record<string, string> = {
  'A': '#4a7c59', 'A-': '#4a7c59', 'B+': '#6a8c4a', 'B': '#c8943e', 'C': '#c89e3e', 'D': '#b54c4c', 'F': '#b54c4c',
};

const CHECKLIST = [
  { id: 'entity', label: 'Mississippi corporation filed', category: 'Legal', check: () => true, note: 'Filing this week. Operating agreement in Google Docs.' },
  { id: 'equity', label: 'Equity agreements documented', category: 'Legal', check: () => true, note: 'Three partners: Tracy, Amy, trust.' },
  { id: 'ip', label: 'IP assignment in operating agreement', category: 'Legal', check: () => false, note: 'Tracy to verify before filing.' },
  { id: 'stripe', label: 'Stripe payment processing', category: 'Commerce', check: () => false, note: 'Tracy setting up account.' },
  { id: 'tos', label: 'Terms of Service page', category: 'Legal', check: () => false, note: 'Needed before accepting payments.' },
  { id: 'privacy', label: 'Privacy policy', category: 'Legal', check: () => false, note: 'Required for Google OAuth + data handling.' },
  { id: 'insurance', label: 'Business insurance (E&O + cyber)', category: 'Legal', check: () => false, note: 'Tracy researching.' },
  { id: 'pi-order', label: 'Sovereign Pi parts ordered', category: 'Hardware', check: () => false, note: 'Tracy\'s Asana task — order today.' },
  { id: 'pi-prototype', label: 'First Pi prototype assembled', category: 'Hardware', check: () => false, note: 'After parts arrive.' },
  { id: 'android', label: 'Android test device', category: 'Hardware', check: () => false, note: 'Samsung Tab A9+ recommended.' },
  { id: 'first-client', label: 'First paying DSD client', category: 'Revenue', check: () => false, note: 'Target: April 17 soft launch.' },
  { id: 'ten-clients', label: '10 paying DSD clients', category: 'Revenue', check: () => false, note: 'Target: April 27 full launch.' },
  { id: 'gworkspace', label: 'Google Workspace reseller application', category: 'Growth', check: () => false, note: 'Bundle email in $99 tier.' },
  { id: 'bearsville', label: 'Bearsville Creative activation', category: 'Growth', check: () => false, note: 'Summer 2026. Elijah + Miles as operators.' },
  { id: 'banking', label: 'Regional bank pilot (Tracy approved)', category: 'Growth', check: () => false, note: 'Tracy owns this. No external conversations until approved.' },
];

export default function ReportCardPage() {
  const [audit, setAudit] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState('');
  const [issues, setIssues] = useState<Array<{ number: number; title: string; state: string; labels: string[]; created: string }>>([]);
  const [issueStats, setIssueStats] = useState({ open: 0, closed: 0, closedToday: 0 });

  const load = () => {
    setLoading(true);
    fetch('/api/admin/audit')
      .then(r => r.json())
      .then(d => { setAudit(d); setLastRefresh(new Date().toLocaleTimeString()); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const loadIssues = () => {
    // Fetch from our tasks API as a proxy for issue tracking
    fetch('/api/admin/tasks?type=all')
      .then(r => r.json())
      .then(d => {
        const items = d.data || [];
        const open = items.filter((t: { status: string }) => !['completed', 'failed'].includes(t.status));
        const closed = items.filter((t: { status: string }) => t.status === 'completed');
        const today = new Date().toDateString();
        const closedToday = closed.filter((t: { created: string }) => new Date(t.created).toDateString() === today);
        setIssueStats({ open: open.length, closed: closed.length, closedToday: closedToday.length });
        setIssues(items.slice(0, 20).map((t: { id: string; title: string; status: string; created: string }) => ({
          number: parseInt(t.id) || 0,
          title: t.title,
          state: t.status === 'completed' ? 'closed' : 'open',
          labels: [],
          created: t.created,
        })));
      })
      .catch(() => {});
  };

  useEffect(() => { load(); loadIssues(); }, []);

  const gradeColor = (g: string) => GRADE_COLORS[g] || 'var(--text-muted)';

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Report Card</h1>
          <p className="admin-page-sub">Live codebase audit — updates every time you refresh</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          {lastRefresh && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>Updated {lastRefresh}</span>}
          <button onClick={load} className="admin-btn admin-btn--ghost">Refresh</button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)' }}>Running audit...</div>
      ) : audit ? (
        <>
          {/* Overall Grade */}
          <div className="admin-card" style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <div style={{ fontSize: '4rem', fontWeight: 800, color: gradeColor(audit.overall), lineHeight: 1 }}>{audit.overall}</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>Overall Platform Grade</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginTop: 'var(--space-1)' }}>{audit.timestamp}</div>
          </div>

          {/* Category Grades */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            {[
              { label: 'Database', grade: audit.categories.database.grade, detail: `${audit.categories.database.models} models, ${audit.categories.database.compositeIndexes} indexes` },
              { label: 'API Security', grade: audit.categories.security.grade, detail: `${audit.categories.security.coverage} coverage (${audit.categories.security.authedRoutes}/${audit.categories.security.totalRoutes})` },
              { label: 'AI Routing', grade: audit.categories.aiRouting.grade, detail: `${audit.categories.aiRouting.callAIRoutes} routed, ${audit.categories.aiRouting.directVertexRoutes} direct` },
              { label: 'Pricing', grade: audit.categories.pricing.grade, detail: `${audit.categories.pricing.oldPricingRefs} stale refs, ${audit.categories.pricing.currentPricingRefs} current` },
              { label: 'Force Dynamic', grade: audit.categories.forceDynamic.grade, detail: `${audit.categories.forceDynamic.coverage} (${audit.categories.forceDynamic.compliant}/${audit.categories.forceDynamic.total})` },
            ].map(c => (
              <div key={c.label} className="admin-card" style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: gradeColor(c.grade) }}>{c.grade}</div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text)', marginTop: 'var(--space-1)' }}>{c.label}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginTop: 'var(--space-1)' }}>{c.detail}</div>
              </div>
            ))}
          </div>

          {/* Issue Tracking — The Feedback Loop */}
          <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>Feedback Loop</h2>
          <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--error, #b54c4c)' }}>{issueStats.open}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>Open Issues</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--success, #4a7c59)' }}>{issueStats.closed}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>Resolved</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--accent)' }}>{issueStats.closed > 0 ? Math.round((issueStats.closed / (issueStats.open + issueStats.closed)) * 100) : 0}%</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>Resolution Rate</div>
              </div>
            </div>
            {/* Progress bar */}
            <div style={{ height: 8, background: 'var(--surface-2)', borderRadius: 4, overflow: 'hidden', marginBottom: 'var(--space-3)' }}>
              <div style={{ height: '100%', width: `${issueStats.closed > 0 ? Math.round((issueStats.closed / (issueStats.open + issueStats.closed)) * 100) : 0}%`, background: 'var(--success)', borderRadius: 4, transition: 'width 0.5s' }} />
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', textAlign: 'center' }}>
              RAG audit finds issues → GitHub tracks them → Agents fix them → Grades update automatically
            </p>
          </div>

          {/* Launch Checklist */}
          <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>Launch Checklist</h2>

          {['Legal', 'Commerce', 'Hardware', 'Revenue', 'Growth'].map(cat => (
            <div key={cat} style={{ marginBottom: 'var(--space-4)' }}>
              <h3 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', marginBottom: 'var(--space-2)' }}>{cat}</h3>
              {CHECKLIST.filter(c => c.category === cat).map(item => {
                const done = item.check();
                return (
                  <div key={item.id} className="admin-card" style={{ padding: 'var(--space-2) var(--space-4)', marginBottom: 'var(--space-1)', borderLeft: `3px solid ${done ? 'var(--success)' : 'var(--border)'}`, opacity: done ? 0.7 : 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text)', textDecoration: done ? 'line-through' : 'none' }}>{item.label}</span>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginLeft: 'var(--space-2)' }}>{item.note}</span>
                      </div>
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: done ? 'var(--success)' : 'var(--text-disabled)' }}>
                        {done ? '\u2713' : '\u2014'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </>
      ) : (
        <div className="admin-error-banner">Failed to load audit data</div>
      )}
    </div>
  );
}
