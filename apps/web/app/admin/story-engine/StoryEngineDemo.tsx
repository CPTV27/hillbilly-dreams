'use client';

import { useCallback, useState } from 'react';
import { ClipPicker } from '@/components/story-engine/ClipPicker';
import { OutlineCard } from '@/components/story-engine/OutlineCard';
import { PromptInput } from '@/components/story-engine/PromptInput';

export function StoryEngineDemo() {
  const [prompt, setPrompt] = useState('');
  const [outlineVisible, setOutlineVisible] = useState(false);

  const runFakeSubmit = useCallback(() => {
    if (!prompt.trim()) return;
    setOutlineVisible(false);
    window.setTimeout(() => setOutlineVisible(true), 650);
  }, [prompt]);

  return (
    <div
      style={{
        maxWidth: 880,
        margin: '0 auto',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
        color: 'var(--text, #f5f0eb)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          margin: '0 0 0.5rem',
          color: 'var(--accent, #f97316)',
        }}
      >
        Story Engine
      </h1>
      <p style={{ margin: '0 0 1.75rem', color: 'var(--text-muted, rgba(240,235,224,0.65))', fontSize: '0.9rem' }}>
        Prototype UI — no API, no database. Outline and clips are mock data for demo.
      </p>

      <PromptInput
        id="story-engine-prompt"
        label="What story are we telling?"
        value={prompt}
        onChange={setPrompt}
      />

      <div style={{ margin: '1rem 0 2rem' }}>
        <button
          type="button"
          onClick={runFakeSubmit}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: 8,
            border: 'none',
            background: 'var(--accent, #f97316)',
            color: 'var(--bg, #0c0b09)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          Generate outline (mock)
        </button>
      </div>

      <div style={{ marginBottom: '2.25rem', minHeight: 140, opacity: outlineVisible ? 1 : 0, transition: 'opacity 400ms ease' }}>
        {outlineVisible ? <OutlineCard /> : null}
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 0.75rem' }}>
          Clips (mock — wire to drag-and-drop later)
        </p>
        <ClipPicker />
      </div>
    </div>
  );
}
