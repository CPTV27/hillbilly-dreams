'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'delta-dawn-chat-v1';

// Matches [[TASK:some-task-id]] — inline signal from Delta Dawn telling the
// host page to highlight a specific onboarding task. Markers are stripped
// from the displayed text before the user sees them.
const TASK_MARKER_RE = /\[\[TASK:([a-z0-9-]+)\]\]/g;

interface Message {
  role: 'user' | 'dawn';
  text: string;
  page?: string;
}

interface DeltaDawnWidgetProps {
  /** Optional mode passed to /api/dawn/chat. When set, the system prompt
   * gets extended with mode-specific context (e.g. Amy's or Tracy's
   * onboarding progress). */
  mode?: 'amy-onboarding' | 'tracy-onboarding';
  /** Called when Delta Dawn emits a [[TASK:...]] marker. The host page
   * uses this to advance the checklist UI. Fires once per unique marker
   * per stream. */
  onMarker?: (taskId: string) => void;
  /** When true, auto-open the widget on mount. Used by the onboarding page. */
  autoOpen?: boolean;
}

function trimHistoryForApi(messages: Message[]): Message[] {
  const idx = messages.findIndex((m) => m.role === 'user');
  return idx === -1 ? [] : messages.slice(idx);
}

/** Strip all [[TASK:...]] markers from a string. */
function stripMarkers(text: string): string {
  return text.replace(TASK_MARKER_RE, '').replace(/\n{3,}/g, '\n\n');
}

/** Extract unique task ids from the [[TASK:...]] markers in a string. */
function extractMarkers(text: string): string[] {
  const ids = new Set<string>();
  let match: RegExpExecArray | null;
  TASK_MARKER_RE.lastIndex = 0;
  while ((match = TASK_MARKER_RE.exec(text)) !== null) {
    if (match[1]) ids.add(match[1]);
  }
  return Array.from(ids);
}

