'use client';

import { useState } from 'react';

// ── Types ──
type Brand = 'S2PX' | 'BMT' | 'BuyCurious' | 'Corporate';
type SigStyle = 'classic' | 'minimal' | 'bold';
type CommStyle = 'bulleted_brief' | 'detailed_warm' | 'data_heavy';
type Theme = 'futuristic' | 'retro' | 'minimal';

interface OnboardingState {
  // Step 1: Identity
  preferredName: string;
  jobTitle: string;
  brandAffiliation: Brand | '';
  // Step 2: Email
  personalEmail: string;
  businessEmail: string;
  notifyTo: 'personal' | 'business' | 'both';
  // Step 3: Signature
  bioBlurb: string;
  phoneDisplay: string;
  signatureStyle: SigStyle | '';
  // Step 4: Communication
  communicationStyle: CommStyle | '';
  // Step 5: Interface
  interfaceTheme: Theme | '';
  communicationChannels: string[];
}

const INITIAL: OnboardingState = {
  preferredName: '',
  jobTitle: '',
  brandAffiliation: '',
  personalEmail: '',
  businessEmail: '',
  notifyTo: 'business',
  bioBlurb: '',
  phoneDisplay: '',
  signatureStyle: '',
  communicationStyle: '',
  interfaceTheme: '',
  communicationChannels: [],
};

const BRANDS: { value: Brand; label: string; description: string }[] = [
  { value: 'BMT', label: 'Big Muddy Touring', description: 'Touring, hospitality, the Inn' },
  { value: 'S2PX', label: 'S2PX', description: 'SaaS platform & licensing' },
  { value: 'BuyCurious', label: 'BuyCurious Art', description: 'Art marketplace' },
  { value: 'Corporate', label: 'Hillbilly Dreams HQ', description: 'Holding company operations' },
];

const SIG_STYLES: { value: SigStyle; label: string; description: string }[] = [
  { value: 'classic', label: 'Classic', description: 'Name, title, company, phone, logo' },
  { value: 'minimal', label: 'Minimal', description: 'Just your name and title' },
  { value: 'bold', label: 'Bold', description: 'Full block — name, title, blurb, all contact info' },
];

const COMM_STYLES: { value: CommStyle; label: string; description: string }[] = [
  { value: 'bulleted_brief', label: 'Bulleted & Brief', description: 'Quick hits. No fluff. Just the facts.' },
  { value: 'detailed_warm', label: 'Detailed & Warm', description: 'Full context with a friendly, conversational tone.' },
  { value: 'data_heavy', label: 'Data-Heavy', description: 'Numbers, charts, and metrics front and center.' },
];

const THEMES: { value: Theme; label: string; description: string; gradient: string }[] = [
  { value: 'futuristic', label: 'Futuristic', description: 'Dark glassmorphism, glowing accents', gradient: 'linear-gradient(135deg, rgba(30,58,138,0.8), rgba(88,28,135,0.8))' },
  { value: 'retro', label: 'Classic Office', description: 'Warm paper tones, typewriter aesthetic', gradient: 'linear-gradient(135deg, #d4a44e, #8b6914)' },
  { value: 'minimal', label: 'Clean & Minimal', description: 'Light, airy, no distractions', gradient: 'linear-gradient(135deg, #e8e0d0, #f0ebe0)' },
];

const CHANNELS = [
  { value: 'asana', label: 'Asana' },
  { value: 'email', label: 'Email' },
  { value: 'google_chat', label: 'Google Chat' },
  { value: 'sms', label: 'SMS' },
  { value: 'slack', label: 'Slack' },
];

const STEP_TITLES = [
  "Let's Get to Know You",
  'Your Email Setup',
  'Your Signature',
  'How Should We Talk to You?',
  'Your Command Center',
  'Almost There',
];

const STEP_SUBS = [
  'The basics — nothing scary.',
  'Personal vs. business. We keep them separate so you don\'t have to.',
  'How you show up in inboxes and on the website.',
  'Pick the vibe that matches how you like to receive information.',
  'Choose your dashboard look and where updates land.',
  'Review everything. Change anything. Then we\'ll get you set up.',
];

const TOTAL_STEPS = 6;

