'use client';

// apps/web/app/admin/publications/page.tsx
// Publication management — Deep South Press admin.
// Lists all publications, supports create, edit (inline drawer), delete,
// and status workflow: draft → production → preorder → available → sold-out → archived

import { useState, useMemo, useEffect, useCallback } from 'react';
import type { Publication } from '@bigmuddy/config';

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────

const STATUS_FLOW: Record<string, string> = {
  draft: 'production',
  production: 'preorder',
  preorder: 'available',
  available: 'sold-out',
  'sold-out': 'archived',
  archived: 'draft',
};

const STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  production: 'In Production',
  preorder: 'Pre-Order',
  available: 'Available',
  'sold-out': 'Sold Out',
  archived: 'Archived',
};

const STATUS_BADGE_CLASS: Record<string, string> = {
  draft: 'admin-badge admin-badge--draft',
  production: 'admin-badge admin-badge--review',
  preorder: 'admin-badge admin-badge--upcoming',
  available: 'admin-badge admin-badge--published',
  'sold-out': 'admin-badge admin-badge--sold-out',
  archived: 'admin-badge admin-badge--archived',
};

const ALL_STATUSES = ['all', 'draft', 'production', 'preorder', 'available', 'sold-out', 'archived'];

const CATEGORIES = ['book', 'zine', 'print', 'catalog'];
const FORMATS = ['hardcover', 'softcover', 'digital', 'limited-edition'];

