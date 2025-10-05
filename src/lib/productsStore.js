import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'data', 'products.json');

async function ensureSeed() {
  try {
    const raw = await fs.readFile(dataPath, 'utf-8');
    const arr = JSON.parse(raw || '[]');
    if (Array.isArray(arr) && arr.length > 0) return arr;
  } catch {}
  // Seed dari FakeStoreAPI jika kosong
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    return data;
  } catch {
    return [];
  }
}

export async function getAllProducts() {
  try {
    const raw = await fs.readFile(dataPath, 'utf-8');
    const parsed = JSON.parse(raw || '[]');
    if (Array.isArray(parsed) && parsed.length === 0) {
      // Jika file ada namun kosong, seed dari FakeStoreAPI
      return ensureSeed();
    }
    return parsed;
  } catch {
    return ensureSeed();
  }
}

export async function getProductById(id) {
  const all = await getAllProducts();
  return all.find((p) => String(p.id) === String(id)) || null;
}

export async function saveAllProducts(products) {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
}

export async function addProduct(product) {
  const all = await getAllProducts();
  const nextId = all.length > 0 ? Math.max(...all.map((p) => Number(p.id))) + 1 : 1;
  const toSave = { ...product, id: nextId };
  await saveAllProducts([...all, toSave]);
  return toSave;
}

export async function updateProduct(id, updates) {
  const all = await getAllProducts();
  const idx = all.findIndex((p) => String(p.id) === String(id));
  if (idx === -1) return null;
  const updated = { ...all[idx], ...updates, id: all[idx].id };
  all[idx] = updated;
  await saveAllProducts(all);
  return updated;
}

export async function deleteProduct(id) {
  const all = await getAllProducts();
  const idx = all.findIndex((p) => String(p.id) === String(id));
  if (idx === -1) return false;
  all.splice(idx, 1);
  await saveAllProducts(all);
  return true;
}


