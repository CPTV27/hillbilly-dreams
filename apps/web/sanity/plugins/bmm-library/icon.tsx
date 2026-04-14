// apps/web/sanity/plugins/bmm-library/icon.tsx
// Tiny SVG icon shown in Sanity Studio's asset-source switcher.

export function BmmLibraryIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Stack of photos — a library, not a single image */}
      <rect x="3" y="5" width="14" height="14" rx="2" />
      <rect x="7" y="9" width="14" height="14" rx="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="12" cy="14" r="1.5" />
      <path d="M10 17.5 12 15.5 16 19" />
    </svg>
  );
}
