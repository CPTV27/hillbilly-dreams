'use client';

// apps/web/app/admin/snap/page.tsx
// Admin — Snap & Share session manager.
// Create sessions, generate QR codes, copy share links, print 4x6 QR cards.
//
// To connect to real DB:
//   - Replace DEMO_SESSIONS with a fetch to /api/snap (GET all sessions)
//   - Wire the create form POST to /api/snap (create session)

import { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────
interface SnapSession {
  id: string;
  code: string;
  name: string;
  location: string;
  date: string;
  description?: string;
  status: 'active' | 'archived';
  photoCount: number;
  totalShares: number;
  createdAt: string;
}

// ─── Demo Data ────────────────────────────────────────────────
const DEMO_SESSIONS: SnapSession[] = [
  {
    id: 's1',
    code: 'blues-room-mar-15',
    name: 'Blues Room — March 15, 2026',
    location: 'The Big Muddy Inn',
    date: '2026-03-15',
    description: 'Arrie B. Aslin Friday night session.',
    status: 'active',
    photoCount: 8,
    totalShares: 47,
    createdAt: '2026-03-15T18:00:00',
  },
  {
    id: 's2',
    code: 'natchez-blues-fest-mar-08',
    name: 'Natchez Blues Fest — March 8, 2026',
    location: 'The Big Muddy Inn · Outdoor Stage',
    date: '2026-03-08',
    status: 'archived',
    photoCount: 24,
    totalShares: 131,
    createdAt: '2026-03-08T14:00:00',
  },
];

const BASE_URL = 'https://bigmuddyinn.com';

function qrUrl(code: string, size = 300): string {
  const target = encodeURIComponent(`${BASE_URL}/snap/${code}`);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${target}&bgcolor=0a0908&color=C8943E&margin=16`;
}

function galleryUrl(code: string): string {
  return `${BASE_URL}/snap/${code}`;
}

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// ─── QR Card (printable) ──────────────────────────────────────
function QRPrintCard({ session }: { session: SnapSession }) {
  return (
    <div
      style={{
        width: '4in',
        height: '6in',
        background: '#0a0908',
        border: '1px solid rgba(200,148,62,0.4)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        gap: '16px',
        fontFamily: 'Georgia, serif',
      }}
    >
      {/* Ornament */}
      <div style={{ fontSize: '10px', letterSpacing: '0.16em', color: '#C8943E', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
        Big Muddy Inn &middot; Natchez, MS
      </div>

      {/* QR */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={qrUrl(session.code, 240)}
        alt={`QR code for ${session.name}`}
        width={240}
        height={240}
        style={{ display: 'block', borderRadius: '4px' }}
      />

      {/* Session name */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: '#e8ddd0', margin: '0 0 4px', lineHeight: 1.25 }}>
          {session.name}
        </p>
        <p style={{ fontSize: '0.75rem', color: '#8a7a6a', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
          {session.location}
        </p>
      </div>

      <div style={{ width: '40px', height: '1px', background: 'rgba(200,148,62,0.4)' }} />

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: '#C8943E', margin: '0 0 6px', fontFamily: 'sans-serif', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Scan to see your photos
        </p>
        <p style={{ fontSize: '0.65rem', color: '#6a5c4e', margin: 0, fontFamily: 'sans-serif', letterSpacing: '0.08em' }}>
          {galleryUrl(session.code)}
        </p>
      </div>

      <p style={{ fontSize: '0.6rem', color: '#4a3e32', margin: '8px 0 0', fontFamily: 'sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Photos by Chase Pierson / Big Muddy Entertainment
      </p>
    </div>
  );
}

// ─── Session Row ──────────────────────────────────────────────
function SessionRow({
  session,
  onShowQR,
  onPrint,
}: {
  session: SnapSession;
  onShowQR: (s: SnapSession) => void;
  onPrint: (s: SnapSession) => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(galleryUrl(session.code));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <tr>
      <td>
        <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.875rem' }}>{session.name}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{session.location}</div>
      </td>
      <td>
        <code style={{ fontSize: '0.75rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
          /snap/{session.code}
        </code>
      </td>
      <td>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {formatDate(session.date)}
        </span>
      </td>
      <td style={{ textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text)' }}>
          {session.photoCount}
        </span>
      </td>
      <td style={{ textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: session.totalShares > 0 ? 'var(--accent)' : 'var(--text-muted)' }}>
          {session.totalShares}
        </span>
      </td>
      <td>
        <span className={`admin-badge admin-badge--${session.status}`}>{session.status}</span>
      </td>
      <td>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <a
            href={galleryUrl(session.code)}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn--ghost snap-action-btn"
          >
            View
          </a>
          <button
            onClick={() => onShowQR(session)}
            className="admin-btn admin-btn--ghost snap-action-btn"
          >
            QR
          </button>
          <button
            onClick={copyLink}
            className="admin-btn admin-btn--ghost snap-action-btn"
            style={copied ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}}
          >
            {copied ? 'Copied' : 'Copy Link'}
          </button>
          <button
            onClick={() => onPrint(session)}
            className="admin-btn admin-btn--ghost snap-action-btn"
          >
            Print Card
          </button>
        </div>
      </td>
    </tr>
  );
}

// ─── Create Session Form ──────────────────────────────────────
function CreateSessionForm({ onCreated }: { onCreated: (s: SnapSession) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('The Big Muddy Inn');
  const [date, setDate] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate slug from name
  const handleNameChange = (val: string) => {
    setName(val);
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 48);
    setCode(slug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date || !code) {
      setError('Name, date, and URL code are required.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      // Swap for real API call:
      // const res = await fetch('/api/snap', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, location, date, code, description }),
      // });
      // const json = await res.json();
      // onCreated(json.data);

      // Demo: create locally
      const newSession: SnapSession = {
        id: `s${Date.now()}`,
        code,
        name,
        location,
        date,
        description,
        status: 'active',
        photoCount: 0,
        totalShares: 0,
        createdAt: new Date().toISOString(),
      };
      onCreated(newSession);
      setOpen(false);
      setName(''); setLocation('The Big Muddy Inn'); setDate(''); setCode(''); setDescription('');
    } catch {
      setError('Failed to create session. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="admin-btn admin-btn--primary">
        + New Session
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(6,5,4,0.82)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '60px 16px',
        overflowY: 'auto',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '32px',
          width: '100%',
          maxWidth: '520px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text)', margin: '0 0 6px' }}>
          New Photo Session
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 24px', lineHeight: 1.5 }}>
          Creates a QR code gallery. Upload photos separately after creation.
        </p>

        {error && (
          <div className="admin-error-banner" style={{ marginBottom: '16px' }}>{error}</div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="admin-form-group" style={{ margin: 0 }}>
            <label className="admin-label admin-label--required" htmlFor="sess-name">Session Name</label>
            <input
              id="sess-name"
              className="admin-input"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Blues Room — March 15, 2026"
              required
            />
          </div>

          <div className="admin-form-group" style={{ margin: 0 }}>
            <label className="admin-label admin-label--required" htmlFor="sess-location">Location</label>
            <input
              id="sess-location"
              className="admin-input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="The Big Muddy Inn"
              required
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group" style={{ margin: 0 }}>
              <label className="admin-label admin-label--required" htmlFor="sess-date">Event Date</label>
              <input
                id="sess-date"
                className="admin-input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="admin-form-group" style={{ margin: 0 }}>
              <label className="admin-label admin-label--required" htmlFor="sess-code">URL Code (slug)</label>
              <input
                id="sess-code"
                className="admin-input"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="blues-room-mar-15"
                required
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-disabled)', marginTop: '4px' }}>
                /snap/{code || 'your-code-here'}
              </span>
            </div>
          </div>

          <div className="admin-form-group" style={{ margin: 0 }}>
            <label className="admin-label" htmlFor="sess-desc">Description <span style={{ color: 'var(--text-disabled)', fontWeight: 400 }}>(optional)</span></label>
            <textarea
              id="sess-desc"
              className="admin-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's the vibe? This shows on the public gallery."
              style={{ minHeight: '80px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={submitting} className="admin-btn admin-btn--primary" style={{ flex: 1 }}>
              {submitting ? 'Creating…' : 'Create Session'}
            </button>
            <button type="button" onClick={() => setOpen(false)} className="admin-btn admin-btn--ghost">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── QR Modal ─────────────────────────────────────────────────
function QRModal({ session, onClose }: { session: SnapSession; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const url = galleryUrl(session.code);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(6,5,4,0.88)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`QR code for ${session.name}`}
    >
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid rgba(200,148,62,0.25)',
          borderRadius: '12px',
          padding: '32px',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '16px' }}>
          QR Code
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text)', margin: '0 0 4px' }}>
          {session.name}
        </h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 20px', letterSpacing: '0.04em' }}>
          {session.location}
        </p>

        {/* QR image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrUrl(session.code, 300)}
          alt={`QR code for /snap/${session.code}`}
          width={220}
          height={220}
          style={{ display: 'block', margin: '0 auto 16px', borderRadius: '6px' }}
        />

        <code style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-disabled)', marginBottom: '20px', wordBreak: 'break-all', fontFamily: 'var(--font-mono)' }}>
          {url}
        </code>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={copyLink}
            className="admin-btn admin-btn--primary"
            style={{ flex: 1, ...(copied ? { background: 'var(--success)', borderColor: 'var(--success)' } : {}) }}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          <button onClick={onClose} className="admin-btn admin-btn--ghost">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Print Preview Modal ──────────────────────────────────────
function PrintModal({ session, onClose }: { session: SnapSession; onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(6,5,4,0.92)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        flexDirection: 'column',
        gap: '20px',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Print QR card preview"
    >
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => window.print()}
          className="admin-btn admin-btn--primary"
        >
          Print 4×6 Card
        </button>
        <button onClick={onClose} className="admin-btn admin-btn--ghost">
          Cancel
        </button>
      </div>

      <div className="snap-print-preview">
        <QRPrintCard session={session} />
      </div>

      <p style={{ fontSize: '0.72rem', color: 'var(--text-disabled)', letterSpacing: '0.08em', textAlign: 'center' }}>
        Print on 4&times;6 card stock. Set paper size to 4&times;6 in your print dialog.
      </p>

      <style>{`
        @media print {
          body > *:not(.snap-print-preview) { display: none !important; }
          .snap-print-preview {
            position: fixed !important;
            inset: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────
export default function AdminSnapPage() {
  const [sessions, setSessions]   = useState<SnapSession[]>(DEMO_SESSIONS);
  const [qrSession, setQrSession] = useState<SnapSession | null>(null);
  const [printSession, setPrintSession] = useState<SnapSession | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'archived'>('all');

  const filtered = sessions.filter((s) => statusFilter === 'all' || s.status === statusFilter);

  const totalShares = sessions.reduce((acc, s) => acc + s.totalShares, 0);
  const totalPhotos = sessions.reduce((acc, s) => acc + s.photoCount, 0);

  return (
    <>
      {/* Page header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Snap &amp; Share</h1>
          <p className="admin-page-sub">
            {sessions.length} sessions &middot; {totalPhotos} photos &middot; {totalShares} total shares
          </p>
        </div>
        <CreateSessionForm onCreated={(s) => setSessions((prev) => [s, ...prev])} />
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Active Sessions', value: sessions.filter((s) => s.status === 'active').length },
          { label: 'Total Photos',    value: totalPhotos },
          { label: 'Total Shares',    value: totalShares },
          { label: 'Avg Shares/Event', value: sessions.length > 0 ? Math.round(totalShares / sessions.length) : 0 },
        ].map((stat) => (
          <div key={stat.label} className="admin-card" style={{ padding: '16px 20px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.73rem', color: 'var(--text-disabled)', marginTop: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="admin-filter-bar">
        {(['all', 'active', 'archived'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={`admin-filter-btn ${statusFilter === f ? 'admin-filter-btn--active' : ''}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="admin-table-wrap snap-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Session</th>
              <th>URL Code</th>
              <th>Date</th>
              <th style={{ textAlign: 'center' }}>Photos</th>
              <th style={{ textAlign: 'center' }}>Shares</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="admin-empty">
                    <div className="admin-empty__icon">&#9670;</div>
                    <p className="admin-empty__text">No sessions yet. Create your first one above.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((session) => (
                <SessionRow
                  key={session.id}
                  session={session}
                  onShowQR={setQrSession}
                  onPrint={setPrintSession}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="snap-mobile-list">
        {filtered.map((session) => (
          <div key={session.id} className="admin-card snap-mobile-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>{session.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{session.location}</div>
              </div>
              <span className={`admin-badge admin-badge--${session.status}`}>{session.status}</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
              <span>{formatDate(session.date)}</span>
              <span>{session.photoCount} photos</span>
              <span style={{ color: 'var(--accent)' }}>{session.totalShares} shares</span>
            </div>
            <code style={{ display: 'block', fontSize: '0.7rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
              /snap/{session.code}
            </code>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <a href={galleryUrl(session.code)} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn--ghost snap-action-btn">View</a>
              <button onClick={() => setQrSession(session)} className="admin-btn admin-btn--ghost snap-action-btn">QR Code</button>
              <button onClick={() => setPrintSession(session)} className="admin-btn admin-btn--ghost snap-action-btn">Print Card</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {qrSession    && <QRModal    session={qrSession}    onClose={() => setQrSession(null)} />}
      {printSession && <PrintModal session={printSession} onClose={() => setPrintSession(null)} />}

      <style>{`
        .snap-table-wrap { display: none; }
        @media (min-width: 900px) {
          .snap-table-wrap { display: block; }
          .snap-mobile-list { display: none; }
        }
        .snap-mobile-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .snap-mobile-card {
          padding: 16px;
        }
        .snap-action-btn {
          font-size: 0.72rem;
          padding: 4px 10px;
        }
      `}</style>
    </>
  );
}
