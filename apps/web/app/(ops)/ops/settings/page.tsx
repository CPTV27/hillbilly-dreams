'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const THEMES = [
  { value: 'futuristic', label: 'Futuristic', description: 'Dark glassmorphism, glowing accents, VR-ready.' },
  { value: 'retro', label: 'Classic Office', description: 'Typewriter-era memos, warm paper tones.' },
  { value: 'minimal', label: 'Clean & Minimal', description: 'Light, airy, no distractions.' },
];

const COMM_STYLES = [
  { value: 'bulleted_brief', label: 'Bulleted & Brief' },
  { value: 'detailed_warm', label: 'Detailed & Warm' },
  { value: 'data_heavy', label: 'Data-Heavy' },
];

const CHANNELS = [
  { value: 'asana', label: 'Asana' },
  { value: 'email', label: 'Email' },
  { value: 'google_chat', label: 'Google Chat' },
  { value: 'sms', label: 'SMS' },
  { value: 'slack', label: 'Slack' },
];

// All styles use CSS custom properties from the layout for theme awareness
const styles = {
  page: { maxWidth: '42rem', margin: '2rem auto' } as React.CSSProperties,
  heading: { fontSize: '1.75rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.5rem' } as React.CSSProperties,
  subtitle: { color: 'var(--theme-text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' } as React.CSSProperties,
  section: {
    backgroundColor: 'var(--theme-card-bg)',
    border: '1px solid var(--theme-card-border)',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  } as React.CSSProperties,
  sectionTitle: { fontSize: '1.1rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '1rem' } as React.CSSProperties,
  optionGrid: { display: 'grid', gap: '0.75rem' } as React.CSSProperties,
  channelGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' } as React.CSSProperties,
  option: (selected: boolean): React.CSSProperties => ({
    padding: '1rem 1.25rem',
    borderRadius: '0.75rem',
    border: selected ? '2px solid var(--theme-accent)' : '2px solid var(--theme-card-border)',
    backgroundColor: selected ? 'var(--theme-accent-bg)' : 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s',
    width: '100%',
    color: 'var(--theme-text-primary)',
  }),
  channelOption: (selected: boolean): React.CSSProperties => ({
    padding: '0.75rem',
    borderRadius: '0.75rem',
    border: selected ? '2px solid var(--theme-accent)' : '2px solid var(--theme-card-border)',
    backgroundColor: selected ? 'var(--theme-accent-bg)' : 'transparent',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.15s',
    fontWeight: 500,
    fontSize: '0.875rem',
    color: 'var(--theme-text-primary)',
  }),
  optionLabel: { fontWeight: 600, margin: 0, color: 'var(--theme-text-primary)' } as React.CSSProperties,
  optionDesc: { fontSize: '0.8rem', color: 'var(--theme-text-secondary)', margin: '0.25rem 0 0' } as React.CSSProperties,
  saveBtn: (enabled: boolean): React.CSSProperties => ({
    padding: '0.75rem 2rem',
    backgroundColor: enabled ? 'var(--theme-accent)' : 'var(--theme-card-border)',
    color: enabled ? '#fff' : 'var(--theme-text-muted)',
    fontWeight: 600,
    borderRadius: '0.75rem',
    border: 'none',
    cursor: enabled ? 'pointer' : 'not-allowed',
    fontSize: '1rem',
    width: '100%',
    opacity: enabled ? 1 : 0.5,
    transition: 'opacity 0.15s',
  }),
  saveBtnHint: {
    fontSize: '0.8rem',
    color: 'var(--theme-text-muted)',
    textAlign: 'center' as const,
    marginTop: '0.5rem',
  } as React.CSSProperties,
  timestamp: { fontSize: '0.8rem', color: 'var(--theme-text-muted)', marginTop: '1rem', textAlign: 'center' as const } as React.CSSProperties,
  success: {
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(52,211,153,0.15)',
    border: '1px solid rgba(52,211,153,0.3)',
    color: 'var(--theme-success)',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '1rem',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  error: {
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#ef4444',
    fontSize: '0.875rem',
    marginBottom: '1rem',
    textAlign: 'center' as const,
  } as React.CSSProperties,
};

export default function SettingsPage() {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const [theme, setTheme] = useState('');
  const [commStyle, setCommStyle] = useState('');
  const [channels, setChannels] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Load current preferences from database
  useEffect(() => {
    fetch('/api/user/preferences')
      .then(r => r.json())
      .then(prefs => {
        if (prefs && !prefs.error) {
          setTheme(prefs.interfaceTheme || 'minimal');
          setCommStyle(prefs.communicationStyle || '');
          setChannels(prefs.communicationChannels || []);
          if (prefs.communicationPrefsUpdatedAt) {
            setLastUpdated(prefs.communicationPrefsUpdatedAt);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleChannel = (ch: string) => {
    setChannels(prev => prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]);
  };

  const handleSave = async () => {
    if (!theme || !commStyle || channels.length === 0) return;
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interfaceTheme: theme,
          communicationStyle: commStyle,
          communicationChannels: channels,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }
      setSuccess('Preferences saved. Reloading...');
      setLastUpdated(new Date().toISOString());
      // Push new interfaceTheme into the JWT so the server layout
      // picks it up on reload without requiring a full re-login.
      await updateSession({ interfaceTheme: theme });
      setTimeout(() => {
        router.refresh();
        window.location.reload();
      }, 800);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ ...styles.page, textAlign: 'center', paddingTop: '4rem' }}>
        <p style={{ color: 'var(--theme-text-muted)' }}>Loading preferences...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Settings</h1>
      <p style={styles.subtitle}>Customize your ops experience. Changes take effect immediately.</p>

      {success && <div style={styles.success}>{success}</div>}
      {error && <div style={styles.error}>{error}</div>}

      {/* Interface Theme */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Interface Theme</h2>
        <div style={styles.optionGrid}>
          {THEMES.map(t => (
            <button key={t.value} onClick={() => setTheme(t.value)} style={styles.option(theme === t.value)}>
              <h3 style={styles.optionLabel}>{t.label}</h3>
              <p style={styles.optionDesc}>{t.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Communication Style */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Communication Style</h2>
        <div style={styles.optionGrid}>
          {COMM_STYLES.map(s => (
            <button key={s.value} onClick={() => setCommStyle(s.value)} style={styles.option(commStyle === s.value)}>
              <h3 style={styles.optionLabel}>{s.label}</h3>
            </button>
          ))}
        </div>
      </div>

      {/* Communication Channels */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Notification Channels</h2>
        <div style={styles.channelGrid}>
          {CHANNELS.map(ch => (
            <button key={ch.value} onClick={() => toggleChannel(ch.value)} style={styles.channelOption(channels.includes(ch.value))}>
              {ch.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!theme || !commStyle || channels.length === 0 || saving}
        style={styles.saveBtn(!saving && !!theme && !!commStyle && channels.length > 0)}
      >
        {saving ? 'Saving...' : 'Save Preferences'}
      </button>

      {(!theme || !commStyle || channels.length === 0) && !saving && (
        <p style={styles.saveBtnHint}>
          Select a theme, communication style, and at least one channel to save.
        </p>
      )}

      {lastUpdated && (
        <p style={styles.timestamp}>
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </p>
      )}
    </div>
  );
}
