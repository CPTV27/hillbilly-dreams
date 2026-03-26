export default function MVXPage() {
  return (
    <div
      style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        fontFamily: 'var(--font-inter), sans-serif',
        color: '#202124',
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '80px 32px 48px',
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#b45309',
            marginBottom: 16,
          }}
        >
          Prototype
        </p>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#202124',
            marginBottom: 20,
          }}
        >
          MVX — Spatial Prototype
        </h1>
        <p
          style={{
            fontSize: 20,
            color: '#5f6368',
            lineHeight: 1.6,
          }}
        >
          Where we're headed.
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto 56px',
          padding: '0 32px',
        }}
      >
        <div style={{ height: 1, backgroundColor: '#e8eaed' }} />
      </div>

      {/* Body */}
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        {/* Description card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e8eaed',
            borderRadius: 12,
            padding: '32px 32px 28px',
          }}
        >
          <p
            style={{
              fontSize: 16,
              color: '#202124',
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            MVX is an early prototype exploring how architectural scan data could be embedded directly into a web dashboard.
          </p>
          <p
            style={{
              fontSize: 15,
              color: '#5f6368',
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            Built with React Three Fiber and Three.js, this is a design concept — mapping the trajectory for spatial intelligence in the HDX platform.
          </p>
          <p
            style={{
              fontSize: 15,
              color: '#5f6368',
              lineHeight: 1.7,
            }}
          >
            This is a concept demo, not a live product.
          </p>
        </div>

        {/* Spatial viewer placeholder */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e8eaed',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: 360,
              background: 'linear-gradient(135deg, #f1f3f4 0%, #e8eaed 50%, #f1f3f4 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
          >
            {/* Wireframe cube hint — pure CSS, no Three.js */}
            <div
              style={{
                width: 72,
                height: 72,
                border: '2px solid #b45309',
                borderRadius: 4,
                opacity: 0.4,
                transform: 'rotate(12deg)',
                marginBottom: 8,
              }}
            />
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#9aa0a6',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              3D Spatial Viewer — Prototype
            </p>
            <p
              style={{
                fontSize: 12,
                color: '#9aa0a6',
              }}
            >
              React Three Fiber · Three.js
            </p>
          </div>
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid #e8eaed',
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: '#9aa0a6',
              }}
            >
              Concept only. 3D rendering not active in this build.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          maxWidth: 720,
          margin: '72px auto 0',
          padding: '32px 32px 64px',
          borderTop: '1px solid #e8eaed',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: '#9aa0a6',
            letterSpacing: '0.02em',
          }}
        >
          Part of the HDX Platform roadmap.
        </p>
      </div>
    </div>
  );
}
