'use client';

import OrderSummary from '@/components/OrderSummary';
import Link from 'next/link';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
            <p className="text-gray-600 mt-2">Review your items and proceed to checkout</p>
          </div>
          <Link
            href="/products"
            className="text-yellow-600 hover:text-yellow-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Reuse OrderSummary layout: it contains items and totals; in a real app we'd separate */}
            <OrderSummary />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Step</h3>
              <p className="text-gray-600 mb-4">When you&apos;re ready, proceed to checkout.</p>
              <Link
                href="/checkout"
                className="block text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Go to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



