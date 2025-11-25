'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';

const OrderSummary: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 50;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="text-center py-8">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 3h1.386a.75.75 0 0 1 .728.546L5.88 8.25M7.5 13.5h11.25a.75.75 0 0 0 .728-.546l1.5-6a.75.75 0 0 0-.728-.954H5.88M7.5 13.5L5.88 8.25M7.5 13.5L6 18h12l-1.5-4.5M6 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m12 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
          </svg>
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.title}
              </h4>
              <p className="text-sm text-gray-500">${item.price}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            <div className="text-sm font-medium text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-400 hover:text-red-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {shipping > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-md">
          <p className="text-sm text-yellow-800">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
