// apps/web/app/(admin)/articles/new/page.tsx
// Create new article form

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'New Article' };

const CATEGORIES = ['city-guide', 'feature', 'photo-essay', 'interview', 'food-drink', 'music'];
const CITIES = ['memphis', 'clarksdale', 'vicksburg', 'natchez', 'new-orleans', 'other'];

export default function NewArticlePage() {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">New Article</h1>
          <p className="admin-page-sub">Create a magazine article</p>
        </div>
        <a href="/articles" className="admin-btn admin-btn--ghost">← Back to Articles</a>
      </div>

      <div className="admin-card">
        {/* NOTE: This form uses native HTML. In Phase 2, wire up with a form library. */}
        {/* POST to /api/articles on submit */}
        <form>
          <div className="admin-form-row">
            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="admin-label admin-label--required">Title</label>
              <input
                type="text"
                name="title"
                className="admin-input"
                placeholder="Article title"
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label admin-label--required">Slug</label>
            <input
              type="text"
              name="slug"
              className="admin-input"
              placeholder="article-slug-here"
              required
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Category</label>
              <select name="category" className="admin-select" required>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.replace('-', ' ')}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">City</label>
              <select name="city" className="admin-select">
                <option value="">None</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Author</label>
              <input
                type="text"
                name="author"
                className="admin-input"
                placeholder="Author name"
                defaultValue="Big Muddy Magazine"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Read Time</label>
              <input
                type="text"
                name="readTime"
                className="admin-input"
                placeholder="e.g. 6 min read"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Excerpt</label>
            <textarea
              name="excerpt"
              className="admin-textarea"
              placeholder="Short excerpt for article cards and SEO description"
              rows={3}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Body (HTML)</label>
            <textarea
              name="body"
              className="admin-textarea"
              placeholder="<p>Article body HTML. Tiptap rich text editor coming in Phase 4.</p>"
              rows={12}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Hero Image URL</label>
            <input
              type="url"
              name="heroImage"
              className="admin-input"
              placeholder="https://cdn.bigmuddytouring.com/..."
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Status</label>
              <select name="status" className="admin-select" required>
                <option value="draft">Draft</option>
                <option value="review">Review</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Publish Date</label>
              <input type="datetime-local" name="publishedAt" className="admin-input" />
            </div>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary">
              Create Article
            </button>
            <a href="/articles" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
