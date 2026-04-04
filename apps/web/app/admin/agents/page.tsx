'use client';

import type { CSSProperties } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

type RegistryTool = {
  id: string;
  name: string;
  description: string;
  authClass: string;
  modelTier?: string;
  inputJsonSchema: Record<string, unknown>;
};

type AgentActionRow = {
  id: number;
  agent: string;
  action: string;
  summary: string;
  domain: string;
  impact: string | null;
  createdAt: string;
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

function AgentToolForm({
  tool,
  onResult,
}: {
  tool: RegistryTool;
  onResult: (text: string, ok: boolean) => void;
}) {
  const { properties, required } = useMemo(() => schemaProps(tool.inputJsonSchema), [tool.inputJsonSchema]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);

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
        try {
          out[key] = JSON.parse(raw) as unknown;
        } catch {
          throw new Error(`Invalid JSON for "${key}"`);
        }
        continue;
      }
      if (raw !== '') out[key] = raw;
    }
    return out;
  };

  const run = async () => {
    setRunning(true);
    onResult('', true);
    try {
      const params = buildParams();
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: tool.id,
          params,
          includeTelemetry: true,
          traceId: `ui-${Date.now()}`,
        }),
      });
      const data = await res.json();
      const ok = res.ok;
      onResult(JSON.stringify(data, null, 2), ok);
    } catch (e) {
      onResult(e instanceof Error ? e.message : String(e), false);
    } finally {
      setRunning(false);
    }
  };

  const keys = Object.keys(properties);

  return (
    <div
      style={{
        background: 'var(--admin-card-bg, #1a1816)',
        border: '1px solid var(--admin-border, #2a2725)',
        borderRadius: 12,
        padding: '1.25rem',
        fontFamily: 'var(--font-body, DM Sans, system-ui, sans-serif)',
      }}
    >
      <p style={{ margin: '0 0 1rem', fontSize: '0.8125rem', color: 'var(--admin-muted, #8a8074)', lineHeight: 1.5 }}>
        {tool.description}
      </p>
      {keys.length === 0 ? (
        <p style={{ color: 'var(--admin-muted, #8a8074)', fontSize: '0.875rem' }}>No parameters — executes with empty object.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {keys.map((key) => {
            const prop = properties[key];
            const types = Array.isArray(prop.type) ? prop.type : prop.type ? [prop.type] : ['string'];
            const isObj = types.includes('object');
            const isBool = types.includes('boolean');
            const label = `${key}${required.includes(key) ? ' *' : ''}`;
            return (
              <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.75rem', color: 'var(--admin-muted, #8a8074)' }}>
                <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{label}</span>
                {isBool ? (
                  <select
                    value={values[key] || ''}
                    onChange={(e) => setField(key, e.target.value)}
                    style={inputStyle}
                  >
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
                  <input
                    type="number"
                    value={values[key] || ''}
                    onChange={(e) => setField(key, e.target.value)}
                    style={inputStyle}
                  />
                ) : (
                  <input
                    type="text"
                    value={values[key] || ''}
                    onChange={(e) => setField(key, e.target.value)}
                    style={inputStyle}
                  />
                )}
                {prop.description ? (
                  <span style={{ fontSize: '0.65rem', opacity: 0.85 }}>{prop.description}</span>
                ) : null}
              </label>
            );
          })}
        </div>
      )}
      <button
        type="button"
        onClick={() => void run()}
        disabled={running}
        style={{
          marginTop: '1.25rem',
          padding: '0.6rem 1.25rem',
          borderRadius: 8,
          border: '1px solid var(--admin-accent, #c8943e)',
          background: running ? '#3a3428' : 'var(--admin-accent, #c8943e)',
          color: running ? '#8a8074' : '#0f0f0f',
          fontWeight: 700,
          cursor: running ? 'wait' : 'pointer',
          fontSize: '0.875rem',
        }}
      >
        {running ? 'Executing…' : 'Execute via POST /api/agent'}
      </button>
    </div>
  );
}

const inputStyle: CSSProperties = {
  padding: '0.5rem 0.65rem',
  borderRadius: 8,
  border: '1px solid #2a2725',
  background: '#0f0e0c',
  color: '#e8e4de',
  fontSize: '0.875rem',
};

