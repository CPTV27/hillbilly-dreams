'use client';

// apps/web/app/media/MediaNav.tsx
// Inline navigation for the Deep South Directory marketing site.
// Mirrors the bm-nav pattern from Navigation.tsx but with media-specific links
// and "Deep South / Directory" branding — without requiring 'media' as a BrandId.

import React, { useState } from 'react';

const NAV_LINKS = [
  { label: 'Directory', href: '/media/directory' },
  { label: 'Services', href: '/media/services' },
  { label: 'Pricing', href: '/media/pricing' },
  { label: 'How It Works', href: '/media/how-it-works' },
  { label: 'Our Brands', href: '/media/brands' },
  { label: 'Get Started', href: '/media/get-started', cta: true },
];

export default function MediaNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bm-nav" role="navigation" aria-label="Main navigation">
      <div className="bm-nav__inner">
        {/* Logo */}
        <a href="/media" className="bm-nav__logo" aria-label="Deep South Directory — home">
          <span className="bm-nav__logo-icon" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
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
          </span>
          <span className="bm-nav__logo-text">
            <span className="bm-nav__logo-name">Deep South</span>
            <span className="bm-nav__logo-brand">Directory</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="bm-nav__links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              {link.cta ? (
                <a href={link.href} className="btn btn--primary media-nav__cta">
                  {link.label}
                </a>
              ) : (
                <a href={link.href} className="bm-nav__link">
                  {link.label}
                </a>
              )}
            </li>
          ))}
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
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="bm-nav__mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        .media-nav__cta {
          padding: var(--space-2) var(--space-5);
          font-size: var(--text-xs);
        }
      `}</style>
    </nav>
  );
}
