'use client';

// apps/web/app/admin/finance/page.tsx
// Hillbilly Dreams Financial Command Center
// Pulls from Stripe API (mocked until CC wires the backend)

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Brand Config ── */
const BRANDS = {
  S2PX: { label: 'S2PX', color: '#10b981', glow: 'rgba(16,185,129,0.15)' },
  BMT:  { label: 'BMT',  color: '#06b6d4', glow: 'rgba(6,182,212,0.15)' },
  BuyCurious: { label: 'BuyCurious', color: '#f59e0b', glow: 'rgba(245,158,11,0.15)' },
  Corporate:  { label: 'Corporate',  color: '#8b5cf6', glow: 'rgba(139,92,246,0.15)' },
} as const;

type BrandKey = keyof typeof BRANDS;

/* ── Mock Data (swap for real Stripe fetch when CC finishes the backend) ── */
interface StatCard {
  id: string;
  label: string;
  value: number;
  formatted: string;
  change: number; // percent
  brand: BrandKey | 'all';
  icon: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  brand: BrandKey;
  status: 'paid' | 'pending' | 'refunded';
  customer: string;
}

const MOCK_STATS: StatCard[] = [
  {
    id: 'gross_revenue',
    label: 'Total Gross Revenue (30d)',
    value: 47_850,
    formatted: '$47,850',
    change: 12.4,
    brand: 'all',
    icon: '◈',
  },
  {
    id: 's2px_mrr',
    label: 'S2PX MRR',
    value: 18_000,
    formatted: '$18,000',
    change: 0,
    brand: 'S2PX',
    icon: '⬡',
  },
  {
    id: 'bmt_platform',
    label: 'BMT Platform Revenue',
    value: 24_350,
    formatted: '$24,350',
    change: 8.2,
    brand: 'BMT',
    icon: '♫',
  },
  {
    id: 'pending_payouts',
    label: 'Pending Payouts',
    value: 5_500,
    formatted: '$5,500',
    change: -3.1,
    brand: 'all',
    icon: '↗',
  },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'txn_001', date: '2026-03-21', description: 'Scan2Plan License — Twinner (March)', amount: 6000, brand: 'S2PX', status: 'paid', customer: 'Twinner / Scan2Plan' },
  { id: 'txn_002', date: '2026-03-20', description: 'Blues Room — Sat Night Sessions (Door)', amount: 2_450, brand: 'BMT', status: 'paid', customer: 'Walk-in / Door Sales' },
  { id: 'txn_003', date: '2026-03-19', description: 'Gallery Commission — Andrea Collection', amount: 1_800, brand: 'BuyCurious', status: 'paid', customer: 'BuyCurious Art' },
  { id: 'txn_004', date: '2026-03-18', description: 'Big Muddy Inn — Suite Booking (Airbnb)', amount: 890, brand: 'BMT', status: 'paid', customer: 'Airbnb Guest' },
  { id: 'txn_005', date: '2026-03-18', description: 'S2PX Processing Fee — BAHA Project', amount: 12_000, brand: 'S2PX', status: 'pending', customer: 'Scan2Plan' },
  { id: 'txn_006', date: '2026-03-17', description: 'Big Muddy Inn — Suite Booking (Direct)', amount: 750, brand: 'BMT', status: 'paid', customer: 'Direct Booking' },
  { id: 'txn_007', date: '2026-03-16', description: 'Gallery Commission — Delta Landscapes', amount: 420, brand: 'BuyCurious', status: 'paid', customer: 'BuyCurious Art' },
  { id: 'txn_008', date: '2026-03-15', description: 'Big Muddy Radio — Sponsor (March)', amount: 1_500, brand: 'BMT', status: 'pending', customer: 'Local Sponsor' },
];

/* ── Animation Variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ── Helpers ── */
function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function getBrandStyle(brand: BrandKey) {
  return BRANDS[brand] || BRANDS.Corporate;
}

