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

export default function ReviewsClient({ reviews, stats }: { reviews: SerializedReview[]; stats: Stats }) {
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

    const stars = (rating: number) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

    const statusColors: Record<string, string> = {
        pending: '#ef4444',
        drafted: '#f59e0b',
        approved: '#3b82f6',
        posted: '#22c55e',
        skipped: '#a3a3a3',
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
            {/* Header */}
            <div style={{
                background: 'var(--theme-card-bg, #fff)',
                border: '1px solid var(--theme-card-border, #e5e5e5)',
                borderRadius: '12px',
                padding: '1.5rem 2rem',
                marginBottom: '1.5rem',
            }}>
                <h1 style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--theme-text-primary, #1a1a1a)',
                    marginBottom: '0.5rem',
                }}>
                    Reviews
                </h1>
                <p style={{ color: 'var(--theme-text-secondary, #6b6b6b)', fontSize: '0.95rem' }}>
                    Manage guest reviews across all platforms. Generate AI responses, edit, approve, and post.
                </p>
            </div>

            {/* Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.5rem',
            }}>
                {[
                    { label: 'Average', value: `${stats.avgRating} ★`, color: '#c8943e' },
                    { label: 'Pending', value: stats.pending, color: '#ef4444' },
                    { label: 'Drafted', value: stats.drafted, color: '#f59e0b' },
                    { label: 'Approved', value: stats.approved, color: '#3b82f6' },
                    { label: 'Posted', value: stats.posted, color: '#22c55e' },
                ].map(s => (
                    <div key={s.label} style={{
                        background: 'var(--theme-card-bg, #fff)',
                        border: '1px solid var(--theme-card-border, #e5e5e5)',
                        borderRadius: '10px',
                        padding: '1rem',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted, #999)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {['all', 'pending', 'drafted', 'approved', 'posted'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '0.4rem 1rem',
                            borderRadius: '999px',
                            border: filter === f ? '2px solid var(--theme-accent, #c8943e)' : '1px solid var(--theme-card-border, #ddd)',
                            background: filter === f ? 'var(--theme-accent-bg, rgba(200,148,62,0.1))' : 'transparent',
                            color: filter === f ? 'var(--theme-accent, #c8943e)' : 'var(--theme-text-secondary, #666)',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            textTransform: 'capitalize',
                            cursor: 'pointer',
                        }}
                    >
                        {f} {f !== 'all' ? `(${localReviews.filter(r => r.responseStatus === f).length})` : `(${localReviews.length})`}
                    </button>
                ))}
            </div>

            {/* Review Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filtered.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        color: 'var(--theme-text-muted, #999)',
                    }}>
                        No reviews in this category yet. 🌻
                    </div>
                )}
                {filtered.map(review => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        generating={generating === review.id}
                        onGenerateDraft={() => generateDraft(review.id)}
                        onApprove={(response) => approveResponse(review.id, response)}
                        stars={stars}
                        statusColors={statusColors}
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
    statusColors,
}: {
    review: SerializedReview;
    generating: boolean;
    onGenerateDraft: () => void;
    onApprove: (response: string) => void;
    stars: (n: number) => string;
    statusColors: Record<string, string>;
}) {
    const [editing, setEditing] = useState(false);
    const [editedResponse, setEditedResponse] = useState(review.aiDraft || review.response || '');

    const posted = new Date(review.postedAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });

    return (
        <div style={{
            background: 'var(--theme-card-bg, #fff)',
            border: '1px solid var(--theme-card-border, #e5e5e5)',
            borderRadius: '12px',
            padding: '1.5rem',
            transition: 'box-shadow 0.2s',
        }}>
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#c8943e', fontSize: '1rem', letterSpacing: '2px' }}>
                            {stars(review.rating)}
                        </span>
                        <span style={{
                            padding: '0.15rem 0.5rem',
                            borderRadius: '999px',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: '#fff',
                            background: statusColors[review.responseStatus] || '#999',
                        }}>
                            {review.responseStatus}
                        </span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--theme-text-secondary, #666)', marginTop: '0.25rem' }}>
                        <strong>{review.author}</strong> on {review.platform} · {posted}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted, #999)' }}>
                        {review.client.name}{review.client.businessType ? ` · ${review.client.businessType}` : ''}
                    </div>
                </div>
            </div>

            {/* Review text */}
            {review.text && (
                <div style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--theme-hover, rgba(0,0,0,0.02))',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    color: 'var(--theme-text-primary, #1a1a1a)',
                    marginBottom: '1rem',
                    fontStyle: 'italic',
                }}>
                    "{review.text}"
                </div>
            )}

            {/* AI Draft / Response */}
            {(review.aiDraft || review.response) && (
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--theme-text-muted, #999)', marginBottom: '0.25rem' }}>
                        {review.response ? 'Our Response' : 'AI Draft'}
                    </div>
                    {editing ? (
                        <textarea
                            value={editedResponse}
                            onChange={e => setEditedResponse(e.target.value)}
                            rows={4}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid var(--theme-card-border, #ddd)',
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                fontFamily: 'inherit',
                                resize: 'vertical',
                                background: 'var(--theme-card-bg, #fff)',
                                color: 'var(--theme-text-primary, #1a1a1a)',
                            }}
                        />
                    ) : (
                        <div style={{
                            padding: '0.75rem',
                            background: 'var(--theme-accent-bg, rgba(200,148,62,0.05))',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            lineHeight: 1.6,
                            color: 'var(--theme-text-primary, #1a1a1a)',
                        }}>
                            {review.response || review.aiDraft}
                        </div>
                    )}
                </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {review.responseStatus === 'pending' && (
                    <button
                        onClick={onGenerateDraft}
                        disabled={generating}
                        style={{
                            padding: '0.4rem 1rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: generating ? '#a3a3a3' : '#c8943e',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            cursor: generating ? 'wait' : 'pointer',
                        }}
                    >
                        {generating ? '🌻 Generating...' : '✨ Generate AI Response'}
                    </button>
                )}
                {(review.responseStatus === 'drafted' || editing) && (
                    <>
                        {!editing && (
                            <button
                                onClick={() => { setEditing(true); setEditedResponse(review.aiDraft || ''); }}
                                style={{
                                    padding: '0.4rem 1rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--theme-card-border, #ddd)',
                                    background: 'transparent',
                                    color: 'var(--theme-text-primary, #1a1a1a)',
                                    fontWeight: 600,
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                }}
                            >
                                ✏️ Edit
                            </button>
                        )}
                        <button
                            onClick={() => { onApprove(editedResponse); setEditing(false); }}
                            style={{
                                padding: '0.4rem 1rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: '#22c55e',
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                            }}
                        >
                            ✓ Approve & Save
                        </button>
                        {editing && (
                            <button
                                onClick={() => setEditing(false)}
                                style={{
                                    padding: '0.4rem 1rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--theme-card-border, #ddd)',
                                    background: 'transparent',
                                    color: 'var(--theme-text-secondary, #666)',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                }}
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
