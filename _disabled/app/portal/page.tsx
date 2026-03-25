import { Suspense } from 'react';
import PortalDashboardClient from './dashboard-client';

export const dynamic = 'force-dynamic';

export default function PortalPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-muted)' }}>Loading dashboard...</div>}>
      <PortalDashboardClient />
    </Suspense>
  );
}
