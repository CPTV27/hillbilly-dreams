'use client';

// apps/web/app/private-events/page.tsx
// Public private-event inquiry form. Submits to /api/booking/quotes
// which creates a QuoteRequest in 'submitted' status. Tracy reviews
// from /admin/bookings and generates a quote.

import { useState, useEffect } from 'react';

type EventType = 'wedding' | 'retreat' | 'dinner' | 'corporate' | 'other';

const EVENT_OPTIONS: Array<{ value: EventType; label: string }> = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'retreat', label: 'Retreat' },
  { value: 'dinner', label: 'Private dinner' },
  { value: 'corporate', label: 'Corporate gathering' },
  { value: 'other', label: 'Something else' },
];

export default function PrivateEventsPage() {
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    eventType: 'wedding' as EventType,
    proposedDate: '',
    flexibleDates: false,
    guestCount: '',
    description: '',
    budget: '',
  });
  const [pageContent, setPageContent] = useState<{
    heroEyebrow?: string;
    heroHeadline?: string;
    heroSub?: string;
    footerNote?: string;
  } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/page-content?slug=private-events')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setPageContent(j?.data ?? null))
      .catch(() => {});
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.customerName.trim() || !form.customerEmail.includes('@') || !form.description.trim()) {
      setError('Name, email, and description required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/booking/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: 'big-muddy',
          brand: 'inn',
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          customerPhone: form.customerPhone || undefined,
          eventType: form.eventType,
          proposedDate: form.proposedDate || undefined,
          flexibleDates: form.flexibleDates,
          guestCount: form.guestCount ? Number(form.guestCount) : undefined,
          description: form.description,
          budget: form.budget || undefined,
        }),
      });
      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submit failed');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        style={{
          padding: '80px 24px',
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '20px', color: '#7fa86a' }}>✓</div>
        <h1 style={{ fontSize: '28px', margin: '0 0 12px', fontFamily: 'var(--font-display)' }}>
          We got it.
        </h1>
        <p style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '15px', lineHeight: 1.6 }}>
          Tracy personally reviews every private-event inquiry. You&rsquo;ll hear back
          within one business day — sooner if the date is soon.
        </p>
        <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '13px', marginTop: '24px' }}>
          If you need us faster, text {form.customerPhone ? 'us at' : ''} 601-555-INNKEEPER.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 24px', maxWidth: '640px', margin: '0 auto' }}>
      <header style={{ marginBottom: '24px' }}>
        {pageContent?.heroEyebrow && (
          <p style={{ color: 'var(--text-muted, #6b6254)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 6px' }}>
            {pageContent.heroEyebrow}
          </p>
        )}
        <h1 style={{ fontSize: '32px', margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
          {pageContent?.heroHeadline ?? 'Private events at the Inn'}
        </h1>
        <p style={{ color: 'var(--text-muted, #a89e8d)', margin: 0, fontSize: '15px', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
          {pageContent?.heroSub ?? `Whole-Inn rentals for weddings, retreats, dinners, and milestone gatherings. Tell us what you're imagining and we'll come back with a real proposal — not a templated quote.`}
        </p>
      </header>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            background: '#3a1a1a',
            border: '1px solid #c44',
            borderRadius: '4px',
            color: '#fcc',
            marginBottom: '16px',
            fontSize: '13px',
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={submit}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <Field label="Your name">
          <input
            type="text"
            required
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            style={fieldStyle}
          />
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Field label="Email">
            <input
              type="email"
              required
              value={form.customerEmail}
              onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
              style={fieldStyle}
            />
          </Field>
          <Field label="Phone (optional)">
            <input
              type="tel"
              value={form.customerPhone}
              onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
              style={fieldStyle}
            />
          </Field>
        </div>

        <Field label="Event type">
          <select
            value={form.eventType}
            onChange={(e) => setForm({ ...form, eventType: e.target.value as EventType })}
            style={fieldStyle}
          >
            {EVENT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Field label="Proposed date">
            <input
              type="date"
              value={form.proposedDate}
              onChange={(e) => setForm({ ...form, proposedDate: e.target.value })}
              style={fieldStyle}
            />
          </Field>
          <Field label="Guest count (rough)">
            <input
              type="number"
              min={1}
              value={form.guestCount}
              onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
              style={fieldStyle}
            />
          </Field>
        </div>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-muted, #a89e8d)',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={form.flexibleDates}
            onChange={(e) => setForm({ ...form, flexibleDates: e.target.checked })}
          />
          The date is flexible
        </label>

        <Field label="Budget (optional — gives us a starting point)">
          <input
            type="text"
            placeholder="$10K-$20K"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            style={fieldStyle}
          />
        </Field>

        <Field label="Tell us about it">
          <textarea
            required
            rows={5}
            placeholder="What's the vibe? Who's coming? Anything we should know up front?"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ ...fieldStyle, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '14px 24px',
            background: '#c8a676',
            color: '#191715',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            marginTop: '8px',
          }}
        >
          {loading ? 'Sending…' : 'Send inquiry'}
        </button>

        <p
          style={{
            color: 'var(--text-muted, #6b6254)',
            fontSize: '12px',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Tracy reads every inquiry. You&rsquo;ll hear back within 1 business day.
        </p>
      </form>
    </div>
  );
}

const fieldStyle = {
  width: '100%',
  padding: '10px 12px',
  background: 'var(--bg, #14110f)',
  border: '1px solid var(--border, #2a2723)',
  color: 'var(--text, #d8cfbe)',
  borderRadius: '4px',
  fontSize: '14px',
} as const;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          color: 'var(--text-muted, #6b6254)',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: '4px',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
