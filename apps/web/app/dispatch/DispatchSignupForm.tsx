'use client';

// apps/web/app/dispatch/DispatchSignupForm.tsx
// Email-capture form for the Dispatch No. 01 landing page.
// POSTs to /api/dispatch/subscribe. Token-disciplined per CLAUDE.md.

import { useState } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DispatchSignupForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState('error');
      setErrorMessage('Please enter a valid email.');
      return;
    }

    setState('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/dispatch/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || 'Something went wrong. Try again.');
      }

      setState('success');
      setEmail('');
    } catch (err) {
      setState('error');
      setErrorMessage(err instanceof Error ? err.message : 'Try again.');
    }
  }

  if (state === 'success') {
    return (
      <p
        role="status"
        style={{
          margin: '2.5rem 0 0',
          maxWidth: '36rem',
          padding: '1rem 1.25rem',
          borderRadius: '999px',
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          color: 'var(--text)',
          lineHeight: 1.5,
        }}
      >
        You&rsquo;re on the list. Dispatch No. 01 lands April 27.
      </p>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          margin: '2.5rem 0 0',
          maxWidth: '36rem',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <label
          htmlFor="dispatch-email"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          Email address
        </label>
        <input
          id="dispatch-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === 'error') setState('idle');
          }}
          disabled={state === 'submitting'}
          style={{
            flex: '1 1 240px',
            minHeight: '3rem',
            padding: '0 1.25rem',
            borderRadius: '999px',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text)',
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          style={{
            minHeight: '3rem',
            padding: '0 1.75rem',
            borderRadius: '999px',
            border: 'none',
            background: 'var(--accent)',
            color: 'var(--bg)',
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            cursor: state === 'submitting' ? 'wait' : 'pointer',
            opacity: state === 'submitting' ? 0.7 : 1,
          }}
        >
          {state === 'submitting' ? 'Adding…' : 'Join the Dispatch list'}
        </button>
      </form>

      <p
        style={{
          margin: '0.75rem 0 0',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-muted)',
        }}
      >
        No spam. Field notes only.
      </p>

      {state === 'error' && errorMessage ? (
        <p
          role="alert"
          style={{
            margin: '0.5rem 0 0',
            fontSize: 'var(--text-sm)',
            color: 'var(--accent)',
          }}
        >
          {errorMessage}
        </p>
      ) : null}
    </>
  );
}
