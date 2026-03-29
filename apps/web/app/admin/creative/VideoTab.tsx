'use client';

import { useState } from 'react';

const PRESETS = [
  { id: 'promo', label: 'Promo Clip (15s)', duration: 15 },
  { id: 'loop', label: 'Ambient Loop (10s)', duration: 10 },
  { id: 'reel', label: 'Social Reel (30s)', duration: 30 },
];

const STYLE_PILLS: Record<string, string> = {
  'Cinematic': 'cinematic camera movement, dramatic lighting, professional color grade',
  'Documentary': 'handheld feel, natural lighting, authentic atmosphere',
  'Ambient': 'slow motion, atmospheric, dreamlike, soft focus transitions',
  'Energetic': 'fast cuts, dynamic movement, vibrant colors, high energy',
};

export function VideoTab({ quality }: { quality: 'draft' | 'premium' }) {
  const [preset, setPreset] = useState('promo');
  const [activePills, setActivePills] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const togglePill = (pill: string) => {
    setActivePills(prev => prev.includes(pill) ? prev.filter(p => p !== pill) : [...prev, pill]);
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
      </div>

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
        <div className="ch-section-label">Describe the video</div>
        <textarea
          className="ch-prompt"
          placeholder="A slow pan across the Mississippi River at golden hour, camera drifting past the Natchez bluff..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={3}
        />
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="ch-generate" disabled={generating || !prompt.trim()}>
            {generating ? 'Generating...' : `Generate Video ${quality === 'premium' ? '(Premium)' : '(Draft)'}`}
          </button>
          <span style={{ fontSize: '0.7rem', color: '#5a5550' }}>
            Model: Veo {quality === 'premium' ? '3.1' : '3.1 Fast'} &middot; {PRESETS.find(p => p.id === preset)?.duration}s &middot; 1080p
          </span>
        </div>
      </div>

      {/* External Tools */}
      <div className="ch-section" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #2a2520' }}>
        <div className="ch-section-label">Need timeline editing?</div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a href="https://vids.google.com" target="_blank" rel="noopener noreferrer" className="ch-external">
            Open Google Vids &rarr;
          </a>
          <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="ch-external">
            Brainstorm in Gemini &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
