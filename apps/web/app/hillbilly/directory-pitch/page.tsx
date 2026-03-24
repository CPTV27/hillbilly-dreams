'use client';

import React from 'react';
import { MapPin, Shield, TrendingUp, Landmark, Users, ArrowRight, Server, ChevronRight } from 'lucide-react';

const colors = {
  slate50: '#f8fafc', slate100: '#f1f5f9', slate200: '#e2e8f0', slate300: '#cbd5e1',
  slate400: '#94a3b8', slate500: '#64748b', slate600: '#475569', slate700: '#334155',
  slate800: '#1e293b', slate900: '#0f172a', slate950: '#020617',
  sky50: '#f0f9ff', sky100: '#e0f2fe', sky200: '#bae6fd', sky500: '#0ea5e9', sky600: '#0284c7', sky900: '#0c4a6e',
  orange50: '#fff7ed', orange500: '#f97316', orange600: '#ea580c',
  white: '#ffffff',
};

export default function DeepSouthPitch() {
  return (
    <div style={{ backgroundColor: colors.slate50, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: colors.slate900, scrollBehavior: 'smooth' }}>

      {/* Sticky Top Navigation */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid ${colors.slate200}`, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.slate900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin color={colors.sky500} size={20} />
          </div>
          <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.5px' }}>Deep South Directory</div>
        </div>

        {/* Clickable Section Links */}
        <div style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 600 }}>
          <a href="#problem" style={{ color: colors.slate600, textDecoration: 'none' }}>The Extraction</a>
          <a href="#natchez" style={{ color: colors.slate600, textDecoration: 'none' }}>The Natchez Pitch</a>
          <a href="#economics" style={{ color: colors.slate600, textDecoration: 'none' }}>Economics</a>
          <a href="#roadmap" style={{ color: colors.slate600, textDecoration: 'none' }}>12-Month Roadmap</a>
        </div>
      </nav>

      <main style={{ maxWidth: 1024, margin: '0 auto', padding: '64px 24px', display: 'flex', flexDirection: 'column', gap: 96 }}>

        {/* Hero Section */}
        <header style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, backgroundColor: colors.slate900, color: colors.white, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Shield size={14} color={colors.orange500} />
            Sovereign Digital Infrastructure
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-1.5px', color: colors.slate900, lineHeight: 1.1, margin: 0 }}>
            Civic Technology for <br />
            <span style={{ backgroundImage: `linear-gradient(to right, ${colors.sky600}, ${colors.orange600})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              The New South.
            </span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: colors.slate600, maxWidth: 700, lineHeight: 1.6, margin: 0 }}>
            Prepared by Hillbilly Dreams, Inc. for the City of Natchez, Mississippi. A localized economic engine built to stop the extraction of capital and digitize the region.
          </p>
        </header>

        {/* Section 1: The Problem */}
        <section id="problem" style={{ scrollMarginTop: '100px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, borderBottom: `2px solid ${colors.slate200}`, paddingBottom: 16, margin: 0 }}>I. The Core Problem: The Extraction</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div style={{ fontSize: '1.125rem', color: colors.slate600, lineHeight: 1.7 }}>
              <p>Right now, eighty cents of every dollar earned in the Deep South leaves the community within forty-eight hours.</p>
              <p>When tourists and locals use extractive platforms — Yelp, Eventbrite, Airbnb, Linktree, or Ticketmaster — Silicon Valley takes a 10% to 20% tax off the top of Natchez&apos;s economy.</p>
            </div>
            <div style={{ backgroundColor: colors.slate900, color: colors.white, padding: 32, borderRadius: 24, boxShadow: '0 20px 25px -5px rgba(0,0,0,.1)' }}>
              <h3 style={{ color: colors.orange500, fontSize: '1.25rem', fontWeight: 800, margin: '0 0 16px' }}>The HDX Solution</h3>
              <p style={{ margin: 0, lineHeight: 1.6, color: colors.slate300 }}>
                The Deep South doesn&apos;t need another generic app; it needs sovereign digital infrastructure. The Directory provides local businesses with enterprise tools (tap-to-pay, AI concierges, direct booking) with zero middleman extraction.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: The Natchez Pitch */}
        <section id="natchez" style={{ scrollMarginTop: '100px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, borderBottom: `2px solid ${colors.slate200}`, paddingBottom: 16, margin: 0 }}>II. The Pitch to the City of Natchez</h2>
          <div style={{ backgroundColor: colors.sky50, border: `1px solid ${colors.sky200}`, borderRadius: 24, padding: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <Landmark size={32} color={colors.sky600} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: colors.sky900, margin: 0 }}>The Ask: $25,000 Economic Development Grant</h3>
            </div>
            <p style={{ fontSize: '1.125rem', color: colors.sky900, marginBottom: 32, lineHeight: 1.6 }}>
              We are not asking the city to buy software. We are asking the city to fund the flagship node of a 5-state, 18-city digital economic network.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
              {[
                { title: 'The Flagship Node', desc: 'Natchez becomes the permanent, publicized birthplace of this regional tech ecosystem.' },
                { title: 'Business Subsidies', desc: 'The grant fully subsidizes the digital onboarding of the first 100 Natchez businesses for life.' },
                { title: 'Macro-Data Access', desc: 'The city gains anonymized data on how tourism dollars flow through the local economy.' }
              ].map((item, i) => (
                <div key={i} style={{ backgroundColor: colors.white, padding: 24, borderRadius: 16, border: `1px solid ${colors.sky100}` }}>
                  <h4 style={{ fontWeight: 800, color: colors.slate900, margin: '0 0 8px' }}>{item.title}</h4>
                  <p style={{ fontSize: 14, color: colors.slate600, margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Economics */}
        <section id="economics" style={{ scrollMarginTop: '100px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, borderBottom: `2px solid ${colors.slate200}`, paddingBottom: 16, margin: 0 }}>III. Unit Economics &amp; Tiers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { price: 'Free', name: 'The Baseline', target: 'Small artists & shops', desc: 'Secures network density. Subsidized by the city grant.' },
              { price: '$99/mo', name: 'The Operator', target: 'Boutiques & Restaurants', desc: 'Replaces Linktree/POS with HDX Lite (bookings, AI).' },
              { price: '$500/mo', name: 'The Node', target: 'Major Venues & Hotels', desc: 'Full operational control, artist management, CRM.' },
              { price: '$2,500/mo', name: 'Ecosystem Sponsor', target: 'Banks & Tourism Boards', desc: 'Premium brand placement and macro-data access.' }
            ].map((tier, i) => (
              <div key={i} style={{ backgroundColor: colors.white, padding: 32, borderRadius: 24, border: `1px solid ${colors.slate200}`, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: colors.slate900, marginBottom: 8 }}>{tier.price}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: colors.sky600, marginBottom: 4 }}>{tier.name}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: colors.slate400, marginBottom: 16 }}>{tier.target}</div>
                <p style={{ fontSize: 14, color: colors.slate600, lineHeight: 1.5, margin: 0 }}>{tier.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Roadmap */}
        <section id="roadmap" style={{ scrollMarginTop: '100px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, borderBottom: `2px solid ${colors.slate200}`, paddingBottom: 16, margin: 0 }}>IV. 12-Month Rollout &amp; Pro Forma</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Phase 1 */}
            <div style={{ display: 'flex', gap: 24, backgroundColor: colors.white, padding: 32, borderRadius: 24, border: `1px solid ${colors.slate200}` }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: colors.sky50, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: colors.sky600 }}>Q1</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px' }}>The Natchez Fortress (Months 1-3)</h3>
                <p style={{ color: colors.slate600, margin: '0 0 16px' }}>Secure grant, manually onboard the top 100 businesses, secure anchor sponsor.</p>
                <div style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 700, color: colors.slate900 }}>
                  <div>Subs: <span style={{ color: colors.sky600 }}>18</span></div>
                  <div>Projected Rev: <span style={{ color: colors.sky600 }}>$38,500</span></div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div style={{ display: 'flex', gap: 24, backgroundColor: colors.white, padding: 32, borderRadius: 24, border: `1px solid ${colors.slate200}` }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: colors.orange50, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: colors.orange600 }}>Q2</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px' }}>The Circuit Expansion (Months 4-6)</h3>
                <p style={{ color: colors.slate600, margin: '0 0 16px' }}>Follow the Snowbird Circuit. Open nodes in Clarksdale, Memphis, and Lafayette.</p>
                <div style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 700, color: colors.slate900 }}>
                  <div>Subs: <span style={{ color: colors.orange600 }}>46</span></div>
                  <div>Projected Rev: <span style={{ color: colors.orange600 }}>$32,500</span></div>
                </div>
              </div>
            </div>

            {/* Phase 3 & 4 */}
            <div style={{ display: 'flex', gap: 24, backgroundColor: colors.white, padding: 32, borderRadius: 24, border: `1px solid ${colors.slate200}` }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: colors.slate100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: colors.slate600 }}>H2</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px' }}>Density &amp; Dominance (Months 7-12)</h3>
                <p style={{ color: colors.slate600, margin: '0 0 16px' }}>Scale to 10+ cities, hitting 150 active paying operators and 15 major venue nodes.</p>
                <div style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 700, color: colors.slate900 }}>
                  <div>Subs: <span style={{ color: colors.slate600 }}>165</span></div>
                  <div>Projected Rev: <span style={{ color: colors.slate600 }}>$144,000</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div style={{ backgroundColor: colors.slate900, color: colors.white, padding: 32, borderRadius: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: colors.slate400, marginBottom: 4 }}>Year 1 Projected Net Income</div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: colors.orange500 }}>~$177,500</div>
            </div>
            <div style={{ textAlign: 'right' as const }}>
              <div style={{ fontSize: 14, color: colors.slate300, marginBottom: 8 }}>
                <TrendingUp size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Exiting Year 1 at $350K ARR
              </div>
              <div style={{ fontSize: 14, color: colors.slate300 }}>
                <Server size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> 96% Gross Cloud Margins
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
