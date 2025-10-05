import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Static.module.css';

export async function getStaticProps() {
  return { props: {}, revalidate: 3600 };
}

export default function FAQ() {
  return (
    <>
      <Head>
        <title>Tanya Jawab - RevoShop</title>
      </Head>
      <main className={styles.container}>
        <h1>Pertanyaan yang Sering Diajukan</h1>
        <ul className={styles.list}>
          <li>
            <strong>Apa itu RevoShop?</strong> Sebuah demo e-commerce yang dibuat dengan Next.js.
          </li>
          <li>
            <strong>Dari mana asal produk?</strong> Dari FakeStoreAPI untuk keperluan demo.
          </li>
          <li>
            <strong>Apakah ini toko sungguhan?</strong> Bukan, ini hanya untuk tujuan edukasi.
          </li>
        </ul>
        <Link href="/">Kembali ke Beranda</Link>
      </main>
    </>
  );
}