function SignaturePreview({ state }: { state: OnboardingState }) {
  const name = state.preferredName || 'Your Name';
  const title = state.jobTitle || 'Your Title';
  const brand = BRANDS.find(b => b.value === state.brandAffiliation);
  const company = brand?.label || 'Hillbilly Dreams, Inc.';
  const blurb = state.bioBlurb || '';
  const phone = state.phoneDisplay || '';
  const email = state.businessEmail || 'you@bigmuddytouring.com';

  return (
    <div style={{
      background: 'var(--surface-2, #2d2824)',
      border: '1px solid var(--border, rgba(200,148,62,0.12))',
      borderRadius: '12px',
      padding: '1.25rem 1.5rem',
      marginTop: '1rem',
      fontFamily: 'DM Sans, sans-serif',
    }}>
      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted, #9d968a)', marginBottom: '0.75rem' }}>
        Preview
      </div>
      {state.signatureStyle === 'minimal' ? (
        <>
          <div style={{ fontWeight: 700, color: 'var(--text, #f0ebe0)', fontSize: '0.9rem' }}>{name}</div>
          <div style={{ color: 'var(--text-muted, #9d968a)', fontSize: '0.8rem' }}>{title}</div>
        </>
      ) : state.signatureStyle === 'bold' ? (
        <>
          <div style={{ fontWeight: 700, color: 'var(--text, #f0ebe0)', fontSize: '0.95rem' }}>{name}</div>
          <div style={{ color: 'var(--accent, #c8943e)', fontSize: '0.8rem', fontWeight: 500 }}>{title}</div>
          {blurb && <div style={{ color: 'var(--text-muted, #9d968a)', fontSize: '0.75rem', fontStyle: 'italic', margin: '0.35rem 0' }}>{blurb}</div>}
          <div style={{ borderTop: '1px solid var(--border, rgba(200,148,62,0.12))', marginTop: '0.5rem', paddingTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted, #9d968a)' }}>
            {company} | {email}{phone ? ` | ${phone}` : ''}
          </div>
        </>
      ) : (
        <>
          <div style={{ fontWeight: 700, color: 'var(--text, #f0ebe0)', fontSize: '0.9rem' }}>{name}</div>
          <div style={{ color: 'var(--accent, #c8943e)', fontSize: '0.8rem' }}>{title}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted, #9d968a)', marginTop: '0.35rem' }}>
            {company}{phone ? ` | ${phone}` : ''}
          </div>
        </>
      )}
    </div>
  );
}

function ChecklistItem({ label }: { label: string }) {
  return (
    <li style={{
      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
      padding: '0.75rem 0',
      borderBottom: '1px solid var(--border-subtle, rgba(240,235,224,0.06))',
      fontSize: '0.85rem', color: 'var(--text-muted, #9d968a)',
    }}>
      <span style={{
        width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
        border: '1.5px solid var(--border-strong, rgba(200,148,62,0.25))',
        background: 'transparent',
      }} />
      {label}
    </li>
  );
}

export default function OnboardingSurvey() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<OnboardingState>(INITIAL);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const set = <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) =>
    setState(prev => ({ ...prev, [key]: value }));

  const toggleChannel = (ch: string) =>
    setState(prev => ({
      ...prev,
      communicationChannels: prev.communicationChannels.includes(ch)
        ? prev.communicationChannels.filter(c => c !== ch)
        : [...prev.communicationChannels, ch],
    }));

  const canAdvance = (): boolean => {
    switch (step) {
      case 0: return !!state.preferredName && !!state.jobTitle && !!state.brandAffiliation;
      case 1: return !!state.personalEmail;
      case 2: return !!state.signatureStyle;
      case 3: return !!state.communicationStyle;
      case 4: return !!state.interfaceTheme && state.communicationChannels.length > 0;
      case 5: return true;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }
      setDone(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (done) {
    return (
      <div style={page}>
        <div style={{ ...card, textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>&#10024;</div>
          <h2 style={heading}>You're All Set, {state.preferredName || 'friend'}</h2>
          <p style={{ ...sub, marginBottom: '1.5rem' }}>
            Your preferences are saved. Chase will handle the behind-the-scenes setup
            (Google Workspace, QuickBooks, Asana) and you'll be fully wired in within 24 hours.
          </p>
          <p style={{ ...sub, fontSize: '0.8rem' }}>
            When everything's ready, you'll get an email at <strong style={{ color: 'var(--accent, #c8943e)' }}>{state.businessEmail || state.personalEmail}</strong> with
            your login details.
          </p>
          <button
            onClick={() => window.location.href = '/ops'}
            style={{ ...btnPrimary, marginTop: '1.5rem' }}
          >
            Go to Your Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={page}>
      <div style={{ width: '100%', maxWidth: '560px' }}>
        {/* Progress bar */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '2rem' }}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              style={{
                height: '4px',
                flex: 1,
                borderRadius: '9999px',
                backgroundColor: i <= step
                  ? 'var(--accent, #c8943e)'
                  : 'var(--border-strong, rgba(200,148,62,0.25))',
                transition: 'background-color 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          ))}
        </div>

        <div style={card}>
          <h2 style={heading}>{STEP_TITLES[step]}</h2>
          <p style={sub}>{STEP_SUBS[step]}</p>

          {/* ─── Step 0: Identity ─── */}
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={label}>What should we call you?</label>
                <input
                  style={input}
                  placeholder="Tracy"
                  value={state.preferredName}
                  onChange={e => set('preferredName', e.target.value)}
                />
              </div>
              <div>
                <label style={label}>Your title</label>
                <input
                  style={input}
                  placeholder="Guest Experience Coordinator"
                  value={state.jobTitle}
                  onChange={e => set('jobTitle', e.target.value)}
                />
              </div>
              <div>
                <label style={label}>Which brand are you part of?</label>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {BRANDS.map(b => (
                    <button
                      key={b.value}
                      onClick={() => set('brandAffiliation', b.value)}
                      style={state.brandAffiliation === b.value ? optionSel : optionBase}
                    >
                      <strong style={{ color: 'var(--text, #f0ebe0)', fontWeight: 600 }}>{b.label}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted, #9d968a)' }}>{b.description}</span>
                      {state.brandAffiliation === b.value && <span style={checkmark}>&#10003;</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 1: Email ─── */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={label}>Your personal email</label>
                <input
                  style={input}
                  type="email"
                  placeholder="tracy@gmail.com"
                  value={state.personalEmail}
                  onChange={e => set('personalEmail', e.target.value)}
                />
                <p style={hint}>For password resets and personal stuff. Never shared.</p>
              </div>
              <div>
                <label style={label}>Your business email</label>
                <input
                  style={input}
                  type="email"
                  placeholder="tracy@bigmuddytouring.com"
                  value={state.businessEmail}
                  onChange={e => set('businessEmail', e.target.value)}
                />
                <p style={hint}>This is where work lives — tasks, updates, client comms.</p>
              </div>
              <div>
                <label style={label}>Where should notifications go?</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                  {(['personal', 'business', 'both'] as const).map(opt => (
                    <button
                      key={opt}
                      onClick={() => set('notifyTo', opt)}
                      style={{
                        ...chipBase,
                        ...(state.notifyTo === opt ? chipSel : {}),
                      }}
                    >
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 2: Signature ─── */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={label}>What you do in one sentence</label>
                <textarea
                  style={{ ...input, minHeight: '72px', resize: 'vertical' }}
                  placeholder="I keep the guests happy and the artists on stage."
                  value={state.bioBlurb}
                  onChange={e => set('bioBlurb', e.target.value)}
                />
              </div>
              <div>
                <label style={label}>Phone in your signature?</label>
                <input
                  style={input}
                  type="tel"
                  placeholder="(601) 555-0100 — leave blank to skip"
                  value={state.phoneDisplay}
                  onChange={e => set('phoneDisplay', e.target.value)}
                />
              </div>
              <div>
                <label style={label}>Signature style</label>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {SIG_STYLES.map(s => (
                    <button
                      key={s.value}
                      onClick={() => set('signatureStyle', s.value)}
                      style={state.signatureStyle === s.value ? optionSel : optionBase}
                    >
                      <strong style={{ color: 'var(--text, #f0ebe0)', fontWeight: 600 }}>{s.label}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted, #9d968a)' }}>{s.description}</span>
                      {state.signatureStyle === s.value && <span style={checkmark}>&#10003;</span>}
                    </button>
                  ))}
                </div>
              </div>
              <SignaturePreview state={state} />
            </div>
          )}

          {/* ─── Step 3: Communication Style ─── */}
          {step === 3 && (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {COMM_STYLES.map(s => (
                <button
                  key={s.value}
                  onClick={() => set('communicationStyle', s.value)}
                  style={state.communicationStyle === s.value ? optionSel : optionBase}
                >
                  <strong style={{ color: 'var(--text, #f0ebe0)', fontWeight: 600 }}>{s.label}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted, #9d968a)' }}>{s.description}</span>
                  {state.communicationStyle === s.value && <span style={checkmark}>&#10003;</span>}
                </button>
              ))}
            </div>
          )}

          {/* ─── Step 4: Interface ─── */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={label}>Dashboard look</label>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {THEMES.map(t => (
                    <button
                      key={t.value}
                      onClick={() => set('interfaceTheme', t.value)}
                      style={state.interfaceTheme === t.value ? optionSel : optionBase}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '8px', flexShrink: 0, background: t.gradient }} />
                        <div>
                          <strong style={{ color: 'var(--text, #f0ebe0)', fontWeight: 600 }}>{t.label}</strong>
                          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted, #9d968a)' }}>{t.description}</span>
                        </div>
                      </div>
                      {state.interfaceTheme === t.value && <span style={checkmark}>&#10003;</span>}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={label}>Where should updates land?</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {CHANNELS.map(ch => (
                    <button
                      key={ch.value}
                      onClick={() => toggleChannel(ch.value)}
                      style={{
                        ...chipBase,
                        ...(state.communicationChannels.includes(ch.value) ? chipSel : {}),
                      }}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 5: Review ─── */}
          {step === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Summary */}
              <div style={reviewSection}>
                <div style={reviewRow}><span style={reviewLabel}>Name</span><span>{state.preferredName}</span></div>
                <div style={reviewRow}><span style={reviewLabel}>Title</span><span>{state.jobTitle}</span></div>
                <div style={reviewRow}><span style={reviewLabel}>Brand</span><span>{BRANDS.find(b => b.value === state.brandAffiliation)?.label}</span></div>
                <div style={reviewRow}><span style={reviewLabel}>Personal email</span><span>{state.personalEmail}</span></div>
                <div style={reviewRow}><span style={reviewLabel}>Business email</span><span>{state.businessEmail || '(Chase will assign)'}</span></div>
                <div style={reviewRow}><span style={reviewLabel}>Signature</span><span>{SIG_STYLES.find(s => s.value === state.signatureStyle)?.label}</span></div>
                <div style={reviewRow}><span style={reviewLabel}>Comm style</span><span>{COMM_STYLES.find(s => s.value === state.communicationStyle)?.label}</span></div>
                <div style={reviewRow}><span style={reviewLabel}>Theme</span><span>{THEMES.find(t => t.value === state.interfaceTheme)?.label}</span></div>
                <button onClick={() => setStep(0)} style={editBtn}>Edit any of these</button>
              </div>

              {/* Ops checklist */}
              <div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted, #9d968a)', marginBottom: '0.5rem' }}>
                  What Chase Handles Next
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  <ChecklistItem label={`Create Google Workspace account: ${state.businessEmail || state.preferredName?.toLowerCase() + '@bigmuddytouring.com'}`} />
                  <ChecklistItem label="Add to QuickBooks Online as team member" />
                  <ChecklistItem label="Connect bank account in QBO for payroll" />
                  <ChecklistItem label="Add to Asana workspace" />
                  <ChecklistItem label={`Set up email signature (${SIG_STYLES.find(s => s.value === state.signatureStyle)?.label || 'classic'} style)`} />
                </ul>
                <p style={{ ...hint, marginTop: '0.75rem' }}>
                  Chase gets a copy of this checklist when you hit save. You don't have to do anything else.
                </p>
              </div>
            </div>
          )}

          {error && <p style={{ color: 'var(--error, #b54c4c)', fontSize: '0.85rem', marginTop: '1rem' }}>{error}</p>}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)} style={btnBack}>Back</button>
            ) : <div />}

            {step < TOTAL_STEPS - 1 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canAdvance()}
                style={canAdvance() ? btnPrimary : btnDisabled}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={saving}
                style={saving ? btnDisabled : btnPrimary}
              >
                {saving ? 'Saving...' : 'Save & Finish'}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}

// ── Inline Styles ──
const page: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 1rem',
  background: 'var(--bg, #1a1816)',
  fontFamily: "'DM Sans', sans-serif",
};

const card: React.CSSProperties = {
  background: 'var(--surface, #231f1c)',
  border: '1px solid var(--border, rgba(200,148,62,0.12))',
  borderRadius: '16px',
  padding: '2.5rem 2rem',
};

const heading: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: '1.6rem',
  fontWeight: 700,
  color: 'var(--text, #f0ebe0)',
  letterSpacing: '-0.01em',
  margin: '0 0 0.4rem',
};

const sub: React.CSSProperties = {
  color: 'var(--text-muted, #9d968a)',
  fontSize: '0.875rem',
  lineHeight: 1.5,
  margin: '0 0 1.75rem',
};

const label: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--text-muted, #9d968a)',
  marginBottom: '0.5rem',
};

const input: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'var(--surface-2, #2d2824)',
  border: '1px solid var(--border, rgba(200,148,62,0.12))',
  borderRadius: '8px',
  color: 'var(--text, #f0ebe0)',
  fontSize: '0.9rem',
  fontFamily: "'DM Sans', sans-serif",
  outline: 'none',
  transition: 'border-color 0.15s',
};

const hint: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'var(--text-disabled, #6b635a)',
  marginTop: '0.35rem',
};

const optionBase: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.15rem',
  padding: '1rem 1.25rem',
  borderRadius: '10px',
  border: '1.5px solid var(--border-strong, rgba(200,148,62,0.25))',
  background: 'transparent',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  width: '100%',
  fontFamily: "'DM Sans', sans-serif",
};

const optionSel: React.CSSProperties = {
  ...optionBase,
  borderColor: 'var(--accent, #c8943e)',
  boxShadow: '0 0 0 3px var(--accent-muted, rgba(200,148,62,0.15))',
  background: 'var(--accent-subtle, rgba(200,148,62,0.08))',
};

const checkmark: React.CSSProperties = {
  position: 'absolute',
  top: '0.75rem',
  right: '0.75rem',
  width: '20px',
  height: '20px',
  borderRadius: '9999px',
  background: 'var(--accent, #c8943e)',
  color: 'var(--bg, #1a1816)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.7rem',
  fontWeight: 700,
};

const chipBase: React.CSSProperties = {
  padding: '0.65rem 0.5rem',
  borderRadius: '8px',
  border: '1.5px solid var(--border-strong, rgba(200,148,62,0.25))',
  background: 'transparent',
  color: 'var(--text-muted, #9d968a)',
  fontSize: '0.8rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.15s',
  fontFamily: "'DM Sans', sans-serif",
  textAlign: 'center',
};

const chipSel: React.CSSProperties = {
  borderColor: 'var(--accent, #c8943e)',
  background: 'var(--accent-subtle, rgba(200,148,62,0.08))',
  color: 'var(--accent, #c8943e)',
  boxShadow: '0 0 0 3px var(--accent-muted, rgba(200,148,62,0.15))',
};

const reviewSection: React.CSSProperties = {
  background: 'var(--surface-2, #2d2824)',
  borderRadius: '12px',
  padding: '1.25rem',
  border: '1px solid var(--border, rgba(200,148,62,0.12))',
};

const reviewRow: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5rem 0',
  borderBottom: '1px solid var(--border-subtle, rgba(240,235,224,0.06))',
  fontSize: '0.85rem',
  color: 'var(--text, #f0ebe0)',
};

const reviewLabel: React.CSSProperties = {
  color: 'var(--text-muted, #9d968a)',
  fontWeight: 500,
};

const editBtn: React.CSSProperties = {
  marginTop: '0.75rem',
  background: 'none',
  border: 'none',
  color: 'var(--accent, #c8943e)',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
  padding: 0,
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  fontFamily: "'DM Sans', sans-serif",
};

const btnPrimary: React.CSSProperties = {
  padding: '0.75rem 2rem',
  background: 'var(--accent, #c8943e)',
  color: 'var(--bg, #1a1816)',
  fontWeight: 600,
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontFamily: "'DM Sans', sans-serif",
  transition: 'transform 0.1s',
};

const btnDisabled: React.CSSProperties = {
  ...btnPrimary,
  background: 'var(--border-strong, rgba(200,148,62,0.25))',
  color: 'var(--text-disabled, #6b635a)',
  cursor: 'not-allowed',
};

const btnBack: React.CSSProperties = {
  padding: '0.75rem 1.5rem',
  background: 'none',
  border: 'none',
  color: 'var(--text-muted, #9d968a)',
  fontWeight: 500,
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontFamily: "'DM Sans', sans-serif",
};
