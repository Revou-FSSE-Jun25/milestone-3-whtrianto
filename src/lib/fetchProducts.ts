import { Product } from '@/types';

const API_URL = 'https://fakestoreapi.com/products';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 3600 } // ISR: revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProduct(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      next: { revalidate: 3600 } // ISR: revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

