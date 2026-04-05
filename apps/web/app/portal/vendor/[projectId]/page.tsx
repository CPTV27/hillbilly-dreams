'use client';

// Vendor portal — no auth, link-based
// /portal/vendor/:projectId
// Shows deal terms, tasks, and checklist from an Asana project
// Vendor gets this link via text. They bookmark it. Done.

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface VendorTask {
  gid: string;
  name: string;
  notes: string;
  completed: boolean;
  due_on: string | null;
}

interface VendorData {
  project: { name: string; notes: string };
  tasks: VendorTask[];
}

export default function VendorPortalPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [data, setData] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    fetch(`/api/vendor/portal/${projectId}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  }, [projectId]);

  const sendReply = async () => {
    if (!replyText.trim() || sending) return;
    setSending(true);
    try {
      await fetch(`/api/vendor/portal/${projectId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: replyText.trim() }),
      });
      setReplyText('');
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch { /* ok */ }
    setSending(false);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui', color: '#8a8074', background: '#faf9f6' }}>
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui', color: '#b54c4c', background: '#faf9f6', padding: '2rem' }}>
        {error || 'Not found'}
      </div>
    );
  }

  const { project, tasks } = data;
  const contractTask = tasks.find(t => t.name.startsWith('CONTRACT TERMS'));
  const deliverables = tasks.filter(t => !t.name.startsWith('CONTRACT') && !t.name.startsWith('EXPENSES') && !t.name.startsWith('PAYMENT LOG'));
  const pending = deliverables.filter(t => !t.completed);
  const done = deliverables.filter(t => t.completed);

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui', padding: '1.5rem', maxWidth: 600, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', borderBottom: '2px solid #c8943e', paddingBottom: '1rem' }}>
        <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#c8943e', marginBottom: '0.25rem' }}>Hillbilly Dreams Inc</p>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#2a2520', margin: 0 }}>{project.name}</h1>
      </div>

      {/* Deal terms */}
      {contractTask && (
        <div style={{ background: '#fff', border: '1px solid #e5e2dc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', borderLeft: '3px solid #c8943e' }}>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#c8943e', marginBottom: '0.5rem' }}>Deal Terms</h2>
          <p style={{ fontSize: '0.85rem', color: '#2a2520', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{contractTask.notes}</p>
        </div>
      )}

      {/* Pending tasks */}
      {pending.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2a2520', marginBottom: '0.5rem' }}>To Do ({pending.length})</h2>
          {pending.map(t => (
            <div key={t.gid} style={{ background: '#fff', border: '1px solid #e5e2dc', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#2a2520' }}>{t.name}</span>
                {t.due_on && <span style={{ fontSize: '0.7rem', color: '#c8943e' }}>Due {t.due_on}</span>}
              </div>
              {t.notes && <p style={{ fontSize: '0.8rem', color: '#6b635a', lineHeight: 1.5, margin: '0.4rem 0 0', whiteSpace: 'pre-wrap' }}>{t.notes.slice(0, 300)}{t.notes.length > 300 ? '...' : ''}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Completed */}
      {done.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8a8074', marginBottom: '0.5rem' }}>Completed ({done.length})</h2>
          {done.map(t => (
            <div key={t.gid} style={{ background: '#fff', border: '1px solid #e5e2dc', borderRadius: '8px', padding: '0.5rem 1rem', marginBottom: '0.3rem', opacity: 0.6 }}>
              <span style={{ fontSize: '0.85rem', color: '#6b635a', textDecoration: 'line-through' }}>{t.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Reply box — vendor can send a message back */}
      <div style={{ background: '#fff', border: '1px solid #e5e2dc', borderRadius: '8px', padding: '1rem', marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2a2520', marginBottom: '0.5rem' }}>Send a Message</h2>
        <textarea
          value={replyText}
          onChange={e => setReplyText(e.target.value)}
          placeholder="Type a message — it goes to the team"
          rows={3}
          style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e2dc', borderRadius: '6px', fontSize: '0.85rem', fontFamily: 'inherit', resize: 'vertical', background: '#faf9f6', color: '#2a2520', boxSizing: 'border-box', outline: 'none' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
          <button
            onClick={sendReply}
            disabled={sending || !replyText.trim()}
            style={{ padding: '0.5rem 1.25rem', background: '#c8943e', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', opacity: (sending || !replyText.trim()) ? 0.5 : 1 }}
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
          {sent && <span style={{ fontSize: '0.75rem', color: '#4a7c59' }}>Message sent</span>}
        </div>
      </div>

      {/* Footer */}
      <p style={{ textAlign: 'center', fontSize: '0.65rem', color: '#b8b0a4', marginTop: '2rem' }}>
        Hillbilly Dreams Inc &middot; Natchez, Mississippi
      </p>
    </div>
  );
}
