import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/context/CartContext';

function wrapper({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

describe('CartContext', () => {
  it('adds and updates items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.add(1, 1));
    expect(result.current.items.length).toBe(1);
    act(() => result.current.updateQuantity(1, 3));
    expect(result.current.items[0].quantity).toBe(3);
    act(() => result.current.clear());
    expect(result.current.items.length).toBe(0);
  });
});


