'use client';

// apps/web/app/admin/articles/page.tsx
// Article management CMS page — search, filter, table/cards

import { useState, useMemo } from 'react';
import { CITY_GUIDE_ARTICLES } from '@/lib/articles';
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

export default function AdminArticlesPage() {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = useMemo(() => {
    return CITY_GUIDE_ARTICLES.filter((a: Article) => {
      const matchSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        (a.city ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (a.author ?? '').toLowerCase().includes(search.toLowerCase());

      const matchCity = !cityFilter || a.city === cityFilter;
      const matchStatus = statusFilter === 'all' || a.status === statusFilter;

      return matchSearch && matchCity && matchStatus;
    });
  }, [search, cityFilter, statusFilter]);

  return (
    <>
      {/* ── Page Header ── */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Articles</h1>
          <p className="admin-page-sub">{CITY_GUIDE_ARTICLES.length} articles total · {filtered.length} shown</p>
        </div>
        <a href="/articles/new" className="admin-btn admin-btn--primary">
          + New Article
        </a>
      </div>

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
            {filtered.length === 0 ? (
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
                <tr key={article.id}>
                  <td>
                    <div className="articles-title-cell">
                      <a
                        href={`/articles/edit/${article.slug}`}
                        className="articles-title-link"
                      >
                        {article.title}
                      </a>
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
                    <StatusBadge status={article.status as string} />
                  </td>
                  <td>
                    <span className="articles-date">{formatDate(article.publishedAt)}</span>
                  </td>
                  <td>
                    <div className="articles-actions">
                      <a
                        href={`/articles/edit/${article.slug}`}
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
        {filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty__icon">◻</div>
            <p className="admin-empty__text">No articles match your filters.</p>
          </div>
        ) : (
          filtered.map((article: Article) => (
            <div key={article.id} className="article-mobile-card">
              <div className="article-mobile-card__top">
                <StatusBadge status={article.status as string} />
                <span className="articles-date">{formatDate(article.publishedAt)}</span>
              </div>
              <a
                href={`/articles/edit/${article.slug}`}
                className="articles-title-link article-mobile-card__title"
              >
                {article.title}
              </a>
              <div className="article-mobile-card__meta">
                <span className="articles-city">{formatCityLabel(article.city as string | null)}</span>
                <span className="articles-category">{article.category}</span>
                {article.readTime && (
                  <span className="articles-read-time">{article.readTime}</span>
                )}
              </div>
              <div className="articles-actions" style={{ marginTop: 'var(--space-3)' }}>
                <a
                  href={`/articles/edit/${article.slug}`}
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
