'use client';

// apps/web/app/admin/articles/page.tsx
// Article management CMS page — fetches from /api/articles, supports delete + status toggle

import { useState, useMemo, useEffect, useCallback } from 'react';
import type { Article } from '@bigmuddy/config';

const ALL_CITIES = [
  { value: '', label: 'All Cities' },
  { value: 'memphis', label: 'Memphis' },
  { value: 'clarksdale', label: 'Clarksdale' },
  { value: 'vicksburg', label: 'Vicksburg' },
  { value: 'natchez', label: 'Natchez' },
  { value: 'st-francisville', label: 'St. Francisville' },
  { value: 'baton-rouge', label: 'Baton Rouge' },
  { value: 'new-orleans', label: 'New Orleans' },
  { value: 'lafayette', label: 'Lafayette' },
  { value: 'alexandria', label: 'Alexandria' },
  { value: 'monroe', label: 'Monroe' },
  { value: 'ruston', label: 'Ruston' },
  { value: 'natchitoches', label: 'Natchitoches' },
  { value: 'shreveport', label: 'Shreveport' },
  { value: 'el-dorado', label: 'El Dorado' },
  { value: 'little-rock', label: 'Little Rock' },
  { value: 'fayetteville', label: 'Fayetteville' },
  { value: 'bentonville', label: 'Bentonville' },
  { value: 'branson', label: 'Branson' },
  { value: 'other', label: 'Other' },
];

const STATUS_FILTERS = ['all', 'draft', 'review', 'published'];

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === 'published'
      ? 'admin-badge admin-badge--published'
      : status === 'review'
      ? 'admin-badge admin-badge--review'
      : 'admin-badge admin-badge--draft';
  return <span className={cls}>{status}</span>;
}

function SourceBadge({ sourceSystem, sourceProjectId }: { sourceSystem?: string | null; sourceProjectId?: string | null }) {
  if (!sourceSystem) return null;
  return (
    <span className="source-badge" title={`Source: ${sourceSystem} · ${sourceProjectId ?? ''}`}>
      {sourceSystem === 's2px' ? 'S2PX' : sourceSystem}
    </span>
  );
}

