'use client';

// apps/web/app/admin/roadmap/page.tsx
// Internal product roadmap — features + rollout. Not for customers.
// Source: docs/FEATURE_TIERS.md + hillbilly/directory-pitch roadmap section.

const FEATURE_TIERS = [
  {
    id: 'free',
    title: 'FREE — Trojan horse',
    subtitle: 'Integration lock-in · solve manual data entry',
    items: [
      'Universal POS-to-Accounting sync (Square/Toast → QBO/Xero)',
      'The "One Number" daily SMS (yesterday\'s revenue, one text)',
      'Basic receipt capture (photo → expense log)',
      'Central notification hub (alerts in one feed)',
      'Directory listing on Deep South Directory',
    ],
  },
  {
    id: 'doer',
    title: '$20/mo — The Doer',
    subtitle: 'Marketing & operations · "Take a photo. It does the rest."',
    items: [
      'Photo content engine (snap → caption → IG/FB/Google)',
      '5-number daily SMS briefing (metrics + one suggested action)',
      'AI review auto-responder (draft + post Google/Yelp)',
      'Basic AI CRM (customer data from POS/bookings)',
      'Email newsletter generator (photos + reviews → monthly)',
      'Competitor watchlist (pricing, review surges)',
      'Social listening alerts (SMS on Reddit/Facebook mentions)',
    ],
  },
  {
    id: 'manager',
    title: '$99/mo — The Manager',
    subtitle: 'Compliance & decisions',
    items: [
      'Automated compliance calendar via SMS (tax, licenses, inspections)',
      'Decision queue (SMS approve/decline on POs, refunds, shifts)',
      'Voice-to-action bookkeeping',
      'Smart inbox auto-drafting (emails → 1-tap response)',
      'AI business coach (voice idea → plan/ROI)',
      'Multi-channel menu/inventory sync',
      'Reputation dispute engine',
      'Smart shift scheduling',
    ],
  },
  {
    id: 'operator',
    title: '$1,500/mo — The Operator',
    subtitle: 'Full outsourced OS · $500K+/yr businesses',
    items: [
      'AI cash flow & margin forecasting (predictive SMS)',
      'Demand & weather prediction (foot traffic + staffing)',
      'Automated AR/AP chaser',
      'Dynamic pricing suggestions',
      'Multi-location roll-up (unified SMS)',
      '"Ask me anything" data query (text → real answer)',
    ],
  },
] as const;

const ANTI_CHURN = [
  { reason: 'Infrequent usage (#2, rising)', industry: 'Users forget to log in', ours: 'SMS-first — product on the lock screen every morning' },
  { reason: 'Manual data entry (#1 pain)', industry: '37% still retyping data', ours: 'Free POS sync eliminates this on day 1' },
  { reason: 'Too complex', industry: 'Dashboard fatigue', ours: 'No dashboard. Text + camera + voice' },
  { reason: "Doesn't show ROI", industry: "Users can't find the value", ours: 'Daily text tells them the value' },
] as const;

const ROLLOUT_PHASES = [
  {
    quarter: 'Q1',
    color: 'var(--accent, #4285F4)',
    title: 'The Natchez fortress (months 1–3)',
    body: 'Secure grant, deploy engine, manually onboard top anchor businesses.',
    metrics: [
      { label: 'Nodes', value: '18' },
      { label: 'Projected retained', value: '$38,500' },
    ],
  },
  {
    quarter: 'Q2',
    color: 'var(--warning, #f59e0b)',
    title: 'The circuit expansion (months 4–6)',
    body: 'Follow the Snowbird circuit. Nodes in Clarksdale, Memphis, Lafayette.',
    metrics: [
      { label: 'Nodes', value: '46' },
      { label: 'Projected retained', value: '$32,500' },
    ],
  },
  {
    quarter: 'H2',
    color: 'var(--text-disabled)',
    title: 'Density & dominance (months 7–12)',
    body: 'Scale to 10+ cities; 150 paying operators; 15 major venue nodes.',
    metrics: [
      { label: 'Nodes', value: '165' },
      { label: 'Projected retained', value: '$144,000' },
    ],
  },
] as const;

