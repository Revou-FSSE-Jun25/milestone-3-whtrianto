import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import styles from '@/styles/Static.module.css';

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session || session.user?.role !== 'admin') {
    return { redirect: { destination: '/login', permanent: false } };
  }
  return { props: {} };
}

export default function UsersAdminPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, username: '', name: '', email: '', role: 'user', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    if (res.ok) {
      setUsers(await res.json());
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onEdit = (u) => {
    setForm({ id: u.id, username: u.username, name: u.name || '', email: u.email || '', role: u.role || 'user', password: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async (u) => {
    if (!confirm(`Hapus user ${u.username}?`)) return;
    const res = await fetch(`/api/users/${u.id}`, { method: 'DELETE' });
    if (res.ok) fetchUsers();
  };

  const resetForm = () => setForm({ id: null, username: '', name: '', email: '', role: 'user', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    try {
      const payload = { username: form.username, name: form.name, email: form.email, role: form.role };
      if (form.password) payload.password = form.password;
      let res;
      if (form.id) {
        res = await fetch(`/api/users/${form.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      } else {
        if (!form.password) throw new Error('Password wajib untuk user baru');
        res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      }
      if (!res.ok) {
        const j = await res.json().catch(()=>({ message: 'Gagal menyimpan' }));
        throw new Error(j.message || 'Gagal menyimpan');
      }
      resetForm();
      await fetchUsers();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head><title>Kelola Pengguna - Admin</title></Head>
      <main className={styles.container}>
        <div className={styles.adminWrap}>
          <div className={styles.adminCard}>
            <h1 className={styles.adminTitle} style={{ color: 'black' }}>Kelola Pengguna</h1>
            <p className={styles.adminSubtitle} style={{ color: 'black' }}>Tambah, ubah, atau hapus pengguna. Password disimpan ter-hash.</p>
            <form onSubmit={submit}>
              <div className={styles.grid2}>
                <div>
                  <label className={styles.label} htmlFor="username" style={{ color: 'black' }}>Username</label>
                  <input id="username" className={styles.input} name="username" value={form.username} onChange={onChange} required disabled={loading} />
                </div>
                <div>
                  <label className={styles.label} htmlFor="name" style={{ color: 'black' }}>Nama</label>
                  <input id="name" className={styles.input} name="name" value={form.name} onChange={onChange} disabled={loading} />
                </div>
                <div>
                  <label className={styles.label} htmlFor="email" style={{ color: 'black' }}>Email</label>
                  <input id="email" className={styles.input} type="email" name="email" value={form.email} onChange={onChange} disabled={loading} />
                </div>
                <div>
                  <label className={styles.label} htmlFor="role" style={{ color: 'black' }}>Peran</label>
                  <select id="role" className={styles.input} name="role" value={form.role} onChange={onChange} disabled={loading}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <div className={styles.fullRow}>
                  <label className={styles.label} htmlFor="password" style={{ color: 'black' }}>Password {form.id ? '(kosongkan jika tidak diubah)' : ''}</label>
                  <input id="password" className={styles.input} type="password" name="password" value={form.password} onChange={onChange} disabled={loading} />
                </div>
              </div>
              {error && <p className={styles.error} style={{ color: 'black' }}>{error}</p>}
              <div className={styles.actionsRow}>
                <button type="button" className={styles.adminBtnSecondary} onClick={resetForm} disabled={loading}>Reset</button>
                <button type="submit" className={styles.adminBtn} disabled={loading}>{loading ? 'Menyimpan...' : (form.id ? 'Simpan Perubahan' : 'Tambah Pengguna')}</button>
              </div>
            </form>
          </div>
        </div>

        <div style={{ height: 16 }} />

        <div className={styles.adminWrap}>
          <div className={styles.adminCard}>
            <h2 className={styles.adminTitle} style={{ color: 'black' }}>Daftar Pengguna</h2>
            {users.length === 0 ? (
              <p className={styles.adminSubtitle} style={{ color: 'black' }}>Belum ada pengguna.</p>
            ) : (
              <div>
                {users.map((u) => (
                  <div key={u.id} className={`${styles.card}`} style={{ justifyContent: 'space-between' }}>
                    <div>
                      <div className={styles.itemTitle} style={{ color: 'black' }}>{u.username} <span style={{ color: '#6b7280', fontWeight: 400 }}>({u.role})</span></div>
                      <div className={styles.itemMeta} style={{ color: 'black' }}>{u.name || '-'} · {u.email || '-'}</div>
                    </div>
                    <div className={styles.itemActions}>
                      <button className={styles.adminBtnSecondary} onClick={() => onEdit(u)} style={{ color: 'black' }}>Edit</button>
                      <button className={styles.dangerBtn} onClick={() => onDelete(u)}>Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}


