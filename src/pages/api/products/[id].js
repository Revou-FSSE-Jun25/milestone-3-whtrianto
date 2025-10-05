import { deleteProduct, getProductById, updateProduct } from '@/lib/productsStore';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'GET') {
    const product = await getProductById(id);
    if (!product) return res.status(404).json({ message: 'Not Found' });
    return res.status(200).json(product);
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== 'admin') return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'PUT' || req.method === 'PATCH') {
    const { title, price, description, image, category } = req.body || {};
    const updated = await updateProduct(id, {
      ...(title !== undefined ? { title } : {}),
      ...(price !== undefined ? { price: Number(price) } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(image !== undefined ? { image } : {}),
      ...(category !== undefined ? { category } : {}),
    });
    if (!updated) return res.status(404).json({ message: 'Not Found' });
    try {
      await res.revalidate('/');
      await res.revalidate(`/products/${id}`);
    } catch {}
    return res.status(200).json(updated);
  }
  if (req.method === 'DELETE') {
    const ok = await deleteProduct(id);
    if (!ok) return res.status(404).json({ message: 'Not Found' });
    try {
      await res.revalidate('/');
      await res.revalidate(`/products/${id}`);
    } catch {}
    return res.status(204).end();
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}


