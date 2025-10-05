import { getSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/Static.module.css';

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session) {
    return { redirect: { destination: '/', permanent: false } };
  }
  return { props: {} };
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
      callbackUrl: '/',
    });
    if (res?.error) setError('Login gagal. Periksa kredensial.');
    if (res?.ok) window.location.href = '/';
  };

  return (
    <>
      <Head>
        <title>Masuk - RevoShop</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.authWrap}>
          <div className={styles.authCard}>
            <div className={styles.authHeader}>
              <h1 className={styles.authTitle} style={{ color: 'black' }}>Masuk ke RevoShop</h1>
              <p className={styles.authSubtitle}>Silakan gunakan akun Anda untuk melanjutkan</p> <br />
              <p className={styles.authSubtitle}>Gunakan (username: user) dan (password: user123)</p>
              <p className={styles.authSubtitle}>jika tidak punya akun.</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label} style={{ color: 'black' }}>
                Username
                <input className={styles.input} placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </label>
              <label className={styles.label} style={{ color: 'black' }}>
                Kata sandi
                <input className={styles.input} placeholder="kata sandi" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              {error && <p className={styles.error} style={{ color: 'black' }}>{error}</p>}
              <button type="submit" className={styles.primaryBtn}>Masuk</button>
              <p className={styles.helperText}>Tips: gunakan <strong>admin</strong> untuk akses admin (demo)</p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}


