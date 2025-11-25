'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const userRole = session?.user?.role;
  const isAdmin = userRole === 'admin';

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-yellow-600">RevoShop</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAdmin && (
              <>
                <Link href="/" className="text-gray-700 hover:text-yellow-600 transition-colors">
                  Home
                </Link>
                <Link href="/faq" className="text-gray-700 hover:text-yellow-600 transition-colors">
                  FAQ
                </Link>
                <Link href="/products" className="text-gray-700 hover:text-yellow-600 transition-colors">
                  Products
                </Link>
              </>
            )}
            {isAdmin && (
              <Link href="/admin" className="text-gray-700 hover:text-yellow-600 transition-colors">
                Admin
              </Link>
            )}
          </div>

          {/* Cart and Auth */}
          <div className="flex items-center space-x-4">
            {!isAdmin && (
              <Link href="/cart" className="relative">
                <div className="flex items-center text-gray-700 hover:text-yellow-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 3h1.386a.75.75 0 0 1 .728.546L5.88 8.25M7.5 13.5h11.25a.75.75 0 0 0 .728-.546l1.5-6a.75.75 0 0 0-.728-.954H5.88M7.5 13.5L5.88 8.25M7.5 13.5L6 18h12l-1.5-4.5M6 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m12 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>
            )}

            {session ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Welcome, {session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn(undefined, { callbackUrl: '/' })}
                className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
