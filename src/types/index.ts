/**
 * ========================================
 * DEFINISI TIPE DATA - Platform E-commerce RevoShop
 * ========================================
 * 
 * File ini berisi semua interface dan tipe TypeScript yang digunakan 
 * di seluruh aplikasi. Tipe-tipe ini memastikan type safety dan 
 * memberikan kontrak yang jelas antar komponen.
 */

/**
 * Interface Produk
 * Merepresentasikan produk dalam sistem e-commerce
 * Digunakan untuk menampilkan produk, mengelola inventori, dan respons API
 */
export interface Product {
  id: number;                    // ID unik produk
  title: string;                 // Nama/judul produk
  price: number;                 // Harga produk dalam USD
  description: string;           // Deskripsi detail produk
  category: string;              // Kategori produk (contoh: "electronics", "clothing")
  image: string;                 // URL gambar produk
  rating: {                      // Informasi rating produk
    rate: number;                // Rating rata-rata (0-5)
    count: number;               // Jumlah review
  };
}

/**
 * Interface Item Keranjang
 * Merepresentasikan item dalam keranjang belanja
 * Berisi informasi produk plus kuantitas untuk manajemen keranjang
 */
export interface CartItem {
  id: number;                      // ID produk (merujuk ke Product.id)
  title: string;                 // Nama produk untuk ditampilkan
  price: number;                 // Harga satuan
  image: string;                 // Gambar produk untuk tampilan keranjang
  quantity: number;              // Jumlah item dalam keranjang
}

/**
 * Interface Pengguna
 * Merepresentasikan informasi pengguna yang terautentikasi
 * Digunakan untuk autentikasi, manajemen sesi, dan fitur khusus pengguna
 */
export interface User {
  id: string;                    // ID unik pengguna
  email: string;                 // Alamat email pengguna
  name: string;                  // Nama tampilan pengguna
}

/**
 * Interface Data Form Checkout
 * Merepresentasikan semua data yang dikumpulkan selama proses checkout
 * Termasuk informasi pengiriman dan detail pembayaran
 */
export interface CheckoutFormData {
  // Informasi Pengiriman
  fullName: string;              // Nama lengkap pelanggan
  address: string;               // Alamat jalan
  city: string;                  // Kota
  province: string;              // Provinsi/State
  postalCode: string;           // Kode pos
  country: string;               // Negara
  
  // Informasi Kontak
  email: string;                 // Email pelanggan
  
  // Informasi Pembayaran
  cardNumber: string;            // Nomor kartu kredit
  expiryDate: string;            // Tanggal kadaluarsa kartu
  cvc: string;                   // Kode keamanan kartu
}

