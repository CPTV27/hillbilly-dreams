// packages/ui/components/VideoHero.tsx
// Full-bleed video background hero section
// Used across brand pages for cinematic hero headers
// Falls back to poster image if video fails to load or on slow connections

'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoHeroProps {
  /** Path to MP4 video (e.g. "/video/heroes/natchez-sunset-1.mp4") */
  videoSrc: string;
  /** Optional WebM source for better compression */
  videoSrcWebm?: string;
  /** Poster image shown while video loads */
  posterSrc?: string;
  /** Dark overlay opacity (0-1, default 0.55) */
  overlayOpacity?: number;
  /** Additional gradient overlay CSS */
  overlayGradient?: string;
  /** Fixed height or full viewport */
  height?: 'full' | '70vh' | '80vh' | '60vh';
  /** Children rendered on top of the video */
  children: React.ReactNode;
  /** Additional className for the wrapper */
  className?: string;
}

export function VideoHero({
  videoSrc,
  videoSrcWebm,
  posterSrc,
  overlayOpacity = 0.55,
  overlayGradient,
  height = 'full',
  children,
  className = '',
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Only autoplay on non-reduced-motion and non-data-saver
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dataSaver = (navigator as any).connection?.saveData;

    if (prefersReducedMotion || dataSaver) {
      // Show poster image instead
      video.pause();
      return;
    }

    // Try to play; if blocked (e.g. autoplay policy), fail silently
    video.play().catch(() => {});
  }, []);

  const heightClass =
    height === 'full'
      ? 'min-h-screen'
      : height === '80vh'
        ? 'min-h-[80vh]'
        : height === '70vh'
          ? 'min-h-[70vh]'
          : 'min-h-[60vh]';

  return (
    <section
      className={`relative overflow-hidden ${heightClass} flex items-center justify-center ${className}`}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterSrc}
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: 0 }}
      >
        {videoSrcWebm && <source src={videoSrcWebm} type="video/webm" />}
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Poster fallback (visible until video loads) */}
      {posterSrc && !videoLoaded && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${posterSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: overlayGradient
            || `linear-gradient(180deg, rgba(0,0,0,${overlayOpacity * 0.8}) 0%, rgba(0,0,0,${overlayOpacity}) 40%, rgba(0,0,0,${overlayOpacity * 1.1}) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
