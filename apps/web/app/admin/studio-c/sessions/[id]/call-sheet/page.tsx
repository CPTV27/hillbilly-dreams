'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState, type CSSProperties } from 'react';

type SessionRow = {
  id: string;
  clientBrand: string;
  requestType: string;
  brief: string;
  location: string | null;
  preferredDate: string | null;
  status: string;
  assignedTo: string | null;
  jobId: number | null;
  notes: string | null;
  callSheet: Record<string, unknown> | null;
};

type CallFields = {
  sessionTime: string;
  loadIn: string;
  soundcheck: string;
  clientContact: string;
  engineer: string;
  musicians: string;
  equipment: string;
  catering: string;
  parking: string;
  emergencyPhone: string;
};

const EMPTY: CallFields = {
  sessionTime: '',
  loadIn: '',
  soundcheck: '',
  clientContact: '',
  engineer: '',
  musicians: '',
  equipment: '',
  catering: '',
  parking: '',
  emergencyPhone: '',
};

function sheetToFields(cs: Record<string, unknown> | null): CallFields {
  if (!cs) return { ...EMPTY };
  const g = (k: keyof CallFields) => (typeof cs[k] === 'string' ? (cs[k] as string) : '');
  return {
    sessionTime: g('sessionTime'),
    loadIn: g('loadIn'),
    soundcheck: g('soundcheck'),
    clientContact: g('clientContact'),
    engineer: g('engineer'),
    musicians: g('musicians'),
    equipment: g('equipment'),
    catering: g('catering'),
    parking: g('parking'),
    emergencyPhone: g('emergencyPhone'),
  };
}

function fieldsToSheet(f: CallFields): Record<string, string> {
  const out: Record<string, string> = {};
  (Object.keys(f) as (keyof CallFields)[]).forEach((k) => {
    if (f[k].trim()) out[k] = f[k].trim();
  });
  return out;
}

const BRAND_LABEL: Record<string, string> = {
  'big-muddy': 'Big Muddy',
  bearsville: 'Bearsville Creative',
  dsd: 'Deep South Directory',
  tuthill: 'Tuthill Design',
  magazine: 'Big Muddy Magazine',
};

