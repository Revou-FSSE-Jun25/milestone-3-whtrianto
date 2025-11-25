import { withAuth } from 'next-auth/middleware';
import { isAdminToken } from '@/lib/auth';

export default withAuth(
  function middleware() {
    // Additional middleware logic can go here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return isAdminToken(token);
        }

        return true;
      },
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
