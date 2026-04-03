import { permanentRedirect } from 'next/navigation';

// hillbillydreamsinc.com/roadmap → single canonical roadmap (admin auth).
// Public static stub: /sandbox/roadmap.html (sign-in CTA only).

export default function HillbillyRoadmapPage() {
  permanentRedirect('/admin/roadmap');
}
