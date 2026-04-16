'use client';

// apps/web/app/directory/onboard/page.tsx
// Deep South Directory — Business Onboarding Form
//
// Usage: Chase texts this link to a business owner after they agree to sign up.
// Mobile-first. Warm, neighborly. Big touch targets. No jargon.
//
// POSTs to /api/directory/submit on submit.
// Success → shows confirmation. Error → inline message, form preserved.
//
// URL params:
//   ?tier=free|core|growth|partner — pre-selects intent (legacy: listing|works|engine maps to core|growth|partner)

import Link from 'next/link';
import { useState, useRef, useEffect, type FormEvent } from 'react';
import './onboard.css';

// ── Types ─────────────────────────────────────────────────────

type TierIntent = 'free' | 'core' | 'growth' | 'partner' | '';

interface FormState {
  name: string;
  description: string;
  category: string;
  city: string;
  state: string;
  website: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  hearAbout: string;
  toolsOrigin: string;
  softwareSpend: string;
  tierIntent: TierIntent;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// ── Icon: Check ───────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ── Icon: Alert ───────────────────────────────────────────────

function AlertIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

// ── Success Screen ────────────────────────────────────────────

function SuccessScreen({ businessName }: { businessName: string }) {
  return (
    <div className="onboard-success" role="main" aria-live="polite">
      <div className="onboard-success__check" aria-hidden="true">
        <CheckIcon />
      </div>
      <h1 className="onboard-success__title">You&apos;re in!</h1>
      <p className="onboard-success__body">
        We&apos;ll text you when{' '}
        <strong>{businessName || 'your listing'}</strong> goes live.
        Usually within 24 hours.
      </p>
      <p className="onboard-success__note">
        Questions? Just reply to Chase&apos;s text.
      </p>
      <Link href="/directory" className="onboard-back-link">
        Browse the Directory
      </Link>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

const INITIAL_STATE: FormState = {
  name: '',
  description: '',
  category: '',
  city: 'Natchez',
  state: 'MS',
  website: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  hearAbout: '',
  toolsOrigin: '',
  softwareSpend: '',
  tierIntent: '',
};

const TIER_LABELS: Record<string, string> = {
  free: 'Free Listing',
  core: 'Essentials ($25/mo)',
  growth: 'Pro ($50/mo)',
  partner: 'Marketing ($99/mo)',
};

const LEGACY_TIER_MAP: Record<string, TierIntent> = {
  listing: 'core',
  works: 'growth',
  engine: 'partner',
};

export default function OnboardPage() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const errorRef = useRef<HTMLDivElement>(null);

  // Read ?tier= param on mount and pre-fill intent
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('tier')?.toLowerCase() ?? '';
    const mapped = LEGACY_TIER_MAP[raw] ?? (raw as TierIntent);
    if (mapped && ['free', 'core', 'growth', 'partner'].includes(mapped)) {
      setForm((prev) => ({ ...prev, tierIntent: mapped }));
    }
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      city: form.city.trim(),
      state: form.state.trim(),
      website: form.website.trim() || undefined,
      contactName: form.contactName.trim(),
      contactEmail: form.contactEmail.trim(),
      contactPhone: form.contactPhone.trim() || undefined,
      hearAbout: form.hearAbout || undefined,
      toolsOrigin: form.toolsOrigin.trim() || undefined,
      softwareSpend: form.softwareSpend || undefined,
      tierIntent: form.tierIntent || undefined,
    };

    try {
      const res = await fetch('/api/directory/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = 'Something went wrong. Please try again.';
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {
          // ignore parse errors
        }
        setErrorMessage(msg);
        setStatus('error');
        // Move focus to error message
        setTimeout(() => errorRef.current?.focus(), 50);
        return;
      }

      setStatus('success');
    } catch {
      setErrorMessage(
        'Couldn\u2019t reach the server. Check your connection and try again.'
      );
      setStatus('error');
      setTimeout(() => errorRef.current?.focus(), 50);
    }
  }

  if (status === 'success') {
    return (
      <div className="theme-dsd onboard-page">
        <div className="onboard-header" aria-hidden="true">
          <span className="onboard-header__eyebrow">Deep South Directory</span>
        </div>
        <SuccessScreen businessName={form.name} />
      </div>
    );
  }

  const isLoading = status === 'loading';

