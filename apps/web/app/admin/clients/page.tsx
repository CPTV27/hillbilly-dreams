'use client';

// apps/web/app/admin/clients/page.tsx
// Client management for Big Muddy Entertainment Engine
// Tabs: Clients List | New Client | Client Detail
// Fetches from /api/clients — CRUD + AI voice/calendar/reviews/reports

import { useState, useMemo, useEffect, useCallback } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_FILTERS = ['all', 'onboarding', 'active', 'paused', 'churned'];

const TIER_FILTERS = ['all', 'front-porch', 'route', 'river-room', 'blues-room'];

const TIER_LABELS: Record<string, string> = {
  'front-porch': 'Front Porch',
  'route': 'The Route',
  'river-room': 'River Room',
  'blues-room': 'Blues Room',
};

const TIER_PRICES: Record<string, string> = {
  'front-porch': 'Front Porch — $99/mo',
  'route': 'The Route — $299/mo',
  'river-room': 'River Room — $599/mo',
  'blues-room': 'Blues Room — $1,200+/mo',
};

const BUSINESS_TYPES = ['restaurant', 'venue', 'hotel', 'shop', 'tour', 'service', 'other'];

const ALL_PLATFORMS = ['instagram', 'facebook', 'twitter', 'tiktok', 'bluesky', 'linkedin', 'google'];

const DETAIL_TABS = ['info', 'voice', 'calendar', 'reviews', 'reports'] as const;
type DetailTab = typeof DETAIL_TABS[number];

// ─── Types ────────────────────────────────────────────────────────────────────

interface Client {
  id: number;
  name: string;
  businessType: string | null;
  city: string | null;
  state: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  description: string | null;
  tier: string | null;
  status: string | null;
  platforms: string[] | null;
  googleBusinessUrl: string | null;
  notes: string | null;
  voiceProfile: Record<string, unknown> | null;
  contentCalendar: CalendarEntry[] | null;
  reviews: Review[] | null;
  reports: Report[] | null;
  createdAt: string;
  updatedAt: string;
}

interface CalendarEntry {
  id?: string;
  date: string;
  platform: string;
  contentType: string;
  topic: string;
  caption?: string;
  status: string;
}

interface Review {
  id?: string;
  platform: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  response?: string | null;
}

interface Report {
  id?: string;
  period: string;
  generatedAt: string;
  summary: string;
  metrics?: Record<string, unknown>;
}

type FormData = {
  name: string;
  businessType: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  tier: string;
  platforms: string[];
  googleBusinessUrl: string;
  notes: string;
};

const EMPTY_FORM: FormData = {
  name: '',
  businessType: 'restaurant',
  city: '',
  state: 'MS',
  address: '',
  phone: '',
  email: '',
  website: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  description: '',
  tier: 'front-porch',
  platforms: [],
  googleBusinessUrl: '',
  notes: '',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d: string | Date | null | undefined): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function tierBadgeClass(tier: string | null): string {
  if (!tier) return 'admin-badge admin-badge--draft';
  const map: Record<string, string> = {
    'front-porch': 'admin-badge admin-badge--draft',
    'route': 'admin-badge admin-badge--upcoming',
    'river-room': 'admin-badge admin-badge--review',
    'blues-room': 'admin-badge admin-badge--published',
  };
  return map[tier] ?? 'admin-badge admin-badge--draft';
}

function statusBadgeClass(status: string | null): string {
  if (!status) return 'admin-badge admin-badge--draft';
  const map: Record<string, string> = {
    'onboarding': 'admin-badge admin-badge--upcoming',
    'active': 'admin-badge admin-badge--active',
    'paused': 'admin-badge admin-badge--scheduled',
    'churned': 'admin-badge admin-badge--archived',
  };
  return map[status] ?? 'admin-badge admin-badge--draft';
}

function clientToForm(client: Client): FormData {
  return {
    name: client.name ?? '',
    businessType: client.businessType ?? 'restaurant',
    city: client.city ?? '',
    state: client.state ?? 'MS',
    address: client.address ?? '',
    phone: client.phone ?? '',
    email: client.email ?? '',
    website: client.website ?? '',
    contactName: client.contactName ?? '',
    contactEmail: client.contactEmail ?? '',
    contactPhone: client.contactPhone ?? '',
    description: client.description ?? '',
    tier: client.tier ?? 'front-porch',
    platforms: client.platforms ?? [],
    googleBusinessUrl: client.googleBusinessUrl ?? '',
    notes: client.notes ?? '',
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton--text" style={{ width: '65%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '50%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '55%' }} /></td>
      <td><div className="skeleton skeleton--badge" /></td>
      <td><div className="skeleton skeleton--badge" /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '30%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '30%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '60%' }} /></td>
    </tr>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="clients-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'clients-star--filled' : 'clients-star--empty'}>★</span>
      ))}
    </span>
  );
}

// ─── Client Form ──────────────────────────────────────────────────────────────

