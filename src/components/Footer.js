import styles from '@/styles/Layout.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/**
       * Footer sederhana yang muncul di bagian bawah setiap halaman.
       * Menampilkan tahun berjalan dan nama aplikasi.
       */}
      <p>© {new Date().getFullYear()} RevoShop. Hak cipta dilindungi.</p>
    </footer>
  );
}


