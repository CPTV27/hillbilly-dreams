'use client';

import type { CSSProperties, MutableRefObject } from 'react';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import Link from 'next/link';
import { io } from 'socket.io-client';
import { AnimatePresence, motion } from 'framer-motion';
import type { SovereignEvent } from '@/lib/agent/eventProducer';
import {
  glassReducer,
  initialGlassState,
  type CitationCard,
  type GlassState,
  type LoreKind,
  type TraceListItem,
} from '@/lib/sovereign/glassReducer';
import { Activity, ChevronLeft, ChevronRight, Radio, Sparkles } from 'lucide-react';

const BG = '#050505';
const GLASS = 'rgba(255, 255, 255, 0.06)';
const BORDER = 'rgba(255, 255, 255, 0.1)';
const NEON = '#22d3ee';
const AMBER = '#f59e0b';

const EASE_FADE = [0.25, 0.8, 0.25, 1] as const;
const DURATION_RESOLVE = 0.52;
const DURATION_THINK = 0.48;

function isSovereignEvent(x: unknown): x is SovereignEvent {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return typeof o.type === 'string' && o.payload !== undefined && typeof o.payload === 'object';
}

function loreAccent(kind: LoreKind): { border: string; label: string } {
  switch (kind) {
    case 'manual':
      return { border: 'rgba(34, 211, 238, 0.45)', label: 'Equipment / Signal' };
    case 'sop':
      return { border: 'rgba(245, 158, 11, 0.5)', label: 'Operating procedure' };
    case 'journal':
      return { border: 'rgba(167, 139, 250, 0.45)', label: 'Institutional memory' };
    default:
      return { border: BORDER, label: 'Lore' };
  }
}

const mainAnswerStyle = (dimmed: boolean): CSSProperties => ({
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
  fontSize: 'clamp(1.2rem, 2vw, 1.85rem)',
  lineHeight: 1.45,
  maxWidth: '72ch',
  color: '#e8e4de',
  opacity: dimmed ? 0.22 : 1,
  filter: dimmed ? 'blur(1px)' : 'none',
  transform: dimmed ? 'scale(0.98)' : 'none',
  transition: `opacity ${DURATION_THINK}s cubic-bezier(${EASE_FADE.join(',')}), filter ${DURATION_THINK}s, transform ${DURATION_THINK}s`,
});

