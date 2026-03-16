'use client';

// apps/web/app/portal/reviews/reviews-client.tsx
// Reviews view — read-only for clients, shows all tracked reviews with draft/posted responses
//
// Usage: /portal/reviews?client=1

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface ReviewData {
  id: number;
  platform: string;
  author: string;
  rating: number;
  text: string | null;
  response: string | null;
  aiDraft: string | null;
  responseStatus: string;
  postedAt: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span className="portal-star-rating" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} aria-hidden="true" className={i < rating ? 'star star--filled' : 'star star--empty'}>
          {i < rating ? '\u2605' : '\u2606'}
        </span>
      ))}
    </span>
  );
}

export default function PortalReviewsClient() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('client');
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;
    fetch(`${baseUrl}/api/clients/${clientId}/reviews`)
      .then(r => r.json())
      .then(d => setReviews(d.data || []))
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) {
    return (
      <p style={{ textAlign: 'center', color: 'var(--text-muted, #8a8074)', padding: '64px 0' }}
        role="status" aria-live="polite">
        Loading reviews...
      </p>
    );
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 'N/A';

  const pending = reviews.filter(
    r => r.responseStatus === 'pending' || r.responseStatus === 'drafted'
  ).length;

  return (
    <>
      <h1 className="portal-page-title">Reviews</h1>

      <div className="portal-stats" role="list" aria-label="Review statistics">
        <div className="portal-stat" role="listitem">
          <span className="portal-stat__value">{reviews.length}</span>
          <span className="portal-stat__label">Total Reviews</span>
        </div>
        <div className="portal-stat" role="listitem">
          <span className="portal-stat__value">{avgRating}</span>
          <span className="portal-stat__label">Average Rating</span>
        </div>
        <div className="portal-stat" role="listitem">
          <span className="portal-stat__value">{pending}</span>
          <span className="portal-stat__label">Needs Response</span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="portal-empty">
          <h2>No reviews tracked yet</h2>
          <p>We&apos;ll start monitoring your reviews soon.</p>
        </div>
      ) : (
        <div className="portal-reviews-list" role="list" aria-label="Customer reviews">
          {reviews.map(review => (
            <article key={review.id} className="portal-card" role="listitem">
              <div className="portal-review-header">
                <div className="portal-review-author">
                  <strong className="portal-review-name">{review.author}</strong>
                  <span className="portal-review-dot" aria-hidden="true">&middot;</span>
                  <span className="portal-platform-badge">{review.platform}</span>
                </div>
                <StarRating rating={review.rating} />
              </div>

              {review.text && (
                <blockquote className="portal-review-text">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
              )}

              {(review.response || review.aiDraft) && (
                <div className="portal-review-response">
                  <p className="portal-review-response__label">
                    {review.responseStatus === 'posted' ? 'Our Response' : 'Draft Response'}
                  </p>
                  <p className="portal-review-response__text">
                    {review.response || review.aiDraft}
                  </p>
                </div>
              )}

              <time
                className="portal-review-date"
                dateTime={review.postedAt}
              >
                {new Date(review.postedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </article>
          ))}
        </div>
      )}

      <style>{`
        .portal-page-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text, #2a2520);
          margin: 0 0 var(--space-8, 32px);
          letter-spacing: -0.01em;
        }
        .portal-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: var(--space-4, 16px);
          margin-bottom: var(--space-8, 32px);
        }
        .portal-stat {
          background: var(--surface, #fff);
          border: 1px solid var(--border, #e5e2dc);
          border-radius: var(--radius-md, 8px);
          padding: var(--space-6, 24px);
          text-align: center;
        }
        .portal-stat__value {
          display: block;
          font-size: 2rem;
          font-weight: 800;
          color: var(--text, #2a2520);
          line-height: 1;
          margin-bottom: var(--space-2, 8px);
          letter-spacing: -0.02em;
        }
        .portal-stat__label {
          font-size: var(--text-xs, 12px);
          font-weight: 600;
          color: var(--text-muted, #8a8074);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .portal-empty {
          text-align: center;
          padding: 64px 0;
          color: var(--text-muted, #8a8074);
        }
        .portal-empty h2 {
          color: var(--text, #2a2520);
          margin-bottom: 8px;
        }
        .portal-reviews-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4, 16px);
        }
        .portal-card {
          background: var(--surface, #fff);
          border: 1px solid var(--border, #e5e2dc);
          border-radius: var(--radius-md, 8px);
          padding: var(--space-6, 24px);
        }
        .portal-review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-3, 12px);
          gap: var(--space-3, 12px);
          flex-wrap: wrap;
        }
        .portal-review-author {
          display: flex;
          align-items: center;
          gap: var(--space-2, 8px);
          flex-wrap: wrap;
        }
        .portal-review-name {
          font-size: var(--text-sm, 14px);
          font-weight: 600;
          color: var(--text, #2a2520);
        }
        .portal-review-dot {
          color: var(--text-disabled, #b8b0a4);
        }
        .portal-platform-badge {
          display: inline-block;
          padding: 2px 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 3px;
          background: var(--accent-muted, rgba(200, 85, 61, 0.12));
          color: var(--accent, #c8553d);
        }
        .portal-star-rating {
          display: inline-flex;
          gap: 2px;
        }
        .star {
          font-size: 16px;
          line-height: 1;
        }
        .star--filled {
          color: #e4a11b;
        }
        .star--empty {
          color: var(--border, #e5e2dc);
        }
        .portal-review-text {
          font-size: var(--text-sm, 14px);
          color: var(--text, #2a2520);
          line-height: 1.6;
          margin: 0 0 var(--space-3, 12px);
          font-style: italic;
        }
        .portal-review-response {
          background: var(--bg, #faf9f6);
          padding: var(--space-3, 12px) var(--space-4, 16px);
          border-radius: var(--radius-sm, 4px);
          border-left: 3px solid var(--accent, #c8553d);
          margin-bottom: var(--space-3, 12px);
        }
        .portal-review-response__label {
          font-size: var(--text-xs, 12px);
          font-weight: 600;
          color: var(--text-muted, #8a8074);
          margin: 0 0 var(--space-1, 4px);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .portal-review-response__text {
          font-size: var(--text-sm, 14px);
          color: var(--text, #2a2520);
          line-height: 1.6;
          margin: 0;
        }
        .portal-review-date {
          display: block;
          font-size: var(--text-xs, 12px);
          color: var(--text-disabled, #b8b0a4);
        }
      `}</style>
    </>
  );
}
