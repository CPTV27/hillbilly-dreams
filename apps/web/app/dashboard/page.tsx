'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import TextMode from '@/components/modes/TextMode';
import TasksMode from '@/components/modes/TasksMode';
import GalleryMode from '@/components/modes/GalleryMode';

type Mode = 'text' | 'tasks' | 'gallery';

export default function DashboardPage() {
  const [mode, setMode] = useState<Mode>('text');

  // Hardcoded for now — will come from auth/session later
  const biz = { name: "Marcus's BBQ", city: 'Natchez' };

  return (
    <AppShell businessName={biz.name} activeMode={mode} onModeChange={setMode}>
      {mode === 'text' && <TextMode businessName={biz.name} businessCity={biz.city} />}
      {mode === 'tasks' && <TasksMode onSwitchToChat={(text) => { setMode('text'); }} />}
      {mode === 'gallery' && <GalleryMode />}
    </AppShell>
  );
}
