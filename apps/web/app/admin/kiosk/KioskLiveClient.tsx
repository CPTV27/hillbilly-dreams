'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import type { SovereignEvent, SovereignPulse } from '@/lib/agent/eventProducer';

function hubOrigin(): string {
  if (typeof window === 'undefined') return '';
  return (process.env.NEXT_PUBLIC_SOVEREIGN_HUB_URL || window.location.origin).replace(/\/$/, '');
}

function pushCapped(prev: string[], line: string, max: number): string[] {
  const next = [...prev, line];
  return next.slice(-max);
}

type Props = {
  initialCredits: number;
  userId: string;
  sessionId: string;
};

const S = {
  shell: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'minmax(240px, 25vw) 1fr',
    gridTemplateRows: 'auto 1fr',
    gridTemplateAreas: `
      "credit credit"
      "rail trace"
    `,
    background: 'var(--kiosk-bg, #0a0a0f)',
    color: 'var(--kiosk-fg, #e2e8f0)',
    fontFamily: 'var(--font-body, system-ui, sans-serif)',
  } as const,
  credit: {
    gridArea: 'credit',
    padding: '1rem 1.25rem',
    borderBottom: '1px solid var(--kiosk-border, #1e293b)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    background: 'var(--kiosk-credit-bg, #0f172a)',
  } as const,
  rail: {
    gridArea: 'rail',
    borderRight: '1px solid var(--kiosk-border, #1e293b)',
    padding: '1rem',
    overflow: 'auto',
    background: 'var(--kiosk-rail-bg, #020617)',
  } as const,
  trace: {
    gridArea: 'trace',
    padding: '1.25rem',
    overflow: 'auto',
    position: 'relative',
  } as const,
  label: {
    fontSize: '0.65rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--kiosk-muted, #64748b)',
    marginBottom: '0.5rem',
  },
  neon: { color: 'var(--kiosk-accent, #38bdf8)' },
};

export default function KioskLiveClient({ initialCredits, userId, sessionId }: Props) {
  const [credits, setCredits] = useState(initialCredits);
  const [connected, setConnected] = useState(false);
  const [traceLines, setTraceLines] = useState<string[]>([
    'Waiting for Sovereign Hub… Run `pnpm dev` (root) to attach Socket.io.',
  ]);
  const [provenance, setProvenance] = useState<string[]>([]);

  const onEvent = useCallback((e: SovereignEvent) => {
    switch (e.type) {
      case 'session.init':
        setTraceLines((p) => pushCapped(p, `Session · ${e.payload.mode} · ${e.payload.sessionId.slice(0, 8)}…`, 120));
        break;
      case 'reasoning.delta':
        setTraceLines((p) => pushCapped(p, e.payload.text, 120));
        break;
      case 'tool.call.start':
        setTraceLines((p) => pushCapped(p, `→ ${e.payload.tool}`, 120));
        break;
      case 'tool.call.end':
        setTraceLines((p) => pushCapped(p, `← ${e.payload.tool} ${e.payload.ok ? 'ok' : 'fail'} · ${e.payload.summary}`, 120));
        break;
      case 'lore.citation':
        setProvenance((p) =>
          pushCapped(
            p,
            `${e.payload.source} · ${e.payload.snippet.slice(0, 140)}… (${Math.round(e.payload.confidence * 100)}%)`,
            40
          )
        );
        break;
      case 'message.delta':
        setTraceLines((p) => pushCapped(p, e.payload.text, 120));
        break;
      case 'message.final':
        setTraceLines((p) => pushCapped(p, `[final] ${e.payload.text}`, 120));
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    const origin = hubOrigin();
    if (!origin) return;
    const socket = io(origin, { transports: ['websocket', 'polling'] });
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.emit('join_session', sessionId);
    socket.on('sovereign_event', onEvent);
    socket.on('sovereign_pulse', (p: SovereignPulse) => {
      if (p.kind === 'credit' && userId && p.userId === userId) {
        setCredits(p.balanceAfter);
      }
      if (p.kind === 'credit') {
        setTraceLines((prev) =>
          pushCapped(prev, `PULSE · credits ${p.change >= 0 ? '+' : ''}${p.change} → ${p.balanceAfter} (${p.reason})`, 120)
        );
      }
      if (p.kind === 'submission') {
        setTraceLines((prev) => pushCapped(prev, `PULSE · submission ${p.submissionId.slice(0, 8)}…`, 120));
      }
    });
    return () => {
      socket.emit('leave_session', sessionId);
      socket.off('sovereign_event', onEvent);
      socket.disconnect();
    };
  }, [onEvent, sessionId, userId]);

  return (
    <main style={S.shell}>
      <header style={S.credit}>
        <div>
          <div style={S.label}>Credit balance</div>
          <motion.div
            key={credits}
            initial={{ opacity: 0.4, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '1.5rem', fontWeight: 700 }}
          >
            <span style={S.neon}>{credits}</span>
            <span style={{ marginLeft: '0.35rem', fontSize: '0.85rem', fontWeight: 500 }}>credits</span>
          </motion.div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={S.label}>Hub</div>
          <div style={{ fontSize: '1rem', fontWeight: 600 }}>
            {connected ? <span style={S.neon}>Pulse linked</span> : 'Offline — start hub'}
          </div>
        </div>
      </header>

      <aside style={S.rail}>
        <div style={S.label}>Provenance rail</div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          <AnimatePresence initial={false}>
            {provenance.length === 0 ? (
              <li style={{ color: 'var(--kiosk-muted, #64748b)', fontSize: '0.9rem' }}>Lore citations appear here.</li>
            ) : (
              provenance.map((line, i) => (
                <motion.li
                  key={`${i}-${line.slice(0, 24)}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    marginBottom: '0.65rem',
                    padding: '0.5rem 0.6rem',
                    borderRadius: '6px',
                    background: 'rgba(56,189,248,0.06)',
                    border: '1px solid rgba(148,163,184,0.2)',
                    fontSize: '0.82rem',
                    lineHeight: 1.45,
                  }}
                >
                  {line}
                </motion.li>
              ))
            )}
          </AnimatePresence>
        </ul>
      </aside>

      <section style={S.trace}>
        <div style={S.label}>Cognitive trace</div>
        <div
          style={{
            minHeight: 'min(65vh, 520px)',
            borderRadius: '8px',
            border: '1px solid var(--kiosk-border, #334155)',
            background: 'linear-gradient(180deg, rgba(56,189,248,0.06), transparent)',
            padding: '0.75rem 1rem',
            overflow: 'auto',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '0.82rem',
            lineHeight: 1.5,
          }}
        >
          <AnimatePresence initial={false}>
            {traceLines.map((line, i) => (
              <motion.div
                key={`${i}-${line.slice(0, 32)}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '0.35rem', color: '#cbd5e1' }}
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
