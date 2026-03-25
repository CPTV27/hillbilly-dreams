'use client';

import React, { useState } from 'react';
import { Send, FileText, Database, Code, BrainCircuit, Activity } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Simple types matching Prisma schema manually for the client
interface NotebookDrop {
  id: string;
  title: string;
  author: string;
  content: string;
  tags: string[];
  sourceSystem: string | null;
  tokenCount: number | null;
  createdAt: string;
}

export default function NotebookClient({ initialDrops }: { initialDrops: NotebookDrop[] }) {
  const [drops, setDrops] = useState<NotebookDrop[]>(initialDrops);
  const [activeDropId, setActiveDropId] = useState<string | null>(null);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const activeDrop = drops.find(d => d.id === activeDropId);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/notebook/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          contextDropIds: drops.map(d => d.id) // Send all drop IDs so backend can pack the 1M token context
        })
      });

      if (!response.ok) throw new Error('Failed to fetch response.');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection to Sovereign Edge interrupted.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 64px)',
      overflow: 'hidden'
    }}>
      {/* LEFT PANE: Document Library */}
      <div style={{
        width: '320px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Source Documents
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
            {drops.length} fragments in 1M Token Context
          </p>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {drops.map(drop => (
            <div 
              key={drop.id}
              onClick={() => setActiveDropId(drop.id)}
              style={{
                padding: '16px',
                backgroundColor: activeDropId === drop.id ? '#f0f9ff' : '#ffffff',
                border: `1px solid ${activeDropId === drop.id ? '#bae6fd' : '#e2e8f0'}`,
                borderRadius: '8px',
                marginBottom: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: activeDropId === drop.id ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {drop.sourceSystem === 'cli' ? (
                  <Code size={16} color="#0ea5e9" />
                ) : (
                  <FileText size={16} color="#64748b" />
                )}
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {drop.title}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <BrainCircuit size={12} /> {drop.author}
                </div>
                <span>{drop.tokenCount ? `${drop.tokenCount}t` : ''}</span>
              </div>
            </div>
          ))}

          {drops.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8', fontSize: '14px' }}>
              No documents dropped yet. Use the CLI to push to the knowledge base.
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANE: Chat & Viewer Switcher */}
      <div style={{
        flex: 1,
        backgroundColor: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {activeDrop ? (
          // DOCUMENT VIEWER
          <div style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
            <button 
              onClick={() => setActiveDropId(null)}
              style={{
                marginBottom: '24px',
                padding: '8px 16px',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              ← Back to Chat
            </button>
            <div style={{
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>{activeDrop.title}</h1>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px', display: 'flex', gap: '16px' }}>
                <span>Author: {activeDrop.author}</span>
                <span>•</span>
                <span>Date: {new Date(activeDrop.createdAt).toLocaleString()}</span>
              </div>
              
              <div style={{ 
                color: '#334155', 
                fontSize: '16px', 
                lineHeight: '1.7',
                fontFamily: 'serif'
              }}>
                <ReactMarkdown>{activeDrop.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ) : (
          // CHAT INTERFACE
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {messages.length === 0 ? (
                <div style={{ margin: 'auto', textAlign: 'center', color: '#64748b' }}>
                  <Database size={48} color="#cbd5e1" style={{ margin: '0 auto 16px auto' }} />
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>Chat with your Swarm</h2>
                  <p style={{ fontSize: '15px', maxWidth: '400px', margin: '0 auto' }}>
                    Every document in the left pane is injected simultaneously into Gemini's 1-Million token context window for absolute, perfect recall.
                  </p>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    {m.role === 'assistant' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#0ea5e9', fontSize: '13px', fontWeight: '600' }}>
                        <BrainCircuit size={14} /> Swarm Intelligence
                      </div>
                    )}
                    <div style={{
                      backgroundColor: m.role === 'user' ? '#0f172a' : 'white',
                      color: m.role === 'user' ? 'white' : '#1e293b',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      maxWidth: '85%',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      boxShadow: m.role === 'assistant' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      borderBottomRightRadius: m.role === 'user' ? '4px' : '12px',
                      borderBottomLeftRadius: m.role === 'assistant' ? '4px' : '12px',
                    }}>
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px' }}>
                  <Activity size={16} className="animate-pulse" /> Consulting Knowledge Base...
                </div>
              )}
            </div>

            {/* Input Box */}
            <div style={{ padding: '24px' }}>
              <form 
                onSubmit={handleSendMessage}
                style={{
                  position: 'relative',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px'
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask the Swarm anything..."
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '12px 16px',
                    fontSize: '15px',
                    color: '#0f172a',
                    backgroundColor: 'transparent'
                  }}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  style={{
                    backgroundColor: input.trim() ? '#0f172a' : '#e2e8f0',
                    color: input.trim() ? 'white' : '#94a3b8',
                    border: 'none',
                    borderRadius: '8px',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: input.trim() ? 'pointer' : 'default',
                    transition: 'all 0.2s'
                  }}
                >
                  <Send size={18} />
                </button>
              </form>
              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: '#94a3b8' }}>
                Powered by Google Gemini 1.5 Pro • 1 Million Token Context
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
