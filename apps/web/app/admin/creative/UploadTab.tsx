'use client';

import { useState, useRef, useCallback } from 'react';

interface UploadedFile {
  name: string;
  url: string;
  size: string;
  status: 'uploading' | 'done' | 'error';
}

export function UploadTab() {
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
    const entry: UploadedFile = { name: file.name, url: '', size: formatSize(file.size), status: 'uploading' };
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
    Array.from(e.dataTransfer.files).forEach(uploadFile);
  }, [uploadFile]);

  const saveNote = async () => {
    if (!textNote.trim()) return;
    try {
      await fetch('/api/context/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: 'notes', content: textNote, metadata: { type: 'note', source: 'creative-hub' } }),
      });
      setTextSaved(true);
      setTimeout(() => { setTextSaved(false); setTextNote(''); }, 2000);
    } catch { /* retry later */ }
  };

  return (
    <div>
      {/* Drop Zone */}
      <div
        className={`ch-dropzone ${dragging ? 'ch-dropzone--active' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,audio/*,.pdf,.doc,.docx" onChange={e => Array.from(e.target.files || []).forEach(uploadFile)} style={{ display: 'none' }} />
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#c8943e', marginBottom: '0.5rem' }}>
          {dragging ? 'Release to upload' : 'Drop files here'}
        </div>
        <p style={{ fontSize: '0.8rem', color: '#6a6560', margin: 0 }}>
          Photos, videos, audio, documents — or click to browse
        </p>
      </div>

      {/* Upload Progress */}
      {files.length > 0 && (
        <div className="ch-section">
          <div className="ch-section-label">Uploads</div>
          {files.map((f, i) => (
            <div key={`${f.name}-${i}`} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.5rem 0.75rem', background: '#1a1816', borderRadius: 6, marginBottom: '0.25rem',
              borderLeft: `3px solid ${f.status === 'done' ? '#22c55e' : f.status === 'error' ? '#ef4444' : '#c8943e'}`,
            }}>
              <span style={{ fontSize: '0.8rem', color: '#e8e0d4' }}>{f.name} <span style={{ color: '#5a5550', fontSize: '0.7rem' }}>({f.size})</span></span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: f.status === 'done' ? '#22c55e' : f.status === 'error' ? '#ef4444' : '#c8943e' }}>
                {f.status === 'done' ? 'Indexed' : f.status === 'error' ? 'Failed' : 'Uploading...'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Text Note */}
      <div className="ch-section" style={{ marginTop: '1.5rem' }}>
        <div className="ch-section-label">Quick Note</div>
        <textarea className="ch-prompt" placeholder="Paste text, ideas, article drafts..." value={textNote} onChange={e => setTextNote(e.target.value)} rows={3} />
        <button className="ch-generate" onClick={saveNote} disabled={!textNote.trim()} style={{ fontSize: '0.75rem', padding: '8px 16px' }}>
          {textSaved ? 'Saved' : 'Save Note'}
        </button>
      </div>

      <style>{`
        .ch-dropzone { border: 2px dashed #2a2520; border-radius: 16px; padding: 3rem 2rem; text-align: center; cursor: pointer; transition: all 0.2s; background: #1a1816; margin-bottom: 1.5rem; }
        .ch-dropzone:hover, .ch-dropzone--active { border-color: #c8943e; background: rgba(200,148,62,0.04); }
      `}</style>
    </div>
  );
}
