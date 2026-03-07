'use client';

// apps/web/app/admin/articles/[id]/edit/page.tsx
// Article editor with S2PX metadata sidebar for bridge-sourced content

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';

const CATEGORIES = ['city-guide', 'feature', 'photo-essay', 'interview', 'food-drink', 'music', 'case-study'];
const CITIES = [
  'memphis', 'clarksdale', 'vicksburg', 'natchez', 'st-francisville',
  'baton-rouge', 'new-orleans', 'lafayette', 'alexandria', 'monroe',
  'ruston', 'natchitoches', 'shreveport', 'el-dorado', 'little-rock',
  'fayetteville', 'bentonville', 'branson', 'other',
];

interface ArticleData {
  id: number;
  title: string;
  slug: string;
  category: string;
  city: string | null;
  author: string;
  status: string;
  excerpt: string | null;
  body: string | null;
  heroImage: string | null;
  readTime: string | null;
  publishedAt: string | null;
  sourceSystem: string | null;
  sourceProjectId: string | null;
  sourcePayload: string | null;
  sourceSyncedAt: string | null;
}

interface S2PXPayload {
  upid: string;
  city: string;
  state: string;
  buildingType: string;
  totalSqft: number | null;
  numFloors: number | null;
  era: string | null;
  scanScope: string | null;
  scannerType: string | null;
  lodDelivered: string | null;
  disciplines: string[];
  georeferenced: boolean;
  scanAccuracyMm: number | null;
  qcStatus: string | null;
  completedAt: string;
  buildingFeatures: string[];
}

