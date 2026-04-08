'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'dawn';
  content: string;
}

export default function DawnPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'dawn', content: 'Hey. I\'m Delta Dawn — the Big Muddy AI. Ask me anything about the corridor, the shows, the Inn, or the business.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/dawn/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });

      if (!res.ok) {
        setMessages([...updated, { role: 'dawn', content: 'Something went wrong. Try again.' }]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      const dawnText = data.reply || data.content || data.message || 'No response.';
      setMessages([...updated, { role: 'dawn', content: dawnText }]);
    } catch {
      setMessages([...updated, { role: 'dawn', content: 'Connection error. Try again.' }]);
    }
    setLoading(false);
    inputRef.current?.focus();
  }, [input, messages, loading]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#0a0a08',
      color: '#e8e0d4',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
    }}>

      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid rgba(200,148,62,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexShrink: 0,
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#c8943e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#0a0a08',
        }}>
          DD
        </div>
        <div>
          <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>Delta Dawn</p>
          <p style={{ fontSize: '0.6rem', color: '#6b635a', margin: 0 }}>Big Muddy AI &middot; Natchez, Mississippi</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '20px',
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '16px',
            }}
          >
            <div style={{
              maxWidth: '70%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user' ? '#c8943e' : '#1a1816',
              color: msg.role === 'user' ? '#0a0a08' : '#e8e0d4',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              border: msg.role === 'dawn' ? '1px solid rgba(200,148,62,0.1)' : 'none',
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '16px 16px 16px 4px',
              background: '#1a1816',
              border: '1px solid rgba(200,148,62,0.1)',
              fontSize: '0.9rem',
              color: '#6b635a',
            }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 20px 20px',
        borderTop: '1px solid rgba(200,148,62,0.1)',
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
        }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask Delta Dawn anything..."
            autoFocus
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '0.9rem',
              background: '#141410',
              border: '1px solid rgba(200,148,62,0.2)',
              borderRadius: '8px',
              color: '#e8e0d4',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{
              padding: '12px 24px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: loading || !input.trim() ? '#2a2620' : '#c8943e',
              border: 'none',
              borderRadius: '8px',
              color: loading || !input.trim() ? '#6b635a' : '#0a0a08',
              cursor: loading ? 'wait' : 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Send
          </button>
        </div>
        <div style={{
          display: 'flex',
          gap: '6px',
          marginTop: '8px',
          flexWrap: 'wrap',
        }}>
          {['How many venues on the corridor?', 'Tell me about the Blues Room', 'What shows are coming up?', 'Who is Arrie Aslin?'].map(q => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              style={{
                padding: '4px 10px',
                fontSize: '0.6rem',
                background: 'transparent',
                border: '1px solid rgba(200,148,62,0.1)',
                borderRadius: '4px',
                color: '#6b635a',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
