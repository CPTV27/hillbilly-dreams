'use client';

import { useState } from 'react';

/* eslint-disable @next/next/no-img-element */

type Preset = {
  id: string;
  label: string;
  aspect: string | null;
  allowText?: boolean;
  allowPhotoreal?: boolean;
  hint?: string;
};

const PRESETS: Preset[] = [
  { id: 'poster', label: 'Poster', aspect: '9:16' },
  { id: 'social', label: 'Social Graphic', aspect: '1:1' },
  { id: 'illustration', label: 'Illustration', aspect: '16:9' },
  {
    id: 'mockup',
    label: 'Branded Mockup',
    aspect: '16:9',
    allowText: true,
    allowPhotoreal: true,
    hint: 'Text & typography allowed — vehicle wraps, signage, apparel, album covers, packaging.',
  },
  { id: 'enhance', label: 'Photo Enhancement', aspect: null },
];

const STYLE_PILLS: Record<string, string> = {
  'Delta Blues': 'warm golden light, blues club interior, Mississippi Delta atmosphere, intimate, worn wood and brass',
  'Juke Joint Grime': 'dark gritty juke joint, neon beer signs, raw texture, Saturday night energy',
  'Modern Editorial': 'clean editorial style, generous white space, sharp focus, magazine quality',
  'Southern Gothic': 'moody twilight, spanish moss, warm porch light, Southern atmosphere',
  'Festival Energy': 'outdoor festival, string lights, crowd silhouettes, warm sunset, celebration',
  'Woodcut / Linocut': 'editorial woodcut illustration, bold lines, hand-drawn linocut style, burnt orange and cream palette',
  'Folk Art': 'folk art illustration, naive outsider art style, hand-painted feel, warm earth tones',
  'Watercolor': 'loose watercolor illustration, warm Southern palette, editorial feel, soft brushstrokes',
};

const ENHANCE_PRESETS = ['auto', 'editorial', 'moody', 'warm', 'crisp'];

export function ImageTab({ quality }: { quality: 'draft' | 'premium' }) {
  const [preset, setPreset] = useState('poster');
  const [activePills, setActivePills] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [enhancePreset, setEnhancePreset] = useState('editorial');

  const togglePill = (pill: string) => {
    setActivePills(prev => prev.includes(pill) ? prev.filter(p => p !== pill) : [...prev, pill]);
  };

  const generate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setResult(null);

    const activePreset = PRESETS.find(p => p.id === preset);
    const allowText = activePreset?.allowText ?? false;
    const allowPhotoreal = activePreset?.allowPhotoreal ?? false;

    const styleModifiers = activePills.map(p => STYLE_PILLS[p]).filter(Boolean).join(', ');
    const textSuppression = allowText ? '' : ' — no text no words no letters';
    const fullPrompt = styleModifiers
      ? `${prompt}. ${styleModifiers}${textSuppression}`
      : `${prompt}${textSuppression}`;
    const aspectRatio = activePreset?.aspect || '16:9';

    const negatives = ['watermark'];
    if (!allowText) negatives.push('text', 'words', 'letters');
    if (!allowPhotoreal) negatives.push('photorealistic', '3d render', 'stock photo');
    const negativePrompt = negatives.join(', ');

    try {
      const res = await fetch('/api/media/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: fullPrompt,
          album: 'creative-hub',
          negativePrompt,
          aspectRatio,
        }),
      });
      const data = await res.json();
      if (data.url) setResult(data.url);
      else setResult(null);
    } catch {
      setResult(null);
    }
    setGenerating(false);
  };

  return (
    <div>
      {/* Presets */}
      <div className="ch-section">
        <div className="ch-section-label">What are you making?</div>
        <div className="ch-presets">
          {PRESETS.map(p => (
            <button key={p.id} className={`ch-preset ${preset === p.id ? 'ch-preset--active' : ''}`} onClick={() => setPreset(p.id)}>
              {p.label}
            </button>
          ))}
        </div>
        {PRESETS.find(p => p.id === preset)?.hint && (
          <div style={{ fontSize: '0.75rem', color: '#8a8074', marginTop: '0.5rem' }}>
            {PRESETS.find(p => p.id === preset)?.hint}
          </div>
        )}
      </div>

      {preset !== 'enhance' ? (
        <>
          {/* Style Pills */}
          <div className="ch-section">
            <div className="ch-section-label">Style</div>
            <div className="ch-pills">
              {Object.keys(STYLE_PILLS).map(pill => (
                <button key={pill} className={`ch-pill ${activePills.includes(pill) ? 'ch-pill--active' : ''}`} onClick={() => togglePill(pill)}>
                  {pill}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt */}
          <div className="ch-section">
            <div className="ch-section-label">Describe what you want</div>
            <textarea
              className="ch-prompt"
              placeholder="A poster for JP Houston playing at the Blues Room on Friday night..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              rows={3}
            />
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button className="ch-generate" onClick={generate} disabled={generating || !prompt.trim()}>
                {generating ? 'Generating...' : `Generate ${quality === 'premium' ? '(Premium)' : '(Draft)'}`}
              </button>
              <span style={{ fontSize: '0.7rem', color: '#5a5550' }}>
                Model: Imagen {quality === 'premium' ? '3.1' : '3.0'} &middot; {PRESETS.find(p => p.id === preset)?.aspect || '16:9'}
              </span>
            </div>
          </div>
        </>
      ) : (
        /* Enhancement Mode */
        <div className="ch-section">
          <div className="ch-section-label">Enhancement Preset</div>
          <div className="ch-presets">
            {ENHANCE_PRESETS.map(p => (
              <button key={p} className={`ch-preset ${enhancePreset === p ? 'ch-preset--active' : ''}`} onClick={() => setEnhancePreset(p)}>
                {p}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6a6560', marginBottom: '1rem' }}>
            Upload a photo, then apply the {enhancePreset} preset to improve lighting, color, and clarity.
          </p>
          <input type="file" accept="image/*" style={{ color: '#8a8074', fontSize: '0.8rem' }} />
        </div>
      )}

      {/* Result Preview */}
      {result && (
        <div className="ch-preview">
          <div className="ch-section-label">Result</div>
          <img src={result} alt="Generated image" loading="lazy" />
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <a href={result} target="_blank" rel="noopener noreferrer" className="ch-generate" style={{ textDecoration: 'none', fontSize: '0.75rem', padding: '8px 16px' }}>
              Download
            </a>
            <button className="ch-generate" style={{ background: 'transparent', color: '#c8943e', border: '1px solid #c8943e' }} onClick={() => { setResult(null); }}>
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
