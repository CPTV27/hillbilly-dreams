'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const USERS: Record<string, string> = {
  tracy: '/welcome/tracy',
  amy: '/welcome/amy',
  jp: '/welcome/jp',
  chase: '/welcome/chase',
  directory: '/directory',
};

const C = {
  bg: '#FAFAF8',
  text: '#1A1A1A',
  accent: '#B45309',
  muted: '#6B7280',
  border: '#E5E5E0',
};

export default function Gate() {
  const router = useRouter();
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
        fontFamily: 'var(--font-inter), sans-serif',
        animation: 'fadeIn 0.8s ease-in-out',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div style={{ textAlign: 'center', maxWidth: 420, padding: '0 24px', width: '100%' }}>
        <h1
          style={{
            fontFamily: 'var(--font-abril), serif',
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: 400,
            color: C.text,
            margin: '0 0 16px',
            lineHeight: 1.1,
          }}
        >
          Measurably Better
        </h1>
        <p style={{ 
          fontSize: 16, 
          color: C.muted, 
          margin: '0 0 8px',
          fontWeight: 400,
        }}>
          The South has the culture.
        </p>
        <p style={{ 
          fontSize: 16, 
          color: C.muted, 
          margin: '0 0 48px',
          fontWeight: 400,
        }}>
          We&apos;re building the infrastructure to match.
        </p>
        
        <input
          type="text"
          placeholder="Enter your name to continue"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setErr(false);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          autoFocus
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 16,
            padding: '12px 0 12px',
            border: 'none',
            borderBottom: `1px solid ${err ? '#c00' : (isFocused ? C.accent : C.border)}`,
            backgroundColor: 'transparent',
            textAlign: 'center',
            width: '100%',
            outline: 'none',
            color: C.text,
            boxSizing: 'border-box' as const,
            transition: 'border-color 0.2s ease',
          }}
        />
        {err && (
          <p style={{ fontSize: 13, color: '#c00', marginTop: 12 }}>
            Name not recognized. Contact Chase for access.
          </p>
        )}
        <p style={{ fontSize: 12, color: C.muted, marginTop: 64 }}>
          Hillbilly Dreams, Inc. &middot; Natchez, Mississippi
        </p>
      </div>
    </div>
  );
}
