'use client';

// apps/web/app/media/get-started/page.tsx
// Big Muddy Media — Get Started / Contact page
// Client component — contains the onboarding form.

import { useState, type FormEvent } from 'react';

const BUSINESS_TYPES = [
  { value: '', label: 'Select business type' },
  { value: 'restaurant', label: 'Restaurant / Bar / Cafe' },
  { value: 'venue', label: 'Music Venue / Event Space' },
  { value: 'hotel', label: 'Hotel / B&B / Inn' },
  { value: 'shop', label: 'Retail Shop / Boutique' },
  { value: 'tour', label: 'Tour Operator / Guide Service' },
  { value: 'service', label: 'Service Business' },
  { value: 'other', label: 'Other' },
];

const TIERS = [
  { value: '', label: 'Not sure yet' },
  { value: 'front-porch', label: 'Front Porch — $99/month' },
  { value: 'the-route', label: 'The Route — $299/month' },
  { value: 'river-room', label: 'River Room — $599/month' },
  { value: 'blues-room', label: 'The Blues Room — $1,200+/month' },
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  businessType: string;
  needs: string;
  tier: string;
}

const INITIAL_FORM: FormData = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  city: '',
  businessType: '',
  needs: '',
  tier: '',
};

export default function GetStartedPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.contactName,
          businessName: form.businessName,
          email: form.email,
          phone: form.phone || undefined,
          city: form.city || undefined,
          businessType: form.businessType || undefined,
          notes: form.needs || undefined,
          tier: form.tier || undefined,
          source: 'media-get-started',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setState('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      setState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again or email us directly.');
    }
  }

  return (
    <>
      {/* ── Header ── */}
      <section className="gs-header">
        <div className="section-container">
          <div className="gs-header__inner">
            <div className="section-label">Get Started</div>
            <h1 className="gs-header__title">
              Let's Talk About
              <br />
              <em>Your Business</em>
            </h1>
            <p className="gs-header__sub">
              Fill out the form and we'll be in touch within 24 hours.
              No pitch. No hard sell. Just a straight conversation about
              what we can do for you and what it will cost.
            </p>
            <div className="gs-header__trust">
              <div className="gs-trust-item">
                <span className="gs-trust-item__check" aria-hidden="true">&#10003;</span>
                <span>First month free while we set up</span>
              </div>
              <div className="gs-trust-item">
                <span className="gs-trust-item__check" aria-hidden="true">&#10003;</span>
                <span>No contracts, cancel anytime</span>
              </div>
              <div className="gs-trust-item">
                <span className="gs-trust-item__check" aria-hidden="true">&#10003;</span>
                <span>No setup fees</span>
              </div>
              <div className="gs-trust-item">
                <span className="gs-trust-item__check" aria-hidden="true">&#10003;</span>
                <span>Response within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="gs-form-section">
        <div className="section-container">
          <div className="gs-layout">
            {/* Form column */}
            <div className="gs-form-col">
              {state === 'success' ? (
                <div className="gs-success">
                  <div className="gs-success__icon" aria-hidden="true">&#10003;</div>
                  <h2 className="gs-success__title">We'll Be in Touch</h2>
                  <p className="gs-success__body">
                    Thanks for reaching out. We'll review your information and get back to you
                    within 24 hours to schedule a conversation. Check your email — and your
                    spam folder, just in case.
                  </p>
                  <a href="/media" className="btn btn--outline gs-success__home">
                    Back to Big Muddy Media
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="gs-form"
                  noValidate
                  aria-label="Get started with Big Muddy Media"
                >
                  <div className="gs-form__grid">
                    {/* Business Name */}
                    <div className="gs-field gs-field--full">
                      <label htmlFor="businessName" className="gs-field__label">
                        Business Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        className="gs-field__input"
                        placeholder="The Blue Note"
                        value={form.businessName}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        disabled={state === 'submitting'}
                      />
                    </div>

                    {/* Contact Name */}
                    <div className="gs-field">
                      <label htmlFor="contactName" className="gs-field__label">
                        Your Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contactName"
                        name="contactName"
                        type="text"
                        className="gs-field__input"
                        placeholder="Chase Pierson"
                        value={form.contactName}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        disabled={state === 'submitting'}
                      />
                    </div>

                    {/* Email */}
                    <div className="gs-field">
                      <label htmlFor="email" className="gs-field__label">
                        Email <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="gs-field__input"
                        placeholder="you@yourbusiness.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        disabled={state === 'submitting'}
                      />
                    </div>

                    {/* Phone */}
                    <div className="gs-field">
                      <label htmlFor="phone" className="gs-field__label">Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="gs-field__input"
                        placeholder="(601) 555-0100"
                        value={form.phone}
                        onChange={handleChange}
                        disabled={state === 'submitting'}
                      />
                    </div>

                    {/* City */}
                    <div className="gs-field">
                      <label htmlFor="city" className="gs-field__label">City</label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        className="gs-field__input"
                        placeholder="Natchez, MS"
                        value={form.city}
                        onChange={handleChange}
                        disabled={state === 'submitting'}
                      />
                    </div>

                    {/* Business Type */}
                    <div className="gs-field">
                      <label htmlFor="businessType" className="gs-field__label">Business Type</label>
                      <select
                        id="businessType"
                        name="businessType"
                        className="gs-field__select"
                        value={form.businessType}
                        onChange={handleChange}
                        disabled={state === 'submitting'}
                      >
                        {BUSINESS_TYPES.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tier interest */}
                    <div className="gs-field gs-field--full">
                      <label htmlFor="tier" className="gs-field__label">Which plan interests you?</label>
                      <select
                        id="tier"
                        name="tier"
                        className="gs-field__select"
                        value={form.tier}
                        onChange={handleChange}
                        disabled={state === 'submitting'}
                      >
                        {TIERS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Needs */}
                    <div className="gs-field gs-field--full">
                      <label htmlFor="needs" className="gs-field__label">
                        What do you need help with?
                      </label>
                      <textarea
                        id="needs"
                        name="needs"
                        className="gs-field__textarea"
                        placeholder="Tell us where you're at — what's working, what isn't, what you're trying to build."
                        rows={5}
                        value={form.needs}
                        onChange={handleChange}
                        disabled={state === 'submitting'}
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {state === 'error' && (
                    <div className="gs-error" role="alert">
                      <span aria-hidden="true">&#9888;</span> {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn--primary gs-form__submit"
                    disabled={state === 'submitting'}
                    aria-busy={state === 'submitting'}
                  >
                    {state === 'submitting' ? 'Sending...' : 'Send It'}
                  </button>

                  <p className="gs-form__disclaimer">
                    We'll be in touch within 24 hours. We don't sell your information to anyone.
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="gs-sidebar" aria-label="Contact information and what to expect">
              <div className="gs-sidebar__section">
                <h2 className="gs-sidebar__heading">What Happens Next</h2>
                <ol className="gs-sidebar__steps" role="list">
                  <li className="gs-sidebar__step">
                    <span className="gs-sidebar__step-num">1</span>
                    <div>
                      <strong>We read your form</strong>
                      <p>Within a few hours, someone on our team has read what you sent and looked up your business online.</p>
                    </div>
                  </li>
                  <li className="gs-sidebar__step">
                    <span className="gs-sidebar__step-num">2</span>
                    <div>
                      <strong>We reach out in 24 hours</strong>
                      <p>We'll email or call to set up a conversation. In-person if you're in the corridor. Video if you're not.</p>
                    </div>
                  </li>
                  <li className="gs-sidebar__step">
                    <span className="gs-sidebar__step-num">3</span>
                    <div>
                      <strong>We put together a plan</strong>
                      <p>After we talk, we'll send a specific plan — what we'd do, what it costs, what you can expect.</p>
                    </div>
                  </li>
                  <li className="gs-sidebar__step">
                    <span className="gs-sidebar__step-num">4</span>
                    <div>
                      <strong>You decide</strong>
                      <p>No pressure. No invoice until you've said yes and had time to think about it.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="gs-sidebar__section gs-sidebar__section--bordered">
                <h2 className="gs-sidebar__heading">Other Questions</h2>
                <p className="gs-sidebar__contact-text">
                  Prefer email? Reach us directly at{' '}
                  <a href="mailto:media@bigmuddytouring.com" className="gs-sidebar__email">
                    media@bigmuddytouring.com
                  </a>
                </p>
                <div className="gs-sidebar__links">
                  <a href="/media/pricing" className="gs-sidebar__link">See pricing →</a>
                  <a href="/media/how-it-works" className="gs-sidebar__link">How it works →</a>
                  <a href="/media/brands" className="gs-sidebar__link">Our brands →</a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Header ── */
        .gs-header {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .gs-header__inner {
          max-width: 680px;
        }
        .gs-header__title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-5);
        }
        .gs-header__title em {
          font-style: italic;
          color: var(--accent);
        }
        .gs-header__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-8);
          max-width: 560px;
        }
        .gs-header__trust {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4) var(--space-8);
        }
        .gs-trust-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
        .gs-trust-item__check {
          color: var(--accent);
          font-size: var(--text-sm);
        }

        /* ── Form Layout ── */
        .gs-form-section {
          background: var(--surface);
        }
        .gs-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
          align-items: start;
        }
        @media (min-width: 900px) {
          .gs-layout {
            grid-template-columns: 1fr 360px;
          }
        }

        /* ── Form ── */
        .gs-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }
        .gs-form__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-5);
        }
        @media (max-width: 600px) {
          .gs-form__grid {
            grid-template-columns: 1fr;
          }
        }
        .gs-field {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .gs-field--full {
          grid-column: 1 / -1;
        }
        .gs-field__label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
        }
        .gs-field__label span {
          color: var(--accent);
        }
        .gs-field__input,
        .gs-field__select,
        .gs-field__textarea {
          width: 100%;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-4);
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--text);
          outline: none;
          transition: border-color var(--duration-fast) var(--ease-default);
          appearance: none;
          -webkit-appearance: none;
        }
        .gs-field__input::placeholder,
        .gs-field__textarea::placeholder {
          color: var(--text-disabled);
        }
        .gs-field__input:focus,
        .gs-field__select:focus,
        .gs-field__textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-muted);
        }
        .gs-field__input:disabled,
        .gs-field__select:disabled,
        .gs-field__textarea:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .gs-field__select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a8074' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right var(--space-4) center;
          padding-right: var(--space-10);
        }
        .gs-field__textarea {
          resize: vertical;
          min-height: 120px;
          line-height: var(--leading-normal);
        }
        .gs-error {
          padding: var(--space-4);
          background: var(--error-muted);
          border: 1px solid var(--error);
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--error);
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
        }
        .gs-form__submit {
          align-self: flex-start;
          min-width: 160px;
          font-size: var(--text-base);
          padding: var(--space-4) var(--space-10);
        }
        .gs-form__submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .gs-form__disclaimer {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          margin: calc(-1 * var(--space-3)) 0 0;
          line-height: var(--leading-normal);
        }

        /* ── Success State ── */
        .gs-success {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--space-4);
          padding: var(--space-10) 0;
        }
        .gs-success__icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--success-muted);
          border: 1px solid var(--success);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-xl);
          color: var(--success);
        }
        .gs-success__title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0;
        }
        .gs-success__body {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
          max-width: 520px;
        }
        .gs-success__home {
          margin-top: var(--space-4);
        }

        /* ── Sidebar ── */
        .gs-sidebar {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .gs-sidebar__section {
          padding: var(--space-6);
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-5);
        }
        .gs-sidebar__section:last-child {
          margin-bottom: 0;
        }
        .gs-sidebar__heading {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-5);
        }
        .gs-sidebar__steps {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
          counter-reset: steps;
        }
        .gs-sidebar__step {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
        }
        .gs-sidebar__step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--accent-muted);
          border: 1px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .gs-sidebar__step strong {
          display: block;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text);
          margin-bottom: var(--space-1);
        }
        .gs-sidebar__step p {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }
        .gs-sidebar__contact-text {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0 0 var(--space-5);
        }
        .gs-sidebar__email {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .gs-sidebar__email:hover {
          color: var(--accent-hover);
        }
        .gs-sidebar__links {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .gs-sidebar__link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
          padding: var(--space-2) 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .gs-sidebar__link:last-child {
          border-bottom: none;
        }
        .gs-sidebar__link:hover {
          color: var(--accent);
        }
      `}</style>
    </>
  );
}
