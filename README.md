# RevoShop - E-commerce Platform

RevoShop is a modern, full-featured e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS. It demonstrates advanced Next.js features including SSG, SSR, ISR, authentication, and comprehensive testing.

## Demo Screenshots

### Home Page
![Home Page](https://raw.githubusercontent.com/Revou-FSSE-Jun25/milestone-3-whtrianto/main/public/1.png)

### Product Detail
![Home Page](https://raw.githubusercontent.com/Revou-FSSE-Jun25/milestone-3-whtrianto/main/public/2.png)

### Login Page
![Home Page](https://raw.githubusercontent.com/Revou-FSSE-Jun25/milestone-3-whtrianto/main/public/4.png)

### Dashboard Admin
![Home Page](https://raw.githubusercontent.com/Revou-FSSE-Jun25/milestone-3-whtrianto/main/public/3.png)

### Edit Product
![Home Page](https://raw.githubusercontent.com/Revou-FSSE-Jun25/milestone-3-whtrianto/main/public/5.png)

### Create Product
![Home Page](https://raw.githubusercontent.com/Revou-FSSE-Jun25/milestone-3-whtrianto/main/public/6.png)

### Delete Product
![Home Page](https://raw.githubusercontent.com/Revou-FSSE-Jun25/milestone-3-whtrianto/main/public/7.png)

### Cart
![Home Page](https://raw.githubusercontent.com/Revou-FSSE-Jun25/milestone-3-whtrianto/main/public/8.png)

### Checkout
![Home Page](https://raw.githubusercontent.com/Revou-FSSE-Jun25/milestone-3-whtrianto/main/public/9.png)

## 🚀 Features

### Core Features

- **Static Site Generation (SSG)** - Product listing page with pre-rendered content
- **Server-Side Rendering (SSR)** - Dynamic product detail pages
- **Incremental Static Regeneration (ISR)** - Automatic content updates
- **Authentication** - NextAuth.js integration with protected routes
- **Shopping Cart** - Zustand state management with localStorage persistence
- **Admin Dashboard** - Full CRUD operations for product management
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type Safety** - Full TypeScript implementation
- **Testing** - Jest and React Testing Library integration

### Technical Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **NextAuth.js** for authentication
- **Zustand** for state management
- **React Hook Form** with Zod validation
- **Jest & React Testing Library** for testing
- **ESLint & Prettier** for code quality

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth configuration
│   │   └── products/       # Product CRUD API
│   ├── products/          # Product pages
│   │   ├── [id]/         # Dynamic product detail
│   │   └── page.tsx      # Product listing (SSG)
│   ├── admin/            # Admin dashboard
│   ├── checkout/         # Checkout page
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── ProductDetail.tsx
│   ├── CheckoutForm.tsx
│   ├── OrderSummary.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/                  # Utility functions
│   ├── fetchProducts.ts
│   └── validation.ts
├── store/               # State management
│   └── cartStore.ts
├── types/               # TypeScript definitions
│   └── index.ts
└── tests/               # Test files
    ├── ProductCard.test.tsx
    └── CartStore.test.ts
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd revo-shop
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

## 🔐 Authentication

The application includes demo authentication with the following test accounts:

- **Admin Account**
  - Email: `admin@revoshop.com`
  - Password: `admin123`

- **Regular User**
  - Email: `user@revoshop.com`
  - Password: `user123`

## 📱 Pages & Features

### Home Page (`/`)

- Hero section with call-to-action
- Featured products showcase
- Company features and benefits

### Products Page (`/products`)

- **SSG Implementation** - Pre-rendered at build time
- Grid layout with product cards
- Hover effects and smooth transitions
- Responsive design for all screen sizes

### Product Detail (`/products/[id]`)

- **SSR Implementation** - Server-side rendered
- High-quality product images
- Detailed product information
- Add to cart functionality
- Star ratings and reviews

### Admin Dashboard (`/admin`)

- **Protected Route** - Requires authentication
- Product management interface
- Add, edit, and delete products
- Real-time updates with ISR

### Checkout Page (`/checkout`)

- **Protected Route** - Requires authentication
- Two-column responsive layout
- Form validation with Zod
- Order summary with calculations
- Shipping and tax calculations

## 🛒 Shopping Cart

- **Zustand State Management** - Lightweight and efficient
- **localStorage Persistence** - Cart survives page refreshes
- **Real-time Updates** - Instant UI updates
- **Quantity Management** - Add, remove, and update quantities
- **Price Calculations** - Automatic totals and taxes

## 🎨 Design System

### Color Palette

- **Primary**: Blue (#2563eb)
- **Secondary**: Green (#16a34a)
- **Accent**: Purple (#9333ea)
- **Neutral**: Gray scale

### Typography

- **Font**: Geist Sans & Geist Mono
- **Responsive**: Mobile-first approach
- **Accessibility**: WCAG compliant

### Components

- **ProductCard**: Reusable product display
- **ProductList**: Grid layout with responsive design
- **CheckoutForm**: Multi-step form with validation
- **OrderSummary**: Real-time cart calculations

## 🔧 API Routes

### Products API (`/api/products`)

- `GET` - Fetch all products
- `POST` - Create new product (Admin only)

### Product Detail API (`/api/products/[id]`)

- `GET` - Fetch single product
- `PUT` - Update product (Admin only)
- `DELETE` - Delete product (Admin only)

### Authentication API (`/api/auth/[...nextauth]`)

- NextAuth.js configuration
- Credentials provider
- JWT session strategy

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy with automatic builds

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📊 Performance Features

- **Static Generation** - Fast loading product pages
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic bundle optimization
- **Caching** - ISR for dynamic content
- **SEO** - Meta tags and structured data

## 🧪 Testing Strategy

### Unit Tests

- Component testing with React Testing Library
- State management testing with Zustand
- Form validation testing
- API route testing

### Test Coverage

- ProductCard component
- Cart store functionality
- Form validation
- API endpoints

## 🔒 Security Features

- **Authentication** - NextAuth.js integration
- **Route Protection** - Middleware-based access control
- **Input Validation** - Zod schema validation
- **CSRF Protection** - Built-in Next.js protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS.

---

**RevoShop** - Your trusted e-commerce platform for quality products at affordable prices.
