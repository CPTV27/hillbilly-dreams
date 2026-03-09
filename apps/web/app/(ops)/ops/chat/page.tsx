'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export default function DeltaDawnChat() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hey there! I'm Delta Dawn, here to help get The Big Muddy Inn & Blues Room ready. What can I help you with today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
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
                                assistantContent += data.text;
                                setMessages(prev => {
                                    const newMessages = [...prev];
                                    newMessages[newMessages.length - 1].content = assistantContent;
                                    return newMessages;
                                });
                            } else if (data.done || data.error) {
                                // Done or error
                            }
                        } catch (e) {
                            // Ignore parse errors on stream continuation
                        }
                    }
                }
            }
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I ran into an issue there. Can you try asking again?' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px] border border-neutral-200 bg-white rounded-xl shadow-sm overflow-hidden text-sm sm:text-base">
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-2xl shadow-sm">
                    🌻
                </div>
                <div>
                    <h2 className="font-bold text-amber-900 text-lg sm:text-xl">Delta Dawn</h2>
                    <p className="text-amber-700/80 font-medium text-sm">Launch Operations Assistant</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-neutral-50/50">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <span className={`text-xs px-2 mb-1.5 font-medium ${msg.role === 'user' ? 'text-blue-600/70' : 'text-amber-700/70'}`}>
                            {msg.role === 'user' ? 'You' : 'Delta Dawn'}
                        </span>
                        <div
                            className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 shadow-sm whitespace-pre-wrap leading-relaxed
                ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                    : 'bg-white border text-neutral-800 border-neutral-200 rounded-bl-sm prose prose-amber prose-sm max-w-none'}`}
                            dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') || '<span className="animate-pulse">...</span>' }}
                        />
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 sm:p-5 bg-white border-t border-neutral-200">
                <form onSubmit={handleSubmit} className="flex gap-3">
                    <input
                        type="text"
                        className="flex-1 rounded-full border border-neutral-300 px-5 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-inner bg-neutral-50/50"
                        placeholder="Ask Delta Dawn a question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-full transition-colors flex items-center shadow-sm"
                    >
                        {isLoading ? '...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
}
