import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV !== 'production') {
  process.env.NEXTAUTH_SECRET = 'devsecret123';
}

declare module 'next-auth' {
  interface User {
    role?: 'admin' | 'user';
  }

  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: 'admin' | 'user';
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'admin' | 'user';
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'devsecret123',
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Dummy authentication - in real app, check against database
        const dummyUsers = [
          { id: '1', email: 'admin@revoshop.com', password: 'admin123', name: 'Admin User', role: 'admin' as const },
          { id: '2', email: 'user@revoshop.com', password: 'user123', name: 'Regular User', role: 'user' as const }
        ];

        const user = dummyUsers.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
