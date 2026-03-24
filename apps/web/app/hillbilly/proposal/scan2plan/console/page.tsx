'use client';

import React, { useState, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────
// Color Tokens — Industrial Brutalism
// ─────────────────────────────────────────────────────────────
const C = {
  slate950: '#020617', slate900: '#0f172a', slate800: '#1e293b', slate700: '#334155',
  slate600: '#475569', slate500: '#64748b', slate400: '#94a3b8', slate300: '#cbd5e1',
  sky400: '#38bdf8', sky500: '#0ea5e9',
  orange400: '#fb923c', orange500: '#f97316',
  green400: '#4ade80', green500: '#22c55e',
  red400: '#f87171', red500: '#ef4444',
  white: '#ffffff',
};

// ─────────────────────────────────────────────────────────────
// JV Parameters — Model A ($134K Joint Venture)
// ─────────────────────────────────────────────────────────────
const JV = {
  platformFee: 134_000,
  equitySplit: '80/20',
  hdxCommission: 7,
  baseRevenue: 1_120_000,
  outsideServices: 358_000,
  baseNetIncome: 261_000,
};

// ─────────────────────────────────────────────────────────────
// Superiority Matrix Data
// ─────────────────────────────────────────────────────────────
const MATRIX_ROWS = [
  {
    dimension: 'Architecture',
    consumer: 'Stochastic text prediction. Output varies per run.',
    sovereign: 'Deterministic rigid schemas. Same input → same output, every time.',
  },
  {
    dimension: 'Context Window',
    consumer: 'Rolling window. Earlier project constraints degrade over time (Pollution Horizon).',
    sovereign: 'Cryptographic namespace isolation. Each project is air-gapped. Zero cross-talk.',
  },
  {
    dimension: 'Spatial Processing',
    consumer: 'Interprets LiDAR as text tokens. Hallucinates square footage and materials.',
    sovereign: 'Vertex AI rigid extraction. Binds geometry to your cost-code database with 0% drift.',
  },
  {
    dimension: 'Output',
    consumer: 'Conversational summaries. Requires manual copy-paste into deliverables.',
    sovereign: 'Executable PDF pipelines. Quote → invoice → GBP update. No human in the loop.',
  },
  {
    dimension: 'Data Ownership',
    consumer: 'Your prompts train their models. Your IP leaves your org.',
    sovereign: 'Sovereign Cloud SQL instance. Your data never leaves your namespace.',
  },
];

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export default function CEOConsole() {
  const [projects, setProjects] = useState(1888);
  const [automation, setAutomation] = useState(35);
  const [antiPollution, setAntiPollution] = useState(true);
  const [datasets, setDatasets] = useState({ ayon: true, crisp: false, historical: true });
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<{ role: 'system' | 'user' | 'engine'; text: string }[]>([
    { role: 'system', text: 'Sovereign Orchestration Engine Online. Consumer AI protocols disabled.' },
    { role: 'system', text: `JV Parameters loaded: ${JV.equitySplit} equity · $${(JV.platformFee / 1000).toFixed(0)}K platform fee · ${JV.hdxCommission}% commission` },
  ]);

  // Derived metrics
  const marginRecovered = Math.round(JV.outsideServices * (automation / 100));
  const projectedNet = JV.baseNetIncome + marginRecovered;
  const capacityUnlocked = Math.round((automation / 100) * projects * 0.23);
  const avgQuote = Math.round(JV.baseRevenue / projects);
  const projectedRevenue = JV.baseRevenue + Math.round(marginRecovered * 0.6);

  // Tool call stubs
  const handleUpdateSimulation = useCallback(() => {
    // TODO: Wire to Vertex AI tool call — updateSimulation({ projects, automation })
    setChatLog(prev => [...prev,
      { role: 'engine', text: `Simulation updated: ${projects} projects × ${automation}% automation → $${marginRecovered.toLocaleString()} margin recovery` },
    ]);
  }, [projects, automation, marginRecovered]);

  const handleInjectContext = useCallback(() => {
    // TODO: Wire to Vertex AI tool call — injectContextPayload({ datasets, antiPollution })
    const active = Object.entries(datasets).filter(([, v]) => v).map(([k]) => k);
    setChatLog(prev => [...prev,
      { role: 'engine', text: `Context payload packaged: [${active.join(', ')}] · Anti-pollution: ${antiPollution ? 'ENFORCED' : 'disabled'}` },
    ]);
  }, [datasets, antiPollution]);

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatLog(prev => [...prev, { role: 'user', text: chatInput }]);
    // TODO: Wire to Gemini 1.5 Pro via Vertex AI with injected context
    setTimeout(() => {
      setChatLog(prev => [...prev, { role: 'engine', text: `Processing: "${chatInput}" against ${Object.entries(datasets).filter(([, v]) => v).length} active namespaces. Anti-pollution ${antiPollution ? 'enforced' : 'disabled'}.` }]);
    }, 500);
    setChatInput('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.slate950, fontFamily: 'JetBrains Mono, SF Mono, Consolas, monospace', color: C.slate300, fontSize: 13 }}>

      {/* ── Top Bar: Readouts ── */}
      <div style={{ borderBottom: `1px solid ${C.slate800}`, padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: C.green500, boxShadow: `0 0 8px ${C.green500}` }} />
          <span style={{ fontWeight: 700, color: C.white, fontSize: 14, letterSpacing: '0.05em' }}>S2PX SOVEREIGN ENGINE</span>
          <span style={{ color: C.slate600, fontSize: 11 }}>v2.1.0 · us-east4</span>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          <Readout label="Margin Recovery" value={`$${marginRecovered.toLocaleString()}`} color={C.green400} />
          <Readout label="Capacity Unlocked" value={`${capacityUnlocked} jobs`} color={C.green400} />
          <Readout label="Context Bleed Rate" value="0.00%" color={C.green400} />
          <Readout label="JV Equity" value={JV.equitySplit} color={C.sky400} />
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 280px', gridTemplateRows: '1fr auto', height: 'calc(100vh - 49px)' }}>

        {/* ── Left: Scenario Dials ── */}
        <div style={{ borderRight: `1px solid ${C.slate800}`, padding: 24, display: 'flex', flexDirection: 'column', gap: 32, overflowY: 'auto' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.slate500, marginBottom: 16 }}>Scenario Parameters</div>

            <label style={{ display: 'block', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: C.slate400 }}>Annual Projects</span>
                <span style={{ color: C.white, fontWeight: 700 }}>{projects.toLocaleString()}</span>
              </div>
              <input type="range" min={500} max={3000} step={10} value={projects}
                onChange={e => setProjects(Number(e.target.value))}
                style={{ width: '100%', accentColor: C.sky400 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.slate600, marginTop: 4 }}>
                <span>500</span><span>3,000</span>
              </div>
            </label>

            <label style={{ display: 'block', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: C.slate400 }}>Automation Level</span>
                <span style={{ color: C.white, fontWeight: 700 }}>{automation}%</span>
              </div>
              <input type="range" min={5} max={60} step={1} value={automation}
                onChange={e => setAutomation(Number(e.target.value))}
                style={{ width: '100%', accentColor: C.orange400 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.slate600, marginTop: 4 }}>
                <span>Conservative 5%</span><span>Aggressive 60%</span>
              </div>
            </label>

            <button onClick={handleUpdateSimulation}
              style={{ width: '100%', padding: '10px', borderRadius: 8, backgroundColor: C.slate800, border: `1px solid ${C.slate700}`, color: C.sky400, fontWeight: 700, cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' }}>
              ▶ Run Simulation
            </button>
          </div>

          <div style={{ borderTop: `1px solid ${C.slate800}`, paddingTop: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.slate500, marginBottom: 16 }}>JV Financial Model</div>
            <MetricRow label="Platform Fee" value={`$${(JV.platformFee / 1000).toFixed(0)}K/yr`} />
            <MetricRow label="Equity Split" value={JV.equitySplit} />
            <MetricRow label="HDX Commission" value={`${JV.hdxCommission}%`} />
            <MetricRow label="Base Revenue" value={`$${(JV.baseRevenue / 1000).toFixed(0)}K`} />
            <MetricRow label="Outside Services" value={`$${(JV.outsideServices / 1000).toFixed(0)}K`} highlight />
            <MetricRow label="Avg Quote" value={`$${avgQuote.toLocaleString()}`} />
            <div style={{ borderTop: `1px solid ${C.slate700}`, marginTop: 12, paddingTop: 12 }}>
              <MetricRow label="Projected Revenue" value={`$${(projectedRevenue / 1000).toFixed(0)}K`} color={C.green400} />
              <MetricRow label="Projected Net" value={`$${(projectedNet / 1000).toFixed(0)}K`} color={C.green400} />
            </div>
          </div>
        </div>

        {/* ── Center: Superiority Matrix ── */}
        <div style={{ padding: 24, overflowY: 'auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.slate500, marginBottom: 8 }}>Architecture Comparison</div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: C.white, margin: '0 0 24px', letterSpacing: '-0.5px' }}>
            Sovereign Spatial Engine vs. Consumer AI
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: 2 }}>
              <div style={{ padding: '12px 16px', backgroundColor: C.slate900, borderRadius: '8px 0 0 0' }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.slate500 }}>Dimension</span>
              </div>
              <div style={{ padding: '12px 16px', backgroundColor: 'rgba(239,68,68,0.08)', textAlign: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.red400 }}>Consumer Chatbots</span>
              </div>
              <div style={{ padding: '12px 16px', backgroundColor: 'rgba(34,197,94,0.08)', borderRadius: '0 8px 0 0', textAlign: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.green400 }}>HDX Sovereign Engine</span>
              </div>
            </div>

            {/* Rows */}
            {MATRIX_ROWS.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: 2 }}>
                <div style={{ padding: '14px 16px', backgroundColor: C.slate900, display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: C.slate300, fontSize: 12 }}>{row.dimension}</span>
                </div>
                <div style={{ padding: '14px 16px', backgroundColor: 'rgba(239,68,68,0.04)', borderLeft: `2px solid ${C.red500}20` }}>
                  <span style={{ color: C.slate400, fontSize: 12, lineHeight: 1.5 }}>{row.consumer}</span>
                </div>
                <div style={{ padding: '14px 16px', backgroundColor: 'rgba(34,197,94,0.04)', borderLeft: `2px solid ${C.green500}40` }}>
                  <span style={{ color: C.slate300, fontSize: 12, lineHeight: 1.5 }}>{row.sovereign}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Context Packager ── */}
        <div style={{ borderLeft: `1px solid ${C.slate800}`, padding: 24, display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.slate500, marginBottom: 16 }}>Context Packager</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { key: 'ayon' as const, label: 'AYON Studio Baselines', count: '128 projects' },
                { key: 'crisp' as const, label: 'Crisp Architects Geometry', count: '81 projects' },
                { key: 'historical' as const, label: 'Historical Pipeline (858 est.)', count: 'Full corpus' },
              ].map(ds => (
                <label key={ds.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, backgroundColor: datasets[ds.key] ? 'rgba(14,165,233,0.08)' : C.slate900, border: `1px solid ${datasets[ds.key] ? C.sky400 + '40' : C.slate800}`, cursor: 'pointer' }}>
                  <input type="checkbox" checked={datasets[ds.key]}
                    onChange={() => setDatasets(prev => ({ ...prev, [ds.key]: !prev[ds.key] }))}
                    style={{ accentColor: C.sky400 }} />
                  <div>
                    <div style={{ color: C.slate300, fontWeight: 600, fontSize: 12 }}>{ds.label}</div>
                    <div style={{ color: C.slate600, fontSize: 10 }}>{ds.count}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${C.slate800}`, paddingTop: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.slate500, marginBottom: 12 }}>Isolation Protocol</div>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 8, backgroundColor: antiPollution ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${antiPollution ? C.green500 + '40' : C.red500 + '40'}`, cursor: 'pointer' }}>
              <div>
                <div style={{ color: C.white, fontWeight: 700, fontSize: 12 }}>Anti-Pollution Override</div>
                <div style={{ color: antiPollution ? C.green400 : C.red400, fontSize: 10, fontWeight: 600 }}>
                  {antiPollution ? 'ENFORCED — Zero cross-namespace bleed' : 'DISABLED — Context boundaries relaxed'}
                </div>
              </div>
              <div onClick={() => setAntiPollution(!antiPollution)}
                style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: antiPollution ? C.green500 : C.slate700, position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: C.white, position: 'absolute', top: 3, left: antiPollution ? 23 : 3, transition: 'left 0.2s' }} />
              </div>
            </label>

            <button onClick={handleInjectContext}
              style={{ width: '100%', marginTop: 12, padding: '10px', borderRadius: 8, backgroundColor: C.slate800, border: `1px solid ${C.slate700}`, color: C.green400, fontWeight: 700, cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' }}>
              ⬡ Package Context Payload
            </button>
          </div>
        </div>

        {/* ── Bottom: Executive Chat ── */}
        <div style={{ gridColumn: '1 / -1', borderTop: `1px solid ${C.slate800}`, display: 'flex', flexDirection: 'column', maxHeight: 240 }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {chatLog.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 700, fontSize: 11, color: msg.role === 'system' ? C.slate600 : msg.role === 'user' ? C.sky400 : C.green400, minWidth: 60, flexShrink: 0 }}>
                  {msg.role === 'system' ? '[SYS]' : msg.role === 'user' ? '[EXEC]' : '[ENGINE]'}
                </span>
                <span style={{ color: msg.role === 'system' ? C.slate600 : C.slate300, lineHeight: 1.5 }}>{msg.text}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleChat} style={{ display: 'flex', borderTop: `1px solid ${C.slate800}`, padding: '8px 24px', gap: 8 }}>
            <span style={{ color: C.green400, fontWeight: 700, padding: '8px 0', fontSize: 12 }}>▸</span>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Design your JV scenario or package your secure context payload..."
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: C.white, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
            />
            <button type="submit" style={{ backgroundColor: C.slate800, border: `1px solid ${C.slate700}`, color: C.sky400, padding: '6px 16px', borderRadius: 6, fontWeight: 700, cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' }}>
              Execute
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function Readout({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ textAlign: 'right' }}>
      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.slate600 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 900, color, fontFamily: 'JetBrains Mono, SF Mono, monospace' }}>{value}</div>
    </div>
  );
}

function MetricRow({ label, value, color, highlight }: { label: string; value: string; color?: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${C.slate800}30` }}>
      <span style={{ color: highlight ? C.red400 : C.slate500, fontSize: 12 }}>{label}</span>
      <span style={{ color: color || C.slate300, fontWeight: 600, fontSize: 12 }}>{value}</span>
    </div>
  );
}
