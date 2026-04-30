// apps/web/app/chat/page.tsx
//
// Big Muddy assistant — chat UI
//
// Iteration 2 (Chase 2026-04-30): added the ROUTER UI layer.
//
// Each user turn can now produce three things:
//   - the main assistant reply (streamed text deltas as before)
//   - one or more *specialist* responses, each rendered as its own card
//     with a badge ("✦ Patch · Engineering") and a left-edge accent border
//   - an *escalation* callout when create_task fires (unchanged from MVP)
//
// The shape of the SSE stream from POST /api/chat (see route.ts):
//   { type: 'text', delta }                        — main chat text
//   { type: 'tool', name: 'which_specialist', payload }
//   { type: 'tool', name: 'route_to_specialist', payload }
//   { type: 'tool', name: 'create_task', payload }  — same as MVP
//   { type: 'specialist', phase: 'start', specialist: {id,name,...} }
//   { type: 'specialist', phase: 'delta', specialistId, delta }
//   { type: 'specialist', phase: 'end', specialistId }
//   { type: 'specialist', phase: 'error', specialistId, error }
//   { type: 'error', message }
//   { type: 'done' }

'use client';

import { useEffect, useRef, useState } from 'react';

type Role = 'user' | 'assistant';

type EscalationPayload =
  | { ok: true; taskGid: string; taskUrl: string; assigneeLabel: string }
  | { ok: false; error: string };

type SpecialistMeta = {
  id: string;
  name: string;
  description?: string;
  model?: string;
};

type SpecialistResponse = {
  meta: SpecialistMeta;
  content: string;
  status: 'streaming' | 'done' | 'error';
  error?: string;
};

