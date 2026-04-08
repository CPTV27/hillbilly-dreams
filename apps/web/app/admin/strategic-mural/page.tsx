'use client';

import { useState } from 'react';

const SECTIONS = [
  {
    id: 'brand-voice',
    title: 'Brand Voice',
    icon: '🎤',
    content: {
      'Tonality': ['Direct', 'Warm', 'Honest', 'Knowledgeable', 'Irreverent', 'Analog-warm'],
      'Keywords': ['Corridor', 'Main Street', 'The river', 'The route', 'Flywheel', 'Shows', 'Sessions', 'The Inn', 'Blues Room', 'Delta Dawn'],
      'Never Say': ['Disrupt', 'Leverage', 'Synergy', 'Ecosystem (customer pages)', 'AI-powered (customer pages)', 'Innovative', 'Best-in-class'],
      'The Test': ['"If it could appear on a Salesforce landing page, rewrite it."'],
    },
  },
  {
    id: 'design-system',
    title: 'Design System',
    icon: '🎨',
    content: {
      'Palette': ['Background: #0f0f0d', 'Text: #e8e0d4', 'Accent: #c8943e', 'Surface: #1a1816', 'Border: #2a2824'],
      'Typography': ['Display: var(--font-display) — serif', 'Body: var(--font-body) — sans', 'Never hardcode fonts', 'Headings: -0.02em tracking'],
      'Rules': ['Inline CSS only (no Tailwind)', 'CSS variables for all colors', 'Mobile-first: 375px target', 'Photos: WebP, 2400px, q82'],
    },
  },
  {
    id: 'creative-styles',
    title: 'Creative Styles',
    icon: '✨',
    content: {
      'Touring': ['Dark twilight, rock & roll', 'Night shots, stage lights, neon', 'Bold serif headlines'],
      'Magazine': ['Southern Gothic editorial', 'Golden hour, moss, river, food', 'Classic editorial layout'],
      'Radio': ['Analog warmth, vinyl textures', 'Turntables, mics, waveforms'],
      'Directory': ['Clean, practical, trustworthy', 'Real storefronts, real people'],
      'Bearsville': ['Northeast studio cool', 'Recording studios, Catskills', 'Woodstock heritage'],
      'Gallery': ['Museum white, negative space', 'Let the image speak'],
    },
  },
  {
    id: 'revenue',
    title: 'Revenue Model',
    icon: '💰',
    content: {
      'Current ($160K/yr)': ['Inn: $66K', 'Touring: $36K', 'Studio C: $24K', 'Tuthill: $18K', 'Gallery: $6K', 'DSD: $10K (launching)'],
      'DSD Tiers': ['Free: $0', 'Essentials: $25/mo', 'Pro: $50/mo', 'Marketing: $99/mo', 'Engine: $250/mo'],
      'Cost Structure': ['Infrastructure: $167/mo', 'AI: $9.33/mo', 'DSD margin: 99%+'],
      'Show Multiplier': ['Every show = 2x revenue', 'Tickets + Inn + Bar + Magazine + Radio + Directory'],
    },
  },
  {
    id: 'cross-promotion',
    title: 'Cross-Promotion',
    icon: '🔄',
    content: {
      'The Flywheel': ['Touring → Records → Radio → Magazine → Directory → Inn → Touring'],
      'Show → Everything': ['Multi-cam video → YouTube/TikTok', 'Radio gets exclusive first play', 'Magazine writes feature', 'Directory promotes venue', 'Inn sells rooms'],
      'Magazine → Directory': ['City guides name 10+ businesses', 'Each gets DSD listing link', '"Featured in Big Muddy" badge'],
      'Directory → Inn': ['DSD customers get Inn discount', 'Inn guests get directory recs via Delta Dawn'],
    },
  },
  {
    id: 'demographics',
    title: 'Demographics',
    icon: '📊',
    content: {
      'Corridor Total': ['Population: 1.5M+', 'Businesses: 55,000+', 'In our DB: 5,605', '13 cities Memphis→NOLA'],
      'Natchez': ['Pop: 14,380', 'Income: $31,800', 'Poverty: 31.8%', 'Black: 62%', 'Businesses: 735'],
      'Memphis': ['Pop: 630,027', 'Income: $48,090', 'Businesses: 19,909'],
      'New Orleans': ['Pop: 380,408', 'Income: $51,116', 'Businesses: 9,909'],
      'DSD Customer Profile': ['Age: 35-65', 'Income: $30-60K', 'Facebook primary', 'Will pay $25/mo for results'],
    },
  },
  {
    id: 'targeting',
    title: 'Targeting',
    icon: '🎯',
    content: {
      'DSD Walk-In (P1)': ['Door-to-door, 5/day', '"$25/mo, we post for you"', 'Show Delta Dawn on phone', 'Lead with free, close with value'],
      'Artist Acquisition': ['Instagram DMs, open mics', '"Play our venue, keep 80%"', '2-3 new artists/month'],
      'Bearsville Operators': ["Chase's direct network", 'License MBT platform', 'They bring local, we bring tech'],
      'Real Estate Broker': ['Find one broker who gets it', 'Cinematic listings + AI staging', 'License model: $2-5K/mo'],
    },
  },
  {
    id: 'media-buying',
    title: 'Media Buying',
    icon: '📺',
    content: {
      'Current: $0': ['All organic/walk-in/word of mouth', 'Intentional — prove before scaling'],
      'Phase 1 ($500/mo)': ['Facebook/IG: 25mi around Natchez', 'Business owners 35-65', 'CPA target: $5-10/signup'],
      'Phase 2 ($2K/mo)': ['IG Reels + TikTok (boost winners)', 'Spotify Ad Studio on our playlists', 'YouTube pre-roll for property tours'],
      'Never Buy': ['LinkedIn (wrong audience)', 'Twitter/X (too noisy)', 'Programmatic display (too broad)'],
    },
  },
  {
    id: 'competitive',
    title: 'Competitive Position',
    icon: '⚔️',
    content: {
      'We Replace': ['Website: $16-40/mo', 'Social mgmt: $300-500/mo', 'Review mgmt: $399/mo', 'SEO: $500-2K/mo', 'Radio ads: $500-2K/mo', 'Total replaced: $2-8K/mo', 'Our price: $25-250/mo'],
      'Moats': ['We own the media (not rented)', '5,605 businesses with GPS/ratings', 'AI queries real DB (not hallucinate)', '$167/mo infrastructure', 'We live here'],
      'Not Competing With': ['Yelp, Google, Salesforce', 'Shopify, WordPress'],
    },
  },
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    icon: '📋',
    content: {
      'The Thesis': ['Same architecture that runs a Viacom can run a small-town economy', 'The gap is not technology — it is organization'],
      'What We Built': ['14 domains, $167/mo infra', '5,605 businesses in DB', 'AI with 10 database tools', 'Constellation: 8,548 nodes', 'Photo pipeline: phone→GCS→site', 'Siri voice integration'],
      'Next Steps': ['Code freeze April 10', 'DSD walk-in sales April', 'Bearsville activation summer', 'Real estate broker Q3', 'EmDash site builder Phase 2'],
      'Team': ['Chase: CEO/CTO/Showrunner', 'Tracy: Finance/Inn (equity)', 'Amy: Operations/Bar (equity)', 'JP: Shows & Programming', 'Miles + Elijah: Bearsville ops'],
    },
  },
];

