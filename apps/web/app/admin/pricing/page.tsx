'use client';

// apps/web/app/admin/pricing/page.tsx
// Pricing Dashboard — Tracy can see current rules, rates, and recent changes.
// Dynamic pricing engine runs daily via /api/cron/dynamic-pricing.

import { useState } from 'react';

// Current pricing rules (mirrors DEFAULT_PRICING_RULES in lib/cloudbeds.ts)
const PRICING_TIERS = [
  { label: 'Midweek Off-Season', rate: '$160', note: 'Floor rate — breakeven baseline', color: 'var(--text-disabled)' },
  { label: 'Standard Midweek', rate: '$200', note: 'Base rate for all calculations', color: 'var(--text)' },
  { label: 'Weekend (Fri-Sat)', rate: '$249', note: '2-night minimum required', color: 'var(--accent, #4285F4)' },
  { label: 'Peak Midweek', rate: '$200', note: 'During Pilgrimage or events', color: 'var(--warning)' },
  { label: 'Peak Weekend', rate: '$279', note: '2-night minimum', color: 'var(--warning)' },
  { label: 'Event Rate', rate: '$299–$349', note: 'Pilgrimage, Balloon Festival, etc.', color: 'var(--error, #ef4444)' },
  { label: 'Ceiling', rate: '$400', note: 'Maximum rate — never exceeded', color: 'var(--error, #ef4444)' },
];

const DYNAMIC_RULES = [
  { rule: 'Weekend Multiplier', value: '1.245x', desc: '$200 base × 1.245 = $249/night. Fri-Sat only. 2-night minimum enforced.' },
  { rule: 'High Occupancy Surge', value: '+15%', desc: 'When 4+ of 6 rooms are booked, all remaining rooms get a 15% bump.' },
  { rule: 'Last-Minute Fill', value: '-10%', desc: 'Within 48 hours of check-in, if 3+ rooms are still open, drop 10% to fill.' },
  { rule: 'Event Pricing', value: '1.5x', desc: 'Pilgrimage, Balloon Festival, and other event dates get 1.5x base rate.' },
  { rule: 'Floor Rate', value: '$160', desc: 'Never go below $160/night. That is our breakeven.' },
  { rule: 'Ceiling Rate', value: '$400', desc: 'Never go above $400/night. Even during events.' },
];

const EVENTS = [
  { name: 'Spring Pilgrimage', dates: 'Mar 15–30', rate: '$299', minStay: '2 nights', status: 'active' },
  { name: 'Fall Pilgrimage', dates: 'Oct 10–25', rate: '$299', minStay: '2 nights', status: 'upcoming' },
  { name: 'Balloon Festival', dates: 'Oct 17–19', rate: '$349', minStay: '2 nights', status: 'upcoming' },
  { name: 'Live at Five (May 8)', dates: 'May 8–9', rate: '$249', minStay: '1 night', status: 'upcoming' },
];

const STRATEGY = [
  { phase: 'Now', desc: 'Sell unsold inventory. Fill rooms at current rates. Build occupancy baseline.' },
  { phase: 'Month 2–3', desc: 'As occupancy improves, raise midweek base from $160 to $180. Weekend stays at $249.' },
  { phase: 'Month 4–6', desc: 'If consistently selling out weekends, raise weekend to $279. Midweek to $200 standard.' },
  { phase: 'Month 6+', desc: 'If demand supports it, raise base to $225. Events at $349+. Add premium room surcharges.' },
];

export default function PricingDashboard() {
  const [showStrategy, setShowStrategy] = useState(true);

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Pricing</h1>
          <p className="admin-page-sub">
            Dynamic pricing runs daily at 7 AM. Rates adjust based on occupancy, events, and timing.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <a href="https://hotels.cloudbeds.com" target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn--ghost">
            Open CloudBeds ↗
          </a>
        </div>
      </div>

      {/* Rate Card */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>Current Rate Tiers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
          {PRICING_TIERS.map((t) => (
            <div key={t.label} style={{
              padding: 'var(--space-4)',
              background: 'var(--surface-2)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: t.color, letterSpacing: '-0.02em' }}>{t.rate}</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text)', marginTop: 'var(--space-1)' }}>{t.label}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginTop: 'var(--space-1)' }}>{t.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Rules */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>How Pricing Adjusts Automatically</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Rule</th>
                <th>Adjustment</th>
                <th>How It Works</th>
              </tr>
            </thead>
            <tbody>
              {DYNAMIC_RULES.map((r) => (
                <tr key={r.rule}>
                  <td style={{ fontWeight: 600 }}>{r.rule}</td>
                  <td>
                    <span className="admin-badge admin-badge--upcoming">{r.value}</span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Pricing */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>Event Pricing</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Dates</th>
                <th>Rate</th>
                <th>Min Stay</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {EVENTS.map((e) => (
                <tr key={e.name}>
                  <td style={{ fontWeight: 600 }}>{e.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{e.dates}</td>
                  <td style={{ fontWeight: 700, color: 'var(--accent, #4285F4)' }}>{e.rate}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{e.minStay}</td>
                  <td>
                    <span className={`admin-badge ${e.status === 'active' ? 'admin-badge--active' : 'admin-badge--scheduled'}`}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Strategy — The Ramp */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: 0 }}>Pricing Strategy — The Ramp</h2>
          <button className="admin-btn admin-btn--ghost" onClick={() => setShowStrategy(!showStrategy)}>
            {showStrategy ? 'Hide' : 'Show'}
          </button>
        </div>
        {showStrategy && (
          <>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
              Start low to fill rooms and build occupancy. Raise prices as demand proves out. Never guess — let the data decide.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
              {STRATEGY.map((s, i) => (
                <div key={s.phase} style={{
                  padding: 'var(--space-4)',
                  background: 'var(--surface-2)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  borderTop: i === 0 ? '2px solid var(--success)' : i === 3 ? '2px solid var(--accent, #4285F4)' : '2px solid var(--border)',
                }}>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 'var(--space-2)' }}>{s.phase}</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text)', lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Quick Links */}
      <div className="admin-card">
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>Quick Links</h2>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <a href="https://hotels.cloudbeds.com" target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn--ghost">CloudBeds Dashboard ↗</a>
          <a href="/admin/finance" className="admin-btn admin-btn--ghost">Finance Dashboard</a>
          <a href="/admin/launch" className="admin-btn admin-btn--ghost">Launch Dashboard</a>
          <a href="/admin/calendar" className="admin-btn admin-btn--ghost">Calendar</a>
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginTop: 'var(--space-3)' }}>
          To change pricing rules, talk to Chase. The pricing engine updates CloudBeds automatically every morning at 7 AM.
          To override a specific date, make the change directly in CloudBeds — it won't be overwritten until the next day.
        </p>
      </div>
    </>
  );
}
