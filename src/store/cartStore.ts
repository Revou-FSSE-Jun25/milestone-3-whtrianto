/**
 * ========================================
 * TOKO KERANJANG - Platform E-commerce RevoShop
 * ========================================
 * 
 * Modul ini mengelola state keranjang belanja menggunakan Zustand state management.
 * Fitur penyimpanan persisten menggunakan localStorage untuk mempertahankan data keranjang
 * di seluruh sesi browser.
 * 
 * Fitur Utama:
 * - Tambah/Hapus produk dari keranjang
 * - Update kuantitas produk
 * - Hitung total dan jumlah item
 * - Penyimpanan persisten dengan localStorage
 * - State management yang type-safe
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

/**
 * Interface Toko Keranjang
 * Mendefinisikan bentuk state keranjang dan aksi yang tersedia
 */
interface CartStore {
  items: CartItem[];                                    // Array item keranjang
  addToCart: (product: Product) => void;                // Tambah produk ke keranjang
  removeFromCart: (id: number) => void;                 // Hapus produk dari keranjang
  updateQuantity: (id: number, quantity: number) => void; // Update kuantitas item
  clearCart: () => void;                                // Hapus semua item
  getTotalPrice: () => number;                          // Hitung total harga
  getTotalItems: () => number;                          // Hitung total jumlah item
}

/**
 * ========================================
 * IMPLEMENTASI TOKO KERANJANG
 * ========================================
 * 
 * Membuat toko keranjang dengan Zustand dan middleware persistence.
 * Toko secara otomatis disimpan ke localStorage.
 */

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // ========================================
      // STATE
      // ========================================
      
      items: [], // Inisialisasi keranjang kosong
      
      // ========================================
      // AKSI KERANJANG
      // ========================================
      
      /**
       * Tambah Produk ke Keranjang
       * 
       * Menambahkan produk ke keranjang. Jika produk sudah ada,
       * menambah kuantitas alih-alih menambah duplikat.
       * 
       * @param product - Produk yang akan ditambahkan ke keranjang
       * 
       * Logika Bisnis:
       * 1. Cek apakah produk sudah ada di keranjang
       * 2. Jika ada: tambah kuantitas
       * 3. Jika tidak ada: tambah item baru dengan kuantitas 1
       */
      addToCart: (product: Product) => {
        const items = get().items;
        const existingItem = items.find(item => item.id === product.id);
        
        if (existingItem) {
          // Produk sudah ada di keranjang - tambah kuantitas
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          // Produk baru - tambah ke keranjang
          set({
            items: [...items, {
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              quantity: 1
            }]
          });
        }
      },
      
      /**
       * Hapus Produk dari Keranjang
       * 
       * Menghapus produk sepenuhnya dari keranjang.
       * 
       * @param id - ID produk yang akan dihapus
       */
      removeFromCart: (id: number) => {
        set({
          items: get().items.filter(item => item.id !== id)
        });
      },
      
      /**
       * Update Kuantitas Produk
       * 
       * Memperbarui kuantitas produk tertentu di keranjang.
       * Jika kuantitas 0 atau negatif, hapus item dari keranjang.
       * 
       * @param id - ID produk yang akan diupdate
       * @param quantity - Kuantitas baru
       */
      updateQuantity: (id: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        });
      },
      
      /**
       * Hapus Semua Keranjang
       * 
       * Menghapus semua item dari keranjang.
       */
      clearCart: () => {
        set({ items: [] });
      },
      
      // ========================================
      // METODE PERHITUNGAN
      // ========================================
      
      /**
       * Hitung Total Harga
       * 
       * Menghitung total harga semua item di keranjang.
       * 
       * @returns number - Total harga
       */
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      /**
       * Hitung Total Item
       * 
       * Menghitung total jumlah item di keranjang (jumlah kuantitas).
       * 
       * @returns number - Total jumlah item
       */
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      // ========================================
      // KONFIGURASI PERSISTENCE
      // ========================================
      
      name: 'cart-storage', // Nama kunci localStorage
    }
  )
);

