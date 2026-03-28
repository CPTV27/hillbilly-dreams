'use client';

import { useState } from 'react';

/**
 * Scout & Sell — Mobile demo page for Natchez walk-ins
 *
 * Flow: Enter URL → DNA scan → Social posts → Radio script → Calendar
 * All cascade on screen as they complete.
 *
 * Access: /admin/scout (requires admin auth via layout)
 * Theme: Dark for outdoor readability
 */

interface DNAResult {
  businessName: string;
  primaryColors: string[];
  brandVoice: string;
  keyValueProps: string[];
  targetAudience: string;
  aestheticFlavor: string;
  oneLiner: string;
  suggestedCategory: string;
}

interface SocialPost {
  caption: string;
  imagePrompt: string;
  platform: string;
  strategy: string;
}

interface RadioSpot {
  title: string;
  script: string;
  voiceDirection: string;
  tagline: string;
  callToAction: string;
}

interface ReviewDraft {
  reviewAuthor: string;
  reviewRating: number;
  reviewComment: string;
  draftResponse: string;
  sentiment: string;
}

export default function ScoutAndSell() {
  const [url, setUrl] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [dna, setDna] = useState<DNAResult | null>(null);
  const [contextKey, setContextKey] = useState<string | null>(null);
  const [social, setSocial] = useState<SocialPost[] | null>(null);
  const [radioSpot, setRadioSpot] = useState<RadioSpot | null>(null);
  const [reviews, setReviews] = useState<ReviewDraft[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiCall = async (endpoint: string, body: any) => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(err.error || `${res.status} error`);
    }
    return res.json();
  };

  const handleScan = async () => {
    if (!url || !businessName) return;
    setError(null);
    setDna(null);
    setSocial(null);
    setRadioSpot(null);
    setReviews(null);

    try {
      // Step 1: DNA Scan
      setLoading('Scanning brand identity...');
      const dnaRes = await apiCall('/api/marketing/dna', {
        websiteUrl: url,
        businessName,
      });
      setDna(dnaRes.dna);
      setContextKey(dnaRes.contextKey);

      // Step 2: Social Campaign (fire in background)
      setLoading('Generating social campaign...');
      const socialRes = await apiCall('/api/marketing/social', {
        contextKey: dnaRes.contextKey,
      });
      setSocial(socialRes.campaign);

      // Step 3: Radio Spot Script
      setLoading('Writing radio spot...');
      const radioRes = await apiCall('/api/marketing/radio-spot', {
        contextKey: dnaRes.contextKey,
      });
      setRadioSpot(radioRes.spot);

      // Step 4: Review Responses
      setLoading('Drafting review responses...');
      const reviewRes = await apiCall('/api/marketing/reviews', {
        contextKey: dnaRes.contextKey,
      });
      setReviews(reviewRes.drafts);

      setLoading(null);
    } catch (err: any) {
      setError(err.message);
      setLoading(null);
    }
  };

  const S = {
    page: { minHeight: '100vh', background: '#1a1816', color: '#f0ebe0', fontFamily: "'Inter', system-ui, sans-serif", padding: '1rem', maxWidth: '480px', margin: '0 auto' } as const,
    header: { marginBottom: '1.5rem' } as const,
    title: { fontSize: '1.75rem', fontWeight: 800, color: '#c8943e', margin: '0 0 0.25rem', letterSpacing: '-0.02em' } as const,
    subtitle: { fontSize: '0.8rem', color: '#8a8074', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' as const },
    input: { width: '100%', padding: '0.875rem 1rem', background: '#231f1c', border: '1px solid #333', borderRadius: '8px', color: '#f0ebe0', fontSize: '1rem', marginBottom: '0.75rem', outline: 'none', boxSizing: 'border-box' as const },
    button: { width: '100%', padding: '1rem', background: '#c8943e', color: '#1a1816', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em' },
    buttonDisabled: { opacity: 0.6, cursor: 'wait' },
    card: { background: '#231f1c', border: '1px solid #333', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem' } as const,
    cardAccent: { borderLeft: '4px solid #c8943e' } as const,
    label: { fontSize: '0.7rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '0.75rem', display: 'block' },
    text: { fontSize: '0.9375rem', color: '#d4c5b0', lineHeight: 1.6, margin: '0 0 0.5rem' },
    textMuted: { fontSize: '0.8125rem', color: '#8a8074', lineHeight: 1.5 },
    colorDot: { width: 24, height: 24, borderRadius: '50%', border: '2px solid #333', display: 'inline-block', marginRight: 8 },
    divider: { border: 'none', borderTop: '1px solid #333', margin: '1.5rem 0' },
    loading: { textAlign: 'center' as const, padding: '2rem', color: '#c8943e', fontSize: '0.9rem' },
    error: { background: '#3a1a1a', border: '1px solid #ef4444', borderRadius: '8px', padding: '1rem', color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' },
    badge: { display: 'inline-block', padding: '0.25rem 0.75rem', background: '#c8943e22', color: '#c8943e', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 },
    quote: { fontStyle: 'italic', fontSize: '1.125rem', color: '#f0ebe0', lineHeight: 1.5, margin: '0 0 0.5rem' },
    postCard: { background: '#1a1816', border: '1px solid #2a2725', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' },
  };

  return (
    <div style={S.page}>
      <header style={S.header}>
        <h1 style={S.title}>Scout & Sell</h1>
        <p style={S.subtitle}>Big Muddy Marketing Engine</p>
      </header>

      {/* Input */}
      {!dna && (
        <div style={S.card}>
          <span style={S.label}>New Prospect</span>
          <input
            type="text"
            placeholder="Business Name"
            style={S.input}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <input
            type="url"
            placeholder="Website URL (https://...)"
            style={S.input}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            style={{ ...S.button, ...(loading ? S.buttonDisabled : {}) }}
            onClick={handleScan}
            disabled={!!loading || !url || !businessName}
          >
            {loading || 'SCAN BUSINESS'}
          </button>
        </div>
      )}

      {error && <div style={S.error}>{error}</div>}

      {/* DNA Result */}
      {dna && (
        <div style={{ ...S.card, ...S.cardAccent }}>
          <span style={S.label}>Engine 1 — Brand DNA</span>
          <p style={S.quote}>&ldquo;{dna.brandVoice}&rdquo;</p>
          <p style={S.text}>{dna.oneLiner}</p>
          <div style={{ marginTop: '0.75rem', marginBottom: '0.5rem' }}>
            {dna.primaryColors?.map((c) => (
              <span key={c} style={{ ...S.colorDot, background: c }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <span style={S.badge}>{dna.aestheticFlavor}</span>
            <span style={S.badge}>{dna.suggestedCategory}</span>
            <span style={S.badge}>{dna.targetAudience}</span>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <span style={{ ...S.label, marginBottom: '0.5rem' }}>Value Props</span>
            {dna.keyValueProps?.map((prop, i) => (
              <p key={i} style={S.textMuted}>• {prop}</p>
            ))}
          </div>
        </div>
      )}

      {/* Social Campaign */}
      {social && (
        <>
          <hr style={S.divider} />
          <span style={S.label}>Engine 2 — Social Campaign (3 Posts)</span>
          {social.map((post, i) => (
            <div key={i} style={S.postCard}>
              <p style={{ ...S.text, marginBottom: '0.75rem' }}>{post.caption}</p>
              <p style={S.textMuted}>{post.strategy}</p>
            </div>
          ))}
        </>
      )}

      {/* Radio Spot */}
      {radioSpot && (
        <>
          <hr style={S.divider} />
          <div style={{ ...S.card, ...S.cardAccent }}>
            <span style={S.label}>Engine 3 — Radio Spot</span>
            <p style={{ fontSize: '1rem', fontWeight: 700, color: '#f0ebe0', margin: '0 0 0.75rem' }}>{radioSpot.title}</p>
            <p style={S.text}>{radioSpot.script}</p>
            <p style={{ ...S.textMuted, marginTop: '0.5rem' }}>🎙 {radioSpot.voiceDirection}</p>
            <p style={{ color: '#c8943e', fontWeight: 600, marginTop: '0.75rem', fontSize: '0.9375rem' }}>&ldquo;{radioSpot.tagline}&rdquo;</p>
          </div>
        </>
      )}

      {/* Review Responses */}
      {reviews && (
        <>
          <hr style={S.divider} />
          <span style={S.label}>Engine 4 — Reputation Guardian</span>
          {reviews.map((r, i) => (
            <div key={i} style={S.postCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#f0ebe0' }}>{r.reviewAuthor}</span>
                <span style={{ color: r.reviewRating >= 4 ? '#22c55e' : r.reviewRating >= 3 ? '#f59e0b' : '#ef4444', fontWeight: 700 }}>{'★'.repeat(r.reviewRating)}</span>
              </div>
              <p style={{ ...S.textMuted, fontStyle: 'italic', marginBottom: '0.5rem' }}>&ldquo;{r.reviewComment}&rdquo;</p>
              <p style={S.text}>↳ {r.draftResponse}</p>
            </div>
          ))}
        </>
      )}

      {/* Loading indicator for subsequent steps */}
      {loading && dna && (
        <div style={S.loading}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⟳</div>
          {loading}
        </div>
      )}

      {/* Reset */}
      {dna && !loading && (
        <div style={{ marginTop: '2rem' }}>
          <button
            style={{ ...S.button, background: 'transparent', border: '1px solid #c8943e', color: '#c8943e' }}
            onClick={() => { setDna(null); setSocial(null); setRadioSpot(null); setReviews(null); setContextKey(null); setUrl(''); setBusinessName(''); }}
          >
            New Scout
          </button>
        </div>
      )}
    </div>
  );
}
