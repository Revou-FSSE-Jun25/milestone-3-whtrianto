import { useEffect, useState } from 'react';

// Hook sederhana untuk cache produk di client dengan TTL
export function useProducts(ttlMs = 60_000) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;
    const now = Date.now();
    const cached = typeof window !== 'undefined' ? localStorage.getItem('revoshop_products_cache') : null;
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (now - parsed.time < ttlMs) {
          setData(parsed.data);
          setLoading(false);
        }
      } catch {}
    }
    (async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Gagal memuat produk');
        const json = await res.json();
        if (!canceled) {
          setData(json);
          setLoading(false);
          if (typeof window !== 'undefined') {
            localStorage.setItem('revoshop_products_cache', JSON.stringify({ time: Date.now(), data: json }));
          }
        }
      } catch (e) {
        if (!canceled) {
          setError(e.message);
          setLoading(false);
        }
      }
    })();
    return () => {
      canceled = true;
    };
  }, [ttlMs]);

  return { data, error, loading };
}


