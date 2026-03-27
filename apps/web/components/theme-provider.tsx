'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────
// Theme Provider — Runtime theme switching for multi-tenant HDX
// ─────────────────────────────────────────────────────────────
// Each route layout sets a `defaultTheme` (the curated brand look).
// Users can override via `setTheme()`, persisted to localStorage.
// The provider applies `.theme-{id}` className to its wrapper div.

const STORAGE_KEY = 'hdx-theme';

interface ThemeContextValue {
  /** Current active theme ID (e.g., 'mb', 'records', 'inn') */
  theme: string;
  /** The route's default theme (used as fallback) */
  defaultTheme: string;
  /** Switch to a different theme — persists to localStorage */
  setTheme: (themeId: string) => void;
  /** Reset to the route's default theme */
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'touring',
  defaultTheme: 'touring',
  setTheme: () => {},
  resetTheme: () => {},
});

export function ThemeProvider({
  defaultTheme,
  children,
}: {
  defaultTheme: string;
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Read saved preference on mount (client-only)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setThemeState(saved);
    setMounted(true);
  }, []);

  const setTheme = useCallback((themeId: string) => {
    setThemeState(themeId);
    localStorage.setItem(STORAGE_KEY, themeId);
  }, []);

  const resetTheme = useCallback(() => {
    setThemeState(defaultTheme);
    localStorage.removeItem(STORAGE_KEY);
  }, [defaultTheme]);

  // Use defaultTheme on server / before hydration to avoid flash
  const activeTheme = mounted ? theme : defaultTheme;

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, defaultTheme, setTheme, resetTheme }}>
      <div className={`theme-${activeTheme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
