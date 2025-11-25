import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { isAdminSession, isAdminToken } from '@/lib/auth';

describe('auth helpers', () => {
  const baseSession = {
    user: { id: '1', email: 'user@revoshop.com', name: 'User' },
    expires: new Date().toISOString(),
  } satisfies Session;

  it('returns true for session with admin role', () => {
    const session: Session = {
      ...baseSession,
      user: { ...baseSession.user, role: 'admin' },
    };
    expect(isAdminSession(session)).toBe(true);
  });

  it('returns false for session without admin role', () => {
    expect(isAdminSession(baseSession)).toBe(false);
  });

  it('returns true for token with admin role', () => {
    const token: JWT = { role: 'admin', name: 'Admin' };
    expect(isAdminToken(token)).toBe(true);
  });

  it('returns false for token without admin role', () => {
    const token: JWT = { role: 'user', name: 'User' };
    expect(isAdminToken(token)).toBe(false);
  });
});

