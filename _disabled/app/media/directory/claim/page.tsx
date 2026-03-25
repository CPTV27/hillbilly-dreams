'use client';

// apps/web/app/media/directory/claim/page.tsx
// Deep South Directory — multi-step claim / signup flow.
// Steps: Search → Claim or Create → Details → Choose Tier → Checkout or Done.

import { useCallback, useEffect, useRef, useState } from 'react';

/* ── Types ── */

interface SearchResult {
  id: number;
  name: string;
  slug: string;
  city: string;
  state: string;
  businessType: string;
  tier: string;
  status: string;
}

interface FormData {
  name: string;
  businessType: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  contactName: string;
  website: string;
  description: string;
}

type Tier = 'free' | 'front-porch' | 'route' | 'river-room';

/* ── Constants ── */

const STEPS = ['Search', 'Details', 'Choose Plan', 'Confirm'] as const;

const BUSINESS_TYPES = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'venue', label: 'Venue' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'shop', label: 'Shop' },
  { value: 'tour', label: 'Tour' },
  { value: 'service', label: 'Service' },
  { value: 'other', label: 'Other' },
];

const CITIES = [
  'Memphis', 'Clarksdale', 'Vicksburg', 'Natchez',
  'St. Francisville', 'Baton Rouge', 'New Orleans', 'Lafayette',
  'Alexandria', 'Monroe', 'Ruston', 'Natchitoches',
  'Shreveport', 'El Dorado', 'Little Rock', 'Fayetteville',
  'Bentonville', 'Branson',
];

const STATES = ['MS', 'LA', 'TN', 'AR', 'MO', 'AL'];

const TIERS: {
  id: Tier;
  name: string;
  price: string;
  priceNote: string;
  features: string[];
  highlight?: boolean;
}[] = [
  {
    id: 'free',
    name: 'Free Listing',
    price: '$0',
    priceNote: 'forever',
    features: [
      'Basic directory listing',
      'Business name, city, type',
      'Link to your website',
    ],
  },
  {
    id: 'front-porch',
    name: 'Enhanced',
    price: '$99',
    priceNote: '/month',
    highlight: true,
    features: [
      'Everything in Free',
      'Featured photo & description',
      'Phone & email displayed',
      'Priority placement in search',
      'Google Maps link',
    ],
  },
  {
    id: 'route',
    name: 'The Route',
    price: '$299',
    priceNote: '/month',
    features: [
      'Everything in Enhanced',
      'Featured in Big Muddy Magazine',
      'Social media content package',
      'Monthly analytics report',
      'Review response drafting',
    ],
  },
  {
    id: 'river-room',
    name: 'River Room',
    price: '$599',
    priceNote: '/month',
    features: [
      'Everything in The Route',
      'Dedicated feature article',
      'Video content production',
      'Full social media management',
      'Premium placement across all pages',
      'Priority support',
    ],
  },
];

/* ── Component ── */

