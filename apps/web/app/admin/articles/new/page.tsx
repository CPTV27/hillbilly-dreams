'use client';

// apps/web/app/admin/articles/new/page.tsx
// Article editor form — create new article

import { useState, useEffect, useCallback } from 'react';

const CATEGORIES = [
  { value: '', label: 'Select category…' },
  { value: 'city-guide', label: 'City Guide' },
  { value: 'feature', label: 'Feature' },
  { value: 'photo-essay', label: 'Photo Essay' },
  { value: 'interview', label: 'Interview' },
  { value: 'food-drink', label: 'Food & Drink' },
  { value: 'music', label: 'Music' },
];

const CITIES = [
  { value: '', label: 'Select city…' },
  { value: 'memphis', label: 'Memphis, TN' },
  { value: 'clarksdale', label: 'Clarksdale, MS' },
  { value: 'vicksburg', label: 'Vicksburg, MS' },
  { value: 'natchez', label: 'Natchez, MS' },
  { value: 'st-francisville', label: 'St. Francisville, LA' },
  { value: 'baton-rouge', label: 'Baton Rouge, LA' },
  { value: 'new-orleans', label: 'New Orleans, LA' },
  { value: 'lafayette', label: 'Lafayette, LA' },
  { value: 'alexandria', label: 'Alexandria, LA' },
  { value: 'monroe', label: 'Monroe, LA' },
  { value: 'ruston', label: 'Ruston, LA' },
  { value: 'natchitoches', label: 'Natchitoches, LA' },
  { value: 'shreveport', label: 'Shreveport, LA' },
  { value: 'el-dorado', label: 'El Dorado, AR' },
  { value: 'little-rock', label: 'Little Rock, AR' },
  { value: 'fayetteville', label: 'Fayetteville, AR' },
  { value: 'bentonville', label: 'Bentonville, AR' },
  { value: 'branson', label: 'Branson, MO' },
  { value: 'other', label: 'Other' },
];

const STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'In Review' },
  { value: 'published', label: 'Published' },
];

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function NewArticlePage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [author, setAuthor] = useState('Big Muddy Magazine');
  const [status, setStatus] = useState('draft');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [readTime, setReadTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [pickerImages, setPickerImages] = useState<Record<string, Array<{ name: string; url: string }>>>({});
  const [pickerLoading, setPickerLoading] = useState(false);
  const [pickerAlbum, setPickerAlbum] = useState('all');

  const loadPickerImages = useCallback(async () => {
    if (pickerLoading) return;
    setPickerLoading(true);
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        setPickerImages(data.albums ?? {});
      }
    } catch { /* ignore */ }
    finally { setPickerLoading(false); }
  }, [pickerLoading]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugEdited && title) {
      setSlug(slugify(title));
    }
  }, [title, slugEdited]);

  // Hero image path is set manually — no auto-generation
  // (image filenames don't follow a predictable city-based pattern)

  function validate(): boolean {
    if (!title.trim()) {
      setTitleError('Title is required.');
      return false;
    }
    setTitleError('');
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          category,
          city: city || null,
          author,
          status,
          excerpt: excerpt || null,
          body: body || null,
          heroImage: heroImage || null,
          readTime: readTime || null,
          publishedAt: status === 'published' ? new Date().toISOString() : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? `Error ${res.status}: Failed to create article.`);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <>
        <div className="admin-page-header">
          <h1 className="admin-page-title">Article Created</h1>
        </div>
        <div className="admin-card new-article-success">
          <div className="new-article-success__icon">✓</div>
          <h2 className="new-article-success__title">Article saved successfully</h2>
          <p className="new-article-success__slug">/{slug}</p>
          <div className="new-article-success__actions">
            <a href="/articles" className="admin-btn admin-btn--primary">
              Back to Articles
            </a>
            <button
              onClick={() => {
                setSuccess(false);
                setTitle('');
                setSlug('');
                setSlugEdited(false);
                setCategory('');
                setCity('');
                setAuthor('Big Muddy Magazine');
                setStatus('draft');
                setExcerpt('');
                setBody('');
                setHeroImage('');
                setReadTime('');
              }}
              className="admin-btn admin-btn--ghost"
            >
              Create Another
            </button>
          </div>
        </div>
        <style>{`
          .new-article-success {
            text-align: center;
            padding: var(--space-16);
            max-width: 480px;
          }
          .new-article-success__icon {
            font-size: 48px;
            color: var(--success);
            margin-bottom: var(--space-4);
          }
          .new-article-success__title {
            font-family: var(--font-display);
            font-size: var(--text-2xl);
            font-weight: 700;
            color: var(--text);
            margin: 0 0 var(--space-2);
          }
          .new-article-success__slug {
            font-family: var(--font-mono);
            font-size: var(--text-sm);
            color: var(--text-muted);
            margin: 0 0 var(--space-8);
          }
          .new-article-success__actions {
            display: flex;
            gap: var(--space-3);
            justify-content: center;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      {/* ── Page Header ── */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">New Article</h1>
          <p className="admin-page-sub">Create a new article for Big Muddy Magazine</p>
        </div>
        <a href="/articles" className="admin-btn admin-btn--ghost">
          ← Back to Articles
        </a>
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div className="new-article-error" role="alert">
          {error}
        </div>
      )}

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="admin-card new-article-form">

          {/* Title */}
          <div className="admin-form-group">
            <label htmlFor="title" className="admin-label admin-label--required">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError('');
              }}
              className={`admin-input${titleError ? ' admin-input--error' : ''}`}
              placeholder="Memphis After Midnight: The River City That Invented the Sound"
              required
              aria-describedby={titleError ? 'title-error' : 'title-slug'}
            />
            {titleError && (
              <span id="title-error" className="new-article-field-error">{titleError}</span>
            )}
          </div>

          {/* Slug */}
          <div className="admin-form-group">
            <label htmlFor="slug" className="admin-label">
              Slug
            </label>
            <input
              id="title-slug"
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugEdited(true);
              }}
              className="admin-input admin-input--mono"
              placeholder="memphis-after-midnight"
              aria-label="URL slug"
            />
            {slug && (
              <span className="new-article-slug-preview">
                /articles/<strong>{slug}</strong>
              </span>
            )}
          </div>

          {/* Category + City */}
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="category" className="admin-label">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="admin-select"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label htmlFor="city" className="admin-label">
                City
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="admin-select"
              >
                {CITIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Author + Status */}
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="author" className="admin-label">
                Author
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="admin-input"
                placeholder="Big Muddy Magazine"
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="status" className="admin-label">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="admin-select"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div className="admin-form-group">
            <label htmlFor="excerpt" className="admin-label">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="admin-textarea"
              rows={3}
              placeholder="A one or two sentence summary shown in article cards and meta descriptions."
            />
            <span className="new-article-char-count">
              {excerpt.length} characters
            </span>
          </div>

          {/* Body */}
          <div className="admin-form-group">
            <label htmlFor="body" className="admin-label">
              Body
              <span className="admin-label-hint"> (Markdown)</span>
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="admin-textarea admin-textarea--body"
              rows={20}
              placeholder={`# Article Title\n\nOpening paragraph...\n\n## Where to Stay\n\n**Hotel Name** — Description...\n\n## Where to Eat\n\n**Restaurant Name** — Description...`}
            />
          </div>

          {/* Hero Image + Read Time */}
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="heroImage" className="admin-label">
                Hero Image
              </label>
              <div className="hero-image-picker">
                {heroImage && (
                  <div className="hero-image-preview">
                    <img src={heroImage} alt="Hero preview" className="hero-image-preview__img" />
                  </div>
                )}
                <div className="hero-image-picker__row">
                  <input
                    id="heroImage"
                    type="text"
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    className="admin-input"
                    placeholder="Paste URL or pick from gallery"
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost"
                    onClick={() => {
                      setShowImagePicker(true);
                      loadPickerImages();
                    }}
                  >
                    Browse
                  </button>
                </div>
              </div>
            </div>
            <div className="admin-form-group">
              <label htmlFor="readTime" className="admin-label">
                Read Time
              </label>
              <input
                id="readTime"
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="admin-input"
                placeholder="5 min read"
              />
            </div>
          </div>

          {/* ── Image Picker Modal ── */}
          {showImagePicker && (
            <div className="picker-overlay" onClick={() => setShowImagePicker(false)}>
              <div className="picker-modal" onClick={(e) => e.stopPropagation()}>
                <div className="picker-header">
                  <h3 className="picker-title">Select Hero Image</h3>
                  <button
                    className="picker-close"
                    onClick={() => setShowImagePicker(false)}
                  >
                    &times;
                  </button>
                </div>

                {/* Album tabs */}
                <div className="admin-filter-bar" style={{ padding: '0 var(--space-4)' }}>
                  <button
                    className={`admin-filter-btn${pickerAlbum === 'all' ? ' admin-filter-btn--active' : ''}`}
                    onClick={() => setPickerAlbum('all')}
                  >
                    All
                  </button>
                  {Object.keys(pickerImages).sort().map((a) => (
                    <button
                      key={a}
                      className={`admin-filter-btn${pickerAlbum === a ? ' admin-filter-btn--active' : ''}`}
                      onClick={() => setPickerAlbum(a)}
                    >
                      {a}
                    </button>
                  ))}
                </div>

                <div className="picker-grid">
                  {pickerLoading ? (
                    <p className="picker-loading">Loading...</p>
                  ) : (
                    (pickerAlbum === 'all'
                      ? Object.entries(pickerImages).flatMap(([, imgs]) => imgs)
                      : pickerImages[pickerAlbum] ?? []
                    ).map((img) => (
                      <div
                        key={img.url}
                        className={`picker-thumb${heroImage === img.url ? ' picker-thumb--selected' : ''}`}
                        onClick={() => {
                          setHeroImage(img.url);
                          setShowImagePicker(false);
                        }}
                        style={{ backgroundImage: `url(${img.url})` }}
                        title={img.name}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="admin-form-actions">
            <button
              type="submit"
              disabled={submitting}
              className="admin-btn admin-btn--primary"
            >
              {submitting ? 'Saving…' : 'Save Article'}
            </button>
            <a href="/articles" className="admin-btn admin-btn--ghost">
              Cancel
            </a>
          </div>

        </div>
      </form>

      <style>{`
        .new-article-form {
          max-width: 800px;
        }
        .new-article-error {
          background: var(--error-muted);
          border: 1px solid var(--error);
          border-radius: var(--radius-sm);
          padding: var(--space-3) var(--space-4);
          font-size: var(--text-sm);
          color: var(--error);
          margin-bottom: var(--space-5);
        }
        .new-article-field-error {
          font-size: var(--text-xs);
          color: var(--error);
          margin-top: var(--space-1);
        }
        .new-article-slug-preview {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          margin-top: var(--space-1);
          display: block;
        }
        .new-article-slug-preview strong {
          color: var(--accent);
        }
        .new-article-char-count {
          font-size: var(--text-xs);
          color: var(--text-disabled);
          margin-top: var(--space-1);
          display: block;
        }
        .admin-input--mono {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
        }
        .admin-input--error {
          border-color: var(--error);
        }
        .admin-input--error:focus {
          border-color: var(--error);
        }
        .admin-textarea--body {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          min-height: 400px;
          line-height: 1.6;
        }
        .admin-label-hint {
          font-weight: 400;
          color: var(--text-disabled);
          font-size: var(--text-xs);
        }

        /* ── Hero Image Picker ── */
        .hero-image-picker__row {
          display: flex;
          gap: var(--space-2);
        }
        .hero-image-preview {
          margin-bottom: var(--space-3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          max-height: 160px;
        }
        .hero-image-preview__img {
          width: 100%;
          max-height: 160px;
          object-fit: cover;
          display: block;
        }

        /* ── Picker Overlay ── */
        .picker-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-6);
        }
        .picker-modal {
          background: var(--surface);
          border-radius: var(--radius-lg);
          max-width: 800px;
          width: 100%;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .picker-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4) var(--space-5);
          border-bottom: 1px solid var(--border);
        }
        .picker-title {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }
        .picker-close {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }
        .picker-close:hover { color: var(--text); }
        .picker-grid {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-4);
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: var(--space-3);
        }
        .picker-loading {
          grid-column: 1 / -1;
          text-align: center;
          color: var(--text-disabled);
          padding: var(--space-10);
        }
        .picker-thumb {
          aspect-ratio: 4/3;
          background-size: cover;
          background-position: center;
          background-color: var(--surface-2);
          border-radius: var(--radius-sm);
          border: 2px solid transparent;
          cursor: pointer;
          transition: border-color var(--duration-fast) var(--ease-default),
                      transform var(--duration-fast) var(--ease-default);
        }
        .picker-thumb:hover {
          border-color: var(--accent);
          transform: scale(1.03);
        }
        .picker-thumb--selected {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-muted);
        }
      `}</style>
    </>
  );
}
