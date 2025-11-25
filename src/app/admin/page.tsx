/**
 * ========================================
 * HALAMAN DASHBOARD ADMIN - Platform E-commerce RevoShop
 * ========================================
 * 
 * Halaman ini menyediakan fungsi admin untuk mengelola produk.
 * Fitur operasi CRUD lengkap (Create, Read, Update, Delete) untuk produk.
 * 
 * Fitur Utama:
 * - Daftar produk dengan kontrol admin
 * - Tambah produk baru dengan validasi form
 * - Edit produk yang ada
 * - Hapus produk dengan konfirmasi
 * - Update real-time setelah operasi
 * - Rute terlindungi (memerlukan autentikasi)
 * 
 * Komponen yang Digunakan:
 * - AdminProductList: Menampilkan produk dalam format tabel dengan aksi admin
 * - ProductForm: Menangani pembuatan dan pengeditan produk
 */

'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import AdminProductList from '@/components/AdminProductList';
import ProductForm from '@/components/ProductForm';

/**
 * Komponen Dashboard Admin
 * 
 * Komponen utama untuk fungsi manajemen produk.
 * Menangani state management untuk produk, form, dan operasi CRUD.
 * 
 * @returns JSX.Element - Halaman dashboard admin
 */
export default function AdminPage() {
  // ========================================
  // MANAJEMEN STATE
  // ========================================
  
  const [products, setProducts] = useState<Product[]>([]);        // Daftar semua produk
  const [isLoading, setIsLoading] = useState(true);             // State loading untuk pengambilan data
  const [showForm, setShowForm] = useState(false);               // Toggle visibilitas form
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // Produk yang sedang diedit

  // ========================================
  // EFEK LIFECYCLE
  // ========================================
  
  /**
   * Inisialisasi komponen dengan mengambil produk
   * Berjalan sekali saat komponen di-mount
   */
  useEffect(() => {
    fetchProducts();
  }, []);

  // ========================================
  // FUNGSI PENGAMBILAN DATA
  // ========================================
  
  /**
   * Ambil Produk dari API
   * 
   * Mengambil semua produk dari API dan memperbarui state lokal.
   * Menangani state loading dan skenario error.
   */
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error mengambil produk:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ========================================
  // HANDLER FORM
  // ========================================
  
  /**
   * Handle Klik Tombol Tambah Produk
   * 
   * Membuka form produk untuk membuat produk baru.
   * Menghapus state editing yang ada.
   */
  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  /**
   * Handle Klik Tombol Edit Produk
   * 
   * Membuka form produk untuk mengedit produk yang ada.
   * Mengatur produk yang akan diedit di state.
   * 
   * @param product - Produk yang akan diedit
   */
  const handleEditProduct = (product: Product) => {
    console.log('Edit produk diklik:', product);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormSubmit = async (productData: Omit<Product, 'id'>) => {
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      
      console.log('Form submit:', { url, method, productData, editingProduct });
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      console.log('Form response:', response.status, response.ok);
      if (response.ok) {
        await fetchProducts();
        setShowForm(false);
        setEditingProduct(null);
        alert(editingProduct ? 'Product updated successfully' : 'Product added successfully');
      } else {
        const errorData = await response.json();
        console.error('Form submit failed:', errorData);
        alert('Failed to save product: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    console.log('Delete product clicked:', id);
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        console.log('Sending DELETE request to:', `/api/products/${id}`);
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });

        console.log('Delete response:', response.status, response.ok);
        if (response.ok) {
          await fetchProducts();
          alert('Product deleted successfully');
        } else {
          const errorData = await response.json();
          console.error('Delete failed:', errorData);
          alert('Failed to delete product: ' + (errorData.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleAddSampleProduct = async () => {
    try {
      const sample: Omit<Product, 'id'> = {
        title: 'Sample Leather Wallet',
        price: 49.99,
        description: 'Premium handcrafted leather wallet with multiple card slots and RFID protection.',
        category: 'accessories',
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 0, count: 0 },
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sample),
      });
      if (res.ok) {
        await fetchProducts();
        alert('Sample product added');
      } else {
        alert('Failed to add sample product');
      }
    } catch (e) {
      alert('Failed to add sample product');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your products</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddSampleProduct}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Add Sample Product
              </button>
              <button
                onClick={handleAddProduct}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="mb-8">
            <ProductForm
              product={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
            />
          </div>
        )}

        <AdminProductList
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
}
