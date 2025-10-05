import { getAllProducts, addProduct } from '@/lib/productsStore';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await getAllProducts();
    return res.status(200).json(products);
  }
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user?.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized: pastikan login sebagai admin dan NEXTAUTH_SECRET terpasang' });
    }
    const { title, price, description, image, category } = req.body || {};
    if (!title || !price || !description || !image) {
      return res.status(400).json({ message: 'Data produk tidak lengkap' });
    }
    const created = await addProduct({ title, price: Number(price), description, image, category: category || 'general' });
    try {
      // Revalidate halaman yang terpengaruh (home dan detail produk baru)
      await res.revalidate('/');
      await res.revalidate(`/products/${created.id}`);
    } catch {}
    return res.status(201).json(created);
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}


