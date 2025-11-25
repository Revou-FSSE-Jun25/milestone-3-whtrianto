import { fetchProducts } from '@/lib/fetchProducts';
import ProductList from '@/components/ProductList';

export const revalidate = 900; // Re-generate the product listing every 15 minutes

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of quality products
          </p>
        </div>
        
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600">We&apos;re working on adding more products. Please check back later!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

