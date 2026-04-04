// packages/ui/components/Footer.tsx
// Brand-aware footer component

import React from 'react';
import type { BrandId } from '@bigmuddy/config';

interface FooterProps {
  brand: BrandId;
}

const currentYear = new Date().getFullYear();

export function Footer({ brand }: FooterProps) {
  const isAdmin = brand === 'admin';

  const isEconomics = brand === 'economics';

  if (isEconomics) {
    return (
      <footer className="bm-footer">
        <div className="bm-footer__inner">
          <div className="bm-footer__brand">
            <div className="bm-footer__logo-text">
              <span className="bm-footer__logo-name">Outsider Economics</span>
              <span className="bm-footer__tagline">
                A Field Manual for Independent Economic Systems
              </span>
            </div>
            <p className="bm-footer__about">
              Coordination math, extraction analysis, and field-tested frameworks
              for building sovereign local economies. A Big Muddy media property.
            </p>
          </div>
          <div className="bm-footer__nav">
            <div className="bm-footer__nav-col">
              <h4 className="bm-footer__nav-heading">Resources</h4>
              <ul className="bm-footer__nav-list">
                <li><a href="/field-manual">Field Manual</a></li>
                <li><a href="/the-math">The Math</a></li>
                <li><a href="/community">Community</a></li>
                <li><a href="/about">About</a></li>
              </ul>
            </div>
            <div className="bm-footer__nav-col">
              <h4 className="bm-footer__nav-heading">The Network</h4>
              <ul className="bm-footer__nav-list">
                <li><a href="https://bigmuddytouring.com">Big Muddy Touring</a></li>
                <li><a href="https://bigmuddymagazine.com">Big Muddy Magazine</a></li>
                <li><a href="https://bigmuddyradio.com">Big Muddy Radio</a></li>
              </ul>
            </div>
            <div className="bm-footer__nav-col">
              <h4 className="bm-footer__nav-heading">Get the Book</h4>
              <ul className="bm-footer__nav-list">
                <li><a href="https://www.amazon.com/dp/B0F2HZBZFZ" target="_blank" rel="noopener noreferrer">Amazon</a></li>
                <li><a href="https://outsidereconomics.substack.com" target="_blank" rel="noopener noreferrer">Substack</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bm-footer__bottom">
          <p className="bm-footer__copy">
            &copy; {currentYear} Chase Tuthill Pierson. Creative Commons license.
            {' '}&middot;{' '}
            <a href="https://hillbillydreamsinc.com" className="bm-footer__mbt-link">
              Hillbilly Dreams Inc
            </a>
          </p>
          <div className="bm-footer__legal">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
        <style>{footerStyles}</style>
      </footer>
    );
  }

  if (isAdmin) {
    return (
      <footer className="bm-footer bm-footer--admin">
        <p className="bm-footer__copy">
          Big Muddy HQ — Internal use only. &copy; {currentYear} Big Muddy Touring.
        </p>
        <style>{footerStyles}</style>
      </footer>
    );
  }

  return (
    <footer className="bm-footer">
      <div className="bm-footer__inner">
        {/* Brand mark */}
        <div className="bm-footer__brand">
          <div className="bm-footer__logo-text">
            <span className="bm-footer__logo-name">Big Muddy</span>
            <span className="bm-footer__tagline">
              The Mississippi's Music Corridor
            </span>
          </div>
          <p className="bm-footer__about">
            A media-hospitality ecosystem anchored in Natchez, Mississippi. 
            Four brands. One river. One codebase.
          </p>
        </div>

        {/* Nav columns */}
        <div className="bm-footer__nav">
          <div className="bm-footer__nav-col">
            <h4 className="bm-footer__nav-heading">Explore</h4>
            <ul className="bm-footer__nav-list">
              <li><a href="https://bigmuddytouring.com">Big Muddy Touring</a></li>
              <li><a href="https://bigmuddymagazine.com">Big Muddy Magazine</a></li>
              <li><a href="https://bigmuddyradio.com">Big Muddy Radio</a></li>
              <li><a href="https://outsidereconomics.com">Outsider Economics</a></li>
            </ul>
          </div>
          <div className="bm-footer__nav-col">
            <h4 className="bm-footer__nav-heading">The Inn</h4>
            <ul className="bm-footer__nav-list">
              <li><a href="https://bigmuddytouring.com/inn">411 N Commerce St</a></li>
              <li><a href="https://bigmuddytouring.com/inn">Natchez, Mississippi</a></li>
              <li><a href="https://bigmuddytouring.com/inn">6 Suites</a></li>
              <li><a href="https://bigmuddytouring.com/route">The Route</a></li>
            </ul>
          </div>
          <div className="bm-footer__nav-col">
            <h4 className="bm-footer__nav-heading">The Route</h4>
            <ul className="bm-footer__nav-list">
              <li><a href="https://bigmuddytouring.com/route#memphis">Memphis</a></li>
              <li><a href="https://bigmuddytouring.com/route#clarksdale">Clarksdale</a></li>
              <li><a href="https://bigmuddytouring.com/route#vicksburg">Vicksburg</a></li>
              <li><a href="https://bigmuddytouring.com/route#natchez">Natchez</a></li>
              <li><a href="https://bigmuddytouring.com/route#new-orleans">New Orleans</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bm-footer__bottom">
        <p className="bm-footer__copy">
          &copy; {currentYear} Big Muddy Touring. All rights reserved.
          {' '}&middot;{' '}
          <a href="https://hillbillydreamsinc.com" className="bm-footer__mbt-link">
            Hillbilly Dreams Inc
          </a>
        </p>
        <div className="bm-footer__legal">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>

      <style>{footerStyles}</style>
    </footer>
  );
}

