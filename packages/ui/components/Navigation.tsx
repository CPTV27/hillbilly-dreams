'use client';

// packages/ui/components/Navigation.tsx
// Brand-aware navigation component

import React, { useState } from 'react';
import type { BrandId } from '@bigmuddy/config';

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

interface NavigationProps {
  brand: BrandId;
  currentPath?: string;
  links: NavLink[];
  logoHref?: string;
  showLogin?: boolean;
  loginHref?: string;
}

function BrandLogo({ brand }: { brand: BrandId }) {
  if (brand === 'admin') {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-label="Big Muddy HQ"
      >
        <rect x="4" y="4" width="24" height="24" rx="4" fill="currentColor" opacity="0.15" />
        <path d="M16 7 L25 12 L25 20 L16 25 L7 20 L7 12 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-label="Big Muddy"
    >
      {/* River wave mark */}
      <path
        d="M4 18 C8 14, 12 14, 16 18 C20 22, 24 22, 28 18 C30 16, 31 15, 32 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 23 C8 19, 12 19, 16 23 C20 27, 24 27, 28 23 C30 21, 31 20, 32 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M4 13 C8 9, 12 9, 16 13 C20 17, 24 17, 28 13"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}

export function Navigation({ brand, currentPath = '/', links, logoHref = '/', showLogin = true, loginHref = '/admin/login' }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const brandNames: Record<BrandId, { name: string; label: string }> = {
    touring: { name: 'Big Muddy', label: 'Touring' },
    magazine: { name: 'Big Muddy', label: 'Magazine' },
    radio: { name: 'Big Muddy', label: 'Radio' },
    economics: { name: 'Outsider', label: 'Economics' },
    gallery: { name: 'BuyCurious', label: 'Art' },
    records: { name: 'Big Muddy', label: 'Records' },
    hillbilly: { name: 'Hillbilly Dreams', label: 'Inc' },
    admin: { name: 'Big Muddy', label: 'HQ' },
  };

  const { name, label } = brandNames[brand];

  return (
    <nav className="bm-nav" role="navigation" aria-label="Main navigation">
      <div className="bm-nav__inner">
        <a href={logoHref} className="bm-nav__logo" aria-label={`${name} ${label} — home`}>
          <span className="bm-nav__logo-icon" style={{ color: 'var(--accent)' }}>
            <BrandLogo brand={brand} />
          </span>
          <span className="bm-nav__logo-text">
            <span className="bm-nav__logo-name">{name}</span>
            <span className="bm-nav__logo-brand">{label}</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="bm-nav__links" role="list">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`bm-nav__link ${currentPath === link.href ? 'bm-nav__link--active' : ''}`}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
          {showLogin && (
            <li>
              <a href={loginHref} className="bm-nav__login">Sign In</a>
            </li>
          )}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="bm-nav__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="bm-nav__mobile">
          <ul role="list">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`bm-nav__mobile-link ${currentPath === link.href ? 'bm-nav__mobile-link--active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {showLogin && (
              <li>
                <a href={loginHref} className="bm-nav__mobile-link" onClick={() => setMenuOpen(false)}>
                  Sign In
                </a>
              </li>
            )}
          </ul>
        </div>
      )}

      <style>{`
        .bm-nav {
          position: sticky;
          top: 0;
          z-index: var(--z-nav);
          background: rgba(26, 24, 22, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
        }
        .bm-nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-4) var(--space-6);
          gap: var(--space-8);
        }
        .bm-nav__logo {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          text-decoration: none;
          flex-shrink: 0;
        }
        .bm-nav__logo-icon {
          display: flex;
          align-items: center;
        }
        .bm-nav__logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .bm-nav__logo-name {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
        }
        .bm-nav__logo-brand {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-top: 1px;
        }
        .bm-nav__links {
          display: flex;
          align-items: center;
          gap: var(--space-6);
          list-style: none;
          margin: 0;
          padding: 0;
        }
        @media (max-width: 768px) {
          .bm-nav__links { display: none; }
        }
        .bm-nav__link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          padding: var(--space-2) 0;
          transition: color var(--duration-fast) var(--ease-default);
          position: relative;
        }
        .bm-nav__link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--accent);
          transform: scaleX(0);
          transition: transform var(--duration-normal) var(--ease-spring);
        }
        .bm-nav__link:hover,
        .bm-nav__link--active {
          color: var(--text);
        }
        .bm-nav__link:hover::after,
        .bm-nav__link--active::after {
          transform: scaleX(1);
        }
        .bm-nav__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-2);
        }
        @media (max-width: 768px) {
          .bm-nav__hamburger { display: flex; }
        }
        .bm-nav__hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text);
          transition: all var(--duration-fast) var(--ease-default);
        }
        .bm-nav__mobile {
          background: var(--surface);
          border-top: 1px solid var(--border);
          padding: var(--space-4) var(--space-6);
        }
        .bm-nav__mobile ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .bm-nav__mobile-link {
          display: block;
          padding: var(--space-3) 0;
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          border-bottom: 1px solid var(--border-subtle);
          transition: color var(--duration-fast) var(--ease-default);
        }
        .bm-nav__mobile-link:hover,
        .bm-nav__mobile-link--active {
          color: var(--accent);
        }
        .bm-nav__login {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--bg);
          background: var(--accent);
          padding: var(--space-2) var(--space-4);
          border-radius: 4px;
          text-decoration: none;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          transition: opacity var(--duration-fast) var(--ease-default);
        }
        .bm-nav__login:hover {
          opacity: 0.85;
        }
      `}</style>
    </nav>
  );
}

export default Navigation;
