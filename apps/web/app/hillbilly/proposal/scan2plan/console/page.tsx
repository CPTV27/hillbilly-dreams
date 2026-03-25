'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────
// Color Tokens — Light / Google Anti-Gravity Inspired
// ─────────────────────────────────────────────────────────────
const C = {
  bg: '#ffffff',
  bgGradient: '#f8f9fa',
  surface: '#ffffff',
  surfaceSolid: '#ffffff',
  surfaceHover: '#f1f3f4',
  border: '#e8eaed',
  borderLight: '#f1f3f4',
  text: '#202124',
  textSecondary: '#5f6368',
  textTertiary: '#9aa0a6',
  blue: '#1a73e8',
  blueLight: '#e8f0fe',
  blueBorder: 'rgba(26, 115, 232, 0.2)',
  green: '#1e8e3e',
  greenLight: '#e6f4ea',
  greenDark: '#137333',
  orange: '#e37400',
  orangeLight: '#fef7e0',
  red: '#d93025',
  redLight: '#fce8e6',
  shadowSubtle: '0 4px 24px rgba(0,0,0,0.03)',
  shadowFloating: '0 12px 48px rgba(0,0,0,0.06)',
  glowBlue: '0 0 0 4px rgba(26,115,232,0.1)',
};

// ─────────────────────────────────────────────────────────────
// JV Parameters
// ─────────────────────────────────────────────────────────────
const JV = {
  coreNode: 5_000,
  growthModule: 1_000,
  year1Total: 63_000,
  hdxCommission: 7,
  hdxCommissionTier2: 5,
  baseRevenue: 1_120_000,
  outsideServices: 358_000,
  baseNetIncome: 261_000,
};

// ─────────────────────────────────────────────────────────────
// Capabilities — interactive onboarding cards
// ─────────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    id: 'financial',
    title: 'Financial Tracking',
    desc: 'Automated P&L, margin recovery, cost monitoring',
    detail: 'Every invoice, quote, and payment syncs automatically from QuickBooks. Your formulas are already here — margin calculations, overhead allocation, revenue projections — but they update in real time instead of waiting for someone to run a spreadsheet.',
    icon: '$',
    question: 'Walk me through the margin recovery math',
  },
  {
    id: 'estimating',
    title: 'Estimating Automation',
    desc: 'AI-powered takeoffs, historical cost matching',
    detail: 'Upload a plan set and the AI extracts quantities, matches against your historical cost database, and produces an estimate. Same formulas your team uses — square footage rates, material multipliers, labor factors — but processed in minutes instead of hours.',
    icon: '\u25B3',
    question: 'How does the AI estimating actually work?',
  },
  {
    id: 'pipeline',
    title: 'Project Pipeline',
    desc: 'Every project tracked from lead to closeout',
    detail: 'Your entire pipeline in one view. New leads, active bids, projects in progress, completed jobs. The system tracks conversion rates and flags stalled projects automatically. No more checking three different places.',
    icon: '\u25C9',
    question: 'Show me what the project pipeline looks like',
  },
  {
    id: 'scheduling',
    title: 'Scheduling & Capacity',
    desc: 'Know your bandwidth before you say yes',
    detail: 'The system knows your team capacity and current commitments. Before you take on a new project, it shows you the real impact on your schedule. Overbooking becomes impossible because the math is always current.',
    icon: '\u2630',
    question: 'How does capacity planning work?',
  },
  {
    id: 'reporting',
    title: 'Executive Reporting',
    desc: 'Ask a question, get the answer. No digging.',
    detail: 'Instead of running reports, just ask. "What was our margin on commercial projects last quarter?" The AI pulls from your actual data and gives you the number. That\'s the console you\'re about to use.',
    icon: '\u2B22',
    question: 'What kind of questions can I ask the AI?',
  },
];

// ─────────────────────────────────────────────────────────────
// Main — Onboarding → Console
// ─────────────────────────────────────────────────────────────
export default function CEOConsole() {
  const [onboarded, setOnboarded] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);

  if (!onboarded) {
    return <Onboarding onComplete={(selected) => { setInterests(selected); setOnboarded(true); }} />;
  }

  return <ConsoleApp interests={interests} />;
}

