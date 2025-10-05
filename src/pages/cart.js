import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from '@/styles/Static.module.css';
import { formatPriceIdrFromUsd } from '@/utils/currency';

export default function CartPage() {
  const cart = useCart();
  const [productsIndex, setProductsIndex] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        const idx = Object.fromEntries(data.map((p) => [p.id, p]));
        setProductsIndex(idx);
      } catch {}
    })();
  }, []);

  const totalUsd = useMemo(() => {
    return cart.items.reduce((sum, it) => sum + (productsIndex[it.id]?.price || 0) * it.quantity, 0);
  }, [cart.items, productsIndex]);

  return (
    <>
      <Head>
        <title>Keranjang - RevoShop</title>
      </Head>
      <main className={styles.container}>
        <h1>Keranjang</h1>
        {cart.items.length === 0 ? (
          <p>Keranjang kosong. <Link href="/">Belanja sekarang</Link></p>
        ) : (
          <>
            <ul className={styles.list}>
              {cart.items.map((it) => {
                const p = productsIndex[it.id];
                const unitPriceIdr = formatPriceIdrFromUsd(p?.price || 0);
                const subtotalUsd = (p?.price || 0) * it.quantity;
                const subtotalIdr = formatPriceIdrFromUsd(subtotalUsd);
                return (
                  <li key={it.id} className={`${styles.card} ${styles.cartItem}`}>
                    <div className={styles.itemThumb}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {p && <img src={p.image} alt={p.title} />}
                    </div>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemTitle}>{p?.title ?? 'Produk'}</div>
                      <div className={styles.itemMeta}>{unitPriceIdr}</div>
                    </div>
                    <div className={styles.itemActions}>
                      <div className={styles.qtyGroup}>
                        <button aria-label="Kurangi" className={styles.qtyBtn}
                          onClick={() => cart.updateQuantity(it.id, Math.max(1, it.quantity - 1))}>−</button>
                        <span className={styles.qtyValue}>{it.quantity}</span>
                        <button aria-label="Tambah" className={styles.qtyBtn}
                          onClick={() => cart.updateQuantity(it.id, it.quantity + 1)}>+</button>
                      </div>
                      <button className={styles.dangerBtn} onClick={() => cart.remove(it.id)}>Hapus</button>
                    </div>
                    <div className={styles.itemSubtotal} style={{ color: 'black' }}>{subtotalIdr}</div>
                  </li>
                );
              })}
            </ul>
            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <span>Total</span>
                <strong className={styles.summaryTotal}>{formatPriceIdrFromUsd(totalUsd)}</strong>
              </div>
              <Link href="/checkout" className={`${styles.primaryBtn} ${styles.checkoutBtn}`}>
                Checkout
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
}


