'use client';

import React, { useState } from 'react';

// ─────────────────────────────────────────────────────────────
// Color Tokens — HDX Industrial UI
// ─────────────────────────────────────────────────────────────
const C = {
  slate950: '#020617', slate900: '#0f172a', slate800: '#1e293b', slate700: '#334155',
  slate600: '#475569', slate500: '#64748b', slate400: '#94a3b8', slate300: '#cbd5e1',
  sky400: '#38bdf8', sky500: '#0ea5e9', sky600: '#0284c7',
  orange400: '#fb923c', orange500: '#f97316',
  red400: '#f87171', red500: '#ef4444',
  green400: '#4ade80', green500: '#22c55e',
  white: '#ffffff',
};

// ─────────────────────────────────────────────────────────────
// Local Multiplier Economics
// ─────────────────────────────────────────────────────────────
//
// The Local Multiplier Effect (LME) measures how many times a
// dollar circulates within a local economy before leaving.
//
// EXTRACTIVE MODEL: 80¢ of every $1 leaves the zip code
//   - SaaS subscriptions → Silicon Valley
//   - Lead-gen platforms → Palo Alto
//   - Payment processing → San Francisco
//   - LME = 1.2x (dollar barely circulates once)
//
// SOVEREIGN MODEL: 80¢ of every $1 stays local
//   - HDX license → Hillbilly Dreams (local holding co)
//   - Personnel spending → local workforce
//   - Vendor payments → local subcontractors
//   - LME = 3.5x (BALLE / ILSR research average for local businesses)
//
// Source: Institute for Local Self-Reliance (ILSR), 2024
//   "For every $100 spent at a locally owned business, $68
//    remains in the local economy vs $43 at a chain."
// ─────────────────────────────────────────────────────────────

const EXTRACTIVE_LEAKAGE_RATE = 0.80;  // 80¢ leaves the zip code
const SOVEREIGN_LEAKAGE_RATE = 0.20;   // Only 20¢ leaves
const EXTRACTIVE_LME = 1.2;            // Near-zero local circulation
const SOVEREIGN_LME = 3.5;             // ILSR average for local biz

// 2025 Actuals from QuickBooks (S2PX production database)
const ACTUALS = {
  revenue: 1_115_449,
  outsideServices: 242_976,
  contractors: 114_774,
  combinedLabor: 357_750,
  netIncome: 261_000,
  officerSalary: 130_350,
  estimates: 858,
  topClients: [
    { name: 'AYON Studio', projects: 128 },
    { name: 'Crisp Architects', projects: 81 },
    { name: 'McBride Architects', projects: 56 },
    { name: 'Studio DB', projects: 44 },
    { name: 'Svigals+Partners', projects: 37 },
  ],
};

// ─────────────────────────────────────────────────────────────
// Local Multiplier Calculator
// ─────────────────────────────────────────────────────────────

