// apps/web/components/Analytics.tsx
// Centralised analytics scripts — GA4 + Plausible + Microsoft Clarity.
// Each provider only renders when its env var is set.

import Script from 'next/script';

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

export function Analytics() {
  return (
    <>
      {/* ── Google Analytics 4 ── */}
      {/* TODO: Generate GA4 Property ID at analytics.google.com -> Admin -> Data Streams -> Web. Then add NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX to your .env or server secrets. */}
      {/* ── Google Analytics 4 ── */}
      {gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}');
            `}
          </Script>
        </>
      )}

      {/* ── Plausible ── */}
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}

      {/* ── Microsoft Clarity — free heat maps, session replay, rage click detection ── */}
      {clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}

      {/* ── Global error tracking — catches unhandled client errors ── */}
      <Script id="error-tracker" strategy="afterInteractive">
        {`
          window.addEventListener('error', function(e) {
            console.error('[BMT Client Error]', e.message, e.filename, e.lineno);
            if (window.clarity) window.clarity('set', 'error', e.message);
            if (window.gtag) window.gtag('event', 'exception', { description: e.message, fatal: true });
          });
          window.addEventListener('unhandledrejection', function(e) {
            console.error('[BMT Unhandled Promise]', e.reason);
            if (window.clarity) window.clarity('set', 'unhandled_rejection', String(e.reason));
            if (window.gtag) window.gtag('event', 'exception', { description: String(e.reason), fatal: false });
          });
        `}
      </Script>
    </>
  );
}