// ─────────────────────────────────────────────────────────────
// Onboarding Flow (3 steps)
// ─────────────────────────────────────────────────────────────
function Onboarding({ onComplete }: { onComplete: (interests: string[]) => void }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const selectedCaps = CAPABILITIES.filter(c => selected.includes(c.id));

  // Step 0: Welcome
  if (step === 0) {
    return (
      <div style={{ minHeight: '100vh', background: C.bgGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, fontFamily: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div style={{ maxWidth: 620, width: '100%', textAlign: 'center', animation: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {/* Floating orb */}
          <div style={{
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 40px',
            background: 'linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)',
            boxShadow: '0 12px 40px rgba(26,115,232,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'float 6s ease-in-out infinite',
          }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#fff', opacity: 0.8 }} />
          </div>

          <h1 style={{ fontSize: 44, fontWeight: 400, color: C.text, margin: '0 0 16px', letterSpacing: '-0.03em' }}>
            Welcome to your console.
          </h1>
          <p style={{ fontSize: 22, color: C.textSecondary, margin: '0 0 48px', lineHeight: 1.6 }}>
            Let&apos;s set it up for what matters to your business. Takes about 30 seconds.
          </p>

          <button onClick={() => setStep(1)}
            style={{
              backgroundColor: C.blue, color: '#fff', border: 'none',
              padding: '18px 56px', borderRadius: 28, fontSize: 20, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 8px 24px rgba(26,115,232,0.3)',
              transition: 'all 0.2s',
            }}>
            Get Started
          </button>

          <style>{`
            @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          `}</style>
        </div>
      </div>
    );
  }

  // Step 1: What do you want?
  if (step === 1) {
    return (
      <div style={{ minHeight: '100vh', background: C.bgGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, fontFamily: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div style={{ maxWidth: 700, width: '100%', animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.blue, marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Step 1 of 2
            </p>
            <h1 style={{ fontSize: 40, fontWeight: 400, color: C.text, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              What do you want from your system?
            </h1>
            <p style={{ fontSize: 20, color: C.textSecondary, margin: 0, lineHeight: 1.6 }}>
              Select everything that matters. We do all of this — it&apos;s already wired up.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
            {CAPABILITIES.map(cap => {
              const active = selected.includes(cap.id);
              return (
                <button key={cap.id} onClick={() => toggle(cap.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 20, padding: '22px 28px',
                    borderRadius: 20, border: `2px solid ${active ? C.blue : C.border}`,
                    backgroundColor: active ? C.blueLight : '#ffffff', cursor: 'pointer',
                    fontFamily: 'inherit', transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: active ? '0 4px 16px rgba(26,115,232,0.12)' : C.shadowSubtle,
                    textAlign: 'left',
                  }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: active ? C.blue : '#f8f9fa', color: active ? '#fff' : C.textTertiary,
                    fontSize: 24, fontWeight: 700, flexShrink: 0, transition: 'all 0.2s',
                  }}>
                    {cap.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: C.text, marginBottom: 2 }}>{cap.title}</div>
                    <div style={{ fontSize: 16, color: C.textSecondary }}>{cap.desc}</div>
                  </div>
                  {active && (
                    <div style={{ color: C.blue, fontSize: 28, fontWeight: 700, flexShrink: 0 }}>&#10003;</div>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <button onClick={() => setStep(0)}
              style={{ backgroundColor: 'transparent', color: C.textSecondary, border: `1px solid ${C.border}`, padding: '16px 36px', borderRadius: 28, fontSize: 18, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
              Back
            </button>
            <button onClick={() => setStep(2)} disabled={selected.length === 0}
              style={{
                backgroundColor: selected.length > 0 ? C.blue : 'rgba(232,234,237,0.7)',
                color: selected.length > 0 ? '#fff' : C.textTertiary,
                border: 'none', padding: '16px 48px', borderRadius: 28, fontSize: 18, fontWeight: 600,
                cursor: selected.length > 0 ? 'pointer' : 'default', fontFamily: 'inherit',
                boxShadow: selected.length > 0 ? '0 4px 16px rgba(26,115,232,0.3)' : 'none',
                transition: 'all 0.2s',
              }}>
              Show Me {selected.length > 0 ? `(${selected.length})` : ''}
            </button>
          </div>

          <style>{`
            @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          `}</style>
        </div>
      </div>
    );
  }

  // Step 2: Here's why it's better
  return (
    <div style={{ minHeight: '100vh', background: C.bgGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, fontFamily: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ maxWidth: 700, width: '100%', animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: C.blue, marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Step 2 of 2
          </p>
          <h1 style={{ fontSize: 40, fontWeight: 400, color: C.text, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            Everything you need. Already built.
          </h1>
          <p style={{ fontSize: 20, color: C.textSecondary, margin: 0, lineHeight: 1.6 }}>
            Same functionality — wired up differently. Tap each one to see why it&apos;s better.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
          {selectedCaps.map(cap => {
            const isOpen = expanded === cap.id;
            return (
              <div key={cap.id} style={{
                borderRadius: 20, border: `1px solid ${C.border}`, overflow: 'hidden',
                backgroundColor: '#ffffff', boxShadow: C.shadowSubtle, transition: 'all 0.2s',
              }}>
                <button onClick={() => setExpanded(isOpen ? null : cap.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 20,
                    padding: '22px 28px', border: 'none', backgroundColor: 'transparent',
                    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: C.greenLight, color: C.green, fontSize: 24, fontWeight: 700, flexShrink: 0,
                  }}>
                    {cap.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: C.text }}>{cap.title}</div>
                    <div style={{ fontSize: 16, color: C.textSecondary }}>{cap.desc}</div>
                  </div>
                  <div style={{ color: C.textTertiary, fontSize: 18, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}>
                    &#9660;
                  </div>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 28px 24px 100px', animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7, color: C.textSecondary }}>
                      {cap.detail}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <button onClick={() => setStep(1)}
            style={{ backgroundColor: 'transparent', color: C.textSecondary, border: `1px solid ${C.border}`, padding: '16px 36px', borderRadius: 28, fontSize: 18, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            Back
          </button>
          <button onClick={() => onComplete(selected)}
            style={{
              backgroundColor: C.blue, color: '#fff', border: 'none',
              padding: '16px 48px', borderRadius: 28, fontSize: 18, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 8px 24px rgba(26,115,232,0.3)',
            }}>
            Open the Console
          </button>
        </div>

        <style>{`
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Suggested questions
// ─────────────────────────────────────────────────────────────
const SUGGESTED = [
  'What does the $5K/month actually get me?',
  'How does the commission buyout work?',
  'What happens if we do 2,500 projects next year?',
  'Show me the break-even math',
  'What\'s the risk if automation only hits 15%?',
];

// ─────────────────────────────────────────────────────────────
// Console (the actual app — after onboarding)
// ─────────────────────────────────────────────────────────────
function ConsoleApp({ interests }: { interests: string[] }) {
  const [projects, setProjects] = useState(1888);
  const [automation, setAutomation] = useState(35);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const marginRecovered = Math.round(JV.outsideServices * (automation / 100));
  const projectedNet = JV.baseNetIncome + marginRecovered;
  const projectedRevenue = JV.baseRevenue + Math.round(marginRecovered * 0.6);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = text.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsLoading(true);

    const context = {
      scenario: {
        annualProjects: projects,
        automationLevel: `${automation}%`,
        marginRecovered: `$${marginRecovered.toLocaleString()}`,
        projectedRevenue: `$${projectedRevenue.toLocaleString()}`,
        projectedNet: `$${projectedNet.toLocaleString()}`,
      },
      deal: {
        coreNode: '$5,000/mo',
        growthModule: '$1,000/mo',
        year1Total: '$63,000',
        commissionRate: '7% on first $1M, 5% above',
        baseRevenue: '$1.12M',
        outsideServices: '$358K (target for automation)',
      },
      userInterests: interests.map(id => CAPABILITIES.find(c => c.id === id)?.title).filter(Boolean),
      instructions: `You are advising the CEO of Scan2Plan (a construction estimating company) on this joint venture proposal. Be direct, use real numbers from the scenario context, and answer like a CFO would — no fluff. The user cares most about: ${interests.map(id => CAPABILITIES.find(c => c.id === id)?.title).filter(Boolean).join(', ')}. Emphasize these areas. Keep formatting clean and readable.`,
    };

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: userMsg }] }],
          context,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages(prev => [...prev, { role: 'ai', text: `Something went wrong: ${data.error}` }]);
      } else if (data.type === 'text' && data.response) {
        setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: 'No response generated. Try rephrasing your question.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Connection error. Please try again.' }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [isLoading, projects, automation, marginRecovered, projectedRevenue, projectedNet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(chatInput);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: C.bgGradient, 
      color: C.text, 
      fontFamily: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '24px 32px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>

      {/* ── Top Bar (Floating) ── */}
      <div style={{ 
        background: C.surface, 
        borderRadius: 24,
        padding: '16px 32px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        border: `1px solid ${C.border}`,
        boxShadow: C.shadowSubtle,
        marginBottom: 24,
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Glowing Orb */}
          <div style={{ 
            width: 12, height: 12, borderRadius: '50%', backgroundColor: C.blue,
            boxShadow: `0 0 12px ${C.blue}`
          }} />
          <span style={{ fontWeight: 600, color: C.text, fontSize: 24, letterSpacing: '-0.02em' }}>Scan2Plan</span>
          <span style={{ color: C.textTertiary, fontSize: 18, fontWeight: 400 }}>Console</span>
        </div>
        <div style={{ display: 'flex', gap: 40 }}>
          <Stat label="Margin Recovery" value={`$${marginRecovered.toLocaleString()}`} color={C.green} />
          <Stat label="Projected Revenue" value={`$${(projectedRevenue / 1000).toFixed(0)}K`} color={C.green} />
          <Stat label="Projected Net" value={`$${(projectedNet / 1000).toFixed(0)}K`} color={C.blue} />
          <Stat label="Year 1 Investment" value={`$${(JV.year1Total / 1000).toFixed(0)}K`} color={C.orange} />
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 24, flex: 1, minHeight: 0 }}>

        {/* ── Left: Scenario (Floating Glass) ── */}
        <div style={{ 
          background: C.surface,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 24,
          border: `1px solid ${C.border}`,
          boxShadow: C.shadowFloating,
          padding: 32, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 32, 
          overflowY: 'auto'
        }}>

          <div>
            <div style={{ fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.textTertiary, marginBottom: 24 }}>
              Your Scenario
            </div>

            <label style={{ display: 'block', marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: C.textSecondary, fontSize: 18 }}>Annual Projects</span>
                <span style={{ color: C.text, fontWeight: 700, fontSize: 24 }}>{projects.toLocaleString()}</span>
              </div>
              <input type="range" min={500} max={3000} step={10} value={projects}
                onChange={e => setProjects(Number(e.target.value))}
                style={{ width: '100%', accentColor: C.blue, height: 6, cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: C.textTertiary, marginTop: 8 }}>
                <span>500</span><span>3,000</span>
              </div>
            </label>

            <label style={{ display: 'block', marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: C.textSecondary, fontSize: 18 }}>Automation Level</span>
                <span style={{ color: C.text, fontWeight: 700, fontSize: 24 }}>{automation}%</span>
              </div>
              <input type="range" min={5} max={60} step={1} value={automation}
                onChange={e => setAutomation(Number(e.target.value))}
                style={{ width: '100%', accentColor: C.orange, height: 6, cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: C.textTertiary, marginTop: 8 }}>
                <span>Conservative 5%</span><span>Aggressive 60%</span>
              </div>
            </label>
          </div>

          {/* Deal Structure */}
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 28 }}>
            <div style={{ fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.textTertiary, marginBottom: 20 }}>
              Deal Structure
            </div>
            <Row label="Core Node" value={`$${JV.coreNode.toLocaleString()}/mo`} />
            <Row label="Growth Module" value={`$${JV.growthModule.toLocaleString()}/mo`} />
            <Row label="Commission" value={`${JV.hdxCommission}% then ${JV.hdxCommissionTier2}%`} />
            <Row label="Base Revenue" value={`$${(JV.baseRevenue / 1000).toFixed(0)}K`} />
            <Row label="Outside Services" value={`$${(JV.outsideServices / 1000).toFixed(0)}K`} highlight />

            <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 20, paddingTop: 20 }}>
              <Row label="Margin Recovered" value={`$${marginRecovered.toLocaleString()}`} color={C.greenDark} large />
              <Row label="Projected Net" value={`$${projectedNet.toLocaleString()}`} color={C.greenDark} large />
            </div>
          </div>
        </div>

        {/* ── Right: Chat (Floating Glass) ── */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%', 
          background: C.surfaceSolid, // opaque for readability
          borderRadius: 24,
          border: `1px solid ${C.border}`,
          boxShadow: C.shadowFloating,
          overflow: 'hidden'
        }}>

          <div style={{ flex: 1, overflowY: 'auto', padding: '40px 48px' }}>

            {/* Empty state */}
            {messages.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 40 }}>
                {/* Antigravity Logo / Orb */}
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)',
                  boxShadow: '0 8px 32px rgba(26,115,232,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'float 6s ease-in-out infinite'
                }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#fff', opacity: 0.8 }} />
                </div>
                
                <div style={{ textAlign: 'center', maxWidth: 600 }}>
                  <h2 style={{ fontSize: 36, fontWeight: 400, color: C.text, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                    Ask me anything about this deal.
                  </h2>
                  <p style={{ fontSize: 20, color: C.textSecondary, margin: 0, lineHeight: 1.6 }}>
                    Adjust the sliders to model your scenario, then ask questions. The AI runs your numbers in real time.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 640 }}>
                  {[
                    ...interests.map(id => CAPABILITIES.find(c => c.id === id)?.question).filter(Boolean) as string[],
                    ...SUGGESTED,
                  ].slice(0, 5).map((q, i) => (
                    <button key={i} onClick={() => sendMessage(q)}
                      style={{
                        textAlign: 'left', padding: '18px 24px', borderRadius: 16,
                        backgroundColor: '#ffffff', border: `1px solid ${C.border}`,
                        color: C.textSecondary, fontSize: 18, cursor: 'pointer', fontWeight: 500,
                        fontFamily: 'inherit', transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                      }}
                      onMouseEnter={e => { 
                        e.currentTarget.style.backgroundColor = C.blueLight; 
                        e.currentTarget.style.borderColor = C.blueBorder; 
                        e.currentTarget.style.color = C.blue;
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(26,115,232,0.08)';
                      }}
                      onMouseLeave={e => { 
                        e.currentTarget.style.backgroundColor = '#ffffff'; 
                        e.currentTarget.style.borderColor = C.border; 
                        e.currentTarget.style.color = C.textSecondary;
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, i) => (
              <div key={i} style={{
                marginBottom: 32,
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                {msg.role === 'ai' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, marginLeft: 6 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: C.blue }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.textTertiary, letterSpacing: '0.03em' }}>Scan2Plan AI</span>
                  </div>
                )}
                <div style={{
                  maxWidth: '85%',
                  padding: '20px 28px',
                  borderRadius: msg.role === 'user' ? '24px 24px 4px 24px' : '4px 24px 24px 24px',
                  backgroundColor: msg.role === 'user' ? C.blue : '#f8f9fa',
                  border: msg.role === 'user' ? 'none' : `1px solid ${C.border}`,
                  boxShadow: 'none',
                }}>
                  <p style={{
                    margin: 0, fontSize: 19, lineHeight: 1.7,
                    color: msg.role === 'user' ? '#ffffff' : C.text,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading dots */}
            {isLoading && (
              <div style={{ marginBottom: 32, display: 'flex', alignItems: 'flex-start', animation: 'fadeIn 0.3s' }}>
                <div style={{ padding: '20px 28px', borderRadius: '4px 24px 24px 24px', backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: 12, height: 12, borderRadius: '50%', backgroundColor: C.blue,
                        animation: `pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) ${i * 0.2}s infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} style={{
            borderTop: `1px solid ${C.border}`, padding: '24px 48px',
            backgroundColor: '#ffffff',
            display: 'flex', gap: 16, alignItems: 'center',
          }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                ref={inputRef}
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask about the proposal, the numbers, or the technology..."
                disabled={isLoading}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  backgroundColor: '#ffffff', border: `1px solid ${C.border}`,
                  borderRadius: 28, color: C.text, fontSize: 19, padding: '18px 28px',
                  fontFamily: 'inherit', outline: 'none', transition: 'all 0.2s',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = C.blue;
                  e.currentTarget.style.boxShadow = C.glowBlue;
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.03)';
                }}
              />
            </div>
            <button type="submit" disabled={isLoading || !chatInput.trim()}
              style={{
                backgroundColor: chatInput.trim() ? C.blue : C.surfaceHover,
                border: 'none', color: chatInput.trim() ? '#ffffff' : C.textTertiary,
                padding: '18px 36px', borderRadius: 28, fontWeight: 600,
                cursor: chatInput.trim() ? 'pointer' : 'default',
                fontSize: 18, fontFamily: 'inherit', transition: 'all 0.2s',
                boxShadow: chatInput.trim() ? '0 4px 16px rgba(26,115,232,0.3)' : 'none'
              }}>
              Send
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ textAlign: 'right' }}>
      <div style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.textTertiary, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}

function Row({ label, value, color, highlight, large }: { label: string; value: string; color?: string; highlight?: boolean; large?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: large ? '12px 0' : '8px 0', borderBottom: `1px solid ${C.borderLight}` }}>
      <span style={{ color: highlight ? C.red : C.textSecondary, fontSize: large ? 18 : 16 }}>{label}</span>
      <span style={{ color: color || C.text, fontWeight: 600, fontSize: large ? 20 : 16 }}>{value}</span>
    </div>
  );
}
