'use client';

import { useId, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';

export interface NotificationPrefsFormProps {
  initialPrefs?: {
    email?: boolean;
    asana?: boolean;
    sms?: boolean;
    googleChat?: boolean;
  };
  onSave: (prefs: {
    email: boolean;
    asana: boolean;
    sms: boolean;
    googleChat: boolean;
  }) => Promise<void>;
  saving?: boolean;
  error?: string | null;
}

const wrap: CSSProperties = {
  width: '100%',
  maxWidth: 480,
  margin: '0 auto',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
};

const errorBanner: CSSProperties = {
  marginBottom: 16,
  padding: '10px 12px',
  borderRadius: 8,
  fontSize: '0.8125rem',
  lineHeight: 1.45,
  color: 'var(--error, #fca5a5)',
  background: 'rgba(239, 68, 68, 0.12)',
  border: '1px solid rgba(239, 68, 68, 0.35)',
};

const fieldsetStyle: CSSProperties = {
  margin: 0,
  padding: 0,
  border: 'none',
};

const legendStyle: CSSProperties = {
  padding: 0,
  marginBottom: 12,
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--accent, #f97316)',
};

const row: CSSProperties = {
  display: 'flex',
  gap: 12,
  alignItems: 'flex-start',
  padding: '12px 0',
  borderBottom: '1px solid var(--card-border-color, rgba(200, 148, 62, 0.12))',
};

const labelTitle: CSSProperties = {
  margin: 0,
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'var(--text, rgba(240, 235, 224, 0.92))',
  cursor: 'pointer',
};

const labelDesc: CSSProperties = {
  margin: '4px 0 0',
  fontSize: '0.75rem',
  lineHeight: 1.45,
  color: 'var(--text-muted, rgba(240, 235, 224, 0.55))',
};

const checkbox: CSSProperties = {
  width: 18,
  height: 18,
  marginTop: 2,
  flexShrink: 0,
  cursor: 'pointer',
  accentColor: 'var(--accent, #f97316)',
};

const recommend: CSSProperties = {
  marginTop: 12,
  fontSize: '0.75rem',
  lineHeight: 1.5,
  color: 'var(--text-muted, rgba(240, 235, 224, 0.45))',
};

const submitBtn: CSSProperties = {
  marginTop: 20,
  width: '100%',
  padding: '14px 20px',
  border: 'none',
  borderRadius: 10,
  fontSize: '0.9375rem',
  fontWeight: 700,
  cursor: 'pointer',
  background: 'var(--accent, #f97316)',
  color: 'var(--accent-contrast, #1a1816)',
  fontFamily: 'inherit',
};

export function NotificationPrefsForm({
  initialPrefs,
  onSave,
  saving = false,
  error,
}: NotificationPrefsFormProps) {
  const baseId = useId();
  const [prefs, setPrefs] = useState(() => ({
    email: initialPrefs?.email ?? true,
    asana: initialPrefs?.asana ?? true,
    sms: initialPrefs?.sms ?? true,
    googleChat: initialPrefs?.googleChat ?? false,
  }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSave(prefs);
  }

  const fields = [
    {
      key: 'email' as const,
      title: 'Email',
      desc: 'for scheduled posts, article confirmations, review alerts',
    },
    {
      key: 'asana' as const,
      title: 'Asana',
      desc: 'task-level notifications inside Asana',
    },
    {
      key: 'sms' as const,
      title: 'SMS',
      desc: 'urgent only — show cancellations, guest emergencies, low-star reviews',
    },
    {
      key: 'googleChat' as const,
      title: 'Google Chat',
      desc: 'weekly Delta Dawn check-ins and quick questions',
    },
  ];

  return (
    <form style={wrap} onSubmit={handleSubmit} noValidate>
      {error ? (
        <div role="alert" style={errorBanner}>
          {error}
        </div>
      ) : null}

      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Where to reach you</legend>

        {fields.map((f, i) => {
          const id = `${baseId}-${f.key}`;
          const rowStyle: CSSProperties = {
            ...row,
            borderBottom:
              i === fields.length - 1
                ? 'none'
                : '1px solid var(--card-border-color, rgba(200, 148, 62, 0.12))',
          };
          return (
            <div key={f.key} style={rowStyle}>
              <input
                id={id}
                type="checkbox"
                checked={prefs[f.key]}
                style={checkbox}
                onChange={() =>
                  setPrefs((p) => ({ ...p, [f.key]: !p[f.key] }))
                }
              />
              <div>
                <label htmlFor={id} style={labelTitle}>
                  {f.title}
                </label>
                <p style={labelDesc}>{f.desc}</p>
              </div>
            </div>
          );
        })}
      </fieldset>

      <p style={recommend}>
        Recommended: email + Asana on for the daily rhythm, SMS on for emergencies.
      </p>

      <button
        type="submit"
        style={{
          ...submitBtn,
          opacity: saving ? 0.75 : 1,
          cursor: saving ? 'not-allowed' : 'pointer',
        }}
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save preferences'}
      </button>
    </form>
  );
}

export default NotificationPrefsForm;
