'use client';

// TourCard — client component so hover state works in App Router

const C = {
  bg: '#ffffff',
  bgPage: '#f8f9fa',
  surface: '#ffffff',
  border: '#e8eaed',
  text: '#202124',
  textSecondary: '#5f6368',
  textTertiary: '#9aa0a6',
  blue: '#1a73e8',
  blueLight: '#e8f0fe',
  blueBorder: 'rgba(26, 115, 232, 0.2)',
  shadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
  shadowHover: '0 2px 8px rgba(0,0,0,0.10), 0 8px 32px rgba(0,0,0,0.07)',
};

export interface StopProps {
  step: string;
  title: string;
  href: string;
  description: string;
  isFinal: boolean;
}

export default function TourCard({ step, title, href, description, isFinal }: StopProps) {
  if (isFinal) {
    return (
      <a
        href={href}
        style={{
          display: 'block',
          textDecoration: 'none',
          backgroundColor: C.blueLight,
          border: `2px solid ${C.blue}`,
          borderRadius: 12,
          padding: '28px 28px 28px 32px',
          boxShadow: C.shadow,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Left accent bar — always visible on final card */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            backgroundColor: C.blue,
            borderRadius: '12px 0 0 12px',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div style={{ flex: 1 }}>
            {/* Step + badge row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.blue,
                  letterSpacing: '0.1em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {step}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#ffffff',
                  backgroundColor: C.blue,
                  padding: '2px 8px',
                  borderRadius: 100,
                  letterSpacing: '0.04em',
                }}
              >
                Main Event
              </span>
            </div>

            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: C.text,
                margin: '0 0 10px',
                letterSpacing: '-0.01em',
              }}
            >
              {title}
            </h2>

            <p
              style={{
                fontSize: 15,
                color: C.textSecondary,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {description}
            </p>
          </div>

          {/* Arrow — solid blue */}
          <div
            style={{
              flexShrink: 0,
              width: 36,
              height: 36,
              borderRadius: 8,
              backgroundColor: C.blue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 2,
            }}
          >
            <ArrowIcon color="#ffffff" size={16} />
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      style={{
        display: 'block',
        textDecoration: 'none',
        backgroundColor: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: '24px 24px 24px 28px',
        boxShadow: C.shadow,
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.15s ease, border-color 0.15s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = C.shadowHover;
        el.style.borderColor = C.blueBorder;
        const bar = el.querySelector<HTMLElement>('.accent-bar');
        if (bar) bar.style.backgroundColor = C.blue;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = C.shadow;
        el.style.borderColor = C.border;
        const bar = el.querySelector<HTMLElement>('.accent-bar');
        if (bar) bar.style.backgroundColor = 'transparent';
      }}
    >
      {/* Left accent bar — appears on hover */}
      <div
        className="accent-bar"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          backgroundColor: 'transparent',
          borderRadius: '12px 0 0 12px',
          transition: 'background-color 0.15s ease',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          {/* Step number */}
          <span
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 700,
              color: C.textTertiary,
              letterSpacing: '0.1em',
              marginBottom: 8,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {step}
          </span>

          <h2
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: C.text,
              margin: '0 0 8px',
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h2>

          <p
            style={{
              fontSize: 14,
              color: C.textSecondary,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        {/* Arrow — muted */}
        <div
          style={{
            flexShrink: 0,
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: C.bgPage,
            border: `1px solid ${C.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 2,
          }}
        >
          <ArrowIcon color={C.textSecondary} size={14} />
        </div>
      </div>
    </a>
  );
}

function ArrowIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
