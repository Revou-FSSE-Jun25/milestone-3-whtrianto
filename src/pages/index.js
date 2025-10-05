import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { formatPriceIdrFromUsd } from '@/utils/currency';
import dynamic from 'next/dynamic';
import { useProducts } from '@/hooks/useProducts';
import { getAllProducts } from '@/lib/productsStore';

export async function getStaticProps() {
  try {
    // Gunakan store internal agar tidak perlu absolute URL di build/ISR
    const products = await getAllProducts();
    return {
      props: { products },
      revalidate: 60, // ISR: memperbarui maksimal sekali per menit
    };
  } catch (error) {
    return {
      props: { products: [], error: error.message },
      revalidate: 60,
    };
  }
}

export default function Home({ products, error }) {
  // Prefetch dari ISR + refresh ringan via client cache
  const { data: clientData } = useProducts(30_000);
  const mergedProducts = clientData ?? products;
  return (
    <>
      <Head>
        <title>RevoShop - Beranda</title>
        <meta name="description" content="Daftar produk RevoShop" />
      </Head>
      <main className={styles.container}>
        <h1 className={styles.title}>RevoShop</h1>
        {/** Pesan error akan muncul jika pengambilan data gagal */}
        {error && <p className={styles.error}>Kesalahan: {error}</p>}
        {!error && mergedProducts.length === 0 && (
          <p className={styles.subtitle}>Belum ada produk tersedia.</p>
        )}

        <div className={styles.grid}>
          {mergedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.title} />
              </div>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.price}>{formatPriceIdrFromUsd(product.price)}</p>
            </Link>
          ))}
        </div>

        <nav className={styles.navLinks}>
          <Link href="/faq">Tanya Jawab</Link>
          <Link href="/promotions">Promosi</Link>
        </nav>
      </main>
    </>
  );
}