const ALL_CITIES = [
  { value: '', label: 'All Cities' },
  { value: 'natchez', label: 'Natchez' },
  { value: 'clarksdale', label: 'Clarksdale' },
  { value: 'vicksburg', label: 'Vicksburg' },
  { value: 'memphis', label: 'Memphis' },
  { value: 'new-orleans', label: 'New Orleans' },
  { value: 'baton-rouge', label: 'Baton Rouge' },
  { value: 'other', label: 'Other' },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function formatPrice(cents: number | null | undefined): string {
  if (cents == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseTagsInput(raw: string): string[] {
  return raw.split(',').map((t) => t.trim()).filter(Boolean);
}

function parseUrlsInput(raw: string): string[] {
  return raw.split('\n').map((u) => u.trim()).filter(Boolean);
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_BADGE_CLASS[status] ?? 'admin-badge admin-badge--draft';
  return <span className={cls}>{STATUS_LABELS[status] ?? status}</span>;
}

function SkeletonRow() {
  return (
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton--text" style={{ width: '60px', height: '60px' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '70%' }} /></td>
      <td><div className="skeleton skeleton--badge" /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '55%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '50%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '40%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '40%' }} /></td>
    </tr>
  );
}

// ─────────────────────────────────────────────────────────────
// Form state type
// ─────────────────────────────────────────────────────────────

interface FormState {
  title: string;
  slug: string;
  subtitle: string;
  author: string;
  description: string;
  longDescription: string;
  category: string;
  format: string;
  pageCount: string;
  dimensions: string;
  isbn: string;
  price: string; // dollars, converted to cents on submit
  coverImageUrl: string;
  backCoverUrl: string;
  previewImages: string; // newline-separated URLs
  printPartner: string;
  printUrl: string;
  shopifyUrl: string;
  status: string;
  edition: string;
  printRun: string;
  relatedCity: string;
  tags: string; // comma-separated
}

const EMPTY_FORM: FormState = {
  title: '',
  slug: '',
  subtitle: '',
  author: 'Chase Pierson',
  description: '',
  longDescription: '',
  category: 'book',
  format: 'hardcover',
  pageCount: '',
  dimensions: '',
  isbn: '',
  price: '',
  coverImageUrl: '',
  backCoverUrl: '',
  previewImages: '',
  printPartner: '',
  printUrl: '',
  shopifyUrl: '',
  status: 'draft',
  edition: '',
  printRun: '',
  relatedCity: '',
  tags: '',
};

function pubToForm(p: Publication): FormState {
  return {
    title: p.title,
    slug: p.slug,
    subtitle: p.subtitle ?? '',
    author: p.author,
    description: p.description ?? '',
    longDescription: p.longDescription ?? '',
    category: p.category,
    format: p.format,
    pageCount: p.pageCount != null ? String(p.pageCount) : '',
    dimensions: p.dimensions ?? '',
    isbn: p.isbn ?? '',
    price: p.price != null ? String(p.price / 100) : '',
    coverImageUrl: p.coverImageUrl ?? '',
    backCoverUrl: p.backCoverUrl ?? '',
    previewImages: (p.previewImages ?? []).join('\n'),
    printPartner: p.printPartner ?? '',
    printUrl: p.printUrl ?? '',
    shopifyUrl: p.shopifyUrl ?? '',
    status: p.status,
    edition: p.edition ?? '',
    printRun: p.printRun != null ? String(p.printRun) : '',
    relatedCity: p.relatedCity ?? '',
    tags: (p.tags ?? []).join(', '),
  };
}

function formToPayload(f: FormState): Record<string, unknown> {
  const priceDollars = parseFloat(f.price);
  return {
    title: f.title.trim(),
    slug: f.slug.trim(),
    subtitle: f.subtitle.trim() || null,
    author: f.author.trim() || 'Chase Pierson',
    description: f.description.trim() || null,
    longDescription: f.longDescription.trim() || null,
    category: f.category,
    format: f.format,
    pageCount: f.pageCount ? parseInt(f.pageCount) : null,
    dimensions: f.dimensions.trim() || null,
    isbn: f.isbn.trim() || null,
    price: f.price && !isNaN(priceDollars) ? Math.round(priceDollars * 100) : null,
    coverImageUrl: f.coverImageUrl.trim() || null,
    backCoverUrl: f.backCoverUrl.trim() || null,
    previewImages: parseUrlsInput(f.previewImages),
    printPartner: f.printPartner.trim() || null,
    printUrl: f.printUrl.trim() || null,
    shopifyUrl: f.shopifyUrl.trim() || null,
    status: f.status,
    edition: f.edition.trim() || null,
    printRun: f.printRun ? parseInt(f.printRun) : null,
    relatedCity: f.relatedCity || null,
    tags: parseTagsInput(f.tags),
  };
}

// ─────────────────────────────────────────────────────────────
// Publication Form (create + edit)
// ─────────────────────────────────────────────────────────────

interface PublicationFormProps {
  initial: FormState;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
  isEdit: boolean;
  saving: boolean;
  error: string | null;
}

function PublicationForm({ initial, onSubmit, onCancel, isEdit, saving, error }: PublicationFormProps) {
  const [form, setForm] = useState<FormState>(initial);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      // Auto-generate slug from title when creating new
      if (field === 'title' && !isEdit) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) return;
    await onSubmit(formToPayload(form));
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="admin-error-banner" style={{ marginBottom: 'var(--space-5)' }}>
          {error}
        </div>
      )}

      {/* Row 1: Title + Subtitle */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-label admin-label--required">Title</label>
          <input
            type="text"
            className="admin-input"
            value={form.title}
            onChange={set('title')}
            placeholder="Natchez Faces"
            required
            aria-required="true"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Subtitle</label>
          <input
            type="text"
            className="admin-input"
            value={form.subtitle}
            onChange={set('subtitle')}
            placeholder="Portraits from the Bluff City"
          />
        </div>
      </div>

      {/* Row 2: Slug + Author */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-label admin-label--required">Slug</label>
          <input
            type="text"
            className="admin-input"
            value={form.slug}
            onChange={set('slug')}
            placeholder="natchez-faces"
            required
            aria-required="true"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Author</label>
          <input
            type="text"
            className="admin-input"
            value={form.author}
            onChange={set('author')}
            placeholder="Chase Pierson"
          />
        </div>
      </div>

      {/* Row 3: Category + Format */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-label">Category</label>
          <select className="admin-select" value={form.category} onChange={set('category')}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Format</label>
          <select className="admin-select" value={form.format} onChange={set('format')}>
            {FORMATS.map((f) => (
              <option key={f} value={f}>{f.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Status + Edition */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-label">Status</label>
          <select className="admin-select" value={form.status} onChange={set('status')}>
            {['draft', 'production', 'preorder', 'available', 'sold-out', 'archived'].map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Edition</label>
          <input
            type="text"
            className="admin-input"
            value={form.edition}
            onChange={set('edition')}
            placeholder="First Edition"
          />
        </div>
      </div>

      {/* Row 5: Price + Print Run */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-label">Price (USD)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            className="admin-input"
            value={form.price}
            onChange={set('price')}
            placeholder="65.00"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Print Run</label>
          <input
            type="number"
            min="1"
            className="admin-input"
            value={form.printRun}
            onChange={set('printRun')}
            placeholder="250"
          />
        </div>
      </div>

      {/* Row 6: Page Count + Dimensions */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-label">Page Count</label>
          <input
            type="number"
            min="1"
            className="admin-input"
            value={form.pageCount}
            onChange={set('pageCount')}
            placeholder="128"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Dimensions</label>
          <input
            type="text"
            className="admin-input"
            value={form.dimensions}
            onChange={set('dimensions')}
            placeholder="10 x 10 inches"
          />
        </div>
      </div>

      {/* Row 7: ISBN + Related City */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-label">ISBN</label>
          <input
            type="text"
            className="admin-input"
            value={form.isbn}
            onChange={set('isbn')}
            placeholder="978-0-000000-00-0"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Related City</label>
          <select className="admin-select" value={form.relatedCity} onChange={set('relatedCity')}>
            {ALL_CITIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 8: Print Partner + Tags */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-label">Print Partner</label>
          <input
            type="text"
            className="admin-input"
            value={form.printPartner}
            onChange={set('printPartner')}
            placeholder="Blurb, Lulu, self"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Tags</label>
          <input
            type="text"
            className="admin-input"
            value={form.tags}
            onChange={set('tags')}
            placeholder="portrait, photography, inn, natchez"
          />
          <span className="pub-form-hint">Comma-separated</span>
        </div>
      </div>

      {/* Cover Image URL */}
      <div className="admin-form-group">
        <label className="admin-label">Cover Image URL</label>
        <input
          type="url"
          className="admin-input"
          value={form.coverImageUrl}
          onChange={set('coverImageUrl')}
          placeholder="https://…"
        />
      </div>

      {/* Back Cover URL */}
      <div className="admin-form-group">
        <label className="admin-label">Back Cover URL</label>
        <input
          type="url"
          className="admin-input"
          value={form.backCoverUrl}
          onChange={set('backCoverUrl')}
          placeholder="https://…"
        />
      </div>

      {/* Preview Image URLs */}
      <div className="admin-form-group">
        <label className="admin-label">Interior Preview URLs</label>
        <textarea
          className="admin-textarea"
          value={form.previewImages}
          onChange={set('previewImages')}
          placeholder="One URL per line"
          rows={3}
        />
        <span className="pub-form-hint">One URL per line — interior spreads shown on the public book page</span>
      </div>

      {/* Row: Print URL + Shopify URL */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-label">Order URL (Blurb / Amazon)</label>
          <input
            type="url"
            className="admin-input"
            value={form.printUrl}
            onChange={set('printUrl')}
            placeholder="https://blurb.com/bookstore/…"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Shopify URL</label>
          <input
            type="url"
            className="admin-input"
            value={form.shopifyUrl}
            onChange={set('shopifyUrl')}
            placeholder="https://shop.bigmuddyinn.com/…"
          />
        </div>
      </div>

      {/* Description */}
      <div className="admin-form-group">
        <label className="admin-label">Short Description</label>
        <textarea
          className="admin-textarea"
          value={form.description}
          onChange={set('description')}
          placeholder="One or two sentences for card previews."
          rows={3}
        />
      </div>

      {/* Long Description */}
      <div className="admin-form-group">
        <label className="admin-label">Long Description / Back Cover Copy</label>
        <textarea
          className="admin-textarea"
          value={form.longDescription}
          onChange={set('longDescription')}
          placeholder="Full back cover copy and book description shown on the detail page."
          style={{ minHeight: '160px' }}
        />
      </div>

      {/* Form Actions */}
      <div className="admin-form-actions">
        <button
          type="submit"
          className="admin-btn admin-btn--primary"
          disabled={saving || !form.title.trim() || !form.slug.trim()}
        >
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Publication'}
        </button>
        <button type="button" className="admin-btn admin-btn--ghost" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────

export default function AdminPublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Publication | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPublications = useCallback(async () => {
    try {
      const res = await fetch('/api/publications');
      const json = await res.json();
      setPublications(json.data ?? []);
      setError(null);
    } catch {
      setError('Failed to load publications.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  const filtered = useMemo(() => {
    return publications.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.subtitle ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (p.author ?? '').toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [publications, search, statusFilter]);

  const openCreate = () => {
    setEditTarget(null);
    setFormError(null);
    setDrawerOpen(true);
  };

  const openEdit = (pub: Publication) => {
    setEditTarget(pub);
    setFormError(null);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditTarget(null);
    setFormError(null);
  };

  const handleCreate = async (payload: Record<string, unknown>) => {
    setSaving(true);
    setFormError(null);
    try {
      const res = await fetch('/api/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setFormError(json.error ?? 'Failed to create publication.');
        return;
      }
      setPublications((prev) => [json.data, ...prev]);
      closeDrawer();
    } catch {
      setFormError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (payload: Record<string, unknown>) => {
    if (!editTarget) return;
    setSaving(true);
    setFormError(null);
    try {
      const res = await fetch(`/api/publications/${editTarget.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setFormError(json.error ?? 'Failed to update publication.');
        return;
      }
      setPublications((prev) => prev.map((p) => (p.id === editTarget.id ? json.data : p)));
      closeDrawer();
    } catch {
      setFormError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (pub: Publication) => {
    if (!confirm(`Delete "${pub.title}"? This cannot be undone.`)) return;
    setActionLoading(pub.id);
    try {
      const res = await fetch(`/api/publications/${pub.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setPublications((prev) => prev.filter((p) => p.id !== pub.id));
    } catch {
      alert('Failed to delete publication.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleAdvanceStatus = async (pub: Publication) => {
    const nextStatus = STATUS_FLOW[pub.status] ?? 'draft';
    setActionLoading(pub.id);
    try {
      const res = await fetch(`/api/publications/${pub.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: nextStatus,
          ...(nextStatus === 'available' ? { publishedAt: new Date().toISOString() } : {}),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error('Update failed');
      setPublications((prev) => prev.map((p) => (p.id === pub.id ? json.data : p)));
    } catch {
      alert('Failed to update status.');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <>
      {/* ── Page Header ── */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Publications</h1>
          <p className="admin-page-sub">
            Deep South Press ·{' '}
            {loading ? '…' : `${publications.length} total · ${filtered.length} shown`}
          </p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={openCreate}>
          + New Publication
        </button>
      </div>

      {error && (
        <div className="admin-error-banner">
          {error}
          <button onClick={fetchPublications} className="admin-btn admin-btn--ghost" style={{ marginLeft: 'var(--space-3)' }}>
            Retry
          </button>
        </div>
      )}

      {/* ── Search + Status Filters ── */}
      <div className="pub-filters">
        <input
          type="search"
          placeholder="Search publications…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input pub-search"
          aria-label="Search publications"
        />
        <div className="admin-filter-bar">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`admin-filter-btn ${statusFilter === s ? 'admin-filter-btn--active' : ''}`}
            >
              {s === 'all' ? 'All' : STATUS_LABELS[s] ?? s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="admin-table-wrap pub-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '72px' }}>Cover</th>
              <th>Title</th>
              <th>Status</th>
              <th>Format</th>
              <th>Price</th>
              <th>Print Run / Sold</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="admin-empty">
                    <div className="admin-empty__icon">◻</div>
                    <p className="admin-empty__text">No publications found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((pub) => (
                <tr key={pub.id} className={actionLoading === pub.id ? 'row-loading' : ''}>
                  {/* Cover thumbnail */}
                  <td>
                    {pub.coverImageUrl ? (
                      <div className="pub-thumb-wrap">
                        <img
                          src={pub.coverImageUrl}
                          alt={`Cover: ${pub.title}`}
                          className="pub-thumb"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div className="pub-thumb-wrap pub-thumb-wrap--empty" aria-label="No cover image">
                        <span aria-hidden="true">◻</span>
                      </div>
                    )}
                  </td>

                  {/* Title + subtitle */}
                  <td>
                    <div className="pub-title-cell">
                      <button
                        className="pub-title-link"
                        onClick={() => openEdit(pub)}
                        aria-label={`Edit ${pub.title}`}
                      >
                        {pub.title}
                      </button>
                      {pub.subtitle && (
                        <span className="pub-subtitle-preview">{pub.subtitle}</span>
                      )}
                      {pub.tags && pub.tags.length > 0 && (
                        <div className="pub-tags-row">
                          {pub.tags.slice(0, 3).map((t) => (
                            <span key={t} className="pub-tag">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Status — click to advance in workflow */}
                  <td>
                    <button
                      className="status-toggle-btn"
                      onClick={() => handleAdvanceStatus(pub)}
                      disabled={actionLoading === pub.id}
                      title={`Advance to: ${STATUS_LABELS[STATUS_FLOW[pub.status] ?? 'draft']}`}
                    >
                      <StatusBadge status={pub.status as string} />
                    </button>
                  </td>

                  {/* Format */}
                  <td>
                    <span className="pub-meta-text">
                      {pub.category} · {pub.format}
                    </span>
                  </td>

                  {/* Price */}
                  <td>
                    <span className="pub-meta-text">{formatPrice(pub.price)}</span>
                  </td>

                  {/* Print run / sold */}
                  <td>
                    <span className="pub-meta-text">
                      {pub.printRun != null ? `${pub.soldCount} / ${pub.printRun}` : pub.soldCount > 0 ? `${pub.soldCount} sold` : '—'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="pub-actions">
                      <button
                        className="admin-btn admin-btn--ghost pub-action-btn"
                        onClick={() => openEdit(pub)}
                      >
                        Edit
                      </button>
                      {(pub.printUrl || pub.shopifyUrl) && (
                        <a
                          href={(pub.printUrl || pub.shopifyUrl) as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-btn admin-btn--ghost pub-action-btn"
                        >
                          Order ↗
                        </a>
                      )}
                      <a
                        href={`/media/publications/${pub.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-btn admin-btn--ghost pub-action-btn"
                      >
                        View ↗
                      </a>
                      <button
                        className="admin-btn admin-btn--danger pub-action-btn"
                        onClick={() => handleDelete(pub)}
                        disabled={actionLoading === pub.id}
                      >
                        {actionLoading === pub.id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Cards ── */}
      <div className="pub-mobile-list">
        {!loading && filtered.map((pub) => (
          <div key={pub.id} className={`pub-mobile-card ${actionLoading === pub.id ? 'row-loading' : ''}`}>
            <div className="pub-mobile-card__row">
              {pub.coverImageUrl ? (
                <img src={pub.coverImageUrl} alt="" className="pub-mobile-thumb" loading="lazy" decoding="async" />
              ) : (
                <div className="pub-mobile-thumb pub-mobile-thumb--empty" aria-hidden="true">◻</div>
              )}
              <div className="pub-mobile-card__body">
                <button className="pub-title-link" onClick={() => openEdit(pub)}>{pub.title}</button>
                {pub.subtitle && <span className="pub-subtitle-preview">{pub.subtitle}</span>}
                <div className="pub-mobile-card__meta">
                  <StatusBadge status={pub.status as string} />
                  <span className="pub-meta-text">{pub.format}</span>
                  <span className="pub-meta-text">{formatPrice(pub.price)}</span>
                </div>
              </div>
            </div>
            <div className="pub-actions" style={{ marginTop: 'var(--space-3)' }}>
              <button className="admin-btn admin-btn--ghost pub-action-btn" onClick={() => openEdit(pub)}>Edit</button>
              <button
                className="admin-btn admin-btn--danger pub-action-btn"
                onClick={() => handleDelete(pub)}
                disabled={actionLoading === pub.id}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {!loading && filtered.length === 0 && (
          <div className="admin-empty">
            <div className="admin-empty__icon">◻</div>
            <p className="admin-empty__text">No publications found.</p>
          </div>
        )}
      </div>

      {/* ── Create / Edit Drawer ── */}
      {drawerOpen && (
        <div className="pub-drawer-overlay" role="dialog" aria-modal="true" aria-label={editTarget ? 'Edit publication' : 'New publication'}>
          <div className="pub-drawer" role="document">
            <div className="pub-drawer__header">
              <h2 className="pub-drawer__title">
                {editTarget ? `Edit: ${editTarget.title}` : 'New Publication'}
              </h2>
              <button className="pub-drawer__close" onClick={closeDrawer} aria-label="Close form">
                ✕
              </button>
            </div>
            <div className="pub-drawer__body">
              <PublicationForm
                key={editTarget?.id ?? 'new'}
                initial={editTarget ? pubToForm(editTarget) : EMPTY_FORM}
                onSubmit={editTarget ? handleEdit : handleCreate}
                onCancel={closeDrawer}
                isEdit={!!editTarget}
                saving={saving}
                error={formError}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .pub-filters {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
          flex-wrap: wrap;
          align-items: flex-start;
        }
        .pub-search {
          flex: 1;
          min-width: 200px;
        }
        .pub-table-wrap {
          display: none;
        }
        @media (min-width: 900px) {
          .pub-table-wrap { display: block; }
          .pub-mobile-list { display: none; }
        }
        /* Cover thumbnail */
        .pub-thumb-wrap {
          width: 56px;
          height: 72px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: var(--surface-2);
          border: 1px solid var(--border);
          flex-shrink: 0;
        }
        .pub-thumb-wrap--empty {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: var(--text-disabled);
        }
        .pub-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        /* Title cell */
        .pub-title-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .pub-title-link {
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
          line-height: var(--leading-snug);
        }
        .pub-title-link:hover {
          color: var(--accent-hover);
          text-decoration: underline;
        }
        .pub-subtitle-preview {
          font-size: var(--text-xs);
          color: var(--text-muted);
          font-style: italic;
        }
        .pub-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-1);
          margin-top: 2px;
        }
        .pub-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 1px 5px;
          background: var(--surface-3);
          color: var(--text-disabled);
          border-radius: var(--radius-sm);
        }
        .pub-meta-text {
          font-size: var(--text-xs);
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }
        /* Actions */
        .pub-actions {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }
        .pub-action-btn {
          font-size: var(--text-xs);
          padding: var(--space-1) var(--space-3);
        }
        /* Mobile cards */
        .pub-mobile-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .pub-mobile-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-4);
        }
        .pub-mobile-card__row {
          display: flex;
          gap: var(--space-4);
          align-items: flex-start;
        }
        .pub-mobile-thumb {
          width: 56px;
          height: 72px;
          object-fit: cover;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          flex-shrink: 0;
        }
        .pub-mobile-thumb--empty {
          width: 56px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-disabled);
          font-size: 18px;
          flex-shrink: 0;
        }
        .pub-mobile-card__body {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          min-width: 0;
        }
        .pub-mobile-card__meta {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          flex-wrap: wrap;
        }
        /* Drawer overlay */
        .pub-drawer-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: flex-end;
        }
        .pub-drawer {
          width: 100%;
          max-width: 680px;
          background: var(--bg);
          border-left: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
          box-shadow: var(--shadow-xl);
        }
        .pub-drawer__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-6) var(--space-8);
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .pub-drawer__title {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          margin: 0;
          letter-spacing: -0.01em;
        }
        .pub-drawer__close {
          background: none;
          border: 1px solid var(--border);
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: var(--text-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--duration-fast) var(--ease-default);
        }
        .pub-drawer__close:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .pub-drawer__body {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-8);
        }
        .pub-form-hint {
          font-size: var(--text-xs);
          color: var(--text-disabled);
          margin-top: var(--space-1);
        }
        @media (max-width: 600px) {
          .pub-drawer {
            max-width: 100%;
          }
          .pub-drawer__body {
            padding: var(--space-5);
          }
        }
      `}</style>
    </>
  );
}
