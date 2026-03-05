// apps/web/app/admin/login/page.tsx
// Admin login page — Southern Gothic styled, Google OAuth only

import { signIn } from '@/auth';

export default function LoginPage() {
  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="login-brand">
          <svg width="36" height="36" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M14 6 L22 10.5 L22 17.5 L14 22 L6 17.5 L6 10.5 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="14" cy="14" r="2.5" fill="currentColor" />
          </svg>
        </div>

        <h1 className="login-title">Big Muddy Command</h1>
        <p className="login-sub">Authorized personnel only.</p>

        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/dashboard' });
          }}
        >
          <button type="submit" className="login-btn">
            Sign in with Google
          </button>
        </form>

        <p className="login-footer">
          Access restricted to Big Muddy operations team.
        </p>
      </div>

      <style>{`
        .login-shell {
          min-height: 100vh;
          background: #1a1816;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          padding: 2rem;
        }
        .login-card {
          text-align: center;
          padding: 3rem 2.5rem;
          border: 1px solid rgba(200, 148, 62, 0.2);
          border-radius: 8px;
          background: #231f1c;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
        }
        .login-brand {
          color: #c8943e;
          margin-bottom: 1.5rem;
        }
        .login-title {
          font-family: 'Playfair Display', serif;
          color: #f0ebe0;
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin: 0 0 0.5rem;
        }
        .login-sub {
          color: rgba(240, 235, 224, 0.5);
          font-size: 0.875rem;
          margin: 0 0 2rem;
          letter-spacing: 0.02em;
        }
        .login-btn {
          background: #c8943e;
          color: #1a1816;
          border: none;
          padding: 0.75rem 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.02em;
          width: 100%;
          transition: background 0.15s ease, transform 0.1s ease;
        }
        .login-btn:hover {
          background: #d4a24e;
        }
        .login-btn:active {
          transform: scale(0.98);
        }
        .login-footer {
          color: rgba(240, 235, 224, 0.3);
          font-size: 0.75rem;
          margin: 1.5rem 0 0;
          letter-spacing: 0.03em;
        }
      `}</style>
    </div>
  );
}
