// Amy's custom layout — forces light theme over the global dark tokens
export default function AmyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8"
      style={{
        backgroundColor: '#fafaf9',
        color: '#171717',
        // Override CSS custom properties from tokens.css
        ['--bg' as string]: '#fafaf9',
        ['--text' as string]: '#171717',
        ['--text-muted' as string]: '#737373',
        ['--surface' as string]: '#ffffff',
        ['--border' as string]: '#e5e5e5',
      }}
    >
      {children}
    </div>
  );
}
