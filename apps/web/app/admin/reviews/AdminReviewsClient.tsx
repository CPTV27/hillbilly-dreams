'use client';

import { useState } from 'react';

type SerializedReview = {
  id: number;
  clientId: number;
  platform: string;
  externalId: string;
  author: string;
  rating: number;
  text: string | null;
  response: string | null;
  responseStatus: string;
  aiDraft: string | null;
  postedAt: string;
  respondedAt: string | null;
  createdAt: string;
  updatedAt: string;
  client: { name: string; businessType: string | null };
};

type Stats = {
  total: number;
  pending: number;
  drafted: number;
  approved: number;
  posted: number;
  avgRating: number;
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  drafted: 'Drafted',
  approved: 'Approved',
  posted: 'Posted',
  skipped: 'Skipped',
};

export default function AdminReviewsClient({ reviews, stats }: { reviews: SerializedReview[]; stats: Stats }) {
  const [filter, setFilter] = useState<string>('all');
  const [generating, setGenerating] = useState<number | null>(null);
  const [localReviews, setLocalReviews] = useState(reviews);

  const filtered = filter === 'all'
    ? localReviews
    : localReviews.filter(r => r.responseStatus === filter);

  const generateDraft = async (reviewId: number) => {
    setGenerating(reviewId);
    try {
      const res = await fetch('/api/ops/reviews/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId }),
      });
      if (res.ok) {
        const data = await res.json();
        setLocalReviews(prev => prev.map(r =>
          r.id === reviewId
            ? { ...r, aiDraft: data.draft, responseStatus: 'drafted' }
            : r
        ));
      }
    } catch (err) {
      console.error('Draft generation failed:', err);
    }
    setGenerating(null);
  };

  const approveResponse = async (reviewId: number, response: string) => {
    try {
      const res = await fetch('/api/ops/reviews/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, response }),
      });
      if (res.ok) {
        setLocalReviews(prev => prev.map(r =>
          r.id === reviewId ? { ...r, response, responseStatus: 'approved' } : r
        ));
      }
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  const stars = (rating: number) => '\u2605'.repeat(rating) + '\u2606'.repeat(5 - rating);

  const filters = ['all', 'pending', 'drafted', 'approved', 'posted'];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Review Queue</h1>
          <p className="admin-page-sub">
            Manage guest reviews across all platforms. Generate AI responses, edit, and approve.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-6)',
      }}>
        {[
          { label: 'Average', value: `${stats.avgRating} \u2605`, badgeClass: 'admin-badge--upcoming' },
          { label: 'Pending', value: stats.pending, badgeClass: 'admin-badge--sold-out' },
          { label: 'Drafted', value: stats.drafted, badgeClass: 'admin-badge--scheduled' },
          { label: 'Approved', value: stats.approved, badgeClass: 'admin-badge--sent' },
          { label: 'Posted', value: stats.posted, badgeClass: 'admin-badge--published' },
        ].map(s => (
          <div key={s.label} className="admin-card" style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--accent)' }}>{s.value}</div>
            <div style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-disabled)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-widest)',
              marginTop: 'var(--space-1)',
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="admin-filter-bar">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`admin-filter-btn ${filter === f ? 'admin-filter-btn--active' : ''}`}
          >
            {f} ({f === 'all' ? localReviews.length : localReviews.filter(r => r.responseStatus === f).length})
          </button>
        ))}
      </div>

      {/* Review Cards */}
      {filtered.length === 0 && (
        <div className="admin-empty">
          <div className="admin-empty__icon">{'\u2605'}</div>
          <p className="admin-empty__text">No reviews in this category yet.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filtered.map(review => (
          <ReviewCard
            key={review.id}
            review={review}
            generating={generating === review.id}
            onGenerateDraft={() => generateDraft(review.id)}
            onApprove={(response) => approveResponse(review.id, response)}
            stars={stars}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  generating,
  onGenerateDraft,
  onApprove,
  stars,
}: {
  review: SerializedReview;
  generating: boolean;
  onGenerateDraft: () => void;
  onApprove: (response: string) => void;
  stars: (n: number) => string;
}) {
  const [editing, setEditing] = useState(false);
  const [editedResponse, setEditedResponse] = useState(review.aiDraft || review.response || '');

  const posted = new Date(review.postedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  const statusBadgeClass: Record<string, string> = {
    pending: 'admin-badge--sold-out',
    drafted: 'admin-badge--scheduled',
    approved: 'admin-badge--sent',
    posted: 'admin-badge--published',
    skipped: 'admin-badge--archived',
  };

  return (
    <div className="admin-card" style={{ borderLeft: '3px solid var(--accent)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ color: 'var(--accent)', fontSize: 'var(--text-base)', letterSpacing: '2px' }}>
              {stars(review.rating)}
            </span>
            <span className={`admin-badge ${statusBadgeClass[review.responseStatus] || 'admin-badge--draft'}`}>
              {STATUS_LABELS[review.responseStatus] || review.responseStatus}
            </span>
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>
            <strong style={{ color: 'var(--text)' }}>{review.author}</strong> on {review.platform} &middot; {posted}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>
            {review.client.name}{review.client.businessType ? ` \u00b7 ${review.client.businessType}` : ''}
          </div>
        </div>
      </div>

      {/* Review text */}
      {review.text && (
        <div style={{
          padding: 'var(--space-3) var(--space-4)',
          background: 'var(--surface-2)',
          borderRadius: 'var(--radius-sm)',
          fontSize: 'var(--text-sm)',
          lineHeight: 'var(--leading-relaxed)',
          color: 'var(--text)',
          marginBottom: 'var(--space-4)',
          fontStyle: 'italic',
        }}>
          &ldquo;{review.text}&rdquo;
        </div>
      )}

      {/* AI Draft / Response */}
      {(review.aiDraft || review.response) && (
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--text-disabled)',
            letterSpacing: 'var(--tracking-widest)',
            marginBottom: 'var(--space-1)',
          }}>
            {review.response ? 'Our Response' : 'AI Draft'}
          </div>
          {editing ? (
            <textarea
              value={editedResponse}
              onChange={e => setEditedResponse(e.target.value)}
              rows={4}
              className="admin-textarea"
              style={{ minHeight: '80px' }}
            />
          ) : (
            <div style={{
              padding: 'var(--space-3)',
              background: 'var(--accent-muted)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--text)',
            }}>
              {review.response || review.aiDraft}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        {review.responseStatus === 'pending' && (
          <button
            onClick={onGenerateDraft}
            disabled={generating}
            className="admin-btn admin-btn--primary"
            style={{ opacity: generating ? 0.6 : 1, cursor: generating ? 'wait' : 'pointer' }}
          >
            {generating ? 'Generating...' : 'Generate AI Response'}
          </button>
        )}
        {(review.responseStatus === 'drafted' || editing) && (
          <>
            {!editing && (
              <button
                onClick={() => { setEditing(true); setEditedResponse(review.aiDraft || ''); }}
                className="admin-btn admin-btn--ghost"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => { onApprove(editedResponse); setEditing(false); }}
              className="admin-btn"
              style={{ background: 'var(--success)', color: 'var(--bg)' }}
            >
              Approve
            </button>
            {editing && (
              <button
                onClick={() => setEditing(false)}
                className="admin-btn admin-btn--ghost"
              >
                Cancel
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
