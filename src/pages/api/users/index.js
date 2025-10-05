import { getAllUsers, addUser } from '@/lib/usersStore';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== 'admin') return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'GET') {
    const users = await getAllUsers();
    const sanitized = users.map(({ passwordHash, ...u }) => u);
    return res.status(200).json(sanitized);
  }
  if (req.method === 'POST') {
    try {
      const { username, name, email, role, password } = req.body || {};
      const created = await addUser({ username, name, email, role, password });
      return res.status(201).json(created);
    } catch (e) {
      return res.status(400).json({ message: e.message || 'Bad Request' });
    }
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}


