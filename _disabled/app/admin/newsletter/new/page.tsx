'use client';

// apps/web/app/(admin)/newsletter/new/page.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewNewsletterPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create issue');
      }
      router.push('/newsletter');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">New Issue</h1>
          <p className="admin-page-sub">Draft a Big Muddy Dispatch issue</p>
        </div>
        <a href="/newsletter" className="admin-btn admin-btn--ghost">← Back</a>
      </div>
      {error && <div className="admin-error-banner">{error}</div>}
      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Issue Number</label>
              <input type="number" name="issueNumber" className="admin-input" placeholder="1" min="1" required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Status</label>
              <select name="status" className="admin-select" required>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="sent">Sent</option>
              </select>
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label admin-label--required">Subject Line</label>
            <input type="text" name="subject" className="admin-input" placeholder="Email subject line" required />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Story Title</label>
            <input type="text" name="storyTitle" className="admin-input" placeholder="The main story headline" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Story Body</label>
            <textarea name="storyBody" className="admin-textarea" rows={8} placeholder="The main story content for this issue. HTML allowed." />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Playlist (Name or Spotify URL)</label>
            <input type="text" name="playlist" className="admin-input" placeholder="Playlist name or Spotify URL" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Why You Should Go</label>
            <textarea name="reason" className="admin-textarea" rows={4} placeholder="The 'Why You Should Go' section — a specific recommendation or call to action." />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Quick Hits</label>
            <textarea name="quickHits" className="admin-textarea" rows={4} placeholder="One item per line. Will be rendered as a bullet list." />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>One quick hit per line. Stored as JSON array.</span>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Scheduled Send Date</label>
            <input type="datetime-local" name="sendDate" className="admin-input" />
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Issue'}
            </button>
            <a href="/newsletter" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
