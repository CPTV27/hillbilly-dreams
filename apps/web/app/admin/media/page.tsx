'use client';

// apps/web/app/admin/media/page.tsx
// Admin media gallery — browse, upload, and delete images from GCS

import { useState, useEffect, useRef, useCallback } from 'react';

interface ImageItem {
  name: string;
  url: string;
  size: number;
  updated: string;
}

interface MediaResponse {
  baseUrl: string;
  albums: Record<string, ImageItem[]>;
  totalImages: number;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function MediaGalleryPage() {
  const [media, setMedia] = useState<MediaResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeAlbum, setActiveAlbum] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [uploadAlbum, setUploadAlbum] = useState('uploads');
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [preview, setPreview] = useState<ImageItem | null>(null);
  const [copied, setCopied] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // Generate state
  const [genPrompt, setGenPrompt] = useState('');
  const [genAlbum, setGenAlbum] = useState('generated');
  const [genAspect, setGenAspect] = useState('16:9');
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState('');
  const [genSuccess, setGenSuccess] = useState('');

  // Enhance state
  const [enhPreset, setEnhPreset] = useState('auto');
  const [enhAI, setEnhAI] = useState(false);
  const [enhAlbum, setEnhAlbum] = useState('enhanced');
  const [enhancing, setEnhancing] = useState(false);
  const [enhError, setEnhError] = useState('');
  const [enhSuccess, setEnhSuccess] = useState('');
  const enhFileRef = useRef<HTMLInputElement>(null);

