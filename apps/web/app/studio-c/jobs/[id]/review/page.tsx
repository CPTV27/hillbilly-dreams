'use client';

// Client review portal — no auth, accessed via link
// /studio-c/jobs/:id/review

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface JobData {
  id: string;
  clientBrand: string;
  requestType: string;
  brief: string;
  location: string | null;
  status: string;
  assignedTo: string | null;
  notes: string | null;
  createdAt: string;
  artifacts: Array<{
    id: number;
    type: string;
    gcsUrl: string;
    mimeType: string;
    createdAt: string;
  }>;
}

const STATUS_LABELS: Record<string, string> = {
  submitted: 'Submitted',
  accepted: 'Accepted',
  scheduled: 'Scheduled',
  shooting: 'In Production',
  editing: 'Editing',
  review: 'Ready for Review',
  delivered: 'Delivered',
  archived: 'Archived',
};

export default function ClientReviewPage() {
  const params = useParams();
  const id = params.id as string;
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/studio-c/jobs/${id}/review`)
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error);
        else setJob(d.data);
      })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  const submitFeedback = async (approved: boolean) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch(`/api/studio-c/jobs/${id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved, feedback: feedback.trim() || null }),
      });
      setSubmitted(true);
    } catch {
      setError('Failed to submit feedback');
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg, #faf9f6)', fontFamily: 'var(--font-body, system-ui)', color: 'var(--text-muted, #8a8074)' }}>
        Loading...
      </div>
    );
  }

  if (error || !job) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg, #faf9f6)', fontFamily: 'var(--font-body, system-ui)', color: 'var(--error, #b54c4c)', padding: '2rem' }}>
        {error || 'Job not found'}
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg, #faf9f6)', fontFamily: 'var(--font-body, system-ui)', padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text, #2a2520)', marginBottom: '0.5rem' }}>Feedback received</h1>
        <p style={{ color: 'var(--text-muted, #8a8074)' }}>The Studio C team will follow up shortly.</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #faf9f6)', fontFamily: 'var(--font-body, system-ui)', padding: '2rem 1.5rem', maxWidth: 700, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent, #c8943e)', marginBottom: '0.5rem' }}>
          Studio C Video &middot; Utopia Studios, Bearsville NY
        </p>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text, #2a2520)', margin: '0 0 0.25rem' }}>
          Review Your Project
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted, #8a8074)' }}>
          {job.requestType.replace(/-/g, ' ')} &middot; Status: {STATUS_LABELS[job.status] || job.status}
        </p>
      </div>

      {/* Brief */}
      <div style={{ background: 'var(--surface, #fff)', border: '1px solid var(--border, #e5e2dc)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted, #8a8074)', marginBottom: '0.5rem' }}>Project Brief</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text, #2a2520)', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>{job.brief}</p>
      </div>

      {/* Deliverables */}
      {job.artifacts && job.artifacts.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted, #8a8074)', marginBottom: '0.75rem' }}>Deliverables</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {job.artifacts.map(a => (
              <div key={a.id} style={{ background: 'var(--surface, #fff)', border: '1px solid var(--border, #e5e2dc)', borderRadius: '8px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text, #2a2520)' }}>{a.type}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted, #8a8074)', marginLeft: '0.5rem' }}>{a.mimeType}</span>
                </div>
                <a href={a.gcsUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--accent, #c8943e)', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid var(--accent, #c8943e)', paddingBottom: '1px' }}>
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes from team */}
      {job.notes && (
        <div style={{ background: 'var(--surface, #fff)', border: '1px solid var(--border, #e5e2dc)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--accent, #c8943e)' }}>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent, #c8943e)', marginBottom: '0.5rem' }}>Notes from Studio C</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text, #2a2520)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{job.notes}</p>
        </div>
      )}

      {/* Feedback form */}
      {(job.status === 'review' || job.status === 'delivered') && (
        <div style={{ background: 'var(--surface, #fff)', border: '1px solid var(--border, #e5e2dc)', borderRadius: '8px', padding: '1.25rem' }}>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted, #8a8074)', marginBottom: '0.75rem' }}>Your Feedback</h2>
          <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder="Any changes needed? Notes for the team?"
            rows={4}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border, #e5e2dc)', borderRadius: '6px', fontSize: '0.85rem', fontFamily: 'inherit', resize: 'vertical', background: 'var(--bg, #faf9f6)', color: 'var(--text, #2a2520)', boxSizing: 'border-box', outline: 'none' }}
          />
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
            <button
              onClick={() => submitFeedback(true)}
              disabled={submitting}
              style={{ padding: '0.6rem 1.5rem', background: 'var(--accent, #c8943e)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', opacity: submitting ? 0.6 : 1 }}
            >
              Approve
            </button>
            <button
              onClick={() => submitFeedback(false)}
              disabled={submitting || !feedback.trim()}
              style={{ padding: '0.6rem 1.5rem', background: 'transparent', color: 'var(--text, #2a2520)', border: '1px solid var(--border, #e5e2dc)', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', opacity: (submitting || !feedback.trim()) ? 0.5 : 1 }}
            >
              Request Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
