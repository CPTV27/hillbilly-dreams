'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

const SLIDE_MS = 8000;
const FADE_MS = 1000;

interface Props {
  /** Up to 6 image URLs; caller slices from photo index */
  slides: string[];
  children: ReactNode;
}

export function TouringHeroSlideshow({ slides, children }: Props) {
  const usable = slides.filter(Boolean);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (usable.length <= 1 || paused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % usable.length);
    }, SLIDE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [usable.length, paused]);

  if (usable.length === 0) {
    return null;
  }

  return (
    <div
      style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {usable.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden={i !== active}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === active ? 0.4 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
            pointerEvents: 'none',
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, #0f0f0d 0%, transparent 50%, rgba(15,15,13,0.3) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 0 80px' }}>
        {children}
      </div>
    </div>
  );
}
