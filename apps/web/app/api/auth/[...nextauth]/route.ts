// apps/web/app/api/auth/[...nextauth]/route.ts
// NextAuth v5 API route handler

import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
