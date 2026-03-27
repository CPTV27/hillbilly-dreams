'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Step = 1 | 2 | 3;

interface FormData {
  // Step 1
  name: string;
  category: string;
  city: string;
  website: string;
  description: string;
  // Step 2
  toolsOrigin: string;
  softwareSpend: string;
  // Step 3
  contactName: string;
  contactEmail: string;
  hearAbout: string;
}

const CATEGORIES = ['Hospitality', 'Food & Drink', 'Trades', 'Creative', 'AEC', 'Retail', 'Services', 'Other'];
const CITIES = ['Memphis, TN', 'Clarksdale, MS', 'Vicksburg, MS', 'Natchez, MS', 'New Orleans, LA', 'El Dorado, AR', 'Other'];
const TOOLS_OPTIONS = ['Mostly local / regional', 'Mix of local and national', 'Mostly national chains', 'Not sure'];
const SPEND_OPTIONS = ['$0 – $200/mo', '$200 – $500/mo', '$500 – $1,000/mo', '$1,000+/mo', 'Not sure'];

export default function SubmitPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '', category: '', city: '', website: '', description: '',
    toolsOrigin: '', softwareSpend: '',
    contactName: '', contactEmail: '', hearAbout: '',
  });

  const update = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/directory/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = res.ok ? await res.json() : {};
      const params = new URLSearchParams({ name: form.name });
      if (data.spotlight) params.set('spotlight', data.spotlight);
      router.push(`/directory/submit/confirmed?${params.toString()}`);
    } catch {
      // fail silently — redirect to confirmed without spotlight
      router.push(`/directory/submit/confirmed?name=${encodeURIComponent(form.name)}`);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'transparent',
    border: '1px solid var(--muted, #333)',
    color: 'var(--fg, #f5f0eb)',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    outline: 'none',
    appearance: 'none' as const,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: 'var(--accent, #c8943e)',
    marginBottom: '0.5rem',
    fontWeight: 600,
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
  };

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Header */}
      <section style={{ padding: '4rem 1.5rem 3rem', maxWidth: 640, margin: '0 auto' }}>
        <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent, #c8943e)', marginBottom: '1rem' }}>
          Deep South Directory — Get Listed
        </p>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, color: 'var(--fg, #f5f0eb)', letterSpacing: '-0.025em', marginBottom: '0.75rem', lineHeight: 1.15 }}>
          {step === 1 && 'Tell us about your business.'}
          {step === 2 && 'The economics question.'}
          {step === 3 && 'Last step.'}
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--fg, #f5f0eb)', opacity: 0.55, lineHeight: 1.6 }}>
          {step === 1 && 'A few details to build your listing.'}
          {step === 2 && 'No wrong answers. This helps us write your spotlight.'}
          {step === 3 && 'Where to send your spotlight preview.'}
        </p>
        {/* Step indicator */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
          {([1, 2, 3] as Step[]).map(s => (
            <div key={s} style={{ height: 3, flex: 1, background: s <= step ? 'var(--accent, #c8943e)' : 'var(--muted, #333)', transition: 'background 0.3s' }} />
          ))}
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: '0 1.5rem', maxWidth: 640, margin: '0 auto' }}>

        {step === 1 && (
          <div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Business Name *</label>
              <input style={inputStyle} value={form.name} onChange={e => update('name', e.target.value)} placeholder="The Anthologist" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Category *</label>
              <select style={inputStyle} value={form.category} onChange={e => update('category', e.target.value)}>
                <option value="">Select a category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Corridor City *</label>
              <select style={inputStyle} value={form.city} onChange={e => update('city', e.target.value)}>
                <option value="">Select your city</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Website (optional)</label>
              <input style={inputStyle} value={form.website} onChange={e => update('website', e.target.value)} placeholder="https://yoursite.com" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>What do you do? (one line) *</label>
              <input style={inputStyle} value={form.description} onChange={e => update('description', e.target.value)} placeholder="Vinyl, violets, and live music under one roof." />
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!form.name || !form.category || !form.city || !form.description}
              style={{ padding: '0.75rem 2.5rem', background: 'var(--accent, #c8943e)', color: '#0a0a0a', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', opacity: (!form.name || !form.category || !form.city || !form.description) ? 0.4 : 1 }}
            >
              Next →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Where do most of your tools and subscriptions come from?</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {TOOLS_OPTIONS.map(opt => (
                  <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem 1rem', border: `1px solid ${form.toolsOrigin === opt ? 'var(--accent, #c8943e)' : 'var(--muted, #333)'}`, color: 'var(--fg, #f5f0eb)', fontSize: '0.9rem' }}>
                    <input type="radio" name="toolsOrigin" value={opt} checked={form.toolsOrigin === opt} onChange={() => update('toolsOrigin', opt)} style={{ accentColor: 'var(--accent, #c8943e)' }} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Roughly how much do you spend on software per month?</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {SPEND_OPTIONS.map(opt => (
                  <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem 1rem', border: `1px solid ${form.softwareSpend === opt ? 'var(--accent, #c8943e)' : 'var(--muted, #333)'}`, color: 'var(--fg, #f5f0eb)', fontSize: '0.9rem' }}>
                    <input type="radio" name="softwareSpend" value={opt} checked={form.softwareSpend === opt} onChange={() => update('softwareSpend', opt)} style={{ accentColor: 'var(--accent, #c8943e)' }} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setStep(1)} style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: 'var(--accent, #c8943e)', border: '1px solid var(--accent, #c8943e)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                ← Back
              </button>
              <button onClick={() => setStep(3)} style={{ padding: '0.75rem 2.5rem', background: 'var(--accent, #c8943e)', color: '#0a0a0a', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Your Name *</label>
              <input style={inputStyle} value={form.contactName} onChange={e => update('contactName', e.target.value)} placeholder="Regina Charboneau" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Email Address *</label>
              <input style={{ ...inputStyle }} type="email" value={form.contactEmail} onChange={e => update('contactEmail', e.target.value)} placeholder="you@yourbusiness.com" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>How did you hear about the Directory? (optional)</label>
              <input style={inputStyle} value={form.hearAbout} onChange={e => update('hearAbout', e.target.value)} placeholder="Big Muddy Magazine, a friend, Rise Up..." />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setStep(2)} style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: 'var(--accent, #c8943e)', border: '1px solid var(--accent, #c8943e)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!form.contactName || !form.contactEmail || submitting}
                style={{ padding: '0.75rem 2.5rem', background: 'var(--accent, #c8943e)', color: '#0a0a0a', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', opacity: (!form.contactName || !form.contactEmail || submitting) ? 0.5 : 1 }}
              >
                {submitting ? 'Submitting...' : 'Get Listed'}
              </button>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--fg, #f5f0eb)', opacity: 0.35, lineHeight: 1.5 }}>
              Free listings are free. No credit card. No contract. We&apos;ll send a spotlight preview within 24 hours.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
