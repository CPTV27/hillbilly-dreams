// apps/web/app/records/vault/onboarding/page.tsx
// ─────────────────────────────────────────────────────────────
// MELODY VAULT — Artist onboarding form (demo surface)
// ─────────────────────────────────────────────────────────────
// Lets a new artist enter the inputs the vault needs:
// socials, bio, audience notes, influences/references, hometown/markets,
// assets-needed, goals.
//
// DEMO MODE: The form stores submissions in component state and prints
// them back as a JSON preview. There is already a real /api/artists/onboard
// endpoint (see apps/web/app/api/artists/onboard) that creates an Artist
// record in Postgres — once we know which onboarding lane (label-staff
// triage vs. artist self-serve) this surface targets, we wire `onSubmit`
// to that endpoint. For tonight's walkthrough, no DB writes happen here
// to avoid polluting prod with demo data.

'use client';

import { useState } from 'react';

interface OnboardingForm {
  artistName: string;
  hometown: string;
  email: string;
  bio: string;
  influences: string;
  markets: string;
  goals: string;
  audienceNotes: string;
  spotify: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  website: string;
  assetsNeeded: string[];
}

const ASSET_OPTIONS = [
  'Press photos',
  'Long-form bio',
  'Live performance video',
  'Streaming-ready masters',
  'One-sheet PDF',
  'Behind-the-song notes',
];

export default function VaultOnboardingPage() {
  const [form, setForm] = useState<OnboardingForm>({
    artistName: '',
    hometown: '',
    email: '',
    bio: '',
    influences: '',
    markets: '',
    goals: '',
    audienceNotes: '',
    spotify: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    website: '',
    assetsNeeded: [],
  });
  const [submitted, setSubmitted] = useState<OnboardingForm | null>(null);

  const update = <K extends keyof OnboardingForm>(key: K, value: OnboardingForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleAsset = (asset: string) =>
    setForm((f) => ({
      ...f,
      assetsNeeded: f.assetsNeeded.includes(asset)
        ? f.assetsNeeded.filter((a) => a !== asset)
        : [...f.assetsNeeded, asset],
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo only — no network call. Real wiring → POST /api/artists/onboard
    setSubmitted(form);
  };

  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
      <a href="/records/vault" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent, #c8943e)', textDecoration: 'none' }}>
        ← Back to Control Room
      </a>

      <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: '1.2rem 0 0.5rem' }}>
        Artist Onboarding
      </h1>
      <p style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.6, maxWidth: 720, margin: '0 0 2rem' }}>
        New roster entries fill this out. Vault uses your inputs to seed the
        strategy doc, audience plan, and EPK checklist. Save anytime — you can
        keep adding through the campaign cycle.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
        <FieldGroup title="The basics">
          <Row>
            <Field label="Artist or band name" required>
              <input value={form.artistName} onChange={(e) => update('artistName', e.target.value)} required style={inputStyle} />
            </Field>
            <Field label="Hometown / market">
              <input value={form.hometown} onChange={(e) => update('hometown', e.target.value)} style={inputStyle} />
            </Field>
          </Row>
          <Field label="Contact email">
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Short bio (we'll tighten it for the press kit)">
            <textarea value={form.bio} onChange={(e) => update('bio', e.target.value)} rows={4} style={textareaStyle} />
          </Field>
        </FieldGroup>

        <FieldGroup title="Sound & audience">
          <Field label="Reference / influence artists (comma-separated — we use these for lookalike audiences)">
            <input value={form.influences} onChange={(e) => update('influences', e.target.value)} placeholder="e.g. The Felice Brothers, Amos Lee, Hiss Golden Messenger" style={inputStyle} />
          </Field>
          <Field label="Markets you care about (comma-separated)">
            <input value={form.markets} onChange={(e) => update('markets', e.target.value)} placeholder="e.g. Hudson Valley, Brooklyn, Natchez, Memphis" style={inputStyle} />
          </Field>
          <Field label="What do you know about your audience that we should?">
            <textarea value={form.audienceNotes} onChange={(e) => update('audienceNotes', e.target.value)} rows={3} style={textareaStyle} />
          </Field>
          <Field label="Goals for the next 6–12 months">
            <textarea value={form.goals} onChange={(e) => update('goals', e.target.value)} rows={3} style={textareaStyle} />
          </Field>
        </FieldGroup>

        <FieldGroup title="Where to find you">
          <Row>
            <Field label="Spotify URL"><input value={form.spotify} onChange={(e) => update('spotify', e.target.value)} style={inputStyle} /></Field>
            <Field label="Instagram"><input value={form.instagram} onChange={(e) => update('instagram', e.target.value)} style={inputStyle} /></Field>
          </Row>
          <Row>
            <Field label="TikTok"><input value={form.tiktok} onChange={(e) => update('tiktok', e.target.value)} style={inputStyle} /></Field>
            <Field label="YouTube"><input value={form.youtube} onChange={(e) => update('youtube', e.target.value)} style={inputStyle} /></Field>
          </Row>
          <Field label="Website (if any)"><input value={form.website} onChange={(e) => update('website', e.target.value)} style={inputStyle} /></Field>
        </FieldGroup>

        <FieldGroup title="What you still need">
          <p style={{ fontSize: '0.78rem', opacity: 0.6, margin: '0 0 0.6rem' }}>Check anything you don&apos;t already have — we&apos;ll source it through the network.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
            {ASSET_OPTIONS.map((opt) => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.assetsNeeded.includes(opt)}
                  onChange={() => toggleAsset(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </FieldGroup>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
          <button
            type="submit"
            style={{
              padding: '0.7rem 1.6rem',
              background: 'var(--accent, #c8943e)',
              color: '#0a0a0a',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Save to Vault
          </button>
          <span style={{ fontSize: '0.72rem', opacity: 0.55 }}>
            Demo session — submissions are not written to the database.
          </span>
        </div>
      </form>

      {submitted && (
        <section style={{ marginTop: '2.5rem', border: '1px solid var(--muted, #333)', padding: '1.25rem 1.4rem', background: 'rgba(200,148,62,0.04)' }}>
          <h2 style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--accent, #c8943e)', margin: '0 0 0.75rem' }}>
            Captured (preview)
          </h2>
          <pre style={{ fontSize: '0.78rem', opacity: 0.75, fontFamily: 'ui-monospace, SFMono-Regular, monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.55rem 0.7rem',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--muted, #333)',
  color: 'var(--fg, #f5f0eb)',
  fontSize: '0.88rem',
  fontFamily: 'inherit',
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: 'vertical',
  minHeight: 80,
};

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset style={{ border: '1px solid var(--muted, #333)', padding: '1.25rem 1.4rem', display: 'grid', gap: '0.9rem', minWidth: 0 }}>
      <legend style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--accent, #c8943e)', padding: '0 0.5rem' }}>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', fontSize: '0.78rem', opacity: 0.85 }}>
      <span style={{ display: 'block', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.66rem', opacity: 0.7 }}>
        {label}{required && <span style={{ color: 'var(--accent, #c8943e)', marginLeft: 4 }}>*</span>}
      </span>
      {children}
    </label>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.9rem' }}>{children}</div>;
}
