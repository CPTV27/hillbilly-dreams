// apps/web/auth.ts
// NextAuth v5 configuration — Google OAuth with email whitelist
// Only whitelisted emails can access the admin panel.

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@bigmuddy/database';

// Domains that get full access (any user @ these domains)
const ALLOWED_DOMAINS = [
  'chasepierson.tv',
];

// Individual emails that get full access
const ALLOWED_EMAILS = [
  'chase@scan2plan.io',
  'chase@scantoplan.io',
  'tracy@thebigmuddyinn.com',
  'amy@thebigmuddyinn.com',
];

function isAllowedUser(email: string | null | undefined): boolean {
  if (!email) return false;
  const lower = email.toLowerCase();
  const domain = lower.split('@')[1];
  return ALLOWED_DOMAINS.includes(domain) || ALLOWED_EMAILS.includes(lower);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return isAllowedUser(user.email);
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;

        const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
        token.role = dbUser?.role || 'viewer';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
});
