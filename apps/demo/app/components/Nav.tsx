// Persistent navigation — server component, no 'use client'
// Usage: <Nav currentPath="/measurably-better" />

const NAV_LINKS = [
  { label: 'Directory', href: '/directory' },
  { label: 'Platform', href: '/measurably-better' },
  { label: 'Big Muddy', href: '/big-muddy' },
  { label: 'Company', href: '/hillbilly-dreams' },
];

interface NavProps {
  currentPath?: string;
}

export default function Nav({ currentPath }: NavProps) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: 48,
        backgroundColor: '#FAFAF8',
        borderBottom: '1px solid #E5E5E0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        fontFamily: 'var(--font-inter), Inter, sans-serif',
      }}
    >
      {/* Left: logo */}
      <a
        href="/"
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: '#1A1A1A',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
          flexShrink: 0,
        }}
      >
        MB
      </a>

      {/* Right: links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        {NAV_LINKS.map((link) => {
          const isActive = currentPath === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#B45309' : '#6B7280',
                textDecoration: 'none',
                borderBottom: isActive ? '1px solid #B45309' : '1px solid transparent',
                paddingBottom: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
