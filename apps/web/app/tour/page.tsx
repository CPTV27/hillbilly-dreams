'use client';

import { Suspense, useEffect, useState } from 'react';

type Audience = 'partner' | 'local' | 'client' | 'google' | 'default';

const CONFIG = {
  partner: {
    hero: 'Welcome, JP',
    subtitle: 'Everything you need to review and decide, all in one place.',
    links: [
      { label: 'Review Options', desc: '4 engagement tiers — pick your level', url: 'https://bigmuddytouring.com/whiteboard' },
      { label: 'Scan2Plan Docs', desc: 'Financials and review materials', url: 'https://app.asana.com/1/1211216881488780/project/1213753731475702/task/1213862302768434' },
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
  default: {
    hero: 'The Platform',
    subtitle: 'Select your lens to begin the tour.',
    links: [
      { label: 'Partner Review', desc: 'For stakeholders and partners', url: '?audience=partner' },
      { label: 'Local Impact', desc: 'For Natchez and Main Street', url: '?audience=local' },
      { label: 'Client Tools', desc: 'For independent business owners', url: '?audience=client' },
      { label: 'Technology Stack', desc: 'For engineers and Google', url: '?audience=google' }
    ]
  }
};

function TourInterface() {
  const [audience, setAudience] = useState<Audience>('default');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const aud = urlParams.get('audience') as Audience;
      if (aud && CONFIG[aud]) {
        setAudience(aud);
      } else {
        // Fallback for JP explicitly if no params but he is the primary stakeholder today
        setAudience('partner'); 
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
