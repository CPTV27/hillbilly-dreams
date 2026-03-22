// apps/web/app/(demo)/layout.tsx
// Public wrapper for the KioskMode Pro demo experience.
// No auth, no nav — just the product.

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#0a0907]">
      {/* Demo mode badge — fixed top-right */}
      <div className="fixed top-4 right-4 z-50 pointer-events-none">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          KioskMode Pro — Live Demo
        </span>
      </div>
      {children}
    </div>
  );
}