function calculateLocalMultiplier(annualRevenue: number) {
  // Extractive: 80% bleeds out, 20% stays, LME 1.2x
  const extractiveRetained = annualRevenue * (1 - EXTRACTIVE_LEAKAGE_RATE);
  const extractiveLocalImpact = extractiveRetained * EXTRACTIVE_LME;
  const extractiveLost = annualRevenue * EXTRACTIVE_LEAKAGE_RATE;

  // Sovereign: 20% bleeds out, 80% stays, LME 3.5x
  const sovereignRetained = annualRevenue * (1 - SOVEREIGN_LEAKAGE_RATE);
  const sovereignLocalImpact = sovereignRetained * SOVEREIGN_LME;
  const sovereignLost = annualRevenue * SOVEREIGN_LEAKAGE_RATE;

  return {
    extractive: { retained: extractiveRetained, lost: extractiveLost, localImpact: extractiveLocalImpact, multiplier: EXTRACTIVE_LME },
    sovereign: { retained: sovereignRetained, lost: sovereignLost, localImpact: sovereignLocalImpact, multiplier: SOVEREIGN_LME },
    delta: sovereignLocalImpact - extractiveLocalImpact,
  };
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function MarginRecoveryEngine() {
  const [automationPct, setAutomationPct] = useState(20);
  const [customRevenue, setCustomRevenue] = useState(ACTUALS.revenue);

  // Automation math
  const marginRecovered = Math.round(ACTUALS.combinedLabor * (automationPct / 100));
  const platformFee = 134_000; // Annual HDX licensing
  const projectedNet = ACTUALS.netIncome + marginRecovered;
  const roi = Math.round((marginRecovered / platformFee) * 100);

  // Local Multiplier math
  const lm = calculateLocalMultiplier(customRevenue);

  return (
    <div style={{ maxWidth: 960, margin: '4rem auto', padding: '0 1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* ── Section 1: Capacity Bottleneck ── */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '2rem', fontWeight: 800, color: C.slate900, margin: '0 0 0.75rem', letterSpacing: '-0.5px' }}>
          The Capacity Bottleneck
        </h3>
        <p style={{ fontSize: '1.1rem', color: C.slate600, lineHeight: 1.6, margin: 0, maxWidth: 750 }}>
          In 2025, UppTeam generated <strong>${ACTUALS.revenue.toLocaleString()}</strong> in revenue, but{' '}
          <strong style={{ color: C.red500 }}>${ACTUALS.combinedLabor.toLocaleString()}</strong> bled out to outside services and
          production contractors — <strong style={{ color: C.red500 }}>{Math.round(ACTUALS.combinedLabor / ACTUALS.revenue * 100)}%</strong> of
          every dollar earned. S2PX attacks this specific line item.
        </p>
      </div>

      {/* ── Automation Slider ── */}
      <div style={{ background: C.slate950, borderRadius: 16, padding: '2rem', marginBottom: '2rem', border: `1px solid ${C.slate700}` }}>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '1.1rem', color: C.slate300, marginBottom: '1rem' }}>
            AI Automation Target:{' '}
            <strong style={{ color: C.sky400, fontSize: '1.5rem' }}>{automationPct}%</strong>
          </label>
          <input
            type="range" min={5} max={50} step={1}
            value={automationPct}
            onChange={e => setAutomationPct(Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', accentColor: C.sky500, height: 6 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: C.slate500, marginTop: '0.5rem' }}>
            <span>Conservative (5%)</span>
            <span>Aggressive (50%)</span>
          </div>
        </div>

        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { label: 'Margin Recovered', value: `$${marginRecovered.toLocaleString()}`, color: C.green400, sub: 'annual savings from AI automation' },
            { label: 'S2PX Platform Fee', value: `$${platformFee.toLocaleString()}`, color: C.slate400, sub: 'annual HDX licensing cost' },
            { label: 'Net ROI', value: `${roi}%`, color: roi > 100 ? C.green400 : C.sky400, sub: 'return on platform investment' },
            { label: 'Projected Net Income', value: `$${projectedNet.toLocaleString()}`, color: C.white, sub: '2025 baseline + recovered margin' },
          ].map((card, i) => (
            <div key={i} style={{ background: C.slate900, borderRadius: 12, padding: '1.25rem', textAlign: 'center', border: `1px solid ${C.slate700}` }}>
              <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: C.slate500, marginBottom: '0.5rem' }}>{card.label}</span>
              <span style={{ display: 'block', fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, color: card.color }}>{card.value}</span>
              <span style={{ display: 'block', fontSize: '0.7rem', color: C.slate500, marginTop: '0.25rem' }}>{card.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 2: Local Multiplier Engine ── */}
      <div style={{ background: C.slate950, borderRadius: 16, padding: '2rem', marginBottom: '2rem', border: `1px solid ${C.slate700}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: C.orange500, boxShadow: `0 0 8px ${C.orange500}` }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.orange400 }}>
            Deep South Directory · Local Multiplier Engine
          </span>
        </div>
        <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: C.white, margin: '0 0 8px' }}>
          Where Does the Dollar Land?
        </h4>
        <p style={{ fontSize: '0.95rem', color: C.slate400, lineHeight: 1.6, margin: '0 0 24px', maxWidth: 700 }}>
          Enter any venue&apos;s annual revenue. Watch what happens when 80¢ on the dollar leaves the zip code
          versus when it compounds locally through the Deep South Directory ecosystem.
        </p>

        {/* Revenue Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <label style={{ fontSize: '0.85rem', color: C.slate400, whiteSpace: 'nowrap' }}>Annual Revenue:</label>
          <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: C.slate500, fontSize: '1rem', fontWeight: 700 }}>$</span>
            <input
              type="number"
              value={customRevenue}
              onChange={e => setCustomRevenue(Math.max(0, Number(e.target.value)))}
              style={{
                width: '100%', boxSizing: 'border-box', padding: '10px 16px 10px 24px', borderRadius: 8,
                background: C.slate900, border: `1px solid ${C.slate700}`, color: C.white, fontSize: '1rem',
                fontWeight: 600, outline: 'none', fontFamily: 'ui-monospace, monospace',
              }}
            />
          </div>
          <button
            onClick={() => setCustomRevenue(ACTUALS.revenue)}
            style={{ padding: '8px 16px', borderRadius: 8, background: C.slate800, border: `1px solid ${C.slate700}`, color: C.slate400, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Reset to S2PX
          </button>
        </div>

        {/* Side-by-Side Comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {/* Extractive */}
          <div style={{ background: C.slate900, borderRadius: 12, padding: '1.5rem', border: `1px solid ${C.slate800}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${C.red500}, ${C.red400})` }} />
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.red400, marginBottom: 12 }}>
              ⚠ Extractive Model
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.8rem', color: C.slate400 }}>Capital Flight (80%)</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: C.red400 }}>
                  –${lm.extractive.lost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.8rem', color: C.slate400 }}>Retained Locally (20%)</span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: C.slate300 }}>
                  ${lm.extractive.retained.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div style={{ borderTop: `1px solid ${C.slate700}`, paddingTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.8rem', color: C.slate400 }}>Local Multiplier ({EXTRACTIVE_LME}x)</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: C.slate300 }}>
                    ${lm.extractive.localImpact.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <span style={{ fontSize: '0.7rem', color: C.slate500 }}>Total economic impact in your community</span>
              </div>
            </div>
          </div>

          {/* Sovereign */}
          <div style={{ background: C.slate900, borderRadius: 12, padding: '1.5rem', border: `1px solid ${C.slate800}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${C.green500}, ${C.green400})` }} />
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.green400, marginBottom: 12 }}>
              ✓ Sovereign Model
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.8rem', color: C.slate400 }}>Capital Flight (20%)</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: C.orange400 }}>
                  –${lm.sovereign.lost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.8rem', color: C.slate400 }}>Retained Locally (80%)</span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: C.green400 }}>
                  ${lm.sovereign.retained.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div style={{ borderTop: `1px solid ${C.slate700}`, paddingTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.8rem', color: C.slate400 }}>Local Multiplier ({SOVEREIGN_LME}x)</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: C.green400 }}>
                    ${lm.sovereign.localImpact.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <span style={{ fontSize: '0.7rem', color: C.slate500 }}>Total economic impact in your community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delta Callout */}
        <div style={{ marginTop: 16, padding: '16px 20px', borderRadius: 12, background: `linear-gradient(135deg, ${C.slate900}, ${C.slate800})`, border: `1px solid ${C.slate700}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: C.orange400, fontWeight: 700, marginBottom: 4 }}>
              Community Impact Delta
            </div>
            <span style={{ fontSize: '0.85rem', color: C.slate400 }}>
              Switching from extractive to sovereign adds this much economic activity to your local economy
            </span>
          </div>
          <span style={{ fontSize: '1.75rem', fontWeight: 900, color: C.green400, whiteSpace: 'nowrap' }}>
            +${lm.delta.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>

      {/* ── Revenue Trajectory ── */}
      <div style={{ background: C.slate950, borderRadius: 16, padding: '2rem', border: `1px solid ${C.slate700}` }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: C.slate300, margin: '0 0 0.5rem' }}>
          Revenue Trajectory (QuickBooks Actuals)
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem', marginTop: '1.5rem', alignItems: 'end' }}>
          {[
            { year: '2020', rev: 95, label: 'Year 1' },
            { year: '2021', rev: 608, label: 'Breakeven' },
            { year: '2022', rev: 661, label: '' },
            { year: '2023', rev: 637, label: 'Profitable' },
            { year: '2024', rev: 868, label: '+36% YoY' },
            { year: '2025', rev: 1115, label: '$1M+' },
          ].map(d => (
            <div key={d.year} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: C.slate500, marginBottom: '0.5rem', fontWeight: 600 }}>{d.year}</div>
              <div style={{ height: 120, background: C.slate900, borderRadius: 6, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
                <div style={{ width: '100%', height: `${(d.rev / 1115) * 100}%`, background: `linear-gradient(to top, ${C.sky600}, ${C.sky400})`, borderRadius: '6px 6px 0 0', transition: 'height 0.3s ease' }} />
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: C.white }}>
                ${d.rev < 1000 ? `${d.rev}K` : `${(d.rev / 1000).toFixed(1)}M`}
              </div>
              {d.label && <div style={{ fontSize: '0.65rem', color: C.green400, fontWeight: 600, marginTop: 2 }}>{d.label}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
