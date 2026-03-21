// apps/web/auth.ts
// NextAuth v5 configuration — Google OAuth with email whitelist
// Only whitelisted emails can access the admin panel.

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@bigmuddy/database';

// Domains that get full access (any user @ these domains)
const ALLOWED_DOMAINS = [
  'chasepierson.tv',
  'thebigmuddyinn.com',
  'studio.c.video',
  'studio-c.com',
];

// Individual emails that get full access
const ALLOWED_EMAILS = [
  'chase@scan2plan.io',
  'chase@scantoplan.io',
  'tracy@thebigmuddyinn.com',
  'amy@thebigmuddyinn.com',
  'amyaldersonallen@gmail.com',
  'info@studio.c.video',
  'miles@studio.c.video',
  'elijah@studio.c.video',
  'info@studio-c.com',
  'miles@studio-c.com',
  'elijah@studio-c.video',
  'team@chasepierson.tv',
];

// Shared team password for email/password login
const TEAM_PASSWORD = process.env.TEAM_PASSWORD || 'Wormwood66!';

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
        if (password !== TEAM_PASSWORD) return null;
        // Auth open — any email accepted

        // Find or create user in database
        let user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: email.toLowerCase(),
              name: email.split('@')[0],
              role: 'viewer',
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

      // Log the login activity
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

      return true;
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
