'use client';

// apps/web/app/directory/onboard/musician/page.tsx
// Musician Directory — Onboarding Form
//
// Same flow as business onboard but with musician-specific fields.
// POSTs to /api/directory/submit with category="musician".
// URL params: ?tier=free|listing|works|engine

import Link from 'next/link';
import { useState, useRef, useEffect, Suspense, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import '../onboard.css';

type TierIntent = 'free' | 'listing' | 'works' | 'engine' | '';

interface FormState {
  name: string;
  genre: string;
  city: string;
  state: string;
  bio: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  availability: string;
  feeRange: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  tierIntent: TierIntent;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const GENRES = [
  'Blues', 'Soul', 'Gospel', 'Rock', 'Country', 'Folk',
  'Americana', 'R&B', 'Jazz', 'Zydeco', 'Other',
];

const FEE_OPTIONS = [
  { value: '', label: 'Select a range' },
  { value: 'under_500', label: 'Under $500' },
  { value: '500_1000', label: '$500 – $1,000' },
  { value: '1000_2500', label: '$1,000 – $2,500' },
  { value: '2500_5000', label: '$2,500 – $5,000' },
  { value: '5000_plus', label: '$5,000+' },
  { value: 'negotiable', label: 'Negotiable' },
];

const AVAILABILITY_OPTIONS = [
  { value: '', label: 'Select availability' },
  { value: 'available', label: 'Available — booking shows now' },
  { value: 'selective', label: 'Selective — right gig, right venue' },
  { value: 'not_touring', label: 'Not touring right now' },
];

const TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    desc: 'Get listed. Name, genre, location, bio. Discoverable by venues and bookers.',
    features: ['Basic profile', 'Searchable by venues', 'Visible to bookers'],
  },
  {
    id: 'listing',
    name: 'The Listing',
    price: '$20/mo',
    desc: 'Enhanced profile with streaming links. Monthly report on who viewed you.',
    features: ['Streaming links displayed', 'Monthly view report', 'Enhanced search placement'],
  },
  {
    id: 'works',
    name: 'The Works',
    price: '$49/mo',
    desc: 'Social media management. 4 posts/week in your voice. Show promotion.',
    features: ['Social media (4 posts/week)', 'Content calendar', 'Show promotion'],
  },
  {
    id: 'engine',
    name: 'The Engine',
    price: '$99/mo',
    desc: 'Full marketing. Radio airplay. Magazine features. Booking priority.',
    features: ['Big Muddy Radio rotation', 'Magazine feature consideration', 'Booking priority', 'Full social media'],
    featured: true,
  },
];

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default function MusicianOnboardPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100dvh', background: 'var(--bg, #0f0f0d)' }} />}>
      <MusicianOnboardInner />
    </Suspense>
  );
}

