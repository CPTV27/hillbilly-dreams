import Link from 'next/link';
import { auth } from '@/auth';

// Inline styles — Tailwind content scanner can't reach (ops) route group
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

  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif', ...theme.wrapper }}
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
