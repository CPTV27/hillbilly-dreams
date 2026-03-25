'use client';

import React from 'react';

const colors = {
  white: '#ffffff',
  slate50: '#f8fafc',
  slate200: '#e2e8f0',
  slate400: '#94a3b8',
  slate600: '#475569',
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
      <div style={{ maxWidth: 600 }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          letterSpacing: '-1.5px',
          margin: '0 0 1rem',
          lineHeight: 1.1,
        }}>
          Measurably Better.
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: colors.slate600,
          lineHeight: 1.6,
          margin: '0 0 2rem',
        }}>
          Enterprise AI infrastructure for independent operators. Launching May 31, 2026.
        </p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: '0.875rem',
          color: colors.slate400,
          padding: '8px 16px',
          borderRadius: 8,
          backgroundColor: colors.slate50,
          border: `1px solid ${colors.slate200}`,
        }}>
          Runs on Google Cloud · Gemini 1.5 Pro · Vertex AI · Cloud Run
        </div>
      </div>
      <footer style={{
        position: 'absolute',
        bottom: '2rem',
        fontSize: '0.875rem',
        color: colors.slate400,
      }}>
        © 2026 Measurably Better™ · A Hillbilly Dreams Inc. product
      </footer>
    </div>
  );
}
