'use client';

import { Suspense, useEffect, useState } from 'react';

type Audience = 'partner' | 'local' | 'client' | 'google' | 'aggressive' | 'default';

const CONFIG = {
  partner: {
    hero: 'Welcome, JP',
    subtitle: 'Everything you need to review and decide, all in one place.',
    links: [
      { label: 'Review Options', desc: '4 engagement tiers — pick your level', url: 'https://bigmuddytouring.com/whiteboard' },
      { label: 'Asana Project', desc: 'Financials and review materials', url: 'https://app.asana.com/1/1211216881488780/project/1213753731475702' },
      { label: 'Mission Control', desc: 'Access the main admin dashboard', url: 'https://bigmuddytouring.com/admin/dashboard' },
      { label: 'Your Asana Board', desc: 'Tasks, to-dos, and timeline', url: 'https://app.asana.com' }
    ]
  },
  local: {
    hero: 'Natchez First',
    subtitle: 'A crawl, walk, run approach to rebuilding local ecosystems.',
    links: [
      { label: 'Crawl: The Directory', desc: 'Phase 1: Map and verify every business (Deep South Directory)', url: 'https://deepsouthdirectory.com' },
      { label: 'Walk: The Voice', desc: 'Phase 2: Engage the community with media (Big Muddy Radio)', url: 'https://bigmuddyradio.com' },
      { label: 'Run: The Platform', desc: 'Phase 3: Upgrade owners to the OS (Measurably Better)', url: 'https://measurablybetter.life' },
      { label: 'The Math', desc: 'Unit economics and margin retention for Main Street', url: 'https://outsidereconomics.com/the-math' }
    ]
  },
  aggressive: {
    hero: 'The Big Muddy Ecosystem',
    subtitle: 'A scalable flywheel of media, real estate, and enterprise software.',
    links: [
      { label: 'Ecosystem Flywheel', desc: 'Org chart, revenue, and intelligence', url: 'https://bigmuddytouring.com/admin/ecosystem' },
      { label: 'The Math', desc: 'The unit economics of Main Street', url: 'https://outsidereconomics.com/the-math' },
      { label: 'Demo Deck', desc: '10-slide presentation overview', url: 'https://bigmuddytouring.com/demo-deck.html' }
    ]
  },
  client: {
    hero: 'Measurably Better',
    subtitle: 'Run your business, not your software. All your tools in one place.',
    links: [
      { label: 'The Pitch', desc: 'See what $99/month gets you', url: 'https://measurablybetter.life' },
      { label: 'Deep South Directory', desc: 'View local listings and networks', url: 'https://deepsouthdirectory.com' },
      { label: 'Creative Hub', desc: 'Generate social media, articles, and art', url: 'https://bigmuddytouring.com/admin/creative' }
    ]
  },
  google: {
    hero: 'Enterprise Grade',
    subtitle: 'Built on Google Cloud. Powered by Vertex AI.',
    links: [
      { label: 'Architecture Blueprint', desc: 'How the Google Cloud infrastructure scales', url: 'https://bigmuddytouring.com/platform/architecture' },
      { label: 'Creative Hub', desc: 'Powered by Vertex AI Imagen & Gemini', url: 'https://bigmuddytouring.com/admin/creative' },
      { label: 'Ecosystem Dashboard', desc: 'The full stack mapped out', url: 'https://bigmuddytouring.com/admin/ecosystem' }
    ]
  },
  team: {
    hero: 'Welcome to Hillbilly Dreams',
    subtitle: 'A guided tour of everything we built — click each link, look around, come back for the next one.',
    links: [
      { label: '1. HDI Portfolio', desc: 'The holding company — all our brands on one page', url: 'https://hillbillydreamsinc.com' },
      { label: '2. Deep South Directory', desc: 'What we sell to businesses — 5 tiers, walk-in sales', url: 'https://deepsouthdirectory.com' },
      { label: '3. Big Muddy Touring', desc: 'The flagship — shows, the Inn, the route', url: 'https://bigmuddytouring.com' },
      { label: '4. Big Muddy Magazine', desc: 'Editorial that features DSD businesses and artists', url: 'https://bigmuddymagazine.com' },
      { label: '5. Big Muddy Radio', desc: 'Live stream from the Inn, show archives', url: 'https://bigmuddyradio.com' },
      { label: '6. Big Muddy Entertainment', desc: 'Record label + promoter — artists own their masters', url: 'https://bigmuddyentertainment.com' },
      { label: '7. Big Muddy Records', desc: 'The label — distribution, sync, artist profiles', url: 'https://bigmuddyrecord.com' },
      { label: '8. Bearsville Creative', desc: 'Northeast node — Utopia Studios, Woodstock NY (summer activation)', url: 'https://bearsvillemediagroup.com' },
      { label: '9. Outsider Economics', desc: 'The field manual — how local economies actually work', url: 'https://outsidereconomics.com' },
      { label: '10. Sovereign Pi Store', desc: 'NEW: A computer for your business — free with membership', url: 'https://bigmuddytouring.com/store/sovereign-pi' },
      { label: '11. HQ Dashboard', desc: 'Your daily check-in — valuation, timeline, team', url: 'https://bigmuddytouring.com/admin/hq' },
      { label: '12. All Links', desc: 'Every admin page, tool, and service on one screen', url: 'https://bigmuddytouring.com/admin/links' },
      { label: '13. Walk-In Flyer', desc: 'Print this — the sales one-pager for walk-in visits', url: 'https://bigmuddytouring.com/sandbox/dsd-flyer.html' },
      { label: '14. Org Chart', desc: 'Who we are — brands, team, partners', url: 'https://bigmuddytouring.com/hillbilly/org-chart' },
      { label: '15. Your Asana Tasks', desc: 'Open Asana — your tasks for this week are ready', url: 'https://app.asana.com' }
    ]
  },
  default: {
    hero: 'The Platform',
    subtitle: 'Select your lens to begin the tour.',
    links: [
      { label: 'Team Walkthrough', desc: 'For Tracy, Amy, and the team', url: '?audience=team' },
      { label: 'Partner Review', desc: 'For stakeholders and partners', url: '?audience=partner' },
      { label: 'Local Impact', desc: 'For Natchez and Main Street', url: '?audience=local' },
      { label: 'Scalable Model', desc: 'For ecosystem scale', url: '?audience=aggressive' },
      { label: 'Technology Stack', desc: 'For engineers and Google', url: '?audience=google' }
    ]
  }
};

