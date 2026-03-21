'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const THEMES = [
  {
    value: 'futuristic',
    label: 'Futuristic',
    description: 'Dark glassmorphism, glowing accents, VR-ready. Built for speed.',
    previewStyle: { background: 'linear-gradient(135deg, rgba(30,58,138,0.8), rgba(88,28,135,0.8))', border: '1px solid rgba(96,165,250,0.3)' },
  },
  {
    value: 'retro',
    label: 'Classic Office',
    description: 'Typewriter-era memos, warm paper tones, printable layouts.',
    previewStyle: { background: 'linear-gradient(135deg, #fef3c7, #fffbeb)', border: '1px solid rgba(245,158,11,0.5)' },
  },
  {
    value: 'minimal',
    label: 'Clean & Minimal',
    description: 'Light, airy, no distractions. Just the facts.',
    previewStyle: { background: 'linear-gradient(135deg, #fafafa, #fff)', border: '1px solid #e5e5e5' },
  },
];

const COMM_STYLES = [
  { value: 'bulleted_brief', label: 'Bulleted & Brief', description: 'Quick hits. No fluff.' },
  { value: 'detailed_warm', label: 'Detailed & Warm', description: 'Full context with a friendly tone.' },
  { value: 'data_heavy', label: 'Data-Heavy', description: 'Numbers, charts, metrics first.' },
];

const CHANNELS = [
  { value: 'asana', label: 'Asana' },
  { value: 'email', label: 'Email' },
  { value: 'google_chat', label: 'Google Chat' },
  { value: 'sms', label: 'SMS' },
  { value: 'slack', label: 'Slack' },
];

const card: React.CSSProperties = {
  backgroundColor: '#fff',
  border: '1px solid #e5e5e5',
  borderRadius: '1rem',
  padding: '2rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
};

const optionBase: React.CSSProperties = {
  position: 'relative',
  padding: '1.5rem',
  borderRadius: '0.75rem',
  border: '2px solid #e5e5e5',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  backgroundColor: 'transparent',
  width: '100%',
};

const optionSelected: React.CSSProperties = {
  ...optionBase,
  borderColor: '#f59e0b',
  boxShadow: '0 0 0 3px rgba(245,158,11,0.2)',
};

const btnPrimary: React.CSSProperties = {
  padding: '0.75rem 2rem',
  backgroundColor: '#f59e0b',
  color: '#fff',
  fontWeight: 600,
  borderRadius: '0.75rem',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
};

const btnDisabled: React.CSSProperties = {
  ...btnPrimary,
  backgroundColor: '#e5e5e5',
  color: '#a3a3a3',
  cursor: 'not-allowed',
};

export default function OnboardingSurvey() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [theme, setTheme] = useState('');
  const [commStyle, setCommStyle] = useState('');
  const [channels, setChannels] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const toggleChannel = (ch: string) => {
    setChannels(prev => prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]);
  };

  const handleSubmit = async () => {
    if (!theme || !commStyle || channels.length === 0) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interfaceTheme: theme,
          communicationStyle: commStyle,
          communicationChannels: channels,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }
      // Hard redirect so NextAuth session re-reads from DB with updated onboardingStep
      window.location.href = '/ops';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const canAdvance = step === 0 ? !!theme : step === 1 ? !!commStyle : channels.length > 0;

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '42rem', margin: '0 auto' }}>
        {/* Progress bar */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                height: '6px',
                flex: 1,
                borderRadius: '9999px',
                backgroundColor: i <= step ? '#f59e0b' : '#e5e5e5',
                transition: 'background-color 0.2s',
              }}
            />
          ))}
        </div>

        <div style={card}>
          {/* Step 0: Interface Theme */}
          {step === 0 && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#171717', marginBottom: '0.5rem' }}>Welcome to Big Muddy Ops</h2>
              <p style={{ color: '#737373', marginBottom: '2rem' }}>First, pick the look and feel for your command center.</p>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {THEMES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    style={theme === t.value ? optionSelected : optionBase}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '3rem', height: '3rem', borderRadius: '0.5rem', flexShrink: 0, ...t.previewStyle }} />
                      <div>
                        <h3 style={{ fontWeight: 600, color: '#171717', margin: 0 }}>{t.label}</h3>
                        <p style={{ fontSize: '0.875rem', color: '#737373', margin: '0.25rem 0 0' }}>{t.description}</p>
                      </div>
                    </div>
                    {theme === t.value && (
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '1.5rem', height: '1.5rem', backgroundColor: '#f59e0b', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Communication Style */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#171717', marginBottom: '0.5rem' }}>How should we talk to you?</h2>
              <p style={{ color: '#737373', marginBottom: '2rem' }}>Pick the communication style that feels right.</p>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {COMM_STYLES.map(s => (
                  <button
                    key={s.value}
                    onClick={() => setCommStyle(s.value)}
                    style={commStyle === s.value ? optionSelected : optionBase}
                  >
                    <h3 style={{ fontWeight: 600, color: '#171717', margin: 0 }}>{s.label}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#737373', margin: '0.25rem 0 0' }}>{s.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Communication Channels */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#171717', marginBottom: '0.5rem' }}>Where should updates land?</h2>
              <p style={{ color: '#737373', marginBottom: '2rem' }}>Pick all the channels you want notifications on.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {CHANNELS.map(ch => (
                  <button
                    key={ch.value}
                    onClick={() => toggleChannel(ch.value)}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      border: channels.includes(ch.value) ? '2px solid #f59e0b' : '2px solid #e5e5e5',
                      backgroundColor: channels.includes(ch.value) ? '#fffbeb' : 'transparent',
                      boxShadow: channels.includes(ch.value) ? '0 0 0 3px rgba(245,158,11,0.2)' : 'none',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      fontWeight: 500,
                      color: '#171717',
                      fontSize: '0.875rem',
                    }}
                  >
                    {ch.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '1rem' }}>{error}</p>}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            {step > 0 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                style={{ padding: '0.75rem 1.5rem', background: 'none', border: 'none', color: '#525252', fontWeight: 500, cursor: 'pointer', fontSize: '1rem' }}
              >
                Back
              </button>
            ) : <div />}

            {step < 2 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canAdvance}
                style={canAdvance ? btnPrimary : btnDisabled}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canAdvance || saving}
                style={canAdvance && !saving ? btnPrimary : btnDisabled}
              >
                {saving ? 'Saving...' : 'Finish Setup'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
