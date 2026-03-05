'use client';

// apps/web/app/(admin)/newsletter/page.tsx
// Newsletter management — fetches from /api/newsletter, supports status filter, delete

import { useState, useMemo, useEffect, useCallback } from 'react';

const STATUS_FILTERS = ['all', 'draft', 'scheduled', 'sent'];

interface NewsletterIssue {
  id: number;
  issueNumber: number;
  subject: string;
  storyTitle: string | null;
  storyBody: string | null;
  playlist: string | null;
  reason: string | null;
  quickHits: string | null;
  status: string;
  sendDate: string | null;
  createdAt: string;
  updatedAt: string;
}

function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function SkeletonRow() {
  return (
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton--text" style={{ width: '30%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '80%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '60%' }} /></td>
      <td><div className="skeleton skeleton--badge" /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '55%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '40%' }} /></td>
    </tr>
  );
}

export default function NewsletterAdminPage() {
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchIssues = useCallback(async () => {
    try {
      const res = await fetch('/api/newsletter');
      const json = await res.json();
      setIssues(json.data ?? []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch newsletter issues:', err);
      setError('Failed to load newsletter issues.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchIssues(); }, [fetchIssues]);

  const handleDelete = async (id: number, subject: string) => {
    if (!confirm(`Delete issue "${subject}"? This cannot be undone.`)) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/newsletter/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setIssues((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete issue.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkSent = async (id: number) => {
    if (!confirm('Mark this issue as sent? This indicates it has been published.')) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/newsletter/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'sent', sendDate: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, ...updated } : i)));
    } catch (err) {
      console.error('Mark sent error:', err);
      alert('Failed to update status.');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = useMemo(() => {
    return issues.filter((i) => statusFilter === 'all' || i.status === statusFilter);
  }, [issues, statusFilter]);

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Newsletter</h1>
          <p className="admin-page-sub">
            {loading ? '…' : `${issues.length} issues total · ${filtered.length} shown`}
          </p>
        </div>
        <a href="/newsletter/new" className="admin-btn admin-btn--primary">+ New Issue</a>
      </div>

      {error && (
        <div className="admin-error-banner">
          {error}
          <button onClick={fetchIssues} className="admin-btn admin-btn--ghost" style={{ marginLeft: 'var(--space-3)' }}>Retry</button>
        </div>
      )}

      <div className="admin-filter-bar">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`admin-filter-btn ${statusFilter === s ? 'admin-filter-btn--active' : ''}`}
          >
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="admin-table-wrap newsletter-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th><th>Subject</th><th>Story</th><th>Status</th><th>Send Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>{Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}</>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6}>
                <div className="admin-empty">
                  <div className="admin-empty__icon">◻</div>
                  <p className="admin-empty__text">No issues match your filters.</p>
                </div>
              </td></tr>
            ) : (
              filtered.map((issue) => (
                <tr key={issue.id} className={actionLoading === issue.id ? 'row-loading' : ''}>
                  <td><span className="newsletter-num">#{issue.issueNumber}</span></td>
                  <td>
                    <a href={`/newsletter/${issue.id}/edit`} className="newsletter-subject-link">{issue.subject}</a>
                  </td>
                  <td><span className="newsletter-story">{issue.storyTitle ?? '—'}</span></td>
                  <td>
                    <span className={`admin-badge admin-badge--${issue.status}`}>{issue.status}</span>
                  </td>
                  <td><span className="newsletter-date">{formatDate(issue.sendDate)}</span></td>
                  <td>
                    <div className="newsletter-actions">
                      <a href={`/newsletter/${issue.id}/edit`} className="admin-btn admin-btn--ghost newsletter-action-btn">Edit</a>
                      {issue.status !== 'sent' && (
                        <button
                          onClick={() => handleMarkSent(issue.id)}
                          className="admin-btn admin-btn--ghost newsletter-action-btn"
                          disabled={actionLoading === issue.id}
                          style={{ color: 'var(--success)' }}
                        >
                          Mark Sent
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(issue.id, issue.subject)}
                        className="admin-btn admin-btn--danger newsletter-action-btn"
                        disabled={actionLoading === issue.id}
                      >
                        {actionLoading === issue.id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="newsletter-mobile-list">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="newsletter-mobile-card">
              <div className="skeleton skeleton--badge" style={{ marginBottom: 'var(--space-3)' }} />
              <div className="skeleton skeleton--text" style={{ width: '80%', marginBottom: 'var(--space-2)' }} />
              <div className="skeleton skeleton--text" style={{ width: '50%' }} />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty__icon">◻</div>
            <p className="admin-empty__text">No issues match your filters.</p>
          </div>
        ) : (
          filtered.map((issue) => (
            <div key={issue.id} className={`newsletter-mobile-card ${actionLoading === issue.id ? 'row-loading' : ''}`}>
              <div className="newsletter-mobile-card__top">
                <span className={`admin-badge admin-badge--${issue.status}`}>{issue.status}</span>
                <span className="newsletter-date">{formatDate(issue.sendDate)}</span>
              </div>
              <a href={`/newsletter/${issue.id}/edit`} className="newsletter-subject-link newsletter-mobile-card__subject">
                <span className="newsletter-num">#{issue.issueNumber}</span> {issue.subject}
              </a>
              {issue.storyTitle && <p className="newsletter-story">{issue.storyTitle}</p>}
              <div className="newsletter-actions" style={{ marginTop: 'var(--space-3)' }}>
                <a href={`/newsletter/${issue.id}/edit`} className="admin-btn admin-btn--ghost newsletter-action-btn">Edit</a>
                {issue.status !== 'sent' && (
                  <button
                    onClick={() => handleMarkSent(issue.id)}
                    className="admin-btn admin-btn--ghost newsletter-action-btn"
                    disabled={actionLoading === issue.id}
                    style={{ color: 'var(--success)' }}
                  >
                    Mark Sent
                  </button>
                )}
                <button
                  onClick={() => handleDelete(issue.id, issue.subject)}
                  className="admin-btn admin-btn--danger newsletter-action-btn"
                  disabled={actionLoading === issue.id}
                >
                  {actionLoading === issue.id ? '…' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .newsletter-table-wrap { display: none; }
        @media (min-width: 768px) {
          .newsletter-table-wrap { display: block; }
          .newsletter-mobile-list { display: none; }
        }
        .newsletter-num {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .newsletter-subject-link {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .newsletter-subject-link:hover { color: var(--accent-hover); text-decoration: underline; }
        .newsletter-story {
          font-size: var(--text-sm);
          color: var(--text-muted);
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .newsletter-date {
          font-size: var(--text-xs);
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .newsletter-actions { display: flex; gap: var(--space-2); }
        .newsletter-action-btn {
          font-size: var(--text-xs);
          padding: var(--space-1) var(--space-3);
        }
        .newsletter-mobile-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .newsletter-mobile-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-4);
        }
        .newsletter-mobile-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-2);
        }
        .newsletter-mobile-card__subject {
          display: block;
          font-size: var(--text-md);
          margin-bottom: var(--space-2);
        }
      `}</style>
    </>
  );
}
