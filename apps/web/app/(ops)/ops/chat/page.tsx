'use client';

import { useState, useRef, useEffect } from 'react';
import { sanitizeChatHtml } from '@/lib/sanitize';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
    role: 'user' | 'assistant' | 'error';
    content: string;
    createdAt?: Date;
};

function formatDate(d: Date) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function DeltaDawnChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const sendMessage = async (textToSubmit: string) => {
        if (!textToSubmit.trim() || isLoading) return;

        const userMessage = textToSubmit.trim();
        setInput('');

        // Remove previous error if it exists
        setMessages(prev => prev.filter(m => m.role !== 'error'));
        setMessages(prev => [...prev, { role: 'user', content: userMessage, createdAt: new Date() }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/ops/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, sessionId: 'default' }),
            });

            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantContent = '';

            setMessages(prev => [...prev, { role: 'assistant', content: '', createdAt: new Date() }]);

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
                                assistantContent += data.text;
                                setMessages(prev => {
                                    const newMessages = [...prev];
                                    newMessages[newMessages.length - 1].content = assistantContent;
                                    return newMessages;
                                });
                            } else if (data.error) {
                                throw new Error(data.error);
                            }
                        } catch (e) {
                            // Ignored JSON parse errors mid-stream
                        }
                    }
                }
            }
        } catch (err: any) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'error', content: err.message || 'Sorry, I ran into an issue there. Can you try asking again?', createdAt: new Date() }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const iconMusic = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
    const iconUser = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    const iconAlert = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
    const iconRefresh = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>;
    const iconSend = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 8rem)',
            maxHeight: '800px',
            border: '1px solid var(--theme-card-border)',
            backgroundColor: 'var(--theme-card-bg)',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            position: 'relative'
        }}>
            <div style={{
                padding: '1.25rem',
                backgroundColor: 'var(--theme-accent-bg)',
                borderBottom: '1px solid var(--theme-card-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                zIndex: 10
            }}>
                <div style={{
                    width: '3rem',
                    height: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--theme-card-bg)',
                    borderRadius: '50%',
                    fontSize: '1.5rem',
                    border: '1px solid var(--theme-accent-bg)'
                }}>
                    🌻
                </div>
                <div>
                    <h2 style={{ fontWeight: 700, color: 'var(--theme-accent)', fontSize: '1.25rem', letterSpacing: '-0.025em', margin: 0 }}>Delta Dawn</h2>
                    <p style={{ color: 'var(--theme-text-secondary)', fontWeight: 500, fontSize: '0.875rem', margin: 0 }}>Launch Operations Assistant</p>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'var(--theme-hover)' }}>
                {messages.length === 0 && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: '1.5rem', marginTop: '2.5rem' }}
                    >
                        <div style={{ width: '5rem', height: '5rem', backgroundColor: 'var(--theme-accent-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.25rem', border: '1px solid var(--theme-card-border)' }}>
                            🌻
                        </div>
                        <div style={{ maxWidth: '28rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.5rem' }}>Hey there! I'm Delta Dawn.</h3>
                            <p style={{ color: 'var(--theme-text-secondary)' }}>I'm your Big Muddy assistant. Ask me anything about the property, tasks, or getting set up.</p>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', maxWidth: '32rem' }}>
                            {["What should I work on next?", "Tell me about the suites", "Help me with Google Business"].map(chip => (
                                <button
                                    key={chip}
                                    onClick={() => sendMessage(chip)}
                                    style={{
                                        backgroundColor: 'var(--theme-card-bg)',
                                        border: '1px solid var(--theme-card-border)',
                                        color: 'var(--theme-text-secondary)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--theme-accent)'; e.currentTarget.style.color = 'var(--theme-accent)' }}
                                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--theme-card-border)'; e.currentTarget.style.color = 'var(--theme-text-secondary)' }}
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ display: 'flex', gap: '0.75rem', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}
                        >
                            <div style={{
                                flexShrink: 0,
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: msg.role === 'user' ? 'var(--theme-accent)' : msg.role === 'error' ? 'var(--theme-warning-bg, rgba(251,191,36,0.15))' : 'var(--theme-card-bg)',
                                color: msg.role === 'user' ? 'var(--theme-card-bg)' : msg.role === 'error' ? 'var(--theme-warning)' : 'var(--theme-accent)',
                                border: msg.role === 'user' || msg.role === 'error' ? 'none' : '1px solid var(--theme-card-border)'
                            }}>
                                {msg.role === 'user' ? iconUser : msg.role === 'error' ? iconAlert : iconMusic}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem', padding: '0 0.25rem' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: msg.role === 'user' ? 'var(--theme-accent)' : 'var(--theme-text-muted)' }}>
                                        {msg.role === 'user' ? 'You' : msg.role === 'error' ? 'System' : 'Delta Dawn'}
                                    </span>
                                    {msg.createdAt && <span style={{ fontSize: '0.625rem', color: 'var(--theme-text-muted)', opacity: 0.7 }}>{formatDate(msg.createdAt)}</span>}
                                </div>
                                <div
                                    style={{
                                        maxWidth: '85%',
                                        padding: '0.875rem 1.25rem',
                                        lineHeight: 1.6,
                                        backgroundColor: msg.role === 'user' ? 'var(--theme-accent)' : msg.role === 'error' ? 'var(--theme-warning-bg, rgba(251,191,36,0.05))' : 'var(--theme-card-bg)',
                                        color: msg.role === 'user' ? 'var(--theme-card-bg)' : msg.role === 'error' ? 'var(--theme-warning)' : 'var(--theme-text-primary)',
                                        border: msg.role === 'user' ? 'none' : `1px solid ${msg.role === 'error' ? 'var(--theme-warning)' : 'var(--theme-card-border)'}`,
                                        borderRadius: '1rem',
                                        borderTopRightRadius: msg.role === 'user' ? '0.25rem' : '1rem',
                                        borderTopLeftRadius: msg.role !== 'user' ? '0.25rem' : '1rem',
                                        fontSize: '0.875rem'
                                    }}
                                    dangerouslySetInnerHTML={{ __html: sanitizeChatHtml(msg.content.replace(/\n/g, '<br/>')) || (msg.role === 'assistant' ? '' : '...') }}
                                />
                                {msg.role === 'error' && (
                                    <button
                                        onClick={() => {
                                            const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
                                            if (lastUserMessage) sendMessage(lastUserMessage.content);
                                        }}
                                        style={{
                                            marginTop: '0.5rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 500,
                                            color: 'var(--theme-warning)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            backgroundColor: 'var(--theme-warning-bg, rgba(251,191,36,0.15))',
                                            padding: '0.375rem 0.75rem',
                                            borderRadius: '9999px',
                                            border: '1px solid var(--theme-warning)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {iconRefresh} Try again
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <div style={{
                            flexShrink: 0,
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'var(--theme-card-bg)',
                            color: 'var(--theme-accent)',
                            border: '1px solid var(--theme-card-border)'
                        }}>
                            {iconMusic}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem', padding: '0 0.25rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--theme-text-muted)' }}>Delta Dawn</span>
                            </div>
                            <div style={{
                                padding: '1rem 1.25rem',
                                backgroundColor: 'var(--theme-card-bg)',
                                border: '1px solid var(--theme-card-border)',
                                borderRadius: '1rem',
                                borderTopLeftRadius: '0.25rem',
                            }}>
                                <motion.div
                                    style={{ display: 'flex', gap: '0.25rem' }}
                                    initial="initial"
                                    animate="animate"
                                    variants={{ animate: { transition: { staggerChildren: 0.2 } } }}
                                >
                                    {[0, 1, 2].map((dot) => (
                                        <motion.span
                                            key={dot}
                                            style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--theme-progress-fill)' }}
                                            variants={{
                                                initial: { y: 0, opacity: 0.5 },
                                                animate: { y: [-2, 2, -2], opacity: [0.5, 1, 0.5], transition: { repeat: Infinity, duration: 1 } }
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: '1.25rem', backgroundColor: 'var(--theme-card-bg)', borderTop: '1px solid var(--theme-card-border)' }}>
                <div style={{ position: 'relative' }}>
                    <textarea
                        style={{
                            width: '100%',
                            resize: 'none',
                            borderRadius: '1rem',
                            border: '1px solid var(--theme-card-border)',
                            padding: '0.875rem 3.5rem 0.875rem 1.25rem',
                            backgroundColor: 'var(--theme-hover)',
                            color: 'var(--theme-text-primary)',
                            fontFamily: 'inherit',
                            fontSize: '0.875rem',
                            minHeight: '52px',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Ask Delta Dawn a question... (Shift+Enter for newline)"
                        value={input}
                        rows={input.split('\n').length > 1 ? Math.min(input.split('\n').length, 5) : 1}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                    />
                    <button
                        onClick={() => sendMessage(input)}
                        disabled={isLoading || !input.trim()}
                        style={{
                            position: 'absolute',
                            right: '0.5rem',
                            bottom: '0.5rem',
                            backgroundColor: 'var(--theme-accent)',
                            color: 'var(--theme-card-bg)',
                            padding: '0.5rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            cursor: (isLoading || !input.trim()) ? 'not-allowed' : 'pointer',
                            opacity: (isLoading || !input.trim()) ? 0.5 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {iconSend}
                    </button>
                </div>
            </div>
        </div>
    );
}
