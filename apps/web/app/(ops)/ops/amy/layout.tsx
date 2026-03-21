// Amy's layout — dark immersive aesthetic, VR-ready design language
export default function AmyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen -m-4 sm:-m-6 lg:-m-8 p-0"
      style={{
        backgroundColor: '#0a0a0f',
        color: '#e8e8f0',
        ['--bg' as string]: '#0a0a0f',
        ['--text' as string]: '#e8e8f0',
        ['--text-muted' as string]: '#6b6b80',
        ['--surface' as string]: 'rgba(255,255,255,0.05)',
        ['--border' as string]: 'rgba(255,255,255,0.1)',
      }}
    >
      {children}
    </div>
  );
}
