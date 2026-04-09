'use client';

/**
 * Sanity Studio embedded route.
 * Tracy and Amy authenticate through Sanity's built-in auth.
 * This route does NOT conflict with /studioc or /studio-c (Studio C Video company routes).
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
