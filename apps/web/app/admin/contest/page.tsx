import { scanContestEntries } from '@/lib/contest/scanEntries';
import { ContestGalleryClient } from './ContestGalleryClient';

export const dynamic = 'force-dynamic';

export default function AdminContestPage() {
  const tracks = scanContestEntries();
  return <ContestGalleryClient tracks={tracks} />;
}
