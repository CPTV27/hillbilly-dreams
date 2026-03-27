import TracyDashboard from './tracy-client';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Executive Dashboard — Tracy Alderson-Allen',
  description: 'HDI Executive Summary & Financial Reports',
};

export default function TracyPage() {
  return <TracyDashboard />;
}
