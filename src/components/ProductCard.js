import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { formatPriceIdrFromUsd } from '@/utils/currency';

export default function ProductCard({ product }) {
  return (
    // Kartu produk ringkas untuk ditampilkan pada grid daftar produk
    <Link href={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* Alt menggunakan judul produk agar aksesibilitas lebih baik */}
        <img src={product.image} alt={product.title} />
      </div>
      <h3 className={styles.productTitle}>{product.title}</h3>
      <p className={styles.price}>{formatPriceIdrFromUsd(product.price)}</p>
    </Link>
  );
}


