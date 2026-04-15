'use client';

import type { CSSProperties } from 'react';

const wrap: CSSProperties = {
  width: '100%',
  maxWidth: '640px',
};

const labelStyle: CSSProperties = {
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
  /** Static demo copy when not editing */
  mockValue?: string;
  /** Controlled value (when set with onChange, field is editable) */
  value?: string;
  onChange?: (value: string) => void;
  /** Label — defaults to “Story prompt” */
  label?: string;
  id?: string;
}

export function PromptInput({
  mockValue = 'Opening night at the Blues Room. Focus on the room, not the gear.',
  value,
  onChange,
  label = 'Story prompt',
  id = 'story-prompt-mock',
}: PromptInputProps) {
  const controlled = value !== undefined && onChange !== undefined;
  const displayValue = controlled ? value : mockValue;

  return (
    <div style={wrap}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <textarea
        id={id}
        readOnly={!controlled}
        style={textarea}
        value={displayValue}
        onChange={controlled ? (e) => onChange(e.target.value) : undefined}
      />
    </div>
  );
}

export default PromptInput;
