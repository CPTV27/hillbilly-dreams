// apps/web/auth.ts
// ─────────────────────────────────────────────────────────────
// HDX NextAuth v5 Configuration Engine
// ─────────────────────────────────────────────────────────────
// PLATFORM-PORTABLE auth engine. Tenant-specific access control
// data and lifecycle callbacks are imported from config/auth-rules.ts.
// Database logging (OpsActivity) is injected — the engine never
// imports tenant DB models directly.
//
// TENANT DATA lives in config/auth-rules.ts (BMT-specific).
// To adapt for another HDX sovereign, swap the import.
//
// Seam introduced: 2026-03-24 — Phase 2 Wave 3 (AG)
// ─────────────────────────────────────────────────────────────

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@bigmuddy/database';

// ── Tenant Config Import ──
import {
  BMT_AUTH_RULES,
  getTeamPassword,
} from './config/auth-rules';
import type { OnSignInCallback, OnJwtEnrichCallback } from './config/auth-rules';

// ── BMT Lifecycle Callbacks (injected into the engine) ──

/**
 * BMT sign-in callback: logs login activity to OpsActivity.
 * The auth engine calls this but never references OpsActivity directly.
 */
const bmtOnSignIn: OnSignInCallback = async (user) => {
  try {
    await prisma.opsActivity.create({
      data: {
        type: 'login',
        message: `${user.name || user.email} signed in`,
        userId: user.email || 'unknown',
        userName: user.name || user.email?.split('@')[0] || 'Unknown',
      },
    });
  } catch (e) {
    // Non-fatal — don't block login if activity log fails
    console.error('[Auth] Failed to log login activity:', e);
  }
};

/**
 * BMT JWT enrichment: loads role, interfaceTheme, onboardingStep from User model.
 */
const bmtOnJwtEnrich: OnJwtEnrichCallback = async (email) => {
  const dbUser = await prisma.user.findUnique({ where: { email } });
  if (!dbUser) return null;
  return {
    role: dbUser.role || BMT_AUTH_RULES.defaultRole,
    interfaceTheme: dbUser.interfaceTheme || 'minimal',
    onboardingStep: dbUser.onboardingStep || 'pending_survey',
  };
};

// ── Platform: Auth Engine ──

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          scope: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/calendar.readonly',
            'https://www.googleapis.com/auth/drive.readonly',
            'https://www.googleapis.com/auth/gmail.readonly',
          ].join(' '),
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
    // ── QuickBooks Online (Intuit) Custom Provider ──
    {
      id: 'quickbooks',
      name: 'QuickBooks Online',
      type: 'oauth',
      clientId: process.env.QBO_CLIENT_ID,
      clientSecret: process.env.QBO_CLIENT_SECRET,
      authorization: {
        url: 'https://appcenter.intuit.com/connect/oauth2',
        params: {
          scope: 'com.intuit.quickbooks.accounting openid profile email',
          response_type: 'code',
        },
      },
      token: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
      userinfo: {
        // Sandbox for dev; swap to accounts.platform.intuit.com for production
        url: process.env.QBO_SANDBOX === 'true'
          ? 'https://sandbox-accounts.platform.intuit.com/v1/openid_connect/userinfo'
          : 'https://accounts.platform.intuit.com/v1/openid_connect/userinfo',
      },
      profile(profile: any) {
        return {
          id: profile.sub,
          name: profile.givenName
            ? `${profile.givenName} ${profile.familyName || ''}`.trim()
            : profile.email,
          email: profile.email,
        };
      },
    },
    Credentials({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;
        if (password !== getTeamPassword()) return null;
        // Auth open — any email accepted

        // Find or create user in database
        let user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: email.toLowerCase(),
              name: email.split('@')[0],
              role: BMT_AUTH_RULES.defaultRole,
            },
          });
        }

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Auth open — no email whitelist check
      // Invoke tenant sign-in callback (OpsActivity logging, etc.)
      await bmtOnSignIn(user);
      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === 'update' && session) {
        if (session.onboardingStep !== undefined) token.onboardingStep = session.onboardingStep;
        if (session.interfaceTheme !== undefined) token.interfaceTheme = session.interfaceTheme;
      }
      // ── Token Vault: capture OAuth tokens on initial sign-in ──
      // PrismaAdapter writes the Account record to DB (primary vault).
      // We also pass tokens through the JWT for immediate session access.
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
        // QBO-specific: capture realmId from the authorization response
        if (account.provider === 'quickbooks' && account.realmId) {
          token.qboRealmId = account.realmId;
        }
      }
      if (user) {
        token.id = user.id;
        // Enrich token with tenant-specific user data
        const enrichment = await bmtOnJwtEnrich(user.email!);
        if (enrichment) {
          token.role = enrichment.role;
          token.interfaceTheme = enrichment.interfaceTheme;
          token.onboardingStep = enrichment.onboardingStep;
        } else {
          token.role = BMT_AUTH_RULES.defaultRole;
          token.interfaceTheme = 'minimal';
          token.onboardingStep = 'pending_survey';
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).interfaceTheme = token.interfaceTheme as string;
        (session.user as any).onboardingStep = token.onboardingStep as string;
        // ── Expose token state for dashboard connection indicators ──
        (session.user as any).provider = token.provider as string;
        (session.user as any).hasAccessToken = !!token.accessToken;
        (session.user as any).qboRealmId = token.qboRealmId as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: BMT_AUTH_RULES.signInPage,
    error: BMT_AUTH_RULES.errorPage,
  },
});