/* ── Component ── */
export default function FinancePage() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<BrandKey | 'all'>('all');

  useEffect(() => {
    // Simulate API fetch — replace with real Stripe calls when CC hooks are ready
    const timer = setTimeout(() => {
      setStats(MOCK_STATS);
      setTransactions(MOCK_TRANSACTIONS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter((t) => t.brand === filter);

  return (
    <>
      {/* ── Header ── */}
      <motion.div
        className="admin-page-header"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="fin-page-title">Financial Command Center</h1>
          <p className="admin-page-sub">
            Hillbilly Dreams, Inc. — Real-Time Revenue Intelligence
          </p>
        </div>
        <div className="fin-header-actions">
          <span className="fin-live-dot" />
          <span className="fin-live-label">Live from Stripe</span>
        </div>
      </motion.div>

      {/* ── Stat Cards ── */}
      <motion.div
        className="fin-stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate={loading ? 'hidden' : 'visible'}
      >
        {(loading ? MOCK_STATS : stats).map((stat) => {
          const brandColor = stat.brand === 'all'
            ? 'var(--accent)'
            : BRANDS[stat.brand].color;
          const brandGlow = stat.brand === 'all'
            ? 'rgba(200,148,62,0.12)'
            : BRANDS[stat.brand].glow;

          return (
            <motion.div
              key={stat.id}
              className={`fin-stat-card ${loading ? 'fin-stat-card--loading' : ''}`}
              variants={cardVariants}
              style={{
                '--card-accent': brandColor,
                '--card-glow': brandGlow,
              } as React.CSSProperties}
            >
              <div className="fin-stat-card__top">
                <span className="fin-stat-card__icon">{stat.icon}</span>
                {stat.brand !== 'all' && (
                  <span
                    className="fin-stat-card__brand"
                    style={{ color: brandColor, background: brandGlow }}
                  >
                    {BRANDS[stat.brand].label}
                  </span>
                )}
              </div>
              <div className="fin-stat-card__label">{stat.label}</div>
              <div className="fin-stat-card__value">
                {loading ? (
                  <div className="skeleton skeleton--value" />
                ) : (
                  stat.formatted
                )}
              </div>
              {!loading && (
                <div className={`fin-stat-card__change ${stat.change >= 0 ? 'fin-stat-card__change--up' : 'fin-stat-card__change--down'}`}>
                  {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}% vs. last month
                </div>
              )}
              <div className="fin-stat-card__glow-line" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Revenue by Brand — Mini Chart ── */}
      <motion.div
        className="fin-breakdown"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 12 : 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="fin-breakdown__header">
          <h2 className="fin-breakdown__title">Revenue by Brand</h2>
          <span className="fin-breakdown__period">Last 30 days</span>
        </div>
        <div className="fin-breakdown__bars">
          {[
            { brand: 'S2PX' as BrandKey, amount: 18_000, pct: 37.6 },
            { brand: 'BMT' as BrandKey, amount: 24_350, pct: 50.9 },
            { brand: 'BuyCurious' as BrandKey, amount: 2_220, pct: 4.6 },
            { brand: 'Corporate' as BrandKey, amount: 3_280, pct: 6.9 },
          ].map((item) => {
            const b = getBrandStyle(item.brand);
            return (
              <div key={item.brand} className="fin-bar-row">
                <div className="fin-bar-row__label">
                  <span className="fin-bar-row__dot" style={{ background: b.color }} />
                  <span>{b.label}</span>
                </div>
                <div className="fin-bar-row__track">
                  <motion.div
                    className="fin-bar-row__fill"
                    style={{ background: b.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className="fin-bar-row__amount">{formatCurrency(item.amount)}</span>
                <span className="fin-bar-row__pct">{item.pct}%</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Transactions Table ── */}
      <motion.div
        className="fin-transactions"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 12 : 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <div className="fin-transactions__header">
          <h2 className="fin-transactions__title">Recent Transactions</h2>
          <div className="fin-filter-bar">
            {(['all', 'S2PX', 'BMT', 'BuyCurious'] as const).map((key) => (
              <button
                key={key}
                className={`fin-filter-btn ${filter === key ? 'fin-filter-btn--active' : ''}`}
                onClick={() => setFilter(key)}
                style={key !== 'all' && filter === key ? {
                  borderColor: BRANDS[key].color,
                  color: BRANDS[key].color,
                  background: BRANDS[key].glow,
                } : undefined}
              >
                {key === 'all' ? 'All' : BRANDS[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="fin-table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Brand</th>
                <th>Customer</th>
                <th className="fin-table__right">Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredTransactions.map((txn) => {
                  const b = getBrandStyle(txn.brand);
                  return (
                    <motion.tr
                      key={txn.id}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: 8 }}
                      layout
                    >
                      <td className="fin-table__date">{formatDate(txn.date)}</td>
                      <td className="fin-table__desc">{txn.description}</td>
                      <td>
                        <span
                          className="fin-brand-badge"
                          style={{ color: b.color, background: b.glow }}
                        >
                          {b.label}
                        </span>
                      </td>
                      <td className="fin-table__customer">{txn.customer}</td>
                      <td className="fin-table__amount">{formatCurrency(txn.amount)}</td>
                      <td>
                        <span className={`fin-status-badge fin-status-badge--${txn.status}`}>
                          {txn.status}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── CC Integration Note ── */}
      <motion.div
        className="fin-integration-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <span className="fin-integration-note__icon">⚡</span>
        <div>
          <strong>Mock Data Active</strong> — Awaiting Stripe backend from CC.
          Data hooks are modular and ready to accept real Stripe JSON payloads.
        </div>
      </motion.div>

      <style>{`
        /* ── Finance Page Styles ── */
        .fin-page-title {
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          margin: 0;
          letter-spacing: -0.01em;
        }
        .fin-header-actions {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .fin-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: fin-pulse 2s infinite;
        }
        @keyframes fin-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(16,185,129,0); }
        }
        .fin-live-label {
          font-size: var(--text-xs);
          font-weight: 600;
          color: #10b981;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }

        /* ── Stat Cards Grid ── */
        .fin-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }
        @media (max-width: 1024px) {
          .fin-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .fin-stats-grid { grid-template-columns: 1fr; }
        }

        .fin-stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-5);
          position: relative;
          overflow: hidden;
          transition: border-color var(--duration-fast) var(--ease-default),
                      box-shadow var(--duration-fast) var(--ease-default);
        }
        .fin-stat-card:hover {
          border-color: var(--card-accent, var(--border-strong));
          box-shadow: 0 0 24px var(--card-glow, transparent);
        }
        .fin-stat-card__glow-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--card-accent, var(--accent)), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .fin-stat-card:hover .fin-stat-card__glow-line { opacity: 1; }
        .fin-stat-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-3);
        }
        .fin-stat-card__icon {
          font-size: 16px;
          color: var(--text-disabled);
        }
        .fin-stat-card__brand {
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: var(--tracking-wide);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }
        .fin-stat-card__label {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide);
          margin-bottom: var(--space-2);
        }
        .fin-stat-card__value {
          font-size: var(--text-4xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
          line-height: 1;
          margin-bottom: var(--space-2);
        }
        .fin-stat-card__change {
          font-size: var(--text-xs);
          font-weight: 500;
        }
        .fin-stat-card__change--up { color: #10b981; }
        .fin-stat-card__change--down { color: #ef4444; }

        /* ── Revenue Breakdown ── */
        .fin-breakdown {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-5);
          margin-bottom: var(--space-6);
        }
        .fin-breakdown__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-5);
        }
        .fin-breakdown__title {
          font-size: var(--text-md);
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }
        .fin-breakdown__period {
          font-size: var(--text-xs);
          color: var(--text-disabled);
        }
        .fin-breakdown__bars {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .fin-bar-row {
          display: grid;
          grid-template-columns: 100px 1fr 80px 50px;
          align-items: center;
          gap: var(--space-3);
        }
        @media (max-width: 520px) {
          .fin-bar-row { grid-template-columns: 80px 1fr 60px 40px; }
        }
        .fin-bar-row__label {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text);
        }
        .fin-bar-row__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .fin-bar-row__track {
          height: 8px;
          background: var(--border);
          border-radius: 4px;
          overflow: hidden;
        }
        .fin-bar-row__fill {
          height: 100%;
          border-radius: 4px;
        }
        .fin-bar-row__amount {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text);
          text-align: right;
        }
        .fin-bar-row__pct {
          font-size: var(--text-xs);
          color: var(--text-disabled);
          text-align: right;
        }

        /* ── Transactions ── */
        .fin-transactions {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-5);
          margin-bottom: var(--space-6);
        }
        .fin-transactions__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        .fin-transactions__title {
          font-size: var(--text-md);
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }
        .fin-filter-bar {
          display: flex;
          gap: var(--space-2);
        }
        .fin-filter-btn {
          padding: var(--space-2) var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-default);
          letter-spacing: var(--tracking-wide);
        }
        .fin-filter-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .fin-filter-btn--active {
          background: var(--accent-muted);
          border-color: var(--accent);
          color: var(--accent);
        }

        /* ── Table ── */
        .fin-table-wrap {
          overflow-x: auto;
        }
        .fin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--text-sm);
        }
        .fin-table th {
          text-align: left;
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          padding: var(--space-3) var(--space-3);
          border-bottom: 1px solid var(--border);
        }
        .fin-table__right {
          text-align: right !important;
        }
        .fin-table td {
          padding: var(--space-3);
          border-bottom: 1px solid var(--border-subtle);
          vertical-align: middle;
        }
        .fin-table tr:hover td {
          background: var(--surface-2);
        }
        .fin-table__date {
          font-weight: 500;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .fin-table__desc {
          color: var(--text);
          font-weight: 500;
        }
        .fin-table__customer {
          color: var(--text-muted);
          font-size: var(--text-xs);
        }
        .fin-table__amount {
          font-weight: 700;
          color: var(--text);
          text-align: right;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }

        /* ── Brand Badge ── */
        .fin-brand-badge {
          display: inline-block;
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: var(--tracking-wide);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ── Status Badge ── */
        .fin-status-badge {
          display: inline-block;
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: var(--tracking-wide);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }
        .fin-status-badge--paid {
          background: rgba(16,185,129,0.15);
          color: #10b981;
        }
        .fin-status-badge--pending {
          background: rgba(245,158,11,0.15);
          color: #f59e0b;
        }
        .fin-status-badge--refunded {
          background: rgba(239,68,68,0.15);
          color: #ef4444;
        }

        /* ── Integration Note ── */
        .fin-integration-note {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          background: var(--surface);
          border: 1px dashed var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-4);
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
        .fin-integration-note__icon {
          font-size: 18px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .fin-integration-note strong {
          color: var(--accent);
        }

        /* ── Skeleton (loading state) ── */
        .fin-stat-card--loading .fin-stat-card__value {
          color: transparent;
        }
        .skeleton--value {
          height: 36px;
          width: 100px;
          background: var(--surface-2);
          border-radius: var(--radius-sm);
          animation: fin-shimmer 1.5s ease-in-out infinite;
        }
        @keyframes fin-shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </>
  );
}
