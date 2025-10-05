import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyUserPassword } from '@/lib/usersStore';

// NextAuth konfigurasi dengan CredentialsProvider menggunakan FakeStoreAPI untuk autentikasi
export const authOptions = {
  // Gunakan default dev-secret jika env belum diset agar sesi tidak gagal didekripsi saat pengembangan
  secret: process.env.NEXTAUTH_SECRET || 'revoshop-dev-secret',
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        try {
          const user = await verifyUserPassword(credentials.username, credentials.password);
          if (!user) return null;
          return {
            id: String(user.id),
            name: user.name || user.username,
            username: user.username,
            email: user.email || `${user.username}@example.com`,
            role: user.role || 'user',
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.role = user.role || 'user';
      }
      return token;
    },
    async session({ session, token }) {
      session.user = session.user || {};
      session.user.name = session.user.name || token.name;
      session.user.username = token.username;
      session.user.role = token.role;
      return session;
    },
  },
};

export default NextAuth(authOptions);


