'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DEMO_ARTISTS, getShootBySlug, formatPrice, type DemoArtwork } from '../../../demo-data';

/* eslint-disable @next/next/no-img-element */

export default function ShootGalleryPage() {
  const params = useParams();
  const artistSlug = params.artistSlug as string;
  const shootSlug = params.shootSlug as string;
  const [lightbox, setLightbox] = useState<string | null>(null);

  const artist = DEMO_ARTISTS.find((a) => a.slug === artistSlug);
  const shoot = getShootBySlug(artistSlug, shootSlug);

  if (!shoot || !artist) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '0.5rem' }}>Gallery Not Found</h1>
        <p style={{ color: '#999', marginBottom: '1rem' }}>This shoot gallery may not be available yet or the link may be incorrect.</p>
        <Link href={`/gallery/${artistSlug}`} style={{ color: '#b8963e', fontWeight: 600, textDecoration: 'none' }}>
          &larr; Back to {artist?.name || 'Artist'}
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Link
          href={`/gallery/${artistSlug}`}
          style={{ fontSize: '0.75rem', color: '#999', textDecoration: 'none', fontWeight: 600 }}
        >
          &larr; Back to {artist.name}
        </Link>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#1a1a1a', margin: '0.75rem 0 0.25rem' }}>
          {shoot.title}
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#999', margin: 0 }}>
          {shoot.location} &middot; {new Date(shoot.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {shoot.photos.length === 0 ? (
        <div style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          background: '#f5f3ef',
          borderRadius: 12,
          border: '1px dashed #ddd',
        }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>
            Photos coming soon
          </p>
          <p style={{ fontSize: '0.85rem', color: '#999', maxWidth: 400, margin: '0 auto' }}>
            This gallery is being edited. Photos will be available for viewing and print ordering shortly.
          </p>
        </div>
      ) : (
        <>
          <p style={{ fontSize: '0.8rem', color: '#999', marginBottom: '1.5rem' }}>
            {shoot.photos.length} photos &middot; Click any photo to enlarge &middot; Order prints with the button below each image
          </p>

          {/* Photo Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem',
          }}>
            {shoot.photos.map((photo: DemoArtwork) => {
              const imgSrc = photo.images[0]?.startsWith('http') ? photo.images[0] : undefined;
              return (
                <div key={photo.id} style={{
                  background: '#fff',
                  border: '1px solid #eee',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}>
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={photo.title}
                      loading="lazy"
                      onClick={() => setLightbox(imgSrc)}
                      style={{ width: '100%', height: 200, objectFit: 'cover', cursor: 'pointer' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: 200, background: '#eee' }} />
                  )}
                  <div style={{ padding: '0.75rem 1rem' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a', margin: '0 0 4px' }}>{photo.title}</p>
                    {photo.price > 0 && (
                      <p style={{ fontSize: '0.8rem', color: '#b8963e', fontWeight: 700, margin: '0 0 8px' }}>
                        Prints from {formatPrice(photo.price)}
                      </p>
                    )}
                    {photo.available && photo.price > 0 && (
                      <a
                        href={`mailto:me@chasepierson.tv?subject=Print%20Order%20-%20${encodeURIComponent(photo.title)}&body=I'd%20like%20to%20order%20a%20print%20of%20"${encodeURIComponent(photo.title)}"%20from%20${encodeURIComponent(shoot.title)}`}
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          padding: '8px',
                          background: '#1a1a1a',
                          color: '#fff',
                          borderRadius: 6,
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                        }}
                      >
                        Order Print
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 10000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="Enlarged" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} />
        </div>
      )}
    </div>
  );
}
