'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

/* eslint-disable @next/next/no-img-element */

type View = 'story' | 'flywheel' | 'tenants' | 'personnel' | 'org' | 'revenue' | 'tech' | 'architecture' | 'links' | 'jp';

const VIEWS: { id: View; label: string; color: string }[] = [
  { id: 'links', label: '🔗 All Links', color: '#ffffff' },
  { id: 'story', label: 'The Story', color: '#c8943e' },
  { id: 'flywheel', label: 'Flywheel', color: '#22c55e' },
  { id: 'tenants', label: 'Tenants', color: '#3b82f6' },
  { id: 'personnel', label: 'Personnel + AI', color: '#8b5cf6' },
  { id: 'org', label: 'Org Chart', color: '#ec4899' },
  { id: 'revenue', label: 'Revenue', color: '#f97316' },
  { id: 'jp', label: 'JP Options', color: '#22c55e' },
  { id: 'tech', label: 'Tech Stack', color: '#eab308' },
  { id: 'architecture', label: 'Blueprint', color: '#ef4444' },
];

function StoryView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
        Global media architecture.<br />
        <span style={{ color: '#c8943e' }}>Applied to Main Street.</span>
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontSize: '1.1rem', lineHeight: 1.7, color: '#a8a098' }}>
        <div>
          <p>In 2000, Chase was the production engineer who brought Democracy Now to television. It became the largest independently produced and distributed TV news show in the world.</p>
          <p>He built the CyberCar with Oscar-nominated director Jon Alpert — a mobile broadcast studio with 15 cameras and a satellite uplink.</p>
          <p>He launched Hollywood Today Live on FOX. Advised Disney, Microsoft, and NBCU on video infrastructure at Kaltura. Ran Microsoft&apos;s esports broadcast studio.</p>
        </div>
        <div>
          <p>In 2022, he drew a diagram — a complete media production-to-distribution pipeline using open source tools. He realized the same architecture that runs global media can run a small-town economy.</p>
          <p style={{ color: '#c8943e', fontWeight: 600, fontSize: '1.2rem' }}>Big Muddy is that diagram, built and running in Natchez, Mississippi.</p>
          <p>15 domains. 18 radio shows. 4 tenants. AI handles 70-90% of every role. 3 humans run the whole thing.</p>
          <p>Now deploying to Woodstock, NY. Any town is next.</p>
        </div>
      </div>
    </div>
  );
}

