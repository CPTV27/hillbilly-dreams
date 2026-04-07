'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'delta-dawn-chat-v1';

interface Message {
  role: 'user' | 'dawn';
  text: string;
  page?: string;
}

function trimHistoryForApi(messages: Message[]): Message[] {
  const idx = messages.findIndex((m) => m.role === 'user');
  return idx === -1 ? [] : messages.slice(idx);
}

export default function DeltaDawnWidget() {
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

  const send = useCallback(async () => {
    if (!input.trim() || streaming) return;
    const page = pathname || (typeof window !== 'undefined' ? window.location.pathname : '') || '/';
    const userMsg: Message = { role: 'user', text: input.trim(), page };
    setLastError(null);
    setInput('');

    const historyForApi = trimHistoryForApi([...messages, userMsg]);
    setMessages((prev) => [...prev, userMsg, { role: 'dawn', text: '', page }]);
    setStreaming(true);

    try {
      const res = await fetch('/api/dawn/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: 'hdi-owner',
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

      const appendDelta = (delta: string) => {
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.role === 'dawn') {
            next[next.length - 1] = { ...last, text: last.text + delta, page: last.page || page };
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
            if (j.text) appendDelta(j.text);
          } catch {
            /* ignore malformed chunk */
          }
        }
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
  }, [input, messages, streaming, pathname]);

  return (
    <>
      {!open && (
        <button
          type="button"
          className="dd-dawn-fab"
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed',
            bottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))',
            right: 'max(1.25rem, env(safe-area-inset-right, 0px))',
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
            touchAction: 'manipulation',
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
          className="dd-dawn-panel"
          style={{
            position: 'fixed',
            bottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
            right: 'max(1rem, env(safe-area-inset-right, 0px))',
            left: 'auto',
            width: '360px',
            maxWidth: 'calc(100vw - 2rem - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px))',
            height: 'min(480px, calc(100dvh - 2rem - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px)))',
            maxHeight: 'calc(100dvh - 2rem - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))',
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
              type="button"
              className="dd-dawn-close"
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#6b635a',
                cursor: 'pointer',
                fontSize: '1.35rem',
                lineHeight: 1,
                padding: '0.5rem',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'manipulation',
              }}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div
            className="dd-dawn-messages"
            style={{
              flex: 1,
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className="dd-dawn-msg"
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
            className="dd-dawn-inputrow"
            style={{
              padding: '0.5rem 0.75rem',
              paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))',
              borderTop: '1px solid rgba(200,148,62,0.15)',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <input
              className="dd-dawn-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && void send()}
              placeholder="Ask or leave a note..."
              disabled={streaming}
              enterKeyHint="send"
              autoComplete="off"
              autoCorrect="on"
              style={{
                flex: 1,
                minWidth: 0,
                background: '#1a1816',
                border: '1px solid rgba(200,148,62,0.2)',
                borderRadius: '8px',
                padding: '0.65rem 0.75rem',
                color: '#e8e0d4',
                fontSize: '16px',
                outline: 'none',
                fontFamily: 'inherit',
                opacity: streaming ? 0.7 : 1,
              }}
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={streaming || !input.trim()}
              style={{
                background: '#c8943e',
                color: '#0a0a08',
                border: 'none',
                borderRadius: '8px',
                padding: '0.65rem 0.85rem',
                fontWeight: 700,
                fontSize: '16px',
                minHeight: '44px',
                cursor: streaming ? 'wait' : 'pointer',
                opacity: streaming || !input.trim() ? 0.5 : 1,
                flexShrink: 0,
                touchAction: 'manipulation',
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
        /* Phone: near-full-width panel, no iOS zoom on focus (16px+ on .dd-dawn-input) */
        @media (max-width: 480px) {
          .dd-dawn-panel {
            left: max(0.75rem, env(safe-area-inset-left, 0px)) !important;
            right: max(0.75rem, env(safe-area-inset-right, 0px)) !important;
            width: auto !important;
            max-width: none !important;
            height: min(560px, calc(100dvh - 1.5rem - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))) !important;
            max-height: calc(100dvh - 1.5rem - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px)) !important;
            border-radius: 14px !important;
          }
          .dd-dawn-msg {
            font-size: 0.9375rem !important;
            max-width: 92% !important;
          }
        }
      `}</style>
    </>
  );
}