export default function ClaimPage() {
  const [step, setStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedExisting, setSelectedExisting] = useState<SearchResult | null>(null);
  const [selectedTier, setSelectedTier] = useState<Tier>('front-porch');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successSlug, setSuccessSlug] = useState('');
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [form, setForm] = useState<FormData>({
    name: '',
    businessType: 'restaurant',
    city: '',
    state: 'MS',
    address: '',
    phone: '',
    email: '',
    contactName: '',
    website: '',
    description: '',
  });

  // ── Search debounce ──

  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    setSearching(true);
    try {
      const res = await fetch(`/api/directory/claim?q=${encodeURIComponent(q)}`);
      const json = await res.json();
      setSearchResults(json.data ?? []);
      setHasSearched(true);
    } catch {
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => doSearch(searchQuery), 350);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchQuery, doSearch]);

  // ── Handlers ──

  const handleSelectExisting = (result: SearchResult) => {
    setSelectedExisting(result);
    setForm((f) => ({
      ...f,
      name: result.name,
      businessType: result.businessType,
      city: result.city,
      state: result.state,
    }));
    setStep(1);
  };

  const handleCreateNew = () => {
    setSelectedExisting(null);
    setForm((f) => ({ ...f, name: searchQuery }));
    setStep(1);
  };

  const handleField = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError('');
  };

  const validateDetails = (): boolean => {
    if (!form.name.trim()) { setError('Business name is required.'); return false; }
    if (!form.businessType) { setError('Business type is required.'); return false; }
    if (!form.city.trim()) { setError('City is required.'); return false; }
    if (!form.email.trim()) { setError('Email is required for your listing.'); return false; }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/directory/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tier: selectedTier,
          existingClientId: selectedExisting?.id ?? undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }

      const data = json.data;

      if (data.checkoutUrl) {
        // Redirect to Stripe
        window.location.href = data.checkoutUrl;
        return;
      }

      // Free tier — show success
      setSuccessSlug(data.slug);
      setStep(3);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ──

  return (
    <>
      {/* ── Hero ── */}
      <section className="claim-hero">
        <div className="claim-hero__bg" aria-hidden="true" />
        <div className="claim-hero__content">
          <div className="claim-hero__eyebrow">
            <span className="claim-hero__ornament" aria-hidden="true">&#9670;</span>
            <span>Deep South Directory</span>
          </div>
          <h1 className="claim-hero__title">Claim Your Business</h1>
          <p className="claim-hero__sub">
            Get listed in the Deep South Directory. Search for your business or create a new listing
            in minutes.
          </p>
        </div>
      </section>

      {/* ── Progress ── */}
      <div className="claim-progress">
        <div className="section-container">
          <div className="claim-progress__bar">
            {STEPS.map((label, i) => (
              <div
                key={label}
                className={`claim-progress__step${i === step ? ' claim-progress__step--active' : ''}${i < step ? ' claim-progress__step--done' : ''}`}
              >
                <span className="claim-progress__num">{i < step ? '\u2713' : i + 1}</span>
                <span className="claim-progress__label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <section className="claim-main">
        <div className="section-container">

          {/* Step 0: Search */}
          {step === 0 && (
            <div className="claim-step">
              <h2 className="claim-step__title">Find Your Business</h2>
              <p className="claim-step__sub">
                Search by business name or city to see if you are already in our directory.
              </p>

              <div className="claim-search">
                <input
                  type="text"
                  className="claim-input claim-input--search"
                  placeholder="Search by business name or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searching && (
                  <span className="claim-search__spinner" aria-label="Searching">...</span>
                )}
              </div>

              {/* Results */}
              {hasSearched && searchResults.length > 0 && (
                <div className="claim-results">
                  <p className="claim-results__heading">
                    {searchResults.length} {searchResults.length === 1 ? 'business' : 'businesses'} found
                  </p>
                  <div className="claim-results__list">
                    {searchResults.map((r) => (
                      <button
                        key={r.id}
                        className="claim-result"
                        onClick={() => handleSelectExisting(r)}
                      >
                        <div className="claim-result__info">
                          <span className="claim-result__name">{r.name}</span>
                          <span className="claim-result__meta">
                            {r.city}, {r.state} &middot; {r.businessType}
                          </span>
                        </div>
                        <span className="claim-result__action">Claim &rarr;</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {hasSearched && searchResults.length === 0 && searchQuery.length >= 2 && (
                <div className="claim-results">
                  <p className="claim-results__heading claim-results__heading--empty">
                    No businesses found matching &ldquo;{searchQuery}&rdquo;
                  </p>
                </div>
              )}

              {/* Create New CTA */}
              <div className="claim-create-new">
                <div className="claim-create-new__divider">
                  <span className="claim-create-new__or">or</span>
                </div>
                <button
                  className="btn btn--primary claim-create-new__btn"
                  onClick={handleCreateNew}
                >
                  Create a New Listing &rarr;
                </button>
                <p className="claim-create-new__note">
                  Don&apos;t see your business? Add it to the directory now.
                </p>
              </div>
            </div>
          )}

          {/* Step 1: Business Details */}
          {step === 1 && (
            <div className="claim-step">
              <h2 className="claim-step__title">
                {selectedExisting ? `Claim ${selectedExisting.name}` : 'Business Details'}
              </h2>
              <p className="claim-step__sub">
                {selectedExisting
                  ? 'Confirm and update your business details.'
                  : 'Tell us about your business. Required fields are marked with *.'}
              </p>

              {error && <div className="claim-error">{error}</div>}

              <div className="claim-form">
                <div className="claim-form__row">
                  <label className="claim-label">
                    Business Name *
                    <input
                      type="text"
                      className="claim-input"
                      value={form.name}
                      onChange={(e) => handleField('name', e.target.value)}
                      required
                    />
                  </label>
                </div>

                <div className="claim-form__row claim-form__row--half">
                  <label className="claim-label">
                    Business Type *
                    <select
                      className="claim-input claim-input--select"
                      value={form.businessType}
                      onChange={(e) => handleField('businessType', e.target.value)}
                    >
                      {BUSINESS_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="claim-label">
                    City *
                    <select
                      className="claim-input claim-input--select"
                      value={form.city}
                      onChange={(e) => handleField('city', e.target.value)}
                    >
                      <option value="">Select a city...</option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                      <option value="__other">Other</option>
                    </select>
                  </label>
                </div>

                {form.city === '__other' && (
                  <div className="claim-form__row claim-form__row--half">
                    <label className="claim-label">
                      City Name *
                      <input
                        type="text"
                        className="claim-input"
                        placeholder="Enter your city"
                        onChange={(e) => handleField('city', e.target.value)}
                      />
                    </label>
                    <label className="claim-label">
                      State
                      <select
                        className="claim-input claim-input--select"
                        value={form.state}
                        onChange={(e) => handleField('state', e.target.value)}
                      >
                        {STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}

                <div className="claim-form__row">
                  <label className="claim-label">
                    Street Address
                    <input
                      type="text"
                      className="claim-input"
                      value={form.address}
                      onChange={(e) => handleField('address', e.target.value)}
                      placeholder="123 Main St"
                    />
                  </label>
                </div>

                <div className="claim-form__row claim-form__row--half">
                  <label className="claim-label">
                    Phone
                    <input
                      type="tel"
                      className="claim-input"
                      value={form.phone}
                      onChange={(e) => handleField('phone', e.target.value)}
                      placeholder="(601) 555-0100"
                    />
                  </label>
                  <label className="claim-label">
                    Email *
                    <input
                      type="email"
                      className="claim-input"
                      value={form.email}
                      onChange={(e) => handleField('email', e.target.value)}
                      placeholder="hello@yourbusiness.com"
                    />
                  </label>
                </div>

                <div className="claim-form__row claim-form__row--half">
                  <label className="claim-label">
                    Contact Name
                    <input
                      type="text"
                      className="claim-input"
                      value={form.contactName}
                      onChange={(e) => handleField('contactName', e.target.value)}
                      placeholder="Your name"
                    />
                  </label>
                  <label className="claim-label">
                    Website
                    <input
                      type="url"
                      className="claim-input"
                      value={form.website}
                      onChange={(e) => handleField('website', e.target.value)}
                      placeholder="https://yourbusiness.com"
                    />
                  </label>
                </div>

                <div className="claim-form__row">
                  <label className="claim-label">
                    Description
                    <textarea
                      className="claim-input claim-input--textarea"
                      rows={4}
                      value={form.description}
                      onChange={(e) => handleField('description', e.target.value)}
                      placeholder="Tell visitors what makes your business special..."
                    />
                  </label>
                </div>

                <div className="claim-form__actions">
                  <button
                    className="btn btn--ghost"
                    onClick={() => setStep(0)}
                  >
                    &larr; Back
                  </button>
                  <button
                    className="btn btn--primary"
                    onClick={() => {
                      if (validateDetails()) setStep(2);
                    }}
                  >
                    Choose Your Plan &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Choose Tier */}
          {step === 2 && (
            <div className="claim-step">
              <h2 className="claim-step__title">Choose Your Plan</h2>
              <p className="claim-step__sub">
                Every listing starts free. Upgrade anytime for enhanced features and visibility.
              </p>

              {error && <div className="claim-error">{error}</div>}

              <div className="claim-tiers">
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    className={`claim-tier${selectedTier === t.id ? ' claim-tier--selected' : ''}${t.highlight ? ' claim-tier--highlight' : ''}`}
                    onClick={() => setSelectedTier(t.id)}
                    aria-pressed={selectedTier === t.id}
                  >
                    {t.highlight && (
                      <span className="claim-tier__badge">Most Popular</span>
                    )}
                    <h3 className="claim-tier__name">{t.name}</h3>
                    <div className="claim-tier__price">
                      <span className="claim-tier__amount">{t.price}</span>
                      <span className="claim-tier__period">{t.priceNote}</span>
                    </div>
                    <ul className="claim-tier__features">
                      {t.features.map((f, i) => (
                        <li key={i} className="claim-tier__feature">
                          <span className="claim-tier__check" aria-hidden="true">&#10003;</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span className="claim-tier__select-label">
                      {selectedTier === t.id ? 'Selected' : 'Select Plan'}
                    </span>
                  </button>
                ))}
              </div>

              <div className="claim-form__actions">
                <button
                  className="btn btn--ghost"
                  onClick={() => setStep(1)}
                >
                  &larr; Back
                </button>
                <button
                  className="btn btn--primary"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting
                    ? 'Processing...'
                    : selectedTier === 'free'
                      ? 'Create Free Listing'
                      : 'Continue to Payment \u2192'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Success (free tier) */}
          {step === 3 && successSlug && (
            <div className="claim-step claim-step--success">
              <div className="claim-success__ornament" aria-hidden="true">&#9670;</div>
              <h2 className="claim-step__title">Welcome to the Directory!</h2>
              <p className="claim-step__sub">
                Your listing for <strong>{form.name}</strong> has been created. It is now live in the
                Deep South Directory.
              </p>
              <div className="claim-success__actions">
                <a
                  href={`/media/directory/${successSlug}`}
                  className="btn btn--primary"
                >
                  View Your Listing &rarr;
                </a>
                <a
                  href="/media/directory"
                  className="btn btn--ghost"
                >
                  Browse the Directory
                </a>
              </div>
            </div>
          )}

        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .claim-hero {
          position: relative;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }
        .claim-hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(200, 148, 62, 0.08) 0%, transparent 60%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 60px,
              rgba(200, 148, 62, 0.018) 60px,
              rgba(200, 148, 62, 0.018) 61px
            );
        }
        .claim-hero__content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-20) var(--space-6) var(--space-12);
        }
        .claim-hero__eyebrow {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-5);
        }
        .claim-hero__ornament {
          font-size: 8px;
        }
        .claim-hero__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, var(--text-5xl));
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-5);
        }
        .claim-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 560px;
          margin: 0;
        }

        /* ── Progress Bar ── */
        .claim-progress {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }
        .claim-progress__bar {
          display: flex;
          gap: var(--space-1);
          padding: var(--space-4) 0;
          overflow-x: auto;
        }
        .claim-progress__step {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          white-space: nowrap;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .claim-progress__step--active {
          color: var(--accent);
          background: rgba(200, 148, 62, 0.08);
        }
        .claim-progress__step--done {
          color: var(--text-muted);
        }
        .claim-progress__num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          font-size: 10px;
          font-weight: 700;
          background: var(--border);
          color: var(--text-disabled);
        }
        .claim-progress__step--active .claim-progress__num {
          background: var(--accent);
          color: var(--bg);
        }
        .claim-progress__step--done .claim-progress__num {
          background: rgba(200, 148, 62, 0.2);
          color: var(--accent);
        }
        .claim-progress__label {
          display: none;
        }
        @media (min-width: 580px) {
          .claim-progress__label {
            display: inline;
          }
        }

        /* ── Main ── */
        .claim-main {
          background: var(--bg);
          min-height: 60vh;
        }
        .claim-main .section-container {
          padding-top: var(--space-10);
          padding-bottom: var(--space-20);
          max-width: 800px;
        }

        /* ── Step ── */
        .claim-step {
          animation: claimFadeIn 0.3s var(--ease-default);
        }
        @keyframes claimFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .claim-step__title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-3);
        }
        .claim-step__sub {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0 0 var(--space-8);
          max-width: 560px;
        }
        .claim-step__sub strong {
          color: var(--text);
          font-weight: 600;
        }

        /* ── Error ── */
        .claim-error {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: #e05252;
          background: rgba(224, 82, 82, 0.08);
          border: 1px solid rgba(224, 82, 82, 0.25);
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-4);
          margin-bottom: var(--space-6);
        }

        /* ── Search ── */
        .claim-search {
          position: relative;
          margin-bottom: var(--space-6);
        }
        .claim-input--search {
          font-size: var(--text-lg) !important;
          padding: var(--space-4) var(--space-5) !important;
        }
        .claim-search__spinner {
          position: absolute;
          right: var(--space-4);
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-disabled);
          animation: pulse 1s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* ── Search Results ── */
        .claim-results {
          margin-bottom: var(--space-8);
        }
        .claim-results__heading {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          margin: 0 0 var(--space-4);
        }
        .claim-results__heading--empty {
          color: var(--text-muted);
          font-style: italic;
        }
        .claim-results__list {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .claim-result {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-4) var(--space-5);
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition:
            border-color var(--duration-fast) var(--ease-default),
            box-shadow var(--duration-fast) var(--ease-default);
        }
        .claim-result:hover {
          border-color: var(--accent);
          box-shadow: var(--shadow-glow);
        }
        .claim-result__info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .claim-result__name {
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
        }
        .claim-result__meta {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }
        .claim-result__action {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── Create New ── */
        .claim-create-new {
          text-align: center;
          padding-top: var(--space-4);
        }
        .claim-create-new__divider {
          position: relative;
          height: 1px;
          background: var(--border);
          margin: var(--space-6) 0;
        }
        .claim-create-new__or {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--bg);
          padding: 0 var(--space-4);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
        }
        .claim-create-new__btn {
          margin-bottom: var(--space-3);
        }
        .claim-create-new__note {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          margin: 0;
        }

        /* ── Form Inputs ── */
        .claim-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }
        .claim-form__row {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }
        .claim-form__row--half {
          flex-direction: column;
        }
        @media (min-width: 580px) {
          .claim-form__row--half {
            flex-direction: row;
            gap: var(--space-4);
          }
          .claim-form__row--half > * {
            flex: 1;
          }
        }
        .claim-label {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }
        .claim-input {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-4);
          width: 100%;
          outline: none;
          transition:
            border-color var(--duration-fast) var(--ease-default),
            box-shadow var(--duration-fast) var(--ease-default);
        }
        .claim-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(200, 148, 62, 0.15);
        }
        .claim-input::placeholder {
          color: var(--text-disabled);
        }
        .claim-input--select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5l5 5 5-5' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right var(--space-4) center;
          padding-right: var(--space-10);
        }
        .claim-input--textarea {
          resize: vertical;
          min-height: 100px;
          line-height: var(--leading-normal);
        }
        .claim-form__actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          padding-top: var(--space-6);
          border-top: 1px solid var(--border);
          margin-top: var(--space-4);
        }

        /* ── Tier Cards ── */
        .claim-tiers {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
        }
        @media (min-width: 580px) {
          .claim-tiers {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .claim-tier {
          position: relative;
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition:
            border-color var(--duration-fast) var(--ease-default),
            box-shadow var(--duration-fast) var(--ease-default),
            transform var(--duration-fast) var(--ease-default);
        }
        .claim-tier:hover {
          border-color: rgba(200, 148, 62, 0.4);
          transform: translateY(-2px);
        }
        .claim-tier--selected {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent), var(--shadow-glow);
        }
        .claim-tier--highlight {
          overflow: hidden;
        }
        .claim-tier--highlight::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 90% 70% at 50% -30%, rgba(200, 148, 62, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .claim-tier__badge {
          position: absolute;
          top: var(--space-3);
          right: var(--space-3);
          font-family: var(--font-body);
          font-size: 9px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          background: rgba(200, 148, 62, 0.1);
          border: 1px solid rgba(200, 148, 62, 0.25);
          border-radius: var(--radius-full);
          padding: 2px var(--space-2);
          line-height: 1.5;
        }
        .claim-tier__name {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-3);
        }
        .claim-tier__price {
          display: flex;
          align-items: baseline;
          gap: var(--space-1);
          margin-bottom: var(--space-5);
        }
        .claim-tier__amount {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: 1;
        }
        .claim-tier__period {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-disabled);
        }
        .claim-tier__features {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          flex: 1;
          margin-bottom: var(--space-5);
        }
        .claim-tier__feature {
          display: flex;
          align-items: flex-start;
          gap: var(--space-2);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
        }
        .claim-tier__check {
          color: var(--accent);
          font-size: var(--text-xs);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .claim-tier__select-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          text-align: center;
          padding-top: var(--space-3);
          border-top: 1px solid var(--border);
          transition: color var(--duration-fast) var(--ease-default);
        }
        .claim-tier--selected .claim-tier__select-label {
          color: var(--accent);
        }

        /* ── Success ── */
        .claim-step--success {
          text-align: center;
          padding: var(--space-12) 0;
        }
        .claim-success__ornament {
          font-size: 12px;
          color: var(--accent);
          opacity: 0.5;
          margin-bottom: var(--space-6);
          display: block;
        }
        .claim-step--success .claim-step__title {
          font-size: var(--text-3xl);
        }
        .claim-step--success .claim-step__sub {
          max-width: 480px;
          margin: 0 auto var(--space-8);
        }
        .claim-success__actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}
