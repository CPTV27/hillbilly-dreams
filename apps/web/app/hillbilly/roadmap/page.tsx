import { permanentRedirect } from 'next/navigation';

// Corporate roadmap route → single canonical roadmap (admin auth).
// Public static stub: /sandbox/roadmap.html (sign-in CTA only).

export default function HillbillyRoadmapPage() {
  permanentRedirect('/admin/roadmap');
}
