import type { Metadata } from 'next';
import { SovereignPiConfigureClient } from './SovereignPiConfigureClient';

export const metadata: Metadata = {
  title: 'Configure Sovereign Pi — live total',
  description:
    'Pick battery, solar, Faraday case, and HDMI. Running total updates as you go. Order by email until Stripe checkout is live.',
};

export default function SovereignPiConfigurePage() {
  return <SovereignPiConfigureClient />;
}
