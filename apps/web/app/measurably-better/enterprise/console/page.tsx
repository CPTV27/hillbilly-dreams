'use client';

import React, { useState, useRef, useEffect } from 'react';

// Color tokens now provided by .theme-mb-console in tokens.css via layout.tsx
// Semantic aliases for inline styles referencing CSS variables
const C = {
  bg: 'var(--bg)',
  surface: 'var(--surface)',
  border: 'var(--border)',
  surfaceHi: 'var(--surface-3)',
  textDisabled: 'var(--text-disabled)',
  textMuted: 'var(--text-muted)',
  textSecondary: 'var(--text-muted)',
  text: 'var(--text)',
  accent: 'var(--accent)',
  accentHover: 'var(--accent-hover)',
  warning: 'var(--warning)',
  success: 'var(--success)',
  error: 'var(--error)',
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
  role: 'system' | 'user' | 'engine' | 'tool';
  text: string;
  metadata?: {
    processingTimeMs: number;
    tokensPerSecond: number;
  };
  vertexContent?: any; // Native Vertex AI Content block schema for history propagation
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
    { role: 'system', text: 'Sovereign Orchestration Engine Online. Enterprise Mode Authorized. Native tools: QuickBooks, Calendar.' }
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
    
    const userContentItem = { role: 'user', parts: [{ text: userMessage }] };
    
    setChatLog(prev => [...prev, { role: 'user', text: userMessage, vertexContent: userContentItem }]);
    setIsProcessing(true);

    const activeContext = Object.entries(datasets)
      .filter(([, active]) => active)
      .map(([key]) => key);

    // Filter out UI-only messages and map down to native Vertex payload format
    let currentVertexSequence = [...chatLog]
      .map(m => m.vertexContent)
      .filter(Boolean);
      
    currentVertexSequence.push(userContentItem);

    try {
      while (true) {
        const res = await fetch('/api/ai/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: currentVertexSequence,
            context: {
              activeDatasets: activeContext,
              currentSimulation: { projects, automationLevel: automation, marginRecovered }
            }
          }),
        });

        if (!res.ok) throw new Error('Vertex AI endpoint failed');

        const data = await res.json();

        if (data.type === 'function_call') {
          // ── The AI invoked a Function Tool ──
          const call = data.functionCalls[0];
          const funcName = call.name;
          
          setChatLog(prev => [...prev, { role: 'tool', text: `[Executing native pipeline: ${funcName}]...` }]);
          
          // Append the model's functionCall struct to history
          currentVertexSequence.push({
            role: 'model',
            parts: [{ functionCall: call }]
          });

          // ── Real API Executions securely initiated by the browser's credentials ──
          let apiResult: any = { error: 'Unknown tool requested' };
          try {
             if (funcName === 'sync_quickbooks') {
               const qb = await fetch('/api/ingestion/quickbooks', { method: 'POST' });
               apiResult = qb.ok ? await qb.json() : { error: `Failed to sync QuickBooks: ${qb.status}` };
             } else if (funcName === 'sync_calendar') {
               const googleCal = await fetch('/api/ingestion/google', { method: 'POST' });
               apiResult = googleCal.ok ? await googleCal.json() : { error: `Failed to sync Calendar: ${googleCal.status}` };
             }
          } catch (apiErr: any) {
             apiResult = { error: apiErr.message };
          }
           
          // Append the securely retrieved API payload back to the model as a 'functionResponse'
          currentVertexSequence.push({
            role: 'user', // Vertex expects 'user' role for function returns
            parts: [{ 
              functionResponse: { name: funcName, response: { output: apiResult } } 
            }]
          });

          // Loop continues natively triggering the POST back to Vertex AI with the results...
        } else if (data.type === 'text') {
          // ── The AI returned a Text Response ──
          setMetrics({
            throughput: data.tokensPerSecond,
            latency: data.processingTimeMs,
            contextUsed: data.contextWindowUsed,
            modelInfo: data.modelId,
            cost: data.costPerQuery,
            uptime: '99.999%',
          });

          setChatLog(prev => [
            ...prev, 
            { 
              role: 'engine', 
              text: data.response,
              metadata: { processingTimeMs: data.processingTimeMs, tokensPerSecond: data.tokensPerSecond },
              vertexContent: data.vertexContent // Add the text back to history
            }
          ]);
          break; // Finish the sequence
        }
      }
    } catch (err) {
      console.error(err);
      setChatLog(prev => [...prev, { role: 'system', text: 'Exception bridging to Vertex AI.' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: 'JetBrains Mono, SF Mono, Consolas, monospace', color: C.text, fontSize: 13 }}>
      {/* ── Top Bar: Readouts ── */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: C.success, boxShadow: `0 0 8px ${C.success}` }} />
          <span style={{ fontWeight: 700, color: C.white, fontSize: 14, letterSpacing: '0.05em' }}>MEASURABLY BETTER ENTERPRISE ENGINE</span>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          <Readout label="Margin Recovery" value={`$${marginRecovered.toLocaleString()}`} color={C.success} />
          <Readout label="Projected Net" value={`$${(projectedNet / 1000).toFixed(0)}K`} color={C.success} />
          <Readout label="Model Status" value={metrics.modelInfo === 'Standby' ? 'READY' : 'ACTIVE'} color={C.accentHover} />
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 280px', gridTemplateRows: '1fr auto', height: 'calc(100vh - 49px)' }}>
        
        {/* ── Left: Scenario Dials ── */}
        <div style={{ borderRight: `1px solid ${C.border}`, padding: 24, display: 'flex', flexDirection: 'column', gap: 32, overflowY: 'auto' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.textMuted, marginBottom: 16 }}>Scenario Parameters</div>
            <label style={{ display: 'block', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: C.textSecondary }}>Annual Projects</span>
                <span style={{ color: C.white, fontWeight: 700 }}>{projects.toLocaleString()}</span>
              </div>
              <input type="range" min={500} max={3000} step={10} value={projects}
                onChange={e => setProjects(Number(e.target.value))}
                style={{ width: '100%', accentColor: C.accentHover }} />
            </label>

            <label style={{ display: 'block', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: C.textSecondary }}>Automation Level</span>
                <span style={{ color: C.white, fontWeight: 700 }}>{automation}%</span>
              </div>
              <input type="range" min={5} max={60} step={1} value={automation}
                onChange={e => setAutomation(Number(e.target.value))}
                style={{ width: '100%', accentColor: C.warning }} />
            </label>
          </div>
          
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.textMuted, marginBottom: 16 }}>Context Namespaces</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { key: 'ayon' as const, label: 'AYON Base', count: '128 instances' },
                { key: 'historical' as const, label: 'Historical Docs', count: 'Encrypted' },
              ].map(ds => (
                <label key={ds.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, backgroundColor: datasets[ds.key] ? 'rgba(14,165,233,0.08)' : C.surface, border: `1px solid ${datasets[ds.key] ? C.accentHover + '40' : C.border}`, cursor: 'pointer' }}>
                  <input type="checkbox" checked={datasets[ds.key]}
                    onChange={() => setDatasets(prev => ({ ...prev, [ds.key]: !prev[ds.key] }))}
                    style={{ accentColor: C.accentHover }} />
                  <div>
                    <div style={{ color: C.text, fontWeight: 600, fontSize: 12 }}>{ds.label}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ── Center: Live AI Metrics Dashboard ── */}
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.textMuted }}>Live Neural Telemetry</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <MetricCard title="Processing Latency" value={`${metrics.latency} ms`} active={isProcessing} color={C.success} />
            <MetricCard title="Token Throughput" value={`${metrics.throughput} tk/s`} active={isProcessing} color={C.accentHover} />
            <MetricCard title="Context Window Utilization" value={`${metrics.contextUsed.toLocaleString()} / 1,048,576`} />
            <MetricCard title="Inference Cost" value={`$${metrics.cost.toFixed(5)}`} />
            <MetricCard title="Model Substrate" value={metrics.modelInfo} />
            <MetricCard title="Cluster Uptime (GCP)" value={metrics.uptime} color={C.success} />
          </div>
          
          {metrics.latency > 0 && (
            <div style={{ marginTop: 'auto', padding: '16px', borderRadius: 8, backgroundColor: 'rgba(34,197,94,0.08)', border: `1px solid ${C.success}40`, color: C.success, fontWeight: 600, fontSize: 12, textAlign: 'center' }}>
              ✓ That sequence resolved in {metrics.latency}ms at {metrics.throughput} tokens/sec
            </div>
          )}
        </div>

        {/* ── Right: Executive Chat ── */}
        <div style={{ borderLeft: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.textMuted }}>
            Executive Input
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {chatLog.map((msg, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 11, color: msg.role === 'system' || msg.role === 'tool' ? C.textMuted : msg.role === 'user' ? C.white : C.accentHover }}>
                  {msg.role === 'system' ? '[SYS]' : msg.role === 'tool' ? '[NETWORK]' : msg.role === 'user' ? 'YOU' : 'ENGINE'}
                </span>
                <div style={{ color: msg.role === 'system' || msg.role === 'tool' ? C.warning : msg.role === 'user' ? C.text : C.white, lineHeight: 1.5, backgroundColor: msg.role === 'engine' ? C.surface : 'transparent', padding: msg.role === 'engine' ? '12px' : '0', borderRadius: 8, border: msg.role === 'engine' ? `1px solid ${C.border}` : 'none', fontFamily: msg.role === 'tool' ? 'monospace' : 'inherit' }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div style={{ color: C.textMuted, fontSize: 12, fontStyle: 'italic' }}>Analyzing context tensor...</div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleChat} style={{ display: 'flex', borderTop: `1px solid ${C.border}`, padding: '16px 24px', gap: 8, backgroundColor: C.surface }}>
            <span style={{ color: C.accentHover, fontWeight: 700, padding: '8px 0', fontSize: 12 }}>▸</span>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              disabled={isProcessing}
              placeholder="Ask the engine to sync systems or plan strategy..."
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
      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.textDisabled }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 900, color, fontFamily: 'JetBrains Mono, SF Mono, monospace' }}>{value}</div>
    </div>
  );
}

function MetricCard({ title, value, color, active }: { title: string; value: string; color?: string; active?: boolean }) {
  return (
    <div style={{ 
      padding: '20px', 
      borderRadius: '8px', 
      backgroundColor: active ? 'rgba(56,189,248,0.05)' : C.surface,
      border: `1px solid ${active ? C.accent + '50' : C.border}`,
      transition: 'all 0.2s',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {active && <div style={{ position: 'absolute', bottom: 0, left: 0, height: 2, background: C.accentHover, width: '100%', animation: 'pulse 1s infinite' }} />}
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: C.textMuted, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 900, color: color || C.white, fontFamily: 'JetBrains Mono, SF Mono, monospace' }}>{value}</div>
    </div>
  );
}
