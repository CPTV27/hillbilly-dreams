'use client';

import React, { useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────
// Color Tokens — HDX Industrial UI
// ─────────────────────────────────────────────────────────────
const C = {
  slate950: '#020617', slate900: '#0f172a', slate800: '#1e293b', slate700: '#334155',
  slate600: '#475569', slate500: '#64748b', slate400: '#94a3b8', slate300: '#cbd5e1',
  sky400: '#38bdf8', sky500: '#0ea5e9', sky600: '#0284c7',
  orange400: '#fb923c', orange500: '#f97316',
  red500: '#ef4444', red400: '#f87171',
  green400: '#4ade80', green500: '#22c55e',
  white: '#ffffff',
};

// ─────────────────────────────────────────────────────────────
// Economic Model Data
// ─────────────────────────────────────────────────────────────

interface EconomicModel {
  label: string;
  tagline: string;
  color: string;
  quoteTotal: number;
  platformTake: number;    // % lost to absentee platform
  marginRetained: number;  // % margin retained locally
  leakageItems: { label: string; pct: number; color: string }[];
  terminalLines: string[];
}

const EXTRACTIVE: EconomicModel = {
  label: 'State A — Extractive Model',
  tagline: '30% margin lost to absentee platforms, aggregators, and SaaS rent',
  color: C.red400,
  quoteTotal: 11_612,
  platformTake: 30,
  marginRetained: 70,
  leakageItems: [
    { label: 'Estimating SaaS (Buildxact, etc.)', pct: 8, color: '#f87171' },
    { label: 'CRM/Marketing (HubSpot, etc.)', pct: 7, color: '#fb923c' },
    { label: 'Lead-Gen Marketplace (Houzz, etc.)', pct: 10, color: '#fbbf24' },
    { label: 'Accounting/Payments (QBO fees)', pct: 5, color: '#a78bfa' },
  ],
  terminalLines: [
    '> Scanning site with iPhone 15 Pro LiDAR...',
    '> Upload to [3rd Party SaaS] for processing...',
    '',
    '⚠ MARGIN LEAKAGE DETECTED',
    '  Buildxact subscription:    $349/mo   →  Silicon Valley, CA',
    '  HubSpot CRM:               $890/mo   →  Cambridge, MA',
    '  Houzz Pro leads:            variable  →  Palo Alto, CA',
    '  Stripe + QBO fees:          ~2.9%+    →  San Francisco, CA',
    '',
    '┌─────────────────────────────────────────────┐',
    '│  $11,612.00 quoted                          │',
    '│  – $3,484 leaves your zip code (30%)        │',
    '├─────────────────────────────────────────────┤',
    '│  NET RETAINED:  $8,128.00  (70%)            │',
    '│  ⚠ Capital Flight: $3,484 → out of state    │',
    '└─────────────────────────────────────────────┘',
  ],
};

const SOVEREIGN: EconomicModel = {
  label: 'State B — Sovereign Model',
  tagline: 'HDX costs ~12% — but every dollar stays in your operating region',
  color: C.green400,
  quoteTotal: 11_612,
  platformTake: 12,
  marginRetained: 88,
  leakageItems: [
    { label: 'HDX Platform License', pct: 5, color: C.sky400 },
    { label: 'Gemini AI (Google Cloud)', pct: 3, color: C.sky400 },
    { label: 'HDX Media Engine', pct: 2, color: C.sky400 },
    { label: 'Payments (Stripe Connect)', pct: 2, color: C.sky400 },
  ],
  terminalLines: [
    '> Scanning site with iPhone 15 Pro LiDAR...',
    '> Processing on HDX / Gemini 2.5 Pro Vision...',
    '',
    '✓ SOVEREIGN PIPELINE — COSTS STAY LOCAL',
    '  HDX Platform License:      $581/job  →  Hillbilly Dreams, Inc.',
    '  AI Scoping (Gemini):       $348/job  →  HDX Engine (us-east4)',
    '  Inbound Leads (HDX Media): $232/job  →  Local ecosystem',
    '  Payments (Stripe Connect): $232/job  →  Your bank account',
    '',
    '┌─────────────────────────────────────────────┐',
    '│  $11,612.00 quoted                          │',
    '│  – $1,393 to HDX stack (12%)                │',
    '├─────────────────────────────────────────────┤',
    '│  NET RETAINED:  $10,219.00  (88%)           │',
    '│  ✓ Every dollar stays in your region.       │',
    '└─────────────────────────────────────────────┘',
  ],
};

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function SplitScreenDemo() {
  const [mode, setMode] = useState<'extractive' | 'sovereign'>('extractive');
  const [visibleLines, setVisibleLines] = useState(0);
  const model = mode === 'extractive' ? EXTRACTIVE : SOVEREIGN;

  // Reset animation on mode switch
  useEffect(() => {
    setVisibleLines(0);
  }, [mode]);

  // Typewriter effect
  useEffect(() => {
    if (visibleLines < model.terminalLines.length) {
      const line = model.terminalLines[visibleLines];
      const delay = line === '' ? 300 : line.startsWith('│') || line.startsWith('├') || line.startsWith('┌') || line.startsWith('└') ? 120 : line.startsWith('⚠') || line.startsWith('✓') ? 500 : 400;
      const timer = setTimeout(() => setVisibleLines(v => v + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, model.terminalLines]);

  const lostDollars = Math.round(model.quoteTotal * (model.platformTake / 100));
  const retained = model.quoteTotal - lostDollars;

  return (
    <div style={{ maxWidth: 1000, margin: '4rem auto', padding: '0 1rem' }}>
      {/* Badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, backgroundColor: C.slate900, color: C.sky400, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.03em', marginBottom: '1.5rem', border: `1px solid ${C.slate700}` }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: model.color, boxShadow: `0 0 8px ${model.color}` }} />
        Economic Model Comparison
      </div>

      <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: C.slate900, margin: '0 0 0.75rem', letterSpacing: '-0.5px' }}>
        Where Does the Money Go?
      </h3>
      <p style={{ fontSize: '1.05rem', color: C.slate600, lineHeight: 1.6, margin: '0 0 2rem', maxWidth: 700 }}>
        Toggle between the extractive SaaS model and the sovereign HDX model. Watch the same $11,612 job play out two different ways.
      </p>

      {/* Toggle */}
      <div style={{ display: 'flex', gap: 0, marginBottom: '1.5rem', borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.slate700}`, width: 'fit-content' }}>
        <button
          onClick={() => setMode('extractive')}
          style={{
            padding: '10px 24px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.02em',
            background: mode === 'extractive' ? C.red500 : C.slate900,
            color: mode === 'extractive' ? C.white : C.slate500,
            transition: 'all 0.2s ease',
          }}
        >
          ⚠ Extractive Model
        </button>
        <button
          onClick={() => setMode('sovereign')}
          style={{
            padding: '10px 24px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.02em',
            background: mode === 'sovereign' ? C.green500 : C.slate900,
            color: mode === 'sovereign' ? C.white : C.slate500,
            transition: 'all 0.2s ease',
          }}
        >
          ✓ Sovereign Model
        </button>
      </div>

      {/* Split Screen */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', minHeight: 420 }}>

        {/* Left: Margin Breakdown */}
        <div style={{ background: C.slate950, borderRadius: 16, padding: '2rem', border: `1px solid ${C.slate700}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: model.color, marginBottom: 16 }}>
            {model.label}
          </div>
          <div style={{ fontSize: '0.85rem', color: C.slate400, lineHeight: 1.5, marginBottom: 24 }}>
            {model.tagline}
          </div>

          {/* Revenue bar */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: C.slate500, marginBottom: 6 }}>
              <span>Quote: ${model.quoteTotal.toLocaleString()}</span>
              <span>Retained: {model.marginRetained}%</span>
            </div>
            <div style={{ height: 12, borderRadius: 6, background: C.slate800, overflow: 'hidden', position: 'relative' }}>
              <div style={{
                height: '100%', borderRadius: 6, transition: 'width 0.6s ease',
                width: `${model.marginRetained}%`,
                background: mode === 'sovereign'
                  ? `linear-gradient(to right, ${C.green500}, ${C.green400})`
                  : `linear-gradient(to right, ${C.sky600}, ${C.sky400})`,
              }} />
            </div>
          </div>

          {/* Leakage items */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {model.leakageItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderRadius: 8, background: C.slate900, border: `1px solid ${C.slate800}` }}>
                <span style={{ fontSize: '0.8rem', color: C.slate300 }}>{item.label}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: item.pct === 0 ? C.green400 : item.color }}>
                  {item.pct === 0 ? '$0' : `–$${Math.round(model.quoteTotal * (item.pct / 100)).toLocaleString()}`}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom line */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.slate700}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: C.slate400 }}>Net Retained</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: model.color }}>
              ${retained.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Right: Terminal */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.slate800}`, background: '#0a0f1a', display: 'flex', flexDirection: 'column' }}>
            {/* Terminal header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#111827', borderBottom: `1px solid ${C.slate800}` }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', display: 'inline-block', background: '#ff5f56' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', display: 'inline-block', background: '#ffbd2e' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', display: 'inline-block', background: '#27c93f' }} />
              </div>
              <span style={{ fontSize: '0.7rem', color: C.slate500, fontWeight: 500 }}>
                {mode === 'sovereign' ? 'HDX Engine · Gemini 2.5 Pro · us-east4' : 'Third-Party SaaS Stack · Distributed'}
              </span>
            </div>
            {/* Terminal body */}
            <div style={{ flex: 1, padding: 14, fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace', fontSize: '0.7rem', lineHeight: 1.6, overflowY: 'auto' }}>
              {model.terminalLines.slice(0, visibleLines).map((line, i) => (
                <div key={`${mode}-${i}`} style={{
                  whiteSpace: 'pre',
                  color: line.startsWith('⚠') ? C.red400
                    : line.startsWith('✓') ? C.green400
                    : line.startsWith('>') ? C.sky400
                    : line.startsWith('│') || line.startsWith('├') || line.startsWith('┌') || line.startsWith('└') ? C.orange400
                    : line.includes('→') && mode === 'extractive' ? C.red400
                    : line.includes('→') && mode === 'sovereign' ? C.green400
                    : C.slate400,
                }}>
                  {line || '\u00A0'}
                </div>
              ))}
              {visibleLines < model.terminalLines.length && (
                <span style={{ color: C.sky400, fontSize: '0.7rem' }}>&#9608;</span>
              )}
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: C.slate500, textAlign: 'center', marginTop: 10 }}>
            {mode === 'sovereign' ? 'HDX Sovereign Pipeline' : 'Fragmented SaaS Stack'}
          </div>
        </div>
      </div>
    </div>
  );
}
