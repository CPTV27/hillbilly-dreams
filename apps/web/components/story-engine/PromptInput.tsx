'use client';

import type { CSSProperties } from 'react';

const wrap: CSSProperties = {
  width: '100%',
  maxWidth: '640px',
};

const label: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--text-muted, rgba(240, 235, 224, 0.55))',
  marginBottom: '0.5rem',
};

const textarea: CSSProperties = {
  width: '100%',
  minHeight: '120px',
  padding: '0.85rem 1rem',
  borderRadius: '10px',
  border: '1px solid color-mix(in srgb, var(--accent) 35%, transparent)',
  background: 'color-mix(in srgb, var(--bg) 92%, #000)',
  color: 'var(--text, #f5f0eb)',
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
  fontSize: '0.9375rem',
  lineHeight: 1.5,
  resize: 'vertical' as const,
  boxSizing: 'border-box',
};

export interface PromptInputProps {
  /** Mock prompt for static scaffold */
  mockValue?: string;
}

export function PromptInput({ mockValue = 'Opening night at the Blues Room. Focus on the room, not the gear.' }: PromptInputProps) {
  return (
    <div style={wrap}>
      <label htmlFor="story-prompt-mock" style={label}>
        Story prompt
      </label>
      <textarea id="story-prompt-mock" readOnly style={textarea} value={mockValue} />
    </div>
  );
}

export default PromptInput;