function MusicianOnboardInner() {
  const searchParams = useSearchParams();
  const tierFromUrl = (searchParams.get('tier') || '') as TierIntent;

  const [form, setForm] = useState<FormState>({
    name: '',
    genre: '',
    city: 'Natchez',
    state: 'MS',
    bio: '',
    spotifyUrl: '',
    appleMusicUrl: '',
    youtubeUrl: '',
    availability: '',
    feeRange: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    tierIntent: tierFromUrl,
  });

  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (tierFromUrl) setForm((f) => ({ ...f, tierIntent: tierFromUrl }));
  }, [tierFromUrl]);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const streamingLinks: Record<string, string> = {};
    if (form.spotifyUrl.trim()) streamingLinks.spotify = form.spotifyUrl.trim();
    if (form.appleMusicUrl.trim()) streamingLinks.appleMusic = form.appleMusicUrl.trim();
    if (form.youtubeUrl.trim()) streamingLinks.youtube = form.youtubeUrl.trim();

    try {
      const res = await fetch('/api/directory/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          category: 'musician',
          city: form.city.trim(),
          state: form.state.trim(),
          description: form.bio.trim(),
          contactName: form.contactName.trim(),
          contactEmail: form.contactEmail.trim(),
          contactPhone: form.contactPhone.trim(),
          genre: form.genre,
          streamingLinks: Object.keys(streamingLinks).length > 0 ? streamingLinks : null,
          availability: form.availability || null,
          feeRange: form.feeRange || null,
          tierIntent: form.tierIntent || 'free',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Something went wrong (${res.status})`);
      }

      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="onboard-page">
        <div className="onboard-success">
          <div className="onboard-success-icon"><CheckIcon /></div>
          <h2 className="onboard-success-title">You&apos;re in.</h2>
          <p className="onboard-success-desc">
            We&apos;ll review your profile and get you live in the directory.
            Venues and bookers will be able to find you by genre, location, and availability.
          </p>
          <Link href="/directory" className="onboard-success-link">
            Browse the Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="onboard-page">
      <div className="onboard-header">
        <p className="onboard-header-eyebrow">Big Muddy Touring Directory</p>
        <h1 className="onboard-header-title">List your band.</h1>
        <p className="onboard-header-sub">
          Get found by venues, bookers, and festivals along the Deep South.
          Free to list. Takes two minutes.
        </p>
      </div>

      <div className="onboard-container">
        {/* Tier Display */}
        <div className="onboard-section" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg, #f5f0eb)', marginBottom: '1rem' }}>
            Choose your tier
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
            {TIERS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setForm((f) => ({ ...f, tierIntent: tier.id as TierIntent }))}
                style={{
                  padding: '1rem',
                  border: form.tierIntent === tier.id
                    ? '2px solid var(--accent, #c8943e)'
                    : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  background: form.tierIntent === tier.id ? 'rgba(200,148,62,0.08)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--fg, #f5f0eb)',
                }}
              >
                <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent, #c8943e)', margin: '0 0 0.25rem', fontWeight: 700 }}>
                  {tier.name}
                </p>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.35rem' }}>
                  {tier.price}
                </p>
                <p style={{ fontSize: '0.75rem', opacity: 0.6, margin: 0, lineHeight: 1.4 }}>
                  {tier.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {status === 'error' && (
          <div className="onboard-error">
            <AlertIcon />
            <span>{errorMsg}</span>
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Your Band */}
          <div className="onboard-section">
            <h2 className="onboard-section-title">Your Band</h2>

            <label className="onboard-label">
              Band / Artist Name <span className="onboard-required">*</span>
            </label>
            <input className="onboard-input" type="text" value={form.name} onChange={set('name')} placeholder="e.g. Rise Up Gospel & Blues Band" required />

            <label className="onboard-label">
              Genre <span className="onboard-required">*</span>
            </label>
            <select className="onboard-select" value={form.genre} onChange={set('genre')} required>
              <option value="">Select a genre</option>
              {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '0.75rem' }}>
              <div>
                <label className="onboard-label">
                  City <span className="onboard-required">*</span>
                </label>
                <input className="onboard-input" type="text" value={form.city} onChange={set('city')} required />
              </div>
              <div>
                <label className="onboard-label">
                  State <span className="onboard-required">*</span>
                </label>
                <input className="onboard-input" type="text" value={form.state} onChange={set('state')} maxLength={2} required />
              </div>
            </div>

            <label className="onboard-label">
              Bio <span className="onboard-required">*</span>
            </label>
            <textarea className="onboard-textarea" value={form.bio} onChange={set('bio')} placeholder="Tell venues what you sound like. 2-3 sentences is perfect." rows={3} required />
          </div>

          {/* Streaming & Availability */}
          <div className="onboard-section">
            <h2 className="onboard-section-title">Music & Availability</h2>

            <label className="onboard-label">Spotify URL</label>
            <input className="onboard-input" type="url" value={form.spotifyUrl} onChange={set('spotifyUrl')} placeholder="https://open.spotify.com/artist/..." />

            <label className="onboard-label">Apple Music URL</label>
            <input className="onboard-input" type="url" value={form.appleMusicUrl} onChange={set('appleMusicUrl')} placeholder="https://music.apple.com/artist/..." />

            <label className="onboard-label">YouTube URL</label>
            <input className="onboard-input" type="url" value={form.youtubeUrl} onChange={set('youtubeUrl')} placeholder="https://youtube.com/@..." />

            <label className="onboard-label">Availability</label>
            <select className="onboard-select" value={form.availability} onChange={set('availability')}>
              {AVAILABILITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            <label className="onboard-label">Fee Range</label>
            <select className="onboard-select" value={form.feeRange} onChange={set('feeRange')}>
              {FEE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Contact Info */}
          <div className="onboard-section">
            <h2 className="onboard-section-title">Your Info</h2>

            <label className="onboard-label">
              Contact Name <span className="onboard-required">*</span>
            </label>
            <input className="onboard-input" type="text" value={form.contactName} onChange={set('contactName')} placeholder="Who should venues reach out to?" required />

            <label className="onboard-label">
              Email <span className="onboard-required">*</span>
            </label>
            <input className="onboard-input" type="email" value={form.contactEmail} onChange={set('contactEmail')} placeholder="your@email.com" required />

            <label className="onboard-label">Phone</label>
            <input className="onboard-input" type="tel" value={form.contactPhone} onChange={set('contactPhone')} placeholder="(555) 555-5555" />
          </div>

          <button type="submit" className="onboard-submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting...' : 'List My Band'}
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', opacity: 0.4, marginTop: '1rem' }}>
            Free to list. Paid tiers available after your profile is live.
          </p>
        </form>
      </div>

      <footer style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', opacity: 0.25, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Powered by Deep South Directory
        </p>
      </footer>
    </div>
  );
}
