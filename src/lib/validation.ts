import { z } from 'zod';

export const checkoutFormSchema = z.object({
  fullName: z.string().min(2, 'Nama lengkap minimal 2 karakter'),
  address: z.string().min(10, 'Alamat minimal 10 karakter'),
  city: z.string().min(2, 'Kota minimal 2 karakter'),
  province: z.string().min(2, 'Provinsi minimal 2 karakter'),
  postalCode: z.string().min(5, 'Kode pos minimal 5 karakter'),
  country: z.string().min(2, 'Negara minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  cardNumber: z.string().min(16, 'Nomor kartu minimal 16 digit'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format tanggal tidak valid (MM/YY)'),
  cvc: z.string().min(3, 'CVC minimal 3 digit'),
});

export const productSchema = z.object({
  title: z.string().min(1, 'Judul produk harus diisi'),
  price: z.number().min(0, 'Harga harus lebih dari 0'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  category: z.string().min(1, 'Kategori harus diisi'),
  image: z.string().url('URL gambar tidak valid'),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
export type ProductFormData = z.infer<typeof productSchema>;