export default function AdminAgentsCommandPlane() {
  const [tools, setTools] = useState<RegistryTool[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [actions, setActions] = useState<AgentActionRow[]>([]);
  const [resultText, setResultText] = useState('');
  const [resultOk, setResultOk] = useState(true);

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

  const pollActions = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/agent-actions?limit=30');
      if (!res.ok) return;
      const data = (await res.json()) as { actions: AgentActionRow[] };
      setActions(data.actions || []);
    } catch {
      /* ignore poll errors */
    }
  }, []);

  useEffect(() => {
    void loadRegistry();
  }, [loadRegistry]);

  useEffect(() => {
    void pollActions();
    const t = setInterval(() => void pollActions(), 5000);
    return () => clearInterval(t);
  }, [pollActions]);

  const onResult = (text: string, ok: boolean) => {
    setResultText(text);
    setResultOk(ok);
    void pollActions();
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '1.5rem',
        fontFamily: 'var(--font-body, DM Sans, system-ui, sans-serif)',
        color: 'var(--admin-fg, #e8e4de)',
      }}
    >
      <header style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--admin-border, #2a2725)', paddingBottom: '1rem' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--admin-accent, #c8943e)', margin: 0 }}>
          PHASE 1.7 — COMMAND PLANE
        </p>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.35rem 0 0' }}>Agent registry</h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--admin-muted, #8a8074)', margin: '0.5rem 0 0', maxWidth: 640 }}>
          Contract-coded tools only. Execute against <code style={{ fontSize: '0.8em' }}>POST /api/agent</code> — no shadow REST.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: '1.5rem', alignItems: 'start' }}>
        <aside>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--admin-accent, #c8943e)', marginBottom: '0.5rem' }}>
            TOOLS
          </div>
          {loadError ? (
            <p style={{ color: '#f87171', fontSize: '0.875rem' }}>{loadError}</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {tools.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(t.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.55rem 0.75rem',
                      borderRadius: 8,
                      border: selectedId === t.id ? '1px solid var(--admin-accent, #c8943e)' : '1px solid #2a2725',
                      background: selectedId === t.id ? '#2a2418' : '#141210',
                      color: '#e8e4de',
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                    }}
                  >
                    <div style={{ fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: '0.65rem', color: '#8a8074', marginTop: 2 }}>{t.id}</div>
                    {t.modelTier ? (
                      <div style={{ fontSize: '0.6rem', color: '#c8943e', marginTop: 4 }}>{t.modelTier}</div>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <main style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {selected ? (
            <>
              <div>
                <h2 style={{ fontSize: '1.125rem', margin: '0 0 0.25rem' }}>{selected.name}</h2>
                <code style={{ fontSize: '0.75rem', color: '#8a8074' }}>{selected.id}</code>
              </div>
              <AgentToolForm tool={selected} onResult={onResult} />
              {resultText ? (
                <pre
                  style={{
                    margin: 0,
                    padding: '1rem',
                    borderRadius: 8,
                    background: '#0f0e0c',
                    border: `1px solid ${resultOk ? '#2a2725' : '#7f1d1d'}`,
                    color: resultOk ? '#d4d0c8' : '#fecaca',
                    fontSize: '0.75rem',
                    overflow: 'auto',
                    maxHeight: 360,
                  }}
                >
                  {resultText}
                </pre>
              ) : null}
            </>
          ) : (
            <p style={{ color: '#8a8074' }}>Select a tool from the list.</p>
          )}

          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--admin-accent, #c8943e)' }}>
                LIVE ACTION FEED
              </span>
              <button
                type="button"
                onClick={() => void pollActions()}
                style={{
                  fontSize: '0.7rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 6,
                  border: '1px solid #2a2725',
                  background: 'transparent',
                  color: '#8a8074',
                  cursor: 'pointer',
                }}
              >
                Refresh
              </button>
            </div>
            <div
              style={{
                border: '1px solid var(--admin-border, #2a2725)',
                borderRadius: 12,
                overflow: 'hidden',
                maxHeight: 320,
                overflowY: 'auto',
                background: '#141210',
              }}
            >
              {actions.length === 0 ? (
                <p style={{ padding: '1rem', color: '#8a8074', fontSize: '0.875rem', margin: 0 }}>No actions yet.</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                  <thead>
                    <tr style={{ background: '#1a1816', textAlign: 'left', color: '#8a8074' }}>
                      <th style={{ padding: '0.5rem 0.75rem' }}>When</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>Agent</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>Action</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>Summary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actions.map((a) => (
                      <tr key={a.id} style={{ borderTop: '1px solid #1f1d1a' }}>
                        <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', color: '#9a9490' }}>
                          {new Date(a.createdAt).toLocaleString()}
                        </td>
                        <td style={{ padding: '0.45rem 0.75rem' }}>{a.agent}</td>
                        <td style={{ padding: '0.45rem 0.75rem', color: '#c8943e' }}>{a.action}</td>
                        <td style={{ padding: '0.45rem 0.75rem', maxWidth: 360, overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.summary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