export default function StudioCCallSheetPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const [row, setRow] = useState<SessionRow | null>(null);
  const [fields, setFields] = useState<CallFields>(EMPTY);
  const [preferredDate, setPreferredDate] = useState('');
  const [location, setLocation] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [portalUrl, setPortalUrl] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/studio-c/jobs/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Load failed');
      const d = json.data as SessionRow;
      setRow(d);
      const cs =
        d.callSheet && typeof d.callSheet === 'object' && !Array.isArray(d.callSheet)
          ? (d.callSheet as Record<string, unknown>)
          : null;
      setFields(sheetToFields(cs));
      setPreferredDate(d.preferredDate ? d.preferredDate.slice(0, 16) : '');
      setLocation(d.location || '');
      setAssignedTo(d.assignedTo || '');
      if (typeof window !== 'undefined') {
        setPortalUrl(`${window.location.origin}/studio-c/sessions/${id}`);
      }
    } catch {
      setRow(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    if (!id) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/studio-c/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callSheet: fieldsToSheet(fields),
          preferredDate: preferredDate ? new Date(preferredDate).toISOString() : null,
          location: location.trim() || null,
          assignedTo: assignedTo.trim() || null,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Save failed');
      setRow(json.data);
      setMessage('Saved.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const printNow = () => {
    if (typeof window !== 'undefined') window.print();
  };

  if (!id) {
    return <p style={{ fontFamily: 'var(--font-body, system-ui)', padding: '1rem' }}>Invalid session.</p>;
  }

  if (loading) {
    return (
      <div style={{ fontFamily: 'var(--font-body, system-ui)', padding: '1.5rem', color: 'var(--text-muted)' }}>
        Loading call sheet…
      </div>
    );
  }

  if (!row) {
    return (
      <div style={{ fontFamily: 'var(--font-body, system-ui)', padding: '1.5rem' }}>
        Session not found.
      </div>
    );
  }

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.65rem',
    borderRadius: '6px',
    border: '1px solid var(--border-strong, #333)',
    background: 'var(--surface-raised, #1a1816)',
    color: 'var(--text, #e8e4de)',
    fontFamily: 'var(--font-body, system-ui)',
    fontSize: '0.875rem',
  };

  const labelStyle: CSSProperties = {
    fontSize: '0.65rem',
    fontWeight: 700,
    color: 'var(--accent, #c8943e)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '0.35rem',
    display: 'block',
  };

  return (
    <div
      className="studio-c-call-sheet"
      style={{
        fontFamily: 'var(--font-body, system-ui)',
        padding: '1.25rem',
        maxWidth: '820px',
        margin: '0 auto',
        color: 'var(--text, #e8e4de)',
      }}
    >
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .studio-c-call-sheet { padding: 0; max-width: none; color: #000; background: #fff; }
          .studio-c-call-sheet input, .studio-c-call-sheet textarea {
            border: 1px solid #ccc !important; background: #fff !important; color: #000 !important;
          }
        }
      `}</style>

      <div className="no-print" style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
        <a href="/admin/studio-c/jobs" style={{ color: 'var(--accent, #c8943e)', fontWeight: 600, fontSize: '0.8rem' }}>
          ← Jobs queue
        </a>
        <button type="button" className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" className="admin-btn admin-btn--ghost" onClick={printNow}>
          Print
        </button>
        {message && <span style={{ fontSize: '0.8rem', color: message === 'Saved.' ? 'var(--success, #4a7c59)' : 'var(--danger, #b54c4c)' }}>{message}</span>}
      </div>

      <header style={{ borderBottom: '1px solid var(--border, #2a2725)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
        <h1 style={{ margin: '0 0 0.35rem', fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent, #c8943e)' }}>
          Session call sheet
        </h1>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Studio C · Utopia Studios, Bearsville, NY · Session id <code>{row.id}</code>
        </p>
        {portalUrl && (
          <p className="no-print" style={{ margin: '0.75rem 0 0', fontSize: '0.75rem', wordBreak: 'break-all', color: 'var(--text-muted)' }}>
            Client portal (share):{' '}
            <a href={portalUrl} style={{ color: 'var(--accent, #c8943e)' }}>
              {portalUrl}
            </a>
          </p>
        )}
      </header>

      <section style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', margin: '0 0 0.75rem' }}>
          Booking
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <div>
            <span style={labelStyle}>Brand</span>
            <div style={{ fontWeight: 600 }}>{BRAND_LABEL[row.clientBrand] || row.clientBrand}</div>
          </div>
          <div>
            <span style={labelStyle}>Type</span>
            <div>{row.requestType}</div>
          </div>
          <div>
            <span style={labelStyle}>Status</span>
            <div>{row.status}</div>
          </div>
          <div>
            <label style={labelStyle}>Session date / time</label>
            <input type="datetime-local" style={inputStyle} value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Location</label>
            <input style={inputStyle} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Utopia Studios, Bearsville NY" />
          </div>
          <div>
            <label style={labelStyle}>Lead engineer</label>
            <input style={inputStyle} value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
          </div>
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <span style={labelStyle}>Brief</span>
          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>{row.brief}</p>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Session time (call)</label>
          <input style={inputStyle} value={fields.sessionTime} onChange={(e) => setFields((f) => ({ ...f, sessionTime: e.target.value }))} placeholder="e.g. Doors 7pm / Roll 8pm" />
        </div>
        <div>
          <label style={labelStyle}>Load-in</label>
          <input style={inputStyle} value={fields.loadIn} onChange={(e) => setFields((f) => ({ ...f, loadIn: e.target.value }))} />
        </div>
        <div>
          <label style={labelStyle}>Soundcheck</label>
          <input style={inputStyle} value={fields.soundcheck} onChange={(e) => setFields((f) => ({ ...f, soundcheck: e.target.value }))} />
        </div>
        <div>
          <label style={labelStyle}>Client contact</label>
          <input style={inputStyle} value={fields.clientContact} onChange={(e) => setFields((f) => ({ ...f, clientContact: e.target.value }))} />
        </div>
        <div>
          <label style={labelStyle}>Engineer (call sheet)</label>
          <input style={inputStyle} value={fields.engineer} onChange={(e) => setFields((f) => ({ ...f, engineer: e.target.value }))} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Musicians / talent</label>
          <textarea style={{ ...inputStyle, minHeight: '72px', resize: 'vertical' }} value={fields.musicians} onChange={(e) => setFields((f) => ({ ...f, musicians: e.target.value }))} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Equipment</label>
          <textarea style={{ ...inputStyle, minHeight: '72px', resize: 'vertical' }} value={fields.equipment} onChange={(e) => setFields((f) => ({ ...f, equipment: e.target.value }))} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Catering / food</label>
          <textarea style={{ ...inputStyle, minHeight: '56px', resize: 'vertical' }} value={fields.catering} onChange={(e) => setFields((f) => ({ ...f, catering: e.target.value }))} placeholder="Orders, dietary, pickup — link Deep South Directory merchants when applicable" />
        </div>
        <div>
          <label style={labelStyle}>Parking / access</label>
          <input style={inputStyle} value={fields.parking} onChange={(e) => setFields((f) => ({ ...f, parking: e.target.value }))} />
        </div>
        <div>
          <label style={labelStyle}>Emergency phone</label>
          <input style={inputStyle} value={fields.emergencyPhone} onChange={(e) => setFields((f) => ({ ...f, emergencyPhone: e.target.value }))} />
        </div>
      </section>

      {row.jobId != null && (
        <p className="no-print" style={{ marginTop: '1.5rem', fontSize: '0.8rem' }}>
          <a href={`/admin/productions/${row.jobId}`} style={{ color: 'var(--accent, #c8943e)', fontWeight: 600 }}>
            Open production job #{row.jobId} →
          </a>
        </p>
      )}
    </div>
  );
}