export default function InternalRoadmapPage() {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Product roadmap</h1>
          <p className="admin-page-sub">
            Internal only — feature backlog and rollout model. Synthesized from{' '}
            <code style={{ fontSize: '0.85em' }}>docs/FEATURE_TIERS.md</code> and the Natchez pitch
            rollout. DSD retail tiers on the public site may use different names and TBD pricing.
          </p>
        </div>
      </div>

      <div
        className="admin-card"
        style={{
          marginBottom: 'var(--space-6)',
          borderLeft: '4px solid var(--error, #ef4444)',
          background: 'var(--surface-2)',
        }}
      >
        <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--text)' }}>Do not share externally</strong> without stripping financials
          and verifying every line against what is actually shipped. Numbers here are planning artifacts, not
          promises.
        </p>
      </div>

      {/* Feature tiers */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-2)' }}>
          Feature tiers (platform)
        </h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-6)', lineHeight: 1.6 }}>
          Last updated March 26, 2026 in docs. Tier dollars are strategic placeholders — adjust before any sale.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {FEATURE_TIERS.map((tier) => (
            <section
              key={tier.id}
              style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-5)',
                background: 'var(--surface)',
              }}
            >
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>
                {tier.title}
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--accent)', margin: '0 0 var(--space-4)', fontWeight: 600 }}>
                {tier.subtitle}
              </p>
              <ol style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                {tier.items.map((item) => (
                  <li key={item} style={{ marginBottom: 'var(--space-1)' }}>
                    {item}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>

      {/* Anti-churn */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>
          Anti-churn architecture
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: 'var(--space-2)', color: 'var(--text-disabled)' }}>Churn reason</th>
                <th style={{ textAlign: 'left', padding: 'var(--space-2)', color: 'var(--text-disabled)' }}>Industry average</th>
                <th style={{ textAlign: 'left', padding: 'var(--space-2)', color: 'var(--text-disabled)' }}>Our answer</th>
              </tr>
            </thead>
            <tbody>
              {ANTI_CHURN.map((row) => (
                <tr key={row.reason} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: 'var(--space-3) var(--space-2)', color: 'var(--text)', fontWeight: 600 }}>{row.reason}</td>
                  <td style={{ padding: 'var(--space-3) var(--space-2)', color: 'var(--text-muted)' }}>{row.industry}</td>
                  <td style={{ padding: 'var(--space-3) var(--space-2)', color: 'var(--text-muted)' }}>{row.ours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 12-month rollout */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-2)' }}>
          12-month rollout &amp; pro forma (planning)
        </h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-6)' }}>
          From the Natchez / corridor pitch model. Revisit quarterly.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {ROLLOUT_PHASES.map((phase) => (
            <div
              key={phase.quarter}
              style={{
                display: 'flex',
                gap: 'var(--space-5)',
                padding: 'var(--space-5)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-2)',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 'var(--text-lg)',
                  fontWeight: 800,
                  color: phase.color,
                }}
              >
                {phase.quarter}
              </div>
              <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-2)' }}>
                  {phase.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-3)', lineHeight: 1.6 }}>
                  {phase.body}
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-6)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {phase.metrics.map((m) => (
                    <div key={m.label}>
                      {m.label}:{' '}
                      <span style={{ color: phase.color }}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 'var(--space-6)',
            padding: 'var(--space-5)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            background: 'var(--surface)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-disabled)',
                marginBottom: 4,
              }}
            >
              Year 1 projected net income (model)
            </div>
            <div style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--success, #22c55e)' }}>
              ~$177,500
            </div>
          </div>
          <div style={{ textAlign: 'right' as const }}>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 8 }}>
              Exiting year 1 at ~$350K ARR (model)
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>96% gross cloud margins (model)</div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>
        Public Natchez pitch with embedded roadmap:{' '}
        <a href="/hillbilly/directory-pitch" style={{ color: 'var(--accent)' }}>
          /hillbilly/directory-pitch
        </a>{' '}
        (customer-facing styling; may include asks not approved for distribution).
      </p>
    </>
  );
}