function formatCityLabel(city: string): string {
  return city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function formatDate(date: string | null): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── S2PX Metadata Sidebar ──
function S2pxMetadataSidebar({ payload, syncedAt }: { payload: S2PXPayload; syncedAt: string | null }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyValue = (label: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const rows: Array<{ label: string; value: string | null; copyable?: boolean }> = [
    { label: 'UPID', value: payload.upid },
    { label: 'Building Type', value: payload.buildingType },
    { label: 'Location', value: `${payload.city}, ${payload.state}` },
    { label: 'Total Sqft', value: payload.totalSqft?.toLocaleString() ?? null, copyable: true },
    { label: 'Floors', value: payload.numFloors?.toString() ?? null },
    { label: 'Era', value: payload.era },
    { label: 'Scan Scope', value: payload.scanScope },
    { label: 'Scanner', value: payload.scannerType },
    { label: 'Accuracy', value: payload.scanAccuracyMm != null ? `${payload.scanAccuracyMm}mm RMS` : null, copyable: true },
    { label: 'LOD', value: payload.lodDelivered },
    { label: 'Georeferenced', value: payload.georeferenced ? 'Yes' : 'No' },
    { label: 'QC Status', value: payload.qcStatus },
    { label: 'Completed', value: formatDate(payload.completedAt) },
  ];

  return (
    <div className="s2px-sidebar">
      <div className="s2px-sidebar__header">
        <span className="s2px-sidebar__icon">&#9670;</span>
        S2PX Technical Source
      </div>

      {syncedAt && (
        <div className="s2px-sidebar__synced">
          Synced {formatDate(syncedAt)}
        </div>
      )}

      <div className="s2px-sidebar__grid">
        {rows.map(({ label, value, copyable }) =>
          value ? (
            <div key={label} className="s2px-row">
              <span className="s2px-row__label">{label}</span>
              <span className="s2px-row__value">
                {value}
                {copyable && (
                  <button
                    className="s2px-copy-btn"
                    onClick={() => copyValue(label, value)}
                    title={`Copy ${label}`}
                  >
                    {copiedField === label ? 'Copied' : 'Copy'}
                  </button>
                )}
              </span>
            </div>
          ) : null
        )}
      </div>

      {payload.disciplines.length > 0 && (
        <div className="s2px-section">
          <span className="s2px-row__label">Disciplines</span>
          <div className="s2px-badges">
            {payload.disciplines.map(d => (
              <span key={d} className="s2px-discipline-badge">{d}</span>
            ))}
          </div>
        </div>
      )}

      {payload.buildingFeatures.length > 0 && (
        <div className="s2px-section">
          <span className="s2px-row__label">Features</span>
          <div className="s2px-badges">
            {payload.buildingFeatures.map(f => (
              <span key={f} className="s2px-feature-badge">{f}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Editor ──

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('city-guide');
  const [city, setCity] = useState('');
  const [author, setAuthor] = useState('Big Muddy Magazine');
  const [status, setStatus] = useState('draft');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [readTime, setReadTime] = useState('');
  const [publishedAt, setPublishedAt] = useState('');

  // Parsed S2PX payload
  const [s2pxPayload, setS2pxPayload] = useState<S2PXPayload | null>(null);

  const fetchArticle = useCallback(async () => {
    try {
      const res = await fetch(`/api/articles/${id}`);
      if (!res.ok) throw new Error('Article not found');
      const json = await res.json();
      const a: ArticleData = json.data ?? json;

      setArticle(a);
      setTitle(a.title);
      setSlug(a.slug);
      setCategory(a.category);
      setCity(a.city ?? '');
      setAuthor(a.author);
      setStatus(a.status);
      setExcerpt(a.excerpt ?? '');
      setBody(a.body ?? '');
      setHeroImage(a.heroImage ?? '');
      setReadTime(a.readTime ?? '');
      setPublishedAt(a.publishedAt ? new Date(a.publishedAt).toISOString().slice(0, 16) : '');

      // Parse S2PX payload if present
      if (a.sourcePayload) {
        try {
          setS2pxPayload(JSON.parse(a.sourcePayload));
        } catch {
          // Invalid JSON — ignore
        }
      }
    } catch (err) {
      setError('Failed to load article.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          category,
          city: city || null,
          author,
          status,
          excerpt: excerpt || null,
          body: body || null,
          heroImage: heroImage || null,
          readTime: readTime || null,
          publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: 'Save failed' }));
        throw new Error(errJson.error || 'Save failed');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      router.push('/articles');
    } catch {
      alert('Failed to delete article.');
    }
  };

  if (loading) {
    return (
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Article</h1>
          <p className="admin-page-sub">Loading...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Article Not Found</h1>
          <p className="admin-page-sub">ID: {id}</p>
        </div>
        <a href="/articles" className="admin-btn admin-btn--ghost">← Back</a>
      </div>
    );
  }

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Article</h1>
          <p className="admin-page-sub">
            {article.sourceSystem === 's2px' && (
              <span className="source-badge" style={{ marginRight: 'var(--space-2)' }}>S2PX</span>
            )}
            {article.slug}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <a href="/articles" className="admin-btn admin-btn--ghost">← Back</a>
          <button onClick={handleDelete} className="admin-btn admin-btn--danger">Delete</button>
        </div>
      </div>

      {error && (
        <div className="admin-error-banner" style={{ marginBottom: 'var(--space-4)' }}>
          {error}
        </div>
      )}

      {success && (
        <div className="admin-success-banner" style={{ marginBottom: 'var(--space-4)' }}>
          Article saved.
        </div>
      )}

      <div className="editor-layout">
        {/* ── Main Editor Column ── */}
        <div className="editor-main">
          <div className="admin-card">
            <form onSubmit={handleSave}>
              <div className="admin-form-group">
                <label className="admin-label admin-label--required">Title</label>
                <input type="text" className="admin-input" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>

              <div className="admin-form-group">
                <label className="admin-label admin-label--required">Slug</label>
                <input type="text" className="admin-input" value={slug} onChange={e => setSlug(e.target.value)} required />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-label admin-label--required">Category</label>
                  <select className="admin-select" value={category} onChange={e => setCategory(e.target.value)} required>
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</option>
                    ))}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">City</label>
                  <select className="admin-select" value={city} onChange={e => setCity(e.target.value)}>
                    <option value="">None</option>
                    {CITIES.map(c => (
                      <option key={c} value={c}>{formatCityLabel(c)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-label">Author</label>
                  <input type="text" className="admin-input" value={author} onChange={e => setAuthor(e.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Read Time</label>
                  <input type="text" className="admin-input" value={readTime} onChange={e => setReadTime(e.target.value)} placeholder="6 min read" />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Excerpt</label>
                <textarea className="admin-textarea" rows={3} value={excerpt} onChange={e => setExcerpt(e.target.value)} />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Body (Markdown)</label>
                <textarea
                  className="admin-textarea"
                  rows={16}
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Hero Image URL</label>
                <input type="url" className="admin-input" value={heroImage} onChange={e => setHeroImage(e.target.value)} />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-label admin-label--required">Status</label>
                  <select className="admin-select" value={status} onChange={e => setStatus(e.target.value)} required>
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Publish Date</label>
                  <input type="datetime-local" className="admin-input" value={publishedAt} onChange={e => setPublishedAt(e.target.value)} />
                </div>
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <a href="/articles" className="admin-btn admin-btn--ghost">Cancel</a>
              </div>
            </form>
          </div>
        </div>

        {/* ── S2PX Sidebar (only for bridge-sourced articles) ── */}
        {s2pxPayload && (
          <div className="editor-sidebar">
            <S2pxMetadataSidebar payload={s2pxPayload} syncedAt={article.sourceSyncedAt} />
          </div>
        )}
      </div>

      <style>{`
        .editor-layout {
          display: flex;
          gap: var(--space-6);
          align-items: flex-start;
        }
        .editor-main {
          flex: 1;
          min-width: 0;
        }
        .editor-sidebar {
          width: 300px;
          flex-shrink: 0;
          position: sticky;
          top: var(--space-6);
        }
        @media (max-width: 1024px) {
          .editor-layout {
            flex-direction: column;
          }
          .editor-sidebar {
            width: 100%;
            position: static;
          }
        }

        /* Source badge (shared with list page) */
        .source-badge {
          display: inline-flex;
          align-items: center;
          padding: 1px 6px;
          font-size: 10px;
          font-weight: 700;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #60a5fa;
          background: rgba(96, 165, 250, 0.12);
          border: 1px solid rgba(96, 165, 250, 0.25);
          border-radius: 3px;
          white-space: nowrap;
        }

        /* S2PX Metadata Sidebar */
        .s2px-sidebar {
          background: #0f172a;
          border: 1px solid rgba(96, 165, 250, 0.2);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .s2px-sidebar__header {
          padding: var(--space-3) var(--space-4);
          background: rgba(96, 165, 250, 0.08);
          border-bottom: 1px solid rgba(96, 165, 250, 0.15);
          font-size: var(--text-sm);
          font-weight: 700;
          color: #60a5fa;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .s2px-sidebar__icon {
          font-size: 10px;
        }
        .s2px-sidebar__synced {
          padding: var(--space-2) var(--space-4);
          font-size: 11px;
          color: #64748b;
          border-bottom: 1px solid rgba(96, 165, 250, 0.1);
        }
        .s2px-sidebar__grid {
          padding: var(--space-2) 0;
        }
        .s2px-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: var(--space-1) var(--space-4);
          gap: var(--space-2);
        }
        .s2px-row__label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }
        .s2px-row__value {
          font-size: var(--text-sm);
          color: #e2e8f0;
          text-align: right;
          font-family: var(--font-mono);
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .s2px-copy-btn {
          font-size: 10px;
          padding: 0 4px;
          border: 1px solid rgba(96, 165, 250, 0.3);
          background: transparent;
          color: #60a5fa;
          border-radius: 2px;
          cursor: pointer;
          font-family: var(--font-mono);
        }
        .s2px-copy-btn:hover {
          background: rgba(96, 165, 250, 0.15);
        }
        .s2px-section {
          padding: var(--space-2) var(--space-4) var(--space-3);
          border-top: 1px solid rgba(96, 165, 250, 0.1);
        }
        .s2px-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: var(--space-1);
        }
        .s2px-discipline-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          background: rgba(96, 165, 250, 0.15);
          color: #93c5fd;
          border-radius: 3px;
          font-family: var(--font-mono);
          letter-spacing: 0.03em;
        }
        .s2px-feature-badge {
          font-size: 10px;
          padding: 2px 6px;
          background: rgba(148, 163, 184, 0.12);
          color: #94a3b8;
          border-radius: 3px;
        }

        .admin-success-banner {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.4);
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-4);
          color: #22c55e;
          font-size: var(--text-sm);
        }
        .admin-error-banner {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid var(--error, #ef4444);
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-4);
          color: var(--error, #ef4444);
          font-size: var(--text-sm);
        }
        .admin-btn--danger {
          color: var(--error, #ef4444);
          border-color: var(--error, #ef4444);
        }
        .admin-btn--danger:hover {
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </>
  );
}
