'use client';

import { useState, useEffect } from 'react';

const PASS = 'bedard';

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [val, setVal] = useState('');
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('briefing-bob-unlocked') === 'true') {
      setUnlocked(true);
    }
  }, []);

  const submit = () => {
    if (val.trim().toLowerCase() === PASS) {
      localStorage.setItem('briefing-bob-unlocked', 'true');
      setUnlocked(true);
    } else {
      setErr(true);
      setVal('');
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-inter), Inter, sans-serif',
    }}>
      <div style={{
        width: 400, maxWidth: '90vw',
        border: '1px solid #dadce0',
        borderRadius: 8,
        padding: '48px 40px 36px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: '0 0 8px', color: '#202124' }}>
          Confidential Briefing
        </h1>
        <p style={{ fontSize: 14, color: '#5f6368', margin: '0 0 32px' }}>
          Enter the access code to continue.
        </p>

        <div style={{ width: '100%', textAlign: 'left', marginBottom: 24 }}>
          <input
            type="password"
            placeholder="Access code"
            value={val}
            onChange={(e) => { setVal(e.target.value); setErr(false); }}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            autoFocus
            style={{
              width: '100%', padding: '12px 14px',
              border: err ? '1px solid #d93025' : '1px solid #dadce0',
              borderRadius: 4, fontSize: 15, outline: 'none',
              boxSizing: 'border-box', color: '#202124',
              fontFamily: 'inherit'
            }}
          />
          {err && (
            <div style={{ color: '#d93025', fontSize: 12, marginTop: 4 }}>
              Invalid code.
            </div>
          )}
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={submit}
            style={{
              backgroundColor: '#1a73e8', color: 'white',
              border: 'none', borderRadius: 4,
              padding: '10px 24px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit'
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
