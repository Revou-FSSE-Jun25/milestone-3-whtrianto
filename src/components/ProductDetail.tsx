'use client';

import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        {/* Product Image */}
        <div className="relative h-[300px] w-full bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain object-center rounded-lg"
          priority
        />
      </div>


        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="mb-2">
              <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-green-600">
            ${product.price}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              Add to Cart
            </button>
            <Link
              href="/checkout"
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
            >
              Buy Now
            </Link>
          </div>

          {/* Back to Products */}
          <div className="pt-4 border-t border-gray-200">
            <Link
              href="/products"
              className="text-yellow-600 hover:text-yellow-800 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

