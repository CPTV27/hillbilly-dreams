'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'chase' | 'agent';
  content: string;
  timestamp: number;
}

export default function ChaseAppPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', content: 'Primetime here. Tap the button and talk. I\'m listening.', timestamp: Date.now() },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let text = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported. Use Safari on iPhone or Chrome on Mac.');
      return;
    }
    setTranscript('');
    setIsRecording(true);
    recognitionRef.current.start();
  };

  const stopAndSend = async () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    await sendMessage(transcript);
    setTranscript('');
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'chase', content: text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      const res = await fetch('/api/dawn/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role === 'chase' ? 'user' : 'dawn',
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      const data = await res.json();
      const replyText = data.reply || data.content || data.message || 'No response.';
      setMessages(prev => [...prev, { role: 'agent', content: replyText, timestamp: Date.now() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'agent', content: 'Connection error. Try again.', timestamp: Date.now() }]);
    }
    setIsProcessing(false);
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#0a0a08',
      color: '#e8e0d4',
      fontFamily: 'var(--font-body, -apple-system, BlinkMacSystemFont, sans-serif)',
      overflow: 'hidden',
      position: 'fixed',
      inset: 0,
    }}>

      {/* HEADER */}
      <div style={{
        padding: 'env(safe-area-inset-top, 20px) 16px 12px',
        borderBottom: '1px solid rgba(200,148,62,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8943e', margin: 0 }}>Chase</p>
          <p style={{ fontSize: '0.75rem', color: '#6b635a', margin: 0 }}>Talk to any agent</p>
        </div>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: isProcessing ? '#9e7a4a' : isRecording ? '#9e4a4a' : '#4a9e4a',
          transition: 'background 0.2s',
        }} />
      </div>

      {/* MESSAGES */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '16px',
        WebkitOverflowScrolling: 'touch',
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'chase' ? 'flex-end' : 'flex-start',
            marginBottom: '12px',
          }}>
            <div style={{
              maxWidth: '80%',
              padding: '12px 16px',
              borderRadius: msg.role === 'chase' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'chase' ? '#c8943e' : '#1a1816',
              color: msg.role === 'chase' ? '#0a0a08' : '#e8e0d4',
              fontSize: '1rem',
              lineHeight: 1.5,
              border: msg.role === 'agent' ? '1px solid rgba(200,148,62,0.1)' : 'none',
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '18px 18px 18px 4px',
              background: '#1a1816',
              border: '1px solid rgba(200,148,62,0.1)',
              fontSize: '1rem',
              color: '#6b635a',
            }}>
              Thinking...
            </div>
          </div>
        )}
        {transcript && isRecording && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
            <div style={{
              maxWidth: '80%',
              padding: '12px 16px',
              borderRadius: '18px 18px 4px 18px',
              background: 'rgba(200,148,62,0.2)',
              color: '#e8e0d4',
              fontSize: '1rem',
              lineHeight: 1.5,
              border: '1px solid rgba(200,148,62,0.3)',
              fontStyle: 'italic',
            }}>
              {transcript}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* VOICE BUTTON */}
      <div style={{
        padding: '16px 16px calc(env(safe-area-inset-bottom, 16px) + 16px)',
        borderTop: '1px solid rgba(200,148,62,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        flexShrink: 0,
      }}>
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={isProcessing}
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: isProcessing ? '#2a2620' : '#c8943e',
              border: 'none',
              color: '#0a0a08',
              fontSize: '2rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(200,148,62,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            🎤
          </button>
        ) : (
          <button
            onClick={stopAndSend}
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: '#9e4a4a',
              border: 'none',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(158,74,74,0.4)',
              animation: 'pulse 1.5s infinite',
            }}
          >
            SEND
          </button>
        )}
        <p style={{ fontSize: '0.65rem', color: '#6b635a', margin: 0, textAlign: 'center' }}>
          {isRecording ? 'Tap SEND when done' : isProcessing ? 'Processing...' : 'Tap to talk'}
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        body { overscroll-behavior: none; }
      `}} />
    </div>
  );
}
