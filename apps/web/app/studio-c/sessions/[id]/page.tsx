'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type PortalPayload = {
  id: string;
  clientBrand: string;
  requestType: string;
  brief: string;
  location: string | null;
  preferredDate: string | null;
  status: string;
  assignedTo: string | null;
  budget: string | null;
  callSheet: Record<string, unknown> | null;
  updatedAt: string;
};

const BRAND_LABEL: Record<string, string> = {
  'big-muddy': 'Big Muddy',
  bearsville: 'Bearsville Creative',
  dsd: 'Deep South Directory',
  tuthill: 'Tuthill Design',
  magazine: 'Big Muddy Magazine',
};

const CS_KEYS = [
  { key: 'sessionTime', label: 'Session time' },
  { key: 'loadIn', label: 'Load-in' },
  { key: 'soundcheck', label: 'Soundcheck' },
  { key: 'clientContact', label: 'Your contact' },
  { key: 'engineer', label: 'Engineer' },
  { key: 'musicians', label: 'Musicians / talent' },
  { key: 'equipment', label: 'Equipment' },
  { key: 'catering', label: 'Catering' },
  { key: 'parking', label: 'Parking / access' },
  { key: 'emergencyPhone', label: 'Emergency' },
] as const;

function readSheet(cs: Record<string, unknown> | null): Record<string, string> {
  if (!cs) return {};
  const out: Record<string, string> = {};
  CS_KEYS.forEach(({ key }) => {
    const v = cs[key];
    if (typeof v === 'string' && v.trim()) out[key] = v;
  });
  return out;
}

export default function StudioCSessionPortalPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const [data, setData] = useState<PortalPayload | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/studio-c/sessions/${id}/portal`)
      .then((r) => r.json())
      .then((j) => {
        if (!j.data) throw new Error(j.error || 'Not found');
        setData(j.data);
      })
      .catch(() => setErr('This session link is invalid or expired.'));
  }, [id]);

  if (!id) {
    return <p style={{ padding: '1.5rem', fontFamily: 'var(--font-body, system-ui)' }}>Invalid link.</p>;
  }

  if (err) {
    return (
      <div
        style={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          fontFamily: 'var(--font-body, system-ui)',
          color: 'var(--text-muted, #6b635a)',
        }}
      >
        {err}
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'var(--font-body, system-ui)', color: 'var(--text-muted)' }}>
        Loading…
      </div>
    );
  }

  const sheet =
    data.callSheet && typeof data.callSheet === 'object' && !Array.isArray(data.callSheet)
      ? readSheet(data.callSheet as Record<string, unknown>)
      : {};

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--surface-0, #0f0f0f)',
        color: 'var(--text, #e8e4de)',
        fontFamily: 'var(--font-body, system-ui)',
        padding: '1.5rem',
        maxWidth: '640px',
        margin: '0 auto',
      }}
    >
      <header style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border, #2a2725)', paddingBottom: '1rem' }}>
        <p style={{ margin: 0, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent, #c8943e)', fontWeight: 700 }}>
          Studio C · Utopia Studios
        </p>
        <h1 style={{ margin: '0.35rem 0', fontSize: '1.35rem', fontWeight: 800 }}>Your session</h1>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {BRAND_LABEL[data.clientBrand] || data.clientBrand} · {data.requestType.replace(/-/g, ' ')}
        </p>
      </header>

      <section style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', margin: '0 0 0.5rem' }}>When & where</h2>
        {data.preferredDate && (
          <p style={{ margin: '0.25rem 0', fontWeight: 600 }}>{new Date(data.preferredDate).toLocaleString()}</p>
        )}
        {data.location && <p style={{ margin: '0.25rem 0' }}>{data.location}</p>}
        {data.assignedTo && (
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Lead: </span>
            {data.assignedTo}
          </p>
        )}
      </section>

      <section style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', margin: '0 0 0.5rem' }}>Brief</h2>
        <p style={{ margin: 0, lineHeight: 1.6, fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{data.brief}</p>
      </section>

      {Object.keys(sheet).length > 0 && (
        <section>
          <h2 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', margin: '0 0 0.75rem' }}>Call sheet</h2>
          <dl style={{ margin: 0 }}>
            {CS_KEYS.map(({ key, label }) => {
              const v = sheet[key as string];
              if (!v) return null;
              return (
                <div key={key} style={{ marginBottom: '0.75rem' }}>
                  <dt style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent, #c8943e)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</dt>
                  <dd style={{ margin: '0.25rem 0 0', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{v}</dd>
                </div>
              );
            })}
          </dl>
        </section>
      )}

      <footer style={{ marginTop: '2rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        Status: {data.status}
        {data.budget ? ` · Budget: ${data.budget}` : ''}
        <br />
        Updated {new Date(data.updatedAt).toLocaleString()}
      </footer>
    </div>
  );
}
