'use client';

import { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════
// HDI HQ — Executive Dashboard
// Valuation estimate, coordination multipliers, active work,
// brand health, team capacity, launch countdown
// ═══════════════════════════════════════════════════════════

// ── Valuation Model ──
// Conservative "Zillow estimate" based on revenue multiples and asset values

const BRANDS = [
  {
    name: 'Deep South Directory',
    domain: 'deepsouthdirectory.com',
    category: 'SaaS / Local Marketing',
    revenue: { current: 0, projected: 120000, basis: '100 clients × $99/mo avg' },
    multiple: 8,
    assets: 'Directory DB, AI pipeline, 5-tier pricing, walk-in sales system',
    status: 'Pre-revenue — launching Apr 27',
  },
  {
    name: 'Big Muddy Touring',
    domain: 'bigmuddytouring.com',
    category: 'Live Entertainment',
    revenue: { current: 0, projected: 72000, basis: '3 shows/wk × $500 avg × 48 wks' },
    multiple: 3,
    assets: 'Venue network, artist pipeline, Blues Room, Sprinter van',
    status: 'Active — shows running',
  },
  {
    name: 'Big Muddy Magazine',
    domain: 'bigmuddymagazine.com',
    category: 'Digital Media / Publishing',
    revenue: { current: 0, projected: 36000, basis: 'Ad revenue + sponsored features' },
    multiple: 5,
    assets: '18 OE chapters, 6 case studies, editorial pipeline, photo library',
    status: 'Active — content publishing',
  },
  {
    name: 'Big Muddy Radio',
    domain: 'bigmuddyradio.com',
    category: 'Broadcasting',
    revenue: { current: 0, projected: 24000, basis: 'Sponsorships + streaming' },
    multiple: 4,
    assets: 'Icecast stream, Mac Mini broadcast, show archive',
    status: 'Active — streaming',
  },
  {
    name: 'Big Muddy Records',
    domain: 'bigmuddyrecordlabel.com',
    category: 'Music Label',
    revenue: { current: 0, projected: 18000, basis: 'Distribution + sync licensing' },
    multiple: 4,
    assets: 'Artist roster, MelodyVault pipeline, non-exclusive deal structure',
    status: 'Active — artists signing',
  },
  {
    name: 'Big Muddy Inn',
    domain: 'bigmuddytouring.com/inn',
    category: 'Hospitality',
    revenue: { current: 0, projected: 180000, basis: '6 rooms × $275 ADR × 25% occ × 365' },
    multiple: 2,
    assets: '6 rooms, Blues Room venue, downtown Natchez location',
    status: 'Active — taking bookings',
  },
  {
    name: 'Studio C Video',
    domain: 'studiocvideo.com',
    category: 'Production Services',
    revenue: { current: 0, projected: 96000, basis: '~8 shoots/mo × $1,000 avg' },
    multiple: 3,
    assets: '$70-80K equipment, Utopia Studios (Bearsville, NY), multi-cam broadcast',
    status: 'Active — booking sessions',
  },
  {
    name: 'Tuthill Design',
    domain: 'tuthilldesign.com',
    category: 'Creative Services',
    revenue: { current: 0, projected: 60000, basis: 'Realtor Pulse ($500/mo) × 10 clients' },
    multiple: 3,
    assets: 'Real estate vertical, branding portfolio, design system',
    status: 'Active — client work',
  },
  {
    name: 'Bearsville Creative',
    domain: 'bearsvillemediagroup.com',
    category: 'Regional Media (NE Clone)',
    revenue: { current: 0, projected: 0, basis: 'Summer 2026 activation' },
    multiple: 8,
    assets: 'Utopia Studios campus, 5-VLAN network, NAS, WiFi infrastructure',
    status: 'Pre-launch — summer 2026',
  },
  {
    name: 'Outsider Economics',
    domain: 'outsidereconomics.com',
    category: 'Publishing / Thought Leadership',
    revenue: { current: 0, projected: 12000, basis: 'Book sales + speaking' },
    multiple: 5,
    assets: '18 chapters, 6 case studies, Chase\'s voice, field manual format',
    status: 'Active — publishing',
  },
  {
    name: 'MBT Platform',
    domain: 'measurablybetter.life',
    category: 'Technology Platform',
    revenue: { current: 0, projected: 0, basis: 'Infrastructure — revenue flows through brands' },
    multiple: 12,
    assets: '122 Prisma models, 14 domains, multi-tenant, AI pipeline, Vercel deploy',
    status: 'Active — powering everything',
  },
];

const COORDINATION_MULTIPLIERS = [
  { from: 'Shows', to: 'Inn', multiplier: '2:1', desc: 'Every show fills rooms' },
  { from: 'Shows', to: 'Radio', multiplier: '1:1', desc: 'Every show becomes radio content' },
  { from: 'Shows', to: 'Records', multiplier: '1:3', desc: 'Every show = 3 recordings' },
  { from: 'Magazine', to: 'DSD', multiplier: '1:5', desc: 'Every feature = 5 business mentions' },
  { from: 'Radio', to: 'Magazine', multiplier: '1:2', desc: 'Every broadcast = 2 articles' },
  { from: 'DSD', to: 'Shows', multiplier: '1:1', desc: 'Every DSD client = potential venue' },
  { from: 'Photography', to: 'All', multiplier: '1:8', desc: 'Every shoot feeds 8 channels' },
  { from: 'Inn', to: 'DSD', multiplier: '1:1', desc: 'Every guest discovers the directory' },
];

const MILESTONES = [
  { date: '2026-04-12', label: 'Art Show — Radio Studio', status: 'upcoming' },
  { date: '2026-04-17', label: 'Soft Launch — Amy\'s Country Show', status: 'upcoming' },
  { date: '2026-04-27', label: 'Full Launch — DSD Goes Live', status: 'upcoming' },
  { date: '2026-05-08', label: 'Amy\'s Live at Five', status: 'upcoming' },
  { date: '2026-06-01', label: 'Bearsville Summer Activation', status: 'planned' },
];

function daysUntil(dateStr: string): number {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function formatMoney(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
}

// ── Revenue Forecast Scenarios ──
const SCENARIOS = [
  { name: 'Conservative', newClientsPerMonth: 5, avgRevPerClient: 75, churnRate: 5, piAttachRate: 20, displayAttachRate: 10 },
  { name: 'Base', newClientsPerMonth: 10, avgRevPerClient: 85, churnRate: 3, piAttachRate: 30, displayAttachRate: 15 },
  { name: 'Aggressive', newClientsPerMonth: 20, avgRevPerClient: 99, churnRate: 2, piAttachRate: 40, displayAttachRate: 25 },
];

function forecastRevenue(scenario: typeof SCENARIOS[0], months: number = 12) {
  const results = [];
  let totalClients = 0;
  let cumulativeRevenue = 0;
  let mrr = 0;

  for (let m = 1; m <= months; m++) {
    // New clients this month
    const newClients = scenario.newClientsPerMonth;
    // Churn
    const churned = Math.floor(totalClients * (scenario.churnRate / 100));
    totalClients = totalClients + newClients - churned;

    // MRR from subscriptions
    mrr = totalClients * scenario.avgRevPerClient;

    // Hardware revenue (one-time from new clients)
    const piRevenue = newClients * (scenario.piAttachRate / 100) * 299;
    const displayRevenue = newClients * (scenario.displayAttachRate / 100) * 99;

    const monthlyTotal = mrr + piRevenue + displayRevenue;
    cumulativeRevenue += monthlyTotal;

    results.push({
      month: m,
      label: new Date(2026, 3 + m, 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      totalClients,
      mrr,
      piRevenue,
      displayRevenue,
      monthlyTotal,
      cumulativeRevenue,
      arr: mrr * 12,
    });
  }
  return results;
}

export default function HQDashboard() {
  const [openIssues, setOpenIssues] = useState(0);
  const [closedIssues, setClosedIssues] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(1); // Base scenario
  const [customNew, setCustomNew] = useState(10);
  const [customArpu, setCustomArpu] = useState(85);
  const [customChurn, setCustomChurn] = useState(3);
  const [useCustom, setUseCustom] = useState(false);

  useEffect(() => {
    // Fetch GitHub issue counts via our API
    fetch('/api/admin/tasks')
      .then(r => r.json())
      .then(d => {
        const items = d.data || [];
        setOpenIssues(items.filter((t: { status: string }) => t.status !== 'completed').length);
        setClosedIssues(items.filter((t: { status: string }) => t.status === 'completed').length);
      })
      .catch(() => {});
  }, []);

  // Calculate valuations
  const totalProjectedRevenue = BRANDS.reduce((s, b) => s + b.revenue.projected, 0);
  const totalValuation = BRANDS.reduce((s, b) => s + (b.revenue.projected * b.multiple), 0);
  const platformMultiple = totalValuation / (totalProjectedRevenue || 1);
  const activeBrands = BRANDS.filter(b => b.status.startsWith('Active')).length;
  const totalAssetValue = 150000; // Equipment + IP estimate

  const nextMilestone = MILESTONES.find(m => daysUntil(m.date) > 0);

  return (
    <div className="admin-hq-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">HQ</h1>
          <p className="admin-page-sub">Hillbilly Dreams Inc — Executive Dashboard</p>
        </div>
      </div>

      {/* Countdown */}
      {nextMilestone && (
        <div className="admin-card" style={{ textAlign: 'center', marginBottom: 'var(--space-6)', background: 'var(--accent-muted)', borderColor: 'var(--accent)' }}>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{daysUntil(nextMilestone.date)}</div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text)', marginTop: 'var(--space-1)' }}>days to {nextMilestone.label}</div>
        </div>
      )}

      {/* Valuation Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
        {[
          { label: 'Estimated Valuation', value: formatMoney(totalValuation), color: 'var(--accent)' },
          { label: 'Projected Revenue (Y1)', value: formatMoney(totalProjectedRevenue), color: 'var(--success)' },
          { label: 'Blended Multiple', value: `${platformMultiple.toFixed(1)}x`, color: 'var(--accent)' },
          { label: 'Active Brands', value: activeBrands, color: 'var(--text)' },
          { label: 'Domains', value: '14', color: 'var(--text)' },
          { label: 'DB Models', value: '122', color: 'var(--text)' },
        ].map(s => (
          <div key={s.label} className="admin-card" style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: s.color as string }}>{s.value}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginTop: 'var(--space-1)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Brand Valuation Cards */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>Revenue Forecast</h2>
        {(() => {
          const activeScenario = useCustom
            ? { name: 'Custom', newClientsPerMonth: customNew, avgRevPerClient: customArpu, churnRate: customChurn, piAttachRate: 30, displayAttachRate: 15 }
            : SCENARIOS[scenarioIndex];
          const forecast = forecastRevenue(activeScenario);
          const month12 = forecast[11];
          const maxMrr = Math.max(...forecast.map(f => f.mrr));

          return (
            <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
              {/* Scenario selector */}
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
                {SCENARIOS.map((s, i) => (
                  <button key={s.name} onClick={() => { setScenarioIndex(i); setUseCustom(false); }} style={{
                    padding: '6px 16px', fontSize: 'var(--text-xs)', fontWeight: 600, borderRadius: 'var(--radius-full)', cursor: 'pointer',
                    background: !useCustom && scenarioIndex === i ? 'var(--accent)' : 'transparent',
                    color: !useCustom && scenarioIndex === i ? 'var(--bg)' : 'var(--text-muted)',
                    border: !useCustom && scenarioIndex === i ? 'none' : '1px solid var(--border)',
                  }}>{s.name}</button>
                ))}
                <button onClick={() => setUseCustom(true)} style={{
                  padding: '6px 16px', fontSize: 'var(--text-xs)', fontWeight: 600, borderRadius: 'var(--radius-full)', cursor: 'pointer',
                  background: useCustom ? 'var(--accent)' : 'transparent',
                  color: useCustom ? 'var(--bg)' : 'var(--text-muted)',
                  border: useCustom ? 'none' : '1px solid var(--border)',
                }}>Custom</button>
              </div>

              {/* Custom sliders */}
              {useCustom && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <label style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', display: 'block', marginBottom: 'var(--space-1)' }}>New clients/mo: {customNew}</label>
                    <input type="range" min="1" max="50" value={customNew} onChange={e => setCustomNew(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#c8943e' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', display: 'block', marginBottom: 'var(--space-1)' }}>Avg revenue/client: ${customArpu}</label>
                    <input type="range" min="25" max="250" step="5" value={customArpu} onChange={e => setCustomArpu(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#c8943e' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', display: 'block', marginBottom: 'var(--space-1)' }}>Monthly churn: {customChurn}%</label>
                    <input type="range" min="0" max="15" value={customChurn} onChange={e => setCustomChurn(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#c8943e' }} />
                  </div>
                </div>
              )}

              {/* Key metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--accent)' }}>{month12.totalClients}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>Clients (Month 12)</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--success)' }}>{formatMoney(month12.mrr)}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>MRR (Month 12)</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--accent)' }}>{formatMoney(month12.arr)}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>ARR (Month 12)</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--text)' }}>{formatMoney(month12.cumulativeRevenue)}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>Cumulative (12mo)</div>
                </div>
              </div>

              {/* Bar chart */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 120, marginBottom: 'var(--space-3)' }}>
                {forecast.map(f => (
                  <div key={f.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{
                      width: '100%', background: 'var(--accent)', borderRadius: '2px 2px 0 0',
                      height: `${(f.mrr / maxMrr) * 100}%`, minHeight: 2,
                    }} />
                    <span style={{ fontSize: '9px', color: 'var(--text-disabled)' }}>{f.label}</span>
                  </div>
                ))}
              </div>

              {/* Monthly breakdown table */}
              <details>
                <summary style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: 'var(--space-2)' }}>Monthly breakdown</summary>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', fontSize: 'var(--text-xs)', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)' }}>
                        <th style={{ textAlign: 'left', padding: '4px 8px', color: 'var(--text-disabled)' }}>Month</th>
                        <th style={{ textAlign: 'right', padding: '4px 8px', color: 'var(--text-disabled)' }}>Clients</th>
                        <th style={{ textAlign: 'right', padding: '4px 8px', color: 'var(--text-disabled)' }}>MRR</th>
                        <th style={{ textAlign: 'right', padding: '4px 8px', color: 'var(--text-disabled)' }}>Pi Rev</th>
                        <th style={{ textAlign: 'right', padding: '4px 8px', color: 'var(--text-disabled)' }}>Total</th>
                        <th style={{ textAlign: 'right', padding: '4px 8px', color: 'var(--text-disabled)' }}>Cumulative</th>
                      </tr>
                    </thead>
                    <tbody>
                      {forecast.map(f => (
                        <tr key={f.month} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '4px 8px', color: 'var(--text-muted)' }}>{f.label}</td>
                          <td style={{ padding: '4px 8px', textAlign: 'right', color: 'var(--text)' }}>{f.totalClients}</td>
                          <td style={{ padding: '4px 8px', textAlign: 'right', color: 'var(--success)' }}>{formatMoney(f.mrr)}</td>
                          <td style={{ padding: '4px 8px', textAlign: 'right', color: 'var(--text-muted)' }}>{formatMoney(f.piRevenue)}</td>
                          <td style={{ padding: '4px 8px', textAlign: 'right', fontWeight: 600, color: 'var(--text)' }}>{formatMoney(f.monthlyTotal)}</td>
                          <td style={{ padding: '4px 8px', textAlign: 'right', color: 'var(--accent)' }}>{formatMoney(f.cumulativeRevenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>

              {/* Assumptions */}
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginTop: 'var(--space-3)', lineHeight: 1.5 }}>
                {activeScenario.name}: {activeScenario.newClientsPerMonth} new clients/mo, ${activeScenario.avgRevPerClient} ARPU, {activeScenario.churnRate}% monthly churn, {activeScenario.piAttachRate}% Pi attach, {activeScenario.displayAttachRate}% display attach. Hardware at $299 (Pi) and $99 (display module).
              </p>
            </div>
          );
        })()}

        <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>Brand Valuations</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {BRANDS.filter(b => b.revenue.projected > 0).sort((a, b) => (b.revenue.projected * b.multiple) - (a.revenue.projected * a.multiple)).map(brand => {
            const val = brand.revenue.projected * brand.multiple;
            const pct = (val / totalValuation) * 100;
            return (
              <div key={brand.name} className="admin-card" style={{ padding: 'var(--space-3) var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)' }}>{brand.name}</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginLeft: 'var(--space-2)' }}>{brand.category}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--accent)' }}>{formatMoney(val)}</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginLeft: 'var(--space-2)' }}>{brand.multiple}x</span>
                  </div>
                </div>
                {/* Bar */}
                <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 2 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{brand.revenue.basis}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>{brand.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coordination Multipliers */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>Coordination Multipliers</h2>
        <div className="admin-card">
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
            Every piece feeds every other piece. This is why the platform is worth more than the sum of individual brands.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-2)' }}>
            {COORDINATION_MULTIPLIERS.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2) var(--space-3)', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--accent)', minWidth: 40, textAlign: 'center' }}>{m.multiplier}</span>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text)' }}>{m.from} &rarr; {m.to}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>Launch Timeline</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {MILESTONES.map((m, i) => {
            const days = daysUntil(m.date);
            const isPast = days < 0;
            const isNext = nextMilestone && m.date === nextMilestone.date;
            return (
              <div key={i} className="admin-card" style={{
                padding: 'var(--space-3) var(--space-4)',
                borderLeft: isNext ? '3px solid var(--accent)' : '3px solid var(--border)',
                opacity: isPast ? 0.5 : 1,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: isNext ? 'var(--accent)' : 'var(--text)' }}>{m.label}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: days <= 7 ? 'var(--error)' : days <= 14 ? 'var(--warning)' : 'var(--text-muted)' }}>
                      {isPast ? 'Done' : `${days}d`}
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginLeft: 'var(--space-2)' }}>{m.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-Region Model */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>Two-Region Model</h2>
        <div className="hq-two-region" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
          <div className="admin-card" style={{ borderLeft: '3px solid var(--accent)' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-3)' }}>Deep South (Natchez)</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <div><strong style={{ color: 'var(--text)' }}>Operators:</strong> Chase + Tracy + Amy</div>
              <div><strong style={{ color: 'var(--text)' }}>Directory:</strong> Deep South Directory</div>
              <div><strong style={{ color: 'var(--text)' }}>Venue:</strong> Big Muddy Inn</div>
              <div><strong style={{ color: 'var(--text)' }}>Status:</strong> Active — launching Apr 27</div>
            </div>
          </div>
          <div className="admin-card" style={{ borderLeft: '3px solid var(--accent)' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-3)' }}>Northeast (Bearsville)</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <div><strong style={{ color: 'var(--text)' }}>Operators:</strong> Elijah + Miles</div>
              <div><strong style={{ color: 'var(--text)' }}>Directory:</strong> Bearsville Creative Directory</div>
              <div><strong style={{ color: 'var(--text)' }}>Venue:</strong> Utopia Studios</div>
              <div><strong style={{ color: 'var(--text)' }}>Status:</strong> Summer 2026 activation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
          {[
            { name: 'Chase Pierson', role: 'CEO / CTO / Showrunner', shift: 'Day: Tech, sales, media' },
            { name: 'Tracy Alderson-Allen', role: 'Finance & Inn Ops', shift: 'Day: Finance, admin. Night: Inn.' },
            { name: 'Amy Allen', role: 'Inn & Bar Ops', shift: 'Night: Bar, events, social.' },
            { name: 'Shows programming', role: 'TBD — contract in progress', shift: 'Night: Blues Room, bookings.' },
            { name: 'Elijah Tuttle', role: 'Tech Deployment (NE)', shift: 'Bearsville, NY: infrastructure.' },
          ].map(p => (
            <div key={p.name} className="admin-card" style={{ padding: 'var(--space-3) var(--space-4)' }}>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)' }}>{p.name}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--accent)', marginBottom: 'var(--space-1)' }}>{p.role}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>{p.shift}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Infrastructure */}
      <div>
        <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>Infrastructure</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
          {[
            { label: 'Vercel', value: 'Deployed', detail: '14 domains, 1 deployment' },
            { label: 'Cloud SQL', value: 'RUNNABLE', detail: 'sovereign-db-primary' },
            { label: 'Neon', value: 'Active', detail: 'Primary DB' },
            { label: 'GCS', value: 'Active', detail: 'bmt-media-bigmuddy' },
            { label: 'Cloudflare', value: 'Active', detail: 'DNS + CDN' },
            { label: 'Mac Mini', value: 'Running', detail: 'Broadcasting + Plex' },
            { label: 'Prisma Models', value: '122', detail: 'Schema validated' },
            { label: 'GitHub Issues', value: `${openIssues || '~25'} open`, detail: 'Agent swarm active' },
          ].map(i => (
            <div key={i.label} className="admin-card" style={{ padding: 'var(--space-3)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>{i.label}</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--success)' }}>{i.value}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{i.detail}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 480px) {
          .admin-hq-page .hq-two-region { grid-template-columns: 1fr !important; }
          .admin-hq-page .admin-page-header { flex-wrap: wrap; gap: var(--space-3); }
        }
      `}</style>
    </div>
  );
}
