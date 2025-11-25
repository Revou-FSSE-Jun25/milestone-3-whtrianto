import { fetchProduct } from '@/lib/fetchProducts';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 900; // Keep product detail pages fresh via ISR

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id);
  
  if (isNaN(productId)) {
    notFound();
  }

  const product = await fetchProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetail product={product} />
      </div>
    </div>
  );
}
