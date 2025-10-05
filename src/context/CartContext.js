import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload || [];
    case 'ADD': {
      const existing = state.find((i) => i.id === action.payload.id);
      if (existing) {
        return state.map((i) => (i.id === action.payload.id ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) } : i));
      }
      return [...state, { id: action.payload.id, quantity: action.payload.quantity || 1 }];
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.payload.id);
    case 'UPDATE_QTY':
      return state.map((i) => (i.id === action.payload.id ? { ...i, quantity: Math.max(1, action.payload.quantity) } : i));
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  // Load dari localStorage saat mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('revoshop_cart');
      if (raw) dispatch({ type: 'INIT', payload: JSON.parse(raw) });
    } catch {}
  }, []);

  // Persist ke localStorage saat berubah
  useEffect(() => {
    try {
      localStorage.setItem('revoshop_cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const api = useMemo(
    () => ({
      items,
      add: (id, quantity = 1) => dispatch({ type: 'ADD', payload: { id, quantity } }),
      remove: (id) => dispatch({ type: 'REMOVE', payload: { id } }),
      updateQuantity: (id, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    [items]
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}