  const fetchMedia = useCallback(async () => {
    try {
      const res = await fetch('/api/media');
      if (!res.ok) throw new Error(`${res.status}`);
      const data: MediaResponse = await res.json();
      setMedia(data);
      setError('');
    } catch (err) {
      setError('Failed to load media library. Is the GCS bucket configured?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');
    setUploadSuccess('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('album', uploadAlbum);

    try {
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setUploadError(data.error ?? `Upload failed (${res.status})`);
      } else {
        const data = await res.json();
        setUploadSuccess(`Uploaded: ${data.path}`);
        await fetchMedia(); // refresh gallery
      }
    } catch {
      setUploadError('Network error during upload.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function handleDelete(albumName: string, fileName: string) {
    const path = `${albumName}/${fileName}`;
    if (!confirm(`Delete ${path}? This cannot be undone.`)) return;

    setDeleting(path);
    try {
      const res = await fetch(`/api/media/${path}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? 'Delete failed');
      } else {
        await fetchMedia();
        if (preview?.name === fileName) setPreview(null);
      }
    } catch {
      alert('Network error during delete.');
    } finally {
      setDeleting(null);
    }
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!genPrompt.trim()) return;

    setGenerating(true);
    setGenError('');
    setGenSuccess('');

    try {
      const res = await fetch('/api/media/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: genPrompt.trim(),
          album: genAlbum,
          aspectRatio: genAspect,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setGenError(data.error ?? `Generation failed (${res.status})`);
      } else {
        const data = await res.json();
        setGenSuccess(`Generated: ${data.path}`);
        setGenPrompt('');
        await fetchMedia();
      }
    } catch {
      setGenError('Network error during generation.');
    } finally {
      setGenerating(false);
    }
  }

  async function handleEnhance(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setEnhancing(true);
    setEnhError('');
    setEnhSuccess('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('preset', enhPreset);
    formData.append('album', enhAlbum);
    if (enhAI) formData.append('ai', 'true');

    try {
      const res = await fetch('/api/media/enhance', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setEnhError(data.error ?? `Enhancement failed (${res.status})`);
      } else {
        const data = await res.json();
        setEnhSuccess(`Enhanced: ${data.path}${data.aiEnhanced ? ' (AI)' : ''}`);
        await fetchMedia();
      }
    } catch {
      setEnhError('Network error during enhancement.');
    } finally {
      setEnhancing(false);
      if (enhFileRef.current) enhFileRef.current.value = '';
    }
  }

  async function handleEnhanceExisting(image: ImageItem, album: string) {
    setEnhancing(true);
    setEnhError('');
    setEnhSuccess('');

    try {
      // Fetch the existing image
      const imgRes = await fetch(image.url);
      if (!imgRes.ok) throw new Error('Failed to fetch image');
      const blob = await imgRes.blob();
      const file = new File([blob], image.name, { type: blob.type || 'image/webp' });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('preset', enhPreset);
      formData.append('album', enhAlbum);
      if (enhAI) formData.append('ai', 'true');

      const res = await fetch('/api/media/enhance', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setEnhError(data.error ?? `Enhancement failed (${res.status})`);
      } else {
        const data = await res.json();
        setEnhSuccess(`Enhanced: ${data.path}${data.aiEnhanced ? ' (AI)' : ''}`);
        await fetchMedia();
      }
    } catch {
      setEnhError('Network error during enhancement.');
    } finally {
      setEnhancing(false);
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(''), 2000);
  }

  const albums = media?.albums ?? {};
  const albumNames = Object.keys(albums).sort();

  const visibleImages: Array<{ album: string; image: ImageItem }> =
    activeAlbum === 'all'
      ? albumNames.flatMap((a) => albums[a].map((img) => ({ album: a, image: img })))
      : (albums[activeAlbum] ?? []).map((img) => ({ album: activeAlbum, image: img }));

  return (
    <>
      {/* ── Page Header ── */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Media Library</h1>
          <p className="admin-page-sub">
            {media ? `${media.totalImages} images across ${albumNames.length} albums` : 'Loading...'}
          </p>
        </div>
      </div>

      {/* ── Upload Bar ── */}
      <div className="media-upload-bar admin-card">
        <div className="media-upload-row">
          <div className="admin-form-group" style={{ marginBottom: 0, flex: 1 }}>
            <label htmlFor="uploadAlbum" className="admin-label">Album</label>
            <select
              id="uploadAlbum"
              value={uploadAlbum}
              onChange={(e) => setUploadAlbum(e.target.value)}
              className="admin-select"
            >
              <option value="uploads">uploads</option>
              <option value="generated">generated</option>
              <option value="heroes">heroes</option>
              <option value="fleet">fleet</option>
              <option value="magazine">magazine</option>
              <option value="command">command</option>
              <option value="real">real</option>
              <option value="textures">textures</option>
            </select>
          </div>
          <div className="media-upload-btn-wrap">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              onChange={handleUpload}
              className="media-upload-input"
              id="fileUpload"
              disabled={uploading}
            />
            <label htmlFor="fileUpload" className="admin-btn admin-btn--primary media-upload-label">
              {uploading ? 'Uploading...' : 'Upload Image'}
            </label>
          </div>
        </div>
        {uploadError && <div className="media-upload-msg media-upload-msg--error">{uploadError}</div>}
        {uploadSuccess && <div className="media-upload-msg media-upload-msg--success">{uploadSuccess}</div>}
      </div>

      {/* ── Generate with AI ── */}
      <div className="media-generate admin-card">
        <form onSubmit={handleGenerate} className="media-generate__form">
          <div className="media-generate__row">
            <div className="admin-form-group" style={{ marginBottom: 0, flex: 2 }}>
              <label htmlFor="genPrompt" className="admin-label">Generate with AI</label>
              <textarea
                id="genPrompt"
                value={genPrompt}
                onChange={(e) => setGenPrompt(e.target.value)}
                placeholder="Describe the image you want to create..."
                className="admin-textarea"
                rows={2}
                maxLength={1000}
                disabled={generating}
              />
            </div>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="genAlbum" className="admin-label">Album</label>
              <select
                id="genAlbum"
                value={genAlbum}
                onChange={(e) => setGenAlbum(e.target.value)}
                className="admin-select"
                disabled={generating}
              >
                <option value="generated">generated</option>
                <option value="heroes">heroes</option>
                <option value="magazine">magazine</option>
                <option value="textures">textures</option>
                <option value="uploads">uploads</option>
              </select>
            </div>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="genAspect" className="admin-label">Ratio</label>
              <select
                id="genAspect"
                value={genAspect}
                onChange={(e) => setGenAspect(e.target.value)}
                className="admin-select"
                disabled={generating}
              >
                <option value="16:9">16:9</option>
                <option value="1:1">1:1</option>
                <option value="4:3">4:3</option>
                <option value="3:4">3:4</option>
                <option value="9:16">9:16</option>
              </select>
            </div>
            <div className="media-generate__btn-wrap">
              <button
                type="submit"
                className="admin-btn admin-btn--primary"
                disabled={generating || !genPrompt.trim()}
              >
                {generating ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        </form>
        {genError && <div className="media-upload-msg media-upload-msg--error">{genError}</div>}
        {genSuccess && <div className="media-upload-msg media-upload-msg--success">{genSuccess}</div>}
      </div>

      {/* ── Enhance Photo ── */}
      <div className="media-enhance admin-card">
        <div className="media-enhance__header">
          <h3 className="media-enhance__title">Enhance Photo</h3>
          <p className="media-enhance__sub">Upload a photo or enhance one from the gallery below</p>
        </div>
        <div className="media-enhance__row">
          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="enhPreset" className="admin-label">Style Preset</label>
            <select
              id="enhPreset"
              value={enhPreset}
              onChange={(e) => setEnhPreset(e.target.value)}
              className="admin-select"
              disabled={enhancing}
            >
              <option value="auto">Auto — normalize, sharpen, subtle warmth</option>
              <option value="editorial">Editorial — rich contrast, warm shadows</option>
              <option value="moody">Moody — lifted blacks, cool shadows</option>
              <option value="warm">Warm — golden hour, amber tones</option>
              <option value="crisp">Crisp — high clarity, neutral color</option>
            </select>
          </div>
          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="enhAlbum" className="admin-label">Save To</label>
            <select
              id="enhAlbum"
              value={enhAlbum}
              onChange={(e) => setEnhAlbum(e.target.value)}
              className="admin-select"
              disabled={enhancing}
            >
              <option value="enhanced">enhanced</option>
              <option value="heroes">heroes</option>
              <option value="magazine">magazine</option>
              <option value="uploads">uploads</option>
            </select>
          </div>
          <div className="admin-form-group media-enhance__ai-toggle" style={{ marginBottom: 0 }}>
            <label className="admin-label">
              <input
                type="checkbox"
                checked={enhAI}
                onChange={(e) => setEnhAI(e.target.checked)}
                disabled={enhancing}
                style={{ marginRight: '0.5rem' }}
              />
              AI Enhance (Imagen)
            </label>
          </div>
          <div className="media-upload-btn-wrap">
            <input
              ref={enhFileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleEnhance}
              className="media-upload-input"
              id="enhFileUpload"
              disabled={enhancing}
            />
            <label htmlFor="enhFileUpload" className="admin-btn admin-btn--primary media-upload-label">
              {enhancing ? 'Enhancing...' : 'Upload & Enhance'}
            </label>
          </div>
        </div>
        {enhError && <div className="media-upload-msg media-upload-msg--error">{enhError}</div>}
        {enhSuccess && <div className="media-upload-msg media-upload-msg--success">{enhSuccess}</div>}
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="media-error" role="alert">{error}</div>
      )}

      {/* ── Album Tabs ── */}
      {!loading && !error && (
        <div className="admin-filter-bar">
          <button
            className={`admin-filter-btn${activeAlbum === 'all' ? ' admin-filter-btn--active' : ''}`}
            onClick={() => setActiveAlbum('all')}
          >
            All ({media?.totalImages ?? 0})
          </button>
          {albumNames.map((name) => (
            <button
              key={name}
              className={`admin-filter-btn${activeAlbum === name ? ' admin-filter-btn--active' : ''}`}
              onClick={() => setActiveAlbum(name)}
            >
              {name} ({albums[name].length})
            </button>
          ))}
        </div>
      )}

      {/* ── Gallery Grid ── */}
      {loading ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">...</div>
          <p className="admin-empty__text">Loading media library...</p>
        </div>
      ) : visibleImages.length === 0 && !error ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">&#9633;</div>
          <p className="admin-empty__text">No images found. Upload your first image above.</p>
        </div>
      ) : (
        <div className="media-grid">
          {visibleImages.map(({ album, image }) => {
            const path = `${album}/${image.name}`;
            const isDeleting = deleting === path;
            return (
              <div
                key={path}
                className={`media-card${preview?.url === image.url ? ' media-card--selected' : ''}`}
              >
                <div
                  className="media-card__thumb"
                  onClick={() => setPreview(image)}
                  style={{ backgroundImage: `url(${image.url})` }}
                />
                <div className="media-card__info">
                  <span className="media-card__name" title={image.name}>{image.name}</span>
                  <span className="media-card__meta">{formatBytes(image.size)}</span>
                </div>
                <div className="media-card__actions">
                  <button
                    className="admin-btn admin-btn--ghost media-card__btn"
                    onClick={() => handleEnhanceExisting(image, album)}
                    disabled={enhancing}
                    title="Enhance this image"
                  >
                    {enhancing ? '...' : 'Enhance'}
                  </button>
                  <button
                    className="admin-btn admin-btn--ghost media-card__btn"
                    onClick={() => copyUrl(image.url)}
                    title="Copy URL"
                  >
                    {copied === image.url ? 'Copied!' : 'Copy URL'}
                  </button>
                  <button
                    className="admin-btn admin-btn--danger media-card__btn"
                    onClick={() => handleDelete(album, image.name)}
                    disabled={isDeleting}
                    title="Delete image"
                  >
                    {isDeleting ? '...' : 'Delete'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Image Preview Modal ── */}
      {preview && (
        <div className="media-preview-overlay" onClick={() => setPreview(null)}>
          <div className="media-preview" onClick={(e) => e.stopPropagation()}>
            <button className="media-preview__close" onClick={() => setPreview(null)}>
              &times;
            </button>
            <img
              src={preview.url}
              alt={preview.name}
              className="media-preview__img"
            />
            <div className="media-preview__info">
              <span className="media-preview__name">{preview.name}</span>
              <span className="media-preview__size">{formatBytes(preview.size)}</span>
            </div>
            <div className="media-preview__url-row">
              <code className="media-preview__url">{preview.url}</code>
              <button
                className="admin-btn admin-btn--primary"
                onClick={() => copyUrl(preview.url)}
              >
                {copied === preview.url ? 'Copied!' : 'Copy URL'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ── Upload Bar ── */
        .media-upload-bar {
          margin-bottom: var(--space-6);
        }
        .media-upload-row {
          display: flex;
          align-items: flex-end;
          gap: var(--space-4);
        }
        .media-upload-input {
          display: none;
        }
        .media-upload-label {
          cursor: pointer;
          white-space: nowrap;
        }
        .media-upload-btn-wrap {
          flex-shrink: 0;
        }
        .media-upload-msg {
          font-size: var(--text-sm);
          margin-top: var(--space-3);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-sm);
        }
        .media-upload-msg--error {
          background: var(--error-muted);
          color: var(--error);
        }
        .media-upload-msg--success {
          background: var(--success-muted);
          color: var(--success);
        }

        /* ── Generate Panel ── */
        .media-generate {
          margin-bottom: var(--space-6);
        }
        .media-generate__form {
          display: flex;
          flex-direction: column;
        }
        .media-generate__row {
          display: flex;
          align-items: flex-end;
          gap: var(--space-4);
        }
        .media-generate__btn-wrap {
          flex-shrink: 0;
        }

        /* ── Enhance Panel ── */
        .media-enhance {
          margin-bottom: var(--space-6);
        }
        .media-enhance__header {
          margin-bottom: var(--space-4);
        }
        .media-enhance__title {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-1) 0;
        }
        .media-enhance__sub {
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin: 0;
        }
        .media-enhance__row {
          display: flex;
          align-items: flex-end;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
        .media-enhance__ai-toggle {
          display: flex;
          align-items: center;
          padding-bottom: var(--space-2);
        }

        /* ── Error ── */
        .media-error {
          background: var(--error-muted);
          border: 1px solid var(--error);
          border-radius: var(--radius-sm);
          padding: var(--space-3) var(--space-4);
          font-size: var(--text-sm);
          color: var(--error);
          margin-bottom: var(--space-5);
        }

        /* ── Gallery Grid ── */
        .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: var(--space-4);
        }
        .media-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color var(--duration-fast) var(--ease-default);
        }
        .media-card:hover {
          border-color: var(--border-strong);
        }
        .media-card--selected {
          border-color: var(--accent);
        }
        .media-card__thumb {
          width: 100%;
          aspect-ratio: 4/3;
          background-size: cover;
          background-position: center;
          background-color: var(--surface-2);
          cursor: pointer;
          transition: opacity var(--duration-fast) var(--ease-default);
        }
        .media-card__thumb:hover {
          opacity: 0.85;
        }
        .media-card__info {
          padding: var(--space-3);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .media-card__name {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .media-card__meta {
          font-size: var(--text-xs);
          color: var(--text-disabled);
        }
        .media-card__actions {
          display: flex;
          gap: var(--space-2);
          padding: 0 var(--space-3) var(--space-3);
        }
        .media-card__btn {
          font-size: var(--text-xs) !important;
          padding: var(--space-1) var(--space-2) !important;
          flex: 1;
        }

        /* ── Preview Overlay ── */
        .media-preview-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-8);
        }
        .media-preview {
          background: var(--surface);
          border-radius: var(--radius-lg);
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: var(--space-6);
          position: relative;
        }
        .media-preview__close {
          position: absolute;
          top: var(--space-3);
          right: var(--space-3);
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .media-preview__close:hover {
          color: var(--text);
          border-color: var(--border-strong);
        }
        .media-preview__img {
          width: 100%;
          max-height: 500px;
          object-fit: contain;
          border-radius: var(--radius-sm);
          background: var(--bg);
          margin-bottom: var(--space-4);
        }
        .media-preview__info {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--space-3);
        }
        .media-preview__name {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text);
        }
        .media-preview__size {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
        .media-preview__url-row {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .media-preview__url {
          flex: 1;
          font-size: var(--text-xs);
          color: var(--text-disabled);
          background: var(--bg);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .media-upload-row,
          .media-generate__row {
            flex-direction: column;
            align-items: stretch;
          }
          .media-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
        }
      `}</style>
    </>
  );
}
