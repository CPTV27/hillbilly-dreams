'use client';

import { useState } from 'react';

const PRESETS = [
  { id: 'radio-promo', label: 'Radio Promo' },
  { id: 'station-id', label: 'Station ID' },
  { id: 'background-music', label: 'Background Music' },
  { id: 'voiceover', label: 'Voiceover' },
];

const VOICE_OPTIONS = [
  { id: 'delta-dawn', label: 'Delta Dawn (warm Southern woman)' },
  { id: 'catfish-carl', label: 'Catfish Carl (deep, conspiratorial)' },
  { id: 'deacon-slim', label: 'Deacon Slim (smooth soul)' },
  { id: 'miss-pearline', label: 'Miss Pearline (friendly, grandmotherly)' },
  { id: 'chase', label: 'Chase (direct, practical)' },
  { id: 'neutral-male', label: 'Neutral Male' },
  { id: 'neutral-female', label: 'Neutral Female' },
];

const MUSIC_STYLES = [
  'Delta Blues', 'Gospel', 'Soul', 'Americana', 'Jazz', 'Ambient', 'Upbeat Country', 'Funk',
];

export function AudioTab({ quality }: { quality: 'draft' | 'premium' }) {
  const [preset, setPreset] = useState('radio-promo');
  const [step, setStep] = useState(1);
  const [script, setScript] = useState('');
  const [voice, setVoice] = useState('delta-dawn');
  const [musicStyle, setMusicStyle] = useState('Delta Blues');

  const isVoicePreset = preset === 'radio-promo' || preset === 'station-id' || preset === 'voiceover';
  const isMusicPreset = preset === 'background-music';

  return (
    <div>
      {/* Presets */}
      <div className="ch-section">
        <div className="ch-section-label">What are you making?</div>
        <div className="ch-presets">
          {PRESETS.map(p => (
            <button key={p.id} className={`ch-preset ${preset === p.id ? 'ch-preset--active' : ''}`} onClick={() => { setPreset(p.id); setStep(1); }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {isVoicePreset && (
        <>
          {/* Progressive Workflow for Voice Content */}
          <div className="ch-section">
            <div className="ch-section-label">
              Step {step} of {preset === 'radio-promo' ? '4' : '2'}: {step === 1 ? 'Write the Script' : step === 2 ? 'Pick a Voice' : step === 3 ? 'Add Background Music' : 'Review & Export'}
            </div>

            {step === 1 && (
              <>
                <textarea
                  className="ch-prompt"
                  placeholder={preset === 'station-id'
                    ? "Big Muddy Radio. The voice of the Deep South. Broadcasting from Natchez."
                    : "Write your script here, or click Generate to have Gemini write one..."}
                  value={script}
                  onChange={e => setScript(e.target.value)}
                  rows={4}
                />
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button className="ch-generate" onClick={() => setStep(2)} disabled={!script.trim()}>
                    Next: Pick Voice &rarr;
                  </button>
                  <button className="ch-generate" style={{ background: 'transparent', color: '#c8943e', border: '1px solid #c8943e' }}>
                    Generate Script with Gemini
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="ch-presets">
                  {VOICE_OPTIONS.map(v => (
                    <button key={v.id} className={`ch-preset ${voice === v.id ? 'ch-preset--active' : ''}`} onClick={() => setVoice(v.id)}>
                      {v.label}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button className="ch-generate" style={{ background: 'transparent', color: '#8a8074', border: '1px solid #2a2520' }} onClick={() => setStep(1)}>
                    &larr; Back
                  </button>
                  {preset === 'radio-promo' ? (
                    <button className="ch-generate" onClick={() => setStep(3)}>
                      Next: Background Music &rarr;
                    </button>
                  ) : (
                    <button className="ch-generate">
                      Generate Voiceover
                    </button>
                  )}
                </div>
                <p style={{ fontSize: '0.7rem', color: '#5a5550', marginTop: '0.75rem' }}>
                  Model: Cloud TTS {quality === 'premium' ? 'Journey (custom voice)' : '(standard)'}
                </p>
              </>
            )}

            {step === 3 && (
              <>
                <div className="ch-pills">
                  {MUSIC_STYLES.map(s => (
                    <button key={s} className={`ch-pill ${musicStyle === s ? 'ch-pill--active' : ''}`} onClick={() => setMusicStyle(s)}>
                      {s}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button className="ch-generate" style={{ background: 'transparent', color: '#8a8074', border: '1px solid #2a2520' }} onClick={() => setStep(2)}>
                    &larr; Back
                  </button>
                  <button className="ch-generate" onClick={() => setStep(4)}>
                    Next: Review &rarr;
                  </button>
                </div>
                <p style={{ fontSize: '0.7rem', color: '#5a5550', marginTop: '0.75rem' }}>
                  Model: Lyria {quality === 'premium' ? '3 Pro' : '3 Clip'}
                </p>
              </>
            )}

            {step === 4 && (
              <div className="ch-preview">
                <div style={{ fontSize: '0.85rem', color: '#e8e0d4', lineHeight: 1.6 }}>
                  <p><strong>Script:</strong> {script}</p>
                  <p><strong>Voice:</strong> {VOICE_OPTIONS.find(v => v.id === voice)?.label}</p>
                  <p><strong>Music:</strong> {musicStyle}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button className="ch-generate" style={{ background: 'transparent', color: '#8a8074', border: '1px solid #2a2520' }} onClick={() => setStep(3)}>
                    &larr; Back
                  </button>
                  <button className="ch-generate">
                    Generate & Merge Audio
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {isMusicPreset && (
        <div className="ch-section">
          <div className="ch-section-label">Music Style</div>
          <div className="ch-pills">
            {MUSIC_STYLES.map(s => (
              <button key={s} className={`ch-pill ${musicStyle === s ? 'ch-pill--active' : ''}`} onClick={() => setMusicStyle(s)}>
                {s}
              </button>
            ))}
          </div>
          <textarea
            className="ch-prompt"
            placeholder="Describe the mood: slow blues backing track, 90 BPM, walking bass, brushed drums..."
            value={script}
            onChange={e => setScript(e.target.value)}
            rows={3}
          />
          <button className="ch-generate" disabled={!script.trim()}>
            Generate Music ({quality === 'premium' ? 'Lyria Pro' : 'Lyria Clip'})
          </button>
        </div>
      )}
    </div>
  );
}
