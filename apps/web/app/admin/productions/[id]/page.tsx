'use client';

// apps/web/app/admin/productions/[id]/page.tsx
// Production job detail — stage stepper, generate TTS/video, approve, artifacts

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';

const STAGES = ['script', 'voiceover', 'video', 'review', 'published'] as const;
const STAGE_LABELS: Record<string, string> = {
  script: 'Script',
  voiceover: 'Voiceover',
  video: 'Video',
  review: 'Review',
  published: 'Published',
};

const VOICE_PRESETS = [
  'chase', 'delta-dawn', 'catfish-carl', 'deacon-slim',
  'miss-pearline', 'neutral-male', 'neutral-female',
];

interface Artifact {
  id: number;
  stage: string;
  type: string;
  gcsUrl: string;
  mimeType: string;
  fileSize: number | null;
  version: number;
  metadata: string | null;
  createdAt: string;
}

interface Campaign {
  id: number;
  name: string;
  slug: string;
}

interface Job {
  id: number;
  title: string;
  slug: string;
  format: string;
  stage: string;
  veoPrompt: string | null;
  ttsScript: string | null;
  musicDirection: string | null;
  textOverlays: string | null;
  cta: string | null;
  voicePreset: string;
  voiceSpeed: number;
  voicePitch: number;
  veoQuality: string;
  videoDuration: number;
  veoOperationId: string | null;
  approvalStatus: string;
  approvalNotes: string | null;
  campaign: Campaign;
  artifacts: Artifact[];
  createdAt: string;
  updatedAt: string;
}

function formatBytes(bytes: number | null): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  });
}

