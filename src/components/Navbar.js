import Link from 'next/link';
import styles from '@/styles/Layout.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <header className={styles.navbar}>
      <nav className={styles.navInner}>
        {/**
         * Link brand/tajuk situs yang selalu mengarah ke halaman utama.
         * Komponen ini berada di bagian atas setiap halaman melalui `Layout`.
         */}
        <Link href="/" className={styles.brand}>RevoShop</Link>
        <div className={styles.links}>
          {/**
           * Kumpulan tautan navigasi utama.
           * Ubah label ke bahasa Indonesia untuk konsistensi UI lokal.
           */}
          <Link href="/">Beranda</Link>
          <Link href="/promotions">Promosi</Link>
          <Link href="/faq">Tanya Jawab</Link>
          <Link href="/cart">Keranjang</Link>
          {session ? (
            <>
              {session.user?.role === 'admin' && (
                <>
                  <Link href="/admin">Admin</Link>
                  <Link href="/admin/users" style={{ marginLeft: 8 }}>Pengguna</Link>
                </>
              )}
              <button onClick={() => signOut()} style={{ marginLeft: 8 }}>Keluar</button>
            </>
          ) : (
            <button onClick={() => signIn()} style={{ marginLeft: 8 }}>Masuk</button>
          )}
        </div>
      </nav>
    </header>
  );
}


