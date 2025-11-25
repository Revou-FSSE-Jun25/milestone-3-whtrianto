/**
 * ========================================
 * TOKO PRODUK - Platform E-commerce RevoShop
 * ========================================
 * 
 * Modul ini mengelola data produk menggunakan penyimpanan in-memory.
 * Dalam lingkungan produksi, ini biasanya akan terhubung ke database.
 * 
 * Fitur:
 * - Operasi CRUD produk (Create, Read, Update, Delete)
 * - Integrasi API eksternal (FakeStore API untuk data demo)
 * - Caching in-memory untuk performa
 * - Logging komprehensif untuk debugging
 */

import { Product } from '@/types';

// ========================================
// KONFIGURASI PENYIMPANAN
// ========================================

/**
 * Penyimpanan produk in-memory
 * Dalam produksi, ini akan diganti dengan operasi database
 */
let products: Product[] = [];

/**
 * Flag inisialisasi untuk mencegah multiple API calls
 * Memastikan produk hanya diambil sekali per sesi
 */
let isInitialized = false;

// ========================================
// FUNGSI INISIALISASI
// ========================================

/**
 * Inisialisasi Produk dari API Eksternal
 * 
 * Mengambil data produk dari FakeStore API dan mengisi toko in-memory.
 * Fungsi ini idempotent - hanya mengambil data sekali per sesi.
 * 
 * @returns Promise<void>
 * 
 * Logika Bisnis:
 * 1. Cek apakah sudah diinisialisasi untuk menghindari duplicate API calls
 * 2. Ambil produk dari API eksternal (FakeStore API)
 * 3. Simpan produk dalam memori untuk akses cepat
 * 4. Set flag inisialisasi untuk mencegah pengambilan ulang
 */
export const initializeProducts = async () => {
  if (!isInitialized) {
    try {
      console.log('Menginisialisasi produk dari API eksternal...');
      const response = await fetch('https://fakestoreapi.com/products');
      if (response.ok) {
        products = await response.json();
        isInitialized = true;
        console.log(`Diinisialisasi ${products.length} produk`);
      } else {
        console.error('Gagal mengambil produk dari API eksternal');
      }
    } catch (error) {
      console.error('Error mengambil produk awal:', error);
    }
  }
};

// ========================================
// OPERASI CRUD
// ========================================

/**
 * Ambil Semua Produk
 * 
 * Mengembalikan salinan semua produk dalam toko.
 * Digunakan oleh halaman daftar produk dan dashboard admin.
 * 
 * @returns Product[] - Array semua produk
 */
export const getProducts = () => products;

/**
 * Tambah Produk Baru
 * 
 * Menambahkan produk baru ke toko.
 * Digunakan oleh dashboard admin untuk pembuatan produk.
 * 
 * @param product - Produk yang akan ditambahkan
 * @returns Product - Produk yang ditambahkan
 * 
 * Logika Bisnis:
 * 1. Push produk baru ke array products
 * 2. Kembalikan produk yang ditambahkan untuk konfirmasi
 */
export const addProduct = (product: Product) => {
  products.push(product);
  return product;
};

/**
 * Update Produk yang Ada
 * 
 * Memperbarui produk yang ada dengan informasi baru.
 * Digunakan oleh dashboard admin untuk pengeditan produk.
 * 
 * @param id - ID produk yang akan diupdate
 * @param updates - Data produk parsial untuk diupdate
 * @returns Product | null - Produk yang diupdate atau null jika tidak ditemukan
 * 
 * Logika Bisnis:
 * 1. Cari produk berdasarkan ID
 * 2. Gabungkan produk yang ada dengan update
 * 3. Kembalikan produk yang diupdate atau null jika tidak ditemukan
 */
export const updateProduct = (id: number, updates: Partial<Product>) => {
  console.log(`Mengupdate produk dengan ID: ${id}, produk tersedia:`, products.map(p => p.id));
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    console.log(`Produk ${id} berhasil diupdate`);
    return products[index];
  }
  console.log(`Produk dengan ID ${id} tidak ditemukan`);
  return null;
};

/**
 * Hapus Produk
 * 
 * Menghapus produk dari toko.
 * Digunakan oleh dashboard admin untuk penghapusan produk.
 * 
 * @param id - ID produk yang akan dihapus
 * @returns boolean - True jika berhasil dihapus, false jika tidak ditemukan
 * 
 * Logika Bisnis:
 * 1. Cari produk berdasarkan ID
 * 2. Hapus produk dari array menggunakan splice
 * 3. Kembalikan status keberhasilan
 */
export const deleteProduct = (id: number) => {
  console.log(`Menghapus produk dengan ID: ${id}, produk tersedia:`, products.map(p => p.id));
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    console.log(`Produk ${id} berhasil dihapus`);
    return true;
  }
  console.log(`Produk dengan ID ${id} tidak ditemukan`);
  return false;
};

/**
 * Ambil Produk Tunggal
 * 
 * Mengambil produk tertentu berdasarkan ID.
 * Digunakan oleh halaman detail produk dan operasi admin.
 * 
 * @param id - ID produk yang akan diambil
 * @returns Product | undefined - Produk yang ditemukan atau undefined
 * 
 * Logika Bisnis:
 * 1. Cari produk berdasarkan ID
 * 2. Kembalikan produk atau undefined jika tidak ditemukan
 */
export const getProduct = (id: number) => {
  console.log(`Mengambil produk dengan ID: ${id}, produk tersedia:`, products.map(p => p.id));
  const product = products.find(p => p.id === id);
  if (product) {
    console.log(`Produk ${id} ditemukan`);
  } else {
    console.log(`Produk dengan ID ${id} tidak ditemukan`);
  }
  return product;
};

