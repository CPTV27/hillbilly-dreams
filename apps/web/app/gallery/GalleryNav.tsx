'use client';

// apps/web/app/gallery/GalleryNav.tsx
// Inline navigation for the BuyCurious Art gallery.

import React, { useState } from 'react';

const NAV_LINKS = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'Artists', href: '/gallery/artists' },
  { label: 'About', href: '/gallery/about' },
  { label: 'Sell Your Work', href: '/gallery/apply', cta: true },
];

export default function GalleryNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bm-nav" role="navigation" aria-label="Main navigation">
      <div className="bm-nav__inner">
        {/* Logo */}
        <a href="/gallery" className="bm-nav__logo" aria-label="BuyCurious Art — home">
          <span className="bm-nav__logo-text">
            <span className="bm-nav__logo-name" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
              BuyCurious
            </span>
            <span className="bm-nav__logo-brand" style={{ color: 'var(--accent)', letterSpacing: 'var(--tracking-widest)' }}>
              ART
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="bm-nav__links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              {link.cta ? (
                <a href={link.href} className="btn btn--outline" style={{ padding: '0.4rem 1rem', fontSize: 'var(--text-sm)' }}>
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
    </nav>
  );
}
