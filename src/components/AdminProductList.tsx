'use client';

import { Product } from '@/types';
import Image from 'next/image';

interface AdminProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const AdminProductList: React.FC<AdminProductListProps> = ({
  products,
  onEdit,
  onDelete
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products</h3>
        <p className="text-gray-600">Get started by adding your first product.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto max-w-full">
      <table className="w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap max-w-[250px]">
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="ml-4 overflow-hidden">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {product.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {product.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      ({product.rating.count})
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        console.log('Edit button clicked for product:', product);
                        onEdit(product);
                      }}
                      className="text-blue-600 hover:text-blue-900 transition-colors px-2 py-1 border border-blue-600 rounded hover:bg-blue-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        console.log('Delete button clicked for product ID:', product.id);
                        onDelete(product.id);
                      }}
                      className="text-red-600 hover:text-red-900 transition-colors px-2 py-1 border border-red-600 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductList;
