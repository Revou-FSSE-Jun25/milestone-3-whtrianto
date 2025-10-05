import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';

describe('ProductCard', () => {
  it('renders product title and price', () => {
    render(<ProductCard product={{ id: 1, title: 'Produk Uji', price: 10, image: 'x.png' }} />);
    expect(screen.getByText('Produk Uji')).toBeInTheDocument();
    expect(screen.getByText(/Rp/)).toBeInTheDocument();
  });
});


