import { Suspense } from 'react';
import PortalReviewsClient from './reviews-client';

export const dynamic = 'force-dynamic';

export default function PortalReviewsPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-muted)' }}>Loading reviews...</div>}>
      <PortalReviewsClient />
    </Suspense>
  );
}
