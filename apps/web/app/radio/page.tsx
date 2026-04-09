// apps/web/app/radio/page.tsx
// Big Muddy Radio — live stream player (mobile-first, dark theme)

import type { Metadata } from 'next';

import { RadioStreamPlayer } from './RadioStreamPlayer';

export const metadata: Metadata = {
  title: 'Listen Live',
  description:
    'Stream Big Muddy Radio live. Song info, listener count, and daily schedule from Natchez, Mississippi.',
};

export default function RadioListenPage() {
  return <RadioStreamPlayer />;
}
