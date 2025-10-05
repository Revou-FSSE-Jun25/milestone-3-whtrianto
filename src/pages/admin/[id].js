import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/Static.module.css';
import { getSession } from 'next-auth/react';
import { formatIdr, convertIdrToUsd, getUsdToIdrRate, parseIdrToNumber } from '@/utils/currency';

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session || session.user?.role !== 'admin') {
    return { redirect: { destination: '/login', permanent: false } };
  }
  return { props: {} };
}

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ title: '', priceIdr: '', description: '', image: '', category: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        const rate = getUsdToIdrRate();
        setForm({
          title: data.title || '',
          priceIdr: data.price ? String(Math.round(Number(data.price) * rate)) : '',
          description: data.description || '',
          image: data.image || '',
          category: data.category || '',
        });
      }
    })();
  }, [id]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
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
    setLoading(true);
    const res = await fetch(`/api/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) {
      setError('Gagal memperbarui produk.');
      setLoading(false);
      return;
    }
    window.location.href = '/admin';
  };

  return (
    <>
      <Head>
        <title>Edit Produk - Admin</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.adminWrap}>
          <div className={styles.adminCard}>
            <header>
              <h1 className={styles.adminTitle} style={{ color: 'black' }}>Edit Produk</h1>
              <p className={styles.adminSubtitle}>Perbarui detail produk dan pratinjau gambar.</p>
            </header>
            <form onSubmit={submit}>
              <div className={styles.grid2}>
                <div className={styles.fullRow}>
                  <label className={styles.label} htmlFor="title" style={{ color: 'black' }}>Judul</label>
                  <input id="title" className={styles.input} name="title" value={form.title} onChange={onChange} required disabled={loading} />
                </div>

                <div>
                  <label className={styles.label} htmlFor="priceIdr" style={{ color: 'black' }}>Harga (IDR)</label>
                  <input id="priceIdr" className={styles.input} name="priceIdr" value={form.priceIdr} onChange={onChange} required disabled={loading} />
                  {form.priceIdr && !Number.isNaN(Number(form.priceIdr)) && (
                    <small className={styles.helperText}>Perkiraan: {formatIdr(Number(form.priceIdr))}</small>
                  )}
                </div>

                <div>
                  <label className={styles.label} htmlFor="category" style={{ color: 'black' }}>Kategori</label>
                  <input id="category" className={styles.input} name="category" value={form.category} onChange={onChange} disabled={loading} />
                </div>

                <div className={styles.fullRow}>
                  <label className={styles.label} htmlFor="image" style={{ color: 'black' }}>URL Gambar</label>
                  <input id="image" className={styles.input} name="image" value={form.image} onChange={onChange} required disabled={loading} />
                  {form.image && (
                    <div className={styles.previewBox}>
                      <img src={form.image} alt="Preview" onError={(e)=>{ e.currentTarget.style.display='none'; }} />
                    </div>
                  )}
                </div>

                <div className={styles.fullRow}>
                  <label className={styles.label} htmlFor="description" style={{ color: 'black' }}>Deskripsi</label>
                  <textarea id="description" className={styles.input} name="description" rows={5} value={form.description} onChange={onChange} required disabled={loading} />
                </div>
              </div>

              {error && <p className={styles.error} style={{ color: 'black' }}>{error}</p>}

              <div className={styles.actionsRow}>
                <button type="button" className={styles.adminBtnSecondary} onClick={()=>router.push('/admin')} disabled={loading}>
                  Batal
                </button>
                <button type="submit" className={styles.adminBtn} disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}


