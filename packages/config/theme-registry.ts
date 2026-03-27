// packages/config/theme-registry.ts
// ─────────────────────────────────────────────────────────────
// Theme Registry — available themes for runtime switching
// ─────────────────────────────────────────────────────────────
// Each entry maps to a `.theme-{id}` class in tokens.css.
// Used by the ThemeProvider and any future theme picker UI.

export interface ThemeEntry {
  id: string;
  label: string;
  description: string;
  /** Light or dark base — useful for adjusting overlay colors */
  mode: 'light' | 'dark';
}

export const THEMES: ThemeEntry[] = [
  { id: 'mb', label: 'Editorial', description: 'Warm cream, burgundy, serif headlines', mode: 'light' },
  { id: 'mb-console', label: 'Command Center', description: 'Dark industrial dashboard', mode: 'dark' },
  { id: 'touring', label: 'Touring', description: 'Warm amber, road-worn gold', mode: 'dark' },
  { id: 'inn', label: 'Boutique Inn', description: 'Magenta & sage, offbeat opulence', mode: 'light' },
  { id: 'records', label: 'Records', description: 'Vinyl black, orange accent', mode: 'dark' },
  { id: 'radio', label: 'Radio', description: 'Midnight blue, electric blue', mode: 'dark' },
  { id: 'magazine', label: 'Magazine', description: 'Deep forest green, editorial', mode: 'dark' },
  { id: 'gallery', label: 'Gallery', description: 'Clean white museum walls', mode: 'light' },
  { id: 'gallery-funky', label: 'Gallery Funky', description: 'Hot pink maximalism', mode: 'dark' },
  { id: 'economics', label: 'Outsider Economics', description: 'Insurgent red on dark', mode: 'dark' },
  { id: 'hillbilly', label: 'Hillbilly Dreams', description: 'Iron-dark holding company', mode: 'dark' },
  { id: 'admin', label: 'Admin', description: 'High-contrast operational', mode: 'dark' },
];

export const THEME_IDS = THEMES.map(t => t.id);

export function getTheme(id: string): ThemeEntry | undefined {
  return THEMES.find(t => t.id === id);
}
