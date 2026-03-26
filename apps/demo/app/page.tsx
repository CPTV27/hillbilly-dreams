'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const USERS: Record<string, string> = {
  tracy: '/welcome/tracy',
  amy: '/welcome/amy',
  jp: '/welcome/jp',
  chase: '/welcome/chase',
};

const C = {
  bg: '#f8f9fa',
  card: '#ffffff',
  border: '#e8eaed',
  text: '#202124',
  muted: '#9aa0a6',
  accent: '#b45309',
};

export default function Gate() {
  const router = useRouter();
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  const handleSubmit = () => {
    const key = pw.toLowerCase().trim();
    if (USERS[key]) {
      router.push(USERS[key]);
    } else {
      setErr(true);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 420, padding: '0 24px' }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: C.accent,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            margin: '0 0 24px',
          }}
        >
          Measurably Better
        </p>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            color: C.text,
            margin: '0 0 12px',
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
          }}
        >
          The South has the culture. We&apos;re building the infrastructure to match.
        </h1>
        <p style={{ fontSize: 15, color: C.muted, margin: '0 0 32px' }}>
          Enter your name to continue.
        </p>
        <input
          type="text"
          placeholder="Your first name"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setErr(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          autoFocus
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: 16,
            padding: '14px 20px',
            border: `1px solid ${err ? '#c00' : C.border}`,
            borderRadius: 10,
            backgroundColor: C.card,
            textAlign: 'center',
            width: '100%',
            outline: 'none',
            color: C.text,
            boxSizing: 'border-box' as const,
          }}
        />
        {err && (
          <p style={{ fontSize: 13, color: '#c00', marginTop: 12 }}>
            Name not recognized. Contact Chase for access.
          </p>
        )}
        <p style={{ fontSize: 12, color: C.muted, marginTop: 32 }}>
          Hillbilly Dreams, Inc. &middot; Natchez, Mississippi
        </p>
      </div>
    </div>
  );
}