function FlywheelView() {
  const nodes = [
    { label: 'Live Shows', metric: '12/mo', color: '#c8943e' },
    { label: 'Audience', metric: 'In the room', color: '#22c55e' },
    { label: 'Bar Revenue', metric: '$300-500/night', color: '#3b82f6' },
    { label: 'Content', metric: '4 channels per show', color: '#8b5cf6' },
    { label: 'Media Distribution', metric: 'Magazine + Radio + Social', color: '#ec4899' },
    { label: 'Discovery', metric: 'Tourists find us', color: '#f97316' },
    { label: 'Directory Revenue', metric: '$25-250/mo per business', color: '#c8943e' },
    { label: 'Reinvestment', metric: 'Better shows', color: '#22c55e' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, padding: '1rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>The Flywheel</h2>
      {nodes.map((n, i) => (
        <div key={n.label}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem 2rem', background: `${n.color}10`, border: `1px solid ${n.color}40`, borderRadius: 12, minWidth: 500 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: n.color, boxShadow: `0 0 12px ${n.color}60` }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 700, flex: 1 }}>{n.label}</span>
            <span style={{ fontSize: '1rem', color: n.color, fontWeight: 700 }}>{n.metric}</span>
          </div>
          {i < nodes.length - 1 && <div style={{ textAlign: 'center', fontSize: '1.5rem', color: '#2a2520', padding: '0.25rem 0' }}>↓</div>}
        </div>
      ))}
      <div style={{ fontSize: '1.5rem', color: '#c8943e', fontWeight: 800, marginTop: '0.5rem' }}>↻ Repeat</div>
    </div>
  );
}

function TenantsView() {
  const tenants = [
    { name: 'Big Muddy', location: 'Natchez, MS', status: 'Live', color: '#c8943e', domains: '12 domains', desc: 'Hotel, venue, magazine, radio, directory, records, gallery' },
    { name: 'Bearsville Creative', location: 'Woodstock, NY', status: 'Deploying', color: '#8B6914', domains: '1 domain', desc: 'Directory, radio, magazine, studio — WiFi campus broadcast' },
    { name: 'Studio C', location: 'Woodstock, NY', status: 'Configuring', color: '#4A90D9', domains: '3 domains', desc: 'Video production, recording studio, broadcasting' },
    { name: 'Tuthill Design', location: 'Woodstock, NY', status: 'Configuring', color: '#2D5F2D', domains: '1 domain', desc: 'Photography, print sales, client portals' },
  ];
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>4 Tenants, One Codebase</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {tenants.map(t => (
          <div key={t.name} style={{ background: `${t.color}08`, border: `2px solid ${t.color}40`, borderRadius: 16, padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: t.color, margin: 0 }}>{t.name}</h3>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: t.status === 'Live' ? '#22c55e' : '#eab308' }}>{t.status}</span>
            </div>
            <p style={{ fontSize: '1rem', color: '#8a8074', margin: '0 0 0.5rem' }}>{t.location} &middot; {t.domains}</p>
            <p style={{ fontSize: '1rem', color: '#a8a098', margin: 0 }}>{t.desc}</p>
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.1rem', color: '#c8943e', fontWeight: 600 }}>
        One git push updates all four tenants simultaneously.
      </p>
    </div>
  );
}

function PersonnelView() {
  const roles = [
    { role: 'Social Media', trad: '$3,500/mo', ai: 90, setup: 'Content Studio + Postiz' },
    { role: 'Review Manager', trad: '$2,000/mo', ai: 95, setup: 'Delta Dawn + AI Drafts' },
    { role: 'Radio DJs (18 shows)', trad: '$15,000/mo', ai: 100, setup: 'OpenBroadcaster' },
    { role: 'Photographer', trad: '$4,000/mo', ai: 40, setup: 'Chase + Imagen' },
    { role: 'Web Developer', trad: '$8,000/mo', ai: 95, setup: 'Claude Code Agents' },
    { role: 'Magazine Editor', trad: '$4,000/mo', ai: 80, setup: 'Gemini + Scout API' },
    { role: 'Marketing Director', trad: '$6,000/mo', ai: 70, setup: 'Multi-Model AI' },
    { role: 'Booking Agent', trad: '$3,000/mo', ai: 60, setup: 'JP + Content Studio' },
    { role: 'Bookkeeper', trad: '$2,000/mo', ai: 30, setup: 'Tracy + QuickBooks' },
    { role: 'Front Desk', trad: '$2,500/mo', ai: 50, setup: 'Amy + Delta Dawn' },
  ];
  return (
    <div style={{ padding: '1rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Personnel + AI</h2>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>$50K/mo</div><div style={{ fontSize: '0.8rem', color: '#6a6560' }}>Traditional</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: '2rem', fontWeight: 800, color: '#22c55e' }}>3 humans</div><div style={{ fontSize: '0.8rem', color: '#6a6560' }}>Our Team</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: '2rem', fontWeight: 800, color: '#c8943e' }}>$500/mo</div><div style={{ fontSize: '0.8rem', color: '#6a6560' }}>AI Cost</div></div>
        </div>
      </div>
      {roles.map(r => (
        <div key={r.role} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 1fr 80px', gap: '1rem', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid #1a1816' }}>
          <span style={{ fontSize: '1rem', fontWeight: 600 }}>{r.role}</span>
          <span style={{ fontSize: '0.9rem', color: '#ef4444' }}>{r.trad}</span>
          <span style={{ fontSize: '0.9rem', color: '#c8943e' }}>{r.setup}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 60, height: 8, background: '#1a1816', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${r.ai}%`, height: '100%', background: r.ai >= 80 ? '#22c55e' : r.ai >= 50 ? '#c8943e' : '#3b82f6', borderRadius: 4 }} />
            </div>
            <span style={{ fontSize: '0.8rem', color: '#6a6560' }}>{r.ai}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function OrgView() {
  const divs = [
    { name: 'Big Muddy Touring', sub: 'Inn, Blues Room, Tours', color: '#3b82f6' },
    { name: 'Big Muddy Media', sub: 'Magazine, Radio, Records', color: '#8b5cf6' },
    { name: 'Big Muddy Entertainment', sub: 'Rise Up, Talent Search', color: '#ec4899' },
    { name: 'Deep South Directory', sub: 'Free / $25 / $50 / $99 / $250', color: '#22c55e' },
    { name: 'Outsider Economics', sub: 'Philosophy, Toolkit, Resources', color: '#f97316' },
    { name: 'Venture Gallery', sub: 'Photography, Marketplace', color: '#eab308' },
  ];
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div style={{ padding: '1.5rem', border: '2px solid #c8943e', borderRadius: 16, display: 'inline-block', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c8943e', margin: 0 }}>Hillbilly Dreams Inc</h2>
        <p style={{ fontSize: '0.9rem', color: '#6a6560', margin: '0.25rem 0 0' }}>Holding Company</p>
      </div>
      <div style={{ fontSize: '2rem', color: '#2a2520' }}>│</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: 900, margin: '0 auto' }}>
        {divs.map(d => (
          <div key={d.name} style={{ padding: '1.25rem', border: `1px solid ${d.color}40`, borderRadius: 12, background: `${d.color}08`, textAlign: 'left' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, marginBottom: '0.5rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem' }}>{d.name}</h3>
            <p style={{ fontSize: '0.85rem', color: '#6a6560', margin: 0 }}>{d.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueView() {
  const streams = [
    { name: 'DSD Subscriptions', type: 'Recurring', range: '$25-250/mo per business', color: '#22c55e' },
    { name: 'Room Bookings', type: 'Transactional', range: '$125-175/night × 6 suites', color: '#3b82f6' },
    { name: 'Bar Revenue', type: 'Transactional', range: '$300-500/show night', color: '#3b82f6' },
    { name: 'Print Sales', type: 'Transactional', range: '$150-450 per print', color: '#3b82f6' },
    { name: 'Show Tickets', type: 'Transactional', range: '$10-25', color: '#3b82f6' },
    { name: 'Stock Photography', type: 'Licensing', range: 'Per license', color: '#8b5cf6' },
    { name: 'Platform Licensing', type: 'Licensing', range: 'Per tenant', color: '#8b5cf6' },
    { name: 'Tourism Board', type: 'Grant', range: 'Applied', color: '#f97316' },
    { name: 'Arts Council', type: 'Grant', range: 'Applied', color: '#f97316' },
  ];
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Revenue Streams</h2>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {streams.map(s => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1.25rem', background: '#1a1816', borderRadius: 8, borderLeft: `4px solid ${s.color}` }}>
            <span style={{ flex: 1, fontSize: '1.1rem', fontWeight: 600 }}>{s.name}</span>
            <span style={{ fontSize: '0.85rem', color: '#6a6560', marginRight: '1.5rem' }}>{s.type}</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: s.color }}>{s.range}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechView() {
  const stack = [
    { name: 'Vertex AI Imagen 3', what: 'Image generation', color: '#8b5cf6' },
    { name: 'Vertex AI Veo 3.1', what: 'Video generation', color: '#8b5cf6' },
    { name: 'Gemini 2.5/3.1', what: 'Text, reasoning, content', color: '#8b5cf6' },
    { name: 'Cloud TTS Journey', what: 'Voice generation', color: '#8b5cf6' },
    { name: 'Anthropic Claude', what: 'Reasoning fallback', color: '#c8943e' },
    { name: 'Perplexity', what: 'Web search fallback', color: '#c8943e' },
    { name: 'Google Cloud Storage', what: 'All media assets', color: '#22c55e' },
    { name: 'Neon PostgreSQL', what: '57 models, public/private', color: '#22c55e' },
    { name: 'Vercel', what: '15 domains', color: '#22c55e' },
    { name: 'OpenBroadcaster', what: '18 radio shows', color: '#3b82f6' },
    { name: 'Plex', what: 'In-room TV, 4 channels', color: '#3b82f6' },
    { name: 'Postiz', what: 'Social publishing', color: '#3b82f6' },
    { name: 'Stripe Connect', what: 'Marketplace payments', color: '#f97316' },
    { name: 'Canva MCP', what: 'Design generation', color: '#f97316' },
  ];
  return (
    <div style={{ padding: '1rem 2rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Tech Stack — All Google + Open Source</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        {stack.map(s => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.6rem 1rem', background: '#1a1816', borderRadius: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
            <span style={{ fontSize: '1rem', fontWeight: 600, flex: 1 }}>{s.name}</span>
            <span style={{ fontSize: '0.85rem', color: '#6a6560' }}>{s.what}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArchitectureView() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>The Original Blueprint — 2022</h2>
      <p style={{ fontSize: '1rem', color: '#8a8074', marginBottom: '1.5rem' }}>DeFacto Codec Market — the diagram that became Big Muddy</p>
      <object
        data="/docs/defacto-codec-market-concept.pdf"
        type="application/pdf"
        style={{ width: '100%', height: 'calc(100vh - 250px)', borderRadius: 8, border: '1px solid #2a2520' }}
      >
        <p style={{ color: '#8a8074', padding: '2rem' }}>
          <a href="/docs/defacto-codec-market-concept.pdf" style={{ color: '#c8943e' }} target="_blank" rel="noopener noreferrer">
            View the Blueprint (PDF)
          </a>
        </p>
      </object>
    </div>
  );
}

function LinksView() {
  const links = [
    { label: 'Big Muddy Touring', url: 'https://bigmuddytouring.com', color: '#c8943e' },
    { label: 'Deep South Directory', url: 'https://deepsouthdirectory.com', color: '#22c55e' },
    { label: 'Measurably Better', url: 'https://measurablybetter.life', color: '#3b82f6' },
    { label: 'Outsider Economics', url: 'https://outsidereconomics.com', color: '#f97316' },
    { label: 'Big Muddy Magazine', url: 'https://bigmuddymagazine.com', color: '#8b5cf6' },
    { label: 'Big Muddy Radio', url: 'https://bigmuddyradio.com', color: '#ec4899' },
    { label: 'Big Muddy Entertainment', url: 'https://bigmuddyentertainment.com', color: '#eab308' },
    { label: 'Venture Gallery', url: 'https://venturegallery.art', color: '#c8943e' },
    { label: 'Radio Shows', url: 'https://bigmuddytouring.com/radio/shows', color: '#ec4899' },
    { label: 'Chase Pierson Photography', url: 'https://bigmuddytouring.com/gallery/chase-pierson', color: '#c8943e' },
    { label: 'Bearsville Creative', url: 'https://bigmuddytouring.com/bearsville', color: '#8B6914' },
    { label: 'Architecture Blueprint', url: 'https://bigmuddytouring.com/platform/architecture', color: '#ef4444' },
    { label: 'Admin — Mission Control', url: 'https://bigmuddytouring.com/admin/dashboard', color: '#c8943e' },
    { label: 'Admin — Creative Hub', url: 'https://bigmuddytouring.com/admin/creative', color: '#8b5cf6' },
    { label: 'Admin — Ecosystem', url: 'https://bigmuddytouring.com/admin/ecosystem', color: '#22c55e' },
    { label: 'Admin — Broadcast Control', url: 'https://bigmuddytouring.com/admin/radio', color: '#ec4899' },
    { label: 'Admin — Lookbook', url: 'https://bigmuddytouring.com/admin/lookbook', color: '#f97316' },
    { label: 'In-Room TV Demo', url: 'https://bigmuddytouring.com/touring/inn/tv', color: '#3b82f6' },
    { label: 'Demo Deck', url: 'https://bigmuddytouring.com/demo-deck.html', color: '#eab308' },
  ];
  return (
    <div style={{ padding: '1rem 2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>All Links</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
        {links.map(l => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem',
            background: '#1a1816', border: `1px solid ${l.color}40`, borderRadius: 10,
            textDecoration: 'none', transition: 'all 0.15s',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color, flexShrink: 0, boxShadow: `0 0 8px ${l.color}40` }} />
            <span style={{ fontSize: '1rem', fontWeight: 600, color: '#e8e0d4' }}>{l.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function JPOptionsView() {
  const tiers = [
    {
      level: 'Advisory',
      commitment: '2-4 hrs/week',
      role: 'Trusted advisor. Review deals, strategy sessions.',
      compensation: 'Monthly retainer + equity option pool',
      includes: ['Business strategy sessions', 'Deal structuring advice', 'Access to all dashboards'],
      color: '#3b82f6',
    },
    {
      level: 'Programming Director',
      commitment: '10-15 hrs/week',
      role: 'Own the radio schedule. Book shows. Program the station. Your NPR show as the flagship.',
      compensation: 'Revenue share on radio + show revenue + retainer',
      includes: ['Everything in Advisory', 'Full radio programming control', 'Show booking authority', 'American Parlor Songbook on Big Muddy Radio', 'Content Studio access for all promos'],
      color: '#c8943e',
    },
    {
      level: 'Executive Producer',
      commitment: '20-30 hrs/week',
      role: 'Produce the Bourdain-of-Music travel series. Own Big Muddy Entertainment.',
      compensation: 'Salary + revenue share + executive producer credit',
      includes: ['Everything in Programming Director', 'Travel series production', 'EP credit on all content', 'Entertainment division leadership', 'Cross-regional booking (Natchez + Woodstock)', 'NPR cross-promotion'],
      color: '#22c55e',
    },
    {
      level: 'Partner',
      commitment: 'Full time',
      role: 'Co-run the whole thing. Entertainment + Radio + Shows + Talent.',
      compensation: 'Equity stake + salary + revenue share across all divisions',
      includes: ['Everything in Executive Producer', 'Equity partnership', 'Board seat', 'Full division P&L ownership', 'Talent acquisition authority', 'Revenue share on all entertainment verticals'],
      color: '#ec4899',
    },
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>JP Houston — Engagement Options</h2>
      <p style={{ fontSize: '1rem', color: '#8a8074', marginBottom: '2rem' }}>Pick your level. Every tier builds on the one below it.</p>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {tiers.map((tier, i) => (
          <div key={tier.level} style={{
            background: '#1a1816',
            border: `2px solid ${tier.color}40`,
            borderRadius: 16,
            padding: '1.5rem 2rem',
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: '2rem',
            alignItems: 'start',
          }}>
            {/* Left: Level + Commitment */}
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: tier.color, marginBottom: '0.5rem' }}>
                Level {i + 1}
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: tier.color, margin: '0 0 0.5rem' }}>{tier.level}</h3>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#e8e0d4', marginBottom: '0.25rem' }}>{tier.commitment}</div>
              <div style={{ fontSize: '0.8rem', color: '#6a6560' }}>{tier.compensation}</div>
            </div>

            {/* Right: Role + Includes */}
            <div>
              <p style={{ fontSize: '1rem', color: '#e8e0d4', lineHeight: 1.6, marginBottom: '1rem' }}>{tier.role}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {tier.includes.map(item => (
                  <span key={item} style={{
                    padding: '0.25rem 0.75rem',
                    background: `${tier.color}10`,
                    border: `1px solid ${tier.color}30`,
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    color: '#a8a098',
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#1a1816', border: '1px solid #2a2520', borderRadius: 12, textAlign: 'center' }}>
        <p style={{ fontSize: '1rem', color: '#c8943e', fontWeight: 600, margin: '0 0 0.5rem' }}>What JP brings to any tier:</p>
        <p style={{ fontSize: '0.9rem', color: '#8a8074', margin: 0 }}>
          NPR syndication (20+ stations) &middot; Opened for Leon Russell &middot; Weezer (The Relationship) &middot;
          HBO/BBC/PBS/CBC compositions &middot; Gemini Award nomination &middot; PGA-level production network
        </p>
      </div>
    </div>
  );
}

const VIEW_COMPONENTS: Record<View, () => JSX.Element> = {
  links: LinksView,
  story: StoryView,
  flywheel: FlywheelView,
  tenants: TenantsView,
  personnel: PersonnelView,
  jp: JPOptionsView,
  org: OrgView,
  revenue: RevenueView,
  tech: TechView,
  architecture: ArchitectureView,
};

function WhiteboardInner() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<View>('links');

  useEffect(() => {
    const v = searchParams.get('view');
    if (v && v in VIEW_COMPONENTS) setView(v as View);
  }, [searchParams]);

  const ViewComponent = VIEW_COMPONENTS[view];

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#0a0a08',
      color: '#e8e0d4',
      fontFamily: "'Inter', system-ui, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
        <ViewComponent />
      </div>

      <nav style={{
        display: 'flex',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        borderTop: '1px solid #1a1816',
        background: '#0f0f0d',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {VIEWS.map(v => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            style={{
              padding: '0.75rem 1.5rem',
              background: view === v.id ? v.color : 'transparent',
              color: view === v.id ? '#0a0a08' : v.color,
              border: `2px solid ${v.color}`,
              borderRadius: 10,
              fontSize: '1rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.15s',
              letterSpacing: '0.02em',
            }}
          >
            {v.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function WhiteboardPage() {
  return (
    <Suspense
      fallback={(
        <div style={{
          width: '100vw',
          height: '100vh',
          background: '#0a0a08',
          color: '#c8943e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}>
          Loading whiteboard…
        </div>
      )}
    >
      <WhiteboardInner />
    </Suspense>
  );
}
