'use client';

// Deep South Directory — first-time dashboard
// Reads business name from localStorage. If none, redirects to /directory/join.
// This is the page that sells the $20 upgrade.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const C = {
  bg: '#FAFAF8',
  white: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  accent: '#B45309',
  accentHover: '#92400E',
  accentBg: 'rgba(180,83,9,0.07)',
  border: '#E5E5E0',
  green: '#16A34A',
  greenBg: '#DCFCE7',
  yellow: '#CA8A04',
  yellowBg: '#FEF9C3',
  red: '#DC2626',
  redBg: '#FEE2E2',
};

const UPGRADE_FEATURES = [
  'Connect your QuickBooks → see your real P&L',
  'Daily AI briefing → know what changed overnight',
  'Review monitoring → get alerted when someone mentions you',
  'Marketing autopilot → AI writes your social posts',
];

const CHAT_SUGGESTIONS = [
  'How do my reviews compare?',
  'What should I post this week?',
  'Who\'s my top competitor?',
];

const SAMPLE_RESPONSES: Record<string, string> = {
  'How do my reviews compare?':
    'Your Google rating is 4.2 stars across 15 reviews — solid, but your top competitor, The Natchez Trading Post, sits at 4.7 with 47 reviews. Their advantage is recency: 12 reviews in the last 90 days vs. your 2. One new review a week for two months would close that gap significantly. Want me to draft a follow-up message you can text to recent customers?',
  'What should I post this week?':
    'This week, lean into the corridor traffic. Memorial Day weekend travelers start booking now. Post a single photo of your storefront with the caption: "We\'re on the Deep South Touring Route — stop in if you\'re driving through Natchez." Tag @DeepSouthDirectory. That one post typically drives 3-5 new directory profile views. Want me to write the full caption?',
  "Who's my top competitor?":
    'In your category in Natchez, your strongest competitor is The Natchez Trading Post at 4.7 stars / 47 reviews. They rank #1 in Google Maps for your search terms. Second is Magnolia Mercantile at 4.4 / 29 reviews. You\'re currently #4. The gap is mostly review volume, not quality — your average rating is only 0.5 below the leader. This is closeable.',
};

type ScoreIndicatorProps = { score: number };

function ScoreIndicator({ score }: ScoreIndicatorProps) {
  const color =
    score >= 70 ? C.green : score >= 40 ? C.yellow : C.red;
  const bg =
    score >= 70 ? C.greenBg : score >= 40 ? C.yellowBg : C.redBg;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        backgroundColor: bg,
        color: color,
        fontSize: 13,
        fontWeight: 700,
        padding: '3px 10px',
        borderRadius: 20,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: color,
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      {score}/100
    </span>
  );
}

type CardProps = { children: React.ReactNode; style?: React.CSSProperties };

