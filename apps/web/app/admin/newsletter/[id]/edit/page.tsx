// apps/web/app/(admin)/newsletter/[id]/edit/page.tsx
// Edit newsletter issue form — includes Publish to Beehiiv action

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Edit Newsletter Issue' };

export default async function EditNewsletterPage({ params }: { params: { id: string } }) {
  // TODO: const issue = await prisma.newsletterIssue.findUnique({ where: { id: parseInt(params.id) } });
  // if (!issue) notFound();

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Issue</h1>
          <p className="admin-page-sub">Issue ID: {params.id}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <a href="/newsletter" className="admin-btn admin-btn--ghost">← Back</a>
          <button
            className="admin-btn admin-btn--accent"
            title="Publish to Beehiiv — requires BEEHIIV_API_KEY (Phase 3)"
          >
            Publish to Beehiiv
          </button>
          <button className="admin-btn admin-btn--danger">Delete</button>
        </div>
      </div>

      {/* Publish status notice — shown when issue.status === 'sent' */}
      {/* TODO: if (issue.status === 'sent') show this banner */}
      <div
        className="admin-card"
        style={{
          marginBottom: 'var(--space-4)',
          background: 'rgba(74, 124, 89, 0.12)',
          border: '1px solid rgba(74, 124, 89, 0.3)',
          display: 'none', // TODO: remove when connected
        }}
      >
        <p style={{ color: 'var(--success)', fontSize: 'var(--text-sm)', margin: 0 }}>
          ✓ This issue has been sent. Edits here will not affect the sent email.
        </p>
      </div>

      <div className="admin-card">
        <form>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Issue Number</label>
              <input
                type="number"
                name="issueNumber"
                className="admin-input"
                placeholder="1"
                min="1"
                required
              />
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
            <input
              type="text"
              name="subject"
              className="admin-input"
              placeholder="Email subject line"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Story Title</label>
            <input
              type="text"
              name="storyTitle"
              className="admin-input"
              placeholder="The main story headline"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Story Body</label>
            <textarea
              name="storyBody"
              className="admin-textarea"
              rows={10}
              placeholder="The main story content for this issue. HTML allowed."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Playlist (Name or Spotify URL)</label>
            <input
              type="text"
              name="playlist"
              className="admin-input"
              placeholder="Playlist name or Spotify URL"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Why You Should Go</label>
            <textarea
              name="reason"
              className="admin-textarea"
              rows={4}
              placeholder="The 'Why You Should Go' section — a specific recommendation or call to action."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Quick Hits</label>
            <textarea
              name="quickHits"
              className="admin-textarea"
              rows={4}
              placeholder="One item per line. Will be rendered as a bullet list."
            />
            <span
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-disabled)',
                marginTop: 'var(--space-1)',
                display: 'block',
              }}
            >
              One quick hit per line. Stored as JSON array.
            </span>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Scheduled Send Date</label>
            <input type="datetime-local" name="sendDate" className="admin-input" />
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary">Save Changes</button>
            <a href="/newsletter" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