export default function ProductionDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState<string | null>(null); // 'voiceover' | 'video' | null
  const [editing, setEditing] = useState(false);
  const [approvalNotes, setApprovalNotes] = useState('');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Form state for editing ──
  const [editForm, setEditForm] = useState({
    veoPrompt: '',
    ttsScript: '',
    musicDirection: '',
    textOverlays: '',
    cta: '',
    voicePreset: 'chase',
    voiceSpeed: 1.0,
    voicePitch: 0,
    veoQuality: 'draft',
    videoDuration: 5,
  });

  const fetchJob = useCallback(async () => {
    try {
      const res = await fetch(`/api/productions/${id}`);
      const data = await res.json();
      if (data.job) {
        setJob(data.job);
        setEditForm({
          veoPrompt: data.job.veoPrompt || '',
          ttsScript: data.job.ttsScript || '',
          musicDirection: data.job.musicDirection || '',
          textOverlays: data.job.textOverlays || '',
          cta: data.job.cta || '',
          voicePreset: data.job.voicePreset || 'chase',
          voiceSpeed: data.job.voiceSpeed ?? 1.0,
          voicePitch: data.job.voicePitch ?? 0,
          veoQuality: data.job.veoQuality || 'draft',
          videoDuration: data.job.videoDuration ?? 5,
        });
      }
      setError(null);
    } catch (err) {
      setError('Failed to load job');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchJob(); }, [fetchJob]);

  // ── Veo Polling ──
  useEffect(() => {
    if (job?.veoOperationId) {
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(`/api/productions/${id}/video/status`);
          const data = await res.json();
          if (data.status === 'complete' || data.status === 'failed') {
            if (pollRef.current) clearInterval(pollRef.current);
            setGenerating(null);
            fetchJob();
          }
        } catch {
          // continue polling
        }
      }, 10000);
      return () => { if (pollRef.current) clearInterval(pollRef.current); };
    }
  }, [job?.veoOperationId, id, fetchJob]);

  // ── Actions ──
  const handleSaveScript = async () => {
    const res = await fetch(`/api/productions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      setEditing(false);
      fetchJob();
    }
  };

  const handleGenerateVoiceover = async () => {
    setGenerating('voiceover');
    try {
      const res = await fetch(`/api/productions/${id}/voiceover`, { method: 'POST' });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Voiceover generation failed');
      }
      fetchJob();
    } finally {
      setGenerating(null);
    }
  };

  const handleGenerateVideo = async () => {
    setGenerating('video');
    try {
      const res = await fetch(`/api/productions/${id}/video`, { method: 'POST' });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Video generation failed');
        setGenerating(null);
      }
      fetchJob();
    } catch {
      setGenerating(null);
    }
  };

  const handleApproval = async (status: string) => {
    const res = await fetch(`/api/productions/${id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approvalStatus: status, approvalNotes }),
    });
    if (res.ok) fetchJob();
  };

  const handleAdvanceStage = async () => {
    if (!job) return;
    const currentIdx = STAGES.indexOf(job.stage as typeof STAGES[number]);
    if (currentIdx < STAGES.length - 1) {
      const nextStage = STAGES[currentIdx + 1];
      await fetch(`/api/productions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: nextStage }),
      });
      fetchJob();
    }
  };

  if (loading) return <div style={{ padding: 'var(--space-8)' }}>Loading...</div>;
  if (!job) return <div className="admin-error-banner">{error || 'Job not found'}</div>;

  const stageIdx = STAGES.indexOf(job.stage as typeof STAGES[number]);
  const voiceoverArtifacts = job.artifacts.filter((a) => a.type === 'voiceover');
  const videoArtifacts = job.artifacts.filter((a) => a.type === 'video');
  const isGeneratingVideo = !!job.veoOperationId || generating === 'video';

  return (
    <>
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <a href="/admin/productions" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none' }}>
            &larr; Productions
          </a>
          <h1 className="admin-page-title" style={{ marginTop: 'var(--space-2)' }}>{job.title}</h1>
          <p className="admin-page-sub">
            {job.campaign.name} &middot; {job.format}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <span className={`admin-badge ${job.approvalStatus === 'approved' ? 'admin-badge--active' : job.approvalStatus === 'revision' ? 'admin-badge--sold-out' : 'admin-badge--draft'}`}>
            {job.approvalStatus}
          </span>
        </div>
      </div>

      {/* Stage Stepper */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-1)', alignItems: 'center' }}>
          {STAGES.map((stage, i) => {
            const isActive = i === stageIdx;
            const isDone = i < stageIdx;
            return (
              <div key={stage} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{
                  flex: 1,
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase' as const,
                  background: isActive ? 'var(--accent-muted)' : isDone ? 'var(--success-muted)' : 'var(--surface-2)',
                  color: isActive ? 'var(--accent)' : isDone ? 'var(--success)' : 'var(--text-disabled)',
                  border: isActive ? '1px solid var(--accent)' : '1px solid transparent',
                }}>
                  {isDone ? '✓ ' : ''}{STAGE_LABELS[stage]}
                </div>
                {i < STAGES.length - 1 && (
                  <div style={{ width: 20, height: 1, background: 'var(--border)', margin: '0 2px' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage-specific panel */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>

        {/* ── SCRIPT ── */}
        {(job.stage === 'script' || editing) && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: 0 }}>Script</h2>
              {!editing && (
                <button className="admin-btn admin-btn--ghost" onClick={() => setEditing(true)}>Edit</button>
              )}
            </div>
            {editing ? (
              <>
                <div className="admin-form-group">
                  <label className="admin-label">Veo Prompt (Visual Direction)</label>
                  <textarea className="admin-textarea" value={editForm.veoPrompt} onChange={(e) => setEditForm({ ...editForm, veoPrompt: e.target.value })} rows={4} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">TTS Script (Voiceover)</label>
                  <textarea className="admin-textarea" value={editForm.ttsScript} onChange={(e) => setEditForm({ ...editForm, ttsScript: e.target.value })} rows={4} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Music Direction</label>
                  <textarea className="admin-textarea" value={editForm.musicDirection} onChange={(e) => setEditForm({ ...editForm, musicDirection: e.target.value })} rows={2} />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Text Overlays</label>
                    <textarea className="admin-textarea" value={editForm.textOverlays} onChange={(e) => setEditForm({ ...editForm, textOverlays: e.target.value })} rows={2} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">CTA</label>
                    <input className="admin-input" value={editForm.cta} onChange={(e) => setEditForm({ ...editForm, cta: e.target.value })} />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Voice Preset</label>
                    <select className="admin-select" value={editForm.voicePreset} onChange={(e) => setEditForm({ ...editForm, voicePreset: e.target.value })}>
                      {VOICE_PRESETS.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Voice Speed ({editForm.voiceSpeed}x)</label>
                    <input type="range" min="0.5" max="2" step="0.1" value={editForm.voiceSpeed} onChange={(e) => setEditForm({ ...editForm, voiceSpeed: parseFloat(e.target.value) })} />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Veo Quality</label>
                    <select className="admin-select" value={editForm.veoQuality} onChange={(e) => setEditForm({ ...editForm, veoQuality: e.target.value })}>
                      <option value="draft">Draft (Fast)</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Video Duration ({editForm.videoDuration}s)</label>
                    <input type="range" min="3" max="15" step="1" value={editForm.videoDuration} onChange={(e) => setEditForm({ ...editForm, videoDuration: parseInt(e.target.value, 10) })} />
                  </div>
                </div>
                <div className="admin-form-actions">
                  <button className="admin-btn admin-btn--primary" onClick={handleSaveScript}>Save Script</button>
                  <button className="admin-btn admin-btn--ghost" onClick={() => setEditing(false)}>Cancel</button>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {job.veoPrompt && (
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 'var(--space-1)' }}>Veo Prompt</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text)', whiteSpace: 'pre-wrap' }}>{job.veoPrompt}</div>
                  </div>
                )}
                {job.ttsScript && (
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 'var(--space-1)' }}>TTS Script</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text)', whiteSpace: 'pre-wrap' }}>{job.ttsScript}</div>
                  </div>
                )}
                {job.musicDirection && (
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 'var(--space-1)' }}>Music Direction</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{job.musicDirection}</div>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
                  {job.textOverlays && (
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 'var(--space-1)' }}>Text Overlays</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{job.textOverlays}</div>
                    </div>
                  )}
                  {job.cta && (
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 'var(--space-1)' }}>CTA</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--accent)' }}>{job.cta}</div>
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', display: 'flex', gap: 'var(--space-4)' }}>
                  <span>Voice: {job.voicePreset}</span>
                  <span>Speed: {job.voiceSpeed}x</span>
                  <span>Quality: {job.veoQuality}</span>
                  <span>Duration: {job.videoDuration}s</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── VOICEOVER ── */}
        {job.stage === 'voiceover' && !editing && (
          <>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>Voiceover</h2>
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <button
                className="admin-btn admin-btn--primary"
                onClick={handleGenerateVoiceover}
                disabled={generating === 'voiceover' || !job.ttsScript}
              >
                {generating === 'voiceover' ? 'Generating...' : voiceoverArtifacts.length > 0 ? 'Re-generate' : 'Generate Voiceover'}
              </button>
              <button className="admin-btn admin-btn--ghost" onClick={() => setEditing(true)}>Edit Script</button>
            </div>
            {voiceoverArtifacts.map((a) => (
              <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-2)' }}>
                <audio controls src={a.gcsUrl} style={{ flex: 1 }} />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>
                  v{a.version} &middot; {formatBytes(a.fileSize)} &middot; {formatDate(a.createdAt)}
                </span>
              </div>
            ))}
          </>
        )}

        {/* ── VIDEO ── */}
        {job.stage === 'video' && !editing && (
          <>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>Video Generation</h2>
            {isGeneratingVideo ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)', animation: 'spin 2s linear infinite' }}>⟳</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Generating video via Veo {job.veoQuality}...</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginTop: 'var(--space-2)' }}>Polling every 10 seconds. This may take a few minutes.</div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <button
                  className="admin-btn admin-btn--primary"
                  onClick={handleGenerateVideo}
                  disabled={!job.veoPrompt}
                >
                  {videoArtifacts.length > 0 ? 'Re-generate Video' : 'Generate Video'}
                </button>
                <button className="admin-btn admin-btn--ghost" onClick={() => setEditing(true)}>Edit Script</button>
              </div>
            )}
            {videoArtifacts.map((a) => (
              <div key={a.id} style={{ marginBottom: 'var(--space-3)' }}>
                <video controls src={a.gcsUrl} style={{ width: '100%', maxHeight: 400, borderRadius: 'var(--radius-sm)', background: '#000' }} />
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginTop: 'var(--space-1)' }}>
                  v{a.version} &middot; {formatBytes(a.fileSize)} &middot; {formatDate(a.createdAt)}
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── REVIEW ── */}
        {job.stage === 'review' && !editing && (
          <>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>Review</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <div>
                {videoArtifacts[0] && (
                  <video controls src={videoArtifacts[0].gcsUrl} style={{ width: '100%', borderRadius: 'var(--radius-sm)', background: '#000' }} />
                )}
                {voiceoverArtifacts[0] && (
                  <div style={{ marginTop: 'var(--space-3)' }}>
                    <audio controls src={voiceoverArtifacts[0].gcsUrl} style={{ width: '100%' }} />
                  </div>
                )}
              </div>
              <div>
                <div className="admin-form-group">
                  <label className="admin-label">Approval Notes</label>
                  <textarea
                    className="admin-textarea"
                    value={approvalNotes}
                    onChange={(e) => setApprovalNotes(e.target.value)}
                    placeholder="Notes for the team..."
                    rows={4}
                  />
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <button className="admin-btn admin-btn--primary" onClick={() => handleApproval('approved')}>
                    Approve
                  </button>
                  <button className="admin-btn admin-btn--danger" onClick={() => handleApproval('revision')}>
                    Request Revision
                  </button>
                </div>
                {job.approvalNotes && (
                  <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                    <strong>Previous notes:</strong> {job.approvalNotes}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* ── PUBLISHED ── */}
        {job.stage === 'published' && !editing && (
          <>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>Published</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <span className="admin-badge admin-badge--published">LIVE</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                Approved {formatDate(job.updatedAt)}
              </span>
            </div>
            {videoArtifacts[0] && (
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <video controls src={videoArtifacts[0].gcsUrl} style={{ width: '100%', maxHeight: 400, borderRadius: 'var(--radius-sm)', background: '#000' }} />
              </div>
            )}
            {videoArtifacts[0] && (
              <div className="admin-form-group">
                <label className="admin-label">Video URL</label>
                <input className="admin-input" readOnly value={videoArtifacts[0].gcsUrl} onClick={(e) => (e.target as HTMLInputElement).select()} />
              </div>
            )}
          </>
        )}
      </div>

      {/* Advance Stage Button */}
      {job.stage !== 'published' && job.stage !== 'review' && !editing && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-6)' }}>
          <button className="admin-btn admin-btn--ghost" onClick={handleAdvanceStage}>
            Skip to {STAGE_LABELS[STAGES[stageIdx + 1]]} &rarr;
          </button>
        </div>
      )}

      {/* Artifacts History */}
      {job.artifacts.length > 0 && (
        <div className="admin-card">
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>
            Artifacts ({job.artifacts.length})
          </h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Stage</th>
                  <th>Version</th>
                  <th>Size</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {job.artifacts.map((a) => (
                  <tr key={a.id}>
                    <td><span className="admin-badge admin-badge--draft">{a.type}</span></td>
                    <td style={{ color: 'var(--text-muted)' }}>{STAGE_LABELS[a.stage] || a.stage}</td>
                    <td>v{a.version}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{formatBytes(a.fileSize)}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{formatDate(a.createdAt)}</td>
                    <td>
                      <a href={a.gcsUrl} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn--ghost" style={{ fontSize: 'var(--text-xs)', padding: '2px 8px' }}>
                        Open
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
