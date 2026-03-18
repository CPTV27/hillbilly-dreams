'use client';

// packages/ui/components/NewsletterSignup.tsx
// Newsletter signup component — posts to /api/newsletter/subscribe

import React, { useState, useCallback, type FormEvent } from 'react';

interface NewsletterSignupProps {
  variant?: 'inline' | 'section' | 'minimal';
  publicationId?: string; // Beehiiv publication ID — set via env or prop
  brand?: string; // Brand key for per-brand lists (touring, magazine, inn, etc.)
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function NewsletterSignup({ variant = 'section', publicationId, brand }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;

      setState('submitting');
      setErrorMsg('');

      try {
        const res = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), brand }),
        });

        const data = await res.json();

        if (!res.ok) {
          setState('error');
          setErrorMsg(data.error || 'Something went wrong. Please try again.');
          return;
        }

        setState('success');
        setEmail('');
      } catch {
        setState('error');
        setErrorMsg('Network error. Please check your connection and try again.');
      }
    },
    [email, brand],
  );

  const successMessage = (
    <p className="newsletter-success" role="status">
      You&rsquo;re in. Welcome to the dispatch.
    </p>
  );

  const errorDisplay = state === 'error' && errorMsg ? (
    <p className="newsletter-error" role="alert">{errorMsg}</p>
  ) : null;

  const isDisabled = state === 'submitting';
  const buttonLabel = state === 'submitting' ? 'Subscribing\u2026' : 'Subscribe';

  if (variant === 'minimal') {
    return (
      <div className="newsletter-minimal">
        <p className="newsletter-minimal__label">Get the dispatch</p>
        {state === 'success' ? successMessage : (
          <form className="newsletter-minimal__form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="newsletter-minimal__input"
              aria-label="Email address"
              disabled={isDisabled}
              required
            />
            <button type="submit" className="newsletter-minimal__btn" disabled={isDisabled}>
              {buttonLabel}
            </button>
          </form>
        )}
        {errorDisplay}
        <style>{newsletterStyles}</style>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="newsletter-inline">
        <div className="newsletter-inline__content">
          <h3 className="newsletter-inline__title">The Big Muddy Dispatch</h3>
          <p className="newsletter-inline__desc">
            Weekly stories, music picks, and dispatches from the river corridor.
            No noise. Unsubscribe anytime.
          </p>
        </div>
        {state === 'success' ? successMessage : (
          <form className="newsletter-inline__form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="newsletter-inline__input"
              aria-label="Email address"
              disabled={isDisabled}
              required
            />
            <button type="submit" className="newsletter-inline__btn" disabled={isDisabled}>
              Subscribe Free
            </button>
          </form>
        )}
        {errorDisplay}
        <style>{newsletterStyles}</style>
      </div>
    );
  }

  // Default: section
  return (
    <section className="newsletter-section" aria-label="Newsletter signup">
      <div className="newsletter-section__inner">
        <div className="newsletter-section__ornament">&#9670;</div>
        <h2 className="newsletter-section__title">The Big Muddy Dispatch</h2>
        <p className="newsletter-section__sub">
          Stories, music, and dispatches from the Mississippi corridor
        </p>
        <p className="newsletter-section__desc">
          Every week: one story worth reading, one playlist worth hearing,
          one place worth visiting. The rhythm of the river, delivered to your inbox.
        </p>

        {/* Beehiiv embed will go here in Phase 3 */}
        {publicationId ? (
          <div
            className="newsletter-section__embed"
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://embeds.beehiiv.com/subscribe?publication_id=${publicationId}"
                width="100%" height="320" frameborder="0" scrolling="no"
                style="border-radius:8px;overflow:hidden;"></iframe>`,
            }}
          />
        ) : state === 'success' ? (
          <div className="newsletter-section__form">{successMessage}</div>
        ) : (
          <form className="newsletter-section__form" onSubmit={handleSubmit}>
            <div className="newsletter-section__fields">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="newsletter-section__input"
                aria-label="Email address"
                disabled={isDisabled}
                required
              />
              <button type="submit" className="newsletter-section__btn" disabled={isDisabled}>
                {buttonLabel}
              </button>
            </div>
            {errorDisplay}
            <p className="newsletter-section__footnote">
              Free forever. No spam. Unsubscribe with one click.
            </p>
          </form>
        )}
      </div>
      <style>{newsletterStyles}</style>
    </section>
  );
}

const newsletterStyles = `
  /* Success / error messages */
  .newsletter-success {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--accent);
    font-weight: 600;
    margin: var(--space-2) 0 0;
  }
  .newsletter-error {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: #c0392b;
    margin: var(--space-2) 0 0;
  }

  /* Disabled state */
  .newsletter-section__btn:disabled,
  .newsletter-inline__btn:disabled,
  .newsletter-minimal__btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Section variant */
  .newsletter-section {
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .newsletter-section__inner {
    max-width: 600px;
    margin: 0 auto;
    padding: var(--space-20) var(--space-6);
    text-align: center;
  }
  .newsletter-section__ornament {
    color: var(--accent);
    font-size: var(--text-sm);
    margin-bottom: var(--space-6);
    display: block;
  }
  .newsletter-section__title {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    font-weight: 700;
    color: var(--text);
    letter-spacing: var(--tracking-tight);
    line-height: var(--leading-tight);
    margin: 0 0 var(--space-2);
  }
  .newsletter-section__sub {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--accent);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    margin: 0 0 var(--space-6);
  }
  .newsletter-section__desc {
    font-family: var(--font-body);
    font-size: var(--text-md);
    color: var(--text-muted);
    line-height: var(--leading-loose);
    margin: 0 0 var(--space-8);
  }
  .newsletter-section__form {
    width: 100%;
  }
  .newsletter-section__fields {
    display: flex;
    gap: var(--space-3);
    max-width: 440px;
    margin: 0 auto;
  }
  @media (max-width: 480px) {
    .newsletter-section__fields {
      flex-direction: column;
    }
  }
  .newsletter-section__input {
    flex: 1;
    padding: var(--space-3) var(--space-4);
    background: var(--bg);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    color: var(--text);
    font-family: var(--font-body);
    font-size: var(--text-base);
    transition: border-color var(--duration-fast) var(--ease-default);
    outline: none;
  }
  .newsletter-section__input:focus {
    border-color: var(--accent);
  }
  .newsletter-section__input::placeholder {
    color: var(--text-disabled);
  }
  .newsletter-section__btn {
    padding: var(--space-3) var(--space-6);
    background: var(--accent);
    color: var(--bg);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 700;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background var(--duration-fast) var(--ease-default);
    white-space: nowrap;
  }
  .newsletter-section__btn:hover {
    background: var(--accent-hover);
  }
  .newsletter-section__footnote {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--text-disabled);
    margin: var(--space-3) 0 0;
  }
  .newsletter-section__embed {
    width: 100%;
    margin-top: var(--space-4);
  }

  /* Inline variant */
  .newsletter-inline {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }
  @media (min-width: 640px) {
    .newsletter-inline {
      flex-direction: row;
      align-items: center;
    }
    .newsletter-inline__content {
      flex: 1;
    }
  }
  .newsletter-inline__title {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--text);
    margin: 0 0 var(--space-2);
    letter-spacing: var(--tracking-tight);
  }
  .newsletter-inline__desc {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: var(--leading-normal);
    margin: 0;
  }
  .newsletter-inline__form {
    display: flex;
    gap: var(--space-2);
    flex-shrink: 0;
  }
  .newsletter-inline__input {
    padding: var(--space-3) var(--space-4);
    background: var(--bg);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    color: var(--text);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    width: 200px;
    outline: none;
    transition: border-color var(--duration-fast) var(--ease-default);
  }
  .newsletter-inline__input:focus {
    border-color: var(--accent);
  }
  .newsletter-inline__input::placeholder {
    color: var(--text-disabled);
  }
  .newsletter-inline__btn {
    padding: var(--space-3) var(--space-5);
    background: var(--accent);
    color: var(--bg);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 700;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background var(--duration-fast) var(--ease-default);
    white-space: nowrap;
  }
  .newsletter-inline__btn:hover {
    background: var(--accent-hover);
  }

  /* Minimal variant */
  .newsletter-minimal {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex-wrap: wrap;
  }
  .newsletter-minimal__label {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--text-muted);
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
    margin: 0;
    white-space: nowrap;
  }
  .newsletter-minimal__form {
    display: flex;
    gap: var(--space-2);
  }
  .newsletter-minimal__input {
    padding: var(--space-2) var(--space-3);
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    outline: none;
  }
  .newsletter-minimal__btn {
    padding: var(--space-2) var(--space-4);
    background: var(--accent);
    color: var(--bg);
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 700;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
  }
`;

export default NewsletterSignup;
