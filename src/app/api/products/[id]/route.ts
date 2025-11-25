/**
 * ========================================
 * RUTE API DETAIL PRODUK - Platform E-commerce RevoShop
 * ========================================
 * 
 * Rute API ini menangani operasi produk individual:
 * - GET: Ambil produk tunggal berdasarkan ID (digunakan oleh halaman detail produk)
 * - PUT: Update produk yang ada (fungsi admin)
 * - DELETE: Hapus produk dari toko (fungsi admin)
 * 
 * Fitur:
 * - Rute dinamis dengan parameter ID produk
 * - Validasi input untuk ID produk
 * - Penanganan error yang komprehensif
 * - Operasi khusus admin untuk PUT/DELETE
 * - Penanganan parameter yang type-safe
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { initializeProducts, getProduct, updateProduct, deleteProduct } from '@/lib/productsStore';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { isAdminSession } from '@/lib/auth';
import { productSchema } from '@/lib/validation';

// Paksa rendering dinamis untuk data real-time
export const dynamic = 'force-dynamic';
const productUpdateSchema = productSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Minimal satu field harus diupdate',
  });

/**
 * GET /api/products/[id]
 * 
 * Mengambil produk tunggal berdasarkan ID.
 * Digunakan oleh:
 * - Halaman detail produk (/products/[id])
 * - Dashboard admin untuk pengeditan produk
 * - Operasi keranjang yang memerlukan detail produk
 * 
 * @param request - Objek NextRequest
 * @param context - Konteks rute berisi parameter dinamis
 * @returns NextResponse - Data produk atau pesan error
 * 
 * Logika Bisnis:
 * 1. Ekstrak ID produk dari parameter URL
 * 2. Validasi ID adalah angka yang valid
 * 3. Inisialisasi toko produk jika diperlukan
 * 4. Ambil produk berdasarkan ID
 * 5. Kembalikan produk atau 404 jika tidak ditemukan
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    console.log('API /api/products/[id] GET dipanggil dengan params:', params);
    const id = parseInt(params.id);
    
    // Validasi ID produk adalah angka yang valid
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID produk tidak valid' },
        { status: 400 }
      );
    }

    await initializeProducts();
    const product = getProduct(id);
    
    // Kembalikan 404 jika produk tidak ditemukan
    if (!product) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
      console.error('Error GET /api/products/[id]:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil produk' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products/[id]
 * 
 * Memperbarui produk yang ada berdasarkan ID.
 * Digunakan oleh:
 * - Dashboard admin untuk mengedit produk
 * - Form update produk
 * 
 * @param request - NextRequest berisi data produk yang diupdate
 * @param context - Konteks rute berisi ID produk
 * @returns NextResponse - Produk yang diupdate atau pesan error
 * 
 * Logika Bisnis:
 * 1. Ekstrak dan validasi ID produk
 * 2. Parse request body untuk data update
 * 3. Inisialisasi toko produk
 * 4. Update produk di toko
 * 5. Kembalikan produk yang diupdate atau 404 jika tidak ditemukan
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!isAdminSession(session)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const params = await context.params;
    console.log('API /api/products/[id] PUT dipanggil dengan params:', params);
    const id = parseInt(params.id);
    
    // Validasi ID produk
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID produk tidak valid' },
        { status: 400 }
      );
    }

    await initializeProducts();
    const body = await request.json();
    console.log('Body PUT /api/products/[id]:', body);

    const parsed = productUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Data update tidak valid', details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    
    const updatedProduct = updateProduct(id, parsed.data);
    
    // Kembalikan 404 jika produk tidak ditemukan
    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }
    revalidatePath('/products');
    revalidatePath('/admin');

    return NextResponse.json(updatedProduct);
  } catch (error) {
      console.error('Error PUT /api/products/[id]:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate produk' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/[id]
 * 
 * Menghapus produk dari toko berdasarkan ID.
 * Digunakan oleh:
 * - Dashboard admin untuk menghapus produk
 * - Interface manajemen produk
 * 
 * @param request - Objek NextRequest
 * @param context - Konteks rute berisi ID produk
 * @returns NextResponse - Pesan sukses atau error
 * 
 * Logika Bisnis:
 * 1. Ekstrak dan validasi ID produk
 * 2. Inisialisasi toko produk
 * 3. Hapus produk dari toko
 * 4. Kembalikan pesan sukses atau 404 jika tidak ditemukan
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!isAdminSession(session)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const params = await context.params;
    const id = parseInt(params.id);
    
    // Validasi ID produk
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID produk tidak valid' },
        { status: 400 }
      );
    }

    await initializeProducts();
    const success = deleteProduct(id);
    
    // Kembalikan 404 jika produk tidak ditemukan
    if (!success) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }
    revalidatePath('/products');
    revalidatePath('/admin');

    return NextResponse.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
      console.error('Error DELETE /api/products/[id]:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus produk' },
      { status: 500 }
    );
  }
}
