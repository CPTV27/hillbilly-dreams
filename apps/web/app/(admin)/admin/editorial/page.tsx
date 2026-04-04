'use client';

import type { CSSProperties } from 'react';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { FilePenLine, LayoutGrid, Sparkles } from 'lucide-react';

const BG = '#050505';
const NEON = '#22d3ee';
const GLASS_BG = 'rgba(255, 255, 255, 0.05)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.08)';

const glassCard: CSSProperties = {
  background: GLASS_BG,
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: `1px solid ${GLASS_BORDER}`,
  borderRadius: 14,
  boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
};

type JobRow = {
  id: string;
  toolId: string;
  editorialStatus: string;
  draftContent: string | null;
  humanEditedContent: string | null;
  redPenNotes: string | null;
  assignedHumanId: string | null;
  styleGuideId: string | null;
  updatedAt: string;
  brand: { name: string; slug: string } | null;
  styleGuide: { id: string; name: string; persona: string } | null;
  assignedHuman: { id: string; name: string | null; email: string | null } | null;
};

type SessionUser = { id?: string; email?: string | null };

export default function EditorialBureauPage() {
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<JobRow & { styleGuide?: { samples: string[] } | null } | null>(null);
  const [editorText, setEditorText] = useState('');
  const [styleScore, setStyleScore] = useState<{ score: number | null; rationale?: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadInbox = useCallback(async () => {
    const r = await fetch('/api/admin/editorial/jobs?status=HUMAN_REVIEW&limit=50');
    const d = await r.json();
    if (!d.ok) {
      setError(typeof d.error === 'string' ? d.error : 'Inbox failed');
      return;
    }
    setJobs(d.jobs || []);
    setError(null);
  }, []);

  useEffect(() => {
    void loadInbox();
  }, [loadInbox]);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((d) => setSessionUser(d?.user ?? null))
      .catch(() => setSessionUser(null));
  }, []);

  const loadDetail = useCallback(async (id: string) => {
    setBusy(true);
    setError(null);
    try {
      const r = await fetch(`/api/admin/editorial/jobs/${id}`);
      const d = await r.json();
      if (!d.ok) {
        setError(d.error || 'Load failed');
        return;
      }
      const j = d.job as JobRow & { styleGuide?: { samples: string[] } | null };
      setDetail(j);
      setEditorText((j.humanEditedContent || j.draftContent || '').trim());
      setStyleScore(null);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    if (selectedId) void loadDetail(selectedId);
  }, [selectedId, loadDetail]);

  const saveDraft = async () => {
    if (!selectedId) return;
    setBusy(true);
    setError(null);
    try {
      const r = await fetch(`/api/admin/editorial/jobs/${selectedId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ humanEditedContent: editorText }),
      });
      const d = await r.json();
      if (!d.ok) {
        setError(d.error || 'Save failed');
        return;
      }
      await loadInbox();
    } finally {
      setBusy(false);
    }
  };

  const runVoiceGuard = async () => {
    if (!detail?.styleGuideId) {
      setError('No style guide on this job — assign styleGuideId in the database.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const r = await fetch('/api/admin/editorial/style-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draft: editorText, styleGuideId: detail.styleGuideId }),
      });
      const d = await r.json();
      if (!r.ok || d.error) {
        setError(typeof d.error === 'string' ? d.error : 'Voice Guard failed');
        return;
      }
      const sm = d.styleMatch as { score?: number; rationale?: string } | undefined;
      setStyleScore({
        score: typeof sm?.score === 'number' ? sm.score : null,
        rationale: typeof sm?.rationale === 'string' ? sm.rationale : undefined,
      });
    } finally {
      setBusy(false);
    }
  };

  const publishLive = async () => {
    if (!selectedId) return;
    setBusy(true);
    setError(null);
    try {
      const r = await fetch(`/api/admin/editorial/jobs/${selectedId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve_live', humanEditedContent: editorText }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error || 'Publish blocked');
        return;
      }
      setSelectedId(null);
      setDetail(null);
      await loadInbox();
    } finally {
      setBusy(false);
    }
  };

  const canPublish =
    detail &&
    sessionUser?.id &&
    detail.assignedHumanId &&
    detail.assignedHumanId === sessionUser.id;

  let redPenPretty: string | null = null;
  if (detail?.redPenNotes) {
    try {
      const o = JSON.parse(detail.redPenNotes) as unknown;
      redPenPretty = JSON.stringify(o, null, 2);
    } catch {
      redPenPretty = detail.redPenNotes;
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#e8e4de', fontFamily: 'var(--font-body, system-ui, sans-serif)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '1.75rem 1.25rem 3rem' }}>
        <header style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FilePenLine size={28} color={NEON} aria-hidden />
            <div>
              <h1 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 600 }}>Editorial Bureau</h1>
              <p style={{ margin: '0.25rem 0 0', opacity: 0.72, fontSize: '0.875rem' }}>
                Human-in-the-loop desk — Red Pen first, Editor-in-Chief last. Margin stays on Main Street.
              </p>
            </div>
          </div>
          <Link
            href="/admin/studio"
            style={{
              marginLeft: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.45rem 0.85rem',
              borderRadius: 10,
              border: `1px solid ${GLASS_BORDER}`,
              color: '#e8e4de',
              textDecoration: 'none',
              fontSize: '0.8125rem',
            }}
          >
            <LayoutGrid size={16} color={NEON} aria-hidden />
            Sovereign Studio
          </Link>
        </header>

        {error ? (
          <div
            role="alert"
            style={{
              ...glassCard,
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
              borderColor: 'rgba(251, 113, 133, 0.45)',
              color: '#fecaca',
            }}
          >
            {error}
          </div>
        ) : null}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(220px, 280px) 1fr',
            gap: '1.25rem',
            alignItems: 'start',
          }}
        >
          <aside style={{ ...glassCard, padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.65, marginBottom: '0.75rem' }}>
              Inbox · HUMAN_REVIEW
            </div>
            {jobs.length === 0 ? (
              <p style={{ margin: 0, opacity: 0.6, fontSize: '0.875rem' }}>No jobs in review. Run Red Pen with applyToJob from the registry.</p>
            ) : (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {jobs.map((j) => (
                  <li key={j.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(j.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.55rem 0.65rem',
                        borderRadius: 10,
                        border:
                          selectedId === j.id ? `1px solid ${NEON}` : `1px solid ${GLASS_BORDER}`,
                        background: selectedId === j.id ? 'rgba(34,211,238,0.08)' : 'rgba(0,0,0,0.25)',
                        color: '#e8e4de',
                        cursor: 'pointer',
                        fontSize: '0.8125rem',
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{j.brand?.name || j.toolId}</div>
                      <div style={{ opacity: 0.65, fontSize: '0.75rem', marginTop: 2 }}>{j.styleGuide?.persona || '—'}</div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>

          <section style={{ ...glassCard, padding: '1.25rem' }}>
            {!selectedId || !detail ? (
              <p style={{ margin: 0, opacity: 0.65 }}>Select a job to open the reviewer.</p>
            ) : (
              <>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8125rem', opacity: 0.75 }}>
                    Assigned: {detail.assignedHuman?.name || detail.assignedHuman?.email || '—'}
                  </span>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void saveDraft()}
                    style={btnSecondary}
                  >
                    Save draft
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void runVoiceGuard()}
                    style={btnAccent}
                  >
                    <Sparkles size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} aria-hidden />
                    Voice Guard
                  </button>
                  <button
                    type="button"
                    disabled={busy || !canPublish}
                    onClick={() => void publishLive()}
                    title={!canPublish ? 'Only the assigned editor may publish.' : undefined}
                    style={{
                      ...btnAccent,
                      opacity: canPublish ? 1 : 0.45,
                      cursor: canPublish ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Publish LIVE
                  </button>
                </div>

                {styleScore ? (
                  <div
                    style={{
                      marginBottom: '1rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 10,
                      border: `1px solid ${GLASS_BORDER}`,
                      background: 'rgba(0,0,0,0.2)',
                      fontSize: '0.875rem',
                    }}
                  >
                    <strong style={{ color: NEON }}>Style match</strong>
                    {styleScore.score != null ? `: ${styleScore.score}/100` : ': —'}
                    {styleScore.rationale ? <div style={{ marginTop: 6, opacity: 0.85 }}>{styleScore.rationale}</div> : null}
                  </div>
                ) : null}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.65, marginBottom: 6 }}>AI draft</div>
                    <pre
                      style={{
                        margin: 0,
                        minHeight: 320,
                        maxHeight: 480,
                        overflow: 'auto',
                        padding: '0.75rem',
                        borderRadius: 10,
                        border: `1px solid ${GLASS_BORDER}`,
                        background: 'rgba(0,0,0,0.35)',
                        fontSize: '0.8125rem',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {(detail.draftContent || '—').trim()}
                    </pre>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.65, marginBottom: 6 }}>Your edit (rich text → plain for now)</div>
                    <textarea
                      value={editorText}
                      onChange={(e) => setEditorText(e.target.value)}
                      aria-label="Editor revision text"
                      placeholder="Refine voice here before publish…"
                      style={{
                        width: '100%',
                        minHeight: 320,
                        maxHeight: 480,
                        padding: '0.75rem',
                        borderRadius: 10,
                        border: `1px solid ${GLASS_BORDER}`,
                        background: 'rgba(0,0,0,0.35)',
                        color: '#e8e4de',
                        fontSize: '0.8125rem',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>
                </div>

                {redPenPretty ? (
                  <div style={{ marginTop: '1.25rem' }}>
                    <div style={{ fontSize: '0.75rem', opacity: 0.65, marginBottom: 6 }}>Red Pen (machine pass)</div>
                    <pre
                      style={{
                        margin: 0,
                        maxHeight: 220,
                        overflow: 'auto',
                        padding: '0.75rem',
                        borderRadius: 10,
                        border: `1px solid ${GLASS_BORDER}`,
                        background: 'rgba(0,0,0,0.25)',
                        fontSize: '0.75rem',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {redPenPretty}
                    </pre>
                  </div>
                ) : null}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

const btnBase: CSSProperties = {
  padding: '0.45rem 0.85rem',
  borderRadius: 10,
  fontSize: '0.8125rem',
  fontWeight: 600,
  cursor: 'pointer',
  border: `1px solid ${GLASS_BORDER}`,
  color: '#e8e4de',
};

const btnSecondary: CSSProperties = {
  ...btnBase,
  background: 'rgba(255,255,255,0.06)',
};

const btnAccent: CSSProperties = {
  ...btnBase,
  background: 'rgba(34, 211, 238, 0.12)',
  borderColor: 'rgba(34, 211, 238, 0.35)',
};