function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatCityLabel(city: string | null | undefined): string {
  if (!city) return '—';
  return city
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function SkeletonRow() {
  return (
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton--text" style={{ width: '70%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '60%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '50%' }} /></td>
      <td><div className="skeleton skeleton--badge" /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '55%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '40%' }} /></td>
    </tr>
  );
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch('/api/articles');
      const json = await res.json();
      setArticles(json.data ?? []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
      setError('Failed to load articles.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete article.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleStatusToggle = async (id: number, currentStatus: string) => {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    setActionLoading(id);
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: nextStatus,
          ...(nextStatus === 'published' ? { publishedAt: new Date().toISOString() } : {}),
        }),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
      );
    } catch (err) {
      console.error('Status toggle error:', err);
      alert('Failed to update status.');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = useMemo(() => {
    return articles.filter((a: Article) => {
      const matchSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        (a.city ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (a.author ?? '').toLowerCase().includes(search.toLowerCase());

      const matchCity = !cityFilter || a.city === cityFilter;
      const matchStatus = statusFilter === 'all' || a.status === statusFilter;

      return matchSearch && matchCity && matchStatus;
    });
  }, [articles, search, cityFilter, statusFilter]);

  return (
    <>
      {/* ── Page Header ── */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Articles</h1>
          <p className="admin-page-sub">
            {loading ? '…' : `${articles.length} articles total · ${filtered.length} shown`}
          </p>
        </div>
        <a href="/articles/new" className="admin-btn admin-btn--primary">
          + New Article
        </a>
      </div>

      {error && (
        <div className="admin-error-banner">
          {error}
          <button onClick={fetchArticles} className="admin-btn admin-btn--ghost" style={{ marginLeft: 'var(--space-3)' }}>
            Retry
          </button>
        </div>
      )}

      {/* ── Search + Filters ── */}
      <div className="articles-filters">
        <input
          type="search"
          placeholder="Search articles, cities, authors…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input articles-search"
          aria-label="Search articles"
        />

        <div className="admin-filter-bar">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`admin-filter-btn ${statusFilter === s ? 'admin-filter-btn--active' : ''}`}
            >
              {s === 'all' ? 'All Statuses' : s}
            </button>
          ))}
        </div>

        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="admin-select articles-city-filter"
          aria-label="Filter by city"
        >
          {ALL_CITIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* ── Desktop Table ── */}
      <div className="admin-table-wrap articles-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>City</th>
              <th>Category</th>
              <th>Status</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="admin-empty">
                    <div className="admin-empty__icon">◻</div>
                    <p className="admin-empty__text">No articles match your filters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((article: Article) => (
                <tr key={article.id} className={actionLoading === article.id ? 'row-loading' : ''}>
                  <td>
                    <div className="articles-title-cell">
                      <div className="articles-title-row">
                        <a
                          href={`/articles/${article.id}/edit`}
                          className="articles-title-link"
                        >
                          {article.title}
                        </a>
                        <SourceBadge sourceSystem={(article as any).sourceSystem} sourceProjectId={(article as any).sourceProjectId} />
                      </div>
                      {article.readTime && (
                        <span className="articles-read-time">{article.readTime}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="articles-city">{formatCityLabel(article.city as string | null)}</span>
                  </td>
                  <td>
                    <span className="articles-category">{article.category}</span>
                  </td>
                  <td>
                    <button
                      className="status-toggle-btn"
                      onClick={() => handleStatusToggle(article.id, article.status as string)}
                      disabled={actionLoading === article.id}
                      title={`Click to ${article.status === 'published' ? 'unpublish' : 'publish'}`}
                    >
                      <StatusBadge status={article.status as string} />
                    </button>
                  </td>
                  <td>
                    <span className="articles-date">{formatDate(article.publishedAt)}</span>
                  </td>
                  <td>
                    <div className="articles-actions">
                      <a
                        href={`/articles/${article.id}/edit`}
                        className="admin-btn admin-btn--ghost articles-action-btn"
                      >
                        Edit
                      </a>
                      <a
                        href={`https://bigmuddymagazine.com/articles/${article.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-btn admin-btn--ghost articles-action-btn"
                      >
                        View ↗
                      </a>
                      <button
                        onClick={() => handleDelete(article.id, article.title)}
                        className="admin-btn admin-btn--danger articles-action-btn"
                        disabled={actionLoading === article.id}
                      >
                        {actionLoading === article.id ? '…' : 'Delete'}
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
      <div className="articles-mobile-list">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="article-mobile-card">
                <div className="skeleton skeleton--badge" style={{ marginBottom: 'var(--space-3)' }} />
                <div className="skeleton skeleton--text" style={{ width: '80%', marginBottom: 'var(--space-2)' }} />
                <div className="skeleton skeleton--text" style={{ width: '50%' }} />
              </div>
            ))}
          </>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty__icon">◻</div>
            <p className="admin-empty__text">No articles match your filters.</p>
          </div>
        ) : (
          filtered.map((article: Article) => (
            <div key={article.id} className={`article-mobile-card ${actionLoading === article.id ? 'row-loading' : ''}`}>
              <div className="article-mobile-card__top">
                <button
                  className="status-toggle-btn"
                  onClick={() => handleStatusToggle(article.id, article.status as string)}
                  disabled={actionLoading === article.id}
                >
                  <StatusBadge status={article.status as string} />
                </button>
                <span className="articles-date">{formatDate(article.publishedAt)}</span>
              </div>
              <div className="articles-title-row" style={{ marginBottom: 'var(--space-2)' }}>
                <a
                  href={`/articles/${article.id}/edit`}
                  className="articles-title-link article-mobile-card__title"
                >
                  {article.title}
                </a>
                <SourceBadge sourceSystem={(article as any).sourceSystem} sourceProjectId={(article as any).sourceProjectId} />
              </div>
              <div className="article-mobile-card__meta">
                <span className="articles-city">{formatCityLabel(article.city as string | null)}</span>
                <span className="articles-category">{article.category}</span>
                {article.readTime && (
                  <span className="articles-read-time">{article.readTime}</span>
                )}
              </div>
              <div className="articles-actions" style={{ marginTop: 'var(--space-3)' }}>
                <a
                  href={`/articles/${article.id}/edit`}
                  className="admin-btn admin-btn--ghost articles-action-btn"
                >
                  Edit
                </a>
                <a
                  href={`https://bigmuddymagazine.com/articles/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn admin-btn--ghost articles-action-btn"
                >
                  View ↗
                </a>
                <button
                  onClick={() => handleDelete(article.id, article.title)}
                  className="admin-btn admin-btn--danger articles-action-btn"
                  disabled={actionLoading === article.id}
                >
                  {actionLoading === article.id ? '…' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .articles-filters {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
          flex-wrap: wrap;
          align-items: flex-start;
        }
        .articles-search {
          flex: 1;
          min-width: 200px;
        }
        .articles-city-filter {
          width: 180px;
          flex-shrink: 0;
        }
        .articles-table-wrap {
          display: none;
        }
        @media (min-width: 768px) {
          .articles-table-wrap {
            display: block;
          }
          .articles-mobile-list {
            display: none;
          }
        }
        .articles-title-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .articles-title-row {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
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
          flex-shrink: 0;
        }
        .articles-title-link {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
          line-height: var(--leading-snug);
        }
        .articles-title-link:hover {
          color: var(--accent-hover);
          text-decoration: underline;
        }
        .articles-read-time {
          font-size: var(--text-xs);
          color: var(--text-disabled);
        }
        .articles-city {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
        .articles-category {
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }
        .articles-date {
          font-size: var(--text-sm);
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: var(--text-xs);
        }
        .articles-actions {
          display: flex;
          gap: var(--space-2);
        }
        .articles-action-btn {
          font-size: var(--text-xs);
          padding: var(--space-1) var(--space-3);
        }
        .status-toggle-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: opacity var(--duration-fast) var(--ease-default);
        }
        .status-toggle-btn:hover {
          opacity: 0.7;
        }
        .status-toggle-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .admin-btn--danger {
          color: var(--error, #ef4444);
          border-color: var(--error, #ef4444);
        }
        .admin-btn--danger:hover {
          background: rgba(239, 68, 68, 0.1);
        }
        .row-loading {
          opacity: 0.5;
          pointer-events: none;
        }
        .admin-error-banner {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid var(--error, #ef4444);
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-4);
          margin-bottom: var(--space-4);
          color: var(--error, #ef4444);
          font-size: var(--text-sm);
          display: flex;
          align-items: center;
        }

        /* Skeleton loading */
        .skeleton {
          background: var(--surface);
          border-radius: var(--radius-sm);
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .skeleton--text {
          height: 14px;
        }
        .skeleton--badge {
          height: 22px;
          width: 70px;
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .skeleton-row td {
          padding: var(--space-3) var(--space-4);
        }

        /* Mobile cards */
        .articles-mobile-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .article-mobile-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-4);
        }
        .article-mobile-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-2);
        }
        .article-mobile-card__title {
          display: block;
          font-size: var(--text-md);
          margin-bottom: var(--space-2);
        }
        .article-mobile-card__meta {
          display: flex;
          gap: var(--space-3);
          flex-wrap: wrap;
          align-items: center;
        }
        .article-mobile-card__meta > * {
          font-size: var(--text-xs);
        }
      `}</style>
    </>
  );
}
