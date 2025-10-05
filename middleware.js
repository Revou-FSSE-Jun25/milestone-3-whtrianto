import { withAuth } from 'next-auth/middleware';

// Lindungi halaman checkout dan admin; admin membutuhkan role 'admin'
export default withAuth(
  function middleware(req) {},
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (pathname.startsWith('/admin')) {
          return Boolean(token) && token.role === 'admin';
        }
        if (pathname.startsWith('/checkout')) {
          return Boolean(token);
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*'],
};


