import React from 'react';

export default function ArtistStorefrontPage({ params }: { params: { artistSlug: string } }) {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: '#1a1a1a' }}>
        Storefront Scaffold
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#6b5d4a', lineHeight: 1.6 }}>
        The dynamic route for <strong>/gallery/{params.artistSlug}</strong> is successfully wired. 
        This page will eventually render the artist's portfolio and handle Stripe Connect destination charges.
      </p>
    </div>
  );
}
