/**
 * ========================================
 * RUTE API PRODUK - Platform E-commerce RevoShop
 * ========================================
 * 
 * Rute API ini menangani operasi terkait produk:
 * - GET: Ambil semua produk (digunakan oleh halaman daftar produk)
 * - POST: Buat produk baru (fungsi admin)
 * 
 * Fitur:
 * - Inisialisasi produk otomatis dari API eksternal
 * - Penanganan error dengan kode status HTTP yang tepat
 * - Penanganan request/response yang type-safe
 * - Logging komprehensif untuk debugging
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { Product } from '@/types';
import { initializeProducts, getProducts, addProduct } from '@/lib/productsStore';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { isAdminSession } from '@/lib/auth';
import { productSchema } from '@/lib/validation';

/**
 * GET /api/products
 * 
 * Mengambil semua produk yang tersedia dari toko.
 * Digunakan oleh:
 * - Halaman daftar produk (/products)
 * - Tampilan produk dashboard admin
 * - Produk unggulan halaman beranda
 * 
 * @returns NextResponse - Array JSON produk atau pesan error
 * 
 * Logika Bisnis:
 * 1. Inisialisasi produk dari API eksternal jika belum dilakukan
 * 2. Ambil semua produk dari toko in-memory
 * 3. Kembalikan produk sebagai respons JSON
 * 4. Tangani error dengan status 500
 */
export async function GET() {
  try {
    console.log('API /api/products GET dipanggil');
    await initializeProducts();
    const products = getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error GET /api/products:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil produk' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products
 * 
 * Membuat produk baru di toko.
 * Digunakan oleh:
 * - Dashboard admin untuk menambah produk baru
 * - Form pembuatan produk
 * 
 * @param request - NextRequest berisi data produk di body
 * @returns NextResponse - Produk yang dibuat atau pesan error
 * 
 * Logika Bisnis:
 * 1. Inisialisasi toko produk
 * 2. Parse request body untuk mendapatkan data produk
 * 3. Generate ID unik (ID maksimal yang ada + 1)
 * 4. Tambah rating default (0 rate, 0 count)
 * 5. Simpan produk baru di memori
 * 6. Kembalikan produk yang dibuat dengan status 201
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!isAdminSession(session)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await initializeProducts();
    const body = await request.json();
    console.log('Body POST /api/products:', body);

    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Data produk tidak valid', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: Math.max(...getProducts().map(p => p.id), 0) + 1,
      ...parsed.data,
      rating: {
        rate: 0,
        count: 0
      }
    };

    const createdProduct = addProduct(newProduct);
    revalidatePath('/products');
    revalidatePath('/admin');

    return NextResponse.json(createdProduct, { status: 201 });
  } catch (error) {
    console.error('Error POST /api/products:', error);
    return NextResponse.json(
      { error: 'Gagal membuat produk' },
      { status: 500 }
    );
  }
}
