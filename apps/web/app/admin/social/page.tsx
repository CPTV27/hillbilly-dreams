'use client';
import { useState, useEffect } from 'react';

export default function SocialDashboard() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [postContent, setPostContent] = useState('');
  const [scheduling, setScheduling] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/social/accounts', { credentials: 'include' })
      .then(r => r.json())
      .then(d => {
        setAccounts(d.integrations || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const schedulePost = async () => {
    if (!postContent.trim()) return;
    setScheduling(true);
    setResult(null);
    try {
      const res = await fetch('/api/social/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          content: postContent,
          integrationIds: accounts.map((a: any) => a.id),
        }),
      });
      const data = await res.json();
      if (data.success && data.posts?.some((p: { error?: string }) => p.error)) {
        setResult(`Partial: ${data.posts.map((p: { error?: string }) => p.error).filter(Boolean).join('; ')}`);
      } else {
        setResult(data.success ? 'Posted successfully!' : data.error || 'Request failed');
      }
      if (data.success) setPostContent('');
    } catch (err: any) {
      setResult('Error: ' + err.message);
    }
    setScheduling(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#e8e4de', fontFamily: "'Inter', system-ui", padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ borderBottom: '1px solid #2a2725', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c8943e', margin: '0 0 0.25rem' }}>Social Command Center</h1>
        <p style={{ fontSize: '0.75rem', color: '#8a8074', margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Native publisher · Meta / GBP next</p>
      </div>

      {/* Connected Accounts */}
      <div style={{ background: '#1a1816', borderRadius: '12px', padding: '1.25rem', border: '1px solid #2a2725', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Connected Accounts</div>
        {loading ? (
          <p style={{ color: '#8a8074', fontSize: '0.875rem' }}>Loading accounts...</p>
        ) : accounts.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {accounts.map((a: any, i: number) => (
              <div key={i} style={{ padding: '0.5rem 1rem', background: '#231f1c', border: '1px solid #333', borderRadius: '8px', fontSize: '0.8125rem' }}>
                {a.name || a.provider || 'Account ' + (i + 1)}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p style={{ color: '#8a8074', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
              No active SocialAccount rows in the database. Add accounts (and OAuth tokens) via Prisma admin or a future connect flow.
            </p>
          </div>
        )}
      </div>

      {/* Quick Post */}
      <div style={{ background: '#1a1816', borderRadius: '12px', padding: '1.25rem', border: '1px solid #2a2725', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Quick Post</div>
        <textarea
          style={{ width: '100%', minHeight: '100px', padding: '0.75rem', background: '#231f1c', border: '1px solid #333', borderRadius: '8px', color: '#e8e4de', fontSize: '0.9375rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
          placeholder="Write a post for all connected accounts..."
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#8a8074' }}>{postContent.length} / 280 chars</span>
          <button
            style={{ padding: '0.625rem 1.5rem', background: '#c8943e', color: '#0f0f0f', border: 'none', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', opacity: scheduling ? 0.6 : 1 }}
            onClick={schedulePost}
            disabled={scheduling || !postContent.trim()}
          >
            {scheduling ? 'Publishing...' : 'Publish Now'}
          </button>
        </div>
        {result && (
          <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.8125rem', background: result.includes('success') ? '#1a2e1a' : '#2a1515', color: result.includes('success') ? '#22c55e' : '#ef4444' }}>
            {result}
          </div>
        )}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <a href="/admin/studio" style={{ padding: '0.5rem 1rem', border: '1px solid #333', borderRadius: '8px', color: '#8a8074', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600 }}>Content Studio</a>
        <a href="/admin/command" style={{ padding: '0.5rem 1rem', border: '1px solid #333', borderRadius: '8px', color: '#8a8074', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600 }}>Command Center</a>
      </div>
    </div>
  );
}
