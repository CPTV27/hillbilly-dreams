// apps/web/app/(admin)/articles/[id]/edit/page.tsx
// Edit article form

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Edit Article' };

const CATEGORIES = ['city-guide', 'feature', 'photo-essay', 'interview', 'food-drink', 'music'];
const CITIES = ['memphis', 'clarksdale', 'vicksburg', 'natchez', 'new-orleans', 'other'];

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  // TODO: const article = await prisma.article.findUnique({ where: { id: parseInt(params.id) } });
  // if (!article) notFound();

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Article</h1>
          <p className="admin-page-sub">Article ID: {params.id}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <a href="/articles" className="admin-btn admin-btn--ghost">← Back</a>
          <button className="admin-btn admin-btn--danger">Delete</button>
        </div>
      </div>

      <div className="admin-card">
        <form>
          <div className="admin-form-group">
            <label className="admin-label admin-label--required">Title</label>
            <input type="text" name="title" className="admin-input" placeholder="Article title" required />
          </div>

          <div className="admin-form-group">
            <label className="admin-label admin-label--required">Slug</label>
            <input type="text" name="slug" className="admin-input" placeholder="article-slug" required />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Category</label>
              <select name="category" className="admin-select" required>
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
              <input type="text" name="author" className="admin-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Read Time</label>
              <input type="text" name="readTime" className="admin-input" placeholder="6 min read" />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Excerpt</label>
            <textarea name="excerpt" className="admin-textarea" rows={3} />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Body (HTML)</label>
            <textarea name="body" className="admin-textarea" rows={12}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }} />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Hero Image URL</label>
            <input type="url" name="heroImage" className="admin-input" />
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
            <button type="submit" className="admin-btn admin-btn--primary">Save Changes</button>
            <a href="/articles" className="admin-btn admin-btn--ghost">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
