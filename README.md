RevoShop adalah demo e-commerce berbasis Next.js (Pages Router). Proyek ini menampilkan SSG/ISR untuk daftar produk dan halaman statis, serta halaman detail produk yang kini memakai ISR via API internal dengan data awal dari FakeStoreAPI.

## Implemented Features

- Autentikasi NextAuth (Credentials) dengan penyimpanan pengguna lokal (password ter-hash)
- Middleware proteksi untuk `/checkout` dan `/admin` (role admin)
- Keranjang belanja dengan Context API, persist di `localStorage`
- Ringkasan keranjang dan tombol Checkout (lintasan demo)
- Admin Dashboard (CRUD produk) via API Routes dengan penyimpanan JSON lokal
- Admin Pengguna (CRUD user: tambah, edit, hapus, ganti password)
- ISR untuk halaman detail produk (`getStaticPaths` + `getStaticProps`)
- Halaman statis SSG: FAQ, Promosi
- UI Reusable: Navbar, Footer, ProductCard
- Pengujian unit (Jest + React Testing Library)
- Optimasi performa: lazy loading/data caching via hook `useProducts`

## Tech Stack

- Next.js (Pages Router), ISR, Middleware
- NextAuth.js (JWT Session) + bcryptjs untuk hashing password
- React, Context API
- CSS Modules
- FakeStoreAPI (seed produk) + API Routes internal (produk & pengguna)
- Jest + React Testing Library

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

Open `http://localhost:3000`

### Environment Variables

Tambahkan file `.env.local` di root:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret
NEXT_PUBLIC_USD_TO_IDR=15500

# Opsi seed admin (digunakan saat pertama kali membuat users.json)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

Opsional: `NEXT_PUBLIC_BASE_URL` jika deploy di URL berbeda; default kosong (relative fetch).

## Project Structure

```
src/
  pages/
    _app.js          // Layout wrapper
    index.js         // Home (SSG)
    faq.js           // Static (SSG)
    promotions.js    // Static (SSG)
    products/[id].js // Product Detail (ISR via internal API)
    api/
      auth/[...nextauth].js // NextAuth
      products/index.js     // API list/create (produk)
      products/[id].js      // API read/update/delete (produk)
      users/index.js        // API list/create (pengguna)
      users/[id].js         // API read/update/delete (pengguna)
  components/
    Layout.js, Navbar.js, Footer.js, ProductCard.js
  styles/
    globals.css, Home.module.css, Product.module.css, Static.module.css, Layout.module.css
```

## Notes

- Home memakai `getStaticProps` dengan ISR (revalidate 60s), data dari API internal
- Detail produk memakai `getStaticPaths` + `getStaticProps` (fallback blocking) + ISR
- Keranjang persist via `localStorage` dan Context API
- Middleware melindungi `/checkout` untuk user login, `/admin` untuk admin

### Otentikasi & Pengguna

- Kredensial diverifikasi terhadap penyimpanan lokal `src/data/users.json`.
- Password disimpan sebagai hash menggunakan `bcryptjs` (tidak pernah dikirim kembali via API/UI).
- Akun admin awal di-seed dari `.env.local` (`ADMIN_USERNAME`, `ADMIN_PASSWORD`) atau default `admin / admin123` bila env tidak diisi.
- Kelola pengguna dari halaman admin `http://localhost:3000/admin/users` (hanya admin):
  - Tambah pengguna baru (wajib password)
  - Edit profil/role, ubah password (opsional)
  - Hapus pengguna
  - API terkait: `/api/users` dan `/api/users/[id]`

### Data Penyimpanan

- Produk: `src/data/products.json` (di-seed dari FakeStoreAPI bila kosong/tidak ada)
- Pengguna: `src/data/users.json` (di-seed dengan admin awal bila kosong/tidak ada)

## Screenshots / Demo

- Jalankan lokal dan navigasikan:
  - `/` Grid produk
  - `/products/1` Detail produk (ISR)
  - `/cart` Keranjang, `/checkout` Checkout (butuh login)
  - `/admin` Dasbor admin (butuh role admin)
  - `/admin/users` Kelola pengguna (khusus admin)
  - `/faq`, `/promotions` Halaman statis

## Testing

Jalankan tes dan cakupan:

```
npm run test
npm run test:coverage
```
