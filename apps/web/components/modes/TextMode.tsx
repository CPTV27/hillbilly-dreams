'use client';

import { useRef, useState, useEffect } from 'react';

const C = {
  bg: '#FAFAF8', white: '#FFFFFF', text: '#1A1A1A', textSec: '#6B7280',
  muted: '#9CA3AF', accent: '#B45309', border: '#E5E5E0',
  userBubble: '#B45309', aiBubble: '#FFFFFF',
};

type Message = { id: number; from: 'ai' | 'user'; text?: string; isPhoto?: boolean };

function getReply(input: string, biz: string): string {
  const l = input.toLowerCase();
  if (/photo|picture|post|snap/.test(l)) return `Got it! I'll post that to Instagram, Facebook, and Google Business. Here's the caption: "${biz} — another great day on Main Street." Want me to change anything?`;
  if (/numbers|revenue|money|week|how much/.test(l)) return 'This week: Revenue up 12% vs last week. Your top seller was Saturday\'s special. 23 customers on Tuesday (your slowest day — want me to draft a Tuesday promotion?)';
  if (/review/.test(l)) return 'You have 2 new reviews since Monday. Both 5-star. I drafted responses for both — want to see them?';
  if (/price|charge|cost/.test(l)) return 'Based on your costs and local competitors, I\'d suggest $18.99 for that plate. That gives you a 62% margin. Want me to update the menu?';
  if (/lunch|special|menu/.test(l)) return 'Here\'s a draft: "Tuesday Special: Smoked Brisket Plate with two sides — $14.99. First 20 customers get a free sweet tea." Want me to post it?';
  if (/competitor/.test(l)) return 'The BBQ place on Main Street just started a Tuesday special. They posted about it 3 times this week. Want me to draft something better?';
  if (/remind|license|renew/.test(l)) return 'Done. I\'ll text you a reminder on March 28th about your business license renewal. Added to your tasks.';
  return 'On it. I\'ll have that ready for you in a few minutes. Anything else?';
}

export default function TextMode({ businessName, businessCity }: { businessName: string; businessCity: string }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = 'Marcus';

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'ai', text: `${greeting}, ${firstName}! You got a 5-star review overnight from Sarah M. Want me to draft a response?` },
    { id: 2, from: 'user', text: 'Yeah do it' },
    { id: 3, from: 'ai', text: `Done. "Thank you Sarah! We're so glad you loved the brisket. The secret is low and slow — come back anytime." Posted to Google. ✓` },
    { id: 4, from: 'ai', text: 'Your Google profile hasn\'t had a new photo in 2 weeks. Businesses with fresh photos get 42% more direction requests. Snap one today?' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [nextId, setNextId] = useState(100);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  function send(text: string, isPhoto = false) {
    const uid = nextId;
    setNextId(n => n + 2);
    setMessages(prev => [...prev, { id: uid, from: 'user', text: isPhoto ? undefined : text, isPhoto }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = isPhoto
        ? `Photo analyzed: Looks like a great shot. Ready to post to Instagram, Facebook & Google. ✓ Approve All or Edit?`
        : getReply(text, businessName);
      setMessages(prev => [...prev, { id: uid + 1, from: 'ai', text: reply }]);
      setTyping(false);
    }, 800);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {messages.map(m => (
          <div key={m.id} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
            {m.isPhoto ? (
              <div style={{ backgroundColor: C.userBubble, borderRadius: '18px 18px 4px 18px', width: 160, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 24 }}>📸</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Photo</span>
              </div>
            ) : (
              <div style={{
                maxWidth: '80%', padding: '10px 14px',
                borderRadius: m.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                backgroundColor: m.from === 'user' ? C.userBubble : C.aiBubble,
                color: m.from === 'user' ? '#fff' : C.text,
                fontSize: 15, lineHeight: 1.5,
                border: m.from === 'ai' ? `1px solid ${C.border}` : 'none',
                boxShadow: m.from === 'ai' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
              }}>{m.text}</div>
            )}
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '12px 16px', borderRadius: '18px 18px 18px 4px', backgroundColor: C.aiBubble, border: `1px solid ${C.border}`, display: 'flex', gap: 4 }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: C.muted, display: 'inline-block', animation: 'bounce 1.2s infinite', animationDelay: `${i * 0.2}s` }} />)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, backgroundColor: C.white, padding: '10px 12px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => send('', true)} disabled={typing} style={{ width: 38, height: 38, borderRadius: 19, border: `1px solid ${C.border}`, backgroundColor: C.white, fontSize: 16, cursor: typing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: typing ? 0.5 : 1 }}>📷</button>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && input.trim() && !typing) send(input.trim()); }} placeholder="Message..." disabled={typing} style={{ flex: 1, height: 38, borderRadius: 19, border: `1px solid ${C.border}`, padding: '0 14px', fontSize: 15, color: C.text, backgroundColor: C.bg, outline: 'none', fontFamily: 'inherit' }} />
        <button onClick={() => { if (input.trim() && !typing) send(input.trim()); }} disabled={!input.trim() || typing} style={{ width: 38, height: 38, borderRadius: 19, border: 'none', backgroundColor: input.trim() && !typing ? C.accent : C.border, color: '#fff', fontSize: 15, cursor: input.trim() && !typing ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>↑</button>
      </div>
      <style>{`@keyframes bounce { 0%,60%,100% { transform:translateY(0) } 30% { transform:translateY(-5px) } }`}</style>
    </div>
  );
}
