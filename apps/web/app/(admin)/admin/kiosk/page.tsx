import { KioskGlassClient } from './KioskGlassClient';

export const dynamic = 'force-dynamic';

type SearchParams = { session?: string };

export default function KioskPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = searchParams.session;
  const initialSessionId =
    typeof raw === 'string' && raw.trim().length > 0 ? raw.trim().slice(0, 128) : 'kiosk-default';

  return <KioskGlassClient initialSessionId={initialSessionId} />;
}
