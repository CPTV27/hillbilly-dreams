'use client';

import React from 'react';
import { MapPin, Shield, TrendingUp, Landmark, Server, ArrowRight } from 'lucide-react';

const colors = {
  slate50: '#f8fafc', slate100: '#f1f5f9', slate200: '#e2e8f0', slate300: '#cbd5e1',
  slate400: '#94a3b8', slate500: '#64748b', slate600: '#475569', slate700: '#334155',
  slate800: '#1e293b', slate900: '#0f172a', slate950: '#020617',
  sky50: '#f0f9ff', sky100: '#e0f2fe', sky200: '#bae6fd', sky400: '#38bdf8', sky500: '#0ea5e9', sky600: '#0284c7', sky900: '#0c4a6e',
  orange50: '#fff7ed', orange400: '#fb923c', orange500: '#f97316', orange600: '#ea580c',
  white: '#ffffff',
  green400: '#4ade80', green500: '#22c55e',
};

export default function DeepSouthPitch() {
  return (
    <div style={{ backgroundColor: colors.slate950, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: colors.slate50, scrollBehavior: 'smooth' }}>

      {/* Sticky Top Navigation */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid ${colors.slate800}`, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.slate900, border: `1px solid ${colors.slate700}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin color={colors.sky400} size={20} />
          </div>
          <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.5px', color: colors.white }}>Deep South Directory</div>
        </div>

        {/* Clickable Section Links */}
        <div style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 600 }}>
          <a href="#problem" style={{ color: colors.slate400, textDecoration: 'none' }}>The Capital Flight</a>
          <a href="#natchez" style={{ color: colors.slate400, textDecoration: 'none' }}>The Fortress Node</a>
          <a href="#economics" style={{ color: colors.slate400, textDecoration: 'none' }}>Economics</a>
          <a href="/hillbilly/proposal/scan2plan" style={{ color: colors.sky400, textDecoration: 'none' }}>S2PX Engine →</a>
        </div>
      </nav>

      <main style={{ maxWidth: 1024, margin: '0 auto', padding: '64px 24px', display: 'flex', flexDirection: 'column', gap: 96 }}>

        {/* Hero Section */}
        <header style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, backgroundColor: colors.slate900, border: `1px solid ${colors.slate800}`, color: colors.slate300, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Shield size={14} color={colors.orange500} />
            Sovereign Digital Infrastructure
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-1.5px', color: colors.white, lineHeight: 1.1, margin: 0 }}>
            Civic Technology for <br />
            <span style={{ backgroundImage: `linear-gradient(to right, ${colors.sky400}, ${colors.orange400})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              The New South.
            </span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: colors.slate400, maxWidth: 700, lineHeight: 1.6, margin: 0 }}>
            Prepared by Hillbilly Dreams, Inc. for the City of Natchez, Mississippi. A localized economic engine built to stop absentee platforms, reverse capital flight, and enforce a closed-loop economy.
          </p>
        </header>

        {/* Section 1: The Problem */}
        <section id="problem" style={{ scrollMarginTop: '100px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: colors.white, borderBottom: `1px solid ${colors.slate800}`, paddingBottom: 16, margin: 0 }}>I. The Core Problem: Capital Flight</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div style={{ fontSize: '1.125rem', color: colors.slate400, lineHeight: 1.7 }}>
              <p style={{ marginBottom: 16 }}>Right now, eighty cents of every dollar earned in the Deep South leaves the zip code within forty-eight hours.</p>
              <p style={{ margin: 0 }}>When tourists and locals use extractive platforms — Yelp, Eventbrite, Airbnb, or Ticketmaster — Silicon Valley conglomerates engineer massive capital flight, taxing Natchez&apos;s economy by 10% to 30% per transaction.</p>
            </div>
            <div style={{ backgroundColor: colors.slate900, padding: 32, borderRadius: 24, borderLeft: `4px solid ${colors.sky500}`, borderTop: `1px solid ${colors.slate800}`, borderRight: `1px solid ${colors.slate800}`, borderBottom: `1px solid ${colors.slate800}` }}>
              <h3 style={{ color: colors.white, fontSize: '1.25rem', fontWeight: 800, margin: '0 0 16px' }}>The Parallel Economy</h3>
              <p style={{ margin: 0, lineHeight: 1.6, color: colors.slate400 }}>
                The Deep South Directory isn&apos;t a list of businesses; it&apos;s a closed-loop economy. Every venue, artist, and storefront is a <strong style={{ color: colors.white }}>Node</strong>. When they connect on our sovereign infrastructure, the capital stays trapped in the corridor, driving a massive <strong style={{ color: colors.white }}>Local Multiplier</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: The Natchez Pitch */}
        <section id="natchez" style={{ scrollMarginTop: '100px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: colors.white, borderBottom: `1px solid ${colors.slate800}`, paddingBottom: 16, margin: 0 }}>II. The Pitch to the City of Natchez</h2>
          <div style={{ backgroundColor: colors.slate900, border: `1px solid ${colors.slate800}`, borderRadius: 24, padding: 48, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(to right, ${colors.orange500}, ${colors.orange400})` }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <Landmark size={32} color={colors.orange400} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: colors.white, margin: 0 }}>The Ask: $25,000 Economic Defense Grant</h3>
            </div>
            <p style={{ fontSize: '1.125rem', color: colors.slate300, marginBottom: 32, lineHeight: 1.6 }}>
              We are not asking the city to buy software. We are asking the city to fund the flagship fortress node of a 5-state, 18-city digital economic network.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
              {[
                { title: 'The Flagship Node', desc: 'Natchez becomes the permanent, publicized birthplace of this regional tech ecosystem.' },
                { title: 'Sovereign Subsidies', desc: 'The grant fully subsidizes the digital onboarding of the first 100 Natchez businesses for life.' },
                { title: 'Macro-Data Access', desc: 'The city gains anonymized data on how tourism dollars compound through the local multiplier.' }
              ].map((item, i) => (
                <div key={i} style={{ backgroundColor: colors.slate950, padding: 24, borderRadius: 16, border: `1px solid ${colors.slate800}` }}>
                  <h4 style={{ fontWeight: 800, color: colors.white, margin: '0 0 8px' }}>{item.title}</h4>
                  <p style={{ fontSize: 14, color: colors.slate400, margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Economics */}
        <section id="economics" style={{ scrollMarginTop: '100px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: colors.white, borderBottom: `1px solid ${colors.slate800}`, paddingBottom: 16, margin: 0 }}>III. Unit Economics &amp; Sovereign Tiers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { price: 'Free', name: 'The Baseline', target: 'Small artists & shops', desc: 'Secures network density. Subsidized by the city grant.' },
              { price: '$99/mo', name: 'The Operator', target: 'Boutiques & Restaurants', desc: 'Replaces extractive POS/Linktree with HDX Lite.' },
              { price: '$500/mo', name: 'The Node', target: 'Major Venues & Hotels', desc: 'Full operational control, capacity automation, direct AI booking.' },
              { price: '$2,500/mo', name: 'Ecosystem Sponsor', target: 'Banks & Tourism Boards', desc: 'Premium brand placement and macro-data access.' }
            ].map((tier, i) => (
              <div key={i} style={{ backgroundColor: colors.slate900, padding: 32, borderRadius: 24, border: `1px solid ${colors.slate800}`, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: colors.white, marginBottom: 8 }}>{tier.price}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: colors.sky400, marginBottom: 4 }}>{tier.name}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: colors.slate500, marginBottom: 16 }}>{tier.target}</div>
                <p style={{ fontSize: 14, color: colors.slate400, lineHeight: 1.5, margin: 0 }}>{tier.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Roadmap */}
        <section id="roadmap" style={{ scrollMarginTop: '100px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: colors.white, borderBottom: `1px solid ${colors.slate800}`, paddingBottom: 16, margin: 0 }}>IV. 12-Month Rollout &amp; Pro Forma</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Phase 1 */}
            <div style={{ display: 'flex', gap: 24, backgroundColor: colors.slate900, padding: 32, borderRadius: 24, border: `1px solid ${colors.slate800}` }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: colors.slate950, border: `1px solid ${colors.slate700}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: colors.sky400 }}>Q1</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: colors.white, margin: '0 0 8px' }}>The Natchez Fortress (Months 1-3)</h3>
                <p style={{ color: colors.slate400, margin: '0 0 16px' }}>Secure grant, deploy HDX engine, and manually onboard the top 100 anchor businesses.</p>
                <div style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 700, color: colors.slate300 }}>
                  <div>Nodes: <span style={{ color: colors.sky400 }}>18</span></div>
                  <div>Projected Retained: <span style={{ color: colors.sky400 }}>$38,500</span></div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div style={{ display: 'flex', gap: 24, backgroundColor: colors.slate900, padding: 32, borderRadius: 24, border: `1px solid ${colors.slate800}` }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: colors.slate950, border: `1px solid ${colors.slate700}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: colors.orange400 }}>Q2</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: colors.white, margin: '0 0 8px' }}>The Circuit Expansion (Months 4-6)</h3>
                <p style={{ color: colors.slate400, margin: '0 0 16px' }}>Follow the Snowbird Circuit. Establish nodes in Clarksdale, Memphis, and Lafayette.</p>
                <div style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 700, color: colors.slate300 }}>
                  <div>Nodes: <span style={{ color: colors.orange400 }}>46</span></div>
                  <div>Projected Retained: <span style={{ color: colors.orange400 }}>$32,500</span></div>
                </div>
              </div>
            </div>

            {/* Phase 3 & 4 */}
            <div style={{ display: 'flex', gap: 24, backgroundColor: colors.slate900, padding: 32, borderRadius: 24, border: `1px solid ${colors.slate800}` }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: colors.slate950, border: `1px solid ${colors.slate700}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: colors.slate500 }}>H2</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: colors.white, margin: '0 0 8px' }}>Density &amp; Dominance (Months 7-12)</h3>
                <p style={{ color: colors.slate400, margin: '0 0 16px' }}>Scale to 10+ cities, hitting 150 active paying operators and 15 major venue nodes.</p>
                <div style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 700, color: colors.slate300 }}>
                  <div>Nodes: <span style={{ color: colors.slate500 }}>165</span></div>
                  <div>Projected Retained: <span style={{ color: colors.slate500 }}>$144,000</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div style={{ backgroundColor: colors.slate900, border: `1px solid ${colors.slate800}`, padding: 32, borderRadius: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: colors.slate500, marginBottom: 4 }}>Year 1 Projected Net Income</div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: colors.green400 }}>~$177,500</div>
            </div>
            <div style={{ textAlign: 'right' as const }}>
              <div style={{ fontSize: 14, color: colors.slate400, marginBottom: 8, fontWeight: 600 }}>
                <TrendingUp size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} color={colors.sky400} /> Exiting Year 1 at $350K ARR
              </div>
              <div style={{ fontSize: 14, color: colors.slate400, fontWeight: 600 }}>
                <Server size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} color={colors.sky400} /> 96% Gross Cloud Margins
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA — Complete the loop */}
        <section style={{ background: colors.slate900, border: `1px solid ${colors.slate800}`, borderRadius: 24, padding: 48, textAlign: 'center' as const }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: colors.white, margin: '0 0 12px' }}>Claim Your Node</h2>
          <p style={{ fontSize: '1.125rem', color: colors.slate400, maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.6 }}>
            Every business that joins the Directory strengthens the closed-loop economy. Stop feeding absentee platforms. Start building sovereign infrastructure.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <a href="/hillbilly/proposal/scan2plan" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', backgroundColor: colors.sky600, color: colors.white, fontWeight: 700, borderRadius: 12, textDecoration: 'none', fontSize: 16, boxShadow: '0 10px 15px -3px rgba(2, 132, 199, 0.4)' }}>
              Digitize Your Space with S2PX <ArrowRight size={18} />
            </a>
            <a href="mailto:chase@hillbillydreamsinc.com?subject=Deep%20South%20Directory%20—%20Claim%20My%20Node" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', backgroundColor: 'transparent', color: colors.white, fontWeight: 600, borderRadius: 12, textDecoration: 'none', fontSize: 16, border: `1px solid ${colors.slate600}` }}>
              Contact Us
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
