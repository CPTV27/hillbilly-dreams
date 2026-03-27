'use client';

// apps/web/app/(admin)/newsletter/[id]/edit/page.tsx

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

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
}

function parseQuickHits(raw: string | null): string {
  if (!raw) return '';
  try { return JSON.parse(raw).join('\n'); } catch { return raw; }
}

export default function EditNewsletterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [issue, setIssue] = useState<NewsletterIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/newsletter/${id}`)
      .then((r) => { if (r.status === 404) { setNotFound(true); return null; } return r.json(); })
      .then((data) => { if (data) setIssue(data); })
      .catch(() => setError('Failed to load issue.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const quickHitsRaw = (fd.get('quickHits') as string) || '';
    const quickHits = quickHitsRaw.trim()
      ? JSON.stringify(quickHitsRaw.split('\n').map((s) => s.trim()).filter(Boolean))
      : null;
    const body: Record<string, unknown> = {
      issueNumber: fd.get('issueNumber') ? parseInt(fd.get('issueNumber') as string, 10) : null,
      status: fd.get('status') || 'draft',
      subject: fd.get('subject'),
      storyTitle: fd.get('storyTitle') || null,
      storyBody: fd.get('storyBody') || null,
      playlist: fd.get('playlist') || null,
      reason: fd.get('reason') || null,
      quickHits,
      sendDate: fd.get('sendDate') ? new Date(fd.get('sendDate') as string).toISOString() : null,
    };
    try {
      const res = await fetch(`/api/newsletter/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to save');
      router.push('/newsletter');
    } catch { setError('Failed to save issue.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this issue? This cannot be undone.')) return;
    try {
      await fetch(`/api/newsletter/${id}`, { method: 'DELETE' });
      router.push('/newsletter');
    } catch { alert('Failed to delete.'); }
  };

  if (loading) return (
    <div className="admin-page-header"><div><h1 className="admin-page-title">Loading…</h1></div></div>
  );
  if (notFound) return (
    <div className="admin-page-header">
      <div><h1 className="admin-page-title">Issue Not Found</h1><p className="admin-page-sub">This issue may have been deleted.</p></div>
      <a href="/newsletter" className="admin-btn admin-btn--ghost">← Back</a>
    </div>
  );

  const sendDateLocal = issue?.sendDate ? new Date(issue.sendDate).toISOString().slice(0, 16) : '';

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Issue</h1>
          <p className="admin-page-sub">#{issue?.issueNumber} — {issue?.subject}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <a href="/newsletter" className="admin-btn admin-btn--ghost">← Back</a>
          <button onClick={handleDelete} className="admin-btn admin-btn--danger">Delete</button>
        </div>
      </div>
      {issue?.status === 'sent' && (
        <div className="admin-card" style={{ marginBottom: 'var(--space-4)', background: 'rgba(74, 124, 89, 0.12)', border: '1px solid rgba(74, 124, 89, 0.3)' }}>
          <p style={{ color: 'var(--success)', fontSize: 'var(--text-sm)', margin: 0 }}>
            This issue has been sent. Edits here will not affect the sent email.
          </p>
        </div>
      )}
      {error && <div className="admin-error-banner">{error}</div>}
      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Issue Number</label>
              <input type="number" name="issueNumber" className="admin-input" defaultValue={issue?.issueNumber ?? ''} min="1" required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Status</label>
              <select name="status" className="admin-select" defaultValue={issue?.status ?? 'draft'} required>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="sent">Sent</option>
              </select>
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label admin-label--required">Subject Line</label>
            <input type="text" name="subject" className="admin-input" defaultValue={issue?.subject ?? ''} required />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Story Title</label>
            <input type="text" name="storyTitle" className="admin-input" defaultValue={issue?.storyTitle ?? ''} placeholder="The main story headline" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Story Body</label>
            <textarea name="storyBody" className="admin-textarea" rows={10} defaultValue={issue?.storyBody ?? ''} placeholder="The main story content. HTML allowed." />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Playlist</label>
            <input type="text" name="playlist" className="admin-input" defaultValue={issue?.playlist ?? ''} placeholder="Playlist name or Spotify URL" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Why You Should Go</label>
            <textarea name="reason" className="admin-textarea" rows={4} defaultValue={issue?.reason ?? ''} placeholder="Specific recommendation or call to action." />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Quick Hits</label>
            <textarea name="quickHits" className="admin-textarea" rows={4} defaultValue={parseQuickHits(issue?.quickHits ?? null)} placeholder="One item per line." />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>One quick hit per line. Stored as JSON array.</span>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Scheduled Send Date</label>
            <input type="datetime-local" name="sendDate" className="admin-input" defaultValue={sendDateLocal} />
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            <a href="/newsletter" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
