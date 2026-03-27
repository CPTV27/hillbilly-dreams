'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Zap, Server, Lock, Activity, CheckCircle2, AlertTriangle, Layers, Database } from 'lucide-react';

// Color tokens now provided by .theme-mb in tokens.css via layout.tsx
// Semantic aliases for inline styles referencing CSS variables
const C = {
  white: 'var(--bg)',
  bg: 'var(--bg)',
  surface: 'var(--surface)',
  surface2: 'var(--surface-2)',
  surface3: 'var(--surface-3)',
  text: 'var(--text)',
  textMuted: 'var(--text-muted)',
  textDisabled: 'var(--text-disabled)',
  accent: 'var(--accent)',
  accentHover: 'var(--accent-hover)',
  accentMuted: 'var(--accent-muted)',
  accentSubtle: 'var(--accent-subtle)',
  border: 'var(--border)',
  success: 'var(--success)',
  warning: 'var(--warning)',
  error: 'var(--error)',
};

// ─────────────────────────────────────────────────────────────
// Animation Hooks
// ─────────────────────────────────────────────────────────────
function useAnimatedNumber(value: number, duration: number = 600) {
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const initialValue = current;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setCurrent(initialValue + (value - initialValue) * easeProgress);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return current;
}

export default function TechnologyPage() {
  // Calculator State
  const [dailyQueries, setDailyQueries] = useState(250);
  const [tokensPerQuery, setTokensPerQuery] = useState(8); // Representing 8,000 to keep slider simple
  const [dataSensitivity, setDataSensitivity] = useState<'Standard' | 'Proprietary' | 'Financial'>('Standard');

  // Math for Interactive Impact Calculator
  const consumerSecondsPerQuery = 1.5 + ((tokensPerQuery * 1000) / 40);
  const sovereignSecondsPerQuery = 0.085 + ((tokensPerQuery * 1000) / 150);
  const rawHoursSaved = (dailyQueries * (consumerSecondsPerQuery - sovereignSecondsPerQuery)) / 3600;
  
  // Smooth animated ticks
  const animatedHoursSaved = useAnimatedNumber(rawHoursSaved);
  const animatedTokens = useAnimatedNumber(tokensPerQuery * 1000);
  const animatedQueries = useAnimatedNumber(dailyQueries);

  // Risk Assessment
  const isHighRisk = dataSensitivity === 'Financial' || dataSensitivity === 'Proprietary';

  return (
    <div style={{ backgroundColor: C.surface, minHeight: '100vh', fontFamily: 'var(--font-body)', color: C.text, overflowX: 'hidden' }}>
      
      {/* ── Keyframes for Micro-Animations ── */}
      <style>{`
        @keyframes pulseRisk {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.2); }
          70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>

      {/* ── Navigation Strip ── */}
      <nav style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.border}`, padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Measurably Better Logo (Abstract up-trend 'M') */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px' }}>
            <rect x="2" y="14" width="5.5" height="8" rx="2" fill={C.accent} opacity="0.6" />
            <rect x="9.5" y="8" width="5.5" height="14" rx="2" fill={C.accent} opacity="0.8" />
            <rect x="17" y="2" width="5.5" height="20" rx="2" fill={C.accent} opacity="1" />
          </svg>
          <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em' }}>
            Measurably Better.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="/measurably-better" style={{ color: C.textMuted, textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Product</a>
          <a href="#" style={{ color: C.accentHover, textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>Technology</a>
          <a href="/api/auth/signin" style={{ backgroundColor: C.accent, color: C.white, padding: '8px 16px', borderRadius: '6px', fontWeight: 600, fontSize: '14px', textDecoration: 'none', transition: 'background-color 0.2s' }}>Sign In</a>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        
        {/* ── Hero section ── */}
        <header style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: C.accentSubtle, color: C.accentHover, padding: '6px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px' }}>
            <Server size={14} /> The Agentic Advantage
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '24px', color: C.text }}>
            Stop paying for fragmented AI.<br />Consolidate into one Agentic Engine.
          </h1>
          <p style={{ fontSize: '20px', color: C.textMuted, lineHeight: 1.6, fontWeight: 500 }}>
            Standard AI chatbots are built for the masses—meaning slow speeds, usage limits, and scattered monthly bills. Measurably Better provides a dedicated, high-speed agentic workflow that replaces your entire AI stack.
          </p>
        </header>

        {/* ── Side-by-Side Benchmark Matrix ── */}
        <section style={{ marginBottom: '120px' }}>
          <div style={{ backgroundColor: C.white, borderRadius: '24px', border: `1px solid ${C.border}`, overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(15,23,42,0.05)' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ padding: '32px 48px', backgroundColor: C.surface, borderRight: `1px solid ${C.border}` }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: C.textMuted }}>Consumer Chatbots</h2>
                <p style={{ color: C.textDisabled, marginTop: '8px' }}>Individual subscriptions to fragmented web tools.</p>
              </div>
              <div style={{ padding: '32px 48px', backgroundColor: C.accentSubtle, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '4px', width: '100%', backgroundColor: C.accent }} />
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: C.accentHover }}>Measurably Better</h2>
                <p style={{ color: C.accentHover, marginTop: '8px', opacity: 0.8 }}>One unified, sovereign agentic workflow.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ComparisonRow 
                icon={<Activity />}
                label="Response Speed (Latency)"
                consumer="~1,400ms base" consumerSub="Bogs down when talking to external apps."
                sovereign="~85ms base" sovereignSub="Connects directly from your secure browser."
                winner="sovereign"
              />
              <ComparisonRow 
                icon={<Zap />}
                label="Processing Power (Throughput)"
                consumer="40–60 tokens/sec" consumerSub="Slows down during peak business hours."
                sovereign="120–180 tokens/sec" sovereignSub="Dedicated, unthrottled Google Cloud processing."
                winner="sovereign"
              />
              <ComparisonRow 
                icon={<Shield />}
                label="Data Privacy & Training"
                consumer="Trains Public Models" consumerSub="Your private data is ingested into their multi-tenant pools."
                sovereign="Private Enterprise Learning" sovereignSub="Our system learns from everything. You train your own dedicated AI."
                winner="sovereign"
              />
              <ComparisonRow 
                icon={<Database />}
                label="Dedicated Access"
                consumer="Shared Usage Caps" consumerSub="You get cut off when the global network is congested."
                sovereign="Guaranteed Monthly Tokens" sovereignSub="You receive a dedicated allotment of monthly tokens purely for your agents."
                winner="sovereign"
              />
              <ComparisonRow 
                icon={<Layers />}
                label="Memory (Context Window)"
                consumer="32k – 128k Tokens" consumerSub="Frequently forgets early instructions or truncates PDFs."
                sovereign="1,048,576 Tokens" sovereignSub="Analyze 5+ years of ledgers or a 1,500-page manual flawlessly."
                winner="sovereign"
              />
            </div>
            
          </div>
        </section>

        {/* ── Interactive Impact Calculator ── */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: '40px' }}>
            Calculate Your Structural Impact
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
            
            {/* Controls */}
            <div style={{ backgroundColor: C.white, borderRadius: '24px', padding: '40px', border: `1px solid ${C.border}`, boxShadow: '0 10px 30px -10px rgba(15,23,42,0.05)' }}>
              
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <label style={{ fontWeight: 700, fontSize: '15px' }}>Daily AI Tasks</label>
                  <span style={{ fontWeight: 800, color: C.accent }}>{Math.round(animatedQueries)} tasks/day</span>
                </div>
                <input 
                  type="range" min="10" max="1000" step="10" value={dailyQueries} 
                  onChange={(e) => setDailyQueries(parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', accentColor: C.accent }}
                />
                <p style={{ fontSize: '13px', color: C.textMuted, marginTop: '8px' }}>How many documents, requests, or actions you and your team trigger per day.</p>
              </div>

              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <label style={{ fontWeight: 700, fontSize: '15px' }}>Amount of Data to Analyze</label>
                  <span style={{ fontWeight: 800, color: C.accent }}>{Math.round(animatedTokens).toLocaleString()} tokens</span>
                </div>
                <input 
                  type="range" min="1" max="150" step="1" value={tokensPerQuery} 
                  onChange={(e) => setTokensPerQuery(parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', accentColor: C.accent }}
                />
                <p style={{ fontSize: '13px', color: C.textMuted, marginTop: '8px' }}>The size of data in each task (1 token ≈ 4 characters). 100k+ is equivalent to a 200-page book.</p>
              </div>

              <div>
                <label style={{ fontWeight: 700, fontSize: '15px', display: 'block', marginBottom: '16px' }}>Data Sensitivity</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Standard', 'Proprietary', 'Financial'].map(level => (
                    <button 
                      key={level}
                      onClick={() => setDataSensitivity(level as any)}
                      style={{ 
                        flex: 1, padding: '12px', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
                        backgroundColor: dataSensitivity === level ? (level === 'Standard' ? C.text : level === 'Proprietary' ? C.warning : C.error) : C.surface,
                        color: dataSensitivity === level ? C.white : C.textMuted,
                        border: `1px solid ${dataSensitivity === level ? 'transparent' : C.border}`
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Live Outputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div style={{ backgroundColor: C.accent, color: C.white, borderRadius: '24px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.1 }}>
                  <Zap size={140} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9, marginBottom: '8px' }}>
                  Time Reclaimed Per Day
                </div>
                <div style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {animatedHoursSaved >= 0.1 ? animatedHoursSaved.toFixed(1) : '< 0.1'} <span style={{ fontSize: '20px', fontWeight: 600 }}>hrs/day</span>
                </div>
                <p style={{ marginTop: '16px', fontSize: '14px', lineHeight: 1.5, opacity: 0.9 }}>
                  Saved directly from eliminating slow consumer AI generation speeds and connection timeouts.
                </p>
              </div>

              <div style={{ 
                backgroundColor: C.white, 
                border: `1px solid ${isHighRisk ? C.error : C.success}`, 
                borderRadius: '24px', 
                padding: '32px', 
                transition: 'all 0.4s ease-out',
                boxShadow: isHighRisk ? '0 8px 30px rgba(239, 68, 68, 0.15)' : '0 4px 20px rgba(34, 197, 94, 0.08)',
                animation: isHighRisk ? 'pulseRisk 2s infinite' : 'none'
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: isHighRisk ? C.error : C.success, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.4s ease-out' }}>
                  {isHighRisk ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />} 
                  Data Security Status
                </div>
                <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: C.text, lineHeight: 1.1 }}>
                  {isHighRisk ? 'High Risk' : 'Fully Private'}
                </div>
                <p style={{ marginTop: '12px', fontSize: '14px', lineHeight: 1.5, color: C.textMuted }}>
                  {isHighRisk 
                    ? `Entering private data into standard AI tools trains their public models. Measurably Better lets you train your own secure, unified system where every token deployed actively improves your private workflows.` 
                    : `Your data remains securely isolated on your own dedicated Google Cloud infrastructure as the system learns.`}
                </p>
              </div>
              
            </div>

          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: '48px 24px', textAlign: 'center', backgroundColor: C.white }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: C.textDisabled, fontSize: '14px', fontWeight: 500 }}>
          <Lock size={14} /> Runs securely on Google Cloud infrastructure.
        </div>
        <div style={{ marginTop: '16px', color: C.textDisabled, fontSize: '13px', fontWeight: 500 }}>
          © 2026 Measurably Better™. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function ComparisonRow({ icon, label, consumer, consumerSub, sovereign, sovereignSub, winner }: any) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${C.border}` }}>
      
      {/* Consumer Col */}
      <div style={{ padding: '32px 48px', borderRight: `1px solid ${C.border}`, opacity: 0.6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: C.textMuted }}>
          {icon} <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
        </div>
        <div style={{ fontSize: '24px', fontWeight: 700, color: C.text }}>{consumer}</div>
        <div style={{ fontSize: '14px', color: C.textMuted, marginTop: '8px', lineHeight: 1.5 }}>{consumerSub}</div>
      </div>

      {/* Sovereign Col */}
      <div style={{ padding: '32px 48px', backgroundColor: winner === 'sovereign' ? C.white : 'transparent', position: 'relative' }}>
        {winner === 'sovereign' && (
          <div style={{ position: 'absolute', top: '32px', right: '48px', color: C.success }}>
            <CheckCircle2 size={24} />
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: C.accentHover }}>
          {icon} <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
        </div>
        <div style={{ fontSize: '24px', fontWeight: 800, color: C.text }}>{sovereign}</div>
        <div style={{ fontSize: '14px', color: C.textMuted, marginTop: '8px', lineHeight: 1.5, fontWeight: 500 }}>{sovereignSub}</div>
      </div>

    </div>
  );
}
