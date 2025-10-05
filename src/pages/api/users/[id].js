import { getUserById, updateUser, deleteUser } from '@/lib/usersStore';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== 'admin') return res.status(401).json({ message: 'Unauthorized' });

  const { id } = req.query;

  if (req.method === 'GET') {
    const u = await getUserById(id);
    if (!u) return res.status(404).json({ message: 'Not Found' });
    const { passwordHash, ...rest } = u;
    return res.status(200).json(rest);
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const updated = await updateUser(id, req.body || {});
      if (!updated) return res.status(404).json({ message: 'Not Found' });
      return res.status(200).json(updated);
    } catch (e) {
      return res.status(400).json({ message: e.message || 'Bad Request' });
    }
  }

  if (req.method === 'DELETE') {
    const ok = await deleteUser(id);
    if (!ok) return res.status(404).json({ message: 'Not Found' });
    return res.status(204).end();
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}