export default function DeltaDawnWidget({
  mode,
  onMarker,
  autoOpen = false,
}: DeltaDawnWidgetProps = {}) {
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'dawn', text: "I'm here. Ask me anything or leave a note. I follow you on every page.", page: '/' },
  ]);
  const [hydrated, setHydrated] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* quota / private mode */
    }
  }, [messages, hydrated]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming]);

  // External open trigger — listens for "delta-dawn:open" window events so
  // other pages (e.g. /dawn) can bring the widget to the foreground without
  // re-implementing the chat UI. Fully backward compatible — nothing else
  // dispatches this event yet.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = () => setOpen(true);
    window.addEventListener('delta-dawn:open', handler);
    return () => window.removeEventListener('delta-dawn:open', handler);
  }, []);

  // Auto-open when the user lands on /dawn — that page is now a branded
  // landing for the widget, not its own chat UI. Also honor the explicit
  // autoOpen prop used by the onboarding page.
  useEffect(() => {
    if (pathname === '/dawn' || autoOpen) {
      setOpen(true);
    }
  }, [pathname, autoOpen]);

  const send = useCallback(async () => {
    if (!input.trim() || streaming) return;
    const page = pathname || (typeof window !== 'undefined' ? window.location.pathname : '') || '/';
    const userMsg: Message = { role: 'user', text: input.trim(), page };
    setLastError(null);
    setInput('');

    const historyForApi = trimHistoryForApi([...messages, userMsg]);
    setMessages((prev) => [...prev, userMsg, { role: 'dawn', text: '', page }]);
    setStreaming(true);

    // Tracks the full dawn-side stream text (including markers) so we can
    // parse [[TASK:...]] markers and strip them from the displayed text on
    // each chunk. Markers may arrive split across chunks, so we always
    // process the accumulated buffer rather than each delta in isolation.
    let fullDawnText = '';
    const seenMarkers = new Set<string>();

    try {
      const res = await fetch('/api/dawn/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: 'hdi-owner',
          mode,
          messages: historyForApi.map((m) => ({
            role: m.role,
            content: m.text,
            page: m.page,
          })),
        }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => '');
        throw new Error(errText || `Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let streamError: string | null = null;

      const applyDelta = (delta: string) => {
        fullDawnText += delta;

        // Scan for any newly-complete markers and emit them once each.
        const markers = extractMarkers(fullDawnText);
        for (const id of markers) {
          if (!seenMarkers.has(id)) {
            seenMarkers.add(id);
            try {
              onMarker?.(id);
            } catch {
              /* host handler errors must not break the stream */
            }
          }
        }

        // Display with all markers stripped. Incomplete [[TASK:... fragments
        // at the tail are kept as-is and will be cleaned up when the rest
        // arrives, or stripped by the final setMessages below.
        const display = stripMarkers(fullDawnText);

        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.role === 'dawn') {
            next[next.length - 1] = { ...last, text: display, page: last.page || page };
          }
          return next;
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');
        buffer = parts.pop() ?? '';
        for (const block of parts) {
          const line = block.trim();
          if (!line.startsWith('data:')) continue;
          const payload = line.slice(5).trim();
          if (payload === '[DONE]') continue;
          try {
            const j = JSON.parse(payload) as { text?: string; error?: string };
            if (j.error) streamError = j.error;
            if (j.text) applyDelta(j.text);
          } catch {
            /* ignore malformed chunk */
          }
        }
      }

      // Final pass: if any half-open marker got left in the tail, clean it
      // out by re-rendering with strip() (already handled above, but this
      // covers the edge case where the stream ended mid-marker).
      if (fullDawnText) {
        const display = stripMarkers(fullDawnText);
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.role === 'dawn') {
            next[next.length - 1] = { ...last, text: display, page: last.page || page };
          }
          return next;
        });
      }

      if (streamError) setLastError(streamError);

      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === 'dawn' && !last.text.trim()) {
          next[next.length - 1] = {
            ...last,
            text:
              streamError ||
              'No reply received. Set GEMINI_API_KEY or XAI_API_KEY and try again.',
            page,
          };
        }
        return next;
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Request failed';
      setLastError(msg);
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === 'dawn' && !last.text) {
          next[next.length - 1] = { ...last, text: msg, page };
        }
        return next;
      });
    } finally {
      setStreaming(false);
    }
  }, [input, messages, streaming, pathname, mode, onMarker]);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#c8943e',
            color: '#0a0a08',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            fontWeight: 800,
            boxShadow: '0 4px 20px rgba(200,148,62,0.4)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label="Open Delta Dawn"
        >
          DD
        </button>
      )}

      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            width: '360px',
            maxWidth: 'calc(100vw - 2rem)',
            height: '480px',
            maxHeight: 'calc(100vh - 3rem)',
            background: '#0f0f0d',
            border: '1px solid rgba(200,148,62,0.3)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
            zIndex: 9999,
            fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)',
          }}
        >
          <div
            style={{
              padding: '0.75rem 1rem',
              borderBottom: '1px solid rgba(200,148,62,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: streaming ? '#c8943e' : '#4a7c59',
                  animation: streaming ? 'ddPulse 1s infinite' : 'ddPulse 2s infinite',
                }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c8943e' }}>Delta Dawn</span>
              <span style={{ fontSize: '0.65rem', color: '#6b635a' }}>{pathname || '—'}</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#6b635a',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '0.25rem',
              }}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: msg.role === 'user' ? 'rgba(200,148,62,0.15)' : '#1a1816',
                  color: '#e8e0d4',
                  fontSize: '0.8rem',
                  lineHeight: 1.5,
                }}
              >
                {msg.text || (msg.role === 'dawn' && streaming ? '…' : '')}
                {msg.page !== undefined && msg.page !== '' && (
                  <div style={{ fontSize: '0.6rem', color: '#4a4440', marginTop: '0.25rem' }}>
                    Page: {msg.page}
                  </div>
                )}
              </div>
            ))}
            {lastError && (
              <div style={{ fontSize: '0.65rem', color: '#b85c5c', padding: '0 0.25rem' }}>{lastError}</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div
            style={{
              padding: '0.5rem 0.75rem',
              borderTop: '1px solid rgba(200,148,62,0.15)',
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && void send()}
              placeholder="Ask or leave a note..."
              disabled={streaming}
              style={{
                flex: 1,
                background: '#1a1816',
                border: '1px solid rgba(200,148,62,0.2)',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                color: '#e8e0d4',
                fontSize: '0.8rem',
                outline: 'none',
                fontFamily: 'inherit',
                opacity: streaming ? 0.7 : 1,
              }}
            />
            <button
              onClick={() => void send()}
              disabled={streaming || !input.trim()}
              style={{
                background: '#c8943e',
                color: '#0a0a08',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: streaming ? 'wait' : 'pointer',
                opacity: streaming || !input.trim() ? 0.5 : 1,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ddPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
