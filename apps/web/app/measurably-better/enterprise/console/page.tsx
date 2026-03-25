'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────
// Color Tokens — Industrial Brutalism Minimalist
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
// JV Parameters — Model A
// ─────────────────────────────────────────────────────────────
const JV = {
  baseRevenue: 1_120_000,
  outsideServices: 358_000,
  baseNetIncome: 261_000,
  year1Total: 63_000,
};

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface ChatMessage {
  role: 'system' | 'user' | 'engine';
  text: string;
  metadata?: {
    processingTimeMs: number;
    tokensPerSecond: number;
  };
}

interface AIMetrics {
  throughput: number;
  latency: number;
  contextUsed: number;
  modelInfo: string;
  cost: number;
  uptime: string;
}

export default function EnterpriseConsole() {
  const [projects, setProjects] = useState(1888);
  const [automation, setAutomation] = useState(35);
  const [datasets, setDatasets] = useState({ ayon: true, crisp: false, historical: true });
  
  const [chatInput, setChatInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    { role: 'system', text: 'Sovereign Orchestration Engine Online. Enterprise Mode Authorized.' }
  ]);

  const [metrics, setMetrics] = useState<AIMetrics>({
    throughput: 0,
    latency: 0,
    contextUsed: 0,
    modelInfo: 'Standby',
    cost: 0,
    uptime: '99.999%',
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Derived metrics
  const marginRecovered = Math.round(JV.outsideServices * (automation / 100));
  const projectedNet = JV.baseNetIncome + marginRecovered;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isProcessing) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatLog(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsProcessing(true);

    // Build context active payload
    const activeContext = Object.entries(datasets)
      .filter(([, active]) => active)
      .map(([key]) => key);

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMessage,
          context: {
            activeDatasets: activeContext,
            currentSimulation: { projects, automationLevel: automation, marginRecovered }
          }
        }),
      });

      if (!res.ok) throw new Error('Vertex AI endpoint failed');

      const data = await res.json();

      setMetrics({
        throughput: data.tokensPerSecond,
        latency: data.processingTimeMs,
        contextUsed: data.contextWindowUsed,
        modelInfo: data.modelId,
        cost: data.costPerQuery,
        uptime: '99.999%', // Constant for demo
      });

      setChatLog(prev => [
        ...prev, 
        { 
          role: 'engine', 
          text: data.response,
          metadata: { processingTimeMs: data.processingTimeMs, tokensPerSecond: data.tokensPerSecond }
        }
      ]);
    } catch (err) {
      console.error(err);
      setChatLog(prev => [...prev, { role: 'system', text: 'Error connecting to Vertex AI sovereign node. Ensure Cloud credentials are valid.' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.slate950, fontFamily: 'JetBrains Mono, SF Mono, Consolas, monospace', color: C.slate300, fontSize: 13 }}>
      {/* ── Top Bar: Readouts ── */}
      <div style={{ borderBottom: `1px solid ${C.slate800}`, padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: C.green500, boxShadow: `0 0 8px ${C.green500}` }} />
          <span style={{ fontWeight: 700, color: C.white, fontSize: 14, letterSpacing: '0.05em' }}>MEASURABLY BETTER ENTERPRISE ENGINE</span>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          <Readout label="Margin Recovery" value={`$${marginRecovered.toLocaleString()}`} color={C.green400} />
          <Readout label="Projected Net" value={`$${(projectedNet / 1000).toFixed(0)}K`} color={C.green400} />
          <Readout label="Model Status" value={metrics.modelInfo === 'Standby' ? 'READY' : 'ACTIVE'} color={C.sky400} />
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
            </label>

            <label style={{ display: 'block', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: C.slate400 }}>Automation Level</span>
                <span style={{ color: C.white, fontWeight: 700 }}>{automation}%</span>
              </div>
              <input type="range" min={5} max={60} step={1} value={automation}
                onChange={e => setAutomation(Number(e.target.value))}
                style={{ width: '100%', accentColor: C.orange400 }} />
            </label>
          </div>
          
          <div style={{ borderTop: `1px solid ${C.slate800}`, paddingTop: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.slate500, marginBottom: 16 }}>Context Namespaces</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { key: 'ayon' as const, label: 'AYON Base', count: '128 instances' },
                { key: 'historical' as const, label: 'Historical Docs', count: 'Encrypted' },
              ].map(ds => (
                <label key={ds.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, backgroundColor: datasets[ds.key] ? 'rgba(14,165,233,0.08)' : C.slate900, border: `1px solid ${datasets[ds.key] ? C.sky400 + '40' : C.slate800}`, cursor: 'pointer' }}>
                  <input type="checkbox" checked={datasets[ds.key]}
                    onChange={() => setDatasets(prev => ({ ...prev, [ds.key]: !prev[ds.key] }))}
                    style={{ accentColor: C.sky400 }} />
                  <div>
                    <div style={{ color: C.slate300, fontWeight: 600, fontSize: 12 }}>{ds.label}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ── Center: Live AI Metrics Dashboard ── */}
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.slate500 }}>Live Neural Telemetry</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <MetricCard title="Processing Latency" value={`${metrics.latency} ms`} active={isProcessing} color={C.green400} />
            <MetricCard title="Token Throughput" value={`${metrics.throughput} tk/s`} active={isProcessing} color={C.sky400} />
            <MetricCard title="Context Window Utilization" value={`${metrics.contextUsed.toLocaleString()} / 1,048,576`} />
            <MetricCard title="Inference Cost" value={`$${metrics.cost.toFixed(5)}`} />
            <MetricCard title="Model Substrate" value={metrics.modelInfo} />
            <MetricCard title="Cluster Uptime (GCP)" value={metrics.uptime} color={C.green500} />
          </div>
          
          {metrics.latency > 0 && (
            <div style={{ marginTop: 'auto', padding: '16px', borderRadius: 8, backgroundColor: 'rgba(34,197,94,0.08)', border: `1px solid ${C.green500}40`, color: C.green400, fontWeight: 600, fontSize: 12, textAlign: 'center' }}>
              ✓ That query processed in {metrics.latency}ms at {metrics.throughput} tokens/sec
            </div>
          )}
        </div>

        {/* ── Right: Executive Chat ── */}
        <div style={{ borderLeft: `1px solid ${C.slate800}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.slate800}`, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.slate500 }}>
            Executive Input
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {chatLog.map((msg, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 11, color: msg.role === 'system' ? C.slate500 : msg.role === 'user' ? C.white : C.sky400 }}>
                  {msg.role === 'system' ? '[SYS]' : msg.role === 'user' ? 'YOU' : 'ENGINE'}
                </span>
                <div style={{ color: msg.role === 'system' ? C.slate500 : msg.role === 'user' ? C.slate300 : C.white, lineHeight: 1.5, backgroundColor: msg.role === 'engine' ? C.slate900 : 'transparent', padding: msg.role === 'engine' ? '12px' : '0', borderRadius: 8, border: msg.role === 'engine' ? `1px solid ${C.slate800}` : 'none' }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div style={{ color: C.slate500, fontSize: 12, fontStyle: 'italic' }}>Analyzing context tensor...</div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleChat} style={{ display: 'flex', borderTop: `1px solid ${C.slate800}`, padding: '16px 24px', gap: 8, backgroundColor: C.slate900 }}>
            <span style={{ color: C.sky400, fontWeight: 700, padding: '8px 0', fontSize: 12 }}>▸</span>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              disabled={isProcessing}
              placeholder="Ask the engine to plan strategy..."
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: C.white, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
            />
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

function MetricCard({ title, value, color, active }: { title: string; value: string; color?: string; active?: boolean }) {
  return (
    <div style={{ 
      padding: '20px', 
      borderRadius: '8px', 
      backgroundColor: active ? 'rgba(56,189,248,0.05)' : C.slate900,
      border: `1px solid ${active ? C.sky500 + '50' : C.slate800}`,
      transition: 'all 0.2s',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {active && <div style={{ position: 'absolute', bottom: 0, left: 0, height: 2, background: C.sky400, width: '100%', animation: 'pulse 1s infinite' }} />}
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: C.slate500, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 900, color: color || C.white, fontFamily: 'JetBrains Mono, SF Mono, monospace' }}>{value}</div>
    </div>
  );
}
