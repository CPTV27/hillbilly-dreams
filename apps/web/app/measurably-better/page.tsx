'use client';

// apps/web/app/measurably-better/page.tsx
// Measurably Better™ — Generative Onboarding Engine
// measurablybetterthings.com root experience
//
// Industrial Brutalism: slate950, Terminal Green, Safety Yellow, monospace numbers.
// Flow: Domain input → Terminal loading → Dashboard shell with OAuth blocks.

import { useState, useEffect, useRef, useCallback } from 'react';
import { signIn } from 'next-auth/react';

// ── Terminal Lines ──
const TERMINAL_LINES = [
  { text: '> Resolving DNS...', delay: 400 },
  { text: '> Extracting spatial/operational parameters...', delay: 800 },
  { text: '> Scanning public financials and industry verticals...', delay: 1200 },
  { text: '> Identifying industry vertical... [AEC / Heavy Construction]', delay: 600 },
  { text: '> Mapping operational topology to Vertex AI schema...', delay: 900 },
  { text: '> Provisioning secure $99/mo utility node...', delay: 700 },
  { text: '> Deploying Gemini 1.5 Pro context engine...', delay: 500 },
  { text: '> Binding Cloud SQL instance (us-east4)...', delay: 600 },
  { text: '> Node online. Dashboard ready.', delay: 400 },
];

// ── State Machine ──
type Phase = 'input' | 'loading' | 'dashboard';

