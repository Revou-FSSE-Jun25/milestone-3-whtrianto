import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '@/styles/Product.module.css';
import { formatPriceIdrFromUsd } from '@/utils/currency';
import { getProductById } from '@/lib/productsStore';
import { useCart } from '@/context/CartContext';

export async function getStaticPaths() {
  // Pre-render minimal set; sisanya fallback
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  try {
    const product = await getProductById(id);
    if (!product) return { notFound: true, revalidate: 60 };
    return { props: { product }, revalidate: 60 };
  } catch (error) {
    return { props: { product: null, error: error.message }, revalidate: 60 };
  }
}

export default function ProductDetail({ product, error }) {
  const [added, setAdded] = useState(false);
  const [clientError, setClientError] = useState(null);
  const cart = useCart();

  useEffect(() => {
    if (error) setClientError(error);
  }, [error]);

  if (!product && !clientError) {
    return <main className={styles.container}>Memuat...</main>;
  }

  if (clientError) {
    return (
      <main className={styles.container}>
        <p className={styles.error}>Gagal memuat produk: {clientError}</p>
        <Link href="/">Kembali ke Beranda</Link>
      </main>
    );
  }

  const addToCart = () => {
    try {
      cart.add(product.id, 1);
      setAdded(true);
    } catch (e) {
      setClientError('Gagal menambahkan ke keranjang');
    }
  };

  return (
    <>
      <Head>
        <title>{product.title} - RevoShop</title>
        <meta name="description" content={product.description} />
      </Head>
      <main className={styles.container}>
        <Link href="/" className={styles.back}>
          ← Kembali ke produk
        </Link>
        <div className={styles.detail}>
          <div className={styles.imageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.image} alt={product.title} />
          </div>
          <div className={styles.info}>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>{formatPriceIdrFromUsd(product.price)}</p>
            <button onClick={addToCart} className={styles.button}>
              {added ? 'Ditambahkan!' : 'Tambah ke Keranjang'}
            </button>
            {clientError && <p className={styles.error}>{clientError}</p>}
          </div>
        </div>
      </main>
    </>
  );
}


