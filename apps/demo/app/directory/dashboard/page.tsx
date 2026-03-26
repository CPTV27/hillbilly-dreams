'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const C = {
  bg: '#FAFAF8',
  white: '#FFFFFF',
  text: '#1A1A1A',
  textSec: '#6B7280',
  muted: '#9CA3AF',
  accent: '#B45309',
  accentHover: '#92400E',
  accentBg: 'rgba(180,83,9,0.07)',
  border: '#E5E5E0',
  green: '#16A34A',
  greenBg: 'rgba(22,163,74,0.06)',
  userBubble: '#B45309',
  aiBubble: '#FFFFFF',
};

type Tab = 'chat' | 'briefing' | 'tasks';

type Message = {
  id: number;
  from: 'ai' | 'user';
  text?: string;
  isPhoto?: boolean;
  isTyping?: boolean;
};

type BriefingCard = {
  type: 'action' | 'insight' | 'idea';
  title: string;
  body: string;
  actions: { label: string; primary?: boolean }[];
};

const morningBriefing: BriefingCard[] = [
  {
    type: 'action',
    title: 'New Google Review',
    body: 'Sarah M. left a 5-star review last night: "Best brisket in Natchez. The owner remembered our names." You haven\'t responded yet.',
    actions: [
      { label: 'Draft a Response', primary: true },
      { label: 'I\'ll Handle It' },
    ],
  },
  {
    type: 'insight',
    title: 'Your Week in Numbers',
    body: 'Revenue up 12% vs last week. Your top seller was the Saturday special. Google profile views are up 23% — that photo you posted Tuesday is driving traffic.',
    actions: [
      { label: 'Tell Me More', primary: true },
      { label: 'Got It' },
    ],
  },
  {
    type: 'action',
    title: 'Your Google Profile Needs a Photo',
    body: 'It\'s been 14 days since your last photo update. Businesses with fresh photos get 42% more direction requests. Snap a quick picture today.',
    actions: [
      { label: 'Open Camera', primary: true },
      { label: 'Remind Me Tomorrow' },
    ],
  },
  {
    type: 'idea',
    title: 'Competitor Alert',
    body: 'The BBQ place on Main Street just started running a Tuesday lunch special. They posted about it 3 times this week. Want me to draft a counter-offer for your social?',
    actions: [
      { label: 'Draft Something', primary: true },
      { label: 'Not Now' },
    ],
  },
];

const initialMessages: Message[] = [
  {
    id: 1,
    from: 'ai',
    text: 'Good morning, Marcus! You got a 5-star review overnight. Want me to draft a response?',
  },
  {
    id: 2,
    from: 'user',
    text: 'Yeah do it',
  },
  {
    id: 3,
    from: 'ai',
    text: 'Done. Here\'s what I wrote: "Thank you Sarah! We\'re so glad you loved the brisket. The secret is low and slow — come back anytime and we\'ll save you the corner table." Posted to Google. ✓',
  },
  {
    id: 4,
    from: 'ai',
    text: 'Also — your Google profile hasn\'t had a new photo in 2 weeks. Businesses with fresh photos get 42% more direction requests. Snap a quick one today?',
  },
];

const defaultTasks = [
  { id: 1, label: 'Respond to 2 new Google reviews', done: false },
  { id: 2, label: 'Post a photo to Google Business (14 days since last)', done: false },
  { id: 3, label: 'Draft Tuesday lunch special', done: false },
  { id: 4, label: 'Review this week\'s numbers', done: false },
  { id: 5, label: 'Renew business license (due April 15)', done: false },
];

function getAIReply(input: string, bizName: string): string {
  const lower = input.toLowerCase();
  if (/photo|picture|post/.test(lower)) {
    return `Got it. Caption written. Ready to post to Instagram, Facebook, your website, your newsletter, Google Business, and the Directory tourism feed. One photo, six outputs. Approve all or edit first?`;
  }
  if (/numbers|revenue|money|week/.test(lower)) {
    return 'This week: Revenue up 12% vs last week. Your top seller was Saturday\'s special. 23 customers on Tuesday (your slowest day — want me to draft a Tuesday promotion?)';
  }
  if (/review/.test(lower)) {
    return 'You have 2 new reviews since Monday. Both 5-star. I drafted responses for both — want to see them?';
  }
  return 'On it. I\'ll have that ready for you in a few minutes. Anything else?';
}

