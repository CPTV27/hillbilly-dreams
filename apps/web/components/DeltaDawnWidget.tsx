'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'dawn';
  text: string;
  page?: string;
}

export default function DeltaDawnWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'dawn', text: "I'm here. Ask me anything or leave a note. I follow you on every page." },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const page = typeof window !== 'undefined' ? window.location.pathname : '';
    const userMsg: Message = { role: 'user', text: input, page };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate Delta Dawn response (replace with /api/grok/chat or Gemini call)
    setTimeout(() => {
      const responses = [
        "Got it. I'll remember that.",
        `Noted — you're on ${page}. What do you need?`,
        "That's in Tracy's approval queue. Want me to add it to Asana?",
        "Good question. Let me pull that up.",
        "I see what you're looking at. The numbers check out.",
        "Want me to flag this for Chase?",
      ];
      const dawn: Message = {
        role: 'dawn',
        text: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages(prev => [...prev, dawn]);
    }, 800);
  };

  return (
    <>
      {/* Floating button */}
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
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label="Open Delta Dawn"
        >
          DD
        </button>
      )}

      {/* Chat panel */}
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
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '0.75rem 1rem',
              borderBottom: '1px solid rgba(200,148,62,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#4a7c59',
                  animation: 'ddPulse 2s infinite',
                }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c8943e' }}>
                Delta Dawn
              </span>
              <span style={{ fontSize: '0.65rem', color: '#6b635a' }}>
                {typeof window !== 'undefined' ? window.location.pathname : ''}
              </span>
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

          {/* Messages */}
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
                {msg.text}
                {msg.page && (
                  <div style={{ fontSize: '0.6rem', color: '#4a4440', marginTop: '0.25rem' }}>
                    {msg.page}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
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
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask or leave a note..."
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
              }}
            />
            <button
              onClick={send}
              style={{
                background: '#c8943e',
                color: '#0a0a08',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
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
