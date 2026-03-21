// apps/web/app/admin/login/page.tsx
// Admin login page — Google OAuth + Email/Password

import { signIn } from '@/auth';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; callbackUrl?: string };
}) {
  const callbackUrl = searchParams?.callbackUrl || '/ops';

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
        <p className="login-sub">Welcome to the team. Sign in below.</p>

        {searchParams?.error && (
          <div className="login-error">
            {searchParams.error === 'CredentialsSignin'
              ? 'Invalid email or password. Check your credentials and try again.'
              : 'Something went wrong. Please try again.'}
          </div>
        )}

        {/* Email + Password Form */}
        <form
          action={async (formData: FormData) => {
            'use server';
            await signIn('credentials', {
              email: formData.get('email') as string,
              password: formData.get('password') as string,
              redirectTo: callbackUrl,
            });
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className="login-input"
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="login-input"
            autoComplete="current-password"
          />
          <button type="submit" className="login-btn login-btn-primary">
            Sign In
          </button>
        </form>

        <div className="login-divider">
          <span>or</span>
        </div>

        {/* Google OAuth */}
        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: callbackUrl });
          }}
        >
          <button type="submit" className="login-btn login-btn-google">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: '0.5rem' }}>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </form>

        <p className="login-footer">
          Big Muddy operations team &middot; Need access? Email <a href="mailto:me@chasepierson.tv" className="login-link">me@chasepierson.tv</a>
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
          margin: 0 0 1.5rem;
          letter-spacing: 0.02em;
        }
        .login-error {
          background: rgba(181, 76, 76, 0.15);
          border: 1px solid rgba(181, 76, 76, 0.3);
          color: #e8a0a0;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          font-size: 0.813rem;
          margin-bottom: 1.5rem;
          text-align: left;
        }
        .login-input {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          background: #1a1816;
          border: 1px solid rgba(240, 235, 224, 0.15);
          border-radius: 6px;
          color: #f0ebe0;
          margin-bottom: 0.75rem;
          outline: none;
          transition: border-color 0.15s ease;
          box-sizing: border-box;
        }
        .login-input:focus {
          border-color: #c8943e;
        }
        .login-input::placeholder {
          color: rgba(240, 235, 224, 0.3);
        }
        .login-btn {
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
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-btn:hover {
          transform: translateY(-1px);
        }
        .login-btn:active {
          transform: scale(0.98);
        }
        .login-btn-primary {
          background: #c8943e;
          color: #1a1816;
        }
        .login-btn-primary:hover {
          background: #d4a24e;
        }
        .login-btn-google {
          background: rgba(240, 235, 224, 0.08);
          color: #f0ebe0;
          border: 1px solid rgba(240, 235, 224, 0.15);
        }
        .login-btn-google:hover {
          background: rgba(240, 235, 224, 0.12);
        }
        .login-divider {
          display: flex;
          align-items: center;
          margin: 1.25rem 0;
          color: rgba(240, 235, 224, 0.25);
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .login-divider::before,
        .login-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(240, 235, 224, 0.1);
        }
        .login-divider span {
          padding: 0 1rem;
        }
        .login-footer {
          color: rgba(240, 235, 224, 0.3);
          font-size: 0.75rem;
          margin: 1.5rem 0 0;
          letter-spacing: 0.03em;
        }
        .login-link {
          color: #c8943e;
          text-decoration: none;
        }
        .login-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
