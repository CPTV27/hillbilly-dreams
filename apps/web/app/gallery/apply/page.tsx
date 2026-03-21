'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { MEDIUMS } from '../demo-data';

interface FormData {
  name: string;
  email: string;
  city: string;
  state: string;
  website: string;
  instagram: string;
  medium: string;
  yearsActive: string;
  bio: string;
  portfolioUrl: string;
  priceRange: string;
  whyBCA: string;
}

const US_STATES = [
  'AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA',
  'MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK',
  'OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY',
];

export default function GalleryApply() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', city: '', state: '', website: '', instagram: '',
    medium: '', yearsActive: '', bio: '', portfolioUrl: '', priceRange: '', whyBCA: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // v1: Log to console. Future: POST to /api/gallery/applications
    console.log('[BCA Application]', form);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 1500);
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d4c5a0',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    background: '#fff',
    color: '#2c2416',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600 as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: '#6b5d4a',
    marginBottom: '0.4rem',
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: '#1a1a1a' }}>
          Application Received
        </h1>
        <p style={{ color: '#6b5d4a', lineHeight: 1.7, marginBottom: '2rem' }}>
          Thank you, {form.name}. We review every application personally — not algorithmically. 
          You'll hear from us within two weeks. If your work is a fit, we'll schedule a call to 
          talk about how BCA works and what it means to sell with us.
        </p>
        <Link
          href="/gallery"
          style={{
            display: 'inline-block',
            background: '#c8943e',
            color: '#fff',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          ← Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          Apply to Sell on BCA
        </h1>
        <p style={{ color: '#6b5d4a', lineHeight: 1.7, fontSize: '1.05rem' }}>
          BuyCurious Art is a curated marketplace. We don't accept everyone — we look for craft, 
          story, and work that connects to the Southern landscape, literally or spiritually. 
          Tell us about yourself and your practice.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Info */}
        <fieldset style={{ border: 'none', padding: 0, margin: '0 0 2rem 0' }}>
          <legend style={{
            fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.15em', color: '#c8943e', marginBottom: '1rem',
          }}>
            About You
          </legend>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input required value={form.name} onChange={update('name')} style={inputStyle} placeholder="Your name" />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input required type="email" value={form.email} onChange={update('email')} style={inputStyle} placeholder="you@example.com" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>City *</label>
              <input required value={form.city} onChange={update('city')} style={inputStyle} placeholder="Your city" />
            </div>
            <div>
              <label style={labelStyle}>State *</label>
              <select required value={form.state} onChange={update('state')} style={inputStyle}>
                <option value="">Select</option>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Website</label>
              <input value={form.website} onChange={update('website')} style={inputStyle} placeholder="https://..." />
            </div>
            <div>
              <label style={labelStyle}>Instagram</label>
              <input value={form.instagram} onChange={update('instagram')} style={inputStyle} placeholder="@handle" />
            </div>
          </div>
        </fieldset>

        {/* Practice */}
        <fieldset style={{ border: 'none', padding: 0, margin: '0 0 2rem 0' }}>
          <legend style={{
            fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.15em', color: '#c8943e', marginBottom: '1rem',
          }}>
            Your Practice
          </legend>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Primary Medium *</label>
              <select required value={form.medium} onChange={update('medium')} style={inputStyle}>
                <option value="">Select</option>
                {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Years Active</label>
              <input value={form.yearsActive} onChange={update('yearsActive')} style={inputStyle} placeholder="e.g. 10" />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Bio *</label>
            <textarea
              required
              value={form.bio}
              onChange={update('bio')}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' as const }}
              placeholder="Tell us about your work, your process, and why you make what you make."
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Portfolio Link *</label>
              <input required value={form.portfolioUrl} onChange={update('portfolioUrl')} style={inputStyle} placeholder="Link to your work online" />
            </div>
            <div>
              <label style={labelStyle}>Typical Price Range</label>
              <input value={form.priceRange} onChange={update('priceRange')} style={inputStyle} placeholder="e.g. $200–$2,000" />
            </div>
          </div>
        </fieldset>

        {/* Why BCA */}
        <fieldset style={{ border: 'none', padding: 0, margin: '0 0 2.5rem 0' }}>
          <legend style={{
            fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.15em', color: '#c8943e', marginBottom: '1rem',
          }}>
            The Pitch
          </legend>
          <label style={labelStyle}>Why BCA?</label>
          <textarea
            value={form.whyBCA}
            onChange={update('whyBCA')}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' as const }}
            placeholder="What draws you to BuyCurious Art? What do you want people to feel when they see your work?"
          />
        </fieldset>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '1rem',
            background: submitting ? '#a3a3a3' : '#c8943e',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: submitting ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>

        <p style={{ fontSize: '0.8rem', color: '#8a7d6b', textAlign: 'center', marginTop: '1rem' }}>
          We review every application personally. You'll hear from us within two weeks.
        </p>
      </form>
    </div>
  );
}
