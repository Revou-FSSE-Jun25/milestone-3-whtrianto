'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/',
    });
    if (res?.error) setError('Invalid credentials');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign in to RevoShop</h1>
        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="admin@revoshop.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="admin123"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-sm text-gray-500">
          <p>Demo accounts:</p>
          <ul className="list-disc ml-5 mt-1">
            <li>admin@revoshop.com / admin123</li>
            <li>user@revoshop.com / user123</li>
          </ul>
        </div>
      </div>
    </div>
  );
}



