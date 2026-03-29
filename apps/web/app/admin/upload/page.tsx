'use client';

import { useState, useRef, useCallback } from 'react';

/* eslint-disable @next/next/no-img-element */

interface UploadedFile {
  name: string;
  url: string;
  type: string;
  size: string;
  status: 'uploading' | 'done' | 'error';
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [textNote, setTextNote] = useState('');
  const [textSaved, setTextSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const uploadFile = useCallback(async (file: File) => {
    const entry: UploadedFile = {
      name: file.name,
      url: '',
      type: file.type,
      size: formatSize(file.size),
      status: 'uploading',
    };
    setFiles(prev => [...prev, entry]);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('album', 'uploads');

      const res = await fetch('/api/media/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok && data.url) {
        setFiles(prev => prev.map(f => f.name === file.name ? { ...f, url: data.url, status: 'done' } : f));
      } else {
        setFiles(prev => prev.map(f => f.name === file.name ? { ...f, status: 'error' } : f));
      }
    } catch {
      setFiles(prev => prev.map(f => f.name === file.name ? { ...f, status: 'error' } : f));
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    dropped.forEach(uploadFile);
  }, [uploadFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    selected.forEach(uploadFile);
  };

  const saveNote = async () => {
    if (!textNote.trim()) return;
    try {
      await fetch('/api/context/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: 'notes',
          content: textNote,
          metadata: { type: 'note', source: 'upload-page', createdAt: new Date().toISOString() },
        }),
      });
      setTextSaved(true);
      setTimeout(() => { setTextSaved(false); setTextNote(''); }, 2000);
    } catch {
      // Silently fail — note can be re-submitted
    }
  };

  return (
    <>
      <div className="upload-page">
        <div className="upload-header">
          <h1 className="upload-title">Upload Content</h1>
          <p className="upload-sub">Drop files, paste text, or connect Google Drive. Everything gets indexed in the Media Vault.</p>
        </div>

        {/* Drop Zone */}
        <div
          className={`upload-drop ${dragging ? 'upload-drop--active' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <div className="upload-drop__icon">{dragging ? 'Release' : 'Drop files here'}</div>
          <p className="upload-drop__text">
            Photos, videos, audio, documents — or click to browse
          </p>
          <p className="upload-drop__hint">
            Images auto-convert to WebP. EXIF data extracted. Geo-matched to businesses.
          </p>
        </div>

        {/* Upload Progress */}
        {files.length > 0 && (
          <div className="upload-list">
            <h2 className="upload-section-label">Uploads</h2>
            {files.map((f, i) => (
              <div key={`${f.name}-${i}`} className={`upload-item upload-item--${f.status}`}>
                <div className="upload-item__info">
                  <span className="upload-item__name">{f.name}</span>
                  <span className="upload-item__size">{f.size}</span>
                </div>
                <span className="upload-item__status">
                  {f.status === 'uploading' && 'Uploading...'}
                  {f.status === 'done' && 'Indexed'}
                  {f.status === 'error' && 'Failed'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Text Note */}
        <div className="upload-text">
          <h2 className="upload-section-label">Quick Note</h2>
          <textarea
            className="upload-textarea"
            placeholder="Paste text, article ideas, notes — anything that should be in the system..."
            value={textNote}
            onChange={(e) => setTextNote(e.target.value)}
            rows={4}
          />
          <button
            className="upload-btn"
            onClick={saveNote}
            disabled={!textNote.trim()}
          >
            {textSaved ? 'Saved' : 'Save Note'}
          </button>
        </div>

        {/* Quick Links */}
        <div className="upload-links">
          <h2 className="upload-section-label">Tools</h2>
          <div className="upload-links__grid">
            <a href="/admin/media" className="upload-link">
              <span className="upload-link__icon">I</span>
              <span className="upload-link__text">Media Vault</span>
            </a>
            <a href="/admin/studio" className="upload-link">
              <span className="upload-link__icon">M</span>
              <span className="upload-link__text">Content Studio</span>
            </a>
            <a href="/ops/chat" className="upload-link">
              <span className="upload-link__icon">D</span>
              <span className="upload-link__text">Delta Dawn</span>
            </a>
            <a href="/admin/dashboard" className="upload-link">
              <span className="upload-link__icon">H</span>
              <span className="upload-link__text">Mission Control</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .upload-page {
          max-width: 800px;
          margin: 0 auto;
          padding: var(--space-6);
        }
        .upload-header { margin-bottom: var(--space-8); }
        .upload-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800;
          color: var(--text, #e8e0d4);
          margin: 0 0 var(--space-2);
          letter-spacing: -0.02em;
        }
        .upload-sub {
          font-size: var(--text-sm, 0.875rem);
          color: var(--text-muted, #8a8074);
        }

        .upload-drop {
          border: 2px dashed #2a2520;
          border-radius: 16px;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          background: #1a1816;
          margin-bottom: var(--space-8);
        }
        .upload-drop:hover, .upload-drop--active {
          border-color: #c8943e;
          background: rgba(200, 148, 62, 0.04);
        }
        .upload-drop__icon {
          font-size: 1.25rem;
          font-weight: 800;
          color: #c8943e;
          margin-bottom: var(--space-3);
        }
        .upload-drop__text {
          font-size: var(--text-sm, 0.875rem);
          color: #8a8074;
          margin: 0 0 var(--space-2);
        }
        .upload-drop__hint {
          font-size: 0.7rem;
          color: #5a5550;
          margin: 0;
        }

        .upload-section-label {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #6a6560;
          margin: 0 0 var(--space-3);
        }

        .upload-list { margin-bottom: var(--space-8); }
        .upload-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-3) var(--space-4);
          background: #1a1816;
          border-radius: 8px;
          margin-bottom: var(--space-2);
          border-left: 3px solid #2a2520;
        }
        .upload-item--done { border-left-color: #22c55e; }
        .upload-item--error { border-left-color: #ef4444; }
        .upload-item--uploading { border-left-color: #c8943e; }
        .upload-item__info { display: flex; flex-direction: column; gap: 2px; }
        .upload-item__name { font-size: var(--text-sm, 0.875rem); font-weight: 600; color: #e8e0d4; }
        .upload-item__size { font-size: 0.7rem; color: #5a5550; }
        .upload-item__status {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .upload-item--done .upload-item__status { color: #22c55e; }
        .upload-item--error .upload-item__status { color: #ef4444; }
        .upload-item--uploading .upload-item__status { color: #c8943e; }

        .upload-text { margin-bottom: var(--space-8); }
        .upload-textarea {
          width: 100%;
          padding: var(--space-4);
          background: #1a1816;
          border: 1px solid #2a2520;
          border-radius: 10px;
          color: #e8e0d4;
          font-size: var(--text-sm, 0.875rem);
          font-family: inherit;
          resize: vertical;
          margin-bottom: var(--space-3);
          box-sizing: border-box;
        }
        .upload-textarea:focus {
          outline: none;
          border-color: #c8943e;
        }
        .upload-btn {
          padding: 10px 20px;
          background: #c8943e;
          color: #0f0f0d;
          border: none;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
        }
        .upload-btn:disabled {
          opacity: 0.4;
          cursor: default;
        }

        .upload-links__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: var(--space-3);
        }
        .upload-link {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          background: #1a1816;
          border: 1px solid #2a2520;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.15s;
        }
        .upload-link:hover {
          border-color: #c8943e40;
          transform: translateY(-1px);
        }
        .upload-link__icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(200, 148, 62, 0.1);
          border: 1px solid rgba(200, 148, 62, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 800;
          color: #c8943e;
        }
        .upload-link__text {
          font-size: var(--text-sm, 0.875rem);
          font-weight: 600;
          color: #e8e0d4;
        }
      `}</style>
    </>
  );
}