function TourInterface() {
  const [audience, setAudience] = useState<Audience>('default');
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const aud = urlParams.get('audience') as Audience;
      
      if (aud && CONFIG[aud]) {
        // If an explicit URL parameter is provided, respect it
        setAudience(aud);
        setIsTestMode(false);
      } else {
        // INTERNAL A/B TESTING ENVIRONMENT
        setIsTestMode(true);
        const savedVariant = localStorage.getItem('bmt_ab_test_variant') as Audience;
        
        if (savedVariant && (savedVariant === 'local' || savedVariant === 'aggressive')) {
          setAudience(savedVariant);
        } else {
          // 50/50 randomized split
          const newVariant = Math.random() > 0.5 ? 'aggressive' : 'local';
          localStorage.setItem('bmt_ab_test_variant', newVariant);
          setAudience(newVariant);
        }
      }
    }
  }, []);

  const content = CONFIG[audience] || CONFIG.partner;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a08',
      color: '#e8e0d4',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '4rem 2rem'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        
        {/* A/B Testing Indicator */}
        {isTestMode && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            border: '1px solid #c8943e',
            backgroundColor: '#c8943e15',
            color: '#c8943e',
            padding: '0.4rem 1rem',
            borderRadius: '100px',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Internal A/B Test Variant: {audience}
          </div>
        )}

        {/* Cinematic Header */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 6vw, 5rem)', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            margin: '0 0 1rem 0',
            letterSpacing: '-0.02em',
            color: '#ffffff'
          }}>
            {content.hero}
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', 
            color: '#c8943e', // Gold accent
            margin: 0,
            fontWeight: 500
          }}>
            {content.subtitle}
          </p>
        </div>

        {/* Massive Button Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem' 
        }}>
          {content.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              style={{
                display: 'block',
                padding: '3rem 2rem',
                backgroundColor: '#151412',
                border: '1px solid #2a2520',
                borderRadius: '16px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#c8943e';
                e.currentTarget.style.backgroundColor = '#1a1816';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = '#2a2520';
                e.currentTarget.style.backgroundColor = '#151412';
              }}
            >
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 700, 
                color: '#ffffff', 
                margin: '0 0 0.5rem 0' 
              }}>
                {link.label}
              </h2>
              <p style={{ 
                fontSize: '1.25rem', 
                color: '#8a8074', 
                margin: 0,
                lineHeight: 1.4
              }}>
                {link.desc}
              </p>
            </a>
          ))}
        </div>

        {/* Google Trust Badge */}
        <div style={{ 
          marginTop: '6rem', 
          textAlign: 'center', 
          opacity: 0.5,
          fontSize: '0.85rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          Built on Google Cloud Environment
        </div>
      </div>
    </div>
  );
}

export default function TourPage() {
  return (
    <Suspense fallback={<div style={{ background: '#0a0a08', height: '100vh' }} />}>
      <TourInterface />
    </Suspense>
  );
}
