'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const THEMES = [
  {
    value: 'futuristic',
    label: 'Futuristic',
    description: 'Dark glassmorphism, glowing accents, VR-ready. Built for speed.',
    preview: 'bg-gradient-to-br from-blue-900/80 to-purple-900/80 border-blue-500/30',
  },
  {
    value: 'retro',
    label: 'Classic Office',
    description: 'Typewriter-era memos, warm paper tones, printable layouts.',
    preview: 'bg-gradient-to-br from-amber-100 to-yellow-50 border-amber-400/50',
  },
  {
    value: 'minimal',
    label: 'Clean & Minimal',
    description: 'Light, airy, no distractions. Just the facts.',
    preview: 'bg-gradient-to-br from-neutral-50 to-white border-neutral-200',
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
      router.push('/ops');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const canAdvance = step === 0 ? !!theme : step === 1 ? !!commStyle : channels.length > 0;

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? 'bg-amber-500' : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
          {/* Step 0: Interface Theme */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Welcome to Big Muddy Ops</h2>
              <p className="text-neutral-500 mb-8">First, pick the look and feel for your command center.</p>
              <div className="grid gap-4">
                {THEMES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                      theme === t.value
                        ? 'border-amber-500 ring-2 ring-amber-200'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg border ${t.preview}`} />
                      <div>
                        <h3 className="font-semibold text-neutral-900">{t.label}</h3>
                        <p className="text-sm text-neutral-500">{t.description}</p>
                      </div>
                    </div>
                    {theme === t.value && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
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
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">How should we talk to you?</h2>
              <p className="text-neutral-500 mb-8">Pick the communication style that feels right.</p>
              <div className="grid gap-4">
                {COMM_STYLES.map(s => (
                  <button
                    key={s.value}
                    onClick={() => setCommStyle(s.value)}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      commStyle === s.value
                        ? 'border-amber-500 ring-2 ring-amber-200'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <h3 className="font-semibold text-neutral-900">{s.label}</h3>
                    <p className="text-sm text-neutral-500">{s.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Communication Channels */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Where should updates land?</h2>
              <p className="text-neutral-500 mb-8">Pick all the channels you want notifications on.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CHANNELS.map(ch => (
                  <button
                    key={ch.value}
                    onClick={() => toggleChannel(ch.value)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      channels.includes(ch.value)
                        ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <span className="font-medium text-neutral-900">{ch.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="px-6 py-3 text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
              >
                Back
              </button>
            ) : <div />}

            {step < 2 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canAdvance}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-semibold rounded-xl transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canAdvance || saving}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-semibold rounded-xl transition-colors"
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
