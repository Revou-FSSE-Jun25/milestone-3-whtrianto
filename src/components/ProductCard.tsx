/**
 * ========================================
 * KOMPONEN KARTU PRODUK - Platform E-commerce RevoShop
 * ========================================
 * 
 * Komponen yang dapat digunakan kembali untuk menampilkan informasi produk 
 * dalam format kartu. Digunakan di seluruh aplikasi untuk daftar produk 
 * dan produk unggulan.
 * 
 * Fitur:
 * - Gambar produk dengan efek hover
 * - Tampilan informasi produk (judul, harga, rating, kategori)
 * - Fungsi tambah ke keranjang
 * - Navigasi ke halaman detail produk
 * - Desain responsif dengan Tailwind CSS
 * - Props yang type-safe dengan TypeScript
 */

'use client';

import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Interface props untuk komponen ProductCard
 */
interface ProductCardProps {
  product: Product; // Data produk yang akan ditampilkan
}

/**
 * Komponen ProductCard
 * 
 * Menampilkan produk dalam format kartu dengan:
 * - Gambar produk dengan efek zoom hover
 * - Judul, harga, dan rating produk
 * - Badge kategori
 * - Tombol tambah ke keranjang dan lihat detail
 * 
 * @param product - Data produk yang akan ditampilkan
 * @returns JSX.Element - Komponen kartu produk
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Ambil fungsi addToCart dari Zustand cart store
  const addToCart = useCartStore((state) => state.addToCart);

  /**
   * Handle Klik Tambah ke Keranjang
   * 
   * Mencegah perilaku default link dan menambahkan produk ke keranjang.
   * Ini memungkinkan tombol tambah ke keranjang bekerja meskipun di dalam link.
   * 
   * @param e - Event mouse dari klik tombol
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* ========================================
          BAGIAN GAMBAR PRODUK
          ======================================== */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-100 w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      {/* ========================================
          BAGIAN INFORMASI PRODUK
          ======================================== */}
      <div className="p-4">
        {/* Badge Kategori */}
        <div className="mb-2">
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        {/* Judul Produk */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        {/* Tampilan Rating Bintang */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.rating.count})
          </span>
        </div>
        
        {/* Tampilan Harga */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            ${product.price}
          </span>
        </div>
        
        {/* Tombol Aksi */}
        <div className="mt-4 flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors text-center"
          >
            Lihat Detail
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
