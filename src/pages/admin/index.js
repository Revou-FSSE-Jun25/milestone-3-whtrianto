import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import styles from '@/styles/Static.module.css';
import { getSession } from 'next-auth/react';
import { formatPriceIdrFromUsd } from '@/utils/currency';

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session || session.user?.role !== 'admin') {
    return { redirect: { destination: '/login', permanent: false } };
  }
  return { props: {} };
}

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function AdminDashboard() {
  const { data, mutate } = useSWR('/api/products', fetcher);

  return (
    <>
      <Head>
        <title>Admin - RevoShop</title>
      </Head>
      <main className={styles.container}>
        <h1>Admin - Produk</h1>
        <Link href="/admin/new" className={styles.button}>Tambah Produk</Link>
        <ul className={styles.list}>
          {(data || []).map((p) => (
            <li key={p.id} className={styles.card} style={{ color: 'black' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.title} width={48} height={48} />
                <div>
                  <div>{p.title}</div>
                  <div>{formatPriceIdrFromUsd(p.price)}</div>
                </div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                <Link href={`/admin/${p.id}`}>Edit</Link>
                <button
                  onClick={async () => {
                    await fetch(`/api/products/${p.id}`, { method: 'DELETE' });
                    mutate();
                  }}
                >Hapus</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}


