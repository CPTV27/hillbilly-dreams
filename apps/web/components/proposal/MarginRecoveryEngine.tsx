'use client';

import React, { useState } from 'react';

const colors = {
  slate50: '#f8fafc', slate100: '#f1f5f9', slate200: '#e2e8f0', slate300: '#cbd5e1',
  slate400: '#94a3b8', slate500: '#64748b', slate600: '#475569', slate700: '#334155',
  slate800: '#1e293b', slate900: '#0f172a', slate950: '#020617',
  green400: '#4ade80', green500: '#22c55e', green600: '#16a34a',
  sky400: '#38bdf8', sky500: '#0ea5e9', sky600: '#0284c7',
  blue50: '#eff6ff', blue600: '#2563eb', blue800: '#1e40af', blue900: '#1e3a8a',
  white: '#ffffff',
};

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

export default function MarginRecoveryEngine() {
  const [automationPct, setAutomationPct] = useState(20);

  const marginRecovered = Math.round(ACTUALS.combinedLabor * (automationPct / 100));
  const projectedNet = ACTUALS.netIncome + marginRecovered;
  const platformFee = 134_000;
  const netAfterPlatform = projectedNet - platformFee;
  const roi = Math.round((marginRecovered / platformFee) * 100);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>The Capacity Bottleneck</h3>
        <p style={styles.subtitle}>
          In 2025, UppTeam generated <strong>${ACTUALS.revenue.toLocaleString()}</strong> in revenue, but{' '}
          <strong>${ACTUALS.combinedLabor.toLocaleString()}</strong> bled out to outside services and
          production contractors &mdash; <strong>{Math.round(ACTUALS.combinedLabor / ACTUALS.revenue * 100)}%</strong> of
          every dollar earned. S2PX attacks this specific line item.
        </p>
      </div>

      {/* Slider */}
      <div style={styles.calculator}>
        <div style={styles.sliderWrap}>
          <label style={styles.sliderLabel}>
            AI Automation Target: <strong style={{ color: colors.sky500, fontSize: '1.5rem' }}>{automationPct}%</strong>
          </label>
          <input
            type="range"
            min={5} max={50} step={1}
            value={automationPct}
            onChange={e => setAutomationPct(Number(e.target.value))}
            style={styles.slider}
          />
          <div style={styles.sliderRange}>
            <span>Conservative (5%)</span>
            <span>Aggressive (50%)</span>
          </div>
        </div>

        {/* Metric Cards */}
        <div style={styles.metricsGrid}>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Margin Recovered</span>
            <span style={{ ...styles.cardValue, color: colors.green500 }}>
              ${marginRecovered.toLocaleString()}
            </span>
            <span style={styles.cardSubtext}>annual savings from AI automation</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardLabel}>S2PX Platform Fee</span>
            <span style={{ ...styles.cardValue, color: colors.slate400 }}>
              ${platformFee.toLocaleString()}
            </span>
            <span style={styles.cardSubtext}>annual HDX licensing cost</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Net ROI</span>
            <span style={{ ...styles.cardValue, color: roi > 100 ? colors.green500 : colors.sky500 }}>
              {roi}%
            </span>
            <span style={styles.cardSubtext}>return on platform investment</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Projected Net Income</span>
            <span style={{ ...styles.cardValue, color: colors.white }}>
              ${projectedNet.toLocaleString()}
            </span>
            <span style={styles.cardSubtext}>2025 baseline + recovered margin</span>
          </div>
        </div>
      </div>

      {/* Pipeline insight */}
      <div style={styles.insight}>
        <h4 style={styles.insightTitle}>The Pipeline Multiplier</h4>
        <p style={styles.insightText}>
          {ACTUALS.estimates.toLocaleString()} estimates in the database. Your repeat business
          with <strong>{ACTUALS.topClients[0].name}</strong> ({ACTUALS.topClients[0].projects} projects)
          and <strong>{ACTUALS.topClients[1].name}</strong> ({ACTUALS.topClients[1].projects} projects) is
          your moat. By automating quoting with iPhone video + LiDAR, your internal team reclaims the
          capacity to handle this volume without outsourcing. Every dollar saved drops directly to net margin.
        </p>
      </div>

      {/* Revenue trajectory */}
      <div style={styles.trajectory}>
        <h4 style={{ ...styles.insightTitle, color: colors.slate300 }}>Revenue Trajectory (QuickBooks Actuals)</h4>
        <div style={styles.yearGrid}>
          {[
            { year: '2020', rev: 95, label: 'Year 1' },
            { year: '2021', rev: 608, label: 'Breakeven' },
            { year: '2022', rev: 661, label: '' },
            { year: '2023', rev: 637, label: 'Profitable' },
            { year: '2024', rev: 868, label: '+36% YoY' },
            { year: '2025', rev: 1115, label: '$1M+' },
          ].map(d => (
            <div key={d.year} style={styles.yearCard}>
              <div style={styles.yearLabel}>{d.year}</div>
              <div style={styles.yearBar}>
                <div style={{ ...styles.yearBarFill, height: `${(d.rev / 1115) * 100}%` }} />
              </div>
              <div style={styles.yearValue}>${d.rev < 1000 ? `${d.rev}K` : `${(d.rev / 1000).toFixed(1)}M`}</div>
              {d.label && <div style={styles.yearNote}>{d.label}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '960px',
    margin: '4rem auto',
    padding: '0 1rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 800,
    color: colors.slate900,
    margin: '0 0 0.75rem',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: colors.slate600,
    lineHeight: 1.6,
    margin: 0,
    maxWidth: '750px',
  },
  calculator: {
    background: colors.slate900,
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2rem',
  },
  sliderWrap: {
    marginBottom: '2rem',
  },
  sliderLabel: {
    display: 'block',
    fontSize: '1.1rem',
    color: colors.slate300,
    marginBottom: '1rem',
  },
  slider: {
    width: '100%',
    cursor: 'pointer',
    accentColor: colors.sky500,
    height: '6px',
  },
  sliderRange: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: colors.slate500,
    marginTop: '0.5rem',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  card: {
    background: colors.slate800,
    borderRadius: '12px',
    padding: '1.25rem',
    textAlign: 'center',
    border: `1px solid ${colors.slate700}`,
  },
  cardLabel: {
    display: 'block',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: colors.slate400,
    marginBottom: '0.5rem',
  },
  cardValue: {
    display: 'block',
    fontSize: '2rem',
    fontWeight: 800,
    lineHeight: 1.2,
  },
  cardSubtext: {
    display: 'block',
    fontSize: '0.7rem',
    color: colors.slate500,
    marginTop: '0.25rem',
  },
  insight: {
    backgroundColor: colors.blue50,
    borderLeft: `4px solid ${colors.blue600}`,
    padding: '1.5rem',
    borderRadius: '0 12px 12px 0',
    marginBottom: '2rem',
  },
  insightTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: colors.blue900,
    margin: '0 0 0.5rem',
  },
  insightText: {
    margin: 0,
    color: colors.blue800,
    lineHeight: 1.6,
    fontSize: '0.95rem',
  },
  trajectory: {
    background: colors.slate950,
    borderRadius: '16px',
    padding: '2rem',
  },
  yearGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '0.75rem',
    marginTop: '1.5rem',
    alignItems: 'end',
  },
  yearCard: {
    textAlign: 'center',
  },
  yearLabel: {
    fontSize: '0.75rem',
    color: colors.slate500,
    marginBottom: '0.5rem',
    fontWeight: 600,
  },
  yearBar: {
    height: '120px',
    background: colors.slate800,
    borderRadius: '6px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '0.5rem',
  },
  yearBarFill: {
    width: '100%',
    background: `linear-gradient(to top, ${colors.sky600}, ${colors.sky400})`,
    borderRadius: '6px 6px 0 0',
    transition: 'height 0.3s ease',
  },
  yearValue: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: colors.white,
  },
  yearNote: {
    fontSize: '0.65rem',
    color: colors.green400,
    fontWeight: 600,
    marginTop: '2px',
  },
};
