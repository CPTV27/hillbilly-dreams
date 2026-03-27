import React from 'react';

export default function EnterpriseProposal() {
  return (
    <div style={{ minHeight: '100vh', padding: '4rem', backgroundColor: 'var(--surface)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
        Enterprise Deal Room
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: 600 }}>
        The bespoke proposal experience securely housed on sovereign infrastructure.
      </p>
    </div>
  );
}