export function KioskGlassClient({ initialSessionId }: { initialSessionId: string }) {
  const [state, dispatch] = useReducer(glassReducer, initialGlassState);
  const traceEndRef = useRef<HTMLDivElement | null>(null);
  const [hubUrl, setHubUrl] = useState('');

  useEffect(() => {
    const u =
      (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SOVEREIGN_HUB_URL
        ? process.env.NEXT_PUBLIC_SOVEREIGN_HUB_URL.replace(/\/$/, '')
        : '') || (typeof window !== 'undefined' ? window.location.origin : '');
    setHubUrl(u);
  }, []);

  useEffect(() => {
    if (!hubUrl) return;

    const socket = io(hubUrl, {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 50,
      reconnectionDelay: 800,
    });

    const onConnect = () => {
      dispatch({ type: 'socket_status', connected: true });
      socket.emit('join_session', initialSessionId);
    };
    const onDisconnect = () => dispatch({ type: 'socket_status', connected: false });

    const onEvent = (raw: unknown) => {
      if (!isSovereignEvent(raw)) return;
      dispatch({ type: 'sovereign_event', event: raw });
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('sovereign_event', onEvent);

    if (socket.connected) onConnect();

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('sovereign_event', onEvent);
      socket.disconnect();
    };
  }, [hubUrl, initialSessionId]);

  const gridTemplateColumns = useCallback((s: GlassState) => {
    if (s.phase === 'idle' || s.phase === 'thinking') return '1fr';
    if (s.provenanceExpanded) return 'minmax(0, 25%) minmax(0, 75%)';
    return 'minmax(56px, 5%) minmax(0, 1fr)';
  }, []);

  const cols = gridTemplateColumns(state);
  const traceLen = state.phase === 'thinking' ? state.traceItems.length : 0;

  useEffect(() => {
    if (state.phase === 'thinking') {
      traceEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [state.phase, traceLen]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: BG,
        color: '#e8e4de',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px clamp(16px, 2vw, 28px)',
          borderBottom: `1px solid ${BORDER}`,
          background: 'rgba(0,0,0,0.35)',
        }}
      >
        <Sparkles size={20} color={NEON} aria-hidden />
        <span style={{ fontWeight: 600, letterSpacing: '0.04em', fontSize: '0.8rem' }}>GLASS KIOSK</span>
        <span style={{ opacity: 0.45, fontSize: '0.75rem' }}>Phase 2.4 · Adaptive Panel</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.72rem',
              opacity: 0.85,
              padding: '4px 10px',
              borderRadius: 999,
              border: `1px solid ${state.socketConnected ? 'rgba(34,211,238,0.35)' : 'rgba(248,113,113,0.35)'}`,
              background: state.socketConnected ? 'rgba(34,211,238,0.08)' : 'rgba(0,0,0,0.3)',
            }}
          >
            <Radio size={12} color={state.socketConnected ? NEON : '#f87171'} aria-hidden />
            {state.socketConnected ? 'Hub link' : 'Offline'}
          </span>
          <span style={{ fontSize: '0.7rem', opacity: 0.55, maxWidth: 280 }} title={hubUrl || 'resolving…'}>
            {hubUrl || '…'}
          </span>
          <Link
            href="/admin/studio"
            style={{ fontSize: '0.72rem', color: NEON, textDecoration: 'none', opacity: 0.85 }}
          >
            Studio
          </Link>
        </div>
      </header>

      <motion.div
        layout
        transition={{ duration: DURATION_RESOLVE, ease: EASE_FADE }}
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: cols,
          gap: state.phase === 'resolved' ? 'clamp(12px, 1.2vw, 20px)' : 0,
          padding: 'clamp(16px, 2vh, 28px)',
          minHeight: 0,
        }}
      >
        <AnimatePresence mode="sync">
          {state.phase === 'resolved' && (
            <motion.aside
              key="rail"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: DURATION_RESOLVE, ease: EASE_FADE }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                borderRadius: 14,
                border: `1px solid ${BORDER}`,
                background: GLASS,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                overflow: 'hidden',
              }}
            >
              <ResolvedRail
                state={state}
                onToggle={() => dispatch({ type: 'toggle_provenance' })}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        <motion.main
          layout
          transition={{ duration: DURATION_RESOLVE, ease: EASE_FADE }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: state.phase === 'idle' ? 'center' : 'flex-start',
            minHeight: 0,
            position: 'relative',
            padding: state.phase === 'idle' ? '2rem' : '0.5rem 0',
          }}
        >
          {state.phase === 'idle' && (
            <div style={mainAnswerStyle(false)}>
              <p style={{ margin: 0 }}>{state.lastAnswer}</p>
              <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', opacity: 0.5 }}>
                Session <code style={{ color: NEON }}>{initialSessionId}</code> · Set{' '}
                <code style={{ color: NEON }}>NEXT_PUBLIC_SOVEREIGN_HUB_URL</code> to your 32GB host Tailscale
                address (e.g. <code>http://100.x.x.x:3000</code>).
              </p>
            </div>
          )}

          {state.phase === 'thinking' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12 }}>
              <div style={{ flex: '0 0 auto' }}>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, marginBottom: 8 }}>
                  Answer preview
                </div>
                <div style={mainAnswerStyle(true)}>
                  {state.messageBuffer || <span style={{ opacity: 0.35 }}>…</span>}
                </div>
              </div>
            </div>
          )}

          {state.phase === 'resolved' && (
            <motion.div
              initial={{ opacity: 0.35 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATION_RESOLVE, ease: EASE_FADE }}
              style={mainAnswerStyle(false)}
            >
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, marginBottom: 12 }}>
                Final
              </div>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{state.finalAnswer}</p>
              <button
                type="button"
                onClick={() => dispatch({ type: 'reset_idle' })}
                style={{
                  marginTop: '1.5rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 10,
                  border: `1px solid ${BORDER}`,
                  background: 'rgba(255,255,255,0.06)',
                  color: '#e8e4de',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                }}
              >
                Hold screen (idle)
              </button>
            </motion.div>
          )}
        </motion.main>
      </motion.div>

      {state.phase === 'thinking' && (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION_THINK, ease: EASE_FADE }}
          style={{
            position: 'fixed',
            right: 'clamp(16px, 2vw, 28px)',
            top: 72,
            width: state.mode === 'enterprise' ? '65vw' : 'min(48vw, 560px)',
            maxWidth: state.mode === 'enterprise' ? 960 : 560,
            minWidth: 320,
            bottom: 24,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <div
            style={{
              pointerEvents: 'auto',
              height: '100%',
              borderRadius: 16,
              border: `1px solid rgba(34, 211, 238, 0.25)`,
              background: 'rgba(5, 5, 5, 0.82)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '10px 14px',
                borderBottom: `1px solid ${BORDER}`,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: NEON,
              }}
            >
              <Activity size={14} aria-hidden />
              Cognition stream
            </div>
            <ThinkingRail state={state} traceEndRef={traceEndRef} hero />
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ThinkingRail({
  state,
  traceEndRef,
  hero,
}: {
  state: Extract<GlassState, { phase: 'thinking' }>;
  traceEndRef: MutableRefObject<HTMLDivElement | null>;
  hero?: boolean;
}) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: hero ? 0 : 200,
        overflowY: 'auto',
        padding: hero ? '12px 14px 20px' : '12px',
        fontFamily: 'var(--font-body, ui-monospace, monospace)',
        fontSize: hero ? '0.82rem' : '0.75rem',
      }}
    >
      {state.traceItems.length === 0 ? (
        <p style={{ opacity: 0.45, margin: 0 }}>Waiting for reasoning.delta…</p>
      ) : (
        state.traceItems.map((item) => <TraceRow key={item.id} item={item} />)
      )}
      <div ref={traceEndRef} />
    </div>
  );
}

