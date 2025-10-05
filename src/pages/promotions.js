import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Static.module.css';

export async function getStaticProps() {
  return { props: {}, revalidate: 3600 };
}

export default function Promotions() {
  return (
    <>
      <Head>
        <title>Promosi - RevoShop</title>
      </Head>
      <main className={styles.container}>
        <h1>Promosi Terkini</h1>
        <p>Sering-sering cek untuk penawaran terbaru!</p>
        <ul className={styles.list}>
          <li>Gratis ongkir untuk belanja di atas $50</li>
          <li>Beli 2 gratis 1 (produk terpilih)</li>
          <li>Promo mingguan setiap hari Jumat</li>
        </ul>
        <Link href="/">Kembali ke Beranda</Link>
      </main>
    </>
  );
}


