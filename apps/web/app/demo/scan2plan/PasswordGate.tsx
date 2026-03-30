'use client';

import { useState, useRef, useEffect } from 'react';

const PASS = 's2px2026';

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [val, setVal] = useState('');
  const [err, setErr] = useState(false);

  useEffect(() => {
    // Check local storage if they've already unlocked
    if (localStorage.getItem('s2px-unlocked') === 'true') {
      setUnlocked(true);
    }
  }, []);

  const submit = () => {
    if (val.trim().toLowerCase() === PASS) {
      localStorage.setItem('s2px-unlocked', 'true');
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
      fontFamily: 'var(--font-inter), sans-serif',
    }} className="no-print">
      <div style={{
        width: 448, maxWidth: '90vw',
        border: '1px solid #dadce0',
        borderRadius: 8,
        padding: '48px 40px 36px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Google-Style Logo Placeholder */}
        <div style={{
          fontSize: 24, fontWeight: 700, marginBottom: 16,
          letterSpacing: '-1px', display: 'flex', gap: 2,
          fontFamily: 'var(--font-outfit), sans-serif'
        }}>
          <span style={{color: '#4285F4'}}>S</span>
          <span style={{color: '#EA4335'}}>2</span>
          <span style={{color: '#FBBC05'}}>P</span>
          <span style={{color: '#34A853'}}>X</span>
        </div>
        
        <h1 style={{ fontSize: 24, fontWeight: 500, margin: '0 0 8px', color: '#202124' }}>
          Identity verification
        </h1>
        <p style={{ fontSize: 16, color: '#202124', margin: '0 0 32px' }}>
          This partner preview is password-protected.
        </p>

        <div style={{ width: '100%', textAlign: 'left', marginBottom: 32 }}>
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              placeholder="Enter access code"
              value={val}
              onChange={(e) => { setVal(e.target.value); setErr(false); }}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              autoFocus
              style={{
                width: '100%', padding: '13px 15px',
                border: err ? '1px solid #d93025' : '1px solid #dadce0',
                borderRadius: 4, fontSize: 16, outline: 'none',
                boxSizing: 'border-box', color: '#202124',
                fontFamily: 'inherit'
              }}
            />
            {err && (
              <div style={{ 
                color: '#d93025', fontSize: 12, marginTop: 4, 
                display: 'flex', alignItems: 'center', gap: 4 
              }}>
                <span style={{ fontWeight: 700 }}>!</span> Invalid code. Please try again.
              </div>
            )}
          </div>
        </div>

        <div style={{ 
          width: '100%', display: 'flex', justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <button 
            onClick={submit}
            style={{
              backgroundColor: '#4285F4', color: 'white',
              border: 'none', borderRadius: 4,
              padding: '10px 24px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit'
            }}
          >
            Next
          </button>
        </div>
      </div>
      
      <div style={{ 
        position: 'absolute', bottom: 20, width: '100%', 
        display: 'flex', justifyContent: 'center', gap: 20,
        fontSize: 12, color: '#5f6368' 
      }}>
        <span>Help</span>
        <span>Privacy</span>
        <span>Terms</span>
      </div>
    </div>
  );
}