function TraceRow({ item }: { item: TraceListItem }) {
  if (item.kind === 'reasoning') {
    return (
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 0.88, y: 0 }}
        transition={{ duration: 0.12 }}
        style={{ margin: '0 0 0.65rem', color: '#cbd5e1', whiteSpace: 'pre-wrap' }}
      >
        {item.text}
      </motion.p>
    );
  }
  if (item.kind === 'tool_start') {
    return (
      <div
        style={{
          margin: '0.5rem 0',
          padding: '6px 8px',
          borderRadius: 8,
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${BORDER}`,
          fontSize: '0.72rem',
          opacity: 0.72,
        }}
      >
        <strong style={{ color: AMBER }}>TOOL</strong> {item.tool}
        {item.tool === 'lore_query' && item.params.namespace != null ? (
          <span style={{ opacity: 0.8 }}> · {String(item.params.namespace)}</span>
        ) : null}
      </div>
    );
  }
  if (item.kind === 'tool_end') {
    return (
      <div style={{ margin: '0.35rem 0 0.75rem', fontSize: '0.7rem', opacity: item.ok ? 0.65 : 0.9, color: item.ok ? '#94a3b8' : '#fcd34d' }}>
        {item.ok ? '✓' : '!'} {item.tool} — {item.summary}
      </div>
    );
  }
  const acc = loreAccent(item.loreKind);
  return (
    <motion.div
      initial={{ scale: 1.02, opacity: 0.6 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        margin: '0.65rem 0',
        padding: '10px 12px',
        borderRadius: 10,
        border: `1px solid ${acc.border}`,
        background: 'rgba(0,0,0,0.35)',
      }}
    >
      <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: NEON, marginBottom: 6 }}>
        {acc.label} · {(item.confidence * 100).toFixed(0)}% match
      </div>
      <div style={{ fontSize: '0.72rem', opacity: 0.75, marginBottom: 6 }}>{item.source}</div>
      <div style={{ fontSize: '0.78rem', lineHeight: 1.4, whiteSpace: 'pre-wrap' }}>{item.snippet}</div>
    </motion.div>
  );
}

function ResolvedRail({
  state,
  onToggle,
}: {
  state: Extract<GlassState, { phase: 'resolved' }>;
  onToggle: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          padding: '10px 8px',
          border: 'none',
          borderBottom: `1px solid ${BORDER}`,
          background: 'rgba(255,255,255,0.04)',
          color: '#e8e4de',
          cursor: 'pointer',
          fontSize: '0.7rem',
        }}
      >
        {state.provenanceExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        {state.provenanceExpanded ? 'Sovereign Provenance' : 'Sources'}
      </button>
      {state.provenanceExpanded ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          <div style={{ fontSize: '0.65rem', opacity: 0.5, marginBottom: 10 }}>Trace</div>
          {state.traceItems.slice(-24).map((item) => (
            <TraceRow key={item.id} item={item} />
          ))}
          <div style={{ fontSize: '0.65rem', opacity: 0.5, margin: '16px 0 8px' }}>Source cards</div>
          {state.citations.map((c) => (
            <CitationCardRow key={c.id} card={c} />
          ))}
        </div>
      ) : (
        <div style={{ padding: 8, fontSize: '0.7rem', opacity: 0.55, writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          {state.citations.length} sources
        </div>
      )}
    </>
  );
}

function CitationCardRow({ card }: { card: CitationCard }) {
  const acc = loreAccent(card.loreKind);
  return (
    <div
      style={{
        marginBottom: 10,
        padding: '10px 12px',
        borderRadius: 10,
        border: `1px solid ${acc.border}`,
        background: 'rgba(0,0,0,0.25)',
        fontSize: '0.78rem',
      }}
    >
      <div style={{ fontSize: '0.62rem', color: NEON, marginBottom: 4 }}>{acc.label}</div>
      <div style={{ opacity: 0.75, marginBottom: 6 }}>{card.source}</div>
      <div style={{ lineHeight: 1.4, whiteSpace: 'pre-wrap' }}>{card.snippet}</div>
    </div>
  );
}