export default function MeasurablyBetterOnboarding() {
  const [phase, setPhase] = useState<Phase>('input');
  const [domain, setDomain] = useState('');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Auto-focus input on mount
  useEffect(() => {
    if (phase === 'input' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase]);

  // Terminal animation
  const runTerminal = useCallback(async () => {
    setPhase('loading');
    setTerminalLines([`> Target: ${domain}`]);

    for (const line of TERMINAL_LINES) {
      await new Promise((r) => setTimeout(r, line.delay));
      setTerminalLines((prev) => [...prev, line.text]);
    }

    await new Promise((r) => setTimeout(r, 800));
    setPhase('dashboard');
  }, [domain]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    runTerminal();
  };

  const companyName = domain
    ? domain.replace(/^(https?:\/\/)?/i, '').replace(/^www\./i, '').split('.')[0]
    : '';
  const displayName = companyName
    ? companyName.charAt(0).toUpperCase() + companyName.slice(1)
    : '';

  return (
    <div className="mb-root">
      <style>{`
        /* ── Reset & Root ── */
        .mb-root {
          background: #020617;
          color: #e2e8f0;
          font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', var(--font-mono, monospace);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .mb-root *, .mb-root *::before, .mb-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* ── Phase: Input ── */
        .mb-input-phase {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }
        .mb-input-phase::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 50% 30%, rgba(34,197,94,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 80% 70%, rgba(234,179,8,0.03) 0%, transparent 60%);
          pointer-events: none;
        }

        /* ── Brand Mark ── */
        .mb-brand {
          margin-bottom: 3rem;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .mb-brand__name {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(34,197,94,0.6);
          margin-bottom: 0.5rem;
        }
        .mb-brand__title {
          font-family: var(--font-jakarta, system-ui, sans-serif);
          font-size: clamp(2.5rem, 7vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          color: #f1f5f9;
        }
        .mb-brand__title span {
          color: #22c55e;
        }
        .mb-brand__sub {
          font-family: var(--font-body, system-ui, sans-serif);
          font-size: 0.95rem;
          color: rgba(226,232,240,0.4);
          margin-top: 1rem;
          line-height: 1.6;
          max-width: 440px;
        }

        /* ── Input Group ── */
        .mb-input-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 640px;
        }
        .mb-input-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .mb-input {
          width: 100%;
          padding: 1.25rem 1.5rem;
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 4px;
          color: #22c55e;
          font-family: inherit;
          font-size: 1.1rem;
          letter-spacing: 0.02em;
          outline: none;
          transition: border-color 200ms ease, box-shadow 200ms ease;
        }
        .mb-input::placeholder {
          color: rgba(34,197,94,0.25);
          font-size: 0.95rem;
        }
        .mb-input:focus {
          border-color: rgba(34,197,94,0.5);
          box-shadow: 0 0 0 3px rgba(34,197,94,0.08), inset 0 0 20px rgba(34,197,94,0.03);
        }
        .mb-submit {
          padding: 1rem 2rem;
          background: #22c55e;
          color: #020617;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 150ms ease, transform 100ms ease;
        }
        .mb-submit:hover {
          background: #16a34a;
          transform: translateY(-1px);
        }
        .mb-submit:active {
          transform: translateY(0);
        }
        .mb-submit:disabled {
          background: rgba(34,197,94,0.2);
          color: rgba(2,6,23,0.4);
          cursor: not-allowed;
          transform: none;
        }

        /* ── Promise ── */
        .mb-promise {
          margin-top: 3rem;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .mb-promise__text {
          font-family: var(--font-body, system-ui, sans-serif);
          font-size: 0.8rem;
          font-style: italic;
          color: rgba(226,232,240,0.2);
          letter-spacing: 0.02em;
        }

        /* ── Phase: Loading (Terminal) ── */
        .mb-loading-phase {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .mb-terminal {
          width: 100%;
          max-width: 720px;
          background: #0f172a;
          border: 1px solid rgba(34,197,94,0.15);
          border-radius: 6px;
          overflow: hidden;
        }
        .mb-terminal__bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(15,23,42,0.9);
          border-bottom: 1px solid rgba(34,197,94,0.1);
        }
        .mb-terminal__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .mb-terminal__dot--red { background: #ef4444; }
        .mb-terminal__dot--yellow { background: #eab308; }
        .mb-terminal__dot--green { background: #22c55e; }
        .mb-terminal__title {
          flex: 1;
          text-align: center;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(226,232,240,0.3);
        }
        .mb-terminal__body {
          padding: 1.5rem;
          min-height: 320px;
          max-height: 420px;
          overflow-y: auto;
          font-size: 0.85rem;
          line-height: 1.8;
        }
        .mb-terminal__line {
          color: rgba(34,197,94,0.7);
          opacity: 0;
          animation: mb-line-in 300ms ease forwards;
        }
        .mb-terminal__line:last-child {
          color: #22c55e;
          font-weight: 700;
        }
        .mb-terminal__cursor {
          display: inline-block;
          width: 8px;
          height: 16px;
          background: #22c55e;
          margin-left: 4px;
          vertical-align: text-bottom;
        }
        .mb-terminal__cursor--hidden {
          opacity: 0;
        }

        @keyframes mb-line-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Phase: Dashboard ── */
        .mb-dashboard-phase {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0;
          animation: mb-fade-in 600ms ease;
        }
        @keyframes mb-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Dashboard header */
        .mb-dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          border-bottom: 1px solid rgba(34,197,94,0.1);
          background: #0f172a;
        }
        .mb-dash-header__left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .mb-dash-header__status {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #22c55e;
        }
        .mb-dash-header__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: mb-pulse 2s ease infinite;
        }
        @keyframes mb-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .mb-dash-header__company {
          font-family: var(--font-jakarta, system-ui, sans-serif);
          font-size: 1.1rem;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.02em;
        }
        .mb-dash-header__tier {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #eab308;
          padding: 0.3rem 0.75rem;
          border: 1px solid rgba(234,179,8,0.3);
          border-radius: 3px;
        }

        /* Dashboard body */
        .mb-dash-body {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(34,197,94,0.06);
          padding: 0;
        }

        /* Metric cards */
        .mb-metric {
          background: #0f172a;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .mb-metric__label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(226,232,240,0.3);
        }
        .mb-metric__value {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #22c55e;
          line-height: 1;
        }
        .mb-metric__value--yellow { color: #eab308; }
        .mb-metric__value--muted { color: rgba(226,232,240,0.4); font-size: 1.2rem; }
        .mb-metric__desc {
          font-size: 0.75rem;
          color: rgba(226,232,240,0.3);
          line-height: 1.5;
        }

        /* OAuth blocks */
        .mb-auth-section {
          grid-column: 1 / -1;
          background: #0f172a;
          padding: 2.5rem 2rem;
          border-top: 1px solid rgba(34,197,94,0.1);
        }
        .mb-auth-section__title {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(226,232,240,0.3);
          margin-bottom: 1.5rem;
        }
        .mb-auth-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .mb-auth-block {
          background: #020617;
          border: 1px solid rgba(226,232,240,0.06);
          border-radius: 4px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          cursor: pointer;
          transition: border-color 200ms ease, background 200ms ease;
        }
        .mb-auth-block:hover {
          border-color: rgba(34,197,94,0.3);
          background: rgba(15,23,42,0.6);
        }
        .mb-auth-block__header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .mb-auth-block__icon {
          width: 36px;
          height: 36px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 800;
          flex-shrink: 0;
        }
        .mb-auth-block__icon--google {
          background: rgba(66,133,244,0.15);
          color: #4285F4;
        }
        .mb-auth-block__icon--qbo {
          background: rgba(34,197,94,0.15);
          color: #22c55e;
        }
        .mb-auth-block__name {
          font-family: var(--font-jakarta, system-ui, sans-serif);
          font-size: 0.95rem;
          font-weight: 700;
          color: #f1f5f9;
        }
        .mb-auth-block__status {
          font-size: 0.65rem;
          font-weight: 600;
          color: rgba(226,232,240,0.25);
          letter-spacing: 0.05em;
        }
        .mb-auth-block__desc {
          font-size: 0.78rem;
          color: rgba(226,232,240,0.35);
          line-height: 1.6;
        }
        .mb-auth-block__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.25rem;
          background: transparent;
          border: 1px solid rgba(226,232,240,0.12);
          border-radius: 3px;
          color: rgba(226,232,240,0.5);
          font-family: inherit;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 150ms ease, color 150ms ease;
          align-self: flex-start;
        }
        .mb-auth-block__btn:hover {
          border-color: rgba(34,197,94,0.4);
          color: #22c55e;
        }

        /* Footer bar */
        .mb-dash-footer {
          padding: 1rem 2rem;
          border-top: 1px solid rgba(34,197,94,0.08);
          background: #020617;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(226,232,240,0.2);
        }
        .mb-dash-footer a {
          color: rgba(34,197,94,0.4);
          text-decoration: none;
          transition: color 150ms ease;
        }
        .mb-dash-footer a:hover {
          color: #22c55e;
        }

        @media (max-width: 640px) {
          .mb-dash-body { grid-template-columns: 1fr; }
          .mb-auth-grid { grid-template-columns: 1fr; }
          .mb-dash-header { flex-direction: column; gap: 0.75rem; align-items: flex-start; }
        }
      `}</style>

      {/* ── Phase: Input ── */}
      {phase === 'input' && (
        <div className="mb-input-phase">
          <div className="mb-brand">
            <div className="mb-brand__name">Hillbilly Dreams Inc.</div>
            <h1 className="mb-brand__title">
              Measurably <span>Better.</span>
            </h1>
            <p className="mb-brand__sub">
              Vertex AI processes your operational data and outputs financial-grade
              deliverables. One node. Zero configuration.
            </p>
          </div>

          <div className="mb-input-wrap">
            <form className="mb-input-form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                className="mb-input"
                placeholder="Enter your business domain (e.g., flanneryconstruction.com)..."
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                id="mb-domain-input"
              />
              <button
                type="submit"
                className="mb-submit"
                disabled={!domain.trim()}
                id="mb-initialize-btn"
              >
                [ Initialize Utility Node ]
              </button>
            </form>
          </div>

          <div className="mb-promise">
            <p className="mb-promise__text">
              Life is supposed to get easier. This is the easy you&apos;ve been looking for.
            </p>
          </div>
        </div>
      )}

      {/* ── Phase: Loading (Terminal) ── */}
      {phase === 'loading' && (
        <div className="mb-loading-phase">
          <div className="mb-terminal">
            <div className="mb-terminal__bar">
              <div className="mb-terminal__dot mb-terminal__dot--red" />
              <div className="mb-terminal__dot mb-terminal__dot--yellow" />
              <div className="mb-terminal__dot mb-terminal__dot--green" />
              <div className="mb-terminal__title">measurably-better — node provisioning</div>
              <div style={{ width: 30 }} />
            </div>
            <div className="mb-terminal__body" ref={terminalRef}>
              {terminalLines.map((line, i) => (
                <div key={i} className="mb-terminal__line">
                  {line}
                </div>
              ))}
              <span
                className={`mb-terminal__cursor${!cursorVisible ? ' mb-terminal__cursor--hidden' : ''}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Phase: Dashboard Shell ── */}
      {phase === 'dashboard' && (
        <div className="mb-dashboard-phase">
          {/* Header */}
          <div className="mb-dash-header">
            <div className="mb-dash-header__left">
              <div className="mb-dash-header__status">
                <div className="mb-dash-header__dot" />
                Node Online
              </div>
              <div className="mb-dash-header__company">
                {displayName || 'Your Company'}
              </div>
            </div>
            <div className="mb-dash-header__tier">$99/mo — The Engine</div>
          </div>

          {/* Metrics Grid */}
          <div className="mb-dash-body">
            <div className="mb-metric">
              <div className="mb-metric__label">Industry Vertical</div>
              <div className="mb-metric__value--muted" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f1f5f9' }}>
                AEC / Heavy Construction
              </div>
              <div className="mb-metric__desc">
                Detected from domain analysis. Vertex AI will optimize pipeline for spatial-to-financial conversion.
              </div>
            </div>
            <div className="mb-metric">
              <div className="mb-metric__label">Node Status</div>
              <div className="mb-metric__value">ACTIVE</div>
              <div className="mb-metric__desc">
                Cloud Run instance provisioned. Gemini 1.5 Pro context engine bound.
              </div>
            </div>
            <div className="mb-metric">
              <div className="mb-metric__label">Estimated Admin Overhead Recovery</div>
              <div className="mb-metric__value">23%</div>
              <div className="mb-metric__desc">
                Industry average. Connect data sources below to calculate your exact recovery.
              </div>
            </div>
            <div className="mb-metric">
              <div className="mb-metric__label">Monthly Node Cost</div>
              <div className="mb-metric__value mb-metric__value--yellow">$99</div>
              <div className="mb-metric__desc">
                Replaces $8,500/mo traditional IT overhead. Zero-configuration. No DevOps hire.
              </div>
            </div>

            {/* OAuth Connection Blocks */}
            <div className="mb-auth-section">
              <div className="mb-auth-section__title">
                Connect Data Sources — Activate Autonomous Pipeline
              </div>
              <div className="mb-auth-grid">
                {/* Google Workspace */}
                <div className="mb-auth-block" id="mb-auth-google">
                  <div className="mb-auth-block__header">
                    <div className="mb-auth-block__icon mb-auth-block__icon--google">G</div>
                    <div>
                      <div className="mb-auth-block__name">Google Workspace</div>
                      <div className="mb-auth-block__status">Not connected</div>
                    </div>
                  </div>
                  <div className="mb-auth-block__desc">
                    Calendar, Drive, and Gmail sync. Extracts capacity data, project timelines,
                    and communication patterns for operational forecasting.
                  </div>
                  <button
                    className="mb-auth-block__btn"
                    type="button"
                    onClick={() => signIn('google', { callbackUrl: '/measurably-better' })}
                  >
                    [ Auth: Google Workspace ]
                  </button>
                </div>

                {/* QuickBooks */}
                <div className="mb-auth-block" id="mb-auth-quickbooks">
                  <div className="mb-auth-block__header">
                    <div className="mb-auth-block__icon mb-auth-block__icon--qbo">Q</div>
                    <div>
                      <div className="mb-auth-block__name">QuickBooks Online</div>
                      <div className="mb-auth-block__status">Not connected</div>
                    </div>
                  </div>
                  <div className="mb-auth-block__desc">
                    Financial ledger sync. P&amp;L, balance sheet, vendor payments, and AR aging
                    feed directly into the margin recovery engine.
                  </div>
                  <button
                    className="mb-auth-block__btn"
                    type="button"
                    onClick={() => signIn('quickbooks', { callbackUrl: '/measurably-better' })}
                  >
                    [ Auth: QuickBooks ]
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mb-dash-footer">
            <span>Measurably Better™ — Hillbilly Dreams Inc.</span>
            <span>Vertex AI · Gemini 1.5 Pro · Cloud Run</span>
            <a href="https://measurablybetterthings.com">measurablybetterthings.com</a>
          </div>
        </div>
      )}
    </div>
  );
}
