'use client';

// Delta Dawn — floating AI assistant, always present on every admin page
// She greets new users, gives tours, answers anything, never says "I don't know"

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const GREETING = `Well hey there, welcome to Big Muddy Command! I'm Delta Dawn — think of me as your co-pilot around here. I know every inch of this platform, every brand, every policy, every room in the Inn. Ask me anything at all — I'm not going anywhere. Want me to show you around?`;

export default function DeltaDawnFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-open after 2 seconds on first visit
  useEffect(() => {
    const hasSeenDawn = sessionStorage.getItem('delta-dawn-greeted');
    if (!hasSeenDawn) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasGreeted(true);
        sessionStorage.setItem('delta-dawn-greeted', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text.trim() }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ops/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), sessionId: 'float-default' }),
      });

      if (!response.body) throw new Error('No response');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let content = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ') && line.trim() !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.text) {
                content += data.text;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: 'assistant', content };
                  return updated;
                });
              }
            } catch {}
          }
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sugar, something went sideways on my end. Give me just a second and try again — I'm not going anywhere."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Give me the full tour",
    "What can I do from here?",
    "Tell me about the Inn",
    "How do Bridge Clients work?",
  ];

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          className="dd-float-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open Delta Dawn"
        >
          <span className="dd-float-trigger__icon">🌻</span>
          <span className="dd-float-trigger__pulse" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className={`dd-float-panel ${isMinimized ? 'dd-float-panel--minimized' : ''}`}>
          {/* Header */}
          <div className="dd-float-header" onClick={() => isMinimized && setIsMinimized(false)}>
            <div className="dd-float-header__left">
              <span className="dd-float-header__icon">🌻</span>
              <div>
                <span className="dd-float-header__name">Delta Dawn</span>
                <span className="dd-float-header__status">
                  <span className="dd-float-header__dot" />
                  Always here
                </span>
              </div>
            </div>
            <div className="dd-float-header__actions">
              <button
                className="dd-float-header__btn"
                onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                aria-label={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? '△' : '▽'}
              </button>
              <button
                className="dd-float-header__btn"
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="dd-float-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`dd-float-msg dd-float-msg--${msg.role}`}>
                    {msg.role === 'assistant' && (
                      <span className="dd-float-msg__avatar">🌻</span>
                    )}
                    <div className={`dd-float-msg__bubble dd-float-msg__bubble--${msg.role}`}>
                      {msg.content || (isLoading && i === messages.length - 1 ? '...' : '')}
                    </div>
                  </div>
                ))}

                {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                  <div className="dd-float-msg dd-float-msg--assistant">
                    <span className="dd-float-msg__avatar">🌻</span>
                    <div className="dd-float-msg__bubble dd-float-msg__bubble--assistant dd-float-typing">
                      <span /><span /><span />
                    </div>
                  </div>
                )}

                {messages.length === 1 && !isLoading && (
                  <div className="dd-float-quickprompts">
                    {quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        className="dd-float-quickprompt"
                        onClick={() => sendMessage(prompt)}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="dd-float-input-wrap">
                <textarea
                  ref={inputRef}
                  className="dd-float-input"
                  placeholder="Talk to Delta Dawn..."
                  value={input}
                  rows={1}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  disabled={isLoading}
                />
                <button
                  className="dd-float-send"
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || !input.trim()}
                >
                  ↑
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        /* ── Trigger Button ── */
        .dd-float-trigger {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 9990;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #c8943e;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(200, 148, 62, 0.4), 0 0 0 3px rgba(200, 148, 62, 0.15);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .dd-float-trigger:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 28px rgba(200, 148, 62, 0.5), 0 0 0 4px rgba(200, 148, 62, 0.2);
        }
        .dd-float-trigger__icon {
          font-size: 1.5rem;
        }
        .dd-float-trigger__pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #c8943e;
          animation: dd-pulse 2s ease-in-out infinite;
        }
        @keyframes dd-pulse {
          0%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.15); }
        }

        /* ── Panel ── */
        .dd-float-panel {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 9991;
          width: 380px;
          max-height: 600px;
          background: #1e1b18;
          border: 1px solid rgba(200, 148, 62, 0.25);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
          font-family: 'DM Sans', sans-serif;
          animation: dd-slide-up 0.3s ease;
          overflow: hidden;
        }
        .dd-float-panel--minimized {
          max-height: none;
          height: auto;
        }
        @keyframes dd-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 440px) {
          .dd-float-panel {
            width: calc(100vw - 2rem);
            right: 1rem;
            bottom: 1rem;
          }
        }

        /* ── Header ── */
        .dd-float-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.875rem 1rem;
          background: rgba(200, 148, 62, 0.08);
          border-bottom: 1px solid rgba(200, 148, 62, 0.15);
          cursor: pointer;
        }
        .dd-float-header__left {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }
        .dd-float-header__icon {
          font-size: 1.5rem;
        }
        .dd-float-header__name {
          display: block;
          font-size: 0.875rem;
          font-weight: 700;
          color: #f0ebe0;
        }
        .dd-float-header__status {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.688rem;
          color: rgba(240, 235, 224, 0.5);
        }
        .dd-float-header__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
        }
        .dd-float-header__actions {
          display: flex;
          gap: 0.25rem;
        }
        .dd-float-header__btn {
          background: none;
          border: none;
          color: rgba(240, 235, 224, 0.35);
          font-size: 0.75rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          transition: color 0.15s ease, background 0.15s ease;
        }
        .dd-float-header__btn:hover {
          color: rgba(240, 235, 224, 0.7);
          background: rgba(240, 235, 224, 0.06);
        }

        /* ── Messages ── */
        .dd-float-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 420px;
          min-height: 200px;
        }
        .dd-float-msg {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
        }
        .dd-float-msg--user {
          flex-direction: row-reverse;
        }
        .dd-float-msg__avatar {
          font-size: 1rem;
          flex-shrink: 0;
          margin-top: 0.25rem;
        }
        .dd-float-msg__bubble {
          padding: 0.625rem 0.875rem;
          border-radius: 14px;
          font-size: 0.813rem;
          line-height: 1.55;
          max-width: 85%;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .dd-float-msg__bubble--assistant {
          background: rgba(240, 235, 224, 0.07);
          color: rgba(240, 235, 224, 0.85);
          border-bottom-left-radius: 4px;
        }
        .dd-float-msg__bubble--user {
          background: #c8943e;
          color: #1a1816;
          border-bottom-right-radius: 4px;
          font-weight: 500;
        }

        /* ── Typing indicator ── */
        .dd-float-typing {
          display: flex;
          gap: 4px;
          padding: 0.75rem 1rem;
        }
        .dd-float-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c8943e;
          animation: dd-typing 1.2s ease-in-out infinite;
        }
        .dd-float-typing span:nth-child(2) { animation-delay: 0.2s; }
        .dd-float-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dd-typing {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }

        /* ── Quick prompts ── */
        .dd-float-quickprompts {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
          padding: 0.25rem 0;
        }
        .dd-float-quickprompt {
          background: rgba(200, 148, 62, 0.08);
          border: 1px solid rgba(200, 148, 62, 0.2);
          color: #c8943e;
          font-size: 0.75rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .dd-float-quickprompt:hover {
          background: rgba(200, 148, 62, 0.15);
          border-color: rgba(200, 148, 62, 0.35);
        }

        /* ── Input ── */
        .dd-float-input-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-top: 1px solid rgba(240, 235, 224, 0.08);
          background: rgba(0, 0, 0, 0.15);
        }
        .dd-float-input {
          flex: 1;
          background: rgba(240, 235, 224, 0.06);
          border: 1px solid rgba(240, 235, 224, 0.1);
          border-radius: 10px;
          padding: 0.625rem 0.75rem;
          color: #f0ebe0;
          font-size: 0.813rem;
          font-family: 'DM Sans', sans-serif;
          resize: none;
          outline: none;
          min-height: 38px;
          max-height: 80px;
        }
        .dd-float-input:focus {
          border-color: rgba(200, 148, 62, 0.4);
        }
        .dd-float-input::placeholder {
          color: rgba(240, 235, 224, 0.25);
        }
        .dd-float-send {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #c8943e;
          border: none;
          color: #1a1816;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }
        .dd-float-send:hover:not(:disabled) {
          background: #d4a24e;
          transform: scale(1.05);
        }
        .dd-float-send:disabled {
          opacity: 0.3;
          cursor: default;
        }
      `}</style>
    </>
  );
}
