'use client';

import { useState, useEffect, useCallback } from 'react';
/* eslint-disable @next/next/no-img-element */

const GCS = 'https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook';

const STYLES = [
  { id: '01-woodcut', name: 'Woodcut / Linocut', bestFor: 'Outsider Economics, Magazine', images: ['community-gathering', 'main-street-storefront', 'river-landscape'] },
  { id: '02-travel-poster', name: 'Vintage Travel Poster', bestFor: 'Touring, Inn', images: ['delta-juke-joint', 'mississippi-river-bridge', 'natchez-bluff'] },
  { id: '03-risograph', name: 'Risograph / Screen Print', bestFor: 'Radio, Records', images: ['musician-on-stage', 'radio-tower', 'vinyl-record'] },
  { id: '04-chalkboard', name: 'Chalkboard', bestFor: 'Inn bar, Entertainment', images: ['bar-menu', 'tonights-lineup', 'welcome-sign'] },
  { id: '05-botanical', name: 'Botanical Line Drawing', bestFor: 'Inn, Gallery', images: ['delta-wildflowers', 'live-oak-spanish-moss', 'magnolia-bloom'] },
  { id: '06-neon', name: 'Retro Neon', bestFor: 'Radio, Entertainment nightlife', images: ['juke-joint-entrance', 'live-music-sign', 'on-air-studio'] },
  { id: '07-letterpress', name: 'Letterpress / Broadside', bestFor: 'Magazine, Records editorial', images: ['concert-broadside', 'dispatch-header', 'poetry-broadside'] },
  { id: '08-folk-art', name: 'Folk Art / Outsider Art', bestFor: 'Economics, Gallery', images: ['community-quilt', 'marketplace', 'town-dancing'] },
  { id: '09-blueprint', name: 'Blueprint / Technical', bestFor: 'MB Console, S2PX', images: ['building-floorplan', 'dashboard-wireframe', 'data-flow'] },
  { id: '10-watercolor', name: 'Watercolor Landscape', bestFor: 'Touring, Magazine headers', images: ['cotton-field', 'river-golden-hour', 'small-town-street'] },
  { id: '11-gig-poster', name: 'Gig Poster / Concert Art', bestFor: 'Records, Entertainment', images: ['big-muddy-presents', 'blues-musician', 'guitar-headstock'] },
  { id: '12-cartographic', name: 'Map / Cartographic', bestFor: 'Touring, Directory', images: ['corridor-route', 'delta-region', 'touring-circuit'] },
];

interface Comment {
  id: number;
  style: string;
  image: string;
  text: string;
  author: string | null;
  resolved: boolean;
  createdAt: string;
}

