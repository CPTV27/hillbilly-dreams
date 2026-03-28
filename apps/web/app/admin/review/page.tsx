'use client';
import { useState, useEffect } from 'react';

interface Draft {
  id: number; channel: string; title: string; content: string;
  status: string; sourceType: string; sourceId: string;
  agentAuthor: string; createdAt: string;
}

export default function ReviewDashboard() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [counts, setCounts] = useState({ pending: 0, approved: 0, published: 0 });
  const [loading, setLoading] = useState(true);
  const [refineId, setRefineId] = useState<number | null>(null);
  const [refineText, setRefineText] = useState('');
  const [refining, setRefining] = useState(false);

  const loadDrafts = async () => {
    const res = await fetch('/api/drafts?status=pending');
    const data = await res.json();
    setDrafts(data.drafts || []);
    setCounts(data.counts || { pending: 0, approved: 0, published: 0 });
    setLoading(false);
  };

  useEffect(() => { loadDrafts(); }, []);

  const updateDraft = async (id: number, status: string) => {
    await fetch('/api/drafts', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    loadDrafts();
  };

  const refineDraft = async (id: number) => {
    if (!refineText.trim()) return;
    setRefining(true);
    const res = await fetch('/api/drafts/refine', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ draftId: id, instruction: refineText }) });
    const data = await res.json();
    if (data.success) { setRefineId(null); setRefineText(''); loadDrafts(); }
    setRefining(false);
  };

  const updateContent = async (id: number, content: string) => {
    await fetch('/api/drafts', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, content }) });
  };

  const channelColors: Record<string, string> = { social: '#3b82f6', magazine: '#c8943e', radio: '#D4915E', reviews: '#22c55e' };

  if (loading) return <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#c8943e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui' }}>Loading drafts...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#e8e4de', fontFamily: "'Inter', system-ui", padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ borderBottom: '1px solid #2a2725', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c8943e', margin: '0 0 0.25rem' }}>Review Desk</h1>
        <p style={{ fontSize: '0.75rem', color: '#8a8074', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Approve, refine, or reject agent-generated content</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        {[['pending', counts.pending, '#f59e0b'], ['approved', counts.approved, '#22c55e'], ['published', counts.published, '#3b82f6']].map(([label, count, color]) => (
          <div key={label as string} style={{ background: '#1a1816', borderRadius: '10px', padding: '1rem 1.5rem', border: '1px solid #2a2725', flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: color as string }}>{count as number}</div>
            <div style={{ fontSize: '0.7rem', color: '#8a8074', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label as string}</div>
          </div>
        ))}
      </div>

      {drafts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#4a4440' }}>
          <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No pending drafts</p>
          <p style={{ fontSize: '0.8125rem' }}>Generate content from the Content Studio or trigger the Showrunner</p>
        </div>
      )}

      {drafts.map(draft => (
        <div key={draft.id} style={{ background: '#1a1816', borderRadius: '12px', padding: '1.25rem', border: '1px solid #2a2725', marginBottom: '1rem', borderLeft: `4px solid ${channelColors[draft.channel] || '#333'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '999px', fontSize: '0.6rem', fontWeight: 700, background: channelColors[draft.channel] || '#333', color: '#fff', marginRight: '0.5rem' }}>{draft.channel}</span>
              <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{draft.title}</span>
            </div>
            <span style={{ fontSize: '0.65rem', color: '#4a4440' }}>{new Date(draft.createdAt).toLocaleTimeString()}</span>
          </div>

          <textarea
            defaultValue={draft.content}
            onBlur={e => updateContent(draft.id, e.target.value)}
            style={{ width: '100%', minHeight: '120px', padding: '0.75rem', background: '#231f1c', border: '1px solid #2a2725', borderRadius: '8px', color: '#b8b0a4', fontSize: '0.8125rem', lineHeight: 1.6, outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
          />

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', alignItems: 'center' }}>
            <button onClick={() => updateDraft(draft.id, 'approved')} style={{ padding: '0.5rem 1rem', background: '#22c55e', color: '#0f0f0f', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>✓ Approve</button>
            <button onClick={() => updateDraft(draft.id, 'rejected')} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>✗ Reject</button>
            <button onClick={() => setRefineId(refineId === draft.id ? null : draft.id)} style={{ padding: '0.5rem 1rem', background: 'transparent', color: '#c8943e', border: '1px solid #c8943e', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Refine</button>
            <span style={{ fontSize: '0.65rem', color: '#4a4440', marginLeft: 'auto' }}>{draft.sourceType}/{draft.sourceId}</span>
          </div>

          {refineId === draft.id && (
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
              <input style={{ flex: 1, padding: '0.5rem 0.75rem', background: '#231f1c', border: '1px solid #c8943e', borderRadius: '6px', color: '#e8e4de', fontSize: '0.8125rem', outline: 'none' }}
                placeholder='e.g., "more grit", "shorter", "focus on the history"'
                value={refineText} onChange={e => setRefineText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && refineDraft(draft.id)} />
              <button onClick={() => refineDraft(draft.id)} disabled={refining}
                style={{ padding: '0.5rem 1rem', background: '#c8943e', color: '#0f0f0f', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', opacity: refining ? 0.6 : 1 }}>
                {refining ? '⟳' : 'Go'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
