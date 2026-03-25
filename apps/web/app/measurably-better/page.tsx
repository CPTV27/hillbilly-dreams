'use client';

import React from 'react';

const colors = {
  white: '#ffffff',
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate600: '#475569',
  slate800: '#1e293b',
  slate900: '#0f172a',
  sky500: '#0ea5e9',
};

export default function MeasurablyBetterLanding() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.white,
      color: colors.slate900,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <div style={{ maxWidth: 640 }}>

        {/* Logo mark */}
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          backgroundColor: colors.slate900,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 2rem',
        }}>
          <span style={{ fontWeight: 900, fontSize: 18, color: colors.sky500 }}>MB</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          letterSpacing: '-1.5px',
          margin: '0 0 1.5rem',
          lineHeight: 1.1,
        }}>
          Measurably Better.
        </h1>

        <p style={{
          fontSize: '1.375rem',
          color: colors.slate600,
          lineHeight: 1.6,
          margin: '0 0 3rem',
        }}>
          150 tokens per second. 1 million token context.
          Zero data leakage. Your infrastructure, your namespace,
          your margins.
        </p>

        {/* Stats strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          backgroundColor: colors.slate200,
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: '3rem',
        }}>
          {[
            { value: '85ms', label: 'Edge routing latency' },
            { value: '150 tk/s', label: 'Provisioned throughput' },
            { value: '0 bytes', label: 'Data leaked to third parties' },
          ].map((stat, i) => (
            <div key={i} style={{
              backgroundColor: colors.white,
              padding: '24px 16px',
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: colors.slate900, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: colors.slate400, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Launch date */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: '0.875rem',
          color: colors.slate800,
          padding: '10px 20px',
          borderRadius: 999,
          backgroundColor: colors.slate50,
          border: `1px solid ${colors.slate200}`,
          fontWeight: 600,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.sky500 }} />
          Launching April 27, 2026
        </div>

        {/* Tech strip */}
        <p style={{
          fontSize: '0.8rem',
          color: colors.slate300,
          marginTop: '2rem',
          letterSpacing: '0.03em',
        }}>
          Gemini 1.5 Pro · Vertex AI · Cloud Run · Cloud SQL · Sovereign VPC
        </p>
      </div>

      <footer style={{
        position: 'absolute',
        bottom: '2rem',
        fontSize: '0.8rem',
        color: colors.slate300,
      }}>
        © 2026 Measurably Better™
      </footer>
    </div>
  );
}
