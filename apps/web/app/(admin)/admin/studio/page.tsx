'use client';

import type { CSSProperties } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Braces, Cpu, Hash, LayoutGrid, Radio, Shield, Terminal, ToggleLeft, Zap } from 'lucide-react';

const BG = '#050505';
const NEON = '#22d3ee';
const NEON_DIM = 'rgba(34, 211, 238, 0.35)';
const GOLD = '#c8943e';
const VIOLET = '#a78bfa';
const GLASS_BG = 'rgba(255, 255, 255, 0.05)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.08)';

type RegistryTool = {
  id: string;
  name: string;
  description: string;
  authClass: string;
  modelTier?: string;
  inputJsonSchema: Record<string, unknown>;
};

type PulseRow = {
  type: 'action' | 'context' | 'draft_action' | 'draft_context';
  id: number | string;
  agent: string | null;
  action: string;
  summary: string;
  domain: string;
  impact?: string | null;
  createdAt: string;
  detailPreview?: string;
};

type JsonProp = {
  type?: string | string[];
  description?: string;
  default?: unknown;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function schemaProps(schema: Record<string, unknown>): {
  properties: Record<string, JsonProp>;
  required: string[];
} {
  const props = isRecord(schema.properties) ? (schema.properties as Record<string, JsonProp>) : {};
  const req = Array.isArray(schema.required) ? (schema.required as string[]) : [];
  return { properties: props, required: req };
}

/** Registry tier enum → operator-facing band (no vendor model names). */
function intelligenceBand(tier?: string): string {
  if (!tier) return 'Router default';
  const u = tier.toUpperCase();
  if (u === 'ARCHITECT') return 'Architect band';
  if (u === 'CARPENTER') return 'Carpenter band';
  if (u === 'INTERN') return 'Intern band';
  return tier;
}

const GLASS_SHADOW = '0 8px 32px rgba(0,0,0,0.45)';

const glassCard: CSSProperties = {
  background: GLASS_BG,
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: `1px solid ${GLASS_BORDER}`,
  borderRadius: 14,
  boxShadow: GLASS_SHADOW,
};

const inputStyle: CSSProperties = {
  padding: '0.55rem 0.7rem',
  borderRadius: 10,
  border: `1px solid ${GLASS_BORDER}`,
  background: 'rgba(0,0,0,0.35)',
  color: '#e8e4de',
  fontSize: '0.875rem',
};

function FieldIcon({ types }: { types: string[] }) {
  const isObj = types.includes('object');
  const isBool = types.includes('boolean');
  const isNum = types.includes('number') || types.includes('integer');
  const iconProps = { size: 14, color: NEON, style: { flexShrink: 0, opacity: 0.9 } as const };
  if (isBool) return <ToggleLeft {...iconProps} />;
  if (isObj) return <Braces {...iconProps} />;
  if (isNum) return <Hash {...iconProps} />;
  return <Terminal {...iconProps} />;
}

function StudioCommandForm({
  tool,
  sandboxMode,
  onComplete,
}: {
  tool: RegistryTool;
  sandboxMode: boolean;
  onComplete: (ok: boolean, body: string) => void;
}) {
  const { properties, required } = useMemo(() => schemaProps(tool.inputJsonSchema), [tool.inputJsonSchema]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);
  const [localErr, setLocalErr] = useState<string | null>(null);

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const key of Object.keys(properties)) {
      next[key] = '';
    }
    setValues(next);
  }, [tool.id, properties]);

  const setField = (key: string, v: string) => setValues((prev) => ({ ...prev, [key]: v }));

  const buildParams = (): Record<string, unknown> => {
    const out: Record<string, unknown> = {};
    for (const [key, prop] of Object.entries(properties)) {
      const raw = values[key]?.trim() ?? '';
      const types = Array.isArray(prop.type) ? prop.type : prop.type ? [prop.type] : ['string'];
      const isObj = types.includes('object');
      const isBool = types.includes('boolean');
      const isNum = types.includes('number') || types.includes('integer');

      if (raw === '' && !required.includes(key)) continue;

      if (isBool) {
        out[key] = raw === 'true' || raw === '1';
        continue;
      }
      if (isNum) {
        if (raw === '') continue;
        const n = Number(raw);
        if (!Number.isNaN(n)) out[key] = types.includes('integer') ? Math.trunc(n) : n;
        continue;
      }
      if (isObj) {
        if (!raw) continue;
        out[key] = JSON.parse(raw) as unknown;
        continue;
      }
      if (raw !== '') out[key] = raw;
    }
    return out;
  };

  const run = async () => {
    setRunning(true);
    setLocalErr(null);
    try {
      const params = buildParams();
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: tool.id, params, ...(sandboxMode ? { isSandbox: true } : {}) }),
      });
      const data = await res.json();
      const body = JSON.stringify(data, null, 2);
      onComplete(res.ok, body);
      if (res.ok) setLocalErr(null);
      else setLocalErr(typeof data.error === 'string' ? data.error : body);
    } catch (e) {
      if (e instanceof SyntaxError) {
        setLocalErr(`Invalid JSON in an object field: ${e.message}`);
      } else {
        setLocalErr(e instanceof Error ? e.message : String(e));
      }
    } finally {
      setRunning(false);
    }
  };

  const keys = Object.keys(properties);

  return (
    <div style={{ ...glassCard, padding: '1.35rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
        <Zap size={18} color={GOLD} />
        <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', color: NEON }}>
          COMMAND CENTER
        </span>
      </div>
      <p style={{ margin: '0 0 1rem', fontSize: '0.8125rem', color: 'rgba(232,228,222,0.72)', lineHeight: 1.55 }}>
        {tool.description}
      </p>
      {keys.length === 0 ? (
        <p style={{ color: 'rgba(232,228,222,0.5)', fontSize: '0.875rem' }}>No parameters — sends an empty object.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {keys.map((key) => {
            const prop = properties[key];
            const types = Array.isArray(prop.type) ? prop.type : prop.type ? [prop.type] : ['string'];
            const isObj = types.includes('object');
            const isBool = types.includes('boolean');
            const label = `${key}${required.includes(key) ? ' *' : ''}`;
            return (
              <label
                key={key}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  fontSize: '0.72rem',
                  color: 'rgba(232,228,222,0.55)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                  <FieldIcon types={types} />
                  <span style={{ textTransform: 'capitalize' }}>{label}</span>
                </span>
                {isBool ? (
                  <select value={values[key] || ''} onChange={(e) => setField(key, e.target.value)} style={inputStyle}>
                    <option value="">(optional)</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                ) : isObj ? (
                  <textarea
                    value={values[key] || ''}
                    onChange={(e) => setField(key, e.target.value)}
                    placeholder='{"example": true}'
                    rows={4}
                    style={{ ...inputStyle, fontFamily: 'ui-monospace, monospace', fontSize: '0.8125rem' }}
                  />
                ) : types.includes('number') || types.includes('integer') ? (
                  <input type="number" value={values[key] || ''} onChange={(e) => setField(key, e.target.value)} style={inputStyle} />
                ) : (
                  <input type="text" value={values[key] || ''} onChange={(e) => setField(key, e.target.value)} style={inputStyle} />
                )}
                {prop.description ? (
                  <span style={{ fontSize: '0.65rem', opacity: 0.85 }}>{prop.description}</span>
                ) : null}
              </label>
            );
          })}
        </div>
      )}
      {localErr ? (
        <p style={{ color: '#f87171', fontSize: '0.8125rem', marginTop: '0.75rem' }}>{localErr}</p>
      ) : null}
      <button
        type="button"
        onClick={() => void run()}
        disabled={running}
        style={{
          marginTop: '1.35rem',
          width: '100%',
          padding: '0.75rem 1.25rem',
          borderRadius: 10,
          border: `1px solid ${NEON_DIM}`,
          background: running ? 'rgba(34,211,238,0.12)' : `linear-gradient(135deg, rgba(34,211,238,0.25), rgba(200,148,62,0.35))`,
          color: '#f5f2ed',
          fontWeight: 800,
          letterSpacing: '0.06em',
          cursor: running ? 'wait' : 'pointer',
          fontSize: '0.8rem',
          textTransform: 'uppercase' as const,
        }}
      >
        {running ? 'Routing…' : 'Run registry command'}
      </button>
      <p style={{ margin: '0.65rem 0 0', fontSize: '0.62rem', color: 'rgba(232,228,222,0.35)' }}>
        POST /api/agent — {'{ toolId, params' + (sandboxMode ? ', isSandbox: true' : '') + ' }'}
      </p>
    </div>
  );
}

function SovereignRegistryStream({ refreshToken }: { refreshToken: number }) {
  const [rows, setRows] = useState<PulseRow[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const poll = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/agent-actions?limit=80&minutes=5');
      if (!res.ok) {
        setErr(`HTTP ${res.status}`);
        return;
      }
      const data = (await res.json()) as { actions: PulseRow[] };
      setRows(data.actions || []);
      setErr(null);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  }, []);

  useEffect(() => {
    void poll();
    const t = setInterval(() => void poll(), 4000);
    return () => clearInterval(t);
  }, [poll]);

  useEffect(() => {
    if (refreshToken > 0) void poll();
  }, [refreshToken, poll]);

  return (
    <section style={{ ...glassCard, display: 'flex', flexDirection: 'column', minHeight: 320, maxHeight: 480 }}>
      <div
        style={{
          padding: '0.75rem 1rem',
          borderBottom: `1px solid ${GLASS_BORDER}`,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Radio size={16} color={GOLD} />
          <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', color: GOLD }}>
            SOVEREIGN REGISTRY STREAM
          </span>
        </div>
        <p style={{ margin: '0.35rem 0 0', fontSize: '0.65rem', color: 'rgba(232,228,222,0.45)', lineHeight: 1.4 }}>
          Live AgentAction + AgentContext + Draft* (5 min). Orchestrator entries read as operational telemetry—Delta Dawn
          voice in product copy stays executive-producer polite; this feed is the raw log.
        </p>
      </div>
      <div style={{ overflowY: 'auto', flex: 1, padding: '0.65rem' }}>
        {err ? <p style={{ color: '#f87171', fontSize: '0.8rem' }}>{err}</p> : null}
        {rows.length === 0 && !err ? (
          <p style={{ color: 'rgba(232,228,222,0.4)', fontSize: '0.8rem', margin: '0.5rem' }}>No rows in window.</p>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {rows.map((r) => (
              <li
                key={`${r.type}-${r.id}`}
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: 10,
                  background: 'rgba(0,0,0,0.35)',
                  border: `1px solid ${GLASS_BORDER}`,
                  fontSize: '0.72rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                  <span
                    style={{
                      fontWeight: 800,
                      color:
                        r.type === 'context' || r.type === 'draft_context'
                          ? NEON
                          : r.type === 'draft_action'
                            ? GOLD
                            : VIOLET,
                      letterSpacing: '0.05em',
                      fontSize: '0.62rem',
                    }}
                  >
                    {r.type.replace('_', ' ').toUpperCase()}
                  </span>
                  <time style={{ color: 'rgba(232,228,222,0.35)', whiteSpace: 'nowrap' }}>
                    {new Date(r.createdAt).toLocaleString()}
                  </time>
                </div>
                <div style={{ color: 'rgba(232,228,222,0.55)', marginBottom: 4 }}>
                  <strong style={{ color: '#e8e4de' }}>{r.agent ?? '—'}</strong> · {r.action} · {r.domain}
                </div>
                <div style={{ color: 'rgba(232,228,222,0.82)', lineHeight: 1.5 }}>{r.summary}</div>
                {r.detailPreview ? (
                  <pre
                    style={{
                      margin: '0.45rem 0 0',
                      fontSize: '0.62rem',
                      color: 'rgba(232,228,222,0.4)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {r.detailPreview}
                  </pre>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function IntelligenceRouterPanel() {
  const node: CSSProperties = {
    borderRadius: 10,
    padding: '0.45rem 0.65rem',
    fontSize: '0.62rem',
    fontWeight: 700,
    textAlign: 'center' as const,
    border: `1px solid ${GLASS_BORDER}`,
  };

  return (
    <div style={{ ...glassCard, padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
        <Cpu size={16} color={NEON} />
        <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em', color: NEON }}>
          TIERED INTELLIGENCE
        </span>
      </div>
      <p style={{ fontSize: '0.65rem', color: 'rgba(232,228,222,0.45)', margin: '0 0 1rem', lineHeight: 1.45 }}>
        Architect band routes orchestration; Carpenter / Intern bands run volume work. Actual models are configured in
        infra—not hardcoded here.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            ...node,
            background: 'linear-gradient(135deg, rgba(167,139,250,0.35), rgba(34,211,238,0.2))',
            minWidth: 160,
            color: '#f0ebe0',
          }}
        >
          ARCHITECT NODE
        </div>
        <div style={{ fontSize: '0.55rem', color: NEON_DIM, letterSpacing: '0.2em' }}>▼</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['CARPENTER', 'CARPENTER', 'INTERN'].map((label, i) => (
            <div
              key={`${label}-${i}`}
              style={{
                ...node,
                background: 'rgba(34,211,238,0.08)',
                color: NEON,
                minWidth: 88,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TelemetryPanel() {
  return (
    <div style={{ ...glassCard, padding: '1rem', marginTop: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.65rem' }}>
        <Zap size={16} color={GOLD} />
        <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em', color: GOLD }}>LIVE TELEMETRY</span>
      </div>
      <div style={{ fontSize: '0.75rem', color: '#e8e4de', lineHeight: 1.6 }}>
        <div>
          <span style={{ color: 'rgba(232,228,222,0.45)' }}>Token Guard arbitrage (window est.)</span>
          <br />
          <strong style={{ color: NEON }}>42.8%</strong> <span style={{ color: 'rgba(232,228,222,0.5)' }}>vs. unfenced SDK path</span>
        </div>
        <div style={{ marginTop: '0.65rem' }}>
          <span style={{ color: 'rgba(232,228,222,0.45)' }}>Latency (Vertex path, rolling)</span>
          <br />
          <strong style={{ color: NEON }}>~18ms</strong> <span style={{ color: 'rgba(232,228,222,0.5)' }}>avg (illustrative)</span>
        </div>
      </div>
      <p style={{ margin: '0.65rem 0 0', fontSize: '0.58rem', color: 'rgba(232,228,222,0.32)' }}>
        Wire to real metrics in ops dashboard; values shown are placeholders for the console aesthetic.
      </p>
    </div>
  );
}

export default function SovereignStudioOs() {
  const [tools, setTools] = useState<RegistryTool[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<{ ok: boolean; body: string } | null>(null);
  const [pulseRefresh, setPulseRefresh] = useState(0);
  const [sandboxMode, setSandboxMode] = useState(false);

  const selected = tools.find((t) => t.id === selectedId) ?? null;

  const loadRegistry = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/registry');
      if (!res.ok) {
        setLoadError(`Registry HTTP ${res.status}`);
        return;
      }
      const data = (await res.json()) as { tools: RegistryTool[] };
      setTools(data.tools || []);
      setLoadError(null);
      if (data.tools?.length) {
        setSelectedId((prev) => prev ?? data.tools[0].id);
      }
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  useEffect(() => {
    void loadRegistry();
  }, [loadRegistry]);

  const tickerItems = useMemo(
    () => ['ROOK.HARVEST', 'DELTA.DAWN', 'GHOST.REWRITE', 'TOKEN.GUARD', 'REGISTRY.BOUNCER', 'STUDIO.OS'],
    []
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: BG,
        color: '#e8e4de',
        fontFamily: 'var(--font-body, DM Sans, system-ui, sans-serif)',
      }}
    >
      <style>{`
        @keyframes studio-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .studio-marquee-track {
          display: flex;
          width: max-content;
          animation: studio-marquee 38s linear infinite;
        }
      `}</style>

      {/* Ticker */}
      <div
        style={{
          borderBottom: `1px solid ${GLASS_BORDER}`,
          background: 'rgba(0,0,0,0.6)',
          overflow: 'hidden',
          padding: '0.4rem 0',
        }}
      >
        <div className="studio-marquee-track" role="presentation">
          {[0, 1].map((dup) => (
            <div key={dup} style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', paddingRight: '2.5rem' }}>
              {tickerItems.map((tag) => (
                <span
                  key={`${dup}-${tag}`}
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.18em',
                    color: dup === 0 ? NEON : GOLD,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '1.5rem 1.25rem 2.5rem' }}>
        {/* Hero */}
        <header style={{ marginBottom: '1.75rem' }}>
          <h1
            style={{
              fontSize: 'clamp(1.35rem, 3vw, 1.85rem)',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: '#f5f2ed' }}>Hillbilly </span>
            <span
              style={{
                background: `linear-gradient(90deg, ${GOLD}, ${NEON}, ${VIOLET})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Dreams
            </span>
            <span style={{ color: 'rgba(232,228,222,0.85)' }}>: Sovereign Media Protocol</span>
          </h1>
          <p
            style={{
              margin: '0.5rem 0 0',
              fontSize: '0.9rem',
              color: 'rgba(232,228,222,0.55)',
              maxWidth: 640,
              lineHeight: 1.55,
            }}
          >
            A Micro-Viacom autonomous engine—managed by a fleet of contract-coded agents. Registry is law; the bouncer
            is <code style={{ color: NEON, fontSize: '0.82em' }}>POST /api/agent</code>.
          </p>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              marginTop: '1.1rem',
              cursor: 'pointer',
              fontSize: '0.78rem',
              color: sandboxMode ? GOLD : 'rgba(232,228,222,0.45)',
              fontWeight: 600,
            }}
          >
            <input
              type="checkbox"
              checked={sandboxMode}
              onChange={(e) => setSandboxMode(e.target.checked)}
              style={{ width: 16, height: 16, accentColor: GOLD }}
            />
            Sandbox — Draft* tables only (vanguard: rook.harvest)
          </label>
        </header>

        {loadError ? (
          <p style={{ color: '#f87171', marginBottom: '1rem' }}>{loadError}</p>
        ) : null}

        {/* Tool grid */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.65rem' }}>
            <LayoutGrid size={16} color={VIOLET} />
            <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', color: VIOLET }}>
              REGISTRY MANIFEST
            </span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {tools.map((t) => {
              const active = selectedId === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedId(t.id)}
                  style={{
                    ...glassCard,
                    padding: '0.85rem 1rem',
                    textAlign: 'left' as const,
                    cursor: 'pointer',
                    outline: 'none',
                    border: active ? `1px solid ${NEON}` : `1px solid ${GLASS_BORDER}`,
                    boxShadow: active ? `0 0 0 1px ${NEON_DIM}, 0 8px 28px rgba(34,211,238,0.12)` : GLASS_SHADOW,
                  }}
                >
                  <div style={{ fontSize: '0.62rem', fontFamily: 'ui-monospace, monospace', color: NEON, marginBottom: 6 }}>
                    {t.id}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#f0ebe0', marginBottom: 8 }}>{t.name}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    <span
                      style={{
                        fontSize: '0.58rem',
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: 'rgba(167,139,250,0.2)',
                        color: VIOLET,
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Shield size={10} /> {t.authClass}
                    </span>
                    <span
                      style={{
                        fontSize: '0.58rem',
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: 'rgba(34,211,238,0.12)',
                        color: NEON,
                        fontWeight: 700,
                      }}
                    >
                      {intelligenceBand(t.modelTier)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(260px, 300px)',
            gap: '1.25rem',
            alignItems: 'start',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {selected ? (
              <StudioCommandForm
                tool={selected}
                sandboxMode={sandboxMode}
                onComplete={(ok, body) => {
                  setLastResult({ ok, body });
                  setPulseRefresh((n) => n + 1);
                }}
              />
            ) : (
              <div style={{ ...glassCard, padding: '1.5rem', color: 'rgba(232,228,222,0.45)' }}>
                Select a tool from the manifest grid.
              </div>
            )}
            {lastResult ? (
              <pre
                style={{
                  ...glassCard,
                  margin: 0,
                  padding: '1rem',
                  fontSize: '0.7rem',
                  overflow: 'auto',
                  maxHeight: 240,
                  border: `1px solid ${lastResult.ok ? GLASS_BORDER : 'rgba(248,113,113,0.4)'}`,
                  color: lastResult.ok ? '#d4d0c8' : '#fecaca',
                }}
              >
                {lastResult.body}
              </pre>
            ) : null}
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <IntelligenceRouterPanel />
            <TelemetryPanel />
            <div style={{ marginTop: '0.85rem' }}>
              <SovereignRegistryStream refreshToken={pulseRefresh} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
