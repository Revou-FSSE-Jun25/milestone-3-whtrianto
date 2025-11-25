import { renderHook, act } from '@testing-library/react';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'A test product description',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: {
    rate: 4.5,
    count: 100
  }
};

describe('CartStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    act(() => {
      useCartStore.getState().clearCart();
    });
  });

  it('should add product to cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({
      id: mockProduct.id,
      title: mockProduct.title,
      price: mockProduct.price,
      image: mockProduct.image,
      quantity: 1
    });
  });

  it('should increment quantity when adding same product again', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('should remove product from cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should update product quantity', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateQuantity(mockProduct.id, 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
  });

  it('should remove product when quantity is set to 0', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateQuantity(mockProduct.id, 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should calculate total price correctly', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.getTotalPrice()).toBe(59.98);
  });

  it('should calculate total items correctly', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.getTotalItems()).toBe(2);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });
});

