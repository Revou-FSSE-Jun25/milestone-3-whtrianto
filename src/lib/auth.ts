import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

const ADMIN_ROLE = 'admin';

export const isAdminSession = (session: Session | null): boolean =>
  session?.user?.role === ADMIN_ROLE;

export const isAdminToken = (token?: JWT | null): boolean =>
  token?.role === ADMIN_ROLE;

export const assertAdmin = (session: Session | null) => {
  if (!isAdminSession(session)) {
    throw new Error('Unauthorized');
  }
};