export default function StrategicMural() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{
      background: '#0a0a08',
      minHeight: '100vh',
      padding: '40px 24px',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      color: '#e8e0d4',
    }}>
      {/* Header */}
      <header style={{
        maxWidth: '1600px',
        margin: '0 auto 48px',
        borderBottom: '2px solid #c8943e',
        paddingBottom: '24px',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 800,
          color: '#c8943e',
          letterSpacing: '-0.02em',
          margin: '0 0 8px',
          textTransform: 'uppercase',
        }}>
          Strategic Analysis Mural
        </h1>
        <p style={{
          fontSize: '0.85rem',
          color: '#6b635a',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          Hillbilly Dreams Inc — Proprietary Template v1 — Aesthetic: High-End Music Mag / Analyst Deck
        </p>
      </header>

      {/* Grid */}
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            onClick={() => setExpanded(expanded === section.id ? null : section.id)}
            style={{
              background: '#1a1816',
              border: '1px solid #2a2824',
              borderTop: '3px solid #c8943e',
              borderRadius: '4px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              gridColumn: expanded === section.id ? 'span 2' : 'span 1',
              gridRow: expanded === section.id ? 'span 2' : 'span 1',
            }}
          >
            {/* Section Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px',
              borderBottom: '1px solid #2a2824',
              paddingBottom: '12px',
            }}>
              <span style={{ fontSize: '1.2rem' }}>{section.icon}</span>
              <h2 style={{
                fontFamily: 'var(--font-display, Georgia, serif)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#c8943e',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                margin: 0,
              }}>
                {section.title}
              </h2>
            </div>

            {/* Content */}
            {Object.entries(section.content).map(([category, items]) => (
              <div key={category} style={{ marginBottom: '14px' }}>
                <h3 style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#c8943e',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  margin: '0 0 6px',
                  opacity: 0.8,
                }}>
                  {category}
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px',
                }}>
                  {items.map((item, i) => (
                    <li key={i} style={{
                      fontSize: '0.75rem',
                      color: '#b8b0a4',
                      lineHeight: 1.5,
                      paddingLeft: '10px',
                      borderLeft: '2px solid #2a2824',
                    }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        maxWidth: '1600px',
        margin: '48px auto 0',
        borderTop: '1px solid #2a2824',
        paddingTop: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.65rem',
        color: '#4a4440',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        <span>Hillbilly Dreams Inc — Confidential</span>
        <span>April 2026</span>
        <span>$167/mo Infrastructure</span>
      </footer>
    </div>
  );
}
