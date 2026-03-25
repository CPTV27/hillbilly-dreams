import React from 'react';

export default function ArtistStorefrontLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { artistSlug: string };
}) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#faf9f6' }}>
      {/* 
        DOMAIN ISOLATION RESTRAINT:
        This storefront is strictly for BuyCurious Art Connect / split payments.
        Do NOT import S2PX B2B SaaS Stripe billing hooks or contexts here.
        The UI placeholder below prepares for the Stripe Checkout session logic that will handle destination charges.
      */}
      <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #eaeaea', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
          BCA Storefront
        </h2>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          Artist: <span style={{ fontWeight: 500, color: '#1a1a1a' }}>{params.artistSlug}</span>
        </div>
      </header>
      
      <main style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </main>
      
      {/* Future: Stripe Connect Checkout Session wrapper will be initialized here */}
    </div>
  );
}
