import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

// Mock the cart store
jest.mock('@/store/cartStore', () => ({
  useCartStore: () => ({
    addToCart: jest.fn(),
  }),
}));

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

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByText('(100)')).toBeInTheDocument();
  });

  it('renders star rating correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(5);
  });

  it('has working buttons', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Lihat Detail')).toBeInTheDocument();
    expect(screen.getByText('Tambah ke Keranjang')).toBeInTheDocument();
  });

  it('links to product detail page', () => {
    render(<ProductCard product={mockProduct} />);
    
    const viewDetailsLink = screen.getByText('Lihat Detail');
    expect(viewDetailsLink.closest('a')).toHaveAttribute('href', '/products/1');
  });
});