function ClientForm({
  initial,
  onSubmit,
  submitting,
  submitLabel,
  onCancel,
}: {
  initial: FormData;
  onSubmit: (data: FormData) => void;
  submitting: boolean;
  submitLabel: string;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<FormData>(initial);

  useEffect(() => { setForm(initial); }, [initial]);

  function set(key: keyof FormData, value: string | string[]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function togglePlatform(p: string) {
    const cur = form.platforms;
    set('platforms', cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]);
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
      noValidate
    >
      <div className="admin-card" style={{ marginBottom: 'var(--space-5)' }}>
        <h3 className="clients-section-title">Business Info</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label admin-label--required" htmlFor="client-name">Business Name</label>
            <input
              id="client-name"
              className="admin-input"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Doe's Eat Place"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="client-type">Business Type</label>
            <select id="client-type" className="admin-select" value={form.businessType} onChange={(e) => set('businessType', e.target.value)}>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label admin-label--required" htmlFor="client-city">City</label>
            <input
              id="client-city"
              className="admin-input"
              value={form.city}
              onChange={(e) => set('city', e.target.value)}
              placeholder="e.g. Greenville"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="client-state">State</label>
            <input
              id="client-state"
              className="admin-input"
              value={form.state}
              onChange={(e) => set('state', e.target.value)}
              placeholder="MS"
              maxLength={2}
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="client-address">Street Address</label>
          <input
            id="client-address"
            className="admin-input"
            value={form.address}
            onChange={(e) => set('address', e.target.value)}
            placeholder="123 Main St"
          />
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="client-phone">Phone</label>
            <input
              id="client-phone"
              className="admin-input"
              type="tel"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="(601) 555-0100"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="client-email">Business Email</label>
            <input
              id="client-email"
              className="admin-input"
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="hello@business.com"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="client-website">Website</label>
          <input
            id="client-website"
            className="admin-input"
            type="url"
            value={form.website}
            onChange={(e) => set('website', e.target.value)}
            placeholder="https://business.com"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="client-description">Description</label>
          <textarea
            id="client-description"
            className="admin-textarea"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="A brief description of the business, its vibe, and what makes it distinctive…"
            style={{ minHeight: '90px' }}
          />
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 'var(--space-5)' }}>
        <h3 className="clients-section-title">Primary Contact</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="contact-name">Contact Name</label>
            <input
              id="contact-name"
              className="admin-input"
              value={form.contactName}
              onChange={(e) => set('contactName', e.target.value)}
              placeholder="Jane Smith"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="contact-email">Contact Email</label>
            <input
              id="contact-email"
              className="admin-input"
              type="email"
              value={form.contactEmail}
              onChange={(e) => set('contactEmail', e.target.value)}
              placeholder="jane@business.com"
            />
          </div>
        </div>
        <div className="admin-form-group" style={{ maxWidth: '340px' }}>
          <label className="admin-label" htmlFor="contact-phone">Contact Phone</label>
          <input
            id="contact-phone"
            className="admin-input"
            type="tel"
            value={form.contactPhone}
            onChange={(e) => set('contactPhone', e.target.value)}
            placeholder="(601) 555-0101"
          />
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 'var(--space-5)' }}>
        <h3 className="clients-section-title">Plan &amp; Platforms</h3>

        <div className="admin-form-group" style={{ maxWidth: '400px' }}>
          <label className="admin-label" htmlFor="client-tier">Tier</label>
          <select id="client-tier" className="admin-select" value={form.tier} onChange={(e) => set('tier', e.target.value)}>
            {Object.entries(TIER_PRICES).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        <div className="admin-form-group">
          <span className="admin-label">Platforms</span>
          <div className="clients-platform-grid">
            {ALL_PLATFORMS.map((p) => (
              <label key={p} className={`clients-platform-chip ${form.platforms.includes(p) ? 'clients-platform-chip--active' : ''}`}>
                <input
                  type="checkbox"
                  checked={form.platforms.includes(p)}
                  onChange={() => togglePlatform(p)}
                  className="clients-platform-checkbox"
                />
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="client-gbp">Google Business Profile URL</label>
          <input
            id="client-gbp"
            className="admin-input"
            type="url"
            value={form.googleBusinessUrl}
            onChange={(e) => set('googleBusinessUrl', e.target.value)}
            placeholder="https://business.google.com/…"
          />
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 'var(--space-5)' }}>
        <h3 className="clients-section-title">Internal Notes</h3>
        <div className="admin-form-group" style={{ marginBottom: 0 }}>
          <label className="admin-label" htmlFor="client-notes">Notes</label>
          <textarea
            id="client-notes"
            className="admin-textarea"
            value={form.notes}
            onChange={(e) => set('notes', e.target.value)}
            placeholder="Internal notes, onboarding details, quirks, anything worth remembering…"
          />
        </div>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn--primary" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="admin-btn admin-btn--ghost" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// ─── Client Detail ────────────────────────────────────────────────────────────

function ClientDetail({
  client,
  onSaved,
  onBack,
}: {
  client: Client;
  onSaved: (updated: Client) => void;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState<DetailTab>('info');
  const [formData, setFormData] = useState<FormData>(clientToForm(client));
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [voiceLoading, setVoiceLoading] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceProfile, setVoiceProfile] = useState<Record<string, unknown> | null>(client.voiceProfile ?? null);

  const [calendarLoading, setCalendarLoading] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const [calendar, setCalendar] = useState<CalendarEntry[]>(client.contentCalendar ?? []);

  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>(client.reviews ?? []);

  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>(client.reports ?? []);

  async function handleSave(data: FormData) {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`${baseUrl}/api/clients/${client.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setFormData(clientToForm(json.data ?? json));
      onSaved(json.data ?? json);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  }

  async function handleGenerateVoice() {
    setVoiceLoading(true);
    setVoiceError(null);
    try {
      const res = await fetch(`${baseUrl}/api/clients/${client.id}/voice`, { method: 'POST' });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setVoiceProfile(json.data ?? json);
    } catch (err) {
      setVoiceError(err instanceof Error ? err.message : 'Voice generation failed.');
    } finally {
      setVoiceLoading(false);
    }
  }

  async function handleGenerateCalendar() {
    setCalendarLoading(true);
    setCalendarError(null);
    try {
      const res = await fetch(`${baseUrl}/api/clients/${client.id}/calendar`, { method: 'POST' });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setCalendar(json.data ?? json);
    } catch (err) {
      setCalendarError(err instanceof Error ? err.message : 'Calendar generation failed.');
    } finally {
      setCalendarLoading(false);
    }
  }

  async function handleGenerateResponses() {
    setReviewsLoading(true);
    setReviewsError(null);
    try {
      const res = await fetch(`${baseUrl}/api/clients/${client.id}/reviews/respond`, { method: 'POST' });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setReviews(json.data ?? json);
    } catch (err) {
      setReviewsError(err instanceof Error ? err.message : 'Response generation failed.');
    } finally {
      setReviewsLoading(false);
    }
  }

  async function handleGenerateReport() {
    setReportLoading(true);
    setReportError(null);
    try {
      const res = await fetch(`${baseUrl}/api/clients/${client.id}/reports`, { method: 'POST' });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setReports((prev) => [json.data ?? json, ...prev]);
    } catch (err) {
      setReportError(err instanceof Error ? err.message : 'Report generation failed.');
    } finally {
      setReportLoading(false);
    }
  }

  return (
    <div>
      {/* Detail header */}
      <div className="admin-page-header">
        <div>
          <div className="clients-breadcrumb">
            <button className="clients-back-btn" onClick={onBack}>← All Clients</button>
            <span className="clients-breadcrumb-sep">/</span>
            <span className="clients-breadcrumb-current">{client.name}</span>
          </div>
          <h1 className="admin-page-title">{client.name}</h1>
          <p className="admin-page-sub">
            {client.city}{client.state ? `, ${client.state}` : ''} · {client.businessType ?? 'Business'}
          </p>
        </div>
        <div className="clients-detail-badges">
          {client.tier && <span className={tierBadgeClass(client.tier)}>{TIER_LABELS[client.tier] ?? client.tier}</span>}
          {client.status && <span className={statusBadgeClass(client.status)}>{client.status}</span>}
        </div>
      </div>

      {/* Detail tabs */}
      <div className="clients-detail-tabs">
        {DETAIL_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`clients-detail-tab ${activeTab === tab ? 'clients-detail-tab--active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab: Info */}
      {activeTab === 'info' && (
        <div className="clients-tab-content">
          {saveError && <div className="admin-error-banner">{saveError}</div>}
          <ClientForm
            initial={formData}
            onSubmit={handleSave}
            submitting={saving}
            submitLabel="Save Changes"
            onCancel={onBack}
          />
        </div>
      )}

      {/* Tab: Voice */}
      {activeTab === 'voice' && (
        <div className="clients-tab-content">
          <div className="admin-page-header" style={{ marginBottom: 'var(--space-5)' }}>
            <div>
              <h2 className="clients-tab-heading">Voice Profile</h2>
              <p className="admin-page-sub">AI-generated brand voice guide for {client.name}. Used to write consistent captions, responses, and content.</p>
            </div>
            <button
              className="admin-btn admin-btn--primary"
              onClick={handleGenerateVoice}
              disabled={voiceLoading}
            >
              {voiceLoading ? 'Generating…' : voiceProfile ? 'Regenerate Voice Profile' : 'Generate Voice Profile'}
            </button>
          </div>

          {voiceError && <div className="admin-error-banner">{voiceError}</div>}

          {voiceLoading && (
            <div className="admin-card clients-ai-loading">
              <div className="clients-ai-spinner" />
              <p>Analyzing brand and generating voice profile…</p>
            </div>
          )}

          {!voiceLoading && voiceProfile ? (
            <div className="admin-card">
              <div className="clients-voice-grid">
                {Object.entries(voiceProfile).map(([key, val]) => (
                  <div key={key} className="clients-voice-item">
                    <span className="clients-voice-key">{key.replace(/_/g, ' ')}</span>
                    {typeof val === 'string' ? (
                      <p className="clients-voice-val">{val}</p>
                    ) : Array.isArray(val) ? (
                      <ul className="clients-voice-list">
                        {(val as unknown[]).map((v, i) => (
                          <li key={i} className="clients-voice-list-item">{String(v)}</li>
                        ))}
                      </ul>
                    ) : (
                      <pre className="clients-voice-json">{JSON.stringify(val, null, 2)}</pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : !voiceLoading && (
            <div className="admin-empty">
              <div className="admin-empty__icon">◈</div>
              <p className="admin-empty__text">No voice profile yet. Click Generate to create one using Gemini AI.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab: Calendar */}
      {activeTab === 'calendar' && (
        <div className="clients-tab-content">
          <div className="admin-page-header" style={{ marginBottom: 'var(--space-5)' }}>
            <div>
              <h2 className="clients-tab-heading">Content Calendar</h2>
              <p className="admin-page-sub">Planned posts across all active platforms for the next 30 days.</p>
            </div>
            <button
              className="admin-btn admin-btn--primary"
              onClick={handleGenerateCalendar}
              disabled={calendarLoading}
            >
              {calendarLoading ? 'Generating…' : calendar.length > 0 ? 'Regenerate Calendar' : 'Generate Calendar'}
            </button>
          </div>

          {calendarError && <div className="admin-error-banner">{calendarError}</div>}

          {calendarLoading && (
            <div className="admin-card clients-ai-loading">
              <div className="clients-ai-spinner" />
              <p>Building content calendar based on voice profile and platforms…</p>
            </div>
          )}

          {!calendarLoading && calendar.length > 0 ? (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Platform</th>
                    <th>Type</th>
                    <th>Topic / Caption</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {calendar.map((entry, i) => (
                    <tr key={entry.id ?? i}>
                      <td className="clients-mono">{formatDate(entry.date)}</td>
                      <td>
                        <span className="admin-badge admin-badge--upcoming">{entry.platform}</span>
                      </td>
                      <td className="clients-meta-cell">{entry.contentType}</td>
                      <td>
                        <p className="clients-calendar-topic">{entry.topic}</p>
                        {entry.caption && <p className="clients-calendar-caption">{entry.caption}</p>}
                      </td>
                      <td>
                        <span className={`admin-badge ${entry.status === 'planned' ? 'admin-badge--draft' : entry.status === 'approved' ? 'admin-badge--published' : 'admin-badge--scheduled'}`}>
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : !calendarLoading && (
            <div className="admin-empty">
              <div className="admin-empty__icon">◷</div>
              <p className="admin-empty__text">No calendar yet. Generate one to see planned content.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab: Reviews */}
      {activeTab === 'reviews' && (
        <div className="clients-tab-content">
          <div className="admin-page-header" style={{ marginBottom: 'var(--space-5)' }}>
            <div>
              <h2 className="clients-tab-heading">Reviews</h2>
              <p className="admin-page-sub">Customer reviews from Google and other platforms. Generate AI-drafted responses using the client voice profile.</p>
            </div>
            <button
              className="admin-btn admin-btn--primary"
              onClick={handleGenerateResponses}
              disabled={reviewsLoading || reviews.length === 0}
            >
              {reviewsLoading ? 'Generating…' : 'Generate Responses'}
            </button>
          </div>

          {reviewsError && <div className="admin-error-banner">{reviewsError}</div>}

          {reviewsLoading && (
            <div className="admin-card clients-ai-loading">
              <div className="clients-ai-spinner" />
              <p>Drafting responses using the client voice profile…</p>
            </div>
          )}

          {!reviewsLoading && reviews.length > 0 ? (
            <div className="clients-reviews-list">
              {reviews.map((review, i) => (
                <div key={review.id ?? i} className="admin-card clients-review-card">
                  <div className="clients-review-header">
                    <div>
                      <span className="clients-review-author">{review.author}</span>
                      <span className="clients-review-platform admin-badge admin-badge--upcoming">{review.platform}</span>
                    </div>
                    <div className="clients-review-meta">
                      <StarRating rating={review.rating} />
                      <span className="clients-mono">{formatDate(review.date)}</span>
                    </div>
                  </div>
                  <p className="clients-review-text">{review.text}</p>
                  {review.response && (
                    <div className="clients-review-response">
                      <span className="clients-review-response-label">Response Draft</span>
                      <p className="clients-review-response-text">{review.response}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : !reviewsLoading && (
            <div className="admin-empty">
              <div className="admin-empty__icon">◻</div>
              <p className="admin-empty__text">No reviews loaded yet. Import reviews from Google Business Profile to get started.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab: Reports */}
      {activeTab === 'reports' && (
        <div className="clients-tab-content">
          <div className="admin-page-header" style={{ marginBottom: 'var(--space-5)' }}>
            <div>
              <h2 className="clients-tab-heading">Reports</h2>
              <p className="admin-page-sub">Monthly performance summaries. Generated reports are stored and can be sent to the client.</p>
            </div>
            <button
              className="admin-btn admin-btn--primary"
              onClick={handleGenerateReport}
              disabled={reportLoading}
            >
              {reportLoading ? 'Generating…' : 'Generate Report'}
            </button>
          </div>

          {reportError && <div className="admin-error-banner">{reportError}</div>}

          {reportLoading && (
            <div className="admin-card clients-ai-loading">
              <div className="clients-ai-spinner" />
              <p>Compiling performance data and writing report…</p>
            </div>
          )}

          {!reportLoading && reports.length > 0 ? (
            <div className="clients-reports-list">
              {reports.map((report, i) => (
                <div key={report.id ?? i} className="admin-card clients-report-card">
                  <div className="clients-report-header">
                    <div>
                      <span className="clients-report-period">{report.period}</span>
                      <span className="admin-badge admin-badge--completed">Report</span>
                    </div>
                    <span className="clients-mono">Generated {formatDate(report.generatedAt)}</span>
                  </div>
                  <p className="clients-report-summary">{report.summary}</p>
                  {report.metrics && (
                    <div className="clients-report-metrics">
                      {Object.entries(report.metrics).map(([key, val]) => (
                        <div key={key} className="clients-metric-chip">
                          <span className="clients-metric-key">{key.replace(/_/g, ' ')}</span>
                          <span className="clients-metric-val">{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : !reportLoading && (
            <div className="admin-empty">
              <div className="admin-empty__icon">◈</div>
              <p className="admin-empty__text">No reports generated yet. Click Generate Report to produce the first one.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type PageView = 'list' | 'new' | 'detail';

export default function ClientsAdminPage() {
  const [view, setView] = useState<PageView>('list');
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [search, setSearch] = useState('');

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/clients`);
      const json = await res.json();
      setClients(json.data ?? []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch clients:', err);
      setError('Failed to load clients.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      const matchSearch = !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.city ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (c.businessType ?? '').toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchTier = tierFilter === 'all' || c.tier === tierFilter;
      return matchSearch && matchStatus && matchTier;
    });
  }, [clients, search, statusFilter, tierFilter]);

  async function handleCreate(data: FormData) {
    setCreating(true);
    setCreateError(null);
    try {
      const res = await fetch(`${baseUrl}/api/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      const newClient = json.data ?? json;
      setClients((prev) => [newClient, ...prev]);
      setSelectedClient(newClient);
      setView('detail');
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create client.');
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete "${name}"? This will remove all associated data and cannot be undone.`)) return;
    setActionLoading(id);
    try {
      const res = await fetch(`${baseUrl}/api/clients/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete client.');
    } finally {
      setActionLoading(null);
    }
  }

  function handleEdit(client: Client) {
    setSelectedClient(client);
    setView('detail');
  }

  function handleClientSaved(updated: Client) {
    setClients((prev) => prev.map((c) => c.id === updated.id ? updated : c));
    setSelectedClient(updated);
  }

  // ── Detail view ──
  if (view === 'detail' && selectedClient) {
    return (
      <>
        <ClientDetail
          client={selectedClient}
          onSaved={handleClientSaved}
          onBack={() => { setView('list'); setSelectedClient(null); }}
        />
        <ClientPageStyles />
      </>
    );
  }

  // ── New client view ──
  if (view === 'new') {
    return (
      <>
        <div className="admin-page-header">
          <div>
            <div className="clients-breadcrumb">
              <button className="clients-back-btn" onClick={() => setView('list')}>← All Clients</button>
              <span className="clients-breadcrumb-sep">/</span>
              <span className="clients-breadcrumb-current">New Client</span>
            </div>
            <h1 className="admin-page-title">New Client</h1>
            <p className="admin-page-sub">Add a new business to the Big Muddy Entertainment Engine.</p>
          </div>
        </div>
        {createError && <div className="admin-error-banner">{createError}</div>}
        <ClientForm
          initial={EMPTY_FORM}
          onSubmit={handleCreate}
          submitting={creating}
          submitLabel="Create Client"
          onCancel={() => setView('list')}
        />
        <ClientPageStyles />
      </>
    );
  }

  // ── List view ──
  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Clients</h1>
          <p className="admin-page-sub">
            {loading ? '…' : `${clients.length} clients · ${filtered.length} shown`}
          </p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={() => setView('new')}>
          + New Client
        </button>
      </div>

      {error && (
        <div className="admin-error-banner">
          {error}
          <button onClick={fetchClients} className="admin-btn admin-btn--ghost" style={{ marginLeft: 'var(--space-3)' }}>
            Retry
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="clients-filters">
        <input
          type="search"
          placeholder="Search clients…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input clients-search"
          aria-label="Search clients"
        />
        <div className="clients-filter-groups">
          <div className="admin-filter-bar">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`admin-filter-btn ${statusFilter === s ? 'admin-filter-btn--active' : ''}`}
              >
                {s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <div className="admin-filter-bar">
            {TIER_FILTERS.map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`admin-filter-btn ${tierFilter === t ? 'admin-filter-btn--active' : ''}`}
              >
                {t === 'all' ? 'All Tiers' : TIER_LABELS[t]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop table */}
      <div className="admin-table-wrap clients-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>City</th>
              <th>Tier</th>
              <th>Status</th>
              <th>Accounts</th>
              <th>Reviews</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>{Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}</>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className="admin-empty">
                    <div className="admin-empty__icon">◈</div>
                    <p className="admin-empty__text">
                      {clients.length === 0
                        ? 'No clients yet. Add the first one.'
                        : 'No clients match the current filters.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((client) => (
                <tr
                  key={client.id}
                  className={actionLoading === client.id ? 'row-loading' : ''}
                >
                  <td>
                    <button className="clients-name-btn" onClick={() => handleEdit(client)}>
                      {client.name}
                    </button>
                  </td>
                  <td><span className="clients-meta-cell">{client.businessType ?? '—'}</span></td>
                  <td>
                    <span className="clients-meta-cell">
                      {client.city ?? '—'}{client.state ? `, ${client.state}` : ''}
                    </span>
                  </td>
                  <td>
                    {client.tier ? (
                      <span className={tierBadgeClass(client.tier)}>
                        {TIER_LABELS[client.tier] ?? client.tier}
                      </span>
                    ) : '—'}
                  </td>
                  <td>
                    {client.status ? (
                      <span className={statusBadgeClass(client.status)}>{client.status}</span>
                    ) : '—'}
                  </td>
                  <td>
                    <span className="clients-count-chip">
                      {(client.platforms ?? []).length > 0
                        ? (client.platforms ?? []).length
                        : <span className="clients-meta-cell">—</span>}
                    </span>
                  </td>
                  <td>
                    <span className="clients-count-chip">
                      {(client.reviews ?? []).length > 0
                        ? (client.reviews ?? []).length
                        : <span className="clients-meta-cell">—</span>}
                    </span>
                  </td>
                  <td>
                    <div className="clients-row-actions">
                      <button
                        className="admin-btn admin-btn--ghost clients-action-btn"
                        onClick={() => handleEdit(client)}
                      >
                        Edit
                      </button>
                      <button
                        className="admin-btn admin-btn--danger clients-action-btn"
                        onClick={() => handleDelete(client.id, client.name)}
                        disabled={actionLoading === client.id}
                      >
                        {actionLoading === client.id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="clients-mobile-list">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="clients-mobile-card">
              <div className="skeleton skeleton--badge" style={{ marginBottom: 'var(--space-3)' }} />
              <div className="skeleton skeleton--text" style={{ width: '75%', marginBottom: 'var(--space-2)' }} />
              <div className="skeleton skeleton--text" style={{ width: '50%' }} />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty__icon">◈</div>
            <p className="admin-empty__text">No clients match the current filters.</p>
          </div>
        ) : (
          filtered.map((client) => (
            <div
              key={client.id}
              className={`clients-mobile-card ${actionLoading === client.id ? 'row-loading' : ''}`}
            >
              <div className="clients-mobile-card__top">
                <div className="clients-mobile-badges">
                  {client.tier && <span className={tierBadgeClass(client.tier)}>{TIER_LABELS[client.tier] ?? client.tier}</span>}
                  {client.status && <span className={statusBadgeClass(client.status)}>{client.status}</span>}
                </div>
              </div>
              <button className="clients-name-btn clients-name-btn--mobile" onClick={() => handleEdit(client)}>
                {client.name}
              </button>
              <div className="clients-mobile-card__meta">
                {client.businessType && <span className="clients-meta-cell">{client.businessType}</span>}
                {client.city && <span className="clients-meta-cell">{client.city}{client.state ? `, ${client.state}` : ''}</span>}
              </div>
              {(client.platforms ?? []).length > 0 && (
                <div className="clients-platform-tags">
                  {(client.platforms ?? []).map((p) => (
                    <span key={p} className="clients-platform-tag">{p}</span>
                  ))}
                </div>
              )}
              <div className="clients-row-actions" style={{ marginTop: 'var(--space-3)' }}>
                <button className="admin-btn admin-btn--ghost clients-action-btn" onClick={() => handleEdit(client)}>Edit</button>
                <button
                  className="admin-btn admin-btn--danger clients-action-btn"
                  onClick={() => handleDelete(client.id, client.name)}
                  disabled={actionLoading === client.id}
                >
                  {actionLoading === client.id ? '…' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ClientPageStyles />
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

function ClientPageStyles() {
  return (
    <style>{`
      /* ── Filters ── */
      .clients-filters {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        margin-bottom: var(--space-6);
      }
      .clients-search {
        max-width: 360px;
      }
      .clients-filter-groups {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      /* ── Table / Mobile toggle ── */
      .clients-table-wrap { display: none; }
      @media (min-width: 900px) {
        .clients-table-wrap { display: block; }
        .clients-mobile-list { display: none; }
      }

      /* ── Name button ── */
      .clients-name-btn {
        background: none;
        border: none;
        padding: 0;
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--accent);
        cursor: pointer;
        text-align: left;
        font-family: var(--font-body);
        transition: color var(--duration-fast) var(--ease-default);
      }
      .clients-name-btn:hover { color: var(--accent-hover); text-decoration: underline; }
      .clients-name-btn--mobile {
        display: block;
        font-size: var(--text-md);
        margin-bottom: var(--space-2);
      }

      /* ── Row actions ── */
      .clients-row-actions {
        display: flex;
        gap: var(--space-2);
        align-items: center;
      }
      .clients-action-btn {
        font-size: var(--text-xs);
        padding: var(--space-1) var(--space-3);
      }

      /* ── Meta / count cells ── */
      .clients-meta-cell {
        font-size: var(--text-sm);
        color: var(--text-muted);
      }
      .clients-count-chip {
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--text);
        font-family: var(--font-mono);
      }
      .clients-mono {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        color: var(--text-muted);
      }

      /* ── Mobile cards ── */
      .clients-mobile-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }
      .clients-mobile-card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: var(--space-4);
      }
      .clients-mobile-card__top {
        margin-bottom: var(--space-2);
      }
      .clients-mobile-badges {
        display: flex;
        gap: var(--space-2);
        flex-wrap: wrap;
        margin-bottom: var(--space-2);
      }
      .clients-mobile-card__meta {
        display: flex;
        gap: var(--space-3);
        flex-wrap: wrap;
        margin-bottom: var(--space-2);
      }
      .clients-mobile-card__meta > * { font-size: var(--text-xs); }

      /* ── Platform chips (form) ── */
      .clients-platform-grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
        margin-top: var(--space-1);
      }
      .clients-platform-chip {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-2) var(--space-3);
        border: 1px solid var(--border);
        border-radius: var(--radius-full);
        font-size: var(--text-xs);
        font-weight: 600;
        font-family: var(--font-body);
        color: var(--text-muted);
        cursor: pointer;
        transition: all var(--duration-fast) var(--ease-default);
        user-select: none;
      }
      .clients-platform-chip:hover {
        border-color: var(--accent);
        color: var(--accent);
      }
      .clients-platform-chip--active {
        background: var(--accent-muted);
        border-color: var(--accent);
        color: var(--accent);
      }
      .clients-platform-checkbox {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        pointer-events: none;
      }

      /* ── Platform tags (list cards) ── */
      .clients-platform-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-1);
        margin-bottom: var(--space-2);
      }
      .clients-platform-tag {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--text-disabled);
        background: var(--surface-2);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-sm);
        padding: 1px 6px;
      }

      /* ── Section titles in form ── */
      .clients-section-title {
        font-size: var(--text-sm);
        font-weight: 700;
        color: var(--text-muted);
        letter-spacing: var(--tracking-wide);
        text-transform: uppercase;
        margin: 0 0 var(--space-5);
        padding-bottom: var(--space-4);
        border-bottom: 1px solid var(--border-subtle);
      }

      /* ── Breadcrumb ── */
      .clients-breadcrumb {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        margin-bottom: var(--space-2);
      }
      .clients-back-btn {
        background: none;
        border: none;
        padding: 0;
        font-size: var(--text-sm);
        font-weight: 500;
        color: var(--accent);
        cursor: pointer;
        font-family: var(--font-body);
        transition: color var(--duration-fast) var(--ease-default);
      }
      .clients-back-btn:hover { color: var(--accent-hover); }
      .clients-breadcrumb-sep {
        font-size: var(--text-sm);
        color: var(--text-disabled);
      }
      .clients-breadcrumb-current {
        font-size: var(--text-sm);
        color: var(--text-muted);
      }

      /* ── Detail badges ── */
      .clients-detail-badges {
        display: flex;
        gap: var(--space-2);
        align-items: center;
        flex-wrap: wrap;
      }

      /* ── Detail tabs ── */
      .clients-detail-tabs {
        display: flex;
        gap: 0;
        border-bottom: 1px solid var(--border);
        margin-bottom: var(--space-7);
        overflow-x: auto;
      }
      .clients-detail-tab {
        padding: var(--space-3) var(--space-5);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--text-muted);
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        white-space: nowrap;
        transition: all var(--duration-fast) var(--ease-default);
        margin-bottom: -1px;
      }
      .clients-detail-tab:hover { color: var(--text); }
      .clients-detail-tab--active {
        color: var(--accent);
        border-bottom-color: var(--accent);
      }

      /* ── Tab content wrapper ── */
      .clients-tab-content {
        animation: fadeIn 0.15s ease;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* ── Tab heading ── */
      .clients-tab-heading {
        font-size: var(--text-xl);
        font-weight: 700;
        color: var(--text);
        margin: 0;
        letter-spacing: -0.01em;
      }

      /* ── AI loading state ── */
      .clients-ai-loading {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        color: var(--text-muted);
        font-size: var(--text-sm);
        margin-bottom: var(--space-5);
      }
      .clients-ai-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid var(--border);
        border-top-color: var(--accent);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        flex-shrink: 0;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* ── Voice profile ── */
      .clients-voice-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-6);
      }
      @media (max-width: 768px) {
        .clients-voice-grid { grid-template-columns: 1fr; }
      }
      .clients-voice-item {
        padding: var(--space-4);
        background: var(--surface-2);
        border-radius: var(--radius-sm);
        border: 1px solid var(--border-subtle);
      }
      .clients-voice-key {
        display: block;
        font-size: var(--text-xs);
        font-weight: 700;
        letter-spacing: var(--tracking-wider);
        text-transform: uppercase;
        color: var(--text-disabled);
        margin-bottom: var(--space-2);
      }
      .clients-voice-val {
        font-size: var(--text-sm);
        color: var(--text);
        margin: 0;
        line-height: var(--leading-relaxed);
      }
      .clients-voice-list {
        margin: 0;
        padding: 0 0 0 var(--space-4);
      }
      .clients-voice-list-item {
        font-size: var(--text-sm);
        color: var(--text);
        line-height: var(--leading-relaxed);
      }
      .clients-voice-json {
        font-size: 11px;
        font-family: var(--font-mono);
        color: var(--text-muted);
        white-space: pre-wrap;
        word-break: break-all;
        margin: 0;
      }

      /* ── Calendar ── */
      .clients-calendar-topic {
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--text);
        margin: 0 0 var(--space-1);
      }
      .clients-calendar-caption {
        font-size: var(--text-xs);
        color: var(--text-muted);
        margin: 0;
        line-height: var(--leading-relaxed);
      }

      /* ── Reviews ── */
      .clients-reviews-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }
      .clients-review-card {
        padding: var(--space-5);
      }
      .clients-review-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--space-4);
        margin-bottom: var(--space-3);
        flex-wrap: wrap;
      }
      .clients-review-author {
        font-size: var(--text-sm);
        font-weight: 700;
        color: var(--text);
        margin-right: var(--space-2);
      }
      .clients-review-platform {
        font-size: 10px;
        vertical-align: middle;
      }
      .clients-review-meta {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        flex-shrink: 0;
      }
      .clients-review-text {
        font-size: var(--text-sm);
        color: var(--text-muted);
        line-height: var(--leading-relaxed);
        margin: 0 0 var(--space-3);
      }
      .clients-review-response {
        background: var(--surface-2);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-sm);
        padding: var(--space-3) var(--space-4);
        margin-top: var(--space-3);
      }
      .clients-review-response-label {
        display: block;
        font-size: var(--text-xs);
        font-weight: 700;
        letter-spacing: var(--tracking-wide);
        text-transform: uppercase;
        color: var(--accent);
        margin-bottom: var(--space-2);
      }
      .clients-review-response-text {
        font-size: var(--text-sm);
        color: var(--text);
        margin: 0;
        line-height: var(--leading-relaxed);
      }

      /* ── Stars ── */
      .clients-stars { font-size: 14px; letter-spacing: 1px; }
      .clients-star--filled { color: var(--warning, #f59e0b); }
      .clients-star--empty { color: var(--border-strong, #4a4540); }

      /* ── Reports ── */
      .clients-reports-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }
      .clients-report-card {
        padding: var(--space-5);
      }
      .clients-report-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        margin-bottom: var(--space-4);
        flex-wrap: wrap;
      }
      .clients-report-period {
        font-size: var(--text-md);
        font-weight: 700;
        color: var(--text);
        margin-right: var(--space-3);
      }
      .clients-report-summary {
        font-size: var(--text-sm);
        color: var(--text-muted);
        line-height: var(--leading-relaxed);
        margin: 0 0 var(--space-4);
      }
      .clients-report-metrics {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
      }
      .clients-metric-chip {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        background: var(--surface-2);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-sm);
        padding: var(--space-2) var(--space-3);
      }
      .clients-metric-key {
        font-size: var(--text-xs);
        font-weight: 600;
        color: var(--text-disabled);
        text-transform: uppercase;
        letter-spacing: var(--tracking-wide);
      }
      .clients-metric-val {
        font-size: var(--text-sm);
        font-weight: 700;
        color: var(--text);
        font-family: var(--font-mono);
      }
    `}</style>
  );
}
