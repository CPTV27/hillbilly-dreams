'use client';

import { useState, useRef } from 'react';

export default function ScoutAndSell() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [data, setData] = useState<any>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [extractedName, setExtractedName] = useState('');
  const [city, setCity] = useState('Natchez, MS');
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Step 1: Capture photo (camera or gallery)
  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = (ev.target?.result as string).split(',')[1];
      setPhotoPreview(ev.target?.result as string);
      setLoading(true);
      setLoadingText('Reading sign...');
      setError(null);

      try {
        // Use Vertex AI Gemini to read the photo and extract business info
        const res = await fetch('/api/marketing/scout-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64, city }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Photo scan failed');

        setExtractedName(json.data.businessName || '');
        setData(json.data);
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Manual name entry as fallback
  const handleManualScout = async () => {
    if (!extractedName.trim()) return;
    setLoading(true);
    setLoadingText('Scouting...');
    setError(null);

    try {
      const res = await fetch('/api/marketing/scout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName: extractedName, city }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Scout failed');
      setData(json.data);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const S: Record<string, React.CSSProperties> = {
    page: { minHeight: '100vh', background: '#1a1816', color: '#f0ebe0', fontFamily: "'Inter', system-ui, sans-serif", padding: '1.25rem', maxWidth: '480px', margin: '0 auto' },
    title: { fontSize: '1.5rem', fontWeight: 800, color: '#c8943e', margin: '0 0 0.25rem' },
    sub: { fontSize: '0.75rem', color: '#8a8074', margin: '0 0 1.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' },
    captureBtn: { width: '100%', padding: '3rem 1rem', background: '#231f1c', border: '2px dashed #c8943e', borderRadius: '14px', color: '#c8943e', fontSize: '1.125rem', fontWeight: 700, cursor: 'pointer', textAlign: 'center', marginBottom: '1rem' },
    photoPreview: { width: '100%', borderRadius: '14px', marginBottom: '1rem', maxHeight: '300px', objectFit: 'cover' as const },
    input: { width: '100%', padding: '1rem', background: '#231f1c', border: '1px solid #333', borderRadius: '10px', color: '#f0ebe0', fontSize: '1.125rem', marginBottom: '0.75rem', outline: 'none', boxSizing: 'border-box' as const },
    inputSmall: { width: '100%', padding: '0.75rem 1rem', background: '#231f1c', border: '1px solid #2a2725', borderRadius: '10px', color: '#8a8074', fontSize: '0.875rem', marginBottom: '1rem', outline: 'none', boxSizing: 'border-box' as const },
    btn: { width: '100%', padding: '1.125rem', background: '#c8943e', color: '#1a1816', border: 'none', borderRadius: '10px', fontSize: '1.125rem', fontWeight: 800, cursor: 'pointer' },
    card: { background: '#231f1c', borderRadius: '14px', padding: '1.25rem', marginBottom: '1rem', borderLeft: '4px solid #c8943e' },
    cardPlain: { background: '#231f1c', borderRadius: '14px', padding: '1.25rem', marginBottom: '0.75rem' },
    label: { fontSize: '0.65rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: '0.75rem', display: 'block' },
    text: { fontSize: '0.9375rem', color: '#d4c5b0', lineHeight: 1.65, margin: '0 0 0.5rem' },
    muted: { fontSize: '0.8125rem', color: '#8a8074', lineHeight: 1.5, margin: '0' },
    dot: { width: 28, height: 28, borderRadius: '50%', border: '2px solid #333', display: 'inline-block', marginRight: 8 },
    badge: { display: 'inline-block', padding: '0.3rem 0.75rem', background: 'rgba(200,148,62,0.15)', color: '#c8943e', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, marginRight: '0.5rem', marginBottom: '0.4rem' },
    hr: { border: 'none', borderTop: '1px solid #2a2725', margin: '1.5rem 0' },
    err: { background: '#2a1515', border: '1px solid #ef4444', borderRadius: '10px', padding: '1rem', color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' },
    stars: { fontWeight: 700, letterSpacing: '2px' },
    loading: { textAlign: 'center' as const, padding: '2rem', color: '#c8943e' },
  };

  return (
    <div style={S.page}>
      <h1 style={S.title}>Deep South Directory</h1>
      <p style={S.sub}>Snap a sign. Join the network.</p>

      {/* Hidden file input for camera */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handlePhoto}
        style={{ display: 'none' }}
      />

      {!data && !loading && (
        <>
          {/* Camera capture button */}
          {!photoPreview && (
            <button style={S.captureBtn} onClick={() => fileRef.current?.click()}>
              📷<br />Tap to photograph sign or business card
            </button>
          )}

          {photoPreview && (
            <img src={photoPreview} alt="Captured" style={S.photoPreview} />
          )}

          {/* Manual fallback */}
          <p style={{ ...S.muted, textAlign: 'center', margin: '1rem 0 0.75rem' }}>or type the name</p>
          <input
            type="text"
            placeholder="Business name..."
            style={S.input}
            value={extractedName}
            onChange={(e) => setExtractedName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleManualScout()}
          />
          <input
            type="text"
            placeholder="City"
            style={S.inputSmall}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {extractedName && (
            <button style={S.btn} onClick={handleManualScout}>
              SCOUT {extractedName.toUpperCase()}
            </button>
          )}
        </>
      )}

      {loading && (
        <div style={S.loading}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem', animation: 'spin 1s linear infinite' }}>⟳</div>
          <p style={{ fontSize: '1rem', fontWeight: 600 }}>{loadingText}</p>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {error && <div style={S.err}>{error}</div>}

      {data && (
        <>
          {/* Photo preview */}
          {photoPreview && <img src={photoPreview} alt="Captured" style={{ ...S.photoPreview, marginBottom: '0.5rem' }} />}

          {/* DNA */}
          <div style={S.card}>
            <span style={S.label}>Brand DNA</span>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f0ebe0', margin: '0 0 0.5rem' }}>{data.businessName}</p>
            <p style={S.text}>{data.description}</p>
            <div style={{ margin: '0.75rem 0' }}>
              {data.primaryColors?.map((c: string) => (
                <span key={c} style={{ ...S.dot, background: c }} />
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <span style={S.badge}>{data.aestheticFlavor}</span>
              <span style={S.badge}>{data.category}</span>
              <span style={S.badge}>{data.brandVoice}</span>
            </div>
            {data.keyValueProps?.map((p: string, i: number) => (
              <p key={i} style={{ ...S.muted, marginTop: i === 0 ? '0.75rem' : '0.25rem' }}>• {p}</p>
            ))}
          </div>

          {/* Social */}
          {data.socialPosts && (
            <>
              <hr style={S.hr} />
              <span style={S.label}>3 Social Posts — Ready to Publish</span>
              {data.socialPosts.map((post: any, i: number) => (
                <div key={i} style={S.cardPlain}>
                  <p style={S.text}>{post.caption}</p>
                  <p style={S.muted}>{post.strategy}</p>
                </div>
              ))}
            </>
          )}

          {/* Radio */}
          {data.radioSpot && (
            <>
              <hr style={S.hr} />
              <div style={S.card}>
                <span style={S.label}>Radio Spot — {data.radioSpot.title}</span>
                <p style={S.text}>{data.radioSpot.script}</p>
                <p style={{ color: '#c8943e', fontWeight: 700, marginTop: '0.75rem', fontSize: '1rem' }}>
                  &ldquo;{data.radioSpot.tagline}&rdquo;
                </p>
              </div>
            </>
          )}

          {/* Reviews */}
          {data.reviewResponses && (
            <>
              <hr style={S.hr} />
              <span style={S.label}>Reputation Guardian</span>
              {data.reviewResponses.map((r: any, i: number) => (
                <div key={i} style={S.cardPlain}>
                  <span style={{ ...S.stars, color: r.rating >= 4 ? '#22c55e' : r.rating >= 3 ? '#f59e0b' : '#ef4444' }}>
                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  </span>
                  <p style={{ ...S.muted, fontStyle: 'italic', margin: '0.5rem 0' }}>&ldquo;{r.review}&rdquo;</p>
                  <p style={S.text}>↳ {r.response}</p>
                </div>
              ))}
            </>
          )}

          {/* Bottom */}
          <hr style={S.hr} />
          <p style={{ color: '#c8943e', fontSize: '0.875rem', fontWeight: 600, textAlign: 'center', marginBottom: '1rem' }}>
            This is what the Deep South Directory delivers every month.
          </p>
          <button
            style={{ ...S.btn, background: 'transparent', border: '2px solid #c8943e', color: '#c8943e' }}
            onClick={() => { setData(null); setPhotoPreview(null); setExtractedName(''); setError(null); }}
          >
            Scout Another Business
          </button>
        </>
      )}
    </div>
  );
}
