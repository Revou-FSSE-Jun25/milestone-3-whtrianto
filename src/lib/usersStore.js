import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

const dataPath = path.join(process.cwd(), 'src', 'data', 'users.json');

async function ensureSeed() {
  try {
    const raw = await fs.readFile(dataPath, 'utf-8');
    const arr = JSON.parse(raw || '[]');
    if (Array.isArray(arr) && arr.length > 0) return arr;
  } catch {}
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const adminHash = await bcrypt.hash(adminPassword, 10);
  const seed = [
    { id: 1, username: adminUsername, name: 'Administrator', email: 'admin@example.com', role: 'admin', passwordHash: adminHash },
  ];
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(seed, null, 2));
  return seed;
}

export async function getAllUsers() {
  try {
    const raw = await fs.readFile(dataPath, 'utf-8');
    const parsed = JSON.parse(raw || '[]');
    if (Array.isArray(parsed) && parsed.length === 0) return ensureSeed();
    return parsed;
  } catch {
    return ensureSeed();
  }
}

export async function getUserById(id) {
  const all = await getAllUsers();
  return all.find((u) => String(u.id) === String(id)) || null;
}

export async function getUserByUsername(username) {
  const all = await getAllUsers();
  return all.find((u) => u.username === username) || null;
}

async function saveAllUsers(users) {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(users, null, 2));
}

export async function addUser({ username, name, email, role = 'user', password }) {
  if (!username || !password) throw new Error('username dan password wajib');
  const all = await getAllUsers();
  if (all.some((u) => u.username === username)) throw new Error('username sudah digunakan');
  const nextId = all.length > 0 ? Math.max(...all.map((u) => Number(u.id))) + 1 : 1;
  const passwordHash = await bcrypt.hash(password, 10);
  const toSave = { id: nextId, username, name: name || username, email: email || `${username}@example.com`, role, passwordHash };
  await saveAllUsers([...all, toSave]);
  return { ...toSave, passwordHash: undefined };
}

export async function updateUser(id, updates) {
  const all = await getAllUsers();
  const idx = all.findIndex((u) => String(u.id) === String(id));
  if (idx === -1) return null;
  let passwordHash = all[idx].passwordHash;
  if (updates.password) {
    passwordHash = await bcrypt.hash(updates.password, 10);
  }
  const next = {
    ...all[idx],
    ...(updates.username ? { username: updates.username } : {}),
    ...(updates.name ? { name: updates.name } : {}),
    ...(updates.email ? { email: updates.email } : {}),
    ...(updates.role ? { role: updates.role } : {}),
    passwordHash,
  };
  if (updates.username && updates.username !== all[idx].username) {
    if (all.some((u, i) => i !== idx && u.username === updates.username)) throw new Error('username sudah digunakan');
  }
  all[idx] = next;
  await saveAllUsers(all);
  return { ...next, passwordHash: undefined };
}

export async function deleteUser(id) {
  const all = await getAllUsers();
  const idx = all.findIndex((u) => String(u.id) === String(id));
  if (idx === -1) return false;
  all.splice(idx, 1);
  await saveAllUsers(all);
  return true;
}

export async function verifyUserPassword(username, password) {
  const user = await getUserByUsername(username);
  if (!user || !user.passwordHash) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  const { passwordHash, ...rest } = user;
  return rest;
}