const footerStyles = `
  .bm-footer {
    background: var(--surface);
    border-top: 1px solid var(--border);
    margin-top: var(--space-24);
  }
  .bm-footer__inner {
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: var(--space-16) var(--space-6) var(--space-12);
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
  @media (min-width: 768px) {
    .bm-footer__inner {
      grid-template-columns: 2fr 3fr;
    }
  }
  .bm-footer__logo-name {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--text);
    letter-spacing: var(--tracking-tight);
    display: block;
  }
  .bm-footer__tagline {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--accent);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    display: block;
    margin-top: var(--space-1);
  }
  .bm-footer__about {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: var(--leading-normal);
    margin: var(--space-4) 0 0;
    max-width: 300px;
  }
  .bm-footer__nav {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
  }
  @media (max-width: 480px) {
    .bm-footer__nav {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .bm-footer__nav-heading {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 700;
    color: var(--accent);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    margin: 0 0 var(--space-4);
  }
  .bm-footer__nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  .bm-footer__nav-list a {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-muted);
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-default);
  }
  .bm-footer__nav-list a:hover {
    color: var(--text);
  }
  .bm-footer__bottom {
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: var(--space-6);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    border-top: 1px solid var(--border-subtle);
    flex-wrap: wrap;
  }
  .bm-footer__copy {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--text-disabled);
    margin: 0;
  }
  .bm-footer__legal {
    display: flex;
    gap: var(--space-4);
  }
  .bm-footer__legal a {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--text-disabled);
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-default);
  }
  .bm-footer__legal a:hover {
    color: var(--text-muted);
  }
  .bm-footer__mbt-link {
    color: var(--accent, #c8943e);
    text-decoration: none;
    transition: color var(--duration-fast, 150ms) var(--ease-default, ease);
  }
  .bm-footer__mbt-link:hover {
    color: var(--text-muted);
  }
  /* Admin footer */
  .bm-footer--admin {
    padding: var(--space-4) var(--space-6);
    margin-top: 0;
  }
  .bm-footer--admin .bm-footer__copy {
    max-width: var(--container-xl);
    margin: 0 auto;
    display: block;
    text-align: center;
  }
`;

export default Footer;
