import { Suspense } from 'react';
import PortalReportsClient from './reports-client';

export const dynamic = 'force-dynamic';

export default function PortalReportsPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-muted)' }}>Loading reports...</div>}>
      <PortalReportsClient />
    </Suspense>
  );
}