export default function Dashboard() {
  const router = useRouter();
  const [biz, setBiz] = useState<{ name: string; owner: string; city: string } | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('chat');

  // Briefing state
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [showPhotoResult, setShowPhotoResult] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [nextId, setNextId] = useState(100);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tasks state
  const [tasks, setTasks] = useState(defaultTasks);

  useEffect(() => {
    const stored = localStorage.getItem('dsd_business');
    if (!stored) { router.push('/directory/join'); return; }
    try { setBiz(JSON.parse(stored)); } catch { router.push('/directory/join'); }
  }, [router]);

  useEffect(() => {
    if (activeTab === 'chat') {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [messages, activeTab, isAITyping]);

  if (!biz) return null;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const visibleCards = morningBriefing.filter((_, i) => !dismissed.includes(i));

  function sendMessage(text: string, isPhoto = false) {
    const userMsg: Message = { id: nextId, from: 'user', text: isPhoto ? undefined : text, isPhoto };
    const newNextId = nextId + 1;
    setNextId(newNextId + 1);
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsAITyping(true);

    setTimeout(() => {
      const replyText = isPhoto
        ? 'Photo analyzed. Caption written. Ready to post to Instagram, Facebook, your website, newsletter, Google Business, and the tourism feed. One photo, six outputs. Approve all or edit first?'
        : getAIReply(text, biz!.name);
      const aiMsg: Message = { id: newNextId, from: 'ai', text: replyText };
      setMessages(prev => [...prev, aiMsg]);
      setIsAITyping(false);
    }, 800);
  }

  function handleSend() {
    const trimmed = inputText.trim();
    if (!trimmed || isAITyping) return;
    sendMessage(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend();
  }

  function handleCameraClick() {
    sendMessage('', true);
  }

  function sendTaskToChat(label: string) {
    setActiveTab('chat');
    setTimeout(() => {
      sendMessage(label);
    }, 100);
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: C.bg,
      fontFamily: 'var(--font-inter, "Helvetica Neue", sans-serif)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        backgroundColor: C.white,
        borderBottom: `1px solid ${C.border}`,
        padding: '0 20px',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.muted, letterSpacing: '0.06em' }}>DEEP SOUTH DIRECTORY</span>
        <span style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{biz.name}</span>
      </div>

      {/* Tab bar */}
      <div style={{
        backgroundColor: C.white,
        borderBottom: `1px solid ${C.border}`,
        display: 'flex',
        flexShrink: 0,
        position: 'sticky',
        top: 56,
        zIndex: 29,
      }}>
        {(['chat', 'briefing', 'tasks'] as Tab[]).map((tab) => {
          const isActive = activeTab === tab;
          const label = tab === 'chat' ? 'Chat' : tab === 'briefing' ? 'Briefing' : 'Tasks';
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '14px 0 12px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? C.accent : C.textSec,
                fontFamily: 'inherit',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              {label}
              {/* New message dot for Chat */}
              {tab === 'chat' && activeTab !== 'chat' && (
                <span style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: C.accent,
                  display: 'inline-block',
                  marginTop: -4,
                }} />
              )}
              {/* Active underline */}
              {isActive && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '12%',
                  right: '12%',
                  height: 2,
                  backgroundColor: C.accent,
                  borderRadius: 2,
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* ── CHAT TAB ── */}
      {activeTab === 'chat' && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          // Account for top bar (56) + tab bar (~49) + input area (~72)
          // We let the messages scroll independently
        }}>
          {/* Message list */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 16px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            // Push content above fixed input
            paddingBottom: 90,
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {msg.isPhoto ? (
                  /* Photo bubble */
                  <div style={{
                    backgroundColor: C.userBubble,
                    borderRadius: '18px 18px 4px 18px',
                    overflow: 'hidden',
                    maxWidth: 180,
                  }}>
                    <div style={{
                      width: 180,
                      height: 120,
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: 4,
                    }}>
                      <span style={{ fontSize: 28 }}>📸</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Photo</span>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    maxWidth: '78%',
                    padding: '10px 14px',
                    borderRadius: msg.from === 'user'
                      ? '18px 18px 4px 18px'
                      : '18px 18px 18px 4px',
                    backgroundColor: msg.from === 'user' ? C.userBubble : C.aiBubble,
                    color: msg.from === 'user' ? '#FFFFFF' : C.text,
                    fontSize: 15,
                    lineHeight: 1.5,
                    boxShadow: msg.from === 'ai' ? `0 1px 3px rgba(0,0,0,0.07)` : 'none',
                    border: msg.from === 'ai' ? `1px solid ${C.border}` : 'none',
                  }}>
                    {msg.text}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isAITyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '18px 18px 18px 4px',
                  backgroundColor: C.aiBubble,
                  border: `1px solid ${C.border}`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
                  display: 'flex',
                  gap: 4,
                  alignItems: 'center',
                }}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        backgroundColor: C.muted,
                        display: 'inline-block',
                        animation: 'bounce 1.2s infinite',
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Fixed chat input */}
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: C.white,
            borderTop: `1px solid ${C.border}`,
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            zIndex: 20,
          }}>
            {/* Camera button */}
            <button
              onClick={handleCameraClick}
              disabled={isAITyping}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                border: `1px solid ${C.border}`,
                backgroundColor: C.white,
                cursor: isAITyping ? 'not-allowed' : 'pointer',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                opacity: isAITyping ? 0.5 : 1,
              }}
              aria-label="Send a photo"
            >
              📷
            </button>

            {/* Text input */}
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message..."
              disabled={isAITyping}
              style={{
                flex: 1,
                height: 40,
                borderRadius: 20,
                border: `1px solid ${C.border}`,
                padding: '0 16px',
                fontSize: 15,
                color: C.text,
                backgroundColor: C.bg,
                outline: 'none',
                fontFamily: 'inherit',
                opacity: isAITyping ? 0.6 : 1,
              }}
            />

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isAITyping}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                border: 'none',
                backgroundColor: inputText.trim() && !isAITyping ? C.accent : C.border,
                color: '#FFFFFF',
                cursor: inputText.trim() && !isAITyping ? 'pointer' : 'not-allowed',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background-color 0.15s',
              }}
              aria-label="Send message"
            >
              ↑
            </button>
          </div>
        </div>
      )}

      {/* ── BRIEFING TAB ── */}
      {activeTab === 'briefing' && (
        <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 20px', width: '100%' }}>
          {/* Greeting */}
          <div style={{ paddingTop: 40, paddingBottom: 24 }}>
            <h1 style={{ fontFamily: 'var(--font-abril, serif)', fontSize: 28, fontWeight: 700, color: C.text, margin: '0 0 8px' }}>
              {greeting}, {biz.owner.split(' ')[0]}.
            </h1>
            <p style={{ fontSize: 15, color: C.textSec, margin: 0, lineHeight: 1.5 }}>
              {visibleCards.length > 0
                ? `You have ${visibleCards.length} thing${visibleCards.length > 1 ? 's' : ''} that need${visibleCards.length === 1 ? 's' : ''} you today.`
                : 'You\'re all caught up. Nice work.'}
            </p>
          </div>

          {/* Decision Queue */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {visibleCards.map((card) => {
              const realIdx = morningBriefing.indexOf(card);
              return (
                <div key={realIdx} style={{
                  backgroundColor: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: '20px',
                  borderLeft: card.type === 'action' ? `3px solid ${C.accent}` : card.type === 'idea' ? `3px solid ${C.green}` : `3px solid ${C.border}`,
                }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: card.type === 'action' ? C.accent : card.type === 'idea' ? C.green : C.muted, margin: '0 0 8px', textTransform: 'uppercase' as const }}>
                    {card.type === 'action' ? 'Needs You' : card.type === 'idea' ? 'Opportunity' : 'Insight'}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: '0 0 6px' }}>{card.title}</p>
                  <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, margin: '0 0 16px' }}>{card.body}</p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {card.actions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => {
                          if (action.label === 'Open Camera') {
                            setShowPhotoResult(true);
                            setTimeout(() => setDismissed(d => [...d, realIdx]), 300);
                          } else {
                            setDismissed(d => [...d, realIdx]);
                          }
                        }}
                        style={{
                          padding: '10px 18px',
                          borderRadius: 8,
                          border: action.primary ? 'none' : `1px solid ${C.border}`,
                          backgroundColor: action.primary ? C.accent : 'transparent',
                          color: action.primary ? '#fff' : C.text,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Photo Result Card */}
          {showPhotoResult && (
            <div style={{
              backgroundColor: C.white, border: `1px solid ${C.green}`, borderRadius: 12,
              padding: 20, marginTop: 14, borderLeft: `3px solid ${C.green}`,
            }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: C.green, margin: '0 0 8px', textTransform: 'uppercase' as const }}>Photo Analyzed</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: '0 0 6px' }}>Storefront — {biz.name}</p>
              <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, margin: '0 0 12px' }}>One photo. Six outputs. Ready to go:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                {[
                  'Post to Instagram with caption',
                  'Post to Facebook with caption',
                  'Update website gallery',
                  'Save for email newsletter',
                  'Update Google Business Profile photo',
                  'Tag for Deep South Directory tourism feed',
                ].map(item => (
                  <p key={item} style={{ fontSize: 13, color: C.text, margin: 0, paddingLeft: 16 }}>&#x2713; {item}</p>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setShowPhotoResult(false)} style={{
                  padding: '10px 18px', borderRadius: 8, border: 'none',
                  backgroundColor: C.green, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  Approve All &amp; Do It
                </button>
                <button onClick={() => setShowPhotoResult(false)} style={{
                  padding: '10px 18px', borderRadius: 8, border: `1px solid ${C.border}`,
                  backgroundColor: 'transparent', color: C.text, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  Edit First
                </button>
              </div>
            </div>
          )}

          {/* All caught up state */}
          {visibleCards.length === 0 && !showPhotoResult && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ fontSize: 40, margin: '0 0 12px' }}>&#x2713;</p>
              <p style={{ fontSize: 15, color: C.textSec, margin: 0 }}>Nothing needs you right now. Go run your business.</p>
            </div>
          )}

          {/* Upgrade prompt */}
          <div style={{
            backgroundColor: C.accentBg, border: `1px solid rgba(180,83,9,0.15)`,
            borderRadius: 12, padding: '20px', marginTop: 32, textAlign: 'center',
          }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 4px' }}>
              This is the free tier. You get 100 AI actions per month.
            </p>
            <p style={{ fontSize: 13, color: C.textSec, margin: '0 0 12px' }}>
              Upgrade to $20/mo and it does all the cool stuff you don&apos;t know how to do. Take a photo. Watch what happens.
            </p>
            <button style={{
              padding: '10px 24px', borderRadius: 8, border: 'none',
              backgroundColor: C.accent, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Start 7-Day Free Trial — $20/mo
            </button>
          </div>

          {/* Footer */}
          <div style={{ padding: '32px 0', textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Deep South Directory — Measurably Better</p>
          </div>
        </div>
      )}

      {/* ── TASKS TAB ── */}
      {activeTab === 'tasks' && (
        <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 20px', width: '100%' }}>
          <div style={{ paddingTop: 32, paddingBottom: 12 }}>
            <h2 style={{ fontFamily: 'var(--font-abril, serif)', fontSize: 22, fontWeight: 700, color: C.text, margin: '0 0 4px' }}>
              Your Tasks
            </h2>
            <p style={{ fontSize: 14, color: C.textSec, margin: 0 }}>
              {tasks.filter(t => !t.done).length} remaining
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  backgroundColor: task.done ? 'transparent' : C.white,
                  border: `1px solid ${task.done ? 'transparent' : C.border}`,
                  borderRadius: 10,
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transition: 'all 0.2s',
                }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    border: task.done ? 'none' : `2px solid ${C.border}`,
                    backgroundColor: task.done ? C.green : 'transparent',
                    cursor: 'pointer',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    color: '#fff',
                    fontWeight: 700,
                  }}
                  aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.done ? '✓' : ''}
                </button>

                {/* Label */}
                <span style={{
                  flex: 1,
                  fontSize: 14,
                  color: task.done ? C.muted : C.text,
                  textDecoration: task.done ? 'line-through' : 'none',
                  lineHeight: 1.4,
                }}>
                  {task.label}
                </span>

                {/* Send to Chat */}
                {!task.done && (
                  <button
                    onClick={() => sendTaskToChat(task.label)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 6,
                      border: `1px solid ${C.border}`,
                      backgroundColor: 'transparent',
                      color: C.accent,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    Chat →
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Upgrade prompt */}
          <div style={{
            backgroundColor: C.accentBg, border: `1px solid rgba(180,83,9,0.15)`,
            borderRadius: 12, padding: '20px', marginTop: 32, textAlign: 'center',
          }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 4px' }}>
              This is the free tier. You get 100 AI actions per month.
            </p>
            <p style={{ fontSize: 13, color: C.textSec, margin: '0 0 12px' }}>
              Upgrade to $20/mo and it does all the cool stuff you don&apos;t know how to do. Take a photo. Watch what happens.
            </p>
            <button style={{
              padding: '10px 24px', borderRadius: 8, border: 'none',
              backgroundColor: C.accent, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Start 7-Day Free Trial — $20/mo
            </button>
          </div>

          <div style={{ padding: '32px 0', textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Deep South Directory — Measurably Better</p>
          </div>
        </div>
      )}

      {/* Bounce animation for typing dots */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
