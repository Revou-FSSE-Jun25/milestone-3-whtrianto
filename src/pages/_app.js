import Layout from '@/components/Layout';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '@/context/CartContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <CartProvider>
        <Layout>
          {/**
           * Next.js akan merender setiap page sebagai `Component` dan mengoper `pageProps`.
           * Kita membungkusnya dengan `Layout` agar Navbar dan Footer konsisten.
           */}
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </SessionProvider>
  );
}