type Message = {
  id: string;
  role: Role;
  content: string;
  escalation?: EscalationPayload;
  specialists: SpecialistResponse[];
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new content.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streaming]);

  async function send() {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: Message = { id: uid(), role: 'user', content: text, specialists: [] };
    const assistantMsg: Message = { id: uid(), role: 'assistant', content: '', specialists: [] };
    const nextMessages = [...messages, userMsg, assistantMsg];

    setMessages(nextMessages);
    setInput('');
    setStreaming(true);
    setError(null);

    const apiMessages = nextMessages
      .filter((m) => m.role === 'user' || (m.role === 'assistant' && m.content.length > 0))
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages.slice(0, -1) }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status}: ${errText || 'no body'}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx;
        while ((idx = buffer.indexOf('\n\n')) !== -1) {
          const raw = buffer.slice(0, idx).trim();
          buffer = buffer.slice(idx + 2);
          if (!raw.startsWith('data:')) continue;
          const json = raw.slice(5).trim();
          if (!json) continue;

          let event: any;
          try {
            event = JSON.parse(json);
          } catch {
            continue;
          }

          // Main-chat text delta
          if (event.type === 'text' && typeof event.delta === 'string') {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsg.id ? { ...m, content: m.content + event.delta } : m,
              ),
            );
            continue;
          }

          // Specialist lifecycle
          if (event.type === 'specialist') {
            if (event.phase === 'start' && event.specialist) {
              const meta: SpecialistMeta = event.specialist;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsg.id
                    ? {
                        ...m,
                        specialists: [
                          ...m.specialists,
                          { meta, content: '', status: 'streaming' },
                        ],
                      }
                    : m,
                ),
              );
            } else if (event.phase === 'delta' && typeof event.delta === 'string') {
              setMessages((prev) =>
                prev.map((m) => {
                  if (m.id !== assistantMsg.id) return m;
                  // Find the most recent matching streaming specialist and append.
                  const updated = [...m.specialists];
                  for (let i = updated.length - 1; i >= 0; i--) {
                    if (
                      updated[i].meta.id === event.specialistId &&
                      updated[i].status === 'streaming'
                    ) {
                      updated[i] = {
                        ...updated[i],
                        content: updated[i].content + event.delta,
                      };
                      break;
                    }
                  }
                  return { ...m, specialists: updated };
                }),
              );
            } else if (event.phase === 'end') {
              setMessages((prev) =>
                prev.map((m) => {
                  if (m.id !== assistantMsg.id) return m;
                  const updated = m.specialists.map((s) =>
                    s.meta.id === event.specialistId && s.status === 'streaming'
                      ? { ...s, status: 'done' as const }
                      : s,
                  );
                  return { ...m, specialists: updated };
                }),
              );
            } else if (event.phase === 'error') {
              setMessages((prev) =>
                prev.map((m) => {
                  if (m.id !== assistantMsg.id) return m;
                  const updated = m.specialists.map((s) =>
                    s.meta.id === event.specialistId && s.status === 'streaming'
                      ? { ...s, status: 'error' as const, error: event.error }
                      : s,
                  );
                  return { ...m, specialists: updated };
                }),
              );
            }
            continue;
          }

          // Asana escalation
          if (event.type === 'tool' && event.name === 'create_task') {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsg.id
                  ? { ...m, escalation: event.payload as EscalationPayload }
                  : m,
              ),
            );
            continue;
          }

          if (event.type === 'error') {
            setError(event.message || 'stream error');
          }
        }
      }
    } catch (err: any) {
      setError(err?.message || 'request failed');
    } finally {
      setStreaming(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg, #f7f4ee)',
        color: 'var(--text, #1a1a1a)',
        fontFamily: 'var(--font-body, "Inter", system-ui, sans-serif)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          borderBottom: '1px solid var(--border, #d8d2c4)',
          padding: '20px 24px',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-display, "Source Serif 4", Georgia, serif)',
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}
          >
            Big Muddy
          </div>
          <div
            style={{
              fontSize: 13,
              opacity: 0.6,
              marginTop: 2,
            }}
          >
            Assistant — ask anything. I'll answer, route to a specialist, or escalate.
          </div>
        </div>
      </header>

      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 24px 0',
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            paddingBottom: 24,
          }}
        >
          {messages.length === 0 && (
            <div
              style={{
                opacity: 0.55,
                fontSize: 15,
                lineHeight: 1.5,
                marginTop: 40,
              }}
            >
              <p style={{ margin: 0 }}>
                Try: <em>"What's the room rate at the Inn?"</em> (direct answer) or{' '}
                <em>"The build is failing in CI — what would you check first?"</em> (routes to Patch) or{' '}
                <em>"The radio stream is down — can you fix it?"</em> (escalates to Asana).
              </p>
            </div>
          )}

          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} streaming={streaming} />
          ))}

          {streaming &&
            messages[messages.length - 1]?.role === 'assistant' &&
            messages[messages.length - 1]?.content === '' &&
            messages[messages.length - 1]?.specialists.length === 0 && (
              <div style={{ alignSelf: 'flex-start', opacity: 0.5, fontSize: 14 }}>
                Thinking…
              </div>
            )}

          {error && (
            <div
              style={{
                color: '#a13b2c',
                fontSize: 14,
                padding: '8px 12px',
                background: '#fbe9e3',
                borderRadius: 6,
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>

      <footer
        style={{
          borderTop: '1px solid var(--border, #d8d2c4)',
          padding: '16px 24px',
          background: 'var(--surface, #fbf9f4)',
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            display: 'flex',
            gap: 12,
            alignItems: 'flex-end',
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask the assistant…"
            rows={1}
            style={{
              flex: 1,
              resize: 'none',
              padding: '10px 14px',
              fontSize: 15,
              fontFamily: 'inherit',
              color: 'inherit',
              background: 'var(--bg, #f7f4ee)',
              border: '1px solid var(--border, #d8d2c4)',
              borderRadius: 8,
              outline: 'none',
              minHeight: 44,
              maxHeight: 160,
              lineHeight: 1.4,
            }}
          />
          <button
            type="button"
            onClick={send}
            disabled={streaming || !input.trim()}
            style={{
              padding: '10px 18px',
              fontSize: 14,
              fontFamily: 'inherit',
              fontWeight: 600,
              color: 'white',
              background: streaming || !input.trim() ? '#9c9789' : 'var(--accent, #1a1a1a)',
              border: 'none',
              borderRadius: 8,
              cursor: streaming || !input.trim() ? 'default' : 'pointer',
              minHeight: 44,
            }}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}

function MessageBubble({ message, streaming }: { message: Message; streaming: boolean }) {
  const isUser = message.role === 'user';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        gap: 8,
        width: '100%',
      }}
    >
      {(message.content.length > 0 || isUser) && (
        <div
          style={{
            maxWidth: '85%',
            padding: '10px 14px',
            fontSize: 15,
            lineHeight: 1.5,
            borderRadius: 10,
            background: isUser ? 'var(--accent, #1a1a1a)' : 'var(--surface, #fbf9f4)',
            color: isUser ? 'white' : 'inherit',
            border: isUser ? 'none' : '1px solid var(--border, #d8d2c4)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {message.content || (isUser ? '' : streaming ? '' : '(no response)')}
        </div>
      )}

      {message.specialists.map((s, i) => (
        <SpecialistCard key={`${s.meta.id}-${i}`} response={s} />
      ))}

      {message.escalation && <EscalationCard escalation={message.escalation} />}
    </div>
  );
}

function SpecialistCard({ response }: { response: SpecialistResponse }) {
  const { meta, content, status, error } = response;
  return (
    <div
      style={{
        maxWidth: '85%',
        padding: '10px 14px 12px 14px',
        fontSize: 15,
        lineHeight: 1.5,
        borderRadius: 10,
        background: 'var(--surface, #fbf9f4)',
        border: '1px solid var(--border, #d8d2c4)',
        borderLeft: '3px solid var(--accent, #1a1a1a)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          opacity: 0.65,
          marginBottom: 6,
          fontWeight: 600,
        }}
      >
        <span style={{ marginRight: 6 }}>✦</span>
        {meta.name}
        {meta.description && (
          <span style={{ opacity: 0.7, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
            {' · '}
            {firstClause(meta.description)}
          </span>
        )}
        {status === 'streaming' && (
          <span style={{ marginLeft: 8, opacity: 0.5, fontWeight: 400 }}>streaming…</span>
        )}
      </div>
      {content || (status === 'streaming' ? '' : status === 'error' ? `(specialist failed: ${error || 'unknown'})` : '(no response)')}
    </div>
  );
}

function EscalationCard({ escalation }: { escalation: EscalationPayload }) {
  return (
    <div
      style={{
        maxWidth: '85%',
        padding: '10px 14px',
        fontSize: 13,
        lineHeight: 1.5,
        borderRadius: 8,
        background: '#f0ead8',
        border: '1px solid #d4ca9e',
        color: '#3a3320',
      }}
    >
      {escalation.ok ? (
        <>
          <strong>Escalated</strong> to {escalation.assigneeLabel}.{' '}
          <a
            href={escalation.taskUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#3a3320', textDecoration: 'underline' }}
          >
            Open Asana task →
          </a>
        </>
      ) : (
        <>
          <strong>Escalation failed</strong>: {escalation.error}
        </>
      )}
    </div>
  );
}

// Use just the first clause of the specialist description so the badge
// stays compact ("Engineering: builds, deploys…" → "Engineering").
function firstClause(s: string): string {
  const idx = s.indexOf(':');
  return idx > 0 ? s.slice(0, idx) : s.split('.')[0];
}
