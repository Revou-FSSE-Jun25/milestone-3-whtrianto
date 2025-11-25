import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">RevoShop</h3>
            <p className="text-gray-300 mb-4">
              Your trusted e-commerce platform for quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 12.073C22 6.505 17.523 2 12 2S2 6.505 2 12.073c0 5.016 3.657 9.167 8.438 9.878v-6.992H7.898v-2.886h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.886h-2.33v6.992C18.343 21.24 22 17.089 22 12.073z" />
              </svg>
            </a>

              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.75 2A5.76 5.76 0 0 0 2 7.75v8.5A5.76 5.76 0 0 0 7.75 22h8.5A5.76 5.76 0 0 0 22 16.25v-8.5A5.76 5.76 0 0 0 16.25 2zm0 1.5h8.5A4.26 4.26 0 0 1 20.5 7.75v8.5a4.26 4.26 0 0 1-4.25 4.25h-8.5A4.26 4.26 0 0 1 3.5 16.25v-8.5A4.26 4.26 0 0 1 7.75 3.5zM12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 1.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm4.88-.88a1.13 1.13 0 1 0 1.12 1.13 1.13 1.13 0 0 0-1.12-1.13z"/>
                </svg>
              </a>

              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-gray-300 hover:text-white transition-colors">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <p>Email: info@revoshop.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Commerce St, City, State 12345</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 RevoShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

