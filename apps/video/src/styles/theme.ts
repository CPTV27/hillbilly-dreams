// Brand theme constants for Outsider Economics videos
// Matches .theme-economics CSS variables

export const THEME = {
  bg: '#0f0e0d',
  surface: '#1a1918',
  accent: '#b54c4c',
  accentHover: '#c96060',
  text: '#f5f0e8',
  muted: '#a09888',
  disabled: '#666',
  border: '#2a2826',
  fontDisplay: 'Inter, system-ui, sans-serif',
  fontMono: 'JetBrains Mono, Menlo, monospace',
  fontBody: 'Inter, system-ui, sans-serif',
} as const;

// Video format presets
export const FORMATS = {
  shorts: { width: 1080, height: 1920, fps: 30, durationSec: 60 },
  youtube: { width: 1920, height: 1080, fps: 30, durationSec: 75 },
} as const;
