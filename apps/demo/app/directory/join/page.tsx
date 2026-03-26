'use client';

// Deep South Directory — sign-up form
// Three fields, one button, no friction.
// On submit: stores to localStorage, redirects to /directory/dashboard.

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const C = {
  bg: '#FAFAF8',
  white: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  accent: '#B45309',
  accentHover: '#92400E',
  border: '#E5E5E0',
  borderFocus: '#B45309',
};

const CITIES = [
  'Natchez',
  'Clarksdale',
  'Vicksburg',
  'El Dorado',
  'Memphis',
  'New Orleans',
  'Shreveport',
  'Other',
];

export default function DirectoryJoin() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('');
  const [yourName, setYourName] = useState('');
  const [city, setCity] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = () => {
    const newErrors: Record<string, boolean> = {};
    if (!businessName.trim()) newErrors.businessName = true;
    if (!yourName.trim()) newErrors.yourName = true;
    if (!city) newErrors.city = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem(
      'dsd_business',
      JSON.stringify({ businessName: businessName.trim(), yourName: yourName.trim(), city })
    );
    router.push('/directory/dashboard');
  };

  const inputStyle = (field: string) => ({
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: 16,
    padding: '12px 0 12px',
    border: 'none',
    borderBottom: `1px solid ${
      errors[field] ? '#DC2626' : focusedField === field ? C.borderFocus : C.border
    }`,
    backgroundColor: 'transparent',
    width: '100%',
    outline: 'none',
    color: C.text,
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s ease',
    display: 'block',
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        fontFamily: 'var(--font-inter), sans-serif',
        color: C.text,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Nav */}
      <div
        style={{
          borderBottom: `1px solid ${C.border}`,
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: C.white,
        }}
      >
        <a
          href="/directory"
          style={{
            fontFamily: 'var(--font-abril), serif',
            fontSize: 20,
            color: C.text,
            fontWeight: 400,
            textDecoration: 'none',
          }}
        >
          Deep South Directory
        </a>
      </div>

      {/* Form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 460 }}>
          <h1
            style={{
              fontFamily: 'var(--font-abril), serif',
              fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
              fontWeight: 400,
              color: C.text,
              margin: '0 0 10px',
              lineHeight: 1.15,
            }}
          >
            Claim your free listing.
          </h1>
          <p
            style={{
              fontSize: 16,
              color: C.textSecondary,
              margin: '0 0 48px',
              lineHeight: 1.6,
            }}
          >
            Three minutes. No credit card. Your dashboard is waiting.
          </p>

          {/* Business name */}
          <div style={{ marginBottom: 36 }}>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.07em',
                textTransform: 'uppercase' as const,
                color: focusedField === 'businessName' ? C.accent : C.textMuted,
                marginBottom: 6,
                transition: 'color 0.2s ease',
              }}
            >
              Business Name
            </label>
            <input
              type="text"
              placeholder="e.g. River Road Antiques"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value);
                if (errors.businessName) setErrors((prev) => ({ ...prev, businessName: false }));
              }}
              onFocus={() => setFocusedField('businessName')}
              onBlur={() => setFocusedField(null)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
              style={inputStyle('businessName')}
              autoFocus
            />
            {errors.businessName && (
              <p style={{ fontSize: 13, color: '#DC2626', margin: '6px 0 0' }}>
                What&apos;s your business called?
              </p>
            )}
          </div>

          {/* Your name */}
          <div style={{ marginBottom: 36 }}>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.07em',
                textTransform: 'uppercase' as const,
                color: focusedField === 'yourName' ? C.accent : C.textMuted,
                marginBottom: 6,
                transition: 'color 0.2s ease',
              }}
            >
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g. Sandra Watkins"
              value={yourName}
              onChange={(e) => {
                setYourName(e.target.value);
                if (errors.yourName) setErrors((prev) => ({ ...prev, yourName: false }));
              }}
              onFocus={() => setFocusedField('yourName')}
              onBlur={() => setFocusedField(null)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
              style={inputStyle('yourName')}
            />
            {errors.yourName && (
              <p style={{ fontSize: 13, color: '#DC2626', margin: '6px 0 0' }}>
                Just your first name is fine.
              </p>
            )}
          </div>

          {/* City */}
          <div style={{ marginBottom: 48 }}>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.07em',
                textTransform: 'uppercase' as const,
                color: focusedField === 'city' ? C.accent : C.textMuted,
                marginBottom: 6,
                transition: 'color 0.2s ease',
              }}
            >
              City
            </label>
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                if (errors.city) setErrors((prev) => ({ ...prev, city: false }));
              }}
              onFocus={() => setFocusedField('city')}
              onBlur={() => setFocusedField(null)}
              style={{
                ...inputStyle('city'),
                appearance: 'none' as const,
                WebkitAppearance: 'none' as const,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 4px center',
                paddingRight: 24,
                cursor: 'pointer',
              }}
            >
              <option value="" disabled>
                Select your city
              </option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.city && (
              <p style={{ fontSize: 13, color: '#DC2626', margin: '6px 0 0' }}>
                Which city are you in?
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              backgroundColor: C.accent,
              color: '#FFFFFF',
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 600,
              fontSize: 18,
              padding: '16px 24px',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.accentHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.accent;
            }}
          >
            Get My Free Dashboard
          </button>

          <p
            style={{
              fontSize: 14,
              color: C.textMuted,
              textAlign: 'center' as const,
              margin: '16px 0 0',
            }}
          >
            No credit card. No commitment. Three minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
