'use client';

import { useState, useRef, useEffect } from 'react';
import { cn, formatDate } from '@/lib/utils';
import { sanitizeChatHtml } from '@/lib/sanitize';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, User, AlertCircle, RefreshCw, Send } from 'lucide-react';

type Message = {
    role: 'user' | 'assistant' | 'error';
    content: string;
    createdAt?: Date;
};

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

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px] border border-neutral-200 bg-white rounded-xl shadow-sm overflow-hidden text-sm sm:text-base relative">
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-amber-100/50 border-b border-amber-200 flex items-center gap-4 z-10">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-2xl shadow-sm border border-amber-100">
                    🌻
                </div>
                <div>
                    <h2 className="font-bold text-amber-900 text-lg sm:text-xl tracking-tight">Delta Dawn</h2>
                    <p className="text-amber-700/80 font-medium text-sm">Launch Operations Assistant</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-neutral-50/50">
                {messages.length === 0 && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center h-full text-center space-y-6 mt-10"
                    >
                        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-4xl shadow-sm border border-amber-100">
                            🌻
                        </div>
                        <div className="max-w-md">
                            <h3 className="text-xl font-bold text-neutral-800 mb-2">Hey there! I'm Delta Dawn.</h3>
                            <p className="text-neutral-500">I'm your Big Muddy assistant. Ask me anything about the property, tasks, or getting set up.</p>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                            {["What should I work on next?", "Tell me about the suites", "Help me with Google Business"].map(chip => (
                                <button
                                    key={chip}
                                    onClick={() => sendMessage(chip)}
                                    className="bg-white border border-neutral-200 text-neutral-600 hover:text-amber-700 hover:border-amber-300 hover:bg-amber-50 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm"
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
                            className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}
                        >
                            <div className={cn(
                                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm",
                                msg.role === 'user' ? "bg-amber-600 text-white" : msg.role === 'error' ? "bg-red-100 text-red-600" : "bg-white border border-neutral-200 text-amber-700"
                            )}>
                                {msg.role === 'user' ? <User size={16} strokeWidth={2.5} /> : msg.role === 'error' ? <AlertCircle size={16} /> : <Music size={16} />}
                            </div>

                            <div className={cn("flex flex-col", msg.role === 'user' ? 'items-end' : 'items-start')}>
                                <div className="flex items-center gap-2 mb-1.5 px-1">
                                    <span className={cn("text-xs font-semibold", msg.role === 'user' ? 'text-amber-700/80' : 'text-neutral-500')}>
                                        {msg.role === 'user' ? 'You' : msg.role === 'error' ? 'System' : 'Delta Dawn'}
                                    </span>
                                    {msg.createdAt && <span className="text-[10px] text-neutral-400">{formatDate(msg.createdAt)}</span>}
                                </div>
                                <div
                                    className={cn(
                                        "max-w-[85%] sm:max-w-[75%] px-5 py-3.5 shadow-sm whitespace-pre-wrap leading-relaxed",
                                        msg.role === 'user'
                                            ? 'bg-amber-600 text-white rounded-2xl rounded-tr-sm'
                                            : msg.role === 'error'
                                                ? 'bg-red-50 border border-red-100 text-red-800 rounded-2xl rounded-tl-sm'
                                                : 'bg-white border text-neutral-800 border-neutral-200 rounded-2xl rounded-tl-sm prose prose-amber prose-sm max-w-none'
                                    )}
                                    dangerouslySetInnerHTML={{ __html: sanitizeChatHtml(msg.content.replace(/\n/g, '<br/>')) || (msg.role === 'assistant' ? '' : '...') }}
                                />
                                {msg.role === 'error' && (
                                    <button
                                        onClick={() => {
                                            const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
                                            if (lastUserMessage) sendMessage(lastUserMessage.content);
                                        }}
                                        className="mt-2 text-xs font-medium text-red-600 hover:text-red-800 flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 transition-colors"
                                    >
                                        <RefreshCw size={12} /> Try again
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm bg-white border border-neutral-200 text-amber-700">
                            <Music size={16} />
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2 mb-1.5 px-1">
                                <span className="text-xs font-semibold text-neutral-500">Delta Dawn</span>
                            </div>
                            <div className="bg-white border text-neutral-800 border-neutral-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                                <motion.div
                                    className="flex space-x-1"
                                    initial="initial"
                                    animate="animate"
                                    variants={{ animate: { transition: { staggerChildren: 0.2 } } }}
                                >
                                    {[0, 1, 2].map((dot) => (
                                        <motion.span
                                            key={dot}
                                            className="w-2 h-2 rounded-full bg-amber-400"
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

            <div className="p-4 sm:p-5 bg-white border-t border-neutral-200">
                <div className="relative">
                    <textarea
                        className="w-full resize-none rounded-2xl border border-neutral-300 px-5 py-3.5 pr-14 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-inner bg-neutral-50/50"
                        placeholder="Ask Delta Dawn a question... (Shift+Enter for newline)"
                        value={input}
                        rows={input.split('\n').length > 1 ? Math.min(input.split('\n').length, 5) : 1}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        style={{ minHeight: '52px' }}
                    />
                    <button
                        onClick={() => sendMessage(input)}
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 bottom-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white p-2 rounded-xl transition-colors flex items-center justify-center shadow-sm"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