  return (
    <div className="theme-dsd onboard-page">
      {/* ── Header ── */}
      <header className="onboard-header">
        <span className="onboard-header__eyebrow">Deep South Directory</span>
        <h1 className="onboard-header__title">List Your Business</h1>
        {form.tierIntent && TIER_LABELS[form.tierIntent] && (
          <p className="onboard-header__eyebrow" style={{ marginTop: '0.5rem', opacity: 0.85 }}>
            Selected: {TIER_LABELS[form.tierIntent]}
          </p>
        )}
        <p className="onboard-header__subtitle">
          Fill this out and we&apos;ll have your listing live within 24 hours.
          Takes about two minutes.
        </p>
      </header>

      {/* ── Form ── */}
      <main className="onboard-container" id="main-content">
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Business listing signup form"
        >
          <div className="onboard-section">
            <span className="onboard-section__label">Your Business</span>

            {/* Business Name */}
            <div className="onboard-field">
              <label htmlFor="name" className="onboard-label">
                Business Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="onboard-input"
                value={form.name}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="organization"
                placeholder="e.g. Pearl Street Pasta"
              />
            </div>

            {/* What do you do */}
            <div className="onboard-field">
              <label htmlFor="description" className="onboard-label">
                What do you do?
              </label>
              <textarea
                id="description"
                name="description"
                className="onboard-textarea"
                value={form.description}
                onChange={handleChange}
                required
                disabled={isLoading}
                placeholder="Tell us about your business in a sentence or two"
                rows={3}
              />
            </div>

            {/* Category */}
            <div className="onboard-field">
              <label htmlFor="category" className="onboard-label">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="onboard-select"
                value={form.category}
                onChange={handleChange}
                required
                disabled={isLoading}
              >
                <option value="" disabled>
                  Pick one&hellip;
                </option>
                <option value="restaurant">Restaurant</option>
                <option value="bar_venue">Bar / Venue</option>
                <option value="hotel_bnb">Hotel / B&amp;B</option>
                <option value="shop_retail">Shop / Retail</option>
                <option value="tour_activity">Tour / Activity</option>
                <option value="service">Service</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* City + State */}
            <div className="onboard-field onboard-field--row">
              <div className="onboard-field">
                <label htmlFor="city" className="onboard-label">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="onboard-input"
                  value={form.city}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  autoComplete="address-level2"
                />
              </div>
              <div className="onboard-field">
                <label htmlFor="state" className="onboard-label">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  className="onboard-input"
                  value={form.state}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  maxLength={2}
                  autoComplete="address-level1"
                />
              </div>
            </div>

            {/* Website */}
            <div className="onboard-field">
              <label htmlFor="website" className="onboard-label">
                Website
                <span className="onboard-label__optional">(optional)</span>
              </label>
              <input
                id="website"
                name="website"
                type="url"
                className="onboard-input"
                value={form.website}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="url"
                placeholder="https://"
              />
            </div>
          </div>

          {/* ── Contact Info ── */}
          <div className="onboard-section">
            <span className="onboard-section__label">Your Info</span>

            {/* Contact Name */}
            <div className="onboard-field">
              <label htmlFor="contactName" className="onboard-label">
                Your Name
              </label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                className="onboard-input"
                value={form.contactName}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="name"
                placeholder="Owner or manager"
              />
            </div>

            {/* Email */}
            <div className="onboard-field">
              <label htmlFor="contactEmail" className="onboard-label">
                Your Email
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                className="onboard-input"
                value={form.contactEmail}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="email"
                placeholder="you@yourbusiness.com"
                inputMode="email"
              />
            </div>

            {/* Phone */}
            <div className="onboard-field">
              <label htmlFor="contactPhone" className="onboard-label">
                Your Phone
                <span className="onboard-label__optional">(optional)</span>
              </label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                className="onboard-input"
                value={form.contactPhone}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="tel"
                placeholder="(601) 555-0100"
                inputMode="tel"
              />
            </div>

            {/* How'd you hear */}
            <div className="onboard-field">
              <label htmlFor="hearAbout" className="onboard-label">
                How&apos;d you hear about us?
                <span className="onboard-label__optional">(optional)</span>
              </label>
              <select
                id="hearAbout"
                name="hearAbout"
                className="onboard-select"
                value={form.hearAbout}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="">Pick one&hellip;</option>
                <option value="chase_told_me">Chase told me</option>
                <option value="friend_neighbor">Friend / neighbor</option>
                <option value="saw_the_directory">Saw the directory</option>
                <option value="social_media">Social media</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* ── Optional Business Intel ── */}
          <div className="onboard-section">
            <span className="onboard-section__label">
              A little more (all optional)
            </span>

            {/* Tools they use */}
            <div className="onboard-field">
              <label htmlFor="toolsOrigin" className="onboard-label">
                What tools do you use now?
                <span className="onboard-label__optional">(optional)</span>
              </label>
              <input
                id="toolsOrigin"
                name="toolsOrigin"
                type="text"
                className="onboard-input"
                value={form.toolsOrigin}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Facebook, Yelp, Square, etc."
              />
            </div>

            {/* Monthly spend */}
            <div className="onboard-field">
              <label htmlFor="softwareSpend" className="onboard-label">
                Monthly software spend
                <span className="onboard-label__optional">(optional)</span>
              </label>
              <select
                id="softwareSpend"
                name="softwareSpend"
                className="onboard-select"
                value={form.softwareSpend}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="">Pick one&hellip;</option>
                <option value="under_50">Under $50</option>
                <option value="50_100">$50–$100</option>
                <option value="100_200">$100–$200</option>
                <option value="200_500">$200–$500</option>
                <option value="over_500">Over $500</option>
                <option value="no_idea">No idea</option>
              </select>
            </div>
          </div>

          {/* ── Error Banner ── */}
          {status === 'error' && (
            <div
              className="onboard-error"
              role="alert"
              aria-live="assertive"
              tabIndex={-1}
              ref={errorRef}
            >
              <span className="onboard-error__icon">
                <AlertIcon />
              </span>
              <p className="onboard-error__text">{errorMessage}</p>
            </div>
          )}

          {/* ── Submit ── */}
          <button
            type="submit"
            className="onboard-submit"
            disabled={isLoading}
            aria-busy={isLoading ? 'true' : undefined}
          >
            {isLoading ? (
              <>
                <span className="onboard-spinner" aria-hidden="true" />
                Sending&hellip;
              </>
            ) : (
              'Add My Business'
            )}
          </button>
        </form>

        <p className="onboard-footer-note">
          We&apos;ll have your listing live within 24 hours. No credit card
          needed to get started.
        </p>
      </main>
    </div>
  );
}
