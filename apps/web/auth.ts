// apps/web/auth.ts
// NextAuth v5 configuration — Google OAuth with email whitelist
// Only whitelisted emails can access the admin panel.

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@bigmuddy/database';

// Only these emails can access admin
const ALLOWED_EMAILS = [
  'me@chasepierson.tv',
  'chase@scan2plan.io',
  'chase@scantoplan.io',
  'tracy@thebigmuddyinn.com',
  'amy@thebigmuddyinn.com',
];

export const { handlers, auth, signIn, signOut } = NextAuth({
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
      // Only allow whitelisted emails
      return ALLOWED_EMAILS.includes(user.email?.toLowerCase() ?? '');
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
