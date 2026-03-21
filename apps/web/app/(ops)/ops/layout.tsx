import Link from 'next/link';
import { auth } from '@/auth';

// Deep theme tokens — CSS custom properties consumed by child pages
const DEEP_TOKENS = {
  futuristic: {
    '--theme-card-bg': 'rgba(255,255,255,0.05)',
    '--theme-card-border': 'rgba(255,255,255,0.1)',
    '--theme-text-primary': '#e8e8f0',
    '--theme-text-secondary': '#94a3b8',
    '--theme-text-muted': '#64748b',
    '--theme-accent': '#60a5fa',
    '--theme-accent-bg': 'rgba(59,130,246,0.15)',
    '--theme-success': '#34d399',
    '--theme-warning': '#fbbf24',
    '--theme-progress-bg': 'rgba(255,255,255,0.1)',
    '--theme-progress-fill': '#60a5fa',
    '--theme-hover': 'rgba(255,255,255,0.08)',
  },
  retro: {
    '--theme-card-bg': '#f5f0e8',
    '--theme-card-border': '#c4b89c',
    '--theme-text-primary': '#2c2416',
    '--theme-text-secondary': '#6b5d4a',
    '--theme-text-muted': '#8a7d6b',
    '--theme-accent': '#8b4513',
    '--theme-accent-bg': 'rgba(139,69,19,0.1)',
    '--theme-success': '#2d6a4f',
    '--theme-warning': '#b8860b',
    '--theme-progress-bg': '#d4c5a0',
    '--theme-progress-fill': '#8b4513',
    '--theme-hover': 'rgba(0,0,0,0.04)',
  },
  minimal: {
    '--theme-card-bg': '#ffffff',
    '--theme-card-border': '#e5e5e5',
    '--theme-text-primary': '#171717',
    '--theme-text-secondary': '#525252',
    '--theme-text-muted': '#a3a3a3',
    '--theme-accent': '#b45309',
    '--theme-accent-bg': 'rgba(180,83,9,0.08)',
    '--theme-success': '#16a34a',
    '--theme-warning': '#d97706',
    '--theme-progress-bg': '#e5e5e5',
    '--theme-progress-fill': '#f59e0b',
    '--theme-hover': 'rgba(0,0,0,0.03)',
  },
};

// Layout chrome styles
const THEME_CONFIG = {
  futuristic: {
    wrapper: { backgroundColor: '#0a0a0f', color: '#e8e8f0' },
    header: { backgroundColor: 'rgba(10,10,15,0.8)', borderColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)' },
    logo: { backgroundColor: 'rgba(59,130,246,0.2)', color: '#93c5fd' },
    navLink: { color: '#94a3b8' },
    navActive: { color: '#60a5fa' },
    userName: { color: '#cbd5e1' },
  },
  retro: {
    wrapper: { backgroundColor: '#f5f0e8', color: '#2c2416' },
    header: { backgroundColor: '#e8e0d0', borderColor: '#c4b89c' },
    logo: { backgroundColor: '#d4c5a0', color: '#4a3f2f' },
    navLink: { color: '#6b5d4a' },
    navActive: { color: '#8b4513' },
    userName: { color: '#4a3f2f' },
  },
  minimal: {
    wrapper: { backgroundColor: '#fafaf9', color: '#171717' },
    header: { backgroundColor: '#ffffff', borderColor: '#e5e5e5' },
    logo: { backgroundColor: '#fffbeb', color: '#78350f' },
    navLink: { color: '#525252' },
    navActive: { color: '#b45309' },
    userName: { color: '#404040' },
  },
};

export default async function OpsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user as any;
  const interfaceTheme = user?.interfaceTheme || 'minimal';

  const theme = THEME_CONFIG[interfaceTheme as keyof typeof THEME_CONFIG] || THEME_CONFIG.minimal;
  const tokens = DEEP_TOKENS[interfaceTheme as keyof typeof DEEP_TOKENS] || DEEP_TOKENS.minimal;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'system-ui, sans-serif',
        ...theme.wrapper,
        ...tokens,
      } as React.CSSProperties}
    >
      <header
        style={{
          borderBottom: `1px solid ${theme.header.borderColor}`,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          padding: '0.75rem 1rem',
          ...theme.header,
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link
              href="/ops"
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                padding: '0.25rem 0.75rem',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                ...theme.logo,
              }}
            >
              Ops
            </Link>

            <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
              <Link href="/ops" style={{ textDecoration: 'none', ...theme.navLink }}>Dashboard</Link>
              <Link href="/ops/tasks" style={{ textDecoration: 'none', ...theme.navLink }}>All Tasks</Link>
              <Link href="/ops/content" style={{ textDecoration: 'none', ...theme.navLink }}>Content</Link>
              <Link href="/ops/chat" style={{ textDecoration: 'none', ...theme.navLink }}>Delta Dawn</Link>
              <Link href="/ops/property" style={{ textDecoration: 'none', ...theme.navLink }}>Property</Link>
              <Link href="/ops/reviews" style={{ textDecoration: 'none', ...theme.navLink }}>Reviews</Link>
              <Link href="/ops/settings" style={{ textDecoration: 'none', ...theme.navLink }}>Settings</Link>
              <Link href="/ops/amy" style={{ textDecoration: 'none', ...theme.navActive }}>Amy</Link>
            </nav>
          </div>

          <div style={{ fontSize: '0.875rem', fontWeight: 500, ...theme.userName }}>
            {user?.name || user?.email || 'Guest'}
          </div>
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: '80rem', width: '100%', margin: '0 auto', padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
}