export default function LookbookPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeComment, setActiveComment] = useState<{ style: string; image: string } | null>(null);
  const [commentText, setCommentText] = useState('');
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch('/api/lookbook/comments');
      const data = await res.json();
      setComments(data.data || []);
    } catch { /* no-op */ }
  }, []);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  const vote = (styleId: string) => {
    setVotes(prev => ({ ...prev, [styleId]: (prev[styleId] || 0) + 1 }));
  };

  const addComment = async () => {
    if (!activeComment || !commentText.trim()) return;
    setSaving(true);
    try {
      await fetch('/api/lookbook/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          style: activeComment.style,
          image: activeComment.image,
          text: commentText.trim(),
        }),
      });
      await fetchComments();
    } catch { /* no-op */ }
    setCommentText('');
    setActiveComment(null);
    setSaving(false);
  };

  const toggleResolved = async (id: number, resolved: boolean) => {
    try {
      await fetch('/api/lookbook/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, resolved: !resolved }),
      });
      await fetchComments();
    } catch { /* no-op */ }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0d', color: '#e8e0d4', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{ padding: '2rem 1.5rem 1rem', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c8943e', marginBottom: '0.5rem' }}>
          Big Muddy Brand Review
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, margin: '0 0 0.5rem', color: '#e8e0d4' }}>
          Illustration Lookbook
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#8a8074', maxWidth: 500, margin: '0 auto 1rem' }}>
          12 styles, 36 illustrations. Vote for your favorites and leave comments. Click any image to enlarge.
        </p>
        {comments.length > 0 && (
          <p style={{ fontSize: '0.75rem', color: '#6a6560' }}>
            {comments.length} comment{comments.length !== 1 ? 's' : ''} · {comments.filter(c => !c.resolved).length} unresolved
          </p>
        )}
      </header>

      {/* Styles Grid */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        {STYLES.map((style) => (
          <section key={style.id} style={{ marginBottom: '3rem' }}>
            {/* Style Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#e8e0d4' }}>
                  {style.name}
                </h2>
                <p style={{ fontSize: '0.75rem', color: '#c8943e', margin: '0.25rem 0 0' }}>
                  Best for: {style.bestFor}
                </p>
              </div>
              <button
                onClick={() => vote(style.id)}
                style={{
                  padding: '0.5rem 1.25rem',
                  background: votes[style.id] ? '#c8943e' : 'transparent',
                  color: votes[style.id] ? '#0f0f0d' : '#c8943e',
                  border: '1px solid #c8943e',
                  borderRadius: 6,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {votes[style.id] ? `Voted (${votes[style.id]})` : 'Vote for this style'}
              </button>
            </div>

            {/* Images */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {style.images.map((img) => {
                const url = `${GCS}/${style.id}/${img}.webp`;
                const imgComments = comments.filter(c => c.style === style.id && c.image === img);
                return (
                  <div key={img} style={{ position: 'relative' }}>
                    <div
                      onClick={() => setLightbox(url)}
                      style={{ cursor: 'pointer', borderRadius: 8, overflow: 'hidden', border: '1px solid #2a2520', transition: 'border-color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = '#c8943e')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2520')}
                    >
                      <img
                        src={url}
                        alt={`${style.name} — ${img.replace(/-/g, ' ')}`}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '16/10', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.375rem' }}>
                      <span style={{ fontSize: '0.7rem', color: '#6a6560' }}>{img.replace(/-/g, ' ')}</span>
                      <button
                        onClick={() => setActiveComment({ style: style.id, image: img })}
                        style={{ fontSize: '0.65rem', color: '#8a8074', background: 'none', border: '1px solid #333', borderRadius: 4, padding: '0.2rem 0.5rem', cursor: 'pointer' }}
                      >
                        Comment {imgComments.length > 0 ? `(${imgComments.length})` : ''}
                      </button>
                    </div>
                    {/* Persisted comments for this image */}
                    {imgComments.map((c) => (
                      <div
                        key={c.id}
                        style={{
                          fontSize: '0.7rem',
                          color: c.resolved ? '#5a5550' : '#8a8074',
                          background: '#1a1816',
                          borderRadius: 4,
                          padding: '0.375rem 0.5rem',
                          marginTop: '0.375rem',
                          borderLeft: `2px solid ${c.resolved ? '#3a3530' : '#c8943e'}`,
                          textDecoration: c.resolved ? 'line-through' : 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                        }}
                      >
                        <div>
                          <strong style={{ color: c.resolved ? '#5a5550' : '#c8943e' }}>{c.author || 'Anonymous'}</strong>{' '}
                          <span style={{ color: '#5a5550' }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                          <br />{c.text}
                        </div>
                        <button
                          onClick={() => toggleResolved(c.id, c.resolved)}
                          style={{
                            fontSize: '0.6rem',
                            color: c.resolved ? '#c8943e' : '#5a5550',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}
                        >
                          {c.resolved ? 'reopen' : 'resolve'}
                        </button>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* Comment Modal */}
      {activeComment && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setActiveComment(null)}>
          <div style={{ background: '#1a1816', border: '1px solid #333', borderRadius: 12, padding: '1.5rem', maxWidth: 400, width: '90%' }}
            onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem', color: '#e8e0d4' }}>
              Comment on {activeComment.image.replace(/-/g, ' ')}
            </h3>
            <textarea
              placeholder="What do you think?"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              rows={3}
              autoFocus
              style={{ width: '100%', padding: '0.5rem', background: '#0f0f0d', border: '1px solid #333', borderRadius: 6, color: '#e8e0d4', fontSize: '0.85rem', resize: 'vertical', marginBottom: '0.75rem', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setActiveComment(null)} style={{ padding: '0.5rem 1rem', background: 'transparent', color: '#8a8074', border: '1px solid #333', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>
                Cancel
              </button>
              <button
                onClick={addComment}
                disabled={saving}
                style={{ padding: '0.5rem 1rem', background: '#c8943e', color: '#0f0f0d', border: 'none', borderRadius: 6, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', opacity: saving ? 0.6 : 1 }}
              >
                {saving ? 'Saving...' : 'Post Comment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Enlarged illustration"
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
}
