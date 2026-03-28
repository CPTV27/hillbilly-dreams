'use client';

import { useState } from 'react';

/**
 * Content Studio — the "Omnipush" Control Room
 * /admin/studio
 *
 * Drop one asset (text, photo, or business name) and the engine
 * generates content for all channels: DSD social, Magazine blurb,
 * Radio script. One click to approve and distribute.
 */

type Channel = 'social' | 'magazine' | 'radio' | 'reviews';
type ContentDraft = {
  channel: Channel;
  title: string;
  content: string;
  status: 'generating' | 'draft' | 'approved' | 'published';
};

export default function ContentStudio() {
  const [inputType, setInputType] = useState<'text' | 'business' | 'photo'>('business');
  const [inputValue, setInputValue] = useState('');
  const [brandTarget, setBrandTarget] = useState('all');
  const [generating, setGenerating] = useState(false);
  const [drafts, setDrafts] = useState<ContentDraft[]>([]);
  const [error, setError] = useState<string | null>(null);

  const updateDraft = (index: number, updates: Partial<ContentDraft>) => {
    setDrafts(prev => prev.map((d, i) => i === index ? { ...d, ...updates } : d));
  };

  const generateAll = async () => {
    if (!inputValue.trim()) return;
    setGenerating(true);
    setError(null);

    // Show all 4 channels as "waiting"
    setDrafts([
      { channel: 'social', title: '📱 Social Posts', content: '', status: 'generating' },
      { channel: 'magazine', title: '📰 Magazine Feature', content: '', status: 'generating' },
      { channel: 'radio', title: '🎙 Radio Spot', content: '', status: 'generating' },
      { channel: 'reviews', title: '⭐ Review Responses', content: '', status: 'generating' },
    ]);

    try {
      // Step 1: Scout — this gets the DNA + all content in one call
      const scoutRes = await fetch('/api/marketing/scout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName: inputValue, city: 'Natchez, MS' }),
      });
      const scoutData = await scoutRes.json();
      if (!scoutData.success) throw new Error(scoutData.error || 'Scout failed');
      const data = scoutData.data;

      // Stream results one at a time with short delays for visual effect
      // Channel 1: Magazine (DNA + description)
      updateDraft(1, {
        title: `📰 ${data.businessName} — Magazine Feature`,
        content: `# ${data.businessName}\n\n${data.description}\n\nCategory: ${data.category}\nAesthetic: ${data.aestheticFlavor}\nVoice: ${data.brandVoice}\n\nKey Value Props:\n${data.keyValueProps?.map((p: string) => '• ' + p).join('\n') || 'None'}`,
        status: 'draft',
      });
      await new Promise(r => setTimeout(r, 400));

      // Channel 2: Social
      updateDraft(0, {
        title: '📱 Social Campaign — 3 Posts',
        content: data.socialPosts?.map((p: any, i: number) =>
          `POST ${i + 1}:\n${p.caption}\n\nStrategy: ${p.strategy}`
        ).join('\n\n---\n\n') || 'No social posts generated',
        status: 'draft',
      });
      await new Promise(r => setTimeout(r, 400));

      // Channel 3: Radio
      updateDraft(2, {
        title: `🎙 Radio Spot — ${data.radioSpot?.title || 'Script'}`,
        content: `${data.radioSpot?.script || 'No script generated'}\n\nTagline: "${data.radioSpot?.tagline || ''}"`,
        status: 'draft',
      });
      await new Promise(r => setTimeout(r, 400));

      // Channel 4: Reviews
      updateDraft(3, {
        title: '⭐ Reputation Guardian',
        content: data.reviewResponses?.map((r: any) =>
          `${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)} "${r.review}"\n\n↳ ${r.response}`
        ).join('\n\n---\n\n') || 'No review responses generated',
        status: 'draft',
      });

    } catch (err: any) {
      setError(err.message);
    }
    setGenerating(false);
  };

  const approveDraft = (index: number) => {
    setDrafts(prev => prev.map((d, i) => i === index ? { ...d, status: 'approved' } : d));
  };

  const approveAll = () => {
    setDrafts(prev => prev.map(d => ({ ...d, status: 'approved' })));
  };

  const S: Record<string, React.CSSProperties> = {
    page: { minHeight: '100vh', background: '#0f0f0f', color: '#e8e4de', fontFamily: "'Inter', system-ui", padding: '1.5rem', maxWidth: '900px', margin: '0 auto' },
    header: { borderBottom: '1px solid #2a2725', paddingBottom: '1rem', marginBottom: '1.5rem' },
    title: { fontSize: '1.5rem', fontWeight: 800, color: '#c8943e', margin: '0 0 0.25rem' },
    sub: { fontSize: '0.75rem', color: '#8a8074', margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' as const },
    card: { background: '#1a1816', borderRadius: '12px', padding: '1.25rem', border: '1px solid #2a2725', marginBottom: '1rem' },
    label: { fontSize: '0.65rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: '0.75rem', display: 'block' },
    input: { width: '100%', padding: '1rem', background: '#231f1c', border: '1px solid #333', borderRadius: '10px', color: '#e8e4de', fontSize: '1.125rem', outline: 'none', boxSizing: 'border-box' as const, marginBottom: '0.75rem' },
    btn: { padding: '1rem 2rem', background: '#c8943e', color: '#0f0f0f', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', width: '100%' },
    btnSmall: { padding: '0.5rem 1rem', background: '#22c55e', color: '#0f0f0f', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' },
    btnOutline: { padding: '0.5rem 1rem', background: 'transparent', color: '#c8943e', border: '1px solid #c8943e', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' },
    draft: { background: '#231f1c', borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem', borderLeft: '3px solid #333' },
    draftApproved: { borderLeftColor: '#22c55e' },
    text: { fontSize: '0.875rem', color: '#b8b0a4', lineHeight: 1.7, whiteSpace: 'pre-wrap' as const, margin: 0 },
    channelBadge: { display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.6rem', fontWeight: 700, marginRight: '0.5rem' },
    err: { background: '#2a1515', border: '1px solid #ef4444', borderRadius: '10px', padding: '1rem', color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' },
    loading: { textAlign: 'center' as const, padding: '2rem', color: '#c8943e' },
    tabs: { display: 'flex', gap: '0.5rem', marginBottom: '1rem' },
    tab: { padding: '0.4rem 1rem', borderRadius: '999px', border: '1px solid #333', background: 'transparent', color: '#8a8074', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 },
    tabActive: { background: '#c8943e', color: '#0f0f0f', border: '1px solid #c8943e' },
  };

  const channelColors: Record<string, string> = {
    social: '#3b82f6',
    magazine: '#c8943e',
    radio: '#D4915E',
    reviews: '#22c55e',
  };

  const channelIcons: Record<string, string> = {
    social: '📱',
    magazine: '📰',
    radio: '🎙',
    reviews: '⭐',
  };

  return (
    <div style={S.page}>
      <header style={S.header}>
        <h1 style={S.title}>Content Studio</h1>
        <p style={S.sub}>One input → four channels → approve → publish</p>
      </header>

      {/* Input */}
      {drafts.length === 0 && (
        <div style={S.card}>
          <span style={S.label}>What are we creating content for?</span>

          <div style={S.tabs}>
            {[['business', '🏪 Business'], ['text', '✏️ Topic'], ['photo', '📷 Photo']].map(([id, label]) => (
              <button key={id} onClick={() => setInputType(id as any)}
                style={{ ...S.tab, ...(inputType === id ? S.tabActive : {}) }}>{label}</button>
            ))}
          </div>

          <input
            style={S.input}
            placeholder={inputType === 'business' ? 'Business name (e.g., Fat Mama\'s Tamales)...'
              : inputType === 'text' ? 'Topic or headline...'
              : 'Describe the photo...'}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && generateAll()}
            autoFocus
          />

          <button style={{ ...S.btn, opacity: generating ? 0.6 : 1 }}
            onClick={generateAll} disabled={generating || !inputValue.trim()}>
            {generating ? '⟳ Generating for all channels...' : 'GENERATE CONTENT'}
          </button>
        </div>
      )}

      {error && <div style={S.err}>{error}</div>}

      {/* Progress indicator — shows which channels are done */}
      {generating && (
        <div style={{ ...S.card, textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem', animation: 'spin 1s linear infinite' }}>⟳</div>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: '#c8943e', fontWeight: 600, marginBottom: '1rem' }}>Generating content...</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {drafts.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem' }}>
                <span style={{ color: d.status === 'draft' ? '#22c55e' : '#333' }}>
                  {d.status === 'draft' ? '✓' : '○'}
                </span>
                <span style={{ color: d.status === 'draft' ? '#e8e4de' : '#6a6460' }}>
                  {d.channel}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drafts */}
      {drafts.length > 0 && !generating && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#8a8074' }}>
              {drafts.filter(d => d.status === 'approved').length}/{drafts.length} approved
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={S.btnSmall} onClick={approveAll}>✓ Approve All</button>
              <button style={S.btnOutline} onClick={() => { setDrafts([]); setInputValue(''); }}>New Content</button>
            </div>
          </div>

          {drafts.map((draft, i) => (
            <div key={i} style={{ ...S.draft, ...(draft.status === 'approved' ? S.draftApproved : {}) }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ ...S.channelBadge, background: channelColors[draft.channel], color: '#fff' }}>
                    {channelIcons[draft.channel]} {draft.channel.toUpperCase()}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{draft.title}</span>
                </div>
                {draft.status === 'draft' && (
                  <button style={S.btnSmall} onClick={() => approveDraft(i)}>✓ Approve</button>
                )}
                {draft.status === 'approved' && (
                  <span style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: 700 }}>✓ APPROVED</span>
                )}
              </div>
              <pre style={S.text}>{draft.content}</pre>
            </div>
          ))}

          {drafts.every(d => d.status === 'approved') && (
            <div style={{ ...S.card, textAlign: 'center', borderColor: '#22c55e' }}>
              <p style={{ color: '#22c55e', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>
                All content approved ✓
              </p>
              <p style={{ color: '#8a8074', fontSize: '0.8125rem', marginBottom: '1rem' }}>
                In production, this publishes to DSD social, Magazine, and Radio simultaneously.
              </p>
              <button style={{ ...S.btn, background: '#22c55e' }}>
                PUBLISH TO ALL CHANNELS
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
