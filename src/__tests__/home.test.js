import { render, screen } from '@testing-library/react';
import Home, { getStaticProps } from '@/pages/index';

describe('Home Page', () => {
  it('renders title', () => {
    render(<Home products={[]} />);
    expect(screen.getByText('RevoShop')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<Home products={[]} />);
    expect(screen.getByText(/Belum ada produk tersedia/i)).toBeInTheDocument();
  });
});


