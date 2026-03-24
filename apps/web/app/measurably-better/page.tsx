'use client';

import React from 'react';
import {
  ArrowRight, 
  BarChart3, 
  Bot, 
  LineChart, 
  Megaphone,
  CheckCircle2
} from 'lucide-react';

const colors = {
  white: '#ffffff',
  slate50: '#f8fafc',
  slate200: '#e2e8f0',
  slate400: '#94a3b8',
  slate600: '#475569',
  slate900: '#0f172a',
  sky500: '#0ea5e9',
  sky600: '#0284c7',
  green500: '#22c55e',
};

export default function MeasurablyBetterLanding() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.slate50,
      color: colors.slate900,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      WebkitFontSmoothing: 'antialiased'
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${colors.slate50}; }
        
        /* Typography */
        h1, h2, h3, h4, h5, h6 { 
          color: ${colors.slate900};
          letter-spacing: -0.02em;
        }
        p { color: ${colors.slate600}; line-height: 1.6; }
        
        /* Grid System */
        .mb-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        /* Pricing Grid */
        .mb-pricing-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          align-items: start;
        }

        /* Buttons */
        .mb-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: ${colors.sky500};
          color: ${colors.white};
          padding: 0.875rem 1.75rem;
          border-radius: 6px;
          font-weight: 500;
          font-size: 1rem;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(14, 165, 233, 0.2);
        }
        .mb-btn:hover {
          background: ${colors.sky600};
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(14, 165, 233, 0.25);
        }

        .mb-btn-outline {
          background: ${colors.white};
          color: ${colors.slate900};
          border: 1px solid ${colors.slate200};
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .mb-btn-outline:hover {
          background: ${colors.slate50};
          border-color: ${colors.slate400};
          color: ${colors.slate900};
        }

        /* Hero text clamp */
        .mb-hero-title {
          font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .mb-hero-subtitle {
          font-size: clamp(1.1rem, 2vw + 0.5rem, 1.35rem);
          color: ${colors.slate600};
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.5;
        }

        /* Section layout */
        .mb-section {
          padding: 6rem 2rem;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }
        .mb-section-sm {
          padding: 3rem 2rem;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }

        /* Cards */
        .mb-card {
          background: ${colors.white};
          border: 1px solid ${colors.slate200};
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.025);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .mb-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04);
        }

        /* Feature Card */
        .mb-feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: ${colors.slate50};
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: ${colors.sky500};
        }
        .mb-feature-metric {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid ${colors.slate200};
        }
        .mb-metric-value {
          font-size: 1.75rem;
          font-weight: 600;
          color: ${colors.green500};
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }
        .mb-metric-label {
          font-size: 0.875rem;
          color: ${colors.slate600};
          font-weight: 500;
        }
        
        /* Pricing Card */
        .mb-pricing-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .mb-pricing-header {
          margin-bottom: 2rem;
        }
        .mb-pricing-tier {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .mb-pricing-price {
          font-size: 3rem;
          font-weight: 700;
          color: ${colors.slate900};
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          line-height: 1;
        }
        .mb-pricing-period {
          font-size: 1rem;
          color: ${colors.slate400};
          font-weight: 500;
        }
        .mb-pricing-annual {
          font-size: 0.875rem;
          color: ${colors.green500};
          font-weight: 500;
          margin-top: 0.5rem;
        }
        .mb-pricing-features {
          list-style: none;
          margin-bottom: 2.5rem;
          flex: 1;
        }
        .mb-pricing-feature {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: ${colors.slate600};
          line-height: 1.4;
        }
        .mb-pricing-icon {
          color: ${colors.sky500};
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        /* Trust Strip */
        .mb-trust-strip {
          background: ${colors.white};
          border-y: 1px solid ${colors.slate200};
          text-align: center;
          color: ${colors.slate600};
          font-size: 0.875rem;
        }
      `}</style>

      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', borderBottom: `1px solid ${colors.slate200}`, background: colors.white }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
            Measurably Better.
          </div>
          <div>
            <button className="mb-btn mb-btn-outline" style={{ padding: '0.5rem 1rem' }}>Sign In</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ textAlign: 'center', padding: '6rem 2rem 4rem', background: colors.white }}>
        <h1 className="mb-hero-title">
          Measurably Better.
        </h1>
        <p className="mb-hero-subtitle">
          Life is supposed to get easier. This is the easy you&apos;ve been looking for.
        </p>
        <button className="mb-btn" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem' }}>
          Start Free
          <ArrowRight size={20} />
        </button>
      </header>

      {/* Trust Strip */}
      <div className="mb-trust-strip mb-section-sm">
        <p>Runs on Google Cloud. Gemini 1.5 Pro. Cloud Run. Vertex AI.</p>
      </div>

      {/* What It Does Section */}
      <section className="mb-section">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            For everything, we are substantially and measurably better.
          </h2>
          <p style={{ fontSize: '1.125rem', maxWidth: 600, margin: '0 auto' }}>
            A complete suite of tools that integrates seamlessly into your workflow.
          </p>
        </div>

        <div className="mb-grid">
          {/* Card 1 */}
          <div className="mb-card">
            <div className="mb-feature-icon">
              <Bot size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>AI Automation</h3>
            <p style={{ fontSize: '0.95rem' }}>
              Intelligent workflows that handle repetitive operations, freeing your team for high-leverage work.
            </p>
            <div className="mb-feature-metric">
              <div className="mb-metric-value">23%</div>
              <div className="mb-metric-label">admin overhead eliminated</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="mb-card">
            <div className="mb-feature-icon">
              <LineChart size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>QuickBooks Sync</h3>
            <p style={{ fontSize: '0.95rem' }}>
              Real-time financial synchronization providing immediate visibility into cash flow and margins.
            </p>
            <div className="mb-feature-metric">
              <div className="mb-metric-value">100%</div>
              <div className="mb-metric-label">ledger reconciliation accuracy</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="mb-card">
            <div className="mb-feature-icon">
              <Megaphone size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Marketing Engine</h3>
            <p style={{ fontSize: '0.95rem' }}>
              Automated campaign deployment and tracking to ensure consistent pipeline generation.
            </p>
            <div className="mb-feature-metric">
              <div className="mb-metric-value">3.2x</div>
              <div className="mb-metric-label">increase in lead velocity</div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="mb-card">
            <div className="mb-feature-icon">
              <BarChart3 size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Capacity Forecasting</h3>
            <p style={{ fontSize: '0.95rem' }}>
              Predictive modeling to align workforce capacity with anticipated project demand.
            </p>
            <div className="mb-feature-metric">
              <div className="mb-metric-value">14</div>
              <div className="mb-metric-label">days advanced visibility gained</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ background: colors.white }} className="mb-section">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Simple, predictable pricing.
          </h2>
          <p style={{ fontSize: '1.125rem', maxWidth: 600, margin: '0 auto' }}>
            Start for free, upgrade when you need more capacity.
          </p>
        </div>

        <div className="mb-pricing-grid">
          {/* Free Tier */}
          <div className="mb-card mb-pricing-card">
            <div className="mb-pricing-header">
              <h3 className="mb-pricing-tier">Free</h3>
              <div className="mb-pricing-price">
                $0
                <span className="mb-pricing-period">/mo</span>
              </div>
            </div>
            <ul className="mb-pricing-features">
              <li className="mb-pricing-feature">
                <CheckCircle2 size={18} className="mb-pricing-icon" />
                <span>1 seat</span>
              </li>
              <li className="mb-pricing-feature">
                <CheckCircle2 size={18} className="mb-pricing-icon" />
                <span>3 diagnostic runs per month</span>
              </li>
              <li className="mb-pricing-feature">
                <CheckCircle2 size={18} className="mb-pricing-icon" />
                <span>Standard support</span>
              </li>
            </ul>
            <button className="mb-btn mb-btn-outline" style={{ width: '100%' }}>Get Started</button>
          </div>

          {/* Pro Tier */}
          <div className="mb-card mb-pricing-card" style={{ border: `2px solid ${colors.sky500}`, position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: colors.sky500,
              color: colors.white,
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Most Popular
            </div>
            <div className="mb-pricing-header">
              <h3 className="mb-pricing-tier">Pro</h3>
              <div className="mb-pricing-price">
                $99
                <span className="mb-pricing-period">/mo</span>
              </div>
              <div className="mb-pricing-annual">Billed annually at $79/mo</div>
            </div>
            <ul className="mb-pricing-features">
              <li className="mb-pricing-feature">
                <CheckCircle2 size={18} className="mb-pricing-icon" />
                <span>Unlimited diagnostics</span>
              </li>
              <li className="mb-pricing-feature">
                <CheckCircle2 size={18} className="mb-pricing-icon" />
                <span>QuickBooks Online sync</span>
              </li>
              <li className="mb-pricing-feature">
                <CheckCircle2 size={18} className="mb-pricing-icon" />
                <span>AI Automation workflows</span>
              </li>
              <li className="mb-pricing-feature">
                <CheckCircle2 size={18} className="mb-pricing-icon" />
                <span>Priority support</span>
              </li>
            </ul>
            <button className="mb-btn" style={{ width: '100%' }}>Start Free Trial</button>
          </div>

          {/* Department Tier */}
          <div className="mb-card mb-pricing-card">
            <div className="mb-pricing-header">
              <h3 className="mb-pricing-tier">Department</h3>
              <div className="mb-pricing-price">
                $500
                <span className="mb-pricing-period">/mo</span>
              </div>
              <div className="mb-pricing-annual">Billed annually at $400/mo</div>
            </div>
            <ul className="mb-pricing-features">
              <li className="mb-pricing-feature">
                <CheckCircle2 size={18} className="mb-pricing-icon" />
                <span>5 included seats</span>
              </li>
              <li className="mb-pricing-feature">
                <CheckCircle2 size={18} className="mb-pricing-icon" />
                <span>Full stack access</span>
              </li>
              <li className="mb-pricing-feature">
                <CheckCircle2 size={18} className="mb-pricing-icon" />
                <span>Advanced capacity forecasting</span>
              </li>
              <li className="mb-pricing-feature">
                <CheckCircle2 size={18} className="mb-pricing-icon" />
                <span>Dedicated account manager</span>
              </li>
            </ul>
            <button className="mb-btn mb-btn-outline" style={{ width: '100%' }}>Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        padding: '2rem',
        textAlign: 'center',
        borderTop: `1px solid ${colors.slate200}`,
        color: colors.slate400,
        fontSize: '0.875rem'
      }}>
        © 2026 Measurably Better™ · A Hillbilly Dreams Inc. product
      </footer>
    </div>
  );
}
