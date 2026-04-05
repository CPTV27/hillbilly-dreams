'use client';

export function CaseStudyPrintButton() {
  return (
    <button
      type="button"
      className="cs-print-btn no-print"
      onClick={() => window.print()}
    >
      Print / save PDF
    </button>
  );
}
