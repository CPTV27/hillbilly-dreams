# Hardened ThemeProvider Spec
> Source: Gemini analysis, March 27, 2026
> File: apps/web/components/theme-provider.tsx

## Changes from Current

| Current | Hardened |
|:---|:---|
| Theme type is `string` | Theme type is union of valid IDs |
| No error if used outside provider | Throws if `useTheme()` called outside provider |
| localStorage key: `hdx-theme` | localStorage key: `hdi-theme-override` |
| No transition on theme change | 200ms color transition |

## Implementation

```typescript
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme =
  | 'touring' | 'magazine' | 'radio' | 'records' | 'gallery'
  | 'economics' | 'hillbilly' | 'admin' | 'mb' | 'mb-console'
  | 'dsd' | 'bm-entertainment' | 'studio' | 'tuthill';

interface ThemeContextType {
  theme: Theme;
  defaultTheme: Theme;
  setTheme: (theme: Theme) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme,
}: {
  children: React.ReactNode;
  defaultTheme: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('hdi-theme-override') as Theme;
    if (saved) setThemeState(saved);
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('hdi-theme-override', newTheme);
  };

  const resetTheme = () => {
    setThemeState(defaultTheme);
    localStorage.removeItem('hdi-theme-override');
  };

  const activeTheme = mounted ? theme : defaultTheme;

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, defaultTheme, setTheme, resetTheme }}>
      <div className={`theme-${activeTheme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
```

## Migration Notes
- Keep server-side rendering safe: use `defaultTheme` before hydration
- Don't add Tailwind classes to the wrapper div — keep it CSS-variable-only
- Dynamic CSS import (future): `import('../styles/themes/' + theme + '.css')` in useEffect
