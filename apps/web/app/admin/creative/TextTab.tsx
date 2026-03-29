'use client';

import { useState } from 'react';

const PRESETS = [
  { id: 'social', label: 'Social Posts', channels: 3 },
  { id: 'article', label: 'Magazine Feature', channels: 1 },
  { id: 'radio', label: 'Radio Script', channels: 1 },
  { id: 'review', label: 'Review Response', channels: 1 },
  { id: 'omnipush', label: 'All Channels', channels: 5 },
];

export function TextTab({ quality }: { quality: 'draft' | 'premium' }) {
  const [preset, setPreset] = useState('omnipush');
  const [input, setInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const generate = async () => {
    if (!input.trim()) return;
    setGenerating(true);
    setResults([]);

    try {
      const res = await fetch('/api/marketing/scout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName: input, city: 'Natchez, MS' }),
      });
      const data = await res.json();
      if (data.success) {
        const d = data.data;
        const output: string[] = [];
        if (d.socialPosts) output.push('SOCIAL POSTS:\n' + d.socialPosts.map((p: any, i: number) => `Post ${i + 1}: ${p.caption}`).join('\n\n'));
        if (d.description) output.push(`MAGAZINE FEATURE:\n${d.description}\n\nCategory: ${d.category}\nVoice: ${d.brandVoice}`);
        if (d.radioSpot) output.push(`RADIO SCRIPT:\n${d.radioSpot.script}\n\nTagline: "${d.radioSpot.tagline}"`);
        if (d.reviewResponses) output.push('REVIEW RESPONSES:\n' + d.reviewResponses.map((r: any) => `${r.response}`).join('\n\n'));
        setResults(output);
      }
    } catch {
      setResults(['Generation failed — try again.']);
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
      </div>

      {/* Input */}
      <div className="ch-section">
        <div className="ch-section-label">What&apos;s the topic?</div>
        <textarea
          className="ch-prompt"
          placeholder="A business name, event, topic, or headline..."
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={2}
        />
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button className="ch-generate" onClick={generate} disabled={generating || !input.trim()}>
            {generating ? 'Generating...' : `Generate ${preset === 'omnipush' ? 'All Channels' : PRESETS.find(p => p.id === preset)?.label}`}
          </button>
          <span style={{ fontSize: '0.7rem', color: '#5a5550' }}>
            Model: Gemini {quality === 'premium' ? '3.1 Pro' : '2.5 Flash'}
          </span>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="ch-section">
          <div className="ch-section-label">Results</div>
          {results.map((r, i) => (
            <div key={i} className="ch-preview" style={{ marginBottom: '1rem' }}>
              <pre style={{ fontSize: '0.85rem', color: '#e8e0d4', whiteSpace: 'pre-wrap', lineHeight: 1.6, margin: 0 }}>{r}</pre>
            </div>
          ))}
        </div>
      )}

      {/* Link to full Content Studio */}
      <div className="ch-section" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #2a2520' }}>
        <a href="/admin/studio" className="ch-external">
          Open Full Content Studio &rarr;
        </a>
      </div>
    </div>
  );
}
