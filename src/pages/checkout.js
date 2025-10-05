import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import styles from '@/styles/Static.module.css';
import { formatPriceIdrFromUsd } from '@/utils/currency';

export async function getServerSideProps(ctx) {
  // Disini middleware juga akan menahan akses, tapi SSR redirect sebagai cadangan
  const session = await getSession(ctx);
  if (!session) return { redirect: { destination: '/login', permanent: false } };
  return { props: {} };
}

export default function CheckoutPage() {
  const cart = useCart();
  const totalUsd = cart.items.reduce((sum, it) => sum + it.quantity, 0); // placeholder; dihitung di server biasanya

  const handlePlaceOrder = () => {
    alert('Pesanan dibuat (demo). Terima kasih!');
    cart.clear();
  };

  return (
    <>
      <Head>
        <title>Checkout - RevoShop</title>
      </Head>
      <main className={styles.container}>
        <h1>Checkout</h1>
        {cart.items.length === 0 ? (
          <p>Tidak ada item di keranjang.</p>
        ) : (
          <>
            <p>Ringkasan akan diproses saat pembayaran.</p>
            <button onClick={handlePlaceOrder} className={styles.button}>Buat Pesanan</button>
          </>
        )}
      </main>
    </>
  );
}


