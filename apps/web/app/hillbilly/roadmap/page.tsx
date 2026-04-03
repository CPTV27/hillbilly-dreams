import { permanentRedirect } from 'next/navigation';

// Serves hillbillydreamsinc.com/roadmap (middleware rewrites to /hillbilly/roadmap).
// Canonical roadmap markup lives in public/sandbox/roadmap.html — one file to edit, no JSX port.

export default function HillbillyRoadmapPage() {
  permanentRedirect('/sandbox/roadmap.html');
}
