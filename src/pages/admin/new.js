import Head from 'next/head';
import { useState } from 'react';
import styles from '@/styles/Static.module.css';
import { getSession } from 'next-auth/react';
import { formatIdr, convertIdrToUsd, parseIdrToNumber } from '@/utils/currency';

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session || session.user?.role !== 'admin') {
    return { redirect: { destination: '/login', permanent: false } };
  }
  return { props: {} };
}

export default function NewProduct() {
  const [form, setForm] = useState({ title: '', priceIdr: '', description: '', image: '', category: '' });
  const [error, setError] = useState('');
  const hasImage = Boolean(form.image && form.image.length > 5);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title || !form.priceIdr || !form.description || !form.image) {
      setError('Mohon isi semua field wajib.');
      return;
    }
    const priceIdrNumber = parseIdrToNumber(form.priceIdr);
    if (Number.isNaN(Number(priceIdrNumber)) || Number(priceIdrNumber) <= 0) {
      setError('Harga (IDR) tidak valid.');
      return;
    }
    const priceUsd = convertIdrToUsd(Number(priceIdrNumber));
    const payload = { title: form.title, price: priceUsd, description: form.description, image: form.image, category: form.category };
    try {
      const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) {
        let msg = 'Gagal menyimpan produk.';
        try { const j = await res.json(); if (j?.message) msg = `${msg} ${j.message}`; } catch {}
        setError(msg);
        return;
      }
    } catch (err) {
      setError('Tidak dapat terhubung ke server. Coba lagi.');
      return;
    }
    window.location.href = '/admin';
  };

  return (
    <>
      <Head>
        <title>Produk Baru - Admin</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.adminWrap}>
          <div className={styles.adminCard}>
            <h1 className={styles.adminTitle} style={{ color: 'black' }}>Tambah Produk</h1>
            <p className={styles.adminSubtitle} style={{ color: 'black' }}>Lengkapi detail produk di bawah ini</p>

            <form onSubmit={submit} className={styles.form}>
              <div className={styles.grid2}>
                <div>
                  <label className={styles.label} style={{ color: 'black' }}>
                    Judul
                    <input className={styles.input} name="title" value={form.title} onChange={onChange} required style={{ color: 'black' }} />
                  </label>
                </div>
                <div>
                  <label className={styles.label} style={{ color: 'black' }}>
                    Harga (IDR)
                    <input className={styles.input} name="priceIdr" value={form.priceIdr} onChange={onChange} required style={{ color: 'black' }} />
                    {form.priceIdr && !Number.isNaN(Number(form.priceIdr)) && (
                      <small>{formatIdr(Number(form.priceIdr))}</small>
                    )}
                  </label>
                </div>
                <div className={styles.fullRow}>
                  <label className={styles.label} style={{ color: 'black' }}>
                    Deskripsi
                    <textarea className={styles.input} name="description" rows={4} value={form.description} onChange={onChange} required style={{ color: 'black' }} />
                  </label>
                </div>
                <div>
                  <label className={styles.label} style={{ color: 'black' }}>
                    URL Gambar
                    <input className={styles.input} name="image" placeholder="https://..." value={form.image} onChange={onChange} required style={{ color: 'black' }} />
                  </label>
                </div>
                <div>
                  <label className={styles.label} style={{ color: 'black' }}>
                    Kategori
                    <input className={styles.input} name="category" value={form.category} onChange={onChange} style={{ color: 'black' }} />
                  </label>
                </div>
              </div>

              {hasImage && (
                <div className={styles.previewBox}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.image} alt="Preview" />
                </div>
              )}

              {error && <p className={styles.error} style={{ color: 'black' }}>{error}</p>}
              <div className={styles.actionsRow}>
                <button type="submit" className={styles.primaryBtn}>Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}