function Card({ children, style }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: '24px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function DirectoryDashboard() {
  const router = useRouter();
  const [bizData, setBizData] = useState<{
    businessName: string;
    yourName: string;
    city: string;
  } | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [queriesUsed, setQueriesUsed] = useState(13);

  useEffect(() => {
    const raw = localStorage.getItem('dsd_business');
    if (!raw) {
      router.push('/directory/join');
      return;
    }
    try {
      setBizData(JSON.parse(raw));
    } catch {
      router.push('/directory/join');
    }
  }, [router]);

  const handleSuggestion = (suggestion: string) => {
    setChatInput(suggestion);
    triggerResponse(suggestion);
  };

  const triggerResponse = (question: string) => {
    const response =
      SAMPLE_RESPONSES[question] ||
      'Great question. Connect your data sources to unlock detailed analysis. On the free tier, I can see your public review data and directory presence — upgrade to $20/mo to connect QuickBooks and get answers backed by your real numbers.';

    setChatLoading(true);
    setChatResponse('');
    setTimeout(() => {
      setChatLoading(false);
      setChatResponse(response);
      setQueriesUsed((prev) => prev + 1);
    }, 900);
  };

  const handleChatSubmit = () => {
    const q = chatInput.trim();
    if (!q) return;
    triggerResponse(q);
  };

  if (!bizData) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: C.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ color: C.textMuted, fontFamily: 'var(--font-inter), sans-serif' }}>
          Loading...
        </p>
      </div>
    );
  }

  const { businessName, city } = bizData;
  const queriesRemaining = 100 - queriesUsed;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        fontFamily: 'var(--font-inter), sans-serif',
        color: C.text,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          backgroundColor: C.white,
          borderBottom: `1px solid ${C.border}`,
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky' as const,
          top: 0,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-abril), serif',
            fontSize: 18,
            fontWeight: 400,
            color: C.text,
          }}
        >
          Deep South Directory
        </span>
        <span
          style={{
            fontSize: 14,
            color: C.textSecondary,
            fontWeight: 500,
            maxWidth: '50%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap' as const,
          }}
        >
          {businessName}
        </span>
      </div>

      <div
        style={{
          maxWidth: 1040,
          margin: '0 auto',
          padding: '32px 20px 80px',
        }}
      >

        {/* Section 1: Your Snapshot */}
        <div style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontFamily: 'var(--font-abril), serif',
              fontSize: 24,
              fontWeight: 400,
              color: C.text,
              margin: '0 0 6px',
            }}
          >
            Your Snapshot
          </h2>
          <p style={{ fontSize: 14, color: C.textMuted, margin: '0 0 20px' }}>
            Free tier &mdash; public data only
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: 16,
            }}
          >
            {/* Google Presence */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: C.textMuted, margin: 0 }}>
                  Google Presence
                </p>
                <ScoreIndicator score={72} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-abril), serif',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 400,
                  color: C.text,
                  margin: '0 0 10px',
                  lineHeight: 1,
                }}
              >
                72/100
              </p>
              <p style={{ fontSize: 14, color: C.textSecondary, margin: 0, lineHeight: 1.55 }}>
                Your Google Business Profile has 15 reviews. Your top competitor has 47.
              </p>
            </Card>

            {/* Online Visibility */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: C.textMuted, margin: 0 }}>
                  Online Visibility
                </p>
                <ScoreIndicator score={45} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-abril), serif',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 400,
                  color: C.text,
                  margin: '0 0 10px',
                  lineHeight: 1,
                }}
              >
                45/100
              </p>
              <p style={{ fontSize: 14, color: C.textSecondary, margin: 0, lineHeight: 1.55 }}>
                Found on 3 of 8 major platforms. Missing: Booking.com, Expedia, TripAdvisor.
              </p>
            </Card>

            {/* Local Ranking */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: C.textMuted, margin: 0 }}>
                  Local Ranking
                </p>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.yellow,
                    backgroundColor: C.yellowBg,
                    padding: '3px 10px',
                    borderRadius: 20,
                  }}
                >
                  #4 in {city}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-abril), serif',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 400,
                  color: C.text,
                  margin: '0 0 10px',
                  lineHeight: 1,
                }}
              >
                #4
              </p>
              <p style={{ fontSize: 14, color: C.textSecondary, margin: 0, lineHeight: 1.55 }}>
                #4 in your category in {city}. #1 has 3&times; more reviews.
              </p>
            </Card>
          </div>
        </div>

        {/* Section 2: Upgrade prompt */}
        <div style={{ marginBottom: 40 }}>
          <Card
            style={{
              borderColor: C.accent,
              borderWidth: 1,
              borderTopWidth: 3,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' as const }}>
              <div style={{ flex: '1 1 280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 22 }}>🔒</span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-abril), serif',
                      fontSize: 20,
                      fontWeight: 400,
                      color: C.text,
                      margin: 0,
                    }}
                  >
                    What $20/mo unlocks
                  </h2>
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {UPGRADE_FEATURES.map((feat) => (
                    <li
                      key={feat}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        marginBottom: 12,
                        fontSize: 15,
                        color: C.text,
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          backgroundColor: C.accentBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        <span style={{ fontSize: 10, color: C.accent, fontWeight: 700 }}>✓</span>
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  flex: '0 0 auto',
                  display: 'flex',
                  flexDirection: 'column' as const,
                  alignItems: 'flex-start',
                  gap: 12,
                  paddingTop: 4,
                }}
              >
                <button
                  style={{
                    backgroundColor: C.accent,
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontWeight: 600,
                    fontSize: 16,
                    padding: '14px 28px',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap' as const,
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.accentHover;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.accent;
                  }}
                >
                  Start 7-Day Free Trial — $20/mo
                </button>
                <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>
                  Same price as ChatGPT. Except this one reads your books.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Section 3: Directory listing preview */}
        <div style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontFamily: 'var(--font-abril), serif',
              fontSize: 24,
              fontWeight: 400,
              color: C.text,
              margin: '0 0 6px',
            }}
          >
            Your Directory Listing
          </h2>
          <p style={{ fontSize: 14, color: C.textMuted, margin: '0 0 20px' }}>
            Free &mdash; live right now
          </p>

          <Card>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap' as const,
                gap: 12,
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-abril), serif',
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                    fontWeight: 400,
                    color: C.text,
                    margin: '0 0 6px',
                  }}
                >
                  {businessName}
                </h3>
                <p style={{ fontSize: 15, color: C.textSecondary, margin: '0 0 4px' }}>
                  {city} &middot; Local Business
                </p>
                <p style={{ fontSize: 14, color: C.textMuted, margin: 0 }}>
                  Listed on DeepSouthDirectory.com
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end', gap: 8 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    backgroundColor: C.greenBg,
                    color: C.green,
                    fontSize: 13,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 20,
                  }}
                >
                  <span style={{ fontSize: 12 }}>✓</span>
                  Claimed
                </span>
                <p style={{ fontSize: 13, color: C.textMuted, margin: 0, textAlign: 'right' as const }}>
                  Listing is live on the corridor
                </p>
              </div>
            </div>

            {/* Mock listing preview bar */}
            <div
              style={{
                marginTop: 20,
                borderTop: `1px solid ${C.border}`,
                paddingTop: 16,
                display: 'flex',
                gap: 24,
                flexWrap: 'wrap' as const,
              }}
            >
              {[
                { label: 'Views this month', value: '—' },
                { label: 'Direction requests', value: '—' },
                { label: 'Phone clicks', value: '—' },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' as const }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-abril), serif',
                      fontSize: 22,
                      fontWeight: 400,
                      color: C.textMuted,
                      margin: '0 0 2px',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 12, color: C.textMuted, margin: 0 }}>{stat.label}</p>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ fontSize: 12, color: C.textMuted, margin: 0, fontStyle: 'italic' as const }}>
                  Live analytics available on $20 plan
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Section 4: AI Chat */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-abril), serif',
              fontSize: 24,
              fontWeight: 400,
              color: C.text,
              margin: '0 0 6px',
            }}
          >
            AI Chat
          </h2>
          <p style={{ fontSize: 14, color: C.textMuted, margin: '0 0 20px' }}>
            100 free queries/mo &mdash; {queriesRemaining} remaining
          </p>

          <Card>
            {/* Suggestion chips */}
            {!chatResponse && !chatLoading && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap' as const,
                  gap: 8,
                  marginBottom: 20,
                }}
              >
                {CHAT_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    style={{
                      backgroundColor: C.accentBg,
                      color: C.accent,
                      border: `1px solid rgba(180,83,9,0.2)`,
                      borderRadius: 20,
                      padding: '7px 14px',
                      fontSize: 14,
                      fontFamily: 'var(--font-inter), sans-serif',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        'rgba(180,83,9,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.accentBg;
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Chat response area */}
            {(chatLoading || chatResponse) && (
              <div
                style={{
                  backgroundColor: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  padding: '16px 18px',
                  marginBottom: 16,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: C.text,
                  minHeight: 60,
                }}
              >
                {chatLoading ? (
                  <span style={{ color: C.textMuted, fontStyle: 'italic' as const }}>
                    Thinking...
                  </span>
                ) : (
                  <>
                    <p style={{ fontSize: 12, fontWeight: 600, color: C.accent, textTransform: 'uppercase' as const, letterSpacing: '0.06em', margin: '0 0 8px' }}>
                      Deep South Directory AI
                    </p>
                    {chatResponse}
                  </>
                )}
              </div>
            )}

            {/* Input row */}
            <div
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-end',
              }}
            >
              <input
                type="text"
                placeholder="Ask anything about your business..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleChatSubmit(); }}
                style={{
                  flex: 1,
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 15,
                  padding: '11px 14px',
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  backgroundColor: C.bg,
                  color: C.text,
                  outline: 'none',
                  transition: 'border-color 0.15s ease',
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = C.accent;
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = C.border;
                }}
              />
              <button
                onClick={handleChatSubmit}
                style={{
                  backgroundColor: C.accent,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 8,
                  padding: '11px 20px',
                  fontSize: 15,
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 600,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.accentHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.accent;
                }}
              >
                Ask
              </button>
            </div>

            <div
              style={{
                marginTop: 14,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap' as const,
                gap: 8,
              }}
            >
              <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>
                {queriesRemaining} free queries remaining this month
              </p>
              <a
                href="#upgrade"
                style={{
                  fontSize: 13,
                  color: C.accent,
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Upgrade for unlimited →
              </a>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
