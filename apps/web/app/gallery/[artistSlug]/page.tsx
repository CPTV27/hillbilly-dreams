'use client';

import { useState } from 'react';
import { DEMO_ARTISTS, DEMO_ARTWORKS, DEMO_SHOOTS, formatPrice, type DemoArtwork } from '../demo-data';
import Link from 'next/link';
import { useParams } from 'next/navigation';

/* eslint-disable @next/next/no-img-element */

const CATEGORIES = ['All', 'print', 'original', 'commission', 'collection', 'sculpture'] as const;

function BuyButton({ artwork }: { artwork: DemoArtwork }) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: artwork.salePrice || artwork.price,
          brandClass: 'Storefront',
          productName: artwork.title,
          productDescription: `${artwork.medium} — ${artwork.dimensions} — ${artwork.edition}`,
          successPath: '/gallery/checkout/success',
          cancelPath: `/gallery/${artwork.artistSlug}`,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout unavailable — contact the artist directly.');
      }
    } catch {
      alert('Checkout unavailable — contact the artist directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading || !artwork.available}
      style={{
        padding: '10px 20px',
        background: artwork.available ? '#1a1a1a' : '#ccc',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        fontSize: '0.8rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        cursor: artwork.available ? 'pointer' : 'default',
        transition: 'all 0.15s',
        width: '100%',
      }}
    >
      {loading ? 'Opening checkout...' : artwork.available ? `Buy Print — ${formatPrice(artwork.salePrice || artwork.price)}` : 'Sold'}
    </button>
  );
}

export default function ArtistStorefrontPage() {
  const params = useParams();
  const artistSlug = params.artistSlug as string;
  const [filter, setFilter] = useState('All');

  const artist = DEMO_ARTISTS.find((a) => a.slug === artistSlug);
  const allWorks = DEMO_ARTWORKS.filter((w) => w.artistSlug === artistSlug);
  const shoots = DEMO_SHOOTS?.filter((s) => s.artistSlug === artistSlug) ?? [];
  const works = filter === 'All' ? allWorks : allWorks.filter((w) => w.category === filter);
  const categories = ['All', ...Array.from(new Set(allWorks.map((w) => w.category)))];

  if (!artist) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1a1a1a', marginBottom: '1rem' }}>Artist not found</h1>
        <Link href="/gallery" style={{ color: '#b8963e' }}>Back to Gallery</Link>
      </div>
    );
  }

  const heroImage = allWorks.find((w) => w.featured && w.images[0]?.startsWith('http'))?.images[0];

  return (
    <div>
      {/* Hero */}
      <section style={{
        position: 'relative',
        minHeight: 360,
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        borderRadius: 12,
        marginBottom: '2rem',
      }}>
        {heroImage && (
          <img
            src={heroImage}
            alt={artist.name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(transparent 30%, rgba(0,0,0,0.8))',
        }} />
        <div style={{ position: 'relative', padding: '2rem', color: '#fff', maxWidth: 600 }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b8963e', marginBottom: 8 }}>
            {artist.medium} &middot; {artist.city}, {artist.state}
          </p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, margin: '0 0 0.5rem', lineHeight: 1.1 }}>
            {artist.name}
          </h1>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.85, margin: 0 }}>
            {artist.bio}
          </p>
          {artist.instagram && (
            <a
              href={`https://instagram.com/${artist.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: 12, fontSize: '0.75rem', color: '#b8963e', textDecoration: 'none', fontWeight: 600 }}
            >
              @{artist.instagram}
            </a>
          )}
        </div>
      </section>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: 999,
              border: '1px solid',
              borderColor: filter === cat ? '#1a1a1a' : '#ddd',
              background: filter === cat ? '#1a1a1a' : '#fff',
              color: filter === cat ? '#fff' : '#666',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Works Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem',
      }}>
        {works.map((work) => {
          const imgSrc = work.images[0]?.startsWith('http') ? work.images[0] : undefined;
          return (
            <div key={work.id} style={{
              background: '#fff',
              border: '1px solid #eee',
              borderRadius: 10,
              overflow: 'hidden',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
              }}
            >
              {imgSrc ? (
                <img src={imgSrc} alt={work.title} loading="lazy" style={{ width: '100%', height: 220, objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: 220, background: work.images[0] || '#eee' }} />
              )}
              <div style={{ padding: '1rem 1.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px', color: '#1a1a1a' }}>{work.title}</h3>
                <p style={{ fontSize: '0.75rem', color: '#999', margin: '0 0 8px' }}>
                  {work.medium} &middot; {work.dimensions}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: 1.5, margin: '0 0 12px' }}>
                  {work.description.length > 120 ? work.description.slice(0, 120) + '...' : work.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div>
                    {work.salePrice ? (
                      <>
                        <span style={{ fontSize: '1rem', fontWeight: 700, color: '#b8963e' }}>{formatPrice(work.salePrice)}</span>
                        <span style={{ fontSize: '0.8rem', color: '#999', textDecoration: 'line-through', marginLeft: 8 }}>{formatPrice(work.price)}</span>
                      </>
                    ) : work.price > 0 ? (
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a' }}>{formatPrice(work.price)}</span>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: '#999', fontStyle: 'italic' }}>Not for sale</span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.65rem', color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{work.edition}</span>
                </div>
                {work.price > 0 && <BuyButton artwork={work} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Shoot Galleries */}
      {shoots.length > 0 && (
        <section style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>
            Event & Session Galleries
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {shoots.map((shoot) => (
              <Link
                key={shoot.slug}
                href={`/gallery/${artistSlug}/shoots/${shoot.slug}`}
                style={{
                  display: 'block',
                  padding: '1.25rem',
                  background: '#faf8f5',
                  border: '1px solid #eee',
                  borderRadius: 8,
                  textDecoration: 'none',
                  transition: 'border-color 0.15s',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', margin: '0 0 4px' }}>{shoot.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#999', margin: 0 }}>
                  {shoot.location} &middot; {new Date(shoot.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#b8963e', marginTop: 8, fontWeight: 600 }}>
                  {shoot.photos.length > 0 ? `${shoot.photos.length} photos — Browse & Order Prints` : 'Coming soon'}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Commission CTA */}
      <section style={{
        marginTop: '3rem',
        padding: '2.5rem',
        background: '#1a1a1a',
        borderRadius: 12,
        textAlign: 'center',
        color: '#fff',
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8 }}>Book a Shoot</h2>
        <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: 16, maxWidth: 400, margin: '0 auto 16px' }}>
          Street photography, event coverage, architectural interiors, portraits.
          Based in Natchez, available along the corridor.
        </p>
        <a
          href="mailto:me@chasepierson.tv?subject=Photography%20Inquiry"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#b8963e',
            color: '#1a1a1a',
            borderRadius: 6,
            fontWeight: 700,
            fontSize: '0.85rem',
            textDecoration: 'none',
          }}
        >
          Get in Touch
        </a>
      </section>
    </div>
  );
}
